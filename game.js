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
  { type:"scene", place:"NVIDIA 总部 · 大厅", time:"清晨 09:02", weather:"晴朗",
    bg:"scene-lobby", mood:"calm", charName:"黄仁勋", clearChars:true },

  { type:"narration", text:"2024 年，硅谷的春天。\n空气里有栀子花香，还有某种说不清楚的……期待。" },
  { type:"narration", text:"你手里攥着那张绿色胸牌，脑子里反复回放着签 offer 时的激动。\nNVIDIA。你终于进来了。" },
  { type:"text", speaker:"你", text:"（深呼吸）……今天开始，我是 Team Green 的一员了。" },
  { type:"narration", text:"大厅里那块巨大的 GPU 芯片装置散发着幽幽的绿色光芒，像一枚未来的印章。" },
  { type:"text", speaker:"前台小姐姐", text:"欢迎加入 NVIDIA！请问是新入职的工程师吗？" },
  { type:"text", speaker:"你", text:"是的，今天第一天报到。" },
  { type:"text", speaker:"前台小姐姐", text:"哦！你就是那位……黄总特别点名要见的新人？" },
  { type:"text", speaker:"你", text:"什……什么？他……亲自见？" },
  { type:"text", speaker:"前台小姐姐", text:"（压低声音）这可很少见哦。我入职三年，黄总连我名字都不一定记得。" },

  { type:"narration", text:"你还没来得及消化这个消息，电梯门「叮」的一声打开了。" },
  { type:"narration", text:"那件皮夹克……先映入你的眼帘。\n黑色、合身、有种漫不经心的硬朗。" },
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

  { type:"narration", text:"他说这话的时候，眼睛里有一种你很难描述的光。\n不是居高临下，更像是……找到了同类。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"我一直相信一件事——这个时代最稀缺的，不是算力，不是数据，而是：\n愿意站在悬崖边上往下跳，然后在落地之前造出降落伞的人。" },
  { type:"text", speaker:"你", text:"……（这话，说到我心里去了）" },

  { type:"choice", choices:[
    { text:"「那……我可以当您的降落伞吗？」", affection:12, flag:{key:"bold",value:true} },
    { text:"「我愿意跳。」",                  affection:9  },
    { text:"「我……尽量不摔死。」",            affection:6  },
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

  { type:"text", speaker:"黄仁勋", expression:"smile", text:"很好。顶楼，十点。别迟到。" },
  { type:"narration", text:"他转身，皮夹克的背影消失进走廊。\n你站在大厅里，感觉心脏装了一枚 GPU——发热，但没有过载。" },
  { type:"goto", target:"chapter1" },
],

/* ================================================================
   第一章：深夜加班
   ================================================================ */
chapter1: [
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 22:08", weather:"晴朗",
    bg:"scene-office-night", mood:"calm", clearChars:true },
  { type:"char", id:"jensen", expression:"thinking", pose:"hand_chin", slot:"center", placeholder:true },

  { type:"narration", text:"台北 101 的灯光在落地窗外闪烁。\n整栋楼几乎只剩这一间屋子还亮着。" },
  { type:"text", speaker:"黄仁勋", expression:"thinking",
    text:"来了。坐。\n（指着对面的椅子）咖啡还是茶？" },
  { type:"text", speaker:"你", text:"……茶就好。谢谢。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"（亲手倒了一杯乌龙）这是台湾高山茶，我每次回来都会带一点。" },
  { type:"narration", text:"你接过茶杯，掌心感受到一阵温热。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"我想问你一个问题。不是技术问题。" },
  { type:"text", speaker:"你", text:"请说。" },
  { type:"text", speaker:"黄仁勋", expression:"thinking", pose:"hand_chin",
    text:"如果你知道一件事十年后一定会发生——\n但在那之前，你要用十年承受所有人的质疑、嘲笑，甚至自我怀疑——\n你会怎么做？" },

  { type:"narration", text:"这个问题太重了，重得你短暂地失语。" },
  { type:"narration", text:"窗外，台北的灯光一闪一灭，像芯片上数以亿计的晶体管，安静地跳动。" },

  { type:"choice", choices:[
    { text:"「我会做。哪怕只有 1% 的人相信我。」", affection:10 },
    { text:"「……您经历过这些吗？」",               affection:8  },
    { text:"「能问问您当初是怎么熬过来的吗？」",   affection:12, flag:{key:"dennys_unlocked",value:true} },
  ]},

  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"1993 年，NVIDIA 刚成立那会儿，我们做的第一款芯片，彻底失败了。" },
  { type:"text", speaker:"黄仁勋", expression:"sad",
    text:"我告诉所有员工：我们的钱只够再撑几个月了。\n有人哭了，有人第二天就走了。\n我去了附近一家 Denny's，坐了很久。" },
  { type:"text", speaker:"你", text:"……Denny's？" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"二十四小时营业，没人赶你走。\n那一晚，我坐在那里，点了份薯条，想了整整五个小时。\n然后我想通了——失败不是终点，是入场费。" },
  { type:"flag", key:"dennys", value:true },

  { type:"narration", text:"他说这话的时候平静得出奇，像是在讲别人的故事。\n但你感觉到，那五个小时是真的很沉的五个小时。" },

  { type:"text", speaker:"黄仁勋", expression:"serious",
    text:"说回你。你今天入职，我真正想说的是：\n这里不是让你来证明自己的地方——是让你来改变世界的地方。\n有区别。" },
  { type:"text", speaker:"你", text:"……我明白。" },
  { type:"text", speaker:"黄仁勋", expression:"smile",
    text:"好。那我们谈正事。" },
  { type:"narration", text:"接下来三个小时，你们谈了架构、谈了 CUDA 的未来、谈了 AI 的边界。\n他思考的速度，比你想象的快得多。但他从来不抢答——他听。" },
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
  { type:"narration", text:"你起身告别。走廊里，你回头看了一眼——\n他还坐在窗边，望着台北夜景，手里握着那杯早已凉透的茶。" },
  { type:"narration", text:"那个背影，你很久很久之后还记得。" },
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

  { type:"narration", text:"天亮前，你们在一家小小的早餐店里吃完了一整套烧饼油条。\n他给你讲了 1993 年的台湾，讲了他父亲是怎么看待他「不务正业」创业的。\n你第一次听到他讲家人——那种讲法，是只有对信任的人，才会有的讲法。" },
  { type:"flag", key:"breakfast_together", value:true },
  { type:"goto", target:"chapter5_gtc_keynote" },
],

/* ================================================================
   第五章：GTC 发布夜
   ================================================================ */
chapter5_gtc_keynote: [
  { type:"scene", place:"GTC 主会场 · 后台", time:"傍晚 19:55", weather:"晴",
    bg:"scene-gtc", mood:"romantic", clearChars:true },

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
  { type:"goto", target:"chapter7_rooftop" },
],

/* ================================================================
   第七章：屋顶的星空
   ================================================================ */
chapter7_rooftop: [
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
  { type:"scene", place:"NVIDIA 总部顶层办公室", time:"深夜 11:47", weather:"晴朗",
    bg:"scene-confession", mood:"romantic", clearChars:true },
  { type:"char", id:"jensen", expression:"loving", pose:"hand_chin", slot:"center", placeholder:true },

  { type:"narration", text:"台北，深秋。\n从你入职算起，整整五个月。" },
  { type:"narration", text:"外面是 101 大楼的灯火，房间里是你们最熟悉的安静。" },
  { type:"narration", text:"但今晚，这间屋子里有什么不一样的东西在流动。" },

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
    { test: s => s.affection < 25,
      target: "ending_bad" },
    { test: s => s.affection >= 85
                && s.flags.cooler && s.flags.commit
                && s.flags.loyalty && s.flags.tokyo_night
                && s.flags.demo_saved,
      target: "ending_secret" },
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
  { type:"ending",
    title:"✦ SECRET END · 皮夹克的秘密 ✦",
    endingKind:"true",
    text:"有些秘密，只说给懂的人听。\n\n后来，在某一年的 GTC，他在台上的某一刻——\n忽然偏离了 teleprompter，对着台下说：\n「这件皮夹克，今天有新的意义了。」\n\n没有人知道那句话是对谁说的。\n但你知道。\n因为台下第一排，你也在笑。",
    note:"✨ 达成 SECRET END「皮夹克的秘密」· 全收集结局" },
],

}; // END GAME_SCRIPT

