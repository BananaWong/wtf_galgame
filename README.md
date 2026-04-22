# 与黄总的未来 · My Future with Jensen

一部向日式恋爱冒险游戏（Galgame）致敬的同人 Demo，玩家化身 NVIDIA 新晋工程师，和黄仁勋（老黄）一步步靠近彼此的故事。

> ⚠️ 免责声明：本作属同人创作，人物形象仅用于娱乐目的，不代表任何真实人物立场。

## 游戏特性

- 经典粉紫 Galgame UI：姓名框、好感度心心、天气/时间/地点信息、打字机对话
- 5 章剧情 + 3 种结局（TRUE / GOOD / WARM），由好感度和选项决定分支
- 存读档（6 格，localStorage 本地保存）
- 自动播放、快进（按住 Ctrl 或点击「快进」）、回退、回忆列表
- 文字速度 / 自动间隔可在「设置」中调节
- 纯静态网页，零依赖，不需要后端

## 运行方式

任意静态服务器都可以：

```bash
# 方式 A：Python
python3 -m http.server 8000

# 方式 B：Node
npx serve .

# 然后访问 http://localhost:8000
```

或直接双击 `index.html`（部分浏览器可能因本地文件协议限制 localStorage，仍推荐用本地服务器）。

## 部署到 Netlify

项目自带 `netlify.toml`，无需构建步骤，`publish = "."`：

**一键部署（推荐）**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bananawong/wtf_galgame)

**或手动操作**

- Netlify 后台 → *Add new site → Import from Git* → 选中本仓库 → 默认设置直接 Deploy
- Netlify CLI：`npm i -g netlify-cli && netlify deploy --prod --dir=.`
- 本地 zip 拖拽：把整个项目文件夹拖到 [app.netlify.com/drop](https://app.netlify.com/drop)

## 操作说明

| 操作 | 说明 |
| --- | --- |
| 点击画面 / 空格 / 回车 | 继续下一句对话 |
| 点击选项按钮 | 进行选择 |
| ⏮ 回退 | 回到上一句 |
| ⏩ 快进（或按住 Ctrl） | 快速跳过 |
| ▶ 自动 | 自动播放 |
| 💾 存档 / 📂 读取 | 六格存档 |
| ≡ 菜单 | 总菜单（含回忆） |
| ⚙ 设置 | 文字速度、自动间隔 |

## 文件结构

```
index.html   游戏页面结构
style.css    UI 样式（HUD、对话框、选项、标题、弹窗、结局）
script.js    游戏引擎（打字机、选项、分支、存读档、自动/快进/回退）
game.js      剧本脚本（GAME_SCRIPT 按场景 id 组织）
```

## 扩展剧本

打开 `game.js`，直接在 `window.GAME_SCRIPT` 对象里添加新场景：

```js
my_scene: [
  { type: "scene", place: "某个地方", time: "白天", weather: "晴", bg: "scene-cafe" },
  { type: "narration", text: "下雨的午后……" },
  { type: "text", speaker: "黄仁勋", text: "下一代 GPU 比你想象的更快。" },
  { type: "choice", choices: [
    { text: "选项 A", affection: +5, goto: "next_scene_a" },
    { text: "选项 B", affection: -3 }
  ]},
  { type: "ending", title: "END", text: "故事的结尾……" }
]
```

支持的 `type`：`scene` · `char` · `text` · `narration` · `choice` · `affection` · `flag` · `goto` · `ending`

内置可用 CSS 背景：`scene-office-night` · `scene-lobby` · `scene-gtc` · `scene-cafe` · `scene-rooftop` · `scene-confession`

## 图片素材（立绘 / 背景）

引擎支持表情与姿势切换，但**所有图片都是可选的** —— 缺失时自动回退到 CSS 占位。

素材放进 `assets/` 目录即可被自动加载，详细规格（格式、分辨率、表情清单、AI 出图 prompt）见 [`assets/README.md`](./assets/README.md)。

最小上手示例：

```js
{ type: "char", id: "jensen", expression: "smile", slot: "center", placeholder: true }
{ type: "text", speaker: "黄仁勋", expression: "laugh", text: "哈哈哈，说得好！" }
{ type: "scene", bgImage: "office_night.jpg", mood: "romantic" }  // 用图片背景
```

## 致敬

- 致敬经典 Galgame 的视觉语言：Key / Type-Moon / ∀
- 致敬那位从不脱下皮夹克的 CEO
