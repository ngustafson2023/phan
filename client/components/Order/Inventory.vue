<template>
    <div class="container">
        <h2 class="title">Ordering from {{ $store.state.orderingFrom }}</h2>
        <SearchBar @change="change"></SearchBar>
        <div class="tags">
            <Tag
                v-for="r in $store.state.tags"
                :title="r"
                :callback="editTags"
            />
        </div>
        <div v-for="(quantity, name) in inventory">
            <div v-if="isMatch(name)" class="item">
                <div class="desc">
                    <h3 class="name">{{ name }}</h3>
                    <p class="quantity"><b>Quantity Available:</b> {{ quantity }}</p>
                </div>
                <div class="controls">
                    <button @click="decrNumSelected(name)" class="modifier">-</button>
                    <p class="quantity">{{ numSelected[name] }}</p>
                    <button @click="incrNumSelected(name, quantity)" class="modifier">+</button>
                    <button @click="addToCart(name)" class="adder">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/Order/SearchBar.vue';
import Tag from "@/components/Order/Tag.vue";

export default {
    name: "Inventory",
    components: { SearchBar, Tag },
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
            numSelected: {},
            filter: '',
            tags: []
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
        },
        change(filter) {
            this.filter = filter.toLowerCase();
        },
        isMatch(name) {
            return name.toLowerCase().includes(this.filter);
        },
        editTags(item, shouldInclude) {
            if (shouldInclude && !this.tags.includes(item)) {
                this.tags.push(item);
            } else if (!shouldInclude && this.tags.includes(item)) {
                this.tags = this.tags.filter((s) => s !== item);
            }
            console.log(this.tags);
        }
    }
}
</script>

<style scoped>
.tags {
    display: flex;
    flex-direction: row;
    height: 50px;
}
.container {
    padding-right: 10px;
}

.title {
    margin-top: 0px;
    margin-bottom: 10px;
}

.name {
    margin: 0;
    margin-bottom: 5px;
}

.quantity {
    margin: 0;
}

.item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: whitesmoke;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
}

.desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 240px;
}

.modifier {
    border-radius: 10px;
    background-color: #ccc;
    border-style: none;
    font-family: inherit;
    font-size: 25px;
    cursor: pointer;
    width: 38.5px;
    height: 38.5px;
}

.adder {
    padding: 10px;
    border-radius: 10px;
    background-color: lightgreen;
    border-style: none;
    font-family: inherit;
    font-size: 16px;
    cursor: pointer;
}
</style>