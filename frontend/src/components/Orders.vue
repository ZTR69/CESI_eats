<template>
  <div class="list-container">
    <ul>
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="column">
          <p>{{ index + 1 }}</p>
        </div>
        <div class="column">
          <ul>
            <li v-for="(subItem, subIndex) in item" :key="subIndex">
              <p>- {{ subItem.itemName }}</p>
            </li>
          </ul>
        </div>
        <div class="column">
          <p>Prix total: {{ totalPrice(item) }}</p>
        </div>
        <div class="column">
          <button type="button" class="btn btn-warning" @click="acceptItem(index)">Accepter</button>
          <button type="button" class="btn btn-danger" @click="deleteItem(index)">Refuser</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import apiService from "@/services/apiService.js";

let list = ref([]);

onMounted(async () => {
  const data = await apiService.fetchJsonWithToken("/api/orders/restaurant/pending?restaurantID=1", "http://localhost:5010", 'get', null);

  let liste_effemer = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].items.length; j++) {
      liste_effemer.push({
        itemName : data[i].items[j].itemName,
        prix : data[i].items[j].prix,
        orderID : data[i].orderID,
        restaurantID : data[i].restaurantID,
        addressDelivery : data[i].addressDelivery,
        addressRestaurant : data[i].addressRestaurant,
      });
      console.log(liste_effemer);
    }
    list.value.push(liste_effemer);
    liste_effemer = [];
  }
});

const acceptItem = async (index) => {

  const url = `/api/orders/status?orderID=${list.value[index][0].orderID}`;
  await apiService.fetchJsonWithToken(url, 'http://localhost:5010', 'put', {'status': 'cooking'});

  console.log(apiService.fetchJsonWithToken('/api/delivery', 'http://localhost:5015', 'post', {
    'orderID': list.value[index][0].orderID,
    'restaurantID': list.value[index][0].restaurantID,
    'addressDelivery': list.value[index][0].addressDelivery,
    'addressRestaurant': list.value[index][0].addressRestaurant,
  }))
};

const deleteItem = async (index) => {
  const orderID = list.value[index][0].orderID;
  list.value.splice(index, 1);
  const url = `/api/orders/status?orderID=${orderID}`;
  await apiService.fetchJsonWithToken(url, 'http://localhost:5010', 'put', {'status': 'cancel'});
};

const totalPrice = (items) => {
  return items.reduce((total, item) => total + item.prix, 0);
};

</script>

<style scoped>

.list-container {
  width: 80%;
}

.list-container ul {
  list-style-type: none;
  padding: 0;
}

.list-container ul .list-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #ddd;
}

.list-container ul .list-item .column {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-container ul .list-item .column button {
  margin: 0 3px;
}

</style>