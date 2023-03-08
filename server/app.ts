import express from "express";
import userRoutes from './routes/user.routes';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/user", userRoutes);


export default app;
