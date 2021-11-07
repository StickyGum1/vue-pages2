<template>
  <div class="wrapper-carousel-section">
    <div class="wrapper-carousel-top">
      <div class="carousel-top-left">
        <h1 class="carousel-title">
          Gần Đây
        </h1>
      </div>
      <div class="carousel-top-right">
        <div class="carousel-group-btn">
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
        </div>
      </div>
    </div>
    <div 
      class="wrapper-carousel-content"
      :style="{ marginLeft: -paddingItem + 'px', marginRight: -paddingItem + 'px' }">
      <div
        ref="listcarouselElmt" 
        class="carousel-list">
          <div 
            v-for="item in arraySong"
            :key=item.index
            ref="carouselitem"
            :style="{ paddingLeft: paddingItem + 'px', paddingRight: paddingItem + 'px' }"
            class="carousel-item l-2-4 m-3 c-4"
            :class="{ 'is-singer' : item.isSinger }">
              <div class="wrapper-item-main-img">
                <router-link 
                  :to="{ name: 'Songsanlbum' }"
                  class="carousel-item-link"
                  @click="updateCurrentCategory(item)">
                  <div 
                    class="carousel-item-thumb-image">
                    <img 
                      class="carousel-item-image" 
                      :src="item.imagecal" alt="">
                  </div>
                  <div class="overlay-blur"></div>
                  <div class="carousel-item-tooltip">
                    <button class="btn-round wishlist-btn">
                      <i class="icon ic-like"></i>
                    </button>
                    <button class="btn-round open-playlist-btn">
                      <i class="icon ic-play-circle-outline"></i>
                    </button>
                    <button class="btn-round more-options">
                      <i class="icon ic-more"></i>
                    </button>
                  </div>
                </router-link>
              </div>
              <div 
                v-if="item.isSinger"
                class="wrapper-radio-icon">
                  <svg width="45" height="45" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="28" fill="url(#paint0_linear)">
                    </circle>
                    <path d="M25.6665 10.5859C17.0666 11.7271 10.4312 19.0892 10.4312 28.001C10.4312 37.7039 18.2969 45.5696 27.9998 45.5696C37.7027 45.5696 45.5684 37.7039 45.5684 28.001C45.5684 25.9559 45.219 23.9925 44.5766 22.1672" stroke="white" stroke-opacity="0.8" stroke-width="2.7451" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <path d="M25.6671 17.2695C20.7236 18.3393 17.02 22.7379 17.02 28.0015C17.02 34.0658 21.9361 38.9819 28.0004 38.9819C34.0647 38.9819 38.9808 34.0658 38.9808 28.0015C38.9808 26.9916 38.8445 26.0135 38.5892 25.0847" stroke="white" stroke-opacity="0.9" stroke-width="2.7451" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5163 9.61746C32.3901 9.57918 32.2562 9.55859 32.1174 9.55859C31.3594 9.55859 30.7449 10.1731 30.7449 10.9311V23.2405C29.9373 22.7733 28.9996 22.5059 27.9995 22.5059C24.9673 22.5059 22.5093 24.9639 22.5093 27.9961C22.5093 31.0282 24.9673 33.4863 27.9995 33.4863C31.0178 33.4863 33.4672 31.0506 33.4895 28.0376C33.4898 28.0257 33.49 28.0138 33.49 28.0019V12.7544C36.3301 13.7778 38.8347 15.5846 40.7142 17.9628C41.1842 18.5576 42.0474 18.6587 42.6421 18.1886C43.2368 17.7186 43.3379 16.8555 42.8679 16.2607C40.3109 13.0253 36.7626 10.6938 32.7542 9.65732C32.6748 9.6368 32.5953 9.62366 32.5163 9.61746Z" fill="white">
                    </path>
                    <defs>
                      <linearGradient id="paint0_linear" x1="0" y1="0" x2="0" y2="56" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FE7423"></stop>
                        <stop offset="1" stop-color="#FF3E60"></stop></linearGradient></defs>
                  </svg>
              </div>
              <div class="carousel-item-infor">
                <h4 class="item-infor-title">
                  <router-link 
                  :to="{ name: 'Songsanlbum' }"
                  class="item-title-link">
                    {{ item.title }}
                  </router-link>
                </h4>
                <span 
                  v-if="!item.isSinger"
                  class="item-infor-des">
                  {{ item.listsinger }}...
                </span>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: "carousel-section",
    data() {
      return {
        paddingItem: 12, 
        stackWidth: 0
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
        } catch (e) {

        }
      },
      moveToRight() {
        let stack = this.stackWidth - this.$refs.listcarouselElmt.clientWidth;
        // console.log("stack: ", stack);
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
        if (stack + this.paddingItem >= 0) {
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
.wrapper-carousel-section {
  width: 100%;
  padding-bottom: 20px;
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
  padding: 0 5px;
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
}

.carousel-list {
  display: flex;
  flex-wrap: nowrap;
  transition: .3s ease-in;
}

.carousel-item-thumb-image {
  line-height: 0;
  height: 0;
  padding-bottom: 100%;
  border-radius: 5px;
  overflow: hidden;
}

.carousel-item.is-singer .carousel-item-link{
  border-radius: 50%;
  overflow: hidden;
}

.carousel-item {
  position: relative;
}

.wrapper-radio-icon {
  position: absolute;
  right: 0;
  bottom: 30%;
  z-index: 100;
}


.carousel-item-link {
  position: relative;
  display: block;
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

</style>