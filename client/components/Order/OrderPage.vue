<template>
    <main style="padding:20px;">
        <div class="row">
            <Inventory @add-to-cart="addToCart" @incr-num-selected="incrNumSelected" @decr-num-selected="decrNumSelected"
                    :inventory="inventory" :numSelected="numSelected"></Inventory>
            <Cart @remove-from-cart="removeFromCart" @submit="submit" :cart="cart"></Cart>
        </div>

        <!-- <section>
            <header>
                <h2>Slots</h2>
            </header>
            <p v-if="slot">Currently selected: {{ formatDate(slot.startTime) }} to {{ formatDate(slot.endTime) }}</p>
            <p v-else>Click on your desired slot below</p>
            <article v-for="slotObj in slots">
                <p @click="assignSlot(slotObj._id, slotObj)">{{ formatDate(slotObj.startTime) }} to {{ formatDate(slotObj.endTime) }}
                </p>
            </article>
        </section> -->

<!--         <section class="alerts">
            <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
                <p>{{ alert }}</p>
            </article>
        </section> -->
    </main>
</template>

<script>
import TextPill from "@/components/common/TextPill.vue";
import Inventory from "@/components/Order/Inventory.vue";
import Cart from '@/components/Order/Cart.vue';

export default {
    name: "OrderPage",
    components: { Inventory, Cart },
    mounted() {
        this.getInventory();
        //this.getSlots();
    },
    data() {
        return {
            inventory: {},
            cart: {},
            numSelected: {},
            /* slotId: null,
            slot: null,
            slots: [], */
            alerts: {}, // Displays success/error messages encountered during form submission
            callback: () => {
                const message = "Successfully placed order!";
                this.$set(this.alerts, message, "success");
                setTimeout(() => this.$delete(this.alerts, message), 3000);
            },
        };
    },
    methods: {
        async getInventory() {
            fetch(`/api/fooditem?id=${this.$store.state.orderingFromId}`, {
                credentials: 'same-origin'
            }).then(res => res.json()).then(res => {
                for (const foodItem of res) {
                    const obj = {
                        quantity: parseInt(foodItem.quantity),
                        restrictions: foodItem.restrictions
                    };
                    this.$set(this.inventory, foodItem.name, obj);
                    this.$set(this.numSelected, foodItem.name, 0);
                }
                console.log(this.numSelected);
                this.$forceUpdate();
            });
        },
        addToCart(name, numSelected) {
            if (!this.cart.hasOwnProperty(name)) this.$set(this.cart, name, numSelected);
            else this.cart[name] += numSelected;
            this.inventory[name].quantity -= numSelected;
        },
        removeFromCart(name) {
            this.inventory[name].quantity += this.cart[name];
            this.$delete(this.cart, name);
        },
        async submit() {
            //if (!this.slotId) return;
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin' // Sends express-session credentials with request
            };
            const fieldsMap = [
                ['items', this.cart],
                ['slotId', this.slotId],
                ['foodBankId', this.$store.state.orderingFromId]
            ];
            options.body = JSON.stringify(Object.fromEntries(fieldsMap));

            try {
                const r = await fetch('/api/order', options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }

                this.$store.commit('setOrderingFrom', null);
                this.$store.commit('setOrderingFromId', null);
                this.$router.push('/')

            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        },
        incrNumSelected(name, quantity) {
            if (this.numSelected[name] < quantity) this.numSelected[name]++;
            this.$forceUpdate();
        },
        decrNumSelected(name) {
            if (this.numSelected[name] !== 0) this.numSelected[name]--;
            this.$forceUpdate();
        },
        /* async getSlots() {
            const options = {
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin", // Sends express-session credentials with request
            };
            try {
                fetch(`/api/slot?id=${this.$store.state.orderingFromId}`, options)
                    .then((res) => res.json())
                    .then((res) => {
                        for (const slotObj of res.slots) {
                            this.slots.push(slotObj);
                        } 
                        this.$forceUpdate();
                    });
            } catch (e) {
                this.$set(this.alerts, e, "error");
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        },
        assignSlot(slotId, slot) {
            this.slotId = slotId;
            this.slot = slot;
        },
        formatDate(dateObj) {
            const date = new Date(dateObj);
            return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear() + 1} at ${this.formatTime(date)}`;
        },
        formatTime(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var strTime = hours + ":" + minutes + " " + ampm;
            return strTime;
        } */
    }
};
</script>

<style scoped>

.row {
    display: flex;
    flex-direction: row;
}

.row > * {
    flex: 1;
}

section {
    display: flex;
    flex-direction: column;
}

header,
header>* {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

section .scrollbox {
    flex: 1 0 50vh;
    padding: 3%;
    overflow-y: scroll;
}

/* .alerts {
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
}

.alerts article {
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
}

.alerts p {
    margin: 0;
}

.alerts .error {
    background-color: rgb(166, 23, 33);
}

.alerts .success {
    background-color: rgb(45, 135, 87);
} */
</style>
