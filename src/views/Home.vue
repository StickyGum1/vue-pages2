<template>
  <div class="home">
    <slidertypeone/>
    <carouseltypeone/>
    <collectiontypeone/>
    <singerlist/>
    <radioslider/>
    <singerprofile/>
    <categorybanner/>
    <event/>
    <release/>
    <favorite/>
    <partner/>
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
import categorybanner from '@/components/sections/categorybanner.vue';
import event from '@/components/sections/event.vue';
import release from '@/components/sections/release.vue';
import favorite from '@/components/sections/favorite.vue';
import partner from '@/components/sections/partner.vue';

export default {
  name: 'Home',
  components: {
    slidertypeone,
    carouseltypeone,
    collectiontypeone,
    singerlist,
    radioslider,
    singerprofile,
    categorybanner,
    event,
    release,
    favorite,
    partner
  }
}
</script>

<style scoped>
.home {
  position: relative;
}
</style>
