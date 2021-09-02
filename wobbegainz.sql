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

DROP TABLE IF EXISTS public.users cascade;
CREATE TABLE public.users (
	"_id" serial NOT NULL PRIMARY KEY,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL
);

DROP TABLE IF EXISTS public.user_sessions cascade;
CREATE TABLE public.user_sessions (
  "_id" serial NOT NULL PRIMARY KEY,
  "user_id" bigint,
  "created" timestamp,
  "ssid" varchar
);

DROP TABLE IF EXISTS public.types cascade;
CREATE TABLE public.types (
  "_id" serial NOT NULL PRIMARY KEY,
  "name" varchar
);

DROP TABLE IF EXISTS public.exercises cascade;
CREATE TABLE public.exercises (
  "_id" serial NOT NULL PRIMARY KEY,
  "name" varchar,
  -- "description" varchar,
  "type_id" bigint,
  "user_id" bigint,
  "init_weight" int,
  "init_reps" int,
  "init_sets" int,
  "init_rest" int,
  "last_weight" int,
  "last_reps" int,
  "last_sets" int,
  "last_rest" int
);

DROP TABLE IF EXISTS public.drills cascade;
CREATE TABLE public.drills (
  "_id" serial NOT NULL PRIMARY KEY,
  "exercise_id" bigint,
  "name" varchar,
  "type_name" varchar,
  "weight" int,
  "reps" int,
  "sets" int,
  "rest_interval" int,
  "date" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.user_sessions ADD CONSTRAINT "user_sessions_fk0" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");

ALTER TABLE public.exercises ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("type_id") REFERENCES  public.types("_id");
ALTER TABLE public.exercises ADD CONSTRAINT "exercises_fk1" FOREIGN KEY ("user_id") REFERENCES  public.users("_id");

ALTER TABLE public.drills ADD CONSTRAINT "drills_fk0" FOREIGN KEY ("exercise_id") REFERENCES  public.exercises("_id");

INSERT INTO public.types (name) VALUES ('Arms');
INSERT INTO public.types (name) VALUES ('Legs');
INSERT INTO public.types (name) VALUES ('Core');
INSERT INTO public.types (name) VALUES ('Upper Body');
INSERT INTO public.types (name) VALUES ('Calisthenics');
INSERT INTO public.types (name) VALUES ('Back');


-- INSERT INTO public.users (_id, name, email, password) VALUES ('1', 'Omar', 'omar@gmail.com', '$2b$10$e0koG1AfGhVgw6omM4oYj.EguJnoatErT8a0O5RkDkDQwM3pe7QUG');
-- INSERT INTO public.exercises (_id, name, type_id, user_id, init_weight, init_reps, init_sets, init_rest, last_weight, last_reps, last_sets, last_rest) VALUES ('1', 'Bench Press', '4', '1', '225', '8', '3', '1', '225', '8', '3', '1');
-- INSERT INTO public.drills (exercise_id, weight, reps, sets, rest_interval, date) VALUES ('123454321', '120', '20', '19', '30', current_timestamp);
-- INSERT INTO public.user_sessions (user_id, created, ssid) VALUES ('123', current_timestamp, 'OMARSSID');