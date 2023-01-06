import { Router } from "express";
import basicAuth from "@middlewares/basicAuth";
import ShopController from "./controller";

const shopRoutes = Router();

shopRoutes.post("/", basicAuth, ShopController.create);
shopRoutes.put("/:hostname", basicAuth, ShopController.updateByHostname);
shopRoutes.get("/", ShopController.all);
shopRoutes.get("/:hostname", ShopController.byHostname);

export default shopRoutes;
