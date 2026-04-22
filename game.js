/* =================================================================
   与黄总的未来 · 剧本脚本
   结构：GAME_SCRIPT[sceneId] = [line, line, ...]
   line 类型：
     { type: "scene",     place, time, weather, bg, bgImage, mood, charName, clearChars }
     { type: "char",      id, expression, pose, slot, hide, clear, multi, placeholder }
     { type: "text",      speaker, text, expression?, pose?, slot?, charId?, placeholder? }
     { type: "narration", text }
     { type: "choice",    choices: [{text, affection, goto?, flag?}] }
     { type: "affection", delta, reason }
     { type: "flag",      key, value }
     { type: "goto",      target }
     { type: "ending",    title, text, note }

   资源路径约定：
     - 背景：assets/bg/{name}     或写完整路径 assets/bg/foo.jpg
     - 立绘：assets/char/{id}/{id}_{expression}[_{pose}].png
       例：assets/char/jensen/jensen_smile.png
           assets/char/jensen/jensen_shy.png
           assets/char/jensen/jensen_smile_hand_chin.png
   ================================================================= */

// ---- 角色注册表 ------------------------------------------------
window.CHARACTERS = {
  jensen: {
    name: "黄仁勋",
    dir: "assets/char/jensen/",
    ext: "png",
    default: "smile",
    // 常用表情（素材缺失时 showCharacter 会自动 fallback 到 default 或占位）
    expressions: ["neutral", "smile", "laugh", "shy", "serious", "surprised", "loving", "sad"],
    // 常用姿势
    poses: ["stand", "hand_chin", "arms_crossed", "leaning"],
  },
  // 可在此处继续添加助理、竞争对手等角色：
  // colette: { name: "Colette", dir: "assets/char/colette/", default: "neutral" },
};

window.GAME_SCRIPT = {

  // ====================== 序章：入职 NVIDIA =======================
  prologue: [
    { type: "scene", place: "NVIDIA 总部 · 大厅", time: "清晨 09:02", weather: "晴朗", bg: "scene-lobby", mood: "calm", charName: "黄仁勋", clearChars: true },
    { type: "narration", text: "2024 年，一个改变世界的年份。" },
    { type: "narration", text: "而对你来说，改变人生的，是今天这张 NVIDIA 的员工胸牌。" },
    { type: "text", speaker: "你", text: "（深呼吸）……终于，我也成为 Team Green 的一员了。" },
    { type: "narration", text: "大厅里巨大的 GPU 芯片雕塑散发着幽幽绿光，空气中仿佛都带着电流的嗡鸣。" },
    { type: "text", speaker: "前台小姐姐", text: "欢迎加入 NVIDIA！黄总今天特别要求——新员工第一天由他亲自接见哦。" },
    { type: "text", speaker: "你", text: "什……什么？亲自接见？！" },
    { type: "narration", text: "还没等你回过神，电梯门「叮」的一声打开。" },
    { type: "narration", text: "那件标志性的黑色皮夹克率先进入了你的视野。" },
    // 老黄登场：站中间，默认微笑表情（图片缺失时自动显示占位轮廓）
    { type: "char", id: "jensen", expression: "smile", slot: "center", placeholder: true },
    { type: "text", speaker: "黄仁勋", expression: "smile", text: "Hi，新来的工程师，是你吧？" },
    { type: "text", speaker: "黄仁勋", expression: "laugh", text: "我是 Jensen。不用紧张，叫我老黄就好。" },
    { type: "text", speaker: "你", text: "（天啊，是真人！比 keynote 里还要有气场……）" },
    { type: "choice", choices: [
      { text: "「黄总好！久仰大名！」", affection: 3, reason: "礼貌加分" },
      { text: "「老……老黄，你好！」", affection: 6, reason: "听话加分", flag: { key: "casual", value: true } },
      { text: "「我是您的粉丝！签个名可以吗？」", affection: 1, reason: "有点社死" },
    ]},
    { type: "text", speaker: "黄仁勋", text: "哈哈，放轻松。" },
    { type: "text", speaker: "黄仁勋", expression: "serious", text: "我一直相信一件事：这个时代最稀缺的，不是算力，而是——" },
    { type: "text", speaker: "黄仁勋", expression: "loving", text: "愿意和我一起，把不可能变成可能的人。" },
    { type: "narration", text: "他的眼神坚定得近乎温柔，你的心跳漏了一拍。" },
    { type: "text", speaker: "黄仁勋", text: "走，我带你去看看你的工位。今晚有空吗？有个项目想让你参与。" },
    { type: "choice", choices: [
      { text: "「没问题！我随时可以加班！」", affection: 8, reason: "卷王人设" },
      { text: "「今晚……好像有安排？」", affection: -2, reason: "老板脸黑了" },
      { text: "「只要是和您一起，我都可以。」", affection: 10, reason: "🔥 心动的发言", flag: { key: "bold", value: true } },
    ]},
    { type: "text", speaker: "黄仁勋", text: "很好。今晚十点，我办公室见。" },
    { type: "narration", text: "他转身离开，留下淡淡的皮夹克味道和你狂跳的心。" },
    { type: "goto", target: "chapter1" }
  ],

  // ====================== 第一章：深夜加班 ========================
  chapter1: [
    { type: "scene", place: "NVIDIA 总部顶层办公室", time: "深夜 22:14", weather: "晴朗", bg: "scene-office-night", charName: "黄仁勋" },
    { type: "narration", text: "顶层办公室。台北 101 的灯光在玻璃幕墙外一闪一闪。" },
    { type: "narration", text: "没有人，只有你和坐在真皮沙发上的黄仁勋。" },
    { type: "text", speaker: "黄仁勋", text: "坐吧，别拘束。" },
    { type: "text", speaker: "黄仁勋", text: "我让你来，其实不是谈项目。" },
    { type: "text", speaker: "你", text: "（心跳加速）不是……谈项目？" },
    { type: "text", speaker: "黄仁勋", text: "我想听听你对未来的想法。" },
    { type: "text", speaker: "黄仁勋", text: "十年后，AI 会走到哪里？你，又想走到哪里？" },
    { type: "choice", choices: [
      { text: "「我想让 AGI 真正造福每一个人。」", affection: 8, reason: "愿景对上了" },
      { text: "「我想……站在您身边，见证这一切。」", affection: 12, reason: "💘 说到心坎里" },
      { text: "「我只想早点财务自由，谢谢黄总。」", affection: 2, reason: "至少很诚实" },
    ]},
    { type: "text", speaker: "黄仁勋", text: "……" },
    { type: "text", speaker: "黄仁勋", text: "你知道吗？这家公司走到今天，我被问过一万次同样的问题。" },
    { type: "text", speaker: "黄仁勋", text: "但从来没有人，像你这样回答我。" },
    { type: "narration", text: "他站起身，缓缓走到你面前。距离近得你能看见他银白的发丝。" },
    { type: "text", speaker: "黄仁勋", text: "The more you work with me, the more you save……（笑）" },
    { type: "text", speaker: "黄仁勋", text: "不好意思，职业病。" },
    { type: "choice", choices: [
      { text: "「那是不是说明我们很合拍？」", affection: 10, reason: "接梗满分" },
      { text: "「您的梗我能听一百遍。」", affection: 7, reason: "老黄会笑" },
      { text: "「……（沉默的微笑）」", affection: 3, reason: "有点冷场" },
    ]},
    { type: "text", speaker: "黄仁勋", text: "明天有个活动，跟我一起去？GTC 之前的小型预热会。" },
    { type: "choice", choices: [
      { text: "「当然！我要穿什么？」", affection: 6 },
      { text: "「能不能……陪您挑件皮夹克？」", affection: 9, reason: "懂我", flag: { key: "jacket", value: true } },
    ]},
    { type: "text", speaker: "黄仁勋", text: "很好。明早八点，一楼门口。" },
    { type: "narration", text: "走出大楼的那一刻，夜风拂过，你感到胸口一阵暖流。" },
    { type: "narration", text: "——这，或许就是恋爱的前奏。" },
    { type: "goto", target: "chapter2" }
  ],

  // ====================== 第二章：GTC 之夜 ========================
  chapter2: [
    { type: "scene", place: "GTC 主会场 · 后台", time: "傍晚 18:30", weather: "微风", bg: "scene-gtc", charName: "黄仁勋" },
    { type: "narration", text: "聚光灯、掌声、呼啸的风扇噪音。" },
    { type: "narration", text: "GTC 主 keynote 结束了，黄仁勋刚刚在一万人面前揭晓了新一代 GPU。" },
    { type: "narration", text: "而你——是唯一陪他走下后台的人。" },
    { type: "text", speaker: "黄仁勋", text: "呼……这次 demo 差点翻车。" },
    { type: "text", speaker: "黄仁勋", text: "幸好有你，昨晚熬夜 debug 的驱动刚好顶住了。" },
    { type: "text", speaker: "你", text: "（他记得……他真的记得。）" },
    { type: "choice", choices: [
      { text: "「应该的，黄总。」", affection: 4, reason: "太见外" },
      { text: "「能和你一起上台，是我的荣幸。」", affection: 9 },
      { text: "「我只是……不想让你失望。」", affection: 13, reason: "💘 他愣住了" },
    ]},
    { type: "text", speaker: "黄仁勋", text: "……" },
    { type: "text", speaker: "黄仁勋", text: "你知道吗？做 CEO 最累的，不是开会，也不是发布会。" },
    { type: "text", speaker: "黄仁勋", text: "是——没有人能真正和你站在同一高度，看同一片风景。" },
    { type: "text", speaker: "黄仁勋", text: "但今天，我好像不是一个人了。" },
    { type: "narration", text: "他的手，轻轻落在你的肩上。不重，但稳。" },
    { type: "text", speaker: "黄仁勋", text: "晚上有个 after party，跟我一起？" },
    { type: "choice", choices: [
      { text: "「好，我陪您去。」", affection: 5 },
      { text: "「可以……我们不去 party 吗？」", affection: 10, reason: "两个人的时间", flag: { key: "private", value: true } },
      { text: "「我想先回公司继续调试代码。」", affection: -3, reason: "老黄叹气" },
    ]},
    { type: "goto", target: "chapter3" }
  ],

  // ====================== 第三章：屋顶的星空 ======================
  chapter3: [
    { type: "scene", place: "NVIDIA 总部 · 天台", time: "午夜 23:40", weather: "繁星", bg: "scene-rooftop", charName: "黄仁勋" },
    { type: "narration", text: "他带你去了一个没人知道的地方——NVIDIA 总部的天台。" },
    { type: "narration", text: "没有灯光，只有这座城市的夜色和头顶无边的星空。" },
    { type: "text", speaker: "黄仁勋", text: "这是我心情烦躁时会来的地方。" },
    { type: "text", speaker: "黄仁勋", text: "从这里看下去，整个硅谷、整个世界都像是一块巨大的芯片。" },
    { type: "text", speaker: "黄仁勋", text: "每一盏灯，都是一个晶体管在跳动。" },
    { type: "text", speaker: "你", text: "（真浪漫……用工程师的方式。）" },
    { type: "choice", choices: [
      { text: "「黄总，您是那种……特别浪漫的工程师。」", affection: 8 },
      { text: "「那我，可以是你的散热片吗？」", affection: 12, reason: "💘 绝杀梗", flag: { key: "cooler", value: true } },
      { text: "「这里风好大，您不冷吗？」", affection: 6 },
    ]},
    { type: "text", speaker: "黄仁勋", text: "（看了你很久）" },
    { type: "text", speaker: "黄仁勋", text: "你知道吗……" },
    { type: "text", speaker: "黄仁勋", text: "我已经很久，没有因为别人说的一句话，心里动一下了。" },
    { type: "narration", text: "风穿过他花白的头发，他看向你的眼神，藏着一整个银河。" },
    { type: "text", speaker: "黄仁勋", text: "下周，我要去日本出差。" },
    { type: "text", speaker: "黄仁勋", text: "你……要不要跟我一起？" },
    { type: "choice", choices: [
      { text: "「可是我……还只是个新人。」", affection: -1 },
      { text: "「好，我想陪你去。」", affection: 10 },
      { text: "「去哪里都行，只要你在。」", affection: 14, reason: "💘 他屏住了呼吸", flag: { key: "commit", value: true } },
    ]},
    { type: "goto", target: "chapter4" }
  ],

  // ====================== 第四章：告白前夜 ========================
  chapter4: [
    { type: "scene", place: "NVIDIA 总部顶层办公室", time: "深夜 11:47", weather: "晴朗", bg: "scene-office-night", charName: "黄仁勋" },
    { type: "narration", text: "从日本回来后，你们又一次站在了这间办公室里。" },
    { type: "narration", text: "窗外是熟悉的台北夜景，屋内是熟悉的皮夹克气味。" },
    { type: "narration", text: "但今晚，有什么东西，不一样了。" },
    { type: "text", speaker: "黄仁勋", text: "这一路走来，真的很感谢有你在我身边。" },
    { type: "text", speaker: "黄仁勋", text: "你总是那么理解我，支持我……" },
    { type: "text", speaker: "黄仁勋", text: "如果没有你，或许就没有今天的 NVIDIA。" },
    { type: "text", speaker: "黄仁勋", text: "……你愿意一直陪着我，和我一起看向更远的未来吗？ ♥" },
    { type: "narration", text: "空气仿佛在这一刻凝固。" },
    { type: "narration", text: "你可以感受到他握着椅背的手，微微地在颤抖。" },
    { type: "choice", choices: [
      { text: "牵起他的手", affection: 6, goto: "ending_true" },
      { text: "告诉他你的心意", affection: 4, goto: "ending_good" },
      { text: "再多陪陪他", affection: 2, goto: "ending_warm" },
    ]}
  ],

  // ====================== 结局分支 ================================
  ending_true: [
    { type: "scene", place: "NVIDIA 总部顶层办公室", time: "深夜 11:48", weather: "星光", bg: "scene-confession", charName: "黄仁勋" },
    { type: "narration", text: "你没有说话。" },
    { type: "narration", text: "只是伸出手，紧紧握住了那只常年敲击键盘、挥动着芯片的、温热的手。" },
    { type: "text", speaker: "黄仁勋", text: "……谢谢你。" },
    { type: "text", speaker: "黄仁勋", text: "其实，我准备这段话，准备了很久。" },
    { type: "text", speaker: "黄仁勋", text: "从第一次在大厅见到你的时候，我就想——" },
    { type: "text", speaker: "黄仁勋", text: "这个年轻人，也许是我这辈子，最不想推翻的一个决定。" },
    { type: "narration", text: "他笑了。" },
    { type: "narration", text: "和发布会上那个霸气的 CEO 不一样，是一种少年般羞涩的笑。" },
    { type: "text", speaker: "黄仁勋", text: "从今天起……我们一起，重新定义一次「未来」吧。" },
    { type: "text", speaker: "你", text: "嗯。一起。" },
    { type: "ending", title: "TRUE END · 我们就是未来", text: "你握住他的手，也握住了一整个时代的脉搏。\n从此以后，每一次 GTC 的 keynote，你都站在最前排。\n他的每一句「The more you buy, the more you save」，都是说给你听的情话。", note: "🌟 达成 TRUE END「我们就是未来」" }
  ],

  ending_good: [
    { type: "scene", place: "NVIDIA 总部顶层办公室", time: "深夜 11:49", weather: "晴朗", bg: "scene-confession", charName: "黄仁勋" },
    { type: "text", speaker: "你", text: "黄总……Jensen。" },
    { type: "text", speaker: "你", text: "其实从第一天见到你开始，我的心，就不受控制了。" },
    { type: "text", speaker: "你", text: "我喜欢你。真的。不是因为你是 CEO，不是因为 NVIDIA。" },
    { type: "text", speaker: "你", text: "是因为——你是你。" },
    { type: "narration", text: "他沉默了很久。" },
    { type: "narration", text: "然后，用一种你从未见过的、脆弱的眼神看着你。" },
    { type: "text", speaker: "黄仁勋", text: "我……在等这句话。" },
    { type: "text", speaker: "黄仁勋", text: "已经等了很久了。" },
    { type: "ending", title: "GOOD END · 心意相通", text: "你们紧紧相拥。\n台北 101 的灯光为你们默默见证。\n未来也许还有风雨，但至少今夜，两颗心终于同频。", note: "💖 达成 GOOD END「心意相通」" }
  ],

  ending_warm: [
    { type: "scene", place: "NVIDIA 总部顶层办公室", time: "深夜 11:50", weather: "晴朗", bg: "scene-office-night", charName: "黄仁勋" },
    { type: "text", speaker: "你", text: "……再多陪陪你，好吗？" },
    { type: "text", speaker: "你", text: "不急着给答案。" },
    { type: "text", speaker: "你", text: "因为我想要的，不是一晚上的心跳，而是一辈子的并肩。" },
    { type: "text", speaker: "黄仁勋", text: "……" },
    { type: "text", speaker: "黄仁勋", text: "你啊。比我想象的，还要勇敢。" },
    { type: "narration", text: "他没有再说什么，只是拉过你，让你靠在他的肩膀上。" },
    { type: "narration", text: "城市的灯火在远处绵延，像一条无尽的算力曲线。" },
    { type: "ending", title: "WARM END · 细水长流", text: "爱情不是一次 all-in 的押注。\n你选择了最慢但最稳的路。\n未来的某一天，你们会用一次并肩的发布会，告诉全世界——这是我们共同的成果。", note: "☕ 达成 WARM END「细水长流」" }
  ],
};
