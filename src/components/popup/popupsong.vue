<template>
    <div v-if="isActivePopup" class="wrapper-popup">
        <div v-if="tempSong" class="popup-form">
            <div class="popup-song-info">
                <span class="popup-header-des">
                    Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay thế.
                </span>
                <div class="popup-thumb-img" :style="{ backgroundImage : `url(${tempSong.thumbimg})` }">
                </div>
                <span class="popup-song-name">
                    {{ tempSong.name }}
                </span>
                <span class="popup-song-singer">
                    {{ tempSong.singer }}
                </span>
            </div>
            <div class="popup-group-button">        
                <button @click="updateAndPlaySong" class="popup-play-button popup-btn">
                    <i class="icon ic-play"></i>
                    <span class="popup-button-text">
                        PHÁT BÀI HÁT
                    </span>
                </button>
                <button class="popup-add-playlist popup-btn">
                    <span class="popup-button-text">
                        THÊM VÀO DANH SÁCH PHÁT
                    </span>
                </button>
                <button class="popup-skip popup-btn">
                    <span @click="togglePopup" class="popup-button-text">
                        BỎ QUA
                    </span>
                </button>
            </div>
        </div>
        <div @click="togglePopup" class="popup-cover-layer"></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'Popup',
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations(["togglePopup", "updateCurrentSong"]),
        updateAndPlaySong() {
            this.updateCurrentSong();
        }
    },
    computed: {
        ...mapState(["isActivePopup", "tempSong"])
    }
}
</script>

<style scoped>
.wrapper-popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1010;
}

.popup-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 335px;
    background: var(--popup-bg);
    z-index: 100;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
}

.popup-header-des,
.popup-song-name {
    color: var(--white-color);
}

.popup-song-singer {
    font-size: 12px;
    color: var(--text-secondary);
}

.popup-song-info,
.popup-group-button {
    display: flex;
    flex-direction: column;
}

.popup-thumb-img {
    width: 185px;
    padding-top: 62%;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    margin: auto;
    border-radius: 6px;
    margin-top: 10px;
}

.popup-group-button {
    margin-top: 15px;
}

.popup-btn {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 20px;
}

.popup-play-button {
    background: var(--purple-primary);
    color: var(--white-color);
}

.popup-play-button .icon {
    font-size: 16px;
    display: flex;
    align-items: center;
}

.popup-add-playlist {
    background: var(--gray);
}

.popup-skip {
    color: var(--white-color);
}

.popup-cover-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--dark-alpha-80);
}

</style>