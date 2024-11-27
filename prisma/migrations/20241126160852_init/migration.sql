-- CreateTable
CREATE TABLE "SantaList" (
    "id" SERIAL NOT NULL,
    "remote_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "is_naughty" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SantaList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SantaList_remote_id_key" ON "SantaList"("remote_id");

-- CreateIndex
CREATE UNIQUE INDEX "SantaList_email_key" ON "SantaList"("email");
