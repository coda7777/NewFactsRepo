/* eslint-disable max-len */
import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: 0,
      hotel: 0,
      restrctionArrDep: false,
      breakfastTypes: [],
      lunchTypes: [],
      dinnerTypes: [],
      afternoonSnacksAvailable: false,
      afternoonSnacksFrom: null,
      afternoonSnacksTo: null,
      cafeCakesAvailable: false,
      cafeCakesFrom: null,
      cafeCakesTo: null,
      iceCreamAvailable: false,
      iceCreamFrom: null,
      iceCreamTo: null,
      iceCreamKidsOnly: false,
      kidsMealAvailable: false,
      kidsMealFrom: null,
      kidsMealTo: null,
      lateBreakfastAvailable: false,
      lateBreakfastFrom: null,
      lateBreakfastTo: null,
      midnightSnackAvailable: false,
      midnightSnackFrom: null,
      midnightSnackTo: null,
      midnightSoupAvailable: false,
      midnightSoupFrom: null,
      midnightSoupTo: null,
      snacksAvailable: false,
      snacksFrom: null,
      snacksTo: null,
      snacksAllDay: false,
      snacksTypes: [],
      drinksAllDay: false,
      drinksTypes: [],
      localAlcoholAvailable: false,
      localAlcoholFrom: null,
      localAlcoholTo: null,
      nonAlcoholAvailable: false,
      nonAlcoholFrom: null,
      nonAlcoholTo: null,
      interAlcoholAvailable: false,
      interAlcoholFrom: null,
      interAlcoholTo: null,
      interNonAlcoholAvailable: false,
      interNonAlcoholFrom: null,
      interNonAlcoholTo: null,
      menuDrinksAvailable: false,
      menuDrinksFrom: null,
      menuDrinksTo: null,
      coffeeTeaAvailable: false,
      coffeeTeaFrom: null,
      coffeeTeaTo: null,
      specialServices: [],
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
        ? `http://127.0.0.1:8000/api/facts/all-inclusive/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/all-inclusive/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            /* console.log("response is", response.data); */
            const savedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              restrctionArrDep: response.data.restriction_arr_dep,
              breakfastTypes: response.data.breakfast_types || [],
              lunchTypes: response.data.lunch_types || [],
              dinnerTypes: response.data.dinner_types || [],
              afternoonSnacksAvailable: response.data.afternoon_snacks_available,
              afternoonSnacksFrom: response.data.afternoon_snacks_from,
              afternoonSnacksTo: response.data.afternoon_snacks_to,
              cafeCakesAvailable: response.data.cafe_cakes_available,
              cafeCakesFrom: response.data.cafe_cakes_from,
              cafeCakesTo: response.data.cafe_cakes_to,
              iceCreamAvailable: response.data.ice_cream_available,
              iceCreamFrom: response.data.ice_cream_from,
              iceCreamTo: response.data.ice_cream_to,
              iceCreamKidsOnly: response.data.ice_cream_kids_only,
              kidsMealAvailable: response.data.kids_meal_available,
              kidsMealFrom: response.data.kids_meal_from,
              kidsMealTo: response.data.kids_meal_to,
              lateBreakfastAvailable: response.data.late_breakfast_available,
              lateBreakfastFrom: response.data.late_breakfast_from,
              lateBreakfastTo: response.data.late_breakfast_to,
              midnightSnackAvailable: response.data.midnight_snack_available,
              midnightSnackFrom: response.data.midnight_snack_from,
              midnightSnackTo: response.data.midnight_snack_to,
              midnightSoupAvailable: response.data.midnight_soup_available,
              midnightSoupFrom: response.data.midnight_soup_from,
              midnightSoupTo: response.data.midnight_soup_to,
              snacksAvailable: response.data.snacks_available,
              snacksFrom: response.data.snacks_from,
              snacksTo: response.data.snacks_to,
              snacksAllDay: response.data.snacks_all_day,
              snacksTypes: response.data.snacks_types,
              drinksAllDay: response.data.drinks_all_day,
              drinksTypes: response.data.drinks_types || [],
              localAlcoholAvailable: response.data.local_alcohol_available,
              localAlcoholFrom: response.data.local_alcohol_from,
              localAlcoholTo: response.data.local_alcohol_to,
              nonAlcoholAvailable: response.data.non_alcohol_available,
              nonAlcoholFrom: response.data.non_alcohol_from,
              nonAlcoholTo: response.data.non_alcohol_to,
              interAlcoholAvailable: response.data.inter_alcohol_available,
              interAlcoholFrom: response.data.inter_alcohol_from,
              interAlcoholTo: response.data.inter_alcohol_to,
              interNonAlcoholAvailable: response.data.inter_non_alcohol_available,
              interNonAlcoholFrom: response.data.inter_non_alcohol_from,
              interNonAlcoholTo: response.data.inter_non_alcohol_to,
              menuDrinksAvailable: response.data.menu_drinks_available,
              menuDrinksFrom: response.data.menu_drinks_from,
              menuDrinksTo: response.data.menu_drinks_to,
              coffeeTeaAvailable: response.data.coffee_tea_available,
              coffeeTeaFrom: response.data.coffee_tea_from,
              coffeeTeaTo: response.data.coffee_tea_to,
              specialServices: response.data.special_services || [],
            };
            /* console.log("saved info:", savedInfo); */
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
          url: `http://127.0.0.1:8000/api/facts/all-inclusive/${infoId}/`,
        })
          .then((response) => {
            /* console.log(response); */
            const retrievedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              restrctionArrDep: response.data.restriction_arr_dep,
              breakfastTypes: response.data.breakfast_types || [],
              lunchTypes: response.data.lunch_types || [],
              dinnerTypes: response.data.dinner_types || [],
              afternoonSnacksAvailable: response.data.afternoon_snacks_available,
              afternoonSnacksFrom: response.data.afternoon_snacks_from,
              afternoonSnacksTo: response.data.afternoon_snacks_to,
              cafeCakesAvailable: response.data.cafe_cakes_available,
              cafeCakesFrom: response.data.cafe_cakes_from,
              cafeCakesTo: response.data.cafe_cakes_to,
              iceCreamAvailable: response.data.ice_cream_available,
              iceCreamFrom: response.data.ice_cream_from,
              iceCreamTo: response.data.ice_cream_to,
              iceCreamKidsOnly: response.data.ice_cream_kids_only,
              kidsMealAvailable: response.data.kids_meal_available,
              kidsMealFrom: response.data.kids_meal_from,
              kidsMealTo: response.data.kids_meal_to,
              lateBreakfastAvailable: response.data.late_breakfast_available,
              lateBreakfastFrom: response.data.late_breakfast_from,
              lateBreakfastTo: response.data.late_breakfast_to,
              midnightSnackAvailable: response.data.midnight_snack_available,
              midnightSnackFrom: response.data.midnight_snack_from,
              midnightSnackTo: response.data.midnight_snack_to,
              midnightSoupAvailable: response.data.midnight_soup_available,
              midnightSoupFrom: response.data.midnight_soup_from,
              midnightSoupTo: response.data.midnight_soup_to,
              snacksAvailable: response.data.snacks_available,
              snacksFrom: response.data.snacks_from,
              snacksTo: response.data.snacks_to,
              snacksAllDay: response.data.snacks_all_day,
              snacksTypes: response.data.snacks_types,
              drinksAllDay: response.data.drinks_all_day,
              drinksTypes: response.data.drinks_types || [],
              localAlcoholAvailable: response.data.local_alcohol_available,
              localAlcoholFrom: response.data.local_alcohol_from,
              localAlcoholTo: response.data.local_alcohol_to,
              nonAlcoholAvailable: response.data.non_alcohol_available,
              nonAlcoholFrom: response.data.non_alcohol_from,
              nonAlcoholTo: response.data.non_alcohol_to,
              interAlcoholAvailable: response.data.inter_alcohol_available,
              interAlcoholFrom: response.data.inter_alcohol_from,
              interAlcoholTo: response.data.inter_alcohol_to,
              interNonAlcoholAvailable: response.data.inter_non_alcohol_available,
              interNonAlcoholFrom: response.data.inter_non_alcohol_from,
              interNonAlcoholTo: response.data.inter_non_alcohol_to,
              menuDrinksAvailable: response.data.menu_drinks_available,
              menuDrinksFrom: response.data.menu_drinks_from,
              menuDrinksTo: response.data.menu_drinks_to,
              coffeeTeaAvailable: response.data.coffee_tea_available,
              coffeeTeaFrom: response.data.coffee_tea_from,
              coffeeTeaTo: response.data.coffee_tea_to,
              specialServices: response.data.special_services || [],
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
