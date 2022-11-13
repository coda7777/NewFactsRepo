<template>
  <div class="container">
    <small>
      <b-link to="/user-settings">Settings</b-link>--<b-link herf="javascript:void(0)"
        >CompanyDetails</b-link
      >
    </small>
    <hr />
    <!--     <div class="page-header page-header-flex">
      <div class="pull-left">
        <h4>Security Settings</h4>
        <p class="page-description">
          Add your company information, manage notification settings, your logo and more basic
          information for your account.

          <a
            href="https://hotelfacts.net"
            target="_blank"
            class="helpdesk-link"
            title="Open helpdesk for further information"
            >Read more
          </a>
        </p>
      </div>
    </div> -->
    <form v-on:submit.prevent @submit="changePassword()">
      <div class="well" style="margin-top: 20px">
        <h4 style="margin-top: 0">Change password <br /></h4>
        <div class="form-group row">
          <label class="control-label col-sm-2">Current password</label>
          <div class="col-sm-2">
            <input
              type="password"
              v-model="password.currentPassword"
              class="form-control form-control-sm"
              autocomplete="off"
              required
            />
            <ul>
              <li
                v-for="(m, index) in password.validation.currentPassword"
                :key="index"
                class="text-danger"
              >
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
        <div class="control-group row">
          <label class="control-label col-sm-2">New password</label>
          <div class="col-sm-2">
            <input
              type="password"
              v-model="password.newPassword"
              class="form-control form-control-sm"
              autocomplete="off"
              required
            />
            <ul>
              <li
                v-for="(m, index) in password.validation.newPassword"
                :key="index"
                class="text-danger"
              >
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
        <div class="control-group row">
          <label class="control-label col-sm-2">Confirm new password</label>
          <div class="col-sm-2">
            <input
              type="password"
              v-model="password.reNewPassword"
              class="form-control form-control-sm"
              autocomplete="off"
              required
            />
            <ul>
              <li
                v-for="(m, index) in password.validation.reNewPassword"
                :key="index"
                class="text-danger"
              >
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <b-button
        type="submit"
        variant="outline-success"
        class="modalbutton"
        style="margin-right: 10px"
      >
        Change Password
        <span v-if="isLoadingPass" class="spinner-border"></span>
      </b-button>
      <!--       <b-button type="button" variant="outline-danger" class="modalbutton" @click="cancel()">
        Cancel
      </b-button> -->
    </form>
    <hr />
    <form v-on:submit.prevent @submit="changeEmail()">
      <div class="well" style="margin-top: 20px">
        <h4 style="margin-top: 0">Change Email <br /></h4>
        <div class="control-group row">
          <label class="control-label col-sm-2">Current password</label>
          <div class="col-sm-2">
            <input
              type="password"
              v-model="email.currentPassword"
              class="form-control form-control-sm"
              autocomplete="off"
              required
            />
            <ul>
              <li
                v-for="(m, index) in email.validation.currentPassword"
                :key="index"
                class="text-danger"
              >
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
        <div class="control-group row">
          <label class="control-label col-sm-2">New E-mail</label>
          <div class="col-sm-3">
            <input
              type="email"
              v-model="email.newEmail"
              class="form-control form-control-sm"
              autocomplete="off"
              required
            />
            <ul>
              <li v-for="(m, index) in email.validation.newEmail" :key="index" class="text-danger">
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
        <div class="control-group row">
          <label class="control-label col-sm-2">Confirm new E-mail</label>
          <div class="col-sm-3">
            <input
              type="email"
              v-model="email.reNewEmail"
              class="form-control form-control-sm"
              autocomplete="off"
              required
            />
            <ul>
              <li
                v-for="(m, index) in email.validation.reNewEmail"
                :key="index"
                class="text-danger"
              >
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <b-button
        type="submit"
        style="margin-right: 10px"
        variant="outline-success"
        class="modalbutton"
      >
        Change Email
        <span v-if="isLoadingMail" class="spinner-border"></span>
      </b-button>
      <!--       <b-button type="button" variant="outline-danger" class="modalbutton" @click="cancel()">
        Cancel
      </b-button> -->
    </form>
    <hr />
    <div class="">
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <h3>
              2-Step Verification
              <small>Stronger security for your Ananas account.</small>
            </h3>
            <p>
              Most people only have one layer – their password – to protect their account. With
              2-Step Verification, if a bad guy hacks through your password, he'll still need your
              phone or Security Key to get into your account.
            </p>
            <h4>Sign in will require something you know and something you have</h4>
            <p>
              With 2-Step Verification, you'll protect your account with something you know (your
              password) and something you have (your phone).
            </p>
            <div style="text-align: center; margin-top: 20px">
              <div style="margin-bottom: 20px">
                Warning: Your have not yet enabled 2-step verification enabled.
              </div>
              <a class="btn btn-primary btn-lg" href="#/mfa/"
                >Enable 2-step verification for added security</a
              >
            </div>
          </div>
        </div>
      </div>
      <b-button type="button" variant="outline-danger" class="modalbutton" @click="cancel()">
        Cancel
      </b-button>
    </div>
    <div class="hidden-print">
      <footer>
        <hr />

        <p class="poweredBy" style="text-align: center">
          Powered by
          <a class="not-searchable" href="https://hotelfacts.net">
            <img src="/src/assets/logo.png" style="vertical-align: bottom; height: 35px" />
          </a>
        </p>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoadingPass: false,
      isLoadingMail: false,
      password: {
        newPassword: "",
        reNewPassword: "",
        currentPassword: "",
        validation: {
          newPassword: [],
          reNewPassword: [],
          currentPassword: [],
        },
      },
      email: {
        newEmail: "",
        reNewEmail: "",
        currentPassword: "",
        validation: {
          newEmail: [],
          reNewEmail: [],
          currentPassword: [],
        },
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push("user-settings");
    },
    async changePassword() {
      if (this.isLoadingPass) {
        return;
      }
      this.isLoadingPass = true;
      const requestBody = {
        new_password: this.password.newPassword,
        re_new_password: this.password.reNewPassword,
        current_password: this.password.currentPassword,
      };

      await this.$store
        .dispatch("user/setPassword", requestBody)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.password.validation = {
            currentPassword: null,
            newPassword: null,
            reNewPassword: null,
          };
          this.registered = true;
          this.showChangePasswordModal = false;
          this.isLoadingPass = false;
          this.$router.push("user-settings");
        })
        .catch((error) => {
          /* console.log(error); */
          this.password.validation.currentPassword = error.current_password;
          this.password.validation.newPassword = error.new_password;
          this.password.validation.reNewPassword = error.non_field_errors;
          this.isLoadingPass = false;
        });
    },
    async changeEmail() {
      if (this.isLoadingMail) {
        return;
      }
      this.isLoadingMail = true;
      const requestBody = {
        current_password: this.email.currentPassword,
        new_email: this.email.newEmail,
        re_new_email: this.email.reNewEmail,
      };
      await this.$store
        .dispatch("user/setEmail", requestBody)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.email.validation = {
            currentPassword: [],
            newEmail: [],
            reNewEmail: [],
          };
          this.registered = true;
          this.showChangeEmailModal = false;
          this.$router.push("user-settings");
        })
        .catch((error) => {
          /* console.log(error); */
          this.email.validation.currentPassword = error.current_password;
          this.email.validation.newEmail = error.new_email;
          this.email.validation.reNewEmail = error.non_field_errors;
        });
      this.password = {
        currentPassword: "",
        newPassword: "",
        reNewPassword: "",
        validation: {
          currentPassword: [],
          newPassword: [],
          reNewPassword: [],
        },
      };
      this.isLoadingMail = false;
    },
  },
};
</script>
