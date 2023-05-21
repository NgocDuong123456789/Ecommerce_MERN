
import  {insertData}  from "../Controller/inserData";
import express from "express";
import {insertcategory} from '../Controller/inserData'
const router = express.Router();
router.post('/',insertData)
router.post('/productCategory',insertcategory)

export default router;
