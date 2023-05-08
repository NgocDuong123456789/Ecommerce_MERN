import  express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import connnectDB from "./config/db"
import routerApp from './Routers/index'
dotenv.config();
const app = express()
app.use(cookieParser())
app.use(cors({
    methods:["GET","POST","DELETE","PATCH","PUT"],
    allowedHeaders:["Content-Type", "Authorization"]
}))
app.use(compression())
app.use(express.json()); // lấy dữ liệu theo json

app.use(express.urlencoded({extended: true})) // lấy dữ liệu theo kiểu khác như array
const PORT = process.env.PORT || 5000;
connnectDB()
routerApp(app)
app.get("/", (req, res) => {
    res.send("Hello, world!");
  });
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
