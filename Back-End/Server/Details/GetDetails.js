const tasks = require("../Schema/Task")

const getDetails = async (req,res)=>{
    const details =await tasks.find()
  console.log(details);
    res.json(details)

}

 const getIdPass =async(req,res)=> {
    const getId = req.params.id;
    const get = await tasks.findById({_id:getId})
    res.json(get)
 }

 

   module.exports ={getDetails,getIdPass}


