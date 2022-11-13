<template>
  <div class="container">
    <form v-on:submit.prevent @submit="applyReset()">
      <h2>Forgot Password</h2>

      <div class="form-group">
        <label>Email address <span class="text-danger">*</span></label>
        <input
          v-model.trim="email"
          type="email"
          class="form-control form-control-lg"
          required
          autofocus
        />
      </div>
      <div v-if="submitted.isSubmitted">
        <p v-if="submitted.isSuccess" class="text-success">
          We sent a reset link to your email.
          <br />
          Please check your email, or you can visit our
          <router-link to="/">home</router-link> page.
        </p>
        <p v-if="!submitted.isSuccess" class="text-danger">
          Something went wrong :-(
          <br />Please try another email!
        </p>
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Reset password <span v-if="isLoading" class="spinner-border"></span>
      </button>
      <p class="forgot-password text-right">
        Go back to
        <router-link to="/login/">sign in</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      submitted: {
        isSuccess: true,
        isSubmitted: false,
      },
      email: "",
    };
  },
  methods: {
    async applyReset() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      await this.$store
        .dispatch("user/resetPassword", this.email)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.submitted.isSuccess = true;
          this.submitted.isSubmitted = true;
          this.$toast.success("Reset link was sent to your email.");
        })
        .catch((error) => {
          // eslint-disable-next-line no-unused-vars
          const result = error.response.data;
          console.log(result);
          this.submitted.isSuccess = false;
          this.submitted.isSubmitted = true;
          this.$toast.error("Something went wrong. Please try again later.");
        });
      this.isLoading = false;
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
