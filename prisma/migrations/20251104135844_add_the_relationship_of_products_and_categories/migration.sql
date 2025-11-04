/*
  Warnings:

  - You are about to drop the `Produtos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Categoria" ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Produtos";

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "preco" DECIMAL(65,30) NOT NULL,
    "categoriaId" INTEGER,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
