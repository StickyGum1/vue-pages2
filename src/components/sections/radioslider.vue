<template>
  <div class="wrapper-collection-section">
    <div class="wrapper-carousel-top">
      <div class="carousel-top-left">
        <h1 class="carousel-title">
          Radio Nổi Bật
        </h1>
      </div>
    </div>
    <button
      @click="moveToLeft"
      ref="leftbtn"
      disabled
      class="carousel-btn carousel-button-back">
      <i class="icon ic-go-left"></i>
    </button>
    <button 
      @click="moveToRight"
      ref="rightbtn"
      class="carousel-btn carousel-button-next">
      <i class="icon ic-go-right"></i>
    </button>
    <div 
      class="wrapper-carousel-content"
      :style="{ marginLeft: -paddingItem + 'px', marginRight: -paddingItem + 'px' }">
      <div
        ref="listcarouselElmt" 
        class="carousel-list">
          <div 
            v-for="(item, index) in arraySong"
            :key=index
            ref="carouselitem"
            class="carousel-item l-2 m-2-4 c-3"
            :style="{ paddingLeft: paddingItem + 'px', paddingRight: paddingItem + 'px' }"
            :class="{ 'is-singer' : item.isSinger }">
              <div class="wrapper-item-main-img">
                <div class="carousel-live-label">
                  <span class="live-label-text">LIVE</span>
                </div>
                <router-link 
                  :to="{ name: 'Songsanlbum' }"
                  class="carousel-item-link"
                  @click="updateCurrentCategory(item)">
                  <svg class="svg" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle class="svg-circle-bg" stroke="rgba(255, 255, 255, 0.2)" cx="50" cy="50" r="48.75" stroke-width="2.5"></circle>
                    <circle class="svg-circle" stroke="#ff4b4a" cx="50" cy="50" r="48.75" stroke-width="2.5" stroke-dasharray="306.3052837250048" 
                    :stroke-dashoffset="`${getRandomRadioPercent()}.00464994223347`" style="transition: stroke-dashoffset 850ms ease-in-out 0s;">
                    </circle>
                  </svg>
                  <div 
                    class="carousel-item-thumb-image">
                    <img 
                      class="carousel-item-image" 
                      :src="item.imagecal" alt="">
                  </div>
                  <div class="overlay-blur"></div>
                  <div class="carousel-item-tooltip">
                    <!-- <button class="btn-round wishlist-btn">
                      <i class="icon ic-like"></i>
                    </button> -->
                    <button class="btn-round open-playlist-btn">
                      <i class="icon ic-play-circle-outline"></i>
                    </button>
                    <!-- <button class="btn-round more-options">
                      <i class="icon ic-more"></i>
                    </button> -->
                  </div>
                </router-link>
                <div 
                  class="wrapper-radio-icon">
                    <img 
                      :src="item.subimagecal" 
                      alt="">
                </div>
              </div>
              
              <div class="carousel-item-infor">
                <h4 class="item-infor-title">
                  <router-link 
                  :to="{ name: 'Songsanlbum' }"
                  class="item-title-link">
                    {{ item.title }}
                  </router-link>
                </h4>
                <span class="item-infor-des">
                  {{ Math.floor(Math.random()*200) }} đang nghe
                </span>
                <!-- <button class="btn-follow-singer">
                  <i class="icon ic-addfriend"></i>
                  QUAN TÂM
                </button> -->
                
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: "radio-section",
    data() {
      return {
        paddingItem: 12,
        stackWidth: 0,
      }
    },
    methods: {
      ...mapMutations(["updateCurrentCategory"]),
      setOriginPosition() {
        try {
          this.stackWidth = 0;
          this.$refs.rightbtn.disabled = false;
          this.$refs.leftbtn.disabled = true;
          this.$refs.listcarouselElmt.setAttribute("style", `transform: translate3d(${this.stackWidth}px, 0, 0);`);
        } catch(e) {

        }
      },
      moveToRight() {
        let stack = this.stackWidth - this.$refs.listcarouselElmt.clientWidth;
        if (stack - this.$refs.listcarouselElmt.clientWidth - this.paddingItem > -this.getFullWidthCarousel()){
          this.$refs.leftbtn.disabled = false;
          this.stackWidth = stack;
          this.$refs.listcarouselElmt.setAttribute("style", `transform: translate3d(${this.stackWidth}px, 0, 0);`)
        } else {
          this.$refs.rightbtn.disabled = true;
          this.$refs.leftbtn.disabled = false;
          this.stackWidth = -(this.getFullWidthCarousel() - this.$refs.listcarouselElmt.clientWidth);
          this.$refs.listcarouselElmt.setAttribute("style", `transform: translate3d(${this.stackWidth}px, 0, 0);`)
        }
      },
      moveToLeft() {
        let stack = this.stackWidth + this.$refs.listcarouselElmt.clientWidth;
        if (stack + 10 >= 0) {
          this.$refs.rightbtn.disabled = false;
          this.$refs.leftbtn.disabled = true;
          this.stackWidth = 0;
          this.$refs.listcarouselElmt.setAttribute("style", `transform: translate3d(${this.stackWidth}px, 0, 0);`);
        } else {
          this.$refs.rightbtn.disabled = false;
          this.stackWidth = stack;
          this.$refs.listcarouselElmt.setAttribute("style", `transform: translate3d(${this.stackWidth}px, 0, 0);`);
        }
      },
      getFullWidthCarousel() {
        return this.$refs.carouselitem.offsetWidth * this.arraySong.length;
      },
      getRandomRadioPercent() {
        return Math.ceil(Math.random() * 300)
      }
    },
    computed: {
      ...mapState(["arraySong"])
    },
    created() {
      window.addEventListener("resize", this.setOriginPosition);
    }
}
</script>

<style scoped>
.wrapper-collection-section {
  width: 100%;
  padding-bottom: 30px;
  position: relative;
}

.wrapper-carousel-content {
  overflow: hidden;
}

.carousel-title {
  color: var(--white-color);
  font-size: 21px;
}

.wrapper-carousel-top {
  display: flex;
  justify-content: space-between;
}

.carousel-top-right {
  display: flex;
  align-items: center;
}

.carousel-btn {
  margin: 0 8px;
  color: var(--white-color);
}

.carousel-btn:disabled {
  color: var(--text-secondary);
  opacity: .2;
  cursor: default;
}

.carousel-btn .icon {
  width: 26px;
  height: 26px;
  font-size: 19px;
  color: #32323d;
}

.carousel-list {
  display: flex;
  flex-wrap: nowrap;
  transition: .3s ease-in;
  position: relative;
}

.carousel-btn:disabled {
  
}

.carousel-button-back,
.carousel-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background: var(--white-color);
  border-radius: 50px;
  width: 38px;
  height: 38px;
}

.carousel-button-back {
  left: -3%;
}

.carousel-button-next {
  right: -3%;
}

.carousel-item-thumb-image {
  line-height: 0;
  height: 0;
  padding-bottom: 100%;
  border-radius: 5px;
  overflow: hidden;
}

.carousel-item.is-singer .carousel-item-link{
  position: relative;
}

.carousel-live-label {
    position: absolute;
    bottom: -4px;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 5px;
    border-radius: 3px;
    background: red;
    line-height: .6;
    display: flex;
    align-items: center;
}

.live-label-text {
  color: white;
  font-size: 9px;
  letter-spacing: 2px;
  font-weight: bold;
}

.carousel-item {
  position: relative;
}

.wrapper-radio-icon {
  position: absolute;
  right: -10px;
  bottom: 0;
  z-index: 100;
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 50px;
}

.wrapper-radio-icon img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.carousel-item-link {
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: block;
}

.carousel-item-link .svg {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  transform: rotate(-90deg);
  fill: none;
}

.carousel-item-infor {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.btn-follow-singer {
  color: #ffffff;
  border-radius: 50px;
  background: var(--alpha-bg);
  margin: 20px auto;
  padding: 6.5px 20px;
  border: 1px solid var(--border-primary);
}

.btn-follow-singer:hover {
  -webkit-filter: brightness(.9);
  filter: brightness(.9);
}

.btn-follow-singer i {
  font-size: 15px;
}

.wrapper-item-main-img {
  position: relative;
}

.overlay-blur {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, .5);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: .1s ease;
  border-radius: 5px;
}

.carousel-item-tooltip {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 20;
  opacity: 0;
  visibility: hidden;
  transition: .1s ease;
}

.btn-round {
  width: 32px;
  height: 32px;
  background: unset;
}

.btn-round.open-playlist-btn {
  width: 45px;
  height: 45px;
} 

.btn-round.open-playlist-btn i {
  font-size: 45px;
} 

.wishlist-btn i,
.more-options i {
  font-size: 20px;
}

.wishlist-btn:hover,
.more-options:hover {
  background: var(--tab-active-bg);
}

.carousel-item-link:hover .carousel-item-image{
  transform: scale(1.1) translateZ(0);
}

.carousel-item-link:hover .carousel-item-tooltip,
.carousel-item-link:hover .overlay-blur {
  opacity: 1;
  visibility: visible;
}



.carousel-item-image {
  height: auto;
  width: 100%;
  transition: .3s linear;
  transform: translateZ(0);
  filter: blur(0);
}


.item-infor-title {
  margin: 5px 0 0;
  color: var(--white-color);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
}

.item-title-link {
  text-decoration: none;
  color: var(--white-color);
}

.item-title-link:hover {
  color: var(--link-text-hover);
}

.item-infor-des {
  color: var(--text-secondary);
}

.carousel-item.is-singer .item-infor-title {
  text-align: center;
}

@media (min-width: 740px) {
  .row {
    margin-left: -13px;
    margin-right: -13px;
  }

  .col {
    padding-left: 13px;
    padding-right: 13px;
  }
}

@media (min-width: 1113px) {
  .carousel-top-right {
    opacity: 0;
    visibility: hidden;
  }

  .carousel-button-back {
    left: -2%;
  }

  .carousel-button-next {
    right: -2%;
  }

  .carousel-button-next,
  .carousel-button-back {
    width: 40px;
    height: 40px;
  }
}

</style>