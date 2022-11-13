/* eslint-disable max-len */
import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: 0,
      hotel: 0,
      additionalFreeText: null,
      healthCheckIn: [],
      healthRestaurant: [],
      healthPublicAreas: [],
      healthRooms: [],
      healthPoolArea: [],
      healthFitnessArea: [],
      healthChildrenArea: [],
      healthAnimation: [],
      healthStaff: [],
      healthAdditional: [],
      hotelAdditionalAdmissions: false,
      additionalAdmissionLeisurePark: false,
      additionalAdmissionFrequencyOfLeisurePark: null,
      additionalAdmissionCountPerLeisurePark: null,
      additionalAdmissionWaterPark: false,
      additionalAdmissionFrequencyOfWaterPark: null,
      additionalAdmissionCountPerWaterPark: null,
      additionalAdmissionGreenFees: false,
      additionalAdmissionFrequencyOfGreenFees: null,
      additionalAdmissionCountPerGreenFees: null,
      additionalAdmissionSkiPass: false,
      additionalAdmissionFrequencyOfSkiPass: null,
      additionalAdmissionCountPerSkiPass: null,
      additionalAdmissionSpaVoucher: false,
      additionalAdmissionFrequencyOfSpaVoucher: null,
      additionalAdmissionCountPerSpaVoucher: null,
      additionalAdmissionThermalPass: false,
      additionalAdmissionFrequencyOfThermalPass: null,
      additionalAdmissionCountPerThermalPass: null,
      hotelAdditionalDrinks: false,
      additionalDrinksChampagne: false,
      additionalDrinksFrequencyOfChampagne: null,
      additionalDrinksCountPerChampagne: null,
      additionalDrinksProsecco: false,
      additionalDrinksFrequencyOfProsecco: null,
      additionalDrinksCountPerProsecco: null,
      additionalDrinksRum: false,
      additionalDrinksFrequencyOfRum: null,
      additionalDrinksCountPerRum: null,
      additionalDrinksSparklingWine: false,
      additionalDrinksFrequencyOfSparklingWine: null,
      additionalDrinksCountPerSparklingWine: null,
      additionalDrinksTequila: false,
      additionalDrinksFrequencyOfTequila: null,
      additionalDrinksCountPerTequila: null,
      additionalDrinksWater: false,
      additionalDrinksFrequencyOfWater: null,
      additionalDrinksCountPerWater: null,
      additionalDrinksWine: false,
      additionalDrinksFrequencyOfWine: null,
      additionalDrinksCountPerWine: null,
      additionalDrinksWelcome: false,
      additionalDrinksFrequencyOfWelcome: null,
      additionalDrinksCountPerWelcome: null,
      hotelAdditionalExcursions: false,
      additionalExcursionGuidedTour: false,
      additionalExcursionFrequencyOfGuidedTour: null,
      additionalExcursionCountPerGuidedTour: null,
      additionalExcursionIslandTour: false,
      additionalExcursionFrequencyOfIslandTour: null,
      additionalExcursionCountPerIslandTour: null,
      additionalExcursionSafari: false,
      additionalExcursionFrequencyOfSafari: null,
      additionalExcursionCountPerSafari: null,
      additionalExcursionTravelGuide: false,
      additionalExcursionFrequencyOfTravelGuide: null,
      additionalExcursionCountPerTravelGuide: null,
      additionalExcursionWine: false,
      additionalExcursionFrequencyOfWine: null,
      additionalExcursionCountPerWine: null,
      hotelAdditionalItems: false,
      additionalOtherFlowers: false,
      additionalOtherFrequencyOfFlowers: null,
      additionalOtherCountPerFlowers: null,
      additionalOtherCooking: false,
      additionalOtherFrequencyOfCooking: null,
      additionalOtherCountPerCooking: null,
      additionalOtherDance: false,
      additionalOtherFrequencyOfDance: null,
      additionalOtherCountPerDance: null,
      additionalOtherDiscount: false,
      additionalOtherFrequencyOfDiscount: null,
      additionalOtherCountPerDiscount: null,
      additionalOtherDCard: false,
      additionalOtherFrequencyOfDCard: null,
      additionalOtherCountPerDCard: null,
      additionalOtherFruits: false,
      additionalOtherFrequencyOfFruits: null,
      additionalOtherCountPerFruits: null,
      additionalOtherLanguage: false,
      additionalOtherFrequencyOfLanguage: null,
      additionalOtherCountPerLanguage: null,
      additionalOtherCityMap: false,
      additionalOtherFrequencyOfCityMap: null,
      additionalOtherCountPerCityMap: null,
      additionalOtherMassage: false,
      additionalOtherFrequencyOfMassage: null,
      additionalOtherCountPerMassage: null,
      additionalOtherMeal: false,
      additionalOtherFrequencyOfMeal: null,
      additionalOtherCountPerMeal: null,
      additionalOtherPaint: false,
      additionalOtherFrequencyOfPaint: null,
      additionalOtherCountPerPaint: null,
      additionalOtherMap: false,
      additionalOtherFrequencyOfMap: null,
      additionalOtherCountPerMap: null,
      additionalOtherCar: false,
      additionalOtherFrequencyOfCar: null,
      additionalOtherCountPerCar: null,
      additionalOtherSVoucher: false,
      additionalOtherFrequencyOfSVoucher: null,
      additionalOtherCountPerSVoucher: null,
      additionalOtherSkis: false,
      additionalOtherFrequencyOfSkis: null,
      additionalOtherCountPerSkis: null,
      additionalOtherSweets: false,
      additionalOtherFrequencyOfSweets: null,
      additionalOtherCountPerSweets: null,
      additionalOtherVignette: false,
      additionalOtherFrequencyOfVignette: null,
      additionalOtherCountPerVignette: null,
      additionalOtherGift: false,
      additionalOtherFrequencyOfGift: null,
      additionalOtherCountPerGift: null,
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
      /* @TODO */
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/facts/additional/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/additional/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              additionalFreeText: response.data.additional_free_text,
              healthCheckIn: response.data.health_check_in || [],
              healthRestaurant: response.data.health_restaurant || [],
              healthPublicAreas: response.data.health_public_areas || [],
              healthRooms: response.data.health_rooms || [],
              healthPoolArea: response.data.health_pool_area || [],
              healthFitnessArea: response.data.health_fitness_area || [],
              healthChildrenArea: response.data.health_children_area || [],
              healthAnimation: response.data.health_animation || [],
              healthStaff: response.data.health_staff || [],
              healthAdditional: response.data.health_additional || [],
              hotelAdditionalAdmissions: response.data.hotel_additional_admissions,
              additionalAdmissionLeisurePark: response.data.additional_admission_leisure_park,
              additionalAdmissionFrequencyOfLeisurePark:
                response.data.additional_admission_frequency_of_leisure_park || null,
              additionalAdmissionCountPerLeisurePark:
                response.data.additional_admission_count_per_leisure_park,
              additionalAdmissionWaterPark: response.data.additional_admission_water_park,
              additionalAdmissionFrequencyOfWaterPark:
                response.data.additional_admission_frequency_of_water_park || null,
              additionalAdmissionCountPerWaterPark:
                response.data.additional_admission_count_per_water_park,
              additionalAdmissionGreenFees: response.data.additional_admission_green_fees,
              additionalAdmissionFrequencyOfGreenFees:
                response.data.additional_admission_frequency_of_green_fees || null,
              additionalAdmissionCountPerGreenFees:
                response.data.additional_admission_count_per_green_fees,
              additionalAdmissionSkiPass: response.data.additional_admission_ski_pass,
              additionalAdmissionFrequencyOfSkiPass:
                response.data.additional_admission_frequency_of_ski_pass || null,
              additionalAdmissionCountPerSkiPass:
                response.data.additional_admission_count_per_ski_pass,
              additionalAdmissionSpaVoucher: response.data.additional_admission_spa_voucher,
              additionalAdmissionFrequencyOfSpaVoucher:
                response.data.additional_admission_frequency_of_spa_voucher || null,
              additionalAdmissionCountPerSpaVoucher:
                response.data.additional_admission_count_per_spa_voucher,
              additionalAdmissionThermalPass: response.data.additional_admission_thermal_pass,
              additionalAdmissionFrequencyOfThermalPass:
                response.data.additional_admission_frequency_of_thermal_pass || null,
              additionalAdmissionCountPerThermalPass:
                response.data.additional_admission_count_per_thermal_pass,
              hotelAdditionalDrinks: response.data.hotel_additional_drinks,
              additionalDrinksChampagne: response.data.additional_drinks_champagne,
              additionalDrinksFrequencyOfChampagne:
                response.data.additional_drinks_frequency_of_champagne || null,
              additionalDrinksCountPerChampagne:
                response.data.additional_drinks_count_per_champagne,
              additionalDrinksProsecco: response.data.additional_drinks_prosecco,
              additionalDrinksFrequencyOfProsecco:
                response.data.additional_drinks_frequency_of_prosecco || null,
              additionalDrinksCountPerProsecco: response.data.additional_drinks_count_per_prosecco,
              additionalDrinksRum: response.data.additional_drinks_rum,
              additionalDrinksFrequencyOfRum:
                response.data.additional_drinks_frequency_of_rum || null,
              additionalDrinksCountPerRum: response.data.additional_drinks_count_per_rum,
              additionalDrinksSparklingWine: response.data.additional_drinks_sparkling_wine,
              additionalDrinksFrequencyOfSparklingWine:
                response.data.additional_drinks_frequency_of_sparkling_wine || null,
              additionalDrinksCountPerSparklingWine:
                response.data.additional_drinks_count_per_sparkling_wine,
              additionalDrinksTequila: response.data.additional_drinks_tequila,
              additionalDrinksFrequencyOfTequila:
                response.data.additional_drinks_frequency_of_tequila || null,
              additionalDrinksCountPerTequila: response.data.additional_drinks_count_per_tequila,
              additionalDrinksWater: response.data.additional_drinks_water,
              additionalDrinksFrequencyOfWater:
                response.data.additional_drinks_frequency_of_water || null,
              additionalDrinksCountPerWater: response.data.additional_drinks_count_per_water,
              additionalDrinksWine: response.data.additional_drinks_wine,
              additionalDrinksFrequencyOfWine:
                response.data.additional_drinks_frequency_of_wine || null,
              additionalDrinksCountPerWine: response.data.additional_drinks_count_per_wine,
              additionalDrinksWelcome: response.data.additional_drinks_welcome,
              additionalDrinksFrequencyOfWelcome:
                response.data.additional_drinks_frequency_of_welcome || null,
              additionalDrinksCountPerWelcome: response.data.additional_drinks_count_per_welcome,
              hotelAdditionalExcursions: response.data.hotel_additional_excursions,
              additionalExcursionGuidedTour: response.data.additional_excursion_guided_tour,
              additionalExcursionFrequencyOfGuidedTour:
                response.data.additional_excursion_frequency_of_guided_tour || null,
              additionalExcursionCountPerGuidedTour:
                response.data.additional_excursion_count_per_guided_tour,
              additionalExcursionIslandTour: response.data.additional_excursion_island_tour,
              additionalExcursionFrequencyOfIslandTour:
                response.data.additional_excursion_frequency_of_island_tour || null,
              additionalExcursionCountPerIslandTour:
                response.data.additional_excursion_count_per_island_tour,
              additionalExcursionSafari: response.data.additional_excursion_safari,
              additionalExcursionFrequencyOfSafari:
                response.data.additional_excursion_frequency_of_safari || null,
              additionalExcursionCountPerSafari:
                response.data.additional_excursion_count_per_safari,
              additionalExcursionTravelGuide: response.data.additional_excursion_travel_guide,
              additionalExcursionFrequencyOfTravelGuide:
                response.data.additional_excursion_frequency_of_travel_guide || null,
              additionalExcursionCountPerTravelGuide:
                response.data.additional_excursion_count_per_travel_guide,
              additionalExcursionWine: response.data.additional_excursion_wine,
              additionalExcursionFrequencyOfWine:
                response.data.additional_excursion_frequency_of_wine || null,
              additionalExcursionCountPerWine: response.data.additional_excursion_count_per_wine,
              hotelAdditionalItems: response.data.hotel_additional_items,
              additionalOtherFlowers: response.data.additional_other_flowers,
              additionalOtherFrequencyOfFlowers:
                response.data.additional_other_frequency_of_flowers || null,
              additionalOtherCountPerFlowers: response.data.additional_other_count_per_flowers,
              additionalOtherCooking: response.data.additional_other_cooking,
              additionalOtherFrequencyOfCooking:
                response.data.additional_other_frequency_of_cooking || null,
              additionalOtherCountPerCooking: response.data.additional_other_count_per_cooking,
              additionalOtherDance: response.data.additional_other_dance,
              additionalOtherFrequencyOfDance:
                response.data.additional_other_frequency_of_dance || null,
              additionalOtherCountPerDance: response.data.additional_other_count_per_dance,
              additionalOtherDiscount: response.data.additional_other_discount,
              additionalOtherFrequencyOfDiscount:
                response.data.additional_other_frequency_of_discount || null,
              additionalOtherCountPerDiscount: response.data.additional_other_count_per_discount,
              additionalOtherDCard: response.data.additional_other_d_card,
              additionalOtherFrequencyOfDCard:
                response.data.additional_other_frequency_of_d_card || null,
              additionalOtherCountPerDCard: response.data.additional_other_count_per_d_card,
              additionalOtherFruits: response.data.additional_other_fruits,
              additionalOtherFrequencyOfFruits:
                response.data.additional_other_frequency_of_fruits || null,
              additionalOtherCountPerFruits: response.data.additional_other_count_per_fruits,
              additionalOtherLanguage: response.data.additional_other_language,
              additionalOtherFrequencyOfLanguage:
                response.data.additional_other_frequency_of_language || null,
              additionalOtherCountPerLanguage: response.data.additional_other_count_per_language,
              additionalOtherCityMap: response.data.additional_other_city_map,
              additionalOtherFrequencyOfCityMap:
                response.data.additional_other_frequency_of_city_map || null,
              additionalOtherCountPerCityMap: response.data.additional_other_count_per_city_map,
              additionalOtherMassage: response.data.additional_other_massage,
              additionalOtherFrequencyOfMassage:
                response.data.additional_other_frequency_of_massage || null,
              additionalOtherCountPerMassage: response.data.additional_other_count_per_massage,
              additionalOtherMeal: response.data.additional_other_meal,
              additionalOtherFrequencyOfMeal:
                response.data.additional_other_frequency_of_meal || null,
              additionalOtherCountPerMeal: response.data.additional_other_count_per_meal,
              additionalOtherPaint: response.data.additional_other_paint,
              additionalOtherFrequencyOfPaint:
                response.data.additional_other_frequency_of_paint || null,
              additionalOtherCountPerPaint: response.data.additional_other_count_per_paint,
              additionalOtherMap: response.data.additional_other_map,
              additionalOtherFrequencyOfMap:
                response.data.additional_other_frequency_of_map || null,
              additionalOtherCountPerMap: response.data.additional_other_count_per_map,
              additionalOtherCar: response.data.additional_other_car,
              additionalOtherFrequencyOfCar:
                response.data.additional_other_frequency_of_car || null,
              additionalOtherCountPerCar: response.data.additional_other_count_per_car,
              additionalOtherSVoucher: response.data.additional_other_s_voucher,
              additionalOtherFrequencyOfSVoucher:
                response.data.additional_other_frequency_of_s_voucher || null,
              additionalOtherCountPerSVoucher: response.data.additional_other_count_per_s_voucher,
              additionalOtherSkis: response.data.additional_other_skis,
              additionalOtherFrequencyOfSkis:
                response.data.additional_other_frequency_of_skis || null,
              additionalOtherCountPerSkis: response.data.additional_other_count_per_skis,
              additionalOtherSweets: response.data.additional_other_sweets,
              additionalOtherFrequencyOfSweets:
                response.data.additional_other_frequency_of_sweets || null,
              additionalOtherCountPerSweets: response.data.additional_other_count_per_sweets,
              additionalOtherVignette: response.data.additional_other_vignette,
              additionalOtherFrequencyOfVignette:
                response.data.additional_other_frequency_of_vignette || null,
              additionalOtherCountPerVignette: response.data.additional_other_count_per_vignette,
              additionalOtherGift: response.data.additional_other_gift,
              additionalOtherFrequencyOfGift:
                response.data.additional_other_frequency_of_gift || null,
              additionalOtherCountPerGift: response.data.additional_other_count_per_gift,
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
          /* @TODO */
          url: `http://127.0.0.1:8000/api/facts/additional/${infoId}/`,
        })
          .then((response) => {
            /* console.log(response); */
            const retrievedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              additionalFreeText: response.data.additional_free_text,
              healthCheckIn: response.data.health_check_in || [],
              healthRestaurant: response.data.health_restaurant || [],
              healthPublicAreas: response.data.health_public_areas || [],
              healthRooms: response.data.health_rooms || [],
              healthPoolArea: response.data.health_pool_area || [],
              healthFitnessArea: response.data.health_fitness_area || [],
              healthChildrenArea: response.data.health_children_area || [],
              healthAnimation: response.data.health_animation || [],
              healthStaff: response.data.health_staff || [],
              healthAdditional: response.data.health_additional || [],
              hotelAdditionalAdmissions: response.data.hotel_additional_admissions,
              additionalAdmissionLeisurePark: response.data.additional_admission_leisure_park,
              additionalAdmissionFrequencyOfLeisurePark:
                response.data.additional_admission_frequency_of_leisure_park || null,
              additionalAdmissionCountPerLeisurePark:
                response.data.additional_admission_count_per_leisure_park,
              additionalAdmissionWaterPark: response.data.additional_admission_water_park,
              additionalAdmissionFrequencyOfWaterPark:
                response.data.additional_admission_frequency_of_water_park || null,
              additionalAdmissionCountPerWaterPark:
                response.data.additional_admission_count_per_water_park,
              additionalAdmissionGreenFees: response.data.additional_admission_green_fees,
              additionalAdmissionFrequencyOfGreenFees:
                response.data.additional_admission_frequency_of_green_fees || null,
              additionalAdmissionCountPerGreenFees:
                response.data.additional_admission_count_per_green_fees,
              additionalAdmissionSkiPass: response.data.additional_admission_ski_pass,
              additionalAdmissionFrequencyOfSkiPass:
                response.data.additional_admission_frequency_of_ski_pass || null,
              additionalAdmissionCountPerSkiPass:
                response.data.additional_admission_count_per_ski_pass,
              additionalAdmissionSpaVoucher: response.data.additional_admission_spa_voucher,
              additionalAdmissionFrequencyOfSpaVoucher:
                response.data.additional_admission_frequency_of_spa_voucher || null,
              additionalAdmissionCountPerSpaVoucher:
                response.data.additional_admission_count_per_spa_voucher,
              additionalAdmissionThermalPass: response.data.additional_admission_thermal_pass,
              additionalAdmissionFrequencyOfThermalPass:
                response.data.additional_admission_frequency_of_thermal_pass || null,
              additionalAdmissionCountPerThermalPass:
                response.data.additional_admission_count_per_thermal_pass,
              hotelAdditionalDrinks: response.data.hotel_additional_drinks,
              additionalDrinksChampagne: response.data.additional_drinks_champagne,
              additionalDrinksFrequencyOfChampagne:
                response.data.additional_drinks_frequency_of_champagne || null,
              additionalDrinksCountPerChampagne:
                response.data.additional_drinks_count_per_champagne,
              additionalDrinksProsecco: response.data.additional_drinks_prosecco,
              additionalDrinksFrequencyOfProsecco:
                response.data.additional_drinks_frequency_of_prosecco || null,
              additionalDrinksCountPerProsecco: response.data.additional_drinks_count_per_prosecco,
              additionalDrinksRum: response.data.additional_drinks_rum,
              additionalDrinksFrequencyOfRum:
                response.data.additional_drinks_frequency_of_rum || null,
              additionalDrinksCountPerRum: response.data.additional_drinks_count_per_rum,
              additionalDrinksSparklingWine: response.data.additional_drinks_sparkling_wine,
              additionalDrinksFrequencyOfSparklingWine:
                response.data.additional_drinks_frequency_of_sparkling_wine || null,
              additionalDrinksCountPerSparklingWine:
                response.data.additional_drinks_count_per_sparkling_wine,
              additionalDrinksTequila: response.data.additional_drinks_tequila,
              additionalDrinksFrequencyOfTequila:
                response.data.additional_drinks_frequency_of_tequila || null,
              additionalDrinksCountPerTequila: response.data.additional_drinks_count_per_tequila,
              additionalDrinksWater: response.data.additional_drinks_water,
              additionalDrinksFrequencyOfWater:
                response.data.additional_drinks_frequency_of_water || null,
              additionalDrinksCountPerWater: response.data.additional_drinks_count_per_water,
              additionalDrinksWine: response.data.additional_drinks_wine,
              additionalDrinksFrequencyOfWine:
                response.data.additional_drinks_frequency_of_wine || null,
              additionalDrinksCountPerWine: response.data.additional_drinks_count_per_wine,
              additionalDrinksWelcome: response.data.additional_drinks_welcome,
              additionalDrinksFrequencyOfWelcome:
                response.data.additional_drinks_frequency_of_welcome || null,
              additionalDrinksCountPerWelcome: response.data.additional_drinks_count_per_welcome,
              hotelAdditionalExcursions: response.data.hotel_additional_excursions,
              additionalExcursionGuidedTour: response.data.additional_excursion_guided_tour,
              additionalExcursionFrequencyOfGuidedTour:
                response.data.additional_excursion_frequency_of_guided_tour || null,
              additionalExcursionCountPerGuidedTour:
                response.data.additional_excursion_count_per_guided_tour,
              additionalExcursionIslandTour: response.data.additional_excursion_island_tour,
              additionalExcursionFrequencyOfIslandTour:
                response.data.additional_excursion_frequency_of_island_tour || null,
              additionalExcursionCountPerIslandTour:
                response.data.additional_excursion_count_per_island_tour,
              additionalExcursionSafari: response.data.additional_excursion_safari,
              additionalExcursionFrequencyOfSafari:
                response.data.additional_excursion_frequency_of_safari || null,
              additionalExcursionCountPerSafari:
                response.data.additional_excursion_count_per_safari,
              additionalExcursionTravelGuide: response.data.additional_excursion_travel_guide,
              additionalExcursionFrequencyOfTravelGuide:
                response.data.additional_excursion_frequency_of_travel_guide || null,
              additionalExcursionCountPerTravelGuide:
                response.data.additional_excursion_count_per_travel_guide,
              additionalExcursionWine: response.data.additional_excursion_wine,
              additionalExcursionFrequencyOfWine:
                response.data.additional_excursion_frequency_of_wine || null,
              additionalExcursionCountPerWine: response.data.additional_excursion_count_per_wine,
              hotelAdditionalItems: response.data.hotel_additional_items,
              additionalOtherFlowers: response.data.additional_other_flowers,
              additionalOtherFrequencyOfFlowers:
                response.data.additional_other_frequency_of_flowers || null,
              additionalOtherCountPerFlowers: response.data.additional_other_count_per_flowers,
              additionalOtherCooking: response.data.additional_other_cooking,
              additionalOtherFrequencyOfCooking:
                response.data.additional_other_frequency_of_cooking || null,
              additionalOtherCountPerCooking: response.data.additional_other_count_per_cooking,
              additionalOtherDance: response.data.additional_other_dance,
              additionalOtherFrequencyOfDance:
                response.data.additional_other_frequency_of_dance || null,
              additionalOtherCountPerDance: response.data.additional_other_count_per_dance,
              additionalOtherDiscount: response.data.additional_other_discount,
              additionalOtherFrequencyOfDiscount:
                response.data.additional_other_frequency_of_discount || null,
              additionalOtherCountPerDiscount: response.data.additional_other_count_per_discount,
              additionalOtherDCard: response.data.additional_other_d_card,
              additionalOtherFrequencyOfDCard:
                response.data.additional_other_frequency_of_d_card || null,
              additionalOtherCountPerDCard: response.data.additional_other_count_per_d_card,
              additionalOtherFruits: response.data.additional_other_fruits,
              additionalOtherFrequencyOfFruits:
                response.data.additional_other_frequency_of_fruits || null,
              additionalOtherCountPerFruits: response.data.additional_other_count_per_fruits,
              additionalOtherLanguage: response.data.additional_other_language,
              additionalOtherFrequencyOfLanguage:
                response.data.additional_other_frequency_of_language || null,
              additionalOtherCountPerLanguage: response.data.additional_other_count_per_language,
              additionalOtherCityMap: response.data.additional_other_city_map,
              additionalOtherFrequencyOfCityMap:
                response.data.additional_other_frequency_of_city_map || null,
              additionalOtherCountPerCityMap: response.data.additional_other_count_per_city_map,
              additionalOtherMassage: response.data.additional_other_massage,
              additionalOtherFrequencyOfMassage:
                response.data.additional_other_frequency_of_massage || null,
              additionalOtherCountPerMassage: response.data.additional_other_count_per_massage,
              additionalOtherMeal: response.data.additional_other_meal,
              additionalOtherFrequencyOfMeal:
                response.data.additional_other_frequency_of_meal || null,
              additionalOtherCountPerMeal: response.data.additional_other_count_per_meal,
              additionalOtherPaint: response.data.additional_other_paint,
              additionalOtherFrequencyOfPaint:
                response.data.additional_other_frequency_of_paint || null,
              additionalOtherCountPerPaint: response.data.additional_other_count_per_paint,
              additionalOtherMap: response.data.additional_other_map,
              additionalOtherFrequencyOfMap:
                response.data.additional_other_frequency_of_map || null,
              additionalOtherCountPerMap: response.data.additional_other_count_per_map,
              additionalOtherCar: response.data.additional_other_car,
              additionalOtherFrequencyOfCar:
                response.data.additional_other_frequency_of_car || null,
              additionalOtherCountPerCar: response.data.additional_other_count_per_car,
              additionalOtherSVoucher: response.data.additional_other_s_voucher,
              additionalOtherFrequencyOfSVoucher:
                response.data.additional_other_frequency_of_s_voucher || null,
              additionalOtherCountPerSVoucher: response.data.additional_other_count_per_s_voucher,
              additionalOtherSkis: response.data.additional_other_skis,
              additionalOtherFrequencyOfSkis:
                response.data.additional_other_frequency_of_skis || null,
              additionalOtherCountPerSkis: response.data.additional_other_count_per_skis,
              additionalOtherSweets: response.data.additional_other_sweets,
              additionalOtherFrequencyOfSweets:
                response.data.additional_other_frequency_of_sweets || null,
              additionalOtherCountPerSweets: response.data.additional_other_count_per_sweets,
              additionalOtherVignette: response.data.additional_other_vignette,
              additionalOtherFrequencyOfVignette:
                response.data.additional_other_frequency_of_vignette || null,
              additionalOtherCountPerVignette: response.data.additional_other_count_per_vignette,
              additionalOtherGift: response.data.additional_other_gift,
              additionalOtherFrequencyOfGift:
                response.data.additional_other_frequency_of_gift || null,
              additionalOtherCountPerGift: response.data.additional_other_count_per_gift,
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
