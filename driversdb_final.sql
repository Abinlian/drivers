/*
Navicat MySQL Data Transfer

Source Server         : 系分
Source Server Version : 50555
Source Host           : 118.89.35.14:3306
Source Database       : driversdb

Target Server Type    : MYSQL
Target Server Version : 50555
File Encoding         : 65001

Date: 2017-06-11 09:52:00
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `cinema`
-- ----------------------------
DROP TABLE IF EXISTS `cinema`;
CREATE TABLE `cinema` (
`id`  int(11) NOT NULL ,
`location_id`  int(11) NULL DEFAULT NULL ,
`name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`rating`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`address`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `location`
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
`id`  int(11) NOT NULL ,
`name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)

;

-- ----------------------------
-- Table structure for `movie`
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
`id`  int(11) NOT NULL ,
`status`  enum('toshow','showing') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL ,
`name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`img_url`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`rating`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)

;

-- ----------------------------
-- Table structure for `movie_desciption`
-- ----------------------------
DROP TABLE IF EXISTS `movie_desciption`;
CREATE TABLE `movie_desciption` (
`id`  int(11) NOT NULL ,
`movie_id`  int(11) NULL DEFAULT NULL ,
`chinese_name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`english_name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`img_url`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`type`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`region`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`length`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`release_time`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`user_rating`  decimal(2,1) NULL DEFAULT NULL ,
`professional_rating`  decimal(2,1) NULL DEFAULT NULL ,
`box_office`  decimal(9,2) NULL DEFAULT NULL ,
`profile`  text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL ,
`actors`  text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL ,
`pictures`  text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `payment`
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
`id`  int(11) NOT NULL ,
`name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`price`  decimal(9,2) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)

;

-- ----------------------------
-- Table structure for `remark`
-- ----------------------------
DROP TABLE IF EXISTS `remark`;
CREATE TABLE `remark` (
`id`  int(11) NOT NULL ,
`user_id`  int(11) NULL DEFAULT NULL ,
`movie_id`  int(11) NULL DEFAULT NULL ,
`comment`  text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL ,
`rating`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`time`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`praise`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `reservation`
-- ----------------------------
DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation` (
`id`  int(11) NOT NULL ,
`user_id`  int(11) NULL DEFAULT NULL ,
`payment_id`  int(11) NULL DEFAULT NULL ,
`movie_id`  int(11) NULL DEFAULT NULL ,
`show_id`  int(11) NULL DEFAULT NULL ,
`phone`  int(11) NULL DEFAULT NULL ,
`remark`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`show_id`) REFERENCES `show` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `reserve_seat`
-- ----------------------------
DROP TABLE IF EXISTS `reserve_seat`;
CREATE TABLE `reserve_seat` (
`id`  int(11) NOT NULL ,
`resevation_id`  int(11) NULL DEFAULT NULL ,
`seat_id`  int(11) NULL DEFAULT NULL ,
`show_id`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`seat_id`) REFERENCES `seat` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`resevation_id`) REFERENCES `reservation` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`show_id`) REFERENCES `show` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `room`
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
`id`  int(11) NOT NULL ,
`cinema_id`  int(11) NULL DEFAULT NULL ,
`name`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `seat`
-- ----------------------------
DROP TABLE IF EXISTS `seat`;
CREATE TABLE `seat` (
`id`  int(11) NOT NULL ,
`room_id`  int(11) NULL DEFAULT NULL ,
`row_`  int(5) NULL DEFAULT NULL ,
`column_`  int(5) NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `show`
-- ----------------------------
DROP TABLE IF EXISTS `show`;
CREATE TABLE `show` (
`id`  int(11) NOT NULL ,
`room_id`  int(11) NULL DEFAULT NULL ,
`movie_id`  int(11) NULL DEFAULT NULL ,
`time`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`language`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`price`  decimal(9,2) NULL DEFAULT NULL ,
PRIMARY KEY (`id`),
FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
)

;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id`  int(11) NOT NULL ,
`username`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`password_hash`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`nickname`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`email`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`avatar_url`  varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`gender`  enum('male','female') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT 'male' ,
PRIMARY KEY (`id`)
)

;

-- ----------------------------
-- Indexes structure for table `cinema`
-- ----------------------------
CREATE INDEX `ref62` ON `cinema`(`location_id`) USING BTREE ;

-- ----------------------------
-- Indexes structure for table `movie_desciption`
-- ----------------------------
CREATE INDEX `ref72` ON `movie_desciption`(`movie_id`) USING BTREE ;

-- ----------------------------
-- Indexes structure for table `remark`
-- ----------------------------
CREATE INDEX `ref14` ON `remark`(`movie_id`) USING BTREE ;
CREATE INDEX `ref51` ON `remark`(`user_id`) USING BTREE ;

-- ----------------------------
-- Indexes structure for table `reservation`
-- ----------------------------
CREATE INDEX `ref6` ON `reservation`(`user_id`) USING BTREE ;
CREATE INDEX `ref60` ON `reservation`(`payment_id`) USING BTREE ;
CREATE INDEX `ref65` ON `reservation`(`movie_id`) USING BTREE ;
CREATE INDEX `ref66` ON `reservation`(`show_id`) USING BTREE ;

-- ----------------------------
-- Indexes structure for table `reserve_seat`
-- ----------------------------
CREATE INDEX `ref63` ON `reserve_seat`(`resevation_id`) USING BTREE ;
CREATE INDEX `ref74` ON `reserve_seat`(`show_id`) USING BTREE ;
CREATE INDEX `ref53` ON `reserve_seat`(`seat_id`) USING BTREE ;

-- ----------------------------
-- Indexes structure for table `room`
-- ----------------------------
CREATE INDEX `ref11` ON `room`(`cinema_id`) USING BTREE ;

-- ----------------------------
-- Indexes structure for table `seat`
-- ----------------------------
CREATE INDEX `ref12` ON `seat`(`room_id`) USING BTREE ;

-- ----------------------------
-- Indexes structure for table `show`
-- ----------------------------
CREATE INDEX `ref8` ON `show`(`movie_id`) USING BTREE ;
CREATE INDEX `ref9` ON `show`(`room_id`) USING BTREE ;
