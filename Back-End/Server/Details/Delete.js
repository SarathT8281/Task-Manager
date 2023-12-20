const tasks = require("../Schema/Task");
 const Delete = async(req,res)=>{
    const{task,status,date}=req.body;

    const _id=req.params.id
    const Remove=await tasks.findByIdAndDelete(_id,{task,status,date})
    res.json({message:"Deleted Succesfully",Remove})
 }

 module.exports = Delete




