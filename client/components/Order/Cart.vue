<template>
    <div class="container">
        <h3 class="title">My Cart</h3>
        <p v-if="!Object.keys(cart).length">No items in cart</p>
        <div v-else>
            <div class="row">
                <h4 class="item">Name</h4>
                <h4 class="item" align="center">Quantity</h4>
                <h4 class="item" align="right">Action</h4>
            </div>
            <hr>
            <div v-for="(quantity, name) in cart">
                <div class="row">
                    <p class="item">{{ name }}</p>
                    <p class="item" align="center">{{ quantity }}</p>
                    <div align="right">
                        <button @click="removeFromCart(name)" class="remove">Remove</button>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Cart",
    props: {
        cart: {
            type: Object,
            required: true
        }
    },
    methods: {
        removeFromCart(name) {
            this.$emit('remove-from-cart', name);
        }
    }
}
</script>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.row > * {
    flex: 1;
}

.container {
    padding-left: 10px;
}

.title {
    margin: 0;
    margin-bottom: 10px;
}

.remove {
    padding: 10px;
    border-radius: 10px;
    background-color: #FF7777;
    border-style: none;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
}

.item {
    margin: 0;
}
</style>