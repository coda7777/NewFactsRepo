<template>
  <div class="container">
    <form v-on:submit.prevent @submit="login()">
      <h2>Sign In</h2>

      <div class="form-group">
        <label>Email address</label>
        <input v-model.trim="email" type="email" class="form-control form-control-sm" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control form-control-sm" required />
      </div>
      <p v-if="showError" class="text-danger">
        Unable to log in with provided credentials.
        <br />
        If you're new user, please activate your account first.
      </p>
      <button type="submit" class="btn btn-dark btn-sm btn-block">
        Sign In <span v-if="isLoading" class="spinner-border"></span>
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/signup/">Create account ? </router-link>
        <router-link to="/reset/">Forgot password ?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      isLoading: false,
      cuurentUser: {},
      email: "",
      password: "",
      showError: false,
    };
  },
  methods: {
    async login() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      await this.$store
        .dispatch("user/retrieveToken", {
          email: this.email,
          password: this.password,
        })
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.showError = false;
          this.$store.dispatch("user/retrieveUserData").then(() => {
            const userId = this.$store.getters["user/userInfo"].id;
            this.$store.dispatch("user/retrievePermissions", userId);
            /* console.log("user id", userId); */
            const redirectLink = Cookies.get("currentLink");
            this.$toast.success("Logged in successfully.");
            /* console.log(redirectLink); */
            if (redirectLink) {
              window.location.href = redirectLink;
            } else {
              this.$router.push("/");
            }
            Cookies.remove("currentLink");
            this.isLoading = false;
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.showError = true;
          this.isLoading = false;
          this.$toast.error("Invalid login data!");
        });
    },
  },
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 10px auto;
  /* border: 2px solid grey; */
  padding: 12px 30px 5px 30px;
  border-radius: 30px;
  -webkit-box-shadow: 0px 0px 23px -8px rgba(10, 10, 10, 1);
  -moz-box-shadow: 0px 0px 23px -8px rgba(10, 10, 10, 1);
  box-shadow: 0px 0px 23px -8px rgba(10, 10, 10, 1);
}

label {
  text-align: left !important;
  width: 100%;
}

.spinner-border {
  height: 1.5rem;
  width: 1.5rem;
}
</style>
