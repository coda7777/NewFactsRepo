<template>
  <div class="container">
    <p class="text-danger" v-if="errors.length > 0">
      <b>Please correct the following error(s):</b>
    </p>

    <ul>
      <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
        {{ error }}
      </li>
    </ul>
    <h4>Additional Info</h4>
    <form v-on:submit.prevent @submit="save()">
      <b-form-textarea
        v-model="property.additionalFreeText"
        rows="5"
        placeholder="Free formate infotmation, Notes, or Options to specify for customers."
        cols="25"
      >
      </b-form-textarea>
      <hr style="height: 2px; border-width: 0; color: gray; background-color: orange" />
      <!-- Health and Hygiene -->
      <h5><u>Health safety & Hygiene</u></h5>
      <div>
        <b-tabs pills card small vertical>
          <b-tab title="Check-in" active>
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthCheckIn"
                :options="checkInHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Restaurants">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthRestaurant"
                :options="restaurantHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Public areas">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthPublicAreas"
                :options="publicAreasHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Rooms">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthRooms"
                :options="roomsHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Pool Area">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthPoolArea"
                :options="poolHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Fitness and Wellness">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthFitnessArea"
                :options="fitnessHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Children and playground">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthChildrenArea"
                :options="childrenHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Animation">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthAnimation"
                :options="animationHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Staff">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                size="sm"
                v-model="property.healthStaff"
                :options="staffHealthOptions"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab title="Additional">
            <b-form-group label="Choose all applicable options" v-slot="{ ariaDescribedby }">
              <b-form-checkbox
                v-model="property.healthAdditional"
                v-for="option in additionalHealthOptions"
                :key="option"
                :value="option"
                :aria-describedby="ariaDescribedby"
                name="flavour-3a"
                stacked
              >
                {{ option }}
              </b-form-checkbox>
            </b-form-group>
            <div class="col-pine-4">
              <b-form-checkbox
                value="Room remains free for X hours after change of bed sheets"
                v-model="property.healthAdditional"
              >
                Room remains free for X hours after change of bed sheets
              </b-form-checkbox>
              <br />
            </div>
          </b-tab>
        </b-tabs>
      </div>

      <hr style="height: 2px; border-width: 0; color: gray; background-color: orange" />

      <!-- Admissions and includes -->
      <b-row>
        <b-col>
          <h5>Admissions</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox size="sm" v-model="property.hotelAdditionalAdmissions">
            Admissions offered
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <div v-if="property.hotelAdditionalAdmissions">
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalAdmissionLeisurePark">
              admission to the leisure park
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalAdmissionLeisurePark">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionFrequencyOfLeisurePark"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionCountPerLeisurePark"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalAdmissionWaterPark">
              admission to the water park
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalAdmissionWaterPark">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionFrequencyOfWaterPark"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionCountPerWaterPark"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalAdmissionGreenFees">
              Green fees
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalAdmissionGreenFees">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionFrequencyOfGreenFees"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionCountPerGreenFees"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalAdmissionSkiPass">
              Ski Pass
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalAdmissionSkiPass">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionFrequencyOfSkiPass"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionCountPerSkiPass"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalAdmissionSpaVoucher"
              >Spa voucher</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalAdmissionSpaVoucher">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionFrequencyOfSpaVoucher"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionCountPerSpaVoucher"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalAdmissionThermalPass">
              Thermal Pass
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalAdmissionThermalPass">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionFrequencyOfThermalPass"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalAdmissionCountPerThermalPass"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
      </div>
      <b-row>
        <b-col>
          <h5>Drinks</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox size="sm" v-model="property.hotelAdditionalDrinks">
            Drinks offered
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <div v-if="property.hotelAdditionalDrinks">
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksChampagne">
              Bottle of champagne
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksChampagne">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfChampagne"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerChampagne"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksProsecco"
              >Bottle of prosecco
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksProsecco">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfProsecco"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerProsecco"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksRum">
              Bottle of rum
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksRum">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfRum"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerRum"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksSparklingWine">
              Bottle of sparkling wine
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksSparklingWine">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfSparklingWine"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerSparklingWine"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksTequila">
              Bottle of tequila
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksTequila">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfTequila"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerTequila"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksWater">
              Bottle of water
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksWater">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfWater"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerWater"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksWine">
              Bottle of wine
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksWine">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfWine"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerWine"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalDrinksWelcome">
              Welcome drink
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalDrinksWelcome">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksFrequencyOfWelcome"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalDrinksCountPerWelcome"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
      </div>
      <b-row>
        <b-col>
          <h5>Excursions</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox size="sm" v-model="property.hotelAdditionalExcursions">
            Excursions offered</b-form-checkbox
          >
        </b-col>
      </b-row>
      <br />
      <div v-if="property.hotelAdditionalExcursions">
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalExcursionGuidedTour">
              Guided tour
              <br
            /></b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalExcursionGuidedTour">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionFrequencyOfGuidedTour"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionCountPerGuidedTour"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalExcursionIslandTour"
              >Island tour</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalExcursionIslandTour">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionFrequencyOfIslandTour"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionCountPerIslandTour"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalExcursionSafari"
              >Safari</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalExcursionSafari">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionFrequencyOfSafari"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionCountPerSafari"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalExcursionTravelGuide"
              >Travel guide</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalExcursionTravelGuide">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionFrequencyOfTravelGuide"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionCountPerTravelGuide"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalExcursionWine">
              Wine tasting</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalExcursionWine">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionFrequencyOfWine"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalExcursionCountPerWine"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
      </div>
      <b-row>
        <b-col>
          <h5>other included services</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-checkbox size="sm" v-model="property.hotelAdditionalItems">
            Other items offered
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <div v-if="property.hotelAdditionalItems">
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherFlowers"
              >Bouqet of flowers</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalOtherFlowers">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfFlowers"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerFlowers"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherCooking">
              Cooking class
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherCooking">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfCooking"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerCooking"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherDance">
              Dance class
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherDance">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfDance"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerDance"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherDiscount">
              Discount
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherDiscount">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfDiscount"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerDiscount"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherDCard">
              Discount card
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherDCard">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfDCard"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerDCard"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherFruits">
              Fruit basket
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherFruits">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfFruits"
              >
                <option :value="null">Frequency</option>
                <option value="Daily">Daily</option>
                <option value="1X">1X</option>
                <option value="2X">2X</option>
                <option value="2X">3X</option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerFruits"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherLanguage">
              National language course
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherLanguage">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfLanguage"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerLanguage"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherCityMap">
              Map of region or city
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherCityMap">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfCityMap"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerCityMap"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherMassage">
              Massage
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherMassage">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfMassage"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerMassage"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherMeal">
              Meal voucher
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherMeal">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfMeal"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerMeal"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherPaint">
              Painting class
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherPaint">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfPaint"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerPaint"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherMap">
              Recreational map
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherMap">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfMap"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerMap"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherCar">
              Rental car
            </b-form-checkbox>
          </b-col>
          <b-row v-if="property.additionalOtherCar">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfCar"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerCar"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherSVoucher">
              Shopping voucher</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalOtherSVoucher">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfSVoucher"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerSVoucher"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherSkis"
              >Ski equipment</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalOtherSkis">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfSkis"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerSkis"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherSweets"
              >Sweets</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalOtherSweets">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfSweets"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerSweets"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherVignette">
              Vignette</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalOtherVignette">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfVignette"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerVignette"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="4">
            <b-form-checkbox size="sm" v-model="property.additionalOtherGift"
              >Welcome gift</b-form-checkbox
            >
          </b-col>
          <b-row v-if="property.additionalOtherGift">
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherFrequencyOfGift"
              >
                <option :value="null">Frequency</option>
                <option v-for="(a, index) in frequencyData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
            <b-col>
              <select
                class="form-control form-control-sm"
                v-model="property.additionalOtherCountPerGift"
              >
                <option :value="null">per Adult/Person/Fees</option>
                <option v-for="(a, index) in countPerData" :key="index" :value="a">
                  {{ a }}
                </option>
              </select>
            </b-col>
          </b-row>
        </b-row>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "AdditionalFactsComp",
  data() {
    return {
      property: this.$store.getters["additionalFactsComp/getProperty"],
      isLoading: false,
      frequencyData: ["daily", "1x", "2x", "3x"],
      countPerData: ["per Adult", "per Person", "per Room"],
      errors: [],
      checkInHealthOptions: [
        {
          text: "Health status questionnaire",
          value: "Health status questionnaire",
        },
        {
          text: "Contact-free temprature check",
          value: "Contact-free temprature check",
        },
        {
          text: "contactless check-in/check-out",
          value: "contactless check-in/check-out",
        },
        {
          text: "Disinfection of baggage at check-in",
          value: "Disinfection of baggage at check-in",
        },
        { text: "limited number of guests", value: "limited number of guests" },
        { text: "Online Check In", value: "Online Check In" },
      ],
      restaurantHealthOptions: [
        { text: "distance regulations", value: "distance regulations" },
        { text: "disinfection dispenser", value: "disinfection dispenser" },
        {
          text: "regular disinfection of chairs/tables",
          value: "regular disinfection of chairs/tables",
        },
        {
          text: "limited number of guests in the restaurant",
          value: "limited number of guests in the restaurant",
        },
        {
          text: "limited number of guests per table",
          value: "limited number of guests per table",
        },
        {
          text: "Pre-reservation necessary",
          value: "Pre-reservation necessary",
        },
        { text: "fixed lunches", value: "fixed lunches" },
        { text: "extended lunch hours", value: "extended lunch hours" },
        { text: "no self-service", value: "no self-service" },
        { text: "Service at the table", value: "Service at the table" },
        { text: "allocated tables", value: "allocated tables" },
      ],
      publicAreasHealthOptions: [
        { text: "distance regulations", value: "distance regulations" },
        { text: "disinfectant dispenser", value: "disinfectant dispenser" },
        {
          text: "regular disinfection of certain areas",
          value: "regular disinfection of certain areas",
        },
        {
          text: "frequent disinfection of much frequented surfaces",
          value: "frequent disinfection of much frequented surfaces",
        },
        {
          text: "limited number of guests in certain areas",
          value: "limited number of guests in certain areas",
        },
        { text: "Compulsory use of masks", value: "Compulsory use of masks" },
        {
          text: "wearing of masks recommended",
          value: "wearing of masks recommended",
        },
        {
          text: "Masks for guests available at the hotel",
          value: "Masks for guests available at the hotel",
        },
        {
          text: "Masks must be brought by the guest",
          value: "Masks must be brought by the guest",
        },
        {
          text: "Shoe disinfection in the entrance area",
          value: "Shoe disinfection in the entrance area",
        },
      ],
      roomsHealthOptions: [
        { text: "Disinfection dispenser", value: "Disinfection dispenser" },
        {
          text: "regular surface disinfection",
          value: "regular surface disinfection",
        },
        { text: "Minibar not filled", value: "Minibar not filled" },
        {
          text: "Filling of minibar only on request",
          value: "Filling of minibar only on request",
        },
        {
          text: "Door seal after room cleaning",
          value: "Door seal after room cleaning",
        },
        {
          text: "unnecessary decoration is removed",
          value: "unnecessary decoration is removed",
        },
      ],
      poolHealthOptions: [
        { text: "distance regulations", value: "distance regulations" },
        {
          text: "regular disinfection of pool loungers",
          value: "regular disinfection of pool loungers",
        },
        {
          text: "pool/beach towels in the rooms",
          value: "pool/beach towels in the rooms",
        },
        {
          text: "disinfection of pool area at fixed times",
          value: "disinfection of pool area at fixed times",
        },
        { text: "limited number of guests", value: "limited number of guests" },
      ],
      fitnessHealthOptions: [
        { text: "distance regulations", value: "distance regulations" },
        { text: "disinfection dispenser", value: "disinfection dispenser" },
        {
          text: "regular surface disinfection",
          value: "regular surface disinfection",
        },
        {
          text: "limited number of guests in the fitness area",
          value: "limited number of guests in the fitness area",
        },
        {
          text: "limited number of guests in the wellness area/spa",
          value: "limited number of guests in the wellness area/spa",
        },
        {
          text: "pre-reservation necessary",
          value: "pre-reservation necessary",
        },
      ],
      childrenHealthOptions: [
        { text: "distance regulations", value: "distance regulations" },
        { text: "disinfection dispenser", value: "disinfection dispenser" },
        {
          text: "regular surface disinfection",
          value: "regular surface disinfection",
        },
        {
          text: "regular disinfection of toys",
          value: "regular disinfection of toys",
        },
        {
          text: "limited number of children",
          value: "limited number of children",
        },
        { text: "pre-reservation required", value: "pre-reservation required" },
      ],
      animationHealthOptions: [
        { text: "distance regulations", value: "distance regulations" },
        { text: "pre-reservation required", value: "pre-reservation required" },
        {
          text: "only sports without physical contact",
          value: "only sports without physical contact",
        },
        { text: "limited number of guests", value: "limited number of guests" },
      ],
      staffHealthOptions: [
        {
          text: "training on Covid-19 measures",
          value: "training on Covid-19 measures",
        },
        {
          text: "wearing of protective clothing",
          value: "wearing of protective clothing",
        },
        {
          text: "regular temperature measurements",
          value: "regular temperature measurements",
        },
        { text: "hygiene officer", value: "hygiene officer" },
        {
          text: "regular disinfection of work clothes",
          value: "regular disinfection of work clothes",
        },
      ],
      additionalHealthOptions: ["option1", "option2", "option3", "option4", "option5"],
    };
  },
  computed: {
    cAdditionalAdmissionLeisurePark() {
      return (
        this.property.hotelAdditionalAdmissions && this.property.additionalAdmissionLeisurePark
      );
    },
    cAdditionalAdmissionFrequencyOfLeisurePark() {
      return this.cAdditionalAdmissionLeisurePark
        ? this.property.additionalAdmissionFrequencyOfLeisurePark
        : null;
    },
    cAdditionalAdmissionCountPerLeisurePark() {
      return this.cAdditionalAdmissionLeisurePark
        ? this.property.additionalAdmissionCountPerLeisurePark
        : null;
    },
    cAdditionalAdmissionWaterPark() {
      return this.property.hotelAdditionalAdmissions && this.property.additionalAdmissionWaterPark;
    },
    cAdditionalAdmissionFrequencyOfWaterPark() {
      return this.cAdditionalAdmissionWaterPark
        ? this.property.additionalAdmissionFrequencyOfWaterPark
        : null;
    },
    cAdditionalAdmissionCountPerWaterPark() {
      return this.cAdditionalAdmissionWaterPark
        ? this.property.additionalAdmissionCountPerWaterPark
        : null;
    },
    cAdditionalAdmissionGreenFees() {
      return this.property.hotelAdditionalAdmissions && this.property.additionalAdmissionGreenFees;
    },
    cAdditionalAdmissionFrequencyOfGreenFees() {
      return this.cAdditionalAdmissionGreenFees
        ? this.property.additionalAdmissionFrequencyOfGreenFees
        : null;
    },
    cAdditionalAdmissionCountPerGreenFees() {
      return this.cAdditionalAdmissionGreenFees
        ? this.property.additionalAdmissionCountPerGreenFees
        : null;
    },
    cAdditionalAdmissionSkiPass() {
      return this.property.hotelAdditionalAdmissions && this.property.additionalAdmissionSkiPass;
    },
    cAdditionalAdmissionFrequencyOfSkiPass() {
      return this.cAdditionalAdmissionGreenFees
        ? this.property.additionalAdmissionFrequencyOfSkiPass
        : null;
    },
    cAdditionalAdmissionCountPerSkiPass() {
      return this.cAdditionalAdmissionGreenFees
        ? this.property.additionalAdmissionCountPerSkiPass
        : null;
    },
    cAdditionalAdmissionSpaVoucher() {
      return this.property.hotelAdditionalAdmissions && this.property.additionalAdmissionSpaVoucher;
    },
    cAdditionalAdmissionFrequencyOfSpaVoucher() {
      return this.cAdditionalAdmissionSpaVoucher
        ? this.property.additionalAdmissionFrequencyOfSpaVoucher
        : null;
    },
    cAdditionalAdmissionCountPerSpaVoucher() {
      return this.cAdditionalAdmissionSpaVoucher
        ? this.property.additionalAdmissionCountPerSpaVoucher
        : null;
    },
    cAdditionalAdmissionThermalPass() {
      return (
        this.property.hotelAdditionalAdmissions && this.property.additionalAdmissionThermalPass
      );
    },
    cAdditionalAdmissionFrequencyOfThermalPass() {
      return this.cAdditionalAdmissionThermalPass
        ? this.property.additionalAdmissionFrequencyOfThermalPass
        : null;
    },
    cAdditionalAdmissionCountPerThermalPass() {
      return this.cAdditionalAdmissionThermalPass
        ? this.property.additionalAdmissionCountPerThermalPass
        : null;
    },
    cAdditionalDrinksChampagne() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksChampagne;
    },
    cAdditionalDrinksFrequencyOfChampagne() {
      return this.cAdditionalDrinksChampagne
        ? this.property.additionalDrinksFrequencyOfChampagne
        : null;
    },
    cAdditionalDrinksCountPerChampagne() {
      return this.cAdditionalDrinksChampagne
        ? this.property.additionalDrinksCountPerChampagne
        : null;
    },
    cAdditionalDrinksProsecco() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksProsecco;
    },
    cAdditionalDrinksFrequencyOfProsecco() {
      return this.cAdditionalDrinksProsecco
        ? this.property.additionalDrinksFrequencyOfProsecco
        : null;
    },
    cAdditionalDrinksCountPerProsecco() {
      return this.cAdditionalDrinksProsecco ? this.property.additionalDrinksCountPerProsecco : null;
    },
    cAdditionalDrinksRum() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksRum;
    },
    cAdditionalDrinksFrequencyOfRum() {
      return this.cAdditionalDrinksRum ? this.property.additionalDrinksFrequencyOfRum : null;
    },
    cAdditionalDrinksCountPerRum() {
      return this.cAdditionalDrinksRum ? this.property.additionalDrinksCountPerRum : null;
    },
    cAdditionalDrinksSparklingWine() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksSparklingWine;
    },
    cAdditionalDrinksFrequencyOfSparklingWine() {
      return this.cAdditionalDrinksSparklingWine
        ? this.property.additionalDrinksFrequencyOfSparklingWine
        : null;
    },
    cAdditionalDrinksCountPerSparklingWine() {
      return this.cAdditionalDrinksSparklingWine
        ? this.property.additionalDrinksCountPerSparklingWine
        : null;
    },
    cAdditionalDrinksTequila() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksTequila;
    },
    cAdditionalDrinksFrequencyOfTequila() {
      return this.cAdditionalDrinksTequila
        ? this.property.additionalDrinksFrequencyOfTequila
        : null;
    },
    cAdditionalDrinksCountPerTequila() {
      return this.cAdditionalDrinksTequila ? this.property.additionalDrinksCountPerTequila : null;
    },
    cAdditionalDrinksWater() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksWater;
    },
    cAdditionalDrinksFrequencyOfWater() {
      return this.cAdditionalDrinksWater ? this.property.additionalDrinksFrequencyOfWater : null;
    },
    cAdditionalDrinksCountPerWater() {
      return this.cAdditionalDrinksWater ? this.property.additionalDrinksCountPerWater : null;
    },
    cAdditionalDrinksWine() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksWine;
    },
    cAdditionalDrinksFrequencyOfWine() {
      return this.cAdditionalDrinksWine ? this.property.additionalDrinksFrequencyOfWine : null;
    },
    cAdditionalDrinksCountPerWine() {
      return this.cAdditionalDrinksWine ? this.property.additionalDrinksCountPerWine : null;
    },
    cAdditionalDrinksWelcome() {
      return this.property.hotelAdditionalDrinks && this.property.additionalDrinksWelcome;
    },
    cAdditionalDrinksFrequencyOfWelcome() {
      return this.cAdditionalDrinksWelcome
        ? this.property.additionalDrinksFrequencyOfWelcome
        : null;
    },
    cAdditionalDrinksCountPerWelcome() {
      return this.cAdditionalDrinksWelcome ? this.property.additionalDrinksCountPerWelcome : null;
    },
    cAdditionalExcursionGuidedTour() {
      return this.property.hotelAdditionalExcursions && this.property.additionalExcursionGuidedTour;
    },
    cAdditionalExcursionFrequencyOfGuidedTour() {
      return this.cAdditionalExcursionGuidedTour
        ? this.property.additionalExcursionFrequencyOfGuidedTour
        : null;
    },
    cAdditionalExcursionCountPerGuidedTour() {
      return this.cAdditionalExcursionGuidedTour
        ? this.property.additionalExcursionCountPerGuidedTour
        : null;
    },
    cAdditionalExcursionIslandTour() {
      return this.property.hotelAdditionalExcursions && this.property.additionalExcursionIslandTour;
    },
    cAdditionalExcursionFrequencyOfIslandTour() {
      return this.cAdditionalExcursionIslandTour
        ? this.property.additionalExcursionFrequencyOfIslandTour
        : null;
    },
    cAdditionalExcursionCountPerIslandTour() {
      return this.cAdditionalExcursionIslandTour
        ? this.property.additionalExcursionCountPerIslandTour
        : null;
    },
    cAdditionalExcursionSafari() {
      return this.property.hotelAdditionalExcursions && this.property.additionalExcursionSafari;
    },
    cAdditionalExcursionFrequencyOfSafari() {
      return this.cAdditionalExcursionSafari
        ? this.property.additionalExcursionFrequencyOfSafari
        : null;
    },
    cAdditionalExcursionCountPerSafari() {
      return this.cAdditionalExcursionSafari
        ? this.property.additionalExcursionCountPerSafari
        : null;
    },
    cAdditionalExcursionTravelGuide() {
      return (
        this.property.hotelAdditionalExcursions && this.property.additionalExcursionTravelGuide
      );
    },
    cAdditionalExcursionFrequencyOfTravelGuide() {
      return this.cAdditionalExcursionTravelGuide
        ? this.property.additionalExcursionFrequencyOfTravelGuide
        : null;
    },
    cAdditionalExcursionCountPerTravelGuide() {
      return this.cAdditionalExcursionTravelGuide
        ? this.property.additionalExcursionCountPerTravelGuide
        : null;
    },
    cAdditionalExcursionWine() {
      return this.property.hotelAdditionalExcursions && this.property.additionalExcursionWine;
    },
    cAdditionalExcursionFrequencyOfWine() {
      return this.cAdditionalExcursionWine
        ? this.property.additionalExcursionFrequencyOfWine
        : null;
    },
    cAdditionalExcursionCountPerWine() {
      return this.cAdditionalExcursionWine ? this.property.additionalExcursionCountPerWine : null;
    },
    cAdditionalOtherFlowers() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherFlowers;
    },
    cAdditionalOtherFrequencyOfFlowers() {
      return this.cAdditionalOtherFlowers ? this.property.additionalOtherFrequencyOfFlowers : null;
    },
    cAdditionalOtherCountPerFlowers() {
      return this.cAdditionalOtherFlowers ? this.property.additionalOtherCountPerFlowers : null;
    },
    cAdditionalOtherCooking() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherCooking;
    },
    cAdditionalOtherFrequencyOfCooking() {
      return this.cAdditionalOtherCooking ? this.property.additionalOtherFrequencyOfCooking : null;
    },
    cAdditionalOtherCountPerCooking() {
      return this.cAdditionalOtherCooking ? this.property.additionalOtherCountPerCooking : null;
    },
    cAdditionalOtherDance() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherDance;
    },
    cAdditionalOtherFrequencyOfDance() {
      return this.cAdditionalOtherDance ? this.property.additionalOtherFrequencyOfDance : null;
    },
    cAdditionalOtherCountPerDance() {
      return this.cAdditionalOtherDance ? this.property.additionalOtherCountPerDance : null;
    },
    cAdditionalOtherDiscount() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherDiscount;
    },
    cAdditionalOtherFrequencyOfDiscount() {
      return this.cAdditionalOtherDiscount
        ? this.property.additionalOtherFrequencyOfDiscount
        : null;
    },
    cAdditionalOtherCountPerDiscount() {
      return this.cAdditionalOtherDiscount ? this.property.additionalOtherCountPerDiscount : null;
    },
    cAdditionalOtherDCard() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherDCard;
    },
    cAdditionalOtherFrequencyOfDCard() {
      return this.cAdditionalOtherDCard ? this.property.additionalOtherFrequencyOfDCard : null;
    },
    cAdditionalOtherCountPerDCard() {
      return this.cAdditionalOtherDCard ? this.property.additionalOtherCountPerDCard : null;
    },
    cAdditionalOtherFruits() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherFruits;
    },
    cAdditionalOtherFrequencyOfFruits() {
      return this.cAdditionalOtherFruits ? this.property.additionalOtherFrequencyOfFruits : null;
    },
    cAdditionalOtherCountPerFruits() {
      return this.cAdditionalOtherFruits ? this.property.additionalOtherCountPerFruits : null;
    },
    cAdditionalOtherLanguage() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherLanguage;
    },
    cAdditionalOtherFrequencyOfLanguage() {
      return this.cAdditionalOtherLanguage
        ? this.property.additionalOtherFrequencyOfLanguage
        : null;
    },
    cAdditionalOtherCountPerLanguage() {
      return this.cAdditionalOtherLanguage ? this.property.additionalOtherCountPerLanguage : null;
    },
    cAdditionalOtherCityMap() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherCityMap;
    },
    cAdditionalOtherFrequencyOfCityMap() {
      return this.cAdditionalOtherCityMap ? this.property.additionalOtherFrequencyOfCityMap : null;
    },
    cAdditionalOtherCountPerCityMap() {
      return this.cAdditionalOtherCityMap ? this.property.additionalOtherCountPerCityMap : null;
    },
    cAdditionalOtherMassage() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherMassage;
    },
    cAdditionalOtherFrequencyOfMassage() {
      return this.cAdditionalOtherMassage ? this.property.additionalOtherFrequencyOfMassage : null;
    },
    cAdditionalOtherCountPerMassage() {
      return this.cAdditionalOtherMassage ? this.property.additionalOtherCountPerMassage : null;
    },
    cAdditionalOtherMeal() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherMeal;
    },
    cAdditionalOtherFrequencyOfMeal() {
      return this.cAdditionalOtherMeal ? this.property.additionalOtherFrequencyOfMeal : null;
    },
    cAdditionalOtherCountPerMeal() {
      return this.cAdditionalOtherMeal ? this.property.additionalOtherCountPerMeal : null;
    },
    cAdditionalOtherPaint() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherPaint;
    },
    cAdditionalOtherFrequencyOfPaint() {
      return this.cAdditionalOtherPaint ? this.property.additionalOtherFrequencyOfPaint : null;
    },
    cAdditionalOtherCountPerPaint() {
      return this.cAdditionalOtherPaint ? this.property.additionalOtherCountPerPaint : null;
    },
    cAdditionalOtherMap() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherMap;
    },
    cAdditionalOtherFrequencyOfMap() {
      return this.cAdditionalOtherMap ? this.property.additionalOtherFrequencyOfMap : null;
    },
    cAdditionalOtherCountPerMap() {
      return this.cAdditionalOtherMap ? this.property.additionalOtherCountPerMap : null;
    },
    cAdditionalOtherCar() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherCar;
    },
    cAdditionalOtherFrequencyOfCar() {
      return this.cAdditionalOtherCar ? this.property.additionalOtherFrequencyOfCar : null;
    },
    cAdditionalOtherCountPerCar() {
      return this.cAdditionalOtherCar ? this.property.additionalOtherCountPerCar : null;
    },
    cAdditionalOtherSVoucher() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherSVoucher;
    },
    cAdditionalOtherFrequencyOfSVoucher() {
      return this.cAdditionalOtherSVoucher
        ? this.property.additionalOtherFrequencyOfSVoucher
        : null;
    },
    cAdditionalOtherCountPerSVoucher() {
      return this.cAdditionalOtherSVoucher ? this.property.additionalOtherCountPerSVoucher : null;
    },
    cAdditionalOtherSkis() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherSkis;
    },
    cAdditionalOtherFrequencyOfSkis() {
      return this.cAdditionalOtherSkis ? this.property.additionalOtherFrequencyOfSkis : null;
    },
    cAdditionalOtherCountPerSkis() {
      return this.cAdditionalOtherSkis ? this.property.additionalOtherCountPerSkis : null;
    },
    cAdditionalOtherSweets() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherSweets;
    },
    cAdditionalOtherFrequencyOfSweets() {
      return this.cAdditionalOtherSweets ? this.property.additionalOtherFrequencyOfSweets : null;
    },
    cAdditionalOtherCountPerSweets() {
      return this.cAdditionalOtherSweets ? this.property.additionalOtherCountPerSweets : null;
    },
    cAdditionalOtherVignette() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherVignette;
    },
    cAdditionalOtherFrequencyOfVignette() {
      return this.cAdditionalOtherVignette
        ? this.property.additionalOtherFrequencyOfVignette
        : null;
    },
    cAdditionalOtherCountPerVignette() {
      return this.cAdditionalOtherVignette ? this.property.additionalOtherCountPerVignette : null;
    },
    cAdditionalOtherGift() {
      return this.property.hotelAdditionalItems && this.property.additionalOtherGift;
    },
    cAdditionalOtherFrequencyOfGift() {
      return this.cAdditionalOtherGift ? this.property.additionalOtherFrequencyOfGift : null;
    },
    cAdditionalOtherCountPerGift() {
      return this.cAdditionalOtherGift ? this.property.additionalOtherCountPerGift : null;
    },
  },
  methods: {
    getInfo() {
      if (this.isLoading) {
        return;
      }
      const propertyId = this.$route.params.id;
      /* console.log("property id is", propertyId); */
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("additionalFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["additionalFactsComp/getProperty"];
          this.$store.dispatch("view/load", false);
          this.errors = this.$store.getters["additionalFactsComp/getErrors"];
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
      const additionalInfoToUpdate = {
        id: this.property.id,
        hotel: this.property.id || propertyId,
        additional_free_text: this.property.additionalFreeText,
        health_check_in: this.property.healthCheckIn,
        health_restaurant: this.property.healthRestaurant,
        health_public_areas: this.property.healthPublicAreas,
        health_rooms: this.property.healthRooms,
        health_pool_area: this.property.healthPoolArea,
        health_fitness_area: this.property.healthFitnessArea,
        health_children_area: this.property.healthChildrenArea,
        health_animation: this.property.healthAnimation,
        health_staff: this.property.healthStaff,
        health_additional: this.property.healthAdditional,
        hotel_additional_admissions: this.property.hotelAdditionalAdmissions,
        additional_admission_leisure_park: this.cAdditionalAdmissionLeisurePark,
        additional_admission_frequency_of_leisure_park:
          this.cAdditionalAdmissionFrequencyOfLeisurePark,
        additional_admission_count_per_leisure_park: this.cAdditionalAdmissionCountPerLeisurePark,
        additional_admission_water_park: this.cAdditionalAdmissionWaterPark,
        additional_admission_frequency_of_water_park: this.cAdditionalAdmissionFrequencyOfWaterPark,
        additional_admission_count_per_water_park: this.cAdditionalAdmissionCountPerWaterPark,
        additional_admission_green_fees: this.cAdditionalAdmissionGreenFees,
        additional_admission_frequency_of_green_fees: this.cAdditionalAdmissionFrequencyOfGreenFees,
        additional_admission_count_per_green_fees: this.cAdditionalAdmissionCountPerGreenFees,
        additional_admission_ski_pass: this.cAdditionalAdmissionSkiPass,
        additional_admission_frequency_of_ski_pass: this.cAdditionalAdmissionFrequencyOfSkiPass,
        additional_admission_count_per_ski_pass: this.cAdditionalAdmissionCountPerSkiPass,
        additional_admission_spa_voucher: this.cAdditionalAdmissionSpaVoucher,
        additional_admission_frequency_of_spa_voucher:
          this.cAdditionalAdmissionFrequencyOfSpaVoucher,
        additional_admission_count_per_spa_voucher: this.cAdditionalAdmissionCountPerSpaVoucher,
        additional_admission_thermal_pass: this.cAdditionalAdmissionThermalPass,
        additional_admission_frequency_of_thermal_pass:
          this.cAdditionalAdmissionFrequencyOfThermalPass,
        additional_admission_count_per_thermal_pass: this.cAdditionalAdmissionCountPerThermalPass,
        hotel_additional_drinks: this.property.hotelAdditionalDrinks,
        additional_drinks_champagne: this.cAdditionalDrinksChampagne,
        additional_drinks_frequency_of_champagne: this.cAdditionalDrinksFrequencyOfChampagne,
        additional_drinks_count_per_champagne: this.cAdditionalDrinksCountPerChampagne,
        additional_drinks_prosecco: this.cAdditionalDrinksProsecco,
        additional_drinks_frequency_of_prosecco: this.cAdditionalDrinksFrequencyOfProsecco,
        additional_drinks_count_per_prosecco: this.cAdditionalDrinksCountPerProsecco,
        additional_drinks_rum: this.cAdditionalDrinksRum,
        additional_drinks_frequency_of_rum: this.cAdditionalDrinksFrequencyOfRum,
        additional_drinks_count_per_rum: this.cAdditionalDrinksCountPerRum,
        additional_drinks_sparkling_wine: this.cAdditionalDrinksSparklingWine,
        additional_drinks_frequency_of_sparkling_wine:
          this.cAdditionalDrinksFrequencyOfSparklingWine,
        additional_drinks_count_per_sparkling_wine: this.cAdditionalDrinksCountPerSparklingWine,
        additional_drinks_tequila: this.cAdditionalDrinksTequila,
        additional_drinks_frequency_of_tequila: this.cAdditionalDrinksFrequencyOfTequila,
        additional_drinks_count_per_tequila: this.cAdditionalDrinksCountPerTequila,
        additional_drinks_water: this.cAdditionalDrinksWater,
        additional_drinks_frequency_of_water: this.cAdditionalDrinksFrequencyOfWater,
        additional_drinks_count_per_water: this.cAdditionalDrinksCountPerWater,
        additional_drinks_wine: this.cAdditionalDrinksWine,
        additional_drinks_frequency_of_wine: this.cAdditionalDrinksFrequencyOfWine,
        additional_drinks_count_per_wine: this.cAdditionalDrinksCountPerWine,
        additional_drinks_welcome: this.cAdditionalDrinksWelcome,
        additional_drinks_frequency_of_welcome: this.cAdditionalDrinksFrequencyOfWelcome,
        additional_drinks_count_per_welcome: this.cAdditionalDrinksCountPerWelcome,
        hotel_additional_excursions: this.property.hotelAdditionalExcursions,
        additional_excursion_guided_tour: this.cAdditionalExcursionGuidedTour,
        additional_excursion_frequency_of_guided_tour:
          this.cAdditionalExcursionFrequencyOfGuidedTour,
        additional_excursion_count_per_guided_tour: this.cAdditionalExcursionCountPerGuidedTour,
        additional_excursion_island_tour: this.cAdditionalExcursionIslandTour,
        additional_excursion_frequency_of_island_tour:
          this.cAdditionalExcursionFrequencyOfIslandTour,
        additional_excursion_count_per_island_tour: this.cAdditionalExcursionCountPerIslandTour,
        additional_excursion_safari: this.cAdditionalExcursionSafari,
        additional_excursion_frequency_of_safari: this.cAdditionalExcursionFrequencyOfSafari,
        additional_excursion_count_per_safari: this.cAdditionalExcursionCountPerSafari,
        additional_excursion_travel_guide: this.cAdditionalExcursionTravelGuide,
        additional_excursion_frequency_of_travel_guide:
          this.cAdditionalExcursionFrequencyOfTravelGuide,
        additional_excursion_count_per_travel_guide: this.cAdditionalExcursionCountPerTravelGuide,
        additional_excursion_wine: this.cAdditionalExcursionWine,
        additional_excursion_frequency_of_wine: this.cAdditionalExcursionFrequencyOfWine,
        additional_excursion_count_per_wine: this.cAdditionalExcursionCountPerWine,
        hotel_additional_items: this.property.hotelAdditionalItems,
        additional_other_flowers: this.cAdditionalOtherFlowers,
        additional_other_frequency_of_flowers: this.cAdditionalOtherFrequencyOfFlowers,
        additional_other_count_per_flowers: this.cAdditionalOtherCountPerFlowers,
        additional_other_cooking: this.cAdditionalOtherCooking,
        additional_other_frequency_of_cooking: this.cAdditionalOtherFrequencyOfCooking,
        additional_other_count_per_cooking: this.cAdditionalOtherCountPerCooking,
        additional_other_dance: this.cAdditionalOtherDance,
        additional_other_frequency_of_dance: this.cAdditionalOtherFrequencyOfDance,
        additional_other_count_per_dance: this.cAdditionalOtherCountPerDance,
        additional_other_discount: this.cAdditionalOtherDiscount,
        additional_other_frequency_of_discount: this.cAdditionalOtherFrequencyOfDiscount,
        additional_other_count_per_discount: this.cAdditionalOtherCountPerDiscount,
        additional_other_d_card: this.cAdditionalOtherDCard,
        additional_other_frequency_of_d_card: this.cAdditionalOtherFrequencyOfDCard,
        additional_other_count_per_d_card: this.cAdditionalOtherCountPerDCard,
        additional_other_fruits: this.cAdditionalOtherFruits,
        additional_other_frequency_of_fruits: this.cAdditionalOtherFrequencyOfFruits,
        additional_other_count_per_fruits: this.cAdditionalOtherCountPerFruits,
        additional_other_language: this.cAdditionalOtherLanguage,
        additional_other_frequency_of_language: this.cAdditionalOtherFrequencyOfLanguage,
        additional_other_count_per_language: this.cAdditionalOtherCountPerLanguage,
        additional_other_city_map: this.cAdditionalOtherCityMap,
        additional_other_frequency_of_city_map: this.cAdditionalOtherFrequencyOfCityMap,
        additional_other_count_per_city_map: this.cAdditionalOtherCountPerCityMap,
        additional_other_massage: this.cAdditionalOtherMassage,
        additional_other_frequency_of_massage: this.cAdditionalOtherFrequencyOfMassage,
        additional_other_count_per_massage: this.cAdditionalOtherCountPerMassage,
        additional_other_meal: this.cAdditionalOtherMeal,
        additional_other_frequency_of_meal: this.cAdditionalOtherFrequencyOfMeal,
        additional_other_count_per_meal: this.cAdditionalOtherCountPerMeal,
        additional_other_paint: this.cAdditionalOtherPaint,
        additional_other_frequency_of_paint: this.cAdditionalOtherFrequencyOfPaint,
        additional_other_count_per_paint: this.cAdditionalOtherCountPerPaint,
        additional_other_map: this.cAdditionalOtherMap,
        additional_other_frequency_of_map: this.cAdditionalOtherFrequencyOfMap,
        additional_other_count_per_map: this.cAdditionalOtherCountPerMap,
        additional_other_car: this.cAdditionalOtherCar,
        additional_other_frequency_of_car: this.cAdditionalOtherFrequencyOfCar,
        additional_other_count_per_car: this.cAdditionalOtherCountPerCar,
        additional_other_s_voucher: this.cAdditionalOtherSVoucher,
        additional_other_frequency_of_s_voucher: this.cAdditionalOtherFrequencyOfSVoucher,
        additional_other_count_per_s_voucher: this.cAdditionalOtherCountPerSVoucher,
        additional_other_skis: this.cAdditionalOtherSkis,
        additional_other_frequency_of_skis: this.cAdditionalOtherFrequencyOfSkis,
        additional_other_count_per_skis: this.cAdditionalOtherCountPerSkis,
        additional_other_sweets: this.cAdditionalOtherSweets,
        additional_other_frequency_of_sweets: this.cAdditionalOtherFrequencyOfSweets,
        additional_other_count_per_sweets: this.cAdditionalOtherCountPerSweets,
        additional_other_vignette: this.cAdditionalOtherVignette,
        additional_other_frequency_of_vignette: this.cAdditionalOtherFrequencyOfVignette,
        additional_other_count_per_vignette: this.cAdditionalOtherCountPerVignette,
        additional_other_gift: this.cAdditionalOtherGift,
        additional_other_frequency_of_gift: this.cAdditionalOtherFrequencyOfGift,
        additional_other_count_per_gift: this.cAdditionalOtherCountPerGift,
      };
      await this.$store
        .dispatch("additionalFactsComp/postInfo", additionalInfoToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["additionalFactsComp/getProperty"];
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
      if (
        !this.property.additionalAdmissionFrequencyOfLeisurePark === null &&
        this.property.additionalAdmissionCountPerLeisurePark === null
      ) {
        newValidations.push("Frequency per person of leisure park is missing");
      }
      if (
        !this.property.additionalAdmissionFrequencyOfWaterPark === null &&
        this.property.additionalAdmissionCountPerWaterPark === null
      ) {
        newValidations.push("Frequency per person of water park is missing");
      }
      if (
        !this.property.additionalAdmissionFrequencyOfGreenFees === null &&
        this.property.additionalAdmissionCountPerGreenFees === null
      ) {
        newValidations.push("Frequency per person of Green fees is missing");
      }
      if (
        !this.property.additionalAdmissionFrequencyOfSkiPass === null &&
        this.property.additionalAdmissionCountPerSkiPass === null
      ) {
        newValidations.push("Frequency per person of Ski Pass is missing");
      }
      if (
        !this.property.additionalAdmissionFrequencyOfSpaVoucher === null &&
        this.property.additionalAdmissionCountPerSpaVoucher === null
      ) {
        newValidations.push("Frequency per person of Spa voucher is missing");
      }
      if (
        !this.property.additionalAdmissionFrequencyOfThermalPass === null &&
        this.property.additionalAdmissionCountPerThermalPass === null
      ) {
        newValidations.push("Frequency per person of Thermal Pass is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfChampagne === null &&
        this.property.additionalDrinksCountPerChampagne === null
      ) {
        newValidations.push("Frequency per Bottle of champagne is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfProsecco === null &&
        this.property.additionalDrinksCountPerProsecco === null
      ) {
        newValidations.push("Frequency per Bottle of prosecco is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfRum === null &&
        this.property.additionalDrinksCountPerRum === null
      ) {
        newValidations.push("Frequency per Bottle of rum is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfSparklingWine === null &&
        this.property.additionalDrinksCountPerSparklingWine === null
      ) {
        newValidations.push("Frequency per Bottle of sparkling wine is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfTequila === null &&
        this.property.additionalDrinksCountPerTequila === null
      ) {
        newValidations.push("Frequency per Bottle of tequila is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfWater === null &&
        this.property.additionalDrinksCountPerWater === null
      ) {
        newValidations.push("Frequency per Bottle of water is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfWine === null &&
        this.property.additionalDrinksCountPerWine === null
      ) {
        newValidations.push("Frequency per Bottle of wine is missing");
      }
      if (
        !this.property.additionalDrinksFrequencyOfWelcome === null &&
        this.property.additionalDrinksCountPerWelcome === null
      ) {
        newValidations.push("Frequency per Welcome drink is missing");
      }
      if (
        !this.property.additionalExcursionFrequencyOfGuidedTour === null &&
        this.property.additionalExcursionCountPerGuidedTour === null
      ) {
        newValidations.push("Frequency per person for Guided tour is missing");
      }
      if (
        !this.property.additionalExcursionFrequencyOfIslandTour === null &&
        this.property.additionalExcursionCountPerIslandTour === null
      ) {
        newValidations.push("Frequency per person for Island tour is missing");
      }
      if (
        !this.property.additionalExcursionFrequencyOfSafari === null &&
        this.property.additionalExcursionCountPerSafari === null
      ) {
        newValidations.push("Frequency per person for Safari is missing");
      }
      if (
        !this.property.additionalExcursionFrequencyOfTravelGuide === null &&
        this.property.additionalExcursionCountPerTravelGuide === null
      ) {
        newValidations.push("Frequency per person for Travel guide is missing");
      }
      if (
        !this.property.additionalExcursionFrequencyOfWine === null &&
        this.property.additionalExcursionCountPerWine === null
      ) {
        newValidations.push("Frequency per person for Wine tasting is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfFlowers === null &&
        this.property.additionalOtherCountPerFlowers === null
      ) {
        newValidations.push("Frequency per person for Bouqet of flowers is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfCooking === null &&
        this.property.additionalOtherCountPerCooking === null
      ) {
        newValidations.push("Frequency per person for Cooking class is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfDance === null &&
        this.property.additionalOtherCountPerDance === null
      ) {
        newValidations.push("Frequency per person for Dance class is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfDiscount === null &&
        this.property.additionalOtherCountPerDiscount === null
      ) {
        newValidations.push("Frequency per person for Discount is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfDCard === null &&
        this.property.additionalOtherCountPerDCard === null
      ) {
        newValidations.push("Frequency per person for Discount card is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfFruits === null &&
        this.property.additionalOtherCountPerFruits === null
      ) {
        newValidations.push("Frequency per person for Fruit basket is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfLanguage === null &&
        this.property.additionalOtherCountPerLanguage === null
      ) {
        newValidations.push("Frequency per person for National language course is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfCityMap === null &&
        this.property.additionalOtherCountPerCityMap === null
      ) {
        newValidations.push("Frequency per person for Map of region or city is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfMassage === null &&
        this.property.additionalOtherCountPerMassage === null
      ) {
        newValidations.push("Frequency per person for Massage is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfMeal === null &&
        this.property.additionalOtherCountPerMeal === null
      ) {
        newValidations.push("Frequency per person for Meal voucher is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfPaint === null &&
        this.property.additionalOtherCountPerPaint === null
      ) {
        newValidations.push("Frequency per person for Painting class is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfMap === null &&
        this.property.additionalOtherCountPerMap === null
      ) {
        newValidations.push("Frequency per person for Recreational map is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfCar === null &&
        this.property.additionalOtherCountPerCar === null
      ) {
        newValidations.push("Frequency per person for Rental car is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfSVoucher === null &&
        this.property.additionalOtherCountPerSVoucher === null
      ) {
        newValidations.push("Frequency per person for Shopping voucher is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfSkis === null &&
        this.property.additionalOtherCountPerSkis === null
      ) {
        newValidations.push("Frequency per person for Ski equipment is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfSweets === null &&
        this.property.additionalOtherCountPerSweets === null
      ) {
        newValidations.push("Frequency per person for Sweets is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfVignette === null &&
        this.property.additionalOtherCountPerVignette === null
      ) {
        newValidations.push("Frequency per person for Vignette is missing");
      }
      if (
        !this.property.additionalOtherFrequencyOfGift === null &&
        this.property.additionalOtherCountPerGift === null
      ) {
        newValidations.push("Frequency per person of Welcome gifts is missing");
      }
      this.$store.dispatch("additionalFactsComp/validate", newValidations);
      this.errors = this.$store.getters["additionalFactsComp/getErrors"];
      /* console.log(this.errors); */
    },
  },
};
</script>
