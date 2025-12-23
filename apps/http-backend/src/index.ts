import express, { Request, Response } from "express"
import z from "zod"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import { SECRET_TOKEN } from "./config.js"



const app = express()

interface UserCredentials {
    username: string;
    password: string;

}
const USERS: UserCredentials[] = []

app.use(express.json())

app.post("/api/v1/signup", async(req:Request,res:Response)=>{
    const requiredBody = z.object({
        username : z.string(),
        password: z.string().min(6).max(14)
    })

    const safeParse = requiredBody.safeParse(req.body)

    if (!safeParse.success) {
        return res.json({
            msg:"Incorrect format",
            error: safeParse.error
        })
    }

    const {username,password} = req.body

    const userAlreadyExist = USERS.find((user)=>user.username===username)

    if (userAlreadyExist) {
        return res.json({
            msg:"User exist already"
        })
    }

    const hashedPassword =await bcrypt.hash(password,5)

    USERS.push({
        username:username,
        password:hashedPassword
    })

    res.status(200).json({
        msg:"signedup successfully" 
    })
})

app.post("/api/v1/sigin",async(req:Request, res:Response)=>{
    const {username, password} = req.body

    const response = USERS.find((user)=>user.username===username)

    if (!response) {      
        return res.status(404).json({
            msg:"User not exists"
        })   
    }

    const hashedPassword = await bcrypt.compare(password,response.password)

    if (hashedPassword) {
        const token = Jwt.sign({
            username:username
        },SECRET_TOKEN)
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg:"incorrect credentials"
        })
    }

})

app.get("/api/v1/create-room", async(req:Request, res:Response)=>{


})

const serverListen = (PORT:Number)=>{
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
}

serverListen(4000)