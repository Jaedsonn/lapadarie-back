-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "totalPaes" INTEGER NOT NULL,
    "totalVendas" INTEGER NOT NULL
);
INSERT INTO "new_Contador" ("id", "totalPaes", "totalVendas") SELECT "id", "totalPaes", "totalVendas" FROM "Contador";
DROP TABLE "Contador";
ALTER TABLE "new_Contador" RENAME TO "Contador";
CREATE UNIQUE INDEX "Contador_id_key" ON "Contador"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
