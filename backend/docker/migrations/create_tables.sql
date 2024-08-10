CREATE TABLE Users (
    id serial primary key NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    user_name VARCHAR(256) NOT NULL
);


-- DO NOT REMOVE
-- MUST BE THE LAST STATEMENT IN THIS FILE
CREATE USER listen2gether;
CREATE DATABASE listen2gether
OWNER listen2gether;
