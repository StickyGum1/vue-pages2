<template>
  <div class="personal-menu-playlist">
      <h3 class="personal-playlist-title personal-menu-item-title">Playlist</h3>
      <div class="personal-playlist-content grid row">
          <div class="playlist-add-content col l-2-4">
            <button class="add-playlist">
              <i class="icon ic-add"></i>
              <span class="add-playlist-text">Tạo playlist mới</span>
            </button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "playlist"
}
</script>

<style scoped>

.add-playlist {
  background: linear-gradient(33deg,#5a1eae -7%,#ce267a 117%);
  min-height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
}

.add-playlist .icon {
  width: fit-content;
  height: fit-content;
  font-size: 50px;
  color: var(--white-color);
}

.add-playlist-text {
  color: var(--white-color);
  margin-top: 15px;
  font-size: 15px;
}
</style>