# 素材目录说明

引擎会从这里按约定自动加载图片。所有图片都是**可选的** —— 缺失时自动回退到 CSS 占位效果，游戏仍可玩。

## 目录结构

```
assets/
├── bg/                    ← 背景图
│   ├── office_night.jpg
│   ├── lobby.jpg
│   ├── rooftop.jpg
│   └── ...
└── char/                  ← 人物立绘
    └── jensen/
        ├── jensen_smile.png
        ├── jensen_shy.png
        ├── jensen_serious.png
        ├── jensen_laugh.png
        ├── jensen_loving.png
        ├── jensen_surprised.png
        └── jensen_smile_hand_chin.png   ← 可选带 pose 后缀
```

---

## 📐 背景图规格（Background）

| 项目 | 推荐值 | 备注 |
|---|---|---|
| **格式** | `.jpg` 优先，`.webp` 更小 | 不需要透明，JPG 压缩率最高 |
| **分辨率** | **1920×1080**（16:9） | 最低 1600×900，高清可到 2560×1440 |
| **文件大小** | **< 400 KB** 理想，< 800 KB 可接受 | 背景图是最大性能开销，务必压缩 |
| **压缩工具** | [Squoosh](https://squoosh.app) / [TinyJPG](https://tinyjpg.com) / `cwebp` | 建议用 WebP，quality=80 |
| **重点构图** | 画面中心留空，人物立绘会占中间 50%–60% | 重要元素放两侧 / 顶部 |
| **色调** | 略暗 / 加暗角，防止人物"被吞" | 立绘会盖在 vignette 之上 |

**命名建议**：`场景_时间.jpg`，比如 `office_night.jpg` / `cafe_afternoon.jpg` / `rooftop_dawn.jpg`

---

## 🧍 立绘规格（Character Sprite）

| 项目 | 推荐值 | 备注 |
|---|---|---|
| **格式** | `.png`（**必须**透明背景） | 或 `.webp` with alpha |
| **画布分辨率** | **1080×1620**（2:3 纵向），高清可到 1440×2160 | 太大的话用 TinyPNG 压缩 |
| **人物占比** | 约占画布 **75%–90%**，**底部贴齐画布底边** | 顶部到头顶留 10–15% 空白 |
| **视角/裁切** | 半身（腰部以上）最常用；全身更有气势；头像特写适合告白 | 剧情高潮可临时切半身 |
| **屏幕显示高度** | 引擎默认占屏高 **88%**，中央或左/右 | 三槽位自动对齐底部 |
| **文件大小** | **< 300 KB** 每张（透明 PNG 要主动压缩） | `pngquant -q 70-85` 效果极佳 |
| **边缘处理** | 羽化 1–2px，避免锯齿 | 透明通道里有轻微过渡比硬切更自然 |
| **光照方向** | 所有表情保持一致的主光源（例如 45° 左上） | 换表情时不要"换光" |

### 命名规则（**必须严格遵守**）

```
{charId}_{expression}[_{pose}].{ext}
```

- `charId`：在 `game.js` 的 `window.CHARACTERS` 里注册的 id，比如 `jensen`
- `expression`：表情名（见下方清单）
- `pose`：可选的姿势名（见下方清单）
- `ext`：默认 `png`

例：
- `jensen_smile.png` — 默认微笑
- `jensen_shy.png` — 害羞
- `jensen_smile_hand_chin.png` — 微笑 + 手撑下巴（截图里的招牌姿势）

---

## 😊 表情清单（建议最少画 6 个）

| 表情 id | 中文 | 使用场景 | 优先级 |
|---|---|---|---|
| `smile` | 温柔微笑 | **默认表情**，大部分日常对话 | ⭐⭐⭐ 必做 |
| `laugh` | 灿烂笑 / 大笑 | 开玩笑、被梗戳中 | ⭐⭐⭐ 必做 |
| `shy` | 害羞 / 脸颊微红 | 被夸、心动瞬间 | ⭐⭐⭐ 必做 |
| `serious` | 严肃 / 微皱眉 | 谈工作、理念、未来 | ⭐⭐⭐ 必做 |
| `surprised` | 惊讶 / 瞪眼 | 意外、被表白 | ⭐⭐ 推荐 |
| `loving` | 深情 / 专注凝视 | 告白、关键情感戏 | ⭐⭐ 推荐 |
| `sad` | 难过 / 眼神低垂 | 回忆艰难创业期 | ⭐ 可选 |
| `neutral` | 无表情 / 常态 | 旁白配图用 | ⭐ 可选 |

> **最小可行套装**：`smile / laugh / shy / serious` 四张就足够跑完整个 demo。

---

## 🧑‍🤝‍🧑 姿势清单（可选，画了更有电影感）

| pose id | 描述 | 用途 |
|---|---|---|
| `stand` | 默认站立正面 | 默认值（文件名可省略） |
| `hand_chin` | 手撑下巴 / 倚靠思考 | 就是截图那招牌姿势 |
| `arms_crossed` | 抱胸 | 严肃 / 强势 |
| `leaning` | 倚靠窗/桌 | 深夜办公室戏 |
| `turning` | 回眸半转身 | 离场 / 告别 |

姿势不写时默认 `stand`，文件名里也不需要带 `_stand` 后缀。

---

## 🎨 AI 出图 Prompt 参考

### Midjourney（Niji 6，日系 galgame 风）

**立绘（jensen_smile）**：
```
charming male CEO, silver gray hair, round glasses, black leather jacket, warm gentle smile,
upper body portrait, anime visual novel character art, transparent background,
soft cinematic lighting from upper left, detailed face, half body,
--ar 2:3 --niji 6 --style expressive
```

把 `warm gentle smile` 替换成对应表情：
- `shy`：`shy expression, light blush on cheeks, looking away slightly`
- `serious`：`serious expression, slight frown, determined eyes`
- `laugh`：`laughing with eyes closed, hand near mouth`
- `surprised`：`surprised expression, wide eyes, slightly open mouth`
- `loving`：`loving tender gaze, soft eyes, slight smile, looking at viewer`

**背景（office_night）**：
```
NVIDIA-style executive office at night, floor-to-ceiling windows, Taipei 101 city lights outside,
warm ambient lamp, leather sofa, GPU display case, cinematic wide shot, no characters,
visual novel background, soft vignette, --ar 16:9 --niji 6
```

### Stable Diffusion（本地 / WebUI）

**立绘**：
```
masterpiece, best quality, (visual novel character:1.2), (transparent background:1.3),
silver hair male, glasses, black leather jacket, (gentle smile:1.15),
upper body, looking at viewer, soft lighting, anime style,
Negative: lowres, watermark, text, blurry, extra fingers, realistic photo
```

推荐模型：`anything-v5`、`counterfeit-v3`、`hassaku`、`nijiJourney` 风格 LoRA。

### 透明背景小技巧

- Midjourney：在 prompt 里加 `transparent background` 效果一般，建议用 `remove.bg` / `Photoshop` 做后处理
- SD：装 `rembg` 或 `ABG_extension` 插件，一键抠图
- 大部分 AI 生图都**不能直接出 PNG 透明**，都需要后处理一步

---

## 🔧 快速验证

1. 把一张测试图命名为 `assets/char/jensen/jensen_smile.png`
2. 启动游戏，开场老黄登场时应该就能看到你的图片
3. 如果图路径错了，会回退到 CSS 占位轮廓并在 console 打印 `背景图加载失败：...`

---

## 📜 版权友好建议

- 用 AI 生图时，建议**不要 prompt 真人名字**（老黄、Jensen Huang 等）
- 用 "CEO with silver hair and leather jacket" 这类特征描述就够 galgame 识别度
- 公开发布时考虑把角色更名为 "J 总" / "Jen Sung" 等虚构名避免肖像权问题
