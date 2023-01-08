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
                <b-card-text>{{ verifiedFacts }}</b-card-text>
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
                <b-card-text>{{ PhotosDetails }}</b-card-text>
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
                <b-card-text>{{ PhotosDetails }}</b-card-text>
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
                <b-card-text>{{ PhotosDetails }}</b-card-text>
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
              <option value="3" selected>3 years</option>
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
    <!-- Main Page End  -->
    <!-- Temporary Page start  -->
    <div class="row row-cols-1 row-cols-md-3 g-3">
      <PakageItem v-for="p in pakages" :key="p.id" :pakage="p" />
    </div>
    <!-- Temporary Page End  -->
    <!-- Transition modals Start-->
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
                      <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <div
                          class="input-group"
                          :class="{
                            'input-group':
                              card &&
                              card.type &&
                              [
                                'visa',
                                'visa-electron',
                                'amex',
                                'mastercard',
                                'dinersclub',
                                'discover',
                                'jcb',
                              ].includes(card.type),
                          }"
                        >
                          <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': form.errors.cardNumber }"
                            id="cardNumber"
                            v-model="form.values.cardNumber"
                            placeholder="Enter card number..."
                            :readonly="state.processing"
                            required
                          />
                          <div
                            class="input-group-append"
                            v-if="
                              card &&
                              card.type &&
                              [
                                'visa',
                                'visa-electron',
                                'amex',
                                'mastercard',
                                'dinersclub',
                                'discover',
                                'jcb',
                              ].includes(card.type)
                            "
                          >
                            <span class="input-group-text">
                              {{ ccIcon }}
                            </span>
                          </div>
                        </div>
                        <div
                          class="invalid-feedback invalid-feedback-show"
                          style="display: block"
                          v-if="form.errors.cardNumber"
                        >
                          {{ form.errors.cardNumber }}
                        </div>
                        <small class="text-muted" v-if="!form.errors.cardNumber"
                          >Long number as displayed on card</small
                        >
                      </div>
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
                      <div class="form-row">
                        <div class="form-group col-12 col-sm-4">
                          <label for="cardExpiryMonth">Expiry Date</label>
                          <select
                            id="cardExpiryMonth"
                            v-model="form.values.cardExpiryMonth"
                            class="form-control"
                            :class="{ 'is-invalid': form.errors.cardExpiryMonth }"
                            required="required"
                            :readonly="state.processing"
                          >
                            <option value="" selected disabled="disabled">Select month:</option>
                            <option value="01">01 - Jan</option>
                            <option value="02">02 - Feb</option>
                            <option value="03">03 - Mar</option>
                            <option value="04">04 - Apr</option>
                            <option value="05">05 - May</option>
                            <option value="06">06 - Jun</option>
                            <option value="07">07 - Jul</option>
                            <option value="08">08 - Aug</option>
                            <option value="09">09 - Sep</option>
                            <option value="10">10 - Oct</option>
                            <option value="11">11 - Nov</option>
                            <option value="12">12 - Dec</option>
                          </select>
                          <div
                            class="invalid-feedback invalid-feedback-show"
                            style="display: block"
                            v-if="form.errors.cardExpiryMonth"
                          >
                            {{ form.errors.cardExpiryMonth }}
                          </div>
                          <div
                            class="invalid-feedback invalid-feedback-show"
                            style="display: block"
                            v-if="form.errors.cardExpiry"
                          >
                            {{ form.errors.cardExpiry }}
                          </div>
                        </div>
                        <div class="form-group col-12 col-sm-4">
                          <label for="cardExpiryYear">&nbsp;</label>
                          <select
                            id="cardExpiryYear"
                            v-model.number="form.values.cardExpiryYear"
                            :class="{ 'is-invalid': form.errors.cardExpiryYear }"
                            class="form-control"
                            required="required"
                            :readonly="state.processing"
                          >
                            <option value="" selected disabled="disabled">Select year:</option>
                            <option
                              :value="y - 2000"
                              v-for="y in range(
                                new Date().getFullYear(),
                                new Date().getFullYear() + 20
                              )"
                            >
                              {{ y }}
                            </option>
                          </select>
                          <div
                            class="invalid-feedback invalid-feedback-show"
                            style="display: block"
                            v-if="form.errors.cardExpiryYear"
                          >
                            {{ form.errors.cardExpiryYear }}
                          </div>
                        </div>

                        <div class="form-group col-12 col-sm-3">
                          <label for="cardCvv">CVV</label>
                          <div class="input-group">
                            <input
                              type="text"
                              maxlength="4"
                              class="form-control"
                              :class="{ 'is-invalid': form.errors.cardCvv }"
                              id="cardCvv"
                              v-model="form.values.cardCvv"
                              placeholder="Enter CVV number..."
                              required="required"
                              :readonly="state.processing"
                            />
                          </div>
                        </div>
                        <div
                          class="invalid-feedback invalid-feedback-show"
                          style="display: block"
                          v-if="form.errors.cardCvv"
                        >
                          {{ form.errors.cardCvv }}
                        </div>
                        <small class="text-muted" v-if="!form.errors.cardCvv">
                          {{
                            !card || !card.type || (card && card.cvcLength.length === 0)
                              ? "Three or four-digit number printed on the back of the card"
                              : ""
                          }}
                          {{
                            card && card.cvcLength.length === 1
                              ? "Three digit number printed on the back of the card"
                              : ""
                          }}
                          {{
                            card && card.cvcLength.length === 2
                              ? "Three or four-digit number printed on the back of the card"
                              : ""
                          }}
                        </small>
                      </div>
                    </b-col>
                    <!--                     <b-col>
                      <label>CVC:</label>
                      <b-input type="text" maxlength="4" placeholder="cvc" />
                    </b-col> -->
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <label for="customerName">Cardholder's Name</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': form.errors.customerName }"
                        v-model="form.values.customerName"
                        placeholder="Enter name as shown on card..."
                        :readonly="state.processing"
                        required
                      />
                      <div
                        class="invalid-feedback invalid-feedback-show"
                        style="display: block"
                        v-if="form.errors.customerName"
                      >
                        {{ form.errors.customerName }}
                      </div>
                      <small class="text-muted" v-if="!form.errors.customerName"
                        >Full name as displayed on card</small
                      >
                    </b-col>
                  </b-row>
                  <hr />
                  <b-row>
                    <b-col>
                      <h5>Billing Address</h5>
                      <small>
                        Please enter the same address which is registered with your card issuer,
                        it's important to enter this correctly or the payment will fail the address
                        verification check (AVS).<br />
                      </small>
                    </b-col>
                  </b-row>
                  <br />
                  <b-row>
                    <div class="form-group col-sm-6">
                      <label for="address">Address Line 1</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': form.errors.address_1 }"
                        id="address"
                        v-model="form.values.address_1"
                        placeholder="Enter the first line of your address..."
                        :readonly="state.processing"
                        required
                      />
                      <div class="invalid-feedback" v-if="form.errors.address_1">
                        {{ form.errors.address_1 }}
                      </div>
                    </div>

                    <div class="form-group col-sm-6">
                      <label for="address2">Address Line 2</label>
                      <input
                        type="text"
                        class="form-control"
                        id="address2"
                        v-model="form.values.address_2"
                        placeholder="Enter the second line of your address..."
                        :readonly="state.processing"
                      />
                      <div class="invalid-feedback" v-if="form.errors.address_2">
                        {{ form.errors.address_2 }}
                      </div>
                    </div>
                  </b-row>
                  <b-row>
                    <div class="form-group col-12 col-sm-4">
                      <label for="town">City</label>
                      <input
                        type="text"
                        id="town"
                        v-model="form.values.town"
                        class="form-control"
                        :class="{ 'is-invalid': form.errors.town }"
                        placeholder="Enter City..."
                        :readonly="state.processing"
                        required
                      />
                      <div class="invalid-feedback" v-if="form.errors.town">
                        {{ form.errors.town }}
                      </div>
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="country">Country</label>
                      <select
                        class="form-control"
                        v-model="form.values.country"
                        :options="countries"
                      >
                        <option value="null" selected>--Select Country--</option>
                        <option v-for="(k, index) in countries" :key="index" :value="k.iso2">
                          {{ k.name }}
                        </option>
                      </select>
                      <div class="invalid-feedback" v-if="form.errors.country">
                        {{ form.errors.country }}
                      </div>
                    </div>
                    <div class="form-group col-12 col-sm-3">
                      <label for="postcode">Post/Zip Code</label>
                      <input
                        id="postcode"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-warning': form.warnings.postcode,
                          'is-invalid': form.errors.postcode,
                        }"
                        v-model="form.values.postcode"
                        placeholder="Enter your postcode..."
                        :readonly="state.processing"
                        autocomplete="postal-code"
                        required
                      />
                      <div
                        class="invalid-feedback"
                        v-if="form.errors.postcode && !form.warnings.postcode"
                      >
                        {{ form.errors.postcode }}
                      </div>
                      <small class="form-text text-muted" v-if="form.warnings.postcode">{{
                        form.warnings.postcode
                      }}</small>
                    </div>
                  </b-row>

                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input mb-1"
                      v-model="form.values.tos_agree"
                      :class="{ 'is-invalid': form.errors.tos_agree }"
                      id="tos_agree"
                      :readonly="state.processing"
                    />
                    <label class="custom-control-label tos_agree-label mb-1" for="tos_agree">
                      Agree to our
                      <a href="/terms-and-conditions/" target="_blank">terms &amp; conditions</a>.
                    </label>
                    <div class="invalid-feedback" v-if="form.errors.tos_agree">
                      {{ form.errors.tos_agree }}
                    </div>
                  </div>

                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      v-model="form.values.ca_agree"
                      :class="{ 'is-invalid': form.errors.ca_agree }"
                      id="ca_agree"
                      :readonly="state.processing"
                    />
                    <label class="custom-control-label ca_agree-label mb-1" for="ca_agree"
                      >Enable recurring payments, I authorize Payment automatically when
                      subscription charge is due.</label
                    >
                    <div class="invalid-feedback" v-if="form.errors.ca_agree">
                      {{ form.errors.ca_agree }}
                    </div>
                  </div>

                  <button
                    class="btn btn-primary btn-md btn-block"
                    type="button"
                    @click="submit()"
                    :class="{ disabled: state.processing }"
                    :disabled="state.processing"
                  >
                    <fa icon="spinner" v-if="state.processing" pulse></fa> Confirm &amp; Pay
                  </button>

                  <div class="text-center text-danger" v-if="form.errors['test-mode']">
                    {{ form.errors["test-mode"] }}
                  </div>

                  <small class="text-center text-muted mt-2 font-weight-bold">
                    The next screen will be the payment card verification through your card issuer.
                  </small>
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
import jwtInterceptor from "../../store/modules/jwtInterceptor";
import PakageItem from "../Premium/PakageItem.vue";
export default {
  props: {
    state: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      pakages: [],
      themeChanger: false,
      proWindow: false,
      proUpgradeDuration: 3,
      partnerIntegration:
        "Premium plan gives you the advantage of choosing your own partners from the registered list of tour operation and make a contract for delivering your facts sheet in the most efficient and suitable way to the tour operator without delay. Also give them the advantage of choosing the photos and edit selectable fact detail to match their customer profile and distinguish them for more bookings attraction",
      verifiedFacts: "text goes here",
      PhotosDetails: "text here",
      loading: true,
      login_id: 0,
      alert: {},
      form: {
        errors: {},
        warnings: {},
        values: {
          id: 0,
          token: "",
          firstName: "",
          lastName: "",
          email: "",
          customerName: "",
          address_1: "",
          address_2: "",
          town: "",
          country: "",
          county: "",
          postcode: "",
          tos_agree: false,
          receiptRequired: false,
          coupon: {},
          plan: {},
          cardNumber: "",
          cardExpiryMonth: "",
          cardExpiryYear: "",
          cardCvv: "",
        },
      },
      payment: {},
      payment_fail: 0,
      acsProgress: {
        label: "",
        percent: 0,
        status: "",
      },
      defaultFormat: /(\d{1,4})/g,
      cards: [
        {
          type: "visa-electron",
          pattern: /^4(026|17500|405|508|844|91[37])/,
          format: null,
          length: [16],
          cvcLength: [3],
          luhn: true,
        },
        {
          type: "maestro",
          pattern: /^(5(018|0[23]|[68])|6(39|7))/,
          format: null,
          length: [12, 13, 14, 15, 16, 17, 18, 19],
          cvcLength: [3],
          luhn: true,
        },
        {
          type: "dankort",
          pattern: /^5019/,
          format: null,
          length: [16],
          cvcLength: [3],
          luhn: true,
        },
        {
          type: "visa",
          pattern: /^4/,
          format: null,
          length: [13, 16],
          cvcLength: [3],
          luhn: true,
        },
        {
          type: "mastercard",
          pattern: /^(5[1-5]|2[2-7])/,
          format: null,
          length: [16],
          cvcLength: [3],
          luhn: true,
        },
        {
          type: "amex",
          pattern: /^3[47]/,
          format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
          length: [15],
          cvcLength: [3, 4],
          luhn: true,
        },
        {
          type: "dinersclub",
          pattern: /^3[0689]/,
          format: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,2})?/,
          length: [14],
          cvcLength: [3],
          luhn: true,
        },
        {
          type: "discover",
          pattern: /^6([045]|22)/,
          format: null,
          length: [16],
          cvcLength: [3],
          luhn: true,
        },
        {
          type: "chinaunionpay",
          pattern: /^(62|88)/,
          format: null,
          length: [16, 17, 18, 19],
          cvcLength: [3],
          luhn: false,
        },
        {
          type: "jcb",
          pattern: /^35/,
          format: null,
          length: [16],
          cvcLength: [3],
          luhn: true,
        },
      ],
    };
  },
  components: { PakageItem },
  computed: {
    countries() {
      return this.$store.getters["countries/getCountries"];
    },
    card: function () {
      if (!this.form.values.cardNumber) {
        return { type: false, pattern: {}, format: {}, length: [], cvcLength: [], luhn: false };
      }
      return this.cardFromNumber(this.form.values.cardNumber);
    },
    ccIcon: function () {
      let icon = ["fab"];
      if ((this.card && this.card.type === "visa") || this.card.type === "visa-electron")
        icon.push("cc-visa");
      if (this.card && this.card.type === "amex") icon.push("cc-amex");
      if (this.card && this.card.type === "mastercard") icon.push("cc-mastercard");
      if (this.card && this.card.type === "dinersclub") icon.push("cc-diners-club");
      if (this.card && this.card.type === "discover") icon.push("cc-discover");
      if (this.card && this.card.type === "jcb") icon.push("cc-jcb");

      return icon;
    },
  },
  watch: {
    "form.values.cardNumber": function (newValue) {
      this.form.values.cardNumber = this.formatCardNumber(newValue);
    },
    "form.values.receiptRequired": function (newValue) {
      if (newValue) {
        if (!this.isValidEmail(this.form.values.email)) {
          this.form.errors.email = "Please enter a valid email address.";
        }
      }
    },
  },
  created() {
    this.getCountries();
    this.loadPakages();

    document.addEventListener("beforeunload", this.cancelAcs);
  },
  methods: {
    async getCountries() {
      this.loadCountry = true;
      await this.$store.dispatch("countries/retrieveCountries").then(() => {
        this.loadCountry = false;
      });
    },
    async loadPakages() {
      await jwtInterceptor
        .get("api/payments/packages/")
        .then((res) => {
          this.pakages = res.data.results;
        })
        .catch((err) => {
          console.log("Packages", err);
        });
    },
    submit(noPayment) {
      this.payment = {};

      var errors = (this.form.errors = {});

      if (!noPayment) {
        if (!this.form.values.firstName) {
          errors.firstName = "First name is a required field.";
        }

        if (!this.form.values.address_1) {
          errors.address_1 = "Required field.";
        }

        if (!this.form.values.town) {
          errors.town = "Required field.";
        }

        if (!this.form.values.country) {
          errors.country = "Required field.";
        }

        if (!this.form.values.postcode) {
          if (this.form.warnings.postcode) {
            this.$delete(this.form.warnings, "postcode");
          }
          errors.postcode = "Required field.";
        }

        if (!this.form.values.customerName) {
          errors.customerName = "Required field.";
        } else if (this.form.values.customerName.length === 4) {
          errors.customerName = "Please enter name as shown on card.";
        }

        if (!this.form.values.cardNumber) {
          errors.cardNumber = "Required field.";
        } else if (!this.validateCardNumber(this.form.values.cardNumber)) {
          errors.cardNumber = "Invalid card number.";
        }

        if (!this.form.values.cardCvv) {
          errors.cardCvv = "Required field.";
        } else if (!errors.cardNumber) {
          if (
            !this.validateCardCVC(
              this.form.values.cardCvv,
              this.cardFromNumber(this.form.values.cardNumber).type
            )
          ) {
            var card = this.cardFromNumber(this.form.values.cardNumber);
            if (!card) {
              errors.cardNumber = "We currently only accept Visa or MasterCard.";
            } else {
              errors.cardCvv =
                "Please enter last " +
                card.cvcLength.join("/") +
                " digits of number shown on back of card.";
            }
          }
        }

        if (!this.form.values.cardExpiryYear) {
          errors.cardExpiryYear = "Required field.";
        }

        if (!this.form.values.cardExpiryMonth) {
          errors.cardExpiryMonth = "Required field.";
        }

        if (
          !errors.cardExpiryYear &&
          !errors.cardExpiryMonth &&
          !this.validateCardExpiry(
            this.form.values.cardExpiryMonth,
            this.form.values.cardExpiryYear
          )
        ) {
          errors.cardExpiry = "Card has expired.";
        }

        if (this.form.values.receiptRequired) {
          if (!this.isValidEmail(this.form.values.email)) {
            this.form.errors.email = "Please enter a valid email address.";
          }
        }
      }

      if (this.form.values.plan.magazine) {
        if (!this.form.values.magazine.address_1) {
          errors.magazine_address_1 = "Required field.";
        }

        if (!this.form.values.magazine.town) {
          errors.magazine_town = "Required field.";
        }

        if (!this.form.values.magazine.country) {
          errors.magazine_country = "Required field.";
        }

        if (!this.form.values.magazine.postcode) {
          errors.magazine_postcode = "Required field.";
        } else if (this.form.values.magazine.postcode && this.form.warnings.magazine_postcode) {
          this.$delete(this.form.warnings, "magazine_postcode");
          errors.magazine_postcode = "Please enter a valid postcode.";
        }
      }

      //
      if (!this.form.values.tos_agree) {
        errors.tos_agree = "You must accept our terms and conditions.";
      }

      if (Object.keys(errors).length) {
        this.form.errors = errors;
        return;
      }

      //
      this.setAcsProgress({
        label: "Starting transaction",
        percent: 10,
        status: "initial",
      });

      this.$ajax
        .post("/subscription/subscribe?process=start", this.form.values)
        .done((data) => {
          if (data.success) {
            if (!noPayment) {
              if (data.payment.request.responseCode === 0) {
                this.payment = data.payment;
                //
                this.setAcsProgress({
                  label: "Completed, redirecting",
                  percent: 100,
                  status: "success",
                });
                return;
              }

              //
              this.setAcsProgress({
                label: "Authorising payment request",
                percent: 20,
                status: "initial",
              });

              this.payment = data.payment;

              // apply an onload function to the 3ds staging iframe
              //  - to handle resizing the iframe to the inner contents height
              //  - scale the iframe to fit the ugly fixed size 400x400 3ds verification page on tiny resolution mobiles
              this.$nextTick(function () {
                this.$refs["acs-frame"].onload = function () {
                  try {
                    //
                    this.height = this.contentWindow.document.body.scrollHeight + "px";

                    // fix for mobiles with screens < 400px
                    if (
                      this.contentWindow.document.body.clientWidth > this.parentElement.offsetWidth
                    ) {
                      this.style.transform =
                        "scale(" +
                        this.parentElement.offsetWidth /
                          this.contentWindow.document.body.clientWidth +
                        ")";

                      //this.style.marginBottom = App.globals.devicetype === 'phone' ? '-50px' : '-90px';
                    } else {
                      // this.style.marginTop = '20px';
                      //this.style.marginBottom = '20px';
                    }
                    //
                    window.scrollTo(0, 0);
                    // eslint-disable-next-line no-empty
                  } catch (e) {}
                };
              });
            } else {
              //
              this.setAcsProgress({
                label: "Completed",
                percent: 100,
                status: "success",
              });
            }
          } else {
            //
            this.setAcsProgress({
              label: "",
              percent: 0,
              status: "",
            });

            this.form.errors = data.errors;

            if (data.errors.plan) {
              this.form.values.plan = {};
              this.alert = {
                type: "alert-danger",
                message: data.errors.plan,
                dismissible: true,
              };
            }
          }
        })
        // eslint-disable-next-line no-unused-vars
        .fail((err) => {
          this.alert = {
            type: "alert-danger",
            message:
              "Failed to take payment, please check entered details are correct and try again, if the problem persists please contact us for further details.",
            dismissible: false,
          };
        });
    },
    setAcsProgress(progress) {
      if (typeof progress === "string") progress = JSON.parse(progress);
      this.acsProgress = progress;
    },
    cancelAcs() {
      this.resetPayment();
    },
    resetPayment(error) {
      this.payment = {};
      this.acsProgress = {
        label: "",
        percent: 0,
        status: "",
      };

      if (error) {
        this.payment_fail++;
        this.alert = {
          type: "alert-danger",
          message:
            "Payment failed, reason: " +
            error +
            ". Please check and try again, note that repeated failed payment attempts will be detected as fraud, please take your time to enter the correct details. Thank you.",
          dismissible: true,
        };
      } else {
        this.alert = {
          type: "alert-danger",
          message: "Your payment was aborted.",
          dismissible: true,
        };
      }

      if (this.payment_fail >= 3) {
        window.parent.location = "/register";
      }

      this.$forceUpdate();
    },
    isValidEmail(str) {
      var regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(str).toLowerCase());
    },
    range(start, end, step) {
      // ascii a-z
      if (typeof start === "string" && typeof end === "string") {
        var result = [];
        for (var idx = start.charCodeAt(0), e = end.charCodeAt(0); idx <= e; ++idx) {
          result.push(String.fromCharCode(idx));
        }
        return result;
      }
      // number or date
      const range = [];
      typeof step === "undefined" && (step = 1);
      if (end < start) step = -step;
      while (step > 0 ? end >= start : end <= start) {
        range.push(start);
        start += step;
      }
      return range;
    },
    restrictNumericAndSpace: function (e) {
      if (e.metaKey || e.ctrlKey || e.which < 32) {
        return true;
      }

      if (e.which === 46) {
        return e.preventDefault();
      }

      var input = String.fromCharCode(e.which);
      if (!/[\d\s]/.test(input)) {
        return e.preventDefault();
      }

      return true;
    },
    restrictNumeric: function (e) {
      if (e.metaKey || e.ctrlKey || e.which < 32) {
        return true;
      }

      if (e.which === 32) {
        return e.preventDefault();
      }

      var input = String.fromCharCode(e.which);
      if (!/[\d\s]/.test(input)) {
        return e.preventDefault();
      }

      return true;
    },
    cardFromNumber: function (num) {
      var card, j, len;

      num = (num + "").replace(/\D/g, "");
      for (j = 0, len = this.cards.length; j < len; j++) {
        card = this.cards[j];
        if (card.pattern.test(num)) {
          return card;
        }
      }
    },
    cardFromType: function (type) {
      var card, j, len;
      for (j = 0, len = this.cards.length; j < len; j++) {
        card = this.cards[j];
        if (card.type === type) {
          return card;
        }
      }
    },
    formatCardNumber: function (num) {
      var card, groups, ref, upperLength;

      num = num.replace(/\D/g, "");
      card = this.cardFromNumber(num);
      if (!card) {
        return num;
      }

      if (!card.format) {
        card.format = this.defaultFormat;
      }

      upperLength = card.length[card.length.length - 1];
      num = num.slice(0, upperLength);
      if (card.format.global) {
        return (ref = num.match(card.format)) != null ? ref.join(" ") : void 0;
      } else {
        groups = card.format.exec(num);
        if (groups == null) {
          return;
        }
        groups.shift();
        groups = groups.filter(Boolean);
        return groups.join(" ");
      }
    },
    luhnCheck: function (num) {
      var digit, digits, j, len, odd, sum;
      odd = true;
      sum = 0;
      digits = (num + "").split("").reverse();
      for (j = 0, len = digits.length; j < len; j++) {
        digit = digits[j];
        digit = parseInt(digit, 10);
        if ((odd = !odd)) {
          digit *= 2;
        }
        if (digit > 9) {
          digit -= 9;
        }
        sum += digit;
      }
      return sum % 10 === 0;
    },
    parseCardExpiry: function (value) {
      var month, prefix, ref, year;
      value = value.replace(/\s/g, "");
      (ref = value.split("/", 2)), (month = ref[0]), (year = ref[1]);
      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = new Date().getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10);
      year = parseInt(year, 10);
      return {
        month: month,
        year: year,
      };
    },
    validateCardNumber: function (num) {
      var card;
      num = (num + "").replace(/\s+|-/g, "");
      if (!/^\d+$/.test(num)) {
        return false;
      }
      card = this.cardFromNumber(num);
      if (!card) {
        return false;
      }
      return card.length.includes(num.length) && (card.luhn === false || this.luhnCheck(num));
    },
    validateCardExpiry: function (month, year) {
      var currentTime, expiry, ref;
      if (typeof month === "object" && "month" in month) {
        (ref = month), (month = ref.month), (year = ref.year);
      }
      if (!(month && year)) {
        return false;
      }
      month = String(month).trim();
      year = String(year).trim();
      if (!/^\d+$/.test(month)) {
        return false;
      }
      if (!/^\d+$/.test(year)) {
        return false;
      }
      if (!(1 <= month && month <= 12)) {
        return false;
      }
      if (year.length === 2) {
        if (year < 70) {
          year = "20" + year;
        } else {
          year = "19" + year;
        }
      }
      if (year.length !== 4) {
        return false;
      }
      expiry = new Date(year, month);
      currentTime = new Date();
      expiry.setMonth(expiry.getMonth() - 1);
      expiry.setMonth(expiry.getMonth() + 1, 1);
      return expiry > currentTime;
    },
    validateCardCVC: function (cvc, type) {
      var card;
      cvc = String(cvc).trim();
      if (!/^\d+$/.test(cvc)) {
        return false;
      }
      card = this.cardFromType(type);
      if (card != null) {
        return card.cvcLength.includes(cvc.length);
      } else {
        return cvc.length >= 3 && cvc.length <= 4;
      }
    },
    proUpgrade() {
      this.proWindow = true;
    },
    cancelPro() {
      this.proWindow = false;
    },
  },
};
</script>
