<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Food Bank Account for @{{ $store.state.username }}</h2>
      </header>
      <ul class="info">
        <li>Name: {{ $store.state.user.name }}</li>
        <li>Address: {{ $store.state.user.location }}</li>
        <li>opensAt: {{ $store.state.user.opensAt || "N/A" }}</li>
        <li>closesAt: {{ $store.state.user.closesAt || "N/A" }}</li>
        <li>date joined: {{ $store.state.user.dateJoined }}</li>
      </ul>
    </section>

    <h2>Add New Pickup Slots</h2>

    <h2>Update Inventory</h2>
    <div v-for="foodItem of inventory">
      <FoodItemComponent :foodItem="foodItem" />
    </div>
    <div v-if="!inventory.length">no inventory</div>

    <button v-on:click="addingItem = !addingItem">Add Inventory Item</button>

    <form v-show="addingItem">
      <div>
        name: <input v-model="name" type="text" :placeholder="'name'" />
      </div>

      <div>
        quantity:
        <input v-model="quantity" type="number" :placeholder="'1'" min="0" />
      </div>

      <div>
        <label id="restrictions" name="restrictions" />
        tags:
        <ClickablePill
          v-for="tag in $store.state.tags"
          :title="tag"
          :callback="toggleTag"
        />
      </div>

      <button v-on:click="submit">submit</button>
    </form>
    <section>
      <header>
        <h3>Account management</h3>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import DeleteAccountForm from "@/components/Account/DeleteAccountForm.vue";
import LogoutForm from "@/components/Account/LogoutForm.vue";
import FoodItemComponent from "@/components/FoodItem/SingleFoodItem.vue";
import ClickablePill from "@/components/common/ClickablePill.vue";

export default {
  name: "FoodBankAccountPage",
  components: {
    DeleteAccountForm,
    LogoutForm,
    FoodItemComponent,
    ClickablePill,
  },
  beforeCreate() {
    fetch(`/api/fooditem?id=${this.$store.state.userId}`, {
      // credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.inventory = res;
      });
  },
  data() {
    return {
      inventory: [],
      name: "",
      quantity: null,
      restrictions: [],
      addingItem: false,
    };
  },

  methods: {
    async submit() {
      this.restrictions.sort();

      // update food item
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin", // Sends express-session credentials with request
      };
      const fieldsMap = [
        ["quantity", this.quantity],
        ["restrictions", this.restrictions],
        ["foodBankId", this.$store.state.user._id],
        ["name", this.name],
      ];
      options.body = JSON.stringify(Object.fromEntries(fieldsMap));
      console.log("body", options.body);
      try {
        const r = await fetch("/api/foodItem", options);
        console.log(r);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        console.log(res);
        this.inventory.push(res);

        // reset
        this.quantity = null;
        this.restrictions = [];
        this.name = "";
        this.addingItem = false;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },

    toggleTag(tag) {
      const tags = new Set(this.restrictions);
      if (tags.has(tag)) {
        tags.delete(tag);
      } else {
        tags.add(tag);
      }

      this.restrictions = [...tags];
      console.log("tags updated to", this.restrictions);
    },
  },
};
</script>
