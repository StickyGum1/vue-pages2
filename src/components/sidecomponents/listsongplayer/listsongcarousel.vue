<template>
  <div class="wrapper-carousel-section">
    <div class="wrapper-carousel-top">
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
        :style="{ transform : `translateX(-${stackWidthInit}px)`}"
        class="carousel-list">
          <div 
            v-for="item in arraySong"
            :key=item.index
            ref="carouselitem"
            :class="(item.index == currentSong.index) ? 'playing-song' : ''"
            :style="{ paddingLeft: paddingItem + 'px', paddingRight: paddingItem + 'px' }"
            class="carousel-item l-2-4 m-3 c-6">
              <div class="wrapper-item-main-img">
                <div 
                  class="carousel-item-link">
                  <div class="carousel-item-thumb-image">
                    <img
                      class="carousel-item-image" 
                      :src="item.thumbforlist" alt="">
                  </div>
                  <div class="overlay-blur"></div>
                  <div 
                    :class="(!isPlaying) ? 'non-playing' : 'is-playing'"
                    class="carousel-item-tooltip">
                    <button class="btn-round wishlist-btn">
                      <i class="icon ic-like"></i>
                    </button>
                    <button 
                      @click="handleClickPlayBtn(item)"
                      ref="playbutton"
                      class="btn-round open-playlist-btn player-main-btn">
                      <i class="icon ic-play-circle-outline"></i>
                      <i class="icon ic-pause-circle-outline"></i>
                    </button>
                    <button class="btn-round more-options">
                      <i class="icon ic-more"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="carousel-item-infor">
                <h2 class="item-infor-title item-title-link">
                  {{ item.name }}
                </h2>
                <span 
                  class="item-infor-des">
                  {{ item.listsinger }}
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
    name: "list-song-carousel-section",
    data() {
      return {
        paddingItem: 12, 
        stackWidth: 0,
        stackWidthInit: 0,
        currentIndex: 0,
      }
    },
    methods: {
      ...mapMutations(["updateCurrentCategory", "updateTempSong", "updateCurrentSong","togglePlayMusic"]),
      setOriginPosition() {
        try {
          this.stackWidth = 0;
          this.$refs.rightbtn.disabled = false;
          this.$refs.leftbtn.disabled = true;
          this.$refs.listcarouselElmt.setAttribute("style", `transform: translate3d(${this.stackWidth}px, 0, 0);`);
        } catch (e) {

        }
      },
      handleClickPlayBtn(item) {
        if (item == this.currentSong) {
          this.togglePlayMusic();
        } else {
          this.updateTempSong(item.index);
          this.updateCurrentSong();
        }
        this.moveToMiddle(item.index);
      },
      moveToMiddle(index){
        try {
          this.setCurrentIndex(this.currentSong.index);
          console.log(this.currentIndex);
          this.stackWidthInit = this.getWidthNormalItem() * index + (this.getWidthActiveSong() / 2);
        } catch (e) {
          console.log("error!")
        }
      },
      moveToRight() {
        if(this.currentIndex + 1 != this.arraySong.length) {
          if(this.currentIndex == this.currentSong.index || this.currentIndex + 1 == this.currentSong.index) {
            this.stackWidthInit += (this.getWidthActiveSong() + this.getWidthNormalItem()) / 2;
            this.currentIndex += 1;
            this.$refs.leftbtn.disabled = false;
          } else if(this.currentIndex != this.currentSong.index) {
            this.stackWidthInit += this.getWidthNormalItem();
            this.$refs.leftbtn.disabled = false;
            this.currentIndex += 1;
          }
        }
        if(this.currentIndex + 1 == this.arraySong.length) {
          this.$refs.rightbtn.disabled = true;
        }
      },
      moveToLeft() {
        if(this.currentIndex - 1 >= 0) {
          if(this.currentIndex == this.currentSong.index || this.currentIndex - 1 == this.currentSong.index) {
            this.stackWidthInit -= (this.getWidthActiveSong() + this.getWidthNormalItem()) / 2;
            this.currentIndex -= 1;
            this.$refs.rightbtn.disabled = false;
          } else if(this.currentIndex != this.currentSong.index) {
            this.stackWidthInit -= this.getWidthNormalItem();
            this.$refs.rightbtn.disabled = false;
            this.currentIndex -= 1;
          }
        }
        if(this.currentIndex == 0) {
          this.$refs.leftbtn.disabled = true;
        }
        console.log(this.currentIndex);
      },
      getWidthActiveSong(){
        return document.querySelector(".wrapper-list-song-section .playing-song.carousel-item").clientWidth;
      },
      getWidthNormalItem(){
        return document.querySelector(".wrapper-list-song-section .carousel-item:not(.playing-song)").clientWidth;
      },
      setCurrentIndex(currentIndex) {
        this.currentIndex = currentIndex;
        if(this.currentIndex == 0) {
          this.$refs.rightbtn.disabled = false;
          this.$refs.leftbtn.disabled = true;
        } else if (this.currentIndex + 1 == this.arraySong.length) {
          this.$refs.rightbtn.disabled = true;
          this.$refs.leftbtn.disabled = false;
        } else {
          this.$refs.rightbtn.disabled = false;
          this.$refs.leftbtn.disabled = false;
        }
      }
    },
    computed: {
      ...mapState(["arraySong", "currentSong", "isPlaying"])
    },
    created() {
      window.addEventListener("resize", ()=> {
        setTimeout(()=> {
          this.moveToMiddle(this.currentSong.index);
        }, 500)
      });
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
  position: relative;
  left: 50%;
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
  display: flex;
  flex-direction: column;
  justify-content: end;
  transition: .5s linear;
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


.playing-song .is-playing .player-main-btn .icon:nth-child(1){
  display: none;
}

.playing-song .is-playing .player-main-btn .icon:nth-child(2){
  display: unset;
}

.wishlist-btn i,
.more-options i {
  font-size: 20px;
}

.wishlist-btn:hover,
.more-options:hover {
  background: var(--tab-active-bg);
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
  text-align: center;
}

.item-title-link {
  text-decoration: none;
  color: var(--white-color);
}

.item-infor-des {
  color: var(--text-secondary);
  width: 100%;
  display: block;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.playing-song.carousel-item {
  flex: 0 0 60%;
  max-width: 60%;
}

@media (min-width: 740px) {
    .playing-song.carousel-item {
      flex: 0 0 30%;
      max-width: 30%;
    }
}

@media (min-width: 1113px) {
    .playing-song.carousel-item {
      flex: 0 0 25%;
      max-width: 25%;
    }
}


</style>