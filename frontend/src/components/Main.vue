<template>
    <div id="main">
        
        <swiper id="swiper" ref="mySwiper" :options="swiperOptions">
                    <swiper-slide><img src="../assets/img/banner.png"></swiper-slide>                   
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
   <section id="new">
        <div class="container">
            <div class="row">
                <div class="sub_title">
                    <h1>NEW</h1>
                    <em><a href="#">더보기 ></a></em>
                </div>
                <div class="photo">
                    <figure>
                        <a href="#">
                            <div style="background: url(assets/img/noimage.jpg) no-repeat center center; background-size: cover;"></div>
                        </a>
                    </figure>
                    <figure>
                        <a href="#">
                            <div style="background: url(assets/img/noimage.jpg) no-repeat center center; background-size: cover;"></div>
                        </a>
                    </figure>
                    <figure>
                        <a href="#">
                            <div style="background: url(assets/img/noimage.jpg) no-repeat center center; background-size: cover;"></div>
                        </a>
                    </figure>
                    <figure>
                        <a href="#">
                            <div style="background: url(assets/img/noimage.jpg) no-repeat center center; background-size: cover;"></div>
                        </a>
                    </figure>

                </div>
            </div>
        </div>
    </section>
    <section id="choice">
        <div class="container">
            <div class="row">
                <div class="sub_title">
                    <h1>Choice</h1>
                    <em><a href="#">더보기 ></a></em>
                </div>
                <div class="photo">
                    <figure><a href="#"><img src="assets/img/noimage.jpg"></a></figure>
                    <figure><a href="#"><img src="assets/img/noimage.jpg"></a></figure>
                    <figure><a href="#"><img src="assets/img/noimage.jpg"></a></figure>
                    <figure><a href="#"><img src="assets/img/noimage.jpg"></a></figure>
                </div>
            </div>
        </div>
    </section>   
         </div>
</template>

<style>
  #swiper {
    width : 80%;
    height : 300px;
  }
</style>

<script>
export default {
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    },
}
</script>