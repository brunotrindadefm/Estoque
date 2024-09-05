import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ! para não dar erro de possibilidade de ser undefined
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

export default sequelize;
