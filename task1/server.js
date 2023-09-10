import express from 'express'

const app = express()

app.use(express.json())

app.get('/api', (req, res)=> {
    const {slack_name, track} = req.query
    const date = new Date()
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDay()))
    res.json({ 
    slack_name,
    current_day: weekday[date.getDay()],
    utc_time: utcDate,
    track,
    github_file_url: "https://github.com/username/repo/blob/main/file_name.ext",
    github_repo_url: "https://github.com/EAZYLINK/hng_api_repo.git",
    status_code: 200
    })
})

app.listen(8000, ()=>{
    console.log("Server running....")
})