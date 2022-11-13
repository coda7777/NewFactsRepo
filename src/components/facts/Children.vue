<template>
  <b-container>
    <form v-on:submit.prevent @submit="save()">
      <h4>Children</h4>
      <p class="text-danger" v-if="errors.length > 0">
        <b>Please correct the following error(s):</b>
      </p>

      <ul>
        <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
          {{ error }}
        </li>
      </ul>

      <b-row>
        <b-col cols="4">
          <b-form-checkbox size="sm" v-model="property.babyPoolAvailable">
            Baby pool available
          </b-form-checkbox>
        </b-col>
        <b-col cols="4" v-if="property.babyPoolAvailable">
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm"
              >Max water depth in cm.<span class="text-danger">*</span></label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                step="1"
                v-model="property.babyPoolDepth"
                placeholder="30"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col>
          <h5>children pool</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>
          <b-form-checkbox size="sm" v-model="property.childrenPoolAvailable">
            children's pool available
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row v-if="property.childrenPoolAvailable">
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm"
              >number of children's pool<span class="reqastr">*</span></label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                v-model="property.childrenPoolCount"
                placeholder="1"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm"
              >Max water depth in cm.
              <span class="text-danger">*</span>
            </label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                v-model="property.childrenPoolDepth"
                placeholder="30"
              />
            </div>
          </div>
          <div v-if="property.childrenPoolHasSlides">
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm">number of slides</label>
              <div class="col">
                <input
                  type="number"
                  v-model="property.childrenPoolSlidesCount"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">type</label>
            <div class="col-sm-6">
              <select
                class="form-control form-control-sm"
                v-model="property.childrenPoolType"
                name="dogs-curr"
              >
                <option :value="null">Select option</option>
                <option value="Build-in">Build-in</option>
                <option value="Separate">Separate</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
            <div class="col-sm-6">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.childrenPoolFrom"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
            <div class="col-sm-6">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.childrenPoolTo"
              />
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <b-form-checkbox size="sm" v-model="property.childrenPoolHasSlides"
            >slides</b-form-checkbox
          >
          <b-form-checkbox size="sm" v-model="property.childrenPoolIsHeated"
            >heatable</b-form-checkbox
          >
          <b-form-checkbox size="sm" v-model="property.childrenPoolHasPirateShip"
            >pirate ship</b-form-checkbox
          >
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col>
          <h5>playground</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-checkbox size="sm" v-model="property.childrenPlayGroundAvailable"
            >Playground available</b-form-checkbox
          >
        </b-col>
        <b-col cols="4" v-if="property.childrenPlayGroundAvailable">
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm">Number of playgrounds</label>
            <div class="col-sm-6">
              <input
                class="form-control form-control-sm"
                type="number"
                v-model="property.childrenPlayGroundCount"
                placeholder="30"
              />
            </div>
          </div>
        </b-col>
        <b-col v-if="property.childrenPlayGroundAvailable">
          <b-form-checkbox size="sm" v-model="property.childrenPlayGroundAdventure"
            >adventure playground</b-form-checkbox
          >
          <b-form-checkbox size="sm" v-model="property.childrenPlayGroundParadise"
            >playground paradise</b-form-checkbox
          >
          <b-form-checkbox size="sm" v-model="property.childrenPlayGroundCovered"
            >covered</b-form-checkbox
          >
        </b-col>
      </b-row>
      <hr />
      <h5>Miniclub</h5>
      <b-row>
        <b-col cols="4">
          <b-form-checkbox size="sm" v-model="property.childrenMiniClubAvailable"
            >miniclub available</b-form-checkbox
          >
        </b-col>
      </b-row>
      <b-row v-if="property.childrenMiniClubAvailable">
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">Name</label>
            <div class="col-sm-6">
              <input
                class="form-control form-control-sm"
                type="text"
                v-model="property.childrenMiniClubName"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">From</label>
            <div class="col-sm-6">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.childrenMiniClubFrom"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">To</label>
            <div class="col-sm-6">
              <input
                class="form-control form-control-sm"
                type="time"
                v-model="property.childrenMiniClubTo"
              />
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm">age from (years)</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                v-model="property.childrenMiniClubAgeFrom"
                min="2"
                placeholder="5"
              />
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Charges</label>
            <div class="col-sm-6">
              <select
                class="form-control form-control-sm"
                v-model="property.childrenMiniClubCharges"
              >
                <option :value="null">Select Option</option>
                <option value="Inclusive">Inclusive</option>
                <option value="Additional Charge">Additional Charge</option>
              </select>
            </div>
          </div>
          <div v-if="property.childrenMiniClubCharges === 'Additional Charge'">
            <div class="form-group row">
              <label class="col-sm-2 col-form-label col-form-label-sm">Price</label>
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="0.1"
                  v-model="property.childrenMiniClubPrice"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label col-form-label-sm">currency</label>
              <div class="col-sm-6">
                <select
                  class="form-control form-control-sm"
                  v-model="property.childrenMiniClubCurrency"
                >
                  <option :value="null">Select option</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="5">
          <div class="form-group row">
            <label class="col-sm-5 col-form-label col-form-label-sm">Languages available</label>
            <div class="col">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.childrenMiniClubLanguage.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.childrenMiniClubLanguage"
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
                  v-for="mealType in languagesOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.childrenMiniClubLanguage"
                    @click.native.stop=""
                    :value="mealType"
                    >{{ mealType }}</b-form-checkbox
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-5 col-form-label col-form-label-sm">Operating days</label>
            <div class="col">
              <b-dropdown
                boundary="viewport"
                variant="outline-dark"
                size="sm"
                :text="property.childrenMiniClubDays.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.childrenMiniClubDays"
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
                    v-model="property.childrenMiniClubDays"
                    @click.native.stop=""
                    :value="mealType"
                    >{{ mealType }}</b-form-checkbox
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-5 col-form-label col-form-label-sm">restrictions</label>
            <div class="col">
              <b-dropdown
                boundary="viewport"
                variant="outline-dark"
                size="sm"
                :text="property.childrenMiniClubRestriction.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.childrenMiniClubRestriction"
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
                  v-for="mealType in childrenMiniClubRestrictionOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.childrenMiniClubRestriction"
                    @click.native.stop=""
                    :value="mealType"
                    >{{ mealType }}</b-form-checkbox
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </b-col>
        <b-col>
          <b-form-checkbox size="sm" v-model="property.childrenMiniClubParentExist"
            >Parents must remain with their children in the miniclub all the time</b-form-checkbox
          >
          <b-form-checkbox size="sm" v-model="property.childrenMiniClubParentOnGround"
            >Parents must stay on the hotel grounds</b-form-checkbox
          >
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col>
          <h5>children's entertainment</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="5">
          <div class="form-group row">
            <label class="col-sm-5 col-form-label col-form-label-sm">Entertainment</label>
            <div class="col">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.childrenEntertainment.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.childrenEntertainment"
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
                  v-for="mealType in getHotelChildrenEntertainment"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.childrenEntertainment"
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
          <h5>babysitter & cots</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="4">
          <b-form-checkbox size="sm" v-model="property.babyCotsAvailable"
            >Cots available</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.babyCotsAvailable">
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                <div class="col-sm-6">
                  <select class="form-control form-control-sm" v-model="property.babyCotCharges">
                    <option :value="null">Select Option</option>
                    <option value="Inclusive">Inclusive</option>
                    <option value="Additional Charge">Additional Charge</option>
                  </select>
                  <small class="form-text text-muted">(payable at the hotel)</small>
                </div>
              </div>
              <div class="form-group row" v-if="property.babyCotCharges === 'Additional Charge'">
                <label class="col-sm-5 col-form-label col-form-label-sm">Cot price</label>
                <div class="col-sm-6">
                  <input
                    class="form-control form-control-sm"
                    type="double"
                    min="0"
                    step="0.1"
                    v-model="property.babyCotPrice"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="">
              <b-form-checkbox size="sm" v-model="property.babyCotReservationRequired"
                >reservation required</b-form-checkbox
              >
              <b-form-checkbox size="sm" v-model="property.babyCotOnRequest"
                >on request</b-form-checkbox
              >
              <b-form-checkbox size="sm" v-model="property.babyCotPriceUpSeason"
                >fees may vary during the season</b-form-checkbox
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="8">
          <b-form-checkbox size="sm" v-model="property.babysitterService"
            >Babysitter service (for additional charge payable at hotel)</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.babysitterService">
          <b-form-checkbox size="sm" v-model="property.babysitterReservationRequired">
            reservation required
          </b-form-checkbox>

          <b-form-checkbox size="sm" v-model="property.babysitterOnRequest">
            on request
          </b-form-checkbox>
        </b-col>
      </b-row>
      <hr />
      <h5>Others</h5>

      <b-row>
        <b-col>
          <b-dropdown
            size="sm"
            boundary="viewport"
            variant="outline-dark"
            :text="property.childrenOtherServices.length + ' Selected options'"
            class="m-md-2"
            style="max-width: 350px !important; font-weight: 600"
          >
            <b-card class="bcardmultidrop">
              <div>
                <b-badge
                  class="multidropbadge"
                  v-for="item in property.childrenOtherServices"
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
              v-for="mealType in getHotelChildrenOtherServices"
              :key="mealType"
              @click.native.capture.stop
            >
              <b-form-checkbox
                v-model="property.childrenOtherServices"
                @click.native.stop=""
                :value="mealType"
                >{{ mealType }}</b-form-checkbox
              >
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </form>
  </b-container>
</template>
<script>
export default {
  name: "ChildrenFactsComp",
  data() {
    return {
      isLoading: false,
      property: this.$store.getters["childrenFactsComp/getProperty"],
      errors: [],
      languagesOptions: [
        "English",
        "German",
        "French",
        "Dutch",
        "Italian",
        "Spanish",
        "International",
      ],
      childrenMiniClubRestrictionOptions: [
        "during the high season",
        "during low season only on weekends",
        "depending on capacity",
        "during holiday periods",
      ],
    };
  },
  computed: {
    getdaysOfTheWeek() {
      return this.$store.getters["options/getdaysOfTheWeek"];
    },
    getHotelChildrenEntertainment() {
      return this.$store.getters["options/getHotelChildrenEntertainment"];
    },
    getHotelChildrenOtherServices() {
      return this.$store.getters["options/getHotelChildrenOtherServices"];
    },
    cBabyPoolDepth() {
      return this.property.babyPoolAvailable ? this.property.babyPoolDepth : null;
    },
    cChildrenPoolCount() {
      return this.property.childrenPoolAvailable ? this.property.childrenPoolCount : null;
    },
    cChildrenPoolDepth() {
      return this.property.childrenPoolAvailable ? this.property.childrenPoolDepth : null;
    },
    cChildrenPoolType() {
      return this.property.childrenPoolAvailable ? this.property.childrenPoolType : null;
    },
    cChildrenPoolFrom() {
      return this.property.childrenPoolAvailable ? this.property.childrenPoolFrom : null;
    },
    cChildrenPoolTo() {
      return this.property.childrenPoolAvailable ? this.property.childrenPoolTo : null;
    },
    cChildrenPoolIsHeated() {
      return this.property.childrenPoolAvailable && this.property.childrenPoolIsHeated;
    },
    cChildrenPoolHasSlides() {
      return this.property.childrenPoolAvailable && this.property.childrenPoolHasSlides;
    },
    cChildrenPoolSlidesCount() {
      return this.cChildrenPoolHasSlides ? this.property.childrenPoolSlidesCount : null;
    },
    cChildrenPoolHasPirateShip() {
      return this.property.childrenPoolAvailable && this.property.childrenPoolHasPirateShip;
    },
    cChildrenPlayGroundCount() {
      return this.childrenPlayGroundAvailable ? this.property.childrenPlayGroundCount : null;
    },
    cChildrenPlayGroundAdventure() {
      return this.property.childrenPlayGroundAvailable && this.property.childrenPlayGroundAdventure;
    },
    cChildrenPlayGroundParadise() {
      return this.property.childrenPlayGroundAvailable && this.property.childrenPlayGroundParadise;
    },
    cChildrenPlayGroundCovered() {
      return this.property.childrenPlayGroundAvailable && this.property.childrenPlayGroundCovered;
    },
    cChildrenMiniClubName() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubName : null;
    },
    cChildrenMiniClubAgeFrom() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubAgeFrom : null;
    },
    cChildrenMiniClubCharges() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubCharges : null;
    },
    cChildrenMiniClubPrice() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubPrice : null;
    },
    cChildrenMiniClubCurrency() {
      return this.property.childrenMiniClubAvailable
        ? this.property.childrenMiniClubCurrency
        : null;
    },
    cChildrenMiniClubParentExist() {
      return this.property.childrenMiniClubAvailable && this.property.childrenMiniClubParentExist;
    },
    cChildrenMiniClubParentOnGround() {
      return (
        this.property.childrenMiniClubAvailable && this.property.childrenMiniClubParentOnGround
      );
    },
    cChildrenMiniClubLanguage() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubLanguage : [];
    },
    cChildrenMiniClubDays() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubDays : [];
    },
    cChildrenMiniClubFrom() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubFrom : null;
    },
    cChildrenMiniClubTo() {
      return this.property.childrenMiniClubAvailable ? this.property.childrenMiniClubTo : null;
    },
    cChildrenMiniClubRestriction() {
      return this.property.childrenMiniClubAvailable
        ? this.property.childrenMiniClubRestriction
        : [];
    },
    cBabyCotCharges() {
      return this.property.babyCotsAvailable ? this.property.babyCotCharges : null;
    },
    cBabyCotReservationRequired() {
      return this.property.babyCotsAvailable && this.property.babyCotReservationRequired;
    },
    cBabyCotOnRequest() {
      return this.property.babyCotsAvailable && this.property.babyCotOnRequest;
    },
    cbabyCotPriceUpSeason() {
      return this.property.babyCotsAvailable && this.property.babyCotPriceUpSeason;
    },
    cBabyCotPrice() {
      return this.property.babyCotsAvailable ? this.property.babyCotPrice : null;
    },
    cBabysitterReservationRequired() {
      return this.property.babysitterService && this.property.babysitterReservationRequired;
    },
    cBabysitterOnRequest() {
      return this.property.babysitterService && this.property.babysitterOnRequest;
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
      const propertyId = this.$route.params.id;
      /* console.log("property id is", propertyId); */
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("childrenFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["childrenFactsComp/getProperty"];
          this.$store.dispatch("view/load", false);
          this.errors = this.$store.getters["childrenFactsComp/getErrors"];
          this.isLoading = false;
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.isLoading = false;
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
      const childrenToUpdate = {
        id: this.property.id,
        hotel: this.property.id || propertyId,
        baby_pool_available: this.property.babyPoolAvailable,
        baby_pool_depth: this.cBabyPoolDepth,
        children_pool_available: this.property.childrenPoolAvailable,
        children_pool_count: this.cChildrenPoolCount,
        children_pool_depth: this.cChildrenPoolDepth,
        children_pool_type: this.cChildrenPoolType,
        children_pool_from: this.cChildrenPoolFrom,
        children_pool_to: this.cChildrenPoolTo,
        children_pool_is_heated: this.cChildrenPoolIsHeated,
        children_pool_has_slides: this.cChildrenPoolHasSlides,
        children_pool_slides_count: this.cChildrenPoolSlidesCount,
        children_pool_has_pirate_ship: this.cChildrenPoolHasPirateShip,
        children_play_ground_available: this.property.childrenPlayGroundAvailable,
        children_play_ground_count: this.cChildrenPlayGroundCount,
        children_play_ground_adventure: this.cChildrenPlayGroundAdventure,
        children_play_ground_paradise: this.cChildrenPlayGroundParadise,
        children_play_ground_covered: this.cChildrenPlayGroundCovered,
        children_mini_club_available: this.property.childrenMiniClubAvailable,
        children_mini_club_name: this.cChildrenMiniClubName,
        children_mini_club_age_from: this.cChildrenMiniClubAgeFrom,
        children_mini_club_charges: this.cChildrenMiniClubCharges,
        children_mini_club_price: this.cChildrenMiniClubPrice,
        children_mini_club_currency: this.cChildrenMiniClubCurrency,
        children_mini_club_parent_exist: this.cChildrenMiniClubParentExist,
        children_mini_club_parent_on_ground: this.cChildrenMiniClubParentOnGround,
        children_mini_club_language: this.cChildrenMiniClubLanguage || [],
        children_mini_club_days: this.cChildrenMiniClubDays || [],
        children_mini_club_from: this.cChildrenMiniClubFrom,
        children_mini_club_to: this.cChildrenMiniClubTo,
        children_mini_club_restriction: this.cChildrenMiniClubRestriction || [],
        children_entertainment: this.property.childrenEntertainment,
        baby_cots_available: this.property.babyCotsAvailable,
        baby_cot_charges: this.cBabyCotCharges,
        baby_cot_reservation_required: this.cBabyCotReservationRequired,
        baby_cot_on_request: this.cBabyCotOnRequest,
        baby_cot_price_up_season: this.cbabyCotPriceUpSeason,
        baby_cot_price: this.cBabyCotPrice,
        babysitter_service: this.property.babysitterService,
        babysitter_reservation_required: this.cBabysitterReservationRequired,
        babysitter_on_request: this.cBabysitterOnRequest,
        children_other_services: this.property.childrenOtherServices || [],
      };
      await this.$store
        .dispatch("childrenFactsComp/postInfo", childrenToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.isLoading = false;
          this.property = this.$store.getters["childrenFactsComp/getProperty"];
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
      if (this.property.babyPoolAvailable && this.property.babyPoolDepth === null) {
        newValidations.push("Baby pool's depth is required");
      }
      if (this.property.childrenPoolAvailable && this.property.childrenPoolCount < 1) {
        newValidations.push("Number of children's pool is required");
      }
      if (this.property.childrenPoolAvailable && this.property.childrenPoolDepth < 1) {
        newValidations.push("Children's pool depth is required");
      }
      if (this.property.childrenMiniClubAvailable && this.property.childrenMiniClubAgeFrom < 1) {
        newValidations.push("Mini club age-from is required");
      }
      if (
        this.property.childrenMiniClubAvailable &&
        this.property.childrenMiniClubCharges === null
      ) {
        newValidations.push("Mini club charges is required");
      }
      if (this.property.babyCotsAvailable && this.property.babyCotCharges === null) {
        newValidations.push("Baby cot charges is required");
      }
      if (
        this.property.babyCotCharges === "Additional Charge" &&
        this.property.babyCotPrice === null
      ) {
        newValidations.push("Baby cot Price is required");
      }
      this.$store.dispatch("childrenFactsComp/validate", newValidations);
      this.errors = this.$store.getters["childrenFactsComp/getErrors"];
      /* console.log(this.errors); */
    },
  },
};
</script>
