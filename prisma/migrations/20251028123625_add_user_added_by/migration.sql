/*
  Warnings:

  - Added the required column `addedByUserId` to the `projectUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projectUsers` ADD COLUMN `addedByUserId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `projectUsers` ADD CONSTRAINT `projectUsers_addedByUserId_fkey` FOREIGN KEY (`addedByUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
