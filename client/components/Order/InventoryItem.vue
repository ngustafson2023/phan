<template>

<article>
    <p>{{ name }}: {{ quantity }}</p>
    <p>Number Selected: {{numSelected}}</p>
    <span>
        <button @click="decrNumSelected">Decr</button>
        <p>Number Selected: {{numSelected}}</p>
        <button @click="incrNumSelected">Incr</button>
    </span>
    <button @click="updateCart">Add to Cart</button>
</article>

</template>

<script>
export default {
    name: "OrderPage",
    props: {
        name: String,
        quantity: Number
    },
    data() {
        return {
            numSelected: 0
        }
    },
    methods: {
        incrNumSelected() {
            if (this.numSelected < this.quantity) this.numSelected++;
        },
        decrNumSelected() {
            if (this.numSelected !== 0) this.numSelected--;
        },
        updateCart() {
            this.$emit('updateCart', this.name, this.numSelected);
        }
    }
}
</script>

<style scoped>

</style>