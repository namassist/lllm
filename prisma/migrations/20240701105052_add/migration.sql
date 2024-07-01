-- DropForeignKey
ALTER TABLE `choices` DROP FOREIGN KEY `choices_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_instructor_id_fkey`;

-- DropForeignKey
ALTER TABLE `discussions` DROP FOREIGN KEY `discussions_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `discussions` DROP FOREIGN KEY `discussions_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment_courses` DROP FOREIGN KEY `enrollment_courses_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment_courses` DROP FOREIGN KEY `enrollment_courses_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `essay_answers` DROP FOREIGN KEY `essay_answers_attempt_id_fkey`;

-- DropForeignKey
ALTER TABLE `essay_answers` DROP FOREIGN KEY `essay_answers_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `exam_attempts` DROP FOREIGN KEY `exam_attempts_exam_id_fkey`;

-- DropForeignKey
ALTER TABLE `exam_attempts` DROP FOREIGN KEY `exam_attempts_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `exams` DROP FOREIGN KEY `exams_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `instructors` DROP FOREIGN KEY `instructors_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `multiple_choice_answers` DROP FOREIGN KEY `multiple_choice_answers_attempt_id_fkey`;

-- DropForeignKey
ALTER TABLE `multiple_choice_answers` DROP FOREIGN KEY `multiple_choice_answers_choice_id_fkey`;

-- DropForeignKey
ALTER TABLE `multiple_choice_answers` DROP FOREIGN KEY `multiple_choice_answers_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `questions_exam_id_fkey`;

-- DropForeignKey
ALTER TABLE `replies` DROP FOREIGN KEY `replies_discussion_id_fkey`;

-- DropForeignKey
ALTER TABLE `replies` DROP FOREIGN KEY `replies_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `topics` DROP FOREIGN KEY `topics_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `user_roles_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `user_roles_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instructors` ADD CONSTRAINT `instructors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `instructors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollment_courses` ADD CONSTRAINT `enrollment_courses_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollment_courses` ADD CONSTRAINT `enrollment_courses_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `topics` ADD CONSTRAINT `topics_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `exams_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `choices` ADD CONSTRAINT `choices_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_attempts` ADD CONSTRAINT `exam_attempts_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_attempts` ADD CONSTRAINT `exam_attempts_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `essay_answers` ADD CONSTRAINT `essay_answers_attempt_id_fkey` FOREIGN KEY (`attempt_id`) REFERENCES `exam_attempts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `essay_answers` ADD CONSTRAINT `essay_answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `multiple_choice_answers` ADD CONSTRAINT `multiple_choice_answers_attempt_id_fkey` FOREIGN KEY (`attempt_id`) REFERENCES `exam_attempts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `multiple_choice_answers` ADD CONSTRAINT `multiple_choice_answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `multiple_choice_answers` ADD CONSTRAINT `multiple_choice_answers_choice_id_fkey` FOREIGN KEY (`choice_id`) REFERENCES `choices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `discussions` ADD CONSTRAINT `discussions_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `discussions` ADD CONSTRAINT `discussions_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replies` ADD CONSTRAINT `replies_discussion_id_fkey` FOREIGN KEY (`discussion_id`) REFERENCES `discussions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `replies` ADD CONSTRAINT `replies_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
