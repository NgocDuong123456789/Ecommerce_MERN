import authRouter from './auth'
import express from 'express'
import productRouter from './product.route'
import  categoryRouter from './category.route'
import blogRouter from './blog.route'
const routerApp=(app: express.Application) =>{
    app.use("/",authRouter)
    app.use('/api/product',productRouter)
    app.use("/api/category",categoryRouter )
    app.use('/api/blog', blogRouter)
}
export default routerApp