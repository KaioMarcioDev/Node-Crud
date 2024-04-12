// import {createServer} from 'node:http'

// const server= createServer((req,res)=>{
//     res.write('Oi')

//     return res.end()
// })

// server.listen(3000, ()=>{
//     console.log('Servidor Rodando')
// })


import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasPostgres } from "./database-postgres.js";

const server = fastify()

// const database = new DatabaseMemory()

const database = new DatabasPostgres()

server.post('/videos',async(request, reply)=>{
    const {title, description, duration} = request.body
    await database.create({
        title,
        description,
        duration,
    })
    
    return reply.status(201).send()
})
server.get('/videos',async(request,reply)=>{ 
    const search = request.query.search

    console.log(search)

    const videos = await database.list(search)

    return videos
})
server.put('/videos/:id',async (request,reply)=>{
    const videosId = request.params.id
    const {title, description, duration} = request.body


     await database.update(videosId,{
        title,
        description,
        duration,
    })

    return reply.status(204).send
})
server.delete('/videos/:id',async(request, reply)=>{
   const videoId = request.params.id

   await database.delete(videoId)

   return reply.status(204).send
})

server.listen({
    host:'0.0.0.0',
    port:process.env.PORT ?? 3333,
    })