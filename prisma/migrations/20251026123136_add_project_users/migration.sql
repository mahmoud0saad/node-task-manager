-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `project_ownerId_fkey`;

-- DropIndex
DROP INDEX `project_ownerId_fkey` ON `project`;

-- AlterTable
ALTER TABLE `project` MODIFY `ownerId` INTEGER NULL;

-- CreateTable
CREATE TABLE `projectUsers` (
    `userId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectUsers` ADD CONSTRAINT `projectUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectUsers` ADD CONSTRAINT `projectUsers_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
