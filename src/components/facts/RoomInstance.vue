<template>
  <div>
    <span
      class="text-right"
      style="float: right"
      type="button"
      title="delete this room"
      @click="deleteRoom()"
    >
      <b-icon icon="trash" variant="danger" scale="1.5"></b-icon>
    </span>
    <b-tab :title="tabName" :title-link-class="linkClass()" @click="activate()">
      <!-- this is column of the data inside the horizontal tab -->
      <!-- this is the begining of rooms facts -->

      <div>
        <b-tabs pills card vertical small style="width: 100%; padding: 0px">
          <b-tab title="General" active>
            <h5>Room Name and information</h5>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Room Name<span class="text-danger">*</span></label
              >
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.roomName"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Room name/type<span class="text-danger">*</span></label
              >
              <div class="col-sm-6">
                <select class="form-control form-control-sm" v-model="property.roomNameType">
                  <option :value="null" selected>Select Option</option>
                  <option v-for="type in roomTypes" :key="type">
                    {{ type }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >View - type<span class="text-danger"> *</span></label
              >
              <div class="col-sm-6">
                <select class="form-control form-control-sm" v-model="property.roomView">
                  <option :value="null" selected>Select Option</option>
                  <option v-for="(a, index) in viewsOptions" :key="index" :value="a">
                    {{ a }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm">Number of units</label>
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  min="0"
                  v-model="property.roomTotalUnits"
                />
              </div>
            </div>
            <hr />
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Unit sequence
                <b-icon
                  icon="question-circle-fill"
                  scale="0.8"
                  variant="primary"
                  aria-label="Help"
                  title="The order of room display in facts sheet"
                ></b-icon
              ></label>
              <div class="col-sm-3">
                <select class="form-control form-control-sm" v-model="property.roomSequence">
                  <option :value="null" selected>select number</option>
                  <option v-for="n in 24" :key="n" :value="n">
                    {{ n }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm">Storey(floor)</label>
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  min="0"
                  v-model="property.roomStoreyLevel"
                />
              </div>
              <div>
                <b-form-checkbox v-model="property.roomOnGroundFloor">
                  On the ground floor
                </b-form-checkbox>
              </div>
            </div>
            <hr />
            <!-- first col -->
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Override Code
                <b-icon
                  icon="question-circle-fill"
                  scale="0.8"
                  variant="primary"
                  aria-label="Help"
                  title="A Room + View type code will be generated based selection above, Override that code based on Hotel"
                ></b-icon>
              </label>
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.roomOverrideCode"
                />
              </div>
            </div>
            <!-- second col -->
            <hr />
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Additional - Optional View</label
              >
              <div class="col-sm-6">
                <select class="form-control form-control-sm" v-model="property.roomAdditionalView">
                  <option :value="null" selected>Select Option</option>
                  <option v-for="(a, index) in viewsOptions" :key="index" :value="a">
                    {{ a }}
                  </option>
                </select>
              </div>
            </div>
          </b-tab>
          <b-tab title="Feature">
            <h5>Room features and characteristics</h5>
            <div class="col-pine-1">
              <fieldset class="">
                <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox
                    v-model="property.roomFeatures"
                    v-for="option in roomFeaturesOptions"
                    :key="option"
                    :value="option"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-3a"
                    stacked
                  >
                    {{ option }}
                  </b-form-checkbox>
                </b-form-group>
              </fieldset>
            </div>
          </b-tab>
          <b-tab title="Size & Occupancy">
            <h5>Room Size and Occupancy:</h5>
            <b-row>
              <b-col cols="6">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm">Room size sq.m</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.roomSizeSqm"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >room size - comparison
                  </label>
                  <div class="col">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.roomSizeComparison"
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="as big as">as big as</option>
                      <option value="bigger than">bigger than</option>
                      <option value="roomier than">roomier than</option>
                      <option value="smaller than">smaller than</option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col cols="">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >comparison to which room</label
                  >
                  <div class="col">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.roomSizeComparisonWith"
                    >
                      <option :value="null">Select Option</option>
                      <option v-for="type in roomTypes" :key="type">
                        {{ type }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-form-checkbox size="sm" v-model="property.roomAvailableSingleUse">
                  Available for Single Use
                  <b-icon
                    icon="question-circle-fill"
                    scale="0.8"
                    variant="primary"
                    aria-label="Help"
                    title="Generates another code for the room as single"
                  ></b-icon>
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.roomInfantsNotAllowed">
                  Infants not allowed
                </b-form-checkbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >Room min age required</label
                  >
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.roomMinAge"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" v-if="!property.roomInfantsNotAllowed">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >Max Infants allowed</label
                  >
                  <div class="col">
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      class="form-control form-control-sm"
                      v-model="property.roomAllowedInfantsCount"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
            <h6>Room occupancy :</h6>
            <b-row>
              <b-col>
                <div v-for="a in 6" :key="a">
                  <div v-for="c in 6" :key="c">
                    <b-form-checkbox
                      size="sm"
                      v-model="property.roomOccupancies"
                      :value="`${a}+${c - 1}`"
                      >{{ `${a}+${c - 1}` }}
                    </b-form-checkbox>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div>
                  <div v-for="a in 6" :key="a">
                    <div v-for="c in 6" :key="c">
                      <b-form-checkbox
                        size="sm"
                        :value="`${a + 4}+${c - 1}`"
                        v-model="property.roomOccupancies"
                        >{{ a + 4 }}+{{ c - 1 }}
                      </b-form-checkbox>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
            <span>Occupancies available in room: {{ property.roomOccupancies }}</span>
          </b-tab>
          <b-tab title="Location">
            <h5>Room available in these locations</h5>
            <b-row>
              <b-col cols="6">
                <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox
                    v-model="property.roomLocations"
                    small
                    v-for="option in roomLocationsOptions"
                    :key="option"
                    :value="option"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-3a"
                    stacked
                  >
                    {{ option }}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Access">
            <h5>Room have direct access to</h5>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox
                    v-model="property.roomAccessTo"
                    v-for="option in roomAccessToOptions"
                    :key="option"
                    :value="option"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-3a"
                    stacked
                  >
                    {{ option }}
                  </b-form-checkbox>
                </b-form-group>
                <span> {{ property.roomAccessTo }} </span>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Bathroom">
            <h5>Room's bathroom and shower(s):</h5>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm">Number of bathroom(s)</label>
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  min="0"
                  v-model="property.roomNumberOfBathrooms"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm">Bathroom type:</label>

              <div class="col-sm-5">
                <select class="form-control form-control-sm" v-model="property.roomBathroomType">
                  <option :value="null" selected>Select Option</option>
                  <option value="bath or shower / Toilet">Shower & Toilet</option>
                  <option value="Bath and shower / Toilet">Shower or Bath & Toilet</option>
                  <option value="bath / Toilet">Shower & Bath & Toilet</option>
                  <option value="shared shower in the corridor">
                    shared shower in the corridor
                  </option>
                  <option value="shower / toilet">shower / toilet</option>
                  <option value="shared shower / toilet in the corridor">
                    shared shower / toilet in the corridor
                  </option>
                  <option value="shared bath">shared bath</option>
                  <option value="in suite toilet">in suite toilet</option>
                  <option value="communal facility">communal facility</option>
                  <option value="private bath or shower / toilet outside">
                    private bath or shower / toilet outside
                  </option>
                  <option value="bath with integrated shower / toilet">
                    bath with integrated shower / toilet
                  </option>
                </select>
              </div>
            </div>
            <hr />
            <h5>Special features</h5>
            <hr style="width: 25%; margin: 0px" />
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox
                v-model="property.roomBathroomFeature"
                v-for="option in roomBathroomFeatureOptions"
                :key="option"
                :value="option"
                :aria-describedby="ariaDescribedby"
                name="flavour-3a"
                stacked
              >
                {{ option }}
              </b-form-checkbox>
            </b-form-group>
          </b-tab>
          <b-tab title="Facilities">
            <!-- Nav tabs -->
            <b-tabs pills card horizontal>
              <b-tab title="Multimedia" active>
                <b-row>
                  <b-col cols="12">
                    <b-form-group
                      label="Choose all applicable options"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-checkbox
                        v-model="property.roomFacilityMultimedia"
                        v-for="option in roomFacilityMultimediaOptions"
                        :key="option"
                        :value="option"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-3a"
                        stacked
                      >
                        {{ option }}
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Equipment">
                <div class="col-pine-2">
                  <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox
                      v-model="property.roomFacilityEquipment"
                      v-for="option in roomFacilityEquipOptions"
                      :key="option"
                      :value="option"
                      :aria-describedby="ariaDescribedby"
                      name="flavour-3a"
                      stacked
                    >
                      {{ option }}
                    </b-form-checkbox>
                  </b-form-group>
                </div>
              </b-tab>
              <b-tab title="Amenities">
                <div class="col-pine-2">
                  <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox
                      v-model="property.roomFacilityAmenity"
                      v-for="option in roomFacilityAmenityOptions"
                      :key="option"
                      :value="option"
                      :aria-describedby="ariaDescribedby"
                      name="flavour-3a"
                      stacked
                    >
                      {{ option }}
                    </b-form-checkbox>
                  </b-form-group>
                </div>
              </b-tab>
              <b-tab title="Balcony/Terrace">
                <div class="col-pine-1">
                  <b-row>
                    <b-col>
                      <div class="form-group row">
                        <label class="col-sm-4 col-form-label col-form-label-sm"
                          >Balcony/Terrace facilities</label
                        >
                        <div class="col">
                          <select
                            class="form-control form-control-sm"
                            v-model="property.roomBalconyType"
                          >
                            <option :value="null" selected>Balcony/Terrace type</option>
                            <option value="2 balconies">2 balconies</option>
                            <option value="balcony">balcony</option>
                            <option value="balcony or terrace">balcony or terrace</option>
                            <option value="balcony and terrace">balcony and terrace</option>
                            <option value="french balcony">french balcony</option>
                            <option value="without balcony or terrace">
                              without balcony or terrace
                            </option>
                            <option value="sometimes balcony">sometimes balcony</option>
                            <option value="balcony or terrace in parts">
                              balcony or terrace in parts
                            </option>
                            <option value="balconet in parts">balconet in parts</option>
                            <option value="terrace in parts">terrace in parts</option>
                            <option value="terrace">terrace</option>
                            <option value="north balcony">north balcony</option>
                            <option value="south balcony">south balcony</option>
                          </select>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Choose all applicable options"
                        v-slot="{ ariaDescribedby }"
                      >
                        <b-form-checkbox
                          v-model="property.roomBalconyFacilities"
                          v-for="option in roomBalconyFacilitiesOptions"
                          :key="option"
                          :value="option"
                          :aria-describedby="ariaDescribedby"
                          name="flavour-3a"
                          stacked
                        >
                          {{ option }}
                        </b-form-checkbox>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
              <b-tab title="Additional">
                <div class="col-pine-1">
                  <div class="col-pine-3">
                    <b-form-group
                      label="Choose all applicable options"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-checkbox
                        v-model="property.roomAdditionalBedLinen"
                        v-for="option in roomAdditionalBedLinenOptions"
                        :key="option"
                        :value="option"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-3a"
                        stacked
                      >
                        {{ option }}
                      </b-form-checkbox>
                    </b-form-group>
                  </div>
                  <div class="col-pine-4">
                    <b-form-checkbox
                      value="setup first time included"
                      v-model="property.roomAdditionalFirstSetup"
                    >
                      setup first time included
                    </b-form-checkbox>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </b-tab>
          <b-tab title="Mini-Bar">
            <h5>Room Mini Bar:</h5>
            <b-row>
              <b-col>
                <b-form-checkbox v-model="property.roomHasMiniBar">Room Mini Bar:</b-form-checkbox>
                <b-form-group
                  v-if="property.roomHasMiniBar"
                  label="Choose all applicable options"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-form-checkbox
                    v-model="property.roomMiniBarItems"
                    v-for="option in roomMiniBarItemsOptions"
                    :key="option"
                    :value="option"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-3a"
                    stacked
                  >
                    {{ option }}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
              <b-col cols="6" v-if="property.roomHasMiniBar">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                  <div class="col">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.roomMiniBarCharges"
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="deposit required">inclusive</option>
                      <option value="for additional charge">for additional charge</option>
                      <option value="inclusive">inclusive</option>
                      <option value="inclusive only with AI boards">inclusive</option>
                    </select>
                  </div>
                </div>

                <b-form-checkbox v-model="property.roomMiniBarOnRequest">
                  on request
                </b-form-checkbox>
                <b-form-checkbox v-model="property.roomMiniBarArrivalWelcome">
                  Welcome pack on arrival
                </b-form-checkbox>
                <b-form-checkbox v-model="property.roomMiniBarIsEmpty">
                  empty minibar
                </b-form-checkbox>
                <b-form-checkbox v-model="property.roomMiniBarRestocking">
                  restocking minibar
                </b-form-checkbox>
              </b-col>
              <hr />
              <b-col cols="12" v-if="property.roomMiniBarRestocking">
                <b-row>
                  <h5>Restocking Items</h5>
                </b-row>
                <b-row>
                  <b-col>
                    <b-row>
                      <b-col>
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label col-form-label-sm">Frequency</label>
                          <div class="col">
                            <select
                              class="form-control form-control-sm"
                              v-model="property.roomMiniBarRestockingFreq"
                            >
                              <option :value="null" selected>Select Option</option>
                              <option value="1x">1x</option>
                              <option value="2x">2x</option>
                              <option value="3x">3x</option>
                              <option value="4x">4x</option>
                              <option value="5x">5x</option>
                              <option value="6x">6x</option>
                            </select>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label col-form-label-sm">unit</label>
                          <div class="col">
                            <select
                              class="form-control form-control-sm"
                              v-model="property.roomMiniBarRestockingPeriod"
                            >
                              <option :value="null" selected>Select Option</option>
                              <option value="daily">daily</option>
                              <option value="per week">per week</option>
                              <option value="per stay">per stay</option>
                              <option value="occasionally">occasionally</option>
                            </select>
                          </div>
                        </div>
                      </b-col>
                    </b-row>

                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm"
                        >Restocking Charges</label
                      >
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomMiniBarRestockingCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="deposit required">deposit required</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                          <option value="inclusive only with AI boards">
                            inclusive only with AI boards
                          </option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <b-form-group
                      label="Choose all applicable options"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-checkbox
                        v-model="property.roomMiniBarRestockItems"
                        v-for="option in roomMiniBarRestockItemsOptions"
                        :key="option"
                        :value="option"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-3a"
                        stacked
                      >
                        {{ option }}
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Air Condition">
            <h5>Room have direct access to:</h5>
            <b-row>
              <b-col cols="3">
                <b-form-checkbox v-model="property.roomHasAirCondition"
                  >Has Air Condition</b-form-checkbox
                >
              </b-col>
              <b-col cols="12" v-if="property.roomHasAirCondition">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label col-form-label-sm">Charges</label>
                  <div class="col-sm-5">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.roomAirConditionCharges"
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="deposit required">deposit required</option>
                      <option value="for additional charge">for additional charge</option>
                      <option value="inclusive">inclusive</option>
                      <option value="inclusive only with AI boards">
                        inclusive only with AI boards
                      </option>
                    </select>
                  </div>
                </div>
                <b-form-checkbox v-model="property.roomAirConditionIndividually">
                  adjusted individually
                </b-form-checkbox>
                <b-form-checkbox v-model="property.roomAirConditionCentralised">
                  centralised control
                </b-form-checkbox>
                <b-form-checkbox v-model="property.roomAirConditionHourly"
                  >by the hour</b-form-checkbox
                >
                <b-form-checkbox v-model="property.roomAirConditionSeasonal"
                  >seasonal</b-form-checkbox
                >
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Heating">
            <h5>Room have direct access to:</h5>
            <b-row>
              <b-col cols="3">
                <b-form-checkbox v-model="property.roomHasHeating">Has Heating</b-form-checkbox>
              </b-col>
            </b-row>

            <div v-if="property.roomHasHeating">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label col-form-label-sm">Charges</label>
                <div class="col-sm-5">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.roomHeatingCharges"
                  >
                    <option :value="null" selected>Select Option</option>
                    <option value="deposit required">deposit required</option>
                    <option value="for additional charge">for additional charge</option>
                    <option value="inclusive">inclusive</option>
                    <option value="inclusive only with AI boards">
                      inclusive only with AI boards
                    </option>
                  </select>
                </div>
              </div>
              <b-row>
                <b-col>
                  <b-form-checkbox v-model="heatingFromTo">Available From - To</b-form-checkbox>
                </b-col>
                <b-col>
                  <div v-show="heatingFromTo">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">From</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="time"
                          v-model="property.roomHeatingFrom"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">To</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="time"
                          v-model="property.roomHeatingTo"
                        />
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-checkbox v-model="property.roomHeatingIsSeasonal"
                    >Seasonal only</b-form-checkbox
                  >
                </b-col>
              </b-row>
            </div>
          </b-tab>
          <b-tab title="Safe">
            <h5>Safe Boxes:</h5>
            <b-row>
              <b-col cols="6">
                <b-row>
                  <b-col cols="12">
                    <b-form-checkbox v-model="property.roomHasSafeBox">Safe</b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row v-if="property.roomHasSafeBox">
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">Safe Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomSafeCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="deposit required">deposit required</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                          <option value="inclusive only with AI boards">
                            inclusive only with AI boards
                          </option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="6">
                <b-row>
                  <b-col cols="12">
                    <b-form-checkbox v-model="property.roomHasLaptopSafe"
                      >Laptop safe</b-form-checkbox
                    >
                  </b-col>
                </b-row>
                <b-row v-if="property.roomHasLaptopSafe">
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm"
                        >Laptop Safe Charges</label
                      >
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomLaptopSafeCharges"
                        >
                          <option value="null">Select Option</option>
                          <option value="deposit required">deposit required</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                          <option value="inclusive only with AI boards">
                            inclusive only with AI boards
                          </option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Room Service">
            <h5>Room service / Butler service</h5>
            <b-row>
              <b-col cols="3">
                <b-form-checkbox v-model="property.roomHasRoomService"
                  >Room service</b-form-checkbox
                >
              </b-col>
              <b-col cols="6" v-if="property.roomHasRoomService">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                  <div class="col">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.roomRoomServiceCharges"
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="for additional charge">for additional charge</option>
                      <option value="inclusive">inclusive</option>
                      <option value="inclusive only with All Inclusive plan">
                        inclusive only with All Inclusive plan
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col v-if="property.roomHasRoomService">
                <b-form-checkbox v-model="property.roomRoomServiceAllDay"
                  >Available 24 Hours</b-form-checkbox
                >
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="3">
                <b-form-checkbox v-model="property.roomHasButlerService"
                  >Butler service</b-form-checkbox
                >
              </b-col>
              <b-col cols="6" v-if="property.roomHasButlerService">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                  <div class="col">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.roomButlerServiceCharges"
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="for additional charge">for additional charge</option>
                      <option value="inclusive">inclusive</option>
                      <option value="inclusive only with All Inclusive plan">
                        inclusive only with All Inclusive plan
                      </option>
                      <option value="inclusive only with All Inclusive Plus">
                        inclusive only with All Inclusive Plus
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Wifi">
            <h5>Room have direct access to:</h5>
            <b-row>
              <b-col cols="3">
                <b-form-checkbox v-model="property.roomHasWifiAccess"> Has Wifi </b-form-checkbox>
              </b-col>
            </b-row>
            <b-row v-if="property.roomHasWifiAccess">
              <b-col cols="9">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label col-form-label-sm">Charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.roomWifiCharges">
                      <option :value="null" selected>Select Option</option>
                      <option value="deposit required">deposit required</option>
                      <option value="for additional charge">for additional charge</option>
                      <option value="inclusive">inclusive</option>
                      <option value="inclusive only with AI boards">
                        inclusive only with AI boards
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <b-form-checkbox v-model="property.roomWifiLimitedData">
                    Limited data bandwidth
                  </b-form-checkbox>
                  <b-form-checkbox v-model="property.roomWifiHighSpeed"
                    >High Speed available
                  </b-form-checkbox>
                </div>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Kitchen">
            <h5>Kitchen (s) & Equipment</h5>
            <b-row>
              <b-col cols="5">
                <b-form-checkbox v-model="property.roomHasKitchenette">
                  has Kitchenette
                </b-form-checkbox>
              </b-col>
              <b-col cols="10" v-if="property.roomHasKitchenette">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomKitchenetteCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Equipment</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomKitchenetteEquipment"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="Stove">Stove</option>
                          <option value="bowls">bowls</option>
                          <option value="cultlery">cultlery</option>
                          <option value="hotplate">hotplate</option>
                          <option value="oven">oven</option>
                          <option value="pan(s)">pan(s)</option>
                          <option value="paltes">paltes</option>
                          <option value="pots">pots</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm"
                        >Kitchenette price</label
                      >
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          min="0"
                          step="0.1"
                          v-model="property.roomKitchenettePrice"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="5">
                <b-form-checkbox id="id_Room_Has_KitchenUnit" v-model="property.roomHasKitchenUnit">
                  has Kitchen Unit
                </b-form-checkbox>
              </b-col>
              <b-col cols="10" v-if="property.roomHasKitchenUnit">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomKitchenUnitCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Equipment</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomKitchenUnitEquipment"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="Stove">Stove</option>
                          <option value="bowls">bowls</option>
                          <option value="cultlery">cultlery</option>
                          <option value="hotplate">hotplate</option>
                          <option value="oven">oven</option>
                          <option value="pan(s)">pan(s)</option>
                          <option value="paltes">paltes</option>
                          <option value="pots">pots</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm"
                        >final cleaning price</label
                      >
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          min="0"
                          v-model="property.roomKitchenUnitCleaningPrice"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col></b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="5">
                <b-form-checkbox v-model="property.roomHasKitchen"> has Kitchen </b-form-checkbox>
              </b-col>
              <b-col cols="10" v-if="property.roomHasKitchen">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomKitchenCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Equipment</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomKitchenEquipment"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="Stove">Stove</option>
                          <option value="bowls">bowls</option>
                          <option value="cultlery">cultlery</option>
                          <option value="hotplate">hotplate</option>
                          <option value="oven">oven</option>
                          <option value="pan(s)">pan(s)</option>
                          <option value="paltes">paltes</option>
                          <option value="pots">pots</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">
                        final cleaning price</label
                      >
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          min="0"
                          v-model="property.roomKitchenCleaningPrice"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Rooms">
            <h5>Amounts of rooms and beds available</h5>
            <hr />
            <!-- Nav tabs -->
            <b-tabs pills card small horizontal>
              <b-tab title="Rooms" active>
                <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
                  <b-form-checkbox
                    v-model="property.roomRooms"
                    v-for="option in roomRoomsOptions"
                    :key="option"
                    :value="option"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-3a"
                    stacked
                  >
                    {{ option }}
                  </b-form-checkbox>
                </b-form-group>
                <div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label col-form-label-sm">Connection type</label>
                    <div class="col-sm-6">
                      <select
                        class="form-control form-control-sm"
                        v-model="property.roomRoomsConnectionType"
                      >
                        <option :value="null" selected>Select Option</option>
                        <option value="separated by steps">separated by steps</option>
                        <option value="maisonette">maisonette</option>
                        <option value="maisonette in parts">maisonette in parts</option>
                        <option value="separated by a folding door">
                          separated by a folding door
                        </option>
                        <option value="with connecting door">with connecting door</option>
                        <option value="open connection">open connection</option>
                        <option value="visually separated">visually separated</option>
                        <option value="without connecting door">without connecting door</option>
                        <option value="with sliding door">with sliding door</option>
                        <option value="open plan">open plan</option>
                        <option value="with bedroom door(s)">with bedroom door(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <b-form-checkbox v-model="property.roomRoomsTwoDoubles">
                    2 double rooms
                  </b-form-checkbox>
                </div>
                <div v-if="property.roomRoomsTwoDoubles">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label col-form-label-sm"
                      >Connection second room</label
                    >
                    <div class="col-sm-6">
                      <select
                        class="form-control form-control-sm"
                        v-model="property.roomRoomsSecondConnection"
                      >
                        <option :value="null" selected>Select Option</option>
                        <option value="separated by steps">separated by steps</option>
                        <option value="maisonette">maisonette</option>
                        <option value="maisonette in parts">maisonette in parts</option>
                        <option value="separated by a folding door">
                          separated by a folding door
                        </option>
                        <option value="with connecting door">with connecting door</option>
                        <option value="open connection">open connection</option>
                        <option value="visually separated">visually separated</option>
                        <option value="without connecting door">without connecting door</option>
                        <option value="with sliding door">with sliding door</option>
                        <option value="open plan">open plan</option>
                        <option value="with bedroom door(s)">with bedroom door(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Beds">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">Double Bed(s)</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomDoubleBeds"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">King Bed(s)</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomKingBeds"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">Queen Bed(s)</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomQueenBeds"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">Single Bed(s)</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomSingleBeds"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">French Bed(s)</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomFrenchBeds"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">Sofa Bed(s)</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomSofaBeds"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm"
                        >pull-out Bed(s)</label
                      >
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomPullOutBeds"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-5 col-form-label col-form-label-sm">Bunk Bed(s)</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm form-control-sm-smananas-ninp"
                          type="number"
                          min="0"
                          v-model="property.roomBunkBeds"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <hr />
                <b-row>
                  <b-col>
                    <div>
                      <b-form-checkbox v-model="property.additionalBedsAvailable">
                        Additional beds available
                      </b-form-checkbox>
                    </div>
                    <div class="col-pine-23" v-if="property.additionalBedsAvailable">
                      <div class="form-group row">
                        <label class="col-sm-5 col-form-label col-form-label-sm">
                          Number of additional beds</label
                        >
                        <div class="col">
                          <input
                            class="form-control form-control-sm form-control-sm-smananas-ninp"
                            type="number"
                            min="0"
                            v-model="property.roomAdditionalBeds"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-5 col-form-label col-form-label-sm">
                          price per day (if exists)</label
                        >
                        <div class="col">
                          <input
                            class="form-control form-control-sm form-control-sm-smananas-ninp"
                            type="number"
                            min="0"
                            v-model="property.roomAdditionalBedsPrice"
                          />
                        </div>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-tab>
          <b-tab title="Cleaning">
            <h5>Room Cleaning:</h5>
            <b-row>
              <b-col cols="6">
                <b-row>
                  <b-col>
                    <b-form-checkbox v-model="property.roomCleaningAvailable">
                      Room Cleaning
                    </b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row v-if="property.roomCleaningAvailable">
                  <b-col cols="12">
                    <b-form-checkbox v-model="property.roomCleaningIsDaily">
                      Daily
                    </b-form-checkbox>
                  </b-col>
                  <b-col cols="12" v-if="!property.roomCleaningIsDaily">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">
                        Times per week</label
                      >
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          min="0"
                          v-model="property.roomCleaningFrequency"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomCleaningCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <hr />
                <b-row>
                  <b-col>
                    <b-form-checkbox v-model="property.roomCleaningFinalCleaningApply">
                      Final cleaning
                    </b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row v-if="property.roomCleaningFinalCleaningApply">
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomCleaningFinalCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                          <option value="inclusive except kitchen">inclusive except kitchen</option>
                          <option value="self-cleaning possible">self-cleaning possible</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                  <b-col
                    cols="12"
                    v-if="property.roomCleaningFinalCharges === 'for additional charge'"
                  >
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">
                        final cleaning price</label
                      >
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          min="0"
                          step="0.1"
                          v-model="property.roomCleaningFinalPrice"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="6">
                <b-row>
                  <b-col cols="12">
                    <b-form-checkbox v-model="property.roomTowelChangeAvailable">
                      Towel Change
                    </b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row v-if="property.roomTowelChangeAvailable">
                  <b-col cols="12">
                    <b-form-checkbox v-model="property.roomTowelChangeIsDaily">
                      Daily
                    </b-form-checkbox>
                    <b-form-checkbox v-model="property.roomTowelChangeOnRequest">
                      Change of towels on request
                    </b-form-checkbox>
                  </b-col>
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">
                        Times per week</label
                      >
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          min="0"
                          v-model="property.roomTowelChangeTimesPerWeek"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomTowelChangeCharge"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <hr />
                <b-row>
                  <b-col cols="12">
                    <b-form-checkbox v-model="property.roomSheetChangeAvailable">
                      Change of bedsheets
                    </b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row v-if="property.roomSheetChangeAvailable">
                  <b-col cols="12">
                    <b-form-checkbox v-model="property.roomSheetChangeIsDaily"
                      >Daily
                    </b-form-checkbox>
                  </b-col>
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">
                        Times per week
                      </label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          min="0"
                          v-model="property.roomSheetChangeFrequency"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="12">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label col-form-label-sm">Charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.roomSheetChangeCharges"
                        >
                          <option :value="null" selected>Select Option</option>
                          <option value="for additional charge">for additional charge</option>
                          <option value="inclusive">inclusive</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <br />
                <b-row>
                  <b-col cols="12">
                    <div class="col-pine-1">
                      <b-form-checkbox v-model="property.roomSheetsNotProvided">
                        Bedding is not provided
                      </b-form-checkbox>
                    </div>
                    <div class="col-pine-1">
                      <b-form-checkbox v-model="property.roomSheetsForAdditionalCharge">
                        Bed linen available for additional charge
                      </b-form-checkbox>
                    </div>
                    <div class="col-pine-1">
                      <b-form-checkbox v-model="property.roomTowelsOnGuest">
                        Towels need to be brought along
                      </b-form-checkbox>
                    </div>
                    <div class="col-pine-1">
                      <b-form-checkbox v-model="property.roomTowelsForAdditionalCharge">
                        Towels available for additional charge
                      </b-form-checkbox>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
      <!-- this is the end of rooms facts -->
    </b-tab>
  </div>
</template>

<script>
export default {
  name: "RoomInstance",
  props: {
    roomIndex: { type: Number },
    isSelected: { type: Boolean, default: false },
  },
  data() {
    return {
      errors: [],
      roomFeaturesOptions: [
        "Fancy",
        "Authentic",
        "big",
        "bright",
        "colorful",
        "comfortable",
        "contemporary",
        "cosy",
        "detached",
        "elegant",
        "luxurious",
        "mediterranean",
        "modern",
        "partyly renovated",
        "pleasant",
        "practical",
        "renovated",
        "simple",
        "small",
        "spacious",
        "stylish",
        "tasteful",
        "traditional",
        "vintage",
        "welcoming",
        "well-tended",
      ],
      roomLocationsOptions: [
        "in bungalow",
        "in main building",
        "in annex building",
        "in courtyard",
        "in cluster",
        "to the spa gardens",
        "facing the city",
        "facing the river",
        "in the old building",
        "in the new building",
        "in the villa building",
        "in the main building and annex",
        "in main building or annex",
        "in adults only area",
        "in budget area",
        "in budget plus area",
        "in basic area",
        "in basic plus area",
        "in middle class area",
        "in middle class plus area",
        "in comfort plus area",
        "in first class area",
        "in first class plus area",
        "in luxury area",
        "in luxury plus area",
        "in a rainforest camp",
        "on a campsite",
      ],
      roomFacilityEquipOptions: [
        "alarm clock",
        "ceiling fan",
        "coffee and tea making facilities",
        "coffee machine",
        "desk",
        "dining area",
        "dish washer",
        "espresso machine",
        "fan",
        "fireplace",
        "fridge",
        "hair dryer",
        "iron",
        "ironing board",
        "kettle",
        "microwave",
        "mini fridge",
        "mosquito net",
        "seating-accommodation",
        "sitting area",
        "toaster",
        "trouser press",
        "tumble dryer",
        "washing machine",
      ],
      roomFacilityMultimediaOptions: [
        "2 TVs",
        "Blue-Ray player",
        "cable TV",
        "DVD player",
        "flat-screen TV",
        "game console",
        "hi-fi system",
        "iPad",
        "iPod docking station",
        "music channel",
        "pay TV",
        "radio",
        "radio alarm clock",
        "sattelite TV",
        "sattelite TV (on request)",
        "Smart TV",
        "TV",
        "telephone",
      ],
      roomBathroomFeatureOptions: [
        "additional guest toilet",
        "adventure shower",
        "bathroom located in bedroom",
        "bathtub in bedroom",
        "bathtub with hydromassage fun",
        "bidet",
        "courtsey line",
        "freestanding bathtub",
        "open-plan bathroom",
        "outdoor bath",
        "outside shower",
        "rain shower",
        "sauna",
        "separate shower",
        "separate toilet",
        "whirlpool",
      ],
      roomFacilityAmenityOptions: [
        "access to the club",
        "bathrobes",
        "bathroom amenities",
        "complimentary daily newspaper",
        "laundry service",
        "make-up/shaving mirror",
        "slippers",
        "wake up service",
        "whirlpool",
        "desk",
      ],
      roomBalconyFacilitiesOptions: [
        "bathtub",
        "furnished",
        "partly furnished",
        "with a barbecue",
        "access to community pool",
        "small garden",
        "daybed",
        "private plunge pool",
        "private pool",
        "sun loungers",
        "sun protection",
        "whirlpool",
      ],
      roomAdditionalBedLinenOptions: ["bed linen", "towels", "tea towel", "cleaning tools"],
      roomMiniBarItemsOptions: [
        "Beer",
        "Chocolates",
        "Nuts",
        "Snacks",
        "Soft drinks",
        "Spirits",
        "Sparkling water",
        "Water",
        "Wine",
      ],
      roomMiniBarRestockItemsOptions: [
        "Beer",
        "Chocolates",
        "Nuts",
        "Snacks",
        "Soft drinks",
        "Spirits",
        "Sparkling water",
        "Water",
        "Wine",
      ],
      roomRoomsOptions: [
        "1 bedroom",
        "1 living room",
        "1 living room with sleeping possibility",
        "2 bedrooms",
        "2 living rooms",
        "2 living rooms with sleeping possibility",
        "3 bedrooms",
        "3 living rooms",
        "4 bedrooms",
        "5 bedrooms",
        "6 bedrooms",
        "7 bedrooms",
      ],
      roomAccessToOptions: ["to the lagoon", "to the sea", "to the pool", "to the beach"],
    };
  },
  computed: {
    tabName() {
      return this.property.roomName === "" || this.property.roomName === null
        ? "New Room"
        : this.property.roomName;
    },
    property() {
      return this.$store.getters["roomsFactsComp/getProperties"][this.roomIndex];
    },
    roomTypes() {
      return this.$store.getters["options/getRoomtypes"];
    },
    viewsOptions() {
      return this.$store.getters["options/getViewsOptions"];
    },
    roomErrors() {
      const allErrors = this.$store.getters["roomsFactsComp/getErrors"];
      return allErrors[this.roomIndex] || [];
    },
  },
  methods: {
    activate() {
      this.$emit("activated", {
        roomId: this.roomId,
      });
    },
    deleteRoom() {
      this.$emit("deleted", {
        roomId: this.property,
      });
    },
    linkClass() {
      return this.isSelected ? ["bg-primary", "text-light"] : ["bg-light", "text-info"];
    },
    validate() {
      const newValidations = [];
      if (this.property.roomName === "") {
        newValidations.push("Room name required");
      }
      this.$store.dispatch("roomsFactsComp/validate");
      this.errors = this.$store.getters["roomsFactsComp/getErrors"] || [];
      /* console.log("errors are", this.errors); */
    },
  },
  created() {},
};
</script>
