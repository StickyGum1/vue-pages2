<template>
<div 
  class="wrapper-player-containner"
  @click="consoleTesting">
  <div v-if="hasPlayer" class="wrapper-player-bar grid">
    <div class="player-bar-container row">
      <div class="player-bar-left-part col ">
        <div v-if="currentSong" class="player-song-infor">
          <div 
            ref="thumbImage" 
            class="player-thumb-img">
            <img :src="currentSong.singerimg" alt="">
          </div>
          <div class="player-song-content">
            <h3 class="player-song-name">
              {{ currentSong.name }}
            </h3>
            <span class="player-song-singer-name">
              {{ currentSong.singer }}
            </span>
          </div>
        </div>
        <div class="player-song-settings">
          <button class="player-wishlist-btn">
            <i class="icon ic-like"></i>
          </button>
          <button class="player-song-more-option">
            <i class="icon ic-more"></i>
          </button>
        </div>
      </div>
      <div class="player-bar-middle-part col">
        <div class="player-middle-top-settings">
          <button class="player-action-btn player-random-song">
            <i class="icon ic-shuffle"></i>
          </button>
          <button class="player-action-btn player-prev-song">
            <i class="icon ic-pre"></i>
          </button>
          <button 
            @click="togglePlay" 
            ref="buttonPlayer" 
            class="player-action-btn player-main-play-button">
            <i class="icon ic-play-circle-outline"></i>
            <i class="icon ic-pause-circle-outline"></i>
          </button>
          <button class="player-action-btn player-next-song">
            <i class="icon ic-next"></i>
          </button>
          <button 
            @click="handleToggleLoop"
            class="player-action-btn player-loop-song"
            ref="toggleBtn">
            <i class="icon ic-repeat"></i>
          </button>
        </div>
        <div class="player-middle-bottom-progress-bar">
          <span
            ref="currentTime" 
            class="onplay-progress-time">
            00:00
          </span>
          <div class="input-progress-bar">
            <input 
              @click="consoleLog" 
              @input="manageOnProgress"
              class="progress" 
              type="range" 
              step="0.5" 
              min="0" 
              max="100" 
              value="0"
              ref="progressBar">
          </div>
          <span
            ref="fullTime"
            class="total-progress-time">
          </span>
        </div>
      </div>
      <div class="player-bar-right-part col">
        <div class="list-level-item">
          <button class="list-level-mv">
            <i class="icon ic-mv"></i>
          </button>
        </div>
        <div class="list-level-item">
          <button class="list-level-karaoke">
            <i class="icon ic-karaoke"></i>
          </button>
        </div>
        
        <div class="list-level-item player-volumn">
          <div class="list-level-item">
            <button class="list-level-volumn">
              <i class="icon ic-volume"></i>
            </button>
          </div>
          <input type="range" class="player-volumn-value">
        </div>
        <div class="list-level-item">
          <button class="show-list-songs btn-round">
            <i class="icon ic-list-music"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <audio
    @timeupdate="syncProgressBar"
    @pause="audioPause"
    @play="audioPlaying"
    @durationchange="updateDuration"
    @loadeddata="afterLoadSong"
    @ended="afterEnded"
    ref="audio" 
    :src="[ currentSong ? currentSong.path : '' ]" 
    id="audio"></audio>
  <popup/>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import popup from '../popup/popupsong.vue'
export default {
  name: 'AudioPlayer',
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations(["togglePlayMusic", "onPlayingAudio", "onPauseAudio","onEndAudio" , "toggleLoop"]),
    ...mapActions(["toggleTest"]),
    consoleTesting() {
      console.log("Open list!");
    },
    //handle audio
    afterLoadSong() {
      if(this.hasPlayer) {
        if (this.currentSong == this.tempSong) {
          this.$refs.audio.play();
        }
        this.circleAnimation.cancel();
      }
    },
    audioPlaying(){
      this.onPlayingAudio();
      this.$refs.buttonPlayer.classList.add("playing");
      this.circleAnimation.play();
    },
    audioPause(){
      this.onPauseAudio();
      this.$refs.buttonPlayer.classList.remove("playing");
      this.circleAnimation.pause();
    },
    afterEnded() {
      this.$refs.buttonPlayer.classList.remove("playing");
      this.onEndAudio();
      this.circleAnimation.cancel();
      this.$refs.progressBar.value = 0;
      this.updateBackgroundProgress(0);
    },
    //Handle tools player
    togglePlay() {
      this.togglePlayMusic();
      if(this.isPlaying) {
        this.$refs.buttonPlayer.classList.remove("playing");
        this.circleAnimation.pause();
        } else {
        this.$refs.buttonPlayer.classList.add("playing");
        this.circleAnimation.play();
      }
    },
    handleToggleLoop() {
      this.toggleLoop();
      if (this.isLooping) {
        this.$refs.toggleBtn.classList.add("active-loop");
      } else {
        this.$refs.toggleBtn.classList.remove("active-loop");
      }
      
    },
    //Hanndle progress bar 
    syncProgressBar() {
      if(this.hasPlayer) {
        const fullTime = this.$refs.audio.duration;
        const currentTime = this.$refs.audio.currentTime;
        const timePercent = (currentTime * 100) / fullTime;
        if (fullTime) {
          this.$refs.progressBar.value = timePercent;
          this.$refs.currentTime.innerHTML = this.convertDuration(currentTime);
          this.updateBackgroundProgress(timePercent);
        }
      }
    },
    updateBackgroundProgress(percent) {
      this.$refs.progressBar.style.background = `linear-gradient(90deg, #ffffff ${percent}%, hsla(0,0%,100%,0.3) 0%)`;
    },
    convertDuration(time) {
      let minutes = Math.floor(time / 60);
      let seconds = (time - minutes * 60).toFixed(0);
      return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
    updateDuration() {
      if(this.hasPlayer) {
        let time = this.$refs.audio.duration;
        this.$refs.fullTime.innerHTML = this.convertDuration(time);
      }
    },
    manageOnProgress(e) {
      this.updateBackgroundProgress(e.target.value);
      const currentProgress = (this.$refs.audio.duration * e.target.value) / 100;
      this.$refs.audio.currentTime = currentProgress;
      this.$refs.audio.play();
    },
  },
  computed: {
    ...mapState(["hasPlayer", "currentSong", "arraySong", "isPlaying", "audio", "isLooping", "tempSong"]),
    circleAnimation() {
      let circleAmt = this.$refs.thumbImage.animate([
        { transform: 'rotate(360deg)'}
      ], {
        duration: 10000,
        iterations: Infinity,
      });
      return circleAmt;
    },
    
  },
  components: {
    popup
  },
  mounted() {
    this.audio[0] = this.$refs.audio;
  }
}
</script>

<style scoped>
.player-bar-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

/* Left part css */

.player-bar-left-part,
.player-bar-right-part {
  width: 30%;
  height: 100%;
  overflow: hidden;
}

.player-bar-left-part {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.player-song-infor {
  display: flex;
  align-items: center;
}

.player-song-content {
  margin-left: 10px;
}

.player-thumb-img {
  width: 65px;
  height: 65px;
  overflow: hidden;
  border-radius:50px;
  border: 2px solid grey;
}

.player-thumb-img img{
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
}

.player-song-name {
  font-size: 14px;
  font-weight:500;
  color: var(--white-color);
  margin: 0;
  letter-spacing: 1.5px;
}

.player-song-settings {
  position: absolute;
  right: 25%;
}

.player-song-settings button {
  color: var(--white-color);
}

.player-song-singer-name {
  color: var(--text-secondary);
  letter-spacing: 1.5px;
}

.player-song-settings .icon {
  font-size: 16px;
  padding: 0 10px;
}

/* Middle part css */

.player-bar-middle-part {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%
}

.player-middle-top-settings {
  display: flex;
  align-items: center;
}

.player-action-btn {
  color: var(--white-color);
  width: 32px;
  height: 32px;
  border-radius: 50px;
  overflow: hidden;
  margin: 0 5px;
}

.player-main-play-button {
  width: 40px;
  height: 40px;
}

.player-action-btn.player-main-play-button:hover {
  background: transparent;
}

.player-main-play-button:hover .icon,
.player-loop-song.active-loop .icon{
  color: var(--link-text-hover);
}

.player-action-btn:hover {
  background: hsla(0,0%,100%,.1);
}

.player-middle-top-settings .icon {
  font-size: 16px;
}

.player-main-play-button .icon{
  font-size: 40px;
}

.player-main-play-button i:nth-child(1){
  display: unset;
}

.player-main-play-button i:nth-child(2){
  display: none;
}

.player-main-play-button.playing i:nth-child(1){
  display: none;
}

.player-main-play-button.playing i:nth-child(2){
  display: unset;
}

.player-middle-bottom-progress-bar {
  display: flex;
  width: 100%;
  align-items: center;
}

.input-progress-bar {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0 5px;
}

.progress,
.player-volumn-value {
  position: relative;
  width: 100%;
  -webkit-appearance: none;
  height: 2px;
  outline: none;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: pointer;
  background: hsla(0,0%,100%,0.3);
}

.progress::-webkit-slider-thumb,
.player-volumn-value::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: var(--white-color);
  width: 12px;
  height: 12px;
  border-radius: 50px;
  cursor: pointer;
  visibility: hidden;
}

.input-progress-bar:hover .progress,
.player-volumn:hover .player-volumn-value{
  height: 6px;
  border-radius: 50px;
  cursor: pointer;
}

.input-progress-bar:hover .progress::-webkit-slider-thumb,
.player-volumn:hover .player-volumn-value::-webkit-slider-thumb {
  -webkit-appearance: none;
  visibility: visible;
  appearance: none;
  background: var(--white-color);
  width: 12px;
  height: 12px;
  border-radius: 50px;
  cursor: pointer;
}

.onplay-progress-time {
  width: 45px;
  color: #fff;
  opacity: 0.5;
  font-size: 13px;
  text-align: center;
}

.total-progress-time {
  width: 45px;
  font-size: 13px; 
  text-align: center;
  color: #ffffff;
}

/* Right content */
.player-bar-right-part {
  display: flex;
  justify-content: right;
  align-items: center;
}

.list-level-item button {
  padding: 5px;
}

.list-level-item .icon {
  font-size: 16px;
  color: var(--white-color);
  padding: 5px;
}

.list-level-mv .icon {
  font-size: 20px;
}

.show-list-songs.btn-round {
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-level-item.player-volumn {
    display: flex;
    align-items: center;
    padding-right: 20px;
}

.player-volumn-value {
  width: 75px;
}

@media screen and (max-width:1024px) {
  .player-song-settings,
  .player-volumn-value {
    display: none;
  }
}
</style>