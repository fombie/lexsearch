-- ----------------------------
-- Table structure for typical lexsearch dictionary
-- ----------------------------
DROP TABLE IF EXISTS `sowpods`;
CREATE TABLE `sowpods` (
  `Word` varchar(15)  NOT NULL,
  `WordSort` varchar(15) NOT NULL,
  `WLen` tinyint(2) NOT NULL,
  PRIMARY KEY (`Word`),
  KEY `wsort` (`WordSort`),
  KEY `wall` (`WLen`,`Word`),
  KEY `wwlen` (`WLen`)
) ENGINE=MyISAM DEFAULT CHARSET=ascii;