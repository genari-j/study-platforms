-- CreateTable
CREATE TABLE `meals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `diet` BOOLEAN NOT NULL DEFAULT true,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `meals_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
