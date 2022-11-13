<template>
  <div class="container">
    <h4>Partner Hotel</h4>
    <p class="text-danger" v-if="errors.length > 0">
      <b>Please correct the following error(s):</b>
    </p>

    <ul>
      <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent @submit="save()">
      <div>
        <!-- main info -->
        <b-row>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm">Hotel Name</label>
              <div class="col">
                <input
                  v-model.trim="property.neighbourHotelName"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm"
                >Accommodation Type<span class="text-danger">*</span></label
              >
              <div class="col">
                <select
                  class="form-control form-control-sm"
                  v-model="property.neighbourAccommodationType"
                >
                  <option :value="null" selected>--Select Type--</option>
                  <option v-for="(a, index) in accommodationTypes" :key="index" :value="a">
                    {{ a }}
                  </option>
                </select>
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm"
                >Rating<span class="text-danger">*</span></label
              >
              <div class="col">
                <select class="form-control form-control-sm" v-model="property.neighbourRating">
                  <option :value="null" selected>--Select Rating--</option>
                  <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                  <option value="4.5">&#9733;&#9733;&#9733;&#9733;&#189;</option>
                  <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
                  <option value="3.5">&#9733;&#9733;&#9733;&#189;</option>
                  <option value="3">&#9733;&#9733;&#9733;</option>
                  <option value="2">&#9733;&#9733;</option>
                  <option value="1">&#9733;</option>
                </select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- address info-->
        <b-row>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm">connection</label>
              <div class="col">
                <select
                  class="form-control form-control-sm"
                  name="country"
                  v-model="property.neighbourConnectionType"
                  required
                >
                  <option :value="null" selected>--Select Type--</option>
                  <option v-for="(a, index) in partnerTypes" :key="index" :value="a">
                    {{ a }}
                  </option>
                </select>
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm"
                >Distance in meters <span class="text-danger">*</span></label
              >
              <div class="col">
                <input
                  v-model.trim="property.neighbourHotelDistance"
                  type="number"
                  class="form-control form-control-sm"
                  required
                />
              </div>
            </div>
          </b-col>
          <b-col>
            <b-form-checkbox size="sm" v-model="property.neighbourAdultOnly">
              Adults only Hotel
            </b-form-checkbox>
          </b-col>
        </b-row>
        <hr />
        <!-- shuttle info -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.neighbourShuttleAvailable">
              Hotel shuttle bus available
            </b-form-checkbox>
          </b-col>
          <b-col cols="9" v-if="property.neighbourShuttleAvailable">
            <b-row>
              <b-col cols="6">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label col-form-label-sm">
                    frequency<span class="text-danger">*</span></label
                  >
                  <div class="col">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.neighbourShuttleFrequency"
                      required
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="30 min">30 min</option>
                      <option value="1 hour">1 hour</option>
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                      <option value="x times a day">x times a day</option>
                      <option value="other">other</option>
                    </select>
                  </div>
                </div>
                <div v-if="property.neighbourShuttleFrequency === 'x times a day'">
                  <div class="form-group row">
                    <label class="col-sm-6 col-form-label col-form-label-sm"
                      >number of shuttles a day <span class="text-danger">*</span></label
                    >
                    <div class="col">
                      <input
                        class="form-control form-control-sm"
                        type="number"
                        v-model="property.neighbourShuttleFrequencyTimes"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-6 col-form-label col-form-label-sm"
                      >Every.... ? <span class="text-danger">*</span></label
                    >
                    <div class="col">
                      <input
                        class="form-control form-control-sm"
                        type="number"
                        v-model="property.neighbourShuttleFrequencyDuration"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div v-if="property.neighbourShuttleFrequency === 'other'">
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label col-form-label-sm"
                      >specify times seprated by comma (,) <span class="text-danger">*</span></label
                    >
                    <div class="col">
                      <input
                        class="form-control form-control-sm"
                        type="text"
                        v-model="property.neighbourShuttleFrequencyTimesOther"
                        placeholder="12:00, 14:00, 18:30"
                      />
                    </div>
                  </div>
                </div>
              </b-col>

              <b-col cols="6">
                <div class="form-group row">
                  <label class="col-sm-5 col-form-label col-form-label-sm"
                    >Charges <span class="text-danger">*</span></label
                  >
                  <div class="col">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.neighbourShuttleCharges"
                      required
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="Inclusive">Inclusive</option>
                      <option value="Additional Charge">Additional Charge</option>
                    </select>
                  </div>
                </div>
                <div v-if="property.neighbourShuttleCharges === 'Additional Charge'">
                  <div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm"
                      >charges per person <span class="text-danger">*</span></label
                    >
                    <div class="col">
                      <input
                        class="form-control form-control-sm"
                        type="number"
                        v-model="property.neighbourShuttlePrice"
                        placeholder="1.00"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-5 col-form-label col-form-label-sm"
                      >currency <span class="text-danger">*</span></label
                    >
                    <div class="col">
                      <select
                        class="form-control form-control-sm"
                        v-model="property.neighbourShuttlePriceCurrency"
                        required
                      >
                        <option :value="null" selected>Select currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col>
            <h5>Neighbour hotel facilities available</h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-tabs pills small horizontal>
              <b-tab title="Hotel ground">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox size="sm" v-model="property.neighbourUsingComplex">
                        Entire complex
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingComplex">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingComplexCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox size="sm" v-model="property.neighbourUsingOutdoors">
                        Outdoor facilities
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingOutdoors">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingOutdoorsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingGarden"
                      >
                        Garden
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingGarden">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingGardenCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingSunTerrace"
                      >
                        Sun terrace
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingSunTerrace">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingSunTerraceCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Bathing">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingWaterPark"
                      >
                        Water park
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingWaterPark">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingWaterParkCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingSwimmingPool"
                      >
                        Swimming pool
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingSwimmingPool">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingSwimmingPoolCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingBeach"
                      >
                        Beach
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBeach">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBeachCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingBeachClub"
                      >
                        Beach club
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBeachClub">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBeachClubCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Pool & Beach">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingPoolSunBeds"
                      >
                        Pool/beach sun beds
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingPoolSunBeds">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingPoolSunBedsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingPoolTowels"
                      >
                        Pool towels
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingPoolTowels">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingPoolTowelsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingPoolParasols"
                      >
                        Pool parasols
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingPoolParasols">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingPoolParasolsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingBeachSunBeds"
                      >
                        Beach sun beds
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBeachSunBeds">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBeachSunBedsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingBeachTowels"
                      >
                        Beach towels
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBeachTowels">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBeachTowelsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingBeachparasols"
                      >
                        Beach parasols
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBeachparasols">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBeachParasolsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Services">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingInternet"
                      >
                        internet corner/wifi
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingInternet">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingInternetCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingCarParking"
                      >
                        Car parking
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingCarParking">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingCarParkingCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingCasino"
                      >
                        Casino
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingCasino">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingCasinoCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingDisco"
                      >
                        Nightclub / Disco
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingDisco">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingDiscoCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingTerrace"
                      >
                        TV area / Terrace
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingTerrace">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingTerraceCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Bars - Restaurants">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingBars"
                      >
                        Bars
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBars">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingRestaurant"
                      >
                        Restaurants
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingRestaurant">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingRestaurantCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Sports">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingDiffSports"
                      >
                        various sports facilities
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingDiffSports">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingDiffSportsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingTennis"
                      >
                        tennis
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingTennis">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingTennisCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingBilliard"
                      >
                        billiard
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBilliard">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBilliardCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingGolf"
                      >
                        golf
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingGolf">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingGolfCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingTableTennis"
                      >
                        table tennis
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingTableTennis">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingTableTennisCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingFitnessCentre"
                      >
                        fitness centre
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingFitnessCentre">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingFitnessCetreCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingDiffSeaJets"
                      >
                        different sea jets/equipment
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingDiffSeaJets">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingDiffSeaJetsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingWaterSports"
                      >
                        water sports
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingWaterSports">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingWaterSportsCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingBikeRental"
                      >
                        bike rental
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBikeRental">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBikeRentalCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingVolleyBall"
                      >
                        volleyball
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingVolleyBall">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingVolleyBallCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Wellness">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingWellnessArea"
                      >
                        wellness area
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingWellnessArea">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingWellnessAreaCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingSpa"
                      >
                        spa
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingSpa">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingSpaCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingBeautyTreatment"
                      >
                        beauty treatment
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBeautyTreatment">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBeautyTreatmentCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingIndoorPool"
                      >
                        indoor pool
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingIndoorPool">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingIndoorPoolCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingWhirlPool"
                      >
                        whirlpool
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingWhirlPool">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingWhirlPoolCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingSteamBath"
                      >
                        steam bath
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingSteamBath">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingSteamBathCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingSauna"
                      >
                        sauna(s)
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingSauna">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingSaunaCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingSolarium"
                      >
                        solarium
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingSolarium">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingSolariumCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingTurkishBath"
                      >
                        turkish bath
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingTurkishBath">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingTurkishBathCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Children">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingDiffFacilityChildren"
                      >
                        various facilities for children
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingDiffFacilityChildren">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingDiffFacilityChildrenCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingChildrenPool"
                      >
                        children's pool
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingChildrenPool">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingChildrenPoolCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingChildrenAqua"
                      >
                        aquapark
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingChildrenAqua">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingChildrenAquaCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingChildrenAnimation"
                      >
                        children animation
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingChildrenAnimation">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingChildrenAnimationCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingBabySitter"
                      >
                        babysitter service
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingBabySitter">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingBabySitterCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingMiniClub"
                      >
                        mini club
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingMiniClub">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingMiniClubCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Full Board"
                        v-model="property.neighbourUsingPlayGround"
                      >
                        playground
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" v-if="property.neighbourUsingPlayGround">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label col-form-label-sm"
                          >Charges <span class="text-danger">*</span></label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.neighbourUsingPlayGroundCharges"
                            required
                          >
                            <option :value="null" selected>Select Option</option>
                            <option value="Inclusive">Inclusive</option>
                            <option value="Additional Charge">Additional Charge</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
              <b-tab title="Entertainment">
                <b-card>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="without board"
                        v-model="property.neighbourUsingEveningAnimation"
                      >
                        evening animation
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-checkbox
                        size="sm"
                        value="Bed and Breakfast"
                        v-model="property.neighbourUsingSportsAnimation"
                      >
                        sports animation
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-checkbox
                        size="sm"
                        value="Half Board"
                        v-model="property.neighbourUsingDayAnimation"
                      >
                        daytime animation
                      </b-form-checkbox>
                    </b-col>
                  </b-row>
                </b-card>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "PartnerHotelFactsComp",
  data() {
    return {
      isLoading: false,
      boxTwo: "",
      property: this.$store.getters["partnerHotelFactsComp/getProperty"],
      accommodationTypes: ["Resort", "Hotel", "Motel", "Villa", "Appartment"],
      partnerTypes: [
        "Sister hotel",
        "Neighbouring hotel",
        "Common grounds",
        "Chain Hotel connection",
      ],
      errors: [],
    };
  },
  computed: {
    cNeighbourUsingComplexCharges() {
      return this.property.neighbourUsingComplex
        ? this.property.neighbourUsingComplexCharges
        : null;
    },
    cNeighbourUsingOutdoorsCharges() {
      return this.property.neighbourUsingOutdoors
        ? this.property.neighbourUsingOutdoorsCharges
        : null;
    },
    cNeighbourUsingGardenCharges() {
      return this.property.neighbourUsingGarden ? this.property.neighbourUsingGardenCharges : null;
    },
    cNeighbourUsingSunTerraceCharges() {
      return this.property.neighbourUsingSunTerrace
        ? this.property.neighbourUsingSunTerraceCharges
        : null;
    },
    cNeighbourUsingWaterParkCharges() {
      return this.property.neighbourUsingWaterPark
        ? this.property.neighbourUsingWaterParkCharges
        : null;
    },
    cNeighbourUsingSwimmingPoolCharges() {
      return this.property.neighbourUsingSwimmingPool
        ? this.property.neighbourUsingSwimmingPoolCharges
        : null;
    },
    cNeighbourUsingBeachCharges() {
      return this.property.neighbourUsingBeach ? this.property.neighbourUsingBeachCharges : null;
    },
    cNeighbourUsingBeachClubCharges() {
      return this.property.neighbourUsingBeachClub
        ? this.property.neighbourUsingBeachClubCharges
        : null;
    },
    cNeighbourUsingPoolSunBedsCharges() {
      return this.property.neighbourUsingPoolSunBeds
        ? this.property.neighbourUsingPoolSunBedsCharges
        : null;
    },
    cNeighbourUsingPoolTowelsCharges() {
      return this.property.neighbourUsingPoolTowels
        ? this.property.neighbourUsingPoolTowelsCharges
        : null;
    },
    cNeighbourUsingPoolParasolsCharges() {
      return this.property.neighbourUsingPoolParasols
        ? this.property.neighbourUsingPoolParasolsCharges
        : null;
    },
    cNeighbourUsingBeachSunBedsCharges() {
      return this.property.neighbourUsingBeachSunBeds
        ? this.property.neighbourUsingBeachSunBedsCharges
        : null;
    },
    cNeighbourUsingBeachTowelsCharges() {
      return this.property.neighbourUsingBeachTowels
        ? this.property.neighbourUsingBeachTowelsCharges
        : null;
    },
    cNeighbourUsingBeachParasolsCharges() {
      return this.property.neighbourUsingBeachparasols
        ? this.property.neighbourUsingBeachParasolsCharges
        : null;
    },
    cNeighbourUsingInternetCharges() {
      return this.property.neighbourUsingInternet
        ? this.property.neighbourUsingInternetCharges
        : null;
    },
    cNeighbourUsingCarParkingCharges() {
      return this.property.neighbourUsingCarParking
        ? this.property.neighbourUsingCarParkingCharges
        : null;
    },
    cNeighbourUsingCasinoCharges() {
      return this.property.neighbourUsingCasino ? this.property.neighbourUsingCasinoCharges : null;
    },
    cNeighbourUsingDiscoCharges() {
      return this.property.neighbourUsingDisco ? this.property.neighbourUsingDiscoCharges : null;
    },
    cNeighbourUsingTerraceCharges() {
      return this.property.neighbourUsingTerrace
        ? this.property.neighbourUsingTerraceCharges
        : null;
    },
    cNeighbourUsingCharges() {
      return this.property.neighbourUsingBars ? this.property.neighbourUsingCharges : null;
    },
    cNeighbourUsingRestaurantCharges() {
      return this.property.neighbourUsingRestaurant
        ? this.property.neighbourUsingRestaurantCharges
        : null;
    },
    cNeighbourUsingDiffSportsCharges() {
      return this.property.neighbourUsingDiffSports
        ? this.property.neighbourUsingDiffSportsCharges
        : null;
    },
    cNeighbourUsingTennisCharges() {
      return this.property.neighbourUsingTennis ? this.property.neighbourUsingTennisCharges : null;
    },
    cNeighbourUsingBilliardCharges() {
      return this.property.neighbourUsingBilliard
        ? this.property.neighbourUsingBilliardCharges
        : null;
    },
    cNeighbourUsingGolfCharges() {
      return this.property.neighbourUsingGolf ? this.property.neighbourUsingGolfCharges : null;
    },
    cNeighbourUsingTableTennisCharges() {
      return this.property.neighbourUsingTableTennis
        ? this.property.neighbourUsingTableTennisCharges
        : null;
    },
    cNeighbourUsingFitnessCetreCharges() {
      return this.property.neighbourUsingFitnessCentre
        ? this.property.neighbourUsingFitnessCetreCharges
        : null;
    },
    cNeighbourUsingDiffSeaJetsCharges() {
      return this.property.neighbourUsingDiffSeaJets
        ? this.property.neighbourUsingDiffSeaJetsCharges
        : null;
    },
    cNeighbourUsingWaterSportsCharges() {
      return this.property.neighbourUsingWaterSports
        ? this.property.neighbourUsingWaterSportsCharges
        : null;
    },
    cNeighbourUsingBikeRentalCharges() {
      return this.property.neighbourUsingBikeRental
        ? this.property.neighbourUsingBikeRentalCharges
        : null;
    },
    cNeighbourUsingVolleyBallCharges() {
      return this.property.neighbourUsingVolleyBall
        ? this.property.neighbourUsingVolleyBallCharges
        : null;
    },
    cNeighbourUsingWellnessAreaCharges() {
      return this.property.neighbourUsingWellnessArea
        ? this.property.neighbourUsingWellnessAreaCharges
        : null;
    },
    cNeighbourUsingSpaCharges() {
      return this.property.neighbourUsingSpa ? this.property.neighbourUsingSpaCharges : null;
    },
    cNeighbourUsingBeautyTreatmentCharges() {
      return this.property.neighbourUsingBeautyTreatment
        ? this.property.neighbourUsingBeautyTreatmentCharges
        : null;
    },
    cNeighbourUsingIndoorPoolCharges() {
      return this.property.neighbourUsingIndoorPool
        ? this.property.neighbourUsingIndoorPoolCharges
        : null;
    },
    cNeighbourUsingWhirlPoolCharges() {
      return this.property.neighbourUsingWhirlPool
        ? this.property.neighbourUsingWhirlPoolCharges
        : null;
    },
    cNeighbourUsingSteamBathCharges() {
      return this.property.neighbourUsingSteamBath
        ? this.property.neighbourUsingSteamBathCharges
        : null;
    },
    cNeighbourUsingSaunaCharges() {
      return this.property.neighbourUsingSauna ? this.property.neighbourUsingSaunaCharges : null;
    },
    cNeighbourUsingSolariumCharges() {
      return this.property.neighbourUsingSolarium
        ? this.property.neighbourUsingSolariumCharges
        : null;
    },
    cNeighbourUsingTurkishBathCharges() {
      return this.property.neighbourUsingTurkishBath
        ? this.property.neighbourUsingTurkishBathCharges
        : null;
    },
    cNeighbourUsingDiffFacilityChildrenCharges() {
      return this.property.neighbourUsingDiffFacilityChildren
        ? this.property.neighbourUsingDiffFacilityChildrenCharges
        : null;
    },
    cNeighbourUsingChildrenPoolCharges() {
      return this.property.neighbourUsingChildrenPool
        ? this.property.neighbourUsingChildrenPoolCharges
        : null;
    },
    cNeighbourUsingChildrenAquaCharges() {
      return this.property.neighbourUsingChildrenAqua
        ? this.property.neighbourUsingChildrenAquaCharges
        : null;
    },
    cNeighbourUsingChildrenAnimationCharges() {
      return this.property.neighbourUsingChildrenAnimation
        ? this.property.neighbourUsingChildrenAnimationCharges
        : null;
    },
    cNeighbourUsingBabySitterCharges() {
      return this.property.neighbourUsingBabySitter
        ? this.property.neighbourUsingBabySitterCharges
        : null;
    },
    cNeighbourUsingMiniClubCharges() {
      return this.property.neighbourUsingMiniClub
        ? this.property.neighbourUsingMiniClubCharges
        : null;
    },
    cNeighbourUsingPlayGroundCharges() {
      return this.property.neighbourUsingPlayGround
        ? this.property.neighbourUsingPlayGroundCharges
        : null;
    },
  },
  created() {},
  methods: {
    getInfo() {
      const propertyId = this.$route.params.id;
      /* console.log("property id is", propertyId); */
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("partnerHotelFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["partnerHotelFactsComp/getProperty"];
          this.errors = this.$store.getters["partnerHotelFactsComp/getErrors"];
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
      const partnerToUpdate = {
        id: this.property.id,
        hotel: this.property.id || propertyId,
        connect_partner_hotel: this.connectPartnerHotel,
        neighbour_hotel_name: this.property.neighbourHotelName,
        neighbour_accommodation_type: this.property.neighbourAccommodationType,
        neighbour_rating: this.property.neighbourRating,
        neighbour_connection_type: this.property.neighbourConnectionType,
        neighbour_hotel_distance: this.property.neighbourHotelDistance,
        neighbour_shuttle_available: this.property.neighbourShuttleAvailable,
        neighbour_shuttle_frequency: this.property.neighbourShuttleFrequency,
        neighbour_shuttle_frequency_times: this.property.neighbourShuttleFrequencyTimes,
        neighbour_shuttle_frequency_duration: this.property.neighbourShuttleFrequencyDuration,
        neighbour_shuttle_frequency_times_other: this.property.neighbourShuttleFrequencyTimesOther,
        neighbour_shuttle_charges: this.property.neighbourShuttleCharges,
        neighbour_shuttle_price: this.property.neighbourShuttlePrice,
        neighbour_shuttle_price_currency: this.property.neighbourShuttlePriceCurrency,
        neighbour_adult_only: this.property.neighbourAdultOnly,
        neighbour_using_complex: this.property.neighbourUsingComplex,
        neighbour_using_complex_charges: this.cNeighbourUsingComplexCharges,
        neighbour_using_outdoors: this.property.neighbourUsingOutdoors,
        neighbour_using_outdoors_charges: this.cNeighbourUsingOutdoorsCharges,
        neighbour_using_garden: this.property.neighbourUsingGarden,
        neighbour_using_garden_charges: this.cNeighbourUsingGardenCharges,
        neighbour_using_sun_terrace: this.property.neighbourUsingSunTerrace,
        neighbour_using_sun_terrace_charges: this.cNeighbourUsingSunTerraceCharges,
        neighbour_using_water_park: this.property.neighbourUsingWaterPark,
        neighbour_using_water_park_charges: this.cNeighbourUsingWaterParkCharges,
        neighbour_using_swimming_pool: this.property.neighbourUsingSwimmingPool,
        neighbour_using_swimming_pool_charges: this.cNeighbourUsingSwimmingPoolCharges,
        neighbour_using_beach: this.property.neighbourUsingBeach,
        neighbour_using_beach_charges: this.cNeighbourUsingBeachCharges,
        neighbour_using_beach_club: this.property.neighbourUsingBeachClub,
        neighbour_using_beach_club_charges: this.cNeighbourUsingBeachClubCharges,
        neighbour_using_pool_sun_beds: this.property.neighbourUsingPoolSunBeds,
        neighbour_using_pool_sun_beds_charges: this.cNeighbourUsingPoolSunBedsCharges,
        neighbour_using_pool_towels: this.property.neighbourUsingPoolTowels,
        neighbour_using_pool_towels_charges: this.cNeighbourUsingPoolTowelsCharges,
        neighbour_using_pool_parasols: this.property.neighbourUsingPoolParasols,
        neighbour_using_pool_parasols_charges: this.cNeighbourUsingPoolParasolsCharges,
        neighbour_using_beach_sun_beds: this.property.neighbourUsingBeachSunBeds,
        neighbour_using_beach_sun_beds_charges: this.cNeighbourUsingBeachSunBedsCharges,
        neighbour_using_beach_towels: this.property.neighbourUsingBeachTowels,
        neighbour_using_beach_towels_charges: this.cNeighbourUsingBeachTowelsCharges,
        neighbour_using_beachparasols: this.property.neighbourUsingBeachparasols,
        neighbour_using_beach_parasols_charges: this.cNeighbourUsingBeachParasolsCharges,
        neighbour_using_internet: this.property.neighbourUsingInternet,
        neighbour_using_internet_charges: this.cNeighbourUsingInternetCharges,
        neighbour_using_car_parking: this.property.neighbourUsingCarParking,
        neighbour_using_car_parking_charges: this.cNeighbourUsingCarParkingCharges,
        neighbour_using_casino: this.property.neighbourUsingCasino,
        neighbour_using_casino_charges: this.cNeighbourUsingCasinoCharges,
        neighbour_using_disco: this.property.neighbourUsingDisco,
        neighbour_using_disco_charges: this.cNeighbourUsingDiscoCharges,
        neighbour_using_terrace: this.property.neighbourUsingTerrace,
        neighbour_using_terrace_charges: this.cNeighbourUsingTerraceCharges,
        neighbour_using_bars: this.property.neighbourUsingBars,
        neighbour_using_charges: this.cNeighbourUsingCharges,
        neighbour_using_restaurant: this.property.neighbourUsingRestaurant,
        neighbour_using_restaurant_charges: this.cNeighbourUsingRestaurantCharges,
        neighbour_using_diff_sports: this.property.neighbourUsingDiffSports,
        neighbour_using_diff_sports_charges: this.cNeighbourUsingDiffSportsCharges,
        neighbour_using_tennis: this.property.neighbourUsingTennis,
        neighbour_using_tennis_charges: this.cNeighbourUsingTennisCharges,
        neighbour_using_billiard: this.property.neighbourUsingBilliard,
        neighbour_using_billiard_charges: this.cNeighbourUsingBilliardCharges,
        neighbour_using_golf: this.property.neighbourUsingGolf,
        neighbour_using_golf_charges: this.cNeighbourUsingGolfCharges,
        neighbour_using_table_tennis: this.property.neighbourUsingTableTennis,
        neighbour_using_table_tennis_charges: this.cNeighbourUsingTableTennisCharges,
        neighbour_using_fitness_centre: this.property.neighbourUsingFitnessCentre,
        neighbour_using_fitness_cetre_charges: this.cNeighbourUsingFitnessCetreCharges,
        neighbour_using_diff_sea_jets: this.property.neighbourUsingDiffSeaJets,
        neighbour_using_diff_sea_jets_charges: this.cNeighbourUsingDiffSeaJetsCharges,
        neighbour_using_water_sports: this.property.neighbourUsingWaterSports,
        neighbour_using_water_sports_charges: this.cNeighbourUsingWaterSportsCharges,
        neighbour_using_bike_rental: this.property.neighbourUsingBikeRental,
        neighbour_using_bike_rental_charges: this.cNeighbourUsingBikeRentalCharges,
        neighbour_using_volley_ball: this.property.neighbourUsingVolleyBall,
        neighbour_using_volley_ball_charges: this.cNeighbourUsingVolleyBallCharges,
        neighbour_using_wellness_area: this.property.neighbourUsingWellnessArea,
        neighbour_using_wellness_area_charges: this.cNeighbourUsingWellnessAreaCharges,
        neighbour_using_spa: this.property.neighbourUsingSpa,
        neighbour_using_spa_charges: this.cNeighbourUsingSpaCharges,
        neighbour_using_beauty_treatment: this.property.neighbourUsingBeautyTreatment,
        neighbour_using_beauty_treatment_charges: this.cNeighbourUsingBeautyTreatmentCharges,
        neighbour_using_indoor_pool: this.property.neighbourUsingIndoorPool,
        neighbour_using_indoor_pool_charges: this.cNeighbourUsingIndoorPoolCharges,
        neighbour_using_whirl_pool: this.property.neighbourUsingWhirlPool,
        neighbour_using_whirl_pool_charges: this.cNeighbourUsingWhirlPoolCharges,
        neighbour_using_steam_bath: this.property.neighbourUsingSteamBath,
        neighbour_using_steam_bath_charges: this.cNeighbourUsingSteamBathCharges,
        neighbour_using_sauna: this.property.neighbourUsingSauna,
        neighbour_using_sauna_charges: this.cNeighbourUsingSaunaCharges,
        neighbour_using_solarium: this.property.neighbourUsingSolarium,
        neighbour_using_solarium_charges: this.cNeighbourUsingSolariumCharges,
        neighbour_using_turkish_bath: this.property.neighbourUsingTurkishBath,
        neighbour_using_turkish_bath_charges: this.cNeighbourUsingTurkishBathCharges,
        neighbour_using_diff_facility_children: this.property.neighbourUsingDiffFacilityChildren,
        neighbour_using_diff_facility_children_charges:
          this.cNeighbourUsingDiffFacilityChildrenCharges,
        neighbour_using_children_pool: this.property.neighbourUsingChildrenPool,
        neighbour_using_children_pool_charges: this.cNeighbourUsingChildrenPoolCharges,
        neighbour_using_children_aqua: this.property.neighbourUsingChildrenAqua,
        neighbour_using_children_aqua_charges: this.cNeighbourUsingChildrenAquaCharges,
        neighbour_using_children_animation: this.property.neighbourUsingChildrenAnimation,
        neighbour_using_children_animation_charges: this.cNeighbourUsingChildrenAnimationCharges,
        neighbour_using_baby_sitter: this.property.neighbourUsingBabySitter,
        neighbour_using_baby_sitter_charges: this.cNeighbourUsingBabySitterCharges,
        neighbour_using_mini_club: this.property.neighbourUsingMiniClub,
        neighbour_using_mini_club_charges: this.cNeighbourUsingMiniClubCharges,
        neighbour_using_play_ground: this.property.neighbourUsingPlayGround,
        neighbour_using_play_ground_charges: this.cNeighbourUsingPlayGroundCharges,

        neighbour_using_evening_animation: this.property.neighbourUsingEveningAnimation,
        neighbour_using_sports_animation: this.property.neighbourUsingSportsAnimation,
        neighbour_using_day_animation: this.property.neighbourUsingDayAnimation,
      };
      await this.$store
        .dispatch("partnerHotelFactsComp/postInfo", partnerToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.isLoading = false;
          this.property = this.$store.getters["partnerHotelFactsComp/getProperty"];
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
      if (this.property.neighbourAccommodationType === null) {
        newValidations.push("Accommodation type required");
      }
      if (!this.property.neighbourRating) {
        newValidations.push("Star rating required.");
      }
      if (this.property.neighbourConnectionType === null) {
        newValidations.push("Connection type required");
      }
      this.$store.dispatch("partnerHotelFactsComp/validate", newValidations);
      this.errors = this.$store.getters["partnerHotelFactsComp/getErrors"];
      /* console.log(this.errors); */
    },
  },
};
</script>
