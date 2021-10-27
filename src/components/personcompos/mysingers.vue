<template>
  <div class="personal-menu-mysinger">
      <h3 class="personal-mysinger-title personal-menu-item-title"></h3>
      <div class="personal-mysinger-content">
          <i class="main-icon-singer"></i>
          <span class="mysinger-content-text">
              Không có Nghệ sĩ trong thư viện nhạc cá nhân 
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name: "my-singers"
}
</script>

<style scoped>
.personal-menu-item-title {
    color: var(--white-color);
    font-size: 18px;
}

.personal-mysinger-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--alpha-bg);
    min-height: 250px;
}

.main-icon-singer {
    display: block;
    width: 90px;
    height: 90px;
    background-image: url(https://zjs.zadn.vn/zmp3-desktop/releases/v1.4.0/static/media/artist-icon.0b64fd14.svg);
}

.mysinger-content-text {
    margin-top: 20px;
    color: var(--text-secondary);
}
</style>