-- Table: public.Players

-- DROP TABLE IF EXISTS public."Players";

CREATE TABLE IF NOT EXISTS public."Players"
(
    "Date" date,
    "TeamID" integer,
    "Tournament_ID" integer,
    "Tournament_Category" text COLLATE pg_catalog."default",
    "Tournament_Location" text COLLATE pg_catalog."default",
    "Tournament_Rank" integer,
    "Tournament_Points" integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Players"
    OWNER to hannes;