<template>
  <div class="container">
    <h3>Restaurants</h3>
    <p class="text-danger" v-if="errors.length > 0">
      <b>Please correct the following error(s):</b>
    </p>

    <ul>
      <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">{{ error }}</li>
    </ul>
    <b-row>
      <b-col cols="12">
        <p>
          <button id="btn-add-room" class="pull-right" @click="addRestaurant()">
            Add Restaurant
          </button>
        </p>
      </b-col>
    </b-row>
    <!-- this is container of all restaurants  -->
    <b-row>
      <b-col cols="12">
        <b-tabs card>
          <!-- this is a restaurant tab, each restaurant must be in a separate tab
      with the name of the restaurant instead of Tab 1 -->

          <!-- End restaurant data -->
          <div v-for="(r, index) of restaurants" :key="index">
            <RestaurantInstance
              :restaurantIndex="index"
              :isSelected="r.isSelected"
              @activated="changeTab(index)"
              @deleted="deleteRoom(index)"
            />
          </div>
        </b-tabs>
      </b-col>
    </b-row>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="themeChanger">
        <div class="modal">
          <header class="modalheader">
            <h5>Confirm</h5>
          </header>
          <p>Are you sure you want to delete this restaurant?</p>
          <button @click="confirmDelete()">Yes</button>
          <button @click="cancelDelete()">No</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import RestaurantInstance from "./RestaurantInstance.vue";

export default {
  name: "RestaurantsFactsComp",
  data() {
    return {
      themeChanger: false,
      restaurants: [],
      showDelete: false,
      errors: [],
    };
  },
  components: {
    RestaurantInstance,
  },
  computed: {},
  methods: {
    changeTab(currentRestaurant) {
      this.restaurants.forEach((restaurant) => {
        restaurant.isSelected = this.restaurants.indexOf(restaurant) === currentRestaurant;
      });
    },
    // eslint-disable-next-line no-unused-vars
    deleteRestaurant(currentRestaurant) {
      /* console.log("deleted", currentRestaurant); */
      this.showDelete = true;
    },
    confirmDelete() {
      this.$store.dispatch("restaurantsFactsComp/deleteRestaurant");
      this.rooms = this.$store.getters["restaurantsFactsComp/getProperties"];
      this.showDelete = false;
    },
    cancelDelete() {
      this.showDelete = false;
    },
    addRestaurant() {
      this.$store.dispatch("restaurantsFactsComp/addNewRestaurant");
      this.restaurants = this.$store.getters["restaurantsFactsComp/getProperties"];
    },
    async save() {
      if (this.isLoading) {
        return;
      }
      this.validate();
      if (this.errors.length > 0) {
        return;
      }
      this.isLoading = true;
      const restaurantsToUpdate = {};
      await this.$store
        .dispatch("restaurantsFactsComp/postInfo", restaurantsToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.isLoading = false;
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.isLoading = false;
        });
    },
    validate() {
      const newValidations = [];
      if (!this.property.restaurantName) {
        newValidations.push("Restaurant Name required.");
      }
      this.$store.dispatch("restaurantsFactsComp/validate", newValidations);
      this.errors = this.$store.getters["restaurantsFactsComp/getErrors"];
      /* console.log(this.errors); */
    },
  },
};
</script>
