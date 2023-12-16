-- CreateTable
CREATE TABLE "students" (
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "testClass" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testClasses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "block" INTEGER NOT NULL,
    "occurrence" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,

    CONSTRAINT "testUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testEvents" (
    "testClass" TEXT NOT NULL,
    "testDate" DATE NOT NULL,
    "id" TEXT NOT NULL,
    "testName" TEXT NOT NULL,

    CONSTRAINT "test_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_testClass_fkey" FOREIGN KEY ("testClass") REFERENCES "testClasses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "testClasses" ADD CONSTRAINT "testClasses_teacher_fkey" FOREIGN KEY ("teacher") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "testEvents" ADD CONSTRAINT "testEvents_testClass_fkey" FOREIGN KEY ("testClass") REFERENCES "testClasses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

