<template>
  <li :data-id="item.id" class="personal-menu-item">
    <router-link :to="{ name: item.name }">
      <span class="">
        {{ item.title }}
      </span>
    </router-link>
  </li>
</template>

<script>

export default {
    name: 'personalmenu',
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