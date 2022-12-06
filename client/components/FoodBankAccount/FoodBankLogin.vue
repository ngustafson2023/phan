<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <form>
      <div>
        username:
        <input placeholder="username" v-model="username" />
      </div>

      <div>
        password:
        <input placeholder="password" type="password" v-model="password" />
      </div>

      <div>name: <input placeholder="name" v-model="name" /></div>

      <div>address: <input placeholder="address" v-model="address" /></div>

      <div>
        hours:
        <input type="time" v-model="opensAt" /> :
        <input type="time" v-model="closesAt" />
      </div>

      <div>
        hide your food bank:
        <input type="checkbox" v-model="visible" />
      </div>
      <button type="submit">register</button>
    </form>
  </main>
</template>

<script>
import ChangeUsernameForm from "@/components/Account/ChangeUsernameForm.vue";
import ChangePasswordForm from "@/components/Account/ChangePasswordForm.vue";
import DeleteAccountForm from "@/components/Account/DeleteAccountForm.vue";
import LogoutForm from "@/components/Account/LogoutForm.vue";
export default {
  name: "FoodBankLogin",
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
  },
  beforeCreate() {
    // fetch("/api/user/session", {
    // 	// credentials: "same-origin",
    // })
    // 	.then((res) => res.json())
    // 	.then((res) => {
    // 		console.log(res);
    // 		this.name = res.foodBank.name;
    //     this.address = res.foodBank.address;
    // 	});
  },
  data() {
    return {
      username: "",
      password: "",
      isFoodBank: true,
      address: "",
      location: "",
      visible: true,
      opensAt: null,
      closesAt: null,
    };
  },

  methods: {
    async submit() {
      const fieldsMap = [
        ["username", this.username],
        ["password", this.password],
        ["isFoodBank", this.isFoodBank],
        ["address", this.address],
        ["location", this.location],
        ["visible", this.visible],
        ["opensAt", this.opensAt],
        ["closesAt", this.closesAt],
      ];

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin", // Sends express-session credentials with request
      };
      options.body = JSON.stringify(Object.fromEntries(fieldsMap));

      await fetch("/api/users", options).then((res) =>
        // this.$router.push({ path: "Home" })
        console.log(res)
      );
    },
  },
};
</script>
