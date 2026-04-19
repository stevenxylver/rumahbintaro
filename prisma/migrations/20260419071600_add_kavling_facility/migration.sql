-- CreateTable
CREATE TABLE "Kavling" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kodeBlok" TEXT NOT NULL,
    "cluster" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "hot" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "images" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Kavling_slug_key" ON "Kavling"("slug");
