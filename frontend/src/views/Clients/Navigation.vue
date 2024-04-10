<template>
    <div>
      <NavigationBar />
      <h1>Liste des restaurants</h1>
      <div class="card-grid"> 
        <UserCard
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :id="restaurant.id"
          :image="restaurant.image"
          :title="restaurant.title"
          :time="restaurant.time"
          :address="restaurant.address"
          :url="restaurant.url"
        />
      </div>
    </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import UserCard from '@/components/UserCard.vue';
import RestaurantData from "@/test_data/restaurants.json";

export default {
  data() {
    return {
      restaurants: RestaurantData.restaurants
    };
  },
  components: {
    NavigationBar,
    UserCard
  },
};
</script>