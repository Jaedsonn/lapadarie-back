import { Request, Response } from "express";
import prisma from "../prisma";
import client from '../types/client'
import contador from "../types/contador";

async function initCount(paesQuant: number, precoPaes: number) {
    const count: contador = await prisma.contador.findFirst()

    if (count != null) {
        await prisma.contador.update({
            where: { id: 1 },
            data: {
                totalPaes: count.totalPaes + paesQuant,
                totalVendas: count.totalVendas + precoPaes
            }
        })
    }

}

async function postHistoric(cliente: client) {
    try {
        await prisma.historico.create({
            data: {
                id: cliente.id,
                nome: cliente.nome,
                paesQuant: cliente.paesQuant,
                precoPaes: cliente.precoPaes
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function createCliente(req: Request, res: Response) {
    const count: contador = await prisma.contador.findFirst()
    try {
        const { nome, paesQuant }: client = req.body;
        const precoPaes = 0.50 * paesQuant;

        if (nome == null || nome == undefined) {
            throw new Error("Verifique o campo de nome")
        }

        if (typeof paesQuant != "number") {
            throw new Error("Verifiqueu a Quantidade de pães")
        }

        const cliente: client = await prisma.cliente.create({
            data: {
                nome: nome,
                paesQuant: paesQuant,
                precoPaes: precoPaes
            }
        })


        if (!count) {
            await prisma.contador.create({
                data: {
                    totalPaes: 0,
                    totalVendas: 0,
                    id: 1.
                }
            })
        }

        const estatic = initCount(paesQuant, precoPaes)

        res.status(200).json({ cliente })
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}

export async function updateCliente(req: Request, res: Response) {
    try {
        const id: number = Number(req.params.id)
        const { nome, paesQuant, }: client = req.body
        const precoPaes = 0.50 * paesQuant;

        const count: contador = await prisma.contador.findFirst()
        const clienteData = await prisma.cliente.findUnique({ where: { id: id } })

        const cliente = await prisma.cliente.update({
            where: { id: id },
            data: {
                nome: nome,
                paesQuant: paesQuant,
                precoPaes: precoPaes
            }
        })

        if (count != null && clienteData != null) {
            await prisma.contador.update({
                where: { id: 1 },
                data: {
                    totalPaes: (count?.totalPaes - clienteData?.paesQuant) + paesQuant,
                    totalVendas: (count.totalVendas - clienteData.precoPaes) + precoPaes
                }
            })
        }


        res.status(200).json(cliente)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export async function deleteClient(req: Request, res: Response) {
    const id: number = Number(req.params.id)
    try {
        const cliente: client = await prisma.cliente.delete({
            where: { id: id },
        })

        postHistoric(cliente)

        res.status(200).send(cliente)
    } catch (error) {
        res.status(401).send(error)
    }
}

export async function getClients(_req: Request, res: Response) {
    try {
        const clientes = await prisma.cliente.findMany({ orderBy: { id: "asc" } })
        res.status(200).json(clientes)
    } catch (error) {
        res.status(401).json(error)
    }
}

export async function getHistoricClients(_req: Request, res: Response) {
    try {
        const clientes = await prisma.historico.findMany({ orderBy: { id: "desc" } });
        res.status(200).send(clientes)
    } catch (error) {
        res.status(401).send(error)
    }
}

export async function getCounters(_req: Request, res: Response) {
    try {
        const contador = await prisma.contador.findFirst()
        res.status(200).send(contador)
    } catch (error) {
        res.status(400).send(error)
    }

}