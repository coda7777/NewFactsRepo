import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export default {
  namespaced: true,
  state: {
    userInfo: {
      id: Cookies.get("id") || 0,
      username: Cookies.get("username") || "",
      accountType: Cookies.get("accountType") || "",
      firstName: Cookies.get("firstName") || "",
      lastName: Cookies.get("lastName") || "",
      email: Cookies.get("email") || "",
      phone: Cookies.get("phone") || "",
      title: Cookies.get("title") || "",
      country: Cookies.get("country") || "",
      language: Cookies.get("language") || "",
      manager: Cookies.get("manager") || "",
      genuine: Cookies.get("genuine") || false,
      premiumStatus: Cookies.get("premiumStatus") || false,
    },
    token: Cookies.get("token") || null,
    permissions: {
      user: 0,
      role: "",
      company: false,
      export: false,
      developerTools: false,
      partnerConnections: false,
      premiumSubscription: false,
      facts: false,
      properties: false,
      photos: false,
      stopSales: false,
      stopSaleRoomTypes: false,
      stopSaleContactList: false,
      stopSalePublishing: false,
    },
    operatorTotal: 0,
  },
  mutations: {
    updateOperators(state, newNumber) {
      state.operatorTotal = newNumber;
    },
    updateUserInfo(state, newInfo) {
      if (!newInfo) {
        state.userInfo = {
          id: 0,
          username: "",
          accountType: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          title: "",
          country: "",
          language: "",
          manager: "",
          premiumStatus: false,
          genuine: false,
        };
        Cookies.remove("id");
        Cookies.remove("username");
        Cookies.remove("accountType");
        Cookies.remove("firstName");
        Cookies.remove("lastName");
        Cookies.remove("email");
        Cookies.remove("phone");
        Cookies.remove("title");
        Cookies.remove("country");
        Cookies.remove("language");
        Cookies.remove("manager");
        Cookies.remove("premiumStatus");
      } else {
        state.userInfo = newInfo;
        Cookies.set("id", newInfo.id, { expires: 30 });
        Cookies.set("accountType", newInfo.accountType, { expires: 30 });
        Cookies.set("username", newInfo.username, { expires: 30 });
        Cookies.set("firstName", newInfo.firstName, { expires: 30 });
        Cookies.set("lastName", newInfo.lastName, { expires: 30 });
        Cookies.set("email", newInfo.email, { expires: 30 });
        Cookies.set("phone", newInfo.phone, { expires: 30 });
        Cookies.set("title", newInfo.title, { expires: 30 });
        Cookies.set("country", newInfo.country, { expires: 30 });
        Cookies.set("language", newInfo.language, { expires: 30 });
        Cookies.set("manager", newInfo.manager, { expires: 30 });
        Cookies.set("genuine", newInfo.genuine, { expires: 30 });
        Cookies.set("premiumStatus", newInfo.premiumStatus, { expires: 30 });
      }
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    updatePermissions(state, newInfo) {
      state.permissions = newInfo;
    },
  },
  actions: {
    retrieveOperatorTotal(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/reports/operator-number/",
        })
          .then((response) => {
            context.commit("updateOperators", response.data.operators);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    retrievePermissions(context, userId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/auth/permissions/${userId}/`,
        })
          .then((response) => {
            const newPermissions = {
              user: response.data.user,
              role: response.data.role,
              company: response.data.company,
              export: response.data.export,
              developerTools: response.data.developer_tools,
              partnerConnections: response.data.partner_connections,
              premiumSubscription: response.data.premium_subscription,
              facts: response.data.facts,
              properties: response.data.properties,
              photos: response.data.photos,
              stopSales: response.data.stop_sales,
              stopSaleRoomTypes: response.data.stop_sale_room_types,
              stopSaleContactList: response.data.stop_sale_contact_list,
              stopSalePublishing: response.data.stop_sale_publishing,
            };
            context.commit("updatePermissions", newPermissions);
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        delete axios.defaults.headers.common.Authorization;
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/token/login/",
          data: {
            password: credentials.password,
            email: credentials.email,
          },
        })
          .then((response) => {
            const token = response.data.auth_token;
            Cookies.set("token", token, { expires: 30 });
            context.commit("retrieveToken", token);
            /* console.log(context.state.token); */
            axios.defaults.headers.common.Authorization = `Token ${context.state.token}`;
            resolve(response);
          })
          .catch((error) => {
            /* console.log(error.response.data); */
            reject(error);
          });
      });
    },
    destroyToken(context) {
      axios.defaults.headers.common.Authorization = `Token ${context.state.token}`;
      return new Promise((resolve, reject) => {
        axios({
          url: "http://127.0.0.1:8000/api/auth/token/logout/",
          method: "post",
        })
          .then((response) => {
            Cookies.remove("token");
            context.commit("retrieveToken", "");
            /* console.log(response); */
            delete axios.defaults.headers.common.Authorization;
            context.commit("updateUserInfo", null);
            resolve(response);
          })
          .catch((error) => {
            /* console.log(error.data); */
            Cookies.remove("token");
            context.commit("retrieveToken", "");
            delete axios.defaults.headers.common.Authorization;
            reject(error);
          });
      });
    },
    retrieveUserData(context) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://127.0.0.1:8000/api/auth/users/me/",
          method: "get",
        })
          .then((result) => {
            const resultInfo = {
              id: result.data.id,
              username: result.data.username,
              accountType: result.data.account_type,
              firstName: result.data.first_name,
              lastName: result.data.last_name,
              email: result.data.email,
              phone: result.data.phone,
              title: result.data.title,
              country: result.data.country,
              language: result.data.language,
              manager: result.data.manager,
              genuine: result.data.genuine,
              premiumStatus: result.data.premium_active,
            };
            /* console.log(resultInfo); */
            /* console.log(result); */
            context.commit("updateUserInfo", resultInfo);
            resolve(result);
          })
          .catch((error) => {
            /* console.log(error.data); */
            reject(error);
          });
      });
    },
    register(context, newUser) {
      console.log("user info:", newUser);
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/users/",
          data: newUser,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            const result = error.response.data;
            console.log(result);
            reject(result);
          });
      });
    },
    updateProfile(context, newUser) {
      return new Promise((resolve, reject) => {
        axios({
          method: "patch",
          url: "http://127.0.0.1:8000/api/auth/users/me/",
          data: newUser,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            const result = error.response.data;
            /* console.log(result); */
            reject(result);
          });
      });
    },
    resetPassword(context, email) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/users/reset_password/",
          data: {
            email,
          },
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setPassword(context, info) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/users/set_password/",
          data: info,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    setEmail(context, info) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/users/set_email/",
          data: info,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    resetPasswordConfirm(context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/users/reset_password_confirm/",
          data,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    activateUser(context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/users/activation/",
          data: {
            uid: data.uid,
            token: data.token,
          },
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    resendActivate(context, email) {
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/auth/users/resend_activation/",
          data: {
            email,
          },
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deactivate() {
      return new Promise((resolve, reject) => {
        axios({
          method: "patch",
          url: "http://127.0.0.1:8000/api/auth/users/me/change/",
        })
          .then((response) => {
            /* console.log(response); */
            resolve(response);
          })
          .catch((error) => {
            /* console.log(error); */
            reject(error);
          });
      });
    },
    checkToken(context) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common.Authorization = `Token ${context.state.token}`;
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/auth/check-token/",
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            Cookies.set("token", "", { expires: 30 });
            context.commit("retrieveToken", "");
            reject(error);
          });
      });
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      const result = !!state.token;
      if (result) {
        /* console.log("this user is authenticated"); */
        axios.defaults.headers.common.Authorization = `Token ${state.token}`;
      }
      return result;
    },
    loginName(state) {
      return state.userInfo.username;
    },
    userEmail(state) {
      return state.userInfo.email;
    },
    isManager(state) {
      return isNaN(parseInt(state.userInfo.manager));
    },
    isGenuine(state) {
      return state.userInfo.genuine;
    },
    isPremium(state) {
      return state.userInfo.premiumStatus;
    },
    getPermissions(state) {
      return state.permissions;
    },
    getOperatorTotal(state) {
      return state.operatorTotal;
    },
    getUserType(state) {
      return state.userInfo.accountType;
    },
  },
};
