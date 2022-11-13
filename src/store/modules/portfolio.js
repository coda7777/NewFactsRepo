import axios from "axios";

export default {
  namespaced: true,
  state: {
    portfolio: {
      id: 0,
      company: null,
      accountType: null,
      country: null,
      state: null,
      city: null,
      address: null,
      email: null,
      website: null,
      contactNumber: null,
      logo: null,
      aboutUs: null,
      description: null,
      workInCountries: [],
      trustpilot: null,
      facebook: null,
      instagram: null,
      linkedIn: null,
      tripAdvisor: null,
    },
  },
  mutations: {
    updatePortfolio(state, newData) {
      state.portfolio = newData;
    },
  },
  actions: {
    getInfo(context, compId) {
      /* console.log("getting info data"); */
      /*  axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`; */
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/settings/portfolio/${compId}/`,
        })
          .then((response) => {
            console.log(response);
            const retrievedInfo = {
              id: response.data.id,
              company: response.data.company,
              email: response.data.email || null,
              accountType: response.data.account_type || null,
              country: response.data.country || null,
              state: response.data.state || null,
              city: response.data.city || null,
              website: response.data.website || null,
              address: response.data.address || null,
              contactNumber: response.data.contact_number || null,
              logo: response.data.logo || null,
              description: response.data.description || null,
              workInCountries: response.data.work_in_countries || [],
              trustpilot: response.data.trustpilot || null,
              facebook: response.data.facebook || null,
              instagram: response.data.instagram || null,
              linkedIn: response.data.linked_in || null,
              tripAdvisor: response.data.trip_advisor || null,
            };
            context.commit("updatePortfolio", retrievedInfo);
            console.log("retrieved info data");
            console.log(retrievedInfo);
            resolve(retrievedInfo);
          })
          .catch((error) => {
            context.commit("updatePortfolio", {});
            reject(error);
            console.log("failed retrieve info data");
          });
      });
    },
  },
  getters: {
    getPortfolio(state) {
      return state.portfolio;
    },
  },
};
