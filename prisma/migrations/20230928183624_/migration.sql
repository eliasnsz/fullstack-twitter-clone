-- AlterTable
ALTER TABLE "User" ALTER COLUMN "followers_count" SET DEFAULT 0,
ALTER COLUMN "following_count" SET DEFAULT 0,
ALTER COLUMN "tweets_count" SET DEFAULT 0,
ALTER COLUMN "birthday" DROP NOT NULL;
