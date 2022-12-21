import axios from "axios";

export default {
  namespaced: true,
  state: {
    properties: [],
    lastPublishDate: "No Date",
    totalProperties: {
      labels: [],
      series: [[]],
      total: 0,
    },
  },
  mutations: {
    clearProperties(state) {
      state.properties = [];
    },
    updatePublishDate(state, newDate) {
      const result = new Date(newDate);
      const year = result.getFullYear();
      const month = result.getMonth() + 1;
      const day = result.getDate();
      const hours = result.getHours();
      const minutes = result.getMinutes();
      state.lastPublishDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    updateProperties(state, newProperties) {
      state.properties = [];
      newProperties.forEach((item) => {
        state.properties.push({
          id: item.id,
          hotelName: item.hotel_name,
          country: item.country,
          city: item.city,
          publish: item.publish_date,
          state: item.state,
        });
      });
      // state.properties = newProperties;
    },
    addNewProperty(state, newProperty) {
      state.properties.push(newProperty);
    },
    updateProperty(state, updatedProperty) {
      let index = -1;
      state.properties.forEach((element) => {
        if (element.id === updatedProperty.id) {
          index = state.properties.indexOf(element);
        }
      });
      state.properties[index] = updatedProperty;
    },
    removeProperty(state, propertyId) {
      let index = -1;
      state.properties.forEach((element) => {
        if (element.id === propertyId) {
          index = state.properties.indexOf(element);
        }
      });
      state.properties.splice(index, 1);
    },
    updateTotalProperties(state, newInfo) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const labels = [];
      const series = [];
      labels.push("Older");
      series.push(newInfo.previous);
      newInfo.current.forEach((m) => {
        labels.push(`${months[m.month - 1]}-${m.year - 2000}`);
        series.push(m.total);
      });
      state.totalProperties = {
        labels,
        series: [series],
        total: newInfo.total,
      };
    },
  },
  actions: {
    clear(context) {
      context.commit("clearProperties");
    },
    lastPublishDate(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://localhost:8000/api/facts/last-publish-date/",
        })
          .then((response) => {
            context.commit("updatePublishDate", response.data.date);
            resolve(response.data.date);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    publishProperty(context, propertyId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/facts/property/${propertyId}/publish/create/`,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    postInfo(context, newProperty) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      /* console.log(newProperty); */
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/facts/property/create/",
          data: newProperty,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.id,
              country: response.data.country,
              city: response.data.city,
              state: response.data.state,
              publish: response.data.publish_date,
              hotelName: response.data.hotel_name,
            };
            context.commit("addNewProperty", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    putInfo(context, propertyToEdit) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      /* console.log(propertyToEdit); */
      return new Promise((resolve, reject) => {
        axios({
          method: "put",
          url: `http://127.0.0.1:8000/api/facts/property/update/${propertyToEdit.id}/`,
          data: propertyToEdit,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.id,
              country: response.data.country,
              city: response.data.city,
              state: response.data.state,
              publish: response.data.publish_date,
              hotelName: response.data.hotel_name,
            };
            context.commit("updateProperty", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteInfo(context, propertyToDelete) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      /* console.log(propertyToDelete); */
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/facts/property/delete/${propertyToDelete.id}/`,
        })
          .then((response) => {
            context.commit("removeProperty", propertyToDelete.id);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getInfo(context) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/facts/properties/",
        })
          .then((response) => {
            const retrievedProperties = response.data || [];
            /* console.log("retrieved properties are:", retrievedProperties); */
            context.commit("updateProperties", retrievedProperties);
            resolve(retrievedProperties);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    totalProperties(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://localhost:8000/api/reports/accommodation-number/",
        })
          .then((response) => {
            context.commit("updateTotalProperties", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getProperties(state) {
      return state.properties;
    },
    getLastPublishDate(state) {
      return state.lastPublishDate;
    },
    getTotalProperties(state) {
      return state.totalProperties;
    },
  },
};
