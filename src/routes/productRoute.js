const express = require("express")
const  {addProduct, getProduct, deleteProduct, getProducts}  = require("../controllers/productController")
const uploader = require("../middlewares/multerMiddleware")
const { isLoggedIn, isAdmin } = require("../validation/authValidator")

const productRouter = express.Router()
productRouter.post("/addproduct" ,isLoggedIn ,isAdmin ,uploader.single("productImage"), addProduct)
productRouter.get("/:id" , getProduct)
productRouter.get("/" , getProducts)
productRouter.delete("/:id" , isLoggedIn ,
    isAdmin,   deleteProduct)

module.exports = productRouter