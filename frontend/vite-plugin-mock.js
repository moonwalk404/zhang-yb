// Vite plugin: embedded mock API server


import { writeFileSync, existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = resolve(__dirname, ".mock-data.json");

function saveData() {
  try {
    const data = JSON.stringify({
      users, orders, scenics, guides, travelogues, foods,
      nextUserId, nextOrderId, nextTravelogueId
    }, null, 2);
    writeFileSync(DATA_FILE, data, "utf-8");
    if (!global.__mockSaveCount) global.__mockSaveCount = 0;
    global.__mockSaveCount++;
    if (global.__mockSaveCount % 10 === 0) {
      writeFileSync(DATA_FILE.replace(".json", ".bak.json"), data, "utf-8");
    }
  } catch (e) {
    console.error("[Mock] Save failed:", e.message);
    console.error("[Mock] Stack:", e.stack);
  }
}
console.log("[Mock] Data file:", DATA_FILE);

function loadData() {
  try {
    if (existsSync(DATA_FILE)) {
      const raw = readFileSync(DATA_FILE, "utf-8");
      const saved = JSON.parse(raw);
      if (saved.users) { users.length = 0; users.push(...saved.users); }
      if (saved.orders) { orders.length = 0; orders.push(...saved.orders); }
      if (saved.scenics) { scenics.length = 0; scenics.push(...saved.scenics); }
      if (saved.guides) { guides.length = 0; guides.push(...saved.guides); }
      if (saved.travelogues) { travelogues.length = 0; travelogues.push(...saved.travelogues); }
      if (saved.foods) { foods.length = 0; foods.push(...saved.foods); }
      if (saved.nextUserId) nextUserId = saved.nextUserId;
      if (saved.nextOrderId) nextOrderId = saved.nextOrderId;
      if (saved.nextTravelogueId) nextTravelogueId = saved.nextTravelogueId;
      console.log("[Mock] Data loaded from .mock-data.json");
    }
  } catch (e) { console.error("[Mock] Load failed:", e.message); }
}

// Auto-generated from mock-server.js

const PORT = 5173;

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
  { id: 1, username: "admin", password: "123456", nickname: "绯荤粺绠＄悊鍛?, role: "admin", phone: "13800000001", status: 1, createTime: "2024-01-01" },
  { id: 2, username: "traveler", password: "123456", nickname: "鏃呰鑰呭皬鐜?, role: "user", phone: "13800138000", status: 1, createTime: "2024-01-02" },
  { id: 3, username: "user2", password: "123456", nickname: "鑳屽寘瀹㈠皬鏉?, role: "user", phone: "13900139000", status: 1, createTime: "2024-01-03" },
];
let nextUserId = 4;

const scenics = [
  { id:1, name:"寮犲鐣屽浗瀹舵．鏋楀叕鍥?,description:"涓浗绗竴涓浗瀹舵．鏋楀叕鍥€傚紶瀹剁晫浠ュ叾鐙壒鐨勭煶鑻辩爞宀╁嘲鏋楀湴璨岄椈鍚嶄簬涓栵紝琚獕涓篭"鎵╁ぇ鐨勭泦鏅紝缂╁皬鐨勪粰澧僜"銆傛櫙鍖哄唴涓夊崈濂囧嘲鎷斿湴鑰岃捣锛屽叓鐧炬邯娴佽溈铚掓洸鎶橈紝妫灄瑕嗙洊鐜囬珮杈?8%锛屾槸鍚嶅壇鍏跺疄鐨勫ぉ鐒舵哀鍚с€?,coverImage:"https://picsum.photos/seed/zhangjiajie-mountains/800/600",location:"婀栧崡鐪佸紶瀹剁晫甯傛闄垫簮鍖?,province:"婀栧崡",city:"寮犲鐣?,longitude:110.4788,latitude:29.3464,price:228,rating:4.8,tags:"鑷劧椋庡厜,涓栫晫閬椾骇,5A鏅尯,鍥藉妫灄鍏洯",category:"鑷劧鏅",openTime:"07:00 - 18:00" },
  { id:2, name:"涔濆娌?,description:"涔濆娌熷浗瀹剁骇鑷劧淇濇姢鍖轰綅浜庡洓宸濈渷闃垮潩钘忔棌缇屾棌鑷不宸烇紝鍥犳矡鍐呮湁涔濅釜钘忔棌鏉戝鑰屽緱鍚嶃€傝繖閲屼互缈犳捣銆佸彔鐎戙€佸僵鏋椼€侀洩宄板拰钘忔棌椋庢儏闂诲悕浜庝笘锛岃瑾変负\"浜洪棿浠欏\"銆?,coverImage:"https://picsum.photos/seed/jiuzhaigou-lakes/800/600",location:"鍥涘窛鐪侀樋鍧濊棌鏃忕緦鏃忚嚜娌诲窞涔濆娌熷幙",province:"鍥涘窛",city:"闃垮潩",longitude:103.9194,latitude:33.2632,price:169,rating:4.9,tags:"鑷劧椋庡厜,涓栫晫閬椾骇,5A鏅尯",category:"鑷劧鏅",openTime:"08:00 - 17:00" },
  { id:3, name:"鏁呭鍗氱墿闄?,description:"鍖椾含鏁呭鏄腑鍥芥槑娓呬袱浠ｇ殑鐨囧瀹锛屾棫绉扮传绂佸煄锛屼綅浜庡寳浜腑杞寸嚎鐨勪腑蹇冦€傛晠瀹互涓夊ぇ娈夸负涓績锛屽崰鍦伴潰绉害72涓囧钩鏂圭背锛屽缓绛戦潰绉害15涓囧钩鏂圭背锛屾湁澶у皬瀹涓冨崄澶氬骇锛屾埧灞嬩節鍗冧綑闂淬€?,coverImage:"https://picsum.photos/seed/forbidden-city-beijing/800/600",location:"鍖椾含甯備笢鍩庡尯鏅北鍓嶈4鍙?,province:"鍖椾含",city:"鍖椾含",longitude:116.3970,latitude:39.9175,price:60,rating:4.7,tags:"鍘嗗彶鏂囧寲,涓栫晫閬椾骇,5A鏅尯",category:"浜烘枃鏅",openTime:"08:30 - 17:00" },
  { id:4, name:"瑗挎箹",description:"瑗挎箹浣嶄簬娴欐睙鐪佹澀宸炲競瑗挎箹鍖猴紝鏄腑鍥藉ぇ闄嗕富瑕佺殑瑙傝祻鎬ф贰姘存箹娉婁箣涓€锛屼篃鏄鎵瑰浗瀹堕噸鐐归鏅悕鑳滃尯銆傝タ婀栦笁闈㈢幆灞憋紝闈㈢Н绾?.39骞虫柟鍗冪背锛屼互\"娣″娴撴姽鎬荤浉瀹淺"鐨勬箹鍏夊北鑹查椈鍚嶅ぉ涓嬨€?,coverImage:"https://picsum.photos/seed/west-lake-hangzhou/800/600",location:"娴欐睙鐪佹澀宸炲競瑗挎箹鍖?,province:"娴欐睙",city:"鏉窞",longitude:120.1472,latitude:30.2439,price:0,rating:4.6,tags:"鑷劧椋庡厜,鍘嗗彶鏂囧寲,5A鏅尯",category:"鑷劧鏅",openTime:"鍏ㄥぉ寮€鏀? },
  { id:5, name:"妗傛灄婕撴睙",description:"婕撴睙椋庢櫙鍖烘槸涓栫晫涓婅妯℃渶澶с€侀鏅渶缇庣殑宀╂憾灞辨按娓歌鍖恒€備互\"灞遍潚銆佹按绉€銆佹礊濂囥€佺煶缇嶾"鍥涚粷钁楃О锛屼韩鏈塡"灞辨按鐢插ぉ涓媆"涔嬬編瑾夈€備箻绔圭瓘婕傛祦婕撴睙锛屼袱宀稿宄版灄绔嬶紝濡傚叆鐢讳腑銆?,coverImage:"https://picsum.photos/seed/guilin-river-karst/800/600",location:"骞胯タ澹棌鑷不鍖烘鏋楀競",province:"骞胯タ",city:"妗傛灄",longitude:110.2898,latitude:25.2350,price:215,rating:4.5,tags:"鑷劧椋庡厜,5A鏅尯",category:"鑷劧鏅",openTime:"08:30 - 16:30" },
  { id:6, name:"闀垮煄-鍏揪宀?,description:"鍏揪宀暱鍩庝綅浜庡寳浜競寤跺簡鍖猴紝鏄槑闀垮煄涓繚瀛樻渶瀹屽ソ銆佹渶鍏蜂唬琛ㄦ€х殑涓€娈点€傞暱鍩庢槸涓浗鍙や唬浼熷ぇ鐨勯槻寰″伐绋嬶紝涔熸槸涓栫晫涓冨ぇ濂囪抗涔嬩竴銆?,coverImage:"https://picsum.photos/seed/great-wall-china/800/600",location:"鍖椾含甯傚欢搴嗗尯",province:"鍖椾含",city:"鍖椾含",longitude:116.0167,latitude:40.3589,price:40,rating:4.6,tags:"鍘嗗彶鏂囧寲,涓栫晫閬椾骇,5A鏅尯",category:"浜烘枃鏅",openTime:"07:30 - 18:00" },
  { id:7, name:"榛勫北",description:"榛勫北浣嶄簬瀹夊窘鐪佸崡閮ㄩ粍灞卞競澧冨唴锛屼互濂囨澗銆佹€煶銆佷簯娴枫€佹俯娉夈€佸啲闆簲缁濊憲绉颁簬涓栥€俓"浜斿渤褰掓潵涓嶇湅灞憋紝榛勫北褰掓潵涓嶇湅宀砛"銆?,coverImage:"https://picsum.photos/seed/huangshan-mountains/800/600",location:"瀹夊窘鐪侀粍灞卞競",province:"瀹夊窘",city:"榛勫北",longitude:118.1716,latitude:30.1340,price:190,rating:4.7,tags:"鑷劧椋庡厜,涓栫晫閬椾骇,5A鏅尯",category:"鑷劧鏅",openTime:"06:30 - 17:00" },
  { id:8, name:"涓変簹铚堟敮娲插矝",description:"铚堟敮娲插矝鍧愯惤鍦ㄤ笁浜氬競鍖楅儴鐨勬捣妫犳咕鍐咃紝鏄腑鍥芥渶缇庣殑鐑甫娴峰矝涔嬩竴銆傛捣姘存竻婢堣搴曪紝鑳借搴﹀彲杈?7绫筹紝鏄綔姘寸埍濂借€呯殑澶╁爞銆?,coverImage:"https://picsum.photos/seed/sanya-tropical-beach/800/600",location:"娴峰崡鐪佷笁浜氬競娴锋鍖?,province:"娴峰崡",city:"涓変簹",longitude:109.7624,latitude:18.3072,price:144,rating:4.4,tags:"娴峰矝搴﹀亣,娼滄按,4A鏅尯",category:"娴峰矝搴﹀亣",openTime:"08:00 - 17:30" },
  { id:9, name:"澶х悊娲辨捣",description:"娲辨捣鏄簯鍗楃渷绗簩澶ф贰姘存箹锛屽洜鍏跺舰浼间汉鑰宠€屽緱鍚嶃€傛箹姘存竻婢堢ⅶ钃濓紝涓庤媿灞卞崄涔濆嘲鐩告槧鎴愯叮锛孿"鑻嶅北闆紝娲辨捣鏈圽"鏋勬垚浜嗗ぇ鐞嗘渶缁忓吀鐨勭編鏅€傜幆婀栭獞琛屽叏绋嬬害120鍏噷銆?,coverImage:"https://picsum.photos/seed/dali-erhai-lake/800/600",location:"浜戝崡鐪佸ぇ鐞嗙櫧鏃忚嚜娌诲窞",province:"浜戝崡",city:"澶х悊",longitude:100.1910,latitude:25.6090,price:0,rating:4.7,tags:"鑷劧椋庡厜,婀栨硦,楠戣鍦ｅ湴",category:"鑷劧鏅",openTime:"鍏ㄥぉ寮€鏀? },
  { id:10, name:"绉﹀鐨囧叺椹繎",description:"绉﹀鐨囧叺椹繎鍗氱墿棣嗕綅浜庨檿瑗跨渷瑗垮畨甯備复娼煎尯锛屾槸涓栫晫鏈€澶х殑鍦颁笅鍐涗簨鍗氱墿棣嗐€備笁涓繎鍧戞€婚潰绉秴杩?涓囧钩鏂圭背锛屽嚭鍦熼櫠淇戙€侀櫠椹害8000浠讹紝琚獕涓篭"涓栫晫绗叓澶у杩筡"銆?,coverImage:"https://picsum.photos/seed/terracotta-warriors/800/600",location:"闄曡タ鐪佽タ瀹夊競涓存郊鍖?,province:"闄曡タ",city:"瑗垮畨",longitude:109.2735,latitude:34.3853,price:120,rating:4.8,tags:"鍘嗗彶鏂囧寲,涓栫晫閬椾骇,5A鏅尯",category:"浜烘枃鏅",openTime:"08:30 - 18:00" },
  { id:11, name:"甯冭揪鎷夊",description:"甯冭揪鎷夊鍧愯惤鍦ㄨタ钘忔媺钀ㄥ競鍖虹殑鐜涘竷鏃ュ北涓婏紝鏄笘鐣屼笂娴锋嫈鏈€楂橈紝闆嗗娈裤€佸煄鍫″拰瀵洪櫌浜庝竴浣撶殑瀹忎紵寤虹瓚銆傜孩鐧戒袱鑹插娈夸緷灞辫€屽缓锛屾皵鍔跨绀淬€?,coverImage:"https://picsum.photos/seed/potala-palace-lhasa/800/600",location:"瑗胯棌鑷不鍖烘媺钀ㄥ競鍩庡叧鍖?,province:"瑗胯棌",city:"鎷夎惃",longitude:91.1172,latitude:29.6578,price:200,rating:4.9,tags:"鍘嗗彶鏂囧寲,涓栫晫閬椾骇,5A鏅尯,钘忎紶浣涙暀",category:"浜烘枃鏅",openTime:"09:00 - 16:00" },
  { id:12, name:"鍛间鸡璐濆皵澶ц崏鍘?,description:"鍛间鸡璐濆皵鑽夊師浣嶄簬鍐呰挋鍙よ嚜娌诲尯涓滃寳閮紝鏄笘鐣岃憲鍚嶇殑涓夊ぇ鑽夊師涔嬩竴銆傝繖閲屾按鑽変赴缇庯紝涓€鏈涙棤闄呯殑缁胯壊寤朵几鍒板ぉ杈癸紝鎴愮兢鐨勭墰缇婄偣缂€鍏堕棿锛屾瀯鎴愪竴骞呭．缇庣殑鑽夊師鐢诲嵎銆?,coverImage:"https://picsum.photos/seed/mongolia-grassland/800/600",location:"鍐呰挋鍙よ嚜娌诲尯鍛间鸡璐濆皵甯?,province:"鍐呰挋鍙?,city:"鍛间鸡璐濆皵",longitude:119.7656,latitude:49.2116,price:80,rating:4.6,tags:"鑽夊師椋庡厜,楠戦┈,钂欏彜鍖呬綋楠?,category:"鑷劧鏅",openTime:"鍏ㄥぉ寮€鏀? },
  { id:13, name:"绋诲煄浜氫竵",description:"绋诲煄浜氫竵鍥藉绾ц嚜鐒朵繚鎶ゅ尯浣嶄簬鍥涘窛鐪佺敇瀛滆棌鏃忚嚜娌诲窞锛岃瑾変负\"钃濊壊鏄熺悆涓婄殑鏈€鍚庝竴鐗囧噣鍦焅"銆備笁搴х灞扁€斺€斾粰涔冩棩銆佸ぎ杩堝媷銆佸璇哄鍚夌粓骞寸Н闆紝涓庨珮鍘熸捣瀛愭瀯鎴愮粷缇庣敾闈€?,coverImage:"https://picsum.photos/seed/daocheng-snow-mountain/800/600",location:"鍥涘窛鐪佺敇瀛滆棌鏃忚嚜娌诲窞绋诲煄鍘?,province:"鍥涘窛",city:"鐢樺瓬",longitude:100.3183,latitude:28.5589,price:270,rating:4.8,tags:"楂樺師椋庡厜,寰掓鍦ｅ湴,闆北婀栨硦",category:"鑷劧鏅",openTime:"07:00 - 18:00" },
  { id:14, name:"鏁︾厡鑾珮绐?,description:"鑾珮绐熶織绉板崈浣涙礊锛屽潗钀藉湪鐢樿們鐪佹暒鐓屽競涓滃崡25鍏噷鐨勯福娌欏北涓滈簱銆傚寤轰簬鍓嶇Е鏃舵湡锛屾槸涓栫晫涓婄幇瀛樿妯℃渶澶с€佸唴瀹规渶涓板瘜鐨勪經鏁欒壓鏈湴銆?,coverImage:"https://picsum.photos/seed/dunhuang-mogao-caves/800/600",location:"鐢樿們鐪侀厭娉夊競鏁︾厡甯?,province:"鐢樿們",city:"鏁︾厡",longitude:94.8099,latitude:40.0416,price:238,rating:4.8,tags:"鍘嗗彶鏂囧寲,涓栫晫閬椾骇,5A鏅尯,浣涙暀鑹烘湳",category:"浜烘枃鏅",openTime:"08:00 - 18:00" },
  { id:15, name:"闈掑矝宕傚北",description:"宕傚北浣嶄簬灞变笢鐪侀潚宀涘競宕傚北鍖猴紝鏄腑鍥芥捣宀哥嚎绗竴楂樺嘲锛岀礌鏈塡"娴蜂笂绗竴鍚嶅北\"涔嬬О銆傚北娴风浉杩烇紝姘寸浜戝锛屽磦灞遍亾鏁欐枃鍖栨簮杩滄祦闀裤€?,coverImage:"https://picsum.photos/seed/laoshan-qingdao/800/600",location:"灞变笢鐪侀潚宀涘競宕傚北鍖?,province:"灞变笢",city:"闈掑矝",longitude:120.6290,latitude:36.1446,price:90,rating:4.5,tags:"灞辨捣椋庡厜,閬撴暀鏂囧寲,5A鏅尯",category:"鑷劧鏅",openTime:"06:00 - 19:00" },
  { id:16, name:"鍘﹂棬榧撴氮灞?,description:"榧撴氮灞夸綅浜庣寤虹渷鍘﹂棬甯傛€濇槑鍖猴紝涓庡帵闂ㄥ矝闅旀捣鐩告湜銆傚矝涓婃皵鍊欏疁浜猴紝鍥涘濡傛槬锛屾棤杞﹂┈鍠у殻锛屾湁楦熻鑺遍锛岀礌鏈塡"娴蜂笂鑺卞洯\"涔嬭獕銆備竾鍥藉缓绛戝崥瑙堢兢浜ょ粐鍑虹嫭鐗圭殑鏂囧寲姘旇川銆?,coverImage:"https://picsum.photos/seed/gulangyu-island/800/600",location:"绂忓缓鐪佸帵闂ㄥ競鎬濇槑鍖?,province:"绂忓缓",city:"鍘﹂棬",longitude:118.0689,latitude:24.4479,price:35,rating:4.6,tags:"娴峰矝椋庡厜,涓栫晫閬椾骇,鏂囪壓灏忔竻鏂?5A鏅尯",category:"娴峰矝搴﹀亣",openTime:"鍏ㄥぉ寮€鏀? },
  { id:17, name:"鑻忓窞鍥灄",description:"鑻忓窞鍥灄鏄腑鍥藉彜鍏稿洯鏋楃殑浠ｈ〃锛屼互鎷欐斂鍥€佺暀鍥€佺綉甯堝洯绛変负浠ｈ〃銆備互灞辨按鑺辨湪銆佷涵鍙版ゼ闃佷负鍩烘湰瑕佺礌锛屽湪鏈夐檺绌洪棿鍐呭垱閫犳棤闄愮殑鎰忓锛孿"鍜昂涔嬪唴鍐嶉€犱咕鍧"銆?,coverImage:"https://picsum.photos/seed/suzhou-garden/800/600",location:"姹熻嫃鐪佽嫃宸炲競濮戣嫃鍖?,province:"姹熻嫃",city:"鑻忓窞",longitude:120.6266,latitude:31.3175,price:90,rating:4.6,tags:"鍙ゅ吀鍥灄,涓栫晫閬椾骇,5A鏅尯,姹熷崡姘翠埂",category:"浜烘枃鏅",openTime:"07:30 - 17:30" },
  { id:18, name:"鎴愰兘澶х唺鐚箒鑲茬爺绌跺熀鍦?,description:"鎴愰兘澶х唺鐚箒鑲茬爺绌跺熀鍦颁綅浜庡洓宸濈渷鎴愰兘甯傛垚鍗庡尯锛屾槸涓栫晫涓婃渶閲嶈鐨勫ぇ鐔婄尗淇濇姢鐮旂┒鏈烘瀯涔嬩竴銆傝繖閲岀敓娲荤潃鐧句綑鍙ぇ鐔婄尗锛屽彲浠ヨ繎璺濈瑙傚療鍥藉疂杩涢銆佸瑝鎴忕殑鎲ㄦ€併€?,coverImage:"https://picsum.photos/seed/panda-chengdu/800/600",location:"鍥涘窛鐪佹垚閮藉競鎴愬崕鍖?,province:"鍥涘窛",city:"鎴愰兘",longitude:104.1472,latitude:30.7310,price:58,rating:4.7,tags:"鍥藉疂鐔婄尗,浜插瓙娓?4A鏅尯",category:"涓婚涔愬洯",openTime:"07:30 - 18:00" },
  { id:19, name:"涓芥睙鍙ゅ煄",description:"涓芥睙鍙ゅ煄浣嶄簬浜戝崡鐪佷附姹熷競鍙ゅ煄鍖猴紝濮嬪缓浜庡畫鏈厓鍒濓紝鏄腑鍥藉巻鍙叉枃鍖栧悕鍩庝腑鍞竴娌℃湁鍩庡鐨勫彜鍩庛€傚厜婊戠殑鐭虫澘璺€佹墜宸ュ缓閫犵殑鏈ㄧ粨鏋勬埧灞嬨€佹棤澶勪笉鍦ㄧ殑灏忔ˉ娴佹按锛岃浜烘祦杩炲繕杩斻€?,coverImage:"https://picsum.photos/seed/lijiang-old-town/800/600",location:"浜戝崡鐪佷附姹熷競鍙ゅ煄鍖?,province:"浜戝崡",city:"涓芥睙",longitude:100.2330,latitude:26.8720,price:50,rating:4.4,tags:"鍙ゅ煄鍙ら晣,涓栫晫閬椾骇,5A鏅尯,绾宠タ鏂囧寲",category:"浜烘枃鏅",openTime:"鍏ㄥぉ寮€鏀? },
  { id:20, name:"鍗庡北",description:"鍗庡北浣嶄簬闄曡タ鐪佸崕闃村競锛屾槸浜斿渤涓殑瑗垮渤锛屼互\"濂囬櫓澶╀笅绗竴灞盶"闂诲悕銆傞暱绌烘爤閬撴偓浜庝竾涓堢粷澹佷箣涓婏紝楣炲瓙缈昏韩鏇存槸鎯婂績鍔ㄩ瓌銆傚崕灞辫繕鏄亾鏁欏叏鐪熸淳鍦ｅ湴銆?,coverImage:"https://picsum.photos/seed/huashan-cliffs/800/600",location:"闄曡タ鐪佹腑鍗楀競鍗庨槾甯?,province:"闄曡タ",city:"娓崡",longitude:110.0897,latitude:34.4793,price:160,rating:4.5,tags:"鐧诲北鎺㈤櫓,閬撴暀鍦ｅ湴,5A鏅尯",category:"鑷劧鏅",openTime:"鍏ㄥぉ寮€鏀撅紙24灏忔椂鐧诲北锛? },
]

// Guides
const guides = [
  { id:1, title:"寮犲鐣屼笁鏃ユ父瀹屽叏鏀荤暐", content:"<h2>Day 1锛氳瀹剁晫 - 澶╁瓙灞?/h2><p>鏃╀笂8鐐逛粠姝﹂櫟婧愰棬绁ㄧ珯杩涘叆锛屼箻鍧愮幆淇濊溅鍓嶅線鐧鹃緳澶╂銆傚埌杈捐瀹剁晫鍚庯紝娓歌澶╀笅绗竴妗ャ€佽糠榄傚彴銆佸悗鑺卞洯绛夋櫙鐐广€備笅鍗堝墠寰€澶╁瓙灞憋紝鍙傝璐洪緳鍏洯銆佸尽绗斿嘲銆佷粰濂虫暎鑺便€?/p><h2>Day 2锛氶噾闉邯 - 榛勭煶瀵?/h2><p>涓婂崍寰掓閲戦灜婧紝鍏ㄩ暱绾?.5鍏噷锛屾部閫斿彲娆ｈ祻鍒伴噾闉博銆佺楣版姢闉瓑鑷劧濂囪銆備笅鍗堟父瑙堥粍鐭冲锛岃繖鏄紶瀹剁晫鏈€澶х殑鍑岀┖瑙傛櫙鍙般€?/p><h2>Day 3锛氬ぉ闂ㄥ北</h2><p>涔樺潗涓栫晫鏈€闀跨殑楂樺北瀹㈣繍绱㈤亾鈥斺€斿ぉ闂ㄥ北绱㈤亾锛屼綋楠?9閬撳集鐨勭洏灞卞叕璺拰999闃跺ぉ姊€?/p><h3>缇庨鎺ㄨ崘</h3><ul><li>鍦熷涓変笅閿?/li><li>寮犲鐣岀背绮?/li><li>婀樿タ鑵婅倝</li></ul>", coverImage:"https://picsum.photos/seed/zhangjiajie-travel/800/600", author:"鏃呰杈句汉灏忕帇", scenicId:1, scenicName:"寮犲鐣?, tags:"涓夋棩娓?娣卞害娓?鑷劧椋庡厜", likes:328, favorites:156, views:12580, status:1, createTime:"2024-03-15" },
  { id:2, title:"鏁呭娣卞害娓歌璺嚎鈥斺€旈伩寮€浜烘疆鐨勭帺娉?, content:"<h2>鏈€浣虫父瑙堟椂闂?/h2><p>娣″锛?1鏈?娆″勾3鏈堬級娓稿杈冨皯锛屽缓璁棭涓?:00鍓嶅埌杈惧崍闂紝寮€棣嗗悗鐩村澶拰娈裤€?/p><h2>鎺ㄨ崘璺嚎</h2><p><strong>绮惧崕绾胯矾锛?-3灏忔椂锛夛細</strong>鍗堥棬鈫掑お鍜岄棬鈫掑お鍜屾鈫掍腑鍜屾鈫掍繚鍜屾鈫掍咕娓呭鈫掍氦娉版鈫掑潳瀹佸鈫掑尽鑺卞洯鈫掔姝﹂棬</p><p><strong>娣卞害绾胯矾锛?-6灏忔椂锛夛細</strong>澧炲姞鐝嶅疂棣嗗拰閽熻〃棣嗭紙鍚刓u00a510锛夈€?/p><h3>鎷嶇収鎵撳崱鐐?/h3><ul><li>瑙掓ゼ鈥斺€旀晠瀹渶缇庣殑寤虹瓚</li><li>澶拰娈垮箍鍦衡€斺€斿箍瑙掗暅澶存媿鍏ㄦ櫙</li><li>寰¤姳鍥€斺€旂孩澧欓噾鐡﹂厤缁挎爲</li></ul>", coverImage:"https://picsum.photos/seed/beijing-forbidden-tour/800/600", author:"鏂囧崥鐖卞ソ鑰?, scenicId:3, scenicName:"鏁呭", tags:"涓€鏃ユ父,鍘嗗彶鏂囧寲,娣卞害娓?, likes:512, favorites:289, views:23400, status:1, createTime:"2024-02-20" },
  { id:3, title:"涔濆娌熺瀛ｆ憚褰辨敾鐣?, content:"<h2>鎷嶆憚鏈€浣虫椂娈?/h2><p>10鏈堜腑鏃埌11鏈堝垵鏄節瀵ㄦ矡鏈€缇庣殑瀛ｈ妭銆備簲褰╂枒鏂撶殑鏍戝彾鍊掓槧鍦ㄧⅶ钃濈殑婀栨按涓紝闅忔墜涓€鎷嶉兘鏄ぇ鐗囥€?/p><h2>鎺ㄨ崘鎷嶆憚鐐?/h2><ul><li><strong>浜旇姳娴?/strong>鈥斺€旀竻鏅ㄦ棤椋庢椂姘撮潰濡傞暅锛屽€掑奖鏈€涓烘竻鏅?/li><li><strong>璇烘棩鏈楃€戝竷</strong>鈥斺€斾娇鐢ㄦ參闂ㄦ媿鎽勬按娴佷笣缁告晥鏋?/li><li><strong>闀滄捣</strong>鈥斺€斾笅鍗?-4鐐瑰厜绾挎渶浣?/li></ul>", coverImage:"https://picsum.photos/seed/jiuzhaigou-autumn/800/600", author:"鎽勫奖甯堣€佸紶", scenicId:2, scenicName:"涔濆娌?, tags:"鎽勫奖,绉嬪,鑷劧椋庡厜", likes:891, favorites:432, views:35000, status:1, createTime:"2024-01-10" },
  { id:4, title:"鏉窞瑗挎箹涓€鏃ユ极姝ユ寚鍗?, content:"<h2>缁忓吀鐜箹璺嚎</h2><p>鏂ˉ娈嬮洩鈫掔櫧鍫も啋瀛ゅ北鈫掕嫃鍫ゆ槬鏅撯啋鑺辨腐瑙傞奔鈫掗浄宄板鈫掑崡灞辫矾銆傚叏绋嬬害12鍏噷锛屾琛?-4灏忔椂銆?/p><h2>蹇呬綋楠?/h2><ul><li>涔樻墜鎽囪埞娓告箹锛岃埞澶細璁茬櫧濞樺瓙鐨勬晠浜?/li><li>鍦ㄦ箹鐣斿眳鑼堕鍠濊尪璧忔箹</li><li>鏅氶棿鐨勯煶涔愬柗娉夎〃婕?/li></ul>", coverImage:"https://picsum.photos/seed/hangzhou-west-lake/800/600", author:"鏉窞鍦熻憲", scenicId:4, scenicName:"瑗挎箹", tags:"涓€鏃ユ父,浼戦棽,鍩庡競婕", likes:245, favorites:98, views:8900, status:1, createTime:"2024-03-01" },
  { id:5, title:"榛勫北缁忓吀涓ゆ棩娓哥嚎璺鍒?, content:"<h2>Day 1锛氫簯璋风储閬撲笂 - 瑗挎捣澶у场璋?/h2><p>浠庝簯璋峰涔樺潗绱㈤亾涓婂北锛屾父瑙堝淇″嘲銆佸寳娴锋櫙鍖猴紝涓嬪崍鎸戞垬瑗挎捣澶у场璋风殑涓€鐜拰浜岀幆銆?/p><h2>Day 2锛氬厜鏄庨《鏃ュ嚭 - 鐜夊睆妤?/h2><p>娓呮櫒5鐐瑰嚭鍙戝墠寰€鍏夋槑椤剁湅鏃ュ嚭锛岀劧鍚庢父瑙堥鏉ョ煶銆侀硨楸煎嘲锛屾渶鍚庡湪鐜夊睆妤肩湅杩庡鏉俱€?/p>", coverImage:"https://picsum.photos/seed/huangshan-hiking/800/600", author:"鐧诲北鐖卞ソ鑰?, scenicId:7, scenicName:"榛勫北", tags:"涓ゆ棩娓?鐧诲北,鑷劧椋庡厜", likes:673, favorites:312, views:18900, status:1, createTime:"2024-02-28" },
  { id:6, title:"澶х悊娲辨捣鐜箹楠戣瀹屽叏鏀荤暐", content:"<h2>鎺ㄨ崘楠戣璺嚎</h2><p>浠庡ぇ鐞嗗彜鍩庡嚭鍙戔啋鎵嶆潙鐮佸ご鈫掑枩娲插彜闀団啋鍙屽粖鍙ら晣鈫掓寲鑹查晣鈫掓捣涓滈晣鈫掍笅鍏斥啋杩斿洖鍙ゅ煄銆傚叏绋嬬害120鍏噷锛屽缓璁垎2澶╁畬鎴愩€?/p><h2>Day 1锛堣タ绾?0km锛?/h2><p>鍙ゅ煄鈫掓墠鏉戠湅鏃ュ嚭鈫掑枩娲插悆鐮撮叆绮戠矐鈫掑弻寤婂彜闀囦綇瀹裤€傝タ绾挎部閫旀湁涓撻棬鐨勯獞琛岀豢閬撱€?/p><h2>Day 2锛堜笢绾?0km锛?/h2><p>鍙屽粖鈫掓寲鑹茬湅鏃ヨ惤鈫掓捣涓滄部娴峰叕璺啋杩斿洖鍙ゅ煄銆備笢绾胯溅灏戣矾瀹斤紝澶曢槼鏃跺垎灏ゅ叾缇庝附銆?/p><h3>绉熻溅璐村＋</h3><ul><li>鍙ゅ煄鍐呯鐢靛姩杞︾害30-80鍏?澶?/li><li>寤鸿绉熺數鍔ㄨ溅锛屽潯璺緝澶?/li><li>娌块€旀湁澶氬鍏呯數妗?/li></ul>", coverImage:"https://picsum.photos/seed/dali-cycling/800/600", author:"楠戣鑰呴樋椋?, scenicId:9, scenicName:"澶х悊娲辨捣", tags:"楠戣,涓ゆ棩娓?鑷劧椋庡厜", likes:562, favorites:278, views:21500, status:1, createTime:"2024-04-05" },
  { id:7, title:"瑗垮畨涓夋棩娓糕€斺€斿崄涓夋湞鍙ら兘鐨勬枃鍖栫洓瀹?, content:"<h2>Day 1锛氬叺椹繎 - 鍗庢竻瀹?/h2><p>涓婂崍鍓嶅線涓存郊鍙傝绉﹀鐨囧叺椹繎鍗氱墿棣嗭紝寤鸿璇蜂竴浣嶈瑙ｅ憳锛堢害100鍏冿級锛岃鍘嗗彶娲昏捣鏉ャ€備笅鍗堟父瑙堝崕娓呭锛屾劅鍙梊"鏄ュ瘨璧愭荡鍗庢竻姹燶"鐨勭殗瀹舵皼鍥淬€?/p><h2>Day 2锛氬煄澧?- 鍥炴皯琛?/h2><p>涓婂崍楠戣瑗垮畨鍩庡锛堝叏闀跨害14鍏噷锛岄獞琛岀害2灏忔椂锛夈€傚倣鏅氬幓鍥炴皯琛楋紝鍝佸皾鑲夊す棣嶃€佺緤鑲夋场棣嶃€佸噳鐨瓑缇庨銆?/p><h2>Day 3锛氬ぇ闆佸 - 闄曡タ鍘嗗彶鍗氱墿棣?/h2><p>涓婂崍鍙傝澶ч泚濉斿強澶ф厛鎭╁锛屼笅鍗堝墠寰€闄曡タ鍘嗗彶鍗氱墿棣嗭紙闇€鎻愬墠3澶╅绾︼級銆?/p>", coverImage:"https://picsum.photos/seed/xian-history/800/600", author:"鍘嗗彶鏂囧寲杩?, scenicId:10, scenicName:"鍏甸┈淇?, tags:"涓夋棩娓?鍘嗗彶鏂囧寲,缇庨涔嬫梾", likes:435, favorites:201, views:16700, status:1, createTime:"2024-03-28" },
  { id:8, title:"绋诲煄浜氫竵寰掓缁堟瀬鎸囧崡", content:"<h2>琛屽墠鍑嗗</h2><p>绋诲煄浜氫竵娴锋嫈鍦?000绫充互涓婏紝楂樺師鍙嶅簲鏄渶澶ф寫鎴樸€傚缓璁彁鍓嶄竴鍛ㄦ湇鐢ㄧ孩鏅ぉ锛屾姷杈惧悗鍏堝湪棣欐牸閲屾媺闀囷紙娴锋嫈2900m锛夐€傚簲涓€澶┿€?/p><h2>鎺ㄨ崘璺嚎锛?鏃ュ緬姝ワ級</h2><p><strong>Day 1锛?/strong>鍐插彜瀵衡啋鐝嶇彔娴凤紙鍗撶帥鎷夋帾锛夛紝寰€杩旂害3灏忔椂锛岄毦搴﹁緝浣庯紝閫傚簲娴锋嫈銆?/p><p><strong>Day 2锛?/strong>娲涚粧鐗涘満鈫掔墰濂舵捣鈫掍簲鑹叉捣锛屽線杩旂害6-8灏忔椂銆傜墰濂舵捣娴锋嫈4600绫筹紝浜旇壊娴锋捣鎷?700绫炽€傚缓璁獞椹埌鑸嶈韩宕栵紙绾?00鍏冿級锛屽啀寰掓鍓╀綑璺銆?/p><h3>蹇呭瑁呭</h3><ul><li>鍐查攱琛?鎶撶粧琛ｏ紙灞变笂娓╁樊澶э級</li><li>鐧诲北鏉栵紙鐪佸姏30%浠ヤ笂锛?/li><li>姘ф皵鐡讹紙闀囦笂璐拱锛?0鍏?鐡讹級</li><li>闃叉檼闇?澧ㄩ暅锛堥珮鍘熺传澶栫嚎鏋佸己锛?/li></ul>", coverImage:"https://picsum.photos/seed/daocheng-trek/800/600", author:"鎴峰棰嗛槦澶ч泟", scenicId:13, scenicName:"绋诲煄浜氫竵", tags:"寰掓,楂樺師,娣卞害娓?, likes:1245, favorites:678, views:45600, status:1, createTime:"2024-05-01" },
  { id:9, title:"妗傛灄闃虫湐鍥涙棩娣卞害娓糕€斺€旀紦姹熸渶缇庣殑瀛ｈ妭", content:"<h2>Day 1锛氭鏋楀競鍖?/h2><p>涓嬪崍娓歌璞￠蓟灞憋紙妗傛灄鍩庡窘锛夛紝鍌嶆櫄婕涓ゆ睙鍥涙箹锛岀湅鏃ユ湀鍙屽澶滄櫙銆?/p><h2>Day 2锛氭紦姹熺簿鍗庢</h2><p>浠庢潹鍫ょ爜澶翠箻绔圭瓘鍒颁節椹敾灞憋紙绾?灏忔椂锛夛紝鎶佃揪鍏村潽鍙ら晣鍚庢墦鍗?0鍏冧汉姘戝竵鑳屾櫙鍥俱€傛櫄涓婁綇闃虫湐瑗胯闄勮繎銆?/p><h2>Day 3锛氶槼鏈?/h2><p>涓婂崍楠戣閬囬緳娌冲崄閲岀敾寤娿€備笅鍗堜綋楠岄亣榫欐渤绔圭瓘婕傛祦銆傛櫄涓婇€涜タ琛楋紝鐪嬨€婂嵃璞″垬涓夊銆嬨€?/p><h2>Day 4锛氶緳鑴婃鐢?/h2><p>涔樿溅鍓嶅線榫欒儨榫欒剨姊敯锛堢害2灏忔椂锛夛紝5-6鏈堢亴姘存湡鍜?-10鏈堟敹鑾峰鑺傛渶缇庛€?/p>", coverImage:"https://picsum.photos/seed/guilin-yangshuo/800/600", author:"妗傛灄鏈湴閫?, scenicId:5, scenicName:"婕撴睙", tags:"鍥涙棩娓?娣卞害娓?鑷劧椋庡厜", likes:789, favorites:356, views:28900, status:1, createTime:"2024-04-18" },
  { id:10, title:"鍘﹂棬榧撴氮灞?甯傚尯涓夋棩鏂囪壓涔嬫梾", content:"<h2>Day 1锛氶紦娴笨</h2><p>涓婂崍浠庝笢娓￠偖杞爜澶翠笂宀涳紙鑸圭エ35鍏冿級銆傛父瑙堟棩鍏夊博鈫掕徑搴勮姳鍥啋鐨撴湀鍥啋榫欏ご璺皬鍚冭銆傛帹鑽愶細寮犱笁鐤ザ鑼躲€佸彾姘忛夯绯嶃€佹灄璁伴奔涓搞€?/p><h2>Day 2锛氬帵闂ㄥぇ瀛?- 鍗楁櫘闄€ - 鐜矝璺?/h2><p>涓婂崍鍙傝\"涓浗鏈€缇庡ぇ瀛"鍘﹂棬澶у鍜屽崡鏅檧瀵恒€備笅鍗堥獞琛岀幆宀涜矾锛堟浘鍘濆灥鈫掓ぐ椋庡锛夛紝娌块€旀捣鏅棤鏁屻€?/p><h2>Day 3锛氭矙鍧″熬 - 妞嶇墿鍥?/h2><p>娌欏潯灏炬槸鍘﹂棬鏈€鏂囪壓鐨勮鍖猴紝鍚勭鍜栧暋棣嗐€佹枃鍒涘簵銆備笅鍗堝幓涓囩煶妞嶇墿鍥紝宸ㄥ瀷浠欎汉鎺屽尯鏄媿鐓у湥鍦般€?/p>", coverImage:"https://picsum.photos/seed/xiamen-coast/800/600", author:"鏂囪壓濂抽潚骞村皬楣?, scenicId:16, scenicName:"榧撴氮灞?, tags:"涓夋棩娓?鏂囪壓,娴峰矝", likes:567, favorites:289, views:22300, status:1, createTime:"2024-04-22" },
  { id:11, title:"鑻忓窞鍥灄涓€鏃ョ簿鍗庢父", content:"<h2>涓婂崍锛氭嫏鏀垮洯+鑻忓窞鍗氱墿棣?/h2><p>鎷欐斂鍥槸鑻忓窞鏈€澶х殑鍙ゅ吀鍥灄锛屽缓璁?:00寮€鍥氨鍏ュ満锛岄伩寮€浜烘祦楂樺嘲锛堟父瑙堢害2灏忔椂锛夈€傝嫃宸炲崥鐗╅鐢辫礉鑱块摥璁捐锛屾湰韬氨鏄缓绛戣壓鏈搧锛堝厤璐癸紝闇€棰勭害锛夈€?/p><h2>涓嬪崍锛氱暀鍥?灞卞琛?/h2><p>鐣欏洯浠ュ缓绛戠┖闂村鐞嗚闀匡紝鍐犱簯宄版槸澶箹鐭充腑鐨勬瀬鍝併€傚倣鏅氬墠寰€灞卞琛椾箻鑸规父娌筹紝鍚冧竴纰楁瀹楄嫃寮忔堡闈€?/p><h3>缇庨鎺ㄨ崘</h3><ul><li>寰楁湀妤尖€斺€旀澗榧犳楸?/li><li>鍚屽緱鍏粹€斺€旀灚闀囧ぇ鑲夐潰</li><li>閲囪姖鏂嬧€斺€旇嫃寮忕硸鏋?/li></ul>", coverImage:"https://picsum.photos/seed/suzhou-classical/800/600", author:"姹熷崡娓稿瓙", scenicId:17, scenicName:"鑻忓窞鍥灄", tags:"涓€鏃ユ父,鍥灄,姹熷崡姘翠埂", likes:345, favorites:167, views:12300, status:1, createTime:"2024-05-08" },
  { id:12, title:"鍗庡北澶滅埇鍏ㄦ敾鐣モ€斺€旂湅鏃ュ嚭锛屼笉铏氭琛?, content:"<h2>涓轰粈涔堝鐖紵</h2><p>澶滅埇鍗庡北鏄粡鍏哥帺娉曘€傛櫄涓婄櫥灞辨棦涓嶇儹鍙堣兘鐪佷竴鏅氫綇瀹匡紝娓呮櫒鍒拌揪涓滃嘲鐪嬫棩鍑猴紝浣撻獙鎰熸媺婊°€?/p><h2>澶滅埇璺嚎</h2><p><strong>21:00</strong> 鐜夋硥闄㈠嚭鍙戔啋<strong>23:00</strong> 鍗冨昂骞?鐧惧昂宄★紙鏈€闄¤矾娈碉級鈫?strong>01:00</strong> 鍖楀嘲锛堟捣鎷?614m锛夆啋<strong>03:30</strong> 閲戦攣鍏斥啋<strong>05:00</strong> 涓滃嘲瑙傛棩鍙扮瓑鏃ュ嚭</p><h2>涓嬪北</h2><p>鐪嬪畬鏃ュ嚭鍚庢父瑙堝崡宄帮紙鏈€楂樺嘲2154m锛夈€佽タ宄帮紝涔樿タ宄扮储閬撲笅灞憋紙140鍏冿紝绾?0鍒嗛挓锛夈€?/p><h3>澶滅埇瑁呭</h3><ul><li>澶寸伅/鎵嬬數绛掞紙蹇呭锛?/li><li>鎵嬪锛堟姄閾侀摼鐢紝灞变笅1鍏?鍙岋級</li><li>鍐查攱琛ｏ紙灞遍《姣斿北涓嬩綆10-15搴︼級</li><li>鍏呰冻鐨勬按鍜屽共绮?/li></ul>", coverImage:"https://picsum.photos/seed/huashan-sunrise/800/600", author:"澶滅埇杈句汉", scenicId:20, scenicName:"鍗庡北", tags:"澶滅埇,鏃ュ嚭,鐧诲北鎺㈤櫓", likes:923, favorites:456, views:38900, status:1, createTime:"2024-05-15" },
];

// Travelogues
const travelogues = [
  { id:1, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"寮犲鐣岋紝涓€鍦鸿璧板氨璧扮殑浠欏涔嬫梾", content:"缁堜簬鏉ュ埌浜嗗績蹇冨康蹇电殑寮犲鐣岋紒绔欏湪鐧鹃緳澶╂涓婏紝鐪嬬潃鍛ㄥ洿鎷斿湴鑰岃捣鐨勭煶宄帮紝鐪熺殑闇囨捈鍒拌涓嶅嚭璇濄€備笁鍗冨宄帮紝姣忎竴搴ч兘鏄ぇ鑷劧鐨勬澃浣溾€︹€?, images:"https://picsum.photos/seed/zhangjiajie-mist/800/600", location:"婀栧崡寮犲鐣?, scenicId:1, scenicName:"寮犲鐣?, likes:156, views:3200, status:1, createTime:"2024-04-10" },
  { id:2, userId:3, username:"鑳屽寘瀹㈠皬鏉?, avatar:"", title:"瑗垮瓙婀栫晹鐨勬參鏃跺厜", content:"鍦ㄦ澀宸炲緟浜嗕笁澶╋紝鏈€鍠滄鐨勫氨鏄瘡澶╁倣鏅氬湪瑗挎箹杈规暎姝ャ€傛箹闈㈣澶曢槼鏌撴垚閲戣壊锛岃繙澶勭殑闆峰嘲濉斿湪鏆壊涓牸澶栨俯鏌斺€︹€?, images:"https://picsum.photos/seed/west-lake-dusk/800/600", location:"娴欐睙鏉窞", scenicId:4, scenicName:"瑗挎箹", likes:89, views:1800, status:1, createTime:"2024-04-05" },
  { id:3, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"鏁呭鐨勯洩锛岀传绂佸煄鏈€缇庣殑鏃跺埢", content:"澶ч洩绾烽鐨勬晠瀹紝绾㈠鐧介洩锛岀編寰楄浜哄睆鎭€傞噾鐡︿笂瑕嗙洊鐫€涓€灞傝杽钖勭殑闆紝鏁翠釜绱鍩庝豢浣涚┛瓒婂洖浜嗗叚鐧惧勾鍓嶁€︹€?, images:"https://picsum.photos/seed/forbidden-city-snow/800/600", location:"鍖椾含", scenicId:3, scenicName:"鏁呭", likes:234, views:5600, status:1, createTime:"2024-03-20" },
  { id:4, userId:3, username:"鑳屽寘瀹㈠皬鏉?, avatar:"", title:"婕撴睙绔圭瓘婕傛祦璁?, content:"鍧愬湪绔圭瓘涓婏紝鍚潃鑸瑰か鐨勫彿瀛愶紝涓ゅ哺闈掑北缂撶紦鍚庨€€銆傛紦姹熺殑姘寸湡缁垮晩锛岀豢寰楀儚涓€鍧楁棤鐟曠殑缈＄繝鈥︹€?, images:"https://picsum.photos/seed/guilin-bamboo-raft/800/600", location:"骞胯タ妗傛灄", scenicId:5, scenicName:"婕撴睙", likes:178, views:4200, status:1, createTime:"2024-03-25" },
  { id:5, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"榛勫北褰掓潵涓嶇湅宀?, content:"鍑屾櫒4鐐硅捣搴婏紝鎵撶潃鎵嬬數绛掔埇涓婂厜鏄庨《銆傚綋绗竴缂曢槼鍏夊埡鐮翠簯娴凤紝鎵€鏈変汉閮藉畨闈欎簡銆傝繖灏辨槸浼犺涓殑榛勫北鏃ュ嚭鍟婏紒", images:"https://picsum.photos/seed/huangshan-clouds/800/600", location:"瀹夊窘榛勫北", scenicId:7, scenicName:"榛勫北", likes:312, views:7800, status:1, createTime:"2024-03-12" },
  { id:6, userId:3, username:"鑳屽寘瀹㈠皬鏉?, avatar:"", title:"涓変簹娼滄按鍒濅綋楠?, content:"绗竴娆℃綔姘村氨閫夋嫨浜嗚湀鏀床宀涳紒娴锋按鑳借搴﹂珮寰楁儕浜猴紝鐝婄憵銆佺儹甯﹂奔缇ゅ氨鍦ㄧ溂鍓嶆父杩囷紝鍍忓湪鍙︿竴涓笘鐣屸€︹€?, images:"https://picsum.photos/seed/sanya-diving/800/600", location:"娴峰崡涓変簹", scenicId:8, scenicName:"铚堟敮娲插矝", likes:145, views:2900, status:1, createTime:"2024-04-01" },
  { id:7, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"鍦ㄥぇ鐞嗭紝鏃堕棿鏄敤鏉ユ氮璐圭殑", content:"鐜幢娴烽獞琛岀殑鏃跺€欙紝蹇界劧鏄庣櫧浜嗕负浠€涔堥偅涔堝浜烘潵浜嗗ぇ鐞嗗氨涓嶆兂璧般€傞槼鍏夋磼鍦ㄨ媿灞变笂锛屾幢娴疯摑寰椾笉鐪熷疄锛岃矾杈瑰崠姘存灉鐨勭櫧鏃忛樋濠嗙瑧瀹圭伩鐑傗€︹€?, images:"https://picsum.photos/seed/dali-sunset/800/600", location:"浜戝崡澶х悊", scenicId:9, scenicName:"澶х悊娲辨捣", likes:278, views:6500, status:1, createTime:"2024-05-10" },
  { id:8, userId:3, username:"鑳屽寘瀹㈠皬鏉?, avatar:"", title:"绔欏湪鍏甸┈淇戝墠锛屾垜娌夐粯浜?, content:"璧拌繘涓€鍙峰潙鐨勯偅涓€鍒伙紝涓ゅ崈骞村墠鐨勫啗闃熷氨鍦ㄧ溂鍓嶅垪闃点€傛瘡涓€涓櫠淇戠殑闈㈠閮戒笉鍚岋紝浠夸經闅忔椂浼氬姩璧锋潵銆傜Е甯濆浗鐨勫己鐩涗笌閲庡績鍑濆浐鍦ㄨ繖鐗囬粍鍦熶箣涓€︹€?, images:"https://picsum.photos/seed/xian-warriors/800/600", location:"闄曡タ瑗垮畨", scenicId:10, scenicName:"鍏甸┈淇?, likes:198, views:4800, status:1, createTime:"2024-05-05" },
  { id:9, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"甯冭揪鎷夊锛岀澶╁爞鏈€杩戠殑瀹", content:"涓€姝ヤ竴姝ョ埇涓婂竷杈炬媺瀹殑鍙伴樁锛屾捣鎷?650绫崇殑绌烘皵鏈変簺绋€钖勶紝浣嗙溂鍓嶇殑绾㈢櫧瀹璁╁績璺冲姞閫熴€傞叆娌圭伅鍦ㄦ鍫傚唴鎽囨洺锛岃缁忓０鍥炶崱鍦ㄨ€宠竟鈥︹€?, images:"https://picsum.photos/seed/lhasa-potala/800/600", location:"瑗胯棌鎷夎惃", scenicId:11, scenicName:"甯冭揪鎷夊", likes:456, views:12000, status:1, createTime:"2024-06-01" },
  { id:10, userId:3, username:"鑳屽寘瀹㈠皬鏉?, avatar:"", title:"鍛间鸡璐濆皵锛岄鍚硅崏浣庤鐗涚緤", content:"绔欏湪鑽夊師涓ぎ锛?60搴﹀叏鏄豢鑹层€傞獞椹湪鑽夊師涓婂椹扮殑鎰熻澶嚜鐢变簡锛佹櫄涓婁綇钂欏彜鍖咃紝鍠濋┈濂堕厭锛岀湅婊″ぉ绻佹槦锛屽煄甯傞噷鐨勭儲鎭煎叏閮界儫娑堜簯鏁ｂ€︹€?, images:"https://picsum.photos/seed/grassland-horses/800/600", location:"鍐呰挋鍙ゅ懠浼﹁礉灏?, scenicId:12, scenicName:"鍛间鸡璐濆皵鑽夊師", likes:234, views:5800, status:1, createTime:"2024-07-15" },
  { id:11, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"鎴愰兘锛屼竴搴ф潵浜嗗氨涓嶆兂璧扮殑鍩庡競", content:"鍦ㄦ垚閮藉緟浜嗗洓澶╋紝姣忓ぉ閮芥槸鍚冨悆鍚冿紒鐏攨銆佷覆涓层€佹媴鎷呴潰銆侀緳鎶勬墜鈥︹€﹁繕鏈夊ぇ鐔婄尗鍩哄湴閲岄偅浜涘渾婊氭粴鐨勯粦鐧藉洟瀛愶紝绠€鐩磋悓缈讳簡锛?, images:"https://picsum.photos/seed/chengdu-street/800/600", location:"鍥涘窛鎴愰兘", scenicId:18, scenicName:"鎴愰兘澶х唺鐚熀鍦?, likes:389, views:8900, status:1, createTime:"2024-06-20" },
  { id:12, userId:3, username:"鑳屽寘瀹㈠皬鏉?, avatar:"", title:"绋诲煄浜氫竵锛岃摑鑹叉槦鐞冩渶鍚庣殑鍑€鍦?, content:"浠庢礇缁掔墰鍦哄緬姝ュ埌鐗涘ザ娴凤紝姣忎竴姝ラ兘鍦ㄥ枠锛屼絾姣忎竴姝ラ兘鍊煎緱銆傚綋鐗涘ザ娴峰嚭鐜板湪鐪煎墠鐨勯偅涓€鍒伙紝閭ｇ绾噣鐨勮摑鑹茶浜烘兂鍝€傚ぇ鑷劧鐪熺殑澶濂囦簡鈥︹€?, images:"https://picsum.photos/seed/yading-lake/800/600", location:"鍥涘窛绋诲煄", scenicId:13, scenicName:"绋诲煄浜氫竵", likes:567, views:14500, status:1, createTime:"2024-08-10" },
  { id:13, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"榧撴氮灞匡紝涓€搴т細鍞辨瓕鐨勫皬宀?, content:"鍦ㄩ紦娴笨鐨勫皬宸烽噷杩疯矾鏄欢骞哥鐨勪簨銆傛瘡杞閮藉彲鑳介亣鍒颁竴鏍嬬櫨骞磋€佸埆澧咃紝姣忎釜绐楀彛閮藉彲鑳介鍑洪挗鐞村０銆傝繖閲屾病鏈夎溅锛屽彧鏈夋捣椋庡拰闊充箰鈥︹€?, images:"https://picsum.photos/seed/gulangyu-piano/800/600", location:"绂忓缓鍘﹂棬", scenicId:16, scenicName:"榧撴氮灞?, likes:312, views:7200, status:1, createTime:"2024-07-22" },
  { id:14, userId:3, username:"鑳屽寘瀹㈠皬鏉?, avatar:"", title:"鏁︾厡锛屽ぇ婕犳繁澶勭殑鍗冨勾鍥炵湼", content:"绔欏湪鑾珮绐熶節灞傛ゼ鍓嶏紝寰堥毦鎯宠薄涓€鍗冨骞村墠鐨勪汉浠槸濡備綍鍦ㄨ繖鐗囨矙婕犱腑寮€鍑垮嚭濡傛绮剧編鐨勭煶绐熴€傚鐢讳笂鐨勯澶╄。琚傞椋橈紝鍗冨勾鐨勬椂鍏変豢浣涘嚌鍥衡€︹€?, images:"https://picsum.photos/seed/dunhuang-desert/800/600", location:"鐢樿們鏁︾厡", scenicId:14, scenicName:"鏁︾厡鑾珮绐?, likes:289, views:6700, status:1, createTime:"2024-09-05" },
  { id:15, userId:2, username:"鏃呰鑰呭皬鐜?, avatar:"", title:"鍗庡北澶滅埇锛屼话鏈涙槦绌虹瓑鏃ュ嚭", content:"鏅氫笂涔濈偣鍑哄彂锛岀埇浜嗘暣鏁村叓涓皬鏃讹紒鍗冨昂骞㈤偅娈靛嚑涔庢槸鍨傜洿鐨勶紝鍙兘鎶撶潃閾侀摼寰€涓婃尓銆備絾鍑屾櫒浜旂偣绔欏湪涓滃嘲鐪嬪埌鏃ュ嚭鐨勯偅涓€鍒伙紝鎵€鏈夌柌鎯兘娑堝け浜嗏€︹€?, images:"https://picsum.photos/seed/huashan-night/800/600", location:"闄曡タ鍗庡北", scenicId:20, scenicName:"鍗庡北", likes:478, views:11200, status:1, createTime:"2024-08-28" },
];
let nextTravelogueId = 16;

// Orders
const orders = [
  { id:1, userId:2, username:"鏃呰鑰呭皬鐜?, scenicId:1, scenicName:"寮犲鐣?, adultTickets:2, childTickets:1, totalPrice:570, phone:"13800138000", status:"paid", createTime:"2024-06-10 14:30:00" },
  { id:2, userId:3, username:"鑳屽寘瀹㈠皬鏉?, scenicId:3, scenicName:"鏁呭", adultTickets:1, childTickets:0, totalPrice:60, phone:"13900139000", status:"paid", createTime:"2024-06-12 09:15:00" },
  { id:3, userId:2, username:"鏃呰鑰呭皬鐜?, scenicId:2, scenicName:"涔濆娌?, adultTickets:3, childTickets:1, totalPrice:675, phone:"13800138000", status:"completed", createTime:"2024-06-15 10:00:00" },
  { id:4, userId:2, username:"鏃呰鑰呭皬鐜?, scenicId:7, scenicName:"榛勫北", adultTickets:2, childTickets:0, totalPrice:380, phone:"13800138000", status:"pending", createTime:"2024-06-18 16:20:00" },
  { id:5, userId:3, username:"鑳屽寘瀹㈠皬鏉?, scenicId:10, scenicName:"鍏甸┈淇?, adultTickets:2, childTickets:1, totalPrice:300, phone:"13900139000", status:"paid", createTime:"2024-06-19 11:45:00" },
  { id:6, userId:2, username:"鏃呰鑰呭皬鐜?, scenicId:5, scenicName:"婕撴睙", adultTickets:2, childTickets:0, totalPrice:430, phone:"13800138000", status:"paid", createTime:"2024-06-19 15:30:00" },
  { id:7, userId:3, username:"鑳屽寘瀹㈠皬鏉?, scenicId:18, scenicName:"鎴愰兘澶х唺鐚熀鍦?, adultTickets:2, childTickets:2, totalPrice:232, phone:"13900139000", status:"completed", createTime:"2024-06-20 08:00:00" },
];
let nextOrderId = 10;

// Food seed orders
const foodOrders = [
  { id:8, userId:2, username:'鏃呰鑰呭皬鐜?, type:'food', foodId:1, foodName:'鍦熷涓変笅閿?, coverImage:'https://picsum.photos/seed/hotpot-xiang-cuisine/800/600', location:'寮犲鐣屽競鍖?, quantity:2, totalPrice:136, phone:'13800138000', scenicName:'寮犲鐣?, scenicId:1, status:'completed', createTime:'2024-06-15 12:00:00' },
  { id:9, userId:2, username:'鏃呰鑰呭皬鐜?, type:'food', foodId:4, foodName:'妗傛灄绫崇矇', coverImage:'https://picsum.photos/seed/rice-noodles/800/600', location:'妗傛灄甯傚尯', quantity:3, totalPrice:45, phone:'13800138000', scenicName:'婕撴睙', scenicId:5, status:'pending', createTime:'2024-06-20 09:00:00' },
];
orders.push(...foodOrders);

// Food
const foods = [
  { id:1, name:"鍦熷涓変笅閿?, description:"寮犲鐣屾渶鍏蜂唬琛ㄦ€х殑鍦版柟缇庨锛屽皢鑵婅倝銆佽眴鑵愩€佺尓鑲氱瓑椋熸潗鏀惧叆閿呬腑鍚岀叜锛屾堡椴滃懗缇庯紝楹昏荆閫備腑銆?, coverImage:"https://picsum.photos/seed/hotpot-xiang-cuisine/800/600", location:"寮犲鐣屽競鍖?, avgPrice:68, tags:"婀樿彍,鐗硅壊鑿?杈ｅ懗", scenicName:"寮犲鐣?, scenicId:1, province:"婀栧崡", city:"寮犲鐣? },
  { id:2, name:"鍖椾含鐑ら腑", description:"浜獕涓栫晫鐨勪腑鍗庣編椋燂紝閫夌敤浼樿川鍖椾含濉腑锛屾灉鏈ㄧ偔鐏儰鍒讹紝鑹叉辰绾㈡鼎锛岃倝璐ㄨ偉鑰屼笉鑵伙紝澶栬剢閲屽銆?, coverImage:"https://picsum.photos/seed/peking-duck/800/600", location:"鍖椾含鍏ㄨ仛寰?, avgPrice:198, tags:"浜彍,鐑ら腑,瀹磋", scenicName:"鏁呭", scenicId:3, province:"鍖椾含", city:"鍖椾含" },
  { id:3, name:"瑗挎箹閱嬮奔", description:"鏉窞浼犵粺鍚嶈彍锛岄€夌敤椴滄椿鑽夐奔锛屼互閱嬪拰绯栦负涓昏璋冩枡锛岄奔鑲夐矞瀚╋紝閰哥敎鍙彛锛屾槸鏉府鑿滅殑浠ｈ〃銆?, coverImage:"https://picsum.photos/seed/west-lake-fish/800/600", location:"鏉窞妤煎妤?, avgPrice:88, tags:"鏉府鑿?婀栭矞,娓呮贰", scenicName:"瑗挎箹", scenicId:4, province:"娴欐睙", city:"鏉窞" },
  { id:4, name:"妗傛灄绫崇矇", description:"妗傛灄鏈€鎺ュ湴姘旂殑琛楀ご缇庨銆傛磥鐧界粏瀚╃殑绫崇矇閰嶄笂鍗ゆ按銆侀攨鐑с€佽姳鐢熴€侀吀璞嗚锛屼竴纰椾笅鍘绘弧鍙ｇ暀棣欍€?, coverImage:"https://picsum.photos/seed/rice-noodles/800/600", location:"妗傛灄甯傚尯", avgPrice:15, tags:"灏忓悆,绫崇嚎,琛楀ご缇庨", scenicName:"婕撴睙", scenicId:5, province:"骞胯タ", city:"妗傛灄" },
  { id:5, name:"寰藉窞姣涜眴鑵?, description:"榛勫北鍦板尯浼犵粺鍚嶈彍锛岃眴鑵愮粡杩囧彂閰靛悗琛ㄩ潰闀挎弧鐧借壊鑿屼笣锛岀厧鑷抽噾榛勶紝澶栭叆鍐呭锛岄鍛崇嫭鐗广€?, coverImage:"https://picsum.photos/seed/tofu-dish/800/600", location:"榛勫北灞邯鑰佽", avgPrice:35, tags:"寰借彍,璞嗚厫,鐗硅壊灏忓悆", scenicName:"榛勫北", scenicId:7, province:"瀹夊窘", city:"榛勫北" },
  { id:6, name:"娴峰崡鏂囨槍楦?, description:"娴峰崡鍥涘ぇ鍚嶈彍涔嬮锛岄€夌敤鏂囨槍鏈湴鍦熼浮锛岀毊钖勯閰ワ紝鑲夎川婊戝锛岃樃涓婄壒鍒堕叡鏂欙紝椴滅編鏃犳瘮銆?, coverImage:"https://picsum.photos/seed/hainanese-chicken/800/600", location:"涓変簹甯傚尯", avgPrice:98, tags:"娴峰崡鑿?鐧藉垏,娓呮贰", scenicName:"铚堟敮娲插矝", scenicId:8, province:"娴峰崡", city:"涓変簹" },
  { id:7, name:"鍥涘窛鐏攨", description:"涔濆娌熸父鐜╁悗蹇呭皾鐨勭編椋熴€傜孩娌圭炕婊氱殑閿呭簳閰嶄笂姣涜倸銆侀粍鍠夈€侀腑鑲狅紝楹昏荆椴滈锛屾俯鏆栬韩蹇冦€?, coverImage:"https://picsum.photos/seed/sichuan-hotpot/800/600", location:"闃垮潩宸炰節瀵ㄦ矡鍘?, avgPrice:120, tags:"宸濊彍,鐏攨,楹昏荆", scenicName:"涔濆娌?, scenicId:2, province:"鍥涘窛", city:"闃垮潩" },
  { id:8, name:"鐐搁叡闈?, description:"鑰佸寳浜渶鍏蜂唬琛ㄦ€х殑闈㈤銆傜瓔閬撶殑闈㈡潯閰嶄笂娴撻儊閰遍鐨勮倝涓佺偢閰憋紝澶栧姞榛勭摐涓濄€佽眴鑺界瓑鏃朵护鑿滅爜銆?, coverImage:"https://picsum.photos/seed/noodles-beijing/800/600", location:"鍖椾含甯傚尯", avgPrice:25, tags:"浜彍,闈㈤,灏忓悆", scenicName:"闀垮煄", scenicId:6, province:"鍖椾含", city:"鍖椾含" },
  { id:9, name:"浜戝崡杩囨ˉ绫崇嚎", description:"浜戝崡鏈€鍏蜂紶濂囪壊褰╃殑缇庨銆傛粴鐑殑楦℃堡閰嶄笂钖勫铦夌考鐨勮倝鐗囥€侀箤楣戣泲銆佽敩鑿滃拰绫崇嚎锛岄矞棣欐祿閮侊紝浠紡鎰熸弧婊°€?, coverImage:"https://picsum.photos/seed/yunnan-noodles/800/600", location:"澶х悊鍙ゅ煄", avgPrice:38, tags:"浜戝崡鑿?绫崇嚎,姹ょ竟", scenicName:"澶х悊娲辨捣", scenicId:9, province:"浜戝崡", city:"澶х悊" },
  { id:10, name:"瑗垮畨鑲夊す棣?, description:"鑵婃眮鑲夌櫧鍚夐锛岃タ瀹変汉鐨勬棩甯哥伒榄傘€傚鐨叆鑴嗙殑棣嶅す鐫€鐐栧緱杞儌鍏ュ懗鐨勮厞姹佽倝锛屼竴鍙ｄ笅鍘绘弧鍢磋倝棣欍€?, coverImage:"https://picsum.photos/seed/chinese-burger/800/600", location:"瑗垮畨鍥炴皯琛?, avgPrice:15, tags:"闄曡タ灏忓悆,棣?琛楀ご缇庨", scenicName:"鍏甸┈淇?, scenicId:10, province:"闄曡タ", city:"瑗垮畨" },
  { id:11, name:"钘忓紡閰ユ补鑼?, description:"钘忔棌浜烘瘡澶╁繀鍠濈殑楗搧锛岀敤鐮栬尪銆侀叆娌瑰拰鐩愬反鎼呮媽鑰屾垚銆傞珮鍘熷瘨鍐凤紝涓€纰楃儹鑵捐吘鐨勯叆娌硅尪鑳借繀閫熻ˉ鍏呰兘閲忋€佹姷寰′弗瀵掋€?, coverImage:"https://picsum.photos/seed/butter-tea/800/600", location:"鎷夎惃甯傚尯", avgPrice:20, tags:"钘忛,鑼堕ギ,鏆栬韩", scenicName:"甯冭揪鎷夊", scenicId:11, province:"瑗胯棌", city:"鎷夎惃" },
  { id:12, name:"鍐呰挋鍙ょ儰鍏ㄧ緤", description:"钂欏彜鏃忔渶闅嗛噸鐨勫緟瀹㈢編椋熴€傞€夌敤鑽夊師鏁ｅ吇缁电緤锛屾暣鍙灦鍦ㄧ偔鐏笂鎱㈢儰锛屽鐨噾榛勯叆鑴嗭紝鑲夎川椴滃澶氭眮锛岄姘斿洓婧€?, coverImage:"https://picsum.photos/seed/roast-lamb/800/600", location:"鍛间鸡璐濆皵鑽夊師钂欏彜鍖?, avgPrice:888, tags:"钂欏彜鑿?鐑よ倝,瀹磋澶ц彍", scenicName:"鍛间鸡璐濆皵鑽夊師", scenicId:12, province:"鍐呰挋鍙?, city:"鍛间鸡璐濆皵" },
  { id:13, name:"鍘﹂棬娌欒尪闈?, description:"鍘﹂棬鏈€鎺ュ湴姘旂殑鏃╅锛屾祿閮佺殑娌欒尪閰遍厤涓奞寮圭殑纰遍潰锛屽姞涓婇笨楸笺€佺尓鑲濄€佽眴鑵愮瓑鍚勭閰嶆枡锛屼竴纰椾笅鍘绘殩蹇冩殩鑳冦€?, coverImage:"https://picsum.photos/seed/satay-noodles/800/600", location:"鍘﹂棬鎬濇槑鍖?, avgPrice:20, tags:"闂藉崡灏忓悆,闈㈤,娴烽矞", scenicName:"榧撴氮灞?, scenicId:16, province:"绂忓缓", city:"鍘﹂棬" },
  { id:14, name:"鏉鹃紶妗傞奔", description:"鑻忓窞鏉鹃工妤肩殑鎷涚墝鍚嶈彍銆傚湪妗傞奔韬笂鍓炲嚭鑿卞舰鑺辩汗锛屾补鐐稿悗褰技鏉鹃紶锛屾祰涓婇吀鐢滅暘鑼勯叡姹侊紝澶栭叆閲屽锛屾槸鑻忓府鑿滅殑缁忓吀銆?, coverImage:"https://picsum.photos/seed/squirrel-fish/800/600", location:"鑻忓窞瑙傚墠琛?, avgPrice:168, tags:"鑻忓府鑿?娌抽矞,鍔熷か鑿?, scenicName:"鑻忓窞鍥灄", scenicId:17, province:"姹熻嫃", city:"鑻忓窞" },
  { id:15, name:"鎴愰兘鎷呮媴闈?, description:"鍥涘窛闈㈤涓殑缈樻銆傜粏婊戠殑闈㈡潯閰嶄笂鐢辫姖楹婚叡銆佽姳妞掋€佽荆妞掓补銆佽倝鏈粍鎴愮殑閰辨枡锛岄夯杈ｉ矞棣欙紝涓€纰椾笉杩囩樉銆?, coverImage:"https://picsum.photos/seed/dandan-noodles/800/600", location:"鎴愰兘甯傚尯", avgPrice:12, tags:"宸濊彍,闈㈤,楹昏荆", scenicName:"鎴愰兘澶х唺鐚熀鍦?, scenicId:18, province:"鍥涘窛", city:"鎴愰兘" },
  { id:16, name:"闈掑矝鍟ら厭+杈ｇ倰铔よ湂", description:"闈掑矝浜虹殑澶忓ぉ鏍囬厤銆傛柊椴滅殑铔よ湂鐢ㄨ荆妞掑拰钂滆搲鐖嗙倰锛岄厤涓婁竴鏉垰浠庣敓浜х嚎涓嬫潵鐨勫師娴嗛潚宀涘暏閰掞紝鏄捣杈瑰煄甯傛渶鎯剰鐨勪韩鍙椼€?, coverImage:"https://picsum.photos/seed/seafood-clams/800/600", location:"闈掑矝鍙颁笢姝ヨ琛?, avgPrice:45, tags:"椴佽彍,娴烽矞,鍟ら厭鎼。", scenicName:"宕傚北", scenicId:15, province:"灞变笢", city:"闈掑矝" },
  { id:17, name:"鍏板窞鐗涜倝闈?, description:"涓€娓呬簩鐧戒笁绾㈠洓缁夸簲榛勨€斺€旀竻婢堢殑鐗涜倝姹ゃ€佺櫧钀濆崪銆佺孩杈ｆ娌广€佺豢钂滆嫍棣欒彍銆侀粍浜殑闈㈡潯锛岃壊棣欏懗淇卞叏銆?, coverImage:"https://picsum.photos/seed/beef-noodles/800/600", location:"鏁︾厡甯傚尯", avgPrice:18, tags:"瑗垮寳闈㈤,鐗涜倝,娓呮堡", scenicName:"鏁︾厡鑾珮绐?, scenicId:14, province:"鐢樿們", city:"鏁︾厡" },
  { id:18, name:"涓芥睙鑵婃帓楠ㄧ伀閿?, description:"绾宠タ鏃忕殑浼犵粺缇庨锛岀敤椋庡共鐨勮厞鎺掗鐔埗姹ゅ簳锛屽姞鍏ュ綋鍦扮壒浜х殑鑿岃弴鍜岃敩鑿溿€傛堡鐧藉懗娴擄紝椹卞瘨鏆栬韩锛屾槸涓芥睙澶滄櫄鐨勬渶浣抽€夋嫨銆?, coverImage:"https://picsum.photos/seed/cured-meat-hotpot/800/600", location:"涓芥睙鍙ゅ煄", avgPrice:98, tags:"绾宠タ鑿?鐏攨,鑵婂懗", scenicName:"涓芥睙鍙ゅ煄", scenicId:19, province:"浜戝崡", city:"涓芥睙" },
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


function nowLocal() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function paginate(list, pageNum, pageSize) {
  const pn = parseInt(pageNum) || 1, ps = parseInt(pageSize) || 10;
  const start = (pn - 1) * ps;
  return { records: list.slice(start, start + ps), total: list.length, size: ps, current: pn, pages: Math.ceil(list.length / ps) };
}

async function handleRequest(req, res) {
  if (req.method === "OPTIONS") return json(res, {});

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const sp = url.searchParams;

  // ---- Auth ----
  if (path === "/api/auth/login" && req.method === "POST") {
    const { username, password } = await readBody(req);
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return json(res, { code: 401, message: "鐢ㄦ埛鍚嶆垨瀵嗙爜閿欒", data: null });
    if (user.status !== 1) return json(res, { code: 401, message: "璐﹀彿宸茶绂佺敤", data: null });
    const token = signToken({ userId: user.id, username: user.username, role: user.role });
    return json(res, { code: 200, message: "鐧诲綍鎴愬姛", data: { token, role: user.role, nickname: user.nickname, userId: user.id, phone: user.phone } });
  }

  if (path === "/api/auth/register" && req.method === "POST") {
    const { username, password, nickname, phone } = await readBody(req);
    if (users.find((u) => u.username === username)) return json(res, { code: 400, message: "鐢ㄦ埛鍚嶅凡瀛樺湪", data: null });
    users.push({ id: nextUserId++, username, password, nickname: nickname || username, role: "user", phone: phone || "", status: 1, createTime: nowLocal() });
    saveData();
    return json(res, { code: 200, message: "娉ㄥ唽鎴愬姛", data: null });
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
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 8) });
  }

  if (path === "/api/scenic/list") return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: scenics });
  if (path === "/api/scenic/recommend") {
    const limit = parseInt(sp.get("limit")) || 6;
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: [...scenics].sort((a, b) => b.rating - a.rating).slice(0, limit) });
  }

  const scenicMatch = path.match(/^\/api\/scenic\/(\d+)$/);
  if (scenicMatch) {
    const s = scenics.find((x) => x.id === parseInt(scenicMatch[1]));
    return s ? json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: s }) : json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Content: Guides ----
  if (path === "/api/content/guides" && req.method === "POST") {
    const body = await readBody(req);
    const maxId = guides.reduce((m, g) => Math.max(m, g.id), 0);
    const g = { id: maxId + 1, likes: 0, favorites: 0, views: 0, status: 1, ...body, createTime: nowLocal() };
    guides.push(g);
    saveData();
    return json(res, { code: 200, message: "鍙戝竷鎴愬姛", data: g });
  }
  if (path === "/api/content/guides" && req.method === "GET") {
    let list = [...guides];
    const kw = sp.get("keyword"), tag = sp.get("tag");
    if (kw) list = list.filter((g) => g.title.includes(kw));
    if (tag) list = list.filter((g) => g.tags.includes(tag));
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 10) });
  }

  const guideMatch = path.match(/^\/api\/content\/guides\/(\d+)$/);
  if (guideMatch) {
    const g = guides.find((x) => x.id === parseInt(guideMatch[1]));
    if (g) { g.views++; return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: g }); }
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  const guideLikeMatch = path.match(/^\/api\/content\/guides\/(\d+)\/like$/);
  if (guideLikeMatch && req.method === "POST") {
    const g = guides.find((x) => x.id === parseInt(guideLikeMatch[1]));
    if (g) { g.likes++; return json(res, { code: 200, message: "鐐硅禐鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  const guideFavMatch = path.match(/^\/api\/content\/guides\/(\d+)\/fav$/);
  if (guideFavMatch && req.method === "POST") {
    const g = guides.find((x) => x.id === parseInt(guideFavMatch[1]));
    if (g) { g.favorites++; return json(res, { code: 200, message: "鏀惰棌鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Content: Travelogues ----
  if (path === "/api/content/travelogues" && req.method === "GET") {
    let list = [...travelogues];
    const kw = sp.get("keyword");
    if (kw) list = list.filter((t) => t.title.includes(kw) || t.content.includes(kw));
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 12) });
  }

  if (path === "/api/content/travelogues" && req.method === "POST") {
    const body = await readBody(req);
    const t = { id: nextTravelogueId++, ...body, likes: 0, views: 0, status: 1, createTime: nowLocal() };
    travelogues.unshift(t);
    saveData();
    return json(res, { code: 200, message: "鍙戝竷鎴愬姛", data: t });
  }

  const trogueMatch = path.match(/^\/api\/content\/travelogues\/(\d+)$/);
  if (trogueMatch) {
    const t = travelogues.find((x) => x.id === parseInt(trogueMatch[1]));
    if (t) { t.views++; return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: t }); }
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Content: Food ----
  if (path === "/api/content/food" && req.method === "GET") {
    let list = [...foods];
    const kw = sp.get("keyword"), prov = sp.get("province");
    if (kw) list = list.filter((f) => f.name.includes(kw) || f.tags.includes(kw));
    if (prov) list = list.filter((f) => f.province === prov);
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 12) });
  }

  const foodMatch = path.match(/^\/api\/content\/food\/(\d+)$/);
  if (foodMatch) {
    const f = foods.find((x) => x.id === parseInt(foodMatch[1]));
    return f ? json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: f }) : json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Admin ----
  if (path === "/api/admin/users" && req.method === "GET") {
    const kw = sp.get("keyword");
    let list = users.map(({ password, ...u }) => u);
    if (kw) list = list.filter((u) => u.username.includes(kw) || u.nickname.includes(kw) || (u.phone && u.phone.includes(kw)));
    list.sort((a, b) => b.id - a.id);
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 10) });
  }

  const toggleMatch = path.match(/^\/api\/admin\/users\/(\d+)\/toggle-status$/);
  if (toggleMatch && req.method === "PUT") {
    const user = users.find((u) => u.id === parseInt(toggleMatch[1]));
    if (user) { user.status = user.status === 1 ? 0 : 1; return json(res, { code: 200, message: "鐘舵€佹洿鏂版垚鍔?, data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  const delMatch = path.match(/^\/api\/admin\/users\/(\d+)$/);
  if (delMatch && req.method === "DELETE") {
    const idx = users.findIndex((u) => u.id === parseInt(delMatch[1]));
    if (idx >= 0) { users.splice(idx, 1); return json(res, { code: 200, message: "鍒犻櫎鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }


  // ---- Admin: Scenic CRUD ----
  const adminScenicMatch = path.match(/^\/api\/admin\/scenics\/(\d+)$/);
  if (adminScenicMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = scenics.findIndex((s) => s.id === parseInt(adminScenicMatch[1]));
    if (idx >= 0) { scenics[idx] = { ...scenics[idx], ...body }; return json(res, { code: 200, message: "鏇存柊鎴愬姛", data: scenics[idx] }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }
  if (path === "/api/admin/scenics" && req.method === "POST") {
    const body = await readBody(req);
    const maxId = scenics.reduce((m, s) => Math.max(m, s.id), 0);
    const s = { id: maxId + 1, rating: 4.0, ...body, createTime: nowLocal() };
    scenics.push(s);
    saveData();
    return json(res, { code: 200, message: "娣诲姞鎴愬姛", data: s });
  }
  const adminScenicDelMatch = path.match(/^\/api\/admin\/scenics\/(\d+)$/);
  if (adminScenicDelMatch && req.method === "DELETE") {
    const idx = scenics.findIndex((s) => s.id === parseInt(adminScenicDelMatch[1]));
    if (idx >= 0) { scenics.splice(idx, 1); return json(res, { code: 200, message: "鍒犻櫎鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Admin: Food CRUD ----
  const adminFoodMatch = path.match(/^\/api\/admin\/food\/(\d+)$/);
  if (adminFoodMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = foods.findIndex((f) => f.id === parseInt(adminFoodMatch[1]));
    if (idx >= 0) { foods[idx] = { ...foods[idx], ...body }; return json(res, { code: 200, message: "鏇存柊鎴愬姛", data: foods[idx] }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }
  if (path === "/api/admin/food" && req.method === "POST") {
    const body = await readBody(req);
    const maxId = foods.reduce((m, f) => Math.max(m, f.id), 0);
    const f = { id: maxId + 1, ...body, createTime: nowLocal() };
    foods.push(f);
    saveData();
    return json(res, { code: 200, message: "娣诲姞鎴愬姛", data: f });
  }
  const adminFoodDelMatch = path.match(/^\/api\/admin\/food\/(\d+)$/);
  if (adminFoodDelMatch && req.method === "DELETE") {
    const idx = foods.findIndex((f) => f.id === parseInt(adminFoodDelMatch[1]));
    if (idx >= 0) { foods.splice(idx, 1); return json(res, { code: 200, message: "鍒犻櫎鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Admin: Guide CRUD ----
  const adminGuideMatch = path.match(/^\/api\/admin\/guides\/(\d+)$/);
  if (adminGuideMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = guides.findIndex((g) => g.id === parseInt(adminGuideMatch[1]));
    if (idx >= 0) { guides[idx] = { ...guides[idx], ...body }; return json(res, { code: 200, message: "鏇存柊鎴愬姛", data: guides[idx] }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }
  if (path === "/api/admin/guides" && req.method === "POST") {
    const body = await readBody(req);
    const maxId = guides.reduce((m, g) => Math.max(m, g.id), 0);
    const g = { id: maxId + 1, likes: 0, favorites: 0, views: 0, status: 1, ...body, createTime: nowLocal() };
    guides.push(g);
    saveData();
    return json(res, { code: 200, message: "娣诲姞鎴愬姛", data: g });
  }
  const adminGuideDelMatch = path.match(/^\/api\/admin\/guides\/(\d+)$/);
  if (adminGuideDelMatch && req.method === "DELETE") {
    const idx = guides.findIndex((g) => g.id === parseInt(adminGuideDelMatch[1]));
    if (idx >= 0) { guides.splice(idx, 1); return json(res, { code: 200, message: "鍒犻櫎鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Admin: Travelogue CRUD ----
  const adminTrogueMatch = path.match(/^\/api\/admin\/travelogues\/(\d+)$/);
  if (adminTrogueMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = travelogues.findIndex((t) => t.id === parseInt(adminTrogueMatch[1]));
    if (idx >= 0) { travelogues[idx] = { ...travelogues[idx], ...body }; return json(res, { code: 200, message: "鏇存柊鎴愬姛", data: travelogues[idx] }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }
  const adminTrogueDelMatch = path.match(/^\/api\/admin\/travelogues\/(\d+)$/);
  if (adminTrogueDelMatch && req.method === "DELETE") {
    const idx = travelogues.findIndex((t) => t.id === parseInt(adminTrogueDelMatch[1]));
    if (idx >= 0) { travelogues.splice(idx, 1); return json(res, { code: 200, message: "鍒犻櫎鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }


  if (path === "/api/user/orders" && req.method === "GET") {
    let list = [...orders];
    let uid = sp.get("userId");
    if (!uid) {
      const authHeader = req.headers["authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const tokenData = parseToken(authHeader.substring(7));
        if (tokenData && tokenData.userId) uid = String(tokenData.userId);
      }
    }
    const status = sp.get("status");
    if (uid) { list = list.filter((o) => String(o.userId) === uid); } else { list = []; }
    if (status) list = list.filter((o) => o.status === status);
    list.sort((a, b) => b.id - a.id);
    return json(res, { code: 200, message: "操作成功", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 20) });
  }
  }

  if (path === "/api/user/orders" && req.method === "POST") {
    const body = await readBody(req);
    const o = { id: nextOrderId++, status: "pending", ...body, createTime: nowLocal() };
    orders.unshift(o);
    saveData();
    return json(res, { code: 200, message: "涓嬪崟鎴愬姛", data: o });
  }

  const userOrderMatch = path.match(/^\/api\/user\/orders\/(\d+)$/);
  if (userOrderMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = orders.findIndex((o) => o.id === parseInt(userOrderMatch[1]));
    if (idx >= 0) { orders[idx] = { ...orders[idx], ...body }; return json(res, { code: 200, message: "鏇存柊鎴愬姛", data: orders[idx] }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Admin: Orders ----
  if (path === "/api/admin/orders" && req.method === "GET") {
    let list = [...orders];
    const status = sp.get("status"), type = sp.get("type"), kw = sp.get("keyword");
    if (status) list = list.filter((o) => o.status === status);
    if (type) list = list.filter((o) => (type === "food" ? o.type === "food" : o.type !== "food"));
    if (kw) list = list.filter((o) => o.scenicName.includes(kw) || (o.foodName && o.foodName.includes(kw)) || o.username.includes(kw));
    list.sort((a, b) => b.id - a.id);
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: paginate(list, sp.get("pageNum"), sp.get("pageSize") || 10) });
  }
  const orderMatch = path.match(/^\/api\/admin\/orders\/(\d+)$/);
  if (orderMatch && req.method === "GET") {
    const o = orders.find((x) => x.id === parseInt(orderMatch[1]));
    return o ? json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: o }) : json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }
  if (orderMatch && req.method === "PUT") {
    const body = await readBody(req);
    const idx = orders.findIndex((o) => o.id === parseInt(orderMatch[1]));
    if (idx >= 0) { orders[idx] = { ...orders[idx], ...body }; return json(res, { code: 200, message: "鏇存柊鎴愬姛", data: orders[idx] }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }
  if (path === "/api/admin/orders" && req.method === "POST") {
    const body = await readBody(req);
    const o = { id: nextOrderId++, status: "pending", ...body, createTime: nowLocal() };
    orders.unshift(o);
    return json(res, { code: 200, message: "涓嬪崟鎴愬姛", data: o });
  }
  if (orderMatch && req.method === "DELETE") {
    const idx = orders.findIndex((o) => o.id === parseInt(orderMatch[1]));
    if (idx >= 0) { orders.splice(idx, 1); return json(res, { code: 200, message: "鍒犻櫎鎴愬姛", data: null }); } saveData();
    return json(res, { code: 404, message: "鏈壘鍒?, data: null });
  }

  // ---- Admin: Dashboard Stats ----
  if (path === "/api/admin/stats" && req.method === "GET") {
    const today = nowLocal().slice(0, 10);
    const todayOrders = orders.filter((o) => o.createTime && o.createTime.startsWith(today));
    return json(res, { code: 200, message: "鎿嶄綔鎴愬姛", data: {
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
}

// ============ VITE PLUGIN ============
export default function mockApiPlugin() {
  return {
    name: "mock-api",
    configureServer(server) { loadData();
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api")) return next();
        if (req.method === "OPTIONS") { res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "*" }); res.end(); return; }
        try {
          const parsedUrl = new URL(req.url, "http://localhost");
          req.url = parsedUrl.pathname + parsedUrl.search;
          await handleRequest(req, res);
        } catch (e) {
          console.error("[Mock] handleRequest crashed:", e.message || e);
          if (!res.headersSent) {
            try { res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" }); res.end(JSON.stringify({ code: 500, message: "Server error", data: null })); } catch {}
          }
        } finally {
          if (["POST","PUT","DELETE"].includes(req.method)) saveData();
        }
      });
      console.log("  [Mock API] Embedded in Vite");
    },
  };
}
