<template>
  <div class="sidebar" :data-color="sidebarItemColor">
    <div class="logo">
      <a href="/">
        <div class="logo-mini">
          <img :src="imgLogo" :alt="title" />
        </div>
      </a>
      <a target="_blank" class="bold-text">
        {{ title }}
      </a>
      <a target="_blank" class="simple-text">
        {{ slogan }}
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <b-nav class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </b-nav>
    </div>
    <div class="footer" style="cursor: pointer" @click="newStuff()">
      <p class="h4 mb-2"><b-icon icon="flag-fill"></b-icon></p>
      What's new?
    </div>
    <transition name="fade" appear>
      <div v-if="newFeatures">
        <div class="modal-overlay" v-if="newFeatures" @click="newFeatures = false"></div>
        <div class="modal">
          <header class="modalheader">
            <span
              class="h2 mb-2"
              font-scale="5"
              style="z-index: 99; float: right; position: relative"
              ><b-icon icon="x" @click="closeStuff()"></b-icon
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
                  <h4 size="24" color="#34404E" class="">What's new in Ananas ?</h4>
                </div>
                <!-- PRO sign -->
                <!--                 <svg
                  width="80"
                  height="30"
                  viewBox="0 0 80 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="80" height="22" rx="5" fill="#1DC724"></rect>
                  <text
                    font-weight="bold"
                    letter-spacing="2px"
                    xml:space="preserve"
                    text-anchor="start"
                    font-family="Noto Sans JP"
                    font-size="12"
                    id="svg_6"
                    y="15"
                    x="4"
                    stroke-width="0"
                    stroke="#000"
                    fill="#ffffff"
                  >
                    PREMIUM
                  </text>
                </svg> -->
              </div>
            </div>
          </header>
          <div class="modalcontainer">
            <div class="newFeature">
              <h5>
                <span class="featureDate">January 1st, 2022</span>
                <span class="badge badge-feature">FEATURE</span>

                Ananas Facts gets new statistics!
              </h5>
              <p>
                We're happy to introduce new statistics to Ananas Facts with a new view count chart,
                total time watched chart and more coming soon!
              </p>
            </div>
            <div class="newFeature">
              <h5>
                <span class="featureDate">December 19th, 2021</span>
                <span class="badge badge-update">UPDATE</span>

                Ananas Facts gets new statistics!
              </h5>
              <p>
                We're happy to introduce new statistics to Ananas Facts with a new view count chart,
                total time watched chart and more coming soon!
              </p>
            </div>
            <div class="newFeature">
              <h5>
                <span class="featureDate">December 9th, 2021</span>
                <span class="badge badge-bug">BUG FIX</span>

                Ananas Facts gets new statistics!
              </h5>
              <p>
                We're happy to introduce new statistics to Ananas Facts with a new view count chart,
                total time watched chart and more coming soon!
              </p>
            </div>
            <div class="newFeature">
              <h5>
                <span class="featureDate">December 9th, 2021</span>
                <span class="badge badge-notice">NOTICE</span>

                Ananas Facts gets new statistics!
              </h5>
              <p>
                We're happy to introduce new statistics to Ananas Facts with a new view count chart,
                total time watched chart and more coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import SidebarLink from "./SideURLs.vue";

export default {
  data() {
    return {
      newFeatures: false,
    };
  },
  components: {
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: "Ananas",
    },
    slogan: {
      type: String,
      default: "Hotel Facts system",
    },
    /*     sidebarBackgroundImage: {
      type: String,
      default: require("@/assets/img/sidebar-2.jpg"),
    }, */
    imgLogo: {
      type: String,
      default: require("@/assets/logo-only.png"),
    },
    sidebarItemColor: {
      type: String,
      default: "ananas",
      validator: (value) => {
        let acceptedValues = ["ananas", "purple", "blue", "green", "orange", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    /*     sidebarStyle() {
      return {
        backgroundImage: `url(${this.sidebarBackgroundImage})`,
      };
    }, */
  },
  methods: {
    newStuff() {
      this.newFeatures = true;
    },
    closeStuff() {
      this.newFeatures = false;
    },
  },
};
</script>
