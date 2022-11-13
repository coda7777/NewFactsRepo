import axios from "axios";

export default {
  namespaced: true,
  state: {
    authorizedUsers: [],
    currentAuthorizedUser: {},
    currentPermissions: {
      id: null,
      user: null,
      detailsManager: false,
      layoutManager: false,
      devToolsManager: false,
      partnercontractManager: false,
      premiumManager: false,
      addFactsManager: false,
      addPropertyManager: false,
      addPhotosManager: false,
      stopSaleManager: false,
      roomTypeManager: false,
      stopContactsManager: false,
      stopsPublishManager: false,
      userRoleInHotel: null,
      listOfPropertyRights: [],
    },
  },
  mutations: {
    updateAuthorizedUsers(state, newInfo) {
      state.authorizedUsers = newInfo;
    },
    updateCurrentAuthorizedUser(state, newInfo) {
      state.currentAuthorizedUser = newInfo;
    },
    updatePermissions(state, newInfo) {
      state.currentPermissions = newInfo;
    },
  },
  actions: {
    retrieveAuthorizedUsers(context) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://127.0.0.1:8000/api/auth/authorized-users/",
          method: "get",
        })
          .then((result) => {
            let retrievedInfo;
            if (result.data) {
              retrievedInfo = result.data.map((info) => ({
                id: info.id,
                email: info.email,
                username: info.username,
                firstName: info.first_name,
                lastName: info.last_name,
                phone: info.phone,
                language: info.language,
                country: info.country,
                isActive: info.is_active,
              }));
            } else {
              retrievedInfo = [];
            }
            context.commit("updateAuthorizedUsers", retrievedInfo);
            resolve(result);
          })
          .catch((error) => {
            /* console.log(error.data); */
            reject(error);
          });
      });
    },
    deleteAuthorizedUser(context, userId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/auth/authorized-user/delete/${userId}/`,
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    updateAuthorizedUser(context, userInfo) {
      return new Promise((resolve, reject) => {
        axios({
          method: "patch",
          url: "http://127.0.0.1:8000/api/auth/authorized-user/update/",
          data: userInfo,
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    getCurrentAuthorizedUser(context, userId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/auth/authorized-user/${userId}/`,
        })
          .then((response) => {
            /* console.log(response.data); */
            const newData = {
              username: response.data.username,
              firstName: response.data.first_name,
              lastName: response.data.last_name,
              country: response.data.country,
              title: response.data.title,
              phone: response.data.phone,
              id: response.data.id,
            };
            context.commit("updateCurrentAuthorizedUser", newData);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getPermissions(context, userId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/auth/permissions/${userId}/`,
        })
          .then((response) => {
            const newPermissions = {
              id: response.data.user,
              detailsManager: response.data.company,
              layoutManager: response.data.export,
              devToolsManager: response.data.developer_tools,
              partnercontractManager: response.data.partner_connections,
              premiumManager: response.data.premium_subscription,
              addFactsManager: response.data.facts,
              addPropertyManager: response.data.properties,
              addPhotosManager: response.data.photos,
              stopSaleManager: response.data.stop_sales,
              roomTypeManager: response.data.stop_sale_room_types,
              stopContactsManager: response.data.stop_sale_contact_list,
              stopsPublishManager: response.data.stop_sale_publishing,
              userRoleInHotel: response.data.role,
              listOfPropertyRights: response.data.properties_allowed || [],
            };
            /* console.log(newPermissions); */
            context.commit("updatePermissions", newPermissions);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    postPermissions(context, newPermissions) {
      const requestMethod = newPermissions.id ? "put" : "post";
      const requestUrl = newPermissions.id
        ? `http://127.0.0.1:8000/api/auth/permissions/update/${newPermissions.id}/`
        : "http://127.0.0.1:8000/api/auth/permissions/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newPermissions,
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
  },
  getters: {
    getAuthorizedUsers(state) {
      return state.authorizedUsers;
    },
    getCurrentAuthorizedUser(state) {
      return state.currentAuthorizedUser;
    },
    getCurrentPermissions(state) {
      return state.currentPermissions;
    },
  },
};
