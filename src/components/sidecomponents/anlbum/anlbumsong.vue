<template>
  <div class="wrapper-category-content grid row">
    <categoryinfor/>
    <listsonginfor/>
  </div>
</template>

<script>
import categoryinfor from './topanlbum.vue';
import listsonginfor from './listsonginfor.vue';
import { mapState } from 'vuex';
export default {
    name: 'category',
    computed: {
      ...mapState(["currentCategory"])
    },
    components: {
        categoryinfor,
        listsonginfor
    }
}
</script>

<style scoped>
.wrapper-category-content {
  position: relative;
}
</style>