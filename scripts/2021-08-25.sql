CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text not null,
    question text not null,
    type text not null,
    archived boolean not null default false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_questions_user_id ON questions(user_id);