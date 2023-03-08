import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
};

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>("User", userSchema);