<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <NavigationBar class="home" :showSearchBar="false" :show-cart="false" :showAddress="false" />
    <iframe 
      src="https://charts.mongodb.com/charts-cesi_eats-xabcf/public/dashboards/6617ff63-49ad-4700-8ef7-afec1cb623b0" 
      frameborder="0"
    ></iframe>

</template>

<style scoped>
  iframe {
    width: 100%;
    height: 100vh;
  }
</style>