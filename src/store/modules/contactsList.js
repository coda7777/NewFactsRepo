import axios from "axios";

export default {
  namespaced: true,
  state: {
    ContactLists: [],
    contact: {
      id: 0,
      list: 0,
      name: null,
      title: null,
      email: null,
      location: null,
      phone: null,
    },
    errors: [],
  },
  mutations: {
    updateContact(state, newInfo) {
      state.contact = newInfo;
    },
    /* updateErrors(state) {
      state.errors = [];
      state.properties.forEach((property, index) => {
        const newErrors = [];
        if (!property.roomName) {
          newErrors.push("room name required");
        }
        if (!property.roomNameType) {
          newErrors.push("room type required");
        }
        if (!property.roomView) {
          newErrors.push("room view required");
        }
        if (newErrors.length > 0) {
          console.log(newErrors.length);
          state.errors.push(`Room (${index + 1}): ${newErrors.join(" - ")}`);
        }
      });
    }, */
    updateContactsList(state, newInfo) {
      state.ContactLists = newInfo;
    },
    addNewContact(state, newContact) {
      state.ContactLists.push(newContact);
    },
    removeContact(state, contactToDelete) {
      const contactIndex = state.ContactLists.filter((r) => {
        r.id === contactToDelete.id;
      })[0];
      state.ContactLists.splice(contactIndex, 1);
    },
  },
  actions: {
    deleteContact(context, contactToDelete) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/facts/rooms/delete/${contactToDelete.id}/`,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        context.commit("removeContact", contactToDelete);
      });
    },
    addNewRoom(context) {
      const newContact = {
        isSelected: false,
        id: 0,
        list: 0,
        name: null,
        title: null,
        email: null,
        location: null,
        phone: null,
      };
      context.commit("addNewContact", newContact);
    },
    postInfo(context, contactId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      const retrievedInfo = context.state.ContactLists.map((info) => ({
        id: info.id,
        list: contactId,
        name: info.name,
        title: info.title,
        email: info.email,
        location: info.location,
        phone: info.phone,
      }));
      /* console.log("req is", retrievedInfo); */
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/facts/rooms/update/${contactId}/`,
          data: retrievedInfo,
        })
          .then((response) => {
            const savedInfo = response.data.map((info) => ({
              id: info.id,
              name: info.name,
              title: info.title,
              email: info.email,
              location: info.location,
              phone: info.phone,
            }));
            console.log(response.data);
            console.log(savedInfo);
            context.commit("updateContacts", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getInfo(context, listId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/rooms/${listId}/`,
        })
          .then((response) => {
            const retrievedInfo = response.data.map((info) => ({
              id: info.id,
              isSelected: false,
              name: info.name,
              title: info.title,
              email: info.email,
              location: info.location,
              phone: info.phone,
            }));
            context.commit("updateContactsList", retrievedInfo);
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
      return state.contact;
    },
    getProperties(state) {
      return state.ContactLists;
    },
    getErrors(state) {
      return state.errors;
    },
  },
};
