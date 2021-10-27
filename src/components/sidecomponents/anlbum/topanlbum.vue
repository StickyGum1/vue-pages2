<template>
    <div class="left-song-information col">
        <div v-if="currentCategory" class="wrapper-sticky-information">
            <div class="category-thumb-image">
                <img 
                    class="thumb-image"
                    :src="currentCategory.image" alt="">
            </div>
            <div class="category-content">
                <h1 class="caterogy-content-title">
                    {{ currentCategory.title }}
                </h1>
                <span class="category-date">
                    Cập nhật: 08/10/2021
                </span>
                <span class="category-singer-list">
                    {{ currentCategory.listsinger }}
                </span>
                <span class="category-like-number">
                    6K người yêu thích
                </span>
                <button class="btn-continue-play">
                    <i class="icon ic-play"></i>
                    <span class="continue-button-text">TIẾP TỤC PHÁT</span>
                </button>
                <div class="tooltips-option">
                    <div class="carousel-item-tooltip">
                        <button class="btn-round wishlist-btn">
                            <i class="icon ic-like"></i>
                        </button>
                        <button class="btn-round more-options">
                            <i class="icon ic-more"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';
export default {
    name: 'top-infor',
    computed: {
        ...mapState(["currentCategory"])
    }
}
</script>

<style scoped>

.left-song-information {
    width: 300px;
    padding-right: 30px;
}

.wrapper-sticky-information {
    position: sticky;
    top: 100px;
    left: 0;
} 

.category-thumb-image {
    line-height: 0;
    height: 0px;
    padding-bottom: 100%;
    overflow: hidden;
    border-radius: 10px;
}

.thumb-image {
    width: 100%;
    height: auto;
}

.category-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--white-color);
    text-align: center;
}

.caterogy-content-title {
    margin: 10px 0 0;
}

.category-date,
.category-singer-list,
.category-like-number {
    color: var(--text-secondary);
    font-size: 12.5px;
}

.btn-continue-play {
    padding: 5px 27px;
    border-radius: 40px;
    background-color: var(--purple-primary);
    display: flex;
    align-items: center;
    margin: 15px 0;
}

.btn-continue-play .icon {
    display: inline-flex;
    align-items: center;
    color: var(--white-color);
}

.continue-button-text {
    color: var(--white-color);
    margin-left: 5px;
}

.carousel-item-tooltip .btn-round {
    margin: 0 5px;
}

.btn-round {
    width: 35px;
    height: 35px;
}

.btn-round .icon{
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}

</style>
