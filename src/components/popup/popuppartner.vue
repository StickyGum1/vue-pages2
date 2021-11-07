<template>
    <div v-if="isActivePartner" class="wrapper-popup">
        <div class="popup-form">
            <button 
                @click="togglePartnerPopup"
                class="popup-exit-btn">
                <i class="icon ic-close"></i>
            </button>
            <span class="partner-main-title">
                ĐỐI TÁC ÂM NHẠC
            </span>
            <div
                v-if="partnerData"
                class="partner-section-content row">
                <div
                    v-for="partner in partnerData"
                    :key="partner.id"
                    class="partner-item col l-2-4 m-3 c-3">
                    <div class="partner-item-main">
                        <div class="partner-item-wrapper-image">
                            <div class="partner-item-main-image">
                                <img 
                                    class="partner-item-image"
                                    :src="partner.image" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="togglePartnerPopup" class="popup-cover-layer"></div>
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
        ...mapMutations(["togglePartnerPopup"]),
        updateAndPlaySong() {
            this.updateCurrentSong();
        }
    },
    computed: {
        ...mapState(["isActivePartner", "partnerData"])
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
    width: 95%;
    max-width: 670px;
    background: var(--popup-bg);
    z-index: 100;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
}

.popup-exit-btn {
    position: absolute;
    right: 18px;
    top: 18px;
    width: 20px;
    height: 20px;
}

.popup-exit-btn .icon {
    font-size: 20px;
    color: var(--white-color);

}

.partner-main-title {
    text-align: center;
    width: 100%;
    display: block;
    margin-bottom: 25px;
    font-size: 15px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 2px;
    cursor: default;
}

.partner-section-content {
    justify-content:center;
}

.partner-item {
    position: relative;
    margin-bottom: 15px;
}

.partner-item-wrapper-image {
    height: 0;
    padding-bottom: 53.8%;
    overflow: hidden;
}

.partner-item-main {
    border-radius: 5px;
    overflow: hidden;
    background-color: var(--white-color);
}

.partner-item-main-image {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.partner-item-image {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
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