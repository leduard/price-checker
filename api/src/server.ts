import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import AppError from "./app/errors/appError";

import routes from "./routes";
import "./database";

const app = express();
const PORT = 3333 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
            errors: err.errors,
        });
    }

    console.error({ name: err.name, message: err.message, stack: err.stack });
    return response.status(500).json({
        status: "error",
        message: "Internal server error.",
        errors: [err.message],
    });
});

app.listen(PORT, () => console.log(`🚀 Server is now running on *:${PORT}`));
