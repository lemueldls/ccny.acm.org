DO $$ BEGIN
 CREATE TYPE "public"."event_kind" AS ENUM('workshop', 'hackathon', 'meeting');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"kind" "event_kind" NOT NULL,
	"location" text,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"description" text,
	"rsvp" text
);
