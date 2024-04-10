<template>
    <div class="card mb-3">
        <div class="row no-gutters">
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ title }}</h5>
                    <p class="card-text">{{ description }}</p>
                    <p class="card-text">Prix : {{ price }} €</p>
                    <button class="btn btn-primary" v-if="showAddToCartButton" @click="addToCart">Ajouter au
                        panier</button>
                    <button class="btn btn-primary" v-if="showRemoveFromCartButton" @click="emitRemoveFromCart">Retirer du panier</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        showAddToCartButton: {
            type: Boolean,
            default: false
        },
        showRemoveFromCartButton: {
            type: Boolean,
            default: false
        }
        // Rest of the props...
    },
    methods: {
        addToCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                id: this.id,
                title: this.title,
                description: this.description,
                price: this.price
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Added to cart:', this.title);
        },
        emitRemoveFromCart() {
      this.$emit('removeFromCart', this.id);
    },
    }
}

</script>

<style scoped>
.card {
    border: none;
    border-radius: 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.card-img {
    height: 200px;
    object-fit: cover;
}

.card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card-text {
    font-size: 14px;
    margin-bottom: 0.5rem;
}

.card-text:last-child {
    margin-bottom: 0;
}
</style>