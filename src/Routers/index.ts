import authRouter from './auth'
import express from 'express'
import productRouter from './product.route'
import  categoryRouter from './category.route'
import blogRouter from './blog.category.route'
import blog from './blog.route'
import brand from './brand.route'
import coupon from './coupon.route'
import order from './order.route'
const routerApp=(app: express.Application) =>{
    app.use("/",authRouter)
    app.use('/api/product',productRouter)
    app.use("/api/category",categoryRouter )
    app.use('/api/blogCategory', blogRouter)
    app.use("/api/blog",blog)
    app.use("/api/brand",brand)
    app.use('/api/coupon',coupon)
    app.use('/api/order',order)
}
export default routerApp