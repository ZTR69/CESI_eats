<script setup>

import SearchBar from "@/components/SearchBar.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="home">
    <Navbar class="home" :is-connected="false" :showSearchBar="false" :show-cart="false" :showAddress="false" />
    <div class="centered">
      <h1 style="margin-bottom: 30px">Veuillez entrer votre adresse mail</h1>
      <SearchBar message="Recherchez votre adresse"/>
    </div>
  </div>
</template>

<style scoped>

</style>