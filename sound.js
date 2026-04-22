/* =================================================================
   与黄总的未来 · Procedural Sound Engine
   纯 Web Audio API，无需音频文件。
     - SFX：打字、点击、选项、好感度升降、场景切换、结局
     - BGM：四种情绪的程序合成环境音（calm/romantic/tense/ending）
   ================================================================= */

window.Sound = (function () {
  "use strict";

  let ctx = null;
  let masterGain = null;
  let sfxGain = null;
  let bgmGain = null;

  // 用户设置
  const settings = {
    muted: false,
    sfxVolume: 0.55,
    bgmVolume: 0.18,
  };

  // 延迟初始化：浏览器要求用户手势后才能启动 AudioContext
  function ensureCtx() {
    if (ctx) return ctx;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      masterGain = ctx.createGain();
      sfxGain = ctx.createGain();
      bgmGain = ctx.createGain();
      sfxGain.gain.value = settings.sfxVolume;
      bgmGain.gain.value = settings.bgmVolume;
      sfxGain.connect(masterGain);
      bgmGain.connect(masterGain);
      masterGain.connect(ctx.destination);
      masterGain.gain.value = settings.muted ? 0 : 1;
    } catch (e) {
      console.warn("AudioContext init failed:", e);
    }
    return ctx;
  }

  // 恢复被挂起的 AudioContext（某些浏览器需要）
  function resume() {
    if (ctx && ctx.state === "suspended") ctx.resume();
  }

  // ---- 基础音色 --------------------------------------------------
  function beep({ freq = 440, duration = 0.1, type = "sine", gain = 0.3, attack = 0.005, release = 0.08, detune = 0 } = {}) {
    if (!ensureCtx()) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    osc.detune.value = detune;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.linearRampToValueAtTime(gain * 0.7, t + attack + duration * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + duration + release);
    osc.connect(g); g.connect(sfxGain);
    osc.start(t);
    osc.stop(t + attack + duration + release + 0.05);
  }

  function noise(duration = 0.08, gain = 0.15) {
    if (!ensureCtx()) return;
    const t = ctx.currentTime;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const src = ctx.createBufferSource();
    const g = ctx.createGain();
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 1800;
    src.buffer = buffer;
    g.gain.value = gain;
    src.connect(hp); hp.connect(g); g.connect(sfxGain);
    src.start(t);
  }

  // ---- SFX -------------------------------------------------------
  const sfx = {
    // 打字声：高频短促，节流避免噪音墙
    _lastType: 0,
    type() {
      const now = Date.now();
      if (now - this._lastType < 45) return;
      this._lastType = now;
      beep({ freq: 1800 + Math.random() * 600, duration: 0.01, type: "square", gain: 0.04, release: 0.02 });
    },
    click() {
      beep({ freq: 820, duration: 0.03, type: "triangle", gain: 0.18, release: 0.06 });
      beep({ freq: 1240, duration: 0.02, type: "triangle", gain: 0.12, release: 0.05, attack: 0.008 });
    },
    hover() {
      beep({ freq: 660, duration: 0.02, type: "sine", gain: 0.08, release: 0.04 });
    },
    // 选择确认：两个音阶上扬
    choose() {
      beep({ freq: 660, duration: 0.06, type: "sine", gain: 0.22, release: 0.1 });
      setTimeout(() => beep({ freq: 990, duration: 0.12, type: "sine", gain: 0.22, release: 0.12 }), 60);
    },
    // 好感度 +：大三和弦闪现
    affectionUp() {
      const base = 523.25; // C5
      [0, 4, 7].forEach((semi, i) => {
        setTimeout(() => beep({
          freq: base * Math.pow(2, semi / 12),
          duration: 0.14, type: "sine", gain: 0.18, release: 0.25
        }), i * 55);
      });
      setTimeout(() => beep({ freq: 1568, duration: 0.16, type: "triangle", gain: 0.14, release: 0.3 }), 160);
    },
    // 好感度 -：小二和弦下坠
    affectionDown() {
      beep({ freq: 311, duration: 0.18, type: "sawtooth", gain: 0.14, release: 0.22 });
      setTimeout(() => beep({ freq: 207, duration: 0.24, type: "sawtooth", gain: 0.12, release: 0.3 }), 80);
    },
    // 场景切换：白噪音 whoosh
    sceneTransition() {
      noise(0.25, 0.12);
    },
    // 爱心突出：水晶铃
    heartBurst() {
      [1318, 1760, 2349].forEach((f, i) => {
        setTimeout(() => beep({ freq: f, duration: 0.22, type: "sine", gain: 0.16, release: 0.4 }), i * 70);
      });
    },
    // 结局 fanfare：琶音
    endingTrue() {
      const notes = [523, 659, 784, 1047, 1319, 1568]; // C 大调琶音延伸
      notes.forEach((f, i) => {
        setTimeout(() => beep({ freq: f, duration: 0.3, type: "triangle", gain: 0.2, release: 0.5 }), i * 110);
      });
    },
    endingGood() {
      const notes = [440, 554, 659, 880]; // A 小调友好
      notes.forEach((f, i) => {
        setTimeout(() => beep({ freq: f, duration: 0.28, type: "sine", gain: 0.2, release: 0.5 }), i * 140);
      });
    },
    endingBad() {
      const notes = [196, 185, 175, 165]; // 下坠
      notes.forEach((f, i) => {
        setTimeout(() => beep({ freq: f, duration: 0.35, type: "sawtooth", gain: 0.15, release: 0.5 }), i * 180);
      });
    },
    // 存读档提示
    save() {
      beep({ freq: 988, duration: 0.08, type: "sine", gain: 0.2 });
      setTimeout(() => beep({ freq: 1318, duration: 0.1, type: "sine", gain: 0.2 }), 70);
    },
  };

  // ---- BGM -------------------------------------------------------
  // 使用长时值的三角/正弦振荡器合成 pad 音，构成循环氛围
  const bgm = {
    _nodes: [],
    _current: null,
    _lfoTimer: null,

    stop() {
      if (!ctx) return;
      const t = ctx.currentTime;
      this._nodes.forEach(n => {
        try {
          n.gain && n.gain.gain.cancelScheduledValues(t);
          n.gain && n.gain.gain.linearRampToValueAtTime(0.0001, t + 0.6);
          setTimeout(() => {
            try { n.osc && n.osc.stop(); } catch {}
            try { n.lfo && n.lfo.stop(); } catch {}
          }, 700);
        } catch {}
      });
      this._nodes = [];
      this._current = null;
      clearInterval(this._lfoTimer);
      this._lfoTimer = null;
    },

    play(mood) {
      if (!ensureCtx()) return;
      if (this._current === mood) return;
      this.stop();
      this._current = mood;
      const t = ctx.currentTime;

      // 不同情绪的和弦根音（Hz），使用第三、第五组成简单三和弦
      const palette = {
        calm:     { root: 130.81, type: "triangle", third: 4, fifth: 7, detune: 0 },     // C3 major
        romantic: { root: 146.83, type: "sine",     third: 4, fifth: 7, detune: 6 },     // D3 major，微颤
        tense:    { root: 123.47, type: "sawtooth", third: 3, fifth: 7, detune: -10 },   // B2 minor，紧张
        ending:   { root: 174.61, type: "triangle", third: 4, fifth: 7, detune: 0 },     // F3 major，温暖
      };
      const p = palette[mood] || palette.calm;

      const freqs = [
        p.root,
        p.root * Math.pow(2, p.third / 12),
        p.root * Math.pow(2, p.fifth / 12),
        p.root * 2,                           // 高八度
      ];

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1200;
        filter.Q.value = 0.7;

        osc.type = p.type;
        osc.frequency.value = f;
        osc.detune.value = p.detune + (i - 1.5) * 3; // 小范围失谐增加厚度

        // LFO：缓慢调制音量制造呼吸感
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.08 + i * 0.03;
        lfoGain.gain.value = 0.08;
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.14 / (i + 1), t + 2.2);  // 淡入
        osc.connect(filter); filter.connect(gain); gain.connect(bgmGain);

        osc.start(t);
        lfo.start(t);
        this._nodes.push({ osc, gain, lfo });
      });

      // 每 8~12 秒加入一次点缀音（铃音）来避免单调
      this._lfoTimer = setInterval(() => {
        if (!ctx || settings.muted) return;
        const chord = [p.root * 4, p.root * 4 * Math.pow(2, p.third / 12), p.root * 4 * Math.pow(2, p.fifth / 12)];
        const note = chord[Math.floor(Math.random() * chord.length)];
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = note * (Math.random() < 0.5 ? 1 : 2);
        const now = ctx.currentTime;
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.06, now + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
        o.connect(g); g.connect(bgmGain);
        o.start(now);
        o.stop(now + 1.5);
      }, 9000 + Math.random() * 3000);
    },
  };

  // ---- 音量/静音 --------------------------------------------------
  function setMuted(m) {
    settings.muted = !!m;
    if (!ctx) return;
    masterGain.gain.linearRampToValueAtTime(settings.muted ? 0 : 1, ctx.currentTime + 0.2);
  }
  function setSfxVolume(v) {
    settings.sfxVolume = Math.max(0, Math.min(1, v));
    if (sfxGain) sfxGain.gain.value = settings.sfxVolume;
  }
  function setBgmVolume(v) {
    settings.bgmVolume = Math.max(0, Math.min(1, v));
    if (bgmGain) bgmGain.gain.value = settings.bgmVolume;
  }

  return {
    ensureCtx, resume,
    sfx, bgm,
    setMuted, setSfxVolume, setBgmVolume,
    getSettings: () => ({ ...settings }),
    loadSettings: (s) => {
      if (!s) return;
      if (typeof s.muted === "boolean") settings.muted = s.muted;
      if (typeof s.sfxVolume === "number") settings.sfxVolume = s.sfxVolume;
      if (typeof s.bgmVolume === "number") settings.bgmVolume = s.bgmVolume;
    },
  };
})();
