<template>
  <div class="wrapper-personal-view">
    <div class="personal-details">
      <div v-if="user" class="personal-details-top">
        <div class="personal-avt">
          <img :src="user.profile.avt" class="personal-image"/>
        </div>
        <h3 class="personal-name">
          {{ user.profile.name }}
        </h3>
      </div>
    </div>
    <div class="group-button-vip">
      <button class="btn-round buy-vip">MUA VIP NGAY</button>
      <button class="btn-round enter-code">NHẬP CODE VIP</button>
      <button class="btn-round more-details">
          <i class="icon ic-more"></i>
      </button>
    </div>
  </div>
  <div class="wrapper-personal-menu">
    <ul class="personal-menu-list">
      <personalLinks 
        v-for="item in personalLinks" 
        :key="item.id"
        :item="item"/>
    </ul>
    <div class="personal-router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import personalLinks from '../components/navlinks/navlinkperson.vue';
export default {
  name: 'Personal',
  data() {
    return {
      user: null,
    }
  },
  computed: {
    ...mapState(["personalLinks"])
  },
  components: {
    personalLinks
  },
  created() {
    fetch("http://localhost:3000/user")
      .then(respone => respone.json())
      .then(data => {
        this.user = data[0];
      })
  }
}
</script>

<style>
.personal-details-top {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.personal-avt {
  width: 95px;
  height: 95px;
  overflow: hidden;
  border-radius: 50%;
}

.personal-image {
  height: 100%;
  width: 100%;
}

.personal-name {
  font-size: 32px;
  font-weight: bold;
  color: var(--white-color);
  margin: 10px 0 0 0;
  letter-spacing: 2px;
}

.group-button-vip {
  position: absolute;
  top: 15px;
  right: 20px;
}

.btn-round.buy-vip,
.btn-round.enter-code {
  width: fit-content;
  height: fit-content;
  padding: 7px 20px;
  font-size: 12px;
  margin-right: 8px;
}

.btn-round.buy-vip {
  background: var(--yellow);
  color: var(--black);
} 

.btn-round.more-details {
  width: 30px;
  height: 30px;
}

.btn-round.more-details i {
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.wrapper-personal-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
}

.personal-menu-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    border-radius: 50px;
    background: var(--alpha-bg);
    padding: 3px;
}


.personal-router-view {
  width: 100%;
  height: auto;
}

.personal-menu-item {
  min-width: 100px;
  color: var(--white-color);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.personal-menu-item a {
  color: var(--navigation-text);
  text-decoration: none;
  height: fit-content;
  text-align: center;
  padding: 4px 25px;
  font-size: 12px;
  border-radius: 50px;
}

.personal-menu-item a:hover {
  color: var(--white-color);
}

.personal-menu-item .router-link-exact-active {
  background: var(--tab-active-bg);
  color: var(--white-color);
}

</style>
