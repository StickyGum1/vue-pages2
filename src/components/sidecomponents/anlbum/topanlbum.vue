<template>
    <div class="left-song-information col">
        <div v-if="currentCategory" class="wrapper-sticky-information">
            <div class="category-wrapper-thumb-image">
                <div class="category-thumb-image">
                    <img 
                        class="thumb-image"
                        :src="currentCategory.imagecal" alt="">
                </div>
            </div>
            <div class="category-content">
                <div class="wrapper-category-information">
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
                </div>
                <div class="wrapper-action">
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
    width: 100%;
}

.category-wrapper-thumb-image {
    width: 200px;
}


.wrapper-category-information {
    text-align: left;
    display: flex;
    flex-direction: column;
}

.wrapper-sticky-information {
    position: sticky;
    top: 100px;
    left: 0;
    display: flex;
} 

.wrapper-action {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
    color: var(--white-color);
    text-align: center;
    padding: 0 20px;
    justify-content: space-between;
}

.caterogy-content-title {
    margin: 10px 0 0;
    font-size: 20px;
}

.category-date,
.category-singer-list,
.category-like-number {
    color: var(--text-secondary);
    font-size: 10.5px;
}

.carousel-item-tooltip {
    display: flex;
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

@media screen and (min-width: 1200px){
    .left-song-information {
        width: 300px;
        margin-right: 30px;
    }
    .category-wrapper-thumb-image {
        width: 100%;
    }
    .wrapper-sticky-information {
        display: block;
    } 

    .wrapper-action {
        flex-direction: column;
    }
    .btn-continue-play {
        padding: 8px 27px;
    }

    .btn-continue-play .icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
    }

    .wrapper-category-information {
        text-align: center;
    }

    .category-date,
    .category-singer-list,
    .category-like-number {
        font-size: 12.5px;
        margin-bottom: 5px;
    }

    .caterogy-content-title {
        font-size: 25px;
    }
    
}


</style>
