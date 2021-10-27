<template>
  <div class="personal-menu-myanlbum">
      <h3 class="personal-myanlbum-title personal-menu-item-title"></h3>
      <div class="personal-myanlbum-content">
          <i class="main-icon-anlbum"></i>
          <span class="myanlbum-content-text">
              Không có Anlbum trong thư viện nhạc cá nhân 
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name: "my-anblum"
}
</script>

<style scoped>
.personal-menu-item-title {
    color: var(--white-color);
    font-size: 18px;
}

.personal-myanlbum-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--alpha-bg);
    min-height: 250px;
}

.main-icon-anlbum {
    display: block;
    width: 90px;
    height: 90px;
    background-image: url(https://zjs.zadn.vn/zmp3-desktop/releases/v1.4.0/static/media/dics-music-icon.3925fc01.svg);
}

.myanlbum-content-text {
    margin-top: 20px;
    color: var(--text-secondary);
}
</style>