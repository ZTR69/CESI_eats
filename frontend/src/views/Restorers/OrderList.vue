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
.padding {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 200px;
}

.info-text {
  font-size: 1.5em;
  margin-bottom: 40px;
}

.centered-buttons > button {
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .padding {
    margin-left: 0;
  }
}

</style>