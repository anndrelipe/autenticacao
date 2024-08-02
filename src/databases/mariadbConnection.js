import mysql from "mysql";

const retorno = mysql.createConnection({
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: 'localhost',
    port: 3306
});

const conexaoMariadb = async () => {
    return retorno
}

export default conexaoMariadb