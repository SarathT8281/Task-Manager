const express = require ('express');
const Protect = require('./Details/Protect');
const toCompareUser = require('./Details/Login');
const { CreateUser } = require('./Details/Signup');
const createTask = require('./Details/AddTask');
const { getDetails, getIdPass } = require('./Details/GetDetails');

const Delete = require('./Details/Delete');
const Update = require('./Details/Update');
const getTaskCalc  = require('./Details/GetTaskCalc');
const userName = require('./Details/UserName');
const router = express.Router();

const middleware = [Protect]


// Auth
router.route('/register').post(CreateUser)
router.route('/login').post(toCompareUser)


// CRUD
router.route('/add').post(createTask)
router.route('/get').get(getDetails)
router.route('/getId/:id').get(getIdPass)
router.route('/trial').get(getTaskCalc)
router.route('/delete/:id').delete(Delete)
router.route('/update/:id').put(Update)


module.exports =router