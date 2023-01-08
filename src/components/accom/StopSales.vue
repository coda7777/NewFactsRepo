<template>
  <b-container>
    <!--     <b-row>
      <b-col cols="12">
        <div class="container-fluid">
          <h3 class="text-dark mb-1">
            <i class="fa fa-calendar" style="color: var(--indigo)"></i>&nbsp; Availability Charts
          </h3>
        </div>
        <div class="row">
          <div class="col-xl-6">
            <p>View and manage availability for your property's rooms. More Info</p>
          </div>
        </div>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col cols="10">
        <h4>Availability Charts</h4>
        <span
          >View and manage availability for your property's rooms. More Info
          <b-icon
            icon="question-circle-fill"
            scale="1.2"
            variant="primary"
            aria-label="Help"
          ></b-icon>
        </span>
      </b-col>
    </b-row>
    <br />
    <div>
      <b-row>
        <b-col cols="2" id="sideMenu" class="innerpage-sidebar">
          <div>
            <h4 style="text-align-last: center">Accommodations</h4>
            <b-list-group v-for="(property, index) in properties" :key="index">
              <b-list-group-item
                @click="changeSelectHotel(property.id)"
                href="#some-link"
                class="d-flex justify-content-between align-items-center"
              >
                {{ property.hotelName }}
                <b-spinner
                  v-show="property.id === getCurrentHotelID && getIsLoading"
                  small
                  variant="primary"
                  label="Spinning"
                ></b-spinner>
              </b-list-group-item>
            </b-list-group>
          </div>
          <br />
          <div>
            <h4 style="text-align-last: center">Calendars</h4>
            <b-list-group v-for="calinstance in calendarGroups" :key="calinstance.index">
              <b-list-group-item href="#" active>{{ calinstance }}</b-list-group-item>
            </b-list-group>
          </div>
          <div style="margin-top: 20px">
            <b-button variant="success" @click="newCalendarGroup()"
              >Create Another Calendar Group</b-button
            >
          </div>
          <hr style="margin-top: 30px; margin-bottom: 30px" />
          <div class="form-group anfilter nav justify-content-center">
            <h4>Group Mailing Option</h4>
            <b-form-select v-model="GroupMailToSend" :select-size="10">
              <option :value="null">Select Group</option>
              <option v-for="(list, index) in mailingLists" :key="index" :value="list.id">
                {{ list.name }}
              </option>
            </b-form-select>
          </div>
          <div style="margin: 30px 0px">
            <b-button to="/mailing-lists" variant="success">Manage Mailing Groups</b-button>
          </div>
        </b-col>
        <b-col cols="10">
          <b-row>
            <b-col cols="12">
              <div
                class="form-group row"
                style="background-color: #f9f9f9; padding: 30px; margin-left: 10px"
              >
                <span
                  >Default calendar is viewable and synced with connected Partners. To view or edit
                  current partners
                  <b-button variant="primary" size="sm" to="/partners">Partners</b-button>
                  For more info check documentation
                  <b-button variant="outline" to="#"
                    ><b-icon
                      icon="question-circle-fill"
                      scale="1.2"
                      variant="primary"
                      aria-label="Help"
                    ></b-icon
                  ></b-button>
                </span>
              </div>
            </b-col>
          </b-row>
          <Calendar />
        </b-col>
      </b-row>
    </div>
    <!-- <script
      type="application/javascript"
      src="//tp.media/content?promo_id=2811&shmarker=253385&campaign_id=100&trs=160975&color_button=%23FF0000&target_host=www.aviasales.com%2Fsearch&locale=en&powered_by=true&airline=&with_fallback=false&non_direct_flights=true&min_lines=5&border_radius=0&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&destination=BKK&origin=LON"
      charset="utf-8"
    ></script>
    <script
      type="apolication/javascript"
      width="50%"
      height="50%"
      src="http://127.0.0.1:8000/widgets/widgets"
    ></script>
    <iframe
      src="http://127.0.0.1:8000/widgets/widgets"
      width="100%"
      height="1000px"
      frameborder="0"
    ></iframe>
    <iframe src="http://localhost:8080/login" width="100%" height="1000px" frameborder="0">
    </iframe> -->
    <!-- <iframe
      src="http://127.0.0.1:8000/api/facts/property/1/publish/html"
      width="50%"
      height="200"
      frameborder="0"
    >
    </iframe>
    <script type="application/javascript" defer charset="utf-8">
      var iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      iframe.src = "http://127.0.0.1:8000/api/facts/property/1/publish/html";
      iframe.width = "100";
      iframe.height = "100";
    </script>
    <iframe
      width="560"
      height="315"
      src="http://127.0.0.1:8000/api/facts/property/1/publish/html"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/nIsrrgF-xGE"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe> -->
    <!-- <transition name="fade" appear>
      <div v-if="newCalendar">
        <div class="modal-overlay" v-if="newCalendar" @click="newCalendar = false"></div>
        <div class="modal">
          <header class="modalheader">
            <span
              class="h2 mb-2"
              font-scale="5"
              style="z-index: 99; float: right; position: relative"
              ><b-icon icon="x" @click="closeNewCal()"></b-icon
            ></span>
            <div class="modalheaderback">
              <svg
                width="100%"
                height="100"
                viewBox="0 0 617 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M404.455 250.978L454.886 250.978L480.102 207.303L454.886 163.628L404.455 163.628L379.239 207.303L404.455 250.978Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M404.455 163.633L454.886 163.633L480.102 119.958L454.886 76.2833L404.455 76.2833L379.239 119.958L404.455 163.633Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M253.15 250.978L303.581 250.978L328.797 207.303L303.581 163.628L253.15 163.628L227.935 207.303L253.15 250.978Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M110.276 236.421L143.897 236.421L160.707 207.304L143.897 178.188L110.276 178.188L93.4656 207.304L110.276 236.421Z"
                  stroke="#8eafef"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M101.857 250.978L152.288 250.978L177.504 207.303L152.288 163.628L101.857 163.628L76.6418 207.303L101.857 250.978Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M26.2167 207.302L76.6477 207.302L101.863 163.631L76.6478 119.956L26.2167 119.956L1.00111 163.631L26.2167 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M253.15 163.633L303.581 163.633L328.797 119.958L303.581 76.2833L253.15 76.2833L227.935 119.958L253.15 163.633Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M555.732 163.633L606.163 163.633L631.379 119.958L606.163 76.2833L555.732 76.2833L530.517 119.958L555.732 163.633Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M555.732 76.2795L606.163 76.2795L631.379 32.6049L606.163 -11.0698L555.732 -11.0698L530.517 32.6049L555.732 76.2795Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M480.095 207.302L530.523 207.302L555.738 163.631L530.523 119.956L480.095 119.956L454.88 163.631L480.095 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M631.391 207.302L681.822 207.302L707.037 163.631L681.822 119.956L631.391 119.956L606.175 163.631L631.391 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M328.803 207.302L379.234 207.302L404.449 163.631L379.234 119.956L328.803 119.956L303.587 163.631L328.803 207.302Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M328.803 32.6077L379.234 32.6077L404.449 -11.067L379.234 -54.7381L328.803 -54.7381L303.587 -11.067L328.803 32.6077Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M328.803 119.956L379.234 119.956L404.449 76.2809L379.234 32.6063L328.803 32.6063L303.587 76.2809L328.803 119.956Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M177.509 119.956L227.937 119.956L253.152 76.2809L227.937 32.6063L177.509 32.6063L152.29 76.2809L177.509 119.956Z"
                  stroke="#8eafef"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M404.449 163.632L454.88 163.629L480.099 207.296L530.523 207.3L555.738 250.974L530.523 294.649L480.092 294.649L454.88 338.324L404.442 338.324L379.233 294.649L404.449 250.974"
                  stroke="#8eafef"
                  stroke-width="2"
                  stroke-miterlimit="10"
                ></path>
              </svg>
            </div>
            <div class="partnerhead">
              <div class="row">
                <div class="col">
                  <h4 size="24" color="#34404E" class="">New Feature coming !</h4>
                </div>
              </div>
            </div>
          </header>
          <div class="modalcontainer">
            <div class="newFeature">
              <h5>
                <span class="featureDate">October 10st, 2022</span>
                <span class="badge badge-feature">FEATURE</span>

                Availability Charts (Stop sale calendar) additional groups
              </h5>
              <p>
                We know that your comfort is our highest priority, this is why we are working on
                adding additional calendar groups to give you the opporunity to create different
                calendars for different partners and non-partner affiliates from travel companies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Calendar from "../calendar/Calendar.vue";

export default {
  data() {
    return {
      currentHotel_ID: null,
      miniProfileModal: false,
      company: {
        company: "",
        address: "",
        contactNumber: "",
        logo: "",
      },
      selected: null,
      is_script_loading: false,
      GroupMailToSend: null,
      newCalendar: false,
    };
  },
  watch: {
    GroupMailToSend() {
      console.log(this.GroupMailToSend);
      this.SET_GROUP_MAIL_TO_SEND(this.GroupMailToSend);
    },
    getCurrentHotelID() {
      this.actionGetHotelRooms(this.currentHotel_ID);
    },
  },

  async created() {
    await this.getuserlists();
    this.getCompany();
    //this.getPartners();
  },
  computed: {
    ...mapGetters({
      getIsLoading: "calendar/getIsLoading",
      getCurrentHotelID: "calendar/getCurrentHotelID",
    }),
    /* userLists() {
      return this.$store.getters["settings/getuserLists"];
    }, */
    mailingLists() {
      return this.$store.getters["settings/getMailingLists"];
    },
    calendarGroups() {
      return this.$store.getters["calendar/getCalendarGroups"];
    },
    countries() {
      return this.$store.getters["countries/getCountries"];
    },
    properties() {
      return this.$store.getters["property/getProperties"];
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    /*partners() {
      return this.$store.getters["partners/getPartners"];
    },*/
  },
  components: {
    Calendar,
  },
  methods: {
    ...mapMutations({
      SET_CURRENT_HOTEL_ID: "calendar/SET_CURRENT_HOTEL_ID",
      SET_GROUP_MAIL_TO_SEND: "calendar/SET_GROUP_MAIL_TO_SEND",
    }),
    ...mapActions({
      actionGetHotelRooms: "calendar/getHotelRooms",
    }),
    changeSelectHotel(hotel_id) {
      this.isLoading = true;
      this.SET_CURRENT_HOTEL_ID(hotel_id);
    },

    async getuserlists() {
      await this.$store
        .dispatch("settings/getMailingLists")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          console.log(response);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          console.log(error);
        });
    },
    async getCountries() {
      await this.$store.dispatch("countries/retrieveCountries");
    },
    getCompany() {
      this.$store
        .dispatch("settings/retrieveCompany")
        .then(() => {
          this.company = this.$store.getters["settings/getCompany"];
        })
        .catch(() => {});
    },

    newCalendarGroup() {
      this.newCalendar = true;
    },
    closeNewCal() {
      this.newCalendar = false;
    },
  },
};
</script>
