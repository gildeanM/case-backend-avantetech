/*
  Warnings:

  - You are about to drop the column `preco` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `price` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "preco",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
