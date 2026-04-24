/*
  Warnings:

  - You are about to drop the column `typel_class_id` on the `RpgClass` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RpgClass" DROP CONSTRAINT "RpgClass_typel_class_id_fkey";

-- AlterTable
ALTER TABLE "Act" ALTER COLUMN "status" SET DEFAULT 'NAO_INICIADO';

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "status" SET DEFAULT 'PLANEJADO';

-- AlterTable
ALTER TABLE "PlayerStatus" ALTER COLUMN "energy" SET DEFAULT 5,
ALTER COLUMN "health" SET DEFAULT 10,
ALTER COLUMN "focus" SET DEFAULT 5,
ALTER COLUMN "level" SET DEFAULT 1,
ALTER COLUMN "xp" SET DEFAULT 0,
ALTER COLUMN "gold" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "RpgClass" DROP COLUMN "typel_class_id";

-- CreateTable
CREATE TABLE "RpgTypeClasses" (
    "class_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RpgTypeClasses_pkey" PRIMARY KEY ("class_id","type_id")
);

-- AddForeignKey
ALTER TABLE "RpgTypeClasses" ADD CONSTRAINT "RpgTypeClasses_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "RpgClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RpgTypeClasses" ADD CONSTRAINT "RpgTypeClasses_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
