<template>
  <div class="wrapper-carousel-section">
    <div class="wrapper-carousel-top">
      <div class="carousel-top-left">
        <h1 class="carousel-title">
          Nghệ Sĩ Yêu Thích
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
          v-for="item in favoriteData"
          :key=item.index
          ref="carouselitem"
          :style="{ paddingLeft: paddingItem + 'px', paddingRight: paddingItem + 'px' }"
          class="carousel-item l-4 m-6 c-12">
            <div class="wrapper-item-main-img">
              <router-link 
                :to="{ name: 'Songsanlbum' }"
                class="carousel-item-link"
                @click="updateCurrentCategory(item)">
                <div 
                  class="carousel-item-thumb-image">
                  <img 
                    class="carousel-item-image" 
                    :src="item.mainimg" alt="">
                </div>
                <div class="carousel-item-overlay"></div>
                <div class="overlay-blur"></div>
                <div class="carousel-item-tooltip">
                  <button class="btn-round open-playlist-btn">
                    <i class="icon ic-play-circle-outline"></i>
                  </button>
                </div>
                <div class="wrapper-item-content">
                  <span class="item-content-title">
                    {{ item.des }}
                  </span>
                  <h1 class="item-content-band-name">
                    {{ item.band }}
                  </h1>
                  <div class="item-content-sub-image">
                    <div 
                      v-for="(sub, index) in item.subimg"
                      :key="index"
                      class="item-sub-image">
                      <div class="sub-image">
                        <img :src="sub" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: "favorite-section",
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
        return this.$refs.carouselitem.offsetWidth * this.favoriteData.length;
      }
    },
    computed: {
      ...mapState(["arraySong", "favoriteData"]),
      ...mapActions(["getFavoriteApi"])
    },
    created() {
      window.addEventListener("resize", this.setOriginPosition);
      this.getFavoriteApi
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

.carousel-item-link {
  position: relative;
  display: block;
}

.carousel-item-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(180deg,transparent 40%,rgba(0,0,0,.5));
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
  top: 35%;
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
  width: 60px;
  height: 60px;
} 

.btn-round.open-playlist-btn i {
  font-size: 60px;
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

.wrapper-item-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  color: var(--white-color);
}


.item-content-title {
  width: 100%;
  margin: 0;
  padding: 0 14px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.2px;
}

.item-content-band-name {
  width: 100%;
  margin: 0 0 10px;
  padding: 0 14px;
  line-height: 1;
}

.item-content-sub-image {
  display: flex;
  padding: 0px 10px 10px;
}

.item-sub-image {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 4px;
}

.sub-image {
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}

.sub-image img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  overflow: hidden;
}

@media screen and (min-width:1113px){
  .carousel-top-right {
    opacity: 0;
    visibility: hidden;
  }
}

</style>