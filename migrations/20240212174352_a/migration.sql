-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "producerName" TEXT NOT NULL DEFAULT 'Mitin Fishing';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_producerName_fkey" FOREIGN KEY ("producerName") REFERENCES "Producer"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
