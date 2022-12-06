<!-- Form for signing out (block style) -->

<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "LogoutForm",
  mixins: [BlockForm],
  data() {
    return {
      url: "/api/users/session",
      method: "DELETE",
      title: "Sign out",
      fields: [],
      content: "Taking a break? See you later.",
      callback: () => {
        if (!this.$store.state.user.isFoodBank) {
          this.$router.push({ name: "Home" }); // Goes to Home page after signing out
        }

        this.$store.commit("alert", {
          message: "You are now signed out!",
          status: "success",
        });
        this.$store.commit("setUser", {});
      },
    };
  },
};
</script>
