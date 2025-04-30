import express from 'express'
import { DatabasePostgress}  from './database-postgress.js'
import {sql} from './db.js'

const app = express()
app.use(express.json())


const database = new DatabasePostgress();

//Listagem de users
app.get("/users",async(req,res)=>{
    const search = req.query.search

    const users = await database.list(search)
    return res.json(users)

})

//Criar  users
app.post("/users",(req,res)=>{
    const {name,email,image}=req.body

  database.create({
    name,
    email,
    image
  })
  return res.status(200).json({message:"Usuario criado com sucesso!"})

})

//Actualizar de users
app.put("/users/:id",(req,res)=>{
    

})
//Excluir users
app.delete("/users/:id",(req,res)=>{
   

})
const PORT = 6200
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
