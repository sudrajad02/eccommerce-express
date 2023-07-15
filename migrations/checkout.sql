CREATE TABLE `checkout` (
  `checkout_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `checkout_account_id` bigint(20) DEFAULT NULL,
  `checkout_address` text DEFAULT NULL,
  `checkout_product_id` bigint(20) DEFAULT NULL,
  `checkout_amount_product` bigint(20) DEFAULT 0,
  `checkout_total_price` double DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `deleted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`checkout_id`),
  KEY `fk_checkouts_product` (`checkout_product_id`),
  KEY `fk_checkouts_account` (`checkout_account_id`),
  CONSTRAINT `fk_checkouts_account` FOREIGN KEY (`checkout_account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_checkouts_product` FOREIGN KEY (`checkout_product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci