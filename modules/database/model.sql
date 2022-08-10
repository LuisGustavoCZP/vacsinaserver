CREATE TABLE public.privilege (
	"id" serial NOT NULL,
	"name" varchar(40) NOT NULL UNIQUE,
	"level" integer NOT NULL,
	CONSTRAINT "privilege_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.user (
	"id" serial NOT NULL,
	"email" varchar(120) NOT NULL,
	"password" varchar(120) NOT NULL,
	"name" varchar(120) NOT NULL,
	"id_privilege" integer NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" integer NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	"deleted_by" integer NOT NULL,
	"deleted_at" TIMESTAMP NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.user_tilemap (
	"id" serial NOT NULL,
	"id_owner" integer NOT NULL,
	"name" varchar(120) NOT NULL UNIQUE,
	"size" integer NOT NULL,
	"map" varchar(1024) NOT NULL,
	CONSTRAINT "user_tilemap_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.user_tileset (
	"id" serial NOT NULL,
	"id_owner" integer NOT NULL,
	"size" integer NOT NULL,
	"pixels" integer NOT NULL,
	"space" integer NOT NULL,
	"tiles" varchar(256) NOT NULL,
	CONSTRAINT "user_tileset_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("id_privilege") REFERENCES "privilege"("id");

ALTER TABLE "user_tilemap" ADD CONSTRAINT "user_tilemap_fk0" FOREIGN KEY ("id_owner") REFERENCES "user"("id");

ALTER TABLE "user_tileset" ADD CONSTRAINT "user_tileset_fk0" FOREIGN KEY ("id_owner") REFERENCES "user"("id");