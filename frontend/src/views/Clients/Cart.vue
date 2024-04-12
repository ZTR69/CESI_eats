<template>
    <NavigationBar class="home" :is-connected="false" :showSearchBar="false" :show-cart="false" :showAddress="true"
        :hide-button="true" />
    <div class="cart">
        <h1>Votre panier :</h1>
        <MenuComponent v-for="(item, index) in order.items" :key="index" :id="item.id" :title="item.title"
            :description="item.description" :price="item.price" :showRemoveFromCartButton="true"
            @removeFromCart="removeFromCart" />
        <div class="total-and-order-button">
            <h1>Prix total : {{ total }} €</h1>
            <button class="btn btn-primary" @click="showOrderForm = true">Valider la commande</button>
        </div>
        <div v-if="showOrderForm" class="order-form">
            <h2>Informations de paiement</h2>
            <form @submit.prevent="placeOrder">
                <label>
                    Nom sur la carte :
                    <input v-model="paymentInfo.cardName" required>
                </label>
                <label>
                    Numéro de la carte :
                    <input v-model="paymentInfo.cardNumber" required>
                </label>
                <label>
                    Date d'expiration :
                    <input v-model="paymentInfo.expiryDate" required>
                </label>
                <label>
                    CVV :
                    <input v-model="paymentInfo.cvv" required>
                </label>
                <button type="submit">Confirmer la commande</button>
                <p> {{ this.order }} </p>
            </form>
        </div>
        <div v-if="showModal" class="order-confirmation">
            <p>Votre commande a été validée !</p>
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import apiService from '@/services/apiService';

export default {
    components: {
        MenuComponent,
        NavigationBar,
    },
    data() {
        return {
            order: {items: []},
            showModal: false,
            showOrderForm: false,
            paymentInfo: {
                cardName: '',
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            }
        };
    },
    computed: {
        total() {
            return this.order.items.reduce((acc, item) => acc + item.price, 0);
        }
    },
    methods: {
        removeFromCart(itemId) {
            const index = this.order.items.findIndex(item => item.id === itemId);
            if (index !== -1) {
                this.order.items.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(this.order.items));
            }
        },
        fetchCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.order.items = cart;
        },
        placeOrder() {
            console.log('Order placed', this.order.items);
            apiService.fetchJsonWithToken('/api/orders/add', 'http://localhost:5010', 'POST', this.order.items)
                .then(response => {
                    localStorage.setItem('orderID', JSON.stringify(response.message));
                });
            
            
            console.log('Payment Info:', this.paymentInfo);
            this.showModal = true;
            this.showOrderForm = false;
            // vider le panier
            localStorage.removeItem('cart');
            this.order.items = [];

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

.total-and-order-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-form {
    margin-top: 20px;
}

.order-form form {
    display: flex;
    flex-direction: column;
}

.order-form label {
    margin-bottom: 10px;
}

.order-form input {
    margin-top: 5px;
    margin-bottom: 15px;
}
</style>