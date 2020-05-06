const express = require('express');
let router = express.Router();
const mysql = require('mysql2/promise');

const dbconfig = require('../../database/dbconfig.js');

//페이지 갯수 구하는거
//SELECT COUNT(*) FROM coordinate
//SELECT coordi_id, file FROM coordinate order by coordi_id desc limit 숫자, 숫자
router.post('/', async function(req, res) {

    let connection = await mysql.createConnection(dbconfig);
    let num = parseInt(req.body.num);

    let val;
    if(num == 1){
        val = 0;
    } else {
        val = ( num - 1 ) * 15;
    }
    
    const [rows, field] = await connection.execute('SELECT coordi_id, file FROM coordinate order by coordi_id desc limit ?,15',[val]);
    if (rows.length < 1){
        res.send('0');
    } else {
        res.send(rows);
    }

    return ;
});


module.exports = router;