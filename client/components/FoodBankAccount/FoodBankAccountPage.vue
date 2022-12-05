<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Food Bank Account for @{{ $store.state.username }}</h2>
      </header>
      <ul class="info">  
        <li>Name: {{this.name}}</li>
        <li>Address: {{this.address}}</li>
      </ul>
    </section>

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
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
export default {
  name: 'FoodBankAccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm
  },
  beforeCreate(){
    fetch("/api/foodBank/session", {
			// credentials: "same-origin",
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				this.name = res.foodBank.name;
        this.address = res.foodBank.address;
			});
  },
  data(){
    return {
      name:"",
      address:""
    }
  }
};
</script>