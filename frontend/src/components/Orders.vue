<template>
  <div class="list-container">
    <ul>
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="column">
          <img src="@/assets/img/profile.png" style="width: 60px" alt="profile"/>
        </div>
        <div class="column">
          <p>Nom: {{ item.name }}</p>
        </div>
        <div class="column">
          <p>Numéro de téléphone: {{ item.phone }}</p>
        </div>
        <div class="column">
          <p>Prix: {{ item.price }}</p>
        </div>
        <div class="column">
          <button type="button" class="btn btn-warning">Accepter</button>
          <button type="button" class="btn btn-danger">Refuser</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const list = [
  {name: 'Element 1', phone: '1234567890', price: '10€'},
  {name: 'Element 2', phone: '0987654321', price: '20€'},
  {name: 'Element 3', phone: '1122334455', price: '30€'},
  {name: 'Element 2', phone: '0987654321', price: '20€'},
  {name: 'Element 3', phone: '1122334455', price: '30€'},
  {name: 'Element 2', phone: '0987654321', price: '20€'},
  {name: 'Element 3', phone: '1122334455', price: '30€'},
  {name: 'Element 2', phone: '0987654321', price: '20€'},
  {name: 'Element 3', phone: '1122334455', price: '30€'},
  {name: 'Element 2', phone: '0987654321', price: '20€'},
  {name: 'Element 3', phone: '1122334455', price: '30€'},
  {name: 'Element 4', phone: '5566778899', price: '40€'}
];
</script>

<style scoped>

.list-container {
  margin: 0 auto;
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
  margin: 0 2px; /* Cela ajoute une marge de 5px à gauche et à droite du bouton */
}
</style>