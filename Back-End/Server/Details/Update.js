const tasks = require("../Schema/Task")


const Update = async(req,res)=>{
    const {task,status}=req.body

    const _id=req.params.id
    const Change = await tasks.findByIdAndUpdate(_id,{task:task,status:status})
    res.json(Change)
}
 module.exports = Update


