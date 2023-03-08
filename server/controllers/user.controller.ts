import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import User, { IUser } from "../models/User";
import jwt from 'jsonwebtoken';
import config from "../config";

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, {
        expiresIn: 86400
    })
}

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.mapped() });

    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: "Ya existe una cuenta con ese correo" });

    try {
        const newUser: IUser = await User.create({ username, email, password });
        return res.status(200).json({ token: createToken(newUser) });
    } catch (error) {
        return res.status(400).json({ msg: "Error. Intentelo mas tarde" });
        console.log(error);
    }; 
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: "Debes ingresar el correo y la contraseña" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "No existe ninguna cuenta con ese correo" });

        const matchPassword: boolean = await user.comparePassword(password);

        if (matchPassword) return res.status(200).json({ token: createToken(user) }); 
        return res.status(400).json({ msg: "La contraseña que ingresaste es incorrecta" });

    } catch (error) {
        return res.status(400).json({ msg: "Error. Intentelo mas tarde" });
        console.log(error);
    }
};