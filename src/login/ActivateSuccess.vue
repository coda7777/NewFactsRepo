<template>
  <div class="vue-tempalte">
    <h2>Activating Your Account</h2>
    <div v-if="!isResponded">
      <p>Please click on the below button in order to activate your account.</p>
      <button id="activate-btn" @click="applyActivation()" class="btn btn-secondary">
        Confirm <span v-if="isLoading" class="spinner-border"></span>
      </button>
      <p v-if="isLoading">Please wait while activating your account...</p>
    </div>
    <div v-else>
      <div v-if="isSuccess">
        <p>Your account has been confirmed :-)</p>
        <p>You may login now...</p>
        <p>Click <router-link to="/login">here</router-link> to login.</p>
        <p>Click <router-link to="/">here</router-link> to visit our home page.</p>
      </div>
      <div v-if="!isSuccess">
        <p class="text-danger">Something went wrong :-(</p>
        <p class="text-danger">The activation link you provided is invalid.</p>
        <p>
          Click
          <router-link to="/auth/account/resend/activation">here</router-link>
          to resend the activation code.
        </p>
        <p>Click <router-link to="/signup">here</router-link> to register.</p>
        <p>Click <router-link to="/">here</router-link> to visit our home page.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isResponded: false,
      isLoading: false,
      isSuccess: false,
    };
  },
  created() {
    /* console.log("created"); */
  },
  computed: {},
  methods: {
    async applyActivation() {
      this.isLoading = true;
      /* console.log("start request"); */
      const requestBody = {
        uid: this.$route.params.uid,
        token: this.$route.params.token,
      };
      // @DONE: test wfhen response is successful
      await this.$store
        .dispatch("user/activateUser", requestBody)
        // eslint-disable-next-line no-unused-vars
        .then((result) => {
          /* console.log(result); */
          this.isSuccess = true;
        })
        .catch((error) => {
          this.isSuccess = false;
          // eslint-disable-next-line no-unused-vars
          const result = error.response.data;
          /* console.log(result); */
          this.isSuccess = false;
        });
      this.isLoading = false;
      this.isResponded = true;
      /* console.log("done"); */
    },
  },
};
</script>

<style scoped>
.spinner-border {
  height: 1.5rem;
  width: 1.5rem;
}
#activate-btn {
  display: inline;
}
</style>
