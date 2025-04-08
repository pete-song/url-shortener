CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"originalUrl" varchar NOT NULL,
	"shortenedUrl" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"visits" integer DEFAULT 0
);
