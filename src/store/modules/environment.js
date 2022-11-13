import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: 0,
      hotel: 0,
      locationEnvironment: [],
      aroundHotel: [],
      closestAirport: "",
      distanceToAirport: 0,
      airportDistanceType: "",
      trainAvailable: false,
      trainStationName: null,
      distanceToTrain: null,
      trainDistanceUnit: "",
      distanceToShopping: 0,
      distanceToShoppingUnit: "",
      distanceToEntertainment: 0,
      distanceToEntertainmentUnit: "",
      distanceToRestaurants: 0,
      distanceToRestaurantsUnit: "",
      distanceToCityCenter: 0,
      distanceToCityCenterUnit: "",
      distanceToBusStop: 0,
      distanceToBusStopUnit: "",
      domesticFlightAvail: false,
      domesticFlightDuration: 0,
      domesticFlightSupplier: "",
      speedBoatAvail: false,
      speedBoatDuration: 0,
      speedBoatSupplier: "",
      seaPlaneAvail: false,
      seaPlaneDuration: 0,
      seaPlaneSupplier: "",
      otherDomesticTrans: false,
      otherDomesticTransName: "",
      otherDomesticTransDuration: 0,
      otherDomesticTransSupplier: "",
      beachAvail: false,
      beachCharacteristics: [],
      distanceToBeach: 0,
      distanceToBeachUnit: "",
      beachInformation: [],
      beachPathType: [],
      moreBeachInfo: [],
      beachIsPrivate: false,
      beachIsNude: false,
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
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/facts/location/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/location/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel,
              locationEnvironment: response.data.location_environment || [],
              aroundHotel: response.data.around_hotel || [],
              closestAirport: response.data.closest_airport,
              distanceToAirport: response.data.distance_to_airport,
              airportDistanceType: response.data.airport_distance_type,
              trainAvailable: response.data.train_available,
              trainStationName: response.data.train_station_name,
              distanceToTrain: response.data.distance_to_train,
              trainDistanceUnit: response.data.train_distance_unit,
              distanceToShopping: response.data.distance_to_shopping,
              distanceToShoppingUnit: response.data.distance_to_shopping_unit,
              distanceToEntertainment: response.data.distance_to_entertainment,
              distanceToEntertainmentUnit: response.data.distance_to_entertainment_unit,
              distanceToRestaurants: response.data.distance_to_restaurants,
              distanceToRestaurantsUnit: response.data.distance_to_restaurants_unit,
              distanceToCityCenter: response.data.distance_to_city_center,
              distanceToCityCenterUnit: response.data.distance_to_city_center_unit,
              distanceToBusStop: response.data.distance_to_bus_stop,
              distanceToBusStopUnit: response.data.distance_to_bus_stop_unit,
              domesticFlightAvail: response.data.domestic_flight_available,
              domesticFlightDuration: response.data.domestic_flight_duration,
              domesticFlightSupplier: response.data.domestic_flight_supplier,
              speedBoatAvail: response.data.speed_boat_avail,
              speedBoatDuration: response.data.speed_boat_duration,
              speedBoatSupplier: response.data.speed_boat_supplier,
              seaPlaneAvail: response.data.sea_plane_avail,
              seaPlaneDuration: response.data.sea_plane_duration,
              seaPlaneSupplier: response.data.sea_plane_supplier,
              otherDomesticTrans: response.data.other_domestic_trans,
              otherDomesticTransName: response.data.other_domestic_trans_name,
              otherDomesticTransDuration: response.data.other_domestic_trans_duration,
              otherDomesticTransSupplier: response.data.other_domestic_trans_supplier,
              beachAvail: response.data.beach_avail,
              beachCharacteristics: response.data.beach_characteristics || [],
              distanceToBeach: response.data.distance_to_beach,
              distanceToBeachUnit: response.data.distance_to_beach_unit,
              beachInformation: response.data.beach_information || [],
              beachPathType: response.data.beach_path_type || [],
              moreBeachInfo: response.data.more_beach_info || [],
              beachIsPrivate: response.data.beach_is_private,
              beachIsNude: response.data.beach_is_nude,
            };
            context.commit("updateProperty", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getInfo(context, infoId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/location/${infoId}/`,
        })
          .then((response) => {
            const retrievedInfo = {
              id: response.data.hotel?.id,
              hotel: response.data.hotel?.id,
              locationEnvironment: response.data.location_environment || [],
              aroundHotel: response.data.around_hotel || [],
              closestAirport: response.data.closest_airport,
              distanceToAirport: response.data.distance_to_airport,
              airportDistanceType: response.data.airport_distance_type,
              trainAvailable: response.data.train_available,
              trainStationName: response.data.train_station_name,
              distanceToTrain: response.data.distance_to_train,
              trainDistanceUnit: response.data.train_distance_unit,
              distanceToShopping: response.data.distance_to_shopping,
              distanceToShoppingUnit: response.data.distance_to_shopping_unit,
              distanceToEntertainment: response.data.distance_to_entertainment,
              distanceToEntertainmentUnit: response.data.distance_to_entertainment_unit,
              distanceToRestaurants: response.data.distance_to_restaurants,
              distanceToRestaurantsUnit: response.data.distance_to_restaurants_unit,
              distanceToCityCenter: response.data.distance_to_city_center,
              distanceToCityCenterUnit: response.data.distance_to_city_center_unit,
              distanceToBusStop: response.data.distance_to_bus_stop,
              distanceToBusStopUnit: response.data.distance_to_bus_stop_unit,
              domesticFlightAvail: response.data.domestic_flight_available,
              domesticFlightDuration: response.data.domestic_flight_duration,
              domesticFlightSupplier: response.data.domestic_flight_supplier,
              speedBoatAvail: response.data.speed_boat_avail,
              speedBoatDuration: response.data.speed_boat_duration,
              speedBoatSupplier: response.data.speed_boat_supplier,
              seaPlaneAvail: response.data.sea_plane_avail,
              seaPlaneDuration: response.data.sea_plane_duration,
              seaPlaneSupplier: response.data.sea_plane_supplier,
              otherDomesticTrans: response.data.other_domestic_trans,
              otherDomesticTransName: response.data.other_domestic_trans_name,
              otherDomesticTransDuration: response.data.other_domestic_trans_duration,
              otherDomesticTransSupplier: response.data.other_domestic_trans_supplier,
              beachAvail: response.data.beach_avail,
              beachCharacteristics: response.data.beach_characteristics || [],
              distanceToBeach: response.data.distance_to_beach,
              distanceToBeachUnit: response.data.distance_to_beach_unit,
              beachInformation: response.data.beach_information || [],
              beachPathType: response.data.beach_path_type || [],
              moreBeachInfo: response.data.more_beach_info || [],
              beachIsPrivate: response.data.beach_is_private,
              beachIsNude: response.data.beach_is_nude,
            };
            context.commit("updateProperty", retrievedInfo);
            resolve(retrievedInfo);
          })
          .catch((error) => {
            context.commit("updateProperty", {});
            reject(error);
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
