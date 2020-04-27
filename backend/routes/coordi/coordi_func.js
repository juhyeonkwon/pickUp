const express = require('express');
let router = express.Router();

//mysql2를 불러옵니다

dbconfig = require('../../database/dbconfig.js');

//let mysql = require('mysql2/promise');



//코디 수정
router.post('/modify', function(req, res) {


})


//코디 delete
//DELETE FROM coordinate WHERE coordi_id = ?
router.post('/delete', function(req, res){
    //body에서 coordi_id를 가져온다
    //쿼리를 진행하는데 삭제쿼리를 진행하셔야합니다
    //삭제 성공시 1을 실패시 0을 전달해야 합니다.

})

//코디 신고
//update coordinate set report = report + 1 WHERE coordi_id = ?
router.post('/report', function(req, res) {
     //body에서 coordi_id를 가져온다
     //신고 완료시 res.send(1) 실패시 (0)

});


module.exports = router;