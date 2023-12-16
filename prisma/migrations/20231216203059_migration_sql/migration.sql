-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_testClass_fkey";

-- DropForeignKey
ALTER TABLE "testEvents" DROP CONSTRAINT "testEvents_testClass_fkey";

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_testClass_fkey" FOREIGN KEY ("testClass") REFERENCES "testClasses"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "testEvents" ADD CONSTRAINT "testEvents_testClass_fkey" FOREIGN KEY ("testClass") REFERENCES "testClasses"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
