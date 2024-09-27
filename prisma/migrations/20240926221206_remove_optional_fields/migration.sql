-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "name_conductor" TEXT NOT NULL,
    "name_dog" TEXT NOT NULL,
    "age_dog" INTEGER NOT NULL,
    "sex_dog" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
