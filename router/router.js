const express=require('express')
const appRouter=express.Router()
const controller=require('../controller/controller')

appRouter.route('/').get(controller.home)
appRouter.route('/').post(controller.upload)



module.exports=appRouter;