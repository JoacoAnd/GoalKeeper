import express from "express";
import userRoutes from './routes/user.routes';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoutes);


export default app;
