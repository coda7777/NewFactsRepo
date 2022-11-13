import axios from "axios";

export default {
  namespaced: true,
  state: {
    widget: {
      widgetId: 0,
      fontSize: 10,
      backgroundColor: "#000",
      paragraphColor: "#000",
      headerColor: "#000",
      fontSelect: null,
      borderWidth: 2,
      borderColor: "#000",
      photosPerRow: 4,
      contentType: "d",
    },
  },
  mutations: {
    updateAppearance(state, newstyle) {
      state.widget.widgetId = newstyle.id;
      state.widget.fontSize = newstyle.font_size || 10;
      state.widget.backgroundColor = newstyle.background_color || "#000";
      state.widget.paragraphColor = newstyle.paragraph_color || "#000";
      state.widget.headerColor = newstyle.header_color || "#000";
      state.widget.fontSelect = newstyle.font_select;
      state.widget.borderWidth = newstyle.border_width || 2;
      state.widget.borderColor = newstyle.border_color || "#000";
      state.widget.photosPerRow = newstyle.photos_per_row || 4;
      state.widget.contentType = newstyle.content_type || "d";
    },
  },
  actions: {
    retrieveAppearance(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/settings/widget/",
        })
          .then((response) => {
            context.commit("updateAppearance", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    saveAppearance(context, newInfo) {
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/settings/widget/edit/`
        : "http://127.0.0.1:8000/api/settings/widget/create/";
      return new Promise((resolve, reject) => {
        axios({
          url: requestUrl,
          method: requestMethod,
          data: newInfo,
        })
          .then((response) => {
            context.commit("updateAppearance", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
  },
  getters: {
    getAppearance(state) {
      return state.widget;
    },
  },
};
