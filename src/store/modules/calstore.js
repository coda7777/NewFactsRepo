import jwtInterceptor from "./jwtInterceptor";
import excelJwtInterceptor from "./excelJwtInterceptor";

///api/stop-sale/

export default {
  namespaced: true,
  state: {
    GroupMailToSend: 1,
    isSave: false,
    date: {
      date: null,
      day: "01",
      month: null,
      year: null,
      getDate: function () {
        return `${this.year}-${this.month}-${this.day}`;
      },
    },
    colors: [
      { color: "primary", name: "Free Sale" },
      { color: "success", name: "Open Sale" },
      { color: "danger", name: "Stop Sale" },
      { color: "warning", name: "On Request" },
      { color: "dark", name: "Blocked" },
    ],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    // sources: [],
    rooms: [],
    currentHotel_Id: 1,
    currentDate: "",
    calendarGroups: ["Contracted"],
    isLoading: false,
  },
  getters: {
    getGroupMailToSend(state) {
      return state.GroupMailToSend
    },
    getIsLoading(state) {
      return state.isLoading
    },
    getCurrentHotelID(state) {
      return state.currentHotel_Id
    },
    getCalendarGroups(state) {
      return state.calendarGroups;
    },
    getCurrentDate(state) {
      return state.currentDate;
    },
    isSave(state) {
      return state.isSave;
    },
    getDate(state) {
      return state.date;
    },
    getColors(state) {
      return state.colors;
    },
    getMonthNames(state) {
      return state.monthNames;
    },
    getRoomsList(state) {
      return state.rooms;
    },

    // getSourceById: (state) => (id) => {
    //   /* console.log("store get source by ID state", state);
    //   console.log("store get source by ID state", id);
    //   console.log(
    //     "store get source by ID state",
    //     state.sources.find((source) => source.id === id)
    //   ); */
    //   return state.sources.find((source) => source.id === id);
    // },
  },
  actions: {
    async sendCalendarPdfToGroupSelected({ state }) {
      await jwtInterceptor
        .get(`/api/stop-sale/pdf/${state.currentHotel_Id}/send-mail/${state.GroupMailToSend}/?date=${state.currentDate}`)
        .then((res) => {
          commit('SET_GROUP_MAIL_TO_SEND', null)
        });
    },
    async getCalendarGroups({ context }) {
      await jwtInterceptor
        .get(`/api/stop-sale/calendar-groups`)
        .then((response) => {
          console.log(response.data);
          context.commit("updateCalendarGroups", response.data);
        })
        .catch((err) => {
          console.log("calendar groups", err);
        });
    },
    setDate({ commit }, date) {
      commit("SET_DATE", date);
    },

    async calendarPDFDownload({ state }, hotel_id = null) {
      if (hotel_id === null) {
        hotel_id = state.currentHotel_Id
      }
      await jwtInterceptor
        .get(`/api/stop-sale/pdf/${hotel_id}/`)
        // .get(`/api/stop-sale/pdf/${hotel_id}/?date=${state.currentDate}`)
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `pdf.pdf`);
          document.body.appendChild(link);
          link.click();
        });
    },

    // async calendarExcelDownload({ state }) {
    //   await excelJwtInterceptor
    //     .get("/api/stop-sale/excel/?date=" + state.currentDate)
    //     .then((res) => {
    //       const url = window.URL.createObjectURL(new Blob([res.data.results]));
    //       const link = document.createElement("a");
    //       link.href = url;
    //       link.setAttribute("download", "week-" + state.dateSelected + ".xlsx");
    //       document.body.appendChild(link);
    //       link.click();
    //     });
    // },

    async saveRooms({ state }) {
      try {
        await jwtInterceptor.post("/api/stop-sale/save/", {
          data: { rooms: state.rooms, date: state.currentDate },
        });
        return true;
      } catch (err) {
        console.log("Error To create source", err.response.data);
      }
    },


    async loadSourceForMonth({ commit }, caldata) {
      await jwtInterceptor
        .get("/api/stop-sale/" + caldata.source_id + "/?date=" + caldata.date)
        .then((res) => {
          commit("UPDATE_SOURCE", res.data.results);
        })
        .catch((err) => {
          console.log("employees", err);
        });
    },


    async getHotelRooms({ commit, state }, hotel_id) {
      commit("SET_IS_LOADING", true);
      await jwtInterceptor
        .get(`/api/stop-sale/${state.currentHotel_Id}/?date=${state.currentDate}`)
        .then((res) => {
          commit("SET_IS_LOADING", false);
          commit("SET_ROOMS", res.data.results);
          commit("SET_IS_SAVE", false);

        })
        .catch((err) => {
          console.log("Rooms", err);
        });
    },


    async checkedDay({ commit }, day) {
      commit("SET_CHECKED_DAY", day);
    },

    async createSource({ commit }, source) {
      try {
        const res = await jwtInterceptor.post("/api/stop-sale/create/", source);
        commit("SET_NEW_SOURCE", res.data.results);
        return true;
      } catch (err) {
        console.log("Error To create source", err.response.data);
      }
    },
    async updateSource({ commit }, source) {
      try {
        const res = await jwtInterceptor.put(`/api/stop-sale/${source.id}/update/`, source);
        commit("UPDATE_SOURCE", res.data.results);
        return true;
      } catch (err) {
        console.log("Error update Source", err.response.data);
      }
    },

    async deleteSource({ commit }, id) {
      try {
        await jwtInterceptor.delete(`/api/stop-sale/${id}/delete/`);
        commit("DELETE_SOURCE", id);
        return true;
      } catch (err) {
        console.log("Error Delete Source ", err.response.data);
      }
    },

    ////////////// Events ///////////

    setCurrentDate({ commit }, newDate) {
      commit("SET_CURRENT_DATE", newDate);
    },
  },
  mutations: {
    updateCalendarGroups(state, newCale) {
      state.calendarGroups = newCale;
    },
    SET_RANGE_SELECTED(state, { events, roomsIds }) {
      // let sources = state.sources.filter((source)=>roomsIds.includes(source.id))
      for (let i = 0; i < state.rooms.length; i++) {
        // console.log(sources[i])
        if (roomsIds.includes(state.rooms[i].id))
          for (let j = 0; j < events.length; j++) {
            let evt = events[j];
            let exist = state.rooms[i].events.some(function (e) {
              return e.date === evt.date;
            });

            if (!exist) {
              //
              const newEvent = {
                color: evt.color,
                date: evt.date,
                state: "create",
                visible: true,
                room: state.rooms[i].id,
              };
              state.rooms[i].events.push(newEvent);
            }
          }
      }
      state.isSave = true;
    },
    SET_GROUP_MAIL_TO_SEND(state, group_mail_to_send) {
      state.GroupMailToSend = group_mail_to_send
      console.log('group', state.GroupMailToSend)
    },
    SET_CURRENT_HOTEL_ID(state, hotel_id) {
      state.currentHotel_Id = hotel_id
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_IS_SAVE(state, isSave) {
      state.isSave = isSave;
    },
    CREATE_ROOM_DAY(state, newEvent) {
      for (let index = 0; index < state.rooms.length; index++) {
        const room = state.rooms[index];
        if (room.id === newEvent.room) {
          state.rooms[index].events.push(newEvent);
          state.isSave = true;
          break;
        }
      }

    },

    SET_DATE(state, date) {
      state.date.month = date.month;
      state.date.year = date.year;
      state.date.date = date.date;
    },
    SET_CURRENT_DATE(state, newDate) {
      state.currentDate = newDate;
    },
    SET_ROOMS(state, payload) {
      state.rooms = payload;
    },
    // SET_SOURCES(state, payload) {
    //   state.sources = payload;
    // },
    // DESTROY_SOURCES(state) {
    //   state.sources = [];
    // },

    // SET_NEW_SOURCE(state, newSource) {
    //   state.sources.push(newSource);
    // },
    // SET_CHECKED_DAY(state, newSource) {
    //   state.sources.push(newSource);
    // },
    // UPDATE_SOURCE(state, source) {
    //   for (let index = 0; index < state.sources.length; index++) {
    //     const element = state.sources[index];
    //     if (element.id === source.id) {
    //       state.sources.splice(index, 1, source);
    //       break;
    //     }
    //   }
    // },
    // DELETE_SOURCE(state, id) {
    //   for (let index = 0; index < state.sources.length; index++) {
    //     const element = state.sources[index];
    //     if (element.id === id) {
    //       state.sources.splice(index, 1);
    //       break;
    //     }
    //   }
    // },
  },
};
