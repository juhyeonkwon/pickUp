const express = require('express');
const router = express.Router();

//비동기 함수 사용을 위한 async
let async = require('async');

//mysql을 사용을 위한 선언 및 정의
const mysql = require('mysql2/promise');
const mysql2 = require('mysql2');

const dbconfig =require('../database/dbconfig');

let pool = mysql.createPool(dbconfig);

//connection을 만듭니다......
let connection = mysql2.createConnection(dbconfig);


//업로드를 위한 선언 및 정의
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/coordi/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' +  file.originalname) 
    }
})


let upload = multer({ storage : storage})

router.post('/', upload.single('file') , async function(req, res, next) {
 
    console.log(req.body);

    //파라미터 정리..
    let params_coordi = [
    user_id = parseInt(req.body.user_id),
    file = req.file.filename,
    situation1 = req.body.situation1,
    situation2 = req.body.situation2,
    color1 = req.body.color1,
    color2 = req.body.color2,
    season1 = req.body.season1,
    season2 = req.body.season2,
    item1 = req.body.item1,
    item2 = req.body.item2,
    item3 = req.body.item3,
    ]

    connection.query('INSERT INTO coordinate(user_id, file, score, report, week_score, situation1, situation2, color1, color2, season1, season2, item1, item2, item3) VALUES (?, ?, 0, 0, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params_coordi, 
        function(err, results, fields) {
            if(err) {
                res.send('0')
            }
            else {
                res.send('1');
            }
     });

     return ;

})

module.exports = router;
