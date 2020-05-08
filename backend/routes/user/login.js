//require
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
var bodyParser = require('body-parser');

//mysql을 사용을 위한 선언 및 정의
const mysql = require('mysql2/promise');
const dbconfig = require('../../database/dbconfig');


router.post('/', async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    console.log('login');

    //암호화
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(password, 'utf8', 'base64');
    let chipheredOutput = cipher.final('base64');
    password = chipheredOutput;

    params = [email];

    const connection = await mysql.createConnection(dbconfig);
    
    const [rows, field] = await connection.execute('SELECT * FROM users WHERE email=?', params);
    
    if(rows.length < 1) {
        res.send('err!');
        return 0;
    }
    
    console.log(rows);
    
    if(rows[0].password === password) {
        res.cookie('user_id', rows[0].user_id, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.cookie('nick_name', rows[0].nick_name, { expires: new Date(Date.now() + 900000), httpOnly: true })
        res.send('succes');
    } else {
        res.send('0')
    } 
    
    return ;
    
});


module.exports = router;