const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    task:{type : String},
    status:{type : String},
    date : {type : Date},
    user:{type : String}
    
},{ timestamps: true })
const tasks=mongoose.model('task',taskSchema)
module.exports = tasks