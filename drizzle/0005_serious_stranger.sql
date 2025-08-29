ALTER TABLE "sessions" RENAME COLUMN "id" TO "token";--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_token_hash_unique";--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "revoked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "token_hash";