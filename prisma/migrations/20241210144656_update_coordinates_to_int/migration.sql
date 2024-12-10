/*
  Warnings:

  - You are about to alter the column `xCoords` on the `Target` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `yCoords` on the `Target` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Target" ALTER COLUMN "xCoords" SET DATA TYPE INTEGER,
ALTER COLUMN "yCoords" SET DATA TYPE INTEGER;
