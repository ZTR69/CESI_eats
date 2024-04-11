<template>
    <NavigationBar class="home" :showSearchBar="false" :show-cart="false" :showAddress="false"  :hide-button="true"/>
    <div>
        <h1>Order List</h1>
        <div class="card-grid">
            <DeliveryCard 
                v-for="(order, index) in orders" 
                :key="index"
                :orderId="order.id"
                :image="order.image"
                :restaurantName="order.title"
                :restaurantAddress="order.description"
            />
        </div>
    </div>
</template>

<script>
import DeliveryCard from '@/components/DeliveryCard.vue'
import NavigationBar from '@/components/NavigationBar.vue';

export default {
    components: {
        DeliveryCard,
        NavigationBar,
    },
    data() {
        return {
            orders: [
                { id: 1, image: 'image1.jpg', title: 'Order 1', description: 'This is order 1' },
                { id: 2, image: 'image2.jpg', title: 'Order 2', description: 'This is order 2' },
                { id: 3, image: 'image3.jpg', title: 'Order 3', description: 'This is order 3' },
                // Add more orders as needed
            ]
        }
    }
}
</script>

<style scoped></style>