<template>
  <div class="container">
    <div class="justify-content-start input-group-sm">
      <form class="form-horizontal" v-on:submit.prevent @submit="save()">
        <h4>Main Info</h4>
        <!-- main info -->
        <p class="reqastr" v-if="errors.length > 0">
          <b>Please correct the following error(s):</b>
        </p>

        <ul>
          <li class="reqastr" v-for="(error, i) in errors" :key="i" :value="error">
            {{ error }}
          </li>
        </ul>

        <b-row>
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm">Hotel Name</label>
              <div class="col-sm-9">
                <input
                  v-model="selectedHotel.hotelName"
                  type="text"
                  class="form-control form-control-sm"
                  disabled
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm"
                >Accommodation Type<span class="reqastr">*</span></label
              >
              <div class="col">
                <select class="form-control form-control-sm" v-model="property.accommodationType">
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
                >Rating<span class="reqastr">*</span></label
              >
              <div class="col">
                <select class="form-control form-control-sm" v-model="property.rating">
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
        <!-- address info  -->
        <b-row>
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm">Country</label>
              <div class="col-sm-9">
                <input
                  :value="selectedHotel.country"
                  type="text"
                  class="form-control form-control-sm"
                  disabled
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm">State</label>
              <div class="col-sm-9">
                <input
                  :value="selectedHotel.state"
                  type="text"
                  class="form-control form-control-sm"
                  disabled
                />
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm">City</label>
              <div class="col">
                <input
                  :value="selectedHotel.city"
                  type="text"
                  class="form-control form-control-sm"
                  disabled
                />
              </div>
            </div>
          </b-col>
          <b-col cols="9">
            <div class="form-group row">
              <label class="col-sm-2 col-form-label col-form-label-sm"
                >Address<span class="reqastr">*</span></label
              >
              <div class="col">
                <input
                  v-model.trim="property.address"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm"
                >Zip Code<span class="reqastr">*</span></label
              >
              <div class="col">
                <input
                  v-model.trim="property.zipCode"
                  type="text"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- contacts info -->
        <b-row>
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Email<span class="reqastr">*</span></label
              >
              <div class="col">
                <input
                  v-model.trim="property.email"
                  type="email"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Phone<span class="reqastr">*</span></label
              >
              <div class="col">
                <input
                  v-model.trim="property.phone"
                  type="tel"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm">Fax</label>
              <div class="col">
                <input
                  v-model.trim="property.fax"
                  type="tel"
                  class="form-control form-control-sm"
                />
              </div></div
          ></b-col>
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm">Longitude</label>
              <div class="col">
                <input
                  v-model.trim="property.longitude"
                  type="double"
                  style="min-width: 120px"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm">Latitude</label>
              <div class="col-sm-9">
                <input
                  v-model.trim="property.latitude"
                  type="double"
                  style="min-width: 120px"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- Check in data -->
        <b-row>
          <b-col cols="">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">Minimum Age Allowed</label>
              <b-icon
                icon="question-circle-fill"
                scale="0.8"
                variant="primary"
                aria-label="Help"
                title="Must be set in case Hotel has (Minimum Age allowed) or (Adult Only hotel)"
              ></b-icon>
              <div class="col-sm-4">
                <input
                  v-model.trim="property.minimumAgeAllowed"
                  type="number"
                  max="120"
                  min="0"
                  class="form-control form-control-sm"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm"
                >Check In<span class="reqastr">*</span></label
              >
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="time"
                  v-model="property.checkInTime"
                  placeholder="12:00"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm"
                >Check Out<span class="reqastr">*</span></label
              >
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="time"
                  v-model="property.checkOutTime"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- prohibited alcohol in holy days -->
        <b-row>
          <b-col cols="8">
            <b-form-checkbox v-model="property.alcoholProhibitedOnSpecialHolidays">
              <span> Serving alcohol is prohobited on special holy days</span>
            </b-form-checkbox>
          </b-col>
        </b-row>
        <!-- Other charges  -->
        <b-row>
          <b-col cols="4">
            <b-form-checkbox v-model="property.depositRequired" alt="deposit required">
              Deposit required</b-form-checkbox
            >
          </b-col>
          <b-col cols="4" v-if="property.depositRequired">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm"
                >Required for<span class="reqastr">*</span></label
              >
              <div class="col-sm-6">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.depositRequiredFor"
                  placeholder="Deposit for.."
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- partner hotel data -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.checkInPartnerHotel">
              Check-in in partner hotel</b-form-checkbox
            >
          </b-col>
        </b-row>
        <br />
        <b-row v-if="property.checkInPartnerHotel">
          <b-col cols="5">
            <div class="form-group row">
              <label class="col-sm-5 col-form-label col-form-label-sm ananas-bold"
                >Partner Hotel name<span class="reqastr">*</span></label
              >
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.partnerHotelName"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label col-form-label-sm"
                >Distance<span class="reqastr">*</span></label
              >
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="number"
                  step="1"
                  onkeydown="if(event.key==='.'){event.preventDefault();}"
                  oninput="event.target.value = event.target.value.replace(/[^0-9]*/g,'');"
                  v-model="property.partnerHotelDistance"
                  placeholder="5"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="3">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label col-form-label-sm"
                >Unit<span class="reqastr">*</span></label
              >
              <div class="col-sm-6">
                <select
                  class="form-control form-control-sm"
                  v-model="property.partnerHotelDistanceUnit"
                >
                  <option :value="null">Select type</option>
                  <option value="meters">meters</option>
                  <option value="minutes">minutes</option>
                </select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <!-- pets -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.petsAllowed">Pets allowed</b-form-checkbox>
          </b-col>
          <b-col cols="9" v-if="property.petsAllowed">
            <b-row>
              <b-col cols="4">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm ananas-bold"
                    >Charges<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-9">
                    <select class="form-control form-control-sm" v-model="property.petsCharges">
                      <option :value="null" selected>--Select Rating--</option>
                      <option value="Inclusive">Inclusive</option>
                      <option value="Additional Charge">Additional Charge</option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.petsCharges === 'Additional Charge'">
                <div class="form-group row">
                  <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold"
                    >cost per day<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.petschargesPrice"
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.petschargesPrice >= '0.1'">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm"
                    >currency<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.petsChargeCurrency"
                    >
                      <option value="" selected>Select currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr />
        <!-- tax applicable -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.tax"> Tax applicable</b-form-checkbox>
          </b-col>
          <b-col cols="9">
            <b-row v-if="property.tax">
              <b-col cols="4">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm"
                    >Charges<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-9">
                    <select class="form-control form-control-sm" v-model="property.taxCharges">
                      <option :value="null" selected>Select Option</option>
                      <option value="Inclusive">Inclusive</option>
                      <option value="Additional Charge">Additional Charge</option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.taxCharges === 'Additional Charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm"
                    >cost per person/day<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="double"
                      v-model="property.chargesPersonPerNight"
                      placeholder="14.00"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.chargesPersonPerNight > 0">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm"
                    >currency<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.taxCurrency">
                      <option :value="null" selected>Select currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row></b-col
          >
        </b-row>
        <hr />
        <!-- tourist tax -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.touristTax" alt="Tourist taxes applicable">
              Tourist tax applicable</b-form-checkbox
            >
          </b-col>
          <b-col cols="9">
            <b-row v-if="property.touristTax">
              <b-col cols="4">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">
                    Charges<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-9">
                    <select class="form-control form-control-sm" v-model="property.touristCharges">
                      <option :value="null" selected>Select Option</option>
                      <option value="Inclusive">Inclusive</option>
                      <option value="Additional Charge">Additional Charge</option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.touristCharges === 'Additional Charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm"
                    >Cost per person/day<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="double"
                      step="0.1"
                      v-model="property.touristChargesPersonPerNight"
                      placeholder="14"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.touristChargesPersonPerNight > 0.1">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm"
                    >currency<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.touristCurrency">
                      <option :value="null" selected>Select currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr />
        <!-- children tax -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.childTax" alt="Children tax applicable">
              Children tax</b-form-checkbox
            >
          </b-col>
          <b-col sm="9">
            <b-row v-if="property.childTax">
              <b-col cols="4">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">
                    Charges <span class="reqastr">*</span></label
                  >
                  <div class="col-sm-9">
                    <select class="form-control form-control-sm" v-model="property.childCharges">
                      <option :value="null" selected>Select Option</option>
                      <option value="Inclusive">Inclusive</option>
                      <option value="Additional Charge">Additional Charge</option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.childCharges === 'Additional Charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm"
                    >Cost per person/day<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="double"
                      v-model="property.childChargesPerNight"
                      placeholder="14"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.childChargesPerNight > 0.1">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm"
                    >currency<span class="reqastr">* </span></label
                  >
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.childCurrency">
                      <option :value="null" selected>Select currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col cols="12">
                <b-row>
                  <b-col cols="4">
                    <div class="form-group row">
                      <label class="col-form-label col-form-label-sm">
                        Age from<span class="reqastr">*</span></label
                      >
                      <div class="col-sm-6">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          v-model="property.childTaxFrom"
                          placeholder="4"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="4">
                    <div class="form-group row">
                      <label class="col-form-label col-form-label-sm">
                        Age to <span class="reqastr">*</span></label
                      >
                      <div class="col-sm-6">
                        <input
                          class="form-control form-control-sm"
                          type="number"
                          v-model="property.childTaxTo"
                          placeholder="16"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr />
        <!-- resort fees -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.resortFees"> Resort fees applicable</b-form-checkbox>
          </b-col>
          <b-col cols="9">
            <b-row v-if="property.resortFees">
              <b-col cols="4">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm">
                    Charges <span class="reqastr">* </span>
                  </label>
                  <div class="col-sm-9">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.resortFeesCharges"
                    >
                      <option :value="null" selected>Select Option</option>
                      <option value="Inclusive">Inclusive</option>
                      <option value="Additional Charge">Additional Charge</option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.resortFeesCharges === 'Additional Charge'">
                <div class="form-group row">
                  <label class="col-form-label col-form-label-sm"
                    >Cost per person/day<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.resortFeesChargesPerNight"
                      placeholder="10.5"
                    />
                  </div>
                </div>
              </b-col>
              <b-col cols="4" v-if="property.resortFeesChargesPerNight > 0.1">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm"
                    >currency<span class="reqastr">*</span></label
                  >
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.resortFeesCurrency"
                    >
                      <option :value="null" selected>Select currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="3">
            <b-form-checkbox v-model="property.registrationFee">
              Registeration fees
            </b-form-checkbox>
          </b-col>
          <b-col cols="2">
            <b-form-checkbox v-model="property.lateCheckOut"> Late check-out </b-form-checkbox>
          </b-col>
          <b-col cols="2" v-if="property.lateCheckOut">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">Price</label>
              <div class="col-sm-9">
                <input
                  type="number"
                  class="form-control form-control-sm"
                  placeholder="14.00"
                  step="0.1"
                  min="0"
                  v-model="property.lateCheckOutPrice"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainInformation",
  components: {},
  data() {
    return {
      value: null,
      options: ["list", "of", "options"],
      isLoading: false,
      property: this.$store.getters["mainInfo/getProperty"],
      accommodationTypes: ["Resort", "Hotel", "Motel", "Villa", "Appartment"],
      errors: [],
    };
  },
  computed: {
    country() {
      const countries = this.$store.getters["countries/getCountries"];
      if (!countries) {
        return "";
      }
      return countries.find((c) => c.iso2 === this.selectedHotel.country);
    },
    state() {
      const states = this.$store.getters["countries/getStates"];
      if (!states) {
        return "";
      }
      return states.find((s) => s.iso2 === this.selectedHotel.state);
    },
    selectedTab() {
      return this.$store.getters["addFacts/getTab"];
    },
    selectedHotel() {
      const propertyId = this.$route.params.id;
      const properties = this.$store.getters["property/getProperties"];
      const filteredData = properties.filter((item) => item.id === parseInt(propertyId, 10));
      return (
        filteredData[0] || {
          hotelName: "",
          country: "",
          city: "",
          district: "",
        }
      );
    },
    currencyOptions() {
      return this.$store.getters["options/currencyOptions"];
    },
    cPetsCharges() {
      return this.property.petsAllowed ? this.property.petsCharges : null;
    },
    cPetsPrice() {
      return this.property.petsAllowed && this.property.petsCharges === "Additional Charge"
        ? this.property.petschargesPrice
        : null;
    },
    cPetsCurrency() {
      return this.property.petsAllowed && this.property.petsCharges === "Additional Charge"
        ? this.property.petsChargeCurrency
        : null;
    },
    cPartnerHotel() {
      return this.property.checkInPartnerHotel ? this.property.partnerHotelName : null;
    },
    cPartnerHotelDistance() {
      return this.property.checkInPartnerHotel ? this.property.partnerHotelDistance : null;
    },
    cPartnerHotelDistnaceUnit() {
      return this.property.checkInPartnerHotel ? this.property.partnerHotelDistanceUnit : null;
    },
    cDepositRequiredFor() {
      return this.property.depositRequired ? this.property.depositRequiredFor : null;
    },
    cTaxCharges() {
      return this.property.tax ? this.property.taxCharges : null;
    },
    cTaxChargesPerNight() {
      return this.property.tax && this.property.taxCharges === "Additional Charge"
        ? this.property.chargesPersonPerNight
        : null;
    },
    cTaxCurrency() {
      return this.property.tax && this.property.taxCharges === "Additional Charge"
        ? this.property.taxCurrency
        : null;
    },
    cTouristTaxCharges() {
      return this.property.touristTax ? this.property.touristCharges : null;
    },
    cTouristTaxChargesPerNight() {
      return this.property.touristTax && this.property.touristCharges === "Additional Charge"
        ? this.property.touristChargesPersonPerNight
        : null;
    },
    cTouristTaxCurrency() {
      return this.property.touristTax && this.property.touristCharges === "Additional Charge"
        ? this.property.touristCurrency
        : null;
    },
    cChildTaxCharges() {
      return this.property.childTax ? this.property.childCharges : null;
    },
    cChildTaxChargesPerNight() {
      return this.property.childTax && this.property.childCharges === "Additional Charge"
        ? this.property.childChargesPerNight
        : null;
    },
    cChildTaxCurrency() {
      return this.property.childTax && this.property.childCharges === "Additional Charge"
        ? this.property.childCurrency
        : null;
    },
    cResortCharges() {
      return this.property.resortFees ? this.property.resortFeesCharges : null;
    },
    cResortChargesPerNight() {
      return this.property.resortFees && this.property.resortFeesCharges === "Additional Charge"
        ? this.property.resortFeesChargesPerNight
        : null;
    },
    cResortCurrency() {
      return this.property.resortFees && this.property.resortFeesCharges === "Additional Charge"
        ? this.property.resortFeesCurrency
        : null;
    },
    cLateCheckoutPrice() {
      return this.property.lateCheckOut ? this.property.lateCheckOutPrice : null;
    },
  },
  created() {
    const properties = this.$store.getters["property/getProperties"];
    if (properties.length === 0) {
      this.getProperties();
    }
  },
  methods: {
    async getProperties() {
      this.$store.dispatch("view/load", true);
      await this.$store
        .dispatch("property/getInfo")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.$store.dispatch("view/load", false);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.$store.dispatch("view/load", false);
        });
    },
    convertTimeFormat(inputTime) {
      const date = new Date(inputTime);
      const resultDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
      const resultTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`;
      return `${resultDate}T${resultTime}Z`;
    },
    getInfo() {
      const propertyId = this.$route.params.id;
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("mainInfo/getInfo", propertyId)
        .then(() => {
          this.property = this.$store.getters["mainInfo/getProperty"];
          this.getCountries();
          this.getStates();
          this.getCities();
          this.errors = this.$store.getters["mainInfo/getErrors"];
          this.$store.dispatch("view/load", false);
        })
        .catch(() => {
          this.$store.dispatch("view/load", false);
        });
    },
    async getCountries() {
      await this.$store.dispatch("countries/retrieveCountries");
    },
    async getStates() {
      const countryCode = this.selectedHotel.country;
      await this.$store.dispatch("countries/retrieveStates", countryCode);
    },
    async getCities() {
      const countryCode = this.selectedHotel.country;
      const stateCode = this.selectedHotel.state;
      /* console.log(this.property); */
      await this.$store.dispatch("countries/retrieveCities", {
        countryCode,
        stateCode,
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
        accommodation_type: this.property.accommodationType,
        rating: this.property.rating,
        address: this.property.address,
        email: this.property.email,
        phone: this.property.phone,
        zip_code: this.property.zipCode,
        fax: this.property.fax,
        longitude: this.property.longitude,
        latitude: this.property.latitude,
        pets_allowed: this.property.petsAllowed,
        pets_charges: this.cPetsCharges,
        pets_price: this.cPetsPrice,
        pets_currency: this.cPetsCurrency,
        minimum_age_allowed: this.property.minimumAgeAllowed,
        check_in_time: this.property.checkInTime,
        check_out_time: this.property.checkOutTime,
        check_in_partner_hotel: this.property.checkInPartnerHotel,
        partner_hotel: this.cPartnerHotel,
        partner_hotel_distance: this.cPartnerHotelDistance,
        partner_hotel_distance_unit: this.cPartnerHotelDistnaceUnit,
        alcohol_prohibited_on_special_holidays: this.property.alcoholProhibitedOnSpecialHolidays,
        deposit_required: this.property.depositRequired,
        deposit_required_for: this.cDepositRequiredFor,
        tax: this.property.tax,
        tax_charges: this.cTaxCharges,
        charges_person_per_night: this.cTaxChargesPerNight,
        tax_currency: this.cTaxCurrency,
        tourist_tax: this.property.touristTax,
        tourist_charges: this.cTouristTaxCharges,
        tourist_charges_person_per_night: this.cTouristTaxChargesPerNight,
        tourist_currency: this.cTouristTaxCurrency,
        child_tax: this.property.childTax,
        child_charges: this.cChildTaxCharges,
        child_charges_per_night: this.cChildTaxChargesPerNight,
        child_currency: this.cChildTaxCurrency,
        age_from: this.property.childTaxFrom,
        age_to: this.property.childTaxTo,
        resort_fee: this.property.resortFees,
        resort_charges: this.cResortCharges,
        resort_charges_per_night: this.cResortChargesPerNight,
        resort_currency: this.cResortCurrency,
        registration_fee: this.property.registrationFee,
        late_check_out: this.property.lateCheckOut,
        late_check_out_price: this.cLateCheckoutPrice,
      };
      await this.$store
        .dispatch("mainInfo/postInfo", infoToUpdate)
        .then(() => {
          this.isLoading = false;
          this.property = this.$store.getters["mainInfo/getProperty"];
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    validate() {
      const newValidations = [];
      if (!this.property.accommodationType) {
        /* console.log(this.property.accommodationType); */
        newValidations.push("Accommodation type required.");
      }
      if (!this.property.rating) {
        newValidations.push("Star rating required.");
      }
      if (!this.property.address || this.property.address === "") {
        newValidations.push("Address required.");
      }
      if (!this.property.email) {
        newValidations.push("Email required");
      }
      if (!this.property.phone) {
        newValidations.push("Phone required");
      }
      if (!this.property.zipCode) {
        newValidations.push("Zip code required");
      }
      if (this.property.depositRequired && !this.property.depositRequired) {
        newValidations.push("Deposit requirement details");
      }
      if (this.property.checkInPartnerHotel && !this.property.partnerHotelName) {
        newValidations.push("Partner hotel's name required");
      }
      if (this.property.partnerHotelDistance > 0 && !this.property.partnerHotelDistanceUnit) {
        newValidations.push("Partner hotel's distance unit required");
      }
      if (this.property.petsAllowed && !this.property.petsCharges) {
        newValidations.push("Pets charges required");
      }
      if (this.property.petschargesPrice >= 0.1 && this.property.petsChargeCurrency === "") {
        newValidations.push("Pets price currency required");
      }
      if (this.property.tax && !this.property.taxCharges) {
        newValidations.push("Tax charges required");
      }
      if (this.property.taxCharges && !this.property.chargesPersonPerNight) {
        newValidations.push("Tax price required");
      }
      if (this.property.chargesPersonPerNight >= 0.1 && this.property.taxCurrency === null) {
        newValidations.push("Tax currency required");
      }
      if (this.property.touristTax && !this.property.touristCharges) {
        newValidations.push("Tourist Tax charges required");
      }
      if (
        this.property.touristCharges === "Additional Charge" &&
        !this.property.touristChargesPersonPerNight
      ) {
        newValidations.push("Tourist Tax price required");
      }
      if (
        this.property.touristChargesPersonPerNight >= 0.1 &&
        this.property.touristCurrency === null
      ) {
        newValidations.push("Tourist Tax currency required");
      }
      if (this.property.childTax && !this.property.childCharges) {
        newValidations.push("Children Tax charges required");
      }
      if (this.property.childCharges && !this.property.childChargesPerNight) {
        newValidations.push("Children Tax price required");
      }
      if (this.property.childChargesPerNight >= 0.1 && this.property.childCurrency === null) {
        newValidations.push("Children Tax currency required");
      }
      if (this.property.childTax && !this.property.childTaxFrom) {
        newValidations.push("Children Tax Age-From required");
      }
      if (this.property.childTax && !this.property.childTaxTo) {
        newValidations.push("Children Tax Age-To required");
      }
      if (this.property.resortFees && !this.property.resortFeesCharges) {
        newValidations.push("Tourist Tax charges required");
      }
      if (this.property.resortFeesCharges && !this.property.resortFeesChargesPerNight) {
        newValidations.push("Tax price required");
      }
      if (
        this.property.resortFeesChargesPerNight >= 0.1 &&
        this.property.resortFeesCurrency === null
      ) {
        newValidations.push("Tourist Tax currency required");
      }
      /*       if (this.property.checkInTime > this.property.checkOutTime) {
        newValidations.push("Invalid check-out time");
      } */

      this.$store.dispatch("mainInfo/validate", newValidations);
      this.errors = this.$store.getters["mainInfo/getErrors"];
    },
  },
  // watch: {
  //   $route(to, from) {
  // console.log('changed from', from, 'to', to);
  //   },
  // },
};
</script>
