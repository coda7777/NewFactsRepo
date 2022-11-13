import axios from "axios";

export default {
  namespaced: true,
  state: {
    properties: [],
    property: {
      id: 0,
      hotel: 0,
      maintenanceTypeApply: null,
      maintenanceDisturbance: null,
      maintenanceZone: null,
      maintenanceFrom: null,
      maintenanceTo: null,
    },
    errors: [],
  },
  mutations: {
    updateProperty(state, newInfo) {
      state.property = newInfo;
    },
    updateErrors(state, newInfo) {
      /* console.log("commit here", newInfo); */
      state.errors = newInfo || [];
    },
    updateProperties(state, newInfo) {
      state.properties = newInfo;
    },
    addMaintenanceInstance(state, newMaintenance) {
      state.properties.push(newMaintenance);
    },
    removeMaintenance(state, maintenanceIndex) {
      state.properties.splice(maintenanceIndex, 1);
    },
  },
  actions: {
    validate(context, newInfo) {
      context.commit("updateErrors", newInfo);
    },
    deleteMaintenance(context, maintenanceIndex) {
      context.commit("removeMaintenance", maintenanceIndex);
    },
    addNewMaintenance(context) {
      const newMaintenance = {
        isSelected: false,
        id: 0,
        hotel: 0,
        maintenanceTypeApply: null,
        maintenanceDisturbance: null,
        maintenanceZone: null,
        maintenanceFrom: null,
        maintenanceTo: null,
      };
      context.commit("addMaintenanceInstance", newMaintenance);
    },
    postInfo(context, propertyId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      const retrievedInfo = context.state.properties.map((info) => ({
        maintenance_type_apply: info.maintenanceTypeApply,
        maintenance_disturbance: info.maintenanceDisturbance,
        maintenance_zone: info.maintenanceZone,
        maintenance_from: info.maintenanceFrom,
        maintenance_to: info.maintenanceTo,
        hotel: propertyId,
      }));
      /* console.log("req is", retrievedInfo); */
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/facts/maintenance/update/${propertyId}/`,
          data: retrievedInfo,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.id,
              maintenanceTypeApply: response.data.maintenance_type_apply,
              maintenanceDisturbance: response.data.maintenance_disturbance,
              maintenanceZone: response.data.maintenance_zone,
              maintenanceFrom: response.data.maintenance_from,
              maintenanceTo: response.data.maintenance_to,
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
          url: `http://127.0.0.1:8000/api/facts/maintenance/${propertyId}/`,
        })
          .then((response) => {
            const retrievedInfo = response.data.map((info) => ({
              id: info.id,
              isSelected: false,
              maintenanceTypeApply: info.maintenance_type_apply,
              maintenanceDisturbance: info.maintenance_disturbance,
              maintenanceZone: info.maintenance_zone,
              maintenanceFrom: info.maintenance_from,
              maintenanceTo: info.maintenance_to,
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
