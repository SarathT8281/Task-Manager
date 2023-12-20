const express = require ('express');
const connection = require('./mongoose');
const cors = require ('cors')
const bcrypt = require('bcrypt')
const userSchema = require('./Server/Schema/User');
const User = require('./Server/Schema/User');
const router = require('./Server/Router');
const dotenv  = require('dotenv');



const app = express ()
const Port = process.env.Port ||5000;

connection ()


app.use (cors())
app.use(express.json())
app.use('/',router)
dotenv.config()




app.listen(Port,()=>console.log(`Server Connected on ${Port}`));