CREATE TABLE Users (
    id serial primary key NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    user_name VARCHAR(256) NOT NULL
);

CREATE TABLE Friend_Requests (
    requestor INTEGER NOT NULL,
    target_user INTEGER NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(requestor, target_user)
);

-- DO NOT REMOVE
-- MUST BE THE LAST STATEMENT IN THIS FILE
CREATE USER listen2gether;
CREATE DATABASE listen2gether
OWNER listen2gether;
