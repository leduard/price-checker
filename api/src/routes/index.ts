import { Router } from "express";

import shopRoutes from "./shop";
import productRoutes from "./product";
import historyRoutes from "./history";

const routes = Router();

routes.use("/shop", shopRoutes);
routes.use("/product", productRoutes);
routes.use("/history", historyRoutes);

export default routes;
