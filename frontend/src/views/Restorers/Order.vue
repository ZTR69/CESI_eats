<template>
  <div class="container">
    <NavigationBar :showSearchBar="false" :show-cart="true" :showAddress="false"  :hide-button="true" :hide-toggle="true"/>
    <h1 class="title">Commande numéro {{ orderId }}</h1>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="list-item">
        {{ item }}
      </li>
    </ul>
    <button class="finish-button">Terminer</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavigationBar from "@/components/NavigationBar.vue";

const props = defineProps({
  orderId: String,
});

let list = ref(['Item 1', 'Item 2', 'Item 3']); // Remplacez par vos données
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.title {
  font-size: 2em;
  margin-top: 0; /* Ajoutez cette ligne pour supprimer la marge supérieure */
  margin-bottom: 20px;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.finish-button {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
  background-color: yellowgreen;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>