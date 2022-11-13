<template>
  <div class="container">
    <form v-on:submit.prevent @submit="save()">
      <h4>Hotel & Facilities</h4>
      <!-- hotel characteristics and info -->
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
              >Hotel characteristics<span class="text-danger">*</span></label
            >
            <div class="col-sm-7">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.hotelCharacteristics.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.hotelCharacteristics"
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
                  v-for="hotChar in getHotelCharacteristics"
                  :key="hotChar"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.hotelCharacteristics"
                    @click.native.stop=""
                    :value="hotChar"
                    >{{ hotChar }}</b-form-checkbox
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </b-col>
        <b-col cols="6">
          <div class="form-group row">
            <label class="col-sm-5 col-form-label col-form-label-sm"
              >Outdoors characteristics</label
            >
            <div class="col-sm-7">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.outdoorCharacteristics.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.outdoorCharacteristics"
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
                  v-for="outChar in getOutdoorCharacteristics"
                  :key="outChar"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.outdoorCharacteristics"
                    @click.native.stop=""
                    :value="outChar"
                    >{{ outChar }}</b-form-checkbox
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
            <label class="col-sm-5 col-form-label col-form-label-sm">outdoor equipment</label>
            <div class="col-sm-7">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.outdoorEquipment.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.outdoorEquipment"
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
                  v-for="outEquip in getOutdoorEquipment"
                  :key="outEquip"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.outdoorEquipment"
                    @click.native.stop=""
                    :value="outEquip"
                    >{{ outEquip }}</b-form-checkbox
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </b-col>
        <b-col cols="6">
          <b-form-checkbox size="sm" v-model="property.outdoorFacilityUpOnWeather">
            Outdoos facilities depending on weather condition
          </b-form-checkbox>
          <b-form-checkbox size="sm" v-model="property.restrictionOutdoorLateSeason">
            Equipment restrictions during early/late season
          </b-form-checkbox>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="">
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm"
              >Hotel total ground area in sqm</label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                placeholder="1001"
                min="0"
                v-model="property.hotelGroundSize"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm"
              >size of outdoor area in sqm</label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.outdoorAreaSize"
              />
            </div>
          </div>
        </b-col>
        <b-col>
          <h6 style="color: navy">
            Hotel's top description tags
            <b-icon
              icon="question-circle-fill"
              scale="0.8"
              variant="primary"
              aria-label="Help"
              title="Top description tags to be used in summarized facts or on top of facts document or as important hashtags for the hotel"
            ></b-icon>
          </h6>
          <b-form-checkbox id="id_Hotel_BeachFront_Check" v-model="property.hotelBeachFront">
            Beach Front
          </b-form-checkbox>
          <b-form-checkbox
            v-if="property.hotelBeachFront"
            v-model="property.hotelBeachSeparateRoad"
          >
            Only separated by coast road
          </b-form-checkbox>
          <b-form-checkbox id="id_Hotel_QuietnRelaxing" v-model="property.quietRelaxing">
            Quiet & relaxing
          </b-form-checkbox>
          <b-form-checkbox id="id_Hotel_Outside_City" v-model="property.outsideTheCity">
            Outside The City
          </b-form-checkbox>
          <!-- #newlinknew -->
          <b-form-checkbox>Great view</b-form-checkbox>
          <b-form-checkbox>Panoramic view</b-form-checkbox>
          <!-- #Endnewlinknew -->
        </b-col>
      </b-row>
      <hr />
      <!-- Swimming pool + Aqua -->
      <b-row>
        <h5>Pools & Aqua</h5>
        <!-- <hr style="width: 25%; margin: 0px" /> -->
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <b-form-checkbox size="sm" v-model="property.hotelHasSwimmingPool">
            Swimming Pool available at hotel
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row v-if="property.hotelHasSwimmingPool">
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-8 col-form-label col-form-label-sm"
              >Number of swimming pools</label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.swimmingPoolsNumber"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-8 col-form-label col-form-label-sm"
              >Size of total pools (sqm)</label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.swimmingPoolsTotalSize"
              />
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm">Swimming Pool Type</label>
            <div class="col">
              <select class="form-control form-control-sm" v-model="property.swimmingPoolsType">
                <option :value="null" selected>Select Option</option>
                <option value="Rooftop">Rooftop</option>
                <option value="Infinity">Infinity</option>
                <option value="Natural">Natural</option>
                <option value="Overflow">Overflow</option>
                <option value="Whirl">Whirl</option>
                <option value="Indoor">Indoor</option>
                <option value="50M">50M</option>
              </select>
            </div>
          </div>
          <!-- #newlinknew -->
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm">Pool Water</label>
            <div class="col">
              <select class="form-control form-control-sm">
                <option value="Fresh water">Fresh water</option>
                <option value="Salt water">Salt water</option>
              </select>
            </div>
          </div>
          <!-- end#newlinknew -->
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm">Kids Swimming Pool</label>
            <div class="col">
              <select class="form-control form-control-sm" v-model="property.swimmingPoolsHasKids">
                <option :value="null">Select Option</option>
                <option value="Not Available">Not Available</option>
                <option value="Connected">Connected</option>
                <option value="Separated">Separated</option>
              </select>
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <b-form-checkbox size="sm" v-model="property.swimmingPoolsIsHeated">
            Heated Swimming Pool
          </b-form-checkbox>
          <b-form-checkbox size="sm" v-model="property.swimmingPoolsIsAdultOnly">
            Adults Only Pool
          </b-form-checkbox>
          <b-form-checkbox size="sm" v-model="property.swimmingPoolsOnWeather">
            depending on weather
          </b-form-checkbox>
          <b-form-checkbox size="sm" v-model="property.swimmingPoolsSeasonal">
            seasonal
          </b-form-checkbox>
          <b-form-checkbox size="sm" v-model="property.swimmingPoolsCoolable">
            coolable water
          </b-form-checkbox>
          <!-- #newlinknew -->
          <b-form-checkbox size="sm"> Kids pool available </b-form-checkbox>
          <!-- end#newlinknew -->
          <!-- #end-Update -->
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="12">
          <b-form-checkbox size="sm" v-model="property.hotelHasAquaPark">
            Aqua Park available at hotel
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row v-if="property.hotelHasAquaPark">
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-8 col-form-label col-form-label-sm">Number of slides</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.aquaParkSlidesCount"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-8 col-form-label col-form-label-sm">Aquapark size in sqm</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.aquaParkSize"
              />
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="form-group row">
            <label class="col-sm-6 col-form-label col-form-label-sm">Aquapark Water</label>
            <div class="col">
              <select class="form-control form-control-sm" v-model="property.aquaParkWater">
                <option :value="null" selected>Select option</option>
                <option value="Fresh water">Fresh water</option>
                <option value="Salt water">Salt water</option>
              </select>
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <b-form-checkbox size="sm" v-model="property.aquaWaterHeatable">heatable</b-form-checkbox>
          <b-form-checkbox size="sm" v-model="property.aquaWaterCoolable">coolable</b-form-checkbox>
        </b-col>
      </b-row>

      <b-row v-if="property.hotelHasAquaPark">
        <b-col cols="5">
          <div class="form-group row">
            <label class="col-sm-5 col-form-label col-form-label-sm">Aquapark Fees</label>
            <div class="col">
              <select class="form-control form-control-sm" v-model="property.aquaParkCharges">
                <option :value="null">Select Option</option>
                <option value="Inclusive">Inclusive</option>
                <option value="Additional Charge">Additional Charge</option>
              </select>
            </div>
          </div>
        </b-col>
        <b-col cols="3" v-show="property.aquaParkCharges === 'Additional Charge'">
          <div class="form-group row">
            <label class="col-form-label col-form-label-sm">Aquapark Price</label>
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.aquaParkPrice"
              />
            </div>
          </div>
        </b-col>
        <b-col cols="4" v-show="property.aquaParkPrice > '0'">
          <div class="form-group row">
            <label class="col-form-label col-form-label-sm">currency</label>
            <div class="col-sm-6">
              <select class="form-control form-control-sm" v-model="property.aquaParkPriceCurrency">
                <option :value="null">Select currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </b-col>
      </b-row>
      <hr />
      <!--outdoor equipment -->
      <b-row>
        <h5>Outdoors</h5>
        <!-- <hr style="width: 25%; margin: 0px" /> -->
      </b-row>
      <div>
        <b-col cols="12">
          <div class="form-group row">
            <b-form-checkbox size="sm" v-model="property.hasSunLoungers">
              Sun Loungers Available
            </b-form-checkbox>
          </div>
        </b-col>
        <div v-if="property.hasSunLoungers">
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersOnBeach"
                >At Beach</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.sunLoungersBeachQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Type</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersBeachType"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersBeachCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersBeachIsSeasonal"
                >seasonal</b-form-checkbox
              >

              <b-form-checkbox size="sm" v-model="property.sunLoungersBeachDrinkService"
                >drinks service</b-form-checkbox
              >
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersOnPool"
                >At Swimming pool:</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.sunLoungersPoolQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Type</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersPoolType"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersPoolCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersPoolIsSeasonal"
                >seasonal</b-form-checkbox
              >

              <b-form-checkbox size="sm" v-model="property.sunLoungersPoolDrinkService"
                >drinks service</b-form-checkbox
              >
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersOnGarden"
                >At Garden</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.sunLoungersGardenQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Type</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersGardenType"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersGardenCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersGardenIsSeasonal"
                >seasonal</b-form-checkbox
              >

              <b-form-checkbox size="sm" v-model="property.sunLoungersGardenDrinkService"
                >drinks service</b-form-checkbox
              >
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersOnLake"
                >At the lake</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.sunLoungersLakeQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Type</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersLakeType"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersLakeCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersLakeIsSeasonal"
                >seasonal</b-form-checkbox
              >

              <b-form-checkbox size="sm" v-model="property.sunLoungersLakeDrinkService"
                >drinks service</b-form-checkbox
              >
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersOnSunTerrace"
                >On the Sun terrace</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.sunLoungersSunTerraceQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Type</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersSunTerraceType"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.sunLoungersSunTerraceCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.sunLoungersSunTerraceIsSeasonal">
                seasonal
              </b-form-checkbox>
              <b-form-checkbox size="sm" v-model="property.sunLoungersSunTerraceDrinkService">
                drinks service
              </b-form-checkbox>
            </b-col>
          </b-row>
        </div>
        <hr />
      </div>
      <div>
        <b-col cols="12">
          <div class="form-group row">
            <b-form-checkbox size="sm" v-model="property.hasParasols">
              Parasols Available
            </b-form-checkbox>
          </div>
        </b-col>
        <div v-if="property.hasParasols">
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtBeach"
                >At Beach</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.parasolsAtBeachQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.parasolsAtBeachCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtBeachSeasonal"
                >seasonal</b-form-checkbox
              >

              <b-form-checkbox size="sm" v-model="property.parasolsAtBeachLocalSupplier"
                >offered by local supplier</b-form-checkbox
              >
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtPool"
                >At Swimming pool</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.parasolsAtPoolQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.parasolsAtPoolCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtPoolSeasonal"
                >seasonal</b-form-checkbox
              >
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtGarden"
                >At Garden</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.parasolsAtGardenQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.parasolsAtGardenCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtGardenSeasonal"
                >seasonal</b-form-checkbox
              >
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtLake"
                >At the lake</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.parasolsAtLakeQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.parasolsAtLakeCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsAtLakeSeasonal"
                >seasonal
              </b-form-checkbox>

              <b-form-checkbox size="sm" v-model="property.parasolsAtLakeLocalSupplier"
                >offered by local supplier
              </b-form-checkbox>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsSunTerrace"
                >On the Sun terrace</b-form-checkbox
              >
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Quantity</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.parasolsSunTerraceQuantity"
                  />
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.parasolsSunTerraceCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.parasolsSunTerraceSeasonal"
                >seasonal</b-form-checkbox
              >
            </b-col>
          </b-row>
        </div>
        <hr />
      </div>
      <div>
        <b-col cols="12">
          <div class="form-group row">
            <b-form-checkbox size="sm" v-model="property.hasTowels">
              Towels Available
            </b-form-checkbox>
          </div>
        </b-col>
        <div v-if="property.hasTowels">
          <b-row id="towelspoolbeachshowhide">
            <b-col>
              <b-form-checkbox size="sm" v-model="property.towelsOnBeach">
                At Beach
              </b-form-checkbox>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.towelsOnBeachCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.towelsOnBeachAdditionalCharge">
                change with additional charge
              </b-form-checkbox>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.towelsOnPool">
                At Swimming Pool
              </b-form-checkbox>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.towelsOnPoolCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in sunLoungersCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <b-form-checkbox size="sm" v-model="property.towelsOnPoolAdditionalCharge">
                change with additional charge
              </b-form-checkbox>
            </b-col>
          </b-row>
        </div>
      </div>
      <!--END outdoor equipment -->
      <hr />
      <!-- Building and units -->
      <div>
        <b-row>
          <h5>Buildings info</h5>
          <!-- <hr style="width: 25%; margin: 0px" /> -->
        </b-row>
        <br />
        <b-row>
          <!-- Left side of the section -->
          <b-col cols="6">
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >Number of Buildings
                  </label>

                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelBuildingsCount"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >Number of Bungalows
                  </label>

                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelBungalowsCount"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm">Number of Villas </label>

                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelVillasCount"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >Total number of Units
                  </label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelTotalAmountUnits"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >Units suitable for wheelchair usage</label
                  >
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelUnitsWheelchair"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-5 col-form-label col-form-label-sm"
                    >Service facilities
                  </label>
                  <div class="col">
                    <b-dropdown
                      size="sm"
                      boundary="viewport"
                      variant="outline-dark"
                      :text="property.hotelFacilityServices.length + ' Selected options'"
                      class="m-md-2"
                      style="max-width: 350px !important; font-weight: 600"
                    >
                      <b-card class="bcardmultidrop">
                        <div>
                          <b-badge
                            class="multidropbadge"
                            v-for="item in property.hotelFacilityServices"
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
                        v-for="facServ in getHotelFacilityServices"
                        :key="facServ"
                        @click.native.capture.stop
                      >
                        <b-form-checkbox
                          v-model="property.hotelFacilityServices"
                          @click.native.stop=""
                          :value="facServ"
                          >{{ facServ }}</b-form-checkbox
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
                  <label class="col-sm-5 col-form-label col-form-label-sm">Credit Cards </label>
                  <div class="col">
                    <b-dropdown
                      size="sm"
                      boundary="viewport"
                      variant="outline-dark"
                      :text="property.hotelCreditCards.length + ' Selected options'"
                      class="m-md-2"
                      style="max-width: 350px !important; font-weight: 600"
                    >
                      <b-card class="bcardmultidrop">
                        <div>
                          <b-badge
                            class="multidropbadge"
                            v-for="item in property.hotelCreditCards"
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
                        v-for="hCC in getHotelCreditCards"
                        :key="hCC"
                        @click.native.capture.stop
                      >
                        <b-form-checkbox
                          v-model="property.hotelCreditCards"
                          @click.native.stop=""
                          :value="hCC"
                          >{{ hCC }}</b-form-checkbox
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
                  <label class="col-sm-6 col-form-label col-form-label-sm"
                    >distance to nearest ATM (meters)</label
                  >
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelNearestAtm"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <!-- Right side of the section -->
          <b-col cols="6">
            <!-- building additonal equipment -->
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelLiftsAvailable">
                  Lifts available
                </b-form-checkbox>
              </b-col>
              <b-col cols="8" v-if="property.hotelLiftsAvailable">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm">Number</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelLiftsCount"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelLiftsPanoramicAvail">
                  Panoramic lift
                </b-form-checkbox>
              </b-col>
              <b-col cols="8" v-if="property.hotelLiftsPanoramicAvail">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm">Number</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelLiftsPanoramicCount"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelReceptionAvailable"
                  >Reception</b-form-checkbox
                >
              </b-col>
              <b-col cols="8" v-if="property.hotelReceptionAvailable">
                <b-form-checkbox size="sm" v-model="property.hotelReceptionAllDay"
                  >Available 24 hours</b-form-checkbox
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-checkbox size="sm" v-model="property.hotelHasLobbyArea"
                  >Lobby Area</b-form-checkbox
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelHasLaundryCleaning"
                  >Laundry & Ironing
                </b-form-checkbox>
              </b-col>
              <b-col cols="8" v-if="property.hotelHasLaundryCleaning">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm">charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelLaundryCharges"
                        >
                          <option :value="null">Select Option</option>
                          <option value="Inclusive">Inclusive</option>
                          <option value="Additional Charge">Additional Charge</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelWifiCheck">
                  Wifi Internet
                </b-form-checkbox>
              </b-col>
              <b-col cols="8" v-if="property.hotelWifiCheck">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm">Wifi fees</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelWifiCharges"
                        >
                          <option :value="null">Select Option</option>
                          <option value="Inclusive">Inclusive</option>
                          <option value="Additional Charge">Additional Charge</option>
                        </select>
                      </div>
                    </div></b-col
                  >
                </b-row>
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm"
                        >Wifi locations</label
                      >
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelWifiLocations"
                        >
                          <option :value="null">Select Option</option>
                          <option value="Through out the Hotel">Through out the Hotel</option>
                          <option value="Rooms only">Rooms only</option>
                          <option value="Public areas">Public areas</option>
                          <option value="Lobby only">charming</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-checkbox size="sm" v-model="property.shuttleWithinHotel">
                  Shuttle within hotel
                </b-form-checkbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelDoctorConsult"
                  >Doctor consultation
                </b-form-checkbox>
              </b-col>
              <b-col cols="8" v-if="property.hotelDoctorConsult">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm">charges</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelDoctorConsultCharges"
                        >
                          <option :value="null">Select Option</option>
                          <option value="Inclusive">Inclusive</option>
                          <option value="Additional Charge">Additional Charge</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelSafeCheck">
                  Hotel Safe
                </b-form-checkbox>
              </b-col>
              <b-col cols="8" v-if="property.hotelSafeCheck">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm">Safe fees</label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelSafeCharges"
                        >
                          <option :value="null">Select Option</option>
                          <option value="Inclusive">Inclusive</option>
                          <option value="Additional Charge">Additional Charge</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row v-show="property.hotelSafeCharges === 'Additional Charge'">
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm">Price per day</label>
                      <div class="col">
                        <input
                          class="form-control form-control-sm"
                          type="double"
                          min="0"
                          step="0.1"
                          v-model="property.hotelSafePrice"
                        />
                      </div></div
                  ></b-col>
                </b-row>
                <b-row v-show="property.hotelSafePrice > '0'">
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm">currency </label>
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelSafePriceCurrency"
                        >
                          <option :value="null">Select currency</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                    </div></b-col
                  >
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelHasDiscoClub">
                  Club-Disco available
                </b-form-checkbox>
              </b-col>
              <b-col cols="8" v-if="property.hotelHasDiscoClub">
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm"
                        >Disco location</label
                      >
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelDiscoClubLocation"
                        >
                          <option :value="null">Select Option</option>
                          <option value="inside hotel">inside hotel</option>
                          <option value="hotel outdoor">hotel outdoor</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm"
                        >Entrance to disco/club</label
                      >
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelDiscoClubEntrance"
                        >
                          <option :value="null">Select Option</option>
                          <option value="Inclusive">Inclusive</option>
                          <option value="Additional Charge">Additional Charge</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <div class="form-group row">
                      <label class="col-sm-6 col-form-label col-form-label-sm"
                        >Drinks at disco/club</label
                      >
                      <div class="col">
                        <select
                          class="form-control form-control-sm"
                          v-model="property.hotelDiscoClubDrinks"
                        >
                          <option :value="null">Select Option</option>
                          <option value="Inclusive">Inclusive</option>
                          <option value="Additional Charge">Additional Charge</option>
                        </select>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-checkbox size="sm" v-model="property.hotelHasCafes"
                  >Café(s) available</b-form-checkbox
                >
              </b-col>
              <b-col cols="8" v-if="property.hotelHasCafes">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm">Number</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      v-model="property.hotelCafesNumber"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <hr />
      <!-- Parking -->
      <b-row>
        <h5>Parking options</h5>
        <!-- <hr style="width: 25%; margin: 0px" /> -->
      </b-row>
      <br />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.hotelParkingAvailable"
            >Hotel's parking</b-form-checkbox
          >
        </b-col>
        <b-col cols="9" v-if="property.hotelParkingAvailable">
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm"> Charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.hotelParkingCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in parkingCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
              <span v-show="property.hotelParkingCharges === 'Additional charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">price per day</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      step="0.01"
                      v-model="property.hotelParkingPrice"
                    />
                  </div></div
              ></span>
            </b-col>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Number of available slots</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    id="id_Hotel_CarParking_Numbers"
                    v-model="property.hotelParkingSlotsCount"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="">
              <b-form-checkbox
                id="id_Hotel_CarParking_OnRequest"
                v-model="property.hotelParkingOnRequest"
                >on request
              </b-form-checkbox>

              <b-form-checkbox
                id="id_Hotel_CarParking_Reservation"
                v-model="property.hotelParkingReservationRequired"
                >reservation required
              </b-form-checkbox>

              <b-form-checkbox size="sm" v-model="property.hotelParkingIsGuarded"
                >guarded
              </b-form-checkbox>

              <b-form-checkbox size="sm" v-model="property.hotelParkingIsUnguarded"
                >unguarded
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.publicCarParkingAvailable"
            >Public car parking
          </b-form-checkbox>
        </b-col>
        <b-col cols="9" v-if="property.publicCarParkingAvailable">
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm"> Charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.publicCarParkingCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in parkingCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
              <span v-show="property.publicCarParkingCharges === 'Additional charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">price per day</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      step="0.01"
                      v-model="property.publicCarParkingPrice"
                    />
                  </div></div
              ></span>
            </b-col>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Number of available slots</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.publicCarParkingSlotsCount"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="">
              <b-form-checkbox size="sm" v-model="property.publicCarParkingIsGuarded"
                >guarded
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.carParkingSideRoadAvailable"
            >by the side of the road
          </b-form-checkbox>
        </b-col>
        <b-col cols="9" v-if="property.carParkingSideRoadAvailable">
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm"> Charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.carParkingSideRoadCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in parkingCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
              <span v-show="property.carParkingSideRoadCharges === 'Additional charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">price per day</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      step="0.01"
                      v-model="property.carParkingSideRoadPrice"
                    />
                  </div></div
              ></span>
            </b-col>
            <b-col cols=""> </b-col>
            <b-col cols="">
              <b-form-checkbox size="sm" v-model="property.carParkingSideRoadLimitedArea"
                >Limited areas
              </b-form-checkbox>
              <b-form-checkbox size="sm" v-model="property.carParkingSideRoadIsGuarded"
                >guarded
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.nearbyCarParkingAvailable"
            >Nearby parking
          </b-form-checkbox>
        </b-col>
        <b-col cols="9" v-if="property.nearbyCarParkingAvailable">
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm"> Charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.nearbyCarParkingCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in parkingCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
              <span v-show="property.nearbyCarParkingCharges === 'Additional charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">price per day</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      step="0.01"
                      v-model="property.nearbyCarParkingPrice"
                    />
                  </div></div
              ></span>
            </b-col>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Number of available slots</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.nearbyCarParkingSlotsCount"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="">
              <b-form-checkbox size="sm" v-model="property.nearbyCarParkingIsGuarded"
                >guarded
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.publicUnderGroundParkingAvailable">
            Public underground car parking
          </b-form-checkbox>
        </b-col>
        <b-col cols="9" v-if="property.publicUnderGroundParkingAvailable">
          <b-row>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm"> Charges</label>
                <div class="col">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.publicUnderGroundParkingCharges"
                  >
                    <option :value="null">Select Option</option>
                    <option v-for="(a, index) in parkingCharges" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
              <span v-show="property.publicUnderGroundParkingCharges === 'Additional charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">price per day</label>
                  <div class="col">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      min="0"
                      step="0.01"
                      v-model="property.publicUnderGroundParkingPrice"
                    />
                  </div></div
              ></span>
            </b-col>
            <b-col cols="">
              <div class="form-group row">
                <label class="col-form-label col-form-label-sm">Number of available slots</label>
                <div class="col">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    min="0"
                    v-model="property.publicUnderGroundParkingSlotsCount"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="">
              <b-form-checkbox size="sm" v-model="property.publicUnderGroundParkingIsGuarded"
                >guarded
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr style="width: 100%" />
      <b-row>
        <h5>Restaurants & Bars</h5>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm"
              >Total number of restaurants available</label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.hotelRestaurantsCount"
              />
            </div>
          </div>
          <p>
            <b-button
              type="button"
              size="sm"
              id="btn-add-restaurant"
              class="pull-right"
              @click="addRestaurant()"
            >
              Add Restaurant
            </b-button>
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-tabs card small style="padding: 12px; border: 1px solid #767676; margin-bottom: 5px">
            <div v-for="(r, index) of restaurants" :key="index">
              <RestaurantInstance
                :restaurantIndex="index"
                :isSelected="r.isSelected"
                @activated="changeTabRestaurant(index)"
                @deleted="deleteRestaurant(index)"
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
            <b-button variant="danger" type="button" @click="confirmDeleteRestaurant()"
              >Yes</b-button
            >
            <b-button type="button" @click="cancelDeleteRestaurant()">No</b-button>
          </div>
        </div>
      </transition>
      <hr />
      <!-- bars-->
      <b-row>
        <b-col cols="12">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm"
              >Total number of Bars available</label
            >
            <div class="col">
              <input
                class="form-control form-control-sm"
                type="number"
                min="0"
                v-model="property.hotelBarsCount"
              />
            </div>
          </div>
          <p>
            <b-button type="button" size="sm" class="pull-right" @click="addBar()">
              Add Bar
            </b-button>
          </p>
          <b-tabs small card style="padding: 12px; border: 1px solid #767676; margin-bottom: 5px">
            <div v-for="(r, index) of bars" :key="index">
              <BarInstance
                :barIndex="index"
                :isSelected="r.isSelected"
                @activated="changeTabBar(index)"
                @deleted="deleteBar(index)"
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
            <p>Are you sure you want to delete this bar?</p>
            <b-button variant="danger" type="button" @click="confirmDeleteBar()">Yes</b-button>
            <b-button type="button" @click="cancelDeleteBar()">No</b-button>
          </div>
          |
        </div>
      </transition>
    </form>
  </div>
</template>
<script>
import BarInstance from "./BarsInstance.vue";
import RestaurantInstance from "./RestaurantInstance.vue";

export default {
  name: "FacilitiesFacts",
  data() {
    return {
      themeChanger: false,
      isLoading: false,
      restaurants: [],
      restaurantToDelete: null,
      showDeleteRestaurant: false,
      bars: [],
      barToDelete: null,
      showDeleteBar: false,
      parkingCharges: ["Inclsuive", "Additional charge", "parking lot per unit"],
      sunLoungersTypes: ["Balinese loungers", "deckchairs", "daybeds"],
      sunLoungersCharges: [
        "deposit required",
        "inclusive",
        "additional charges",
        "only with All inclusive",
      ],
      // parkingCharges: ['Resort', 'Hotel', 'Motel', 'Villa', 'Appartment'],
      errors: [],
    };
  },
  components: {
    BarInstance,
    RestaurantInstance,
  },
  computed: {
    property() {
      return this.$store.getters["facilitiesFactsComp/getProperty"];
    },
    getHotelCharacteristics() {
      return this.$store.getters["options/getHotelCharacteristics"];
    },
    getOutdoorCharacteristics() {
      return this.$store.getters["options/getOutdoorCharacteristics"];
    },
    getOutdoorEquipment() {
      return this.$store.getters["options/getOutdoorEquipment"];
    },
    getHotelFacilityServices() {
      return this.$store.getters["options/getHotelFacilityServices"];
    },
    getHotelCreditCards() {
      return this.$store.getters["options/getHotelCreditCards"];
    },
  },
  created() {},
  methods: {
    async getInfo() {
      this.$store.dispatch("view/load", true);
      const propertyId = this.$route.params.id;
      await this.getFacility(propertyId);
      await this.getRestaurants(propertyId);
      await this.getBars(propertyId);
      this.errors = this.$store.getters["facilitiesFactsComp/getErrors"];
      this.$store.dispatch("view/load", false);
    },
    async getFacility(propertyId) {
      /* console.log("property id is", propertyId); */
      await this.$store
        .dispatch("facilitiesFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("my facility", response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    async getRestaurants(propertyId) {
      /* console.log("property id is", propertyId); */
      await this.$store
        .dispatch("restaurantsFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("my restaurants", response); */
          this.restaurants = this.$store.getters["restaurantsFactsComp/getProperties"];
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    async getBars(propertyId) {
      await this.$store
        .dispatch("barsFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("my bars", response); */
          this.bars = this.$store.getters["barsFactsComp/getProperties"];
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
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
      await this.saveFacility(propertyId);
      await this.saveRestaurants(propertyId);
      await this.saveBars(propertyId);
      this.isLoading = false;
    },
    async saveRestaurants(propertyId) {
      await this.$store
        .dispatch("restaurantsFactsComp/postInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("success response", response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error.data); */
        });
    },
    async saveBars(propertyId) {
      await this.$store
        .dispatch("barsFactsComp/postInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("success response", response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error.data); */
        });
    },
    async saveFacility(propertyId) {
      const infoToUpdate = {
        id: this.property.id,
        hotel: this.property.hotel || propertyId,
        hotel_characteristics: this.property.hotelCharacteristics || [],
        outdoor_characteristics: this.property.outdoorCharacteristics || [],
        outdoor_equipment: this.property.outdoorEquipment || [],
        outdoor_facility_up_on_weather: this.property.outdoorFacilityUpOnWeather,
        restriction_outdoor_late_season: this.property.restrictionOutdoorLateSeason,
        outdoor_area_size: this.property.outdoorAreaSize,
        hotel_beach_front: this.property.hotelBeachFront,
        hotel_beach_separate_road: this.property.hotelBeachSeparateRoad,
        quiet_relaxing: this.property.quietRelaxing,
        outside_the_city: this.property.outsideTheCity,
        has_sun_loungers: this.property.hasSunLoungers,
        sun_loungers_on_beach: this.property.sunLoungersOnBeach,
        sun_loungers_beach_quantity: this.property.sunLoungersBeachQuantity,
        sun_loungers_beach_type: this.property.sunLoungersBeachType,
        sun_loungers_beach_charges: this.property.sunLoungersBeachCharges,
        sun_loungers_beach_is_seasonal: this.property.sunLoungersBeachIsSeasonal,
        sun_loungers_beach_drink_service: this.property.sunLoungersBeachDrinkService,
        sun_loungers_on_pool: this.property.sunLoungersOnPool,
        sun_loungers_pool_quantity: this.property.sunLoungersPoolQuantity,
        sun_loungers_pool_type: this.property.sunLoungersPoolType,
        sun_loungers_pool_charges: this.property.sunLoungersPoolCharges,
        sun_loungers_pool_is_seasonal: this.property.sunLoungersPoolIsSeasonal,
        sun_loungers_pool_drink_service: this.property.sunLoungersPoolDrinkService,
        sun_loungers_on_garden: this.property.sunLoungersOnGarden,
        sun_loungers_garden_quantity: this.property.sunLoungersGardenQuantity,
        sun_loungers_garden_type: this.property.sunLoungersGardenType,
        sun_loungers_garden_charges: this.property.sunLoungersGardenCharges,
        sun_loungers_garden_is_seasonal: this.property.sunLoungersGardenIsSeasonal,
        sun_loungers_garden_drink_service: this.property.sunLoungersGardenDrinkService,
        sun_loungers_on_lake: this.property.sunLoungersOnLake,
        sun_loungers_lake_quantity: this.property.sunLoungersLakeQuantity,
        sun_loungers_lake_type: this.property.sunLoungersLakeType,
        sun_loungers_lake_charges: this.property.sunLoungersLakeCharges,
        sun_loungers_lake_is_seasonal: this.property.sunLoungersLakeIsSeasonal,
        sun_loungers_lake_drink_service: this.property.sunLoungersLakeDrinkService,
        sun_loungers_on_sun_terrace: this.property.sunLoungersOnSunTerrace,
        sun_loungers_sun_terrace_quantity: this.property.sunLoungersSunTerraceQuantity,
        sun_loungers_sun_terrace_type: this.property.sunLoungersSunTerraceType,
        sun_loungers_sun_terrace_charges: this.property.sunLoungersSunTerraceCharges,
        sun_loungers_sun_terrace_is_seasonal: this.property.sunLoungersSunTerraceIsSeasonal,
        sun_loungers_sun_terrace_drink_service: this.property.sunLoungersSunTerraceDrinkService,
        has_parasols: this.property.hasParasols,
        parasols_at_beach: this.property.parasolsAtBeach,
        parasols_at_beach_quantity: this.property.parasolsAtBeachQuantity,
        parasols_at_beach_charges: this.property.parasolsAtBeachCharges,
        parasols_at_beach_seasonal: this.property.parasolsAtBeachSeasonal,
        parasols_at_beach_local_supplier: this.property.parasolsAtBeachLocalSupplier,
        parasols_at_pool: this.property.parasolsAtPool,
        parasols_at_pool_quantity: this.property.parasolsAtPoolQuantity,
        parasols_at_pool_charges: this.property.parasolsAtPoolCharges,
        parasols_at_pool_seasonal: this.property.parasolsAtPoolSeasonal,
        parasols_at_garden: this.property.parasolsAtGarden,
        parasols_at_garden_quantity: this.property.parasolsAtGardenQuantity,
        parasols_at_garden_charges: this.property.parasolsAtGardenCharges,
        parasols_at_garden_seasonal: this.property.parasolsAtGardenSeasonal,
        parasols_at_lake: this.property.parasolsAtLake,
        parasols_at_lake_quantity: this.property.parasolsAtLakeQuantity,
        parasols_at_lake_charges: this.property.parasolsAtLakeCharges,
        parasols_at_lake_seasonal: this.property.parasolsAtLakeSeasonal,
        parasols_at_lake_local_supplier: this.property.parasolsAtLakeLocalSupplier,
        parasols_sun_terrace: this.property.parasolsSunTerrace,
        parasols_sun_terrace_quantity: this.property.parasolsSunTerraceQuantity,
        parasols_sun_terrace_charges: this.property.parasolsSunTerraceCharges,
        parasols_sun_terrace_seasonal: this.property.parasolsSunTerraceSeasonal,
        has_towels: this.property.hasTowels,
        towels_on_beach: this.property.towelsOnBeach,
        towels_on_beach_charges: this.property.towelsOnBeachCharges,
        towels_on_beach_additional_charge: this.property.towelsOnBeachAdditionalCharge,
        towels_on_pool: this.property.towelsOnPool,
        towels_on_pool_charges: this.property.towelsOnPoolCharges,
        towels_on_pool_additional_charge: this.property.towelsOnPoolAdditionalCharge,
        hotel_has_swimming_pool: this.property.hotelHasSwimmingPool,
        swimming_pools_number: this.property.swimmingPoolsNumber,
        swimming_pools_total_size: this.property.swimmingPoolsTotalSize,
        swimming_pools_is_heated: this.property.swimmingPoolsIsHeated,
        swimming_pools_coolable: this.property.swimmingPoolsCoolable,
        swimming_pools_is_adult_only: this.property.swimmingPoolsIsAdultOnly,
        swimming_pools_type: this.property.swimmingPoolsType,
        swimming_pools_has_kids: this.property.swimmingPoolsHasKids,
        swimming_pools_on_weather: this.property.swimmingPoolsOnWeather,
        swimming_pools_seasonal: this.property.swimmingPoolsSeasonal,
        hotel_has_aqua_park: this.property.hotelHasAquaPark,
        aqua_water_heatable: this.property.aquaWaterHeatable,
        aqua_water_coolable: this.property.aquaWaterCoolable,
        aqua_park_slides_count: this.property.aquaParkSlidesCount,
        aqua_park_charges: this.property.aquaParkCharges,
        aqua_park_price: this.property.aquaParkPrice,
        aqua_park_price_currency: this.property.aquaParkPriceCurrency,
        aqua_park_size: this.property.aquaParkSize,
        aqua_park_water: this.property.aquaParkWater,
        hotel_buildings_count: this.property.hotelBuildingsCount,
        hotel_bungalows_count: this.property.hotelBungalowsCount,
        hotel_villas_count: this.property.hotelVillasCount,
        hotel_total_amount_units: this.property.hotelTotalAmountUnits,
        hotel_units_wheelchair: this.property.hotelUnitsWheelchair,
        hotel_facility_services: this.property.hotelFacilityServices || [],
        hotel_credit_cards: this.property.hotelCreditCards || [],
        hotel_lifts_available: this.property.hotelLiftsAvailable,
        hotel_lifts_count: this.property.hotelLiftsCount,
        hotel_lifts_panoramic_avail: this.property.hotelLiftsPanoramicAvail,
        hotel_lifts_panoramic_count: this.property.hotelLiftsPanoramicCount,
        hotel_reception_available: this.property.hotelReceptionAvailable,
        hotel_reception_all_day: this.property.hotelReceptionAllDay,
        hotel_has_lobby_area: this.property.hotelHasLobbyArea,
        hotel_has_laundry_cleaning: this.property.hotelHasLaundryCleaning,
        hotel_laundry_charges: this.property.hotelLaundryCharges,
        hotel_wifi_check: this.property.hotelWifiCheck,
        hotel_wifi_charges: this.property.hotelWifiCharges,
        hotel_wifi_locations: this.property.hotelWifiLocations,
        shuttle_within_hotel: this.property.shuttleWithinHotel,
        hotel_safe_check: this.property.hotelSafeCheck,
        hotel_safe_charges: this.property.hotelSafeCharges,
        hotel_safe_price: this.property.hotelSafePrice,
        hotel_safe_price_currency: this.property.hotelSafePriceCurrency,
        hotel_has_disco_club: this.property.hotelHasDiscoClub,
        hotel_disco_club_location: this.property.hotelDiscoClubLocation,
        hotel_disco_club_entrance: this.property.hotelDiscoClubEntrance,
        hotel_disco_club_drinks: this.property.hotelDiscoClubDrinks,
        hotel_parking_available: this.property.hotelParkingAvailable,
        hotel_parking_charges: this.property.hotelParkingCharges,
        hotel_parking_price: this.property.hotelParkingPrice,
        hotel_parking_slots_count: this.property.hotelParkingSlotsCount,
        hotel_parking_on_request: this.property.hotelParkingOnRequest,
        hotel_parking_reservation_required: this.property.hotelParkingReservationRequired,
        hotel_parking_is_guarded: this.property.hotelParkingIsGuarded,
        hotel_parking_is_unguarded: this.property.hotelParkingIsUnguarded,
        public_car_parking_available: this.property.publicCarParkingAvailable,
        public_car_parking_charges: this.property.publicCarParkingCharges,
        public_car_parking_price: this.property.publicCarParkingPrice,
        public_car_parking_slots_count: this.property.publicCarParkingSlotsCount,
        public_car_parking_is_guarded: this.property.publicCarParkingIsGuarded,
        car_parking_side_road_available: this.property.carParkingSideRoadAvailable,
        car_parking_side_road_charges: this.property.carParkingSideRoadCharges,
        car_parking_side_road_price: this.property.carParkingSideRoadPrice,
        car_parking_side_road_limited_area: this.property.carParkingSideRoadLimitedArea,
        car_parking_side_road_is_guarded: this.property.carParkingSideRoadIsGuarded,
        nearby_car_parking_available: this.property.nearbyCarParkingAvailable,
        nearby_car_parking_charges: this.property.nearbyCarParkingCharges,
        nearby_car_parking_price: this.property.nearbyCarParkingPrice,
        nearby_car_parking_slots_count: this.property.nearbyCarParkingSlotsCount,
        nearby_car_parking_is_guarded: this.property.nearbyCarParkingIsGuarded,
        public_under_ground_parking_available: this.property.publicUnderGroundParkingAvailable,
        public_under_ground_parking_charges: this.property.publicUnderGroundParkingCharges,
        public_under_ground_parking_price: this.property.publicUnderGroundParkingPrice,
        public_under_ground_parking_slots_count: this.property.publicUnderGroundParkingSlotsCount,
        public_under_ground_parking_is_guarded: this.property.publicUnderGroundParkingIsGuarded,
        hotel_restaurants_count: this.property.hotelRestaurantsCount,
        hotel_bars_count: this.property.hotelBarsCount,
        hotel_ground_size: this.property.hotelGroundSize,
        hotel_has_cafes: this.property.hotelHasCafes,
        hotel_cafes_number: this.property.hotelCafesNumber,
        hotel_doctor_consult: this.property.hotelDoctorConsult,
        hotel_doctor_consult_charges: this.property.hotelDoctorConsultCharges,
        hotel_nearest_atm: this.property.hotelNearestAtm,
      };
      await this.$store
        .dispatch("facilitiesFactsComp/postInfo", infoToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("success response", response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error.data); */
        });
    },
    validate() {
      const newValidations = [];
      if (this.property.hotelCharacteristics.length < 1) {
        newValidations.push("Hotel characteristics required.");
      }
      this.$store.dispatch("facilitiesFactsComp/validate", newValidations);
      this.errors = this.$store.getters["facilitiesFactsComp/getErrors"];
      /* console.log(this.errors); */
    },
    changeTabRestaurant(currentRestaurant) {
      this.restaurants.forEach((restaurant) => {
        restaurant.isSelected = this.restaurants.indexOf(restaurant) === currentRestaurant;
      });
    },
    changeTabBar(currentBar) {
      this.bars.forEach((bar) => {
        bar.isSelected = this.bars.indexOf(bar) === currentBar;
      });
    },
    deleteRestaurant(restaurantId) {
      /* console.log("deleted", restaurantId); */
      this.restaurantToDelete = restaurantId;
      this.showDeleteRestaurant = true;
    },
    deleteBar(barId) {
      /* console.log("deleted", barId); */
      this.barToDelete = barId;
      this.showDeleteBar = true;
    },
    confirmDeleteRestaurant() {
      this.$store.dispatch("restaurantsFactsComp/deleteRestaurant", this.restaurantToDelete);
      this.restaurants = this.$store.getters["restaurantsFactsComp/getProperties"];
      this.showDeleteRestaurant = false;
    },
    confirmDeleteBar() {
      this.$store.dispatch("barsFactsComp/deleteBar", this.barToDelete);
      this.bars = this.$store.getters["barsFactsComp/getProperties"];
      this.showDeleteBar = false;
    },
    cancelDeleteRestaurant() {
      this.showDeleteRestaurant = false;
    },
    cancelDeleteBar() {
      this.showDeleteBar = false;
    },
    addRestaurant() {
      this.$store.dispatch("restaurantsFactsComp/addNewRestaurant");
      this.restaurants = this.$store.getters["restaurantsFactsComp/getProperties"];
    },
    addBar() {
      this.$store.dispatch("barsFactsComp/addNewBar");
      this.bars = this.$store.getters["barsFactsComp/getProperties"];
    },
  },
};
</script>
