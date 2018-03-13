# userCREATE DATABASE `Askie`;

CREATE TABLE `User` (
  `userID` int(12) NOT NULL AUTO_INCREMENT,
  `firstName` varChar(32) NOT NULL,
  `lastName` varChar(32) NOT NULL,
  `userName` varChar(32) NOT NULL,
  `password` varChar(32) NOT NULL,
  PRIMARY KEY (`userID`)
);

CREATE TABLE `Forum_User` (
  `memberID` int(8) NOT NULL AUTO_INCREMENT,
  `userID` int(12) NOT NULL,
  PRIMARY KEY(`memberID`),
  FOREIGN KEY(`userID`) REFERENCES `User`(`userID`)
);

CREATE TABLE `Forum_Host` (
  `hostID` int(8) PRIMARY KEY REFERENCES `Forum_User`(`memberID`),
  `admin` Boolean NOT NULL DEFAULT 1
);

CREATE TABLE `Forum` (
  `forumID` int(8) NOT NULL AUTO_INCREMENT,
  `forumName` varChar(32) NOT NULL,
  `className` varChar(32) NOT NULL,
  `classCode` varChar(8) NOT NULL,
  `creationDate` DATE NOT NULL,
  `classLocation` varChar(32) DEFAULT NULL,
  `hostID` int(12) NOT NULL,
  PRIMARY KEY(`forumID`),
  FOREIGN KEY(`hostID`) REFERENCES `Forum_Host`(`hostID`)
);

CREATE TABLE `Forum_Member` (
  `memberID` int(8) PRIMARY KEY REFERENCES `Forum_User`(`memberID`),
  `admin` Boolean NOT NULL DEFAULT 0,
  `forumID` int(8) NOT NULL,
  FOREIGN KEY(`forumID`) REFERENCES `Forum`(`forumID`)	
);

CREATE TABLE `Session` (
  `sessionID` int(8) NOT NULL AUTO_INCREMENT,
  `startTime` DATETIME NOT NULL,
  `endTime` DATETIME NOT NULL,
  `forumID` int(8) NOT NULL,
  PRIMARY KEY(`sessionID`),
  FOREIGN KEY(`forumID`) REFERENCES `Forum`(`forumID`)
);

CREATE TABLE `Question` (
  `questionID` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `postTime` DATETIME NOT NULL,
  `updateTime` DATETIME NOT NULL,
  `body` varchar (1024) NOT NULL,
  `annonymous` Boolean DEFAULT 0,
  `urgancy` int(8) NOT NULL,
  `sessionID` int(8) NOT NULL,
  `memberID` int(8) NOT NULL,
  PRIMARY KEY (`questionID`),
  FOREIGN KEY (`sessionID`) REFERENCES `Session`(`sessionID`),
  FOREIGN KEY (`memberID`) REFERENCES `Forum_User`(`memberID`)
);

CREATE TABLE `Response` (
  `responseID` int(12) NOT NULL AUTO_INCREMENT,
  `postTime` DATETIME NOT NULL,
  `updateTime` DATETIME NOT NULL,
  `body` varchar (1024) NOT NULL,
  `annonymous` Boolean DEFAULT 0,
  `sessionID` int(8) NOT NULL,
  `memberID` int(8) NOT NULL,
  `questionID` int(12) NOT NULL,
  `ratingUp` int(8) DEFAULT 0,
  `ratingDown` int(8) DEFAULT 0,
  `hostResponse` Boolean NOT NULL,
  PRIMARY KEY (`responseID`),
  FOREIGN KEY (`sessionID`) REFERENCES `Session`(`sessionID`),
  FOREIGN KEY (`memberID`) REFERENCES `Forum_User`(`memberID`),
  FOREIGN KEY (`questionID`) REFERENCES `Question`(`questionID`)
);
