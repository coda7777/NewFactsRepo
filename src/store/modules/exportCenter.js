import jwtInterceptor from "./jwtInterceptor";

export default {
  namespaced: true,
  state: {
    isLoading: false,
    currentHotel_Id: null /* Id of Hotel selected  */,
    GroupMailToSend: null /* Id of group selected */,
  },

  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
  },

  actions: {
    /*  Generate Facts Sheet PDF In backend  and send It to All elements are exist in Group Selected
            hotel_id : id of   Properety selected
            GroupMailToSend: Id of group selected
        */
    async sendFactSheetPDFToGroupSelected({ state }, hotel_id) {
      state.isLoading = true;
      if (state.GroupMailToSend == null) {
        alert("Please Select Group Mail");
      }
      await jwtInterceptor
        .get(`/api/facts/send_facts/${state.GroupMailToSend}/${hotel_id}`)
        .then((res) => {
          state.isLoading = false;
          alert(res.data.message);
          res.commit("SET_GROUP_MAIL_TO_SEND", null);
        });
    },

    /*  Generate Facts Sheet PDF In backend and download IT in local machine
            hotel_id : id of   Properety selected
            GroupMailToSend: Id of group selected
        */
    async factSheetPDFDownload({ state }, hotel_id = null) {
      if (hotel_id === null) {
        hotel_id = state.currentHotel_Id;
      }
      await jwtInterceptor.get(`/api/facts/download-facts/${hotel_id}/`).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `fact-sheet-${hotel_id}.pdf`);
        document.body.appendChild(link);
        link.click();
      });
    },
  },

  mutations: {
    SET_GROUP_MAIL_TO_SEND(state, group_mail_to_send) {
      state.GroupMailToSend = group_mail_to_send;
    },
  },
};
