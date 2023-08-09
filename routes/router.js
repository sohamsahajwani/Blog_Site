const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment")


// img storage confing
var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})



// register userdata
router.post("/register",upload.single("photo"),(req,res)=>{
    const {fcontent} = req.body;
    const {fname} = req.body;
    const {filename} = req.file;
    

  
    if(!fname || !filename || !fcontent){
        res.status(422).json({status:422,message:"fill all the details"})
    }
    
    try {
        
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        
        conn.query("INSERT INTO usersdata SET ?",{username:fname,userimg:filename,date:date,usercontent:fcontent},(err,result)=>{
            if(err){
                console.log("error")
            }else{
                console.log("data added")
                res.status(201).json({status:201,data:req.body})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});


// get user data
router.get("/getdata",(req,res)=>{
    // try {
        conn.query('SELECT * FROM usersdata ORDER BY id DESC',function(err,result){
            if(err){
                console.log("error")
            }else{
                console.log("data get")
                res.status(201).json({status:201,data:result})
            }
        })
    // } catch (error) {
    //     res.status(422).json({status:422,error})
    // }
});

module.exports = router;