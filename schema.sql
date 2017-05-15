-- +---------------------------------------------------------
-- | MODEL       : 
-- | AUTHOR      : 
-- | GENERATED BY: Open System Architect
-- +---------------------------------------------------------
-- | WARNING     : Review before execution
-- +---------------------------------------------------------

-- +---------------------------------------------------------
-- | CREATE
-- +---------------------------------------------------------
CREATE TABLE `movie`
(
  id INT(11) AUTO_INCREMENT,
  status ENUM('toshow','showing'),
  name VARCHAR(64),
  img_url VARCHAR(64),
  rating VARCHAR(64),
  PRIMARY KEY (id)
);

CREATE TABLE `location`
(
  id INT(11) AUTO_INCREMENT,
  name VARCHAR(64),
  PRIMARY KEY (id)
);

CREATE TABLE `cinema`
(
  id INT(11) AUTO_INCREMENT,
  location_id INT(11),
  name VARCHAR(64),
  rating VARCHAR(64),
  address VARCHAR(64),
  PRIMARY KEY (id)
);

CREATE TABLE `room`
(
  id INT(11) AUTO_INCREMENT,
  cinema_id INT(11),
  name VARCHAR(64),
  PRIMARY KEY (id)
);

CREATE TABLE `show`
(
  id INT(11) AUTO_INCREMENT,
  room_id INT(11),
  movie_id INT(11),
  time VARCHAR(64),
  language VARCHAR(64),
  price DECIMAL(9,2),
  PRIMARY KEY (id)
);

CREATE TABLE `user`
(
  id INT(11) AUTO_INCREMENT,
  username VARCHAR(64),
  password VARCHAR(64),
  nickname VARCHAR(64),
  email VARCHAR(64),
  avatar_url VARCHAR(64),
  gender ENUM('male','female') DEFAULT 'male',
  PRIMARY KEY (id)
);

CREATE TABLE `remark`
(
  id INT(11) AUTO_INCREMENT,
  user_id INT(11),
  movie_id INT(11),
  comment TEXT,
  rating VARCHAR(64),
  time VARCHAR(64),
  praise INT,
  PRIMARY KEY (id)
);

CREATE TABLE `payment`
(
  id INT(11) AUTO_INCREMENT,
  name VARCHAR(64),
  price DECIMAL(9,2),
  PRIMARY KEY (id)
);

CREATE TABLE `reservation`
(
  id INT(11) AUTO_INCREMENT,
  user_id INT(11),
  payment_id INT(11),
  movie_id INT(11),
  show_id INT(11),
  phone INT(11),
  remark TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE `seat`
(
  id INT(11) AUTO_INCREMENT,
  show_id INT(11),
  price DECIMAL(9,2),
  PRIMARY KEY (id)
);

CREATE TABLE `reserve_seat`
(
  id INT(11) AUTO_INCREMENT,
  resevation_id INT(11),
  seat_id INT(11),
  PRIMARY KEY (id)
);

CREATE TABLE `movie_desciption`
(
  id INT(11) AUTO_INCREMENT,
  movie_id INT(11),
  chinese_name VARCHAR(64),
  english_name VARCHAR(64),
  img_url VARCHAR(64),
  type VARCHAR(64),
  region VARCHAR(64),
  length VARCHAR(64),
  release_time VARCHAR(64),
  user_rating DECIMAL(2,1),
  professional_rating DECIMAL(2,1),
  box_office DECIMAL(9,2),
  profile TEXT,
  actors TEXT,
  pictures TEXT,
  PRIMARY KEY (id)
);
ALTER TABLE room ADD CONSTRAINT ref11
  FOREIGN KEY ( cinema_id )
   REFERENCES cinema ( id );

ALTER TABLE seat ADD CONSTRAINT ref12
  FOREIGN KEY ( show_id )
   REFERENCES `show` ( id );

ALTER TABLE remark ADD CONSTRAINT ref14
  FOREIGN KEY ( movie_id )
   REFERENCES movie ( id );

ALTER TABLE remark ADD CONSTRAINT ref51
  FOREIGN KEY ( user_id )
   REFERENCES user ( id );

ALTER TABLE reserve_seat ADD CONSTRAINT ref53
  FOREIGN KEY ( seat_id )
   REFERENCES seat ( id );

ALTER TABLE reservation ADD CONSTRAINT ref6
  FOREIGN KEY ( user_id )
   REFERENCES user ( id );

ALTER TABLE reservation ADD CONSTRAINT ref60
  FOREIGN KEY ( payment_id )
   REFERENCES payment ( id );

ALTER TABLE cinema ADD CONSTRAINT ref62
  FOREIGN KEY ( location_id )
   REFERENCES location ( id );

ALTER TABLE reserve_seat ADD CONSTRAINT ref63
  FOREIGN KEY ( resevation_id )
   REFERENCES reservation ( id );

ALTER TABLE reservation ADD CONSTRAINT ref65
  FOREIGN KEY ( movie_id )
   REFERENCES movie ( id );

ALTER TABLE reservation ADD CONSTRAINT ref66
  FOREIGN KEY ( show_id )
   REFERENCES `show` ( id );

ALTER TABLE movie_desciption ADD CONSTRAINT ref72
  FOREIGN KEY ( movie_id )
   REFERENCES movie ( id );

ALTER TABLE `show` ADD CONSTRAINT ref8
  FOREIGN KEY ( movie_id )
   REFERENCES movie ( id );

ALTER TABLE `show` ADD CONSTRAINT ref9
  FOREIGN KEY ( room_id )
   REFERENCES room ( id );
