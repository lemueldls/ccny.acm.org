ALTER TABLE "users" RENAME COLUMN "anonymous" TO "is_anonymous";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_anonymous" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "discord_id" text;