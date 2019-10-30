CREATE TABLE IF NOT EXISTS `interviewr`.`question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text`varchar(255) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(100) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


-- CREATE TABLE IF NOT EXISTS `interviewr`.`user` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `email` varchar(110) NOT NULL,
--   `cognito_user_id` varchar(200) DEFAULT NULL,
--   `pool_id` varchar(100) DEFAULT NULL,
--   `first_name` varchar(100) DEFAULT NULL,
--   `middle_name` varchar(100) DEFAULT NULL,
--   `last_name` varchar(100) DEFAULT NULL,
--   `role` varchar(100) DEFAULT NULL,
--   `status` varchar(50) NOT NULL DEFAULT 'Active',
--   `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
--   `created_by` varchar(100) DEFAULT NULL,
--   `modified_date` datetime DEFAULT NULL,
--   `modified_by` varchar(100) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );