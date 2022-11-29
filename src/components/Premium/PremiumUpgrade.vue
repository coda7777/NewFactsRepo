<template>
  <div class="container">
    <h2>Account upgrade</h2>
    <b-row>
      <b-col cols="6">
        <b-row>
          <b-col>
            <div class="">
              <svg
                width="19"
                height="15"
                viewBox="0 0 17 13"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M5.81105 12.59L0 6.7792L1.93685
            4.84235L5.81105 8.7163L14.5271 0L16.464 1.93685L5.81105 12.59Z"
                  fill="#1DC724"
                ></path>
              </svg>
              <span>Marketplace</span>
            </div>
            <div class="">
              <svg
                width="19"
                height="15"
                viewBox="0 0 17 13"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M5.81105 12.59L0 6.7792L1.93685
            4.84235L5.81105 8.7163L14.5271 0L16.464 1.93685L5.81105 12.59Z"
                  fill="#1DC724"
                ></path>
              </svg>
              <span class="">OTAs</span>
            </div>
            <div class="">
              <svg
                width="19"
                height="15"
                viewBox="0 0 17 13"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M5.81105 12.59L0 6.7792L1.93685
            4.84235L5.81105 8.7163L14.5271 0L16.464 1.93685L5.81105 12.59Z"
                  fill="#1DC724"
                ></path>
              </svg>
              <span class="">Unlimited users</span>
            </div>
          </b-col>
          <b-col style="border-left: 1px solid rgb(221, 221, 221)">
            <div class="">
              <svg
                width="19"
                height="15"
                viewBox="0 0 17 13"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M5.81105 12.59L0 6.7792L1.93685
            4.84235L5.81105 8.7163L14.5271 0L16.464 1.93685L5.81105 12.59Z"
                  fill="#1DC724"
                ></path>
              </svg>
              <span class="">Web services</span>
            </div>
            <div class="">
              <svg
                width="19"
                height="15"
                viewBox="0 0 17 13"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M5.81105 12.59L0 6.7792L1.93685
            4.84235L5.81105 8.7163L14.5271 0L16.464 1.93685L5.81105 12.59Z"
                  fill="#1DC724"
                ></path>
              </svg>
              <span class="">Websites</span>
            </div>
            <div class="">
              <svg
                width="19"
                height="15"
                viewBox="0 0 17 13"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M5.81105 12.59L0 6.7792L1.93685
            4.84235L5.81105 8.7163L14.5271 0L16.464 1.93685L5.81105 12.59Z"
                  fill="#1DC724"
                ></path>
              </svg>
              <span class="">Widgets</span>
            </div>
          </b-col>
        </b-row>
        <hr />
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="primary">
                Partners intergration</b-button
              >
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <!--           <b-card-text>I start opened because</b-card-text> -->
                <!--             <code>Premium</code>
    -->
                <b-card-text>{{ partnerIntegration }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="info">
                Verified & Signed Facts sheet</b-button
              >
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="warning">
                More Photos space allocation</b-button
              >
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="danger">
                More Photos space allocation</b-button
              >
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="dark">
                More Photos space allocation</b-button
              >
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
      <b-col cols="5">
        <div class="container" style="padding: 25px; border: 1px solid orange; margin-top: 15px">
          <h3>Upgrade To Premium Now</h3>
          <p>choose your duration to be awesome</p>
          <b-card style="margin-bottom: 20px">
            <label>Premium plan</label>
            <br />
            <span style="font-size: 26px; font-weight: 400">€</span>
            <span style="font-size: 36px; font-weight: 700">10.99</span>/mo
          </b-card>
          <label style="font-weight: 600"
            >Upgrade duration<span class="text-danger"> * </span>
            <select style="width: 160px" v-model="proUpgradeDuration">
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
            </select>
          </label>
          <p style="color: grey">This amount will be charged today</p>
          <hr />
          <div style="display: grid; text-align-last: center">
            <b-button variant="success" @click="proUpgrade()">Upgrade Now</b-button>
            <br />
            <b-link>Learn more</b-link>
          </div>
          <b-card>
            <div>purchasing - form - order - excepteur</div>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="proWindow">
        <div class="modal">
          <header class="modalheader">
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
                  <h4 size="24" color="#34404E" class="">Upgrade to Premium Account</h4>
                </div>
                <!-- PRO sign -->
                <svg
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
                </svg>
              </div>
            </div>
          </header>
          <div class="modalcontainer">
            <form v-on:submit.prevent @submit="save()">
              <b-row>
                <b-col cols="8">
                  <b-row>
                    <b-col>
                      <label for="ccn">Credit Card Number:</label>
                      <b-input
                        id="ccn"
                        type="tel"
                        inputmode="numeric"
                        pattern="[0-9\s]{13,19}"
                        autocomplete="cc-number"
                        maxlength="19"
                        placeholder="xxxx xxxx xxxx xxxx"
                      />
                      <!-- <iframe
                        id="card-number-2f3ac3f1-7822-4c6f-9557-472e19ab2848_frame"
                        name="cb-component-number-3"
                        src="https://js.chargebee.com/v2/component-d8b25758cd72fc97fffb007be23cd4ca.html#extranet.bokun.io"
                        style="
                          margin: 0px;
                          padding: 0px;
                          border: none;
                          overflow: hidden;
                          display: block;
                          min-width: 100%;
                          width: 1px;
                          height: 1.2em;
                        "
                      ></iframe> -->
                    </b-col>
                    <b-col>
                      <label>Expiery Date:</label>
                      <b-input type="text" maxlength="6" placeholder="MMY/YYY" />
                    </b-col>
                    <b-col>
                      <label>CVC:</label>
                      <b-input type="text" maxlength="4" placeholder="cvc" />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <label>First Name</label>
                      <b-input type="text" name="firstname" placeholder="First Name" />
                    </b-col>
                    <b-col>
                      <label>Last Name</label>
                      <b-input type="text" name="lastname" placeholder="Last Name" />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <label>Address</label>
                      <b-input type="text" name="address" placeholder="Address" />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <label>Billing Country</label>
                      <b-form-select
                        size="sm"
                        label-field="Filter by country"
                        aria-placeholder="Filter by country"
                        title="Country"
                        v-model="selected"
                        :options="countries"
                      ></b-form-select>
                    </b-col>
                    <b-col>
                      <label>Zip Code</label>
                      <b-input type="text" name="zipcode"></b-input>
                    </b-col>
                  </b-row>
                  <div style="display: grid; text-align-last: center; margin-top: 30px">
                    <b-button size="lg" variant="success">Pay and Upgrade</b-button>
                  </div>
                </b-col>
                <b-col cols="4" style="border-left: 1px solid #b1c4ea">
                  <div>
                    <b>Subscription summary</b>
                    <hr />
                    <p><span>Ananas Premium Plan</span>&nbsp;<span>10.99</span><span> €</span></p>
                    <hr class="sc-NqARw dZcyqZ" />
                    <p class="sc-jcFjpl sc-brSHfi FBckQ kmbUkb">
                      <span>Due today</span>&nbsp;<span>131.88</span><span> €</span>
                    </p>
                  </div>
                </b-col>
              </b-row>
              <b-button variant="danger" type="button" class="modalbutton" @click="cancelPro()">
                Cancel
              </b-button>
            </form>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="themeChanger">
        <div class="modal">
          <header class="modalheader">
            <h5>Confirm</h5>
          </header>
          <p>Form of payment here</p>
          <button type="button" class="modalbutton" @click="cancel()">Cancel</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themeChanger: false,
      proWindow: false,
      partnerIntegration:
        "Premium plan gives you the advantage of choosing your own partners from the registered list of tour operation and make a contract for delivering your facts sheet in the most efficient and suitable way to the tour operator without delay. Also give them the advantage of choosing the photos and edit selectable fact detail to match their customer profile and distinguish them for more bookings attraction",
      verifiedFacts: "text goes here",
      PhotosDetails: "text here",
    };
  },
  computed: {
    countries() {
      return this.$store.getters["countries/getCountries"];
    },
  },
  methods: {
    proUpgrade() {
      this.proWindow = true;
    },
    cancelPro() {
      this.proWindow = false;
    },
  },
};
</script>
