import express from "express"
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/user', UserController.cadastraUsuario)
userRouter.post('/user/login', UserController.validaUsuario)

export default userRouter
