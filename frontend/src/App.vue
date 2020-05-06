<template>
  <div id="app">
    <div class="overlay">

    </div>
    <header id="header">
        <div class="container"  v-on:click="close">
            <div class="row">
                <div class="header clearfix">
                    <h1>
                        <span id="sidebarCollapse">
                            <img src="./assets/img/btn_category.png" alt="카테고리" v-on:click="menu">
                        </span>
                        <em class="logo">
                            <a href=#>
                                <strong>옷 좀 골라줄래?</strong>
                                <em>
                                    Can you pick some clothes?
                                </em>

                            </a>
                        </em>
                    </h1>
                    <div class="search" id="sc">
                        <input class="search__input" type="text" placeholder="Search">
                        <input class="search__btn" type="button">
                    </div>
                </div>
            </div>
        </div>
        <div id="sidebar" class="sidenav"  v-on:click="close">
            <a class="closebtn">&times;</a>
            <a href="#">코디 Photo</a>
            <a href="#">이상형 월드컵</a>
            <a href="#">코디 추천</a>
            <a href="#">Contact</a>
        </div>
    </header>
    <div id="router">
        <router-view/>
    </div>    

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



</style>
