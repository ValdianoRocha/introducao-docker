-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "cargaHoraria" INTEGER NOT NULL,
    "valor" INTEGER,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);
