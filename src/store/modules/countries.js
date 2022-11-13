import axios from "axios";

export default {
  namespaced: true,
  state: {
    countries: [],
    states: [],
    cities: [],
  },
  mutations: {
    updateCountries(state, newCountries) {
      state.countries = newCountries;
    },
    updateStates(state, newStates) {
      state.states = newStates;
    },
    updateCities(state, newCities) {
      state.cities = newCities;
    },
  },
  actions: {
    retrieveCountries(context) {
      context.commit("updateCountries", []);
      context.commit("updateStates", []);
      context.commit("updateCities", []);
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/external/countries/",
        })
          .then((response) => {
            context.commit("updateCountries", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            context.commit("updateCountries", []);
            reject(error.response.data);
          });
      });
    },
    retrieveStates(context, countryCode) {
      context.commit("updateStates", []);
      context.commit("updateCities", []);
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/external/states/${countryCode}/`,
        })
          .then((response) => {
            context.commit("updateStates", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            context.commit("updateStates", []);
            reject(error.response.data);
          });
      });
    },
    retrieveCities(context, cityInfo) {
      context.commit("updateCities", []);
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/external/cities/${cityInfo.countryCode}/${cityInfo.stateCode}/`,
        })
          .then((response) => {
            context.commit("updateCities", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            context.commit("updateCities", []);
            reject(error.response.data);
          });
      });
    },
  },
  getters: {
    getCountries(state) {
      return state.countries;
    },
    getStates(state) {
      return state.states;
    },
    getCities(state) {
      return state.cities;
    },
  },
};
