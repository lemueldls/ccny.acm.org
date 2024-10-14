ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "location" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_admin" boolean DEFAULT false NOT NULL;