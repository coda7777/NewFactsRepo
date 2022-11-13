<template>
  <div class="container">
    <b-row>
      <b-col cols="10">
        <h4>Facts sheets of partner hotels</h4>
        <span
          >View facts sheets of connected hotels
          <b-icon
            icon="question-circle-fill"
            scale="1.2"
            variant="primary"
            aria-label="Help"
          ></b-icon>
        </span>
      </b-col>
      <b-col cols="2">
        <b-button to="/overridefact" variant="outline-success" class="button">Override</b-button>
      </b-col>
    </b-row>
    <div class="GFS-Center-Table">
      <b-table class="table table-hover" striped hover :items="properties" :fields="fields">
        <thead class="GFS-TNave">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Country</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Hotel</th>
            <th scope="col">Last Update</th>
            <th scope="col">Edit</th>
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
            <td>
              <code>{{ getStatus(property) }}</code>
            </td>
            <b-button size="sm" variant="outline-info" @click="showEdit(property)">Edit</b-button>
            <b-button size="sm" variant="outline-info" @click="showRemove(property)"
              >Remove</b-button
            >
          </tr>
        </tbody>
      </b-table>
    </div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal">
        <div class="modal">
          <header class="modalheader">
            <h5>Add New Accommodation</h5>
          </header>
          <div class="modalcontainer">
            <form v-on:submit.prevent @submit="save()">
              <div class="form-group">
                <div class="input-group">
                  <label for="country-name" class="col-sm-3 col-form-label text-sm-right"
                    >Country</label
                  >
                  <span v-if="loadCountry" class="input-group-addon">
                    <i class="spinner-border spinner-border"></i>
                  </span>
                  <select
                    id="country-name"
                    type="text"
                    class="form-control"
                    required
                    v-model="propertyToEdit.country"
                    @change="getStates()"
                  >
                    <option value="null" selected>--Select Country--</option>
                    <option v-for="(k, index) in countries" :key="index" :value="k.iso2">
                      {{ k.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <label for="state-name" class="col-sm-3 col-form-label text-sm-right"
                    >State</label
                  >
                  <span v-if="loadState" class="input-group-addon">
                    <i class="spinner-border spinner-border"></i>
                  </span>
                  <select
                    id="state-name"
                    type="text"
                    class="form-control"
                    required
                    v-model="propertyToEdit.state"
                    @change="getCities()"
                  >
                    <option value="null" selected>--Select State--</option>
                    <option v-for="(s, index) in states" :key="index" :value="s.iso2">
                      {{ s.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <label for="city-name" class="col-sm-3 col-form-label text-sm-right">City</label>
                  <span v-if="loadCity" class="input-group-addon">
                    <i class="spinner-border spinner-border"></i>
                  </span>
                  <select
                    id="city-name"
                    type="text"
                    class="form-control"
                    v-model="propertyToEdit.city"
                  >
                    <option value="null" selected>--Select City--</option>
                    <option v-for="(c, index) in cities" :key="index" :value="c.name">
                      {{ c.name }}
                    </option>
                  </select>
                </div>
              </div>
              <b-form-group
                label="Hotel Name"
                label-for="id_Hotel_Name"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <input
                  class="form-control"
                  type="text"
                  id="id_Hotel_Name"
                  v-model="propertyToEdit.hotelName"
                  required
                />
              </b-form-group>
              <b-button type="submit" variant="outline-success" class="modalbutton">Save</b-button>
              <b-button type="button" variant="outline-danger" class="modalbutton" @click="cancel()"
                >Cancel</b-button
              >
            </form>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showDelete">
        <div class="modal">
          <header class="modalheader">
            <h5>Confirm Delete</h5>
          </header>
          <div class="modalcontainer">
            <p>Are you sure you want to delete this property?</p>
            <div class="row">
              <div class="col-md-12 text-right">
                <button type="button" class="btn btn-outline-danger" @click="removeProperty">
                  Delete
                </button>
                <button type="button" class="btn btn-outline-success" @click="hideRemove">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "country",
          label: this.$t("country"),
          sortable: true,
          sortByFormatted: true,
          formatter: (value, key, item) => item.stats.country?.text,
        },
      ],
      showModal: false,
      propertyToEdit: {
        country: null,
        state: null,
        city: null,
      },
      showDelete: false,
      propertyToDelete: null,
      loadCountry: false,
      loadState: false,
      loadCity: false,
    };
  },
  computed: {
    countries() {
      return this.$store.getters["countries/getCountries"];
    },
    states() {
      return this.$store.getters["countries/getStates"];
    },
    cities() {
      return this.$store.getters["countries/getCities"];
    },
    properties() {
      return this.$store.getters["property/getProperties"];
    },
  },
  async created() {
    await this.getCountries();
    await this.getProperties();
  },
  methods: {
    getStatus(property) {
      console.log(property);
      return property.publish ? "Live" : "Draft";
    },
    async getCountries() {
      this.loadCountry = true;
      await this.$store.dispatch("countries/retrieveCountries").then(() => {
        this.loadCountry = false;
      });
    },
    async getStates() {
      const countryCode = this.propertyToEdit.country;
      this.loadState = true;
      this.loadCity = true;
      await this.$store.dispatch("countries/retrieveStates", countryCode).then(() => {
        this.loadState = false;
        this.loadCity = false;
      });
    },
    async getCities() {
      const countryCode = this.propertyToEdit.country;
      const stateCode = this.propertyToEdit.state;
      this.loadCity = true;
      await this.$store
        .dispatch("countries/retrieveCities", {
          countryCode,
          stateCode,
        })
        .then(() => {
          this.loadCity = false;
        })
        .catch(() => {
          this.loadCity = false;
        });
    },
    async getProperties() {
      this.$store.dispatch("view/load", true);
      await this.$store
        .dispatch("property/getInfo")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.$store.dispatch("view/load", false);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.$store.dispatch("view/load", false);
        });
    },
    showEdit(property) {
      this.propertyToEdit = {
        id: property.id,
        country: property.country,
        state: property.state,
        city: property.city,
        hotelName: property.hotelName,
      };
      this.getStates();
      this.getCities();
      this.showModal = true;
    },
    showAdd() {
      this.propertyToEdit = {
        id: 0,
        country: null,
        city: null,
        state: null,
        hotelName: null,
      };
      this.showModal = true;
    },
    async updateProperty() {
      const propertyData = {
        id: this.propertyToEdit.id,
        country: this.propertyToEdit.country,
        city: this.propertyToEdit.city,
        state: this.propertyToEdit.state,
        hotel_name: this.propertyToEdit.hotelName,
      };
      console.log(propertyData);
      await this.$store
        .dispatch("property/putInfo", propertyData)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    async AddProperty() {
      const propertyData = {
        id: this.propertyToEdit.id,
        country: this.propertyToEdit.country,
        city: this.propertyToEdit.city,
        state: this.propertyToEdit.state,
        hotel_name: this.propertyToEdit.hotelName,
      };
      await this.$store
        .dispatch("property/postInfo", propertyData)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    showRemove(propertyToRemove) {
      this.propertyToDelete = propertyToRemove;
      this.showDelete = true;
    },
    hideRemove() {
      this.showDelete = false;
    },
    async removeProperty() {
      await this.$store
        .dispatch("property/deleteInfo", this.propertyToDelete)
        .then(() => {
          this.hideRemove();
        })
        .catch(() => {});
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
