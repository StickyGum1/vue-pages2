<template>
  <div class="home">
    <slidertypeone/>
    <carouseltypeone/>
    <collectiontypeone/>
    <singerlist/>
    <radioslider/>
    <singerprofile/>
  </div>
</template>

<script>
// @ is an alias to /src
import slidertypeone from '@/components/sections/slider.vue';
import carouseltypeone from '@/components/sections/carousel.vue';
import collectiontypeone from '@/components/sections/collection.vue';
import singerlist from '@/components/sections/singerlist.vue';
import radioslider from '@/components/sections/radioslider.vue';
import singerprofile from '@/components/sections/singerprofile.vue';


export default {
  name: 'Home',
  components: {
    slidertypeone,
    carouseltypeone,
    collectiontypeone,
    singerlist,
    radioslider,
    singerprofile
  }
}
</script>

<style scoped>
.home {
  position: relative;
}
</style>
