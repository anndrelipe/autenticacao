import conexaoMariadb from "../databases/mariadbConnection.js";
import md5 from "md5";
import auth from "basic-auth";

const mysql = await conexaoMariadb();
class UserController {

    static async cadastraUsuario (req, res) {
        const { username, password } = req.body;

        const cript_password = md5(password);

        const query1 = `SELECT id FROM user WHERE username = "${username}";`;
        const query2 = `INSERT INTO user (username, password)
                        VALUES ("${username}", "${cript_password}");`;

        mysql.query(query1, (err, result) => {
            if (err) {
                console.log("Erro", err);
                return
            }
            else if (result.length === 0) {
                mysql.query(query2, (newErr, newResult) => {
                    if (newErr) {
                        console.log("Erro", newErr);
                        return
                        
                    }
                    res.status(201).json({status: 201, message: "Created", content: {username: username, password: cript_password}})
                })
            }
        })
    }

    static async validaUsuario (req, res) {
        const user = auth(req);
        const cript_password = md5(user.pass);

        const query = `SELECT username, password FROM user WHERE username = "${user.name}";`

        mysql.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return
            }

            if (result.length > 0) {
                if (result[0].password == cript_password) {
                    res.status(200).json({status: 200, message: "OK", content: "Usuário validado!"});
                } else {
                    res.status(401).json({status: 401, message: "Unauthorized", content: `Senha inválida para username: ${user.name}`});
                }
            } else { 
                res.status(404).json({status: 404, message: "Not Found", content: "Esse usuário não pode ser encontrado no banco de dados."});
                return
            }
        })
    }
}

export default UserController