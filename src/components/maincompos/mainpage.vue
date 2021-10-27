<template>
  <div class="zing-mainpage" ref="mainpage">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'MainPage',
    data() {
      return { 
      }
    },
    methods: {
      ...mapMutations(["checkScrllMainpPage"])
    },
    computed: {
      ...mapState(["isScrollingMainpage"]),
    },
    mounted() {
      const rightContent = this.$parent.$refs.rightcontent;
      rightContent.onscroll = ()=> {
        this.checkScrllMainpPage(rightContent.scrollTop);
      }
    }
}
</script>

<style>

</style>