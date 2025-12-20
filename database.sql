-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: b7db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKoce3937d2f4mpfqrycbr0l93m` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,_binary '','Apple'),(2,_binary '','Samsung'),(3,_binary '','Xiaomi'),(4,_binary '','OPPO'),(5,_binary '','Nokia');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `content` longtext,
  `created_at` datetime(6) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `view_count` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (2,'King Mobile','<p>Trong thế giới công nghệ hiện nay, các thiết bị điện thoại thông minh luôn là tâm điểm chú ý của nhiều người dùng. Đặc biệt, khi nhắc đến thương hiệu Apple, người ta thường nghĩ đến những sản phẩm cao cấp và sang trọng. Một trong những sản phẩm đáng chú ý của Apple là iPhone 7 Pro Max, chiếc điện thoại đã làm nên lịch sử khi ra mắt.</p>\n\n<p>Với thiết kế kim loại nguyên khối sang trọng, iPhone 7 Pro Max mang đến cho người dùng cảm giác cầm nắm chắc chắn và thoải mái. Màn hình 5,5 inch với độ phân giải Full HD cho phép người dùng tận hưởng những hình ảnh sắc nét và sống động. Camera kép 12 megapixel với khả năng zoom quang học và chống rung quang học giúp người dùng có thể chụp những bức ảnh chuyên nghiệp.</p>\n<p>Không chỉ dừng lại ở thiết kế và camera, iPhone 7 Pro Max còn được trang bị vi xử lý A10 Fusion mạnh mẽ, giúp cho các tác vụ được thực hiện một cách mượt mà và nhanh chóng. Dung lượng pin lên đến 2900mAh, cho phép người dùng sử dụng điện thoại trong suốt cả ngày mà không cần phải lo lắng về việc hết pin.</p>\n<p>Để có thể trải nghiệm những tính năng tuyệt vời của iPhone 7 Pro Max, bạn có thể đến với shop điện thoại của chúng tôi. Với đội ngũ nhân viên chuyên nghiệp và giàu kinh nghiệm, chúng tôi sẽ giúp bạn tìm hiểu và lựa chọn được sản phẩm phù hợp với nhu cầu của mình.</p>\n<p><img src=\"https://example.com/iphone-7-pro-max.jpg\" alt=\"iPhone 7 Pro Max\" width=\"300\" height=\"200\"></p>\n<p>Đặc biệt, khi mua iPhone 7 Pro Max tại shop điện thoại của chúng tôi, bạn sẽ nhận được nhiều ưu đãi hấp dẫn, bao gồm:</p>\n<ul>\n    <li>Giá cả cạnh tranh</li>\n    <li>Bảo hành chính hãng</li>\n    <li>Hỗ trợ kỹ thuật tận tình</li>\n    <li>Quà tặng kèm theo</li>\n</ul>\n<p>Để biết thêm thông tin về iPhone 7 Pro Max và các sản phẩm khác, bạn có thể liên hệ với chúng tôi qua hotline hoặc truy cập vào trang web chính thức của shop điện thoại.</p>','2025-12-19 03:58:43.334836',NULL,'iPhone 7 Pro Max: Sự Kết Hợp Hoàn Hảo Của Công Nghệ Và Thiết Kế','2025-12-19 03:58:43.334836',48),(3,'King Mobile','<p>Trong một cuộc phỏng vấn gần đây, trưởng đoàn Việt Nam đã chia sẻ những suy nghĩ và cảm xúc của mình về thành tích của đội tuyển U.22 và đội tuyển nữ. Ông bày tỏ sự ấn tượng đặc biệt với huy chương vàng (HCV) của đội U.22 và tiếc nuối vì không có sự hoàn hảo trong trận đấu của đội nữ.</p>\n<p>Ông cho biết: \"Chúng tôi rất tự hào về thành tích của đội U.22. Các cầu thủ trẻ đã thể hiện sự tài năng, sự kiên trì và quyết tâm trong suốt giải đấu. HCV là một kết quả xứng đáng cho sự nỗ lực của họ. Tuy nhiên, chúng tôi cũng không thể không tiếc nuối vì đội nữ đã không thể đạt được kết quả tốt hơn trong trận đấu gần đây.\"</p>\n<p>Về vấn đề trọng tài, trưởng đoàn Việt Nam cho biết: \"Chúng tôi hiểu rằng trọng tài là một phần quan trọng của trận đấu, và đôi khi họ cũng có thể mắc sai sót. Tuy nhiên, trong trận đấu gần đây của đội nữ, chúng tôi cảm thấy có một số quyết định của trọng tài không chính xác. Điều này đã ảnh hưởng đến kết quả của trận đấu và khiến chúng tôi tiếc nuối.\"</p>\n<p>Mặc dù vậy, trưởng đoàn Việt Nam vẫn cho biết rằng đội tuyển nữ đã thể hiện sự tiến bộ và đã có một giải đấu khá tốt. Ông bày tỏ hy vọng rằng đội sẽ tiếp tục phát triển và đạt được những thành tích tốt hơn trong tương lai.</p>\n<p>Về kế hoạch tương lai, trưởng đoàn Việt Nam cho biết: \"Chúng tôi sẽ tiếp tục đầu tư vào đội tuyển U.22 và đội tuyển nữ. Chúng tôi sẽ cố gắng tạo điều kiện tốt nhất cho các cầu thủ để họ có thể phát triển và đạt được thành tích tốt hơn. Chúng tôi cũng sẽ làm việc chặt chẽ với các trọng tài để đảm bảo rằng họ có thể thực hiện công việc của mình một cách chính xác và công bằng.\"</p>\n<p>Tóm lại, trưởng đoàn Việt Nam đã bày tỏ sự ấn tượng đặc biệt với HCV của đội U.22 và tiếc nuối vì không có sự hoàn hảo trong trận đấu của đội nữ. Tuy nhiên, ông vẫn tin tưởng vào tương lai của đội tuyển và sẽ tiếp tục làm việc để giúp họ đạt được thành tích tốt hơn.</p>','2025-12-19 12:14:46.885948',NULL,'Trưởng đoàn Việt Nam ấn tượng đặc biệt HCV của U.22, tiếc nuối giá không có sai sót trọng tài trận nữ','2025-12-19 12:14:46.885948',1),(4,'King Mobile','<p>Trong một động thái bất ngờ, các tờ báo lớn của Thái Lan đã phải thừa nhận sức mạnh của đội U22 Việt Nam sau khi đội bóng này đã thể hiện một phong độ ấn tượng trong các trận đấu gần đây.</p>\n<p>Đội U22 Việt Nam đã gây ấn tượng mạnh với chiến thắng 2-0 trước U22 Thái Lan trong trận đấu giao hữu vừa qua. Đây là một kết quả đáng kinh ngạc, đặc biệt là khi U22 Thái Lan được đánh giá là một trong những đội bóng mạnh nhất ở khu vực Đông Nam Á.</p>\n<p>Theo báo <i>Siam Sport</i> của Thái Lan, đội U22 Việt Nam đã thể hiện một phong độ xuất sắc, với sự kết hợp nhuần nhuyễn giữa các cầu thủ và một chiến thuật hiệu quả. \"Đội U22 Việt Nam đã chứng minh rằng họ là một đội bóng đáng sợ, với khả năng tấn công mạnh mẽ và một hàng thủ vững chắc\", báo <i>Siam Sport</i> nhận xét.</p>\n<p>Báo <i>Thai Rath</i> cũng có chung quan điểm, khi cho rằng U22 Việt Nam đã \"đánh bại U22 Thái Lan với một phong cách thuyết phục\". \"Đội U22 Việt Nam đã thể hiện một sự tự tin và một phong độ ấn tượng, và họ xứng đáng với chiến thắng\", báo <i>Thai Rath</i> viết.</p>\n<p>Đây không phải là lần đầu tiên U22 Việt Nam gây ấn tượng với các đội bóng ở khu vực. Trong thời gian gần đây, đội bóng này đã có một số chiến thắng đáng kể, bao gồm cả chiến thắng 3-1 trước U22 Malaysia và chiến thắng 2-0 trước U22 Indonesia.</p>\n<p>Với những kết quả ấn tượng này, U22 Việt Nam đang trở thành một trong những đội bóng được dự đoán sẽ làm nên lịch sử tại các giải đấu quốc tế sắp tới. Và với sự thừa nhận của các tờ báo lớn ở Thái Lan, U22 Việt Nam đã chứng minh rằng họ là một đội bóng không thể bị xem nhẹ.</p>\n<p>Nếu bạn là một fan hâm mộ của đội U22 Việt Nam, hãy đến với shop điện thoại của chúng tôi để cập nhật những tin tức mới nhất về đội bóng này. Chúng tôi cung cấp các sản phẩm điện thoại chất lượng cao, giúp bạn có thể theo dõi và cập nhật thông tin về U22 Việt Nam mọi lúc, mọi nơi.</p>','2025-12-19 12:15:27.077307',NULL,'Báo Thái Lan thừa nhận sức mạnh của U22 Việt Nam','2025-12-19 12:15:27.077307',1),(5,'King Mobile','<p>Trong cuộc họp báo sau trận đấu, huấn luyện viên trưởng của đội U22 Thái Lan đã tiết lộ nguyên nhân thật sự dẫn đến thất bại của đội nhà trước U22 Việt Nam.</p>\n<p>Ông cho biết, mặc dù đội U22 Thái Lan đã chuẩn bị kỹ lưỡng và đã có những chiến thuật tốt, nhưng họ đã không thể tận dụng được những cơ hội mà họ có. \"Chúng tôi đã tạo ra nhiều cơ hội ghi bàn, nhưng không thể chuyển hóa chúng thành bàn thắng\", ông nói.</p>\n<p>Ông cũng cho biết, U22 Việt Nam đã chơi rất tốt và đã tận dụng được những sai lầm của đội U22 Thái Lan. \"Họ đã chơi rất kỷ luật và đã tận dụng được những cơ hội mà chúng tôi tạo ra\", ông nói.</p>\n<p>Ngoài ra, ông cũng cho biết, đội U22 Thái Lan đã gặp phải một số vấn đề về thể lực và chấn thương trong trận đấu. \"Một số cầu thủ của chúng tôi đã gặp chấn thương và không thể thi đấu hết sức mình\", ông nói.</p>\n<p>Ông cũng cho biết, đội U22 Thái Lan sẽ phải rút kinh nghiệm từ trận đấu này và sẽ phải cải thiện hơn trong tương lai. \"Chúng tôi sẽ phải học hỏi từ thất bại này và sẽ phải cải thiện hơn trong các trận đấu tiếp theo\", ông nói.</p>\n<p>Trận đấu giữa U22 Việt Nam và U22 Thái Lan đã diễn ra vào chiều ngày 22/2 tại sân vận động quốc gia Mỹ Đình. U22 Việt Nam đã giành chiến thắng với tỷ số 2-1 sau khi đã bị dẫn trước 1-0. Đây là một chiến thắng quan trọng của U22 Việt Nam trong cuộc đua giành vé vào vòng chung kết giải U23 châu Á.</p>\n<p>Để cập nhật thêm thông tin về các trận đấu của đội U22 Việt Nam, bạn có thể truy cập vào trang web chính thức của Liên đoàn bóng đá Việt Nam hoặc theo dõi các trang tin thể thao uy tín.</p>\n<p>Đừng quên theo dõi chúng tôi để cập nhật thêm thông tin về thế giới thể thao và công nghệ!</p>','2025-12-19 12:15:43.271145',NULL,'Phía Thái Lan tiết lộ nguyên nhân thật sự khiến họ thua ngược U22 Việt Nam','2025-12-19 12:15:43.271145',1);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_comments`
--

DROP TABLE IF EXISTS `news_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime(6) DEFAULT NULL,
  `news_id` bigint DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_comments`
--

LOCK TABLES `news_comments` WRITE;
/*!40000 ALTER TABLE `news_comments` DISABLE KEYS */;
INSERT INTO `news_comments` VALUES (1,'hello','2025-12-19 12:16:01.978778',2,NULL,2);
/*!40000 ALTER TABLE `news_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_likes`
--

DROP TABLE IF EXISTS `news_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_likes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `liked_at` datetime(6) DEFAULT NULL,
  `news_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK5u8m68qbb5t3r41b8wfu5x3wh` (`news_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_likes`
--

LOCK TABLES `news_likes` WRITE;
/*!40000 ALTER TABLE `news_likes` DISABLE KEYS */;
INSERT INTO `news_likes` VALUES (1,'2025-12-19 02:59:33.516254',1,2),(3,'2025-12-20 07:11:10.876645',2,2);
/*!40000 ALTER TABLE `news_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,30000000,1,1,1),(2,30000000,1,2,1),(4,30000000,1,4,2),(5,19000000,1,5,3),(6,30000000,1,6,1),(7,15000000,1,7,4),(8,19000000,1,8,3),(9,30000000,1,8,1),(10,30000000,1,9,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `completed_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','CONFIRMED','PENDING','SHIPPING') DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,NULL,'2025-12-17 21:43:13.286411','COMPLETED',30000000,2),(2,NULL,'2025-12-17 23:28:11.740735','CONFIRMED',30000000,2),(4,NULL,'2025-12-17 23:32:38.380809','PENDING',30000000,2),(5,NULL,'2025-12-17 23:37:05.421435','PENDING',19000000,2),(6,NULL,'2025-12-19 03:47:47.454502','PENDING',30000000,2),(7,NULL,'2025-12-19 03:50:16.841809','CANCELLED',15000000,2),(8,NULL,'2025-12-19 11:57:09.495892','COMPLETED',49000000,2),(9,NULL,'2025-12-20 07:04:51.358169','PENDING',30000000,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otps` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_time` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `expiry_date` datetime(6) DEFAULT NULL,
  `otp_type` enum('REGISTER','RESET') DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKseso6nlp9f5fbuilrngn3pbyi` (`user_id`),
  CONSTRAINT `FKseso6nlp9f5fbuilrngn3pbyi` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otps`
--

LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
INSERT INTO `otps` VALUES (1,'072075','2025-12-17 15:41:57.771450','khoinghiepcunghoang@gmail.com','2025-12-17 15:51:57.771450','REGISTER',_binary '',1),(2,'471923','2025-12-17 17:00:46.657542','nguyenhaihoang09092003@gmail.com','2025-12-17 17:10:46.657542','REGISTER',_binary '',2),(3,'431203','2025-12-19 12:32:19.279160','nguyenhaihoang09092003@gmail.com','2025-12-19 12:42:19.279160','RESET',_binary '\0',2);
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `is_thumbnail` bit(1) NOT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqnq71xsohugpqwf3c9gxmsuy` (`product_id`),
  CONSTRAINT `FKqnq71xsohugpqwf3c9gxmsuy` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (3,'http://localhost:8080/uploads/productImages/1f7d47ea-9686-4de9-95bd-42e3e58cfb47_71-EnPs+uQL.jpg',_binary '',2),(4,'http://localhost:8080/uploads/productImages/de6f4ea4-52aa-4323-88ac-6dfc8d7e54aa_71WcjsOVOmL._AC_UF894,1000_QL80_.jpg',_binary '\0',2),(5,'http://localhost:8080/uploads/productImages/4a2f7702-0d17-42b9-92f7-a5041301c197_51hOisZjbeL._AC_UF894,1000_QL80_.jpg',_binary '',3),(6,'http://localhost:8080/uploads/productImages/3e01dad4-a613-48a8-b360-c371d7af99be_51HXDYzmFbL.jpg',_binary '\0',3),(7,'http://localhost:8080/uploads/productImages/c6315443-f76c-4850-9b08-e95c309d9c70_reno11-pro-860-720 (1).jpg',_binary '',4),(8,'http://localhost:8080/uploads/productImages/cfeb1849-4347-4b4a-a5d1-ea445aaf79db_61nmDdSEuUL._AC_UF894,1000_QL80_.jpg',_binary '',5),(9,'http://localhost:8080/uploads/productImages/eeb62937-2c24-4429-ae2e-8dcabf4fa1bf_s-l400.jpg',_binary '\0',5),(10,'http://localhost:8080/uploads/productImages/bbc354f3-dba6-423d-ab3e-9970d9eebe7d_619f09kK7tL.jpg',_binary '',6),(11,'http://localhost:8080/uploads/productImages/4f05995b-98ef-4006-b7c2-d6d5cab26abd_111850_iphone-14_1.jpg',_binary '\0',6),(12,'http://localhost:8080/uploads/productImages/7876145d-9baf-437c-a972-85e1674633f5_51ngAkKqflL._AC_UF894,1000_QL80_.jpg',_binary '',8),(13,'http://localhost:8080/uploads/productImages/ef0f7ffd-9e6b-4d28-8392-f9993a75a38a_51s4U1bQpOL.jpg',_binary '',9),(14,'http://localhost:8080/uploads/productImages/b4c85f01-46eb-400e-99cb-52bfb48e98b6_503cb266cda5de2f7c761228f3182737.png',_binary '\0',9),(15,'http://localhost:8080/uploads/productImages/1ebbc532-ea0f-43cd-a0a0-039090a237cd_71SgqjoTNzL.jpg',_binary '',10),(16,'http://localhost:8080/uploads/productImages/97b63501-9336-4216-b5d9-116e3a4dd39c_reno11-pro-860-720 (1).jpg',_binary '\0',10),(17,'http://localhost:8080/uploads/productImages/2a2b41bf-90f4-465d-b895-c8d66de1d9d4_7169hX0S18L._AC_UF1000,1000_QL80_.jpg',_binary '',11),(18,'http://localhost:8080/uploads/productImages/44cdef93-dcf5-4769-b9d3-9efde5c78672_1-12.jpg',_binary '\0',11),(19,'http://localhost:8080/uploads/productImages/3a6cfb61-363f-461a-9f18-117c5cd35517_Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',_binary '',12),(20,'http://localhost:8080/uploads/productImages/5ebfeb3f-6aff-4fe9-90f1-2212d430010f_iPhone-15-Colors.jpg',_binary '\0',12),(21,'http://localhost:8080/uploads/productImages/2cd3f122-ba29-46cc-813b-4413333149e1_61XXUxrT1xL._AC_UF894,1000_QL80_.jpg',_binary '',13),(22,'http://localhost:8080/uploads/productImages/38034565-734b-4dcf-a48d-ff74bdc33580_Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg',_binary '\0',13),(23,'http://localhost:8080/uploads/productImages/6f5a524a-e8f4-4f06-afc3-3ddf0a6c46ef_71-EnPs+uQL.jpg',_binary '',14),(24,'http://localhost:8080/uploads/productImages/78f03d1a-373a-4c54-a58b-e01e6fec4760_Gear-Samsung-Galaxy-S24-Series-SOURCE-Julian-Chokkattu.jpg',_binary '\0',14),(25,'http://localhost:8080/uploads/productImages/b3263ba7-5b2e-4a66-8c7f-34940b27b4d7_1_SM-A256B_BlueBlack_Back_Front-1600x1200.jpg',_binary '',15),(26,'http://localhost:8080/uploads/productImages/8a0bfd80-547f-4cc9-901a-8eec6bfed5f1_51hLccxj9cL.jpg',_binary '\0',15),(27,'http://localhost:8080/uploads/productImages/fc17a3ea-18b0-4235-bf12-02b6b3e7cd11_51hOisZjbeL.jpg',_binary '',16),(28,'http://localhost:8080/uploads/productImages/c2f90588-2f17-492b-be51-c355740c7608_51HXDYzmFbL (1).jpg',_binary '\0',16),(29,'http://localhost:8080/uploads/productImages/583f1c1b-5651-4b1a-ad8b-f93c07c84cc5_619yapfH9gL.jpg',_binary '',17),(30,'http://localhost:8080/uploads/productImages/ed5ba3cf-4a80-4ad0-a9f3-7cdc62c52388_1812184111_B0BQ3MMPX6_1700645575984.jpg',_binary '\0',17),(31,'http://localhost:8080/uploads/productImages/3644cd2f-835d-41c3-9e05-2a9f85e79d00_reno11-860-720.jpg',_binary '',18),(32,'http://localhost:8080/uploads/productImages/1e1e10d2-8d21-4400-bb51-7ff963e95864_s-l1200.jpg',_binary '\0',18),(33,'http://localhost:8080/uploads/productImages/d7613cce-61eb-4a0d-894b-edf1e7327ea0_1812184111_QjBDSERXNk44Sg==_1718980789606_0.jpg',_binary '',19),(34,'http://localhost:8080/uploads/productImages/72bd30a1-b6fd-41a6-8d0a-44508c08e0af_s-l1200 (1).jpg',_binary '\0',19),(35,'http://localhost:8080/uploads/productImages/283e947b-ee83-495a-9aaa-c04757d29496_619f09kK7tL.jpg',_binary '',7),(46,'http://localhost:8080/uploads/productImages/477fdfe1-6ca8-4699-96ad-4b61a868e236_1-tinh-nang-moi-tren-iphone-15-didongviet-3.jpg',_binary '',1),(47,'http://localhost:8080/uploads/productImages/beb13551-cf40-4502-83e8-209dac6349a2_2-tinh-nang-moi-tren-iphone-15-didongviet-1.jpg',_binary '\0',1);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `battery` varchar(255) DEFAULT NULL,
  `camera` varchar(255) DEFAULT NULL,
  `chipset` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `name` varchar(255) NOT NULL,
  `os` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity_in_stock` int DEFAULT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `screen_size` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `brand_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa3a4mpsfdf4d2y6r8ra3sc8mv` (`brand_id`),
  CONSTRAINT `FKa3a4mpsfdf4d2y6r8ra3sc8mv` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'4422 mAh','Chính 48MP, Tele 5x, Ultra Wide 12MP','Chính 48MP','BLACK','2025-12-17 15:50:59.459351','iPhone 15 Pro Max là mẫu flagship cao cấp nhất của Apple với thiết kế khung titan siêu nhẹ và bền bỉ. Máy được trang bị chip A17 Pro mạnh mẽ, mang lại hiệu năng vượt trội cho mọi tác vụ từ công việc đến chơi game đồ họa cao. Hệ thống camera chuyên nghiệp với khả năng zoom quang học 5x giúp chụp ảnh và quay video sắc nét trong mọi điều kiện ánh sáng. Đây là lựa chọn hoàn hảo cho người dùng yêu cầu hiệu năng cao, độ ổn định và trải nghiệm cao cấp.','iPhone 15 Pro Max','iOS',30000000,5,'8GB','6.7 inch OLED, 120Hz','ACTIVE','512GB',1),(2,'5000 mAh','Chính 200MP, Tele 10MP, Periscope 50MP, Ultra Wide 12MP','Snapdragon 8 Gen 3 for Galaxy','','2025-12-17 15:56:36.656535','Samsung Galaxy S24 Ultra là smartphone Android cao cấp nhất của Samsung, nổi bật với màn hình Dynamic AMOLED 2X sắc nét cùng bút S-Pen tiện lợi. Camera 200MP cho khả năng chụp ảnh chi tiết vượt trội, đặc biệt là zoom xa chuyên nghiệp. Máy sử dụng chip Snapdragon 8 Gen 3 for Galaxy, tối ưu hiệu năng và tiết kiệm pin. Galaxy S24 Ultra phù hợp cho người dùng yêu thích công nghệ, sáng tạo nội dung và làm việc chuyên nghiệp.','Samsung Galaxy S24 Ultra','Android 14',30000000,9,'12GB','6.8 inch Dynamic AMOLED 2X, 120Hz','ACTIVE','512GB',2),(3,'4610 mAh (sạc nhanh 90W)','Leica 50MP','Snapdragon 8 Gen 3','','2025-12-17 16:00:58.388907','Xiaomi 14 sở hữu thiết kế nhỏ gọn nhưng mang trong mình cấu hình mạnh mẽ với chip Snapdragon 8 Gen 3. Màn hình AMOLED 120Hz cho trải nghiệm hiển thị mượt mà, sống động. Camera hợp tác cùng Leica mang lại chất lượng hình ảnh chân thực và sắc nét. Với mức giá dễ tiếp cận trong phân khúc cao cấp, Xiaomi 14 là lựa chọn tối ưu cho người dùng cần hiệu năng mạnh và trải nghiệm cao cấp.','Xiaomi 14','HyperOS (Android)',19000000,8,'12GB','6.36 inch AMOLED, 120Hz','ACTIVE','512GB',3),(4,'4600 mAh (sạc nhanh 80W)','Chính 50MP, Tele 32MP, Ultra Wide 8MP','Dimensity 8200','','2025-12-17 16:07:27.716546','OPPO Reno 11 Pro gây ấn tượng với thiết kế thời trang, mỏng nhẹ cùng khả năng chụp ảnh chân dung nổi bật. Camera tele 32MP hỗ trợ chụp chân dung chuyên nghiệp với hiệu ứng xóa phông tự nhiên. Màn hình AMOLED 120Hz mang lại trải nghiệm giải trí mượt mà. Máy phù hợp với người dùng trẻ, yêu thích chụp ảnh, quay video và phong cách hiện đại.','OPPO Reno 11 Pro','ColorOS',15000000,10,'12GB','6.7 inch AMOLED, 120Hz','ACTIVE','256GB',4),(5,'5000 mAh','50MP','MediaTek Helio G99','','2025-12-17 16:09:08.714930','Samsung Galaxy A15 là smartphone phổ thông với mức giá dễ tiếp cận, đáp ứng tốt các nhu cầu cơ bản như nghe gọi, học tập và giải trí nhẹ. Máy sở hữu pin dung lượng lớn 5000mAh cho thời gian sử dụng lâu dài, cùng camera 50MP cho hình ảnh rõ nét trong điều kiện đủ sáng. Đây là lựa chọn phù hợp cho học sinh, sinh viên hoặc người dùng lớn tuổi.','Samsung Galaxy A15','',5600000,10,'6GB','6.5 inch PLS LCD','ACTIVE','',2),(6,'3279 mAh','Camera sau: 12MP + 12MP Camera trước: 12MP','Apple A15 Bionic','','2025-12-17 16:14:05.258664','iPhone 14 mang lại trải nghiệm ổn định, camera cải tiến và hiệu năng bền bỉ cho người dùng lâu dài.','iPhone 14','iOS',13000000,15,'6GB','6.1 inch OLED, 60Hz','ACTIVE','256GB',1),(7,'3227mAh','Camera sau: 12MP + 12MP Camera trước: 12MP','A15','',NULL,'','iPhone 13','IOS',10000000,10,'4GB','6.1\" OLED','ACTIVE','128GB',1),(8,'Pin: 3900 mAh Sạc: 25W','Camera sau:  Chính 50MP  Ultra Wide 12MP  Tele 10MP Camera trước: 12MP','Snapdragon 8 Gen 2 for Galaxy','','2025-12-17 16:22:53.344779','Galaxy S23 là flagship nhỏ gọn, mạnh mẽ với màn hình 120Hz mượt mà và camera chất lượng cao. Hiệu năng mạnh, chụp ảnh đẹp, phù hợp người dùng cần điện thoại cao cấp nhưng gọn nhẹ.','Samsung Galaxy S23','Android',21000000,10,'8GB','6.1 inch Dynamic AMOLED 2X, 120Hz','ACTIVE','256GB',2),(9,'Pin: 4500 mAh Sạc: 67W','Camera sau:  Leica 50MP  Ultra Wide 12MP  Tele 10MP Camera trước: 32MP','Snapdragon 8 Gen 2','','2025-12-17 16:24:38.807159','Xiaomi 13 là smartphone cao cấp có thiết kế nhỏ gọn, hiệu năng mạnh mẽ và camera Leica cho chất lượng ảnh chân thực. Đây là lựa chọn rất tốt trong phân khúc flagship Android giá hợp lý.','Xiaomi 13','Android (HyperOS)',19200000,10,'8GB / 12GB','6.36 inch AMOLED, 120Hz','ACTIVE','256GB',3),(10,'Pin: 4600 mAh Sạc: 80W','Camera sau:  Chính 50MP  Tele chân dung 32MP  Ultra Wide 8MP Camera trước: 32MP','Snapdragon 778G','','2025-12-17 16:26:17.807637','OPPO Reno 10 Pro nổi bật với thiết kế thời trang và khả năng chụp ảnh chân dung xuất sắc. Máy hướng đến người dùng trẻ, thích chụp ảnh, quay video và phong cách hiện đại.','OPPO Reno 10 Pro','Android (ColorOS)',11900000,10,'12GB','6.7 inch AMOLED, 120Hz','ACTIVE','256GB',4),(11,'Pin: 5100 mAh Sạc: 67W','Camera sau:  Chính 200MP  Ultra Wide 8MP  Macro 2MP Camera trước: 16MP','Snapdragon 7s Gen 2','','2025-12-17 16:28:03.726925','Redmi Note 13 Pro là smartphone tầm trung nổi bật với camera 200MP, màn hình đẹp và pin lớn. Phù hợp cho người dùng cần cấu hình mạnh, camera cao nhưng giá dễ tiếp cận.','Redmi Note 13 Pro','Android',8500000,10,'8GB / 12GB','6.67 inch AMOLED, 120Hz Độ phân giải: 1.5K','ACTIVE','256GB',3),(12,'3349 mAh','48MP + 12MP','Apple A16','','2025-12-17 16:32:51.427279','Thiết kế mới, camera 48MP sắc nét, hiệu năng ổn định.','iPhone 15','',19000000,10,'6GB','6.1\" OLED, 60Hz','ACTIVE','128/256/512GB',1),(13,'3274 mAh','Camera: 48MP + Tele','A17 Pro','','2025-12-17 16:34:38.808030','Flagship mạnh mẽ, khung titan cao cấp.','iPhone 15 Pro ','',26000000,10,'8GB','6.1\" OLED, 120Hz','ACTIVE','128–1TB',1),(14,'4000 mAh','50MP','Exynos 2400','','2025-12-17 16:36:04.860331','AI thông minh, màn hình đẹp, dùng bền.','Samsung Galaxy S24','',21500000,10,'8GB','6.2\" AMOLED, 120Hz','ACTIVE','256GB',2),(15,'5000 mAh','','Exynos 1280','','2025-12-17 16:37:20.567394','Giá rẻ, màn hình đẹp, pin trâu.','Samsung Galaxy A25','',6000000,10,'6GB','6.5\" AMOLED, 120Hz','ACTIVE','128GB',2),(16,'4610 mAh','Leica 50MP','Snapdragon 8 Gen 3','','2025-12-17 16:38:40.820225','Flagship nhỏ gọn, camera Leica cao cấp.','Xiaomi 14','',19800000,10,'12GB','6.36\" AMOLED, 120Hz','ACTIVE','256GB',3),(17,'5000 mAh','','Snapdragon 685','','2025-12-17 16:40:43.949391','Giá rẻ, màn hình AMOLED hiếm có.','Xiaomi Redmi Note 12','',5000000,10,'6GB','6.67\" AMOLED','ACTIVE','128GB',3),(18,'Pin: 5000 mAh','Camera: 50MP + Tele','Dimensity 7050','','2025-12-17 16:44:13.371129','Mô tả: Thiết kế đẹp, chụp chân dung tốt.','OPPO Reno 11','',10800000,10,'8GB','6.7\" AMOLED, 120Hz','ACTIVE','256GB',4),(19,'Pin: 5000 mAh','','Chip: Helio G85','','2025-12-17 16:45:50.070209','Mô tả: Phổ thông, pin khỏe, dễ dùng.','OPPO A38','',4500000,10,'6GB','Màn hình: 6.56\" LCD','ACTIVE','128GB',4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `admin_reply` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `rating` int DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqwgq1lxgahsxdspnwqfac6sv6` (`order_id`),
  KEY `FKpl51cejpw4gy5swfar8br9ngi` (`product_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKpl51cejpw4gy5swfar8br9ngi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKqwgq1lxgahsxdspnwqfac6sv6` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,NULL,'hàng ngon','2025-12-17 15:07:32.141265',5,'2025-12-17 15:07:32.141265',1,1,2);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `access_token` text,
  `log_out` bit(1) NOT NULL,
  `refresh_token` text,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2dylsfo39lgjyqml2tbe0b0ss` (`user_id`),
  CONSTRAINT `FK2dylsfo39lgjyqml2tbe0b0ss` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MTAxOSwiZXhwIjoxNzY1OTYxNjE5fQ.Wa0GMEXm4ZinKFel0OIxFcYWUfpCHGk9z5gre6MB5RRo1SX4J08zCpe_s3geMjWV',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MTAxOSwiZXhwIjoxNzY2MDQ3NDE5fQ.qJYLWua8fUAy-4P6WpXxz_gStKvvOspIyFAcu7rO0DcJVzZeKhg4cqOzb9uxoXbo',1),(2,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MTE4MSwiZXhwIjoxNzY1OTYxNzgxfQ.unmdLiEMeF_IRsd_aVd1ljIthPq9gGGR9OCn3aF7Fvb8whCr28eKRXZ1nG9LQQx8',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MTE4MSwiZXhwIjoxNzY2MDQ3NTgxfQ.y1fkGDRwDFY62O1Y7MFkPZxIgVtBLI5gi-EBSIlAdnd9TmwLCOhc3QnPYe2Bgv2j',1),(3,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MTUwMiwiZXhwIjoxNzY1OTYyMTAyfQ.GklhDk8xTm0w8za3jPmzfnG32JFVn449Lq_qCO-WqUWByjHrJDeR5Sk-BsomGPfc',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MTUwMiwiZXhwIjoxNzY2MDQ3OTAyfQ.rEiDj67BokWelyALDpublkdsjcI9h7A9gWAS0FYkItBAWwgliSb-D0cWG-lrv2sY',1),(4,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MjMyMSwiZXhwIjoxNzY1OTYyOTIxfQ.ZOU0gK-cAIh9NqBMNWmKY-Gir8w1DvnnWOVUHA1RzULBpHrlNABg5Pogt1ko6lNa',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MjMyMSwiZXhwIjoxNzY2MDQ4NzIxfQ.q6YMsH4iISaj32KpM43tQJy2ZcSnHaavxQPKFoT769sHMEcv5ZRyrq_8wLQ4yrCi',1),(5,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MzE2MiwiZXhwIjoxNzY1OTYzNzYyfQ.EfeMoRCQbfeHqCNixFqxPFzTVampq2_BjtF4CKh8QXCRBqp-5ObcANavZw1BumgM',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MzE2MiwiZXhwIjoxNzY2MDQ5NTYyfQ.Enww_nKNMQaYhQcTN6sIAl-tRaVL_Bn4tLo-cIjaxjs4J-1mQgeUYT6_Ekj_1bg6',1),(6,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MzkwMywiZXhwIjoxNzY1OTY0NTAzfQ.k36b4hhEiIsAwGWcH6m8ddszyMSLoN0UrONwVshBffVoviU9-it9WmNJYCS95if1',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2MzkwMywiZXhwIjoxNzY2MDUwMzAzfQ.OK_TUOo1X8oAbAugr52dHEqaIGm4PCMQKIVnJCnBI0SIdn5ht1dJDLKkSqrOsRi-',1),(7,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2NDU5OCwiZXhwIjoxNzY1OTY1MTk4fQ.D2NzliSSnU3On0l90c9q3mRGXos5b29HWepi96oJ3pQfAMlyZCkp_sgKsDZPWHCz',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2NDU5OCwiZXhwIjoxNzY2MDUwOTk4fQ.fFB5g_lbcFDyuzPxoTs_BYF9rY3rkZezM4hksWRbOdJ3VE0nV4VzK5dktXMiiWAy',1),(8,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2NTAzNiwiZXhwIjoxNzY1OTY1NjM2fQ.fCvaYk4-51pzTuLCZ5tBCq-uRQU87EffABFTL0KQEe_5QyoLxpYpY7zKO-eEjIiw',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk2NTAzNiwiZXhwIjoxNzY2MDUxNDM2fQ.38Wa0GcstlFgDpJndpoDm7m4JFbtzrozGUF1jHL461YHWx_ZVFzqXE-4uH04esig',1),(9,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTY1Njc3LCJleHAiOjE3NjU5NjYyNzd9.IPzfnGiVWluFyIevXlP_xgB0eVAR0mxZueFJMlVHJfeVzXXvBUEnjxE1CdBEgllK',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTY1Njc3LCJleHAiOjE3NjYwNTIwNzd9.CIoOXLWphOrU3mKCJQdU7ltq1hyjP34YZOKwHoZ_3v3AhXAN1y3bq5ktPFzTuqvy',2),(10,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTY2MzUzLCJleHAiOjE3NjU5NjY5NTN9.Khl-5z6-WtRfPFqMhF1sR_3Ci-LoDIAvQ7L3ANOd5797Qdpj5eE7uT0rKlrmaQb9',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTY2MzUzLCJleHAiOjE3NjYwNTI3NTN9.WbJWSD38ax8BDaYfgmNi9Lo4IWqUI9f-YiU1LWr6IHkUgmD_4rr27FMkFwQhHsHj',2),(11,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTgyNTU2LCJleHAiOjE3NjU5ODMxNTZ9.pw3wy3ufTRMDkQFrIog9VPI5OkWBGsX8o5DLrWPolute3H62wmn74LZhTKqeUIpU',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTgyNTU2LCJleHAiOjE3NjYwNjg5NTZ9.GdP68O06OPpqCMqRGOsTWhKp086bES7AVKz7wL0Yx_rtD3UQVjrvNrbyuU1tQjnc',2),(12,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4MjYxNSwiZXhwIjoxNzY1OTgzMjE1fQ.SVd1ZvPEq6ut6NzclFSbxA8KpBlZjySVWOLgAFwI3zJKQCLqkFBUdJDTqwdC8FOE',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4MjYxNSwiZXhwIjoxNzY2MDY5MDE1fQ.r3efqY7PKCT39zPjYDqDapa8T6yOMqlhz8NLuE9IvNV3LcZ0uKgwWOzD3qnflytr',1),(13,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4NDAwNywiZXhwIjoxNzY1OTg0NjA3fQ.wepIQtvVwP82XEW1D-n5OkhLEfv1PHpHoqCW16v-cIBpHKoOleifD0pYhwWkzVVN',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4NDAwNywiZXhwIjoxNzY2MDcwNDA3fQ.rks6ca4PMlu09e9C3804HoY_tLfu_Bb7D_gJ4MVwJnU9qBs9ECAziNML9pwnIUgA',1),(14,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4NDAyNywiZXhwIjoxNzY1OTg0NjI3fQ.FbDjw7o88P3WNw-tZt4YzzNXR3lqibFsd9mBLKKSfhOAQqiib9cobp9z4JKGLKGC',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4NDAyNywiZXhwIjoxNzY2MDcwNDI3fQ.jfAsbR-pZfO3p_4OPoKrJoVnUydbjSmKT7-UdNyfpnUjtaWtROsNlADV6d2JmANP',1),(15,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg0MDM2LCJleHAiOjE3NjU5ODQ2MzZ9.KXhE_pNXnAkNhxfv9nhv45_O65UlFvKZqVvfnpNTNlnr-fZinn_hi4fWV7cpfZOy',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg0MDM2LCJleHAiOjE3NjYwNzA0MzZ9._HQ8MagXCWATQtQY4xstHgNySzHR2lMkf0nM1Ei2zM1qiHyWBIX6mu_TsjHKh0yZ',2),(16,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg0NzIwLCJleHAiOjE3NjU5ODUzMjB9.L-_nkKzgGwPVUjbLCQWmgf7wuPYr00uXSTezPZ4z_4DgbScs4XykFY3bXtALffdl',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg0NzIwLCJleHAiOjE3NjYwNzExMjB9.-r8MG7AdAIzPy0WvIYZEQngyiLMQx0ieTyDKVhvjywsHbzpArSUR5EMNnbnjnQWd',2),(17,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4NDgyMiwiZXhwIjoxNzY1OTg1NDIyfQ.2EWOxnL-LozyUnatAxJAlTEhpD3QC1Vjii0Fy8nLRatVdC_vDhN2bPEGHySet4Ei',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NTk4NDgyMiwiZXhwIjoxNzY2MDcxMjIyfQ.iYtuMBq3nZeySXZmM7IhX2DofxNTZEmpZICdUD60Kv6CwF-C-prtjgQiOVS1vdPa',1),(18,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg1MzA0LCJleHAiOjE3NjU5ODU5MDR9.ybSURnZMs6zPJZKTAe0zeazNDr9_EhZfAQV_SEk539Xnlb7THyHAv-TrugHy3XbL',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg1MzA0LCJleHAiOjE3NjYwNzE3MDR9.2O6yaMUJ7MgZb4t6FNq-SMqOHJ2Sji29juD0FlHkXCbie26iOLiNBfnV55Z8JQf9',2),(19,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg1OTY1LCJleHAiOjE3NjU5ODY1NjV9.O-68M9m4ysPDWv3mk6_LcbZNFpPLhLfxNhLPHVGM3X6k3vsH9CKxuyReeEaIzmEn',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg1OTY1LCJleHAiOjE3NjYwNzIzNjV9.tHBYepGmZ9zpa6RkFRkmzZbJdZXfteMWk1oEsh-TaiiHbFriUfwVE2-21eWqyc6y',2),(20,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg3ODQzLCJleHAiOjE3NjU5ODg0NDN9.7vUzXaJLG8rzIS4j4SBqohjjZXIC9u090mOsp-ID3knahxwAiitxdWAU_OjLIE02',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg3ODQzLCJleHAiOjE3NjYwNzQyNDN9.ooowveB3vgkRtnMl3SlO7buHcHxSENC1ipY2FYbNNFjZ4DcgcA0Jqc3tRlpC9XlO',2),(21,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg4Nzc2LCJleHAiOjE3NjU5ODkzNzZ9.EXmUSRXhjDtntHjTItgWrnhhXerJKVH_5AV9nGW1qhOCD7Z9hlqiH3MVo0MUvn2_',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg4Nzc2LCJleHAiOjE3NjYwNzUxNzZ9.QtGpqO6gidVYseF6kZTlapOOlU3WOd3XwnQ3-Ev-7a7lucIX1FMBHIOK1IB2fWGC',2),(22,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg5NDA3LCJleHAiOjE3NjU5OTAwMDd9.YE-Cr32ve0NMzgGziPUlBdolCo1bzCx_wVztoBZr-IGEFA6Ew3TNT3Fkf0ODMta5',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY1OTg5NDA3LCJleHAiOjE3NjYwNzU4MDd9.o5NIEBjjm40Tcj_t5YRk5Kr3BME0a9y4PJiPV9cKASyIhbVrUHIe1sCquEmBe17X',2),(23,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4MzIyMCwiZXhwIjoxNzY2MDgzODIwfQ.lCU2Zfydu5cWPjh6H3Osbq9jCFTo-Jlrd9XAjD48VOdStqe3dPE_RUK2PBrLwu6m',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4MzIyMCwiZXhwIjoxNzY2MTY5NjIwfQ.mf71Qfc8ht8r3jmUwUyzhs5KBIKqK6W2RZ1-6aFv6NmILk2ixPYvcYE5Pit9LSfP',1),(24,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4MzMzMSwiZXhwIjoxNzY2MDgzOTMxfQ.1TS0LLkaLw-niwkHvgedIlRxwTOuNhF_nJIGNDC4cjdqooIxjfANOBr-tAgrDLHy',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4MzMzMSwiZXhwIjoxNzY2MTY5NzMxfQ.Pmj-IeFRJKJnmtO3P2XDdaMXoE859BlAe45-9sLTdkIp6s_daRwNcvP4iSUkSU8Y',1),(25,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NDUzOCwiZXhwIjoxNzY2MDg1MTM4fQ.YfoyjI89CJ8VQiqBZCCpSQU8XvbmjM53aaQcX2s1o50iN_QvCeYO-MPhJGl6unTw',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NDUzOCwiZXhwIjoxNzY2MTcwOTM4fQ.tKjp_SHjnOJKYK5Mm_gEr9V2zoEgsFwAUHR-99W68nIE1dp_Uk1rGSs8v7ITIiAz',1),(26,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NDcwNywiZXhwIjoxNzY2MDg1MzA3fQ.LKpf3_WcfjyCy2G_z2bAjuAhpZP0UyYFhx_l_tpLUaR0RV4AlBAP1-GGKMFwSS3v',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NDcwNywiZXhwIjoxNzY2MTcxMTA3fQ.EiL4KKydYTRYUJTKIXJadeoiv8L9_lx3Euzc5Gb5rPbLv8tgYDNKDXOE9CtOWvIA',1),(27,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NDg5OSwiZXhwIjoxNzY2MDg1NDk5fQ.b-vHNuBj-bQfxnPLrD2-P7tOnjRM07qRIRgNbpLf3zpRRbnbjKa4E1WCjkptPh3b',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NDg5OSwiZXhwIjoxNzY2MTcxMjk5fQ.Y2IUgH5dTCmxiMRXu_k67yyWjYnqc9xAuJnr8MryhaC111IuXvw9rCirZCj09Tmp',1),(28,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NjI4NSwiZXhwIjoxNzY2MDg2ODg1fQ.xdenv_3uNNT78-WCjWAXBxZl2Fcjl9sVp_2QwfRitzYW1_ghs6wZRYKGNoNgFz48',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4NjI4NSwiZXhwIjoxNzY2MTcyNjg1fQ.q8cYLyWCcwKza__u5v62gikksRkTAE4-IXFZ9u-0TuYQtTkLxZah4BQMJgUVCuB1',1),(29,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MDg3NjI1LCJleHAiOjE3NjYwODgyMjV9.ebm6O8U1Zx-Jlo8tdJJSP-u5aNoGDla5OCCD4ryhy8Q763_9oz0lsw27yjOrICGD',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MDg3NjI1LCJleHAiOjE3NjYxNzQwMjV9.LQqVscYT96ibGG5-wsiOtxm5y3R56lfx9vP93Lo5lqxmq-61QYvH6G5cgM5Lt5xb',2),(30,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4ODIxOSwiZXhwIjoxNzY2MDg4ODE5fQ.8pr_bQD1RZ7pcH6VjW-gHmxenSuy_8AKj3POA6OO5L05_1WDO__mhi3mKDPZF5_z',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4ODIxOSwiZXhwIjoxNzY2MTc0NjE5fQ.ssvhQiwrMlAiidAikz6L3KHU1TUJt9eo7XfoxjIvfccet6yfHZyne0mAnV5QNqji',1),(31,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4ODIzMCwiZXhwIjoxNzY2MDg4ODMwfQ.cfMoV3_ysd9vfhj1J8ERoMlugoL5G1FVSDqbCuobIVV4QvNzzIAGHFwhDqZk7Zxq',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4ODIzMCwiZXhwIjoxNzY2MTc0NjMwfQ.Qyvh_rhRbkfenrFi01u2hZUjfEp65HQIefjzj3sDA7mxqPnZwXgLv3MwDSZ2D1yA',1),(32,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4ODk3MywiZXhwIjoxNzY2MDg5NTczfQ.la6AQFzoC_NOVfkt_7KWoXNQ0OP2wqueCeUzB87WlmAFp7laoujmtCJcfwI_b4-9',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA4ODk3MywiZXhwIjoxNzY2MTc1MzczfQ.-iVsVlmeZIZ16JX_0e_o-y9HHCcJPlCjG57A2BQSUrLENaR03E5ZMS4vHbt2GBOC',1),(33,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MDkwODUyLCJleHAiOjE3NjYwOTE0NTJ9.hOJ19ECKUgOQoZ5j7XRJFiHSs-BpOKgIh_2N4VhPlJnCytpxcZ--un_aNqFB0xiD',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MDkwODUyLCJleHAiOjE3NjYxNzcyNTJ9.iZlxrsoy15KIGfmo1iJPl_NaFhkY7y2mL6GWlRdoyVfwgoZb9O8dJNX9w7Bru8Ky',2),(34,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MDkxMjA2LCJleHAiOjE3NjYwOTE4MDZ9.AVW2yEpU07fgNOKUt1yrNJUGrrnZHsRX4whLKdZKT2vv0GGObdgWjxOlkr8K_bXm',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MDkxMjA2LCJleHAiOjE3NjYxNzc2MDZ9.cSOn_Ugttu_nc0_7_ivZOKYceb2kFlIIG3eFGrDeyA7ag9-Mb82M9inxyH16nip5',2),(35,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA5MTI4OCwiZXhwIjoxNzY2MDkxODg4fQ.xKVoWVKyYTPq5PxLlZwGwsqYDYAtomSKnWlW5ESjsfTCW_1puW4SxOKRa1G3DoPc',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjA5MTI4OCwiZXhwIjoxNzY2MTc3Njg4fQ.Qg-zEbvfyCFO444s1S_7_eHFaLgyGdsu2rDSsfIyF58DQwSm0voM3sJJrRCS4FVk',1),(36,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEwODA1NSwiZXhwIjoxNzY2MTA4NjU1fQ.QKG05OvBpW7UZXpy3c4DX0Gcz35yL8aFkkmCk-BHwGaY48ggWofpdYXpONmp3PxV',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEwODA1NSwiZXhwIjoxNzY2MTk0NDU1fQ.7kRQxUX2uTbt6TPuVS33ouAmzkxGniz4bLHPM22DwMxBlPprqbFOBSAQq5oG16Rc',1),(37,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEwOTM0NSwiZXhwIjoxNzY2MTA5OTQ1fQ.FheLD5XWIa5c526gS-sO76UkK0mdpIYwiXkaDMknsNN4P_3FXhp5AkqYDBogqAtI',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEwOTM0NSwiZXhwIjoxNzY2MTk1NzQ1fQ._uuBfv4V_dQbDFNLAd4igObcHMVtv5MPSchgIx9Vi8hzxHMmJRyha2CV_lAD9X5N',1),(38,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjExMTgyMiwiZXhwIjoxNzY2MTEyNDIyfQ.3ey_nFxbgSNNc3D_G4C5n2IScBKbVYrRNhlAATwykp9V3LnDmKnSp1TllLzfBkKZ',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjExMTgyMiwiZXhwIjoxNzY2MTk4MjIyfQ.-yPTpqKkf-W00t3N9wKPN1xmuYKFjlrgZRpt9E84InzxRZrnPT6FhTScJrYOBpqI',1),(39,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIwMjIyLCJleHAiOjE3NjYxMjA4MjJ9.4NJohW7SiO6PATuJ1ucqm8jWE_9N506EqFNn_pY2dajTYRvHq07DrtzNRPpkYSiS',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIwMjIyLCJleHAiOjE3NjYyMDY2MjJ9.MDmRZqm5VuoJRdZhI1icvXV-jR5XUHiFYLccJvePJyrZxkGWuOIt1eiCR-G7IBno',2),(40,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMDI1OCwiZXhwIjoxNzY2MTIwODU4fQ.NmljUKxnWToDUvZT7DWG6APZeYdUcb_s0GhGIU5QgJJvnmSpG7IbdreIAOH9j3C2',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMDI1OCwiZXhwIjoxNzY2MjA2NjU4fQ.fJ3y3t9cRhMjTvJPtdOR9OVt9H0UhXNYMQb9GUR--BRtDFDHqW_q39dUq9T-ZlvA',1),(41,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIxMTQyLCJleHAiOjE3NjYxMjE3NDJ9.ocr_Rbyxx7YM8SQJ1HgMDywbq4dHaR9FvfHL7iFhL2LjFUQ1hcwtWQFGhkErE0-R',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIxMTQyLCJleHAiOjE3NjYyMDc1NDJ9.LkYJeRPRG9Z6NFjtC8krQ8Y9rnjwqJ4sthFhPTA4bOQJJ3SJewg9J2qglOgWZB_-',2),(42,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMTI0NywiZXhwIjoxNzY2MTIxODQ3fQ.w4oA4TFhEgZx5gCbP4ngwgSCQYDKCP4UCmD1RHAL27SvgdXEbwmC0bucI1WMjyjh',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMTI0NywiZXhwIjoxNzY2MjA3NjQ3fQ.EyFfzsHmxe3IzI-9Or7LPWUYavsxa544yfp-D2ffqfx7iFs4CxwTMUP79ioHaEjh',1),(43,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMjA0OCwiZXhwIjoxNzY2MTIyNjQ4fQ.Ow3zx30E64KT4MO126L-JMNWpUWV9ec7qCBdp1pI7YV8gKuNT5JBOK4TTSDwEJf8',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMjA0OCwiZXhwIjoxNzY2MjA4NDQ4fQ.Wf5AEWnuXDLxnW_LPlwq1cFV_QD4NN0m8ccU2ScOXRTA3Qox1ZwTXvfNNz9kct-i',1),(44,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIyMzczLCJleHAiOjE3NjYxMjI5NzN9.ccJyucoTFVafq9yVyc93SV-V8uDBm-HZVLV191mk-xgxM4d3J4t0QWFb0a4uPaPG',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIyMzczLCJleHAiOjE3NjYyMDg3NzN9.wpCxB27y3-q0DPtdFLdUzXp68FWXn9z8tCvcSIyth84y4kgoDAcW6av6M0tjaZ_n',2),(45,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIyNDUzLCJleHAiOjE3NjYxMjMwNTN9.pq5vn-C-6G0ddxY6Xc09Tl0ovWYtSRq6YZnaWTaP6vQ1bUyIiWkzDX2e4hs5JtRl',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIyNDUzLCJleHAiOjE3NjYyMDg4NTN9.rpo-EywfZjOh73eb3xcnD0CAsKchWyH45Vt1cB7fYSjh8fsAgpinTcnSOePcyM1C',2),(46,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIzMDk0LCJleHAiOjE3NjYxMjM2OTR9.NTezaNMfaXPuLvaCL4GbRV89kmhVPh7hki527X4JfVUzqCCrAPdifOzo77LccOmv',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIzMDk0LCJleHAiOjE3NjYyMDk0OTR9.BMcl7Yr0yr5YSMRoAvhujdqqgvUScQ9sbjfgfPmTy1UvD52JgJZaoYloFad0tVlV',2),(47,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMzIxMSwiZXhwIjoxNzY2MTIzODExfQ.APQJfVEjqiuooNalTrsF8xRAQu3bnjABTtvK66gEdoacdI127yuRQ9LR3xlJoj7_',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMzIxMSwiZXhwIjoxNzY2MjA5NjExfQ.dxO-iZgx4AWPupKvGz0ZLnekfaLw_EPwpUDbILS5SlbDuhw9dR49aPM19gB5hKK6',1),(48,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMzQ5NCwiZXhwIjoxNzY2MTI0MDk0fQ.O1tWuT-ioYliGZVii5Ut6C9PWOH8-W2q7of9mLSEbNXvJ9wDqCe9O2--XyCLuIsA',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyMzQ5NCwiZXhwIjoxNzY2MjA5ODk0fQ.lZqUu5tlgRD17jpgTi45m0mMRHdO-qiIOhxdzUaLC4NGVKKg37JyqCGQX3OwSf8V',1),(49,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIzNzM2LCJleHAiOjE3NjYxMjQzMzZ9.5uvGdkHPGD_SmpBQGX-fxL86rPjbSkIH1G81LU7NKB3Yx6AUBtkIJvIV2G96l121',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTIzNzM2LCJleHAiOjE3NjYyMTAxMzZ9.ZOPUh68cxyoN9Zmr9-NoGo0ji0efLaSm-w9gp5FNr9x-tA8-8sjGn9MvWSDbKxAZ',2),(50,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyNDM5MywiZXhwIjoxNzY2MTI0OTkzfQ.zChgoldrfVaXvD817qQkBIVsDAz6Wyzc-NM-cjxgA94Q-_rSPFtfv7XJM1ueAnOH',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjEyNDM5MywiZXhwIjoxNzY2MjEwNzkzfQ.xdGqWks9yFbtrDzFOJ4C_pIcAj_onzb3Zdgw9YJieihRZuQ8MMmMnyl8a9LcDiB7',1),(51,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTg4NTgwLCJleHAiOjE3NjYxODkxODB9.FKDU7FNukSTHtE0GHPa3ZKwzXQUi4Ll4jO94f1d4DRC2a04PBh6rveYoQAsxUxUY',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTg4NTgwLCJleHAiOjE3NjYyNzQ5ODB9.xQ3ytcCNxPz5-z7tVNRgE6PnOz0Gu7xxheCNael0TsU-uVBv3ziNP6KqXpxGOEnQ',2),(52,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTg5NDY1LCJleHAiOjE3NjYxOTAwNjV9.hsmL8fMGK2bwc1rMWk7GPkAjo7jSRyG6F2Sh9JR1zGREd0uC4qD1s8ggf5WP0aPI',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTg5NDY1LCJleHAiOjE3NjYyNzU4NjV9.vgEUxIVrWf3pMS_ENgqVVhjRXcidPsY7l2h-P8mBWzZVE4I5xHQfx7VAEAME6J5M',2),(53,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE4OTc5NCwiZXhwIjoxNzY2MTkwMzk0fQ.ISrb5TTp8TiIzjpHtOYhlQvUUbP4wv4RMLlDugf0YZmFGR99dQE9kL6MuFYoOKai',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE4OTc5NCwiZXhwIjoxNzY2Mjc2MTk0fQ.xwfek3rvFeJVSbp_MuH0MjVWB3ut7qM91yfdolluObPhGnsYeEXaHFu0fdpYV6I-',1),(54,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MDM3OSwiZXhwIjoxNzY2MTkwOTc5fQ.Gi7NlUCdahz1b4AUZdipNE3-CiaCOAT0kg3_8ZM9NRSU1Rksoo2g79R-ud3p68qu',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MDM3OSwiZXhwIjoxNzY2Mjc2Nzc5fQ.yAVtdBPoxlI7yNlyX9kKgigiG90EulrvFLGhIdq1FhM2Lu1_w7hODdY_FI9_5Qnl',1),(55,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MDc4MCwiZXhwIjoxNzY2MTkxMzgwfQ.VAtUvP5DlD_9WnV-oc8osMnPGAGolrEhVjgOsBlcrkJZRDdWRLY50WhuG6dIeVCG',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MDc4MCwiZXhwIjoxNzY2Mjc3MTgwfQ.mgW0JUWMLNXzF8pRQRwTbWB0RHpfLZg6eTpRBIGgSWhDzxGoUzKwJCOAr3_a_IXX',1),(56,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MDk3MCwiZXhwIjoxNzY2MTkxNTcwfQ.dDpBAeNMl5qHA6v1THYH9L4EHQzJkRNKBPNMhd3IeTrf3Qpk7SlUpqYccobKkCfV',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MDk3MCwiZXhwIjoxNzY2Mjc3MzcwfQ.fvl7BhewwPdAmDVr7PrcdK6HRUm5Vie-AIEPpqXe3qPNazXe_2ECik6RK7rkZ106',1),(57,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MTE3OCwiZXhwIjoxNzY2MTkxNzc4fQ.uV82fBtqginSb2GcjV9a5eDeFkMuzu_1iW7yRz6ele37vubukvJnuiyWGPRvaTyR',_binary '\0','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJraG9pbmdoaWVwY3VuZ2hvYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImZ1bGxOYW1lIjoibmd1eWVuIGhhaSBob2FuZyIsInBob25lIjoiMDgzMzA5MDkwMyIsImlhdCI6MTc2NjE5MTE3OCwiZXhwIjoxNzY2Mjc3NTc4fQ.E9xDyGmrydzBQfjASOxP9CPghqPA8umx8eBPozSLrWn-4SPurIhwDZcD1YtTd1E6',1),(58,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTkxNTIyLCJleHAiOjE3NjYxOTIxMjJ9.03u80YprsnYZdqDDQ1G-KCFI3MjsNesQwPU29C-Vhsp3ZaqwzUYdAyIlAWSHII-a',_binary '','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTkxNTIyLCJleHAiOjE3NjYyNzc5MjJ9.cQL-S_oA6cRogVvjEbZJk2BB7b2pAfr4FhtGQW5mp2_VNWAzwr9RZqk3GivsyJ5u',2),(59,'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTkzMTQ0LCJleHAiOjE3NjYxOTM3NDR9.Fgm7-v06UxFSm-HEqnfsF9204Of1ft1HTN1x_JIh5-aSG_2v50hDlT6YY5xclt-w',_binary '\0','eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJuZ3V5ZW5oYWlob2FuZzA5MDkyMDAzQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwicGhvbmUiOiIwODMzMDkwOTAzIiwiaWF0IjoxNzY2MTkzMTQ0LCJleHAiOjE3NjYyNzk1NDR9.gH5DxYXpAXrob52UV41JSOAJUYG9GmqaSKUSDNUwBMneplfgKnU9WSTjT1fPW9HD',2);
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'15 đường 52 hiệp bình chánh tp thủ đức',NULL,'khoinghiepcunghoang@gmail.com','nguyen hai hoang','MALE','$2a$10$qabySKMlCEbLri80rwyHSe3pQUFBV6rc9aQipHjfmKYwf22uKMH2a','0833090903','ADMIN',_binary ''),(2,'15 đường 52 hiệp bình chánh tp thủ đức','http://localhost:8080/uploads/userImages/051b9439-b131-4271-92f9-c3a98ccdfb42_b.jpg','nguyenhaihoang09092003@gmail.com','John Doe','MALE','$2a$10$BqSBqmzySagOhcswl9h10uoEkTALzODKkD.Jm3moLyLHNLnb6Bjg.','0833090903','USER',_binary '');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-20 10:06:28
