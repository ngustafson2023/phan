<template>
    <section>
        <header>
            <h2>Inventory</h2>
        </header>
        <article v-for="(quantity, name) in inventory">
            <p>{{ name }}: {{ quantity }}</p>
            <button @click="decrNumSelected(name)">-</button>
            <p>Number Selected: {{ numSelected[name] }}</p>
            <button @click="incrNumSelected(name, quantity)">+</button>
            <button @click="addToCart(name)">Add to Cart</button>
        </article>
    </section>
</template>

<script>
export default {
    name: "Inventory",
    props: {
        inventory: {
            type: Object,
            required: true
        }
    },
    created() {
        for (const [name, quantity] of Object.entries(this.inventory)) {
            this.numSelected[name] = 0;
        }
    },
    data() {
        return {
            numSelected: {}
        }
    },
    methods: {
        incrNumSelected(name, quantity) {
            if (this.numSelected[name] < quantity) this.numSelected[name]++;
            this.$forceUpdate();
        },
        decrNumSelected(name) {
            if (this.numSelected[name] !== 0) this.numSelected[name]--;
            this.$forceUpdate();
        },
        addToCart(name) {
            const numSelected = this.numSelected[name];
            if (this.numSelected[name] !== 0) this.$emit('add-to-cart', name, numSelected);
            this.numSelected[name] = 0;
        }
    }
}
</script>

<style scoped>

</style>