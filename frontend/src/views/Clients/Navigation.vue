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

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

h1 {
  font-family: Montserrat, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin-left: 25px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
</style>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import UserCard from '@/components/UserCard.vue';
import sourceData from "@/test_data/restaurants.json";

export default {
  data() {
    return {
      restaurants: sourceData.restaurants
    };
  },
  components: {
    NavigationBar,
    UserCard
  },
};
</script>