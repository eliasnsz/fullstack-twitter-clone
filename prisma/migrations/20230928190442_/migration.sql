-- AlterTable
ALTER TABLE "User" ALTER COLUMN "followers_count" DROP NOT NULL,
ALTER COLUMN "following_count" DROP NOT NULL,
ALTER COLUMN "tweets_count" DROP NOT NULL;
