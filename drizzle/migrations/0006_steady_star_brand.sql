ALTER TABLE "accounts" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "accounts" RENAME COLUMN "providerAccountId" TO "provider_account_id";--> statement-breakpoint
ALTER TABLE "examples" RENAME COLUMN "domainCount" TO "domain_count";--> statement-breakpoint
ALTER TABLE "examples" RENAME COLUMN "imageBlurhash" TO "image_blurhash";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "imageBlurhash" TO "image_blurhash";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "siteId" TO "site_id";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "sessions" RENAME COLUMN "sessionToken" TO "session_token";--> statement-breakpoint
ALTER TABLE "sessions" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "sites" RENAME COLUMN "imageBlurhash" TO "image_blurhash";--> statement-breakpoint
ALTER TABLE "sites" RENAME COLUMN "customDomain" TO "custom_domain";--> statement-breakpoint
ALTER TABLE "sites" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "sites" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "sites" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "sites" DROP CONSTRAINT "sites_customDomain_unique";--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_siteId_sites_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sites" DROP CONSTRAINT "sites_userId_users_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "accounts_userId_index";--> statement-breakpoint
DROP INDEX IF EXISTS "posts_siteId_index";--> statement-breakpoint
DROP INDEX IF EXISTS "posts_userId_index";--> statement-breakpoint
DROP INDEX IF EXISTS "posts_slug_siteId_index";--> statement-breakpoint
DROP INDEX IF EXISTS "sessions_userId_index";--> statement-breakpoint
DROP INDEX IF EXISTS "sites_userId_index";--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_provider_providerAccountId_pk";--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "accounts_user_id_index" ON "accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_site_id_index" ON "posts" USING btree ("site_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "posts_user_id_index" ON "posts" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_site_id_index" ON "posts" USING btree ("slug","site_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_index" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sites_user_id_index" ON "sites" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "sites" ADD CONSTRAINT "sites_custom_domain_unique" UNIQUE("custom_domain");