const tasks = require("../Schema/Task");

const createTask= async (req,res)=>{
    const {task,status,date}=req.body;
    const taskDetails= await tasks.create({
        task,status,date
    })
    res.json(taskDetails)
}
module.exports =createTask







