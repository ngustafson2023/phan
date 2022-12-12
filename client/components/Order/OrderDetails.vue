<template>
    <div>
        <h3 class="title">My Order Details</h3>
        <div class="box">
            <p class="item"><b>Pickup Location:</b> </p>
            <p class="item"><b>Pickup Time</b></p>
            <button v-if="valid" @click="submit" class="valid">Place Order</button>
            <button v-else class="invalid">Place Order</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderDetails',
    props: ['valid'],
    methods: {
        submit() {
            this.$emit('submit');
        }
    }
}
</script>

<style scoped>
.box {
    background-color: whitesmoke;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
}

.valid {
    padding: 10px;
    border-radius: 10px;
    background-color: lightgreen;
    border-style: none;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
}

.invalid {
    padding: 10px;
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
    font-family: inherit;
    font-size: 16px;
    width: 100%;
}

.item {
    margin: 0;
    margin-bottom: 5px;
}

.title {
    margin: 0;
    margin-bottom: 10px;
    margin-top: 30px;
}

</style>