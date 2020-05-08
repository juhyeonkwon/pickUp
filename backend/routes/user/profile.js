const express = require('express');
let router = express.Router();
const mysqlPromise = require('mysql2/promise');
const mysql = require('mysql2');
const dbconfig = require('../../database/dbconfig.js');
const crypto = require('crypto');

//사용자 프로필 보여주는것
router.post('/', function(req, res){
    
})


//
router.post('/view', async function(req, res){
    let user_id = req.body.user_id;
    let con = await mysqlPromise.createConnection(dbconfig);
    const [rows, field] = await con.execute('select u.email, u.nick_name, c.coordi_id, c.file from users u INNER JOIN coordinate c on u.user_id = c.user_id WHERE u.user_id = ?',[ user_id ]);

    if(rows.length < 1){
        res.send('0');
    } else {
        res.send(rows);
    }
})

//
router.post('/modify', function(req, res) {
    let nick_name = req.body.nick_name;
    let password = req.body.password;

    //암호화
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(password, 'utf8', 'base64');
    let chipheredOutput = cipher.final('base64');
    password = chipheredOutput;

    let params = [
        nick_name = nick_name,
        password = password,
        user_id = parseInt(req.cookies.user_id)
    ]

    let con = mysql.createConnection(dbconfig);

    con.query('UPDATE users SET nick_name = ?, password = ? WHERE user_id = ?', params, function(err, results, field) {
        if(err) {
            console.log("error occured", err);
            res.send({
              "code" : 400,
              "failed" : "error ocurred"
            })
          }
          if(results.length) {
            res.send('0');
          } else {
            res.send('1');
          }            
          console.log(results);
    });
    
})


router.post('/pw_check', async function(req, res) {
    let id = parseInt(req.cookies.user_id)
    let password = req.body.password;
    let con = await mysqlPromise.createConnection(dbconfig);
    const [rows, field] = await con.execute('select password from users where user_id = ?', [ id ]);

    if(rows.length < 1) {
        return 0;
    }

     //암호화
     let cipher = crypto.createCipher('aes192', 'key');
     cipher.update(password, 'utf8', 'base64');
     let chipheredOutput = cipher.final('base64');
     password = chipheredOutput;

    if(rows[0].password != password) {
        res.send('0');
    } else {
        res.send('1');
    }

})

module.exports = router;