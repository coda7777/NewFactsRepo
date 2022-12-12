import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/users";
import view from "./modules/view";
import options from "./modules/options";
import countries from "./modules/countries";
import countriesStatic from "./modules/countriesStatic";
import property from "./modules/property";
import mainInfo from "./modules/mainInfo";
import notificationsArea from "./modules/notifications";
import entertainmentFactsComp from "./modules/entertainment";
import environmentFactsComp from "./modules/environment";
import facilitiesFactsComp from "./modules/facilitiesInfo";
import roomsFactsComp from "./modules/roomsInfo";
import foodAndBeverageFactsComp from "./modules/foodAndBeverage";
import allInclusiveFactsComp from "./modules/allInclusive";
import childrenFactsComp from "./modules/childrenInfo";
import sportsAndWellnessFactsComp from "./modules/sportsAndWellness";
import additionalFactsComp from "./modules/additionalInfo";
import maintenanceFactsComp from "./modules/maintenanceInfo";
import partnerHotelFactsComp from "./modules/partnerhotel";
import galleryInfo from "./modules/galleryInfo";
import restaurantsFactsComp from "./modules/restaurantsInfo";
import barsFactsComp from "./modules/barsInfo";
import authorizedUsers from "./modules/authorizedUserInfo";
import settings from "./modules/settings";
import portfolio from "./modules/portfolio";
import partners from "./modules/partnerInfo";
import calendar from "./modules/calstore";
import devTools from "./modules/devToolInfo";
import widgetAppearance from "./modules/widgetAppearance";
import exportCenter from './modules/exportCenter'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    exportCenter,
    view,
    options,
    calendar,
    notificationsArea,
    property,
    mainInfo,
    environmentFactsComp,
    facilitiesFactsComp,
    roomsFactsComp,
    foodAndBeverageFactsComp,
    allInclusiveFactsComp,
    childrenFactsComp,
    sportsAndWellnessFactsComp,
    entertainmentFactsComp,
    additionalFactsComp,
    maintenanceFactsComp,
    partnerHotelFactsComp,
    countries,
    countriesStatic,
    user,
    galleryInfo,
    restaurantsFactsComp,
    barsFactsComp,
    authorizedUsers,
    settings,
    portfolio,
    partners,
    devTools,
    widgetAppearance,
  },
});
