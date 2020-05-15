const express = require('express');
let router = express.Router();

dbconfig = require('../../database/dbconfig.js');

let mysql = require('mysql2');
let mysqlPromise = require('mysql2/promise');

//상황별 추천
//SELECT * FROM coordinate where situation1 = ? or situation2 = ? order by score desc limit 0, 10
router.post('/situation', async function(req, res) {
    let situation = req.body.situation;

    let num = parseInt(req.body.num);

    let val;
    if(num == 1){
        val = 0;
    } else {
        val = ( num - 1 ) * 20;
    }

    let params = [
        situation,
        situation,
        val
    ]

    const connection = await mysqlPromise.createConnection(dbconfig);

    const [rows, field] = await connection.execute('SELECT * FROM coordinate where situation1 = ? or situation2 = ? order by score desc limit ?, 20', params);

    if (rows.length < 1){
        res.send('0');
    } else {
        res.send(rows);
    }

    return ;
    
});

//계절별 추천
//SELECT * FROM coordinate where season1 = ? or season2 = ? order by score desc limit 0, 10
router.post('/season', async function(req, res) {
    let season = req.body.season;

    let num = parseInt(req.body.num);

    let val;
    if(num == 1){
        val = 0;
    } else {
        val = ( num - 1 ) * 20;
    }

    let params = [
        season,
        season,
        val
    ];

    const connection = await mysqlPromise.createConnection(dbconfig);

    const [rows, field] = await connection.execute('SELECT * FROM coordinate where season1 = ? or season2 = ? order by week_score desc limit ?, 20', params);

    if (rows.length < 1){
        res.send('0');
    } else {
        res.send(rows);
    }

    return ;

});

//아이템 별 추천
//SELECT * FROM coordinate where (item1 = ? or item2 = ? or item3 = ?) AND (color1 = ? or color2 = ?) order by score desc limit ?, 10
router.post('/item', async function(req, res) {
    let item = req.body.item;
    let color = req.body.color;

    let num = parseInt(req.body.num);

    let val;
    if(num == 1){
        val = 0;
    } else {
        val = ( num - 1 ) * 10;
    }

    let params = [
        item, item, item,
        color, color,
        val
    ];

    const connection = await mysqlPromise.createConnection(dbconfig);

    const [rows, field] = await connection.execute('SELECT * FROM coordinate where (item1 = ? or item2 = ? or item3 = ?) AND (color1 = ? or color2 = ?) order by score desc limit ?, 10', params);

    if (rows.length < 1){
        res.send('0');
    } else {
        res.send(rows);
    }

    return ;
});

module.exports = router;