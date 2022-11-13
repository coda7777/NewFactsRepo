import axios from "axios";

export default {
  namespaced: true,
  state: {
    properties: [],
    property: {
      id: 0,
      hotel: 0,
      barName: null,
      barType: null,
      barCharges: null,
    },
    errors: [],
  },
  mutations: {
    updateProperty(state, newInfo) {
      state.property = newInfo;
    },
    validate(context, newInfo) {
      context.commit("updateErrors", newInfo);
    },
    updateErrors(state, newInfo) {
      /* console.log("commit here", newInfo); */
      state.errors = newInfo;
    },
    updateProperties(state, newInfo) {
      state.properties = newInfo;
    },
    addBarInstance(state, newBar) {
      state.properties.push(newBar);
    },
    removeBar(state, barIndex) {
      state.properties.splice(barIndex, 1);
    },
  },
  actions: {
    deleteBar(context, barIndex) {
      context.commit("removeBar", barIndex);
    },
    addNewBar(context) {
      const newBar = {
        isSelected: false,
        id: 0,
        barName: null,
        barType: null,
        barCharges: null,
      };
      context.commit("addBarInstance", newBar);
    },
    postInfo(context, propertyId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      const retrievedInfo = context.state.properties.map((info) => ({
        bar_name: info.barName,
        bar_type: info.barType,
        bar_charges: info.barCharges,
        hotel: propertyId,
      }));

      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/facts/facility/bars/update/${propertyId}/`,
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
          url: `http://127.0.0.1:8000/api/facts/facility/bars/${propertyId}/`,
        })
          .then((response) => {
            /* console.log("bars are:", response.data); */

            const retrievedInfo = response.data.map((info) => ({
              id: info.id,
              isSelected: false,
              hotel: info.hotel,
              barName: info.bar_name,
              barType: info.bar_type,
              barCharges: info.bar_charges,
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
