<template>
  <div>
    <NavigationBar class="home" :is-connected="false" :showSearchBar="false" :show-cart="true" :showAddress="true"
      :hide-button="true" />
    <h1>Liste des restaurants</h1>
    <div class="card-grid">
      <UserCard v-for="restaurant in restaurants" :key="restaurant.id_restaurant" :id="restaurant.id_restaurant"
        :image="restaurant.Image" :title="restaurant.Name" :address="restaurant.Adress" />
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import UserCard from '@/components/UserCard.vue';
import RestaurantData from "@/test_data/restaurants.json";
import apiService from "@/services/apiService.js";

export default {
  data() {
    return {
      restaurants: []
    };
  },
  components: {
    NavigationBar,
    UserCard
  },
  async mounted() {
    const response = await apiService.fetchJsonWithToken('/api/restaurant/get', 'http://localhost:5005', 'GET');
    this.restaurants = response;
  }
};
</script>