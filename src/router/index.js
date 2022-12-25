import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import DashboardHome from "../components/Dashboard.vue";
import store from "../store";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  /* console.log(from.path, "-", to.path); */
  if (!store.getters["user/isAuthenticated"]) {
    next();
    return;
  }
  next("/login");
};

const ifAuthenticated = (to, from, next) => {
  /* console.log(from.path, ";", to.path); */
  if (store.getters["user/isAuthenticated"]) {
    next();
    return;
  }

  next("/login");
};

const routes = [
  {
    path: "/",
    name: "DashboardHome",
    component: DashboardHome,
    beforeEnter: ifAuthenticated,
  },
  // {
  //   path: "/",
  //   name: "notification",
  //   component: () => import("../components/Layout/Notification.vue"),
  //   beforeEnter: ifAuthenticated,
  // },
  {
    path: "/",
    name: "Table",
    component: () => import("../components/info_docs/Table.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/",
    name: "Card",
    component: () => import("../components/cards/Card.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/",
    name: "ChartCard",
    component: () => import("../components/cards/ChartCard.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/",
    name: "StatsCard",
    component: () => import("../components/cards/StatsCard.vue"),
    beforeEnter: ifAuthenticated,
  },
  /* Starting side Dashboard links   */
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/add-property",
    name: "AddProperty",
    component: () => import("../components/accom/AddProperty.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/property-facts",
    name: "PropertyFacts",
    component: () => import("../components/accom/PropertyFacts.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/property-photos",
    name: "PropertyPhotos",
    component: () => import("../components/accom/PropertyPhotos.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/property-photos/:id",
    name: "AddPhotos",
    component: () => import("../components/accom/AddPhotos.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/property-stopsale",
    name: "AvaiulabilityCharts",
    component: () => import("../components/accom/StopSales.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/exportcentre",
    name: "ExportCentre",
    component: () => import("../components/accom/Export.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/toexportcentre",
    name: "ExportCentre",
    component: () => import("../components/tour_operator/Export.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    component: () => import("../components/connectivity/UserProfile.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: () => import("../components/connectivity/ViewProfile.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/user-settings",
    name: "Usersettings",
    component: () => import("../components/settings/Settings.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/mailing-lists",
    name: "MailingLists",
    component: () => import("../components/connectivity/MailingLists.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/partners",
    name: "Partners",
    component: () => import("../components/Partners/PartnersContracts.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/dev-tools",
    name: "DevTools",
    component: () => import("../components/DeveloperTools/DevTools.vue"),
    beforeEnter: ifAuthenticated,
  },
  /* End side Dashboard links */
  /* Start top bar menues links */
  {
    path: "/premium-account",
    name: "AccountUpgrade",
    component: () => import("../components/Premium/PremiumUpgrade.vue"),
    beforeEnter: ifAuthenticated,
  },

  {
    path: "/authorized-users",
    name: "Authorizations",
    component: () => import("../components/connectivity/AuthorizedUsers.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/property/:id/:selectedTab",
    name: "AddFacts",
    component: () => import("../components/accom/AddFacts.vue"),
    beforeEnter: ifAuthenticated,
  },
  /* Start Facts input pages */
  {
    path: "/additional-facts",
    name: "AdditionalFactsComp",
    component: () => import("../components/facts/Additional.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/allinclusive-facts",
    name: "AllInclusiveFactsComp",
    component: () => import("../components/facts/AllInclusive.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/main-facts",
    name: "MainInfo",
    component: () => import("../components/facts/MainInfo.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/entertainment-facts",
    name: "EntertainmentFactsComp",
    component: () => import("../components/facts/Entertainment.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/environment-facts",
    name: "EnvironmentFactsComp",
    component: () => import("../components/facts/Environment.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/facilities-facts",
    name: "FacilitiesFactsComp",
    component: () => import("../components/facts/Facilities.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/food-facts",
    name: "FoodFactsComp",
    component: () => import("../components/facts/FoodAndBeverage.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/maintenance-facts",
    name: "MaintenanceFactsComp",
    component: () => import("../components/facts/Maintenance.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/rooms-facts",
    name: "RoomsFactsComp",
    component: () => import("../components/facts/Rooms.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/activities-facts",
    name: "ActivitiesFactsComp",
    component: () => import("../components/facts/SportsWellness.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/children-facts",
    name: "ChildrenFactsComp",
    component: () => import("../components/facts/Children.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/partnerhotel-facts",
    name: "PartnerHotelFactsComp",
    component: () => import("../components/facts/PartnerHotel.vue"),
    beforeEnter: ifAuthenticated,
  },
  /* End Facts input pages */
  /* Start connectivity folder links */
  {
    path: "/addauth-users/:id",
    name: "AddAuthorized",
    component: () => import("../components/connectivity/AddAuthUser.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/api-integrations",
    name: "APIIntegrations",
    component: () => import("../components/DeveloperTools/APIIntegration.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/display-widgets",
    name: "DisplayFactsWidget",
    component: () => import("../components/DeveloperTools/DisplayFacts.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/contract-details",
    name: "PartnerContract",
    component: () => import("../components/Partners/PartnerContract.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/contract-view",
    name: "ContractView",
    component: () => import("../components/Partners/ContractView.vue"),
    beforeEnter: ifAuthenticated,
  },
  /* {
    path: "/partners",
    name: "Partners",
    component: () => import("../components/accom/PartnersContracts.vue"),
    beforeEnter: ifAuthenticated,
  }, */
  /* End connectivity folder links */
  /* Start settings folder links */
  {
    path: "/audit-trail",
    name: "AuditTrail",
    component: () => import("../components/settings/AuditTrail.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/edit-companydetails",
    name: "CompanyDetailsChange",
    component: () => import("../components/settings/CompanyDetails.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/edit-layoutsettings",
    name: "LayoutSettingChange",
    component: () => import("../components/settings/LayoutDetails.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/edit-mailingdetails",
    name: "MailingSettingChange",
    component: () => import("../components/settings/MailingDetails.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/edit-notifications",
    name: "NotificationsSettingChange",
    component: () => import("../components/settings/NotificationsDetails.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/edit-paymentdetails",
    name: "PaymentSettingChange",
    component: () => import("../components/settings/PaymentDetails.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/subscribe",
    name: "subscribe",
    component: () => import("../components/settings/Subscribe.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/edit-preference",
    name: "PreferenceSettingChange",
    component: () => import("../components/settings/Preference.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/edit-securitysettings",
    name: "SecuritySettingChange",
    component: () => import("../components/settings/SecurityDetails.vue"),
    beforeEnter: ifAuthenticated,
  },
  /* End settings folder links */
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  /* Start account setup & authentication urls */
  {
    path: "/auth/activate/:uid/:token",
    name: "Activate",
    component: () => import("../login/ActivateSuccess.vue"),
  },
  {
    path: "/auth/password/reset/confirm/:uid/:token",
    name: "ResetConfirm",
    component: () => import("../login/ResetSuccess.vue"),
  },
  {
    path: "/auth/account/resend/activation",
    name: "ResendActivation",
    component: () => import("../login/ResendActivation.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../login/LoginPage.vue"),
    // beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../login/SignupPage.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/reset",
    name: "Reset",
    component: () => import("../login/ForgotPassword.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/fact-sheet",
    name: "FactSheet",
    component: () => import("../components/tour_operator/FactSheet.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/overridefact",
    name: "OverrideFacts",
    component: () => import("../components/tour_operator/OverrideFacts.vue"),
    beforeEnter: ifAuthenticated,
  },
  // {
  //   // otherwise redirect to home
  //   path: '*',
  //   redirect: '/',
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
