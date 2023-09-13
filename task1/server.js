import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './connectDB.js'
import { personRoute } from './personRoute.js'

dotenv.config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

const app = express()

app.use(express.json())
app.get('/', (req, res)=> {
    res.status(200).json({
        succes: true,
        message: "Welcome to our API..."
    })
})

app.get('/api', (req, res)=> {
    const {slack_name, track} = req.query
    const date = new Date()
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const  year = String(date.getUTCFullYear()).padStart(2, '0')
    const  month = String( date.getUTCMonth()+1).padStart(2, '0')
    const day = String(date.getUTCDay()+10).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const utcDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
    res.json({ 
    slack_name,
    current_day: weekday[date.getDay()],
    utc_time: utcDate,
    track,
    github_file_url: "https://github.com/EAZYLINK/hng_api_repo/blob/main/task1/server.js",
    github_repo_url: "https://github.com/EAZYLINK/hng_api_repo.git",
    status_code: 200
    })
})

app.use('/api', personRoute)

app.listen(8000, async()=>{
    await connectDB(MONGODB_URL);
    console.log("Server running....")
})