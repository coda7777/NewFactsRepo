import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: null,
      neighbourHotelName: "",
      neighbourAccommodationType: null,
      neighbourRating: null,
      neighbourConnectionType: null,
      neighbourHotelDistance: "",
      neighbourShuttleAvailable: false,
      neighbourShuttleFrequency: null,
      neighbourShuttleFrequencyTimes: null,
      neighbourShuttleFrequencyDuration: null,
      neighbourShuttleFrequencyTimesOther: null,
      neighbourShuttleCharges: null,
      neighbourShuttlePrice: null,
      neighbourShuttlePriceCurrency: null,
      neighbourAdultOnly: false,
      neighbourUsingComplex: false,
      neighbourUsingComplexCharges: null,
      neighbourUsingOutdoors: false,
      neighbourUsingOutdoorsCharges: null,
      neighbourUsingGarden: false,
      neighbourUsingGardenCharges: null,
      neighbourUsingSunTerrace: false,
      neighbourUsingSunTerraceCharges: null,
      neighbourUsingWaterPark: false,
      neighbourUsingWaterParkCharges: null,
      neighbourUsingSwimmingPool: false,
      neighbourUsingSwimmingPoolCharges: null,
      neighbourUsingBeach: false,
      neighbourUsingBeachCharges: null,
      neighbourUsingBeachClub: false,
      neighbourUsingBeachClubCharges: null,
      neighbourUsingPoolSunBeds: false,
      neighbourUsingPoolSunBedsCharges: null,
      neighbourUsingPoolTowels: false,
      neighbourUsingPoolTowelsCharges: null,
      neighbourUsingPoolParasols: false,
      neighbourUsingPoolParasolsCharges: null,
      neighbourUsingBeachSunBeds: false,
      neighbourUsingBeachSunBedsCharges: null,
      neighbourUsingBeachTowels: false,
      neighbourUsingBeachTowelsCharges: null,
      neighbourUsingBeachparasols: false,
      neighbourUsingBeachParasolsCharges: null,
      neighbourUsingInternet: false,
      neighbourUsingInternetCharges: null,
      neighbourUsingCarParking: false,
      neighbourUsingCarParkingCharges: null,
      neighbourUsingCasino: false,
      neighbourUsingCasinoCharges: null,
      neighbourUsingDisco: false,
      neighbourUsingDiscoCharges: null,
      neighbourUsingTerrace: false,
      neighbourUsingTerraceCharges: null,
      neighbourUsingBars: false,
      neighbourUsingCharges: null,
      neighbourUsingRestaurant: false,
      neighbourUsingRestaurantCharges: null,
      neighbourUsingDiffSports: false,
      neighbourUsingDiffSportsCharges: null,
      neighbourUsingTennis: false,
      neighbourUsingTennisCharges: null,
      neighbourUsingBilliard: false,
      neighbourUsingBilliardCharges: null,
      neighbourUsingGolf: false,
      neighbourUsingGolfCharges: null,
      neighbourUsingTableTennis: false,
      neighbourUsingTableTennisCharges: null,
      neighbourUsingFitnessCentre: false,
      neighbourUsingFitnessCetreCharges: null,
      neighbourUsingDiffSeaJets: false,
      neighbourUsingDiffSeaJetsCharges: null,
      neighbourUsingWaterSports: false,
      neighbourUsingWaterSportsCharges: null,
      neighbourUsingBikeRental: false,
      neighbourUsingBikeRentalCharges: null,
      neighbourUsingVolleyBall: false,
      neighbourUsingVolleyBallCharges: null,
      neighbourUsingWellnessArea: false,
      neighbourUsingWellnessAreaCharges: null,
      neighbourUsingSpa: false,
      neighbourUsingSpaCharges: null,
      neighbourUsingBeautyTreatment: false,
      neighbourUsingBeautyTreatmentCharges: null,
      neighbourUsingIndoorPool: false,
      neighbourUsingIndoorPoolCharges: null,
      neighbourUsingWhirlPool: false,
      neighbourUsingWhirlPoolCharges: null,
      neighbourUsingSteamBath: false,
      neighbourUsingSteamBathCharges: null,
      neighbourUsingSauna: false,
      neighbourUsingSaunaCharges: null,
      neighbourUsingSolarium: false,
      neighbourUsingSolariumCharges: null,
      neighbourUsingTurkishBath: false,
      neighbourUsingTurkishBathCharges: null,
      neighbourUsingDiffFacilityChildren: false,
      neighbourUsingDiffFacilityChildrenCharges: null,
      neighbourUsingChildrenPool: false,
      neighbourUsingChildrenPoolCharges: null,
      neighbourUsingChildrenAqua: false,
      neighbourUsingChildrenAquaCharges: null,
      neighbourUsingChildrenAnimation: false,
      neighbourUsingChildrenAnimationCharges: null,
      neighbourUsingBabySitter: false,
      neighbourUsingBabySitterCharges: null,
      neighbourUsingMiniClub: false,
      neighbourUsingMiniClubCharges: null,
      neighbourUsingPlayGround: false,
      neighbourUsingPlayGroundCharges: null,
      neighbourUsingEveningAnimation: false,
      neighbourUsingSportsAnimation: false,
      neighbourUsingDayAnimation: false,
    },
    errors: [],
  },
  mutations: {
    updateProperty(state, newInfo) {
      state.property = newInfo;
    },
    updateErrors(state, newInfo) {
      /* console.log("commit here", newInfo); */
      state.errors = newInfo;
    },
  },
  actions: {
    validate(context, newInfo) {
      context.commit("updateErrors", newInfo);
    },
    postInfo(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      /* console.log(newInfo); */
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/facts/partner/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/partner/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.hotel,
              neighbourHotelName: response.data.neighbour_hotel_name,
              neighbourAccommodationType: response.data.neighbour_accommodation_type || null,
              neighbourRating: response.data.neighbour_rating || null,
              neighbourConnectionType: response.data.neighbour_connection_type || null,
              neighbourHotelDistance: response.data.neighbour_hotel_distance,
              neighbourShuttleAvailable: response.data.neighbour_shuttle_available,
              neighbourShuttleFrequency: response.data.neighbour_shuttle_frequency || null,
              neighbourShuttleFrequencyTimes: response.data.neighbour_shuttle_frequency_times,
              neighbourShuttleFrequencyDuration: response.data.neighbour_shuttle_frequency_duration,
              neighbourShuttleFrequencyTimesOther:
                response.data.neighbour_shuttle_frequency_times_other,
              neighbourShuttleCharges: response.data.neighbour_shuttle_charges || null,
              neighbourShuttlePrice: response.data.neighbour_shuttle_price,
              neighbourShuttlePriceCurrency: response.data.neighbour_shuttle_price_currency,
              neighbourAdultOnly: response.data.neighbour_adult_only,
              neighbourUsingComplex: response.data.neighbour_using_complex,
              neighbourUsingComplexCharges: response.data.neighbour_using_complex_charges || null,
              neighbourUsingOutdoors: response.data.neighbour_using_outdoors,
              neighbourUsingOutdoorsCharges: response.data.neighbour_using_outdoors_charges || null,
              neighbourUsingGarden: response.data.neighbour_using_garden,
              neighbourUsingGardenCharges: response.data.neighbour_using_garden_charges || null,
              neighbourUsingSunTerrace: response.data.neighbour_using_sun_terrace,
              neighbourUsingSunTerraceCharges:
                response.data.neighbour_using_sun_terrace_charges || null,
              neighbourUsingWaterPark: response.data.neighbour_using_water_park,
              neighbourUsingWaterParkCharges:
                response.data.neighbour_using_water_park_charges || null,
              neighbourUsingSwimmingPool: response.data.neighbour_using_swimming_pool,
              neighbourUsingSwimmingPoolCharges:
                response.data.neighbour_using_swimming_pool_charges || null,
              neighbourUsingBeach: response.data.neighbour_using_beach,
              neighbourUsingBeachCharges: response.data.neighbour_using_beach_charges || null,
              neighbourUsingBeachClub: response.data.neighbour_using_beach_club,
              neighbourUsingBeachClubCharges:
                response.data.neighbour_using_beach_club_charges || null,
              neighbourUsingPoolSunBeds: response.data.neighbour_using_pool_sun_beds,
              neighbourUsingPoolSunBedsCharges:
                response.data.neighbour_using_pool_sun_beds_charges || null,
              neighbourUsingPoolTowels: response.data.neighbour_using_pool_towels,
              neighbourUsingPoolTowelsCharges:
                response.data.neighbour_using_pool_towels_charges || null,
              neighbourUsingPoolParasols: response.data.neighbour_using_pool_parasols,
              neighbourUsingPoolParasolsCharges:
                response.data.neighbour_using_pool_parasols_charges || null,
              neighbourUsingBeachSunBeds: response.data.neighbour_using_beach_sun_beds,
              neighbourUsingBeachSunBedsCharges:
                response.data.neighbour_using_beach_sun_beds_charges || null,
              neighbourUsingBeachTowels: response.data.neighbour_using_beach_towels,
              neighbourUsingBeachTowelsCharges:
                response.data.neighbour_using_beach_towels_charges || null,
              neighbourUsingBeachparasols: response.data.neighbour_using_beachparasols,
              neighbourUsingBeachParasolsCharges:
                response.data.neighbour_using_beach_parasols_charges || null,
              neighbourUsingInternet: response.data.neighbour_using_internet,
              neighbourUsingInternetCharges: response.data.neighbour_using_internet_charges || null,
              neighbourUsingCarParking: response.data.neighbour_using_car_parking,
              neighbourUsingCarParkingCharges:
                response.data.neighbour_using_car_parking_charges || null,
              neighbourUsingCasino: response.data.neighbour_using_casino,
              neighbourUsingCasinoCharges: response.data.neighbour_using_casino_charges || null,
              neighbourUsingDisco: response.data.neighbour_using_disco,
              neighbourUsingDiscoCharges: response.data.neighbour_using_disco_charges || null,
              neighbourUsingTerrace: response.data.neighbour_using_terrace,
              neighbourUsingTerraceCharges: response.data.neighbour_using_terrace_charges || null,
              neighbourUsingBars: response.data.neighbour_using_bars,
              neighbourUsingCharges: response.data.neighbour_using_charges || null,
              neighbourUsingRestaurant: response.data.neighbour_using_restaurant,
              neighbourUsingRestaurantCharges:
                response.data.neighbour_using_restaurant_charges || null,
              neighbourUsingDiffSports: response.data.neighbour_using_diff_sports,
              neighbourUsingDiffSportsCharges:
                response.data.neighbour_using_diff_sports_charges || null,
              neighbourUsingTennis: response.data.neighbour_using_tennis,
              neighbourUsingTennisCharges: response.data.neighbour_using_tennis_charges || null,
              neighbourUsingBilliard: response.data.neighbour_using_billiard,
              neighbourUsingBilliardCharges: response.data.neighbour_using_billiard_charges || null,
              neighbourUsingGolf: response.data.neighbour_using_golf,
              neighbourUsingGolfCharges: response.data.neighbour_using_golf_charges || null,
              neighbourUsingTableTennis: response.data.neighbour_using_table_tennis,
              neighbourUsingTableTennisCharges:
                response.data.neighbour_using_table_tennis_charges || null,
              neighbourUsingFitnessCentre: response.data.neighbour_using_fitness_centre,
              neighbourUsingFitnessCetreCharges:
                response.data.neighbour_using_fitness_cetre_charges || null,
              neighbourUsingDiffSeaJets: response.data.neighbour_using_diff_sea_jets,
              neighbourUsingDiffSeaJetsCharges:
                response.data.neighbour_using_diff_sea_jets_charges || null,
              neighbourUsingWaterSports: response.data.neighbour_using_water_sports,
              neighbourUsingWaterSportsCharges:
                response.data.neighbour_using_water_sports_charges || null,
              neighbourUsingBikeRental: response.data.neighbour_using_bike_rental,
              neighbourUsingBikeRentalCharges:
                response.data.neighbour_using_bike_rental_charges || null,
              neighbourUsingVolleyBall: response.data.neighbour_using_volley_ball,
              neighbourUsingVolleyBallCharges:
                response.data.neighbour_using_volley_ball_charges || null,
              neighbourUsingWellnessArea: response.data.neighbour_using_wellness_area,
              neighbourUsingWellnessAreaCharges:
                response.data.neighbour_using_wellness_area_charges || null,
              neighbourUsingSpa: response.data.neighbour_using_spa,
              neighbourUsingSpaCharges: response.data.neighbour_using_spa_charges || null,
              neighbourUsingBeautyTreatment: response.data.neighbour_using_beauty_treatment,
              neighbourUsingBeautyTreatmentCharges:
                response.data.neighbour_using_beauty_treatment_charges || null,
              neighbourUsingIndoorPool: response.data.neighbour_using_indoor_pool,
              neighbourUsingIndoorPoolCharges:
                response.data.neighbour_using_indoor_pool_charges || null,
              neighbourUsingWhirlPool: response.data.neighbour_using_whirl_pool,
              neighbourUsingWhirlPoolCharges:
                response.data.neighbour_using_whirl_pool_charges || null,
              neighbourUsingSteamBath: response.data.neighbour_using_steam_bath,
              neighbourUsingSteamBathCharges:
                response.data.neighbour_using_steam_bath_charges || null,
              neighbourUsingSauna: response.data.neighbour_using_sauna,
              neighbourUsingSaunaCharges: response.data.neighbour_using_sauna_charges || null,
              neighbourUsingSolarium: response.data.neighbour_using_solarium,
              neighbourUsingSolariumCharges: response.data.neighbour_using_solarium_charges || null,
              neighbourUsingTurkishBath: response.data.neighbour_using_turkish_bath,
              neighbourUsingTurkishBathCharges:
                response.data.neighbour_using_turkish_bath_charges || null,
              neighbourUsingDiffFacilityChildren:
                response.data.neighbour_using_diff_facility_children,
              neighbourUsingDiffFacilityChildrenCharges:
                response.data.neighbour_using_diff_facility_children_charges || null,
              neighbourUsingChildrenPool: response.data.neighbour_using_children_pool,
              neighbourUsingChildrenPoolCharges:
                response.data.neighbour_using_children_pool_charges || null,
              neighbourUsingChildrenAqua: response.data.neighbour_using_children_aqua,
              neighbourUsingChildrenAquaCharges:
                response.data.neighbour_using_children_aqua_charges || null,
              neighbourUsingChildrenAnimation: response.data.neighbour_using_children_animation,
              neighbourUsingChildrenAnimationCharges:
                response.data.neighbour_using_children_animation_charges || null,
              neighbourUsingBabySitter: response.data.neighbour_using_baby_sitter,
              neighbourUsingBabySitterCharges:
                response.data.neighbour_using_baby_sitter_charges || null,
              neighbourUsingMiniClub: response.data.neighbour_using_mini_club,
              neighbourUsingMiniClubCharges:
                response.data.neighbour_using_mini_club_charges || null,
              neighbourUsingPlayGround: response.data.neighbour_using_play_ground,
              neighbourUsingPlayGroundCharges:
                response.data.neighbour_using_play_ground_charges || null,
              neighbourUsingEveningAnimation: response.data.neighbour_using_evening_animation,
              neighbourUsingSportsAnimation: response.data.neighbour_using_sports_animation,
              neighbourUsingDayAnimation: response.data.neighbour_using_day_animation,
            };
            context.commit("updateProperty", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getInfo(context, infoId) {
      /* console.log("getting info data"); */
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/partner/${infoId}/`,
        })
          .then((response) => {
            /* console.log(response); */
            const retrievedInfo = {
              id: response.data.hotel,
              neighbourHotelName: response.data.neighbour_hotel_name,
              neighbourAccommodationType: response.data.neighbour_accommodation_type || null,
              neighbourRating: response.data.neighbour_rating || null,
              neighbourConnectionType: response.data.neighbour_connection_type || null,
              neighbourHotelDistance: response.data.neighbour_hotel_distance,
              neighbourShuttleAvailable: response.data.neighbour_shuttle_available,
              neighbourShuttleFrequency: response.data.neighbour_shuttle_frequency || null,
              neighbourShuttleFrequencyTimes: response.data.neighbour_shuttle_frequency_times,
              neighbourShuttleFrequencyDuration: response.data.neighbour_shuttle_frequency_duration,
              neighbourShuttleFrequencyTimesOther:
                response.data.neighbour_shuttle_frequency_times_other,
              neighbourShuttleCharges: response.data.neighbour_shuttle_charges || null,
              neighbourShuttlePrice: response.data.neighbour_shuttle_price,
              neighbourShuttlePriceCurrency: response.data.neighbour_shuttle_price_currency,
              neighbourAdultOnly: response.data.neighbour_adult_only,
              neighbourUsingComplex: response.data.neighbour_using_complex,
              neighbourUsingComplexCharges: response.data.neighbour_using_complex_charges || null,
              neighbourUsingOutdoors: response.data.neighbour_using_outdoors,
              neighbourUsingOutdoorsCharges: response.data.neighbour_using_outdoors_charges || null,
              neighbourUsingGarden: response.data.neighbour_using_garden,
              neighbourUsingGardenCharges: response.data.neighbour_using_garden_charges || null,
              neighbourUsingSunTerrace: response.data.neighbour_using_sun_terrace,
              neighbourUsingSunTerraceCharges:
                response.data.neighbour_using_sun_terrace_charges || null,
              neighbourUsingWaterPark: response.data.neighbour_using_water_park,
              neighbourUsingWaterParkCharges:
                response.data.neighbour_using_water_park_charges || null,
              neighbourUsingSwimmingPool: response.data.neighbour_using_swimming_pool,
              neighbourUsingSwimmingPoolCharges:
                response.data.neighbour_using_swimming_pool_charges || null,
              neighbourUsingBeach: response.data.neighbour_using_beach,
              neighbourUsingBeachCharges: response.data.neighbour_using_beach_charges || null,
              neighbourUsingBeachClub: response.data.neighbour_using_beach_club,
              neighbourUsingBeachClubCharges:
                response.data.neighbour_using_beach_club_charges || null,
              neighbourUsingPoolSunBeds: response.data.neighbour_using_pool_sun_beds,
              neighbourUsingPoolSunBedsCharges:
                response.data.neighbour_using_pool_sun_beds_charges || null,
              neighbourUsingPoolTowels: response.data.neighbour_using_pool_towels,
              neighbourUsingPoolTowelsCharges:
                response.data.neighbour_using_pool_towels_charges || null,
              neighbourUsingPoolParasols: response.data.neighbour_using_pool_parasols,
              neighbourUsingPoolParasolsCharges:
                response.data.neighbour_using_pool_parasols_charges || null,
              neighbourUsingBeachSunBeds: response.data.neighbour_using_beach_sun_beds,
              neighbourUsingBeachSunBedsCharges:
                response.data.neighbour_using_beach_sun_beds_charges || null,
              neighbourUsingBeachTowels: response.data.neighbour_using_beach_towels,
              neighbourUsingBeachTowelsCharges:
                response.data.neighbour_using_beach_towels_charges || null,
              neighbourUsingBeachparasols: response.data.neighbour_using_beachparasols,
              neighbourUsingBeachParasolsCharges:
                response.data.neighbour_using_beach_parasols_charges || null,
              neighbourUsingInternet: response.data.neighbour_using_internet,
              neighbourUsingInternetCharges: response.data.neighbour_using_internet_charges || null,
              neighbourUsingCarParking: response.data.neighbour_using_car_parking,
              neighbourUsingCarParkingCharges:
                response.data.neighbour_using_car_parking_charges || null,
              neighbourUsingCasino: response.data.neighbour_using_casino,
              neighbourUsingCasinoCharges: response.data.neighbour_using_casino_charges || null,
              neighbourUsingDisco: response.data.neighbour_using_disco,
              neighbourUsingDiscoCharges: response.data.neighbour_using_disco_charges || null,
              neighbourUsingTerrace: response.data.neighbour_using_terrace,
              neighbourUsingTerraceCharges: response.data.neighbour_using_terrace_charges || null,
              neighbourUsingBars: response.data.neighbour_using_bars,
              neighbourUsingCharges: response.data.neighbour_using_charges || null,
              neighbourUsingRestaurant: response.data.neighbour_using_restaurant,
              neighbourUsingRestaurantCharges:
                response.data.neighbour_using_restaurant_charges || null,
              neighbourUsingDiffSports: response.data.neighbour_using_diff_sports,
              neighbourUsingDiffSportsCharges:
                response.data.neighbour_using_diff_sports_charges || null,
              neighbourUsingTennis: response.data.neighbour_using_tennis,
              neighbourUsingTennisCharges: response.data.neighbour_using_tennis_charges || null,
              neighbourUsingBilliard: response.data.neighbour_using_billiard,
              neighbourUsingBilliardCharges: response.data.neighbour_using_billiard_charges || null,
              neighbourUsingGolf: response.data.neighbour_using_golf,
              neighbourUsingGolfCharges: response.data.neighbour_using_golf_charges || null,
              neighbourUsingTableTennis: response.data.neighbour_using_table_tennis,
              neighbourUsingTableTennisCharges:
                response.data.neighbour_using_table_tennis_charges || null,
              neighbourUsingFitnessCentre: response.data.neighbour_using_fitness_centre,
              neighbourUsingFitnessCetreCharges:
                response.data.neighbour_using_fitness_cetre_charges || null,
              neighbourUsingDiffSeaJets: response.data.neighbour_using_diff_sea_jets,
              neighbourUsingDiffSeaJetsCharges:
                response.data.neighbour_using_diff_sea_jets_charges || null,
              neighbourUsingWaterSports: response.data.neighbour_using_water_sports,
              neighbourUsingWaterSportsCharges:
                response.data.neighbour_using_water_sports_charges || null,
              neighbourUsingBikeRental: response.data.neighbour_using_bike_rental,
              neighbourUsingBikeRentalCharges:
                response.data.neighbour_using_bike_rental_charges || null,
              neighbourUsingVolleyBall: response.data.neighbour_using_volley_ball,
              neighbourUsingVolleyBallCharges:
                response.data.neighbour_using_volley_ball_charges || null,
              neighbourUsingWellnessArea: response.data.neighbour_using_wellness_area,
              neighbourUsingWellnessAreaCharges:
                response.data.neighbour_using_wellness_area_charges || null,
              neighbourUsingSpa: response.data.neighbour_using_spa,
              neighbourUsingSpaCharges: response.data.neighbour_using_spa_charges || null,
              neighbourUsingBeautyTreatment: response.data.neighbour_using_beauty_treatment,
              neighbourUsingBeautyTreatmentCharges:
                response.data.neighbour_using_beauty_treatment_charges || null,
              neighbourUsingIndoorPool: response.data.neighbour_using_indoor_pool,
              neighbourUsingIndoorPoolCharges:
                response.data.neighbour_using_indoor_pool_charges || null,
              neighbourUsingWhirlPool: response.data.neighbour_using_whirl_pool,
              neighbourUsingWhirlPoolCharges:
                response.data.neighbour_using_whirl_pool_charges || null,
              neighbourUsingSteamBath: response.data.neighbour_using_steam_bath,
              neighbourUsingSteamBathCharges:
                response.data.neighbour_using_steam_bath_charges || null,
              neighbourUsingSauna: response.data.neighbour_using_sauna,
              neighbourUsingSaunaCharges: response.data.neighbour_using_sauna_charges || null,
              neighbourUsingSolarium: response.data.neighbour_using_solarium,
              neighbourUsingSolariumCharges: response.data.neighbour_using_solarium_charges || null,
              neighbourUsingTurkishBath: response.data.neighbour_using_turkish_bath,
              neighbourUsingTurkishBathCharges:
                response.data.neighbour_using_turkish_bath_charges || null,
              neighbourUsingDiffFacilityChildren:
                response.data.neighbour_using_diff_facility_children,
              neighbourUsingDiffFacilityChildrenCharges:
                response.data.neighbour_using_diff_facility_children_charges || null,
              neighbourUsingChildrenPool: response.data.neighbour_using_children_pool,
              neighbourUsingChildrenPoolCharges:
                response.data.neighbour_using_children_pool_charges || null,
              neighbourUsingChildrenAqua: response.data.neighbour_using_children_aqua,
              neighbourUsingChildrenAquaCharges:
                response.data.neighbour_using_children_aqua_charges || null,
              neighbourUsingChildrenAnimation: response.data.neighbour_using_children_animation,
              neighbourUsingChildrenAnimationCharges:
                response.data.neighbour_using_children_animation_charges || null,
              neighbourUsingBabySitter: response.data.neighbour_using_baby_sitter,
              neighbourUsingBabySitterCharges:
                response.data.neighbour_using_baby_sitter_charges || null,
              neighbourUsingMiniClub: response.data.neighbour_using_mini_club,
              neighbourUsingMiniClubCharges:
                response.data.neighbour_using_mini_club_charges || null,
              neighbourUsingPlayGround: response.data.neighbour_using_play_ground,
              neighbourUsingPlayGroundCharges:
                response.data.neighbour_using_play_ground_charges || null,
              neighbourUsingEveningAnimation: response.data.neighbour_using_evening_animation,
              neighbourUsingSportsAnimation: response.data.neighbour_using_sports_animation,
              neighbourUsingDayAnimation: response.data.neighbour_using_day_animation,
            };
            context.commit("updateProperty", retrievedInfo);
            /* console.log("retrieved info data"); */
            resolve(retrievedInfo);
          })
          .catch((error) => {
            context.commit("updateProperty", {});
            reject(error);
            /* console.log("failed retrieve info data"); */
          });
      });
    },
  },
  getters: {
    getProperty(state) {
      return state.property;
    },
    getErrors(state) {
      return state.errors;
    },
  },
};
