<template>
  <div class="vue-tempalte">
    <form v-on:submit.prevent @submit="applyReset()">
      <h2>Password Reset</h2>

      <div v-if="!submitted.isSubmitted || !submitted.isSuccess">
        <div class="form-group">
          <label>New Password <span class="text-danger">*</span></label>
          <input
            v-model="newPassword"
            type="password"
            class="form-control form-control-lg"
            required
          />
        </div>
        <div class="form-group">
          <label>Retype New Password <span class="text-danger">*</span></label>
          <input
            v-model="reNewPassword"
            type="password"
            class="form-control form-control-lg"
            required
          />
        </div>
        <ul>
          <li v-for="(m, index) in invalidEntry" :key="index" class="text-danger">
            {{ m }}
          </li>
        </ul>
        <button type="submit" class="btn btn-dark btn-lg btn-block">
          Submit <span v-if="isLoading" class="spinner-border"></span>
        </button>
      </div>
      <div v-if="submitted.isSubmitted">
        <p v-if="submitted.isSuccess" class="text-success">
          Your password was reset successfully!
          <br />
          You can <router-link to="/login">Login</router-link> now Or you may go to
          <router-link to="/">home</router-link> page.
        </p>
      </div>
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
      newPassword: "",
      reNewPassword: "",
      invalidEntry: [],
    };
  },
  methods: {
    async applyReset() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const requestBody = {
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        new_password: this.newPassword,
        re_new_password: this.reNewPassword,
      };
      await this.$store
        .dispatch("user/resetPasswordConfirm", requestBody)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.submitted.isSuccess = true;
          this.submitted.isSubmitted = true;
        })
        .catch((error) => {
          const result = error.response.data;
          /* console.log(result); */
          this.invalidEntry = result.values;
          this.submitted.isSuccess = false;
          this.submitted.isSubmitted = true;
          this.invalidEntry = result.new_password || [];
          if (this.invalidEntry.length === 0) {
            this.invalidEntry = result.non_field_errors || [];
          }
          if (this.invalidEntry.length === 0) {
            this.invalidEntry = result.token || [];
          }
          if (this.invalidEntry.length === 0) {
            this.invalidEntry = result.uid || [];
          }
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
