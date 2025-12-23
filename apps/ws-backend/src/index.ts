import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SECRET_TOKEN } from "@repo/backendcommon/config";


const wss = new WebSocketServer({port:8080})

wss.on("connection",(socket, request)=>{
    const url = request.url

    if (!url) {
        return
    }

    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token') || "";
    const decodedInformation = jwt.verify(token, SECRET_TOKEN)

    if (!decodedInformation || !(decodedInformation as JwtPayload).userId) {
        socket.close()
        return
    }

    socket.on('message',(data)=>{
        console.log('recieved %s', data)
    });

    socket.send("something")

})