/* =================================================================
   与黄总的未来 · 剧本脚本 v2
   章节：序章 → 深夜加班 → 咖啡馆 → 董事会危机 → GTC debug
         → GTC 发布夜 → 东京出差 → 屋顶星空 → 告白
   结局：TRUE / GOOD / WARM / BAD / SECRET
   ================================================================= */

window.CHARACTERS = {
  jensen: {
    name: "黄仁勋",
    dir: "assets/char/jensen/",
    ext: "png",
    default: "smile",
    expressions: ["neutral","smile","laugh","shy","serious","surprised","loving","sad","thinking","proud"],
    poses: ["stand","hand_chin","arms_crossed","leaning","turning"],
  },
  colette: {
    name: "Colette",
    dir: "assets/char/colette/",
    ext: "png",
    default: "smile",
    expressions: ["smile","serious","surprised","cold","warm"],
  },
  marcus: {
    name: "Marcus",
    dir: "assets/char/marcus/",
    ext: "png",
    default: "serious",
    expressions: ["serious","smile","scheming","cold"],
  },
};

window.GAME_SCRIPT = {

/* ================================================================
   序章：入职第一天
   ================================================================ */
prologue: [
  /* —— 入职前夜 · 内心独白 —— */
  { type:"scene", place:"圣何塞 · 出租公寓", time:"凌晨 03:14", weather:"夜雨",
    bg:"scene-cafe", mood:"calm", charName:"黄仁勋", clearChars:true },

  { type:"narration", text:"——入职前一夜。" },
  { type:"narration", text:"你坐在出租公寓的飘窗上，没开灯。\n窗外的街灯被雨水拉成长长一条。" },
  { type:"narration", text:"明天的衬衫熨好了，挂在衣柜门上。\n胸牌还没发，但 offer letter 已经被你重读过二十几遍。" },
  { type:"narration", text:"……NVIDIA。" },
  { type:"narration", text:"硕士答辩那天，导师转过来一个链接——他在 GTC 上的 keynote。\n你看了三个小时。第二天就跟室友说：「我要去那家公司。」" },
  { type:"narration", text:"室友笑你：「人家那是天梯，你梯子都没搭到一半。」" },
  { type:"narration", text:"……六年后。\n你真的搭上了。" },
  { type:"text", speaker:"你", text:"……明天就要见到他了。" },
  { type:"narration", text:"公寓太安静，自己的心跳都听得见。\n明天只是一次普通的入职——你这样告诉自己。\n但你知道这个「普通」是骗自己的。" },
  { type:"narration", text:"窗外的雨停的时候，天快亮了。\n你才睡过去。" },

  /* —— 入职日 —— */
  { type:"scene", place:"NVIDIA 总部 · 大厅", time:"清晨 09:02", weather:"晴朗",
    bg:"scene-lobby", mood:"calm" },

  { type:"narration", text:"2024 年，硅谷的春天。空气里有栀子花的味道。" },
  { type:"narration", text:"你攥着那张绿色胸牌，第一百次确认了上面的名字。" },
  { type:"text", speaker:"你", text:"（深呼吸）……今天开始，我就是 Team Green 的一员了。" },
  { type:"narration", text:"大厅里那块巨大的 GPU 芯片装置发着幽幽的绿光。" },
  { type:"narration", text:"墙上是公司的时间轴：\n1993 — 创立。\n1999 — IPO。\n2006 — CUDA。\n2016 — DGX-1。\n2024 — ——\n（空着）" },
  { type:"narration", text:"你在那条时间轴下面站了一会儿。\n2024 年那格是空的，像一个还没写的标题。" },
  { type:"text", speaker:"前台小姐姐", text:"欢迎加入 NVIDIA！请问是新入职的工程师吗？" },
  { type:"text", speaker:"你", text:"是的，今天第一天报到。" },
  { type:"text", speaker:"前台小姐姐", text:"哦！你就是那位……黄总特别点名要见的新人？" },
  { type:"text", speaker:"你", text:"什……什么？他……亲自见？" },
  { type:"text", speaker:"前台小姐姐", text:"（压低声音）这可很少见哦。我入职三年，黄总连我名字都不一定记得。" },

  { type:"narration", text:"你还没消化完这个消息，电梯「叮」一声开了。" },
  { type:"narration", text:"那件皮夹克——先一步走出来。" },
  { type:"char", id:"jensen", expression:"smile", pose:"stand", slot:"center", placeholder:true },

  { type:"text", speaker:"黄仁勋", expression:"smile", text:"Hey，新来的工程师——是你吧？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh", text:"我是 Jensen。平时叫我老黄就好，不用 Mr. Huang，那是我爸。" },
  { type:"text", speaker:"你", text:"（心跳……他真的站在我面前……）" },

  { type:"choice", choices:[
    { text:"「黄总好！我早就仰慕您了！」",       affection:3 },
    { text:"「老……老黄好！」",                   affection:7, flag:{key:"casual",value:true} },
    { text:"「您好，我是……（紧张到忘了名字）」", affection:4 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"laugh", text:"哈哈哈，放松。这不是面试了，你已经过了。" },
  { type:"text", speaker:"黄仁勋", expression:"serious", pose:"hand_chin",
    text:"我想亲自见你，是因为你的 paper 我读了。\n关于稀疏注意力的那篇——有一个推导，让我想了整整一个晚上。" },
  { type:"text", speaker:"你", text:"（……他读了我的论文？！）那……那个推导其实还有点 bug——" },
  { type:"text", speaker:"黄仁勋", expression:"smile", text:"我知道。但 bug 的方向是对的。\n这比写出完美但毫无冒险的东西，要有意思多了。" },

  { type:"narration", text:"他说这话的时候没什么架子。\n眼神不像是在评估你，更像是——发现了一个同类。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"我这一行做了三十年，越做越觉得：\n这个时代最稀缺的，不是算力，不是数据——\n是愿意把「不可能」当成 spec 来写的人。" },
  { type:"text", speaker:"你", text:"……（这话，刚好戳中你）" },

  { type:"choice", choices:[
    { text:"「那……我能当您的 backup 吗？」", affection:12, flag:{key:"bold",value:true} },
    { text:"「我愿意写。」",                  affection:9  },
    { text:"「……我尽量不让它 crash。」",       affection:6  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"哈！好久没人这样回答我了。\n走，我带你去看工位。今晚十点有空吗？" },
  { type:"text", speaker:"你", text:"今晚？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"有个方向想跟你聊聊。不是 meeting，就是……聊聊。" },

  { type:"choice", choices:[
    { text:"「没问题，我随时恭候。」",         affection:5 },
    { text:"「好，只要是跟您，我都可以。」",   affection:10, flag:{key:"commit_early",value:true} },
    { text:"「今晚……要不要改个时间？」",       affection:-3 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"smile", text:"好。顶楼，十点。别迟到。" },
  { type:"narration", text:"他转身。\n皮夹克的背影消失进走廊。" },
  { type:"narration", text:"你在大厅里站了很久。\n胸口像有一颗 GPU 在跑——发热，还没过载。" },
  { type:"goto", target:"chapter1" },
],

/* ================================================================
   第一章：深夜加班
   ================================================================ */
chapter1: [
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 22:08", weather:"晴朗",
    bg:"scene-office-night", mood:"calm", clearChars:true },
  { type:"char", id:"jensen", expression:"thinking", pose:"hand_chin", slot:"center", placeholder:true },

  { type:"narration", text:"台北 101 的灯光在落地窗外一闪一闪。\n整栋楼好像只剩这一间还亮着。" },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"来了。坐。\n咖啡还是茶？" },
  { type:"text", speaker:"你", text:"……茶就好。谢谢。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（自己倒了一杯乌龙）台湾高山茶。\n我每次回来都带一点。" },
  { type:"narration", text:"杯子有点烫手。" },

  /* —— 进入正题前的小铺垫 —— */
  { type:"narration", text:"办公室里没有多余的家具。\n一张大书桌，一张沙发，一个旧式的台灯。\n靠墙立着一个玻璃柜，里面整整齐齐摆着一排芯片——每一颗下面都有标签。" },
  { type:"text", speaker:"你", text:"（指着柜子）……这些是？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"我们每一代产品的第一颗。\n从 1995 年的 NV1 到去年的 H100。" },
  { type:"text", speaker:"你", text:"……NV1 还在。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"NV1 是个失败品。\n但失败品也是历史的一部分。\n你不留着它，下一次就还会犯同样的错。" },

  { type:"choice", choices:[
    { text:"「这句话能写进我办公桌上吗？」",   affection:7  },
    { text:"「您把失败品摆在最显眼的位置——这才是真正的勇气。」", affection:11, flag:{key:"observed_failure",value:true} },
    { text:"「您每天看着 NV1 工作？」",         affection:6  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"（声音很轻）每天。\n它提醒我——这家公司从来没保险过。" },
  { type:"narration", text:"他的目光从玻璃柜慢慢移回你身上。\n那一柜子芯片，看起来不像奖杯，更像他自己留给自己的提醒。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"我想问你一个问题。不是技术问题。" },
  { type:"text", speaker:"你", text:"请说。" },
  { type:"text", speaker:"黄仁勋", expression:"thinking", pose:"hand_chin",
    text:"假设你知道一件事十年后一定会发生。\n但在那之前——你要扛十年的质疑，十年的嘲笑，十年的自我怀疑。\n你做不做？" },

  { type:"narration", text:"……你一时不知道怎么答。" },
  { type:"narration", text:"窗外的台北，安静得像在等你开口。" },

  { type:"choice", choices:[
    { text:"「我会做。哪怕只有 1% 的人相信我。」", affection:10 },
    { text:"「……您经历过这些吗？」",               affection:8  },
    { text:"「能问问您当初是怎么熬过来的吗？」",   affection:12, flag:{key:"dennys_unlocked",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"1993 年。NVIDIA 刚开张那会儿。\n我们做的第一款芯片，砸了。" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"我跟所有员工说——钱只够再撑几个月。\n有人哭，有人第二天就走了。\n我没回家，去了路口一家 Denny's，坐了很久。" },
  { type:"text", speaker:"你", text:"……Denny's？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"二十四小时营业，没人赶。\n我点了份薯条，坐了五个小时。\n出来的时候我想通了一件事——\n失败不是终点，是入场费。" },
  { type:"flag", key:"dennys", value:true },

  { type:"narration", text:"他说得平静，像在讲别人的事。\n你听得不平静。" },

  /* —— 中段：谈论文 —— */
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"说回你。你今天入职，我真正想说的是：\n这里不是让你来证明自己的地方——是让你来改变世界的地方。\n有区别。" },
  { type:"text", speaker:"你", text:"……我明白。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"好。那我们谈正事。" },
  { type:"narration", text:"他从抽屉里抽出一摞纸，啪一声放在桌上。\n你的论文。每一页都被绿色荧光笔标得满满的。" },
  { type:"text", speaker:"你", text:"……这是？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"我打了三份。\n一份我自己留着，一份给研究院的 Bill。\n这一份——" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"今晚带回去看。\n你自己的几个假设，其实还可以再大胆一倍。" },
  { type:"text", speaker:"你", text:"（接过来，发现某一页贴了一张便利贴：「这一段假设保守了。问 X。」）" },
  { type:"text", speaker:"你", text:"……X 是我吗？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（喝了一口茶）\n是的。" },

  { type:"choice", choices:[
    { text:"「您什么时候读完的？」",                 affection:7  },
    { text:"「……这是我读过的最认真的批注。」",     affection:10, flag:{key:"paper_read",value:true} },
    { text:"「我明天就把假设放大两倍重跑。」",     affection:11 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"两倍可能太激进。\n（笑）但我喜欢这个态度。" },

  { type:"narration", text:"接下来三个小时——\n架构。CUDA 的下一步。AI 的边界。" },
  { type:"narration", text:"他想得比你快得多。\n但他不抢话——他听。" },
  { type:"narration", text:"中途你提到一个刚出的开源框架。\n他「嗯」了一声，从旁边的文件夹里翻出来那篇预印本——上面也写满了批注。" },
  { type:"text", speaker:"你", text:"（……他比我读得还快。）" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"做这一行，看论文不是任务，是呼吸。\n你不读，下个月就跟不上了。" },
  { type:"text", speaker:"你", text:"那您一晚上读多少？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"（认真想了想）……七到十篇。\n但我不细读，我做 abstract 级别的扫描。\n真正想读的，会反复读三四遍。" },
  { type:"text", speaker:"你", text:"那您今天读我的——" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……四遍。" },
  { type:"narration", text:"你低头喝茶，遮住自己越来越红的脸。" },

  { type:"narration", text:"凌晨一点，他才说：" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"你去休息吧。明天还要来上班。" },

  { type:"choice", choices:[
    { text:"「……我还不想走。」",         affection:12, flag:{key:"stayed_late",value:true} },
    { text:"「好的，您也早点休息。」",   affection:5  },
    { text:"「那您呢？您几点睡？」",     affection:8  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（轻笑）……我通常凌晨三点。\n不要学我。" },
  { type:"narration", text:"你起身告别。\n走廊里，你忍不住回头看了一眼——" },
  { type:"narration", text:"他还坐在窗边。\n手里握着那杯早就凉透的茶。" },
  { type:"narration", text:"……这个背影，你后来记了很久。" },
  { type:"goto", target:"interlude_dm" },
],

/* ================================================================
   过场：第一条 DM
   ================================================================ */
interlude_dm: [
  { type:"scene", place:"主角住所 · 卧室", time:"凌晨 02:34", weather:"夜",
    bg:"scene-cafe", mood:"calm", clearChars:true },

  { type:"narration", text:"入职第三天的凌晨。\n你失眠。\n躺在床上，把那次顶层办公室的对话在脑子里反复放。" },
  { type:"narration", text:"……他读了你的论文四遍。\n……他柜子里 NV1 还在。\n……他凌晨三点才睡。" },
  { type:"narration", text:"你越想越睡不着。" },
  { type:"narration", text:"——叮。" },
  { type:"narration", text:"Slack 通知。" },
  { type:"narration", text:"内部 DM 群。" },
  { type:"narration", text:"发件人：「Jensen H.」" },
  { type:"narration", text:"……你坐起来了。" },

  { type:"narration", text:"「Section 4.2 page 11，你提到那个 sparse mask kernel。\n如果改成 block-sparse，throughput 你估多少？」" },
  { type:"narration", text:"……你扫了一眼时间。\n凌晨 02:34。他还在出差路上。" },

  { type:"choice", choices:[
    { text:"「立刻拿出笔记本，认真回他。」",         affection:9, flag:{key:"replied_dm",value:true} },
    { text:"「直接在手机上回——大约 1.7x。」",       affection:7  },
    { text:"「明天早上再回，他这时候可能在睡。」", affection:3  },
  ]},

  { type:"narration", text:"你抓起笔记本，把数据重新跑了一遍。\n半小时后，回了一条：" },
  { type:"narration", text:"「估算 1.7x。\nbatch 64 之后会被显存带宽 cap 住。\n用 H100 的 TMA 异步加载，估计能拉到 2.1x。」" },
  { type:"narration", text:"——发完之后，你盯着「正在输入」那个圆点。" },
  { type:"narration", text:"亮起。\n停了。\n又亮起。" },
  { type:"narration", text:"……他在打字。\n……他在删字。\n……他又在打字。" },
  { type:"narration", text:"三分钟后，对面回了两个字：" },
  { type:"narration", text:"「不睡？」" },

  { type:"choice", choices:[
    { text:"「您也没睡。」",                         affection:9 },
    { text:"「失眠。」",                             affection:7 },
    { text:"「在等您回复。」",                       affection:11, flag:{key:"dm_bold",value:true} },
  ]},

  { type:"narration", text:"对面停了一下。" },
  { type:"narration", text:"圆点又亮了。\n亮了一会儿。\n突然消失。" },
  { type:"narration", text:"——他没回。" },

  { type:"narration", text:"你盯着屏幕看了两分钟，确认他不会再回了。\n才把手机放回枕边，盖上被子。" },
  { type:"narration", text:"——但心跳比刚才还快。" },

  { type:"narration", text:"——叮。" },
  { type:"narration", text:"凌晨 03:42。\n一条新消息：" },
  { type:"narration", text:"「Block-sparse 的方案，你愿意写一个 prototype 吗？\n下周我回来看。」" },
  { type:"narration", text:"……他绕开了你刚才那句话。\n绕得很轻巧。\n但他刚才那两分钟没回，绝不是没看见。" },
  { type:"flag", key:"first_dm", value:true },

  { type:"text", speaker:"你", text:"（小声）……老黄，您可真够狡猾的。" },
  { type:"narration", text:"你笑着回：「行，给我四天。」\n按下发送。\n再倒回床上——这次睡得很快。" },
  { type:"goto", target:"chapter2_cafe" },
],

/* ================================================================
   第二章：咖啡馆的午后
   ================================================================ */
chapter2_cafe: [
  { type:"scene", place:"总部附近 · 独立咖啡馆「0x1F」", time:"下午 14:30", weather:"多云转晴",
    bg:"scene-cafe", mood:"romantic", clearChars:true },
  { type:"char", id:"jensen", expression:"smile", pose:"leaning", slot:"center", placeholder:true },

  { type:"narration", text:"入职两周后，他发来一条消息。\n只有一行字：下午有空吗？带你去个地方。" },
  { type:"narration", text:"那家咖啡馆没有招牌，藏在停车场后面的小巷里。\n你推开门，他已经坐在角落，面前放着一杯黑咖啡，低头看着什么。" },
  { type:"text", speaker:"黄仁勋", expression:"smile", text:"来了。坐。" },
  { type:"text", speaker:"你", text:"（环顾四周）这里……是您常来的地方？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"算是。老板认识我，不会拍照，也不要签名。\n硅谷能有这样的地方，比好的 GPU 更稀缺。" },
  { type:"text", speaker:"你", text:"（扑哧）……您的比喻总是这样。" },
  { type:"text", speaker:"黄仁勋", expression:"smile", text:"这是夸我还是在说我有问题？" },
  { type:"text", speaker:"你", text:"夸您。" },

  { type:"narration", text:"他轻轻笑了。窗外有人骑单车经过，阳光在咖啡杯上折射出小小的彩虹。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking", pose:"hand_chin",
    text:"我想问你一件和工作无关的事。" },
  { type:"text", speaker:"你", text:"……说吧。" },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"你是怎么走上这条路的？\n不是履历上那个版本，是真实的版本。" },

  { type:"narration", text:"这个问题像一根针，准确地戳到了你从来没在面试里说过的那部分。" },

  { type:"choice", choices:[
    { text:"「我小时候第一次用父亲的电脑，世界突然变大了。」", affection:8  },
    { text:"「说来话长……其实有段时间我想放弃。」",           affection:12, flag:{key:"shared_story",value:true} },
    { text:"「想改变世界。俗气，但是真的。」",               affection:9  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"不俗气。\n每个在这个行业里真正做成事的人，都在某个深夜问过自己同一个问题：\n这到底值不值得。" },
  { type:"text", speaker:"你", text:"您也问过自己吗？" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"问过。1999 年的时候，英伟达股价崩了，我老婆在哭，我父母不理解我。\n我在 Lori 面前说了句：对不起，我可能真的错了。" },
  { type:"text", speaker:"你", text:"……然后呢？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"然后她说：那就再试一次，错了我陪你再道歉。\n你知道一个人说这话的分量吗？" },

  { type:"narration", text:"你沉默了一会儿。\n他提起 Lori 的时候，眼睛里有很深的东西，像一片你看不到底的湖。" },

  { type:"choice", choices:[
    { text:"「……她很了不起。」",                 affection:6 },
    { text:"「能遇到这样的人，是你的幸运。」",   affection:5 },
    { text:"「我明白那种感觉——被人托住的感觉。」", affection:10, flag:{key:"empathy",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"（看着你，安静了几秒）\n……你这个人，说话的方式，有时候会让我觉得……" },
  { type:"text", speaker:"黄仁勋", expression:"shy", text:"……算了。喝咖啡，我帮你点了拿铁。" },
  { type:"narration", text:"他低头喝咖啡，耳根似乎有那么一点点红。\n你盯着他，心里有什么东西悄悄松动了。" },

  /* —— 中段：你提到怎么知道这家咖啡馆 —— */
  { type:"text", speaker:"你", text:"……您是怎么发现这家店的？" },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"二十年前，公司差点倒的时候。\n我那时候每天都要找一个不会被人认出的地方喘口气。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"那时候老板还是现在这位老板的爸爸。\n他不知道我是谁，只知道我每次都点同一杯黑咖啡。" },
  { type:"text", speaker:"你", text:"……（看了看他手里的杯子）\n您还在喝同一杯？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"——人会变，但有些东西不会。\n比如咖啡的浓度。" },

  { type:"narration", text:"老板从吧台那边端来一小盘饼干，放在你们桌上。" },
  { type:"text", speaker:"老板", text:"——黄先生，新朋友？" },
  { type:"text", speaker:"黄仁勋", expression:"smile", text:"……新同事。" },
  { type:"text", speaker:"老板", text:"哦——「同事」啊。\n（眨眨眼，走开了）" },

  { type:"text", speaker:"你", text:"（小声）……他笑得有点意味深长。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（咳了一下）\n……他每次都那样。" },
  { type:"text", speaker:"你", text:"每次？" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……（这话他不该接）" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……我意思是，他对每个人都那样。" },

  { type:"choice", choices:[
    { text:"「……我倒是觉得，他只对您带来的人那样。」", affection:11, flag:{key:"caught_him",value:true} },
    { text:"「（笑笑，没追问）」",                       affection:7  },
    { text:"「您带很多人来过这里？」",                   affection:4  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（沉默几秒）\n……你不是「很多人」之一。" },
  { type:"narration", text:"窗外的阳光忽然斜得正好，落在他放在桌上的手背上。\n你不动声色地把目光收回，端起拿铁喝了一口。\n——其实已经凉了，但你不想让自己说话的声音被发现在抖。" },

  /* —— 转入 GTC demo 委托 —— */
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"对了，GTC 快到了。今年的 keynote 我想加一个新环节。\n你愿意帮我准备一个 live demo 吗？" },
  { type:"text", speaker:"你", text:"（一惊）我……来了才三周——" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"我知道。我也才做了三年 CEO 就上了纳斯达克。\n时间不是问题，勇气才是。" },

  { type:"choice", choices:[
    { text:"「好，我接。」",                       affection:10 },
    { text:"「如果会搞砸，您不怕吗？」",           affection:4  },
    { text:"「……行。但如果崩了，我背锅。」",       affection:8, flag:{key:"demo_accepted",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"哈！不，我们一起背。\n走，去找个白板，我有想法要画给你看。" },
  { type:"narration", text:"下午的咖啡馆里，你们占了一张桌子，用餐巾纸画满了架构图。\n窗外天色从多云变成了橙红，谁都没有注意到时间。" },
  { type:"goto", target:"interlude_pantry" },
],

/* ================================================================
   过场：茶水间偶遇
   ================================================================ */
interlude_pantry: [
  { type:"scene", place:"NVIDIA 总部 · 28 楼茶水间", time:"上午 10:42", weather:"晴",
    bg:"scene-lobby", mood:"calm", clearChars:true },

  { type:"narration", text:"咖啡馆那次对话之后过了五天。\n你已经把 demo 的核心架构搭起来了，今天来茶水间倒咖啡，准备继续干。" },
  { type:"narration", text:"咖啡机正在运转，你正盯着滴壶发呆——" },
  { type:"text", speaker:"???", text:"那台咖啡机第三档磨豆，比第二档好喝。" },
  { type:"narration", text:"你回头。" },
  { type:"char", id:"jensen", expression:"smile", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（端着马克杯，倚在柜台边）\n早。" },
  { type:"text", speaker:"你", text:"……黄总也来茶水间？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"为什么不能？我也是员工。" },
  { type:"text", speaker:"你", text:"（指着他的杯子）……您那个杯子上写着「世界最佳爸爸」。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（默默把杯子转了个角度）\n……女儿送的。十年前。" },

  { type:"narration", text:"你忍着笑，按下咖啡机第三档。豆子开始发出更粗粝的研磨声。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking", pose:"hand_chin",
    text:"demo 进度怎么样？" },
  { type:"text", speaker:"你", text:"主流程跑通了。\n但是 batch 大小一上去就 OOM，可能要重新设计 attention 切片。" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"切多大？" },
  { type:"text", speaker:"你", text:"512。我想试 1024。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"（吹了声口哨）你胆子比 batch size 还大。" },

  { type:"choice", choices:[
    { text:"「不大就不来 NVIDIA 了。」",       affection:7  },
    { text:"「跟着您学的。」",                 affection:9, flag:{key:"flirt_back",value:true} },
    { text:"「……您觉得 1024 行不行？」",       affection:5  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"行不行你跑了才知道。\n不过——（拿出手机扫了几下）" },
  { type:"narration", text:"他把手机屏幕给你看：一段他自己写的 attention 切片代码，几年前的私人 repo。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"你参考一下。这个版本我没发出来过。" },
  { type:"text", speaker:"你", text:"（震惊）……您随身带着？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（耳根又红了）\n……正好昨晚我也想了一下你这个问题。" },
  { type:"flag", key:"private_code", value:true },

  { type:"narration", text:"咖啡机叮的一声响了。你伸手去取杯子的时候，他也伸手了——\n你们的手碰了一下。" },
  { type:"narration", text:"很短，但你们都没立刻收回。" },

  { type:"choice", choices:[
    { text:"「……抱歉。」（缩回手）",                 affection:3  },
    { text:"「您先。」（让给他）",                   affection:6  },
    { text:"「我们好像总是节奏一致。」",             affection:11, flag:{key:"sync",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"loving", text:"……是啊。" },
  { type:"narration", text:"他没有继续往下说。\n但那一刻你忽然意识到——\n茶水间里的咖啡机声，再也不只是咖啡机声了。" },

  { type:"narration", text:"中午回到工位，Colette 路过你的座位，停了一下。" },
  { type:"char", id:"colette", expression:"smile", slot:"right", placeholder:true },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"（压低声音）他今天笑得不一样。\n……你也是。" },
  { type:"text", speaker:"你", text:"（窘迫）什……什么不一样——" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"（眨眼）我什么都没说。" },
  { type:"char", id:"colette", hide:true, slot:"right" },
  { type:"narration", text:"她笑着走开了，留下你一个人对着电脑屏幕，发热的脸怎么都退不下去。" },
  { type:"goto", target:"chapter3_boardroom" },
],

/* ================================================================
   第三章：董事会的风浪
   ================================================================ */
chapter3_boardroom: [
  { type:"scene", place:"NVIDIA 总部 · 32 楼会议室", time:"上午 10:15", weather:"阴",
    bg:"scene-lobby", mood:"tense", clearChars:true },

  { type:"narration", text:"GTC 前两周，一场风暴悄悄在你们头顶聚集。" },
  { type:"narration", text:"竞争对手 Apex AI 宣布融资 200 亿，矛头直指 NVIDIA 的数据中心业务。\n董事会要求在本周内给出「战略回应方案」。" },
  { type:"narration", text:"你站在会议室外，透过玻璃看见里面的人们——包括一张你不认识的脸。" },

  { type:"char", id:"colette", expression:"serious", slot:"right", placeholder:true },
  { type:"text", speaker:"Colette", expression:"serious",
    text:"（从会议室走出来，差点撞上你）\n哦——你是新来的工程师？我是 Colette，CFO。" },
  { type:"text", speaker:"你", text:"你好，我是——" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"我知道你是谁。Jensen 跟我提过你。（顿了顿）他很少提人。" },
  { type:"narration", text:"她说这话的时候眼神有一点难以捕捉的意味，让你一时没反应过来。" },

  { type:"text", speaker:"Colette", expression:"serious",
    text:"今天的会可能会很难看。董事会有人想把数据中心部门拆分上市，快钱。\nJensen 不同意，但他需要数据支撑，不只是愿景。" },
  { type:"text", speaker:"你", text:"……他怎么说？" },
  { type:"text", speaker:"Colette", expression:"cold",
    text:"他让我找你。说你在研究稀疏推理的落地数据，有用。" },
  { type:"text", speaker:"你", text:"（那组数据还没整理完……）" },

  { type:"choice", choices:[
    { text:"「给我两小时，我整理一份出来。」",         affection:12, flag:{key:"demo_saved",value:true} },
    { text:"「数据有，但不太成熟——」",               affection:5  },
    { text:"「我可以试试。Colette，你能帮我？」",     affection:8  },
  ]},

  { type:"text", speaker:"Colette", expression:"surprised", text:"……你居然叫我名字。（轻笑）行。我给你腾一间小会议室。" },

  { type:"narration", text:"接下来一个半小时，你一边整理数据一边回想所有的技术细节。\n窗外，乌云越压越低。" },
  { type:"narration", text:"就在会议即将开始前五分钟，门开了。" },

  { type:"char", id:"jensen", expression:"serious", pose:"stand", slot:"left", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"serious", text:"准备好了吗？" },
  { type:"text", speaker:"你", text:"准备好了。" },
  { type:"text", speaker:"黄仁勋", expression:"smile", text:"好。跟我进去。" },
  { type:"text", speaker:"你", text:"我……也进去？" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"你的数据，你来讲。\n董事会的人不只听数字，他们听讲数字的人。" },

  { type:"narration", text:"会议室里，八张脸向你看过来。你握紧了 U 盘，走上去。" },
  { type:"narration", text:"你讲了二十二分钟。数据、模型、增长曲线。\n中途有人打断你，你接住了，没慌。" },
  { type:"narration", text:"Jensen 坐在角落，全程没说一句话，但他的眼神一直跟着你。" },
  { type:"narration", text:"会议结束，主张拆分的声音明显弱了下去。" },

  { type:"char", id:"colette", expression:"warm", slot:"right", placeholder:true },
  { type:"text", speaker:"Colette", expression:"warm", text:"（走出来，低声）……干得漂亮。" },

  { type:"char", id:"jensen", expression:"proud", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"proud",
    text:"（等所有人走后，对你）\n……你知道你刚才做了什么吗？" },
  { type:"text", speaker:"你", text:"（心还在跳）……保住了数据中心？" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"你保住了我坚持了三十年的方向。\n这不是一件小事。" },

  { type:"choice", choices:[
    { text:"「那是因为您的方向值得被保住。」",         affection:14, flag:{key:"trust_deep",value:true} },
    { text:"「我只是做了该做的事。」",               affection:7  },
    { text:"「……我手现在还在抖。」",               affection:10 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（轻声）……手抖是正常的。\n我做第一次 keynote 的时候，稿子在台上飞走了。" },
  { type:"text", speaker:"你", text:"（笑出来）那……您怎么办？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"临时发挥，讲了二十分钟没在稿子里的东西。\n那场反而是反响最好的一次。" },

  { type:"narration", text:"走廊里，你们肩并肩走向电梯。\n今天的阴天，突然没那么阴了。" },

  { type:"narration", text:"（三天后……）" },
  { type:"scene", place:"办公室走廊", time:"傍晚 18:40", weather:"晴",
    bg:"scene-lobby", mood:"tense", clearChars:true },

  { type:"char", id:"marcus", expression:"smile", slot:"right", placeholder:true },
  { type:"text", speaker:"Marcus", expression:"smile",
    text:"你好。我是 Marcus，Apex AI 的 CTO。\n能借一步说话吗？" },
  { type:"text", speaker:"你", text:"（一愣）……你怎么进来的？" },
  { type:"text", speaker:"Marcus", expression:"scheming",
    text:"Colette 带我来参观的，我们有合作在谈。（顿了顿）\n其实我今天来，主要是想见你。" },
  { type:"text", speaker:"Marcus", expression:"smile",
    text:"董事会上你的表现，我们全程在楼下等结果。\n一个月的新人，撑住了整个技术方向……你知道这有多稀有吗？" },
  { type:"text", speaker:"你", text:"……你想说什么。" },
  { type:"text", speaker:"Marcus", expression:"scheming",
    text:"想给你一个机会。Apex 的首席研究员，年薪三倍，期权另算。\n你愿意考虑吗？" },

  { type:"choice", choices:[
    { text:"「不考虑。谢谢。」",                             affection:15, flag:{key:"loyalty",value:true} },
    { text:"「……让我想想。」",                             affection:-5 },
    { text:"「你们的技术路线，我不认同。」",               affection:12, flag:{key:"loyalty",value:true} },
  ]},

  { type:"text", speaker:"Marcus", expression:"cold",
    text:"（笑容淡了一点）……你确定？\n这种机会，不是每次都有的。" },
  { type:"text", speaker:"你", text:"我确定。" },
  { type:"text", speaker:"Marcus", expression:"serious",
    text:"……好吧。（转身）那我只能说——希望 NVIDIA 值得。" },

  { type:"narration", text:"他走了。你在走廊里站了一会儿，让心跳慢慢平稳。\n值不值得，你其实早就知道答案。" },

  /* —— Marcus 走后 + Jensen 知情 —— */
  { type:"narration", text:"——但你没想到，这件事会这么快传到他耳朵里。" },
  { type:"scene", place:"NVIDIA 总部 · 顶层办公室外", time:"晚上 21:08", weather:"晴",
    bg:"scene-office-night", mood:"tense" },

  { type:"char", id:"jensen", expression:"serious", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"……来一下我办公室。" },
  { type:"narration", text:"你跟着他进了办公室。\n他把门关上的那一下，比平时重了一点。" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"Marcus 来了？" },
  { type:"text", speaker:"你", text:"……嗯。" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"他出价多少？" },
  { type:"text", speaker:"你", text:"……三倍。" },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"……（沉默几秒）" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"我没有资格留你。\n如果你想去，告诉我，我帮你写推荐信。" },

  { type:"narration", text:"……他说出这句话的时候，身体微不可察地紧了一下。\n你忽然意识到——\n他在害怕。" },
  { type:"narration", text:"那个站在台上能让一万两千人屏息的男人，正在害怕一个新员工的离开。" },

  { type:"choice", choices:[
    { text:"「我没考虑过去。」",                       affection:8  },
    { text:"「您让我留下，我就留。」",                 affection:13, flag:{key:"chose_jensen",value:true} },
    { text:"「……您要是说舍不得我，我可能更舍不得您。」", affection:16, flag:{key:"emotional_loyalty",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（从抽屉里拿出一只 NV1 的迷你模型，放到你面前）\n……这个先送给你。" },
  { type:"text", speaker:"你", text:"为什么？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"提醒你——你刚才的那句话，今晚就被印进 NVIDIA 的历史了。\n失败和坚持都是历史的一部分。" },
  { type:"flag", key:"nv1_gift", value:true },
  { type:"narration", text:"你接过那枚指甲盖大小的小芯片，掌心忽然有点发烫。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"……回去休息。\nGTC 还有十天，我们要做的事情还很多。" },
  { type:"narration", text:"你点头，转身走出办公室。\n关门的瞬间，你回头看了一眼——\n他正坐在桌前，把那只 NV1 玻璃柜重新拉开，对着空出来的位置发了一会儿呆。" },

  { type:"goto", target:"interlude_birthday" },
],

/* ================================================================
   过场：二月十七日 · 偷偷的生日
   ================================================================ */
interlude_birthday: [
  { type:"scene", place:"NVIDIA 总部 · 你的工位", time:"上午 10:08", weather:"小雨",
    bg:"scene-lobby", mood:"calm", clearChars:true },

  { type:"narration", text:"二月十七日。\n你登入工位电脑，日历上有一行小字提醒——\n但不是会议，是你自己之前偷偷做了一个标记。" },
  { type:"narration", text:"「J's bday」。" },
  { type:"narration", text:"你是一个月前在维基百科上看到的：\n黄仁勋。1963 年 2 月 17 日，台南出生。" },
  { type:"narration", text:"当时你看到这条信息，第一反应是——\n他从来不庆祝。" },
  { type:"narration", text:"上次开年会的时候你听 Colette 提过：「他这辈子没在公司过过生日。」\n据说是因为创业头几年压力太大，他索性把这个日子抹掉了。" },

  { type:"choice", choices:[
    { text:"「（什么都不做。他不会想被打扰。）」", affection:0 },
    { text:"「……我去买个小蛋糕。」",             affection:8, flag:{key:"birthday_cake",value:true} },
    { text:"「写张匿名生日卡放他桌上。」",       affection:6, flag:{key:"birthday_card",value:true} },
  ]},

  /* —— 中午外出买蛋糕（如果选了 cake，则进入这段）—— */
  { type:"scene", place:"圣何塞 · Maison K 法式糕点", time:"中午 12:50", weather:"小雨转晴",
    bg:"scene-cafe", mood:"calm" },
  { type:"narration", text:"你撑着伞走进一家很小的法式糕点店。\n柜台后是一个戴老花镜的老太太。" },
  { type:"text", speaker:"老太太", text:"What can I get you, dear?" },
  { type:"text", speaker:"你", text:"……一个最小号的，不要写字，奶油不要太多。" },
  { type:"text", speaker:"老太太", text:"For yourself?" },
  { type:"text", speaker:"你", text:"……不是。\n是给一个不喜欢被庆祝的人。" },
  { type:"text", speaker:"老太太", text:"Ahh.\n（笑了笑）那种人最需要一个小蛋糕。" },
  { type:"narration", text:"她从冰柜里拿出一个手掌大小的栗子蒙布朗，认真地包好。\n包装纸上盖了一个小小的椭圆印章——是那家店的 logo，一只画得有点歪的猫。" },

  /* —— 晚上回到他办公室门口 —— */
  { type:"scene", place:"NVIDIA 总部 · 顶层办公室门外", time:"深夜 22:36", weather:"晴",
    bg:"scene-office-night", mood:"calm" },

  { type:"narration", text:"你犹豫了很久，蹲在他办公室门外的走廊里。\n蛋糕装在纸盒里，已经凉了。" },
  { type:"narration", text:"你不敢敲门——\n你怕他正在 debug、在开会、或者只是在想事情。" },
  { type:"narration", text:"于是你只是把蛋糕放在门口，转身离开。" },

  { type:"narration", text:"——但是，你刚走出三步，门就开了。" },

  { type:"char", id:"jensen", expression:"surprised", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"surprised",
    text:"……" },
  { type:"narration", text:"他低头，看见地上的小盒子。" },
  { type:"narration", text:"然后抬头，看着已经走到走廊尽头、正在转身的你。" },

  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（很轻）……你怎么知道？" },
  { type:"text", speaker:"你", text:"……（一时不知道怎么说）我是工程师，查过您的 wiki。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"……（蹲下身，慢慢拿起小盒子）\n……整整三十年。\n没有人在公司给我送过蛋糕。" },

  { type:"narration", text:"他把盒子托在手里，像捧一只很轻的鸟。\n你有点想哭，但忍住了。" },

  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"进来。\n陪我吃完。" },

  { type:"scene", place:"NVIDIA 总部 · 顶层办公室", time:"深夜 22:55", weather:"晴",
    bg:"scene-office-night", mood:"romantic" },
  { type:"narration", text:"他把蛋糕放在桌上，从抽屉里拿出两把塑料叉子。\n——你忍不住笑了。" },
  { type:"text", speaker:"你", text:"……您抽屉里居然有塑料叉子。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（慢慢辩解）以前出差经常吃外卖。" },
  { type:"narration", text:"你们坐在沙发上，把那个手掌大的小蒙布朗，一人一口分着吃。\n窗外是台北 101 的灯。\n房间里只有蛋糕的甜味和你心跳的声音。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"……我有一件东西，从一年前就想送出去，但一直没找到合适的时机。" },
  { type:"text", speaker:"你", text:"嗯？" },
  { type:"narration", text:"他从书桌的最下层抽屉拿出一个小小的红木盒子。\n盒子打开——\n是一只很旧的银色钥匙。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"……这是 1993 年我们第一间办公室的钥匙。\n那间办公室早就没了，但这把钥匙我一直留着。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……今天，给你。\n你帮我开着这家公司里的下一扇门。" },
  { type:"flag", key:"first_office_key", value:true },

  { type:"choice", choices:[
    { text:"「我一定好好保管。」",                 affection:9  },
    { text:"「……这分量太重了。」",                 affection:6  },
    { text:"「那您一定要陪我，一起开下一扇门。」", affection:14, flag:{key:"birthday_promise",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……（轻声）一定。" },
  { type:"narration", text:"他把那把银色的小钥匙放进你掌心。\n钥匙比你想象的要轻，但你掌心却像握住了某种特别沉的东西。" },
  { type:"narration", text:"窗外的雨不知什么时候停了。\n台北的灯光像无数只小烛火，在远处静静摇曳。" },
  { type:"narration", text:"——这一年的二月十七日。\n是 NVIDIA 历史上，第一次有人为黄仁勋庆祝生日。" },
  { type:"goto", target:"chapter4_gtc_debug" },
],

/* ================================================================
   第四章：GTC 前夜 debug
   ================================================================ */
chapter4_gtc_debug: [
  { type:"scene", place:"GTC 会场技术机房", time:"深夜 02:17", weather:"晴",
    bg:"scene-office-night", mood:"tense", clearChars:true },
  { type:"char", id:"jensen", expression:"serious", pose:"stand", slot:"center", placeholder:true },

  { type:"narration", text:"GTC 开幕前十二小时。\n你已经在这间机房里待了七个小时。" },
  { type:"narration", text:"那个 live demo——你花了三周写的推理管道——\n在彩排时突然崩了。" },
  { type:"narration", text:"报错信息刷满了屏幕：CUDA kernel panic。\n凌晨两点，Jensen 推门走进来。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"（看着屏幕）怎么了。" },
  { type:"text", speaker:"你", text:"kernel 在 attention mask 边界上 panic 了。\n我找到原因了，但……可能来不及修。" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"还有几个小时？" },
  { type:"text", speaker:"你", text:"九个小时四十分。" },
  { type:"text", speaker:"黄仁勋", expression:"thinking", pose:"hand_chin",
    text:"……够。" },
  { type:"text", speaker:"你", text:"够？这个 bug 如果扯到 kernel 层——" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"够，因为你现在不是一个人在修。" },

  { type:"narration", text:"他脱了皮夹克，搭在椅背上，坐到了你旁边。" },
  { type:"narration", text:"黄仁勋·NVIDIA CEO·皮夹克标志性人物……\n此时此刻，只是一个在你旁边打开 vim 的工程师。" },

  { type:"choice", choices:[
    { text:"「……您还会 CUDA 编程？」",             affection:8  },
    { text:"「我来，您歇着。」",                   affection:3  },
    { text:"「好，我们来拆分一下问题。」",         affection:12, flag:{key:"teamwork",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"CUDA 是我亲手设计的，你说我会不会。\n1999 年，第一版我写了六个月的 spec。" },
  { type:"text", speaker:"你", text:"（汗）……我忘了。" },
  { type:"text", speaker:"黄仁勋", expression:"serious", text:"专注。说说你的思路。" },

  { type:"narration", text:"你们就这样分工了：你负责 Python 层的逻辑隔离，他扑向底层 kernel。\n机房里只有风扇的嗡鸣和两个人敲键盘的声音。" },

  /* —— debug 中段：Colette 送宵夜 + 耳机分享 —— */
  { type:"scene", place:"GTC 会场技术机房", time:"凌晨 03:42", weather:"晴",
    bg:"scene-office-night", mood:"tense" },
  { type:"narration", text:"凌晨三点四十分。门被推开。" },
  { type:"char", id:"colette", expression:"smile", slot:"right", placeholder:true },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"——我猜对了。\n（拎着两个保温袋走进来）你们俩肯定还在。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised",
    text:"……Colette？" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"我刚开完日本投资人的电话。\n顺路过来看看。" },
  { type:"narration", text:"她把保温袋放下：一份给老黄的稀饭、一份给你的鸡汤面。\n中间还有一小碟咸菜。" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"——他胃不好，深夜不能吃辣。\n这一点，你以后也注意一下。" },

  { type:"choice", choices:[
    { text:"「……我知道了。」",                   affection:8, flag:{key:"learned_diet",value:true} },
    { text:"「Colette 您也太细心了。」",         affection:5  },
    { text:"「谢谢您的鸡汤面。」",                 affection:5  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……Colette，我不需要你做我妈。" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"我没在做你妈。\n（看了你一眼）我在交接。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"narration", text:"Colette 轻轻笑了一下，挥挥手就走了。\n机房里又剩下你们两个人，外加两份冒着热气的宵夜。" },
  { type:"char", id:"colette", hide:true, slot:"right" },

  { type:"text", speaker:"你", text:"……「交接」是什么意思？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（低头喝稀饭）\n……不知道。我也想问。" },

  { type:"narration", text:"凌晨四点。\n你卡在一个 race condition 上，调了半小时没头绪。\n他从口袋里拿出一副有线耳机，递给你一只。" },
  { type:"text", speaker:"你", text:"……？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"我 debug 卡的时候听这个。\n试试。" },
  { type:"narration", text:"你戴上耳机——\n是一段非常老旧的 City Pop。\n大村憲司？山下達郎？你认不出，但旋律温柔得像有阳光透进来。" },
  { type:"text", speaker:"你", text:"……（你们就这样一人一只耳机，并排坐着，盯着同一块屏幕）" },
  { type:"narration", text:"耳机线很短。\n你们的肩膀离得很近。\n他每次输入一行代码，你都能感觉到那一阵微弱的震动。" },
  { type:"flag", key:"shared_earphone", value:true },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"……你怎么样？" },
  { type:"text", speaker:"你", text:"我没事。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"我是说……（顿了一下）……心率。" },
  { type:"text", speaker:"你", text:"……？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"（指了一下你右手手腕的智能手表）\n屏幕一直亮着。\n你的心率从十分钟前开始，一直在 92。" },
  { type:"text", speaker:"你", text:"……（迅速翻了下手腕，把表盖住）" },

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……我也差不多。\n但是我没戴表。" },
  { type:"narration", text:"——他这句话说完，自己也愣了一下。\n机房里的风扇声忽然大了一倍。" },

  { type:"narration", text:"凌晨四点半，他发现了真正的根因——一个隐藏在驱动层的 race condition，\n只在 tensor 维度是 8 的倍数时才触发。" },

  { type:"text", speaker:"黄仁勋", expression:"proud",
    text:"（指着屏幕）看——这里，十七行，1998 年写的代码。\n二十六年了，从来没人测到这个边界。" },
  { type:"text", speaker:"你", text:"……那是——" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"那是我写的。\n（顿了顿）……所以我知道怎么修。" },

  { type:"narration", text:"他修了十七分钟。你的管道在早上六点重新跑起来了，像什么都没发生过一样稳。" },
  { type:"narration", text:"窗外，会场的服务人员开始摆放座椅。天还没亮，但东方已经有一点淡淡的橙。" },

  { type:"text", speaker:"黄仁勋", expression:"tired",
    text:"（揉了揉眼睛）饿吗？" },
  { type:"text", speaker:"你", text:"……特别饿。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"附近有家 24 小时营业的早餐店。\n台湾口味，烧饼油条，你吃过吗？" },

  { type:"choice", choices:[
    { text:"「吃过！烧饼油条是我的最爱！」",     affection:8  },
    { text:"「没吃过，我愿意尝。」",             affection:6  },
    { text:"「……你现在出去，记者拍到怎么办？」", affection:5, flag:{key:"practical",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"（站起来，拿起皮夹克）\n管他呢，又不是第一次了。\n上次在台北被拍到，标题写「老黄深夜独自觅食」。" },
  { type:"text", speaker:"你", text:"（笑出来）……那我帮您挡镜头。" },
  { type:"text", speaker:"黄仁勋", expression:"smile", text:"不用，你负责点单就行。" },

  /* —— 早餐店场景扩展 —— */
  { type:"scene", place:"会场附近 · 24h 早餐店「永和阿嬷」", time:"清晨 06:18", weather:"破晓",
    bg:"scene-cafe", mood:"calm" },
  { type:"narration", text:"巷口有一家小小的早餐店，玻璃门上贴着褪色的红色「永和」二字。\n空气里全是豆浆和油条的香味。" },
  { type:"narration", text:"老板娘是个台湾阿嬷，看起来六十多岁。\n她抬头看了一眼，愣了两秒——" },

  { type:"char", id:"jensen", expression:"smile", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"老板娘", text:"……黄……总？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"阿嬷，是我。\n两套烧饼油条，一杯热豆浆，一杯——（看你）你喝甜的还是咸的？" },
  { type:"text", speaker:"你", text:"咸的。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"——咸豆浆。要加榨菜。" },
  { type:"text", speaker:"老板娘", text:"（紧张）那个……签个名可以吗？给我孙子，他在念资讯系。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"当然可以。给我一支笔。" },

  { type:"narration", text:"他在阿嬷递过来的便利贴上签了名，又写了一句话：\n「不必读完所有论文，要读完一篇就懂。」" },
  { type:"text", speaker:"黄仁勋", expression:"smile", text:"——给他的。" },
  { type:"text", speaker:"老板娘", text:"……谢谢黄总，谢谢黄总。" },

  { type:"narration", text:"你们在角落坐下。\n外面天色慢慢从墨蓝变成淡橙。\n烧饼很烫，掰开的时候有热气冒出来。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"（咬了一口）……还是这个味。" },
  { type:"text", speaker:"你", text:"您小时候在哪里念书？" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"九岁去美国，之前在台南。\n每天早上我妈妈带我去吃这种早餐，五块台币。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"我父亲那时候是化学工程师。\n他觉得我跑去做芯片是「玩具」。" },
  { type:"text", speaker:"你", text:"现在呢？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"现在我们公司被写进经济学课本，他终于不再说我玩玩具了。\n他改说——我玩的是「比较大的玩具」。" },

  { type:"narration", text:"你笑了。\n他低头喝豆浆，喝得很慢。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"……其实昨晚那个 bug，不只是 1998 年的我留的。" },
  { type:"text", speaker:"你", text:"嗯？" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"那段代码，我当时是在父亲住院期间写的。\n所以我后来一直没回去看它——避着它。" },
  { type:"text", speaker:"你", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"今天是因为有你坐在旁边，我才敢翻出来看。\n谢谢。" },

  { type:"choice", choices:[
    { text:"「……以后您都不用一个人翻。」",     affection:14, flag:{key:"breakfast_promise",value:true} },
    { text:"「您应该早点告诉我的。」",           affection:8 },
    { text:"「（伸手轻轻拍了一下他的手背）」", affection:12, flag:{key:"breakfast_touch",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（很轻地点了点头）" },
  { type:"narration", text:"窗外的天，慢慢全亮了。\n阿嬷又上了一笼小笼包，说是请客。" },
  { type:"text", speaker:"老板娘", text:"黄总你太瘦了，多吃一点。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh", text:"阿嬷，这十年大家都说我太瘦。" },
  { type:"narration", text:"小笼包热腾腾的，桌子小到你和他的胳膊会偶尔碰到。\n你们都没移开。" },

  { type:"narration", text:"（早餐结束后……）" },
  { type:"narration", text:"天亮前，你们在一家小小的早餐店里吃完了一整套烧饼油条。\n他给你讲了 1993 年的台湾，讲了他父亲是怎么看待他「不务正业」创业的。\n你第一次听到他讲家人——那种讲法，是只有对信任的人，才会有的讲法。" },
  { type:"flag", key:"breakfast_together", value:true },
  { type:"goto", target:"interlude_router" },
],

/* ================================================================
   过场：去他家救一块旧 SCSI 硬盘
   ================================================================ */
interlude_router: [
  { type:"scene", place:"主角家 · 客厅", time:"周日 上午 09:54", weather:"晴",
    bg:"scene-cafe", mood:"calm", clearChars:true },

  { type:"narration", text:"GTC 之后第二个周末。\n你正在赖床，手机响了——是个陌生号码。" },
  { type:"text", speaker:"???", text:"……是我。" },
  { type:"text", speaker:"你", text:"……（一秒识别出声音）老黄？！" },
  { type:"text", speaker:"黄仁勋", text:"嘘——别那么大声。\n……你今天有事吗？" },
  { type:"text", speaker:"你", text:"……没有。" },
  { type:"text", speaker:"黄仁勋", text:"……我家里有一块 1995 年的 SCSI 硬盘，刚才尝试备份的时候 controller 死了。\n里面有一些……我比较在意的东西。" },
  { type:"text", speaker:"你", text:"……您让我去您家？" },
  { type:"text", speaker:"黄仁勋", text:"……如果你不介意。\n（顿了顿）……我没找别人。" },

  { type:"choice", choices:[
    { text:"「半小时到。」",                   affection:8 },
    { text:"「等我五分钟，叫车。」",           affection:6 },
    { text:"「我就在你家小区附近。」（撒谎）", affection:11, flag:{key:"router_lie",value:true} },
  ]},

  /* —— 老黄家 · 半山的小别墅 —— */
  { type:"scene", place:"硅谷半山 · 黄仁勋私宅", time:"上午 10:38", weather:"晴",
    bg:"scene-rooftop", mood:"calm" },
  { type:"narration", text:"半山的一栋小别墅。\n外观很普通，连邻居都不知道这里住的是谁。" },
  { type:"narration", text:"门口没有保镖，只有一台旧的智能门铃。\n你按下，门开了。" },

  { type:"char", id:"jensen", expression:"shy", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（穿着家居服站在门口）\n……进来。" },
  { type:"narration", text:"你愣住了。\n你这辈子第一次，看见黄仁勋穿着不是皮夹克的衣服——\n灰色的长袖卫衣，下面是宽松的运动裤。" },
  { type:"narration", text:"……他甚至光着脚。" },
  { type:"flag", key:"saw_home_clothes", value:true },

  { type:"text", speaker:"你", text:"……黄总。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"……今天叫我 Jensen 就好。\n这里不是公司。" },

  { type:"narration", text:"客厅不大，整面墙都是书柜。\n上面一半是技术书，下面一半是各种杂志、漫画、甚至还有一格放着乐高。" },
  { type:"narration", text:"墙上挂着一张很老的合影——\n黄仁勋，年轻的他，和几位早期员工。所有人手里举着第一代 RIVA。\n旁边还挂着一些他孩子小时候的画——已经发黄。" },
  { type:"narration", text:"你忽然意识到——\n你是在他「人」的那一面，而不是「CEO」的那一面。" },

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……硬盘在我书房。" },

  /* —— 书房 —— */
  { type:"scene", place:"黄仁勋私宅 · 书房", time:"上午 10:50", weather:"晴",
    bg:"scene-cafe", mood:"calm" },

  { type:"narration", text:"书房比客厅小，但更乱。\n一张大书桌上堆满了纸——是各种论文打印件，每一份都做了批注。" },
  { type:"narration", text:"角落里堆着两台老式塔式机箱。\n他指着其中一台——" },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"——这台是 1996 年我自己装的工作站。\n里面那块 SCSI 硬盘，挂的是当年 NV1 的所有调试日志。\n……还有一些我自己写的 demo 代码。" },
  { type:"text", speaker:"你", text:"……（蹲下来）\n这个 controller 我看一下。" },

  { type:"narration", text:"你打开机箱。一阵灰尘扑面。\n你伸手拨开线缆的时候，他递过来一支手电筒。\n指尖碰到指尖。\n你们都没说话，但都没缩回手。" },

  { type:"text", speaker:"你", text:"……（轻咳）控制器电容鼓了。\n大概率换一颗就好。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……我书桌右边第二个抽屉，有备件。" },
  { type:"text", speaker:"你", text:"——您家里居然备件齐全。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（小声）老人留点东西很正常的。" },

  { type:"narration", text:"你换了电容、重新上电、跑了 fsck。\n硬盘嗡嗡转起来，IDE 灯一闪一闪。" },
  { type:"narration", text:"——救活了。" },
  { type:"flag", key:"saved_disk", value:true },

  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"……谢谢你。\n（顿了顿）这块硬盘里，有我太太当年帮我整理的项目目录。\n我一直没敢动它，怕它哪天就读不出来了。" },

  { type:"narration", text:"——他第一次主动提到 Lori。\n你看了他一眼——他正盯着屏幕上那些早已斑驳的目录名，眼神很温柔，也很安静。" },
  { type:"narration", text:"那种温柔不是给你的，是给一段过去的。\n你忽然觉得——这些过去，是他能成为他的一部分。\n你没有嫉妒，反而有一种……被信任的感觉。" },

  { type:"choice", choices:[
    { text:"「她一定是个很好的人。」",                     affection:11, flag:{key:"respect_past",value:true} },
    { text:"「您让我看到这些，我很荣幸。」",               affection:9 },
    { text:"「（什么也不说，只是轻轻拍了拍他肩膀）」",   affection:10 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……（轻声）她是。\n……谢谢你这么说。" },

  { type:"narration", text:"中午他做了一份简单的炒饭。\n你在他厨房里发现一个细节——他冰箱门上贴着一张便利贴，是他孩子用蜡笔写的：\n「Dad, 别又只吃泡面。」" },
  { type:"narration", text:"你没说出来，但你笑了。" },

  { type:"narration", text:"下午你离开他家的时候，他站在门口，挥了一下手。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……今天很谢谢你。" },
  { type:"text", speaker:"你", text:"……不客气。我会保密的，关于您穿运动裤的事。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"……拜托保密。\n（笑着关门）" },

  { type:"narration", text:"你走出小区，回头看那栋朴素的小别墅。\n阳光正好。\n你忽然明白了一件事——\n你不只是在了解一个 CEO，你在了解一个完整的人。\n包括他的过去，他的孩子的字迹，他冰箱门上贴着的小纸条。" },
  { type:"narration", text:"——而他，也愿意把这些给你看了。" },
  { type:"goto", target:"interlude_colette" },
],

/* ================================================================
   过场：Colette 的茶
   ================================================================ */
interlude_colette: [
  { type:"scene", place:"NVIDIA 总部 · CFO 办公室", time:"傍晚 17:50", weather:"晴",
    bg:"scene-lobby", mood:"calm", clearChars:true },
  { type:"char", id:"colette", expression:"smile", slot:"center", placeholder:true },

  { type:"narration", text:"GTC 结束后第三天。\n你正打算下班，工卡在闸机上刷过的瞬间——手机亮了。" },
  { type:"narration", text:"「Colette: 上来一下，CFO 办公室。喝杯茶。」" },
  { type:"narration", text:"……喝杯茶？" },
  { type:"narration", text:"你掉头进了电梯。三十二楼，比 Jensen 那间低一层。" },

  { type:"text", speaker:"Colette", expression:"smile",
    text:"来了。\n喝乌龙还是大吉岭？" },
  { type:"text", speaker:"你", text:"……乌龙。" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"（一边烧水一边）\n你品味跟他像。" },
  { type:"text", speaker:"你", text:"（心里咯噔了一下）" },

  { type:"narration", text:"她的办公室不大，但很干净。书架上一半是财报，一半是诗集。\n墙上挂着一张照片——年轻的 Colette、年轻的 Jensen，还有两三个其他人，站在一栋很小的办公室门口，每人手里拿着一台 PC。" },

  { type:"text", speaker:"你", text:"（指着照片）……这是？" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"1996 年。当时全公司就这么些人。\n那台机器……是我们的第一款 RIVA。三个月后我们差点破产。" },
  { type:"text", speaker:"你", text:"您从那时候就在？" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"中间走了几年，又回来了。\n不是因为他给的钱多——是因为他这个人，让人放不下。" },

  { type:"narration", text:"她把茶推到你面前。乌龙的香气在两个人中间散开，安静得能听见时钟的滴答声。" },

  { type:"text", speaker:"Colette", expression:"serious",
    text:"我直接问你。\n你跟他，到底想到哪一步？" },

  { type:"choice", choices:[
    { text:"「……我也还在想。」",                 affection:5  },
    { text:"「认真的那种。」",                   affection:10, flag:{key:"colette_serious",value:true} },
    { text:"「您为什么问这个？」",               affection:7  },
  ]},

  { type:"text", speaker:"Colette", expression:"warm", text:"……好。" },
  { type:"text", speaker:"Colette", expression:"serious",
    text:"我跟你说一件事，你听完，自己决定。\n他这个人，对外强势，对内极度自律。三十年了，从他一开始创业到现在，\n他没给自己留过一个真正的「下班时间」。" },
  { type:"text", speaker:"你", text:"……" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"我们这些老员工，看着他从黑发熬到白发。\n中间几个本来很合适的人，都没等到他停下来——后来就各走各的了。" },
  { type:"text", speaker:"你", text:"（手心慢慢出汗）" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"GTC 那天他下台第一个找你。\n你知道这意味着什么吗？" },
  { type:"text", speaker:"你", text:"……我猜不到。" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"意味着——\n他这一次，没有把自己留在台上。" },

  { type:"narration", text:"那句话像一颗轻巧的石子，砸进了你心底很深的地方。" },
  { type:"narration", text:"你想说什么，但 Colette 笑了笑，挥了挥手。" },

  { type:"text", speaker:"Colette", expression:"smile",
    text:"我不是要给你压力。\n相反——如果你接得住，我替我们这些老兵高兴。" },
  { type:"text", speaker:"Colette", expression:"serious",
    text:"但如果你接不住——别拖。\n他这个人，认真起来，是真的认真。受伤也是真的伤。" },

  { type:"choice", choices:[
    { text:"「我不会让他受伤。」",                 affection:14, flag:{key:"colette_blessed",value:true} },
    { text:"「我会想清楚再回答您。」",             affection:8  },
    { text:"「……我现在比刚进来的时候，紧张多了。」", affection:10 },
  ]},

  { type:"text", speaker:"Colette", expression:"warm",
    text:"（轻笑）紧张就对了。\n说明你在认真想。" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"……走吧。茶你带回去喝，杯子下次还我。" },
  { type:"narration", text:"你站起身，走到门口，回头看了她一眼。" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"对了。" },
  { type:"text", speaker:"你", text:"嗯？" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"那个皮夹克——\n如果哪天他在你面前脱掉，那才是真的。" },
  { type:"text", speaker:"你", text:"……？" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"（笑而不语，挥挥手）\n回去吧。" },

  { type:"narration", text:"走出大楼的时候，风有点凉。\n你抱着那杯还冒着热气的乌龙，脑子里反复回放着她最后那句话。" },
  { type:"narration", text:"皮夹克。脱掉。才是真的。" },
  { type:"narration", text:"……什么意思？" },
  { type:"goto", target:"chapter5_gtc_keynote" },
],


/* ================================================================
   第五章：GTC 发布夜
   ================================================================ */
chapter5_gtc_keynote: [
  /* —— 后台开场 —— */
  { type:"scene", place:"GTC 主会场 · 后台监控室", time:"下午 17:30", weather:"晴",
    bg:"scene-gtc", mood:"tense", clearChars:true },

  { type:"narration", text:"GTC 当天，下午五点半。\n主会场后台的监控室。一整面墙上显示着所有摄像头的实时画面：\n主舞台、观众席、控制台、走廊、休息室。" },
  { type:"narration", text:"你被分配到 demo 控制席，戴着耳麦，盯着属于你那份的屏幕。\n手心一直在出汗。" },
  { type:"text", speaker:"舞台导演", text:"——主持人 OK，灯光 OK，观众入场完毕。\n黄总后台五分钟。" },
  { type:"narration", text:"五分钟后——他来了。\n身上还是那件皮夹克，刚刚似乎被熨烫过。" },

  { type:"char", id:"jensen", expression:"thinking", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"（看了你一眼）……你紧张吗？" },
  { type:"text", speaker:"你", text:"……不紧张是假的。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"我紧张三十年了，没好过。\n（伸手在你肩膀上轻轻拍了一下）\n但我学到一件事——上台前别压紧张，借它的力。" },

  { type:"choice", choices:[
    { text:"「您拍的这一下，我能记一辈子。」",     affection:9 },
    { text:"「……明白。借力。」",                 affection:6 },
    { text:"「我不会让您失望的。」",             affection:11, flag:{key:"vow_keynote",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"——好。我上台了。" },

  /* —— 上台 —— */
  { type:"scene", place:"GTC 主舞台", time:"下午 18:00", weather:"晴",
    bg:"scene-gtc", mood:"romantic" },
  { type:"narration", text:"灯光熄灭。\n主舞台后方的巨型 LED 慢慢亮起，是 NVIDIA 标志性的绿色。\n那一秒，整座会场的呼吸都停了。" },
  { type:"narration", text:"——他走上台。" },
  { type:"narration", text:"全场欢呼，像一场海啸。\n你戴着耳麦，从监控室的角度看他——\n他从来没有这么发亮过。" },

  { type:"text", speaker:"黄仁勋", expression:"proud",
    text:"……Welcome to GTC.\n今天，我们要讨论的，是「下一个十年」。" },
  { type:"narration", text:"他开始讲。\n讲到一半，他打了一个比喻——\n「当 AI 能看懂世界，我们终于不再是孤独的物种。」" },
  { type:"narration", text:"那句话不在原稿里。\n你从耳麦那头听见后台导演的低声惊叹。" },

  { type:"text", speaker:"舞台导演", text:"——demo 倒计时三十秒。准备就绪。" },
  { type:"text", speaker:"你", text:"（手悬在 Enter 键上，深吸了一口气）" },
  { type:"narration", text:"三、二、一——" },
  { type:"narration", text:"你按下了那个键。" },
  { type:"narration", text:"主屏上，那段你昨晚以为再也跑不起来的代码，开始流畅地展开。\n推理速度、token 输出、模型生成的画面——一切都精确，干净，漂亮。" },
  { type:"narration", text:"全场掌声。" },
  { type:"narration", text:"他在台上，向你的方向（监控室）微微点了一下头。" },
  { type:"flag", key:"demo_pressed", value:true },

  { type:"narration", text:"一万两千人的会场。\n你站在后台，听着现场的欢呼声一浪高过一浪。" },
  { type:"narration", text:"你的 demo，在那块巨大的屏幕上跑得行云流水——像它从来没有在凌晨崩过一样。" },
  { type:"narration", text:"三十分钟后，他走下台。人群在他身后久久未散。" },

  { type:"char", id:"jensen", expression:"proud", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"proud",
    text:"（摘下领夹麦）……跑起来了。" },
  { type:"text", speaker:"你", text:"跑起来了。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"（没忍住笑）一万两千人看着你昨晚写的代码在跑。\n感觉怎么样？" },
  { type:"text", speaker:"你", text:"腿有点软。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh", text:"哈哈！正常，我第一次 keynote 也腿软。" },

  { type:"narration", text:"工作人员涌进来，签名、合影、媒体……\n他被人流带着向前走，回头看了你一眼，比了一个「稍等」的手势。" },
  { type:"narration", text:"二十分钟后，他从人群中突围出来，直接走到你面前。" },

  { type:"char", id:"colette", expression:"smile", slot:"right", placeholder:true },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"（凑过来，压低声音）你知道吗，他今天谢幕之后，第一个找的人是你。" },
  { type:"text", speaker:"你", text:"……（心跳）" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"我做了六年他的 CFO，从来没见过这样。（意味深长地笑）" },
  { type:"char", id:"colette", hide:true, slot:"right" },

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（走回来）After party 要去吗？" },

  { type:"choice", choices:[
    { text:"「去，陪您。」",                           affection:8  },
    { text:"「能不能……只有我们两个，不去 party？」", affection:14, flag:{key:"private",value:true} },
    { text:"「我今晚想早点睡，昨晚没合眼。」",       affection:3  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（轻声）……行。我知道一个地方，安静。" },
  { type:"narration", text:"他带你去了总部楼顶。不是那个有人来的天台——是一个更小的、藏在水冷设备后面的角落。\n有两把折叠椅，像是放了很久。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"我有时候一个人来这里坐。会场的噪音传不上来。" },
  { type:"text", speaker:"你", text:"……您之前一个人坐两把椅子？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（顿了一下）\n……嗯。" },
  { type:"narration", text:"那一刻，你们都没再说话。\n城市的灯光在远处静静燃烧，和你胸口的温度，差不多。" },
  { type:"goto", target:"interlude_flight" },
],

/* ================================================================
   过场：去东京的航班
   ================================================================ */
interlude_flight: [
  { type:"scene", place:"旧金山机场 · 国际航站楼", time:"清晨 06:40", weather:"薄雾",
    bg:"scene-lobby", mood:"calm", clearChars:true },

  { type:"narration", text:"凌晨四点的闹钟。\n登机口的咖啡机。\n你比他早到十分钟，攥着登机牌，等着。" },
  { type:"narration", text:"远远看见那件皮夹克——他来了，背着一个旧的双肩包。\n双肩包。不是公文包。" },
  { type:"char", id:"jensen", expression:"smile", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"早。睡了吗？" },
  { type:"text", speaker:"你", text:"……没有。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"那我们俩一样。\n上去补觉。" },

  { type:"scene", place:"NH-007 班机 · 商务舱", time:"上午 09:25", weather:"高空",
    bg:"scene-rooftop", mood:"calm" },
  { type:"narration", text:"波音 777，商务舱第一排。\n他靠走道，你靠窗。" },
  { type:"narration", text:"飞机刚起飞十五分钟，他已经把笔记本电脑打开了。\n屏幕上是一份英文文档，字小到你看不清楚。" },

  { type:"text", speaker:"你", text:"……您在看什么？" },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"日本市场策略。\n这次峰会上有个发言，三十分钟。" },
  { type:"text", speaker:"你", text:"还没写完？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"我从来不提前写完。\n讲的过程才是写的过程。" },
  { type:"text", speaker:"你", text:"……（这就是 keynote 王者吗）" },

  { type:"narration", text:"空乘走过来送早餐。他点了煎蛋，你点了粥。\n他把自己的小面包放到你的托盘上。" },
  { type:"text", speaker:"你", text:"……？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"我不爱吃面包。\n你早上没吃东西。" },
  { type:"text", speaker:"你", text:"（小声）……谢谢。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"客气什么。我们吃过烧饼油条的。" },

  { type:"narration", text:"他低头继续工作。你看着窗外的云海，心里有种奇怪的安稳。" },
  { type:"narration", text:"中途他去了一趟洗手间，你才发现——他的笔记本屏幕上有一行小注释：" },
  { type:"narration", text:"「记得给 X 留时间——别把所有 break 都讲满了。」" },
  { type:"narration", text:"X 是你的名字缩写。" },
  { type:"narration", text:"……他在为你留时间。" },
  { type:"flag", key:"flight_note", value:true },

  { type:"narration", text:"他回来的时候，看见你正盯着屏幕发呆。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（默默把笔记本合上）\n……你不该看的。" },

  { type:"choice", choices:[
    { text:"「我没看见。」",                       affection:5 },
    { text:"「……谢谢您。」",                     affection:11 },
    { text:"「以后您 break 也别讲满，我陪您坐着。」", affection:14, flag:{key:"flight_promise",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"loving", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（耳根又红了）\n……睡觉。再四个小时落地。" },
  { type:"narration", text:"他放下椅背，闭上眼睛。\n二十分钟后，他真的睡着了。" },

  { type:"narration", text:"你侧过头看他——\n没有 keynote 时的气场，没有发布会时的笑容。\n只有一个安静睡着的、有点疲惫的中年男人。" },
  { type:"narration", text:"你看了很久，久到自己都觉得不好意思。" },
  { type:"narration", text:"飞机引擎的低鸣。\n窗外是一片白茫茫的云。\n你忽然明白了 Colette 那句话——\n「他这一次，没有把自己留在台上。」" },

  { type:"narration", text:"成田机场到了。\n你伸手轻轻碰了碰他的肩膀。" },
  { type:"text", speaker:"你", text:"……Jensen，到了。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised",
    text:"（一下就醒了）……嗯。\n（看了你一眼，又恍惚了一秒）……刚才——" },
  { type:"text", speaker:"你", text:"嗯？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……没事。下飞机吧。" },
  { type:"narration", text:"你不知道他原本想说什么。\n但你猜，应该是不重要的事。" },
  { type:"narration", text:"——也或许，是非常重要的事。" },
  { type:"goto", target:"chapter6_tokyo" },
],

/* ================================================================
   第六章：东京雨夜
   ================================================================ */
chapter6_tokyo: [
  { type:"scene", place:"东京 · 港区某酒店大堂", time:"傍晚 18:30", weather:"小雨",
    bg:"scene-rooftop", mood:"romantic", clearChars:true },
  { type:"char", id:"jensen", expression:"smile", pose:"stand", slot:"center", placeholder:true },

  { type:"narration", text:"GTC 后三周，他真的带你来了东京。\n名义上是出席一场 AI 峰会，但他把你的名字加在了随行名单上。" },
  { type:"narration", text:"酒店大堂里，雨声从旋转门缝里渗进来，带着秋天的湿意。" },

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（看了看外面的雨）你带伞了吗？" },
  { type:"text", speaker:"你", text:"……没有。" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"工程师通病——只会在代码里做异常处理，真实世界忘了备份。" },
  { type:"text", speaker:"你", text:"（无奈）……您也没带吧。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……（看了看自己的手）我让助理拿的。" },
  { type:"text", speaker:"你", text:"（心想：特权阶层）" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（好像看透了你在想什么）\n晚上峰会结束之后，想去哪里？" },

  { type:"choice", choices:[
    { text:"「浅草寺？我想看夜景。」",               affection:6 },
    { text:"「随您——我想看您想去哪里。」",           affection:10, flag:{key:"tokyo_follow",value:true} },
    { text:"「有没有安静的居酒屋，我请您喝一杯？」", affection:12, flag:{key:"tokyo_drink",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"surprised",
    text:"你请我喝酒？" },
  { type:"text", speaker:"你", text:"对。您一直请我，该换我了。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……好。（停了一下）好久没有人请我了。" },

  /* —— 东京白天 · 秋叶原 —— */
  { type:"scene", place:"东京 · 秋叶原小巷", time:"下午 15:20", weather:"小雨转晴",
    bg:"scene-cafe", mood:"romantic" },

  { type:"narration", text:"峰会结束后还有半天空闲。\n他没有让司机来接，而是带着你走出酒店，转了三趟地铁。" },
  { type:"narration", text:"——秋叶原。" },
  { type:"text", speaker:"你", text:"……您带我来这里？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"这里是我心里的「圣地」。\n你之前不是问过我，1997 年来日本买的那个 PSP 在哪儿——我带你去看那家店。" },

  { type:"narration", text:"巷子很窄，两边都是密密麻麻的电子配件店和模型店。\n二楼以上的招牌一个叠着一个，像一本立体的电子杂志。" },
  { type:"narration", text:"他在一家很旧的小店门口停了下来。\n店招牌上的字已经掉了一半，玻璃门上贴着泛黄的「FAMICOM」海报。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"——就是这家。\n二十七年了，店还在。" },
  { type:"text", speaker:"你", text:"老板还认得您吗？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"当年我太狼狈了，他大概早忘了。" },

  { type:"narration", text:"店里只有一个老爷爷在柜台后面打瞌睡。\n货架上零件密密麻麻，从初代 GameBoy 主板到 90 年代的显卡都有。" },

  { type:"text", speaker:"老板", text:"いらっしゃい——\n（看了一眼，又看了第二眼）……あれ？" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"老板", text:"（用磕巴的英语）你……你是不是 1997 年，买过我们最后一台 PSP——还在飞机上拆开看的那个？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"……（愣住，然后大笑）\n是我。是我。" },
  { type:"text", speaker:"老板", text:"那台机器，你拆完，写信寄回来给我说哪里设计得不好。\n我留了二十七年，等你来取——" },

  { type:"narration", text:"老板从柜台底下拿出一个旧木盒。\n打开——\n里面是一台已经发黄的 PSP，旁边夹着一封信。" },

  { type:"choice", choices:[
    { text:"「……您还真写过信？」",                       affection:7 },
    { text:"「（递纸巾）您可以哭一下没事的。」",         affection:11, flag:{key:"tokyo_tissue",value:true} },
    { text:"「老板，谢谢您。」",                         affection:8 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（接过盒子，手指微微发抖）\n谢谢。" },
  { type:"narration", text:"他没有当场打开信封，只是把整个木盒小心地放进双肩包里。\n出门的时候，雨已经停了。\n秋日下午的阳光落在窄巷尽头，像一条狭长的金色河。" },

  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"……我从来没跟人讲过这件事。" },
  { type:"text", speaker:"你", text:"现在讲了。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……是啊。" },
  { type:"narration", text:"他没有看你，但他下意识地，把双肩包的肩带往你这边换了一下。\n两个人并肩走，肩膀偶尔会撞到。" },
  { type:"flag", key:"tokyo_psp", value:true },

  { type:"narration", text:"傍晚时分，你们去了一家不起眼的家庭式拉面店吃饭。\n他点了酱油味噌，你点了豚骨。\n他偷偷把自己的卤蛋放到你碗里，被你抓包。" },
  { type:"text", speaker:"你", text:"……您又来。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（默默把卤蛋切了一半，自己留一半）" },
  { type:"text", speaker:"你", text:"（笑出声）" },

  { type:"scene", place:"东京 · 隐居酒屋「雨屋」", time:"深夜 22:10", weather:"雨",
    bg:"scene-rooftop", mood:"romantic" },
  { type:"narration", text:"酒屋很小，只有六张桌子，雨打在木格窗上，声音细碎而持续。\n你们坐在靠里的角落，各自点了一杯。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"（看着酒杯）……你知道我第一次来日本是什么时候吗？" },
  { type:"text", speaker:"你", text:"什么时候？" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"1997 年。公司快撑不住了，我飞过来找投资，被十八家公司拒绝了。\n最后一天，我一个人在秋叶原逛到晚上十点，买了个 PSP 回去。" },
  { type:"text", speaker:"你", text:"（没忍住）……PSP？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"嗯。然后在飞机上拆开来研究里面的芯片。\n被旁边的人投诉了说我占用扶手。" },
  { type:"narration", text:"你笑得把酒呛出来了。\n他递给你纸巾，眼睛里带着一点点得逞的笑意。" },

  { type:"text", speaker:"你", text:"（擦嘴）……您这人，比采访里有意思多了。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"（静静看着你）\n……你也是。" },

  { type:"narration", text:"雨声把酒屋里的一切都调成了慢速。\n他说这话的时候，眼神没有移开。" },

  { type:"choice", choices:[
    { text:"「（对视，没移开眼神）」",                       affection:16, flag:{key:"tokyo_gaze",value:true} },
    { text:"「（笑着低头，拨弄酒杯）」",                   affection:10 },
    { text:"「……怎么突然说这个。」",                       affection:7  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（轻声）\n……我有时候想，如果三十年前就遇到你，会不会少走很多弯路。" },
  { type:"text", speaker:"你", text:"（心跳急速）……" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"（收回目光，喝了口酒）\n……算了，这种话不该说。" },

  { type:"choice", choices:[
    { text:"「为什么不该说？」",                             affection:14, flag:{key:"pushed_him",value:true} },
    { text:"「……（沉默，但没有否认）」",                   affection:11 },
    { text:"「我也这么想过。」",                           affection:18, flag:{key:"confessed_hint",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……（看着你）" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"（很轻，像是自言自语）\n……你让我很难，你知道吗。" },
  { type:"narration", text:"雨还在下。\n你们各自端着酒杯，谁都没有先开口。\n但房间里有什么东西，悄悄改变了形状。" },
  { type:"flag", key:"tokyo_night", value:true },
  { type:"goto", target:"interlude_ryan" },
],

/* ================================================================
   过场：旧友 Ryan 来访
   ================================================================ */
interlude_ryan: [
  { type:"scene", place:"旧金山 · 渔人码头某酒馆", time:"傍晚 19:20", weather:"晴",
    bg:"scene-cafe", mood:"calm", clearChars:true },

  { type:"narration", text:"东京回来后第三天。\n大学同窗 Ryan 给你发消息——他来旧金山出差，问你今晚有没有空喝一杯。" },
  { type:"narration", text:"你已经一年多没见他了。\n上次见，是他刚跳槽到湾区一家做 LLM infra 的中型公司。" },

  { type:"narration", text:"——酒馆里。\n他比你先到，已经开了一瓶 IPA。" },
  { type:"text", speaker:"Ryan", text:"哟——稀有动物现身了。\n一年没见，发福了。" },
  { type:"text", speaker:"你", text:"……你才发福。" },
  { type:"text", speaker:"Ryan", text:"我承认。\n（敬了一下杯）NVIDIA 怎么样？听说你打了一手 GTC 漂亮的 demo。" },

  { type:"text", speaker:"你", text:"……还行。" },
  { type:"text", speaker:"Ryan", text:"行了行了，朋友圈我都点了赞。\n（喝了一口，看着你）……不过你今天不太对劲。" },
  { type:"text", speaker:"你", text:"……什么？" },
  { type:"text", speaker:"Ryan", text:"你眼神。\n以前你聊 paper 的时候眼睛是亮的。\n今天你听我提 paper，反应慢半拍。" },

  { type:"narration", text:"……你忍不住低头喝了一口酒。" },
  { type:"text", speaker:"Ryan", text:"——是工作太累，还是……" },
  { type:"text", speaker:"Ryan", text:"……唉，不会吧。\n你别告诉我，你又栽在哪个公司里的人身上了。" },

  { type:"text", speaker:"你", text:"……（沉默）" },
  { type:"text", speaker:"Ryan", text:"……" },
  { type:"text", speaker:"Ryan", text:"是谁啊？说说看。" },

  { type:"choice", choices:[
    { text:"「不能说。保密协议。」",                     affection:0  },
    { text:"「……一个比我大很多的人。」",                 affection:0, flag:{key:"told_ryan",value:true} },
    { text:"「就是你猜不到的那个人。」",                 affection:0, flag:{key:"told_ryan",value:true} },
  ]},

  { type:"text", speaker:"Ryan", text:"……比你大很多？" },
  { type:"text", speaker:"Ryan", text:"……NVIDIA 里比你大很多的——\n（停下，盯着你）……不会吧。" },
  { type:"text", speaker:"你", text:"（红了脸）……不要乱猜。" },
  { type:"text", speaker:"Ryan", text:"……（看了你三秒）……你没乱猜也乱不到这里。" },

  { type:"narration", text:"Ryan 沉默了一会儿，把杯子放下。\n他这个人平时嘴贱，但真正认真的时候，眼睛会变得很稳。" },

  { type:"text", speaker:"Ryan", text:"……我不评判。\n他这个人，就算抛开 CEO 那一层，单看为人，确实——很 NVIDIA。" },
  { type:"text", speaker:"你", text:"……什么意思？" },
  { type:"text", speaker:"Ryan", text:"很硬核。\n硬核到你想跟他比拼一辈子，那种。" },

  { type:"narration", text:"你笑了一下。\n这是你第一次在朋友面前承认这件事，没那么尴尬。\n——反而像是把心里某根紧绷了好久的弦，松开了一格。" },

  { type:"text", speaker:"Ryan", text:"我就一个建议——\n你想清楚自己要的是什么。" },
  { type:"text", speaker:"Ryan", text:"是想跟他工作十年，还是想跟他活十年。\n这两个不冲突，但侧重点不一样。" },

  { type:"choice", choices:[
    { text:"「……我都想要。」",                       affection:8, flag:{key:"want_both",value:true} },
    { text:"「我想跟他活十年。」",                   affection:13, flag:{key:"want_life",value:true} },
    { text:"「能跟他工作十年我就满足。」",           affection:5  },
  ]},

  { type:"text", speaker:"Ryan", text:"……（笑了）你想清楚了。\n那我就放心了。" },
  { type:"text", speaker:"Ryan", text:"对了——\nApex 那边前几天又问起你了。\n一个叫 Marcus 的家伙托我打听打听——你好像把他得罪了？" },
  { type:"text", speaker:"你", text:"……他自己来挖过我，被我拒了。" },
  { type:"text", speaker:"Ryan", text:"……行吧。\n（顿了顿）——那我帮你回他：\n这位仁兄已经把自己许给老 NVIDIA 了，别打扰。" },

  { type:"text", speaker:"你", text:"……Ryan，谢谢。" },
  { type:"text", speaker:"Ryan", text:"客气什么。\n你高兴就行。\n不过——" },
  { type:"text", speaker:"Ryan", text:"……如果哪天他对不起你——\n你回头找我喝酒，我陪你骂他到天亮。" },
  { type:"text", speaker:"你", text:"……（笑）……希望用不上。" },
  { type:"text", speaker:"Ryan", text:"嗯。我也希望用不上。" },

  { type:"narration", text:"那天晚上你回家，走在码头边的木板路上。\n海风很大，但你不冷。" },
  { type:"narration", text:"——把这件事说出来，原来是这种感觉。\n你松了一口气，心里也明白了一点：" },
  { type:"narration", text:"……你不只是在喜欢一个 CEO。\n你是在喜欢——一个普通人。\n一个会蹲在 7-Eleven 冷藏柜前犹豫泡面、深夜亲手帮你修 bug、被打开抽屉就有塑料叉子的，普通人。" },
  { type:"goto", target:"chapter7_rooftop" },
],

/* ================================================================
   第七章：屋顶的星空
   ================================================================ */
chapter7_rooftop: [
  /* —— 屋顶之前的十天 —— */
  { type:"scene", place:"NVIDIA 总部 · 你的工位", time:"傍晚 18:40", weather:"晴",
    bg:"scene-lobby", mood:"calm", clearChars:true },

  { type:"narration", text:"东京回来后，他消失了一段时间。\n出席了三场峰会，飞了六个城市，没有主动联系你。" },
  { type:"narration", text:"你告诉自己：他是 CEO，他有一万件事要做。\n你告诉自己：那个雨夜只是气氛烘托。\n你告诉自己：……不要动摇。" },
  { type:"narration", text:"但你每天检查手机的次数，比你 commit 的次数还多。" },

  { type:"text", speaker:"你", text:"（盯着屏幕，第三次输错密码）……" },
  { type:"text", speaker:"你", text:"（深呼吸）专注。\n他没消息，是因为他忙。\n你不要乱想。" },

  { type:"narration", text:"——但你确实在乱想。" },

  /* —— Colette 路过 —— */
  { type:"char", id:"colette", expression:"warm", slot:"right", placeholder:true },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"……你又在等他消息？" },
  { type:"text", speaker:"你", text:"……（被抓包）我没有。" },
  { type:"text", speaker:"Colette", expression:"smile",
    text:"他从来都是这样。一旦想清楚一件事，他会先消失，然后回来给你一击。" },
  { type:"text", speaker:"你", text:"……一击？" },
  { type:"text", speaker:"Colette", expression:"warm",
    text:"……做好心理准备。\n（顿了顿）也做好幸福的准备。" },
  { type:"char", id:"colette", hide:true, slot:"right" },

  { type:"narration", text:"那天晚上，你回家躺在床上，盯着天花板。\n手机静静地放在枕边。" },
  { type:"narration", text:"你不知道自己在等什么。但你知道，你在等。" },

  /* —— 第七天 · 雨天便利店偶遇 —— */
  { type:"scene", place:"圣何塞 · 7-Eleven 街角", time:"晚上 21:14", weather:"骤雨",
    bg:"scene-cafe", mood:"calm" },
  { type:"narration", text:"——他消失的第七天。" },
  { type:"narration", text:"加州罕见的暴雨。\n你伞没带，临时跑进路口的 7-Eleven 躲雨。" },
  { type:"narration", text:"店里只有一个收银员、一只睡着的猫、和几排冷藏柜。\n热柜里的关东煮在咕嘟咕嘟地冒泡。" },
  { type:"narration", text:"你随手拿了瓶水准备结账——\n余光瞥见冷藏柜前蹲着一个人。" },
  { type:"narration", text:"……黑色皮夹克。\n……白头发。" },
  { type:"narration", text:"……" },

  { type:"char", id:"jensen", expression:"surprised", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"surprised",
    text:"……（抬头，也愣住了）" },
  { type:"text", speaker:"你", text:"……黄总？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（手里端着一盒泡面）\n……你怎么在这里。" },
  { type:"text", speaker:"你", text:"我躲雨。\n您……" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……我也是。" },
  { type:"text", speaker:"你", text:"（指着他手里的泡面）……您晚饭吃这个？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"……回家路上突然想吃。\n（默默把另一盒同款放回去）……不要告诉 Colette。" },

  { type:"narration", text:"你忍不住笑了——\n这种被抓包的表情，跟一个普通人没区别。" },

  { type:"choice", choices:[
    { text:"「（拿过他手里的泡面，加了一袋鱼丸）一起。」", affection:13, flag:{key:"rainy_share",value:true} },
    { text:"「我替您保密。」",                             affection:7  },
    { text:"「您一个人来便利店，挺难得的。」",             affection:6  },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"shy", text:"……" },
  { type:"narration", text:"你们站在便利店里，把一份泡面+鱼丸热好。\n外面的雨下得更大了。" },
  { type:"narration", text:"店里没有座位，只有窗口一条窄长的台。\n你们并排站着，看雨水在马路上打出细小的水花。" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"……这十天，对不起。" },
  { type:"text", speaker:"你", text:"……您不需要道歉。" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"我在想一件事。\n想得有点狠。" },
  { type:"text", speaker:"你", text:"……什么事？" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"想——\n如果我对一个人认真起来，我能不能给得起。\n这种问题，我已经很多年没有问过自己了。" },

  { type:"narration", text:"……你的呼吸停了一拍。" },

  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……我没想到，会在便利店里讲这个。" },
  { type:"text", speaker:"你", text:"……我也没想到。" },
  { type:"narration", text:"你们沉默地把那盒泡面分着吃完。\n他递了筷子给你的时候，手指停在你掌心顶端，那么一秒钟。" },
  { type:"flag", key:"rainy_711", value:true },

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……再过几天，等我想清楚——\n我会给你一个回答。" },
  { type:"text", speaker:"你", text:"我等。" },

  { type:"narration", text:"雨下得很大。\n你们各自打车走的时候，他叫的车先来。" },
  { type:"narration", text:"他上车之前回头看了你一眼。\n那个眼神不像 CEO，不像导师，也不像朋友——\n是某种你说不出口、但全身都识别得到的东西。" },
  { type:"narration", text:"——你一个人站在便利店门口，看着那辆车的尾灯消失在雨幕里。" },
  { type:"narration", text:"等了七天，没等到一条消息。\n但今晚，你忽然觉得，那个回答其实已经写在他刚才的眼神里。" },

  /* —— 凌晨的消息 —— */
  { type:"narration", text:"凌晨两点四十一分，手机亮了。\n屏幕上只有六个字：" },
  { type:"narration", text:"「顶楼，有空吗？」" },
  { type:"narration", text:"你盯着这条消息看了三十秒。\n然后从床上坐起来，开始穿衣服。" },

  /* —— 屋顶 —— */
  { type:"scene", place:"NVIDIA 总部 · 隐藏天台", time:"深夜 23:15", weather:"繁星",
    bg:"scene-rooftop", mood:"romantic", clearChars:true },
  { type:"char", id:"jensen", expression:"thinking", pose:"leaning", slot:"center", placeholder:true },

  { type:"narration", text:"东京回来后，又过了十天。\n他消失了一段时间——出席了三场峰会，飞了六个城市，没有主动联系你。" },
  { type:"narration", text:"你以为那个雨夜只是一场气氛烘托下的瞬间。\n然后某天凌晨，手机亮了，一条消息：顶楼，有空吗？" },
  { type:"narration", text:"那块「藏在水冷设备后面的角落」，他还放了两把椅子。\n但这次多了一个小型望远镜。" },

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（指着天空）今晚云少，能看见猎户座。" },
  { type:"text", speaker:"你", text:"（坐下）……您特地搬了望远镜上来？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（停了一下）\n……我就是顺手带上来的。" },
  { type:"text", speaker:"你", text:"（心里：这借口有点薄）" },

  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"（望向城市）我有时候会来这里，想事情。\n从这里看下去，整个硅谷像一块巨大的芯片——\n每一盏灯是一个晶体管，每一条路是总线。" },
  { type:"text", speaker:"你", text:"那我们是什么？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（想了想）\n……GPU 核心？\n负责所有真正的并行运算。" },

  { type:"choice", choices:[
    { text:"「那我可以是您的散热片吗——帮您降温。」", affection:16, flag:{key:"cooler",value:true} },
    { text:"「……您真的是个浪漫的工程师。」",         affection:9  },
    { text:"「那我们要保持同频才行。」",               affection:11 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"哈哈哈哈——\n（忍笑失败）散热片！你是第一个这样说的！" },
  { type:"text", speaker:"你", text:"（自豪）……这是真心话。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"（笑意渐渐平静，换成一种更深的神情）\n……其实，你不只是散热片。" },
  { type:"narration", text:"风从城市上空掠过，吹乱了他花白的发梢。\n你们之间的距离，不知道什么时候缩短了一点。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"……我想跟你说一件事。\n但说出口之前，我需要知道——\n你打算在 NVIDIA 待多久？" },
  { type:"text", speaker:"你", text:"（想起了 Marcus）" },

  { type:"choice", choices:[
    { text:"「只要这里需要我，我就在。」",               affection:10 },
    { text:"「我来这里，不只是为了工作。」",             affection:18, flag:{key:"commit",value:true} },
    { text:"「……说实话，Apex 上周找过我。」",           affection:-2, flag:{key:"told_apex",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"serious", text:"……Apex 找你了？" },
  { type:"text", speaker:"你", text:"我拒绝了。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"（沉默了很长时间，然后轻声）\n……谢谢你告诉我。\n谢谢你留下来。" },
  { type:"narration", text:"星空下，那句话落地的声音很轻。\n但你听到了，听得很清楚。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"我下周要去台北总部待几天。\n你……要不要一起？" },
  { type:"choice", choices:[
    { text:"「去哪都行，只要你在。」", affection:16, flag:{key:"go_anywhere",value:true} },
    { text:"「好，我想看看台湾的夜景。」", affection:9 },
    { text:"「……您真的要带上我？」", affection:7 },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（站起来，望向夜空）\n明天早上八点的班机。别迟到。" },
  { type:"narration", text:"他走了之后，你在天台上多坐了一会儿。\n那个望远镜还架在那里——你凑过去，找到了猎户座。" },
  { type:"goto", target:"chapter8_confession" },
],

/* ================================================================
   第八章：告白
   ================================================================ */
chapter8_confession: [
  /* —— 台北 · 出差最后一夜的铺垫 —— */
  { type:"scene", place:"台北 · 总部楼下", time:"深夜 23:32", weather:"晴",
    bg:"scene-office-night", mood:"romantic", clearChars:true },

  { type:"narration", text:"台北。\n你们在这里出差，已经第五天。" },
  { type:"narration", text:"明天就要飞回加州。\n他白天的会议都结束了，没让你跟最后一场——\n说是「你早点去吃个饭，今晚要单独跟你聊几句。」" },
  { type:"narration", text:"你站在总部楼下，仰头看那栋透着绿色 logo 的高楼。\n夜风温柔，吹得人想做一些不切实际的事情。" },

  { type:"text", speaker:"你", text:"（心跳）……他要说什么？" },
  { type:"narration", text:"你想起这五个月发生的事——" },
  { type:"narration", text:"大厅初遇。\n深夜的乌龙茶。\n咖啡馆的拿铁。\n董事会的二十二分钟。\nGTC 凌晨的 kernel panic。\n永和阿嬷的烧饼油条。\n秋叶原小巷里的 PSP。\n屋顶上那个望远镜……" },
  { type:"narration", text:"——五个月。\n说短，确实短。\n说长，每一帧你都记得。" },

  { type:"narration", text:"你深深吸了一口台北的夜风，按下电梯。\n42 层。" },
  { type:"narration", text:"——叮。" },

  /* —— 顶层办公室 —— */
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 11:47", weather:"晴朗",
    bg:"scene-confession", mood:"romantic", clearChars:true },
  { type:"char", id:"jensen", expression:"loving", pose:"hand_chin", slot:"center", placeholder:true },

  { type:"narration", text:"台北，深秋。\n从你入职算起，整整五个月。" },
  { type:"narration", text:"外面是 101 大楼的灯火，房间里是你们最熟悉的安静。" },
  { type:"narration", text:"但今晚，这间屋子里有什么不一样的东西在流动。" },

  { type:"narration", text:"——他没坐在桌子后面。\n他站在窗边，背对着你，手里端着一杯没动过的茶。" },
  { type:"text", speaker:"你", text:"……Jensen？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……（缓缓转过身）\n来了。" },
  { type:"narration", text:"你忽然发现——\n他今天没有穿那件皮夹克。" },
  { type:"narration", text:"……穿的是一件你从来没见过的、深灰色的薄毛衣。" },
  { type:"text", speaker:"你", text:"（心脏狂跳）……" },
  { type:"narration", text:"——你想起了 Colette 那句话：\n「那个皮夹克——如果哪天他在你面前脱掉，那才是真的。」" },
  { type:"flag", key:"jacket_off", value:true },

  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"这一路走来，真的很感谢有你在我身边。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"你总是那么理解我，支持我……" },
  { type:"text", speaker:"你", text:"（心跳……他在说什么……）" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"Denny's 那个故事，我只告诉过两个人。\nLori，还有你。" },
  { type:"narration", text:"你没有说话。房间里的灯光很柔，把他的侧脸描成一道温暖的轮廓。" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"我做 CEO 三十年，学会了一件事——\n有些位置，是孤独的。\n你往上看，只有天花板。往下看，都是责任。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"但有一段时间，我开始往旁边看。" },
  { type:"narration", text:"他说这话的时候，目光落在了你身上。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"如果没有你，或许就没有今天 GTC 的那场 demo。\n如果没有你，董事会那天，我可能真的撑不住那个方向。" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……你愿意一直陪着我，和我一起看向更远的未来吗？ ♥" },
  { type:"narration", text:"空气在这一刻停住了。\n窗外，台北 101 的灯一闪一灭，像在等一个答案。" },

  { type:"choice", choices:[
    { text:"牵起他的手",       flag:{key:"choice_hand",value:true},    goto:"ending_gate" },
    { text:"告诉他你的心意",   flag:{key:"choice_confess",value:true}, goto:"ending_gate" },
    { text:"再多陪陪他",       flag:{key:"choice_stay",value:true},    goto:"ending_gate" },
  ]},
],

/* ================================================================
   结局路由
   ================================================================ */
ending_gate: [
  { type:"cond", cases:[
    /* —— BAD：好感太低 —— */
    { test: s => s.affection < 25,
      target: "ending_bad" },

    /* —— SECRET：极高好感 + 全程关键 flag —— */
    /* 需要：散热片梗 + 承诺 + 拒绝 Apex + 东京夜 + 救 demo + 任意一个深度信任 flag */
    { test: s => s.affection >= 85
                && s.flags.cooler && s.flags.commit
                && s.flags.loyalty && s.flags.tokyo_night
                && s.flags.demo_saved
                && (s.flags.first_office_key
                    || s.flags.saved_disk
                    || s.flags.rainy_711
                    || s.flags.respect_past),
      target: "ending_secret" },

    /* —— TRUE：牵手选项 + 高好感 —— */
    { test: s => s.flags.choice_hand && s.affection >= 60,
      target: "ending_true" },
    { test: s => s.flags.choice_confess && s.affection >= 40,
      target: "ending_good" },
    { target: "ending_warm" },
  ]},
],

/* ================================================================
   TRUE END：我们就是未来
   ================================================================ */
ending_true: [
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 11:48", weather:"星光",
    bg:"scene-confession", mood:"ending", clearChars:true },
  { type:"char", id:"jensen", expression:"surprised", pose:"stand", slot:"center", placeholder:true },

  { type:"narration", text:"你没有说话。\n只是把手，轻轻放到了他的手上。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（很轻）……谢谢你。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"其实这段话，我准备了很久。\n从大厅第一次见到你开始，就一直……在等一个时机。" },
  { type:"text", speaker:"你", text:"……那为什么等了这么久才说？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"（低头笑了）\n因为我怕你转身加入 Apex。" },
  { type:"text", speaker:"你", text:"（笑出声）……您还记着这个。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"我什么都记得。\n你入职第一天穿的什么颜色的衬衫，你答的第一个问题用了几个字——" },
  { type:"text", speaker:"你", text:"（心脏融化）……黄总……" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"叫我 Jensen。\n或者……老黄，也可以。" },
  { type:"narration", text:"他笑了。\n不是发布会上那个沉稳自信的 CEO 的笑——\n是一种很少见的、像二十岁时候的、坦然的笑。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"从今天起——和我一起，重新定义一次「未来」吧。" },
  { type:"text", speaker:"你", text:"嗯。一起。" },
  { type:"narration", text:"台北 101 的灯光在窗外静静燃烧，像无数颗心脏同时跳动。\n你握住他的手，也握住了一整个时代的温度。" },

  /* —— TRUE END 后日谈 —— */
  { type:"scene", place:"GTC 主会场 · 三年后", time:"上午 10:00", weather:"晴",
    bg:"scene-gtc", mood:"ending", clearChars:true },
  { type:"narration", text:"——三年后。" },
  { type:"narration", text:"GTC，旧金山，主会场。\n黄仁勋在台上讲到 NVIDIA 下一代架构，停顿了一下。" },
  { type:"char", id:"jensen", expression:"proud", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"……今天我想介绍一个人。\n这个项目最初的架构图，是我们在三年前的一张餐巾纸上画出来的。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"——也是我这些年最重要的合作者。" },
  { type:"narration", text:"全场转头，看向第一排的你。\n你站起身。\n屏幕上，你和他三年前在那家咖啡馆里画的那张餐巾纸，被高清扫描出来。" },
  { type:"narration", text:"上面有他的字，也有你的字。\n中间用红笔画了一颗心——他后来在某个深夜偷偷加上去的。" },
  { type:"narration", text:"全场掌声。\n你看向台上，他也看向你，眨了一下眼。" },
  { type:"narration", text:"……一切，都从那张餐巾纸开始。" },
  { type:"ending",
    title:"TRUE END · 我们就是未来",
    endingKind:"true",
    text:"从那天起，每一次 GTC 的 keynote，你都站在最前排。\n他每一句「The more you buy, the more you save」，都是说给你听的情话。\n\n多年后，有记者问他成功的秘诀。\n他笑了笑，说：「找到一个愿意帮你修 1998 年 bug 的人，然后不要放手。」\n\n记者没懂。你懂。",
    note:"🌟 达成 TRUE END「我们就是未来」· 好感 " },
],

/* ================================================================
   GOOD END：心意相通
   ================================================================ */
ending_good: [
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 11:49", weather:"晴朗",
    bg:"scene-confession", mood:"ending", clearChars:true },
  { type:"char", id:"jensen", expression:"loving", pose:"stand", slot:"center", placeholder:true },

  { type:"text", speaker:"你",
    text:"Jensen。\n（深吸一口气）其实……从你第一次在大厅叫住我的那一刻，\n我的心就不受控制了。" },
  { type:"text", speaker:"你",
    text:"不是因为你是 CEO，不是因为 NVIDIA，不是因为皮夹克——\n是因为你。那个在 Denny's 坐了五个小时的你，\n那个凌晨两点坐下来帮我改 CUDA bug 的你。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"narration", text:"他沉默了很久，长到你以为自己说错了。\n然后他抬起头，用一种你从来没见过的、脆弱的眼神看着你。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"……我等这句话，等了很久了。" },
  { type:"text", speaker:"你", text:"（鼻子有点酸）多久？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……咖啡馆那天之后。\n你说「被人托住的感觉」——\n我当时差点直接说了。" },
  { type:"narration", text:"你们相视，然后同时笑了出来，笑声在空旷的办公室里回荡。\n窗外，台北 101 的灯光亮得像一枚心脏。" },

  /* —— GOOD END 后日谈 —— */
  { type:"scene", place:"圣何塞 · 一家不起眼的小馆子", time:"傍晚 19:30", weather:"晴",
    bg:"scene-cafe", mood:"ending", clearChars:true },
  { type:"narration", text:"——一年后。" },
  { type:"narration", text:"你们的第一次「正式约会」。\n不是商务晚餐，不是工作便饭——是真的约会。" },
  { type:"char", id:"jensen", expression:"shy", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……我第一次约会，紧张到比开 keynote 还紧张。" },
  { type:"text", speaker:"你", text:"您 keynote 都不紧张？" },
  { type:"text", speaker:"黄仁勋", expression:"laugh",
    text:"keynote 是工作。\n这个不是。" },
  { type:"narration", text:"他订的是一家很小的家庭餐馆，只有六张桌子。\n老板娘看你们的眼神有点激动——她已经认出他来了，但很贴心地没声张。" },
  { type:"narration", text:"你们点了菜，他从口袋里拿出一个小盒子，递给你。" },
  { type:"text", speaker:"你", text:"……这是？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"……一年纪念。\n（顿了顿）……不是戒指。是一枚 RIVA 的芯片。\n……（小声）……我第一款产品。" },
  { type:"text", speaker:"你", text:"（轻声笑）……您还真是个工程师。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"对你能想到的最好的礼物，就是从我自己开始的那一块。" },
  { type:"narration", text:"窗外的夕阳很慢地下山。\n你把那枚小小的芯片放在掌心，感觉到一种奇怪的、温热的重量。" },
  { type:"ending",
    title:"GOOD END · 心意相通",
    endingKind:"good",
    text:"你们没有立刻拥抱，也没有立刻接吻。\n只是坐在一起，把剩下的夜晚，慢慢说完。\n\n有些感情，不需要仪式，只需要一个清醒的夜晚，和一句等了很久的话。",
    note:"💖 达成 GOOD END「心意相通」· 好感 " },
],

/* ================================================================
   WARM END：细水长流
   ================================================================ */
ending_warm: [
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 11:50", weather:"晴朗",
    bg:"scene-office-night", mood:"ending", clearChars:true },
  { type:"char", id:"jensen", expression:"loving", pose:"hand_chin", slot:"center", placeholder:true },

  { type:"text", speaker:"你",
    text:"……再多陪陪你，好吗？" },
  { type:"text", speaker:"你",
    text:"我不急着给答案。\n因为我想要的，不是一晚上的心跳——\n而是一辈子的并肩。" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"……" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（轻笑）你啊。比我想象的……还要沉得住气。" },
  { type:"narration", text:"他没再追问，只是轻轻拉着你，让你靠在他肩上。\n城市的灯火在远处绵延，像一条无尽的算力增长曲线。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"……那就慢慢来。\n我等得起。" },

  /* —— WARM END 后日谈 —— */
  { type:"scene", place:"NVIDIA 总部 · 28 楼茶水间", time:"深夜 23:42", weather:"晴",
    bg:"scene-office-night", mood:"ending", clearChars:true },
  { type:"narration", text:"——两年后。某个加班的深夜。" },
  { type:"narration", text:"整层楼空荡荡的，只剩你和咖啡机的嗡鸣。\n你正在啃一篇论文，那种你看了三个小时还看不完的硬骨头。" },
  { type:"narration", text:"——脚步声。" },
  { type:"char", id:"jensen", expression:"smile", pose:"stand", slot:"center", placeholder:true },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"还在？" },
  { type:"text", speaker:"你", text:"还在。这篇——" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"我猜是 Hinton 那篇新的。我刚看完。" },
  { type:"narration", text:"他坐到你旁边，没有特别说什么。\n你们就这样并排坐着，他帮你倒了一杯茶，然后各自看各自的论文。" },
  { type:"narration", text:"中途你抬头，发现他不知什么时候已经睡着了——\n手里还握着一只笔，头微微靠向你的方向。" },
  { type:"narration", text:"你没动，怕惊醒他。\n咖啡机偶尔嗡一声，整层楼，只有你们两个人的呼吸。" },
  { type:"narration", text:"你想——\n这就是「细水长流」的样子吧。\n不是仪式，不是承诺，只是两个人，在深夜里，安静地共享同一片光。" },
  { type:"ending",
    title:"WARM END · 细水长流",
    endingKind:"good",
    text:"有些故事，不是一夜决定的。\n你选择了最慢但最稳的路，像一个精心设计的训练计划——不求最快收敛，只求不过拟合。\n\n之后的很多年，你们之间的事，一点一点地发生。\n没有戏剧性的转折，只有一次次深夜的对话，和一杯接一杯变凉的茶。",
    note:"☕ 达成 WARM END「细水长流」· 好感 " },
],

/* ================================================================
   BAD END：错过的频率
   ================================================================ */
ending_bad: [
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 11:50", weather:"晴朗",
    bg:"scene-office-night", mood:"tense", clearChars:true },
  { type:"char", id:"jensen", expression:"sad", pose:"stand", slot:"center", placeholder:true },

  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"……（沉默了很长时间）" },
  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"对不起……\n我说了不该说的话。" },
  { type:"text", speaker:"你", text:"……不，您没有说错什么——" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"（摇头）\n我们之间，也许差了太多东西。\n时间、位置、……还有频率。" },
  { type:"narration", text:"你想开口，但他已经转向窗边。\n那个背影，沉默而整洁，像一道关上的门。" },
  { type:"narration", text:"后来，你在 NVIDIA 又工作了两年。\n他依然是那个睿智、宽容、偶尔讲段子的 CEO。\n但那间顶层办公室，再没有第二次深夜邀约。" },

  /* —— BAD END 后日谈 —— */
  { type:"scene", place:"某家初创公司 · 你的新工位", time:"晚上 21:15", weather:"小雨",
    bg:"scene-cafe", mood:"tense", clearChars:true },
  { type:"narration", text:"——半年后。" },
  { type:"narration", text:"你从 NVIDIA 离职了，去了一家朋友推荐的初创公司。\n薪水没那么高，但晚上能按时下班。" },
  { type:"narration", text:"今晚你打开 YouTube，他在硅谷做新一场访谈。" },
  { type:"narration", text:"主持人问他：「这些年最遗憾的事是什么？」" },
  { type:"narration", text:"屏幕里的他笑了一下，回答了一些场面话。" },
  { type:"narration", text:"但在镜头切走的瞬间，他低头喝水——\n你看见他的手，在杯子上停了零点几秒。" },
  { type:"narration", text:"……可能只是网络卡顿。\n你这样告诉自己。" },
  { type:"narration", text:"窗外的雨很轻。\n你关掉了屏幕。" },
  { type:"ending",
    title:"BAD END · 错过的频率",
    endingKind:"bad",
    text:"有些时机，错过了就是错过了。\n不是谁的错——只是两颗信号，没有调到同一个频率上。\n\n也许下一次，你会早一点说出那些话。",
    note:"💔 达成 BAD END「错过的频率」· 好感不足，请提升好感度后重试" },
],

/* ================================================================
   SECRET END：皮夹克的秘密
   ================================================================ */
ending_secret: [
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 11:47", weather:"星光满天",
    bg:"scene-confession", mood:"ending", clearChars:true },
  { type:"char", id:"jensen", expression:"loving", pose:"hand_chin", slot:"center", placeholder:true },

  { type:"narration", text:"——在他说完那句话后，你没有立刻回答。" },
  { type:"text", speaker:"你",
    text:"……可以先问你一件事吗？" },
  { type:"text", speaker:"黄仁勋", expression:"surprised", text:"说。" },
  { type:"text", speaker:"你",
    text:"那件皮夹克——你每天都穿，从来没换过款式。\n是因为 Steve Jobs 的同款理由吗？\n还是……有别的原因？" },
  { type:"text", speaker:"黄仁勋", expression:"surprised",
    text:"……（愣了一下）\n你是第一个问这个问题的人。" },
  { type:"text", speaker:"你", text:"（平静）所以呢？" },
  { type:"text", speaker:"黄仁勋", expression:"shy",
    text:"（沉默了很久）\n……是 Lori 送我的。1993 年，公司第一次快撑不住的时候。\n她说：穿这个，记得你是谁。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"我之后买了很多件一样的，但……一直记得第一件。" },
  { type:"text", speaker:"你", text:"（轻声）……所以你每天都在记得。" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"（点头）\n以前是。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"现在……（看着你）……\n是因为每次穿上，我都想到一个愿意在凌晨两点帮我 debug 的人。\n一个说「可以是你的散热片」的人。\n一个拒绝了 Apex 三倍薪水的人。" },
  { type:"narration", text:"屋子里静得只剩台北的夜风。\n你感觉眼眶有些热。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"……我没办法只用一句话形容你对我的意义。\n所以我才一直没开口。" },
  { type:"text", speaker:"你", text:"（走过去，轻轻握住他的手）\n……那就不用一句话。\n慢慢说。我们有时间。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"（低声）……我们有时间。" },
  { type:"narration", text:"台北的夜，深到像一片海。\n你们站在窗边，没有大声说出任何承诺——\n只是手握着手，看向同一片星空。\n\n那已经，足够了。" },

  /* —— SECRET END 后日谈 —— */
  { type:"scene", place:"GTC 主会场 · 五年后", time:"上午 10:24", weather:"晴",
    bg:"scene-gtc", mood:"ending", clearChars:true },
  { type:"narration", text:"——五年后。" },
  { type:"narration", text:"GTC，圣何塞，主会场。\n他在台上讲完最后一个 demo，掌声铺天盖地。" },
  { type:"narration", text:"按照流程，他应该说一句感谢之词，然后退场。\n但他没有。" },
  { type:"char", id:"jensen", expression:"loving", pose:"stand", slot:"center", placeholder:true },
  { type:"narration", text:"他停住，看了一眼台下的第一排。\n然后——慢慢地——把那件标志性的黑色皮夹克，脱下来了。" },
  { type:"narration", text:"全场愣住。\n这是黄仁勋三十年来，第一次在舞台上脱下皮夹克。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（对着麦克风）\n这件夹克陪我走了很多年。\n但今天我想说——\n它的意义，已经完成了。" },
  { type:"text", speaker:"黄仁勋", expression:"loving",
    text:"因为我已经，找到了那个让我「记得我是谁」的人。" },
  { type:"narration", text:"全场屏住呼吸。\n他看向第一排——看向你。\n眨了一下眼。" },
  { type:"narration", text:"全场掌声雷动。媒体疯了。\n但你和他，只是隔着一段距离，安静地看着对方。" },
  { type:"narration", text:"皮夹克脱下来，才是真的。\nColette 当年那句话，五年之后，你才彻底懂了。" },
  { type:"ending",
    title:"✦ SECRET END · 皮夹克的秘密 ✦",
    endingKind:"true",
    text:"有些秘密，只说给懂的人听。\n\n后来，在某一年的 GTC，他在台上的某一刻——\n忽然偏离了 teleprompter，对着台下说：\n「这件皮夹克，今天有新的意义了。」\n\n没有人知道那句话是对谁说的。\n但你知道。\n因为台下第一排，你也在笑。",
    note:"✨ 达成 SECRET END「皮夹克的秘密」· 全收集结局" },
],

}; // END GAME_SCRIPT

