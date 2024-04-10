<template>
    <NavigationBar />
    <div class="cart">
        <h1>Votre panier :</h1>
        <MenuComponent v-for="(item, index) in items" :key="item.id" :id="item.id" :title="item.title"
            :description="item.description" :price="item.price" :showAddToCartButton="false"
            :showRemoveFromCartButton="true" @removeFromCart="removeFromCart" />
        <h1>Prix total : {{ total }} €</h1>
    </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue';
import NavigationBar from '@/components/NavigationBar.vue';

export default {
    components: {
        MenuComponent,
        NavigationBar
    },
    data() {
        return {
            items: []
        };
    },
    computed: {
        total() {
            return this.items.reduce((acc, item) => acc + item.price, 0);
        }
    },
    methods: {
        removeFromCart(itemId) {
            const index = this.items.findIndex(item => item.id === itemId);
            if (index !== -1) {
                this.items.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(this.items));
            }
        },
        fetchCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.items = cart;
        }
    },
    created() {
        this.fetchCart();
    }
};
</script>

<style scoped>
.cart {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
</style>