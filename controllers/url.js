const URL = require("../models/user.js")
const shortid = require("shortid")

async function handleGenerateNewShortUrl(req, res){
      const body = req.body
      if (!body.url)return res.status(400).json({error:"url not defined"})
      const shortId= shortid()

      await URL.create({
            shortId :shortId ,
            redirectUrl :body.url,
            visitHistory :[]
      })
      return res.render("index",{id:shortId})
      return res.json({id:shortId})

}

async function handleGetAnalytics(req,res){
      const shortId = req.params.shortId
      const result = await URL.findOne({shortId})
      return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
      })
}

module.exports={
      handleGenerateNewShortUrl,
      handleGetAnalytics
}