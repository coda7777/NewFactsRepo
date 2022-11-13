<template>
  <div class="container">
    <b-row>
      <b-col cols="10">
        <h4>Developer Tools</h4>
        <span
          >Create and manage your API keys, integration widgets and script to publish your data
          through Ananas Global App.
          <b-icon
            icon="question-circle-fill"
            scale="1.2"
            variant="primary"
            aria-label="Help"
          ></b-icon>
        </span>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <div class="GFS-Center-Table">
          <table class="table table-hover">
            <tbody>
              <tr>
                <td>API requests</td>
                <td>settings 2</td>
                <td>
                  <b-button size="sm" variant="outline-success" :to="'/api-integrations'">
                    Setup API
                  </b-button>
                </td>
              </tr>
              <tr>
                <td>Display fact sheet</td>
                <td>settings 2</td>
                <td>
                  <b-button size="sm" variant="outline-success" :to="'/display-widgets'">
                    Get Widget</b-button
                  >
                </td>
              </tr>
              <tr>
                <td>Website integration</td>
                <td>settings 2</td>
                <td><b-button size="sm">options</b-button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  async created() {
    await this.getProperties();
  },
  computed: {
    properties() {
      return this.$store.getters["property/getProperties"];
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
  },
  methods: {
    async getProperties() {
      await this.$store
        .dispatch("property/getInfo")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    showEdit(property) {
      this.propertyToEdit = {
        id: property.id,
        country: property.country,
        district: property.district,
        city: property.city,
        hotel_name: property.hotel_name,
      };
      this.showModal = true;
    },
    async save() {
      if (this.propertyToEdit.id === 0) {
        await this.AddProperty();
      } else {
        await this.updateProperty();
      }
      this.showModal = false;
    },
    cancel() {
      this.showModal = false;
    },
  },
};
</script>
