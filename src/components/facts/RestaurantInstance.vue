<template>
  <div>
    <b-tab :title="tabName" :title-link-class="linkClass()" @click="activate()">
      <span
        class="text-right"
        style="float: right"
        type="button"
        title="delete this restaurant"
        @click="deleteRestaurant()"
      >
        <b-icon icon="trash" variant="danger" scale="1.5"></b-icon>
      </span>
      <b-row id="id_HotelRestaurant_Number">
        <!-- left side  -->
        <b-col cols="6">
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">Restaurant name</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    v-model="property.restaurantName"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">Restaurant type</label>
                <div class="col">
                  <b-select
                    size="sm"
                    :options="restaurantTypeOptions"
                    class="form-control form-control-sm"
                    v-model="property.restaurantType"
                  >
                  </b-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">Cuisine type</label>
                <div class="col">
                  <b-select
                    size="sm"
                    :options="restaurantCuisineTypeOptions"
                    class="form-control form-control-sm"
                    v-model="property.restaurantCuisineType"
                  >
                  </b-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm"
                  >Restaurant features
                </label>
                <div class="col">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="property.restaurantFeatures.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in property.restaurantFeatures"
                          :key="item"
                          pill
                          variant="success"
                        >
                          {{ item }}
                        </b-badge>
                      </div>
                    </b-card>
                    <b-dropdown-item
                      :event="'hover'"
                      href="javascript:void(0)"
                      v-for="restfeat in restaurantFeaturesOptions"
                      :key="restfeat"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="property.restaurantFeatures"
                        @click.native.stop=""
                        :value="restfeat"
                        >{{ restfeat }}</b-form-checkbox
                      >
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="1"></b-col>
        <!-- right side -->
        <b-col cols="5">
          <div>
            <!--style="padding:12px; border:1px solid orange; margin-bottom:5px;" -->
            <b-form-checkbox v-model="property.restaurantIsBuffet"> Buffet </b-form-checkbox>
            <b-form-checkbox v-model="property.restaurantIsAlaCarte"> A la Carte </b-form-checkbox>
          </div>
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">Opening days </label>
                <div class="col">
                  <b-dropdown
                    boundary="viewport"
                    variant="outline-dark"
                    size="sm"
                    :text="property.restaurantOpeningDays.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in property.restaurantOpeningDays"
                          :key="item"
                          pill
                          variant="success"
                        >
                          {{ item }}
                        </b-badge>
                      </div>
                    </b-card>
                    <b-dropdown-item
                      :event="'hover'"
                      href="javascript:void(0)"
                      v-for="mealType in getdaysOfTheWeek"
                      :key="mealType"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="property.restaurantOpeningDays"
                        @click.native.stop=""
                        :value="mealType"
                        >{{ mealType }}</b-form-checkbox
                      >
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">From</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.restaurantOpeningFrom"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">To</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.restaurantOpeningTo"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-tab>
  </div>
</template>
<script>
export default {
  name: "RestaurantsInstance",
  props: {
    restaurantIndex: { type: Number },
    isSelected: { type: Boolean, default: false },
  },
  data() {
    return {
      onGroundFloor: false,
      restaurantFeaturesOptions: [
        "air condition",
        "fancy",
        "seasonal",
        "Japanese style",
        "Moroccan style",
        "Turksih style",
        "show cooking",
        "terrace",
        "Arabian night style",
        "Asian style",
        "Chinese style",
        "indoor",
        "non smoker",
        "non smoker area",
        "outdoor area",
        "outdoor facilities depending on weather",
        "panoramic terrace",
      ],
      restaurantCuisineTypeOptions: [
        { value: null, text: "Select Option" },
        { value: "African", text: "African" },
        { value: "American", text: "American" },
        { value: "Arabic", text: "Arabic" },
        { value: "Asian", text: "Asian" },
        { value: "British", text: "British" },
        { value: "Chinese", text: "Chinese" },
        { value: "German", text: "German" },
        { value: "French", text: "French" },
        { value: "Greek", text: "Greek" },
        { value: "Indian", text: "Indian" },
        { value: "International", text: "International" },
        { value: "Italian", text: "Italian" },
        { value: "Japanese", text: "Japanese" },
        { value: "Caribbean", text: "Caribbean" },
        { value: "Cuban", text: "Cuban" },
        { value: "Mediterranean", text: "Mediterranean" },
        { value: "Mexican", text: "Mexican" },
        { value: "National", text: "National" },
        { value: "Oriental", text: "Oriental" },
        { value: "Scandinavian", text: "Scandinavian" },
        { value: "South American", text: "South American" },
        { value: "Thai", text: "Thai" },
        { value: "Turkish", text: "Turkish" },
      ],
      restaurantTypeOptions: [
        { value: null, text: "SelectOption" },
        { value: "beachrestaurant", text: "beachrestaurant" },
        { value: "bistro", text: "bistro" },
        { value: "brasserie", text: "brasserie" },
        { value: "creperie", text: "creperie" },
        { value: "gourmetrestaurant", text: "gourmetrestaurant" },
        { value: "grillrestaurant", text: "grillrestaurant" },
        { value: "pizzeria", text: "pizzeria" },
        { value: "poolrestaurant", text: "poolrestaurant" },
        { value: "steakhouse", text: "steakhouse" },
        { value: "seafoodrestaurant", text: "seafoodrestaurant" },
        { value: "speciality", text: "speciality" },
        { value: "Tapasrestaurant", text: "Tapasrestaurant" },
        { value: "taverna", text: "taverna" },
      ],
    };
  },
  computed: {
    tabName() {
      return this.property.restaurantName === "" || this.property.restaurantName === null
        ? "New Restaurant"
        : this.property.restaurantName;
    },
    property() {
      return this.$store.getters["restaurantsFactsComp/getProperties"][this.restaurantIndex];
    },
    getdaysOfTheWeek() {
      return this.$store.getters["options/getdaysOfTheWeek"];
    },
  },
  methods: {
    activate() {
      this.$emit("activated", {
        restaurantId: this.restaurantId,
      });
    },
    deleteRestaurant() {
      this.$emit("deleted", {
        restaurantId: this.property,
      });
    },
    linkClass() {
      return this.isSelected ? ["bg-primary", "text-light"] : ["bg-light", "text-info"];
    },
  },
};
</script>
