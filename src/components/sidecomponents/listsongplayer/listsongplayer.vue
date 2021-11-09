<template>
    <div 
        :class="{ 'active-list-song' : isActiveListSong }"
        class="wrapper-main-list-song">
        <div class="wrapper-list-player">
            <!-- <h1>This is list player content</h1> -->
            <div class="level action-group">
                <div class="level-item">
                    <button class="level-item-btn btn-round">
                        <i class="icon ic-scale-1"></i>
                    </button>
                </div>
                <div class="level-item">
                    <button class="level-item-btn btn-round">
                        <i class="icon ic-settings"></i>
                    </button>
                </div>
                <div class="level-item">
                    <button 
                        @click="toggleListSong"
                        class="level-item-btn btn-round">
                        <i class="icon ic-go-down"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="wrapper-list-song-section">
            <listsongcarousel
                ref="listsongcalrosel"/>
        </div>
        <div class="wrapper-list-player-overlay">
        </div>
    </div>
</template>

<script>
import listsongcarousel from './listsongcarousel.vue'
import { mapState, mapMutations } from 'vuex'
export default {
    name: "list-song-player",
    methods: {
        ...mapMutations(["toggleListSongPlayer"]),
        toggleListSong(e) {
            this.$emit("toggleListSong", e.target)
        },
        moveToMiddleFake() {
            this.$refs.listsongcalrosel.moveToMiddle(this.currentSong.index);
        },
        setCurrentIndexFake() {
            this.$refs.listsongcalrosel.setCurrentIndex(this.currentSong.index);
        }
    },
    computed: {
        ...mapState(["isActiveListSong", "currentSong"])
    },
    components: {
        listsongcarousel
    }
}
</script>

<style scoped>

.wrapper-main-list-song {
    position: fixed;
    inset: calc(100% - 90px) 0 0 0;
    z-index: 1000;
    transition: .8s ease;
}

.wrapper-main-list-song.active-list-song {
    opacity: 1;
    visibility: visible;
    inset: 0;
}

.wrapper-list-player {
    position: absolute;
    inset: 0 0 90px 0;
    background-color:transparent;
    z-index: 1001;
}

.level.action-group {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1001;
    display:flex;
    align-items: center;
}

.level-item {
    margin: 0 4px;
}

.level-item:nth-child(1),
.level-item:nth-child(3) {
    width: 35px;
    height: 35px;
}

.level-item:nth-child(1) .level-item-btn,
.level-item:nth-child(3) .level-item-btn {
    width: 35px;
    height: 35px;
}

.level-item:nth-child(1) .icon,
.level-item:nth-child(3) .icon {
    font-size: 12px;
}

.level-item:nth-child(2) .icon {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}


.wrapper-list-song-section {
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 90px;
    overflow: hidden;
    display: flex;
    align-items: center;
    right: 0;
    z-index: 1010;
    transform: translateY(100%);
    opacity: 0;
    visibility: hidden;
    transition: .5s linear;
}

.wrapper-main-list-song.active-list-song .wrapper-list-song-section {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.wrapper-list-player-overlay {
    position: absolute;
    inset: 0;
    background: url(/image/background/blurbg.jpg);
    background-size: cover;
    z-index: 1000;
}
</style>