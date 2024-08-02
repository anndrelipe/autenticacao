import "dotenv/config";
import express from "express";
import conexaoMariadb from "../databases/mariadbConnection.js";

const app = express();
const mariadb = await conexaoMariadb();

app.use(express.json());

mariadb.connect((err) => {
    if (err) {
        console.log("Erro ao conectar com o banco de dados!", err);
        return
    }
    console.log("Sucesso, aplicação integrada ao banco de dados!");
})

app.get('/', (req, res) => {
    res.status(200).send("Funcionando.");
});

export default app