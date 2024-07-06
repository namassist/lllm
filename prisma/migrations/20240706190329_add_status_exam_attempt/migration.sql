-- AlterTable
ALTER TABLE `exam_attempts` ADD COLUMN `status` ENUM('draft', 'publish') NULL DEFAULT 'draft';
