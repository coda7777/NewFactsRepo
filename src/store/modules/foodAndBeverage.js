import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: 0,
      boardsAvailable: [],
      hotelBreakfastTypes: [],
      hotelLunchTypes: [],
      hotelDinnerTypes: [],
      hotelFoodSpecials: [],
      dinnerDressCodeRequired: false,
      hotelHasChristmasDinner: false,
      hotelChristmasDinnerCharges: null,
      hotelChristmasDinnerObligatory: false,
      hotelChristmasDinnerDrinks: false,
      hotelHasNyeDinner: false,
      hotelNyeCharges: null,
      hotelNyeObligatory: false,
      hotelNyeDrinks: false,
      hotelHasOtherGala: false,
      hotelGalaName: null,
      hotelGalaDate: null,
      hotelGalaCharges: null,
      hotelGalaObligatory: false,
      hotelGalaDrinks: false,
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
        ? `http://127.0.0.1:8000/api/facts/food/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/food/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.hotel,
              boardsAvailable: response.data.boards_available,
              hotelBreakfastTypes: response.data.hotel_breakfast_types,
              hotelLunchTypes: response.data.hotel_lunch_types,
              hotelDinnerTypes: response.data.hotel_dinner_types,
              hotelFoodSpecials: response.data.hotel_food_specials,
              dinnerDressCodeRequired: response.data.dinner_dress_code_required,
              hotelHasChristmasDinner: response.data.hotel_has_christmas_dinner,
              hotelChristmasDinnerCharges: response.data.hotel_christmas_dinner_charges,
              hotelChristmasDinnerObligatory: response.data.hotel_christmas_dinner_obligatory,
              hotelChristmasDinnerDrinks: response.data.hotel_christmas_dinner_drinks,
              hotelHasNyeDinner: response.data.hotel_has_nye_dinner,
              hotelNyeCharges: response.data.hotel_nye_charges,
              hotelNyeObligatory: response.data.hotel_nye_obligatory,
              hotelNyeDrinks: response.data.hotel_nye_drinks,
              hotelHasOtherGala: response.data.hotel_has_other_gala,
              hotelGalaName: response.data.hotel_gala_name,
              hotelGalaDate: response.data.hotel_gala_date,
              hotelGalaCharges: response.data.hotel_gala_charges,
              hotelGalaObligatory: response.data.hotel_gala_obligatory,
              hotelGalaDrinks: response.data.hotel_gala_drinks,
            };
            context.commit("updateProperty", savedInfo);
            /* console.log("saved data", savedInfo); */
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getInfo(context, infoId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/food/${infoId}/`,
        })
          .then((response) => {
            const retrievedInfo = {
              id: response.data.hotel,
              boardsAvailable: response.data.boards_available || [],
              hotelBreakfastTypes: response.data.hotel_breakfast_types || [],
              hotelLunchTypes: response.data.hotel_lunch_types || [],
              hotelDinnerTypes: response.data.hotel_dinner_types || [],
              hotelFoodSpecials: response.data.hotel_food_specials || [],
              dinnerDressCodeRequired: response.data.dinner_dress_code_required,
              hotelHasChristmasDinner: response.data.hotel_has_christmas_dinner,
              hotelChristmasDinnerCharges: response.data.hotel_christmas_dinner_charges || null,
              hotelChristmasDinnerObligatory: response.data.hotel_christmas_dinner_obligatory,
              hotelChristmasDinnerDrinks: response.data.hotel_christmas_dinner_drinks,
              hotelHasNyeDinner: response.data.hotel_has_nye_dinner,
              hotelNyeCharges: response.data.hotel_nye_charges || null,
              hotelNyeObligatory: response.data.hotel_nye_obligatory,
              hotelNyeDrinks: response.data.hotel_nye_drinks,
              hotelHasOtherGala: response.data.hotel_has_other_gala,
              hotelGalaName: response.data.hotel_gala_name,
              hotelGalaDate: response.data.hotel_gala_date,
              hotelGalaCharges: response.data.hotel_gala_charges || null,
              hotelGalaObligatory: response.data.hotel_gala_obligatory,
              hotelGalaDrinks: response.data.hotel_gala_drinks,
            };
            context.commit("updateProperty", retrievedInfo);
            resolve(retrievedInfo);
          })
          .catch((error) => {
            reject(error);
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
