<template>
  <div class="zing-container" :class="{ 'has-player' : hasPlayer }" >
    <navigation/>
    <div class="zing-right-content" ref="rightcontent">
      <headerzing/>
      <mainpage/>
    </div>
    <playerbar/>
  </div>
</template>

<script>
import navigation from './components/maincompos/navigation.vue';
import mainpage from './components/maincompos/mainpage.vue';
import headerzing from './components/maincompos/headerzing.vue';
import playerbar from './components/maincompos/playerbar.vue';

import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["hasPlayer"]),
    ...mapActions(["getSongApi", "getUserApi"]),
  },
  components: {
    navigation,
    mainpage,
    headerzing,
    playerbar,
  },
  created() {
    // fetching data
    this.getSongApi;
    this.getUserApi;
  }
}
</script>


<style>

</style>
