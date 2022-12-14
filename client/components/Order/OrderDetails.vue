<template>
    <div>
        <h3 class="title">My Order Details</h3>
        <div class="box">
            <p class="item"><b>Pickup Location:</b> {{ (foodBank) ? foodBank.location : '' }}</p>
            <p class="item"><b>Pickup Time</b></p>
            <div v-for="(obj, date) in dates">
                <p>{{ formatDate(date) }}</p>
                <PickupTime v-for="slot in obj" 
                :selected="slot._id === selectedSlot" :title="formatTime(slot.startTime)" :id="slot._id" :callback="assignSlot"/>
            </div> 
            <button v-if="valid && selectedSlot" @click="submit" class="valid">Place Order</button>
            <button v-else class="invalid">Place Order</button>
        </div>
    </div>
</template>

<script>
import PickupTime from '@/components/Order/PickupTime.vue';

export default {
    name: 'OrderDetails',
    components: { PickupTime },
    props: ['foodBank', 'slots', 'dates', 'valid'],
    data() {
        return {
            selectedSlot: ''
        }
    },
    methods: {
        submit() {
            this.$emit('submit');
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
        },
        formatTime(dateStr) {
            const date = new Date(dateStr);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var strTime = hours + ":" + minutes + " " + ampm;
            return strTime;
        },
        assignSlot(slotId) {
            this.selectedSlot = slotId;
            this.$forceUpdate();
            this.$emit('assign-slot', this.selectedSlot);
        },
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