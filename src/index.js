import express from 'express'
const app = express()
app.use(express.json())


//
app.get("/home",(req,res)=>{
    res.json({message:"Hello, word"})
})


const PORT = 6200
app.listen(PORT,()=>{
    console.log("server running at http://localhost:6200")
})