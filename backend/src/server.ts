import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/dbConfig";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

import routes from "./routes/routes";

app.use('/api', routes)

import path from 'path'; 
 // Torna a pasta de uploads pública
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


sequelize.sync()
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao conectar ao banco de dados", error.message);
  });
