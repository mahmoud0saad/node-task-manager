-- CreateTable
CREATE TABLE `taskUsers` (
    `userId` INTEGER NOT NULL,
    `taskId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `taskId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `taskUsers` ADD CONSTRAINT `taskUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taskUsers` ADD CONSTRAINT `taskUsers_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
