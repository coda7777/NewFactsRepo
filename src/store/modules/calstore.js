import jwtInterceptor from "./jwtInterceptor";
import excelJwtInterceptor from "./excelJwtInterceptor";

///api/stop-sale/

export default {
  namespaced: true,
  state: {
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
    sources: [],
    rooms:[],
    currentHotel_Id:1,
    currentDate: "",
    calendarGroups: ["Contracted"],
  },
  getters: {
    getCurrentHotelID(state){
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

    getSourceById: (state) => (id) => {
      /* console.log("store get source by ID state", state);
      console.log("store get source by ID state", id);
      console.log(
        "store get source by ID state",
        state.sources.find((source) => source.id === id)
      ); */
      return state.sources.find((source) => source.id === id);
    },
  },
  actions: {
    async getCalendarGroups({ context }) {
      console.log("store log get Calendars ");
      await jwtInterceptor
        // @TODO to be added in the backend
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

    async calendarExcelDownload({ state }) {
      await excelJwtInterceptor
        .get("/api/stop-sale/excel/?date=" + state.currentDate)
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data.results]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "week-" + state.dateSelected + ".xlsx");
          document.body.appendChild(link);
          link.click();
        });
    },

    async saveRooms({state}){
      try {
        console.log("sources:", state.sources);
        await jwtInterceptor.post("/api/stop-sale/save/", {
          data: { rooms: state.rooms, date: state.currentDate },
        });
        return true;
      } catch (err) {
        console.log("Error To create source", err.response.data);
      }
    },
    async saveSources({ state }) {
      try {
        console.log("sources:", state.sources);
        await jwtInterceptor.post("/api/stop-sale/save/", {
          data: { sources: state.sources, date: state.currentDate },
        });

        // commit('SAVE_SOURCES',res.data)
        return true;
      } catch (err) {
        console.log("Error To create source", err.response.data);
      }
    },

    async loadSourceForMonth({ commit }, caldata) {
      console.log("loadSourceForMonth engaged");
      await jwtInterceptor
        .get("/api/stop-sale/" + caldata.source_id + "/?date=" + caldata.date)
        .then((res) => {
          commit("UPDATE_SOURCE", res.data.results);
        })
        .catch((err) => {
          console.log("employees", err);
        });
    },


    async getHotelRooms({ commit, state },hotel_id) {
      console.log("store log getHotelRooms");
      await jwtInterceptor
        .get(`/api/stop-sale/${state.currentHotel_Id}/?date=${state.currentDate}`)
        .then((res) => {
          console.log('results',res.data);
          commit("SET_ROOMS", res.data.results);
          commit("SET_IS_SAVE", false);
        })
        .catch((err) => {
          console.log("Sources", err);
        });
    },

    // async getUserSources({ commit, state }) {
    //   console.log("store log getUserSources");
    //   await jwtInterceptor
    //     .get(`/api/stop-sale/?date=${state.currentDate}`)
    //     .then((res) => {
    //       console.log(res.data);
    //       commit("SET_SOURCES", res.data.results);
    //       commit("SET_IS_SAVE", false);
    //     })
    //     .catch((err) => {
    //       console.log("Sources", err);
    //     });
    // },

    async checkedDay({ commit }, day) {
      commit("SET_CHECKED_DAY", day);
    },

    async createSource({ commit }, source) {
      console.log("test store createSource");
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
    SET_RANGE_SELECTED(state, { events, sourcesIds }) {
      // let sources = state.sources.filter((source)=>sourcesIds.includes(source.id))
      console.log("events", events);
      for (let i = 0; i < state.sources.length; i++) {
        // console.log(sources[i])
        if (sourcesIds.includes(state.sources[i].id))
          for (let j = 0; j < events.length; j++) {
            let evt = events[j];
            // console.log(evt)
            let exist = state.sources[i].events.some(function (e) {
              return e.date === evt.date;
            });

            if (!exist) {
              //
              const newEvent = {
                color: evt.color,
                date: evt.date,
                state: "create",
                visible: true,
                source: state.sources[i].id,
              };
              state.sources[i].events.push(newEvent);
            }
          }
      }
      state.isSave = true;
      console.log("up sources", state.sources);
    },
    SET_CURRENT_HOTEL_ID(state,hotel_id){
      state.currentHotel_Id = hotel_id
    },
    SET_IS_SAVE(state, isSave) {
      state.isSave = isSave;
    },
    CREATE_ROOM_DAY(state, newEvent) {
      console.log(newEvent)
      for (let index = 0; index < state.rooms.length; index++) {
        const room = state.rooms[index];
        if (room.id === newEvent.room) {
          state.rooms[index].events.push(newEvent);
          state.isSave = true;
          break;
        }
      }

    },
    // CREATE_SOURCE_DAY(state, newEvent) {

    //   for (let index = 0; index < state.sources.length; index++) {
    //     const source = state.sources[index];
    //     if (source.id === newEvent.source) {
    //       state.sources[index].events.push(newEvent);
    //       state.isSave = true;
    //       break;
    //     }
    //   }
    // },

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
    SET_SOURCES(state, payload) {
      state.sources = payload;
    },
    DESTROY_SOURCES(state) {
      state.sources = [];
    },

    SET_NEW_SOURCE(state, newSource) {
      state.sources.push(newSource);
    },
    SET_CHECKED_DAY(state, newSource) {
      state.sources.push(newSource);
    },
    UPDATE_SOURCE(state, source) {
      for (let index = 0; index < state.sources.length; index++) {
        const element = state.sources[index];
        if (element.id === source.id) {
          state.sources.splice(index, 1, source);
          break;
        }
      }
    },
    DELETE_SOURCE(state, id) {
      for (let index = 0; index < state.sources.length; index++) {
        const element = state.sources[index];
        if (element.id === id) {
          state.sources.splice(index, 1);
          break;
        }
      }
    },
  },
};
