<template>
  <div class="wrapper-partner-section grid">
    <span 
        @click="togglePartnerPopup"
        class="partner-main-title">
        ĐỐI TÁC ÂM NHẠC
    </span>
    <div class="partner-section-content row">
        <div 
            v-for="partner in partnerData"
            :key="partner.id"
            class="partner-item col l-1-2 m-3 c-3">
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
  <popuppartner/>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import popuppartner from '../popup/popuppartner.vue';
export default {
    name: "partner-section",
    methods: {
        ...mapMutations(["togglePartnerPopup"])
    },
    computed: {
        ...mapState(["partnerData"]),
        ...mapActions(["getPartnerApi"])
    },
    components: {
        popuppartner
    },
    created() {
        this.getPartnerApi
    }
}
</script>

<style scoped>

.wrapper-partner-section {
    padding: 20px 0 !important;
}

.partner-main-title {
    text-align: center;
    width: 100%;
    display: block;
    margin-bottom: 25px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 1px;
    cursor: pointer;
}

.partner-main-title:hover {
    color: var(--purple-primary);
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


</style>