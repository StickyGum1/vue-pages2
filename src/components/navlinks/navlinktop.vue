<template>
  <li :data-id="item.id" class="zing-nav-item">
    <router-link :to="{ name: item.storeName }">
      <i :class="'icon ' + item.iconClass"></i>
      <span class="route-title">
        {{ item.title }}
      </span>
    </router-link>
  </li>
</template>

<script>

export default {
    name: 'navitem',
    props: {
        item: {
            type: Object,
            default: null
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>