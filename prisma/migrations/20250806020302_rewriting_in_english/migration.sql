/*
  Warnings:

  - You are about to drop the `Curso` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Curso";

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descripton" TEXT,
    "workload" INTEGER NOT NULL,
    "price" INTEGER,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
