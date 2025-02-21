import express from "express"
import dotenv from "dotenv"
import authRoutes from "./router/auth.route.js"
import { connectDB } from "./lib/database.js";
import messageRoutes from "./router/message.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();
dotenv.config();

const PORT = process.env.PORT ;

app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* middleware */

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)


/* server port */
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})