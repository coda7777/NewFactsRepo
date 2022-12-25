<template>
  <div id="app" :class="{ wrapper: isAuthenticated }">
    <Preloader v-if="isLoading"></Preloader>
    <div id="sidebar" :data="backgroundColor" class="sidebar text-left" v-if="isAuthenticated">
      <side-bar :data="backgroundColor" :sidebar-item-color="themeColor">
        <sidebar-link to="/">
          <b-icon icon="app-indicator" scale="1.2"> </b-icon>
          <p>Dashboard</p>
        </sidebar-link>
        <sidebar-link
          to="/add-property"
          v-if="accountType === 'accommodation' && (isManager || permissions.properties)"
        >
          <b-icon icon="bookmark-plus" scale="1.2"></b-icon>
          <p>Add Property</p>
        </sidebar-link>
        <sidebar-link to="/property-facts" v-if="accountType === 'accommodation'">
          <b-icon icon="building" scale="1.2"></b-icon>
          <p>Add Facts Info</p>
        </sidebar-link>
        <sidebar-link
          to="/property-photos"
          v-if="accountType === 'accommodation' && (isManager || permissions.photos)"
        >
          <b-icon icon="camera" scale="1.2"></b-icon>
          <p>Add Photos</p>
        </sidebar-link>
        <sidebar-link to="/fact-sheet" v-if="accountType === 'to'">
          <b-icon icon="building" scale="1.2"></b-icon>
          <p>Fact Sheet</p>
        </sidebar-link>
        <sidebar-link
          to="/property-stopsale"
          v-if="accountType === 'accommodation' && (isManager || permissions.properties)"
        >
          <b-icon icon="calendar3" scale="1.2"></b-icon>
          <p>Availability Chart</p>
        </sidebar-link>
        <sidebar-link
          to="/exportcentre"
          v-if="accountType === 'accommodation' && (isManager || permissions.properties)"
        >
          <b-icon icon="arrow90deg-down" scale="1.2"></b-icon>
          <p>Export Center</p>
        </sidebar-link>
        <sidebar-link to="/toexportcentre" v-if="accountType === 'to' && isManager">
          <b-icon icon="arrow90deg-down" scale="1.2"></b-icon>
          <p>Export Center</p>
        </sidebar-link>
        <sidebar-link to="/user-profile">
          <b-icon icon="person" scale="1.2"></b-icon>
          <p>User Profile</p>
        </sidebar-link>
        <sidebar-link to="/user-settings" v-if="isManager">
          <b-icon icon="gear" scale="1.2"></b-icon>
          <p>Settings</p>
        </sidebar-link>
        <sidebar-link to="/authorized-users" v-if="isManager">
          <b-icon icon="people" scale="1.2"></b-icon>
          <p>Authorized users</p>
        </sidebar-link>
        <sidebar-link to="/partners" class="active-pro">
          <b-icon icon="pen" scale="1.2"></b-icon>
          <p>Partners</p>
        </sidebar-link>
        <sidebar-link to="/dev-tools" class="active-pro">
          <b-icon icon="tools" scale="1.2">unarchive</b-icon>
          <p>Developers tools</p>
        </sidebar-link>
      </side-bar>
    </div>
    <router-view style="height: 100%" />
    <div id="nav" v-if="isAuthenticated">
      <b-navbar
        class="fixed-top"
        toggleable="md"
        type="light"
        fixed="top"
        position="Top"
        variant="light"
      >
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto form-inline">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
            <b-nav-item>
              <div class="flex">
                <div class="mode-toggle" @click="modeToggle">
                  <div class="toggle">
                    <div id="dark-mode" type="checkbox"></div>
                  </div>
                </div>
              </div>
            </b-nav-item>
            <b-nav-item-dropdown text="Lang" right disabled>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item>
              <div class="">
                <div id="notificationIcon">
                  <span style="padding: 0px; margin: 0px" @click="NotificationShow()">
                    <div class="">
                      <b-iconstack font-scale="2">
                        <b-icon stacked icon="circle-fill" variant="dark"></b-icon>
                        <b-icon stacked icon="bell-fill" scale="0.75" variant="white"></b-icon>
                      </b-iconstack>
                      <b-badge v-if="unreadNotifications > 0" variant="danger">{{
                        unreadNotifications
                      }}</b-badge>
                    </div>
                  </span>
                </div>
              </div>
            </b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ userInfo.firstName | capitalize }}</em>
              </template>
              <b-dropdown-item v-if="!isAuthenticated" href="/login/">Login</b-dropdown-item>
              <b-dropdown-item v-if="isAuthenticated" to="/user-profile/">Profile</b-dropdown-item>
              <hr />
              <b-dropdown-item v-if="isAuthenticated" to="/premium-account"
                >upgrade
              </b-dropdown-item>
              <b-dropdown-item v-if="isAuthenticated" to="/profile/">features</b-dropdown-item>
              <b-dropdown-item v-if="isAuthenticated" to="/profile/">help</b-dropdown-item>
              <hr />
              <b-dropdown-item v-if="isAuthenticated">
                <button class="btn" id="sign-out" @click="signOut()">Sign Out</button>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- Modal notifications @TODO -->
    <transition name="fade" appear>
      <div
        class="notification-modal-overlay"
        v-if="showNotification"
        @click="showNotification = false"
      >
        >
      </div>
    </transition>
    <transition name="fade" appear>
      <div class="lbhoex" v-if="showNotification">
        <div class="dYa-Dhf"></div>
        <div class="fbAMTp">
          <div>Notifications</div>
          <div>
            <div class="hFtMpe"></div>
            <router-link class="dhIetL" to="/user-settings">Settings</router-link>
          </div>
        </div>
        <div class="brzsUO">
          <div class="FfaBq">
            <Anananotice></Anananotice>
          </div>
        </div>
      </div>
    </transition>
    <!-- end @TODO -->
    <div v-if="isLoading" id="overlay">
      <Preloader></Preloader>
      <div class="loader">
        <svg id="svg-loader" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle class="load one" cx="60" cy="60" r="40" />
          <circle class="load two" cx="60" cy="60" r="40" />
          <circle class="load three" cx="60" cy="60" r="40" />
          <g>
            <circle class="point one" cx="45" cy="70" r="5" />
            <circle class="point two" cx="60" cy="70" r="5" />
            <circle class="point three" cx="75" cy="70" r="5" />
          </g>
        </svg>
      </div>
    </div>
    <div v-if="!isAuthenticated" href="/home/"></div>
    <footer class="container copyright" style="margin-top: 40px; clear: both; text-align: center">
      <div class="bold tiny">
        <a target="_blank" rel="noopener noreferrer nofollow" href="">About HotelsFacts.com</a>
        |
        <a target="_blank" rel="noopener noreferrer nofollow" href="">Customer Service help</a>
        |
        <a target="_blank" rel="noopener noreferrer nofollow" href="">Terms &amp; Conditions</a>
        |
        <a target="_blank" rel="noopener noreferrer nofollow" href=""
          >Privacy &amp; Cookie Statement</a
        >
      </div>
      <div class="">Copyright © 1996–2021 HotelFacts.com. All rights reserved.</div>
    </footer>
  </div>
</template>
<script>
import Preloader from "./components/layout/PreLoader.vue";
import Anananotice from "./components/layout/Notifications.vue";
export default {
  data() {
    return {
      isAuthenticatedOperator: false,
      themeColor: "ananas",
      /* themeColorImage: "", */
      showNotification: false,
      loadingProperties: false,
      darkMode: false,
    };
  },
  components: {
    Preloader,
    Anananotice,
  },
  computed: {
    unreadNotifications() {
      return this.$store.getters["notificationsArea/getUnread"];
    },
    isManager() {
      return this.$store.getters["user/isManager"];
    },
    permissions() {
      return this.$store.getters["user/getPermissions"];
    },
    backgroundColor() {
      return this.darkDark ? "dark" : "light";
    },
    properties() {
      return this.$store.getters["property/getProperties"];
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    isLoading() {
      return this.$store.getters["view/loadStatus"];
    },
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },
    darkDark() {
      return this.darkMode && "darkmode-toggled";
    },
    accountType() {
      return this.$store.getters["user/getUserType"];
    },
  },
  async created() {
    await this.getProperties();
    await this.getPermissions();
    this.getNotifications();

    /* if (await this.checkToken()) {
      await this.getProperties();
      await this.getPermissions();
      this.getNotifications();
      console.log("async created get notifications");
    } */
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    async checkToken() {
      await this.$store
        .dispatch("user/checkToken")
        .then((response) => {
          console.log(response);
          return true;
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/login");
          return false;
        });
    },
    async getPermissions() {
      if (this.isManager) {
        return;
      }
      this.loadingProperties = true;
      await this.$store.dispatch("user/retrievePermissions", this.userInfo.id);
    },
    getNotifications() {
      this.$store
        .dispatch("notificationsArea/getNotifications")
        .then(() => {})
        .catch(() => {});
    },
    async getProperties() {
      this.loadingProperties = true;
      const isAuthenticated = this.$store.getters["user/isAuthenticated"];
      if (!isAuthenticated) {
        return;
      }
      await this.$store
        .dispatch("property/getInfo")
        .then(() => {
          this.loadingProperties = false;
        })
        .catch(() => {
          this.loadingProperties = false;
        });
    },
    signOut() {
      this.$store.dispatch("user/destroyToken");
      this.$router.push("/login");
    },
    dark() {
      document.querySelector("body").classList.add("dark-mode");
      this.darkMode = true;
      this.$emit("dark");
    },
    NotificationShow() {
      this.showNotification = true;
    },
    light() {
      document.querySelector("body").classList.remove("dark-mode");
      this.darkMode = false;
      this.$emit("light");
    },

    modeToggle() {
      if (this.darkMode || document.querySelector("body").classList.contains("dark-mode")) {
        this.light();
      } else {
        this.dark();
      }
    },
  },
};
</script>
