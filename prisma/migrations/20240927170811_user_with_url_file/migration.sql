-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "name_conductor" TEXT NOT NULL,
    "name_dog" TEXT NOT NULL,
    "age_dog" INTEGER NOT NULL,
    "sex_dog" TEXT NOT NULL,
    "pontuation" INTEGER NOT NULL,
    "test_time" TEXT NOT NULL,
    "fileURL" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
