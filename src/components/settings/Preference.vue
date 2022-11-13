<template>
  <div class="container">
    <small>
      <b-link to="/user-settings">Settings</b-link>--<b-link herf="javascript:void(0)"
        >Preference</b-link
      >
    </small>
    <hr />
    <br />
    <div class="page-header page-header-flex">
      <div class="pull-left">
        <h4>Preference</h4>
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
            <label class="control-label col-sm-2">Audit trail</label>
            <div class="col-sm-4">
              <input type="checkbox" v-model="preferences.auditTrail" />
              <span style="margin-left: 15px">Enable</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Add Company's logo on docs</label>
            <div class="col-sm-4">
              <input type="checkbox" v-model="preferences.addLogo" />
              <span style="margin-left: 15px">Enable</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">Partners overriding fact documents</label>
            <div class="col-sm-4">
              <input type="checkbox" v-model="preferences.partnerOverrideFacts" />
              <span style="margin-left: 15px">Enable</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="control-label col-sm-2">overriding moderation</label>
            <div class="controls col-sm-3">
              <select
                name="defaultMarketplaceTerms.id"
                class="form-control form-control-sm"
                v-model="preferences.overridingModeration"
              >
                <option value="M" selected="Minimum">Minimum</option>
                <option value="R">Reasonable</option>
                <option value="D">Moderate</option>
                <option value="A">Advanced</option>
                <option value="O">Open</option>
              </select>
            </div>
            <b-icon
              icon="question-circle-fill"
              scale="1.2"
              variant="primary"
              aria-label="Help"
            ></b-icon>
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
