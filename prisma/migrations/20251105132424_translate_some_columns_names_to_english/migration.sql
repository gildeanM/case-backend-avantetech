/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `Produto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Produto" DROP CONSTRAINT "Produto_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "categoriaId",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;
