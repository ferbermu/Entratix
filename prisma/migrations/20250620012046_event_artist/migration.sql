-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "socialLinks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistsOnEvents" (
    "eventId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtistsOnEvents_pkey" PRIMARY KEY ("eventId","artistId")
);

-- AddForeignKey
ALTER TABLE "ArtistsOnEvents" ADD CONSTRAINT "ArtistsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistsOnEvents" ADD CONSTRAINT "ArtistsOnEvents_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
