<template>
    <NavigationBar class="home" :showSearchBar="false" :show-cart="false" :showAddress="false"  :hide-button="true"/>
    <div>
        <h1>Order List</h1>
        <p> {{ orders }}</p>
        <div class="card-grid">
            <DeliveryCard 
                v-for="(order, index) in orders" 
                :key="index"
                :orderId="order.orderId"
                :image="order.image"
                :restaurantName="order.restaurantName"
                :restaurantAddress="order.restaurantAddress"
            />
        </div>
    </div>
</template>

<script>
import DeliveryCard from '@/components/DeliveryCard.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import apiService from '@/services/apiService';

export default {
    components: {
        DeliveryCard,
        NavigationBar,
    },
    data() {
        return {
            orders: []
        }
    },
async mounted() {
        const response = await apiService.fetchJsonWithToken('/api/delivery/deliveryMan/cooking?deliveryManID=none', 'http://localhost:5020', 'GET',);
        this.orders = response;
}
}
</script>

<style scoped></style>