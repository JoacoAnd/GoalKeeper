import { body } from "express-validator";
import User from "../models/User";

const userValidation = [
    body("username")
        .notEmpty().withMessage("Debes ingresar un nombre de usuario").bail()
        .isLength({ min: 3, max: 20 }).withMessage("El nombre debe tener entre 3 y 20 caracteres").bail(),

    body("email")
        .notEmpty().withMessage("Debes ingresar un correo electronico").bail()
        .isEmail().withMessage("Debes ingresar un correo valido").bail()
        .isLength({ min: 4, max: 100 }).withMessage("El correo debe tener entre 4 y 100 caracteres").bail(),
    body("password")
        .notEmpty().withMessage("Debes ingresar una contraseña").bail()
        .isLength({ min: 5, max: 50 }).withMessage("La contraseña debe tener entre 5 y 50 caracteres").bail(),
]

export default userValidation;