<template>
  <div id="nav" :class="{ active : isAvtiveNavBar}">
    <div class="sidebar-wrapper">
      <div class="zing-logo">
      <button class="zing-btn button">
          <div class="zmp3-logo"></div>
      </button>
      </div>

      <div class="zing-navbar-main">
        <ul class="zing-navbar-menu">
            <navlink 
              v-for="item in navlinks" 
              :key="item.id"
              :item="item"/>
        </ul>
      </div>
      <div class="divide-line"></div>
      <div class="zing-navbar-sub">
        <div class="zing-navbar-sub__scrollable" :class="{ scrolling : isScrollingSubMenu }" ref="navbarsub">
          <ul class="zing-navbar-menu">
              <navlink 
                v-for="item in navlinksSub" 
                :key="item.id"
                :item="item"/>
          </ul>
          <div class="vip-banner-sidebar">
            <div class="text">
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </div>
            <a href="#" class="btn">
              MUA VIP
            </a>
          </div>
          <ul class="zing-navbar-menu library">
            <div class="main-title">
              THƯ VIỆN
            </div>
            <li data-id="5" class="zing-nav-item">
              <a href="/newsongs" class="">
                <i class="icon">
                  <img src="https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg">
                </i>
                <span class="route-title">Bài hát</span>
              </a>
              </li>
              <li data-id="5" class="zing-nav-item">
              <a href="/newsongs" class="">
                <i class="icon">
                  <img src="https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg">
                </i>
                <span class="route-title">Playlist</span>
              </a>
              </li>
              <li data-id="5" class="zing-nav-item">
              <a href="/newsongs" class="">
                <i class="icon">
                  <img src="https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg">
                </i>
                <span class="route-title">Gần đây</span>
              </a>
              </li>
          </ul>
        </div>
          <div class="zing-navbar-add-playlist">
            <button class="btn add-playlist">
              <i class="icon ic-add"></i>
              <span>Tạo playlist mới</span>
            </button>
            <button class="btn show-full-navbar" @click="ChangeNavbarWidth">
              <i v-show="!isAvtiveNavBar" class="icon ic-go-right"></i>
              <i v-show="isAvtiveNavBar" class="icon ic-go-left"></i>
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import navlink from '../navlinks/navlinktop.vue'


export default {
    name: 'Navigation',
    computed: {
      ...mapState(["navlinks", "navlinksSub", "isAvtiveNavBar", "isScrollingSubMenu"])
    },
    methods: {
      ...mapMutations(["ChangeNavbarWidth", "checkScrllSubMenu"])
    },
    components: {
      navlink
    },
    mounted() {
      const navbarsub = this.$refs.navbarsub;
      navbarsub.onscroll = ()=> {
        this.checkScrllSubMenu(navbarsub.scrollTop);
      }
    }
}
</script>

<style>
</style>