-- AlterTable
ALTER TABLE `exam_attempts` ADD COLUMN `advantage` TEXT NULL,
    ADD COLUMN `disadvantage` TEXT NULL,
    MODIFY `feedback` TEXT NULL;
