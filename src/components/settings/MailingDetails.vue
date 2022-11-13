<template>
  <div class="container">
    <small>
      <b-link to="/user-settings">Settings</b-link>--<b-link herf="javascript:void(0)"
        >Mailing</b-link
      >
    </small>
    <hr />
    <div class="page-header page-header-flex">
      <div class="pull-left">
        <h4>Mailing Settings</h4>
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
    </div>
    <form @submit.prevent="save()" class="form-horizontal">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label col-form-label-sm" data-toggle="tooltip"
          >E-mail addresses for notifications</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="preferences.emailAddresses"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label col-form-label-sm" data-toggle="tooltip"
          >Partnership new</label
        >
        <div class="col-sm-4">
          <input type="checkbox" v-model="preferences.partnershipNewMail" />
          <span style="margin-left: 15px">Enable</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label col-form-label-sm" data-toggle="tooltip"
          >Partnership changes</label
        >
        <div class="col-sm-4">
          <input type="checkbox" v-model="preferences.partnershipChangesMail" />
          <span style="margin-left: 15px">Enable</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label col-form-label-sm" data-toggle="tooltip"
          >New features & offers</label
        >
        <div class="col-sm-4">
          <input type="checkbox" v-model="preferences.featuresOffersMail" />
          <span style="margin-left: 15px">Enable</span>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>

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
      preferences: {},
    };
  },
  created() {
    this.preferences = this.$store.getters["settings/getPreferences"];
    if (!this.preferences.user > 0) {
      this.getPreferences();
    }
  },
  methods: {
    async getPreferences() {
      await this.$store
        .dispatch("settings/retrievePreferences")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.preferences = this.$store.getters["settings/getPreferences"];
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    async save() {
      await this.$store
        .dispatch(`settings/savePreferences`, this.preferences)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.$router.push("user-settings");
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
  },
};
</script>
