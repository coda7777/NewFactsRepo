<template>
  <div class="container">
    <b-col cols="10">
      <h4>Manage property's Photos</h4>
    </b-col>

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
