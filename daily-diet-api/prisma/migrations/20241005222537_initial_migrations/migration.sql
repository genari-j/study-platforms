-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `profiles_id_key`(`id`),
    UNIQUE INDEX `profiles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `profiles` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `profile_permissions_id_key`(`id`),
    UNIQUE INDEX `profile_permissions_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NULL,
    `profile_id` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `avatar` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
