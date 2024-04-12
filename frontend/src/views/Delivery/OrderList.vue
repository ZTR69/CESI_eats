<template>
    <NavigationBar class="home" :showSearchBar="false" :show-cart="false" :showAddress="false" :hide-button="true" />
    <div>
        <h1>Order List</h1>
        <div class="card-grid">
            <div class="card" v-for="order in orders" :key="order.id">
                <div class="card-body">
                    <h5 class="card-title">Commande en cours</h5>
                    <p class="card-text">Restaurant Address: {{ order.addressRestaurant }}</p>
                    <p class="card-text">Delivery Address: {{ order.addressDelivery }}</p>
                    <button class="btn btn-primary" @click="acceptOrder(order.orderID)">Accepter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DeliveryCard from '@/components/DeliveryCard.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import apiService from '@/services/apiService';

export default {
    props: ['orderId', 'image', 'restaurantName', 'restaurantAddress', 'addressDelivery'],
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
        this.fetchOrders();
        setInterval(this.fetchOrders, 5000);
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await apiService.fetchJsonWithToken('/api/delivery/deliveryMan/cooking?deliveryManID=none', 'http://localhost:5015', 'GET');
                this.orders = response;
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        },
        acceptOrder(orderId) {
            localStorage.setItem('orderID', orderId);
            this.$router.push('/order-tracking');
        }
    }
}

</script>

<style scoped></style>