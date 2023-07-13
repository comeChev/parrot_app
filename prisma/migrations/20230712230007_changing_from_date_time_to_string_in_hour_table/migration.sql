-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hour" (
    "hour_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour_day" TEXT NOT NULL,
    "hour_morning_status" BOOLEAN NOT NULL,
    "hour_morning_opening" TEXT NOT NULL,
    "hour_morning_closing" TEXT NOT NULL,
    "hour_afternoon_status" BOOLEAN NOT NULL,
    "hour_afternoon_opening" TEXT NOT NULL,
    "hour_afternoon_closing" TEXT NOT NULL
);
INSERT INTO "new_Hour" ("hour_afternoon_closing", "hour_afternoon_opening", "hour_afternoon_status", "hour_day", "hour_id", "hour_morning_closing", "hour_morning_opening", "hour_morning_status") SELECT "hour_afternoon_closing", "hour_afternoon_opening", "hour_afternoon_status", "hour_day", "hour_id", "hour_morning_closing", "hour_morning_opening", "hour_morning_status" FROM "Hour";
DROP TABLE "Hour";
ALTER TABLE "new_Hour" RENAME TO "Hour";
CREATE UNIQUE INDEX "Hour_hour_day_key" ON "Hour"("hour_day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
