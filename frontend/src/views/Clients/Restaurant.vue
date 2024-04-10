<template>
    <NavigationBar :showCart="true" />
    <div class="container" style="margin-top: 0px; border: 1px solid #e0e0e0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 50px;">
        <div class="row">
            <div class="col-lg-2">
                <div class="image-container">
                    <div class="profile-image">
                        <img :src="restaurant.image" :alt="restaurant.title" class="restaurant-image" />
                    </div>
                </div>
            </div>
            <div class="col-lg-10 d-flex align-items-center">
                <div class="container">
                    <h2 class="row">{{ restaurant.title }}</h2>
                    <p class="row"> {{ restaurant.time }}</p>
                    <p class="row"> {{ restaurant.address }}</p>
                </div>
            </div>
        </div>
    </div>
    <!--Mettre une UserCard-->
    <div class="container" style="margin-top: 50px;">
        <h2>Menus</h2>
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-12">
                            <MenuComponent 
                                v-for="menu in menuOfRestaurant"
                                :key="menu.id"
                                :id="menu.id"
                                :title="menu.title"
                                :description="menu.description"
                                :price="menu.price"
                                :showAddToCartButton="true"
                            />
                            
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import restaurantData from "@/test_data/restaurants.json";
import menuData from "@/test_data/menus.json";
import MenuComponent from "@/components/MenuComponent.vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  computed: {
    restaurantId() {
      return parseInt(this.$route.params.id);
    },
    restaurant() {
      return restaurantData.restaurants.find(restaurant => restaurant.id === this.restaurantId);
    },
    menuOfRestaurant() {
      return menuData.menus.filter(menu => menu.restaurant_id === this.restaurantId);
    }
  },
  components: {
    MenuComponent,
    NavigationBar
  }
};
</script>

<style scoped>
h2 {
    font-family: Montserrat, sans-serif;
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
}

/*Get the image on the left and the text on the under it*/
.image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-image {
    width: 150px;
    /* Ajustez la taille du cercle */
    height: 150px;
    /* Ajustez la taille du cercle */
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    border: black 2px solid;
}

.restaurant-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.restaurant-time {
    font-family: Montserrat, sans-serif;
    text-align: left;
}
</style>