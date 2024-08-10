// d9RulGBIbZ6oNVPu

const express =  require('express')
const app = express()
const path = require ("path")
const {connectTOMongoDB} = require ("./connect")
const port = 8000
const urlRoute = require("./routes/url")
const URL = require('./models/user')
const staticRoute = require("./routes/staticRouter")

connectTOMongoDB("mongodb+srv://mehrabevan10:d9RulGBIbZ6oNVPu@cluster0.a513r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(console.log("db connected"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))

app.use("/url",urlRoute)
app.use("/",staticRoute)

app.get("/url/:shortId",async (req,res)=>{
      const shortId = req.params.shortId
      const entry = await URL.findOneAndUpdate(
            { shortId },
            {$push:{
                        visitHistory:{timestamp: Date.now()}
                  },
            }
      )
      console.log(entry.redirectUrl)
      res.redirect(entry.redirectUrl)
}) 
app.listen(port ,()=>console.log("server started"))