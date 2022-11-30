import { Router } from "express";

import shopRoutes from "./shop";

const routes = Router();

routes.use("/shop", shopRoutes);
routes.use("/product", shopRoutes);

export default routes;
