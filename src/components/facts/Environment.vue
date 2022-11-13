<template>
  <div class="container">
    <form v-on:submit.prevent @submit="save()">
      <div class="justify-content-start input-group-sm">
        <h4>Location & Environment:</h4>
        <!-- Location -->
        <p class="text-danger" v-if="errors.length > 0">
          <b>Please correct the following error(s):</b>
        </p>

        <ul>
          <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
            {{ error }}
          </li>
        </ul>

        <b-row>
          <b-col cols="6">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm"
                >Location Environment Type</label
              >
              <div class="col">
                <b-dropdown
                  size="sm"
                  boundary="viewport"
                  variant="outline-dark"
                  :text="property.locationEnvironment.length + ' Selected options'"
                  class="m-md-2"
                  style="max-width: 350px !important; font-weight: 600"
                >
                  <b-card class="bcardmultidrop">
                    <div>
                      <b-badge
                        class="multidropbadge"
                        v-for="item in property.locationEnvironment"
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
                      v-model="property.locationEnvironment"
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
          <b-col cols="6">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Around Hotel</label>
              <div class="col">
                <b-dropdown
                  size="sm"
                  boundary="viewport"
                  variant="outline-dark"
                  :text="property.aroundHotel.length + ' Selected options'"
                  class="m-md-2"
                  style="max-width: 350px !important; font-weight: 600"
                >
                  <b-card class="bcardmultidrop">
                    <div>
                      <b-badge
                        class="multidropbadge"
                        v-for="item in property.aroundHotel"
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
                    v-for="mealType in aroundHotelOptions"
                    :key="mealType"
                    @click.native.capture.stop
                  >
                    <b-form-checkbox
                      v-model="property.aroundHotel"
                      @click.native.stop=""
                      :value="mealType"
                      >{{ mealType }}</b-form-checkbox
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div></b-col
          >
        </b-row>
        <hr />
        <!-- Beach section -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.beachAvail"> Beach Available</b-form-checkbox>
          </b-col>
        </b-row>
        <br />
        <b-row v-if="property.beachAvail">
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Beach characteristics</label>
              <div class="col">
                <b-dropdown
                  size="sm"
                  boundary="viewport"
                  variant="outline-dark"
                  :text="property.beachCharacteristics.length + ' Selected options'"
                  class="m-md-2"
                  style="max-width: 350px !important; font-weight: 600"
                >
                  <b-card class="bcardmultidrop">
                    <div>
                      <b-badge
                        class="multidropbadge"
                        v-for="item in property.beachCharacteristics"
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
                      v-model="property.beachCharacteristics"
                      @click.native.stop=""
                      :value="mealType"
                      >{{ mealType }}</b-form-checkbox
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm"
                >Additional characteristics</label
              >
              <div class="col">
                <b-dropdown
                  size="sm"
                  boundary="viewport"
                  variant="outline-dark"
                  :text="property.moreBeachInfo.length + ' Selected options'"
                  class="m-md-2"
                  style="max-width: 350px !important; font-weight: 600"
                >
                  <b-card class="bcardmultidrop">
                    <div>
                      <b-badge
                        class="multidropbadge"
                        v-for="item in property.moreBeachInfo"
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
                    v-for="mealType in moreBeachInfoOptions"
                    :key="mealType"
                    @click.native.capture.stop
                  >
                    <b-form-checkbox
                      v-model="property.moreBeachInfo"
                      @click.native.stop=""
                      :value="mealType"
                      >{{ mealType }}</b-form-checkbox
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Beach info</label>
              <div class="col">
                <b-dropdown
                  size="sm"
                  boundary="viewport"
                  variant="outline-dark"
                  :text="property.beachInformation.length + ' Selected options'"
                  class="m-md-2"
                  style="max-width: 350px !important; font-weight: 600"
                >
                  <b-card class="bcardmultidrop">
                    <div>
                      <b-badge
                        class="multidropbadge"
                        v-for="item in property.beachInformation"
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
                    v-for="beachInfo in beachInformationOptions"
                    :key="beachInfo"
                    @click.native.capture.stop
                  >
                    <b-form-checkbox
                      v-model="property.beachInformation"
                      @click.native.stop=""
                      :value="beachInfo"
                      >{{ beachInfo }}</b-form-checkbox
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Beach Path/Access</label>
              <div class="col">
                <b-dropdown
                  size="sm"
                  boundary="viewport"
                  variant="outline-dark"
                  :text="property.beachPathType.length + ' Selected options'"
                  class="m-md-2"
                  style="max-width: 350px !important; font-weight: 600"
                >
                  <b-card class="bcardmultidrop">
                    <div>
                      <b-badge
                        class="multidropbadge"
                        v-for="item in property.beachPathType"
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
                    v-for="PathType in beachPathTypeOptions"
                    :key="PathType"
                    @click.native.capture.stop
                  >
                    <b-form-checkbox
                      v-model="property.beachPathType"
                      @click.native.stop=""
                      :value="PathType"
                      >{{ PathType }}</b-form-checkbox
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance to beach</label>
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  v-model="property.distanceToBeach"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  size="sm"
                  class="form-control form-control-sm"
                  :options="distanceTypes"
                  v-model="property.distanceToBeachUnit"
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
          <b-col cols="3">
            <b-form-checkbox v-model="property.beachIsPrivate">Private Beach</b-form-checkbox>
            <b-form-checkbox v-model="property.beachIsNude">Nude Beach</b-form-checkbox>
          </b-col>
        </b-row>
        <!-- Beach end -->
        <hr />
        <!-- Airport -->
        <b-row>
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm ananas-bold"
                >Closest Airport
                <span class="text-danger">*</span>
              </label>
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.closestAirport"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  v-model="property.distanceToAirport"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  size="sm"
                  class="form-control form-control-sm"
                  :options="distanceTypes"
                  v-model="property.airportDistanceType"
                >
                  <option :value="null">Select measurment</option>
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- Trains -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.trainAvailable">Train Availability</b-form-checkbox>
          </b-col>
        </b-row>
        <b-row v-if="property.trainAvailable">
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Station name</label>
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.trainStationName"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  v-model="property.distanceToTrain"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  size="sm"
                  :options="distanceTypes"
                  class="form-control form-control-sm"
                  v-model="property.trainDistanceUnit"
                >
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- distance to facilities outside the hotel -->
        <b-row>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">To shopping area</label>
            </div></b-col
          >
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="1"
                  v-model="property.distanceToShopping"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  class="form-control form-control-sm"
                  v-model="property.distanceToShoppingUnit"
                  size="sm"
                  :options="distanceTypes"
                >
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">To entertainment options</label>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="1"
                  v-model="property.distanceToEntertainment"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  class="form-control form-control-sm"
                  v-model="property.distanceToEntertainmentUnit"
                  size="sm"
                  :options="distanceTypes"
                >
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">To restaurants & bars</label>
            </div></b-col
          >
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="1"
                  v-model="property.distanceToRestaurants"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  class="form-control form-control-sm"
                  v-model="property.distanceToRestaurantsUnit"
                  size="sm"
                  :options="distanceTypes"
                >
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">To city center</label>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="1"
                  v-model="property.distanceToCityCenter"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  class="form-control form-control-sm"
                  v-model="property.distanceToCityCenterUnit"
                  size="sm"
                  :options="distanceTypes"
                >
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">To bus stop</label>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="1"
                  v-model="property.distanceToBusStop"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm">Distance measure</label>
              <div class="col-sm-6">
                <b-select
                  class="form-control form-control-sm"
                  v-model="property.distanceToBusStopUnit"
                  size="sm"
                  :options="distanceTypes"
                >
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- local transfer section -->
        <b-row>
          <h5>Local transportation to hotel</h5>
        </b-row>
        <br />
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.domesticFlightAvail">
              domestic flight
            </b-form-checkbox>
          </b-col>
          <b-col cols="5" v-if="property.domesticFlightAvail">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm"
                >duration in minutes (approx.)</label
              >
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  v-model="property.domesticFlightDuration"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4" v-if="property.domesticFlightAvail">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">supplier</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.domesticFlightSupplier"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.speedBoatAvail">speed boat</b-form-checkbox>
          </b-col>
          <b-col cols="5" v-if="property.speedBoatAvail">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm"
                >duration in minutes (approx.)</label
              >
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  v-model="property.speedBoatDuration"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4" v-if="property.speedBoatAvail">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">supplier</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.speedBoatSupplier"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.seaPlaneAvail">seaplane</b-form-checkbox>
          </b-col>
          <b-col cols="5" v-if="property.seaPlaneAvail">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm"
                >duration in minutes (approx.)</label
              >
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  v-model="property.seaPlaneDuration"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4" v-if="property.seaPlaneAvail">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">supplier</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.seaPlaneSupplier"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.otherDomesticTrans">Other</b-form-checkbox>
          </b-col>
        </b-row>
        <br />
        <b-row v-if="property.otherDomesticTrans">
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">Type of transfer</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.otherDomesticTransName"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm"
                >duration in minutes (approx.)</label
              >
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="1"
                  v-model="property.otherDomesticTransDuration"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">supplier</label>
              <div class="col-sm">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.otherDomesticTransSupplier"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EnvironmentFactsComp",
  data() {
    return {
      isLoading: false,
      errors: [],
      property: {},
    };
  },
  created() {},
  computed: {
    locationEnvironmentOptions() {
      return this.$store.getters["options/getLocationEnvironment"];
    },
    aroundHotelOptions() {
      return this.$store.getters["options/getAroundHotel"];
    },
    beachCharacteristicsOptions() {
      return this.$store.getters["options/getBeachCharacteristics"];
    },
    moreBeachInfoOptions() {
      return this.$store.getters["options/getMoreBeachInfo"];
    },
    beachInformationOptions() {
      return this.$store.getters["options/getBeachInformation"];
    },
    beachPathTypeOptions() {
      return this.$store.getters["options/getBeachPathType"];
    },
    distanceTypes() {
      return this.$store.getters["options/getDistanceTypes"];
    },
    cBeachCharacteristics() {
      return this.property.beachAvail ? this.property.beachCharacteristics : [];
    },
    cDistanceToBeach() {
      return this.property.beachAvail ? this.property.distanceToBeach : null;
    },
    cDistanceToBeachUnit() {
      return this.property.beachAvail ? this.property.distanceToBeachUnit : null;
    },
    cBeachInformation() {
      return this.property.beachAvail ? this.property.beachInformation : [];
    },
    cBeachPathType() {
      return this.property.beachAvail ? this.property.beachPathType : [];
    },
    cMoreBeachInfo() {
      return this.property.beachAvail ? this.property.moreBeachInfo : [];
    },
    cBeachIsPrivate() {
      return this.property.beachAvail ? this.property.beachIsPrivate : false;
    },
    cBeachIsNude() {
      return this.property.beachAvail ? this.property.beachIsNude : false;
    },
    cTrainStationName() {
      return this.property.trainAvailable ? this.property.trainStationName : null;
    },
    cDistanceToTrain() {
      return this.property.trainAvailable ? this.property.distanceToTrain : null;
    },
    cTrainDistanceUnit() {
      return this.property.trainAvailable ? this.property.trainDistanceUnit : null;
    },
    cDomesticFlightDuration() {
      return this.property.domesticFlightAvail ? this.property.domesticFlightDuration : null;
    },
    cDomesticFlightSupplier() {
      return this.property.domesticFlightAvail ? this.property.domesticFlightSupplier : null;
    },
  },
  components: {},
  methods: {
    getInfo() {
      const propertyId = this.$route.params.id;
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("environmentFactsComp/getInfo", propertyId)
        .then(() => {
          this.property = this.$store.getters["environmentFactsComp/getProperty"];
          this.errors = this.$store.getters["environmentFactsComp/getErrors"] || [];
          this.$store.dispatch("view/load", false);
        })
        .catch(() => {
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
      const infoToUpdate = {
        id: this.property.id,
        hotel: this.property.id || propertyId,
        location_environment: this.property.locationEnvironment || [],
        around_hotel: this.property.aroundHotel || [],
        closest_airport: this.property.closestAirport,
        distance_to_airport: this.property.distanceToAirport,
        airport_distance_type: this.property.airportDistanceType,
        train_available: this.property.trainAvailable,
        train_station_name: this.cTrainStationName,
        distance_to_train: this.cDistanceToTrain,
        train_distance_unit: this.cTrainDistanceUnit,
        distance_to_shopping: this.property.distanceToShopping,
        distance_to_shopping_unit: this.property.distanceToShoppingUnit,
        distance_to_entertainment: this.property.distanceToEntertainment,
        distance_to_entertainment_unit: this.property.distanceToEntertainmentUnit,
        distance_to_restaurants: this.property.distanceToRestaurants,
        distance_to_restaurants_unit: this.property.distanceToRestaurantsUnit,
        distance_to_city_center: this.property.distanceToCityCenter,
        distance_to_city_center_unit: this.property.distanceToCityCenterUnit,
        distance_to_bus_stop: this.property.distanceToBusStop,
        distance_to_bus_stop_unit: this.property.distanceToBusStopUnit,
        domestic_flight_available: this.property.domesticFlightAvail,
        domestic_flight_duration: this.cDomesticFlightDuration,
        domestic_flight_supplier: this.cDomesticFlightSupplier,
        speed_boat_avail: this.property.speedBoatAvail,
        speed_boat_duration: this.property.speedBoatDuration,
        speed_boat_supplier: this.property.speedBoatSupplier,
        sea_plane_avail: this.property.seaPlaneAvail,
        sea_plane_duration: this.property.seaPlaneDuration,
        sea_plane_supplier: this.property.seaPlaneSupplier,
        other_domestic_trans: this.property.otherDomesticTrans,
        other_domestic_trans_name: this.property.otherDomesticTransName,
        other_domestic_trans_duration: this.property.otherDomesticTransDuration,
        other_domestic_trans_supplier: this.property.otherDomesticTransSupplier,
        beach_avail: this.property.beachAvail,
        beach_characteristics: this.cBeachCharacteristics,
        distance_to_beach: this.cDistanceToBeach,
        distance_to_beach_unit: this.cDistanceToBeachUnit,
        beach_information: this.cBeachInformation,
        beach_path_type: this.cBeachPathType,
        more_beach_info: this.cMoreBeachInfo,
        beach_is_private: this.cBeachIsPrivate,
        beach_is_nude: this.cBeachIsNude,
      };
      await this.$store
        .dispatch("environmentFactsComp/postInfo", infoToUpdate)
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.property = this.$store.getters["mainInfo/getProperty"];
        });
    },
    validate() {
      const newValidations = [];
      if (!this.property.closestAirport) {
        newValidations.push("Closest airport to hotel required.");
      }
      if (this.property.distanceToAirport && !this.property.airportDistanceType) {
        newValidations.push("Distance type to airport required.");
      }
      if (this.property.distanceToTrain && !this.property.trainDistanceUnit) {
        newValidations.push("Distance type to train station required.");
      }
      if (this.property.beachAvail && !this.property.distanceToBeach) {
        newValidations.push("Distance to beach required.");
      }
      if (this.property.distanceToBeach && !this.property.distanceToBeachUnit) {
        newValidations.push("Distance type to beach required.");
      }
      if (this.property.distanceToShopping && !this.property.distanceToShoppingUnit) {
        newValidations.push("Distance type to shopping area required.");
      }
      if (this.property.distanceToEntertainment && !this.property.distanceToEntertainmentUnit) {
        newValidations.push("Distance type to entertainment options required.");
      }
      if (this.property.distanceToRestaurants && !this.property.distanceToRestaurantsUnit) {
        newValidations.push("Distance type to restaurants & bars required.");
      }
      if (this.property.distanceToCityCenter && !this.property.distanceToCityCenterUnit) {
        newValidations.push("Distance type to city center required.");
      }
      if (this.property.distanceToBusStop && !this.property.distanceToBusStopUnit) {
        newValidations.push("Distance type to bus stop required.");
      }
      this.$store.dispatch("environmentFactsComp/validate", newValidations);
      this.errors = this.$store.getters["environmentFactsComp/getErrors"] || [];
    },
  },
};
</script>
