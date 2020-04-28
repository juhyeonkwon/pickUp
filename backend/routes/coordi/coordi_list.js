const express = require('express');
let router = express.Router();
const mysql = require('mysql2/promise');

const dbconfig = require('../../database/dbconfig.js');

//페이지 갯수 구하는거
//SELECT COUNT(*) FROM coordinate
//SELECT coordi_id, file FROM coordinate order by coordi_id desc limit 숫자, 숫자
router.post('/',  function(req, res) {

    let connection = mysql.createConnection(dbconfig);
    

});