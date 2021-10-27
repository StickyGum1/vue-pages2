<template>
  <div class="personal-menu-uploaded">
      <h3 class="personal-uploaded-title personal-menu-item-title">Danh sách Tải lên</h3>
      <div class="personal-uploaded-content">
          <i class="main-icon-song"></i>
          <span class="uploaded-content-text">
              Không có Nghệ sĩ trong thư viện nhạc cá nhân 
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name: "my-uploaded-songs"
}
</script>

<style scoped>
.personal-menu-item-title {
    color: var(--white-color);
    font-size: 18px;
}

.personal-uploaded-content {
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

.uploaded-content-text {
    margin-top: 20px;
    color: var(--text-secondary);
}
</style>