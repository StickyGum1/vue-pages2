<template>
  <div class="wrapper-category-banner grid">
    <div 
      v-if="arrayBanner"
      class="wrapper-category-list row">
      <div 
        v-for="(item, index) in 3"
        :key="index"
        class="category-item col l-4 m-4 c-6">
        <router-link 
          class="category-item-link"
          :to="{ name: 'Zingchart' }">
          <div
            class="category-item-content">
            <img 
              class="category-item-image"
              :src="arrayBanner[index].image" alt="">
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "category-banner",
  methods: {
    
  },
  computed: {
    ...mapState(["arrayBanner"]),
    ...mapActions(["getBannerApi"])
  },
  created() {
    this.getBannerApi
  }
}
</script>

<style scoped>

.wrapper-category-banner {
  padding: 30px 0;
}

.category-item {
  padding-bottom: 8px;
}

.category-item-content {
  overflow: hidden;
  height: 0;
  border-radius: 7px; 
  padding-bottom: 28%;
}

.category-item-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: .3s linear;
}

.category-item-link:hover  .category-item-image {
  transform: scale(1.1);
}


</style>