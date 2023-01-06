import { Router } from "express";
import basicAuth from "@middlewares/basicAuth";
import HistoryController from "./controller";

const productRoutes = Router();

productRoutes.post("/", HistoryController.create);

export default productRoutes;
