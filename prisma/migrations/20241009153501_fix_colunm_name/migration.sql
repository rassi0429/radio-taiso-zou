/*
  Warnings:

  - You are about to drop the column `radioExerciseId` on the `ExerciseRecord` table. All the data in the column will be lost.
  - You are about to drop the `RadioExercise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ExerciseId` to the `ExerciseRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseRecord" DROP CONSTRAINT "ExerciseRecord_radioExerciseId_fkey";

-- AlterTable
ALTER TABLE "ExerciseRecord" DROP COLUMN "radioExerciseId",
ADD COLUMN     "ExerciseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "RadioExercise";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "password" TEXT,
    "reward" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- AddForeignKey
ALTER TABLE "ExerciseRecord" ADD CONSTRAINT "ExerciseRecord_ExerciseId_fkey" FOREIGN KEY ("ExerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
