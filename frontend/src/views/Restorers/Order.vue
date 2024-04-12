<template>
  <NavigationBar :showSearchBar="false" :show-cart="true" :showAddress="false"  :hide-button="true" :hide-toggle="true"/>
  <div class="container">
    <h1 class="title">Commande {{ orderId }}</h1>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="list-item">
        {{ item.itemName }} - {{ item.prix }}
      </li>
    </ul>
    <button class="finish-button">Terminer</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavigationBar from "@/components/NavigationBar.vue";

let orderId = ref('');
let list = ref([]);

onMounted(() => {
  const acceptedOrder = localStorage.getItem('acceptedOrder');
  if (acceptedOrder) {
    const parsedOrder = JSON.parse(acceptedOrder);
    orderId.value = parsedOrder.orderId;
    list.value = parsedOrder.order;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto; /* Change this line */
  padding: 20px;
  box-sizing: border-box;
}

.title {
  font-size: 2em;
  margin-top: 0; /* This line removes the top margin */
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