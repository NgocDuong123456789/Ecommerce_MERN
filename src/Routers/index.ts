import authRouter from './auth'
import express from 'express'
import productRouter from './product.route'
const routerApp=(app: express.Application) =>{
    app.use("/",authRouter)
    app.use('/api/product',productRouter)

}

export default routerApp