-- CreateTable
CREATE TABLE "Historico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "paesQuant" INTEGER NOT NULL,
    "precoPaes" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Historico_id_key" ON "Historico"("id");
