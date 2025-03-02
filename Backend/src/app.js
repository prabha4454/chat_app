import express from "express"
import dotenv from "dotenv"
import authRoutes from "./router/auth.route.js"
import { connectDB } from "./lib/database.js";
import messageRoutes from "./router/message.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import {server,io,app} from "./lib/socket.js"
import path from "path"
import { fileURLToPath } from 'url';
import bodyParser from "body-parser"

dotenv.config();

const PORT = process.env.PORT ;
app.use(bodyParser.json());
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the 'public' folder statically
app.use("/public",express.static("public/"));

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    
}))

  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* middleware */

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

if(process.env.SECURE_ENV  === "production"){
    app.use(express.static(path.join(__dirname, '../forntend/chat-app/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend',"chat-app","dist", 'index.html'));
        });
    }

/* server port */
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})