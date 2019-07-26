
  CREATE TABLE IF NOT EXISTS  ea_cities (
  id int(11) NOT NULL AUTO_INCREMENT,
  cityName varchar(255) NOT NULL DEFAULT '',
  stateId int(11) UNSIGNED NOT NULL ,
  countryId int(11) NOT NULL,
  latitude double NOT NULL DEFAULT '0',
  longitude double NOT NULL DEFAULT '0',
  CONSTRAINT cities_pk PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE IF NOT EXISTS ea_states (
  id int(11) NOT NULL AUTO_INCREMENT,
  stateName varchar(255) NOT NULL DEFAULT '',
  countryId int(11) NOT NULL,
  latitude double NOT NULL DEFAULT '0',
  longitude double NOT NULL DEFAULT '0',
  CONSTRAINT states_pk PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE IF NOT EXISTS ea_countries (
 id int(11) NOT NULL AUTO_INCREMENT,
  countryCode varchar(3) NOT NULL DEFAULT '',
  countryName varchar(52) NOT NULL DEFAULT '',
  localName varchar(45) NOT NULL,
  webCode varchar(2) NOT NULL,
  region varchar(26) NOT NULL,
  continent varchar(100) NOT NULL,
  latitude double NOT NULL DEFAULT 0,
  longitude double NOT NULL DEFAULT 0,
  surfaceArea float(10,2) NOT NULL DEFAULT 0.00,
  population int(11) NOT NULL DEFAULT 0,
  CONSTRAINT countries_pk PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;