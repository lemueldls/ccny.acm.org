ALTER TABLE "events" ALTER COLUMN "location" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "start" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "end" DROP NOT NULL;