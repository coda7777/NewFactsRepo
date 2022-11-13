<template>
  <div class="container">
    <small>
      <b-link to="/user-settings">Settings</b-link>--<b-link herf="javascript:void(0)"
        >CompanyDetails</b-link
      >
    </small>
    <hr />
    <div class="page-header page-header-flex">
      <div class="pull-left">
        <h4>Layout Settings</h4>
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
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Export PDF layout</label>
            <div class="controls col-sm-3">
              <select class="form-control form-control-sm" v-model="preferences.pdfLayout">
                <option value="" selected="selected">Standard Version</option>
                <option value="F">Fact points</option>
                <option value="R">Rich text</option>
                <option value="G">Grouped facts</option>
                <option value="S">Summarized</option>
              </select>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Website API layout</label>
            <div class="controls col-sm-3">
              <select
                name="defaultMarketplaceTerms.id"
                class="form-control form-control-sm"
                v-model="preferences.apiLayout"
              >
                <option value="" selected="selected">Standard Version</option>
                <option value="F">Fact points</option>
                <option value="R">Rich text</option>
                <option value="G">Grouped facts</option>
                <option value="S">Summarized</option>
              </select>
            </div>
          </div>
        </b-col>
      </b-row>
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
