import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: 0,
      hotel: 0,
      eveningEntertainment: false,
      eveningEntertainmentActive: [],
      eveningEntertainmentFrequency: null,
      eveningEntertainmentCount: null,
      eveningEntertainmentSeasonal: false,
      eveningEntertainmentFrom: null,
      eveningEntertainmentTo: null,
      sportsAnimation: false,
      sportsAnimationType: null,
      sportsAnimationFrequency: null,
      sportsAnimationCount: null,
      sportsAnimationSeasonal: false,
      sportsAnimationFrom: null,
      sportsAnimationTo: null,
      dayTimeAnimation: false,
      dayTimeAnimationFrequency: null,
      dayTimeAnimationCount: null,
      dayTimeAnimationSeasonal: false,
      dayTimeAnimationFrom: null,
      dayTimeAnimationTo: null,
      changingEntertainment: false,
      changingEntertainmentFrequency: null,
      changingEntertainmentCount: null,
      changingEntertainmentFrom: null,
      changingEntertainmentTo: null,
    },
    errors: [],
  },
  mutations: {
    updateProperty(state, newInfo) {
      state.property = newInfo;
    },
    updateErrors(state, newInfo) {
      /* console.log("commit here", newInfo); */
      state.errors = newInfo;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    validate(context, newInfo) {
      /* context.commit("updateErrors", newInfo); */
    },
    postInfo(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      /* console.log(newInfo); */
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/facts/entertainment/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/entertainment/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            /* console.log("response is", response.data); */
            const savedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              eveningEntertainment: response.data.evening_entertainment,
              eveningEntertainmentActive: response.data.evening_entertainment_active || [],
              eveningEntertainmentFrequency: response.data.evening_entertainment_frequency || null,
              eveningEntertainmentCount: response.data.evening_entertainment_count,
              eveningEntertainmentSeasonal: response.data.evening_entertainment_seasonal,
              eveningEntertainmentFrom: response.data.evening_entertainment_from,
              eveningEntertainmentTo: response.data.evening_entertainment_to,
              sportsAnimation: response.data.sports_animation,
              sportsAnimationType: response.data.sports_animation_type || null,
              sportsAnimationFrequency: response.data.sports_animation_frequency || null,
              sportsAnimationCount: response.data.sports_animation_count,
              sportsAnimationSeasonal: response.data.sports_animation_seasonal,
              sportsAnimationFrom: response.data.sports_animation_from,
              sportsAnimationTo: response.data.sports_animation_to,
              dayTimeAnimation: response.data.day_time_animation,
              dayTimeAnimationFrequency: response.data.day_time_animation_frequency || null,
              dayTimeAnimationCount: response.data.day_time_animation_count,
              dayTimeAnimationSeasonal: response.data.day_time_animation_seasonal,
              dayTimeAnimationFrom: response.data.day_time_animation_from,
              dayTimeAnimationTo: response.data.day_time_animation_to,
              changingEntertainment: response.data.changing_entertainment,
              changingEntertainmentFrequency:
                response.data.changing_entertainment_frequency || null,
              changingEntertainmentCount: response.data.changing_entertainment_count,
              changingEntertainmentFrom: response.data.changing_entertainment_from,
              changingEntertainmentTo: response.data.changing_entertainment_to,
            };
            /* console.log("saved info:", savedInfo); */
            context.commit("updateProperty", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getInfo(context, infoId) {
      /* console.log("getting info data"); */
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/entertainment/${infoId}/`,
        })
          .then((response) => {
            /* console.log(response); */
            const retrievedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              eveningEntertainment: response.data.evening_entertainment,
              eveningEntertainmentActive: response.data.evening_entertainment_active || [],
              eveningEntertainmentFrequency: response.data.evening_entertainment_frequency || null,
              eveningEntertainmentCount: response.data.evening_entertainment_count,
              eveningEntertainmentSeasonal: response.data.evening_entertainment_seasonal,
              eveningEntertainmentFrom: response.data.evening_entertainment_from,
              eveningEntertainmentTo: response.data.evening_entertainment_to,
              sportsAnimation: response.data.sports_animation,
              sportsAnimationType: response.data.sports_animation_type || null,
              sportsAnimationFrequency: response.data.sports_animation_frequency || null,
              sportsAnimationCount: response.data.sports_animation_count,
              sportsAnimationSeasonal: response.data.sports_animation_seasonal,
              sportsAnimationFrom: response.data.sports_animation_from,
              sportsAnimationTo: response.data.sports_animation_to,
              dayTimeAnimation: response.data.day_time_animation,
              dayTimeAnimationFrequency: response.data.day_time_animation_frequency || null,
              dayTimeAnimationCount: response.data.day_time_animation_count,
              dayTimeAnimationSeasonal: response.data.day_time_animation_seasonal,
              dayTimeAnimationFrom: response.data.day_time_animation_from,
              dayTimeAnimationTo: response.data.day_time_animation_to,
              changingEntertainment: response.data.changing_entertainment,
              changingEntertainmentFrequency:
                response.data.changing_entertainment_frequency || null,
              changingEntertainmentCount: response.data.changing_entertainment_count,
              changingEntertainmentFrom: response.data.changing_entertainment_from,
              changingEntertainmentTo: response.data.changing_entertainment_to,
            };
            context.commit("updateProperty", retrievedInfo);
            /* console.log("retrieved info data"); */
            resolve(retrievedInfo);
          })
          .catch((error) => {
            context.commit("updateProperty", {});
            reject(error);
            /* console.log("failed retrieve info data"); */
          });
      });
    },
  },
  getters: {
    getProperty(state) {
      return state.property;
    },
    getErrors(state) {
      return state.errors;
    },
  },
};
