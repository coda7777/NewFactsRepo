<template>
  <div class="" id="test-element">
    <div
      class="alert alert-dismissible fade"
      role="alert"
      data-dismiss="alert"
      :class="[alert.type, { show: alert.status, 'hidden-alert': !alert.status }]"
    >
      <strong>{{ alert.caption }}</strong> {{ alert.message }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="alert.status = false"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <b-container>
      <b-navbar toggleable="lg" type="primary" variant="info" class="dark-nav">
        <b-button
          v-if="isManager || permissions.export"
          variant="success"
          size="md"
          style="float: right"
          @click="publish"
          >save & publish <span v-if="loadPublish" class="spinner-border spinner-border-sm"></span
        ></b-button>
        <b-navbar-brand>Add Facts</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'general' }"
            @click="selectTab('general')"
            href="#"
            >General
            <span
              v-if="mainInfoErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="mainInfoErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'location' }"
            @click="selectTab('location')"
            href="#"
            >Location
            <span
              v-if="enviromentErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="enviromentErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'facilities' }"
            @click="selectTab('facilities')"
            href="#"
            >Facilities
            <span
              v-if="facilitiesInfoErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="facilitiesInfoErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'rooms' }"
            @click="selectTab('rooms')"
            href="#"
            >Rooms
            <span
              v-if="roomsInfoErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="roomsInfoErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'food-beverage' }"
            @click="selectTab('food-beverage')"
            href="#"
            >Food & Beverage
            <span
              v-if="foodAndBeverageErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="foodAndBeverageErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'all-inclusive' }"
            @click="selectTab('all-inclusive')"
            href="#"
            :disabled="boardsAvailables"
            >All Inclsuive
            <span
              v-if="allInclusiveErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="allInclusiveErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'sports-wellness' }"
            @click="selectTab('sports-wellness')"
            href="#"
            >Sports & Wellness
            <span
              v-if="sportsAndWellnessErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="sportsAndWellnessErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'children' }"
            @click="selectTab('children')"
            href="#"
            >Children
            <span
              v-if="childrenInfoErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="childrenInfoErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'entertainment' }"
            @click="selectTab('entertainment')"
            href="#"
            >Entertainment
            <span
              v-if="entertainmentErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="entertainmentErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'additional' }"
            @click="selectTab('additional')"
            href="#"
            >Additional
            <span
              v-if="additionalInfoErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="additionalInfoErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'maintenance' }"
            @click="selectTab('maintenance')"
            href="#"
            >Maintenance
            <span
              v-if="maintenanceInfoErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="maintenanceInfoErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
          <b-nav-item
            v-bind:class="{ active: selectedTab === 'partner-hotel' }"
            @click="selectTab('partner-hotel')"
            :disabled="partnerHotelAvailable"
            href="#"
            >Partner Hotel
            <span
              v-if="partnerHotelErrors !== ''"
              class="error-icon"
              v-b-tooltip.hover.v-danger
              :title="partnerHotelErrors"
            >
              <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
            </span>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-row>
        <b-col cols="12">
          <div v-show="selectedTab === 'general'" class="bg-grey-light p-8">
            <MainInformation ref="generalChild" />
          </div>
          <div v-show="selectedTab === 'location'" class="bg-grey-light p-8">
            <EnvironmentFactsComp ref="locationChild"></EnvironmentFactsComp>
          </div>
          <div v-show="selectedTab === 'facilities'" class="bg-grey-light p-8">
            <FacilitiesFactsComp ref="facilitiesChild"></FacilitiesFactsComp>
          </div>
          <div v-show="selectedTab === 'rooms'" class="bg-grey-light p-8">
            <RoomsFactsComp ref="roomsChild"></RoomsFactsComp>
          </div>
          <div v-show="selectedTab === 'food-beverage'" class="bg-grey-light p-8">
            <FoodFactsComp ref="food-beverageChild"></FoodFactsComp>
          </div>
          <div v-show="selectedTab === 'all-inclusive'" class="bg-grey-light p-8">
            <AllInclusiveFactsComp ref="all-inclusiveChild"></AllInclusiveFactsComp>
          </div>
          <div v-show="selectedTab === 'sports-wellness'" class="bg-grey-light p-8">
            <SportsAndWellnessFactsComp ref="sports-wellnessChild"></SportsAndWellnessFactsComp>
          </div>
          <div v-show="selectedTab === 'children'" class="bg-grey-light p-8">
            <ChildrenFactsComp ref="childrenChild"></ChildrenFactsComp>
          </div>
          <div v-show="selectedTab === 'entertainment'" class="bg-grey-light p-8">
            <EntertainmentFactsComp ref="entertainmentChild"></EntertainmentFactsComp>
          </div>
          <div v-show="selectedTab === 'additional'" class="bg-grey-light p-8">
            <AdditionalFactsComp ref="additionalChild"></AdditionalFactsComp>
          </div>
          <div v-show="selectedTab === 'maintenance'" class="bg-grey-light p-8">
            <MaintenanceFactsComp ref="maintenanceChild"></MaintenanceFactsComp>
          </div>
          <div v-show="selectedTab === 'partner-hotel'" class="bg-grey-light p-8">
            <PartnerHotelFactsComp ref="partner-hotelChild"></PartnerHotelFactsComp>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <router-view></router-view>
      </b-row>
      <CustomDialog
        v-model="showDialog"
        @cancel-changes="cancelDialog"
        @save-changes="saveDialog"
      />
    </b-container>
  </div>
</template>

<script>
import AdditionalFactsComp from "../facts/Additional.vue";
import AllInclusiveFactsComp from "../facts/AllInclusive.vue";
import ChildrenFactsComp from "../facts/Children.vue";
import EntertainmentFactsComp from "../facts/Entertainment.vue";
import EnvironmentFactsComp from "../facts/Environment.vue";
import FacilitiesFactsComp from "../facts/Facilities.vue";
import FoodFactsComp from "../facts/FoodAndBeverage.vue";
import MainInformation from "../facts/MainInfo.vue";
import MaintenanceFactsComp from "../facts/Maintenance.vue";
import RoomsFactsComp from "../facts/Rooms.vue";
import SportsAndWellnessFactsComp from "../facts/SportsWellness.vue";
import PartnerHotelFactsComp from "../facts/PartnerHotel.vue";
import CustomDialog from "../layout/CustomDialog.vue";

export default {
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    if (this.to) {
      next();
    } else {
      this.to = to;
      this.showDialog = true;
    }
  },
  /*   beforeRouteLeave(to, from, next) {
    //check here
    console.log("beforeLeaveRoute PageTwo");
    const answer = window.confirm(
      "Do you really want to leave? Any unsaved changes you have made will be lost !!!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  }, */
  data() {
    return {
      isLoading: false,
      retrievedTabs: [],
      loadPublish: false,
      alert: {
        status: false,
        type: "alert-warning",
        caption: "Success",
        message: "message",
      },
      to: null,
      showDialog: false,
    };
  },
  computed: {
    selectedTab() {
      return this.$route.params.selectedTab;
    },
    isManager() {
      return this.$store.getters["user/isManager"];
    },
    permissions() {
      return this.$store.getters["user/getPermissions"];
    },
    foodAndBeverage() {
      return this.$store.getters["foodAndBeverageFactsComp/getProperty"];
    },
    boardsAvailables() {
      console.log("checking board called");
      const boards = this.$store.getters["foodAndBeverageFactsComp/getProperty"].boardsAvailable;
      console.log(boards);
      return !boards.join().includes("All Inclusive");
    },
    partnerHotelAvailable() {
      return !this.$store.getters["mainInfo/getProperty"].checkInPartnerHotel;
    },
    mainInfoErrors() {
      return this.$store.getters["mainInfo/getErrors"].join("\n");
    },
    enviromentErrors() {
      return this.$store.getters["environmentFactsComp/getErrors"].join("\n");
    },
    facilitiesInfoErrors() {
      return this.$store.getters["facilitiesFactsComp/getErrors"].join("\n");
    },
    roomsInfoErrors() {
      return this.$store.getters["roomsFactsComp/getErrors"].join("\n");
    },
    foodAndBeverageErrors() {
      return this.$store.getters["foodAndBeverageFactsComp/getErrors"].join("\n");
    },
    allInclusiveErrors() {
      return this.$store.getters["allInclusiveFactsComp/getErrors"].join("\n");
    },
    childrenInfoErrors() {
      return this.$store.getters["childrenFactsComp/getErrors"].join("\n");
    },
    entertainmentErrors() {
      return this.$store.getters["entertainmentFactsComp/getErrors"].join("\n");
    },
    additionalInfoErrors() {
      return this.$store.getters["additionalFactsComp/getErrors"].join("\n");
    },
    maintenanceInfoErrors() {
      return this.$store.getters["maintenanceFactsComp/getErrors"].join("\n");
    },
    sportsAndWellnessErrors() {
      return this.$store.getters["sportsAndWellnessFactsComp/getErrors"].join("\n");
    },
    partnerHotelErrors() {
      return this.$store.getters["partnerHotelFactsComp/getErrors"].join("\n");
    },
    hasErrors() {
      return (
        this.mainInfoErrors !== "" ||
        this.enviromentErrors !== "" ||
        this.facilitiesInfoErrors !== "" ||
        this.roomsInfoErrors !== "" ||
        this.foodAndBeverageErrors !== "" ||
        this.allInclusiveErrors !== "" ||
        this.childrenInfoErrors !== "" ||
        this.entertainmentErrors !== "" ||
        this.additionalInfoErrors !== "" ||
        this.maintenanceInfoErrors !== "" ||
        this.sportsAndWellnessErrors !== "" ||
        this.partnerHotelErrors !== ""
      );
    },
  },
  components: {
    AdditionalFactsComp,
    AllInclusiveFactsComp,
    ChildrenFactsComp,
    EntertainmentFactsComp,
    EnvironmentFactsComp,
    FacilitiesFactsComp,
    FoodFactsComp,
    MainInformation,
    MaintenanceFactsComp,
    RoomsFactsComp,
    SportsAndWellnessFactsComp,
    PartnerHotelFactsComp,
    CustomDialog,
  },
  mounted() {
    this.callInfo();
    window.onbeforeunload = () => "Are you sure you want to leave?";
  },
  methods: {
    async publish() {
      // Save current tab
      let refName = `${this.selectedTab}Child`;
      if (this.isManager || this.permissions.facts) {
        await this.$refs[refName].save();
      }
      console.log("errors result", this.partnerHotelErrors);
      console.log("result", this.hasErrors);
      if (this.hasErrors) {
        this.alert = {
          status: true,
          type: "alert-danger",
          caption: "Error!",
          message: "The property was not published. Please check the errors.",
        };
        console.log("failed");
        return;
      }
      const id = this.$route.params.id;
      this.loadPublish = true;
      await this.$store
        .dispatch("property/publishProperty", id)
        .then(() => {
          this.loadPublish = false;
          this.alert = {
            status: true,
            type: "alert-success",
            caption: "Success!",
            message: "The property was published successfully.",
          };
        })
        .catch(() => {
          this.loadPublish = false;
          this.alert = {
            status: true,
            type: "alert-warning",
            caption: "Failure!",
            message: "Unable to publish. Please fix the pending errors.",
          };
        });
    },
    selectTab(tabToSelect) {
      // save prev tab
      if (this.selectedTab !== "") {
        let refName = `${this.selectedTab}Child`;
        /* console.log(`tabs are ${tabToSelect} against: ${this.$route.params.selectedTab}`);
         */ // apply save if the user is authorized
        if (this.isManager || this.permissions.facts) {
          this.$refs[refName].save();
        }
        if (tabToSelect !== this.$route.params.selectedTab) {
          this.$router.push(`/property/${this.$route.params.id}/${tabToSelect}`);
          refName = `${this.$route.params.selectedTab}Child`;
          if (!this.retrievedTabs.includes(refName)) {
            this.retrievedTabs.push(refName);
            this.$refs[refName].getInfo();
          }
        }
      }
    },
    callInfo() {
      this.isLoading = true;
      const refName = `${this.$route.params.selectedTab}Child`;
      this.retrievedTabs.push(refName);
      /* console.log(refName);
       */ this.$refs[refName].getInfo();
      this.isLoading = false;
    },
    exportPdf() {
      /* console.log("exporting...");
       */
    },
    cancelDialog() {
      if (this.selectedTab !== "") {
        let refName = `${this.selectedTab}Child`;
        if (this.isManager || this.permissions.facts) {
          this.$refs[refName].save();
        }
      }
      this.showDialog = false;
      this.to = null;
    },

    saveDialog() {
      if (this.selectedTab !== "") {
        let refName = `${this.selectedTab}Child`;
        if (this.isManager || this.permissions.facts) {
          this.$refs[refName].save();
        }
      }
      this.showDialog = false;
      this.$router.push(this.to);
    },
  },
};
</script>
<style scoped>
.hidden-alert {
  display: none;
}
</style>
