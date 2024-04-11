<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import InfoUser from "./InfoUser.vue"
import ConnectionUser from "./ConnectionUser.vue";
import CustomButton from "@/components/CustomButton.vue";
</script>

<template>
  <NavigationBar class="home" :showSearchBar="false" :show-cart="false" :showAddress="false" />
  <ConnectionUser verb="get" route="/api/users/getMeById"/>

</template>

<style scoped>

</style>