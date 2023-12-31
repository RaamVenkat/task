import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/dbConnection.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDb();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Port: ${port}`));
