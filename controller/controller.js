const multer= require('multer')
const path=require('path')
const assert=require('assert')
const Product= require('../model/model')
let pro

var storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, 'uploads')
    },

    filename:(req,file,callback)=>{
        callback(null, 'Doc-'+Date.now()+path.extname(file.originalname))
    }
})



module.exports={
    home:(req,res)=>{
        res.render('index')

    },

    upload:(req,res)=>{

        var upload= multer({storage:storage,
            filesize:4*1024*1024
        }).array('myFile',5)


        upload(req,res,err=>{
            let data= req.files
            console.log(data)

            for(var i=0; i<data.length;i++){
                let saveData= data[i]
                console.log(data[i])

                pro= new Product(saveData)

                pro.save().then(myRes=>{
                    console.log("Data Save to Data Base Successful")
                }).catch(err=>{
                    assert.equal(null,err)
                    console.log("Data Save to Data Base Failed ")
                })
               

            }

            if(err){
                assert.equal(null,err)
                console.log("upload Failed")
            }
            else{
                console.log("Upload Success")
            }

        })

        setTimeout(function(){
            res.redirect('/')
        },5000)
    }
    
}