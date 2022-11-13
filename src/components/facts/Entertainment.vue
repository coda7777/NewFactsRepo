<template>
  <div class="container">
    <h4>Entertainment</h4>
    <p class="text-danger" v-if="errors.length > 0">
      <b>Please correct the following error(s):</b>
    </p>

    <ul>
      <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent @submit="save()">
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.eveningEntertainment"
            >Evening entertainment</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.eveningEntertainment">
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label col-form-label-sm">Selection</label>
                <div class="col">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="property.eveningEntertainmentActive.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in property.eveningEntertainmentActive"
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
                      v-for="mealType in eveningEntertainmentActiveOptions"
                      :key="mealType"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="property.eveningEntertainmentActive"
                        @click.native.stop=""
                        :value="mealType"
                        >{{ mealType }}</b-form-checkbox
                      >
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </b-col>
            <b-col cols="5">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">Frequency</label>
                <div class="col-sm-6">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.eveningEntertainmentFrequency"
                  >
                    <option :value="null" selected>select option</option>
                    <option value="daily">daily</option>
                    <option value="regularly">regularly</option>
                    <option value="occasionally">occasionally</option>
                    <option value="x times per week">x times per week</option>
                  </select>
                </div>
              </div>
              <div v-if="property.eveningEntertainmentFrequency === 'x times per week'">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Exact times</label>
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.eveningEntertainmentCount"
                    />
                  </div>
                </div>
              </div>

              <b-form-checkbox size="sm" v-model="property.eveningEntertainmentSeasonal"
                >Seasonal
              </b-form-checkbox>
            </b-col>
            <b-col cols="3">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">from</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.eveningEntertainmentFrom"
                    placeholder="10"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">to</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.eveningEntertainmentTo"
                    placeholder="14"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />

      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.sportsAnimation"
            >sports animation</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.sportsAnimation">
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label col-form-label-sm">Type</label>
                <div class="col-sm-7">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sportsAnimationType"
                  >
                    <option :value="null" selected>select option</option>
                    <option value="varied">varied</option>
                    <option value="simple">simple</option>
                    <option value="work out">work out</option>
                    <option value="cardio">cardio</option>
                    <option value="extensive">extensive</option>
                    <option value="insanity">insanity</option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col cols="5">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">Frequency</label>
                <div class="col-sm-6">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sportsAnimationFrequency"
                  >
                    <option :value="null" selected>select option</option>
                    <option value="daily">daily</option>
                    <option value="regularly">regularly</option>
                    <option value="occasionally">occasionally</option>
                    <option value="x times per week">x times per week</option>
                  </select>
                </div>
              </div>
              <span v-if="property.sportsAnimationFrequency === 'x times per week'">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Exact times</label>
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.sportsAnimationCount"
                    />
                  </div>
                </div>
              </span>

              <b-form-checkbox size="sm" v-model="property.sportsAnimationSeasonal"
                >Seasonal</b-form-checkbox
              >
            </b-col>
            <b-col cols="3">
              <span>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label col-form-label-sm">from</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="time"
                      placeholder="10"
                      v-model="property.sportsAnimationFrom"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-2 col-form-label col-form-label-sm">to</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="time"
                      placeholder="14"
                      v-model="property.sportsAnimationTo"
                    />
                  </div>
                </div>
              </span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />

      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.dayTimeAnimation"
            >daytime animation</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.dayTimeAnimation">
          <b-row>
            <b-col cols="5">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">Frequency</label>
                <div class="col-sm-7">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.dayTimeAnimationFrequency"
                  >
                    <option :value="null" selected>select option</option>
                    <option value="daily">daily</option>
                    <option value="regularly">regularly</option>
                    <option value="occasionally">occasionally</option>
                    <option value="x times per week">x times per week</option>
                  </select>
                </div>
              </div>
              <span v-if="property.dayTimeAnimationFrequency === 'x times per week'">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label col-form-label-sm">Exact times</label>
                  <div class="col-sm-7">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.dayTimeAnimationCount"
                    />
                  </div>
                </div>
              </span>

              <b-form-checkbox size="sm" v-model="property.dayTimeAnimationSeasonal"
                >seasonal</b-form-checkbox
              >
            </b-col>
            <b-col cols="3">
              <span>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label col-form-label-sm">from</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="time"
                      v-model="property.dayTimeAnimationFrom"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-2 col-form-label col-form-label-sm">to</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="time"
                      v-model="property.dayTimeAnimationTo"
                      placeholder="14"
                    />
                  </div>
                </div>
              </span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />

      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.changingEntertainment"
            >changing programme of activities</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.changingEntertainment">
          <b-row>
            <b-col cols="5">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">Frequency</label>
                <div class="col-sm-7">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.changingEntertainmentFrequency"
                  >
                    <option :value="null" selected>select option</option>
                    <option value="daily">daily</option>
                    <option value="regularly">regularly</option>
                    <option value="occasionally">occasionally</option>
                    <option value="x times per week">x times per week</option>
                  </select>
                </div>
              </div>
              <span v-if="property.changingEntertainmentFrequency === 'x times per week'">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Exact times</label>
                  <div class="col-sm-7">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.changingEntertainmentCount"
                    />
                  </div>
                </div>
              </span>
            </b-col>
            <b-col cols="3">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">from</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.changingEntertainmentFrom"
                    placeholder="10"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">to</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.changingEntertainmentTo"
                    placeholder="14"
                  />
                </div>
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
  name: "EntertainmentFactsComp",
  data() {
    return {
      property: this.$store.getters["entertainmentFactsComp/getProperty"],
      isLoading: false,
      errors: [],
      eveningEntertainmentActiveOptions: [
        "Bingo night",
        "slide show",
        "folklore shows",
        "karaoke night",
        "live music",
        "piano night",
        "shows",
        "dance",
        "theme night",
        "family quiz night",
      ],
    };
  },
  computed: {
    cEveningEntertainmentActive() {
      return this.property.eveningEntertainment ? this.property.eveningEntertainmentActive : [];
    },
    cEveningEntertainmentFrequency() {
      return this.property.eveningEntertainment
        ? this.property.eveningEntertainmentFrequency
        : null;
    },
    cEveningEntertainmentCount() {
      return this.property.eveningEntertainment ? this.property.eveningEntertainmentCount : null;
    },
    cEveningEntertainmentSeasonal() {
      return this.property.eveningEntertainment && this.property.eveningEntertainmentSeasonal;
    },
    cEveningEntertainmentFrom() {
      return this.property.eveningEntertainment ? this.property.eveningEntertainmentFrom : null;
    },
    cEveningEntertainmentTo() {
      return this.property.eveningEntertainment ? this.property.eveningEntertainmentTo : null;
    },
    cSportsAnimationType() {
      return this.property.sportsAnimation ? this.property.sportsAnimationType : null;
    },
    cSportsAnimationFrequency() {
      return this.property.sportsAnimation ? this.property.sportsAnimationFrequency : null;
    },
    cSportsAnimationCount() {
      return this.property.sportsAnimation ? this.property.sportsAnimationCount : null;
    },
    cSportsAnimationSeasonal() {
      return this.property.sportsAnimation && this.property.sportsAnimationSeasonal;
    },
    cSportsAnimationFrom() {
      return this.property.sportsAnimation ? this.property.sportsAnimationFrom : null;
    },
    cSportsAnimationTo() {
      return this.property.sportsAnimation ? this.property.sportsAnimationTo : null;
    },
    cDayTimeAnimationFrequency() {
      return this.property.dayTimeAnimation ? this.property.dayTimeAnimationFrequency : null;
    },
    cDayTimeAnimationCount() {
      return this.property.dayTimeAnimation ? this.property.dayTimeAnimationCount : null;
    },
    cDayTimeAnimationSeasonal() {
      return this.property.dayTimeAnimation && this.property.dayTimeAnimationSeasonal;
    },
    cDayTimeAnimationFrom() {
      return this.property.dayTimeAnimation ? this.property.dayTimeAnimationFrom : null;
    },
    cDayTimeAnimationTo() {
      return this.property.dayTimeAnimation ? this.property.dayTimeAnimationTo : null;
    },
    cChangingEntertainmentFrequency() {
      return this.property.changingEntertainment
        ? this.property.changingEntertainmentFrequency
        : null;
    },
    cChangingEntertainmentCount() {
      return this.property.changingEntertainment ? this.property.changingEntertainmentCount : null;
    },
    cChangingEntertainmentFrom() {
      return this.property.changingEntertainment ? this.property.changingEntertainmentFrom : null;
    },
    cChangingEntertainmentTo() {
      return this.property.changingEntertainment ? this.property.changingEntertainmentTo : null;
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
        .dispatch("entertainmentFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["entertainmentFactsComp/getProperty"];
          this.$store.dispatch("view/load", false);
          this.errors = this.$store.getters["entertainmentFactsComp/getErrors"];
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
        evening_entertainment: this.property.eveningEntertainment,
        evening_entertainment_active: this.cEveningEntertainmentActive || [],
        evening_entertainment_frequency: this.cEveningEntertainmentFrequency,
        evening_entertainment_count: this.cEveningEntertainmentCount,
        evening_entertainment_seasonal: this.cEveningEntertainmentSeasonal,
        evening_entertainment_from: this.cEveningEntertainmentFrom,
        evening_entertainment_to: this.cEveningEntertainmentTo,
        sports_animation: this.property.sportsAnimation,
        sports_animation_type: this.cSportsAnimationType,
        sports_animation_frequency: this.cSportsAnimationFrequency,
        sports_animation_count: this.cSportsAnimationCount,
        sports_animation_seasonal: this.cSportsAnimationSeasonal,
        sports_animation_from: this.cSportsAnimationFrom,
        sports_animation_to: this.cSportsAnimationTo,
        day_time_animation: this.property.dayTimeAnimation,
        day_time_animation_frequency: this.cDayTimeAnimationFrequency,
        day_time_animation_count: this.cDayTimeAnimationCount,
        day_time_animation_seasonal: this.cDayTimeAnimationSeasonal,
        day_time_animation_from: this.cDayTimeAnimationFrom,
        day_time_animation_to: this.cDayTimeAnimationTo,
        changing_entertainment: this.property.changingEntertainment,
        changing_entertainment_frequency: this.cChangingEntertainmentFrequency,
        changing_entertainment_count: this.cChangingEntertainmentCount,
        changing_entertainment_from: this.cChangingEntertainmentFrom,
        changing_entertainment_to: this.cChangingEntertainmentTo,
      };
      await this.$store
        .dispatch("entertainmentFactsComp/postInfo", childrenToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.isLoading = false;
          this.property = this.$store.getters["entertainmentFactsComp/getProperty"];
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
      if (!this.property.eveningEntertainment) {
        newValidations.push("test validation required");
      }

      this.$store.dispatch("entertainmentFactsComp/validate", newValidations);
      this.errors = this.$store.getters["entertainmentFactsComp/getErrors"];
      /* console.log(this.errors); */
    },
  },
};
</script>
