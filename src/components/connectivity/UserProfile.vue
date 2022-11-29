<template>
  <div>
    <div class="container container-fluid">
      <div id="PageHeaderWarnings">
        <div id="PORTAL_ROOT" style=""></div>
      </div>
      <div class="page-header">
        <h4>Edit user</h4>
      </div>
      <form v-on:submit.prevent @submit="updateProfile()">
        <fieldset>
          <div class="col-md-6">
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">First Name</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="userInfo.firstName"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Last Name</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="userInfo.lastName"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Country</label>
                  <div class="controls col-sm-10">
                    <select
                      class="form-control form-control-sm"
                      v-model="userInfo.country"
                      required
                    >
                      <option value="null">--Select Country--</option>
                      <option v-for="(k, index) in countries" :key="index" :value="k.iso2">
                        {{ k.name }}
                      </option>
                    </select>
                    <ul>
                      <li
                        v-for="(m, index) in invalidEntry.country"
                        :key="index"
                        class="text-danger"
                      >
                        {{ m }}
                      </li>
                    </ul>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Job title</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="userInfo.title"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Phone number</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="userInfo.phone"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row timezone">
                  <label class="control-label col-sm-2">Language</label>
                  <div class="controls col-sm-10">
                    <select class="form-control form-control-sm" v-model="userInfo.language">
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="es">español</option>
                      <option value="pt">português</option>
                      <option value="fr">français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">italiano</option>
                      <option value="is">íslenska</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>

            <div class="form-actions" style="margin-bottom: 10px; margin-top: 10px">
              <button type="submit" class="btn btn-primary">
                Save <span v-if="isLoading" class="spinner-border"></span>
              </button>
              <router-link to="/" class="btn btn-default">Cancel</router-link>
            </div>
          </div>
        </fieldset>
      </form>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="themeChanger">
          <div class="modal">
            <header class="modalheader">
              <h5>Confirm</h5>
            </header>
            <form v-on:submit.prevent @submit="changePassword()">
              <div class="well" style="margin-top: 20px">
                <h4 style="margin-top: 0">Change password <br /></h4>
                <div>
                  <label>Current password</label>
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
                <div class="control-group">
                  <label>New password</label>
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
                <div class="control-group">
                  <label>Confirm new password</label>
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
              <button type="submit" class="modalbutton">
                Change Password
                <span v-if="isLoading" class="spinner-border"></span>
              </button>
              <button type="button" class="modalbutton" @click="showChangePasswordModal = false">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </transition>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="themeChanger">
          <div class="modal">
            <header class="modalheader">
              <h5>Confirm</h5>
            </header>
            <form v-on:submit.prevent @submit="changeEmail()">
              <div class="well" style="margin-top: 20px">
                <h4 style="margin-top: 0">Change Email <br /></h4>
                <div>
                  <label>Current password</label>
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
                <div class="control-group">
                  <label>New Email</label>
                  <input
                    type="email"
                    v-model="email.newEmail"
                    class="form-control form-control-sm"
                    autocomplete="off"
                    required
                  />
                  <ul>
                    <li
                      v-for="(m, index) in email.validation.newEmail"
                      :key="index"
                      class="text-danger"
                    >
                      {{ m }}
                    </li>
                  </ul>
                </div>
                <div class="control-group">
                  <label>Confirm new email</label>
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
              <button type="submit" class="modalbutton">
                Change Email
                <span v-if="isLoading" class="spinner-border"></span>
              </button>
              <button type="button" class="modalbutton" @click="showChangeEmailModal = false">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </transition>
      <div class="hidden-print">
        <footer>
          <hr />
          <p class="poweredBy" style="text-align: center">
            Powered by
            <a class="not-searchable" href="https://app.hotelfacts.net">
              <img src="../../assets/logo.png" style="vertical-align: bottom; height: 35px" />
            </a>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      registered: false,
      themeChanger: false,
      showChangePasswordModal: false,
      showChangeEmailModal: false,
      userInfo: this.$store.getters["user/userInfo"],
      invalidEntry: {
        username: [],
        email: [],
        phone: [],
        firstName: [],
        lastName: [],
        country: [],
        password: [],
        rePassword: [],
        nonFieldErrors: [],
      },
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
  computed: {
    countries() {
      return this.$store.getters["countries/getCountries"];
    },
  },
  async created() {
    await this.getCountries();
  },
  methods: {
    async getCountries() {
      this.loadCountry = true;
      await this.$store.dispatch("countries/retrieveCountries").then(() => {
        this.loadCountry = false;
      });
    },
    async changePassword() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const requestBody = {
        new_password: this.password.newPassword,
        re_new_password: this.password.reNewPassword,
        current_password: this.password.currentPassword,
      };

      await this.$store
        .dispatch("user/setPassword", requestBody)
        .then(() => {
          this.password.validation = {
            currentPassword: [],
            newPassword: [],
            reNewPassword: [],
          };
          this.registered = true;
          this.showChangePasswordModal = false;
          this.$toast.success("The password is set successfully.");
        })
        .catch((error) => {
          /* console.log(error); */
          this.password.validation.currentPassword = error.current_password;
          this.password.validation.newPassword = error.new_password;
          this.password.validation.reNewPassword = error.non_field_errors;
          this.$toast.error("Something went wrong. Please check the errors.");
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
      this.isLoading = false;
    },
    async changeEmail() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const requestBody = {
        current_password: this.email.currentPassword,
        new_email: this.email.newEmail,
        re_new_email: this.email.reNewEmail,
      };
      await this.$store
        .dispatch("user/setEmail", requestBody)
        .then(() => {
          this.email.validation = {
            currentPassword: [],
            newEmail: [],
            reNewEmail: [],
          };
          this.registered = true;
          this.showChangeEmailModal = false;
          this.$toast.success("The e-mail is set successfully.");
        })
        .catch((error) => {
          this.email.validation.currentPassword = error.current_password;
          this.email.validation.newEmail = error.new_email;
          this.email.validation.reNewEmail = error.non_field_errors;
          this.$toast.error("Something went wrong. Please check the errors.");
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
      this.isLoading = false;
    },
    async updateProfile() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const requestBody = {
        username: this.userInfo.username,
        phone: this.userInfo.phone,
        first_name: this.userInfo.firstName,
        last_name: this.userInfo.lastName,
        country: this.userInfo.country,
        email: this.userInfo.email,
        password: this.userInfo.password,
        language: this.userInfo.language,
        re_password: this.userInfo.rePassword,
      };
      await this.$store
        .dispatch("user/updateProfile", requestBody)
        .then(() => {
          this.registered = true;
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          this.$toast.success("The profile is updated successfully.");
        })
        .catch((error) => {
          this.invalidEntry.username = error.username || [];
          this.invalidEntry.phone = error.phone || [];
          this.invalidEntry.firstName = error.firstName || [];
          this.invalidEntry.lastName = error.lastName || [];
          this.invalidEntry.email = error.email || [];
          this.invalidEntry.password = error.password || [];
          this.invalidEntry.country = error.country || [];
          this.invalidEntry.nonFieldErrors =
            this.userInfo.password === this.userInfo.rePassword
              ? []
              : ["The two password fields didn't match."];
        });
      this.isLoading = false;
      this.$toast.error("Something went wrong. Please check the errors.");
    },
  },
};
</script>
