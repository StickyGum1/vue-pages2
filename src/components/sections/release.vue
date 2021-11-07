<template>
  <div class="wrapper-carousel-section">
    <div class="wrapper-carousel-top">
      <div class="carousel-top-left">
        <h1 class="carousel-title">
          Mới Phát Hành
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
        v-if="arraySong"
        ref="listcarouselElmt" 
        class="carousel-list">
          <div 
            v-for="item in getArraySong"
            :key=item.index
            ref="carouselitem"
            :style="{ paddingLeft: paddingItem + 'px', paddingRight: paddingItem + 'px' }"
            class="carousel-item l-4 m-6 c-12">
            <router-link 
              :to="{ name: 'Newsongs' }"
              class="wrapper-item-content">
              <div class="wrapper-item-main-img">
                <div
                  :to="{ name: 'Newsongs' }"
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
                    <button class="btn-round open-playlist-btn">
                      <i class="icon ic-play-circle-outline"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="wrapper-item-details">
                <h3 class="item-details-title">{{ item.title }}</h3>
                <span class="item-details-singer">
                  {{ item.listsinger }}
                </span>
                <div class="item-details-bottom">
                  <span class="item-detail-number">
                    #{{ item.index + 1 }}
                  </span>
                  <span class="item-detail-date">
                    {{ item.release }}
                  </span>
                </div>
              </div>
            </router-link>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: "release-section",
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
        return this.$refs.carouselitem.offsetWidth * this.getArraySong.length;
      }
    },
    computed: {
      ...mapState(["arraySong"]),
      getArraySong(){
        return this.arraySong.filter((item)=> {
          return item.index < 9;
        })
      }
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

.carousel-item-link {
  position: relative;
  display: block;
  width: 120px;
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


.carousel-item-link:hover .carousel-item-image{
  transform: scale(1.1) translateZ(0);
}

.carousel-item:hover .carousel-item-tooltip,
.carousel-item:hover .overlay-blur {
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
  display: flex;
  padding: 15px;
  border-radius: 5px;
  text-decoration: none;
  background: var(--border-primary);
}

.wrapper-item-details {
  color: var(--white-color);
  flex: 1;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
}

.item-details-title {
  margin: 0;
}

.item-details-singer {
  color: var(--text-secondary);
  font-size: 12px;
}

.item-details-bottom {
  display: flex;
  flex: 1;
  align-items: end;
  justify-content: space-between;
  color: var(--text-secondary);
}

.item-detail-number {
  font-size: 37px;
    opacity: .4;
    color: transparent;
    font-weight: 600;
    -webkit-text-stroke: 1px var(--white-color);
    line-height: 1;
    font-family: "Roboto", sans-serif;
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