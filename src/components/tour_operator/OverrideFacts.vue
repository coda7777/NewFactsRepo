<template>
  <div class="container">
    <b-row>
      <b-col cols="10">
        <h4>Select property to create or edit its facts sheet</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>Over writing{{ Hotel }} Facts details</b-col>
      <div class="form-group row">
        <span
          >Fields are limited per choice of the hotel. For more info check documentation
          <b-button variant="outline" to="#"
            ><b-icon
              icon="question-circle-fill"
              scale="1.2"
              variant="primary"
              aria-label="Help"
            ></b-icon
          ></b-button>
        </span>
      </div>
    </b-row>
    <form v-on:submit.prevent @submit="updateProfile()">
      <b-row>
        <b-col cols="6">
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="control-label col-sm-4">Location Environment Type</label>
                <div class="controls col-sm-8">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="TO_locationEnvironment.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in TO_locationEnvironment"
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
                      v-for="locType in locationEnvironmentOptions"
                      :key="locType"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="TO_locationEnvironment"
                        @click.native.stop=""
                        :value="locType"
                        >{{ locType }}</b-form-checkbox
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
                <label class="control-label col-sm-4">Beach characteristics</label>
                <div class="controls col-sm-8">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="TO_beachCharacteristics.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in TO_beachCharacteristics"
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
                      v-for="mealType in beachCharacteristicsOptions"
                      :key="mealType"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="TO_beachCharacteristics"
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
                <label class="control-label col-sm-4">Beach Info</label>
                <div class="controls col-sm-8">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="TO_beachInformation.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in TO_beachInformation"
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
                      v-for="beachchar in beachInformationOptions"
                      :key="beachchar"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="TO_beachInformation"
                        @click.native.stop=""
                        :value="beachchar"
                        >{{ beachchar }}</b-form-checkbox
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
                <label class="control-label col-sm-4">Distance to beach</label>
                <div class="controls col-sm-8">
                  <input
                    type="number"
                    v-model="distanceToBeach"
                    class="form-control form-control-sm"
                    data-missing-msg="Required"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="control-label col-sm-4">Distance measure</label>
                <div class="controls col-sm-8">
                  <b-select
                    size="sm"
                    class="form-control form-control-sm"
                    :options="distanceTypes"
                    v-model="distanceToBeachUnit"
                  >
                    <option :value="null">Select measurment</option>
                    <!--                   <option value="KM">KM</option>
                  <option value="Mile">Mile</option>
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option> -->
                  </b-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="control-label col-sm-4">Distance to Airport</label>
                <div class="controls col-sm-8">
                  <input
                    type="number"
                    v-model="distanceToAirport"
                    class="form-control form-control-sm"
                    data-missing-msg="Required"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="control-label col-sm-4">Distance measure</label>
                <div class="controls col-sm-8">
                  <b-select
                    size="sm"
                    class="form-control form-control-sm"
                    :options="distanceTypes"
                    v-model="airportDistanceType"
                  >
                    <option :value="null">Select measurment</option>
                    <!--                   <option value="KM">KM</option>
                  <option value="Mile">Mile</option>
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option> -->
                  </b-select>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <!-- <div class="">
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">First Name</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="firstName"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Last Name</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="lastName"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Country</label>
                  <div class="controls col-sm-10">
                    <select class="form-control form-control-sm" v-model="country" required>
                      <option value="null">--Select Country--</option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Job title</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="title"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="control-label col-sm-2">Phone number</label>
                  <div class="controls col-sm-10">
                    <input
                      type="text"
                      v-model="phone"
                      class="form-control form-control-sm"
                      data-validate="true"
                      data-required="true"
                      data-missing-msg="Required"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row timezone">
                  <label class="control-label col-sm-2">Language</label>
                  <div class="controls col-sm-10">
                    <select class="form-control form-control-sm" v-model="language">
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="es">español</option>
                      <option value="pt">português</option>
                      <option value="fr">français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">italiano</option>
                      <option value="is">íslenska</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>

            <div class="form-actions" style="margin-bottom: 10px; margin-top: 10px">
              <button type="submit" class="btn btn-primary">
                Save <span v-if="isLoading" class="spinner-border"></span>
              </button>
              <router-link to="/" class="btn btn-default">Cancel</router-link>
            </div>
          </div> -->
        </b-col>
      </b-row>
      <div class="form-actions" style="margin-bottom: 10px; margin-top: 10px">
        <button type="submit" class="btn btn-primary">
          Save <span v-if="isLoading" class="spinner-border"></span>
        </button>
        <router-link to="/" class="btn btn-default">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      errors: [],
      TO_locationEnvironment: [],
      TO_beachCharacteristics: [],
      TO_beachInformation: [],
    };
  },
  computed: {
    locationEnvironmentOptions() {
      return this.$store.getters["options/getLocationEnvironment"];
    },
    beachCharacteristicsOptions() {
      return this.$store.getters["options/getBeachCharacteristics"];
    },
    distanceTypes() {
      return this.$store.getters["options/getDistanceTypes"];
    },
    beachInformationOptions() {
      return this.$store.getters["options/getBeachInformation"];
    },
  },
  methods: {
    async save() {
      if (this.isLoading) {
        return;
      }
      const overrideData = {
        TO_location_environment: this.TO_locationEnvironment || [],
      };
      await this.$store
        .dispatch("TOOverRide", overrideData)
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.property = this.$store.getters["mainInfo/getProperty"];
        });
    },
  },
};
</script>
