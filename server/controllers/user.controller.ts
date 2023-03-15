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
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
   
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if(user) return res.status(400).json({ message: "Ya existe una cuenta con ese correo" });

    try {
        const newUser: IUser = await User.create({ username, email, password });
        return res.status(200).json({ token: createToken(newUser), email, username });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error. Intentelo mas tarde" });
    }; 
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Debes ingresar el correo y la contraseña" });

    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "No existe ninguna cuenta con ese correo" });

        const matchPassword: boolean = await user.comparePassword(password);

        if (matchPassword) return res.status(200).json({ token: createToken(user), email: user.email, username: user.username }); 
        return res.status(400).json({ message: "La contraseña que ingresaste es incorrecta" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error. Intentelo mas tarde" });
    }
};