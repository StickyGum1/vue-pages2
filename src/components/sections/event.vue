<template>
  <div class="wrapper-collection-section">
    <div 
      v-if="eventData"
      class="wrapper-carousel-top">
      <div class="carousel-top-left">
        <h1 class="carousel-title">
          Sự kiện
        </h1>
      </div>
      <div
        :class="(eventData.length > 3) ? 'show-on-desk' : ''" 
        class="carousel-top-right">
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
      v-if="eventData"
      class="wrapper-carousel-content"
      :style="{ marginLeft: -paddingItem + 'px', marginRight: -paddingItem + 'px' }">
      <div
        ref="listcarouselElmt" 
        class="carousel-list">
          <div 
            v-for="(item, index) in eventData"
            :key=index
            ref="carouselitem"
            :style="{ paddingLeft: paddingItem + 'px', paddingRight: paddingItem + 'px' }"
            class="carousel-item l-4 m-6 c-12">
            <div class="wrapper-item-main-img">
              <a 
                href="#"
                class="carousel-item-link">
                <div class="carousel-item-thumb-image">
                  <img 
                    class="carousel-item-image" 
                    :src="item.image" alt="">
                </div>
                <div class="carousel-item-infor">
                  <span class="carousel-item-type">
                    {{ (item.isBirthday) ? 'Sự kiện' : 'Phát hành bài hát' }}
                  </span>
                  <h3 class="carousel-item-main-title">
                    {{ (item.isBirthday) ? `Sinh Nhật Sao x ${item.singerName}`  : `${item.songName} - ${item.singerName}` }} 
                  </h3>
                  <span class="carousel-item-time">
                    {{ item.time }}
                  </span>
                </div>
                <div class="carousel-item-overlay"></div>
              </a>
            </div>
            <div class="carousel-item-wrapper">
              <div class="item-wrapper-left">
                <span class="item-left-text">
                  {{ (item.isBirthday) ? 'Lượt chúc mừng' : 'Lượt quan tâm' }}
                </span>
                <div class="left-follower-content">
                  <div class="wrapper-follower">
                    <div 
                      v-for="follower in getListFollowers(item.followersId)"
                      :key="follower.id"
                      class="follower-item">
                      <img 
                        class="follower-item-image"
                        :src="follower.profile.avt" alt="">
                    </div>
                  </div>
                  <span class="follower-number">+{{ Math.floor(Math.random() * 200) }}</span>
                </div>
              </div>
              <div class="item-wrapper-right">
                <button 
                  v-if="!item.isCongratulation"
                  @click="congratulation(item)"
                  class="purple-btn flex-content-btn">
                  {{ (item.isBirthday) ? 'CHÚC MỪNG' : 'QUAN TÂM' }}
                </button>
                <button 
                  v-if="item.isCongratulation"
                  @click="undoCongratulation(item)"
                  class="purple-btn flex-content-btn congratulated">
                  {{ (item.isBirthday) ? 'ĐÃ CHÚC MỪNG' : 'ĐÃ QUAN TÂM' }}
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: "event-section",
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
        return this.$refs.carouselitem.offsetWidth * this.eventData.length;
      },
      // Hanlde congratulation button
      congratulation(item) {
        item.isCongratulation = true;
      },
      undoCongratulation(item) {
        item.isCongratulation = false;
      },
      getListFollowers(listid){
        return this.listUser.filter((item)=>{
          return listid.includes(item.profile.id);
        })
      }
    },
    computed: {
      ...mapState(["eventData", "listUser"]),
      ...mapActions(["getEventApi"]),
    },
    created() {
      window.addEventListener("resize", this.setOriginPosition);
      this.getEventApi
    }
}
</script>

<style scoped>
.wrapper-collection-section {
  width: 100%;
  padding-bottom: 30px;
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

.carousel-item-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(180deg,transparent 27%,rgba(0,0,0,.78));
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
  padding-bottom: 55%;
}


.carousel-item {
  position: relative;
}

.wrapper-radio-icon {
  display: none;
  position: absolute;
  right: 0;
  bottom: 30%;
  z-index: 100;
}

.carousel-item-link {
  position: relative;
  text-decoration: none;
  display: block;
  color: var(--white-color);
  border-radius: 5px;
  overflow: hidden;
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

.carousel-item-infor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  z-index: 100;
}

.carousel-item-type {
  font-size: 10px;
  background: var(--white-color);
  color: var(--purple-primary);
  padding: 1px 3px;
  border-radius: 2.5px;
}

.carousel-item-main-title {
  margin: 0;
}

.carousel-item-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 12.5px; 
}

.item-wrapper-left {
  display: flex;
  flex-direction: column;
  color: var(--white-color);
  cursor: default;
  overflow: hidden;
}

.left-follower-content {
  display: flex;
}

.wrapper-follower {
  display: flex;
  flex-direction: row-reverse;
  justify-content: left;
}

.follower-item {
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 2px solid var(--popup-bg);
  overflow: hidden;
  margin-right: -5px;
}

.follower-item-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.follower-number {
  color: var(--text-secondary);
  padding-left: 6px;
}

.flex-content-btn {
  padding: 0 20px;
}

.congratulated {
  background: transparent;
  border: 1px solid var(--purple-primary);
}


@media (min-width: 1113px) {
  .carousel-top-right {
    opacity: 0;
    visibility: hidden;
  }

  .show-on-desk.carousel-top-right {
    display: flex;
  }
}

</style>