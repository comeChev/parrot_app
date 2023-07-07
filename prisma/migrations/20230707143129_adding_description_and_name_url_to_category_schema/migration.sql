-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category_name" TEXT NOT NULL,
    "category_description" TEXT NOT NULL DEFAULT 'Aucune description',
    "category_name_url" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Category" ("category_id", "category_name") SELECT "category_id", "category_name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
