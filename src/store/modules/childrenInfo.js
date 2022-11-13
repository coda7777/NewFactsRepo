import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: 0,
      hotel: 0,
      babyPoolAvailable: false,
      babyPoolDepth: null,
      childrenPoolAvailable: false,
      childrenPoolCount: null,
      childrenPoolDepth: null,
      childrenPoolType: null,
      childrenPoolFrom: null,
      childrenPoolTo: null,
      childrenPoolIsHeated: false,
      childrenPoolHasSlides: false,
      childrenPoolSlidesCount: null,
      childrenPoolHasPirateShip: false,
      childrenPlayGroundAvailable: false,
      childrenPlayGroundCount: null,
      childrenPlayGroundAdventure: false,
      childrenPlayGroundParadise: false,
      childrenPlayGroundCovered: false,
      childrenMiniClubAvailable: false,
      childrenMiniClubName: null,
      childrenMiniClubAgeFrom: null,
      childrenMiniClubCharges: null,
      childrenMiniClubPrice: null,
      childrenMiniClubCurrency: null,
      childrenMiniClubParentExist: false,
      childrenMiniClubParentOnGround: false,
      childrenMiniClubLanguage: [],
      childrenMiniClubDays: [],
      childrenMiniClubFrom: null,
      childrenMiniClubTo: null,
      childrenMiniClubRestriction: [],
      childrenEntertainment: [],
      babyCotsAvailable: false,
      babyCotCharges: null,
      babyCotReservationRequired: false,
      babyCotOnRequest: false,
      babyCotPriceUpSeason: false,
      babyCotPrice: null,
      babysitterService: false,
      babysitterReservationRequired: false,
      babysitterOnRequest: false,
      childrenOtherServices: [],
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
    validate(context, newInfo) {
      context.commit("updateErrors", newInfo);
    },
    postInfo(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      /* console.log(newInfo); */
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/facts/children/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/children/create/";
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
              babyPoolAvailable: response.data.baby_pool_available,
              babyPoolDepth: response.data.baby_pool_depth,
              childrenPoolAvailable: response.data.children_pool_available,
              childrenPoolCount: response.data.children_pool_count,
              childrenPoolDepth: response.data.children_pool_depth,
              childrenPoolType: response.data.children_pool_type || null,
              childrenPoolFrom: response.data.children_pool_from,
              childrenPoolTo: response.data.children_pool_to,
              childrenPoolIsHeated: response.data.children_pool_is_heated,
              childrenPoolHasSlides: response.data.children_pool_has_slides,
              childrenPoolSlidesCount: response.data.children_pool_slides_count,
              childrenPoolHasPirateShip: response.data.children_pool_has_pirate_ship,
              childrenPlayGroundAvailable: response.data.children_play_ground_available,
              childrenPlayGroundCount: response.data.children_play_ground_count,
              childrenPlayGroundAdventure: response.data.children_play_ground_adventure,
              childrenPlayGroundParadise: response.data.children_play_ground_paradise,
              childrenPlayGroundCovered: response.data.children_play_ground_covered,
              childrenMiniClubAvailable: response.data.children_mini_club_available,
              childrenMiniClubName: response.data.children_mini_club_name,
              childrenMiniClubAgeFrom: response.data.children_mini_club_age_from,
              childrenMiniClubCharges: response.data.children_mini_club_charges || null,
              childrenMiniClubPrice: response.data.children_mini_club_price,
              childrenMiniClubCurrency: response.data.children_mini_club_currency || null,
              childrenMiniClubParentExist: response.data.children_mini_club_parent_exist,
              childrenMiniClubParentOnGround: response.data.children_mini_club_parent_on_ground,
              childrenMiniClubLanguage: response.data.children_mini_club_language || [],
              childrenMiniClubDays: response.data.children_mini_club_days || [],
              childrenMiniClubFrom: response.data.children_mini_club_from,
              childrenMiniClubTo: response.data.children_mini_club_to,
              childrenMiniClubRestriction: response.data.children_mini_club_restriction || [],
              childrenEntertainment: response.data.children_entertainment || [],
              babyCotsAvailable: response.data.baby_cots_available,
              babyCotCharges: response.data.baby_cot_charges || null,
              babyCotReservationRequired: response.data.baby_cot_reservation_required,
              babyCotOnRequest: response.data.baby_cot_on_request,
              babyCotPriceUpSeason: response.data.baby_cot_price_up_season,
              babyCotPrice: response.data.baby_cot_price,
              babysitterService: response.data.babysitter_service,
              babysitterReservationRequired: response.data.babysitter_reservation_required,
              babysitterOnRequest: response.data.babysitter_on_request,
              childrenOtherServices: response.data.children_other_services || [],
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
          url: `http://127.0.0.1:8000/api/facts/children/${infoId}/`,
        })
          .then((response) => {
            /* console.log(response); */
            const retrievedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              babyPoolAvailable: response.data.baby_pool_available,
              babyPoolDepth: response.data.baby_pool_depth || null,
              childrenPoolAvailable: response.data.children_pool_available,
              childrenPoolCount: response.data.children_pool_count || null,
              childrenPoolDepth: response.data.children_pool_depth,
              childrenPoolType: response.data.children_pool_type || null,
              childrenPoolFrom: response.data.children_pool_from,
              childrenPoolTo: response.data.children_pool_to,
              childrenPoolIsHeated: response.data.children_pool_is_heated,
              childrenPoolHasSlides: response.data.children_pool_has_slides,
              childrenPoolSlidesCount: response.data.children_pool_slides_count,
              childrenPoolHasPirateShip: response.data.children_pool_has_pirate_ship,
              childrenPlayGroundAvailable: response.data.children_play_ground_available,
              childrenPlayGroundCount: response.data.children_play_ground_count,
              childrenPlayGroundAdventure: response.data.children_play_ground_adventure,
              childrenPlayGroundParadise: response.data.children_play_ground_paradise,
              childrenPlayGroundCovered: response.data.children_play_ground_covered,
              childrenMiniClubAvailable: response.data.children_mini_club_available,
              childrenMiniClubName: response.data.children_mini_club_name,
              childrenMiniClubAgeFrom: response.data.children_mini_club_age_from,
              childrenMiniClubCharges: response.data.children_mini_club_charges || null,
              childrenMiniClubPrice: response.data.children_mini_club_price,
              childrenMiniClubCurrency: response.data.children_mini_club_currency || null,
              childrenMiniClubParentExist: response.data.children_mini_club_parent_exist,
              childrenMiniClubParentOnGround: response.data.children_mini_club_parent_on_ground,
              childrenMiniClubLanguage: response.data.children_mini_club_language || [],
              childrenMiniClubDays: response.data.children_mini_club_days || [],
              childrenMiniClubFrom: response.data.children_mini_club_from,
              childrenMiniClubTo: response.data.children_mini_club_to,
              childrenMiniClubRestriction: response.data.children_mini_club_restriction || [],
              childrenEntertainment: response.data.children_entertainment || [],
              babyCotsAvailable: response.data.baby_cots_available,
              babyCotCharges: response.data.baby_cot_charges || null,
              babyCotReservationRequired: response.data.baby_cot_reservation_required,
              babyCotOnRequest: response.data.baby_cot_on_request,
              babyCotPriceUpSeason: response.data.baby_cot_price_up_season,
              babyCotPrice: response.data.baby_cot_price,
              babysitterService: response.data.babysitter_service,
              babysitterReservationRequired: response.data.babysitter_reservation_required,
              babysitterOnRequest: response.data.babysitter_on_request,
              childrenOtherServices: response.data.children_other_services || [],
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
