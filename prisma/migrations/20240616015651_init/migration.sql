-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "paesQuant" INTEGER NOT NULL,
    "precoPaes" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Contador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalPaes" INTEGER NOT NULL,
    "totalVendas" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_id_key" ON "Cliente"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contador_id_key" ON "Contador"("id");
