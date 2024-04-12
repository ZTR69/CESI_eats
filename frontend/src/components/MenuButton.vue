<template>
  <button class="menu-button" @click="goToHelloWorld">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </button>
</template>

<script>
export default {
  name: 'menu-button',
  methods: {
    goToHelloWorld() {
      this.$router.push('/hello-world').catch(error => {
        console.error("Error while routing to /hello-world", error);
      }).then(() => {
        this.$nextTick(() => {
          console.log("Successfully routed to /hello-world");
        });
      });
    }
  }
}
</script>

<style scoped>
.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}

.menu-button .line {
  width: 30px;
  height: 2px;
  background-color: #000;
  margin: 5px 0;
}
</style>