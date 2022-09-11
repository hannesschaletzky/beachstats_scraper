-- Table: public.Participations

DROP TABLE IF EXISTS public."Participations";

CREATE TABLE IF NOT EXISTS public."Participations"
(
    "Team_ID" integer,
    "Tournament_ID" integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Participations"
    OWNER to hannes;