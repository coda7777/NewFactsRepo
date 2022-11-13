<template>
  <div class="container">
    <h4>Sports</h4>
    <form v-on:submit.prevent @submit="save()">
      <p class="text-danger" v-if="errors.length > 0">
        <b>Please correct the following error(s):</b>
      </p>

      <ul>
        <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
          {{ error }}
        </li>
      </ul>
      <b-row>
        <b-col cols="12">
          <b-form-checkbox size="sm" v-model="property.sportsAvailable"
            >Water Sports Activities
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <div v-show="property.sportsAvailable">
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.aerobicsAvailable"
              >Aerobics
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.aerobicsAvailable">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.aerobicsLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
                <b-form-checkbox size="sm" v-model="property.aerobicsClassAvailable">
                  class / training available
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.aerobicsCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.boulderWallAvailable">
              Boulder wall
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.boulderWallAvailable">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.boulderWallLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.boulderWallClass"
                  >class / training available
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.boulderWallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.fitnessCentreAvailable"
              >Fitness centre</b-form-checkbox
            >
          </b-col>
          <b-col cols="" v-if="property.fitnessCentreAvailable">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.fitnessCentreLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.fitnessCentreInWellness"
                  >in wellness area</b-form-checkbox
                >
                <b-form-checkbox size="sm" v-model="property.fitnessCentreClassAvailable"
                  >class / training available</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.fitnessCentreCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm"
                    >Admission from (years)</label
                  >
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.fitnessCentreAgeFrom"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Size in sq/m</label>
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.fitnessCentreSize"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- Gym -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.gymAvailable">Gym</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.gymAvailable">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.gymLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.gymInWellness">
                  in wellness area</b-form-checkbox
                >
                <b-form-checkbox size="sm" v-model="property.gymTrainingAvailable">
                  class / training available
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.gymCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Size in sq/m</label>
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.gymSize"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm"
                    >Admission from (years)</label
                  >
                  <div class="col-sm-6">
                    <input
                      class="form-control form-control-sm"
                      type="number"
                      v-model="property.gymAgeFrom"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- gymnastics -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.gymnasticsAvailable"
              >Gymnastics
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.gymnasticsAvailable">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.gymnasticsLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.gymnasticsCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
              <!-- <b-col >
class / training available
<b-form-checkbox size="sm" v-model="property.aerobicsClassAvailable" >
</b-form-checkbox>
</b-col> -->
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- climbing wall -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.climbingWallAvailable">
              Climbing wall
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.climbingWallAvailable">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.climbingWallLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.climbingWallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
              <b-col>
                <b-form-checkbox size="sm" v-model="property.climbingWallClass">
                  class / training available
                </b-form-checkbox>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- Mountain bike -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.mountainBikeTour"
              >Mountain bike tours
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.mountainBikeTour">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.mountainBikeTourLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.mountainBikeTourCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- mountain bike rent -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.mountainBikeRental"
              >Mountain bike rental
            </b-form-checkbox>
          </b-col>
          <b-col cols="9" v-if="property.mountainBikeRental">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.mountainBikeRentalLocalSupplier">
                  offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.mountainBikeRentalCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- Nordic walk -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.nordicWalking"
              >Nordic walking
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.nordicWalking">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.nordicWalkingLocalSupplier">
                  offered by local supplier(s)
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.nordicWalkingTraining"
                  >class / training available
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.nordicWalkingEquipRental"
                  >equipment rental
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.nordicWalkingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">Equipment Fees</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.nordicWalkingEquipCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- open air fitness -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.openAirFitness">
              Open air fitness
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.openAirFitness">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.openAirFitnessLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.openAirFitnessCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- step aerobics -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.stepAerobics"
              >Step aerobics
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.stepAerobics">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.stepAerobicsLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
                <b-form-checkbox size="sm" v-model="property.stepAerobicsTraining"
                  >class / training available
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.stepAerobicsCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- Dance class -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.danceClass">Dance class</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.danceClass">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.danceClassLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.danceClassCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <hr />
          </b-col>
        </b-row>
        <!-- fitness class -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.fitnessClass"
              >fitness class
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.fitnessClass">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.fitnessClassLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.fitnessClassCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <hr />
      <!-- water sports-->
      <b-row>
        <b-col>
          <h5>Water Sports</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <b-form-checkbox size="sm" v-model="property.waterSportsActivitiesAvailable"
            >Water Sports Activities
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <div v-show="property.waterSportsActivitiesAvailable">
        <!-- auqa gym -->
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.aquaGymnastics">
              aqua gymnastics
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.aquaGymnastics">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.aquaGymnasticsLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.aquaGymnasticsCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.severalMotorisedSports">
              several motorised water sports</b-form-checkbox
            >
          </b-col>
          <b-col cols="" v-if="property.severalMotorisedSports">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.severalMotorisedSportsLocalSupplier">
                  offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.severalMotorisedSportsCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.standUpPaddling"
              >Stand-up paddling
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.standUpPaddling">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.standUpPaddlingLocalSupplier">
                  offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.standUpPaddlingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.waterPolo">water polo</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.waterPolo">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.waterPoloLocalSupplier"
                  >offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.waterPoloCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.bananaBoat">banana boat </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.bananaBoat">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.bananaBoatLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.bananaBoatCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.boatTrip">boat trip </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.boatTrip">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.boatTripLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.boatTripCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.boogieBoards"
              >boogie boards
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.boogieBoards">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.boogieBoardsLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.boogieBoardsCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.canoe">canoe </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.canoe">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.canoeLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.canoeCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.catamaran">catamaran</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.catamaran">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.catamaranLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.catamaranCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.bCooling">b-cooling </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.bCooling">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.bCoolingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.bCoolingCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.angling">angling</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.angling">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.anglingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.anglingCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.glassBoatBottom"
              >glass bottom boat
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.glassBoatBottom">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.glassBoatBottomLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.glassBoatBottomCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.jetSkii">jet skiing </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.jetSkii">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.jetSkiiLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.jetSkiiCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.kayak">kayak </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.kayak">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.kayakLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.kayakCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.kiteSurfing"> kitesurfing</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.kiteSurfing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.kiteSurfingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.kiteSurfingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.motoBoat"> motorboat</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.motoBoat">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.motoBoatLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.motoBoatCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.localOpenAirPool"
              >local open air pool
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.localOpenAirPool">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.localOpenAirPoolLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.localOpenAirPoolCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.parasailing">parasailing </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.parasailing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.parasailingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.parasailingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.pedalo">pedalo </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.pedalo">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.pedaloLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.pedaloCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.rafting">rafting </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.rafting">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.raftingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.raftingCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.rowBoat">rowing boat </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.rowBoat">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.rowBoatLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.rowBoatCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.sailing">sailing</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.sailing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.sailingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.sailingCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.seaAngling">sea angling </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.seaAngling">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.seaAnglingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.seaAnglingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.snorkeling"> snorkeling</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.snorkeling">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.snorkelingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.snorkelingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.surfing"> surfing</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.surfing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.surfingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.surfingCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.coolingTasterCourse">
              b-cooling taster course
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.coolingTasterCourse">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.coolingTasterCourseLocalSupplier">
                  offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.coolingTasterCourseCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.wakeBoard"> wakeboard</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.wakeBoard">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.wakeBoardLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.wakeBoardCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.waterSki"> water ski</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.waterSki">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.waterSkiLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.waterSkiCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.windSurfing">windsurfing </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.windSurfing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.windSurfingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.windSurfingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <!-- end water sports -->
      <hr />
      <!-- ball sports -->
      <b-row>
        <b-col>
          <h5>Ball Sports</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <b-form-checkbox size="sm" v-model="property.ballSportsActivitiesAvailable"
            >Ball Sports Activities
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <div v-show="property.ballSportsActivitiesAvailable">
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.badminton"> Badminton</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.badminton">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.badmintonLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.badmintonCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.basketBall">Basketball </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.basketBall">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.basketBallLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.basketBallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.beachVolleyBall"
              >Beach volleyball
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.beachVolleyBall">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.beachVolleyBallLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.beachVolleyBallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.beachSoccer"
              >Beach soccer
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.beachSoccer">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.beachSoccerLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.beachSoccerCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.billiard"> Billiard</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.billiard">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.billiardLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.billiardCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.barce"> Borce</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.barce">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.barceLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.barceCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.bowling">Bowling </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.bowling">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.bowlingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.bowlingCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.cricket">Cricket </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.cricket">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.cricketLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.cricketCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.soccer">Soccer </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.soccer">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.soccerLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.soccerCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.golf">Golf </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.golf">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.golfLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.golfCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.skittles">Skittles </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.skittles">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.skittlesLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.skittlesCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.miniGolf"> Mini football</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.miniGolf">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.miniGolfLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.miniGolfCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.paddleTennis">
              Paddle tennis</b-form-checkbox
            >
          </b-col>
          <b-col cols="" v-if="property.paddleTennis">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.paddleTennisLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.paddleTennisCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.squash"> Squash</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.squash">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.squashLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.squashCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.tennis">Tennis </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.tennis">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.tennisLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.tennisCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.tableTennis"
              >Table tennis
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.tableTennis">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.tableTennisLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.tableTennisCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.volleyBall">Volleyball </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.volleyBall">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.volleyBallLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.volleyBallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <!-- end ball sports -->
      <hr />
      <b-row>
        <b-col>
          <h5>Winter Sports</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <b-form-checkbox size="sm" v-model="property.winterSportsActivitiesAvailable"
            >Winter Sports Activities
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <!-- winter sports -->
      <div v-show="property.winterSportsActivitiesAvailable">
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.alpineSkiing"
              >Alpine skiing
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.alpineSkiing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.alpineSkiingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.alpineSkiingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.crossCountrySkiing"
              >cross-country skiing
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.crossCountrySkiing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.crossCountrySkiingLocalSupplier">
                  offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.crossCountrySkiingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.snowBoarding"
              >snowboarding
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.snowBoarding">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.snowBoardingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.snowBoardingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.tobogganing"> tobogganing</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.tobogganing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.tobogganingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.tobogganingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <!-- end winter sports -->
      <hr />
      <b-row>
        <b-col>
          <h5>Other Sports</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="12">
          <b-form-checkbox size="sm" v-model="property.otherSportsActivitiesAvailable"
            >Other Sports Activities
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <!-- other sports -->
      <div v-show="property.otherSportsActivitiesAvailable">
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.airHockey">Air hockey </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.airHockey">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.airHockeyLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.airHockeyCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.airRifleShooting"
              >Air rifle shooting
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.airRifleShooting">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.airRifleShootingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.airRifleShootingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.archery">Archery </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.archery">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.archeryLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.archeryCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.ballooning">Ballooning </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.ballooning">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.ballooningLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.ballooningCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.bikeRental">Bike rental </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.bikeRental">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.bikeRentalLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.bikeRentalCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.camelRiding"
              >Camel riding
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.camelRiding">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.camelRidingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.camelRidingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.carriageRides"
              >Carriage rides
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.carriageRides">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.carriageRidesLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.carriageRidesCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.climbing"> Climbing</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.climbing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.climbingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.climbingCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.crossBowShooting"
              >Crossbow shooting
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.crossBowShooting">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.crossBowShootingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.crossBowShootingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.darts">Darts </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.darts">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.dartsLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.dartsCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.eBikeRental">
              E-Bike rental
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.eBikeRental">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.eBikeRentalLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.eBikeRentalCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.gameTown"> Gametown</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.gameTown">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.gameTownLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.gameTownCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.geoCoaching">Geocoaching </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.geoCoaching">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.geoCoachingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.geoCoachingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.giantChess">Giant chess </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.giantChess">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.giantChessLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.giantChessCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.guidedHikes"
              >Guided hikes
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.guidedHikes">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.guidedHikesLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.guidedHikesCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.horseRiding"
              >Horse riding
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.horseRiding">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.horseRidingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col>
                <div class="form-group row" cols="8">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.horseRidingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.laserBall">Laserball </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.laserBall">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.laserBallLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.laserBallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.multiFunctionalSpace">
              multifunctional space</b-form-checkbox
            >
          </b-col>
          <b-col cols="" v-if="property.multiFunctionalSpace">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.multiFunctionalSpaceLocalSupplier">
                  offered by local supplier(s)
                </b-form-checkbox>
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.multiFunctionalSpaceCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.paintBall">Paintball </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.paintBall">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.paintBallLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.paintBallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.paragliding">Paragliding </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.paragliding">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.paraglidingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.paraglidingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.pilates">Pilates </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.pilates">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.pilatesLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.pilatesCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.quadRental">Quad rental </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.quadRental">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.quadRentalLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.quadRentalCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.segwayRental"
              >Segway rental
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.segwayRental">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.segwayRentalLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.segwayRentalCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.shuffleBoard">
              Shuffleboard</b-form-checkbox
            >
          </b-col>
          <b-col cols="" v-if="property.shuffleBoard">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.shuffleBoardLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.shuffleBoardCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.spinning"> Spinning</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.spinning">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.spinningLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.spinningCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.summerToboGganing"
              >Summer tobogganing
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.summerToboGganing">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.summerToboGganingLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.summerToboGganingCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.tableFootBall"
              >Table football
            </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.tableFootBall">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.tableFootBallLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.tableFootBallCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.towerJump">Tower jump </b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.towerJump">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.towerJumpLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.towerJumpCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.yogaClass"> Yoga classes</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.yogaClass">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.yogaClassLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select
                      class="form-control form-control-sm"
                      v-model="property.yogaClassCharges"
                    >
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-checkbox size="sm" v-model="property.zipWire"> Zip wire</b-form-checkbox>
          </b-col>
          <b-col cols="" v-if="property.zipWire">
            <b-row>
              <b-col cols="5">
                <b-form-checkbox size="sm" v-model="property.zipWireLocalSupplier"
                  >offered by local supplier(s)</b-form-checkbox
                >
              </b-col>
              <b-col cols="7">
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                  <div class="col-sm-6">
                    <select class="form-control form-control-sm" v-model="property.zipWireCharges">
                      <option :value="null" selected>select</option>
                      <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                        {{ a }}
                      </option>
                    </select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <!-- End other sports -->
      <hr />
      <!-- Wellness facilities -->
      <b-row>
        <b-col>
          <h5>Wellness facilities Activities</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.steamBath"> Steam bath</b-form-checkbox>
        </b-col>
        <b-col>
          <b-row v-if="property.steamBath">
            <b-col cols="6">
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">
                  Admission from (Age)</label
                >
                <div class="col-sm-6">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    v-model="property.steamBathAdmissionFrom"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="6">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                <div class="col-sm-6">
                  <select class="form-control form-control-sm" v-model="property.steamBathCharges">
                    <option :value="null" selected>select</option>
                    <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.indoorSwimmingPool"
            >Indoor swimming pool
          </b-form-checkbox>
        </b-col>
        <b-col v-if="property.indoorSwimmingPool">
          <b-row>
            <b-col cols="5">
              <b-form-checkbox size="sm" v-model="property.indoorSwimmingPoolIsSeasonal">
                Seasonal
              </b-form-checkbox>
              <b-form-checkbox size="sm" v-model="property.indoorSwimmingPoolCheck">
                Coffee and cakes/pastries
              </b-form-checkbox>
            </b-col>
            <b-col cols="7">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                <div class="col-sm-6">
                  <select
                    class="form-control form-control-sm"
                    v-model="property.indoorSwimmingPoolCharges"
                  >
                    <option :value="null" selected>select</option>
                    <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">From</label>
                <div class="col-sm-6">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.indoorSwimmingPoolFrom"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">To</label>
                <div class="col-sm-6">
                  <input
                    class="form-control form-control-sm"
                    type="time"
                    v-model="property.indoorSwimmingPoolTo"
                  />
                </div>
              </div>
            </b-col>
          </b-row>
          <hr />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.saunas">Saunas </b-form-checkbox>
        </b-col>
        <b-col v-if="property.saunas">
          <b-row>
            <b-col cols="5">
              <div class="form-group row">
                <label class="col-sm-6 col-form-label col-form-label-sm">Number of saunas</label>
                <div class="col-sm-6">
                  <input
                    class="form-control form-control-sm"
                    type="number"
                    v-model="property.saunasCount"
                  />
                </div>
              </div>
            </b-col>
            <b-col cols="7">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">charges</label>
                <div class="col-sm-6">
                  <select class="form-control form-control-sm" v-model="property.saunasCharges">
                    <option :value="null" selected>select</option>
                    <option v-for="(a, index) in sportsChargesTypes" :key="index" :value="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm">Sauna Types</label>
                <div class="col-sm-6">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="property.saunasTypes.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in property.saunasTypes"
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
                      v-for="mealType in saunasOptions"
                      :key="mealType"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="property.saunasTypes"
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
        </b-col>
      </b-row>

      <hr />
      <!-- additional wellness -->
      <b-row>
        <b-col>
          <h5>Additional wellness services (additional charge)</h5>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.massages">Massages </b-form-checkbox>
        </b-col>
        <b-col v-if="property.massages">
          <b-row>
            <b-col>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm" style="font-weight: bold">
                  selection of massages</label
                >
                <div class="col-sm-6">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="property.massagesTypes.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in property.massagesTypes"
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
                      v-for="mealType in massagesOptions"
                      :key="mealType"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="property.massagesTypes"
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
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.medicalTreatment">
            Medical treatment
          </b-form-checkbox>
        </b-col>
        <b-col v-if="property.medicalTreatment">
          <div class="form-group row">
            <label class="col-sm-4 col-form-label col-form-label-sm" style="font-weight: bold"
              >selection of treathments</label
            >
            <div class="col-sm-6">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.medicalTreatmentTypes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.medicalTreatmentTypes"
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
                  v-for="mealType in medicalTreatmentOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.medicalTreatmentTypes"
                    @click.native.stop=""
                    :value="mealType"
                    >{{ mealType }}</b-form-checkbox
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label col-form-label-sm" style="font-weight: bold"
              >choice of baths</label
            >
            <div class="col-sm-6">
              <b-dropdown
                size="sm"
                boundary="viewport"
                variant="outline-dark"
                :text="property.medicalTreatmentBathes.length + ' Selected options'"
                class="m-md-2"
                style="max-width: 350px !important; font-weight: 600"
              >
                <b-card class="bcardmultidrop">
                  <div>
                    <b-badge
                      class="multidropbadge"
                      v-for="item in property.medicalTreatmentBathes"
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
                  v-for="mealType in medicalTreatmentPathOptions"
                  :key="mealType"
                  @click.native.capture.stop
                >
                  <b-form-checkbox
                    v-model="property.medicalTreatmentBathes"
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
        <b-col cols="3">
          <b-form-checkbox size="sm" v-model="property.beautyTreatment">
            Beauty treatment</b-form-checkbox
          >
        </b-col>
        <b-col v-if="property.beautyTreatment">
          <b-row id="wellnessbeautytreatments">
            <b-col>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label col-form-label-sm" style="font-weight: bold"
                  >wellness and beauty treatments</label
                >
                <div class="col-sm-6">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="outline-dark"
                    :text="property.wellnessBeautyTreatment.length + ' Selected options'"
                    class="m-md-2"
                    style="max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="item in property.wellnessBeautyTreatment"
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
                      v-for="mealType in wellnessBeautyTreatmentOptions"
                      :key="mealType"
                      @click.native.capture.stop
                    >
                      <b-form-checkbox
                        v-model="property.wellnessBeautyTreatment"
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
        </b-col>
      </b-row>
    </form>
  </div>
</template>
<script>
export default {
  name: "sportsAndWellnessFactsComp",
  components: {},
  data() {
    return {
      property: this.$store.getters["sportsAndWellnessFactsComp/getProperty"],
      value: null,
      options: ["list", "of", "options"],
      isLoading: false,
      sportsChargesTypes: [
        "Deposit required",
        "For additional charge",
        "Inclusive",
        "Only with all inclusive package",
        "Only with all inclusive plus",
      ],
      errors: [],
    };
  },
  computed: {
    saunasOptions() {
      return this.$store.getters["options/getSaunasOptions"];
    },
    massagesOptions() {
      return this.$store.getters["options/getMassagesOptions"];
    },
    medicalTreatmentOptions() {
      return this.$store.getters["options/getMedicalTreatmentOptions"];
    },
    medicalTreatmentPathOptions() {
      return this.$store.getters["options/getMedicalTreatmentPathOptions"];
    },
    wellnessBeautyTreatmentOptions() {
      return this.$store.getters["options/getWellnessBeautyTreatmentOptions"];
    },

    cAerobicsLocalSupplier() {
      return this.property.aerobicsAvailable && this.property.aerobicsLocalSupplier;
    },
    cAerobicsCharges() {
      return this.property.aerobicsAvailable ? this.property.aerobicsCharges : null;
    },
    cAerobicsClassAvailable() {
      return this.property.aerobicsAvailable && this.property.aerobicsClassAvailable;
    },
    cBoulderWallLocalSupplier() {
      return this.property.boulderWallAvailable && this.property.boulderWallLocalSupplier;
    },
    cBoulderWallCharges() {
      return this.property.boulderWallAvailable ? this.property.boulderWallCharges : null;
    },
    cBoulderWallClass() {
      return this.property.boulderWallAvailable && this.property.boulderWallClass;
    },
    cFitnessCentreLocalSupplier() {
      return this.property.fitnessCentreAvailable && this.property.fitnessCentreLocalSupplier;
    },
    cFitnessCentreCharges() {
      return this.property.fitnessCentreAvailable ? this.property.fitnessCentreCharges : null;
    },
    cFitnessCentreSize() {
      return this.property.fitnessCentreAvailable ? this.property.fitnessCentreSize : null;
    },
    cFitnessCentreAgeFrom() {
      return this.property.fitnessCentreAvailable ? this.property.fitnessCentreAgeFrom : null;
    },
    cFitnessCentreInWellness() {
      return this.property.fitnessCentreAvailable && this.property.fitnessCentreInWellness;
    },
    cFitnessCentreClassAvailable() {
      return this.property.fitnessCentreAvailable && this.property.fitnessCentreClassAvailable;
    },
    cGymLocalSupplier() {
      return this.property.gymAvailable && this.property.gymLocalSupplier;
    },
    cGymCharges() {
      return this.property.gymAvailable ? this.property.gymCharges : null;
    },
    cGymSize() {
      return this.property.gymAvailable ? this.property.gymSize : null;
    },
    cGymAgeFrom() {
      return this.property.gymAvailable ? this.property.gymAgeFrom : null;
    },
    cGymInWellness() {
      return this.property.gymAvailable && this.property.gymInWellness;
    },
    cGymTrainingAvailable() {
      return this.property.gymAvailable && this.property.gymTrainingAvailable;
    },
    cGymnasticsLocalSupplier() {
      return this.property.gymnasticsAvailable && this.property.gymnasticsLocalSupplier;
    },
    cGymnasticsCharges() {
      return this.property.gymnasticsAvailable ? this.property.gymnasticsCharges : null;
    },
    cClimbingWallLocalSupplier() {
      return this.property.climbingWallAvailable && this.property.climbingWallLocalSupplier;
    },
    cClimbingWallCharges() {
      return this.property.climbingWallAvailable ? this.property.climbingWallCharges : null;
    },
    cClimbingWallClass() {
      return this.property.climbingWallAvailable && this.property.climbingWallClass;
    },
    cMountainBikeTourLocalSupplier() {
      return this.property.mountainBikeTour && this.property.mountainBikeTourLocalSupplier;
    },
    cMountainBikeTourCharges() {
      return this.property.mountainBikeTour ? this.property.mountainBikeTourCharges : null;
    },

    cMountainBikeRentalLocalSupplier() {
      return this.property.mountainBikeRental && this.property.mountainBikeRentalLocalSupplier;
    },
    cMountainBikeRentalCharges() {
      return this.property.mountainBikeRental ? this.property.mountainBikeRentalCharges : null;
    },
    cNordicWalkingLocalSupplier() {
      return this.property.nordicWalking && this.property.nordicWalkingLocalSupplier;
    },
    cNordicWalkingCharges() {
      return this.property.nordicWalking ? this.property.nordicWalkingCharges : null;
    },
    cNordicWalkingTraining() {
      return this.property.nordicWalking && this.property.nordicWalkingTraining;
    },
    cNordicWalkingEquipRental() {
      return this.property.nordicWalking && this.property.nordicWalkingEquipRental;
    },
    cNordicWalkingEquipCharges() {
      return this.property.nordicWalking ? this.property.nordicWalkingEquipCharges : null;
    },
    cOpenAirFitnessLocalSupplier() {
      return this.property.openAirFitness && this.property.openAirFitnessLocalSupplier;
    },
    cOpenAirFitnessCharges() {
      return this.property.openAirFitness ? this.property.openAirFitnessCharges : null;
    },
    cStepAerobicsLocalSupplier() {
      return this.property.stepAerobics && this.property.stepAerobicsLocalSupplier;
    },
    cStepAerobicsCharges() {
      return this.property.stepAerobics ? this.property.stepAerobicsCharges : null;
    },
    cStepAerobicsTraining() {
      return this.property.stepAerobics && this.property.stepAerobicsTraining;
    },
    cDanceClassLocalSupplier() {
      return this.property.danceClass && this.property.danceClassLocalSupplier;
    },
    cDanceClassCharges() {
      return this.property.danceClass ? this.property.danceClassCharges : null;
    },
    cFitnessClassLocalSupplier() {
      return this.property.fitnessClass && this.property.fitnessClassLocalSupplier;
    },
    cFitnessClassCharges() {
      return this.property.fitnessClass ? this.property.fitnessClassCharges : null;
    },
    cAquaGymnasticsLocalSupplier() {
      return this.property.aquaGymnastics && this.property.aquaGymnasticsLocalSupplier;
    },
    cAquaGymnasticsCharges() {
      return this.property.aquaGymnastics ? this.property.aquaGymnasticsCharges : null;
    },
    cSeveralMotorisedSportsLocalSupplier() {
      return (
        this.property.severalMotorisedSports && this.property.severalMotorisedSportsLocalSupplier
      );
    },
    cSeveralMotorisedSportsCharges() {
      return this.property.severalMotorisedSports
        ? this.property.severalMotorisedSportsCharges
        : null;
    },
    cStandUpPaddlingLocalSupplier() {
      return this.property.standUpPaddling && this.property.standUpPaddlingLocalSupplier;
    },
    cStandUpPaddlingCharges() {
      return this.property.standUpPaddling ? this.property.standUpPaddlingCharges : null;
    },
    cWaterPoloLocalSupplier() {
      return this.property.waterPolo && this.property.waterPoloLocalSupplier;
    },
    cWaterPoloCharges() {
      return this.property.waterPolo ? this.property.waterPoloCharges : null;
    },
    cBananaBoatLocalSupplier() {
      return this.property.bananaBoat && this.property.bananaBoatLocalSupplier;
    },
    cBananaBoatCharges() {
      return this.property.bananaBoat ? this.property.bananaBoatCharges : null;
    },
    cBoatTripLocalSupplier() {
      return this.property.boatTrip && this.property.boatTripLocalSupplier;
    },
    cBoatTripCharges() {
      return this.property.boatTrip ? this.property.boatTripCharges : null;
    },
    cBoogieBoardsLocalSupplier() {
      return this.property.boogieBoards && this.property.boogieBoardsLocalSupplier;
    },
    cBoogieBoardsCharges() {
      return this.property.boogieBoards ? this.property.boogieBoardsCharges : null;
    },
    cCanoeLocalSupplier() {
      return this.property.canoe && this.property.canoeLocalSupplier;
    },
    cCanoeCharges() {
      return this.property.canoe ? this.property.canoeCharges : null;
    },
    cCatamaranLocalSupplier() {
      return this.property.catamaran && this.property.catamaranLocalSupplier;
    },
    cCatamaranCharges() {
      return this.property.catamaran ? this.property.catamaranCharges : null;
    },
    cBCoolingLocalSupplier() {
      return this.property.bCooling && this.property.bCoolingLocalSupplier;
    },
    cBCoolingCharges() {
      return this.property.bCooling ? this.property.bCoolingCharges : null;
    },
    cAnglingLocalSupplier() {
      return this.property.angling && this.property.anglingLocalSupplier;
    },
    cAnglingCharges() {
      return this.property.angling ? this.property.anglingCharges : null;
    },
    cGlassBoatBottomLocalSupplier() {
      return this.property.glassBoatBottom && this.property.glassBoatBottomLocalSupplier;
    },
    cGlassBoatBottomCharges() {
      return this.property.glassBoatBottom ? this.property.glassBoatBottomCharges : null;
    },
    cJetSkiiLocalSupplier() {
      return this.property.jetSkii && this.property.jetSkiiLocalSupplier;
    },
    cJetSkiiCharges() {
      return this.property.jetSkii ? this.property.jetSkiiCharges : null;
    },
    cKayakLocalSupplier() {
      return this.property.kayak && this.property.kayakLocalSupplier;
    },
    cKayakCharges() {
      return this.property.kayak ? this.property.kayakCharges : null;
    },
    cKiteSurfingLocalSupplier() {
      return this.property.kiteSurfing && this.property.kiteSurfingLocalSupplier;
    },
    cKiteSurfingCharges() {
      return this.property.kiteSurfing ? this.property.kiteSurfingCharges : null;
    },
    cMotoBoatLocalSupplier() {
      return this.property.motoBoat && this.property.motoBoatLocalSupplier;
    },
    cMotoBoatCharges() {
      return this.property.motoBoat ? this.property.motoBoatCharges : null;
    },
    cLocalOpenAirPoolLocalSupplier() {
      return this.property.localOpenAirPool && this.property.localOpenAirPoolLocalSupplier;
    },
    cLocalOpenAirPoolCharges() {
      return this.property.localOpenAirPool ? this.property.localOpenAirPoolCharges : null;
    },
    cParasailingLocalSupplier() {
      return this.property.parasailing && this.property.parasailingLocalSupplier;
    },
    cParasailingCharges() {
      return this.property.parasailing ? this.property.parasailingCharges : null;
    },
    cPedaloLocalSupplier() {
      return this.property.pedalo && this.property.pedaloLocalSupplier;
    },
    cPedaloCharges() {
      return this.property.pedalo ? this.property.pedaloCharges : null;
    },
    cRaftingLocalSupplier() {
      return this.property.rafting && this.property.raftingLocalSupplier;
    },
    cRaftingCharges() {
      return this.property.rafting ? this.property.raftingCharges : null;
    },
    cRowBoatLocalSupplier() {
      return this.property.rowBoat && this.property.rowBoatLocalSupplier;
    },
    cRowBoatCharges() {
      return this.property.rowBoat ? this.property.rowBoatCharges : null;
    },
    cSailingLocalSupplier() {
      return this.property.sailing && this.property.sailingLocalSupplier;
    },
    cSailingCharges() {
      return this.property.sailing ? this.property.sailingCharges : null;
    },
    cSeaAnglingLocalSupplier() {
      return this.property.seaAngling && this.property.seaAnglingLocalSupplier;
    },
    cSeaAnglingCharges() {
      return this.property.seaAngling ? this.property.seaAnglingCharges : null;
    },
    cSnorkelingLocalSupplier() {
      return this.property.snorkeling && this.property.snorkelingLocalSupplier;
    },
    cSnorkelingCharges() {
      return this.property.snorkeling ? this.property.snorkelingCharges : null;
    },
    cSurfingLocalSupplier() {
      return this.property.surfing && this.property.surfingLocalSupplier;
    },
    cSurfingCharges() {
      return this.property.surfing ? this.property.surfingCharges : null;
    },
    cCoolingTasterCourseLocalSupplier() {
      return this.property.coolingTasterCourse && this.property.coolingTasterCourseLocalSupplier;
    },
    cCoolingTasterCourseCharges() {
      return this.property.coolingTasterCourse ? this.property.coolingTasterCourseCharges : null;
    },
    cWakeBoardLocalSupplier() {
      return this.property.wakeBoard && this.property.wakeBoardLocalSupplier;
    },
    cWakeBoardCharges() {
      return this.property.wakeBoard ? this.property.wakeBoardCharges : null;
    },
    cWaterSkiLocalSupplier() {
      return this.property.waterSki && this.property.waterSkiLocalSupplier;
    },
    cWaterSkiCharges() {
      return this.property.waterSki ? this.property.waterSkiCharges : null;
    },
    cWindSurfingLocalSupplier() {
      return this.property.windSurfing && this.property.windSurfingLocalSupplier;
    },
    cWindSurfingCharges() {
      return this.property.windSurfing ? this.property.windSurfingCharges : null;
    },
    cBadmintonLocalSupplier() {
      return this.property.badminton && this.property.badmintonLocalSupplier;
    },
    cBadmintonCharges() {
      return this.property.badminton ? this.property.badmintonCharges : null;
    },
    cBasketBallLocalSupplier() {
      return this.property.basketBall && this.property.basketBallLocalSupplier;
    },
    cBasketBallCharges() {
      return this.property.basketBall ? this.property.basketBallCharges : null;
    },
    cBeachVolleyBallLocalSupplier() {
      return this.property.beachVolleyBall && this.property.beachVolleyBallLocalSupplier;
    },
    cBeachVolleyBallCharges() {
      return this.property.beachVolleyBall ? this.property.beachVolleyBallCharges : null;
    },
    cBeachSoccerLocalSupplier() {
      return this.property.beachSoccer && this.property.beachSoccerLocalSupplier;
    },
    cBeachSoccerCharges() {
      return this.property.beachSoccer ? this.property.beachSoccerCharges : null;
    },
    cBilliardLocalSupplier() {
      return this.property.billiard && this.property.billiardLocalSupplier;
    },
    cBilliardCharges() {
      return this.property.billiard ? this.property.billiardCharges : null;
    },
    cBarceLocalSupplier() {
      return this.property.barce && this.property.barceLocalSupplier;
    },
    cBarceCharges() {
      return this.property.barce ? this.property.barceCharges : null;
    },
    cBowlingLocalSupplier() {
      return this.property.bowling && this.property.bowlingLocalSupplier;
    },
    cBowlingCharges() {
      return this.property.bowling ? this.property.bowlingCharges : null;
    },
    cCricketLocalSupplier() {
      return this.property.cricket && this.property.cricketLocalSupplier;
    },
    cCricketCharges() {
      return this.property.cricket ? this.property.cricketCharges : null;
    },
    cSoccerLocalSupplier() {
      return this.property.soccer && this.property.soccerLocalSupplier;
    },
    cSoccerCharges() {
      return this.property.soccer ? this.property.soccerCharges : null;
    },
    cGolfLocalSupplier() {
      return this.property.golf && this.property.golfLocalSupplier;
    },
    cGolfCharges() {
      return this.property.golf ? this.property.golfCharges : null;
    },
    cSkittlesLocalSupplier() {
      return this.property.skittles && this.property.skittlesLocalSupplier;
    },
    cSkittlesCharges() {
      return this.property.skittles ? this.property.skittlesCharges : null;
    },
    cMiniGolfLocalSupplier() {
      return this.property.miniGolf && this.property.miniGolfLocalSupplier;
    },
    cMiniGolfCharges() {
      return this.property.miniGolf ? this.property.miniGolfCharges : null;
    },
    cPaddleTennisLocalSupplier() {
      return this.property.paddleTennis && this.property.paddleTennisLocalSupplier;
    },
    cPaddleTennisCharges() {
      return this.property.paddleTennis ? this.property.paddleTennisCharges : null;
    },
    cSquashLocalSupplier() {
      return this.property.squash && this.property.squashLocalSupplier;
    },
    cSquashCharges() {
      return this.property.squash ? this.property.squashCharges : null;
    },
    cTennisLocalSupplier() {
      return this.property.tennis && this.property.tennisLocalSupplier;
    },
    cTennisCharges() {
      return this.property.tennis ? this.property.tennisCharges : null;
    },
    cTableTennisLocalSupplier() {
      return this.property.tableTennis && this.property.tableTennisLocalSupplier;
    },
    cTableTennisCharges() {
      return this.property.tableTennis ? this.property.tableTennisCharges : null;
    },
    cVolleyBallLocalSupplier() {
      return this.property.volleyBall && this.property.volleyBallLocalSupplier;
    },
    cVolleyBallCharges() {
      return this.property.volleyBall ? this.property.volleyBallCharges : null;
    },
    cAlpineSkiingLocalSupplier() {
      return this.property.alpineSkiing && this.property.alpineSkiingLocalSupplier;
    },
    cAlpineSkiingCharges() {
      return this.property.alpineSkiing ? this.property.alpineSkiingCharges : null;
    },
    cCrossCountrySkiingLocalSupplier() {
      return this.property.crossCountrySkiing && this.property.crossCountrySkiingLocalSupplier;
    },
    cCrossCountrySkiingCharges() {
      return this.property.crossCountrySkiing ? this.property.crossCountrySkiingCharges : null;
    },
    cSnowBoardingLocalSupplier() {
      return this.property.snowBoarding && this.property.snowBoardingLocalSupplier;
    },
    cSnowBoardingCharges() {
      return this.property.snowBoarding ? this.property.snowBoardingCharges : null;
    },
    cTobogganingLocalSupplier() {
      return this.property.tobogganing && this.property.tobogganingLocalSupplier;
    },
    cTobogganingCharges() {
      return this.property.tobogganing ? this.property.tobogganingCharges : null;
    },
    cAirHockeyLocalSupplier() {
      return this.property.airHockey && this.property.airHockeyLocalSupplier;
    },
    cAirHockeyCharges() {
      return this.property.airHockey ? this.property.airHockeyCharges : null;
    },
    cAirRifleShootingLocalSupplier() {
      return this.property.airRifleShooting && this.property.airRifleShootingLocalSupplier;
    },
    cAirRifleShootingCharges() {
      return this.property.airRifleShooting ? this.property.airRifleShootingCharges : null;
    },
    cArcheryLocalSupplier() {
      return this.property.archery && this.property.archeryLocalSupplier;
    },
    cArcheryCharges() {
      return this.property.archery ? this.property.archeryCharges : null;
    },
    cBallooningLocalSupplier() {
      return this.property.ballooning && this.property.ballooningLocalSupplier;
    },
    cBallooningCharges() {
      return this.property.ballooning ? this.property.ballooningCharges : null;
    },
    cBikeRentalLocalSupplier() {
      return this.property.bikeRental && this.property.bikeRentalLocalSupplier;
    },
    cBikeRentalCharges() {
      return this.property.bikeRental ? this.property.bikeRentalCharges : null;
    },
    cCamelRidingLocalSupplier() {
      return this.property.camelRiding && this.property.camelRidingLocalSupplier;
    },
    cCamelRidingCharges() {
      return this.property.camelRiding ? this.property.camelRidingCharges : null;
    },
    cCarriageRidesLocalSupplier() {
      return this.property.carriageRides && this.property.carriageRidesLocalSupplier;
    },
    cCarriageRidesCharges() {
      return this.property.carriageRides ? this.property.carriageRidesCharges : null;
    },
    cClimbingLocalSupplier() {
      return this.property.climbing && this.property.climbingLocalSupplier;
    },
    cClimbingCharges() {
      return this.property.climbing ? this.property.climbingCharges : null;
    },
    cCrossBowShootingLocalSupplier() {
      return this.property.crossBowShooting && this.property.crossBowShootingLocalSupplier;
    },
    cCrossBowShootingCharges() {
      return this.property.crossBowShooting ? this.property.crossBowShootingCharges : null;
    },
    cDartsLocalSupplier() {
      return this.property.darts && this.property.dartsLocalSupplier;
    },
    cDartsCharges() {
      return this.property.darts ? this.property.dartsCharges : null;
    },
    cEBikeRentalLocalSupplier() {
      return this.property.eBikeRental && this.property.eBikeRentalLocalSupplier;
    },
    cEBikeRentalCharges() {
      return this.property.eBikeRental ? this.property.eBikeRentalCharges : null;
    },
    cGameTownLocalSupplier() {
      return this.property.gameTown && this.property.gameTownLocalSupplier;
    },
    cGameTownCharges() {
      return this.property.gameTown ? this.property.gameTownCharges : null;
    },
    cGeoCoachingLocalSupplier() {
      return this.property.geoCoaching && this.property.geoCoachingLocalSupplier;
    },
    cGeoCoachingCharges() {
      return this.property.geoCoaching ? this.property.geoCoachingCharges : null;
    },
    cGiantChessLocalSupplier() {
      return this.property.giantChess && this.property.giantChessLocalSupplier;
    },
    cGiantChessCharges() {
      return this.property.giantChess ? this.property.giantChessCharges : null;
    },
    cGuidedHikesLocalSupplier() {
      return this.property.guidedHikes && this.property.guidedHikesLocalSupplier;
    },
    cGuidedHikesCharges() {
      return this.property.guidedHikes ? this.property.guidedHikesCharges : null;
    },
    cHorseRidingLocalSupplier() {
      return this.property.horseRiding && this.property.horseRidingLocalSupplier;
    },
    cHorseRidingCharges() {
      return this.property.horseRiding ? this.property.horseRidingCharges : null;
    },
    cLaserBallLocalSupplier() {
      return this.property.laserBall && this.property.laserBallLocalSupplier;
    },
    cLaserBallCharges() {
      return this.property.laserBall ? this.property.laserBallCharges : null;
    },
    cMultiFunctionalSpaceLocalSupplier() {
      return this.property.multiFunctionalSpace && this.property.multiFunctionalSpaceLocalSupplier;
    },
    cMultiFunctionalSpaceCharges() {
      return this.property.multiFunctionalSpace ? this.property.multiFunctionalSpaceCharges : null;
    },
    cPaintBallLocalSupplier() {
      return this.property.paintBall && this.property.paintBallLocalSupplier;
    },
    cPaintBallCharges() {
      return this.property.paintBall ? this.property.paintBallCharges : null;
    },
    cParaglidingLocalSupplier() {
      return this.property.paragliding && this.property.paraglidingLocalSupplier;
    },
    cParaglidingCharges() {
      return this.property.paragliding ? this.property.paraglidingCharges : null;
    },
    cPilatesLocalSupplier() {
      return this.property.pilates && this.property.pilatesLocalSupplier;
    },
    cPilatesCharges() {
      return this.property.pilates ? this.property.pilatesCharges : null;
    },
    cQuadRentalLocalSupplier() {
      return this.property.quadRental && this.property.quadRentalLocalSupplier;
    },
    cQuadRentalCharges() {
      return this.property.quadRental ? this.property.quadRentalCharges : null;
    },
    cSegwayRentalLocalSupplier() {
      return this.property.segwayRental && this.property.segwayRentalLocalSupplier;
    },
    cSegwayRentalCharges() {
      return this.property.segwayRental ? this.property.segwayRentalCharges : null;
    },
    cShuffleBoardLocalSupplier() {
      return this.property.shuffleBoard && this.property.shuffleBoardLocalSupplier;
    },
    cShuffleBoardCharges() {
      return this.property.shuffleBoard ? this.property.shuffleBoardCharges : null;
    },
    cSpinningLocalSupplier() {
      return this.property.spinning && this.property.spinningLocalSupplier;
    },
    cSpinningCharges() {
      return this.property.spinning ? this.property.spinningCharges : null;
    },
    cSummerToboGganingLocalSupplier() {
      return this.property.summerToboGganing && this.property.summerToboGganingLocalSupplier;
    },
    cSummerToboGganingCharges() {
      return this.property.summerToboGganing ? this.property.summerToboGganingCharges : null;
    },
    cTableFootBallLocalSupplier() {
      return this.property.tableFootBall && this.property.tableFootBallLocalSupplier;
    },
    cTableFootBallCharges() {
      return this.property.tableFootBall ? this.property.tableFootBallCharges : null;
    },
    cTowerJumpLocalSupplier() {
      return this.property.towerJump && this.property.towerJumpLocalSupplier;
    },
    cTowerJumpCharges() {
      return this.property.towerJump ? this.property.towerJumpCharges : null;
    },
    cYogaClassLocalSupplier() {
      return this.property.yogaClass && this.property.yogaClassLocalSupplier;
    },
    cYogaClassCharges() {
      return this.property.yogaClass ? this.property.yogaClassCharges : null;
    },
    cZipWireLocalSupplier() {
      return this.property.zipWire && this.property.zipWireLocalSupplier;
    },
    cZipWireCharges() {
      return this.property.zipWire ? this.property.zipWireCharges : null;
    },
    cSteamBathAdmissionFrom() {
      return this.property.steamBath ? this.property.steamBathAdmissionFrom : null;
    },
    cSteamBathCharges() {
      return this.property.steamBath ? this.property.steamBathCharges : null;
    },
    cIndoorSwimmingPoolCharges() {
      return this.property.indoorSwimmingPool ? this.property.indoorSwimmingPoolCharges : null;
    },
    cIndoorSwimmingPoolIsSeasonal() {
      return this.property.indoorSwimmingPool && this.property.indoorSwimmingPoolIsSeasonal;
    },
    cIndoorSwimmingPoolCheck() {
      return this.property.indoorSwimmingPool && this.property.indoorSwimmingPoolCheck;
    },
    cIndoorSwimmingPoolFrom() {
      return this.property.indoorSwimmingPool ? this.property.indoorSwimmingPoolFrom : null;
    },
    cIndoorSwimmingPoolTo() {
      return this.property.indoorSwimmingPool ? this.property.indoorSwimmingPoolTo : null;
    },
    cSaunasCount() {
      return this.property.saunas ? this.property.saunasCount : null;
    },
    cSaunasCharges() {
      return this.property.saunas ? this.property.saunasCharges : null;
    },
    cSaunasTypes() {
      return this.property.saunas ? this.property.saunasTypes : [];
    },
    cMassagesTypes() {
      return this.property.massages ? this.property.massagesTypes : [];
    },
    cMedicalTreatmentTypes() {
      return this.property.medicalTreatment ? this.property.medicalTreatmentTypes : [];
    },
    cMedicalTreatmentBathes() {
      return this.property.medicalTreatment ? this.property.medicalTreatmentBathes : [];
    },
    cWellnessBeautyTreatment() {
      return this.property.medicalTreatment ? this.property.wellnessBeautyTreatment : [];
    },
  },
  created() {},
  methods: {
    getInfo() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const propertyId = this.$route.params.id;
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("sportsAndWellnessFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.property = this.$store.getters["sportsAndWellnessFactsComp/getProperty"];
          this.errors = this.$store.getters["sportsAndWellnessFactsComp/getErrors"];
          this.$store.dispatch("view/load", false);
          this.isLoading = false;
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          this.$store.dispatch("view/load", false);
          this.isLoading = false;
        });
      /* console.log("info gotten"); */
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
      const sportsToUpdate = {
        id: this.property.id,
        sports_available: this.property.sportsAvailable,
        hotel: this.property.id || propertyId,
        aerobics_available: this.property.aerobicsAvailable,
        aerobics_local_supplier: this.cAerobicsLocalSupplier,
        aerobics_charges: this.cAerobicsCharges,
        aerobics_class_available: this.cAerobicsClassAvailable,
        boulder_wall_available: this.property.boulderWallAvailable,
        boulder_wall_local_supplier: this.cBoulderWallLocalSupplier,
        boulder_wall_charges: this.cBoulderWallCharges,
        boulder_wall_class: this.cBoulderWallClass,
        fitness_centre_available: this.property.fitnessCentreAvailable,
        fitness_centre_local_supplier: this.cFitnessCentreLocalSupplier,
        fitness_centre_charges: this.cFitnessCentreCharges,
        fitness_centre_size: this.cFitnessCentreSize,
        fitness_centre_age_from: this.cFitnessCentreAgeFrom,
        fitness_centre_in_wellness: this.cFitnessCentreInWellness,
        fitness_centre_class_available: this.cFitnessCentreClassAvailable,
        gym_available: this.property.gymAvailable,
        gym_local_supplier: this.cGymLocalSupplier,
        gym_charges: this.cGymCharges,
        gym_size: this.cGymSize,
        gym_age_from: this.cGymAgeFrom,
        gym_in_wellness: this.cGymInWellness,
        gym_training_available: this.cGymTrainingAvailable,
        gymnastics_available: this.property.gymnasticsAvailable,
        gymnastics_local_supplier: this.cGymnasticsLocalSupplier,
        gymnastics_charges: this.cGymnasticsCharges,
        climbing_wall_available: this.property.climbingWallAvailable,
        climbing_wall_local_supplier: this.cClimbingWallLocalSupplier,
        climbing_wall_charges: this.cClimbingWallCharges,
        climbing_wall_class: this.cClimbingWallClass,
        mountain_bike_tour: this.property.mountainBikeTour,
        mountain_bike_tour_local_supplier: this.cMountainBikeTourLocalSupplier,
        mountain_bike_tour_charges: this.cMountainBikeTourCharges,
        mountain_bike_rental: this.property.mountainBikeRental,
        mountain_bike_rental_local_supplier: this.cMountainBikeRentalLocalSupplier,
        mountain_bike_rental_charges: this.cMountainBikeRentalCharges,
        nordic_walking: this.property.nordicWalking,
        nordic_walking_local_supplier: this.cNordicWalkingLocalSupplier,
        nordic_walking_charges: this.cNordicWalkingCharges,
        nordic_walking_training: this.cNordicWalkingTraining,
        nordic_walking_equip_rental: this.cNordicWalkingEquipRental,
        nordic_walking_equip_charges: this.cNordicWalkingEquipCharges,
        open_air_fitness: this.property.openAirFitness,
        open_air_fitness_local_supplier: this.cOpenAirFitnessLocalSupplier,
        open_air_fitness_charges: this.cOpenAirFitnessCharges,
        step_aerobics: this.property.stepAerobics,
        step_aerobics_local_supplier: this.cStepAerobicsLocalSupplier,
        step_aerobics_charges: this.cStepAerobicsCharges,
        step_aerobics_training: this.cStepAerobicsTraining,
        dance_class: this.property.danceClass,
        dance_class_local_supplier: this.cDanceClassLocalSupplier,
        dance_class_charges: this.cDanceClassCharges,
        fitness_class: this.property.fitnessClass,
        fitness_class_local_supplier: this.cFitnessClassLocalSupplier,
        fitness_class_charges: this.cFitnessClassCharges,
        water_sports_activities_available: this.property.waterSportsActivitiesAvailable,
        aqua_gymnastics: this.property.aquaGymnastics,
        aqua_gymnastics_local_supplier: this.cAquaGymnasticsLocalSupplier,
        aqua_gymnastics_charges: this.cAquaGymnasticsCharges,
        several_motorised_sports: this.property.severalMotorisedSports,
        several_motorised_sports_local_supplier: this.cSeveralMotorisedSportsLocalSupplier,
        several_motorised_sports_charges: this.cSeveralMotorisedSportsCharges,
        stand_up_paddling: this.property.standUpPaddling,
        stand_up_paddling_local_supplier: this.cStandUpPaddlingLocalSupplier,
        stand_up_paddling_charges: this.cStandUpPaddlingCharges,
        water_polo: this.property.waterPolo,
        water_polo_local_supplier: this.cWaterPoloLocalSupplier,
        water_polo_charges: this.cWaterPoloCharges,
        banana_boat: this.property.bananaBoat,
        banana_boat_local_supplier: this.cBananaBoatLocalSupplier,
        banana_boat_charges: this.cBananaBoatCharges,
        boat_trip: this.property.boatTrip,
        boat_trip_local_supplier: this.cBoatTripLocalSupplier,
        boat_trip_charges: this.cBoatTripCharges,
        boogie_boards: this.property.boogieBoards,
        boogie_boards_local_supplier: this.cBoogieBoardsLocalSupplier,
        boogie_boards_charges: this.cBoogieBoardsCharges,
        canoe: this.property.canoe,
        canoe_local_supplier: this.cCanoeLocalSupplier,
        canoe_charges: this.cCanoeCharges,
        catamaran: this.property.catamaran,
        catamaran_local_supplier: this.cCatamaranLocalSupplier,
        catamaran_charges: this.cCatamaranCharges,
        b_cooling: this.property.bCooling,
        b_cooling_local_supplier: this.cBCoolingLocalSupplier,
        b_cooling_charges: this.cBCoolingCharges,
        angling: this.property.angling,
        angling_local_supplier: this.cAnglingLocalSupplier,
        angling_charges: this.cAnglingCharges,
        glass_boat_bottom: this.property.glassBoatBottom,
        glass_boat_bottom_local_supplier: this.cGlassBoatBottomLocalSupplier,
        glass_boat_bottom_charges: this.cGlassBoatBottomCharges,
        jet_skii: this.property.jetSkii,
        jet_skii_local_supplier: this.cJetSkiiLocalSupplier,
        jet_skii_charges: this.cJetSkiiCharges,
        kayak: this.property.kayak,
        kayak_local_supplier: this.cKayakLocalSupplier,
        kayak_charges: this.cKayakCharges,
        kite_surfing: this.property.kiteSurfing,
        kite_surfing_local_supplier: this.cKiteSurfingLocalSupplier,
        kite_surfing_charges: this.cKiteSurfingCharges,
        moto_boat: this.property.motoBoat,
        moto_boat_local_supplier: this.cMotoBoatLocalSupplier,
        moto_boat_charges: this.cMotoBoatCharges,
        local_open_air_pool: this.property.localOpenAirPool,
        local_open_air_pool_local_supplier: this.cLocalOpenAirPoolLocalSupplier,
        local_open_air_pool_charges: this.cLocalOpenAirPoolCharges,
        parasailing: this.property.parasailing,
        parasailing_local_supplier: this.cParasailingLocalSupplier,
        parasailing_charges: this.cParasailingCharges,
        pedalo: this.property.pedalo,
        pedalo_local_supplier: this.cPedaloLocalSupplier,
        pedalo_charges: this.cPedaloCharges,
        rafting: this.property.rafting,
        rafting_local_supplier: this.cRaftingLocalSupplier,
        rafting_charges: this.cRaftingCharges,
        row_boat: this.property.rowBoat,
        row_boat_local_supplier: this.cRowBoatLocalSupplier,
        row_boat_charges: this.cRowBoatCharges,
        sailing: this.property.sailing,
        sailing_local_supplier: this.cSailingLocalSupplier,
        sailing_charges: this.cSailingCharges,
        sea_angling: this.property.seaAngling,
        sea_angling_local_supplier: this.cSeaAnglingLocalSupplier,
        sea_angling_charges: this.cSeaAnglingCharges,
        snorkeling: this.property.snorkeling,
        snorkeling_local_supplier: this.cSnorkelingLocalSupplier,
        snorkeling_charges: this.cSnorkelingCharges,
        surfing: this.property.surfing,
        surfing_local_supplier: this.cSurfingLocalSupplier,
        surfing_charges: this.cSurfingCharges,
        cooling_taster_course: this.property.coolingTasterCourse,
        cooling_taster_course_local_supplier: this.cCoolingTasterCourseLocalSupplier,
        cooling_taster_course_charges: this.cCoolingTasterCourseCharges,
        wake_board: this.property.wakeBoard,
        wake_board_local_supplier: this.cWakeBoardLocalSupplier,
        wake_board_charges: this.cWakeBoardCharges,
        water_ski: this.property.waterSki,
        water_ski_local_supplier: this.cWaterSkiLocalSupplier,
        water_ski_charges: this.cWaterSkiCharges,
        wind_surfing: this.property.windSurfing,
        wind_surfing_local_supplier: this.cWindSurfingLocalSupplier,
        wind_surfing_charges: this.cWindSurfingCharges,
        ball_sports_activities_available: this.property.ballSportsActivitiesAvailable,
        badminton: this.property.badminton,
        badminton_local_supplier: this.cBadmintonLocalSupplier,
        badminton_charges: this.cBadmintonCharges,
        basket_ball: this.property.basketBall,
        basket_ball_local_supplier: this.cBasketBallLocalSupplier,
        basket_ball_charges: this.cBasketBallCharges,
        beach_volley_ball: this.property.beachVolleyBall,
        beach_volley_ball_local_supplier: this.cBeachVolleyBallLocalSupplier,
        beach_volley_ball_charges: this.cBeachVolleyBallCharges,
        beach_soccer: this.property.beachSoccer,
        beach_soccer_local_supplier: this.cBeachSoccerLocalSupplier,
        beach_soccer_charges: this.cBeachSoccerCharges,
        billiard: this.property.billiard,
        billiard_local_supplier: this.cBilliardLocalSupplier,
        billiard_charges: this.cBilliardCharges,
        barce: this.property.barce,
        barce_local_supplier: this.cBarceLocalSupplier,
        barce_charges: this.cBarceCharges,
        bowling: this.property.bowling,
        bowling_local_supplier: this.cBowlingLocalSupplier,
        bowling_charges: this.cBowlingCharges,
        cricket: this.property.cricket,
        cricket_local_supplier: this.cCricketLocalSupplier,
        cricket_charges: this.cCricketCharges,
        soccer: this.property.soccer,
        soccer_local_supplier: this.cSoccerLocalSupplier,
        soccer_charges: this.cSoccerCharges,
        golf: this.property.golf,
        golf_local_supplier: this.cGolfLocalSupplier,
        golf_charges: this.cGolfCharges,
        skittles: this.property.skittles,
        skittles_local_supplier: this.cSkittlesLocalSupplier,
        skittles_charges: this.cSkittlesCharges,
        mini_golf: this.property.miniGolf,
        mini_golf_local_supplier: this.cMiniGolfLocalSupplier,
        mini_golf_charges: this.cMiniGolfCharges,
        paddle_tennis: this.property.paddleTennis,
        paddle_tennis_local_supplier: this.cPaddleTennisLocalSupplier,
        paddle_tennis_charges: this.cPaddleTennisCharges,
        squash: this.property.squash,
        squash_local_supplier: this.cSquashLocalSupplier,
        squash_charges: this.cSquashCharges,
        tennis: this.property.tennis,
        tennis_local_supplier: this.cTennisLocalSupplier,
        tennis_charges: this.cTennisCharges,
        table_tennis: this.property.tableTennis,
        table_tennis_local_supplier: this.cTableTennisLocalSupplier,
        table_tennis_charges: this.cTableTennisCharges,
        volley_ball: this.property.volleyBall,
        volley_ball_local_supplier: this.cVolleyBallLocalSupplier,
        volley_ball_charges: this.cVolleyBallCharges,
        winter_sports_activities_available: this.property.winterSportsActivitiesAvailable,
        alpine_skiing: this.property.alpineSkiing,
        alpine_skiing_local_supplier: this.cAlpineSkiingLocalSupplier,
        alpine_skiing_charges: this.cAlpineSkiingCharges,
        cross_country_skiing: this.property.crossCountrySkiing,
        cross_country_skiing_local_supplier: this.cCrossCountrySkiingLocalSupplier,
        cross_country_skiing_charges: this.cCrossCountrySkiingCharges,
        snow_boarding: this.property.snowBoarding,
        snow_boarding_local_supplier: this.cSnowBoardingLocalSupplier,
        snow_boarding_charges: this.cSnowBoardingCharges,
        tobogganing: this.property.tobogganing,
        tobogganing_local_supplier: this.cTobogganingLocalSupplier,
        tobogganing_charges: this.cTobogganingCharges,
        other_sports_activities_available: this.property.otherSportsActivitiesAvailable,
        air_hockey: this.property.airHockey,
        air_hockey_local_supplier: this.cAirHockeyLocalSupplier,
        air_hockey_charges: this.cAirHockeyCharges,
        air_rifle_shooting: this.property.airRifleShooting,
        air_rifle_shooting_local_supplier: this.cAirRifleShootingLocalSupplier,
        air_rifle_shooting_charges: this.cAirRifleShootingCharges,
        archery: this.property.archery,
        archery_local_supplier: this.cArcheryLocalSupplier,
        archery_charges: this.cArcheryCharges,
        ballooning: this.property.ballooning,
        ballooning_local_supplier: this.cBallooningLocalSupplier,
        ballooning_charges: this.cBallooningCharges,
        bike_rental: this.property.bikeRental,
        bike_rental_local_supplier: this.cBikeRentalLocalSupplier,
        bike_rental_charges: this.cBikeRentalCharges,
        camel_riding: this.property.camelRiding,
        camel_riding_local_supplier: this.cCamelRidingLocalSupplier,
        camel_riding_charges: this.cCamelRidingCharges,
        carriage_rides: this.property.carriageRides,
        carriage_rides_local_supplier: this.cCarriageRidesLocalSupplier,
        carriage_rides_charges: this.cCarriageRidesCharges,
        climbing: this.property.climbing,
        climbing_local_supplier: this.cClimbingLocalSupplier,
        climbing_charges: this.cClimbingCharges,
        cross_bow_shooting: this.property.crossBowShooting,
        cross_bow_shooting_local_supplier: this.cCrossBowShootingLocalSupplier,
        cross_bow_shooting_charges: this.cCrossBowShootingCharges,
        darts: this.property.darts,
        darts_local_supplier: this.cDartsLocalSupplier,
        darts_charges: this.cDartsCharges,
        e_bike_rental: this.property.eBikeRental,
        e_bike_rental_local_supplier: this.cEBikeRentalLocalSupplier,
        e_bike_rental_charges: this.cEBikeRentalCharges,
        game_town: this.property.gameTown,
        game_town_local_supplier: this.cGameTownLocalSupplier,
        game_town_charges: this.cGameTownCharges,
        geo_coaching: this.property.geoCoaching,
        geo_coaching_local_supplier: this.cGeoCoachingLocalSupplier,
        geo_coaching_charges: this.cGeoCoachingCharges,
        giant_chess: this.property.giantChess,
        giant_chess_local_supplier: this.cGiantChessLocalSupplier,
        giant_chess_charges: this.cGiantChessCharges,
        guided_hikes: this.property.guidedHikes,
        guided_hikes_local_supplier: this.cGuidedHikesLocalSupplier,
        guided_hikes_charges: this.cGuidedHikesCharges,
        horse_riding: this.property.horseRiding,
        horse_riding_local_supplier: this.cHorseRidingLocalSupplier,
        horse_riding_charges: this.cHorseRidingCharges,
        laser_ball: this.property.laserBall,
        laser_ball_local_supplier: this.cLaserBallLocalSupplier,
        laser_ball_charges: this.cLaserBallCharges,
        multi_functional_space: this.property.multiFunctionalSpace,
        multi_functional_space_local_supplier: this.cMultiFunctionalSpaceLocalSupplier,
        multi_functional_space_charges: this.cMultiFunctionalSpaceCharges,
        paint_ball: this.property.paintBall,
        paint_ball_local_supplier: this.cPaintBallLocalSupplier,
        paint_ball_charges: this.cPaintBallCharges,
        paragliding: this.property.paragliding,
        paragliding_local_supplier: this.cParaglidingLocalSupplier,
        paragliding_charges: this.cParaglidingCharges,
        pilates: this.property.pilates,
        pilates_local_supplier: this.cPilatesLocalSupplier,
        pilates_charges: this.cPilatesCharges,
        quad_rental: this.property.quadRental,
        quad_rental_local_supplier: this.cQuadRentalLocalSupplier,
        quad_rental_charges: this.cQuadRentalCharges,
        segway_rental: this.property.segwayRental,
        segway_rental_local_supplier: this.cSegwayRentalLocalSupplier,
        segway_rental_charges: this.cSegwayRentalCharges,
        shuffle_board: this.property.shuffleBoard,
        shuffle_board_local_supplier: this.cShuffleBoardLocalSupplier,
        shuffle_board_charges: this.cShuffleBoardCharges,
        spinning: this.property.spinning,
        spinning_local_supplier: this.cSpinningLocalSupplier,
        spinning_charges: this.cSpinningCharges,
        summer_tobo_gganing: this.property.summerToboGganing,
        summer_tobo_gganing_local_supplier: this.cSummerToboGganingLocalSupplier,
        summer_tobo_gganing_charges: this.cSummerToboGganingCharges,
        table_foot_ball: this.property.tableFootBall,
        table_foot_ball_local_supplier: this.cTableFootBallLocalSupplier,
        table_foot_ball_charges: this.cTableFootBallCharges,
        tower_jump: this.property.towerJump,
        tower_jump_local_supplier: this.cTowerJumpLocalSupplier,
        tower_jump_charges: this.cTowerJumpCharges,
        yoga_class: this.property.yogaClass,
        yoga_class_local_supplier: this.cYogaClassLocalSupplier,
        yoga_class_charges: this.cYogaClassCharges,
        zip_wire: this.property.zipWire,
        zip_wire_local_supplier: this.cZipWireLocalSupplier,
        zip_wire_charges: this.cZipWireCharges,
        steam_bath: this.property.steamBath,
        steam_bath_admission_from: this.cSteamBathAdmissionFrom,
        steam_bath_charges: this.cSteamBathCharges,
        indoor_swimming_pool: this.property.indoorSwimmingPool,
        indoor_swimming_pool_charges: this.cIndoorSwimmingPoolCharges,
        indoor_swimming_pool_is_seasonal: this.cIndoorSwimmingPoolIsSeasonal,
        indoor_swimming_pool_check: this.cIndoorSwimmingPoolCheck,
        indoor_swimming_pool_from: this.cIndoorSwimmingPoolFrom,
        indoor_swimming_pool_to: this.cIndoorSwimmingPoolTo,
        saunas: this.property.saunas,
        saunas_count: this.cSaunasCount,
        saunas_charges: this.cSaunasCharges,
        saunas_types: this.cSaunasTypes,
        massages: this.property.massages,
        massages_types: this.cMassagesTypes,
        medical_treatment: this.property.medicalTreatment,
        medical_treatment_types: this.cMedicalTreatmentTypes,
        medical_treatment_bathes: this.cMedicalTreatmentBathes,
        beauty_treatment: this.property.beautyTreatment,
        wellness_beauty_treatment: this.cWellnessBeautyTreatment,
      };
      await this.$store
        .dispatch("sportsAndWellnessFactsComp/postInfo", sportsToUpdate)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.isLoading = false;
          this.property = this.$store.getters["sportsAndWellnessFactsComp/getProperty"];
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          this.isLoading = false;
        });
    },
    validate() {
      const newValidations = [];
      if (this.property.fitnessCentreAvailable && !this.property.fitnessCentreCharges) {
        newValidations.push("Fitness centre charges are required");
      }
      if (this.property.gymAvailable && !this.property.gymCharges) {
        newValidations.push("Gym charges are required");
      }
      if (this.property.steamBath && !this.property.steamBathAdmissionFrom) {
        newValidations.push("Admission age for steam bath is required");
      }

      this.$store.dispatch("sportsAndWellnessFactsComp/validate", newValidations);
      this.errors = this.$store.getters["sportsAndWellnessFactsComp/getErrors"];
    },
  },
};
</script>
