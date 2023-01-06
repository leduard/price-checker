import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "price_checker",
    logging: false,
    entities: ["src/app/models/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
});
export default AppDataSource;

AppDataSource.initialize();
