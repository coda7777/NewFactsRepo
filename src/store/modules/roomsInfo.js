import axios from "axios";

export default {
  namespaced: true,
  state: {
    properties: [],
    property: {
      id: 0,
      hotel: 0,
      roomName: null,
      roomSequence: null,
      roomNameType: null,
      roomView: null,
      roomOverrideCode: null,
      roomOnGroundFloor: false,
      roomStoreyLevel: null,
      roomTotalUnits: null,
      roomAdditionalView: null,
      roomFeatures: [],
      roomSizeSqm: null,
      roomMinAge: null,
      roomSizeComparison: null,
      roomSizeComparisonWith: null,
      roomAvailableSingleUse: false,
      roomAllowedInfantsCount: null,
      roomInfantsNotAllowed: false,
      roomOccupancies: [],
      roomLocations: [],
      roomAccessTo: [],
      roomNumberOfBathrooms: null,
      roomBathroomType: null,
      roomAdditionalGuestBathroomAvailable: false,
      roomBathroomFeature: [],
      roomFacilityMultimedia: [],
      roomFacilityEquipment: [],
      roomFacilityAmenity: [],
      roomBalconyType: null,
      roomBalconyFacilities: [],
      roomAdditionalBedLinen: false,
      roomAdditionalTowels: false,
      roomAdditionalTeaTowels: false,
      roomAdditionalCleaningTools: false,
      roomAdditionalFirstSetup: false,
      roomHasMiniBar: false,
      roomMiniBarItems: [],
      roomMiniBarCharges: null,
      roomMiniBarOnRequest: false,
      roomMiniBarArrivalWelcome: false,
      roomMiniBarIsEmpty: false,
      roomMiniBarRestocking: false,
      roomMiniBarRestockingFreq: null,
      roomMiniBarRestockingPeriod: null,
      roomMiniBarRestockingCharges: null,
      roomMiniBarRestockItems: [],
      roomHasAirCondition: false,
      roomAirConditionCharges: null,
      roomAirConditionIndividually: false,
      roomAirConditionCentralised: false,
      roomAirConditionHourly: false,
      roomAirConditionSeasonal: false,
      roomHasHeating: false,
      roomHeatingCharges: null,
      roomHeatingFrom: null,
      roomHeatingTo: null,
      roomHeatingIsSeasonal: false,
      roomHasSafeBox: false,
      roomSafeCharges: null,
      roomHasLaptopSafe: false,
      roomLaptopSafeCharges: null,
      roomHasRoomService: false,
      roomRoomServiceCharges: null,
      roomRoomServiceAllDay: false,
      roomHasButlerService: false,
      roomButlerServiceCharges: null,
      roomHasWifiAccess: false,
      roomWifiCharges: null,
      roomWifiLimitedData: false,
      roomWifiHighSpeed: false,
      roomHasKitchenette: false,
      roomKitchenetteCharges: null,
      roomKitchenetteEquipment: null,
      roomKitchenettePrice: null,
      roomHasKitchenUnit: false,
      roomKitchenUnitCharges: null,
      roomKitchenUnitEquipment: null,
      roomKitchenUnitCleaningPrice: null,
      roomHasKitchen: false,
      roomKitchenCharges: null,
      roomKitchenEquipment: null,
      roomKitchenCleaningPrice: null,
      roomRooms: [],
      roomRoomsConnectionType: null,
      roomRoomsTwoDoubles: false,
      roomRoomsSecondConnection: null,
      roomDoubleBeds: null,
      roomKingBeds: null,
      roomQueenBeds: null,
      roomSingleBeds: null,
      roomFrenchBeds: null,
      roomSofaBeds: null,
      roomPullOutBeds: null,
      roomBunkBeds: null,
      additionalBedsAvailable: false,
      roomAdditionalBeds: null,
      roomAdditionalBedsPrice: null,
      roomCleaningAvailable: false,
      roomCleaningFrequency: null,
      roomCleaningIsDaily: false,
      roomCleaningCharges: null,
      roomCleaningFinalCleaningApply: false,
      roomCleaningFinalCharges: null,
      roomCleaningFinalPrice: null,
      roomTowelChangeAvailable: false,
      roomTowelChangeTimesPerWeek: null,
      roomTowelChangeIsDaily: false,
      roomTowelChangeOnRequest: false,
      roomTowelChangeCharge: null,
      roomSheetChangeAvailable: false,
      roomSheetChangeCharges: null,
      roomSheetChangeFrequency: null,
      roomSheetChangeIsDaily: false,
      roomSheetsNotProvided: false,
      roomSheetsForAdditionalCharge: false,
      roomTowelsOnGuest: false,
      roomTowelsForAdditionalCharge: false,
    },
    errors: [],
  },
  mutations: {
    updateProperty(state, newInfo) {
      state.property = newInfo;
    },
    updateErrors(state) {
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
          /* console.log(newErrors.length); */
          state.errors.push(`Room (${index + 1}): ${newErrors.join(" - ")}`);
        }
      });
    },
    updateProperties(state, newInfo) {
      state.properties = newInfo;
    },
    addRoomInstance(state, newRoom) {
      state.properties.push(newRoom);
    },
    removeRoom(state, roomToDelete) {
      const roomIndex = state.properties.filter((r) => {
        r.id === roomToDelete.id;
      })[0];
      state.properties.splice(roomIndex, 1);
    },
  },
  actions: {
    validate(context) {
      context.commit("updateErrors");
    },
    deleteRoom(context, roomToDelete) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/facts/rooms/delete/${roomToDelete.id}/`,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        context.commit("removeRoom", roomToDelete);
      });
    },
    addNewRoom(context) {
      const newRoom = {
        isSelected: false,
        id: 0,
        hotel: 0,
        roomName: null,
        roomSequence: null,
        roomNameType: null,
        roomView: null,
        roomOverrideCode: null,
        roomOnGroundFloor: false,
        roomStoreyLevel: null,
        roomTotalUnits: null,
        roomAdditionalView: null,
        roomFeatures: [],
        roomSizeSqm: null,
        roomMinAge: null,
        roomSizeComparison: null,
        roomSizeComparisonWith: null,
        roomAvailableSingleUse: false,
        roomAllowedInfantsCount: null,
        roomInfantsNotAllowed: false,
        roomOccupancies: [],
        roomLocations: [],
        roomAccessTo: [],
        roomNumberOfBathrooms: null,
        roomBathroomType: null,
        roomAdditionalGuestBathroomAvailable: false,
        roomBathroomFeature: [],
        roomFacilityMultimedia: [],
        roomFacilityEquipment: [],
        roomFacilityAmenity: [],
        roomBalconyType: null,
        roomBalconyFacilities: [],
        roomAdditionalBedLinen: false,
        roomAdditionalTowels: false,
        roomAdditionalTeaTowels: false,
        roomAdditionalCleaningTools: false,
        roomAdditionalFirstSetup: false,
        roomHasMiniBar: false,
        roomMiniBarItems: [],
        roomMiniBarCharges: null,
        roomMiniBarOnRequest: false,
        roomMiniBarArrivalWelcome: false,
        roomMiniBarIsEmpty: false,
        roomMiniBarRestocking: false,
        roomMiniBarRestockingFreq: null,
        roomMiniBarRestockingPeriod: null,
        roomMiniBarRestockingCharges: null,
        roomMiniBarRestockItems: [],
        roomHasAirCondition: false,
        roomAirConditionCharges: null,
        roomAirConditionIndividually: false,
        roomAirConditionCentralised: false,
        roomAirConditionHourly: false,
        roomAirConditionSeasonal: false,
        roomHasHeating: false,
        roomHeatingCharges: null,
        roomHeatingFrom: null,
        roomHeatingTo: null,
        roomHeatingIsSeasonal: false,
        roomHasSafeBox: false,
        roomSafeCharges: null,
        roomHasLaptopSafe: false,
        roomLaptopSafeCharges: null,
        roomHasRoomService: false,
        roomRoomServiceCharges: null,
        roomRoomServiceAllDay: false,
        roomHasButlerService: false,
        roomButlerServiceCharges: null,
        roomHasWifiAccess: false,
        roomWifiCharges: null,
        roomWifiLimitedData: false,
        roomWifiHighSpeed: false,
        roomHasKitchenette: false,
        roomKitchenetteCharges: null,
        roomKitchenetteEquipment: null,
        roomKitchenettePrice: null,
        roomHasKitchenUnit: false,
        roomKitchenUnitCharges: null,
        roomKitchenUnitEquipment: null,
        roomKitchenUnitCleaningPrice: null,
        roomHasKitchen: false,
        roomKitchenCharges: null,
        roomKitchenEquipment: null,
        roomKitchenCleaningPrice: null,
        roomRooms: [],
        roomRoomsConnectionType: null,
        roomRoomsTwoDoubles: false,
        roomRoomsSecondConnection: null,
        roomDoubleBeds: null,
        roomKingBeds: null,
        roomQueenBeds: null,
        roomSingleBeds: null,
        roomFrenchBeds: null,
        roomSofaBeds: null,
        roomPullOutBeds: null,
        roomBunkBeds: null,
        additionalBedsAvailable: false,
        roomAdditionalBeds: null,
        roomAdditionalBedsPrice: null,
        roomCleaningAvailable: false,
        roomCleaningFrequency: null,
        roomCleaningIsDaily: false,
        roomCleaningCharges: null,
        roomCleaningFinalCleaningApply: false,
        roomCleaningFinalCharges: null,
        roomCleaningFinalPrice: null,
        roomTowelChangeAvailable: false,
        roomTowelChangeTimesPerWeek: null,
        roomTowelChangeIsDaily: false,
        roomTowelChangeOnRequest: false,
        roomTowelChangeCharge: null,
        roomSheetChangeAvailable: false,
        roomSheetChangeCharges: null,
        roomSheetChangeFrequency: null,
        roomSheetChangeIsDaily: false,
        roomSheetsNotProvided: false,
        roomSheetsForAdditionalCharge: false,
        roomTowelsOnGuest: false,
        roomTowelsForAdditionalCharge: false,
      };
      context.commit("addRoomInstance", newRoom);
    },
    postInfo(context, propertyId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      /* console.log(`Token is ${context.rootState.user.token}`); */
      const retrievedInfo = context.state.properties.map((info) => ({
        id: info.id,
        room_name: info.roomName,
        room_sequence: info.roomSequence,
        room_name_type: info.roomNameType,
        room_view: info.roomView,
        room_override_code: info.roomOverrideCode,
        room_on_ground_floor: info.roomOnGroundFloor,
        room_storey_level: info.roomStoreyLevel,
        room_total_units: info.roomTotalUnits,
        room_additional_view: info.roomAdditionalView,
        room_features: info.roomFeatures || [],
        room_size_sqm: info.roomSizeSqm,
        room_min_age: info.roomMinAge,
        room_size_comparison: info.roomSizeComparison,
        room_size_comparison_with: info.roomSizeComparisonWith,
        room_available_single_use: info.roomAvailableSingleUse,
        room_occupancies: info.roomOccupancies,
        room_locations: info.roomLocations,
        room_access_to: info.roomAccessTo,
        room_number_of_bathrooms: info.roomNumberOfBathrooms,
        room_bathroom_type: info.roomBathroomType,
        room_additional_guest_bathroom_available: info.roomAdditionalGuestBathroomAvailable,
        room_bathroom_feature: info.roomBathroomFeature,
        room_facility_multimedia: info.roomFacilityMultimedia,
        room_facility_equipment: info.roomFacilityEquipment,
        room_facility_amenity: info.roomFacilityAmenity,
        room_balcony_type: info.roomBalconyType,
        room_balcony_facilities: info.roomBalconyFacilities,
        room_additional_bed_linen: info.roomAdditionalBedLinen,
        room_additional_towels: info.roomAdditionalTowels,
        room_additional_tea_towels: info.roomAdditionalTeaTowels,
        room_additional_cleaning_tools: info.roomAdditionalCleaningTools,
        room_additional_first_setup: info.roomAdditionalFirstSetup,
        room_has_mini_bar: info.roomHasMiniBar,
        room_mini_bar_items: info.roomMiniBarItems,
        room_mini_bar_charges: info.roomMiniBarCharges,
        room_mini_bar_on_request: info.roomMiniBarOnRequest,
        room_mini_bar_arrival_welcome: info.roomMiniBarArrivalWelcome,
        room_mini_bar_is_empty: info.roomMiniBarIsEmpty,
        room_mini_bar_restocking: info.roomMiniBarRestocking,
        room_mini_bar_restocking_freq: info.roomMiniBarRestockingFreq,
        room_mini_bar_restocking_period: info.roomMiniBarRestockingPeriod,
        room_mini_bar_restocking_charges: info.roomMiniBarRestockingCharges,
        room_mini_bar_restock_items: info.roomMiniBarRestockItems,
        room_has_air_condition: info.roomHasAirCondition,
        room_air_condition_charges: info.roomAirConditionCharges,
        room_air_condition_individually: info.roomAirConditionIndividually,
        room_air_condition_centralised: info.roomAirConditionCentralised,
        room_air_condition_hourly: info.roomAirConditionHourly,
        room_air_condition_seasonal: info.roomAirConditionSeasonal,
        room_has_heating: info.roomHasHeating,
        room_heating_charges: info.roomHeatingCharges,
        room_heating_from: info.roomHeatingFrom,
        room_heating_to: info.roomHeatingTo,
        room_heating_is_seasonal: info.roomHeatingIsSeasonal,
        room_has_safe_box: info.roomHasSafeBox,
        room_safe_charges: info.roomSafeCharges,
        room_has_laptop_safe: info.roomHasLaptopSafe,
        room_laptop_safe_charges: info.roomLaptopSafeCharges,
        room_has_room_service: info.roomHasRoomService,
        room_room_service_charges: info.roomRoomServiceCharges,
        room_room_service_all_day: info.roomRoomServiceAllDay,
        room_has_butler_service: info.roomHasButlerService,
        room_butler_service_charges: info.roomButlerServiceCharges,
        room_has_wifi_access: info.roomHasWifiAccess,
        room_wifi_charges: info.roomWifiCharges,
        room_wifi_limited_data: info.roomWifiLimitedData,
        room_wifi_high_speed: info.roomWifiHighSpeed,
        room_has_kitchenette: info.roomHasKitchenette,
        room_kitchenette_charges: info.roomKitchenetteCharges,
        room_kitchenette_equipment: info.roomKitchenetteEquipment,
        room_kitchenette_price: info.roomKitchenettePrice,
        room_has_kitchen_unit: info.roomHasKitchenUnit,
        room_kitchen_unit_charges: info.roomKitchenUnitCharges,
        room_kitchen_unit_equipment: info.roomKitchenUnitEquipment,
        room_kitchen_unit_cleaning_price: info.roomKitchenUnitCleaningPrice,
        room_has_kitchen: info.roomHasKitchen,
        room_kitchen_charges: info.roomKitchenCharges,
        room_kitchen_equipment: info.roomKitchenEquipment,
        room_kitchen_cleaning_price: info.roomKitchenCleaningPrice,
        room_rooms: info.roomRooms || [],
        room_rooms_connection_type: info.roomRoomsConnectionType,
        room_rooms_two_doubles: info.roomRoomsTwoDoubles,
        room_rooms_second_connection: info.roomRoomsSecondConnection,
        room_double_beds: info.roomDoubleBeds,
        room_king_beds: info.roomKingBeds,
        room_queen_beds: info.roomQueenBeds,
        room_single_beds: info.roomSingleBeds,
        room_french_beds: info.roomFrenchBeds,
        room_sofa_beds: info.roomSofaBeds,
        room_pull_out_beds: info.roomPullOutBeds,
        room_bunk_beds: info.roomBunkBeds,
        additional_beds_available: info.additionalBedsAvailable,
        room_additional_beds: info.roomAdditionalBeds,
        room_additional_beds_price: info.roomAdditionalBedsPrice,
        room_cleaning_available: info.roomCleaningAvailable,
        room_cleaning_frequency: info.roomCleaningFrequency,
        room_cleaning_is_daily: info.roomCleaningIsDaily,
        room_cleaning_charges: info.roomCleaningCharges,
        room_cleaning_final_cleaning_apply: info.roomCleaningFinalCleaningApply,
        room_cleaning_final_charges: info.roomCleaningFinalCharges,
        room_cleaning_final_price: info.roomCleaningFinalPrice,
        room_towel_change_available: info.roomTowelChangeAvailable,
        room_towel_change_times_per_week: info.roomTowelChangeTimesPerWeek,
        room_towel_change_is_daily: info.roomTowelChangeIsDaily,
        room_towel_change_on_request: info.roomTowelChangeOnRequest,
        room_towel_change_charge: info.roomTowelChangeCharge,
        room_sheet_change_available: info.roomSheetChangeAvailable,
        room_sheet_change_charges: info.roomSheetChangeCharges,
        room_sheet_change_frequency: info.roomSheetChangeFrequency,
        room_sheet_change_is_daily: info.roomSheetChangeIsDaily,
        room_sheets_not_provided: info.roomSheetsNotProvided,
        room_sheets_for_additional_charge: info.roomSheetsForAdditionalCharge,
        room_towels_on_guest: info.roomTowelsOnGuest,
        room_towels_for_additional_charge: info.roomTowelsForAdditionalCharge,
        hotel: propertyId,
      }));
      /* console.log("req is", retrievedInfo); */
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/facts/rooms/update/${propertyId}/`,
          data: retrievedInfo,
        })
          .then((response) => {
            const savedInfo = response.data.map((info) => ({
              id: info.id,
              roomName: info.room_name,
              roomSequence: info.room_sequence,
              roomNameType: info.room_name_type,
              roomView: info.room_view,
              roomOverrideCode: info.room_override_code,
              roomOnGroundFloor: info.room_on_ground_floor,
              roomStoreyLevel: info.room_storey_level,
              roomTotalUnits: info.room_total_units,
              roomAdditionalView: info.room_additional_view,
              roomFeatures: info.room_features || [],
              roomSizeSqm: info.room_size_sqm,
              roomMinAge: info.room_min_age,
              roomSizeComparison: info.room_size_comparison,
              roomSizeComparisonWith: info.room_size_comparison_with,
              roomAvailableSingleUse: info.room_available_single_use,
              roomAllowedInfantsCount: info.room_allowed_infant_count,
              roomInfantsNotAllowed: info.room_infant_not_allowed,
              roomOccupancies: info.room_occupancies,
              roomLocations: info.room_locations,
              roomAccessTo: info.room_access_to,
              roomNumberOfBathrooms: info.room_number_of_bathrooms,
              roomBathroomType: info.room_bathroom_type,
              roomAdditionalGuestBathroomAvailable: info.room_additional_guest_bathroom_available,
              roomBathroomFeature: info.room_bathroom_feature,
              roomFacilityMultimedia: info.room_facility_multimedia,
              roomFacilityEquipment: info.room_facility_equipment,
              roomFacilityAmenity: info.room_facility_amenity,
              roomBalconyType: info.room_balcony_type,
              roomBalconyFacilities: info.room_balcony_facilities,
              roomAdditionalBedLinen: info.room_additional_bed_linen,
              roomAdditionalTowels: info.room_additional_towels,
              roomAdditionalTeaTowels: info.room_additional_tea_towels,
              roomAdditionalCleaningTools: info.room_additional_cleaning_tools,
              roomAdditionalFirstSetup: info.room_additional_first_setup,
              roomHasMiniBar: info.room_has_mini_bar,
              roomMiniBarItems: info.room_mini_bar_items,
              roomMiniBarCharges: info.room_mini_bar_charges,
              roomMiniBarOnRequest: info.room_mini_bar_on_request,
              roomMiniBarArrivalWelcome: info.room_mini_bar_arrival_welcome,
              roomMiniBarIsEmpty: info.room_mini_bar_is_empty,
              roomMiniBarRestocking: info.room_mini_bar_restocking,
              roomMiniBarRestockingFreq: info.room_mini_bar_restocking_freq,
              roomMiniBarRestockingPeriod: info.room_mini_bar_restocking_period,
              roomMiniBarRestockingCharges: info.room_mini_bar_restocking_charges,
              roomMiniBarRestockItems: info.room_mini_bar_restock_items,
              roomHasAirCondition: info.room_has_air_condition,
              roomAirConditionCharges: info.room_air_condition_charges,
              roomAirConditionIndividually: info.room_air_condition_individually,
              roomAirConditionCentralised: info.room_air_condition_centralised,
              roomAirConditionHourly: info.room_air_condition_hourly,
              roomAirConditionSeasonal: info.room_air_condition_seasonal,
              roomHasHeating: info.room_has_heating,
              roomHeatingCharges: info.room_heating_charges,
              roomHeatingFrom: info.room_heating_from,
              roomHeatingTo: info.room_heating_to,
              roomHeatingIsSeasonal: info.room_heating_is_seasonal,
              roomHasSafeBox: info.room_has_safe_box,
              roomSafeCharges: info.room_safe_charges,
              roomHasLaptopSafe: info.room_has_laptop_safe,
              roomLaptopSafeCharges: info.room_laptop_safe_charges,
              roomHasRoomService: info.room_has_room_service,
              roomRoomServiceCharges: info.room_room_service_charges,
              roomRoomServiceAllDay: info.room_room_service_all_day,
              roomHasButlerService: info.room_has_butler_service,
              roomButlerServiceCharges: info.room_butler_service_charges,
              roomHasWifiAccess: info.room_has_wifi_access,
              roomWifiCharges: info.room_wifi_charges,
              roomWifiLimitedData: info.room_wifi_limited_data,
              roomWifiHighSpeed: info.room_wifi_high_speed,
              roomHasKitchenette: info.room_has_kitchenette,
              roomKitchenetteCharges: info.room_kitchenette_charges,
              roomKitchenetteEquipment: info.room_kitchenette_equipment,
              roomKitchenettePrice: info.room_kitchenette_price,
              roomHasKitchenUnit: info.room_has_kitchen_unit,
              roomKitchenUnitCharges: info.room_kitchen_unit_charges,
              roomKitchenUnitEquipment: info.room_kitchen_unit_equipment,
              roomKitchenUnitCleaningPrice: info.room_kitchen_unit_cleaning_price,
              roomHasKitchen: info.room_has_kitchen,
              roomKitchenCharges: info.room_kitchen_charges,
              roomKitchenEquipment: info.room_kitchen_equipment,
              roomKitchenCleaningPrice: info.room_kitchen_cleaning_price,
              roomRooms: info.room_rooms || [],
              roomRoomsConnectionType: info.room_rooms_connection_type,
              roomRoomsTwoDoubles: info.room_rooms_two_doubles,
              roomRoomsSecondConnection: info.room_rooms_second_connection,
              roomDoubleBeds: info.room_double_beds,
              roomKingBeds: info.room_king_beds,
              roomQueenBeds: info.room_queen_beds,
              roomSingleBeds: info.room_single_beds,
              roomFrenchBeds: info.room_french_beds,
              roomSofaBeds: info.room_sofa_beds,
              roomPullOutBeds: info.room_pull_out_beds,
              roomBunkBeds: info.room_bunk_beds,
              additionalBedsAvailable: info.additional_beds_available,
              roomAdditionalBeds: info.room_additional_beds,
              roomAdditionalBedsPrice: info.room_additional_beds_price,
              roomCleaningAvailable: info.room_cleaning_available,
              roomCleaningFrequency: info.room_cleaning_frequency,
              roomCleaningIsDaily: info.room_cleaning_is_daily,
              roomCleaningCharges: info.room_cleaning_charges,
              roomCleaningFinalCleaningApply: info.room_cleaning_final_cleaning_apply,
              roomCleaningFinalCharges: info.room_cleaning_final_charges,
              roomCleaningFinalPrice: info.room_cleaning_final_price,
              roomTowelChangeAvailable: info.room_towel_change_available,
              roomTowelChangeTimesPerWeek: info.room_towel_change_times_per_week,
              roomTowelChangeIsDaily: info.room_towel_change_is_daily,
              roomTowelChangeOnRequest: info.room_towel_change_on_request,
              roomTowelChangeCharge: info.room_towel_change_charge,
              roomSheetChangeAvailable: info.room_sheet_change_available,
              roomSheetChangeCharges: info.room_sheet_change_charges,
              roomSheetChangeFrequency: info.room_sheet_change_frequency,
              roomSheetChangeIsDaily: info.room_sheet_change_is_daily,
              roomSheetsNotProvided: info.room_sheets_not_provided,
              roomSheetsForAdditionalCharge: info.room_sheets_for_additional_charge,
              roomTowelsOnGuest: info.room_towels_on_guest,
              roomTowelsForAdditionalCharge: info.room_towels_for_additional_charge,
            }));
            console.log(response.data);
            console.log(savedInfo);
            context.commit("updateProperties", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getInfo(context, propertyId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/rooms/${propertyId}/`,
        })
          .then((response) => {
            const retrievedInfo = response.data.map((info) => ({
              id: info.id,
              isSelected: false,
              roomName: info.room_name,
              roomSequence: info.room_sequence,
              roomNameType: info.room_name_type,
              roomView: info.room_view,
              roomOverrideCode: info.room_override_code,
              roomOnGroundFloor: info.room_on_ground_floor,
              roomStoreyLevel: info.room_storey_level,
              roomTotalUnits: info.room_total_units,
              roomAdditionalView: info.room_additional_view,
              roomFeatures: info.room_features || [],
              roomSizeSqm: info.room_size_sqm,
              roomMinAge: info.room_min_age,
              roomSizeComparison: info.room_size_comparison,
              roomSizeComparisonWith: info.room_size_comparison_with,
              roomAvailableSingleUse: info.room_available_single_use,
              roomAllowedInfantsCount: info.room_allowed_infant_count,
              roomInfantsNotAllowed: info.room_infant_not_allowed,
              roomOccupancies: info.room_occupancies,
              roomLocations: info.room_locations,
              roomAccessTo: info.room_access_to,
              roomNumberOfBathrooms: info.room_number_of_bathrooms,
              roomBathroomType: info.room_bathroom_type,
              // eslint-disable-next-line max-len
              roomAdditionalGuestBathroomAvailable: info.room_additional_guest_bathroom_available,
              roomBathroomFeature: info.room_bathroom_feature,
              roomFacilityMultimedia: info.room_facility_multimedia,
              roomFacilityEquipment: info.room_facility_equipment,
              roomFacilityAmenity: info.room_facility_amenity,
              roomBalconyType: info.room_balcony_type,
              roomBalconyFacilities: info.room_balcony_facilities,
              roomAdditionalBedLinen: info.room_additional_bed_linen,
              roomAdditionalTowels: info.room_additional_towels,
              roomAdditionalTeaTowels: info.room_additional_tea_towels,
              roomAdditionalCleaningTools: info.room_additional_cleaning_tools,
              roomAdditionalFirstSetup: info.room_additional_first_setup,
              roomHasMiniBar: info.room_has_mini_bar,
              roomMiniBarItems: info.room_mini_bar_items,
              roomMiniBarCharges: info.room_mini_bar_charges,
              roomMiniBarOnRequest: info.room_mini_bar_on_request,
              roomMiniBarArrivalWelcome: info.room_mini_bar_arrival_welcome,
              roomMiniBarIsEmpty: info.room_mini_bar_is_empty,
              roomMiniBarRestocking: info.room_mini_bar_restocking,
              roomMiniBarRestockingFreq: info.room_mini_bar_restocking_freq,
              roomMiniBarRestockingPeriod: info.room_mini_bar_restocking_period,
              roomMiniBarRestockingCharges: info.room_mini_bar_restocking_charges,
              roomMiniBarRestockItems: info.room_mini_bar_restock_items,
              roomHasAirCondition: info.room_has_air_condition,
              roomAirConditionCharges: info.room_air_condition_charges,
              roomAirConditionIndividually: info.room_air_condition_individually,
              roomAirConditionCentralised: info.room_air_condition_centralised,
              roomAirConditionHourly: info.room_air_condition_hourly,
              roomAirConditionSeasonal: info.room_air_condition_seasonal,
              roomHasHeating: info.room_has_heating,
              roomHeatingCharges: info.room_heating_charges,
              roomHeatingFrom: info.room_heating_from,
              roomHeatingTo: info.room_heating_to,
              roomHeatingIsSeasonal: info.room_heating_is_seasonal,
              roomHasSafeBox: info.room_has_safe_box,
              roomSafeCharges: info.room_safe_charges,
              roomHasLaptopSafe: info.room_has_laptop_safe,
              roomLaptopSafeCharges: info.room_laptop_safe_charges,
              roomHasRoomService: info.room_has_room_service,
              roomRoomServiceCharges: info.room_room_service_charges,
              roomRoomServiceAllDay: info.room_room_service_all_day,
              roomHasButlerService: info.room_has_butler_service,
              roomButlerServiceCharges: info.room_butler_service_charges,
              roomHasWifiAccess: info.room_has_wifi_access,
              roomWifiCharges: info.room_wifi_charges,
              roomWifiLimitedData: info.room_wifi_limited_data,
              roomWifiHighSpeed: info.room_wifi_high_speed,
              roomHasKitchenette: info.room_has_kitchenette,
              roomKitchenetteCharges: info.room_kitchenette_charges,
              roomKitchenetteEquipment: info.room_kitchenette_equipment,
              roomKitchenettePrice: info.room_kitchenette_price,
              roomHasKitchenUnit: info.room_has_kitchen_unit,
              roomKitchenUnitCharges: info.room_kitchen_unit_charges,
              roomKitchenUnitEquipment: info.room_kitchen_unit_equipment,
              roomKitchenUnitCleaningPrice: info.room_kitchen_unit_cleaning_price,
              roomHasKitchen: info.room_has_kitchen,
              roomKitchenCharges: info.room_kitchen_charges,
              roomKitchenEquipment: info.room_kitchen_equipment,
              roomKitchenCleaningPrice: info.room_kitchen_cleaning_price,
              roomRooms: info.room_rooms || [],
              roomRoomsConnectionType: info.room_rooms_connection_type,
              roomRoomsTwoDoubles: info.room_rooms_two_doubles,
              roomRoomsSecondConnection: info.room_rooms_second_connection,
              roomDoubleBeds: info.room_double_beds,
              roomKingBeds: info.room_king_beds,
              roomQueenBeds: info.room_queen_beds,
              roomSingleBeds: info.room_single_beds,
              roomFrenchBeds: info.room_french_beds,
              roomSofaBeds: info.room_sofa_beds,
              roomPullOutBeds: info.room_pull_out_beds,
              roomBunkBeds: info.room_bunk_beds,
              additionalBedsAvailable: info.additional_beds_available,
              roomAdditionalBeds: info.room_additional_beds,
              roomAdditionalBedsPrice: info.room_additional_beds_price,
              roomCleaningAvailable: info.room_cleaning_available,
              roomCleaningFrequency: info.room_cleaning_frequency,
              roomCleaningIsDaily: info.room_cleaning_is_daily,
              roomCleaningCharges: info.room_cleaning_charges,
              roomCleaningFinalCleaningApply: info.room_cleaning_final_cleaning_apply,
              roomCleaningFinalCharges: info.room_cleaning_final_charges,
              roomCleaningFinalPrice: info.room_cleaning_final_price,
              roomTowelChangeAvailable: info.room_towel_change_available,
              roomTowelChangeTimesPerWeek: info.room_towel_change_times_per_week,
              roomTowelChangeIsDaily: info.room_towel_change_is_daily,
              roomTowelChangeOnRequest: info.room_towel_change_on_request,
              roomTowelChangeCharge: info.room_towel_change_charge,
              roomSheetChangeAvailable: info.room_sheet_change_available,
              roomSheetChangeCharges: info.room_sheet_change_charges,
              roomSheetChangeFrequency: info.room_sheet_change_frequency,
              roomSheetChangeIsDaily: info.room_sheet_change_is_daily,
              roomSheetsNotProvided: info.room_sheets_not_provided,
              roomSheetsForAdditionalCharge: info.room_sheets_for_additional_charge,
              roomTowelsOnGuest: info.room_towels_on_guest,
              roomTowelsForAdditionalCharge: info.room_towels_for_additional_charge,
            }));
            context.commit("updateProperties", retrievedInfo);
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
      return state.property;
    },
    getProperties(state) {
      return state.properties;
    },
    getErrors(state) {
      return state.errors;
    },
  },
};
