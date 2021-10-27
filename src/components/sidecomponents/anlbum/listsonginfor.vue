<template>
  <div 
    v-if="arraySong" 
    class="right-category-content"
    :class="{'category-playing' : isPlaying}" >
    <div class="category-heading">
      <span class="category-list-open-title">
        Lời tựa
      </span>
      <span class="category-description">
        {{ currentCategory.title }}
      </span>
    </div>
    <div class="category-body">
      <div class="category-des">
        <div 
          v-if="!activeCheckList"
          class="category-des-wrapper row">
          <div class="category-des-first col l-6 m-6">
            <span>
              BÀI HÁT
            </span>
          </div>
          <div class="category-des-second col l-2 m-2">
            <span>
              THỜI GIAN
            </span>
          </div>
          <span class="category-des-third col l-4 m-4">
            <button class="category-des-filter-btn">
              Mặc định
              <i class="icon ic-go-down"></i>
            </button>
          </span>
        </div>
        <div 
          v-if="activeCheckList"
          class="category-add-playlist-wrapp">
          <button class="song-node-button">
              <input 
                class="checkbox" 
                id="checkallbox" 
                type="checkbox">
              <label 
                class="label-for-checkbox"
                for="checkallbox"></label>
          </button>
          <button class="category-add-playlist-btn">
              <i class="icon ic-add-play-now"></i>
              <span class="category-add-playlist-text">
                THÊM VÀO DANH SÁCH PHÁT
              </span>
          </button>
          <button class="category-add-playlist btn-round">
            <i class="icon ic-more" data-v-36b10f9f=""></i>
          </button>
        </div>
      </div>
      <div 
        :class="{ 'active-check-list' : activeCheckList }"
        class="category-list">
        <div
          v-for="item in arraySong"
          class="category-item row"
          :class="[(item.index == defaultActive || item == currentSong) ? 'active' : '', item == currentSong ? 'current-song' : '']"
          :key="item.index"
          @mouseover="handleHover(item.index)"
          @click="handleClickItem(item.index)">
          <div class="category-item-infor col l-6 m-6">
            <button class="song-node-button">
              <i class="icon-song-node icon ic-song"></i>
              <input 
                class="checkbox" 
                :id="`checkbox-${item.index}`" 
                type="checkbox"
                @click="handleClickCheck">
              <label 
                class="label-for-checkbox"
                :for="`checkbox-${item.index}`"></label>
            </button>
            <div 
              @click="handleClickThumb"
              class="item-song-thumb">
              <img 
                class="song-thumb-image"
                :src="item.singerimg" 
                alt="">
              <div class="overlay-thumb-image"></div>
              <button class="play-song-button">
                <i class="icon action-play ic-play"></i>
                <i class="icon item-playing-active"></i>
              </button>
            </div>
            <div class="item-song-details">
              <span class="song-details-name">
                {{ item.name }}
              </span>
              <span class="song-details-des">
                {{ item.singer }}
              </span>
            </div>
          </div>
          <div class="category-item-duration l-2 m-2">
            03:26
          </div>
          <div class="category-item-tooltips l-4 m-4">
            <button class="category-item-btn btn-round">
              <i class="icon ic-karaoke"></i>
            </button>
            <button class="category-item-btn btn-round">
              <i class="icon ic-like"></i>
            </button>
            <button class="category-item-btn btn-round">
              <i class="icon ic-more"></i>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'list-song-infor',
    data() {
      return {
        defaultActive: 0,
        tempIndex: 0,
        countActiveCheckbox: 0,
        activeCheckList: false
      }
    },
    methods: {
      ...mapMutations(["updateTempSong", "updateCurrentSong", "togglePlayMusic"]),

      handleClickItem(index) {
        this.updateTempSong(index);
        this.defaultActive = index;
      },
      handleHover(index) {
        this.tempIndex = index;
      },
      handleClickThumb() {
        this.handleClickItem(this.tempIndex);
        this.updateCurrentSong();
        this.togglePlayMusic();
      },
      handleClickCheck(e) {
        if (e.target.checked) {
          this.countActiveCheckbox++;
          this.activeCheckList = true;
        } else {
          this.countActiveCheckbox--;
          if (this.countActiveCheckbox == 0) {
            this.activeCheckList = false;
          }
        }
      }
    },
    computed: {
      ...mapState(["arraySong", "currentCategory", "isPlaying", "currentSong", "tempSong"])
    }
}
</script>
<style scoped>
.right-category-content {
  flex: 1;
}

.category-des-first,
.category-des-second {
  display: flex;
  align-items: center;
}

.category-des-second {
  text-align: center;
}

.category-list-open-title,
.song-node-button,
.category-des span,
.category-des button,
.song-details-des,
.category-item-duration,
.category-item-btn .icon {
  color: var(--text-secondary);
}

.category-des {
  margin: 30px 0 20px;
}

.category-add-playlist-btn {
  margin-left: 10px;
}

.category-add-playlist-wrapp {
  display: flex;
  align-items: center;
}

.category-des-filter-btn,
.category-add-playlist-btn {
  padding: 3px 16px;
  border: 1px solid var(--text-secondary);
  border-radius: 50px;
}

.category-add-playlist-btn i {
  font-size: 11px;
}

.category-add-playlist.btn-round {
  width: 25px;
  height: 25px;
  background: var(--alpha-bg);
  margin-left: 10px;
}

.category-add-playlist.btn-round i {
  font-size: 10px;
}

.category-add-playlist-btn .category-add-playlist-text {
  font-size: 9.5px;
}

#checkallbox {
  display: none;
}

#checkallbox ~ label{
  display: block;
}

.active-check-list .icon-song-node {
  display: none;
}

.active-check-list .label-for-checkbox {
  display: block;
}

.category-des-first {
  padding-left: 30px;
}


.category-des-third {
  text-align: right;
}

.category-des-filter-btn i {
  font-size: 12px;
  margin-left: 8px;
}

.category-description {
  color: var(--white-color);
}

.category-item {
  padding: 8px 0;
  border-radius: 5px;
  overflow: hidden;
}

.category-item:hover {
  background: var(--alpha-bg);
}

.category-item:hover .checkbox~label{
  display: block;
}

.category-item:hover .icon-song-node,
.category-item.active .icon-song-node {
  display: none;
}

.category-item.active {
  background: var(--alpha-bg);
}

.category-item.active .checkbox~label{
  display: block;
  border-color: var(--white-color);
}

.category-item.active .song-details-des,
.category-item.active .category-item-duration,
.category-item.active .icon{
  color: var(--white-color);
}

.category-item-infor {
  display: flex;
  align-items: center;
}

.song-node-button {
  position: relative;
  margin-left: 5px;
  width: 14px;
  height: 14px;
}

.checkbox ~ label{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid var(--border-box);
  border-radius: 3px;
  overflow: hidden;
}

.song-node-button .checkbox {
  background-color: transparent;
  cursor: pointer;
}

input[type="checkbox"], 
.checkbox ~ label {
  display: none;
}

.checkbox:checked ~ label{
  color: red;
}

.checkbox:checked ~ label::after{
    content: "";
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    right: 0;
    bottom: 0;
    border-bottom: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    height: 52%;
    width: 24%;
}

.song-node-button .icon {
  font-size: 13px;
}

.item-song-thumb {
  position: relative;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 5px;
  margin: 0 10px;
}

.song-thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-thumb-image {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000000;
  opacity: .4;
  visibility: hidden;
}

.icon.item-playing-active {
  background: url(https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/icons/icon-playing.gif);
  margin: auto;
  display: none;
  background-size: contain;
  width: 17px;
  height: 17px;
  border-radius: unset;
}

.category-playing .current-song .play-song-button i:nth-child(1) {
  display: none;
}

.category-playing .current-song .play-song-button i:nth-child(2) {
  display: block;
}

.play-song-button {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: hidden;
}

.category-item.active .overlay-thumb-image,
.category-item.active .play-song-button{
  visibility: visible;
}

.category-item:hover .overlay-thumb-image,
.category-item:hover .play-song-button{
  visibility: visible;
}

.icon.action-play {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.play-song-button i {
  font-size: 18px;
  color: var(--white-color);
}

.song-details-name {
  color: var(--white-color);
}

.song-details-des {
  font-size: 12px;
}


.item-song-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.song-details-name {
  font-size: 15px;
  margin: 0;
  line-height: 1.5;
}

.song-details-des {
  line-height: 1.5;
}

.category-item-duration {
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-item-tooltips {
  display: flex;
  justify-content: right;
}

.btn-round {
  background: transparent;
  width: 33px;
  height: 33px;
}

.btn-round i {
  font-size: 16px;
}

</style>
