import express,{Express} from "express";
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/errorMiddlewares";
import userRouter from "./router/user";
const app:Express = express();

dotenv.config({path:".env"})
app.use(express.json());

app.use('/user/app',userRouter)

const PORT=process.env.PORT;

app.use(errorMiddleware);
app.listen(PORT,()=>{
    console.log(`server started at PORT:${PORT}`)
})