const express=require('express')
const registerModel = require('../model/regData')
const regRouter = express.Router();

regRouter.get('/check-register',async(req,res)=>{
  try{
    const{username,phoneno,address,password,email,name}=req.query// get all data from registration form
    const olduser=await registerModel.
    findOne({username:username})// to check user already exist
   
      if(olduser){
       return res.status(400).json({
              success:false,
              error:true,
              message:"this user is already exist"
        })
      }

    const oldphoneno =await registerModel.findOne({phoneno})// to check phone already exist
     if(oldphoneno){
        return res.status(400).json({
          success:false,
          error:true,
          message:"this number is already exist"
        })
      }

      const oldemail =await registerModel.findOne({email})// to check phone already exist
      if(oldemail){
        return  res.status(400).json({
           success:false,
           error:true,
           message:"this email is already exist"
         })
       }
    const result = await registerModel.create({username,password,name,address,phoneno,email}) // insert data to register table 
    if(result){
      return res.status(200).json({
        success: false,
        error: true,
        message:"Registration  successfull"
      })
    }
  }catch(error){
    return res.status(400).json({
      success: false,
      error: true,
      message:"something went wrong" 
    })
  }
})

//--------------------login----------------------------

regRouter.get('/check-login',async(req,res)=>{
  try {
    const{username,password}=req.query
    const oldu=await registerModel.findOne({username:username})
    if(!oldu){
      return res.status(400).json({
             success:false,
             error:true,
             message:"this user not matching "
       })
     }
     console.log(oldu.password);
     if(oldu.password!=password){
       return  res.status(400).json({
        success:false,
        error:true,
        
        message:"this password not matching"
        })
     }

       return res.status(200).json({
         success: false,
         error: true,
         data:oldu,
         message:"  successfull logined"
       })
     
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: true,
      message:"something went wrong" 
    })
    
  }
})
//----------view all user in json format-----------
 regRouter.get('/view-user',async(req,res)=>{
  try {
    const user =await registerModel.find()
    res.status(200).json({
      success:true,
      error:false,
      data:user,
    })
  } catch (error) {
    console.log(error);
    
  }
 })
 //---------------view single user using id-------------
 regRouter.get('/view-singleuser/:id',async(req,res)=>{
  try {
    const id= req.params.id
    const singleuser= await registerModel.findOne({_id:id})
    res.status(200).json({
      success:true,
      error:false,
      data:singleuser,

    })
  } catch (error) {
    console.log(error);
  }

 })
 //---------------deleting register data using id------
 regRouter.get('/delete/:id',async(req,res)=>{
  try{
    const id=req.params.id
    const data=await registerModel.deleteOne({_id:id})
    
         res.status(200).json({
          success:true,
          error:false,
          data:data,
      })  
     }catch(error){  
      console.log(error);   
     }

 })

 //--------updating registration details--------
 regRouter.get('/update/:id',async(req,res)=>{
  var Data={
    username : req.query.username,
    name :req.query.name,
    password :req.query.password,
  }
  try{
    const id=req.params.id
    const user=await registerModel.updateOne({_id:id},{$set:Data})
    
         res.status(200).json({
          success:true,
          error:false,
          data:user,
      })  
     }catch(error){  
      console.log(error);   
     }

 })
module.exports = regRouter
