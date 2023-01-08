<template>
  <b-container>
    <b-row>
      <b-col cols="10">
        <h4>Accommodation's photos</h4>
        <span
          >View and manage Photos for your accommodation, All photos are available for usage
          directly into facts sheet or to send. More Info
          <b-icon
            icon="question-circle-fill"
            scale="1.2"
            variant="primary"
            aria-label="Help"
          ></b-icon>
        </span>
        <br />
        <b-card
          ><span
            >Runing out of space ? Do you need maximum photos resolution and unlimited photos space
            ! Cosider </span
          ><a loading="0" href="/subscribe" class="sc-furwcr ejyCsp">Upgrading to PREMIUM</a>
        </b-card>
      </b-col>
    </b-row>
    <br />

    <div class="GFS-Center-Table">
      <table class="table table-hover">
        <thead class="GFS-TNave">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hotel</th>
            <th scope="col">City</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(property, index) in properties" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ property.hotelName }}</td>
            <td>{{ property.city }}</td>
            <b-button variant="warning" :to="`/property-photos/${property.id}/`">
              View / edit {{ property.hotelName }}
            </b-button>
          </tr>
        </tbody>
      </table>
    </div>
  </b-container>
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
    toggle() {},
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
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
  },
};
</script>
