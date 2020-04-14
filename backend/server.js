/* 
*  메인 코드들입니다. 서버구동과, route가 이루어집니다
*/

const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const dbconfig      = require('./database/dbconfig')


const app = express();

/* 기본 세팅 */


//static 파일 제공
app.use(express.static('./static'));


//cross 도메인 요청을 처리하기 위한것
app.use(function(req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//json을 사용하기 위한것
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//url로만 접근시
app.get('/hello', (req, res) => res.send('Hello'));

app.set('view engine', 'jade');


/* 기본 세팅 끝 */


//라우팅 정의
let test = require('./routes/test.js');
let upload = require('./routes/upload.js')


//라우팅
app.use('/test', test);
app.use('/upload', upload);




//서버 실행
app.listen(3000, () => console.log('listening on port 3000!'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
