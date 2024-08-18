const express = require('express')
const serverconfig = require('./config/serverConfig.js')
const connectDB = require('./config/dbConfig.js')
const userRouter = require('./routes/userRoute.js')
const cartRouter = require('./routes/cartRoute.js')
const authRouter = require('./routes/authRoute.js')
const cookieParser = require('cookie-parser')
const { isLoggedIn } = require('./validation/authValidator.js')
const uploader = require('./middlewares/multerMiddleware.js')
const cloudinary = require('./config/cloudinaryConfig.js')
const fs = require('fs/promises')
const productRouter = require('./routes/productRoute.js')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use('/users' , userRouter)
app.use("/carts" , cartRouter)
app.use('/auth' , authRouter)
app.use('/products' , productRouter)


app.get('/ping' , isLoggedIn , (req , res)=>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message : 'pong'})
})

app.post('/photo' , uploader.single('incomingFile') , async (req ,res)=>{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
   console.log(`RESULT FROM CLOUDINARY : `, result);
  await fs.unlink(req.file.path)   
    return res.json({message : "OK"})
})

app.listen(serverconfig.PORT , async ()=>{
 await connectDB()    
 console.log(`SERVER GOT STARTED ON PORT NO. ${serverconfig.PORT}`);
  
})