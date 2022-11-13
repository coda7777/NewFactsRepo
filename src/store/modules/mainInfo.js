import axios from "axios";

export default {
  namespaced: true,
  state: {
    property: {
      id: null,
      hotel: null,
      accommodationType: "",
      rating: 0,
      address: "",
      email: "",
      phone: "",
      zipCode: "",
      fax: "",
      longitude: "",
      latitude: "",
      petsAllowed: false,
      petsCharges: null,
      petschargesPrice: null,
      petsChargeCurrency: null,
      minimumAgeAllowed: 0,
      checkInTime: null,
      checkOutTime: null,
      checkInPartnerHotel: false,
      partnerHotelName: null,
      partnerHotelDistance: null,
      partnerHotelDistanceUnit: null,
      alcoholProhibitedOnSpecialHolidays: false,
      depositRequired: false,
      depositRequiredFor: null,
      tax: false,
      taxCharges: null,
      chargesPersonPerNight: null,
      taxCurrency: null,
      touristTax: false,
      touristCharges: null,
      touristChargesPersonPerNight: null,
      touristCurrency: null,
      childTax: false,
      childCharges: null,
      childChargesPerNight: null,
      childCurrency: null,
      childTaxFrom: null,
      childTaxTo: null,
      resortFees: false,
      resortFeesCharges: null,
      resortFeesChargesPerNight: null,
      resortFeesCurrency: null,
      registrationFee: false,
      lateCheckOut: false,
      lateCheckOutPrice: null,
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
        ? `http://127.0.0.1:8000/api/facts/main-info/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/facts/main-info/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            const savedInfo = {
              id: response.data.hotel,
              hotel: response.data.hotel.id,
              accommodationType: response.data.accommodation_type,
              rating: parseFloat(response.data.rating),
              address: response.data.address,
              email: response.data.email,
              phone: response.data.phone,
              zipCode: response.data.zip_code,
              fax: response.data.fax,
              longitude: response.data.longitude,
              latitude: response.data.latitude,
              petsAllowed: response.data.pets_allowed,
              petsCharges: response.data.pets_charges,
              petschargesPrice: response.data.pets_price,
              petsChargeCurrency: response.data.pets_currency,
              minimumAgeAllowed: response.data.minimum_age_allowed,
              checkInTime: response.data.check_in_time,
              checkOutTime: response.data.check_out_time,
              checkInPartnerHotel: response.data.check_in_partner_hotel,
              partnerHotelName: response.data.partner_hotel,
              partnerHotelDistance: response.data.partner_hotel_distance,
              partnerHotelDistanceUnit: response.data.partner_hotel_distance_unit,
              // eslint-disable-next-line max-len
              alcoholProhibitedOnSpecialHolidays:
                response.data.alcohol_prohibited_on_special_holidays,
              depositRequired: response.data.deposit_required,
              depositRequiredFor: response.data.deposit_required_for,
              tax: response.data.tax,
              taxCharges: response.data.tax_charges,
              chargesPersonPerNight: response.data.charges_person_per_night,
              taxCurrency: response.data.tax_currency,
              touristTax: response.data.tourist_tax,
              touristCharges: response.data.tourist_charges,
              touristChargesPersonPerNight: response.data.tourist_charges_person_per_night,
              touristCurrency: response.data.tourist_currency,
              childTax: response.data.child_tax,
              childCharges: response.data.child_charges,
              childChargesPerNight: response.data.child_charges_per_night,
              childCurrency: response.data.child_currency,
              childTaxFrom: response.data.age_from,
              childTaxTo: response.data.age_to,
              resortFees: response.data.resort_fee,
              resortFeesCharges: response.data.resort_charges || null,
              resortFeesChargesPerNight: response.data.resort_charges_per_night,
              resortFeesCurrency: response.data.resort_currency,
              registrationFee: response.data.registration_fee,
              lateCheckOut: response.data.late_check_out,
              lateCheckOutPrice: response.data.late_check_out_price,
            };
            context.commit("updateProperty", savedInfo);
            resolve(savedInfo);
          })
          .catch((error) => {
            /* console.log(error.response.data); */
            reject(error.response.data);
          });
      });
    },
    getInfo(context, infoId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/facts/main-info/${infoId}/`,
        })
          .then((response) => {
            const retrievedInfo = {
              id: response.data.hotel?.id,
              hotel: response.data.hotel?.id,
              accommodationType: response.data.accommodation_type || null,
              rating: parseFloat(response.data.rating) || null,
              address: response.data.address,
              email: response.data.email,
              phone: response.data.phone,
              zipCode: response.data.zip_code,
              fax: response.data.fax,
              longitude: response.data.longitude,
              latitude: response.data.latitude,
              petsAllowed: response.data.pets_allowed,
              petsCharges: response.data.pets_charges || null,
              petschargesPrice: response.data.pets_price,
              petsChargeCurrency: response.data.pets_currency,
              minimumAgeAllowed: response.data.minimum_age_allowed,
              checkInTime: response.data.check_in_time,
              checkOutTime: response.data.check_out_time,
              checkInPartnerHotel: response.data.check_in_partner_hotel,
              partnerHotelName: response.data.partner_hotel,
              partnerHotelDistance: response.data.partner_hotel_distance,
              partnerHotelDistanceUnit: response.data.partner_hotel_distance_unit || null,
              // eslint-disable-next-line max-len
              alcoholProhibitedOnSpecialHolidays:
                response.data.alcohol_prohibited_on_special_holidays,
              depositRequired: response.data.deposit_required,
              depositRequiredFor: response.data.deposit_required_for,
              tax: response.data.tax,
              taxCharges: response.data.tax_charges || null,
              chargesPersonPerNight: response.data.charges_person_per_night,
              taxCurrency: response.data.tax_currency || null,
              touristTax: response.data.tourist_tax,
              touristCharges: response.data.tourist_charges || null,
              touristChargesPersonPerNight: response.data.tourist_charges_person_per_night,
              touristCurrency: response.data.tourist_currency,
              childTax: response.data.child_tax,
              childCharges: response.data.child_charges || null,
              childChargesPerNight: response.data.child_charges_per_night,
              childCurrency: response.data.child_currency,
              childTaxFrom: response.data.age_from,
              childTaxTo: response.data.age_to,
              resortFees: response.data.resort_fee,
              resortFeesCharges: response.data.resort_charges || null,
              resortFeesChargesPerNight: response.data.resort_charges_per_night,
              resortFeesCurrency: response.data.resort_currency,
              registrationFee: response.data.registration_fee,
              lateCheckOut: response.data.late_check_out,
              lateCheckOutPrice: response.data.late_check_out_price,
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
