import "reflect-metadata";
import { DataSource } from "typeorm";
import { Montadora } from "./src/entities/montadora.entity";
import dotenv from "dotenv"
import { Modelo } from "./src/entities/modelo.entity";

dotenv.config()


const user_name = process.env.USERNAME;
const password = process.env.PASSWORD;



export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "montadora_graphql",
  username: 'daniel_psql',
  password: 'vitor158',

  synchronize: false,
  logging: true,
  entities: [Montadora, Modelo], 
  migrations: ["src/persistence/typeorm/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Datasource is UP!!!");
  })
  .catch((err) => {
    console.log("Erro ao inicilizar o DS!", err);
  });
