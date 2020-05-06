const express = require('express');
let router = express.Router();

//mysql2를 불러옵니다

dbconfig = require('../../database/dbconfig.js');

let mysql = require('mysql2');
let mysqlPromise = require('mysql2/promise');

//코디상세뷰..
router.post('/detail_view', async function(req, res) {
    let coordi_id = req.body.coordi_id;

    let params = [ parseInt(coordi_id) ];

    let connection = await mysqlPromise.createConnection(dbconfig);

    const [rows, field] = await connection.execute('SELECT c.coordi_id, c.user_id, u.email ,c.file, c.situation1, c.situation2, c.color1, c.color2, c.season1, c.season2, c.item1, c.item2, c.item3, u.nick_name FROM coordinate c INNER JOIN  users u on u.user_id = c.user_id WHERE coordi_id = ?', params);

    if(rows.length < 1) {
        res.send('0');
        return ;
    }

    res.send(rows);
    return ;

});

//코디 수정 들어갈때 페이지 수정할 정보들을 뿌려줍니다..
router.post('/modify_view', async function(req, res) {
    let coordi_id = req.body.coordi_id;

    let params = [ parseInt(coordi_id) ];

    let connection = await mysqlPromise.createConnection(dbconfig);

    const [rows, field] = await connection.execute('SELECT user_id,  file, situation1, situation2, color1, color2, season1, season2, item1, item2, item3 FROM coordinate WHERE coordi_id = ?', params)

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
router.post('/report', async function(req, res) {
     //body에서 coordi_id를 가져온다
     //신고 완료시 res.send(1) 실패시 (0)

     /* 2020.05.01
      * 중복 신고 방지를 위해 테이블(몰래) 하나 더 만들었습니다.
      * 로그인을해서 cookie 값이 있어야 신고가 가능합니다.
      * 신고시 테이블에 정보가 들어가서 user_id, coordi_id에 대한 정보가 있을시 오류를 내게 합니다.
      */


     let promiseCon = await mysqlPromise.createConnection(dbconfig);

     let params1 = [
         user_id = parseInt(req.cookies.user_id),
         coordi_id = parseInt(req.body.coordi_id)
     ]

     const [rows, field] = await promiseCon.execute('SELECT * FROM reports WHERE user_id = ? AND coordi_id = ?', params1);


     //중복일시
     if(rows.length > 0) {
         console.log(rows)
         res.send('-1');
         return ;
     } else if(rows.length === 0) {
        //없을시
        let connection = mysql.createConnection(dbconfig);
        let params2 = [
            user_id = parseInt(req.cookies.user_id),
            coordi_id = parseInt(req.body.coordi_id)
        ]

        connection.query('insert into reports values (?, ?)', params2, function(err, result){
            if(result.affectedRows === 0) {
                console.log(err);
                res.send('0');
            } else {
                console.log('report up');
            }
        });
     }

     //해당 신고값 증가
     let connection = mysql.createConnection(dbconfig);
     let params3 = [req.body.coordi_id];
 
     connection.query('update coordinate set report = report + 1 WHERE coordi_id = ?', params3, function(err, result) {
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