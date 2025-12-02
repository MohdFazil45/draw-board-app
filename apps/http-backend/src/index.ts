import express from "express"

const app = express()

app.use(express.json())

app.post("/signup",(req,res)=>{

})

const serverListen = (PORT:Number)=>{
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
}

serverListen(4000)