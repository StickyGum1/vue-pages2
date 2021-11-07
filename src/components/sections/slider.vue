<template>
    <div class="wrapper-slider-section">
        <div class="wrapper-slider-list grid row" v-if="arraySong">
            <div 
                @click="togglePopup(index)" 
                v-for="(item, index) in arrayClassEx" 
                :key="index" 
                class="slider-item col l-4" 
                :class="item" 
                :data-class="index">
                <div class="slider-item-content">
                    <img :src="arraySong[index].thumbimg"/>
                </div>
            </div>
        </div>
        <button ref="prevslider" @click="changeClassListReverse()" class="btn-round btn-prev">
            <i class="icon ic-go-left"></i>
        </button>
        <button @click="changeClassList()" class="btn-round btn-next">
            <i class="icon ic-go-right"></i>
        </button>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: "slider-section",
    data() {
        return {
            autoRunSlider: true,
            timeRun: 5000,
            arrayClassEx: [
                'first-item',
                'next-item',
                'last-item',
                'previous-item',
                'selected-item',
                'add-item'    
            ]
        }
    },
    methods: {
        ...mapMutations(["togglePopup"]),
        changeClassList() {
            let newArray = [];
            for(let i = 0; i < this.getArrayLength; i++) {
                if (i - 1 < 0) {
                    newArray[i] = this.arrayClassEx[this.getArrayLength - 1];
                } else {
                    newArray[i] = this.arrayClassEx[i-1];
                }
            }
            this.arrayClassEx = newArray;
        },
        changeClassListReverse() {
            let newArray = [];
            for(let i = 0; i < this.getArrayLength; i++) {
                if (i == this.getArrayLength - 1) {
                    newArray[i] = this.arrayClassEx[0];
                } else {
                    newArray[i] = this.arrayClassEx[i+1];
                }
            }
            this.arrayClassEx = newArray;
        }
    },
    computed: {
        ...mapState(["arraySong", "currentSong"]),
        getArrayLength() {
            return this.arrayClassEx.length;
        },
        getPrevBtn() {
            return this.$refs.prevslider;
        }
    },
    mounted() {
        let autoPlay;
        if (this.autoRunSlider) {
            autoPlay = setInterval(()=> {
                this.changeClassList();
                // this.changeClassListReverse();
            }, this.timeRun)
        }
        this.getPrevBtn.onclick = ()=> {
            clearInterval(autoPlay);
            autoPlay = setInterval(()=> {
                this.changeClassList();
            }, this.timeRun)
        }
    }
}
</script>

<style scoped>
.wrapper-slider-section {
    position: relative;
    margin: 0 -15px;
}

.wrapper-slider-section:hover .btn-prev,
.wrapper-slider-section:hover .btn-next {
    opacity: 1;
    visibility: visible;
}

.wrapper-slider-list {
    position: relative;
    height: 240px;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-right: 0;
    overflow: hidden;
}

.slider-item {
    height: 240px;
    padding: 15px;
    position: absolute;
    width: 33.333333%;
}

.first-item {
    transform: translateX(-100%); 
    z-index: 1;
    opacity: 1;
    transition: .7s ease;
}

.next-item {
    transform: translateX(0%); 
    z-index: 10;
    opacity: 1;
    transition: .7s ease;
}

.last-item {
    transform: translateX(100%); 
    z-index: 1;
    opacity: 1;
    transition: .7s ease;
}

.previous-item {
    transform: translateX(22%); 
    opacity: 0;
    z-index: 0;
    transition: .7s ease;
}
.selected-item {
    transform: translateX(0); 
    opacity: 0;
    z-index: 0;
    transition: .7s ease;
}
.add-item {
    transform: translateX(-22%); 
    opacity: 0;
    z-index: 0;
    transition: .7s ease;
}

.slider-item-content {
    height: 100%;
    overflow: hidden;
    border-radius: 7px;
    cursor: pointer;
}

/* .slider-item[data-class="0"] .slider-item-content {
    background: red;
}

.slider-item[data-class="1"] .slider-item-content {
    background: blue;
}

.slider-item[data-class="2"] .slider-item-content {
    background: yellow;
}

.slider-item[data-class="3"] .slider-item-content {
    background: purple;
}

.slider-item[data-class="4"] .slider-item-content {
    background: orange;
}

.slider-item[data-class="5"] .slider-item-content {
    background: white;
} */


.slider-item-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.btn-round {
    width: 55px;
    height: 55px;
}

.btn-prev {
    position: absolute;
    top: 50%;
    left:20px;
    transform: translateY(-50%);
    z-index: 200;
    opacity: 0;
    visibility: hidden;
    transition: .1s ease;
}

.btn-next {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 200;
    opacity: 0;
    visibility: hidden;
    transition: .1s ease;
}

.btn-next .icon,
.btn-prev .icon {
    font-size: 20px;
}

/* responsive */
@media screen and (max-width: 1024px) {
    .slider-item {
        height: 200px;
        padding: 12px;
        position: absolute;
        width: 50%;
    }

    .wrapper-slider-list {
        position: relative;
        height: 200px;
    }

    .first-item {
        transform: translateX(-50%); 
    }

    .next-item {
        transform: translateX(50%); 
    }

    .last-item {
        transform: translateX(150%); 
        z-index: 0;
        opacity: 0;
    }
    .wrapper-slider-section {
        position: relative;
        margin: 0 -12px;
    }
}

@media screen and (max-width: 600px) {
    .slider-item {
        width: 100%;
    }
    .first-item {
        transform: translateX(-100%);
        opacity: 0;
    }

    .next-item {
        transform: translateX(0%); 
    }

    .last-item {
        transform: translateX(100%); 
        z-index: 0;
        opacity: 0;
    }
}

</style>