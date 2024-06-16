"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Olá mundinho");
});
router.post("/register", controller_1.createCliente);
router.get("/estatic", controller_1.getCounters);
router.put("/update/:id", controller_1.updateCliente);
router.get("/clientes", controller_1.getClients);
router.delete("/delete/:id", controller_1.deleteClient);
router.get("/delete/historico", controller_1.getHistoricClients);
exports.default = router;
