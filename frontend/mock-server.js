import http from "http";

const PORT = 8088;

function btoa(str) { return Buffer.from(str).toString("base64"); }
function atob(str) { return Buffer.from(str, "base64").toString(); }

function signToken(payload) {
  const h = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const b = btoa(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 86400000 }));
  return `${h}.${b}.mock`;
}

function parseToken(token) {
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

const users = [
  { id: 1, username: "admin", password: "123456", nickname: "系统管理员", role: "admin", phone: "13800000001", status: 1, createTime: "2024-01-01" },
  { id: 2, username: "traveler", password: "123456", nickname: "旅行者小王", role: "user", phone: "13800138000", status: 1, createTime: "2024-01-02" },
  { id: 3, username: "user2", password: "123456", nickname: "背包客小李", role: "user", phone: "13900139000", status: 1, createTime: "2024-01-03" },
];
let nextUserId = 4;

const scenics = [
  { id:1, name:"张家界国家森林公园",description:"中国第一个国家森林公园。张家界以其独特的石英砂岩峰林地貌闻名于世，被誉为\"扩大的盆景，缩小的仙境\"。景区内三千奇峰拔地而起，八百溪流蜿蜒曲折，森林覆盖率高达98%，是名副其实的天然氧吧。",coverImage:"https://picsum.photos/seed/zhangjiajie-mountains/800/600",location:"湖南省张家界市武陵源区",province:"湖南",city:"张家界",longitude:110.4788,latitude:29.3464,price:228,rating:4.8,tags:"自然风光,世界遗产,5A景区,国家森林公园",category:"自然景观",openTime:"07:00 - 18:00" },
  { id:2, name:"九寨沟",description:"九寨沟国家级自然保护区位于四川省阿坝藏族羌族自治州，因沟内有九个藏族村寨而得名。这里以翠海、叠瀑、彩林、雪峰和藏族风情闻名于世，被誉为\"人间仙境\"。",coverImage:"https://picsum.photos/seed/jiuzhaigou-lakes/800/600",location:"四川省阿坝藏族羌族自治州九寨沟县",province:"四川",city:"阿坝",longitude:103.9194,latitude:33.2632,price:169,rating:4.9,tags:"自然风光,世界遗产,5A景区",category:"自然景观",openTime:"08:00 - 17:00" },
  { id:3, name:"故宫博物院",description:"北京故宫是中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线的中心。故宫以三大殿为中心，占地面积约72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。",coverImage:"https://picsum.photos/seed/forbidden-city-beijing/800/600",location:"北京市东城区景山前街4号",province:"北京",city:"北京",longitude:116.3970,latitude:39.9175,price:60,rating:4.7,tags:"历史文化,世界遗产,5A景区",category:"人文景观",openTime:"08:30 - 17:00" },
  { id:4, name:"西湖",description:"西湖位于浙江省杭州市西湖区，是中国大陆主要的观赏性淡水湖泊之一，也是首批国家重点风景名胜区。西湖三面环山，面积约6.39平方千米，以\"淡妆浓抹总相宜\"的湖光山色闻名天下。",coverImage:"https://picsum.photos/seed/west-lake-hangzhou/800/600",location:"浙江省杭州市西湖区",province:"浙江",city:"杭州",longitude:120.1472,latitude:30.2439,price:0,rating:4.6,tags:"自然风光,历史文化,5A景区",category:"自然景观",openTime:"全天开放" },
  { id:5, name:"桂林漓江",description:"漓江风景区是世界上规模最大、风景最美的岩溶山水游览区。以\"山青、水秀、洞奇、石美\"四绝著称，享有\"山水甲天下\"之美誉。乘竹筏漂流漓江，两岸奇峰林立，如入画中。",coverImage:"https://picsum.photos/seed/guilin-river-karst/800/600",location:"广西壮族自治区桂林市",province:"广西",city:"桂林",longitude:110.2898,latitude:25.2350,price:215,rating:4.5,tags:"自然风光,5A景区",category:"自然景观",openTime:"08:30 - 16:30" },
  { id:6, name:"长城-八达岭",description:"八达岭长城位于北京市延庆区，是明长城中保存最完好、最具代表性的一段。长城是中国古代伟大的防御工程，也是世界七大奇迹之一。",coverImage:"https://picsum.photos/seed/great-wall-china/800/600",location:"北京市延庆区",province:"北京",city:"北京",longitude:116.0167,latitude:40.3589,price:40,rating:4.6,tags:"历史文化,世界遗产,5A景区",category:"人文景观",openTime:"07:30 - 18:00" },
  { id:7, name:"黄山",description:"黄山位于安徽省南部黄山市境内，以奇松、怪石、云海、温泉、冬雪五绝著称于世。\"五岳归来不看山，黄山归来不看岳\"。",coverImage:"https://picsum.photos/seed/huangshan-mountains/800/600",location:"安徽省黄山市",province:"安徽",city:"黄山",longitude:118.1716,latitude:30.1340,price:190,rating:4.7,tags:"自然风光,世界遗产,5A景区",category:"自然景观",openTime:"06:30 - 17:00" },
  { id:8, name:"三亚蜈支洲岛",description:"蜈支洲岛坐落在三亚市北部的海棠湾内，是中国最美的热带海岛之一。海水清澈见底，能见度可达27米，是潜水爱好者的天堂。",coverImage:"https://picsum.photos/seed/sanya-tropical-beach/800/600",location:"海南省三亚市海棠区",province:"海南",city:"三亚",longitude:109.7624,latitude:18.3072,price:144,rating:4.4,tags:"海岛度假,潜水,4A景区",category:"海岛度假",openTime:"08:00 - 17:30" },
  { id:9, name:"大理洱海",description:"洱海是云南省第二大淡水湖，因其形似人耳而得名。湖水清澈碧蓝，与苍山十九峰相映成趣，\"苍山雪，洱海月\"构成了大理最经典的美景。环湖骑行全程约120公里。",coverImage:"https://picsum.photos/seed/dali-erhai-lake/800/600",location:"云南省大理白族自治州",province:"云南",city:"大理",longitude:100.1910,latitude:25.6090,price:0,rating:4.7,tags:"自然风光,湖泊,骑行圣地",category:"自然景观",openTime:"全天开放" },
  { id:10, name:"秦始皇兵马俑",description:"秦始皇兵马俑博物馆位于陕西省西安市临潼区，是世界最大的地下军事博物馆。三个俑坑总面积超过2万平方米，出土陶俑、陶马约8000件，被誉为\"世界第八大奇迹\"。",coverImage:"https://picsum.photos/seed/terracotta-warriors/800/600",location:"陕西省西安市临潼区",province:"陕西",city:"西安",longitude:109.2735,latitude:34.3853,price:120,rating:4.8,tags:"历史文化,世界遗产,5A景区",category:"人文景观",openTime:"08:30 - 18:00" },
  { id:11, name:"布达拉宫",description:"布达拉宫坐落在西藏拉萨市区的玛布日山上，是世界上海拔最高，集宫殿、城堡和寺院于一体的宏伟建筑。红白两色宫殿依山而建，气势磅礴。",coverImage:"https://picsum.photos/seed/potala-palace-lhasa/800/600",location:"西藏自治区拉萨市城关区",province:"西藏",city:"拉萨",longitude:91.1172,latitude:29.6578,price:200,rating:4.9,tags:"历史文化,世界遗产,5A景区,藏传佛教",category:"人文景观",openTime:"09:00 - 16:00" },
  { id:12, name:"呼伦贝尔大草原",description:"呼伦贝尔草原位于内蒙古自治区东北部，是世界著名的三大草原之一。这里水草丰美，一望无际的绿色延伸到天边，成群的牛羊点缀其间，构成一幅壮美的草原画卷。",coverImage:"https://picsum.photos/seed/mongolia-grassland/800/600",location:"内蒙古自治区呼伦贝尔市",province:"内蒙古",city:"呼伦贝尔",longitude:119.7656,latitude:49.2116,price:80,rating:4.6,tags:"草原风光,骑马,蒙古包体验",category:"自然景观",openTime:"全天开放" },
  { id:13, name:"稻城亚丁",description:"稻城亚丁国家级自然保护区位于四川省甘孜藏族自治州，被誉为\"蓝色星球上的最后一片净土\"。三座神山——仙乃日、央迈勇、夏诺多吉终年积雪，与高原海子构成绝美画面。",coverImage:"https://picsum.photos/seed/daocheng-snow-mountain/800/600",location:"四川省甘孜藏族自治州稻城县",province:"四川",city:"甘孜",longitude:100.3183,latitude:28.5589,price:270,rating:4.8,tags:"高原风光,徒步圣地,雪山湖泊",category:"自然景观",openTime:"07:00 - 18:00" },
  { id:14, name:"敦煌莫高窟",description:"莫高窟俗称千佛洞，坐落在甘肃省敦煌市东南25公里的鸣沙山东麓。始建于前秦时期，是世界上现存规模最大、内容最丰富的佛教艺术地。",coverImage:"https://picsum.photos/seed/dunhuang-mogao-caves/800/600",location:"甘肃省酒泉市敦煌市",province:"甘肃",city:"敦煌",longitude:94.8099,latitude:40.0416,price:238,rating:4.8,tags:"历史文化,世界遗产,5A景区,佛教艺术",category:"人文景观",openTime:"08:00 - 18:00" },
  { id:15, name:"青岛崂山",description:"崂山位于山东省青岛市崂山区，是中国海岸线第一高峰，素有\"海上第一名山\"之称。山海相连，水秀云奇，崂山道教文化源远流长。",coverImage:"https://picsum.photos/seed/laoshan-qingdao/800/600",location:"山东省青岛市崂山区",province:"山东",city:"青岛",longitude:120.6290,latitude:36.1446,price:90,rating:4.5,tags:"山海风光,道教文化,5A景区",category:"自然景观",openTime:"06:00 - 19:00" },
  { id:16, name:"厦门鼓浪屿",description:"鼓浪屿位于福建省厦门市思明区，与厦门岛隔海相望。岛上气候宜人，四季如春，无车马喧嚣，有鸟语花香，素有\"海上花园\"之誉。万国建筑博览群交织出独特的文化气质。",coverImage:"https://picsum.photos/seed/gulangyu-island/800/600",location:"福建省厦门市思明区",province:"福建",city:"厦门",longitude:118.0689,latitude:24.4479,price:35,rating:4.6,tags:"海岛风光,世界遗产,文艺小清新,5A景区",category:"海岛度假",openTime:"全天开放" },
  { id:17, name:"苏州园林",description:"苏州园林是中国古典园林的代表，以拙政园、留园、网师园等为代表。以山水花木、亭台楼阁为基本要素，在有限空间内创造无限的意境，\"咫尺之内再造乾坤\"。",coverImage:"https://picsum.photos/seed/suzhou-garden/800/600",location:"江苏省苏州市姑苏区",province:"江苏",city:"苏州",longitude:120.6266,latitude:31.3175,price:90,rating:4.6,tags:"古典园林,世界遗产,5A景区,江南水乡",category:"人文景观",openTime:"07:30 - 17:30" },
  { id:18, name:"成都大熊猫繁育研究基地",description:"成都大熊猫繁育研究基地位于四川省成都市成华区，是世界上最重要的大熊猫保护研究机构之一。这里生活着百余只大熊猫，可以近距离观察国宝进食、嬉戏的憨态。",coverImage:"https://picsum.photos/seed/panda-chengdu/800/600",location:"四川省成都市成华区",province:"四川",city:"成都",longitude:104.1472,latitude:30.7310,price:58,rating:4.7,tags:"国宝熊猫,亲子游,4A景区",category:"主题乐园",openTime:"07:30 - 18:00" },
  { id:19, name:"丽江古城",description:"丽江古城位于云南省丽江市古城区，始建于宋末元初，是中国历史文化名城中唯一没有城墙的古城。光滑的石板路、手工建造的木结构房屋、无处不在的小桥流水，让人流连忘返。",coverImage:"https://picsum.photos/seed/lijiang-old-town/800/600",location:"云南省丽江市古城区",province:"云南",city:"丽江",longitude:100.2330,latitude:26.8720,price:50,rating:4.4,tags:"古城古镇,世界遗产,5A景区,纳西文化",category:"人文景观",openTime:"全天开放" },
  { id:20, name:"华山",description:"华山位于陕西省华阴市，是五岳中的西岳，以\"奇险天下第一山\"闻名。长空栈道悬于万丈绝壁之上，鹞子翻身更是惊心动魄。华山还是道教全真派圣地。",coverImage:"https://picsum.photos/seed/huashan-cliffs/800/600",location:"陕西省渭南市华阴市",province:"陕西",city:"渭南",longitude:110.0897,latitude:34.4793,price:160,rating:4.5,tags:"登山探险,道教圣地,5A景区",category:"自然景观",openTime:"全天开放（24小时登山）" },
]

// Guides
const guides = [
  { id:1, title:"张家界三日游完全攻略", content:"<h2>Day 1：袁家界 - 天子山</h2><p>早上8点从武陵源门票站进入，乘坐环保车前往百龙天梯。到达袁家界后，游览天下第一桥、迷魂台、后花园等景点。下午前往天子山，参观贺龙公园、御笔峰、仙女散花。</p><h2>Day 2：金鞭溪 - 黄石寨</h2><p>上午徒步金鞭溪，全长约7.5公里，沿途可欣赏到金鞭岩、神鹰护鞭等自然奇观。下午游览黄石寨，这是张家界最大的凌空观景台。</p><h2>Day 3：天门山</h2><p>乘坐世界最长的高山客运索道——天门山索道，体验99道弯的盘山公路和999阶天梯。</p><h3>美食推荐</h3><ul><li>土家三下锅</li><li>张家界米粉</li><li>湘西腊肉</li></ul>", coverImage:"https://picsum.photos/seed/zhangjiajie-travel/800/600", author:"旅行达人小王", scenicId:1, scenicName:"张家界", tags:"三日游,深度游,自然风光", likes:328, favorites:156, views:12580, status:1, createTime:"2024-03-15" },
  { id:2, title:"故宫深度游览路线——避开人潮的玩法", content:"<h2>最佳游览时间</h2><p>淡季（11月-次年3月）游客较少，建议早上8:00前到达午门，开馆后直奔太和殿。</p><h2>推荐路线</h2><p><strong>精华线路（2-3小时）：</strong>午门→太和门→太和殿→中和殿→保和殿→乾清宫→交泰殿→坤宁宫→御花园→神武门</p><p><strong>深度线路（4-6小时）：</strong>增加珍宝馆和钟表馆（各\u00a510）。</p><h3>拍照打卡点</h3><ul><li>角楼——故宫最美的建筑</li><li>太和殿广场——广角镜头拍全景</li><li>御花园——红墙金瓦配绿树</li></ul>", coverImage:"https://picsum.photos/seed/beijing-forbidden-tour/800/600", author:"文博爱好者", scenicId:3, scenicName:"故宫", tags:"一日游,历史文化,深度游", likes:512, favorites:289, views:23400, status:1, createTime:"2024-02-20" },
  { id:3, title:"九寨沟秋季摄影攻略", content:"<h2>拍摄最佳时段</h2><p>10月中旬到11月初是九寨沟最美的季节。五彩斑斓的树叶倒映在碧蓝的湖水中，随手一拍都是大片。</p><h2>推荐拍摄点</h2><ul><li><strong>五花海</strong>——清晨无风时水面如镜，倒影最为清晰</li><li><strong>诺日朗瀑布</strong>——使用慢门拍摄水流丝绸效果</li><li><strong>镜海</strong>——下午2-4点光线最佳</li></ul>", coverImage:"https://picsum.photos/seed/jiuzhaigou-autumn/800/600", author:"摄影师老张", scenicId:2, scenicName:"九寨沟", tags:"摄影,秋季,自然风光", likes:891, favorites:432, views:35000, status:1, createTime:"2024-01-10" },
  { id:4, title:"杭州西湖一日漫步指南", content:"<h2>经典环湖路线</h2><p>断桥残雪→白堤→孤山→苏堤春晓→花港观鱼→雷峰塔→南山路。全程约12公里，步行3-4小时。</p><h2>必体验</h2><ul><li>乘手摇船游湖，船夫会讲白娘子的故事</li><li>在湖畔居茶馆喝茶赏湖</li><li>晚间的音乐喷泉表演</li></ul>", coverImage:"https://picsum.photos/seed/hangzhou-west-lake/800/600", author:"杭州土著", scenicId:4, scenicName:"西湖", tags:"一日游,休闲,城市漫步", likes:245, favorites:98, views:8900, status:1, createTime:"2024-03-01" },
  { id:5, title:"黄山经典两日游线路规划", content:"<h2>Day 1：云谷索道上 - 西海大峡谷</h2><p>从云谷寺乘坐索道上山，游览始信峰、北海景区，下午挑战西海大峡谷的一环和二环。</p><h2>Day 2：光明顶日出 - 玉屏楼</h2><p>清晨5点出发前往光明顶看日出，然后游览飞来石、鳌鱼峰，最后在玉屏楼看迎客松。</p>", coverImage:"https://picsum.photos/seed/huangshan-hiking/800/600", author:"登山爱好者", scenicId:7, scenicName:"黄山", tags:"两日游,登山,自然风光", likes:673, favorites:312, views:18900, status:1, createTime:"2024-02-28" },
  { id:6, title:"大理洱海环湖骑行完全攻略", content:"<h2>推荐骑行路线</h2><p>从大理古城出发→才村码头→喜洲古镇→双廊古镇→挖色镇→海东镇→下关→返回古城。全程约120公里，建议分2天完成。</p><h2>Day 1（西线60km）</h2><p>古城→才村看日出→喜洲吃破酥粑粑→双廊古镇住宿。西线沿途有专门的骑行绿道。</p><h2>Day 2（东线60km）</h2><p>双廊→挖色看日落→海东沿海公路→返回古城。东线车少路宽，夕阳时分尤其美丽。</p><h3>租车贴士</h3><ul><li>古城内租电动车约30-80元/天</li><li>建议租电动车，坡路较多</li><li>沿途有多处充电桩</li></ul>", coverImage:"https://picsum.photos/seed/dali-cycling/800/600", author:"骑行者阿飞", scenicId:9, scenicName:"大理洱海", tags:"骑行,两日游,自然风光", likes:562, favorites:278, views:21500, status:1, createTime:"2024-04-05" },
  { id:7, title:"西安三日游——十三朝古都的文化盛宴", content:"<h2>Day 1：兵马俑 - 华清宫</h2><p>上午前往临潼参观秦始皇兵马俑博物馆，建议请一位讲解员（约100元），让历史活起来。下午游览华清宫，感受\"春寒赐浴华清池\"的皇家氛围。</p><h2>Day 2：城墙 - 回民街</h2><p>上午骑行西安城墙（全长约14公里，骑行约2小时）。傍晚去回民街，品尝肉夹馍、羊肉泡馍、凉皮等美食。</p><h2>Day 3：大雁塔 - 陕西历史博物馆</h2><p>上午参观大雁塔及大慈恩寺，下午前往陕西历史博物馆（需提前3天预约）。</p>", coverImage:"https://picsum.photos/seed/xian-history/800/600", author:"历史文化迷", scenicId:10, scenicName:"兵马俑", tags:"三日游,历史文化,美食之旅", likes:435, favorites:201, views:16700, status:1, createTime:"2024-03-28" },
  { id:8, title:"稻城亚丁徒步终极指南", content:"<h2>行前准备</h2><p>稻城亚丁海拔在4000米以上，高原反应是最大挑战。建议提前一周服用红景天，抵达后先在香格里拉镇（海拔2900m）适应一天。</p><h2>推荐路线（2日徒步）</h2><p><strong>Day 1：</strong>冲古寺→珍珠海（卓玛拉措），往返约3小时，难度较低，适应海拔。</p><p><strong>Day 2：</strong>洛绒牛场→牛奶海→五色海，往返约6-8小时。牛奶海海拔4600米，五色海海拔4700米。建议骑马到舍身崖（约300元），再徒步剩余路段。</p><h3>必备装备</h3><ul><li>冲锋衣+抓绒衣（山上温差大）</li><li>登山杖（省力30%以上）</li><li>氧气瓶（镇上购买，20元/瓶）</li><li>防晒霜+墨镜（高原紫外线极强）</li></ul>", coverImage:"https://picsum.photos/seed/daocheng-trek/800/600", author:"户外领队大雄", scenicId:13, scenicName:"稻城亚丁", tags:"徒步,高原,深度游", likes:1245, favorites:678, views:45600, status:1, createTime:"2024-05-01" },
  { id:9, title:"桂林阳朔四日深度游——漓江最美的季节", content:"<h2>Day 1：桂林市区</h2><p>下午游览象鼻山（桂林城徽），傍晚漫步两江四湖，看日月双塔夜景。</p><h2>Day 2：漓江精华段</h2><p>从杨堤码头乘竹筏到九马画山（约2小时），抵达兴坪古镇后打卡20元人民币背景图。晚上住阳朔西街附近。</p><h2>Day 3：阳朔</h2><p>上午骑行遇龙河十里画廊。下午体验遇龙河竹筏漂流。晚上逛西街，看《印象刘三姐》。</p><h2>Day 4：龙脊梯田</h2><p>乘车前往龙胜龙脊梯田（约2小时），5-6月灌水期和9-10月收获季节最美。</p>", coverImage:"https://picsum.photos/seed/guilin-yangshuo/800/600", author:"桂林本地通", scenicId:5, scenicName:"漓江", tags:"四日游,深度游,自然风光", likes:789, favorites:356, views:28900, status:1, createTime:"2024-04-18" },
  { id:10, title:"厦门鼓浪屿+市区三日文艺之旅", content:"<h2>Day 1：鼓浪屿</h2><p>上午从东渡邮轮码头上岛（船票35元）。游览日光岩→菽庄花园→皓月园→龙头路小吃街。推荐：张三疯奶茶、叶氏麻糍、林记鱼丸。</p><h2>Day 2：厦门大学 - 南普陀 - 环岛路</h2><p>上午参观\"中国最美大学\"厦门大学和南普陀寺。下午骑行环岛路（曾厝垵→椰风寨），沿途海景无敌。</p><h2>Day 3：沙坡尾 - 植物园</h2><p>沙坡尾是厦门最文艺的街区，各种咖啡馆、文创店。下午去万石植物园，巨型仙人掌区是拍照圣地。</p>", coverImage:"https://picsum.photos/seed/xiamen-coast/800/600", author:"文艺女青年小鹿", scenicId:16, scenicName:"鼓浪屿", tags:"三日游,文艺,海岛", likes:567, favorites:289, views:22300, status:1, createTime:"2024-04-22" },
  { id:11, title:"苏州园林一日精华游", content:"<h2>上午：拙政园+苏州博物馆</h2><p>拙政园是苏州最大的古典园林，建议8:00开园就入场，避开人流高峰（游览约2小时）。苏州博物馆由贝聿铭设计，本身就是建筑艺术品（免费，需预约）。</p><h2>下午：留园+山塘街</h2><p>留园以建筑空间处理见长，冠云峰是太湖石中的极品。傍晚前往山塘街乘船游河，吃一碗正宗苏式汤面。</p><h3>美食推荐</h3><ul><li>得月楼——松鼠桂鱼</li><li>同得兴——枫镇大肉面</li><li>采芝斋——苏式糖果</li></ul>", coverImage:"https://picsum.photos/seed/suzhou-classical/800/600", author:"江南游子", scenicId:17, scenicName:"苏州园林", tags:"一日游,园林,江南水乡", likes:345, favorites:167, views:12300, status:1, createTime:"2024-05-08" },
  { id:12, title:"华山夜爬全攻略——看日出，不虚此行", content:"<h2>为什么夜爬？</h2><p>夜爬华山是经典玩法。晚上登山既不热又能省一晚住宿，清晨到达东峰看日出，体验感拉满。</p><h2>夜爬路线</h2><p><strong>21:00</strong> 玉泉院出发→<strong>23:00</strong> 千尺幢/百尺峡（最陡路段）→<strong>01:00</strong> 北峰（海拔1614m）→<strong>03:30</strong> 金锁关→<strong>05:00</strong> 东峰观日台等日出</p><h2>下山</h2><p>看完日出后游览南峰（最高峰2154m）、西峰，乘西峰索道下山（140元，约20分钟）。</p><h3>夜爬装备</h3><ul><li>头灯/手电筒（必备）</li><li>手套（抓铁链用，山下1元/双）</li><li>冲锋衣（山顶比山下低10-15度）</li><li>充足的水和干粮</li></ul>", coverImage:"https://picsum.photos/seed/huashan-sunrise/800/600", author:"夜爬达人", scenicId:20, scenicName:"华山", tags:"夜爬,日出,登山探险", likes:923, favorites:456, views:38900, status:1, createTime:"2024-05-15" },
];

// Travelogues
const travelogues = [
  { id:1, userId:2, username:"旅行者小王", avatar:"", title:"张家界，一场说走就走的仙境之旅", content:"终于来到了心心念念的张家界！站在百龙天梯上，看着周围拔地而起的石峰，真的震撼到说不出话。三千奇峰，每一座都是大自然的杰作……", images:"https://picsum.photos/seed/zhangjiajie-mist/800/600", location:"湖南张家界", scenicId:1, scenicName:"张家界", likes:156, views:3200, status:1, createTime:"2024-04-10" },
  { id:2, userId:3, username:"背包客小李", avatar:"", title:"西子湖畔的慢时光", content:"在杭州待了三天，最喜欢的就是每天傍晚在西湖边散步。湖面被夕阳染成金色，远处的雷峰塔在暮色中格外温柔……", images:"https://picsum.photos/seed/west-lake-dusk/800/600", location:"浙江杭州", scenicId:4, scenicName:"西湖", likes:89, views:1800, status:1, createTime:"2024-04-05" },
  { id:3, userId:2, username:"旅行者小王", avatar:"", title:"故宫的雪，紫禁城最美的时刻", content:"大雪纷飞的故宫，红墙白雪，美得让人屏息。金瓦上覆盖着一层薄薄的雪，整个紫禁城仿佛穿越回了六百年前……", images:"https://picsum.photos/seed/forbidden-city-snow/800/600", location:"北京", scenicId:3, scenicName:"故宫", likes:234, views:5600, status:1, createTime:"2024-03-20" },
  { id:4, userId:3, username:"背包客小李", avatar:"", title:"漓江竹筏漂流记", content:"坐在竹筏上，听着船夫的号子，两岸青山缓缓后退。漓江的水真绿啊，绿得像一块无瑕的翡翠……", images:"https://picsum.photos/seed/guilin-bamboo-raft/800/600", location:"广西桂林", scenicId:5, scenicName:"漓江", likes:178, views:4200, status:1, createTime:"2024-03-25" },
  { id:5, userId:2, username:"旅行者小王", avatar:"", title:"黄山归来不看岳", content:"凌晨4点起床，打着手电筒爬上光明顶。当第一缕阳光刺破云海，所有人都安静了。这就是传说中的黄山日出啊！", images:"https://picsum.photos/seed/huangshan-clouds/800/600", location:"安徽黄山", scenicId:7, scenicName:"黄山", likes:312, views:7800, status:1, createTime:"2024-03-12" },
  { id:6, userId:3, username:"背包客小李", avatar:"", title:"三亚潜水初体验", content:"第一次潜水就选择了蜈支洲岛！海水能见度高得惊人，珊瑚、热带鱼群就在眼前游过，像在另一个世界……", images:"https://picsum.photos/seed/sanya-diving/800/600", location:"海南三亚", scenicId:8, scenicName:"蜈支洲岛", likes:145, views:2900, status:1, createTime:"2024-04-01" },
  { id:7, userId:2, username:"旅行者小王", avatar:"", title:"在大理，时间是用来浪费的", content:"环洱海骑行的时候，忽然明白了为什么那么多人来了大理就不想走。阳光洒在苍山上，洱海蓝得不真实，路边卖水果的白族阿婆笑容灿烂……", images:"https://picsum.photos/seed/dali-sunset/800/600", location:"云南大理", scenicId:9, scenicName:"大理洱海", likes:278, views:6500, status:1, createTime:"2024-05-10" },
  { id:8, userId:3, username:"背包客小李", avatar:"", title:"站在兵马俑前，我沉默了", content:"走进一号坑的那一刻，两千年前的军队就在眼前列阵。每一个陶俑的面容都不同，仿佛随时会动起来。秦帝国的强盛与野心凝固在这片黄土之中……", images:"https://picsum.photos/seed/xian-warriors/800/600", location:"陕西西安", scenicId:10, scenicName:"兵马俑", likes:198, views:4800, status:1, createTime:"2024-05-05" },
  { id:9, userId:2, username:"旅行者小王", avatar:"", title:"布达拉宫，离天堂最近的宫殿", content:"一步一步爬上布达拉宫的台阶，海拔3650米的空气有些稀薄，但眼前的红白宫殿让心跳加速。酥油灯在殿堂内摇曳，诵经声回荡在耳边……", images:"https://picsum.photos/seed/lhasa-potala/800/600", location:"西藏拉萨", scenicId:11, scenicName:"布达拉宫", likes:456, views:12000, status:1, createTime:"2024-06-01" },
  { id:10, userId:3, username:"背包客小李", avatar:"", title:"呼伦贝尔，风吹草低见牛羊", content:"站在草原中央，360度全是绿色。骑马在草原上奔驰的感觉太自由了！晚上住蒙古包，喝马奶酒，看满天繁星，城市里的烦恼全都烟消云散……", images:"https://picsum.photos/seed/grassland-horses/800/600", location:"内蒙古呼伦贝尔", scenicId:12, scenicName:"呼伦贝尔草原", likes:234, views:5800, status:1, createTime:"2024-07-15" },
  { id:11, userId:2, username:"旅行者小王", avatar:"", title:"成都，一座来了就不想走的城市", content:"在成都待了四天，每天都是吃吃吃！火锅、串串、担担面、龙抄手……还有大熊猫基地里那些圆滚滚的黑白团子，简直萌翻了！", images:"https://picsum.photos/seed/chengdu-street/800/600", location:"四川成都", scenicId:18, scenicName:"成都大熊猫基地", likes:389, views:8900, status:1, createTime:"2024-06-20" },
  { id:12, userId:3, username:"背包客小李", avatar:"", title:"稻城亚丁，蓝色星球最后的净土", content:"从洛绒牛场徒步到牛奶海，每一步都在喘，但每一步都值得。当牛奶海出现在眼前的那一刻，那种纯净的蓝色让人想哭。大自然真的太神奇了……", images:"https://picsum.photos/seed/yading-lake/800/600", location:"四川稻城", scenicId:13, scenicName:"稻城亚丁", likes:567, views:14500, status:1, createTime:"2024-08-10" },
  { id:13, userId:2, username:"旅行者小王", avatar:"", title:"鼓浪屿，一座会唱歌的小岛", content:"在鼓浪屿的小巷里迷路是件幸福的事。每转角都可能遇到一栋百年老别墅，每个窗口都可能飘出钢琴声。这里没有车，只有海风和音乐……", images:"https://picsum.photos/seed/gulangyu-piano/800/600", location:"福建厦门", scenicId:16, scenicName:"鼓浪屿", likes:312, views:7200, status:1, createTime:"2024-07-22" },
  { id:14, userId:3, username:"背包客小李", avatar:"", title:"敦煌，大漠深处的千年回眸", content:"站在莫高窟九层楼前，很难想象一千多年前的人们是如何在这片沙漠中开凿出如此精美的石窟。壁画上的飞天衣袂飘飘，千年的时光仿佛凝固……", images:"https://picsum.photos/seed/dunhuang-desert/800/600", location:"甘肃敦煌", scenicId:14, scenicName:"敦煌莫高窟", likes:289, views:6700, status:1, createTime:"2024-09-05" },
  { id:15, userId:2, username:"旅行者小王", avatar:"", title:"华山夜爬，仰望星空等日出", content:"晚上九点出发，爬了整整八个小时！千尺幢那段几乎是垂直的，只能抓着铁链往上挪。但凌晨五点站在东峰看到日出的那一刻，所有疲惫都消失了……", images:"https://picsum.photos/seed/huashan-night/800/600", location:"陕西华山", scenicId:20, scenicName:"华山", likes:478, views:11200, status:1, createTime:"2024-08-28" },
];
let nextTravelogueId = 16;

// Orders
const orders = [
  { id:1, userId:2, username:"旅行者小王", scenicId:1, scenicName:"张家界", adultTickets:2, childTickets:1, totalPrice:570, phone:"13800138000", status:"paid", createTime:"2024-06-10 14:30:00" },
  { id:2, userId:3, username:"背包客小李", scenicId:3, scenicName:"故宫", adultTickets:1, childTickets:0, totalPrice:60, phone:"13900139000", status:"paid", createTime:"2024-06-12 09:15:00" },
  { id:3, userId:2, username:"旅行者小王", scenicId:2, scenicName:"九寨沟", adultTickets:3, childTickets:1, totalPrice:675, phone:"13800138000", status:"completed", createTime:"2024-06-15 10:00:00" },
  { id:4, userId:2, username:"旅行者小王", scenicId:7, scenicName:"黄山", adultTickets:2, childTickets:0, totalPrice:380, phone:"13800138000", status:"pending", createTime:"2024-06-18 16:20:00" },
  { id:5, userId:3, username:"背包客小李", scenicId:10, scenicName:"兵马俑", adultTickets:2, childTickets:1, totalPrice:300, phone:"13900139000", status:"paid", createTime:"2024-06-19 11:45:00" },
  { id:6, userId:2, username:"旅行者小王", scenicId:5, scenicName:"漓江", adultTickets:2, childTickets:0, totalPrice:430, phone:"13800138000", status:"paid", createTime:"2024-06-19 15:30:00" },
  { id:7, userId:3, username:"背包客小李", scenicId:18, scenicName:"成都大熊猫基地", adultTickets:2, childTickets:2, totalPrice:232, phone:"13900139000", status:"completed", createTime:"2024-06-20 08:00:00" },
];
let nextOrderId = 10;

const foodOrders = [
  { id:8, userId:2, username:'旅行者小王', type:'food', foodId:1, foodName:'土家三下锅', coverImage:'https://picsum.photos/seed/hotpot-xiang-cuisine/800/600', location:'张家界市区', quantity:2, totalPrice:136, phone:'13800138000', scenicName:'张家界', scenicId:1, status:'completed', createTime:'2024-06-15 12:00:00' },
  { id:9, userId:2, username:'旅行者小王', type:'food', foodId:4, foodName:'桂林米粉', coverImage:'https://picsum.photos/seed/rice-noodles/800/600', location:'桂林市区', quantity:3, totalPrice:45, phone:'13800138000', scenicName:'漓江', scenicId:5, status:'pending', createTime:'2024-06-20 09:00:00' },
];
orders.push(...foodOrders);

// Food
const foods = [
  { id:1, name:"土家三下锅", description:"张家界最具代表性的地方美食，将腊肉、豆腐、猪肚等食材放入锅中同煮，汤鲜味美，麻辣适中。", coverImage:"https://picsum.photos/seed/hotpot-xiang-cuisine/800/600", location:"张家界市区", avgPrice:68, tags:"湘菜,特色菜,辣味", scenicName:"张家界", scenicId:1, province:"湖南", city:"张家界" },
  { id:2, name:"北京烤鸭", description:"享誉世界的中华美食，选用优质北京填鸭，果木炭火烤制，色泽红润，肉质肥而不腻，外脆里嫩。", coverImage:"https://picsum.photos/seed/peking-duck/800/600", location:"北京全聚德", avgPrice:198, tags:"京菜,烤鸭,宴请", scenicName:"故宫", scenicId:3, province:"北京", city:"北京" },
  { id:3, name:"西湖醋鱼", description:"杭州传统名菜，选用鲜活草鱼，以醋和糖为主要调料，鱼肉鲜嫩，酸甜可口，是杭帮菜的代表。", coverImage:"https://picsum.photos/seed/west-lake-fish/800/600", location:"杭州楼外楼", avgPrice:88, tags:"杭帮菜,湖鲜,清淡", scenicName:"西湖", scenicId:4, province:"浙江", city:"杭州" },
  { id:4, name:"桂林米粉", description:"桂林最接地气的街头美食。洁白细嫩的米粉配上卤水、锅烧、花生、酸豆角，一碗下去满口留香。", coverImage:"https://picsum.photos/seed/rice-noodles/800/600", location:"桂林市区", avgPrice:15, tags:"小吃,米线,街头美食", scenicName:"漓江", scenicId:5, province:"广西", city:"桂林" },
  { id:5, name:"徽州毛豆腐", description:"黄山地区传统名菜，豆腐经过发酵后表面长满白色菌丝，煎至金黄，外酥内嫩，风味独特。", coverImage:"https://picsum.photos/seed/tofu-dish/800/600", location:"黄山屯溪老街", avgPrice:35, tags:"徽菜,豆腐,特色小吃", scenicName:"黄山", scenicId:7, province:"安徽", city:"黄山" },
  { id:6, name:"海南文昌鸡", description:"海南四大名菜之首，选用文昌本地土鸡，皮薄骨酥，肉质滑嫩，蘸上特制酱料，鲜美无比。", coverImage:"https://picsum.photos/seed/hainanese-chicken/800/600", location:"三亚市区", avgPrice:98, tags:"海南菜,白切,清淡", scenicName:"蜈支洲岛", scenicId:8, province:"海南", city:"三亚" },
  { id:7, name:"四川火锅", description:"九寨沟游玩后必尝的美食。红油翻滚的锅底配上毛肚、黄喉、鸭肠，麻辣鲜香，温暖身心。", coverImage:"https://picsum.photos/seed/sichuan-hotpot/800/600", location:"阿坝州九寨沟县", avgPrice:120, tags:"川菜,火锅,麻辣", scenicName:"九寨沟", scenicId:2, province:"四川", city:"阿坝" },
  { id:8, name:"炸酱面", description:"老北京最具代表性的面食。筋道的面条配上浓郁酱香的肉丁炸酱，外加黄瓜丝、豆芽等时令菜码。", coverImage:"https://picsum.photos/seed/noodles-beijing/800/600", location:"北京市区", avgPrice:25, tags:"京菜,面食,小吃", scenicName:"长城", scenicId:6, province:"北京", city:"北京" },
  { id:9, name:"云南过桥米线", description:"云南最具传奇色彩的美食。滚烫的鸡汤配上薄如蝉翼的肉片、鹌鹑蛋、蔬菜和米线，鲜香浓郁，仪式感满满。", coverImage:"https://picsum.photos/seed/yunnan-noodles/800/600", location:"大理古城", avgPrice:38, tags:"云南菜,米线,汤羹", scenicName:"大理洱海", scenicId:9, province:"云南", city:"大理" },
  { id:10, name:"西安肉夹馍", description:"腊汁肉白吉馍，西安人的日常灵魂。外皮酥脆的馍夹着炖得软烂入味的腊汁肉，一口下去满嘴肉香。", coverImage:"https://picsum.photos/seed/chinese-burger/800/600", location:"西安回民街", avgPrice:15, tags:"陕西小吃,馍,街头美食", scenicName:"兵马俑", scenicId:10, province:"陕西", city:"西安" },
  { id:11, name:"藏式酥油茶", description:"藏族人每天必喝的饮品，用砖茶、酥油和盐巴搅拌而成。高原寒冷，一碗热腾腾的酥油茶能迅速补充能量、抵御严寒。", coverImage:"https://picsum.photos/seed/butter-tea/800/600", location:"拉萨市区", avgPrice:20, tags:"藏餐,茶饮,暖身", scenicName:"布达拉宫", scenicId:11, province:"西藏", city:"拉萨" },
  { id:12, name:"内蒙古烤全羊", description:"蒙古族最隆重的待客美食。选用草原散养绵羊，整只架在炭火上慢烤，外皮金黄酥脆，肉质鲜嫩多汁，香气四溢。", coverImage:"https://picsum.photos/seed/roast-lamb/800/600", location:"呼伦贝尔草原蒙古包", avgPrice:888, tags:"蒙古菜,烤肉,宴请大菜", scenicName:"呼伦贝尔草原", scenicId:12, province:"内蒙古", city:"呼伦贝尔" },
  { id:13, name:"厦门沙茶面", description:"厦门最接地气的早餐，浓郁的沙茶酱配上Q弹的碱面，加上鱿鱼、猪肝、豆腐等各种配料，一碗下去暖心暖胃。", coverImage:"https://picsum.photos/seed/satay-noodles/800/600", location:"厦门思明区", avgPrice:20, tags:"闽南小吃,面食,海鲜", scenicName:"鼓浪屿", scenicId:16, province:"福建", city:"厦门" },
  { id:14, name:"松鼠桂鱼", description:"苏州松鹤楼的招牌名菜。在桂鱼身上剞出菱形花纹，油炸后形似松鼠，浇上酸甜番茄酱汁，外酥里嫩，是苏帮菜的经典。", coverImage:"https://picsum.photos/seed/squirrel-fish/800/600", location:"苏州观前街", avgPrice:168, tags:"苏帮菜,河鲜,功夫菜", scenicName:"苏州园林", scenicId:17, province:"江苏", city:"苏州" },
  { id:15, name:"成都担担面", description:"四川面食中的翘楚。细滑的面条配上由芝麻酱、花椒、辣椒油、肉末组成的酱料，麻辣鲜香，一碗不过瘾。", coverImage:"https://picsum.photos/seed/dandan-noodles/800/600", location:"成都市区", avgPrice:12, tags:"川菜,面食,麻辣", scenicName:"成都大熊猫基地", scenicId:18, province:"四川", city:"成都" },
  { id:16, name:"青岛啤酒+辣炒蛤蜊", description:"青岛人的夏天标配。新鲜的蛤蜊用辣椒和蒜蓉爆炒，配上一杯刚从生产线下来的原浆青岛啤酒，是海边城市最惬意的享受。", coverImage:"https://picsum.photos/seed/seafood-clams/800/600", location:"青岛台东步行街", avgPrice:45, tags:"鲁菜,海鲜,啤酒搭档", scenicName:"崂山", scenicId:15, province:"山东", city:"青岛" },
  { id:17, name:"兰州牛肉面", description:"一清二白三红四绿五黄——清澈的牛肉汤、白萝卜、红辣椒油、绿蒜苗香菜、黄亮的面条，色香味俱全。", coverImage:"https://picsum.photos/seed/beef-noodles/800/600", location:"敦煌市区", avgPrice:18, tags:"西北面食,牛肉,清汤", scenicName:"敦煌莫高窟", scenicId:14, province:"甘肃", city:"敦煌" },
  { id:18, name:"丽江腊排骨火锅", description:"纳西族的传统美食，用风干的腊排骨熬制汤底，加入当地特产的菌菇和蔬菜。汤白味浓，驱寒暖身，是丽江夜晚的最佳选择。", coverImage:"https://picsum.photos/seed/cured-meat-hotpot/800/600", location:"丽江古城", avgPrice:98, tags:"纳西菜,火锅,腊味", scenicName:"丽江古城", scenicId:19, province:"云南", city:"丽江" },
]

function json(res, data, code = 200) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "*" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => { try { resolve(JSON.parse(body)); } catch { resolve({}); } });
  });
}

function paginate(list, pageNum, pageSize) {
  const pn = parseInt(pageNum) || 1, ps = parseInt(pageSize) || 10;
  const start = (pn - 1) * ps;
  return { records: list.slice(start, start + ps), total: list.length, size: ps, current: pn, pages: Math.ceil(list.length / ps) };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return json(res, {});

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const sp = url.searchParams;

  // ---- Auth ----
  if (path === "/api/auth/login" && req.method === "POST") {
    const { username, password } = await readBody(req);
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return json(res, { code: 401, message: "用户名或密码错误", data: null });
    if (user.status !== 1) return json(res, { code: 401, message: "账号已被禁用", data: null });
    const token = signToken({ userId: user.id, username: user.username, role: user.role });
    return json(res, { code: 200, message: "登录成功", data: { token, role: user.role, nickname: user.nickname, userId: user.id } });
  }

  if (path === "/api/auth/register" && req.method === "POST") {
    const { username, password, nickname, phone } = await readBody(req);
    if (users.find((u) => u.username === username)) return json(res, { code: 400, message: "用户名已存在", data: null });
    users.push({ id: nextUserId++, username, password, nickname: nickname || username, role: "user", phone: phone || "", status: 1, createTime: new Date().toISOString() });
    return json(res, { code: 200, message: "注册成功", data: null });
  }

  // ---- Scenic ----
  if (path === "/api/scenic/page" && req.method === "GET") {
    let list = [...scenics];
    const kw = sp.get("keyword"), cat = sp.get("category"), city = sp.get("city");
    const rating = sp.get("rating");
    if (kw) list = list.filter((s) => s.name.includes(kw) || s.location.includes(kw));
    if (cat) list = list.filter((s) => s.category === cat);
    if (city) list = list.filter((s) => s.city.includes(city));
    if (rating) list = list.filter((s) => s.rating >= parseFloat(rating));
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 8) });
  }

  if (path === "/api/scenic/list") return json(res, { code: 200, message: "操作成功", data: scenics });
  if (path === "/api/scenic/recommend") {
    const limit = parseInt(sp.get("limit")) || 6;
    return json(res, { code: 200, message: "操作成功", data: [...scenics].sort((a, b) => b.rating - a.rating).slice(0, limit) });
  }

  const scenicMatch = path.match(/^\/api\/scenic\/(\d+)$/);
  if (scenicMatch) {
    const s = scenics.find((x) => x.id === parseInt(scenicMatch[1]));
    return s ? json(res, { code: 200, message: "操作成功", data: s }) : json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Content: Guides ----
  if (path === "/api/content/guides" && req.method === "GET") {
    let list = [...guides];
    const kw = sp.get("keyword"), tag = sp.get("tag");
    if (kw) list = list.filter((g) => g.title.includes(kw));
    if (tag) list = list.filter((g) => g.tags.includes(tag));
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 10) });
  }

  const guideMatch = path.match(/^\/api\/content\/guides\/(\d+)$/);
  if (guideMatch) {
    const g = guides.find((x) => x.id === parseInt(guideMatch[1]));
    if (g) { g.views++; return json(res, { code: 200, message: "操作成功", data: g }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  const guideLikeMatch = path.match(/^\/api\/content\/guides\/(\d+)\/like$/);
  if (guideLikeMatch && req.method === "POST") {
    const g = guides.find((x) => x.id === parseInt(guideLikeMatch[1]));
    if (g) { g.likes++; return json(res, { code: 200, message: "点赞成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  const guideFavMatch = path.match(/^\/api\/content\/guides\/(\d+)\/fav$/);
  if (guideFavMatch && req.method === "POST") {
    const g = guides.find((x) => x.id === parseInt(guideFavMatch[1]));
    if (g) { g.favorites++; return json(res, { code: 200, message: "收藏成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Content: Travelogues ----
  if (path === "/api/content/travelogues" && req.method === "GET") {
    let list = [...travelogues];
    const kw = sp.get("keyword");
    if (kw) list = list.filter((t) => t.title.includes(kw) || t.content.includes(kw));
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 12) });
  }

  if (path === "/api/content/travelogues" && req.method === "POST") {
    const body = await readBody(req);
    const t = { id: nextTravelogueId++, ...body, likes: 0, views: 0, status: 1, createTime: new Date().toISOString() };
    travelogues.unshift(t);
    return json(res, { code: 200, message: "发布成功", data: t });
  }

  const trogueMatch = path.match(/^\/api\/content\/travelogues\/(\d+)$/);
  if (trogueMatch) {
    const t = travelogues.find((x) => x.id === parseInt(trogueMatch[1]));
    if (t) { t.views++; return json(res, { code: 200, message: "操作成功", data: t }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Content: Food ----
  if (path === "/api/content/food" && req.method === "GET") {
    let list = [...foods];
    const kw = sp.get("keyword"), prov = sp.get("province");
    if (kw) list = list.filter((f) => f.name.includes(kw) || f.tags.includes(kw));
    if (prov) list = list.filter((f) => f.province === prov);
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 12) });
  }

  const foodMatch = path.match(/^\/api\/content\/food\/(\d+)$/);
  if (foodMatch) {
    const f = foods.find((x) => x.id === parseInt(foodMatch[1]));
    return f ? json(res, { code: 200, message: "操作成功", data: f }) : json(res, { code: 404, message: "未找到", data: null });
  }
  // ---- User Orders ----
  if (path === "/api/user/orders" && req.method === "GET") {
    let list = [...orders];
    const userId = parseInt(sp.get("userId"));
    const status = sp.get("status");
    if (userId) list = list.filter((o) => String(o.userId) === String(userId));
    if (status && status !== "all") list = list.filter((o) => o.status === status);
    list.sort((a, b) => b.id - a.id);
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum") || 1, sp.get("pageSize") || 50) });
  }

  if (path === "/api/user/orders" && req.method === "POST") {
    const body = await readBody(req);
    const o = { id: nextOrderId++, status: "pending", ...body, createTime: new Date().toISOString().replace("T", " ").slice(0, 19) };
    orders.unshift(o);
    return json(res, { code: 200, message: "下单成功", data: o });
  }

  const userOrderMatch = path.match(/^\/api\/user\/orders\/(\d+)$/);
  if (userOrderMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = orders.findIndex((o) => o.id === parseInt(userOrderMatch[1]));
    if (idx >= 0) { orders[idx] = { ...orders[idx], ...body }; return json(res, { code: 200, message: "更新成功", data: orders[idx] }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }


  // ---- Admin ----
  if (path === "/api/admin/users" && req.method === "GET") {
    const kw = sp.get("keyword");
    let list = users.map(({ password, ...u }) => u);
    if (kw) list = list.filter((u) => u.username.includes(kw) || u.nickname.includes(kw) || (u.phone && u.phone.includes(kw)));
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 10) });
  }

  const toggleMatch = path.match(/^\/api\/admin\/users\/(\d+)\/toggle-status$/);
  if (toggleMatch && req.method === "PUT") {
    const user = users.find((u) => u.id === parseInt(toggleMatch[1]));
    if (user) { user.status = user.status === 1 ? 0 : 1; return json(res, { code: 200, message: "状态更新成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  const delMatch = path.match(/^\/api\/admin\/users\/(\d+)$/);
  if (delMatch && req.method === "DELETE") {
    const idx = users.findIndex((u) => u.id === parseInt(delMatch[1]));
    if (idx >= 0) { users.splice(idx, 1); return json(res, { code: 200, message: "删除成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }


  // ---- Admin: Scenic CRUD ----
  const adminScenicMatch = path.match(/^\/api\/admin\/scenics\/(\d+)$/);
  if (adminScenicMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = scenics.findIndex((s) => s.id === parseInt(adminScenicMatch[1]));
    if (idx >= 0) { scenics[idx] = { ...scenics[idx], ...body }; return json(res, { code: 200, message: "更新成功", data: scenics[idx] }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }
  if (path === "/api/admin/scenics" && req.method === "POST") {
    const body = await readBody(req);
    const maxId = scenics.reduce((m, s) => Math.max(m, s.id), 0);
    const s = { id: maxId + 1, rating: 4.0, ...body, createTime: new Date().toISOString() };
    scenics.push(s);
    return json(res, { code: 200, message: "添加成功", data: s });
  }
  const adminScenicDelMatch = path.match(/^\/api\/admin\/scenics\/(\d+)$/);
  if (adminScenicDelMatch && req.method === "DELETE") {
    const idx = scenics.findIndex((s) => s.id === parseInt(adminScenicDelMatch[1]));
    if (idx >= 0) { scenics.splice(idx, 1); return json(res, { code: 200, message: "删除成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Admin: Food CRUD ----
  const adminFoodMatch = path.match(/^\/api\/admin\/food\/(\d+)$/);
  if (adminFoodMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = foods.findIndex((f) => f.id === parseInt(adminFoodMatch[1]));
    if (idx >= 0) { foods[idx] = { ...foods[idx], ...body }; return json(res, { code: 200, message: "更新成功", data: foods[idx] }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }
  if (path === "/api/admin/food" && req.method === "POST") {
    const body = await readBody(req);
    const maxId = foods.reduce((m, f) => Math.max(m, f.id), 0);
    const f = { id: maxId + 1, ...body, createTime: new Date().toISOString() };
    foods.push(f);
    return json(res, { code: 200, message: "添加成功", data: f });
  }
  const adminFoodDelMatch = path.match(/^\/api\/admin\/food\/(\d+)$/);
  if (adminFoodDelMatch && req.method === "DELETE") {
    const idx = foods.findIndex((f) => f.id === parseInt(adminFoodDelMatch[1]));
    if (idx >= 0) { foods.splice(idx, 1); return json(res, { code: 200, message: "删除成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Admin: Guide CRUD ----
  const adminGuideMatch = path.match(/^\/api\/admin\/guides\/(\d+)$/);
  if (adminGuideMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = guides.findIndex((g) => g.id === parseInt(adminGuideMatch[1]));
    if (idx >= 0) { guides[idx] = { ...guides[idx], ...body }; return json(res, { code: 200, message: "更新成功", data: guides[idx] }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }
  if (path === "/api/admin/guides" && req.method === "POST") {
    const body = await readBody(req);
    const maxId = guides.reduce((m, g) => Math.max(m, g.id), 0);
    const g = { id: maxId + 1, likes: 0, favorites: 0, views: 0, status: 1, ...body, createTime: new Date().toISOString() };
    guides.push(g);
    return json(res, { code: 200, message: "添加成功", data: g });
  }
  const adminGuideDelMatch = path.match(/^\/api\/admin\/guides\/(\d+)$/);
  if (adminGuideDelMatch && req.method === "DELETE") {
    const idx = guides.findIndex((g) => g.id === parseInt(adminGuideDelMatch[1]));
    if (idx >= 0) { guides.splice(idx, 1); return json(res, { code: 200, message: "删除成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Admin: Travelogue CRUD ----
  const adminTrogueMatch = path.match(/^\/api\/admin\/travelogues\/(\d+)$/);
  if (adminTrogueMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = travelogues.findIndex((t) => t.id === parseInt(adminTrogueMatch[1]));
    if (idx >= 0) { travelogues[idx] = { ...travelogues[idx], ...body }; return json(res, { code: 200, message: "更新成功", data: travelogues[idx] }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }
  const adminTrogueDelMatch = path.match(/^\/api\/admin\/travelogues\/(\d+)$/);
  if (adminTrogueDelMatch && req.method === "DELETE") {
    const idx = travelogues.findIndex((t) => t.id === parseInt(adminTrogueDelMatch[1]));
    if (idx >= 0) { travelogues.splice(idx, 1); return json(res, { code: 200, message: "删除成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Admin: Orders ----
  if (path === "/api/admin/orders" && req.method === "GET") {
    let list = [...orders];
    const status = sp.get("status"), kw = sp.get("keyword");
    if (status) list = list.filter((o) => o.status === status);
    if (kw) list = list.filter((o) => o.scenicName.includes(kw) || o.username.includes(kw));
    list.sort((a, b) => b.id - a.id);
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 10) });
  }
  const orderMatch = path.match(/^\/api\/admin\/orders\/(\d+)$/);
  if (orderMatch && req.method === "GET") {
    const o = orders.find((x) => x.id === parseInt(orderMatch[1]));
    return o ? json(res, { code: 200, message: "操作成功", data: o }) : json(res, { code: 404, message: "未找到", data: null });
  }
  if (orderMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = orders.findIndex((o) => o.id === parseInt(orderMatch[1]));
    if (idx >= 0) { orders[idx] = { ...orders[idx], ...body }; return json(res, { code: 200, message: "更新成功", data: orders[idx] }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }
  if (path === "/api/admin/orders" && req.method === "POST") {
    const body = await readBody(req);
    const o = { id: nextOrderId++, status: "pending", ...body, createTime: new Date().toISOString().replace("T", " ").slice(0, 19) };
    orders.unshift(o);
    return json(res, { code: 200, message: "下单成功", data: o });
  }
  if (orderMatch && req.method === "DELETE") {
    const idx = orders.findIndex((o) => o.id === parseInt(orderMatch[1]));
    if (idx >= 0) { orders.splice(idx, 1); return json(res, { code: 200, message: "删除成功", data: null }); }
    return json(res, { code: 404, message: "未找到", data: null });
  }

  // ---- Admin: Dashboard Stats ----
  if (path === "/api/admin/stats" && req.method === "GET") {
    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = orders.filter((o) => o.createTime && o.createTime.startsWith(today));
    return json(res, { code: 200, message: "操作成功", data: {
      scenicCount: scenics.length,
      userCount: users.length,
      orderCount: orders.length,
      todayOrders: todayOrders.length,
      todayRevenue: todayOrders.reduce((s, o) => s + (o.totalPrice || 0), 0),
      guideCount: guides.length,
      travelogueCount: travelogues.length,
      foodCount: foods.length,
    }});
  }
  json(res, { code: 404, message: "Not found", data: null }, 404);
});

server.listen(PORT, () => {
  console.log(`\n  [Mock API] http://localhost:${PORT}`);
  console.log(`  [Mock API] accounts: admin/123456, traveler/123456\n`);
});
