-- ==========================================
-- Smart Travel Portal - H2 Database Schema
-- 用户数据由 DataInitializer.java 在应用启动时创建（密码已加密）
-- ==========================================

CREATE TABLE IF NOT EXISTS "user" (
    "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
    "username" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(50),
    "phone" VARCHAR(20),
    "email" VARCHAR(100),
    "avatar" VARCHAR(255),
    "role" VARCHAR(20) NOT NULL DEFAULT 'user',
    "status" TINYINT NOT NULL DEFAULT 1,
    "deleted" TINYINT NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "scenic" (
    "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "cover_image" VARCHAR(255),
    "images" TEXT,
    "location" VARCHAR(200),
    "province" VARCHAR(50),
    "city" VARCHAR(50),
    "longitude" DOUBLE,
    "latitude" DOUBLE,
    "price" DECIMAL(10,2) DEFAULT 0,
    "rating" DECIMAL(2,1) DEFAULT 0,
    "tags" VARCHAR(255),
    "category" VARCHAR(50),
    "open_time" VARCHAR(50),
    "status" TINYINT NOT NULL DEFAULT 1,
    "deleted" TINYINT NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "travel_order" (
    "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
    "order_no" VARCHAR(32) NOT NULL UNIQUE,
    "user_id" BIGINT NOT NULL,
    "scenic_id" BIGINT,
    "food_id" BIGINT,
    "type" VARCHAR(20) DEFAULT 'scenic',
    "quantity" INT DEFAULT 1,
    "total_price" DECIMAL(10,2) NOT NULL,
    "visit_date" DATE,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "deleted" TINYINT NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "travel_note" (
    "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT,
    "cover_image" VARCHAR(255),
    "scenic_id" BIGINT,
    "likes" INT DEFAULT 0,
    "views" INT DEFAULT 0,
    "deleted" TINYINT NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "guide" (
    "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT,
    "cover_image" VARCHAR(255),
    "author" VARCHAR(50),
    "scenic_id" BIGINT,
    "scenic_name" VARCHAR(100),
    "tags" VARCHAR(255),
    "likes" INT DEFAULT 0,
    "favorites" INT DEFAULT 0,
    "views" INT DEFAULT 0,
    "status" TINYINT NOT NULL DEFAULT 1,
    "deleted" TINYINT NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "travelogue" (
    "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
    "user_id" BIGINT NOT NULL,
    "username" VARCHAR(50),
    "avatar" VARCHAR(255),
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT,
    "images" TEXT,
    "location" VARCHAR(200),
    "scenic_id" BIGINT,
    "scenic_name" VARCHAR(100),
    "likes" INT DEFAULT 0,
    "views" INT DEFAULT 0,
    "status" TINYINT NOT NULL DEFAULT 1,
    "deleted" TINYINT NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "food" (
    "id" BIGINT AUTO_INCREMENT PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "cover_image" VARCHAR(255),
    "location" VARCHAR(200),
    "avg_price" DECIMAL(10,2),
    "tags" VARCHAR(255),
    "scenic_name" VARCHAR(100),
    "scenic_id" BIGINT,
    "province" VARCHAR(50),
    "city" VARCHAR(50),
    "status" TINYINT NOT NULL DEFAULT 1,
    "deleted" TINYINT NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 种子数据（景区、攻略、美食、游记）
-- ==========================================

-- 景区数据 (20条)
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (1, '张家界国家森林公园', '中国第一个国家森林公园。张家界以其独特的石英砂岩峰林地貌闻名于世，被誉为"扩大的盆景，缩小的仙境"。景区内三千奇峰拔地而起，八百溪流蜿蜒曲折，森林覆盖率高达98%，是名副其实的天然氧吧。', 'https://picsum.photos/seed/zhangjiajie-mountains/800/600', '湖南省张家界市武陵源区', '湖南', '张家界', 110.4788, 29.3464, 228.0, 4.8, '自然风光,世界遗产,5A景区,国家森林公园', '自然景观', '07:00 - 18:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (2, '九寨沟', '九寨沟国家级自然保护区位于四川省阿坝藏族羌族自治州，因沟内有九个藏族村寨而得名。这里以翠海、叠瀑、彩林、雪峰和藏族风情闻名于世，被誉为"人间仙境"。', 'https://picsum.photos/seed/jiuzhaigou-lakes/800/600', '四川省阿坝藏族羌族自治州九寨沟县', '四川', '阿坝', 103.9194, 33.2632, 169.0, 4.9, '自然风光,世界遗产,5A景区', '自然景观', '08:00 - 17:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (3, '故宫博物院', '北京故宫是中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线的中心。故宫以三大殿为中心，占地面积约72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。', 'https://picsum.photos/seed/forbidden-city-beijing/800/600', '北京市东城区景山前街4号', '北京', '北京', 116.397, 39.9175, 60.0, 4.7, '历史文化,世界遗产,5A景区', '人文景观', '08:30 - 17:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (4, '西湖', '西湖位于浙江省杭州市西湖区，是中国大陆主要的观赏性淡水湖泊之一，也是首批国家重点风景名胜区。西湖三面环山，面积约6.39平方千米，以"淡妆浓抹总相宜"的湖光山色闻名天下。', 'https://picsum.photos/seed/west-lake-hangzhou/800/600', '浙江省杭州市西湖区', '浙江', '杭州', 120.1472, 30.2439, 0.0, 4.6, '自然风光,历史文化,5A景区', '自然景观', '全天开放');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (5, '桂林漓江', '漓江风景区是世界上规模最大、风景最美的岩溶山水游览区。以"山青、水秀、洞奇、石美"四绝著称，享有"山水甲天下"之美誉。乘竹筏漂流漓江，两岸奇峰林立，如入画中。', 'https://picsum.photos/seed/guilin-river-karst/800/600', '广西壮族自治区桂林市', '广西', '桂林', 110.2898, 25.235, 215.0, 4.5, '自然风光,5A景区', '自然景观', '08:30 - 16:30');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (6, '长城-八达岭', '八达岭长城位于北京市延庆区，是明长城中保存最完好、最具代表性的一段。长城是中国古代伟大的防御工程，也是世界七大奇迹之一。', 'https://picsum.photos/seed/great-wall-china/800/600', '北京市延庆区', '北京', '北京', 116.0167, 40.3589, 40.0, 4.6, '历史文化,世界遗产,5A景区', '人文景观', '07:30 - 18:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (7, '黄山', '黄山位于安徽省南部黄山市境内，以奇松、怪石、云海、温泉、冬雪五绝著称于世。"五岳归来不看山，黄山归来不看岳"。', 'https://picsum.photos/seed/huangshan-mountains/800/600', '安徽省黄山市', '安徽', '黄山', 118.1716, 30.134, 190.0, 4.7, '自然风光,世界遗产,5A景区', '自然景观', '06:30 - 17:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (8, '三亚蜈支洲岛', '蜈支洲岛坐落在三亚市北部的海棠湾内，是中国最美的热带海岛之一。海水清澈见底，能见度可达27米，是潜水爱好者的天堂。', 'https://picsum.photos/seed/sanya-tropical-beach/800/600', '海南省三亚市海棠区', '海南', '三亚', 109.7624, 18.3072, 144.0, 4.4, '海岛度假,潜水,4A景区', '海岛度假', '08:00 - 17:30');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (9, '大理洱海', '洱海是云南省第二大淡水湖，因其形似人耳而得名。湖水清澈碧蓝，与苍山十九峰相映成趣，"苍山雪，洱海月"构成了大理最经典的美景。环湖骑行全程约120公里。', 'https://picsum.photos/seed/dali-erhai-lake/800/600', '云南省大理白族自治州', '云南', '大理', 100.191, 25.609, 0.0, 4.7, '自然风光,湖泊,骑行圣地', '自然景观', '全天开放');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (10, '秦始皇兵马俑', '秦始皇兵马俑博物馆位于陕西省西安市临潼区，是世界最大的地下军事博物馆。三个俑坑总面积超过2万平方米，出土陶俑、陶马约8000件，被誉为"世界第八大奇迹"。', 'https://picsum.photos/seed/terracotta-warriors/800/600', '陕西省西安市临潼区', '陕西', '西安', 109.2735, 34.3853, 120.0, 4.8, '历史文化,世界遗产,5A景区', '人文景观', '08:30 - 18:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (11, '布达拉宫', '布达拉宫坐落在西藏拉萨市区的玛布日山上，是世界上海拔最高，集宫殿、城堡和寺院于一体的宏伟建筑。红白两色宫殿依山而建，气势磅礴。', 'https://picsum.photos/seed/potala-palace-lhasa/800/600', '西藏自治区拉萨市城关区', '西藏', '拉萨', 91.1172, 29.6578, 200.0, 4.9, '历史文化,世界遗产,5A景区,藏传佛教', '人文景观', '09:00 - 16:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (12, '呼伦贝尔大草原', '呼伦贝尔草原位于内蒙古自治区东北部，是世界著名的三大草原之一。这里水草丰美，一望无际的绿色延伸到天边，成群的牛羊点缀其间，构成一幅壮美的草原画卷。', 'https://picsum.photos/seed/mongolia-grassland/800/600', '内蒙古自治区呼伦贝尔市', '内蒙古', '呼伦贝尔', 119.7656, 49.2116, 80.0, 4.6, '草原风光,骑马,蒙古包体验', '自然景观', '全天开放');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (13, '稻城亚丁', '稻城亚丁国家级自然保护区位于四川省甘孜藏族自治州，被誉为"蓝色星球上的最后一片净土"。三座神山——仙乃日、央迈勇、夏诺多吉终年积雪，与高原海子构成绝美画面。', 'https://picsum.photos/seed/daocheng-snow-mountain/800/600', '四川省甘孜藏族自治州稻城县', '四川', '甘孜', 100.3183, 28.5589, 270.0, 4.8, '高原风光,徒步圣地,雪山湖泊', '自然景观', '07:00 - 18:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (14, '敦煌莫高窟', '莫高窟俗称千佛洞，坐落在甘肃省敦煌市东南25公里的鸣沙山东麓。始建于前秦时期，是世界上现存规模最大、内容最丰富的佛教艺术地。', 'https://picsum.photos/seed/dunhuang-mogao-caves/800/600', '甘肃省酒泉市敦煌市', '甘肃', '敦煌', 94.8099, 40.0416, 238.0, 4.8, '历史文化,世界遗产,5A景区,佛教艺术', '人文景观', '08:00 - 18:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (15, '青岛崂山', '崂山位于山东省青岛市崂山区，是中国海岸线第一高峰，素有"海上第一名山"之称。山海相连，水秀云奇，崂山道教文化源远流长。', 'https://picsum.photos/seed/laoshan-qingdao/800/600', '山东省青岛市崂山区', '山东', '青岛', 120.629, 36.1446, 90.0, 4.5, '山海风光,道教文化,5A景区', '自然景观', '06:00 - 19:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (16, '厦门鼓浪屿', '鼓浪屿位于福建省厦门市思明区，与厦门岛隔海相望。岛上气候宜人，四季如春，无车马喧嚣，有鸟语花香，素有"海上花园"之誉。万国建筑博览群交织出独特的文化气质。', 'https://picsum.photos/seed/gulangyu-island/800/600', '福建省厦门市思明区', '福建', '厦门', 118.0689, 24.4479, 35.0, 4.6, '海岛风光,世界遗产,文艺小清新,5A景区', '海岛度假', '全天开放');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (17, '苏州园林', '苏州园林是中国古典园林的代表，以拙政园、留园、网师园等为代表。以山水花木、亭台楼阁为基本要素，在有限空间内创造无限的意境，"咫尺之内再造乾坤"。', 'https://picsum.photos/seed/suzhou-garden/800/600', '江苏省苏州市姑苏区', '江苏', '苏州', 120.6266, 31.3175, 90.0, 4.6, '古典园林,世界遗产,5A景区,江南水乡', '人文景观', '07:30 - 17:30');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (18, '成都大熊猫繁育研究基地', '成都大熊猫繁育研究基地位于四川省成都市成华区，是世界上最重要的大熊猫保护研究机构之一。这里生活着百余只大熊猫，可以近距离观察国宝进食、嬉戏的憨态。', 'https://picsum.photos/seed/panda-chengdu/800/600', '四川省成都市成华区', '四川', '成都', 104.1472, 30.731, 58.0, 4.7, '国宝熊猫,亲子游,4A景区', '主题乐园', '07:30 - 18:00');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (19, '丽江古城', '丽江古城位于云南省丽江市古城区，始建于宋末元初，是中国历史文化名城中唯一没有城墙的古城。光滑的石板路、手工建造的木结构房屋、无处不在的小桥流水，让人流连忘返。', 'https://picsum.photos/seed/lijiang-old-town/800/600', '云南省丽江市古城区', '云南', '丽江', 100.233, 26.872, 50.0, 4.4, '古城古镇,世界遗产,5A景区,纳西文化', '人文景观', '全天开放');
INSERT INTO "scenic" ("id", "name", "description", "cover_image", "location", "province", "city", "longitude", "latitude", "price", "rating", "tags", "category", "open_time") VALUES (20, '华山', '华山位于陕西省华阴市，是五岳中的西岳，以"奇险天下第一山"闻名。长空栈道悬于万丈绝壁之上，鹞子翻身更是惊心动魄。华山还是道教全真派圣地。', 'https://picsum.photos/seed/huashan-cliffs/800/600', '陕西省渭南市华阴市', '陕西', '渭南', 110.0897, 34.4793, 160.0, 4.5, '登山探险,道教圣地,5A景区', '自然景观', '全天开放（24小时登山）');

-- 攻略数据 (7条)
INSERT INTO "guide" ("id", "title", "content", "cover_image", "author", "scenic_id", "scenic_name", "tags", "likes", "favorites", "views", "status") VALUES (1, '张家界三日游完全攻略', '<h2>Day 1：袁家界 - 天子山</h2><p>早上8点从武陵源门票站进入，乘坐环保车前往百龙天梯。到达袁家界后，游览天下第一桥、迷魂台、后花园等景点。下午前往天子山，参观贺龙公园、御笔峰、仙女散花。</p><h2>Day 2：金鞭溪 - 黄石寨</h2><p>上午徒步金鞭溪，全长约7.5公里，沿途可欣赏到金鞭岩、神鹰护鞭等自然奇观。下午游览黄石寨，这是张家界最大的凌空观景台。</p><h2>Day 3：天门山</h2><p>乘坐世界最长的高山客运索道——天门山索道，体验99道弯的盘山公路和999阶天梯。</p><h3>美食推荐</h3><ul><li>土家三下锅</li><li>张家界米粉</li><li>湘西腊肉</li></ul>', 'https://picsum.photos/seed/zhangjiajie-travel/800/600', '旅行达人小王', 1, '张家界', '三日游,深度游,自然风光', 328, 156, 12580, 1);
INSERT INTO "guide" ("id", "title", "content", "cover_image", "author", "scenic_id", "scenic_name", "tags", "likes", "favorites", "views", "status") VALUES (2, '故宫深度游览路线——避开人潮的玩法', '<h2>最佳游览时间</h2><p>淡季（11月-次年3月）游客较少，建议早上8:00前到达午门，开馆后直奔太和殿。</p><h2>推荐路线</h2><p><strong>精华线路（2-3小时）：</strong>午门→太和门→太和殿→中和殿→保和殿→乾清宫→交泰殿→坤宁宫→御花园→神武门</p><p><strong>深度线路（4-6小时）：</strong>增加珍宝馆和钟表馆（各10元）。</p><h3>拍照打卡点</h3><ul><li>角楼——故宫最美的建筑</li><li>太和殿广场——广角镜头拍全景</li><li>御花园——红墙金瓦配绿树</li></ul>', 'https://picsum.photos/seed/beijing-forbidden-tour/800/600', '文博爱好者', 3, '故宫', '一日游,历史文化,深度游', 512, 289, 23400, 1);
INSERT INTO "guide" ("id", "title", "content", "cover_image", "author", "scenic_id", "scenic_name", "tags", "likes", "favorites", "views", "status") VALUES (3, '九寨沟秋季摄影攻略', '<h2>拍摄最佳时段</h2><p>10月中旬到11月初是九寨沟最美的季节。五彩斑斓的树叶倒映在碧蓝的湖水中，随手一拍都是大片。</p><h2>推荐拍摄点</h2><ul><li><strong>五花海</strong>——清晨无风时水面如镜，倒影最为清晰</li><li><strong>诺日朗瀑布</strong>——使用慢门拍摄水流丝绸效果</li><li><strong>镜海</strong>——下午2-4点光线最佳</li></ul>', 'https://picsum.photos/seed/jiuzhaigou-autumn/800/600', '摄影师老张', 2, '九寨沟', '摄影,秋季,自然风光', 891, 432, 35000, 1);
INSERT INTO "guide" ("id", "title", "content", "cover_image", "author", "scenic_id", "scenic_name", "tags", "likes", "favorites", "views", "status") VALUES (4, '杭州西湖一日漫步指南', '<h2>经典环湖路线</h2><p>断桥残雪→白堤→孤山→苏堤春晓→花港观鱼→雷峰塔→南山路。全程约12公里，步行3-4小时。</p><h2>必体验</h2><ul><li>乘手摇船游湖，船夫会讲白娘子的故事</li><li>在湖畔居茶馆喝茶赏湖</li><li>晚间的音乐喷泉表演</li></ul>', 'https://picsum.photos/seed/hangzhou-west-lake/800/600', '杭州土著', 4, '西湖', '一日游,休闲,城市漫步', 245, 98, 8900, 1);
INSERT INTO "guide" ("id", "title", "content", "cover_image", "author", "scenic_id", "scenic_name", "tags", "likes", "favorites", "views", "status") VALUES (5, '黄山经典两日游线路规划', '<h2>Day 1：云谷索道上 - 西海大峡谷</h2><p>从云谷寺乘坐索道上山，游览始信峰、北海景区，下午挑战西海大峡谷的一环和二环。</p><h2>Day 2：光明顶日出 - 玉屏楼</h2><p>清晨5点出发前往光明顶看日出，然后游览飞来石、鳌鱼峰，最后在玉屏楼看迎客松。</p>', 'https://picsum.photos/seed/huangshan-hiking/800/600', '登山爱好者', 7, '黄山', '两日游,登山,自然风光', 673, 312, 18900, 1);
INSERT INTO "guide" ("id", "title", "content", "cover_image", "author", "scenic_id", "scenic_name", "tags", "likes", "favorites", "views", "status") VALUES (6, '大理洱海环湖骑行完全攻略', '<h2>推荐骑行路线</h2><p>从大理古城出发→才村码头→喜洲古镇→双廊古镇→挖色镇→海东镇→下关→返回古城。全程约120公里，建议分2天完成。</p><h2>Day 1（西线60km）</h2><p>古城→才村看日出→喜洲吃破酥粑粑→双廊古镇住宿。西线沿途有专门的骑行绿道。</p><h2>Day 2（东线60km）</h2><p>双廊→挖色看日落→海东沿海公路→返回古城。东线车少路宽，夕阳时分尤其美丽。</p><h3>租车贴士</h3><ul><li>古城内租电动车约30-80元/天</li><li>建议租电动车，坡路较多</li><li>沿途有多处充电桩</li></ul>', 'https://picsum.photos/seed/dali-cycling/800/600', '骑行者阿飞', 9, '大理洱海', '骑行,两日游,自然风光', 562, 278, 21500, 1);
INSERT INTO "guide" ("id", "title", "content", "cover_image", "author", "scenic_id", "scenic_name", "tags", "likes", "favorites", "views", "status") VALUES (7, '西安三日游——十三朝古都的文化盛宴', '<h2>Day 1：兵马俑 - 华清宫</h2><p>上午前往临潼参观秦始皇兵马俑博物馆，建议请一位讲解员（约100元），让历史活起来。下午游览华清宫，感受"春寒赐浴华清池"的皇家氛围。</p><h2>Day 2：城墙 - 回民街</h2><p>上午骑行西安城墙（全长约14公里，骑行约2小时）。傍晚去回民街，品尝肉夹馍、羊肉泡馍、凉皮等美食。</p><h2>Day 3：大雁塔 - 陕西历史博物馆</h2><p>上午参观大雁塔及大慈恩寺，下午前往陕西历史博物馆（需提前3天预约）。</p>', 'https://picsum.photos/seed/xian-history/800/600', '历史文化迷', 10, '兵马俑', '三日游,历史文化,美食之旅', 435, 201, 16700, 1);

-- 美食数据 (20条)
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (1, '重庆老火锅', '麻辣鲜香的重庆正宗九宫格火锅，选用上等牛油锅底，搭配新鲜毛肚、鹅肠、黄喉等特色菜品，酣畅淋漓。', 'https://picsum.photos/seed/chongqing-hotpot/800/600', '重庆市渝中区解放碑', 128.0, '重庆火锅,麻辣,九宫格', '张家界国家森林公园', 1, '重庆', '重庆');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (2, '成都担担面', '成都传统名小吃，面条细薄爽滑，配以炒制的猪肉末、芽菜、花生碎、蒜泥，浇上红油和芝麻酱，咸鲜微辣，香气浓郁。', 'https://picsum.photos/seed/dandan-noodles/800/600', '成都市锦江区春熙路', 18.0, '四川小吃,面食,麻辣', '九寨沟', 2, '四川', '成都');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (3, '北京烤鸭', '选用优质北京填鸭，色泽红润，肉质肥而不腻，外脆里嫩。配以薄饼、甜面酱、葱丝、黄瓜条，一口下去层次丰富。', 'https://picsum.photos/seed/beijing-duck/800/600', '北京市东城区前门大街', 198.0, '北京菜,烤鸭,老字号', '故宫博物院', 3, '北京', '北京');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (4, '西湖醋鱼', '杭州传统名菜，选用草鱼，以醋和糖烹制而成。鱼肉嫩滑，酸甜适口，入口即化。', 'https://picsum.photos/seed/west-lake-fish/800/600', '杭州市西湖区楼外楼', 88.0, '杭帮菜,海鲜,酸甜', '西湖', 4, '浙江', '杭州');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (5, '桂林米粉', '桂林人的早餐首选。洁白嫩滑的米粉配以卤水、锅烧（脆皮猪肉）、酸豆角、花生、辣椒酱，爽滑可口。', 'https://picsum.photos/seed/guilin-rice-noodle/800/600', '桂林市秀峰区正阳步行街', 12.0, '广西小吃,米粉,卤味', '桂林漓江', 5, '广西', '桂林');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (6, '延庆火盆锅', '北京延庆特色农家美食。炭火铜锅慢炖酸菜、豆腐、白肉，围炉而坐，热气腾腾，冬日里最温暖的享受。', 'https://picsum.photos/seed/hotpot-rural/800/600', '北京市延庆区八达岭镇', 68.0, '农家菜,火锅,北京风味', '长城-八达岭', 6, '北京', '北京');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (7, '黄山臭鳜鱼', '徽菜代表，闻起来臭，吃起来香。鱼肉鲜嫩呈蒜瓣状，酱汁浓郁，是来黄山必点的硬菜。', 'https://picsum.photos/seed/stinky-fish/800/600', '黄山市屯溪老街', 128.0, '徽菜,河鲜,腌制', '黄山', 7, '安徽', '黄山');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (8, '三亚椰子鸡', '选用文昌鸡和新鲜椰青，椰汁煮鸡，椰肉提香。汤清味甜，鸡肉嫩滑，配上沙姜青柠蘸料，清爽开胃。', 'https://picsum.photos/seed/coconut-chicken/800/600', '三亚市海棠湾68美食广场', 158.0, '海南菜,椰子,火锅', '三亚蜈支洲岛', 8, '海南', '三亚');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (9, '大理砂锅鱼', '洱海特产弓鱼配以火腿、鸡肉、豆腐、菌菇，以砂锅慢炖数小时。汤色乳白，鲜美无比。', 'https://picsum.photos/seed/claypot-fish/800/600', '大理古城人民路', 98.0, '白族菜,河鲜,砂锅', '大理洱海', 9, '云南', '大理');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (10, '西安肉夹馍', '腊汁肉剁碎夹入白吉馍中，馍脆肉香，肥而不腻。一个肉夹馍配一碗粉丝汤，是西安人最经典的午餐。', 'https://picsum.photos/seed/chinese-burger/800/600', '西安市碑林区回民街', 15.0, '陕西小吃,面食,腊汁', '秦始皇兵马俑', 10, '陕西', '西安');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (11, '拉萨甜茶', '藏式奶茶，用红茶、牛奶和糖慢火熬制。在拉萨的老茶馆里，点一壶甜茶配上藏面，感受高原慢生活。', 'https://picsum.photos/seed/tibetan-tea/800/600', '拉萨市城关区八廓街', 8.0, '藏餐,奶茶,高原美食', '布达拉宫', 11, '西藏', '拉萨');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (12, '呼伦贝尔烤全羊', '选用草原散养的肥羊，经秘制调料腌制后慢火烤制。外焦里嫩，毫无膻味，是草原上最隆重的待客佳肴。', 'https://picsum.photos/seed/roast-lamb/800/600', '呼伦贝尔市海拉尔区蒙古大营', 288.0, '蒙古菜,烧烤,羊肉', '呼伦贝尔大草原', 12, '内蒙古', '呼伦贝尔');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (13, '稻城牦牛肉火锅', '高原牦牛肉切成薄片，放入藏式铜锅中涮煮，配以松茸和野生菌，鲜香四溢。', 'https://picsum.photos/seed/yak-hotpot/800/600', '稻城县香格里拉镇', 168.0, '藏餐,火锅,牦牛肉', '稻城亚丁', 13, '四川', '甘孜');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (14, '敦煌驴肉黄面', '敦煌百年传统面食。筋道的手工拉面配以卤制入味的驴肉丁，浇上特制酱汁，佐以蒜泥和香菜，别有风味。', 'https://picsum.photos/seed/donkey-noodles/800/600', '敦煌市沙州市场', 38.0, '西北面食,驴肉,敦煌特色', '敦煌莫高窟', 14, '甘肃', '敦煌');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (15, '青岛啤酒烧烤', '青岛的灵魂美食。新鲜扎啤配炭火烤海鲜和肉串。一口啤酒，一口烤鱿鱼，感受海风拂面的惬意。', 'https://picsum.photos/seed/tsingtao-beer/800/600', '青岛台东步行街', 45.0, '鲁菜,海鲜,啤酒搭档', '青岛崂山', 15, '山东', '青岛');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (16, '厦门沙茶面', '闽南传统小吃。以虾头、花生熬制的沙茶酱为汤底，加入鱿鱼、猪肝、豆腐泡等配料，汤色红亮，香辣浓郁。', 'https://picsum.photos/seed/satay-noodles/800/600', '厦门市思明区中山路', 25.0, '闽南小吃,沙茶,海鲜', '厦门鼓浪屿', 16, '福建', '厦门');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (17, '苏州松鼠桂鱼', '苏帮菜的颜值担当。桂鱼剞花刀后炸至金黄，形如松鼠，浇上酸甜番茄汁，外脆里嫩，色香味俱全。', 'https://picsum.photos/seed/squirrel-fish/800/600', '苏州市姑苏区观前街', 168.0, '苏帮菜,河鲜,酸甜', '苏州园林', 17, '江苏', '苏州');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (18, '丽江腊排骨火锅', '纳西族的传统美食，用风干的腊排骨熬制汤底，加入当地特产的菌菇和蔬菜。汤白味浓，驱寒暖身，是丽江夜晚的最佳选择。', 'https://picsum.photos/seed/cured-meat-hotpot/800/600', '丽江古城', 98.0, '纳西菜,火锅,腊味', '丽江古城', 19, '云南', '丽江');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (19, '成都龙抄手', '皮薄馅嫩，汤清味鲜。抄手（馄饨）配红油或清汤，是成都人从小吃到大的街头美味。', 'https://picsum.photos/seed/sichuan-wonton/800/600', '成都市锦江区总府路', 22.0, '四川小吃,抄手,红油', '成都大熊猫繁育研究基地', 18, '四川', '成都');
INSERT INTO "food" ("id", "name", "description", "cover_image", "location", "avg_price", "tags", "scenic_name", "scenic_id", "province", "city") VALUES (20, '兰州牛肉面', '一清二白三红四绿五黄——清澈的牛肉汤、白萝卜、红辣椒油、绿蒜苗香菜、黄亮的面条，色香味俱全。', 'https://picsum.photos/seed/beef-noodles/800/600', '敦煌市区', 18.0, '西北面食,牛肉,清汤', '敦煌莫高窟', 14, '甘肃', '敦煌');

-- 游记数据 (3条)
INSERT INTO "travelogue" ("id", "user_id", "username", "avatar", "title", "content", "images", "location", "scenic_id", "scenic_name", "likes", "views", "status") VALUES (1, 2, 'traveler', '', '一个人的张家界之旅', '背上行囊，独自一人去了张家界。站在天子山上，看着云雾在峰林间飘荡，忽然觉得人生所有烦恼都那么渺小。这趟旅程改变了我看待世界的方式。', 'https://picsum.photos/seed/travelogue-zjj-1/800/600,https://picsum.photos/seed/travelogue-zjj-2/800/600', '湖南省张家界市', 1, '张家界国家森林公园', 128, 2340, 1);
INSERT INTO "travelogue" ("id", "user_id", "username", "avatar", "title", "content", "images", "location", "scenic_id", "scenic_name", "likes", "views", "status") VALUES (2, 3, 'user2', '', '故宫雪景，美到窒息', '去年冬天北京下了第一场雪，我正好在故宫。红墙黄瓦配白雪，那种美无法用语言形容。分享给每一位热爱中国文化的朋友。', 'https://picsum.photos/seed/travelogue-gugong-1/800/600,https://picsum.photos/seed/travelogue-gugong-2/800/600', '北京市东城区', 3, '故宫博物院', 256, 4890, 1);
INSERT INTO "travelogue" ("id", "user_id", "username", "avatar", "title", "content", "images", "location", "scenic_id", "scenic_name", "likes", "views", "status") VALUES (3, 2, 'traveler', '', '九寨归来不看水', '游览九寨沟，真正理解了"九寨归来不看水"的含义。五花海的色彩如此绚烂，诺日朗瀑布如此壮阔，每一眼都是震撼。', 'https://picsum.photos/seed/travelogue-jzg-1/800/600,https://picsum.photos/seed/travelogue-jzg-2/800/600', '四川省阿坝藏族羌族自治州', 2, '九寨沟', 189, 3150, 1);
