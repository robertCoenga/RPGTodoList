/*
  Warnings:

  - You are about to drop the `PlayerSkill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `player_id` to the `Act` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Act` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `player_id` to the `Buff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `player_id` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActStatus" AS ENUM ('NAO_INICIADO', 'EM_ANDAMENTO', 'REMOVIDO', 'CONCLUIDO');

-- CreateEnum
CREATE TYPE "InventoryStatus" AS ENUM ('PLANEJADO', 'PENDENTE', 'REMOVIDO', 'PAGO');

-- DropForeignKey
ALTER TABLE "PlayerSkill" DROP CONSTRAINT "PlayerSkill_skill_id_fkey";

-- AlterTable
ALTER TABLE "Act" ADD COLUMN     "player_id" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ActStatus" NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActMilestones" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Buff" ADD COLUMN     "player_id" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Calendar" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Installments" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "player_id" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "InventoryStatus" NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PlayerStatus" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "player_id" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QuestType" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RpgClass" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "player_id" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TypeClass" ALTER COLUMN "updated_at" DROP NOT NULL;

-- DropTable
DROP TABLE "PlayerSkill";

-- AddForeignKey
ALTER TABLE "Buff" ADD CONSTRAINT "Buff_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Act" ADD CONSTRAINT "Act_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
