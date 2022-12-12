<template>
    <div class="container">
        <input v-model="text" type="text" placeholder="Search for items..." @input="change">
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            text: ''
        }
    },
    methods: {
        change() {
            this.$emit('change', this.text);
        }
    }
}
</script>

<style scoped>
.container {
    background-color: whitesmoke;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
}

input {
    width: 100%;
}
</style>