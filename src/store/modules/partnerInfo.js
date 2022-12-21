import axios from "axios";

export default {
  namespaced: true,
  state: {
    partners: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    contracts: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    partnerToContract: {},
  },
  mutations: {
    updatePartnerToContract(state, newData) {
      state.partnerToContract = newData;
    },
    updateContracts(state, newData) {
      state.contracts = newData;
    },
    updatePartners(state, newData) {
      const newPartners = {
        count: newData.data.count,
        next: newData.data.next,
        previous: newData.data.previous,
        results: [],
      };
      let newResults = [];
      if (newData.mode === "A") {
        newResults = newData.data.results.map((info) => ({
          id: info.id,
          email: info.email,
          accountType: info.account_type,
          country: info.country,
          company: info.company?.company,
          website: info.company?.website,
          address: info.company?.address,
          contactNumber: info.company?.contact_number,
          logo: info.company?.logo,
          description: info.company?.description,
          workInCountries: info.company?.work_in_countries,
          trustpilot: info.company?.trustpilot,
          facebook: info.company?.facebook,
          instagram: info.company?.instagram,
          linkedIn: info.company?.linked_in,
          tripAdvisor: info.company?.trip_advisor,
          contractId: info.contract_status.id,
          contractStatus: info.contract_status.status,
        }));
      } else {
        newResults = newData.data.results.map((info) => ({
          id: info.partner_info.id,
          email: info.partner_info.email,
          accountType: info.partner_info.account_type,
          country: info.partner_info.country,
          company: info.partner_info.company?.company,
          website: info.partner_info.company?.website,
          address: info.partner_info.company?.address,
          contactNumber: info.partner_info.company?.contact_number,
          logo: info.partner_info.company?.logo,
          description: info.partner_info.company?.description,
          workInCountries: info.partner_info.company?.work_in_countries,
          trustpilot: info.partner_info.company?.trustpilot,
          facebook: info.partner_info.company?.facebook,
          instagram: info.partner_info.company?.instagram,
          linkedIn: info.partner_info.company?.linked_in,
          tripAdvisor: info.partner_info.company?.trip_advisor,
          contractId: info.id,
          contractStatus: info.status,
        }));
      }
      newPartners.results = newResults;
      state.partners = newPartners;
    },
  },
  actions: {
    updatePartnerToContract(context, partnerData) {
      context.commit("updatePartnerToContract", partnerData);
    },

    retrievePartners(context, filtrations) {
      console.log("my filtrations:", filtrations);
      return new Promise((resolve, reject) => {
        axios({
          url: `http://127.0.0.1:8000/api/partners/?page=${filtrations.page}`,
          method: "post",
          data: filtrations.data,
        })
          .then((response) => {
            const dataMode = filtrations.data.status === "" ? "A" : "B";
            context.commit("updatePartners", {
              data: response.data,
              mode: dataMode,
            });
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
            reject(error.response.data);
          });
      });
    },
    postContract(context, contractInfo) {
      console.log("my filtrations:", contractInfo);
      return new Promise((resolve, reject) => {
        axios({
          url: "http://127.0.0.1:8000/api/partners/contract/create/",
          method: "post",
          data: contractInfo,
        })
          .then((response) => {
            console.log(response.data);
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
            reject(error.response.data);
          });
      });
    },
    retrieveContracts(context, filtrations) {
      console.log("my filtrations:", filtrations);
      return new Promise((resolve, reject) => {
        axios({
          url: `http://127.0.0.1:8000/api/partners/my-contracts/?page=${filtrations.page}`,
          method: "post",
          data: filtrations,
        })
          .then((response) => {
            context.commit("updateContracts", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
            reject(error.response.data);
          });
      });
    },
  },
  getters: {
    getPartners(state) {
      return state.partners;
    },
    getPartnerToContract(state) {
      return state.partnerToContract;
    },
    getContracts(state) {
      return state.contracts;
    },
  },
};
