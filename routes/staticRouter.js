const express = require("express")
const URL = require('../models/user')
const router = express.Router()

router.get("/",async (req,res)=>{
      
      return res.render("index")
})


module.exports = router
