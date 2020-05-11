//require
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
var bodyParser = require('body-parser');

//mysql을 사용을 위한 선언 및 정의
const mysql = require('mysql2');
const dbconfig = require('../../database/dbconfig');



//id 중복체크
router.post('/signUpDupl', function(req, res, next) {
    let email = req.body.email;
    console.log(email);

    let connection = mysql.createConnection(dbconfig);
    connection.query('SELECT * FROM users WHERE email=?', email, function(err, results, fields) {
      if(err) {
        console.log("error occured", err);
        res.send({
          "code" : 400,
          "failed" : "error ocurred"
        })
      }
      if(results.length) {
        res.send({
          "value" : 0       //아이디가 존재할시
        });
      } else {
        res.send({
          "value" : 1       //아이디가 존재하지 않을시
        });
      }     
    });

    connection.end();
});


//닉네임 중복체크
router.post('/signUpDuplNick', function(req, res, next) {
    let nick_name = req.body.nick_name;
    console.log(nick_name);

    let connection = mysql.createConnection(dbconfig);
    connection.query('SELECT * FROM users WHERE nick_name=?', nick_name, function(err, results, fields) {
      if(err) {
        console.log("error occured", err);
        res.send({
          "code" : 400,
          "failed" : "error ocurred"
        })
      }
      if(results.length) {
        res.send({
          "value" : 0       //해당 닉네임이 존재할시
        });
      } else {
        res.send({
          "value" : 1       //해당 닉네임이 존재하지 않을시
        });
      }          
      console.log(results);
    });   
    connection.end();

});



//회원가입..
router.post('/', function(req, res) {
  let password = req.body.password;

  //암호화
  let cipher = crypto.createCipher('aes192', 'key');
  cipher.update(password, 'utf8', 'base64');
  let chipheredOutput = cipher.final('base64');
  password = chipheredOutput;

  let params = [
    email = req.body.email,
    password = password,
    nick_name = req.body.nick_name,
  ];

  let connection = mysql.createConnection(dbconfig);

  connection.query('INSERT INTO pickup.users(email , password, nick_name) VALUES (?,?,?)', params, function(err, results, fields) {
    console.log(err);
    if(results != undefined) {
      res.send(results);
    } else {
      res.send('err');
    }
  })

  connection.end();

});


/*
router.post('/', function(req, res, next) {
    
    let params = [
        email = req.body.email,
        password = req.body.password,
        nick_name = req.body.nick_name,
    ];
    //비밀번호 암호화

    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(password, 'utf8', 'base64');
    let chipheredOutput = cipher.final('base64');
    password = chipheredOutput;

    pool.getConnection(function(err, connection) {
        let query = pool.query('INSERT INTO pickup.users(email , password, nick_name) VALUES (?,?,?)', params, function(err, result) {
            if(err) {
                console.log(err);
                res.send('err');
            } else {
                console.log('results');
                res.send("sucess");
            }
        })
    });

})
*/
module.exports = router;
