CREATE DATABASE gis_database;

--\C create tables

CREATE TABLE dots(
  dot_id SERIAL PRIMARY KEY,
  site_name INT,
  latitude float ( 6 ),
  longitude float ( 6 ),
  rsrp float ( 4 )
);