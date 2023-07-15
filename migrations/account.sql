CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(64) DEFAULT NULL,
  `account_email` varchar(64) NOT NULL,
  `account_username` varchar(16) NOT NULL,
  `account_password` varchar(64) NOT NULL,
  `account_address` text DEFAULT NULL,
  `account_level` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `deleted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_email` (`account_email`),
  UNIQUE KEY `account_username` (`account_username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci