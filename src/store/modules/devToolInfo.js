import axios from "axios";

export default {
  namespaced: true,
  state: {
    whitelists: [],
    apiKeys: [],
  },
  mutations: {
    updateWhitelists(state, newInfo) {
      state.whitelists = newInfo;
    },
    updateApiKeys(state, newInfo) {
      state.apiKeys = newInfo;
    },
  },
  actions: {
    getWhitelists(context) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/settings/whitelists/",
        })
          .then((response) => {
            context.commit("updateWhitelists", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    saveWhitelist(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/settings/whitelist/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/settings/whitelist/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    deleteWhitelist(context, whitelistId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/settings/whitelist/delete/${whitelistId}/`,
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    getApiKeys(context) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/settings/api-keys/",
        })
          .then((response) => {
            context.commit("updateApiKeys", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    saveApiKey(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/settings/api-key/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/settings/api-key/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    deleteApiKey(context, apiKeyId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/settings/api-key/delete/${apiKeyId}/`,
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
  getters: {
    getWhitelists(state) {
      return state.whitelists;
    },
    getApiKeys(state) {
      return state.apiKeys;
    },
  },
};
