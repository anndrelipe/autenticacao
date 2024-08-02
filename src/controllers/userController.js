import conexaoMariadb from "../databases/mariadbConnection.js";
const mysql = await conexaoMariadb();

class UserController {
    static async cadastraUsuario (req, res) {
        res.status(201).json({status: 201, message: "Created", content: req.body});
    }
    static async validaUsuario (req, res) {
        const password = 1234;
        if (req.body.password != password) {
            res.status(401).json({status: 401, message: "Unauthorized", content: "Usuário e/ou senha invalido(s)"});
            return
        }
        res.status(200).json({status: 200, message: "OK", content: "Usuário validado!"});
    }
}

export default UserController