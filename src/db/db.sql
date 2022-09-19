-- Extensions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main-Tables

CREATE TABLE users(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    age INT NOT NULL,
    is_free BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    author VARCHAR(64) NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tables for Triggers

CREATE TABLE archive_users(
    id uuid NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    age INT NOT NULL,
    is_free BOOLEAN NOT NULL,
    deleted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE archive_books(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    author VARCHAR(64) NOT NULL,
    user_id uuid NOT NULL,
    deleted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Functions for Triggers

CREATE OR REPLACE FUNCTION deleteUserFn()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN 

    INSERT INTO 
        archive_users(id, first_name, last_name, age, is_free)
    VALUES(OLD.id, OLD.first_name, OLD.last_name, OLD.age, OLD.is_free);

    RETURN OLD;

END
$$;

CREATE OR REPLACE FUNCTION deleteBookFn()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN

    INSERT INTO 
        archive_books(id, title, author, user_id)
    VALUES(OLD.id, OLD.title, OLD.author, OLD.user_id);

    RETURN OLD;

END
$$;

-- Triggers

CREATE TRIGGER deletedUsersTrigger
AFTER DELETE 
ON users
FOR EACH ROW
EXECUTE PROCEDURE deleteUserFn();

CREATE TRIGGER deletedBooksTrigger
AFTER DELETE 
ON books
FOR EACH ROW
EXECUTE PROCEDURE deleteBookFn();

