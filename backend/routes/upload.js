const express = require('express');
const router = express.Router();

//비동기 함수 사용을 위한 async
let async = require('async');

//mysql을 사용을 위한 선언 및 정의
const mysql = require('mysql2/promise');

const dbconfig =require('../database/dbconfig');

//pool을 만듭니다......
let pool = mysql.createPool(dbconfig);


//업로드를 위한 선언 및 정의
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/coordi/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' +  file.originalname ) 
    }
})


let upload = multer({ storage : storage})

router.post('/', upload.single('file') , async function(req, res, next) {

    /*
    console.log(req.file); 
    console.log(req.file.filename);
*/
    console.log(req.body); 
    req.body.situation


    //파라미터 정리..
    let params_coordi = [
    user_id = parseInt(req.body.user_id),
    filename = req.file.filename,
    ]

    const query = await pool.query('INSERT INTO coordinate(user_id, file, score, report, week_score) VALUES (?, ?, 0, 0, 0)', params_coordi);
    console.log(query[0].insertId);

    if(query.affectedRows < 1) {
        res.send('error');
        return ;
    }

    
    let coordi_id = query[0].insertId;  //방금 넣은 코디의 id를 가져옵니다..

    //상황에 대한 Insert진행
    let params_situation = [
        coordi_id,
        situation = req.body.situation,
    ]


    const query2 = await pool.query('INSERT INTO coordi_situation(coordi_id, situation_id) VALUES (?, (SELECT s.situation_id FROM situation s WHERE s.situation LIKE ?))', params_situation);
    if(query2.affectedRows < 1) {
        res.send('error');
        return ;
    }

    //아이템에 대한 Insert진행
    let params_item = [
        coordi_id,
        item = req.body.item
    ]

    const query3 = await pool.query('INSERT INTO coordi_item(coordi_id, item_id) VALUES (?, (SELECT i.item_id FROM item i WHERE i.item LIKE ?))', params_item);
    if(query3.affectedRows < 1) {
        res.send('error');
        return ;
    }

    let params_season = [
        coordi_id,
        season = parseInt(req.body.season)
    ]

    const query4 = await pool.query('INSERT INTO coordi_season(coordi_id, season_id) VALUES (?, ?)', params_season);
    if(query4.affectedRows < 1) {
        res.send('error');
        return ;
    }

    //색깔에 대한 쿼리 진행
    let params_color = [
        coordi_id,
        color = req.body.color
    ]

    const query5 = await pool.query('INSERT INTO coordi_color(coordi_id, color_id) VALUES (?, (SELECT c.color_id FROM color c WHERE c.color LIKE ?))', params_color);
    if(query5.affectedRows < 1) {
        res.send('error');
        return ;
    }
    
    res.send("sucess");
    return;
})


router.post('/ha', function(req, res) {
    res.send('ha');
})

/*
async function checkCategory(category) {
    switch(category) {
        case 'top' : return 'top'
        case '1' : return 'top'
        case 'outer' : return 'top'
        case '2' : return 'top'
        default : return 'err' ;
    }    
}
*/


module.exports = router;
