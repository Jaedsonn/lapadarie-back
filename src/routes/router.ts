import express, { Router } from "express";
import { Request, Response } from "express";
import { createCliente, deleteClient, getClients, getCounters, getHistoricClients, updateCliente } from "../controllers/controller";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Olá mundinho")
})

router.post("/register", createCliente)

router.get("/estatic", getCounters)

router.put("/update/:id", updateCliente)

router.get("/clientes", getClients)

router.delete("/delete/:id", deleteClient)

router.get("/delete/historico", getHistoricClients)

export default router