CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id text PRIMARY KEY,
    first_name text not null,
    last_name text not null,
    email text not null,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text not null,
    name text NOT NULL,
    context text,
    context_other text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_persons_user_id ON persons(user_id);

CREATE TABLE dates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID not null,
    date date not null,
    time text not null,
    location text,
    location_other text,
    reflection jsonb not null default '{}'::jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_person FOREIGN KEY(person_id) REFERENCES persons(id)
);
CREATE INDEX idx_dates_person_id ON dates(person_id);