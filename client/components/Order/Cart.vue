<template>
    <section>
        <header>
            <h2>My Cart</h2>
        </header>
        <article v-for="(quantity, name) in cart">
            <p>{{ name }}: {{ quantity }}</p>
            <button @click="removeFromCart(name)">Remove From Cart</button>
        </article>
    </section>
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

</style>