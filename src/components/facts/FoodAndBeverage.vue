<template>
  <div class="container">
    <form id="form1" v-on:submit.prevent @submit="save()">
      <h4>Food and Beverage</h4>
      <p class="text-danger" v-if="errors.length > 0">
        <b>Please correct the following error(s):</b>
      </p>

      <ul>
        <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
          {{ error }}
        </li>
      </ul>
      <div style="width: fit-content">
        <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
          <b-form-checkbox
            style="width: fit-content"
            size="sm"
            v-model="property.boardsAvailable"
            v-for="option in getBoardsTypesOptions"
            :key="option.index"
            :value="option.value"
            :aria-describedby="ariaDescribedby"
            name="flavour-3a"
            stacked
          >
            {{ option.text }}
          </b-form-checkbox>
        </b-form-group>
      </div>
      <b-row v-if="breakfastTypeRequired">
        <b-col style="margin-block: auto">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm" style="font-weight: bold"
              >Breakfast Types <span class="text-danger">*</span></label
            >
            <div class="col">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.hotelBreakfastTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.hotelBreakfastTypes"
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
                  v-for="mealType in getBreakfastMealsTypesOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.hotelBreakfastTypes"
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
      <b-row v-if="lunchTypeRequired">
        <b-col style="margin-block: auto">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm" style="font-weight: bold"
              >Lunch Types <span class="text-danger">*</span></label
            >
            <div class="col">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.hotelLunchTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.hotelLunchTypes"
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
                  v-for="mealType in getLunchMealsTypesOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.hotelLunchTypes"
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
      <!-- <b-row>
<b-col cols="5">
<div class="form-group row"><label class="col-sm-5 col-form-label col-form-label-sm"
>Lunch Type :
<span v-if="lunchTypeRequired" class="text-danger"> *</span>
<b-link variant="primary" v-b-toggle.collapse-2-inner size="sm"
>Select</b-link
>
<b-collapse id="collapse-2-inner" class="mt-2">
<b-card>
<b-form-group
label="Form-checkbox-group stacked checkboxes"
v-slot="{ ariaDescribedby }"
>
<b-form-checkbox-group
v-model="property.hotelLunchTypes"
:options="getLunchMealsTypesOptions"
:aria-describedby="ariaDescribedby"
name="flavour-2a"
stacked
></b-form-checkbox-group>
</b-form-group>
</b-card>
</b-collapse>
</label>
</b-col>
</b-row> -->
      <b-row v-if="dinnerTypeRequired">
        <b-col style="margin-block: auto">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm" style="font-weight: bold"
              >Dinner Types <span class="text-danger">*</span></label
            >
            <div class="col">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.hotelDinnerTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.hotelDinnerTypes"
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
                  v-for="mealType in getDinnerMealsTypesOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.hotelDinnerTypes"
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
      <b-row v-if="dinnerTypeRequired">
        <b-col>
          <b-form-checkbox size="sm" v-model="property.dinnerDressCodeRequired"
            >Dress code required for Dinner</b-form-checkbox
          >
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col style="margin-block: auto">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm"
              >Special corners and requests</label
            >
            <div class="col">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.hotelFoodSpecials.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.hotelFoodSpecials"
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
                  v-for="mealType in getSpecialMealsTypesOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.hotelFoodSpecials"
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
      <hr />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.hotelHasChristmasDinner"
            >Christmas Dinner</b-form-checkbox
          >
        </b-col>
        <b-col cols="9" v-if="property.hotelHasChristmasDinner">
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">Charges</label>
                <div class="col-sm-6">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.hotelChristmasDinnerCharges"
                  >
                    <option :value="null">--Select Option--</option>
                    <option v-for="(a, index) in chargesTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div>
                <b-form-checkbox size="sm" v-model="property.hotelChristmasDinnerObligatory">
                  Obligatory
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.hotelChristmasDinnerDrinks"
                  >Drinks Included ?</b-form-checkbox
                >
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.hotelHasNyeDinner"
            >New Year's Eve Dinner</b-form-checkbox
          >
        </b-col>
        <b-col cols="9" v-if="property.hotelHasNyeDinner">
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">Charges</label>
                <div class="col-sm-6">
                  <select class="form-control form-control-sm" v-model="property.hotelNyeCharges">
                    <option :value="null">--Select Option--</option>
                    <option v-for="(a, index) in chargesTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div>
                <b-form-checkbox size="sm" v-model="property.hotelNyeObligatory"
                  >Obligatory</b-form-checkbox
                >
                <b-form-checkbox size="sm" v-model="property.hotelNyeDrinks"
                  >Drinks Included ?</b-form-checkbox
                >
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.hotelHasOtherGala"
            >Other Gala Dinner</b-form-checkbox
          >
        </b-col>
        <b-col cols="9" v-if="property.hotelHasOtherGala">
          <b-row>
            <h6>Specify Gala Details</h6>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">Name</label>
                <div class="col-sm-6">
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    v-model="property.hotelGalaName"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">Date</label>
                <div class="col-sm-6">
                  <input
                    class="form-control form-control-sm"
                    type="date"
                    v-model="property.hotelGalaDate"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">Charges</label>
                <div class="col-sm-6">
                  <select class="form-control form-control-sm" v-model="property.hotelGalaCharges">
                    <option :value="null">--Select Option--</option>
                    <option v-for="(a, index) in chargesTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div>
                <b-form-checkbox size="sm" v-model="property.hotelGalaObligatory">
                  Obligatory
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.hotelGalaDrinks"
                  >Drinks Included ?</b-form-checkbox
                >
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "FoodFactsComp",
  components: {},
  data() {
    return {
      isClosable: false,
      isLoading: false,
      chargesTypes: ["Inclusive", "Additional Charge", "Free for AI Boards"],
      formObj: null,
      options: {
        // Initialize the CustomPlacement.
        customPlacement(inputElement, errorElement) {
          inputElement = inputElement.closest(".form-group").querySelector(".error");
          inputElement.parentElement.appendChild(errorElement);
        },
        rules: {
          BreakfastType: {
            required: true,
          },
        },
      },
      errors: [],
    };
  },
  computed: {
    property() {
      return this.$store.getters["foodAndBeverageFactsComp/getProperty"];
    },
    getBoardsTypesOptions() {
      return this.$store.getters["options/getBoardsTypes"];
    },
    breakfastTypeRequired() {
      if (this.property.boardsAvailable.includes("Bed and Breakfast")) {
        return true;
      }
      if (this.dinnerTypeRequired) {
        return true;
      }
      return false;
    },
    lunchTypeRequired() {
      if (this.property.boardsAvailable.includes("Full Board")) {
        return true;
      }
      if (this.property.boardsAvailable.includes("Full Board Plus")) {
        return true;
      }
      if (this.property.boardsAvailable.includes("All Inclusive")) {
        return true;
      }
      if (this.property.boardsAvailable.includes("All Inclusive Light")) {
        return true;
      }
      if (this.property.boardsAvailable.includes("All Inclusive Plus")) {
        return true;
      }
      if (this.property.boardsAvailable.includes("All Inclusive Ultra")) {
        return true;
      }
      return false;
    },
    dinnerTypeRequired() {
      if (this.property.boardsAvailable.includes("Half Board")) {
        return true;
      }
      if (this.lunchTypeRequired) {
        return true;
      }
      return false;
    },
    getBreakfastMealsTypesOptions() {
      return this.$store.getters["options/getBreakfastMealsTypes"];
    },
    getLunchMealsTypesOptions() {
      return this.$store.getters["options/getLunchMealsTypes"];
    },
    getDinnerMealsTypesOptions() {
      return this.$store.getters["options/getDinnerMealsTypes"];
    },
    getSpecialMealsTypesOptions() {
      return this.$store.getters["options/getSpecialMealsTypes"];
    },
    cBreakfastInHotel() {
      return this.property.boardsAvailable.includes("Bed and Breakfast") ||
        this.property.boardsAvailable.includes("Half Board") ||
        this.property.boardsAvailable.includes("Full Board") ||
        this.property.boardsAvailable.includes("Full Board Plus") ||
        this.property.boardsAvailable.includes("All Inclusive Light") ||
        this.property.boardsAvailable.includes("All Inclusive Plus") ||
        this.property.boardsAvailable.includes("All Inclusive Ultra")
        ? this.property.hotelBreakfastTypes
        : [];
    },
    cLunchInHotel() {
      return this.property.boardsAvailable.includes("Full Board") ||
        this.property.boardsAvailable.includes("Full Board Plus") ||
        this.property.boardsAvailable.includes("All Inclusive Light") ||
        this.property.boardsAvailable.includes("All Inclusive Plus") ||
        this.property.boardsAvailable.includes("All Inclusive Ultra")
        ? this.property.hotelLunchTypes
        : [];
    },
    cDinnerInHotel() {
      return this.property.boardsAvailable.includes("Half Board") ||
        this.property.boardsAvailable.includes("Full Board") ||
        this.property.boardsAvailable.includes("Full Board Plus") ||
        this.property.boardsAvailable.includes("All Inclusive Light") ||
        this.property.boardsAvailable.includes("All Inclusive Plus") ||
        this.property.boardsAvailable.includes("All Inclusive Ultra")
        ? this.property.hotelDinnerTypes
        : [];
    },
    cChristmasDinnerCharges() {
      return this.property.hotelHasChristmasDinner
        ? this.property.hotelChristmasDinnerCharges
        : null;
    },
    cChristmasDinnerObligatory() {
      return this.property.hotelHasChristmasDinner
        ? this.property.hotelChristmasDinnerObligatory
        : false;
    },
    cChristmasDinnerDrinks() {
      return this.property.hotelHasChristmasDinner
        ? this.property.hotelChristmasDinnerDrinks
        : false;
    },
    cNyeDinnerCharges() {
      return this.property.hotelHasNyeDinner ? this.property.hotelNyeCharges : null;
    },
    cNyeDinnerObligatory() {
      return this.property.hotelHasNyeDinner ? this.property.hotelNyeObligatory : false;
    },
    cNyeDinnerDrinks() {
      return this.property.hotelHasNyeDinner ? this.property.hotelNyeDrinks : false;
    },
    cOtherGalaName() {
      return this.property.hotelHasOtherGala ? this.property.hotelGalaName : null;
    },
    cOtherGalaDate() {
      return this.property.hotelHasOtherGala ? this.property.hotelGalaDate : null;
    },
    cOtherGalaDinnerCharges() {
      return this.property.hotelHasOtherGala ? this.property.hotelGalaCharges : null;
    },
    cOtherGalaObligatory() {
      return this.property.hotelHasOtherGala ? this.property.hotelGalaObligatory : false;
    },
    cOtherGalaDrinks() {
      return this.property.hotelHasOtherGala ? this.property.hotelGalaDrinks : false;
    },
  },
  mounted() {
    // this.formObj = new FormValidator('#form1', this.options);
  },
  created() {},
  methods: {
    convertTimeFormat(inputTime) {
      const date = new Date(inputTime);
      const resultDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
      const resultTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`;
      return `${resultDate}T${resultTime}Z`;
    },
    getInfo() {
      const propertyId = this.$route.params.id;
      /* console.log("property id is", propertyId); */
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("foodAndBeverageFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.errors = this.$store.getters["foodAndBeverageFactsComp/getErrors"];
          this.$store.dispatch("view/load", false);
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.$store.dispatch("view/load", false);
        });
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
      const propertyId = this.$route.params.id;
      const foodAndBeverageToUpdate = {
        id: this.property.id,
        hotel: this.property.id || propertyId,
        hotel_name: this.property.hotelName,
        boards_available: this.property.boardsAvailable,
        hotel_breakfast_types: this.cBreakfastInHotel,
        hotel_lunch_types: this.cLunchInHotel,
        hotel_dinner_types: this.cDinnerInHotel,
        hotel_food_specials: this.property.hotelFoodSpecials,
        dinner_dress_code_required: this.property.dinnerDressCodeRequired,
        hotel_has_christmas_dinner: this.property.hotelHasChristmasDinner,
        hotel_christmas_dinner_charges: this.cChristmasDinnerCharges,
        hotel_christmas_dinner_obligatory: this.cChristmasDinnerObligatory,
        hotel_christmas_dinner_drinks: this.cChristmasDinnerDrinks,
        hotel_has_nye_dinner: this.property.hotelHasNyeDinner,
        hotel_nye_charges: this.cNyeDinnerCharges,
        hotel_nye_obligatory: this.cNyeDinnerObligatory,
        hotel_nye_drinks: this.cNyeDinnerDrinks,
        hotel_has_other_gala: this.property.hotelHasOtherGala,
        hotel_gala_name: this.cOtherGalaName,
        hotel_gala_date: this.cOtherGalaDate,
        hotel_gala_charges: this.cOtherGalaDinnerCharges,
        hotel_gala_drinks: this.cOtherGalaDrinks,
        hotel_gala_obligatory: this.cOtherGalaObligatory,
      };
      await this.$store
        .dispatch("foodAndBeverageFactsComp/postInfo", foodAndBeverageToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.isLoading = false;
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          this.isLoading = false;
        });
    },
    validate() {
      const newValidations = [];
      if (this.property.boardsAvailable.length < 1) {
        newValidations.push("Hotel Board required.");
      }
      if (this.breakfastTypeRequired && this.property.hotelBreakfastTypes.length < 1) {
        newValidations.push("Breakfast details required");
      }
      if (this.dinnerTypeRequired && this.property.hotelDinnerTypes.length < 1) {
        newValidations.push("Dinner details required");
      }
      if (this.lunchTypeRequired && this.property.hotelLunchTypes.length < 1) {
        newValidations.push("Lunch details required");
      }
      this.$store.dispatch("foodAndBeverageFactsComp/validate", newValidations);
      this.errors = this.$store.getters["foodAndBeverageFactsComp/getErrors"];
    },
    select(option) {
      const i = this.property.hotelBreakfastTypes.indexOf(option);
      if (i >= 0) {
        this.property.hotelBreakfastTypes.splice(i, 1);
      } else {
        this.property.hotelBreakfastTypes.push(option);
      }
    },
    multiselectx(option, setx) {
      const i = setx.indexOf(option);
      if (i >= 0) {
        setx.splice(i, 1);
      } else {
        setx.push(option);
      }
    },
  },
};
</script>
