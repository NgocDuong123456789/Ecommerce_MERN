import authRouter from './auth'
import express from 'express'
import productRouter from './product.route'
import  categoryRouter from './category.route'
import blogRouter from './productcategory.route'
import blog from './blog.route'
import brand from './brand.route'
import coupon from './coupon.route'
import order from './order.route'
import insert from './inserData.route'
const routerApp=(app: express.Application) =>{
    app.use("/",authRouter)
    app.use('/api/product',productRouter)
    app.use("/api/category",categoryRouter )
    app.use('/api/productCategory', blogRouter)
    app.use("/api/blog",blog)
    app.use("/api/brand",brand)
    app.use('/api/coupon',coupon)
    app.use('/api/order',order)
    app.use("/api/insert", insert)
}

export default routerApp