import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "price_checker",
    logging: true,
    entities: ["src/app/models/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
});
export default AppDataSource;

AppDataSource.initialize();
