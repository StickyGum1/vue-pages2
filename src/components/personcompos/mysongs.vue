<template>
  <div class="personal-menu-mysong">
      <h3 class="personal-mysong-title personal-menu-item-title">Bài Hát</h3>
      <div class="personal-mysong-content">
          <i class="main-icon-song"></i>
          <span class="mysong-content-text">
              Không có Bài hát nào trong thư viện nhạc cá nhân 
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name: "my-songs"
}
</script>

<style scoped>
.personal-menu-item-title {
    color: var(--white-color);
    font-size: 18px;
}

.personal-mysong-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--alpha-bg);
    min-height: 250px;
}

.main-icon-song {
    display: block;
    width: 90px;
    height: 90px;
    background-image: url(https://zjs.zadn.vn/zmp3-desktop/releases/v1.3.18/static/media/music-icon.cfa4aa91.svg);
}

.mysong-content-text {
    margin-top: 20px;
    color: var(--text-secondary);
}
</style>