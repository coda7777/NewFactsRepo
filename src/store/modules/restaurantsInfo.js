import axios from "axios";

export default {
  namespaced: true,
  state: {
    properties: [],
    property: {
      id: 0,
      hotel: 0,
      restaurantName: null,
      restaurantType: null,
      restaurantCuisineType: null,
      restaurantFeatures: null,
      restaurantIsBuffet: false,
      restaurantIsAlaCarte: false,
      restaurantOpeningDays: [],
      restaurantOpeningFrom: null,
      restaurantOpeningTo: null,
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
    updateProperties(state, newInfo) {
      state.properties = newInfo;
    },
    addRestaurantInstance(state, newRestaurant) {
      state.properties.push(newRestaurant);
    },
    removeRestaurant(state, restaurntIndex) {
      state.properties.splice(restaurntIndex, 1);
    },
  },
  actions: {
    validate(context, newInfo) {
      context.commit("updateErrors", newInfo);
    },
    deleteRestaurant(context, restaurantIndex) {
      context.commit("removeRestaurant", restaurantIndex);
    },
    addNewRestaurant(context) {
      const newRestaurant = {
        isSelected: false,
        id: 0,
        restaurantName: null,
        restaurantType: null,
        restaurantCuisineType: null,
        restaurantFeatures: [],
        restaurantIsBuffet: false,
        restaurantIsAlaCarte: false,
        restaurantOpeningDays: [],
        restaurantOpeningFrom: null,
        restaurantOpeningTo: null,
      };
      context.commit("addRestaurantInstance", newRestaurant);
    },
    postInfo(context, propertyId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      const retrievedInfo = context.state.properties.map((info) => ({
        restaurant_features: info.restaurantFeatures,
        restaurant_opening_days: info.restaurantOpeningDays,
        restaurant_name: info.restaurantName,
        restaurant_type: info.restaurantType,
        restaurant_cuisine_type: info.restaurantCuisineType,
        restaurant_is_buffet: info.restaurantIsBuffet,
        restaurant_is_ala_carte: info.restaurantIsAlaCarte,
        restaurant_opening_from: info.restaurantOpeningFrom,
        restaurant_opening_to: info.restaurantOpeningTo,
        hotel: propertyId,
      }));

      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/facts/facility/restaurants/update/${propertyId}/`,
          data: retrievedInfo,
        })
          .then((response) => {
            const savedInfo = {
              response,
            };
            context.commit("updateProperty", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getInfo(context, propertyId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/facility/restaurants/${propertyId}/`,
        })
          .then((response) => {
            /* console.log("restaurants are:", response.data); */

            const retrievedInfo = response.data.map((info) => ({
              id: info.id,
              isSelected: false,
              restaurantFeatures: info.restaurant_features,
              restaurantOpeningDays: info.restaurant_opening_days || [],
              restaurantName: info.restaurant_name,
              restaurantType: info.restaurant_type,
              restaurantCuisineType: info.restaurant_cuisine_type,
              restaurantIsBuffet: info.restaurant_is_buffet,
              restaurantIsAlaCarte: info.restaurant_is_ala_carte,
              restaurantOpeningFrom: info.restaurant_opening_from,
              restaurantOpeningTo: info.restaurant_opening_to,
              hotel: info.hotel,
            }));
            context.commit("updateProperties", retrievedInfo);
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
    getProperties(state) {
      return state.properties;
    },
    getErrors(state) {
      return state.errors;
    },
  },
};
