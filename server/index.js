import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import connectDB from './connect/database.js';
import cors from 'cors';


connectDB()
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

console.log('MongoDB URI:', process.env.DATABASE);


app.use(express.json());
app.use(cors());
app.use('/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
})