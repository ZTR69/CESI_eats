<template>
  <div class="padding">
    <h1 class="info-text">Liste de commandes</h1>
    <Orders />
  </div>
</template>

<script setup>
import Orders from "@/components/Orders.vue";
</script>

<style scoped>

.info-text {
  font-size: 1.5em;
  margin-bottom: 40px;
}

.centered-buttons > button {
  margin-bottom: 10px;
}

</style>