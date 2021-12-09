CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class_id" integer NOT NULL,
	"answers" integer NOT NULL,
	"total_score" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"user_class_id" integer NOT NULL,
	"question" varchar(255) NOT NULL,
	"tags" varchar(255) NOT NULL,
	"submition_date" varchar(20) NOT NULL,
	"answer_date" varchar(20),
	"user_answer_id" integer,
	"answer" varchar(255) NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"name" varchar(3) NOT NULL UNIQUE,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_tokens" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(36) NOT NULL UNIQUE,
	CONSTRAINT "user_tokens_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");


ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("user_class_id") REFERENCES "classes"("id");

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk2" FOREIGN KEY ("user_answer_id") REFERENCES "users"("id");


ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

INSERT INTO "classes" (name) VALUES ('T1');
INSERT INTO "classes" (name) VALUES ('T2');
INSERT INTO "classes" (name) VALUES ('T3');
INSERT INTO "classes" (name) VALUES ('T4');