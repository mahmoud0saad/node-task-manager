-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,
    `projectId` INTEGER NULL,
    `priorityId` INTEGER NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_priorityId_fkey` FOREIGN KEY (`priorityId`) REFERENCES `priority`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
