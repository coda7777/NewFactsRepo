import axios from "axios";

export default {
  namespaced: true,
  state: {
    company: {
      company: "",
      website: "",
      address: "",
      contactNumber: "",
      logo: null,
      country: "",
      state: "",
      city: "",
      description: "",
      aboutUs: "",
      workInCountries: [],
      facebook: "",
      instagram: "",
      linkedIn: "",
      trustpilot: "",
      tripAdvisor: "",
      user: "",
    },
    preferences: {
      user: "",
      auditTrail: false,
      addLogo: false,
      partnerOverrideFacts: false,
      overridingModeration: "",
      theme: "",
      layout: "",
      pdfLayout: "",
      apiLayout: "",
      twoFactorAuth: false,
      emailAddresses: "",
      partnershipChangesMail: false,
      partnershipNewMail: false,
      featuresOffersMail: false,
      notifyPartnershipRequest: false,
      notifyPartnershipChanges: false,
      notifyFactSheetChanges: false,
      notifyFactSheetDownload: false,
      notifyFactReview: false,
      plan: "F",
    },
    mailingLists: [],
    mailingContacts: [],
  },
  mutations: {
    updateCompany(state, newCompany) {
      state.company.company = newCompany.company;
      state.company.website = newCompany.website;
      state.company.address = newCompany.address;
      state.company.contactNumber = newCompany.contact_number;
      state.company.logo = newCompany.logo ? newCompany.logo : null;
      state.company.country = newCompany.country ? newCompany.country : "";
      state.company.state = newCompany.state ? newCompany.state : "";
      state.company.city = newCompany.city ? newCompany.city : "";
      state.company.description = newCompany.description;
      state.company.aboutUs = newCompany.about_us;
      state.company.workInCountries = newCompany.work_in_countries;
      state.company.facebook = newCompany.facebook ? newCompany.facebook : null;
      state.company.instagram = newCompany.instagram ? newCompany.instagram : null;
      state.company.linkedIn = newCompany.linked_in ? newCompany.linked_in : null;
      state.company.trustpilot = newCompany.trustpilot ? newCompany.trustpilot : null;
      state.company.tripAdvisor = newCompany.trip_advisor ? newCompany.trip_advisor : null;
      state.company.user = newCompany.user;
    },
    updatePreferences(state, newPreferences) {
      state.preferences.user = newPreferences.user;
      state.preferences.auditTrail = newPreferences.audit_trail;
      state.preferences.addLogo = newPreferences.add_logo;
      state.preferences.partnerOverrideFacts = newPreferences.partner_override_facts;
      state.preferences.overridingModeration = newPreferences.overriding_moderation;
      state.preferences.theme = newPreferences.theme;
      state.preferences.layout = newPreferences.layout;
      state.preferences.pdfLayout = newPreferences.pdf_layout;
      state.preferences.apiLayout = newPreferences.api_layout;
      state.preferences.twoFactorAuth = newPreferences.two_factor_auth;
      state.preferences.emailAddresses = newPreferences.email_addresses;
      state.preferences.partnershipChangesMail = newPreferences.partnership_changes_mail;
      state.preferences.partnershipNewMail = newPreferences.partnership_new_mail;
      state.preferences.featuresOffersMail = newPreferences.features_offers_mail;
      state.preferences.notifyPartnershipRequest = newPreferences.notify_partnership_request;
      state.preferences.notifyPartnershipChanges = newPreferences.notify_partnership_changes;
      state.preferences.notifyFactSheetChanges = newPreferences.notify_fact_sheet_changes;
      state.preferences.notifyFactSheetDownload = newPreferences.notify_fact_sheet_download;
      state.preferences.notifyFactReview = newPreferences.notify_fact_review;
      state.preferences.plan = newPreferences.plan;
      /* console.log("this is the state preferences", state.preferences); */
    },
    updateMailinglists(state, newInfo) {
      state.mailingLists = newInfo;
    },
    updateMailingContacts(state, newInfo) {
      state.mailingContacts = newInfo;
    },
  },
  actions: {
    retrieveCompany(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/settings/company/",
        })
          .then((response) => {
            context.commit("updateCompany", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    retrievePreferences(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/settings/preferences/",
        })
          .then((response) => {
            /* console.log(response.data); */
            context.commit("updatePreferences", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    postCompany(context, formData) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://127.0.0.1:8000/api/settings/company/create/",
          method: "post",
          data: formData,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    putCompany(context, formData) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://127.0.0.1:8000/api/settings/company/edit/",
          method: "put",
          data: formData,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    savePreferences(context, newData) {
      return new Promise((resolve, reject) => {
        const snakeData = {
          user: newData.user,
          audit_trail: newData.auditTrail,
          add_logo: newData.addLogo,
          partner_override_facts: newData.partnerOverrideFacts,
          overriding_moderation: newData.overridingModeration,
          theme: newData.theme,
          layout: newData.layout,
          pdf_layout: newData.pdfLayout,
          api_layout: newData.apiLayout,
          two_factor_auth: newData.twoFactorAuth,
          email_addresses: newData.emailAddresses,
          partnership_changes_mail: newData.partnershipChangesMail,
          partnership_new_mail: newData.partnershipNewMail,
          features_offers_mail: newData.featuresOffersMail,
          notify_partnership_request: newData.notifyPartnershipRequest,
          notify_partnership_changes: newData.notifyPartnershipChanges,
          notify_fact_sheet_changes: newData.notifyFactSheetChanges,
          notify_fact_sheet_download: newData.notifyFactSheetDownload,
          notify_fact_review: newData.notifyFactReview,
          plan: newData.plan,
        };
        /* console.log(snakeData); */
        const url =
          newData.user > 0
            ? "http://127.0.0.1:8000/api/settings/preferences/edit/"
            : "http://127.0.0.1:8000/api/settings/preferences/create/";
        const method = newData.user > 0 ? "put" : "post";
        axios({
          url: url,
          method: method,
          data: snakeData,
        })
          .then((response) => {
            context.commit("updatePreferences", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    getMailingLists(context) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/api/settings/mailing-lists/",
        })
          .then((response) => {
            context.commit("updateMailinglists", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getMailingContacts(context, groupId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: `http://127.0.0.1:8000/api/settings/contact-lists/${groupId}/`,
        })
          .then((response) => {
            context.commit("updateMailingContacts", response.data);
            console.log(response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    saveMailList(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/settings/mailing-list/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/settings/mailing-list/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    saveContact(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      const requestMethod = newInfo.id ? "put" : "post";
      const requestUrl = newInfo.id
        ? `http://127.0.0.1:8000/api/settings/contact-list/update/${newInfo.id}/`
        : "http://127.0.0.1:8000/api/settings/contact-list/create/";
      return new Promise((resolve, reject) => {
        axios({
          method: requestMethod,
          url: requestUrl,
          data: newInfo,
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    deleteMailList(context, mailgroupId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/settings/mailing-list/delete/${mailgroupId}/`,
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    deleteContact(context, contactId) {
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/settings/contact-list/delete/${contactId}/`,
        })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
  getters: {
    getCompany(state) {
      return state.company;
    },
    getPreferences(state) {
      return state.preferences;
    },
    getMailingLists(state) {
      return state.mailingLists;
    },
    getMailingContacts(state) {
      return state.mailingContacts;
    },
  },
};
