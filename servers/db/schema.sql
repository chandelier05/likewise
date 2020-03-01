create table users (
    id serial primary key,
    email varchar(128) not null unique,
    first_name varchar(64) not null,
    last_name varchar(128) not null,
    pass_hash varchar(255) not null, 
    user_name varchar(255) not null unique, 
    photo_url varchar(128) not null
);