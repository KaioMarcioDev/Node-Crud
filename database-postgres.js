import {randomUUID} from "node:crypto"
import {sql} from "./db.js"
export class DatabasPostgres{

    #videos = new Map()

   async list(search){

        let videos

        if(videos){
            videos = sql `select * from videos where title ilike "%${search}%"`
        }else{
            videos = sql `select * from videos`
        }
        return videos
      
    }

    async create(video){
        const videosId = randomUUID()
        const {title, description, duration} = video


        await sql`insert into videos(id, title, description, duration)values(${videosId}, ${title},${description},${duration})`

    }

    async update(id, video){
        const {title, description, duration} = video
        await sql`update videos set title=${title},description=${description},duration=${duration} where id = ${id}`

    }

    async delete(id){

       await sql`delete from videos where id=${id}`
    }
}