import { Router } from "express";
import basicAuth from "@middlewares/basicAuth";
import ProductController from "./controller";

const productRoutes = Router();

productRoutes.post("/", basicAuth, ProductController.create);
productRoutes.get("/", ProductController.all);
productRoutes.get("/:hostname", ProductController.byHostname);

export default productRoutes;
