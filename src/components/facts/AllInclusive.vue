<template>
  <div class="container">
    <form v-on:submit.prevent @submit="save()">
      <h4>All Inclusive Options</h4>
      <p class="text-danger" v-if="errors.length > 0">
        <b>Please correct the following error(s):</b>
      </p>

      <ul>
        <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
          {{ error }}
        </li>
      </ul>
      <hr style="width: 25%; margin-left: 0px; margin-top: 0px; margin-bottom: 20px" />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.restrictionArrDep"
            >Restriction on Arrival/Departure day</b-form-checkbox
          >
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Breakfast Type</label>
            <div class="col-sm-6">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.breakfastTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.breakfastTypes"
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
                  v-for="mealType in getBreakfastMealsTypes"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.breakfastTypes"
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
        <b-col cols="12">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Lunch Type</label>
            <div class="col-sm-6">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.lunchTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.lunchTypes"
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
                  v-for="mealType in getLunchMealsTypes"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.lunchTypes"
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
        <b-col cols="12">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Dinner Type</label>
            <div class="col-sm-6">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.dinnerTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.dinnerTypes"
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
                  v-for="mealType in getDinnerMealsTypes"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.dinnerTypes"
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
        <b-col>
          <h5>Others</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.afternoonSnacksAvailable"
            >Afternoon snacks</b-form-checkbox
          >
        </b-col>
        <b-col cols="6" v-if="property.afternoonSnacksAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col-sm-4">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.afternoonSnacksFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col-sm-4">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.afternoonSnacksTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.cafeCakesAvailable"
            >Coffee & cakes/pastries</b-form-checkbox
          >
        </b-col>
        <b-col cols="6" v-if="property.cafeCakesAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.cafeCakesFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.cafeCakesTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.iceCreamAvailable">Icecream</b-form-checkbox>
        </b-col>
        <b-col cols="6" v-if="property.iceCreamAvailable">
          <div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="time"
                  v-model="property.iceCreamFrom"
                />
              </div>
              <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="time"
                  v-model="property.iceCreamTo"
                />
              </div>
            </div>
          </div>
          <b-col cols="">
            <b-form-checkbox v-model="property.iceCreamKidsOnly">
              For children only
            </b-form-checkbox>
          </b-col>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.kidsMealAvailable">Kids meals</b-form-checkbox>
        </b-col>
        <b-col cols="6" v-if="property.kidsMealAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.kidsMealFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.kidsMealTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.lateBreakfastAvailable"
            >Late risers breakfast</b-form-checkbox
          >
        </b-col>
        <b-col cols="6" v-if="property.lateBreakfastAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.lateBreakfastFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.lateBreakfastTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.midnightSnackAvailable"
            >Midnight snacks</b-form-checkbox
          >
        </b-col>
        <b-col cols="6" v-if="property.midnightSnackAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.midnightSnackFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.midnightSnackTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.midnightSoupAvailable">Midnight soup</b-form-checkbox>
        </b-col>
        <b-col cols="6" v-if="property.midnightSoupAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.midnightSoupFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.midnightSoupTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3">
          <b-form-checkbox v-model="property.snacksAvailable">Snacks available</b-form-checkbox>
        </b-col>
        <b-col cols="6" v-if="property.snacksAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.snacksFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input class="form-control form-control-sm" type="time" v-model="property.snacksTo" />
            </div>
          </div>
          <b-form-checkbox v-model="property.snacksAllDay"
            >Snacks available through the day</b-form-checkbox
          >
        </b-col>
      </b-row>

      <b-row v-if="property.snacksAvailable">
        <b-col cols="12">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Snacks Type</label>
            <div class="col-sm-6">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.snacksTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.snacksTypes"
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
                  v-for="mealType in getAISnacksTypes"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.snacksTypes"
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

      <h5>Beverage</h5>
      <br />
      <b-row>
        <b-col style="margin-block: auto">
          <div class="form-group row">
            <div class="col-sm-2">
              <b-form-checkbox v-model="property.drinksAllDay"> Drinks 24/7 </b-form-checkbox>
            </div>
            <div class="col" v-if="property.drinksAllDay">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.drinksTypes.length + ' Selected options'"
                class="m-md-3"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.drinksTypes"
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
                  v-for="option in getAIDrinksTypes"
                  :key="option"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.drinksTypes"
                    @click.native.stop=""
                    :value="option"
                    >{{ option }}</b-form-checkbox
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </b-col>
      </b-row>
      <hr />
      <h5>Limited time drinks</h5>
      <br />
      <b-row>
        <b-col>
          <b-form-checkbox v-model="property.localAlcoholAvailable">
            Selected local alcoholic drinks
          </b-form-checkbox>
        </b-col>
        <b-col v-if="property.localAlcoholAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.localAlcoholFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.localAlcoholTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-checkbox v-model="property.nonAlcoholAvailable"
            >Selected non-alcoholic drinks</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.nonAlcoholAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.nonAlcoholFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.nonAlcoholTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-checkbox v-model="property.interAlcoholAvailable"
            >Selected international alcoholic drinks</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.interAlcoholAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.interAlcoholFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.interAlcoholTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-checkbox v-model="property.interNonAlcoholAvailable"
            >Selected international non-alcoholic drinks</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.interNonAlcoholAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.interNonAlcoholFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.interNonAlcoholTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-checkbox v-model="property.menuDrinksAvailable">
            drinks on the all inclusive menu
          </b-form-checkbox>
        </b-col>
        <b-col v-if="property.menuDrinksAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.menuDrinksFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.menuDrinksTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-checkbox v-model="property.coffeeTeaAvailable"> Coffee & Tea </b-form-checkbox>
        </b-col>
        <b-col v-if="property.coffeeTeaAvailable">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.coffeeTeaFrom"
              />
            </div>
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.coffeeTeaTo"
              />
            </div>
          </div>
        </b-col>
      </b-row>

      <br />
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Special Services</label>
            <div class="col-sm-6">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.specialServices.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.specialServices"
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
                  v-for="mealType in getAISpecialServices"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.specialServices"
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
    </form>
  </div>
</template>
<script>
export default {
  name: "AllInclusiveFactsComp",
  data() {
    return {
      isLoading: false,
      property: this.$store.getters["allInclusiveFactsComp/getProperty"],
      errors: [],
    };
  },
  computed: {
    isTabActive() {
      const boards = this.$store.getters["foodAndBeverageFactsComp/getProperty"].boardsAvailable;
      return !boards.join().includes("All Inclusive");
    },
    getBreakfastMealsTypes() {
      return this.$store.getters["options/getBreakfastMealsTypes"];
    },
    getLunchMealsTypes() {
      return this.$store.getters["options/getLunchMealsTypes"];
    },
    getDinnerMealsTypes() {
      return this.$store.getters["options/getDinnerMealsTypes"];
    },
    getAIDrinksTypes() {
      return this.$store.getters["options/getAIDrinksTypes"];
    },
    getAISnacksTypes() {
      return this.$store.getters["options/getAISnacksTypes"];
    },
    getAISpecialServices() {
      return this.$store.getters["options/getAISpecialServices"];
    },
    cAfternoonSnacksFrom() {
      return this.property.afternoonSnacksAvailable ? this.property.afternoonSnacksFrom : null;
    },
    cAfternoonSnacksTo() {
      return this.property.afternoonSnacksAvailable ? this.property.afternoonSnacksTo : null;
    },
    cCafeCakesFrom() {
      return this.property.cafeCakesAvailable ? this.property.cafeCakesFrom : null;
    },
    cCafeCakesTo() {
      return this.property.cafeCakesAvailable ? this.property.cafeCakesTo : null;
    },
    cIceCreamFrom() {
      return this.property.iceCreamAvailable ? this.property.iceCreamFrom : null;
    },
    cIceCreamTo() {
      return this.property.iceCreamAvailable ? this.property.iceCreamTo : null;
    },
    cKidsMealFrom() {
      return this.property.kidsMealAvailable ? this.property.kidsMealFrom : null;
    },
    cKidsMealTo() {
      return this.property.kidsMealAvailable ? this.property.kidsMealTo : null;
    },
    cLateBreakfastFrom() {
      return this.property.lateBreakfastAvailable ? this.property.lateBreakfastFrom : null;
    },
    cLateBreakfastTo() {
      return this.property.lateBreakfastAvailable ? this.property.lateBreakfastTo : null;
    },
    cMidnightSnackFrom() {
      return this.property.midnightSnackAvailable ? this.property.midnightSnackFrom : null;
    },
    cMidnightSnackTo() {
      return this.property.midnightSnackAvailable ? this.property.midnightSnackTo : null;
    },
    cMidnightSoupFrom() {
      return this.property.midnightSoupAvailable ? this.property.midnightSoupFrom : null;
    },
    cMidnightSoupTo() {
      return this.property.midnightSoupAvailable ? this.property.midnightSoupTo : null;
    },
    cSnacksFrom() {
      return this.property.snacksAvailable ? this.property.snacksFrom : null;
    },
    cSnacksTo() {
      return this.property.snacksAvailable ? this.property.snacksTo : null;
    },
    cSnacksType() {
      return this.property.snacksAvailable ? this.property.snacksTypes : [];
    },
    cLocalAlcoholFrom() {
      return this.property.localAlcoholAvailable ? this.property.localAlcoholFrom : null;
    },
    cLocalAlcoholTo() {
      return this.property.localAlcoholAvailable ? this.property.localAlcoholTo : null;
    },
    cNonAlcoholFrom() {
      return this.property.nonAlcoholAvailable ? this.property.nonAlcoholFrom : null;
    },
    cNonAlcoholTo() {
      return this.property.nonAlcoholAvailable ? this.property.nonAlcoholTo : null;
    },
    cInterAlcoholFrom() {
      return this.property.interAlcoholAvailable ? this.property.interAlcoholFrom : null;
    },
    cInterAlcoholTo() {
      return this.property.interAlcoholAvailable ? this.property.interAlcoholTo : null;
    },
    cInterNonAlcoholFrom() {
      return this.property.interNonAlcoholAvailable ? this.property.interNonAlcoholFrom : null;
    },
    cInterNonAlcoholTo() {
      return this.property.interNonAlcoholAvailable ? this.property.interNonAlcoholTo : null;
    },
    cMenuDrinksFrom() {
      return this.property.menuDrinksAvailable ? this.property.menuDrinksFrom : null;
    },
    cMenuDrinksTo() {
      return this.property.menuDrinksAvailable ? this.property.menuDrinksTo : null;
    },
    cCoffeeTeaFrom() {
      return this.property.coffeeTeaAvailable ? this.property.coffeeTeaFrom : null;
    },
    cCoffeeTeaTo() {
      return this.property.coffeeTeaAvailable ? this.property.coffeeTeaTo : null;
    },
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
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const propertyId = this.$route.params.id;
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("allInclusiveFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["allInclusiveFactsComp/getProperty"];
          this.$store.dispatch("view/load", false);
          this.isLoading = false;
          this.errors = this.$store.getters["allInclusiveFactsComp/getErrors"];
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.$store.dispatch("view/load", false);
          this.isLoading = false;
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
      const allInclusiveToUpdate = {
        id: this.property.id,
        hotel: this.property.id || propertyId,
        restriction_arr_dep: this.property.restrictionArrDep,
        breakfast_types: this.property.breakfastTypes || [],
        lunch_types: this.property.lunchTypes || [],
        dinner_types: this.property.dinnerTypes || [],
        afternoon_snacks_available: this.property.afternoonSnacksAvailable,
        afternoon_snacks_from: this.cAfternoonSnacksFrom,
        afternoon_snacks_to: this.cAfternoonSnacksTo,
        cafe_cakes_available: this.property.cafeCakesAvailable,
        cafe_cakes_from: this.cCafeCakesFrom,
        cafe_cakes_to: this.cCafeCakesTo,
        ice_cream_available: this.property.iceCreamAvailable,
        ice_cream_from: this.cIceCreamFrom,
        ice_cream_to: this.cIceCreamTo,
        ice_cream_kids_only: this.property.iceCreamKidsOnly,
        kids_meal_available: this.property.kidsMealAvailable,
        kids_meal_from: this.cKidsMealFrom,
        kids_meal_to: this.cKidsMealTo,
        late_breakfast_available: this.property.lateBreakfastAvailable,
        late_breakfast_from: this.cLateBreakfastFrom,
        late_breakfast_to: this.cLateBreakfastTo,
        midnight_snack_available: this.property.midnightSnackAvailable,
        midnight_snack_from: this.cMidnightSnackFrom,
        midnight_snack_to: this.cMidnightSnackTo,
        midnight_soup_available: this.property.midnightSoupAvailable,
        midnight_soup_from: this.cMidnightSoupFrom,
        midnight_soup_to: this.cMidnightSoupTo,
        snacks_available: this.property.snacksAvailable,
        snacks_from: this.cSnacksFrom,
        snacks_to: this.cSnacksTo,
        snacks_all_day: this.property.snacksAllDay,
        snacks_types: this.cSnacksType || [],
        drinks_all_day: this.property.drinksAllDay,
        drinks_types: this.property.drinksTypes || [],
        local_alcohol_available: this.property.localAlcoholAvailable,
        local_alcohol_from: this.cLocalAlcoholFrom,
        local_alcohol_to: this.cLocalAlcoholTo,
        non_alcohol_available: this.property.nonAlcoholAvailable,
        non_alcohol_from: this.cNonAlcoholFrom,
        non_alcohol_to: this.cNonAlcoholTo,
        inter_alcohol_available: this.property.interAlcoholAvailable,
        inter_alcohol_from: this.cInterAlcoholFrom,
        inter_alcohol_to: this.cInterAlcoholTo,
        inter_non_alcohol_available: this.property.interNonAlcoholAvailable,
        inter_non_alcohol_from: this.cInterNonAlcoholFrom,
        inter_non_alcohol_to: this.cInterNonAlcoholTo,
        menu_drinks_available: this.property.menuDrinksAvailable,
        menu_drinks_from: this.cMenuDrinksFrom,
        menu_drinks_to: this.cMenuDrinksTo,
        coffee_tea_available: this.property.coffeeTeaAvailable,
        coffee_tea_from: this.cCoffeeTeaFrom,
        coffee_tea_to: this.cCoffeeTeaTo,
        special_services: this.property.specialServices || [],
      };
      await this.$store
        .dispatch("allInclusiveFactsComp/postInfo", allInclusiveToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["allInclusiveFactsComp/getProperty"];
          this.isLoading = false;
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error.data); */
          this.isLoading = false;
        });
    },
    validate() {
      const newValidations = [];
      if (!this.property.snacksAvailable) {
        newValidations.push("test validation required");
      }
      this.$store.dispatch("allInclusiveFactsComp/validate", newValidations);
      this.errors = this.$store.getters["allInclusiveFactsComp/getErrors"];
      /* console.log(this.errors); */
    },
  },
};
</script>
