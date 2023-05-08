import authRouter from './auth'
import express from 'express'
const routerApp=(app: express.Application) =>{
    app.use("/",authRouter)

}

export default routerApp