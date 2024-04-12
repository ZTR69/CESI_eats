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
import Swal from 'sweetalert2';

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
                const response = await apiService.fetchJsonWithToken('/api/delivery/deliveryMan/cooking?deliveryManID=none', 'http://51.210.150.141:5015', 'GET');
                this.orders = response;
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        },
        acceptOrder(orderId) {
            const reponse= apiService.fetchJsonWithToken('/api/delivery/status/', 'http://51.210.150.141:5015', 'PUT', {
                orderID: orderId,
                status: 'delivering'
            });
            if (reponse !== null) {
                Swal.fire({
                    title: 'Commande acceptée',
                    text: 'La commande a été acceptée !',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                localStorage.setItem('orderID', orderId);
            }
            else {
                Swal.fire({
                    title: 'Erreur',
                    text: 'La commande n\'a pas pu être acceptée',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            


            
        }
    }
}

</script>

<style scoped></style>