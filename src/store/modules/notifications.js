import axios from "axios";

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    clearNotifications(state) {
      state.notifications = [];
    },
    updateNotifications(state, newNotification) {
      state.notifications = [];
      newNotification.forEach((item) => {
        state.notifications.push({
          id: item.id,
          userId: item.user_id,
          notificationType: item.notification_type,
          message: item.message,
          isRead: item.is_read,
          extraId: item.extra_id,
          link: item.link,
          createdAt: item.created_at,
          createdBy: item.created_at,
        });
      });
    },
    removeNotification(state, notificationId) {
      let index = -1;
      state.notifications.forEach((element) => {
        if (element.id === notificationId) {
          index = state.notifications.indexOf(element);
        }
      });
      state.notifications.splice(index, 1);
    },
  },
  actions: {
    clear(context) {
      context.commit("clearNotifications");
    },
    /*     retrieveNotifications(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/notification/",
        })
          .then((response) => {
            console.log(response);
            context.commit("updateNotifications", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    }, */
    getNotifications(context) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/notification/",
        })
          .then((response) => {
            const retrievedNotifications = response.data || [];
            context.commit("updateNotifications", retrievedNotifications);
            resolve(retrievedNotifications);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateNotification(context, notificationToPatch) {
      return new Promise((resolve, reject) => {
        /* console.log("notificationToPatch", notificationToPatch); */
        axios({
          method: "patch",
          url: "http://127.0.0.1:8000/api/notification/edit/",
          data: notificationToPatch,
        })
          .then((response) => {
            /* console.log("update response", response); */
            context.commit("updateNotifications", response.data);
            resolve(response.data);
          })
          .catch((error) => reject(error));
      });
    },
    dismissNotification(context, notificationToDelete) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      /* console.log("the deleted notice", notificationToDelete); */
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/notification/delete/${notificationToDelete.id}/`,
        })
          .then((response) => {
            context.commit("removeNotification", notificationToDelete.id);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
    getUnread(state) {
      return state.notifications.filter((item) => {
        return !item.isRead;
      }).length;
    },
  },
};
