CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text not null,
    goals jsonb not null,
    goal_other text,
    importance text not null,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_goals_user_id ON goals(user_id);