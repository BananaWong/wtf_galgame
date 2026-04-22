/* =================================================================
   与黄总的未来 · Galgame Engine
   极简可扩展的视觉小说引擎：
     - 打字机效果 / 自动 / 快进
     - 选项分支、好感度系统
     - localStorage 存读档（6 格）
     - 场景、立绘、HUD 信息
   ================================================================= */

(function () {
  "use strict";

  // ---- 全局状态 --------------------------------------------------
  const state = {
    scriptId: "prologue",
    index: 0,
    affection: 0,
    flags: {},
    seenKeys: new Set(),
    place: "",
    time: "",
    weather: "",
    speaker: "",
    charName: "黄仁勋",
    bg: "scene-office-night",
    history: [],
    auto: false,
    skip: false,
    waitingChoice: false,
    typing: false,
    typingTimer: null,
    autoTimer: null,
    skipTimer: null,
  };

  const settings = {
    textSpeed: 35,  // ms per char (lower = faster)
    autoWait: 1500, // ms to wait after line ends on auto
  };

  // ---- 元素 ------------------------------------------------------
  const $ = (sel) => document.querySelector(sel);
  const el = {
    titleScreen: $("#title-screen"),
    gameScreen: $("#game-screen"),
    endingScreen: $("#ending-screen"),
    sceneBg: $("#scene-bg"),
    sprite: $("#character-sprite"),
    affectionName: $("#affection-name"),
    heartRow: $("#heart-row"),
    affectionNum: $("#affection-num"),
    place: $("#info-place"),
    time: $("#info-time"),
    weather: $("#info-weather"),
    dialogBox: $("#dialog-box"),
    dialogName: $("#dialog-name"),
    dialogText: $("#dialog-text"),
    dialogIndicator: $("#dialog-indicator"),
    choices: $("#choices"),
    modal: $("#modal"),
    modalTitle: $("#modal-title"),
    modalBody: $("#modal-body"),
    modalClose: $("#modal-close"),
    endingTitle: $("#ending-title"),
    endingText: $("#ending-text"),
    endingNote: $("#ending-note"),
  };

  // ---- 心心 UI ---------------------------------------------------
  const HEART_PATH = "M12 21 C3 14.5, 1 9, 4 5.5 C6.5 3, 10 3, 12 6.5 C14 3, 17.5 3, 20 5.5 C23 9, 21 14.5, 12 21 Z";
  const HEART_SVG = {
    filled: `<svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 3px #ff78c8);"><path d="${HEART_PATH}" fill="#ff6db3" stroke="#ffd4ea" stroke-width="0.5"/></svg>`,
    empty:  `<svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path d="${HEART_PATH}" fill="none" stroke="#ffb4dc" stroke-width="1.4" opacity="0.75"/></svg>`
  };
  function renderHearts() {
    const total = 10;
    const filled = Math.round((state.affection / 100) * total);
    const hearts = [];
    for (let i = 0; i < total; i++) {
      hearts.push(i < filled ? HEART_SVG.filled : HEART_SVG.empty);
    }
    el.heartRow.innerHTML = hearts.join("");
    el.affectionNum.textContent = `${state.affection}/100`;
  }

  // ---- HUD 更新 --------------------------------------------------
  function setScene(cfg) {
    const bgChanged = cfg.bg && cfg.bg !== state.bg;
    if (cfg.bg) {
      state.bg = cfg.bg;
      el.sceneBg.className = "scene-bg " + cfg.bg;
    }
    if (cfg.place !== undefined) { state.place = cfg.place; el.place.textContent = cfg.place || "——"; }
    if (cfg.time !== undefined)  { state.time  = cfg.time;  el.time.textContent  = cfg.time  || "——"; }
    if (cfg.weather !== undefined){state.weather = cfg.weather; el.weather.textContent = cfg.weather || "——"; }
    if (cfg.charName !== undefined){state.charName = cfg.charName; el.affectionName.textContent = cfg.charName || "黄仁勋"; }
    if (cfg.mood && window.Sound) {
      state.mood = cfg.mood;
      window.Sound.bgm.play(cfg.mood);
    }
    if (bgChanged && window.Sound) {
      window.Sound.sfx.sceneTransition();
    }
  }

  function changeAffection(delta, reason) {
    state.affection = Math.max(0, Math.min(100, state.affection + delta));
    renderHearts();
    if (delta !== 0) {
      flashAffection(delta > 0 ? "up" : "down", delta);
      if (window.Sound) {
        if (delta > 0) window.Sound.sfx.affectionUp();
        else window.Sound.sfx.affectionDown();
      }
    }
  }

  function flashAffection(dir, delta) {
    const flash = document.createElement("div");
    flash.textContent = (delta > 0 ? "+" : "") + delta;
    flash.style.cssText = `
      position: absolute; left: 240px; top: 30px;
      color: ${dir === "up" ? "#ff7ac2" : "#8aa6ff"};
      font-size: 20px; font-weight: 700; z-index: 30;
      text-shadow: 0 0 12px ${dir === "up" ? "#ff7ac2" : "#8aa6ff"};
      pointer-events: none;
      animation: floatUp 1.4s ease-out forwards;
    `;
    el.gameScreen.appendChild(flash);
    setTimeout(() => flash.remove(), 1400);
  }
  // 动态注入 keyframe（在样式表外也能跑）
  const animStyle = document.createElement("style");
  animStyle.textContent = `@keyframes floatUp { 0% { opacity: 0; transform: translateY(0);} 20% { opacity: 1;} 100% { opacity: 0; transform: translateY(-48px);} }`;
  document.head.appendChild(animStyle);

  // ---- 打字机 ----------------------------------------------------
  function typeText(text, speaker, onDone) {
    clearTimeout(state.typingTimer);
    el.dialogName.textContent = speaker || "";
    el.dialogText.textContent = "";
    el.dialogIndicator.classList.add("hidden");
    state.typing = true;
    const speed = state.skip ? 2 : settings.textSpeed;
    let i = 0;

    function step() {
      if (!state.typing) return;
      const ch = text[i];
      el.dialogText.textContent = text.slice(0, ++i);
      // 打字声：只对非空白、非标点字符触发
      if (!state.skip && window.Sound && ch && !/[\s，。、！？「」『』…～:：;；—·\.\,\!\?]/.test(ch)) {
        window.Sound.sfx.type();
      }
      if (i < text.length) {
        state.typingTimer = setTimeout(step, speed);
      } else {
        state.typing = false;
        el.dialogIndicator.classList.remove("hidden");
        onDone && onDone();
      }
    }
    step();
  }

  function finishTyping() {
    if (!state.typing) return;
    state.typing = false;
    clearTimeout(state.typingTimer);
    const line = currentLine();
    if (line && line.text) el.dialogText.textContent = line.text;
    el.dialogIndicator.classList.remove("hidden");
  }

  // ---- 脚本 ------------------------------------------------------
  function currentScript() {
    return (window.GAME_SCRIPT && window.GAME_SCRIPT[state.scriptId]) || [];
  }
  function currentLine() {
    return currentScript()[state.index];
  }

  // ---- 推进 ------------------------------------------------------
  function next() {
    if (state.waitingChoice) return;
    if (state.typing) { finishTyping(); return; }

    state.index++;
    render();
  }

  function render() {
    const scr = currentScript();
    if (state.index >= scr.length) {
      // Script ended without explicit goto — title
      goTitle();
      return;
    }
    const line = scr[state.index];
    if (!line) { goTitle(); return; }

    // Cache "seen" (for skip mode)
    const key = `${state.scriptId}:${state.index}`;
    if (line.type === "text") state.seenKeys.add(key);

    handle(line);
  }

  function handle(line) {
    switch (line.type) {
      case "scene": {
        setScene(line);
        // immediate next
        state.index++;
        render();
        break;
      }
      case "text": {
        clearChoices();
        state.speaker = line.speaker || "";
        pushHistory(line);
        typeText(line.text, line.speaker, onTextDone);
        break;
      }
      case "narration": {
        clearChoices();
        state.speaker = "";
        pushHistory(line);
        typeText(line.text, "旁白", onTextDone);
        break;
      }
      case "choice": {
        clearChoices();
        showChoices(line.choices);
        break;
      }
      case "affection": {
        changeAffection(line.delta || 0, line.reason);
        state.index++;
        render();
        break;
      }
      case "flag": {
        state.flags[line.key] = line.value;
        state.index++;
        render();
        break;
      }
      case "goto": {
        state.scriptId = line.target;
        state.index = 0;
        render();
        break;
      }
      case "ending": {
        showEnding(line);
        break;
      }
      default:
        state.index++;
        render();
    }
  }

  function onTextDone() {
    if (state.skip) {
      clearTimeout(state.skipTimer);
      state.skipTimer = setTimeout(next, 30);
    } else if (state.auto) {
      clearTimeout(state.autoTimer);
      state.autoTimer = setTimeout(next, settings.autoWait);
    }
  }

  function pushHistory(line) {
    state.history.push({
      scriptId: state.scriptId,
      index: state.index,
      speaker: line.speaker || (line.type === "narration" ? "旁白" : ""),
      text: line.text || "",
      affection: state.affection,
    });
    if (state.history.length > 80) state.history.shift();
  }

  // ---- 选项 ------------------------------------------------------
  function showChoices(choices) {
    state.waitingChoice = true;
    el.dialogBox.style.opacity = "0.5";
    el.choices.innerHTML = "";
    choices.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "choice-btn";
      if (c.highlight) b.classList.add("highlighted");
      b.textContent = c.text;
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        chooseChoice(c);
      });
      el.choices.appendChild(b);
    });
  }
  function clearChoices() {
    el.choices.innerHTML = "";
    el.dialogBox.style.opacity = "1";
    state.waitingChoice = false;
  }
  function chooseChoice(c) {
    if (window.Sound) window.Sound.sfx.choose();
    clearChoices();
    if (typeof c.affection === "number") changeAffection(c.affection, c.reason);
    if (c.flag) state.flags[c.flag.key] = c.flag.value;
    if (c.goto) {
      state.scriptId = c.goto;
      state.index = 0;
    } else {
      state.index++;
    }
    render();
  }

  // ---- 存读档 ----------------------------------------------------
  const SAVE_PREFIX = "wtf_galgame_slot_";
  function saveSlot(i) {
    const payload = {
      scriptId: state.scriptId,
      index: state.index,
      affection: state.affection,
      flags: state.flags,
      place: state.place,
      time: state.time,
      weather: state.weather,
      bg: state.bg,
      charName: state.charName,
      savedAt: Date.now(),
      preview: el.dialogText.textContent.slice(0, 30),
      speaker: state.speaker || "旁白",
    };
    localStorage.setItem(SAVE_PREFIX + i, JSON.stringify(payload));
    renderSaveLoadModal(true);
    toast(`已存档到存档位 ${i + 1}`);
    if (window.Sound) window.Sound.sfx.save();
  }
  function loadSlot(i) {
    const raw = localStorage.getItem(SAVE_PREFIX + i);
    if (!raw) return;
    try {
      const p = JSON.parse(raw);
      state.scriptId = p.scriptId;
      state.index = p.index;
      state.affection = p.affection || 0;
      state.flags = p.flags || {};
      state.place = p.place || "";
      state.time = p.time || "";
      state.weather = p.weather || "";
      state.bg = p.bg || "scene-office-night";
      state.charName = p.charName || "黄仁勋";
      el.sceneBg.className = "scene-bg " + state.bg;
      el.place.textContent = state.place || "——";
      el.time.textContent = state.time || "——";
      el.weather.textContent = state.weather || "——";
      el.affectionName.textContent = state.charName;
      renderHearts();
      closeModal();
      switchScreen("game");
      render();
    } catch (e) { console.error(e); }
  }
  function slotInfo(i) {
    const raw = localStorage.getItem(SAVE_PREFIX + i);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function renderSaveLoadModal(isSave) {
    el.modalTitle.textContent = isSave ? "存档" : "读取";
    const SLOTS = 6;
    const container = document.createElement("div");
    container.className = "slot-grid";
    for (let i = 0; i < SLOTS; i++) {
      const info = slotInfo(i);
      const slot = document.createElement("button");
      slot.className = "slot";
      if (info) {
        const d = new Date(info.savedAt);
        slot.innerHTML = `
          <div class="slot-title">存档 ${i + 1} · 好感 ${info.affection || 0}</div>
          <div class="slot-meta">${info.speaker || "——"}：「${info.preview || ""}」</div>
          <div class="slot-meta">${d.toLocaleString("zh-CN")}</div>
        `;
      } else {
        slot.innerHTML = `<div class="slot-title">存档 ${i + 1}</div><div class="slot-empty">—— 空 ——</div>`;
      }
      slot.addEventListener("click", () => {
        if (isSave) saveSlot(i);
        else if (info) loadSlot(i);
      });
      container.appendChild(slot);
    }
    el.modalBody.innerHTML = "";
    el.modalBody.appendChild(container);
    el.modal.classList.remove("hidden");
  }

  function renderSettingsModal() {
    el.modalTitle.textContent = "设置";
    const snd = window.Sound ? window.Sound.getSettings() : { muted: false, sfxVolume: 0.55, bgmVolume: 0.18 };
    el.modalBody.innerHTML = `
      <div class="settings-row">
        <label>文字速度</label>
        <input type="range" min="5" max="80" value="${settings.textSpeed}" id="set-speed" />
        <span id="speed-val">${settings.textSpeed}ms</span>
      </div>
      <div class="settings-row">
        <label>自动模式间隔</label>
        <input type="range" min="400" max="4000" step="100" value="${settings.autoWait}" id="set-wait" />
        <span id="wait-val">${settings.autoWait}ms</span>
      </div>
      <div class="settings-row">
        <label>音效音量 SFX</label>
        <input type="range" min="0" max="100" value="${Math.round(snd.sfxVolume * 100)}" id="set-sfx" />
        <span id="sfx-val">${Math.round(snd.sfxVolume * 100)}%</span>
      </div>
      <div class="settings-row">
        <label>背景音乐 BGM</label>
        <input type="range" min="0" max="100" value="${Math.round(snd.bgmVolume * 100)}" id="set-bgm" />
        <span id="bgm-val">${Math.round(snd.bgmVolume * 100)}%</span>
      </div>
      <div class="settings-row">
        <label>静音</label>
        <button class="tool-btn ${snd.muted ? "active" : ""}" id="set-mute">${snd.muted ? "🔇 已静音" : "🔊 开启"}</button>
      </div>
      <div class="settings-row">
        <label>回到标题</label>
        <button class="tool-btn" id="go-title">返回标题画面</button>
      </div>
      <div class="settings-row">
        <label>清空所有存档</label>
        <button class="tool-btn" id="clear-saves">清除数据</button>
      </div>
    `;
    $("#set-speed").addEventListener("input", (e) => {
      settings.textSpeed = +e.target.value;
      $("#speed-val").textContent = settings.textSpeed + "ms";
      persistSettings();
    });
    $("#set-wait").addEventListener("input", (e) => {
      settings.autoWait = +e.target.value;
      $("#wait-val").textContent = settings.autoWait + "ms";
      persistSettings();
    });
    $("#set-sfx").addEventListener("input", (e) => {
      const v = +e.target.value / 100;
      window.Sound && window.Sound.setSfxVolume(v);
      $("#sfx-val").textContent = Math.round(v * 100) + "%";
      persistSettings();
    });
    $("#set-bgm").addEventListener("input", (e) => {
      const v = +e.target.value / 100;
      window.Sound && window.Sound.setBgmVolume(v);
      $("#bgm-val").textContent = Math.round(v * 100) + "%";
      persistSettings();
    });
    $("#set-mute").addEventListener("click", (e) => {
      if (!window.Sound) return;
      const cur = window.Sound.getSettings().muted;
      window.Sound.setMuted(!cur);
      e.target.classList.toggle("active", !cur);
      e.target.textContent = !cur ? "🔇 已静音" : "🔊 开启";
      persistSettings();
    });
    $("#go-title").addEventListener("click", () => { closeModal(); goTitle(); });
    $("#clear-saves").addEventListener("click", () => {
      if (!confirm("确认清空全部存档？该操作不可恢复")) return;
      for (let i = 0; i < 6; i++) localStorage.removeItem(SAVE_PREFIX + i);
      toast("存档已清空");
    });
    el.modal.classList.remove("hidden");
  }

  function renderMenuModal() {
    el.modalTitle.textContent = "菜单";
    el.modalBody.innerHTML = `
      <div class="menu-list">
        <button data-m="save">💾 保存游戏</button>
        <button data-m="load">📂 读取游戏</button>
        <button data-m="settings">⚙ 设置</button>
        <button data-m="history">📜 查看回忆</button>
        <button data-m="title">⌂ 返回标题</button>
      </div>
    `;
    el.modalBody.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        const m = b.dataset.m;
        if (m === "save") renderSaveLoadModal(true);
        else if (m === "load") renderSaveLoadModal(false);
        else if (m === "settings") renderSettingsModal();
        else if (m === "history") renderHistoryModal();
        else if (m === "title") { closeModal(); goTitle(); }
      });
    });
    el.modal.classList.remove("hidden");
  }

  function renderHistoryModal() {
    el.modalTitle.textContent = "回忆";
    const frag = document.createElement("div");
    frag.style.cssText = "max-height:60vh; overflow:auto; padding-right:6px;";
    const items = state.history.slice(-50).reverse();
    if (items.length === 0) {
      frag.innerHTML = "<p style='color:#ffd6ee; opacity:0.75;'>还没有任何回忆…</p>";
    } else {
      frag.innerHTML = items.map(h => `
        <div style="margin-bottom:10px; padding:8px 12px; background:rgba(40,15,55,0.4); border-left:2px solid #ff7ac2; border-radius:3px;">
          <div style="color:#ffb4dc; font-weight:700; letter-spacing:0.1em; margin-bottom:2px;">${h.speaker || "旁白"}</div>
          <div style="color:#fff5fb; font-size:14px;">${h.text}</div>
        </div>
      `).join("");
    }
    el.modalBody.innerHTML = "";
    el.modalBody.appendChild(frag);
    el.modal.classList.remove("hidden");
  }

  function renderAboutModal() {
    el.modalTitle.textContent = "关于本作";
    el.modalBody.innerHTML = `
      <div class="about-block">
        <h3>※ 与黄总的未来 ※</h3>
        <p>一部向经典日式恋爱冒险致敬的 Galgame Demo。玩家化身 NVIDIA 新晋工程师，一步步走进黄仁勋的内心。</p>
        <h3>操作</h3>
        <p>点击画面 / 空格：继续对话<br>回退：上一句<br>快进：加速略过<br>自动：自动播放<br>菜单：存档 / 读档 / 设置 / 回忆</p>
        <h3>提示</h3>
        <p>选项会影响好感度，不同好感度将解锁不同结局。<br>存档使用浏览器 localStorage 保存在本地。</p>
        <h3>免责声明</h3>
        <p>本作属同人创作，人物形象用于娱乐目的，不代表真实人物立场。</p>
      </div>
    `;
    el.modal.classList.remove("hidden");
  }

  function closeModal() {
    el.modal.classList.add("hidden");
  }

  function persistSettings() {
    const payload = { ...settings };
    if (window.Sound) payload.sound = window.Sound.getSettings();
    localStorage.setItem("wtf_galgame_settings", JSON.stringify(payload));
  }
  function loadPersisted() {
    try {
      const s = JSON.parse(localStorage.getItem("wtf_galgame_settings") || "null");
      if (s) {
        const { sound, ...rest } = s;
        Object.assign(settings, rest);
        if (sound && window.Sound) window.Sound.loadSettings(sound);
      }
    } catch {}
  }

  // ---- Toast -----------------------------------------------------
  function toast(msg) {
    const t = document.createElement("div");
    t.textContent = msg;
    t.style.cssText = `
      position: fixed; left: 50%; top: 40px; transform: translateX(-50%);
      padding: 10px 20px; z-index: 40;
      color: #fff; background: linear-gradient(90deg, rgba(220,80,160,0.92), rgba(150,50,140,0.92));
      border: 1px solid #ffb4dc; border-radius: 4px;
      box-shadow: 0 0 24px rgba(255,130,210,0.5);
      letter-spacing: 0.1em;
      animation: toastIn 0.3s ease;
    `;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1600);
  }

  // ---- 屏幕切换 --------------------------------------------------
  function switchScreen(name) {
    el.titleScreen.classList.remove("active");
    el.gameScreen.classList.remove("active");
    el.endingScreen.classList.remove("active");
    if (name === "title") el.titleScreen.classList.add("active");
    else if (name === "game") el.gameScreen.classList.add("active");
    else if (name === "ending") el.endingScreen.classList.add("active");
  }

  function goTitle() {
    state.auto = false; state.skip = false;
    clearTimeout(state.autoTimer); clearTimeout(state.skipTimer);
    document.querySelectorAll(".tool-btn").forEach(b => b.classList.remove("active"));
    switchScreen("title");
  }

  function startGame(scriptId) {
    scriptId = scriptId || "prologue";
    state.scriptId = scriptId;
    state.index = 0;
    state.affection = 0;
    state.flags = {};
    state.history = [];
    renderHearts();
    switchScreen("game");
    render();
  }

  function continueGame() {
    // find latest save
    let latest = null, latestIdx = -1;
    for (let i = 0; i < 6; i++) {
      const info = slotInfo(i);
      if (info && (!latest || info.savedAt > latest.savedAt)) { latest = info; latestIdx = i; }
    }
    if (latestIdx >= 0) loadSlot(latestIdx);
    else toast("暂无存档");
  }

  function showEnding(line) {
    el.endingTitle.textContent = line.title || "THE END";
    el.endingText.textContent = line.text || "";
    el.endingNote.textContent = line.note || `最终好感度：${state.affection}/100`;
    switchScreen("ending");
    if (window.Sound) {
      const kind = line.endingKind || (line.title && /TRUE|SECRET/i.test(line.title) ? "true"
                                       : line.title && /BAD/i.test(line.title) ? "bad"
                                       : "good");
      window.Sound.bgm.play("ending");
      if (kind === "true") window.Sound.sfx.endingTrue();
      else if (kind === "bad") window.Sound.sfx.endingBad();
      else window.Sound.sfx.endingGood();
    }
  }

  // ---- 事件绑定 --------------------------------------------------
  function bind() {
    // 首次用户交互时解锁 AudioContext 并启动标题 BGM
    const unlock = () => {
      if (window.Sound) {
        window.Sound.ensureCtx();
        window.Sound.resume();
        if (!state.bgmStarted) {
          state.bgmStarted = true;
          window.Sound.bgm.play("calm");
        }
      }
    };
    document.addEventListener("click", unlock, { once: false, capture: true });
    document.addEventListener("keydown", unlock, { once: false, capture: true });

    // Title menu
    document.querySelectorAll(".title-btn[data-action]").forEach(b => {
      b.addEventListener("click", () => {
        if (window.Sound) window.Sound.sfx.click();
        const a = b.dataset.action;
        if (a === "new-game") startGame("prologue");
        else if (a === "continue") continueGame();
        else if (a === "gallery") { renderAboutModal(); el.modalTitle.textContent = "CG 回廊"; el.modalBody.innerHTML = "<p style='color:#ffd6ee;'>（Demo 版本暂未解锁更多 CG，继续游戏以收集回忆吧～）</p>"; el.modal.classList.remove("hidden"); }
        else if (a === "about") renderAboutModal();
      });
    });

    // Dialog advance
    el.gameScreen.addEventListener("click", (e) => {
      if (e.target.closest(".tool-btn")) return;
      if (e.target.closest(".choice-btn")) return;
      if (e.target.closest(".hud")) return;
      if (e.target.closest("#modal")) return;
      next();
    });

    document.addEventListener("keydown", (e) => {
      if (!el.gameScreen.classList.contains("active")) return;
      if (!el.modal.classList.contains("hidden")) return;
      if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); next(); }
      else if (e.code === "Escape") renderMenuModal();
      else if (e.code === "ControlLeft" || e.code === "ControlRight") {
        if (!state.skip) { state.skip = true; toggleToolActive("skip", true); if (!state.typing && !state.waitingChoice) next(); }
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "ControlLeft" || e.code === "ControlRight") {
        state.skip = false;
        toggleToolActive("skip", false);
        clearTimeout(state.skipTimer);
      }
    });

    // Toolbar
    document.querySelectorAll(".tool-btn[data-tool]").forEach(b => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        if (window.Sound) window.Sound.sfx.click();
        const t = b.dataset.tool;
        if (t === "back") goBack();
        else if (t === "skip") {
          state.skip = !state.skip;
          toggleToolActive("skip", state.skip);
          if (state.skip) { if (!state.typing && !state.waitingChoice) next(); }
          else clearTimeout(state.skipTimer);
        }
        else if (t === "auto") {
          state.auto = !state.auto;
          toggleToolActive("auto", state.auto);
          if (state.auto && !state.typing && !state.waitingChoice) next();
          else clearTimeout(state.autoTimer);
        }
        else if (t === "menu") renderMenuModal();
        else if (t === "save") renderSaveLoadModal(true);
        else if (t === "load") renderSaveLoadModal(false);
        else if (t === "settings") renderSettingsModal();
      });
    });

    el.modalClose.addEventListener("click", closeModal);
    el.modal.addEventListener("click", (e) => { if (e.target === el.modal) closeModal(); });

    $("#ending-back").addEventListener("click", goTitle);
  }

  function toggleToolActive(name, on) {
    const b = document.querySelector(`.tool-btn[data-tool="${name}"]`);
    if (!b) return;
    b.classList.toggle("active", !!on);
  }

  function goBack() {
    if (state.history.length < 2) return;
    state.history.pop(); // remove current
    const prev = state.history[state.history.length - 1];
    if (!prev) return;
    state.scriptId = prev.scriptId;
    state.index = prev.index;
    state.affection = prev.affection || 0;
    renderHearts();
    render();
  }

  // ---- Boot ------------------------------------------------------
  function boot() {
    loadPersisted();
    renderHearts();
    bind();
    switchScreen("title");
  }

  window.addEventListener("DOMContentLoaded", boot);
})();
