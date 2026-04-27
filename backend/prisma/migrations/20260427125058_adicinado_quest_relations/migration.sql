/*
  Warnings:

  - You are about to drop the column `compelexity` on the `Quest` table. All the data in the column will be lost.
  - Added the required column `complexity` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "compelexity",
ADD COLUMN     "buff_id" INTEGER,
ADD COLUMN     "complexity" INTEGER NOT NULL,
ADD COLUMN     "skll_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_skll_id_fkey" FOREIGN KEY ("skll_id") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_buff_id_fkey" FOREIGN KEY ("buff_id") REFERENCES "Buff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
