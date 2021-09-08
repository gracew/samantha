ALTER TABLE persons
ADD COLUMN archived boolean not null default false,
ADD COLUMN archived_at timestamp without time zone,
ADD COLUMN archive_reason text,
ADD COLUMN archive_reason_other text;