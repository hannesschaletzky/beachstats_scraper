-- Table: public.Teams

DROP TABLE IF EXISTS public."Teams";

CREATE TABLE IF NOT EXISTS public."Teams"
(
    "Team_ID" integer,
    "Player_1_ID" integer,
    "Player_2_ID" integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Teams"
    OWNER to hannes;