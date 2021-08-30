SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE TABLE public.users (
	"_id" serial NOT NULL PRIMARY KEY,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL
);

CREATE TABLE public.user_sessions (
  "_id" serial PRIMARY KEY,
  "user_id" bigint,
  "created" timestamp,
  "ssid" varchar
);

CREATE TABLE public.types (
  "_id" serial PRIMARY KEY,
  "name" varchar

);

CREATE TABLE public.exercises (
  "_id" serial PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "type_id" bigint,
  "user_id" bigint,
  "init_weight" int,
  "init_reps" int,
  "init_sets" int,
  "last_weight" int,
  "last_reps" int,
  "last_sets" int
);

CREATE TABLE public.drills (
  "_id" serial PRIMARY KEY,
  "exercise_id" bigint,
  "weight" int,
  "reps" int,
  "sets" int,
  "rest_interval" int,
  "date" TIMESTAMP
);

ALTER TABLE public.user_sessions ADD CONSTRAINT "user_sessions_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");

ALTER TABLE public.exercises ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("type_id") REFERENCES  public.types("_id");
ALTER TABLE public.exercises ADD CONSTRAINT "exercises_fk1" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");

ALTER TABLE public.drills ADD CONSTRAINT "drills_fk0" FOREIGN KEY ("exercise_id") REFERENCES  public.exercises("_id");

INSERT INTO public.types (name) VALUES ('Arms');
INSERT INTO public.types (name) VALUES ('Legs');
INSERT INTO public.types (name) VALUES ('Core');
INSERT INTO public.types (name) VALUES ('Upper Body');
INSERT INTO public.types (name) VALUES ('Lower Body');
INSERT INTO public.types (name) VALUES ('Back');


INSERT INTO public.users (_id, name, email, password) VALUES ('123', 'Omar', 'omar@gmail.com', 'helloOmar');
INSERT INTO public.exercises (_id, name, description, type_id, user_id, init_weight, init_reps, init_sets, last_weight, last_reps, last_sets) VALUES ('123454321', 'omarB', 'bench press', '1', '123', '14', '13', '12', '11', '10', '9');
INSERT INTO public.drills (exercise_id, weight, reps, sets, rest_interval, date) VALUES ('123454321', '120', '20', '19', '30', current_timestamp);
INSERT INTO public.user_sessions (user_id, created, ssid) VALUES ('123', current_timestamp, 'OMARSSID');