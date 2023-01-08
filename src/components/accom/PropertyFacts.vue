<template>
  <b-container>
    <b-col cols="10">
      <h4>Select property to create or edit its facts sheet</h4>
    </b-col>
    <div class="GFS-Center-Table">
      <table class="table table-hover">
        <thead class="GFS-TNave">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Country</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Hotel</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(property, index) in properties" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ property.country }}</td>
            <td>{{ property.state }}</td>
            <td>{{ property.city }}</td>
            <td>{{ property.hotelName }}</td>
            <td v-if="property.publish" class="text-success">Live</td>
            <td v-else class="text-danger">Unpublished</td>
            <td>
              <b-button
                variant="outline-success"
                size="sm"
                :to="`/property/${property.id}/general`"
                style="min-width: 120px"
              >
                Edit {{ property.hotelName }}
              </b-button>
            </td>
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
    async getProperties() {
      await this.$store
        .dispatch("property/getInfo")
        .then(() => {})
        .catch(() => {});
    },
    showEdit(property) {
      this.propertyToEdit = {
        id: property.id,
        country: property.country,
        district: property.district,
        city: property.city,
        hotelName: property.hotelName,
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
