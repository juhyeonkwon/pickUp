const express = require('express');
let router = express.Router();
const mysql = require('mysql2/promise');

const dbconfig = require('../../database/dbconfig.js');

//SELECT coordi_id, file FROM coordinate
router.post('/', function(req, res) {

    let connection = mysql.PromiseConnection(dbconfig);
    

})