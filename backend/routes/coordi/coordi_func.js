const express = require('express');
let router = express.Router();

//mysql2를 불러옵니다

dbconfig = require('../../database/dbconfig.js');

let mysql = require('mysql2');
let mysqlPromise = require('mysql2/promise');


//코디 수정 들어갈때 페이지 수정할 정보들을 뿌려줍니다..
router.post('/modify_view', async function(req, res) {
    let coordi_id = req.body.coordi_id;

    let params = [ coordi_id ];

    let connection = await mysqlPromise.createConnection(dbconfig);

    const [rows, field] = await connection.execute('SELECT user_id, file, situation1, situation2, color1, color2, season1, season2, item1, item2, item3 FROM coordinate WHERE coordi_id = ?', params)

    //다른사람이 수정하려고 했을때 오류를 냅니다...

    if(rows[0].user_id != req.cookies.user_id) {
        res.send('0');
        return ;
    }

    if(rows.length < 1) {
        res.send('0');
        return ;
    }

    res.send(rows);
    return ;

})


//사진 업로드를 위한 정의 
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

//UPDATE 
//UPDATE coordinate set file = 'abcabc', situation1 = '데이트', situation2 = '', color1 = '노란색',
//color2 = '', season1 = '가을', season2 = '겨울', item1 = 'shirt', item2 = 'slex', item3 = '' WHERE coordi_id = 2
router.post('/modify', upload.single('file'), function(req, res) {
    let params = [
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
        coordi_id = parseInt(req.body.coordi_id)
    ];

    let connection = mysql.createConnection(dbconfig);

    connection.query('UPDATE coordinate set file = ?, situation1 = ?, situation2 = ?, color1 = ? , color2 = ?, season1 = ?, season2 = ?, item1 = ?, item2 = ?, item3 = ? WHERE coordi_id = ?', 
                    params, function(err, result) {
                        if(result.affectedRows === 0) {
                            console.log(err);
                            res.send('0');
                        } else {
                            res.send('1');
                        }
                    });

     return ;    

})


//코디 delete
//DELETE FROM coordinate WHERE coordi_id = ?
router.post('/delete', function(req, res){
    //body에서 coordi_id를 가져온다
    //쿼리를 진행하는데 삭제쿼리를 진행하셔야합니다
    //삭제 성공시 1을 실패시 0을 전달해야 합니다.
    let connection = mysql.createConnection(dbconfig);

    let params = [req.body.coordi_id];

    connection.query('DELETE FROM coordinate WHERE coordi_id = ?', params, function(err, result) {
        if(result.affectedRows === 0) {
            console.log(err);
            res.send('0');
        } else {
            res.send('1');
        }
    });

    return ;


})

//코디 신고
//update coordinate set report = report + 1 WHERE coordi_id = ?
router.post('/report', function(req, res) {
     //body에서 coordi_id를 가져온다
     //신고 완료시 res.send(1) 실패시 (0)
     let connection = mysql.createConnection(dbconfig);

     let params = [req.body.coordi_id];
 
     connection.query('update coordinate set report = report + 1 WHERE coordi_id = ?', params, function(err, result) {
         if(result.affectedRows === 0) {
             console.log(err);
             res.send('0');
         } else {
             res.send('1');
         }
     });

     return ;

});


module.exports = router;