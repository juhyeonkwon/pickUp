<template>
  <div id="app">
   <div class="overlay" v-on:click='close()'>
    </div>
    <header id="header">
        <div class="container">
            <div class="row">
                <div class="header clearfix">
                    <h1>
                        <span id="sidebarCollapse" v-on:click='menu'>
                            <img src="./assets/img/btn_category.png"   alt="카테고리">
                        </span>                        
                        <a href=# class="logo">
                             <img src="./assets/img/logo.png" alt="fhrh">

                        </a>
                    </h1>
                </div>
            </div>
        </div>
        <div id="sidebar" class="sidenav">
            <a class="closebtn" v-on:click='close'>&times;</a>
            <a href="#">코디 Photo</a>
            <a href="#">이상형 월드컵</a>
            <a href="#">코디 추천</a>
            <a href="#">Contact</a>
        </div>
    </header>

    <hr />
    <div id="router">
        <router-view/>
    </div>
    <hr/>

    <footer id="footer">
        <div id="footer_infor">
            <div class="container">
                <div class="row">
                    <div class="footer_infor">
                        <ul>
                            <li><a href="#">홈페이지 이용약관</a></li>
                            <li><a href="#">개인정보 취급방침</a></li>
                            <li><a href="#">게시물 게재일칙</a></li>
                        </ul>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    
</div>



</template>
<script>
import $ from 'jquery';
        
export default {
  name: 'App',
  data() {
      return {

      }
  },
  methods : {
        menu : function() {
            $('#sidebar').addClass('active');
            $('.overlay').fadeIn();
        },
        close : function() {
            $('#sidebar').removeClass('active');
            $('.overlay').fadeOut();
        }
    }
}
  

</script>

<style>

/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top : 10px;
}
*/

#app {
    text-align : center;
}

#router {
    display : block;
}

/* 여백 초기화 */
body,div,ul,li,dl,dd,dt,ol,h1,h2,h3,h4,h5,h6,input,fieldset,legend,p,select,table,th,td,tr,textarea,button,form,figure,figcaption{margin:0; padding:0;}

hr {
    margin-left : 10%;
    width : 80%;
}

/* a 링크 초기화 */
a {color: #222; text-decoration: none;}
a:hover {color: #2698cb;}

/* 폰트 초기화 */
body, input, textarea, select, button, table {font-family:'Noto Sans KR', AppleSDGothicNeo-Regular,'Malgun Gothic','맑은 고딕',dotum,'돋움',sans-serif; color: #222; font-size: 13px; line-height: 1.5;}

/* 폰트 스타일 초기화 */
em,address {font-style: normal;}

/* 블릿기호 초기화 */
ul,li,ol {list-style:none;}

/* 제목 태그 초기화 */
h1,h2,h3,h4,h5,h6 {font-size: 13px; font-weight: normal;}

/* 테두리 초기화 */
img,fieldset {border:0 none;}

/* 버튼 초기화 */
button {border: 0;}

/* 반응형 */
video,img {width: 100%;}

/* clearfix */
.clearfix{*zoom:1;}
.clearfix:before, .clearfix:after {display: block; content: '';line-height: 0;}
.clearfix:after {clear: both;}

@font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    
}


#header {
    width: 100%;
    background: rgba(0, 0, 0, 0);
}

.container {
    position: relative;
    width: 80%;
    margin-left : 9.3%;
    background: rgba(0, 0, 0, 0);
}

.row {
    padding: 0 10px;
}

#footer {
    background-color: rgba(238, 238, 238, 255);
    width:100%;
}

/*헤더 영역 */
.header {
    margin-top: 10px;
    text-align: left;
}


#sidebarCollapse img {
    width : 62px;
    cursor: pointer;
        display: inline-block;
}

.logo img {
    height : 62px;
    width : 260px;
        display: inline-block;
}


/*카테고리 네비*/
/* The side navigation menu */
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
    top: 0;
    left: 0;
    overflow: hidden;
    display: none;
}

.sidenav {
    height: 100%;
    /* 100% Full-height */
    width: 250px;
    position: fixed;
    /* Stay in place */
    z-index: 999;
    /* Stay on top */
    top: 0;
    /* Stay at the top */
    left: -250px;
    background-color: #111;
    /* Black*/
    overflow-x: hidden;
    /* Disable horizontal scroll */
    padding-top: 60px;
    /* Place content 60px from the top */
    transition: 0.5s;
    /* 0.5 second transition effect to slide in the sidenav */
}

#sidebar.active {
    left: 0;
}

/* The navigation menu links */
.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
    color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    cursor: pointer;
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998;
    display: none;
}

/*카테고리 네비 끝*/

/* 배너 */



#banner img{
    max-height: 420px;
}
/*카테고리*/
.sub_title{
    margin:25px 0px;
    border-bottom:1px solid black;
    position: relative;
}
.sub_title h1{
    
    font-size: 30px;
color: #11368c;
font-family: "MalgunGothic";
font-weight: bold;
}
.sub_title em{
position: absolute;
    bottom:3px;
    right:10px;
font-size: 13px;
color: #121618;
font-family: "Dotum";
vertical-align:bottom;
    
}
/*이미지 */
.photo{
    overflow: hidden;
}
.photo figure div{
    width:100%;
    height: 100%;
}
.photo figure{
    outline:1px solid black;
    float:left; margin-right:2%;
    width:23.5%;
    height:293px;
    overflow: hidden;
}
.photo figure:last-child{margin-right: 0px;}
#choice{
    margin-bottom: 30px;
}
/*푸터*/
.footer_infor {
    text-align: center;
}

.footer_infor ul {
    padding: 15px 0;
}

.footer_infor li {
    position: relative;
    display: inline;
    padding-right: 16px;
    white-space: nowrap;
}

.footer_infor li:after {
    content: '';
    position: absolute;
    right: 5px;
    top: 5px;
    width: 1px;
    height: 11px;
    background: black;
}

.footer_infor li:last-child:after {
    width: 0;
    height: 0;
}

/*반응형 디자인*/
/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media (max-width: 1290px){
    .container {width: 100%;}
}
@media (max-width: 1024px){
    .container {width: 1280px;}
}
@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}




</style>
