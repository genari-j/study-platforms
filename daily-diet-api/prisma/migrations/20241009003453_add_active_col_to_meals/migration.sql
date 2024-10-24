-- AlterTable
ALTER TABLE `meals` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true AFTER user_id;
