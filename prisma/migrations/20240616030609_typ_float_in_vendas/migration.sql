/*
  Warnings:

  - You are about to alter the column `totalVendas` on the `Contador` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "totalPaes" INTEGER NOT NULL,
    "totalVendas" REAL NOT NULL
);
INSERT INTO "new_Contador" ("id", "totalPaes", "totalVendas") SELECT "id", "totalPaes", "totalVendas" FROM "Contador";
DROP TABLE "Contador";
ALTER TABLE "new_Contador" RENAME TO "Contador";
CREATE UNIQUE INDEX "Contador_id_key" ON "Contador"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
