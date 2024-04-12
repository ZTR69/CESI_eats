<template>
  <div class="sidebar">
    <div class="sidebar-item" v-for="(item, index) in items" :key="index">
      <router-link :to="{ path: $route.path, query: { getParam: item[1] } }">
        <img v-if="isMobile" :src="item[2]" alt="Image associée" style="margin-top: 7px"/>
        <span v-if="isMobile">{{ getFirstWord(item[0]) }}</span>
        <span v-else>{{ item[0] }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isMobile: window.innerWidth <= 600
    }
  },
  methods: {
    getFirstWord(text) {
      return text.split(' ')[0];
    }
  },
  created() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 600;
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 600;
    });
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centre les éléments de la barre latérale */
  width: 200px;
  height: calc(100vh - 60px);
  background-color: rgba(213, 213, 203, 0.7);
  padding: 20px;
  overflow-y: hidden;
}

.sidebar-item {
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
}

.sidebar-item a {
  color: black;
  text-decoration: none;
}

@media (max-width: 600px) {
  .sidebar {
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100%;
    height: 70px;
    flex-direction: row;
    justify-content: space-around;
  }

  .sidebar-item {
    border-bottom: none;
    margin-top: 10px;
    padding: 10px;
  }

  .sidebar-item a {
    color: black;
    text-decoration: none;
    font-size: 11px;
  }
}
</style>