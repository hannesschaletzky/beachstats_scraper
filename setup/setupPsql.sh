# login
sudo -u postgres psql

# create role hannes
CREATE ROLE hannes WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  NOCREATEROLE
  NOREPLICATION
  PASSWORD '123456';
 
# check if role exists
\du

# exit gui
\q

# change stuff in pg_hba.conf at etc/postgres/<Version>/main according to post: 
# https://stackoverflow.com/a/26735105/6421228


# login with user hannes into database postgres 
psql -U hannes -d postgres

# create database
CREATE DATABASE beachstats;

# connect to beachstats
\c beachstats

# see all databases
SELECT datname FROM pg_database;

# copy .env file to droplet

# go to repo and run migrations
npm run migrate up

# you should see this: 
--> Migrations complete!
