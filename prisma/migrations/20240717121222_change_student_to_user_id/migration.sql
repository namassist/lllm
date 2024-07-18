/*
  Warnings:

  - You are about to drop the column `student_id` on the `discussions` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `replies` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `discussions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `replies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `discussions` DROP FOREIGN KEY `discussions_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `replies` DROP FOREIGN KEY `replies_student_id_fkey`;

-- AlterTable
ALTER TABLE `discussions` DROP COLUMN `student_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `replies` DROP COLUMN `student_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `reply` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `discussions` ADD CONSTRAINT `discussions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replies` ADD CONSTRAINT `replies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
