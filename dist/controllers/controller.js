"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCounters = exports.getHistoricClients = exports.getClients = exports.deleteClient = exports.updateCliente = exports.createCliente = void 0;
const prisma_1 = __importDefault(require("../prisma"));
async function initCount(paesQuant, precoPaes) {
    const count = await prisma_1.default.contador.findFirst();
    if (count != null) {
        await prisma_1.default.contador.update({
            where: { id: 1 },
            data: {
                totalPaes: count.totalPaes + paesQuant,
                totalVendas: count.totalVendas + precoPaes
            }
        });
    }
}
async function postHistoric(cliente) {
    try {
        await prisma_1.default.historico.create({
            data: {
                id: cliente.id,
                nome: cliente.nome,
                paesQuant: cliente.paesQuant,
                precoPaes: cliente.precoPaes
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}
async function createCliente(req, res) {
    const count = await prisma_1.default.contador.findFirst();
    try {
        const { nome, paesQuant } = req.body;
        const precoPaes = 0.50 * paesQuant;
        if (nome == null || nome == undefined) {
            throw new Error("Verifique o campo de nome");
        }
        if (typeof paesQuant != "number") {
            throw new Error("Verifiqueu a Quantidade de pães");
        }
        const cliente = await prisma_1.default.cliente.create({
            data: {
                nome: nome,
                paesQuant: paesQuant,
                precoPaes: precoPaes
            }
        });
        if (!count) {
            await prisma_1.default.contador.create({
                data: {
                    totalPaes: 0,
                    totalVendas: 0,
                    id: 1.
                }
            });
        }
        const estatic = initCount(paesQuant, precoPaes);
        res.status(200).json({ cliente });
    }
    catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
}
exports.createCliente = createCliente;
async function updateCliente(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome, paesQuant, } = req.body;
        const precoPaes = 0.50 * paesQuant;
        const count = await prisma_1.default.contador.findFirst();
        const clienteData = await prisma_1.default.cliente.findUnique({ where: { id: id } });
        const cliente = await prisma_1.default.cliente.update({
            where: { id: id },
            data: {
                nome: nome,
                paesQuant: paesQuant,
                precoPaes: precoPaes
            }
        });
        if (count != null && clienteData != null) {
            await prisma_1.default.contador.update({
                where: { id: 1 },
                data: {
                    totalPaes: ((count === null || count === void 0 ? void 0 : count.totalPaes) - (clienteData === null || clienteData === void 0 ? void 0 : clienteData.paesQuant)) + paesQuant,
                    totalVendas: (count.totalVendas - clienteData.precoPaes) + precoPaes
                }
            });
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
exports.updateCliente = updateCliente;
async function deleteClient(req, res) {
    const id = Number(req.params.id);
    try {
        const cliente = await prisma_1.default.cliente.delete({
            where: { id: id },
        });
        postHistoric(cliente);
        res.status(200).send(cliente);
    }
    catch (error) {
        res.status(401).send(error);
    }
}
exports.deleteClient = deleteClient;
async function getClients(_req, res) {
    try {
        const clientes = await prisma_1.default.cliente.findMany({ orderBy: { id: "asc" } });
        res.status(200).json(clientes);
    }
    catch (error) {
        res.status(401).json(error);
    }
}
exports.getClients = getClients;
async function getHistoricClients(_req, res) {
    try {
        const clientes = await prisma_1.default.historico.findMany({ orderBy: { id: "asc" } });
        res.status(200).send(clientes);
    }
    catch (error) {
        res.status(401).send(error);
    }
}
exports.getHistoricClients = getHistoricClients;
async function getCounters(_req, res) {
    try {
        const contador = await prisma_1.default.contador.findFirst();
        res.status(200).send(contador);
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.getCounters = getCounters;
