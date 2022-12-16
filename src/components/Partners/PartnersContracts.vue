<template>
  <div class="container">
    <b-row>
      <h5>Partners</h5>
      <b-col>
        <span>
          The Marketplace gives you access to sellers and suppliers. You can set up contracts with
          each of them allowing you both to benefit from cross-selling.
        </span>
      </b-col>
      <b-col>
        <b-button variant="info">Tell me more</b-button>
      </b-col>
    </b-row>
    <br />
    <hr />
    <b-tabs pills card small vertical>
      <b-tab title="Discover" active>
        <b-row>
          <!--             <b-col cols="12">
              <input
                type="text"
                class="form-control"
                placeholder="search potential partners.."
                style="width: 100%"
              />
              <br />
            </b-col> -->
          <b-col cols="12">
            <div class="form-group row">
              <div class="anfilter">
                <b-dropdown
                  size="sm"
                  boundary="viewport"
                  variant="primary"
                  :text="discover.filterByCountry.length + ' Filter by country'"
                  style="margin-top: -3px; max-width: 350px !important; font-weight: 600"
                >
                  <b-card class="bcardmultidrop">
                    <div>
                      <b-badge
                        class="multidropbadge"
                        v-for="(item, index) in discover.filterByCountry"
                        :key="index"
                        :value="item"
                        pill
                        variant="success"
                      >
                        {{ item }}
                      </b-badge>
                    </div>
                  </b-card>
                  <b-dropdown-item
                    :event="'hover'"
                    href="javascript:void(0)"
                    v-for="(item, index) in countries"
                    :key="index"
                    :value="item.iso2"
                    @click.native.capture.stop
                  >
                    <b-form-checkbox
                      v-model="discover.filterByCountry"
                      @click.native.stop=""
                      :value="item.iso2"
                      >{{ item.name }}</b-form-checkbox
                    >
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <div class="anfilter">
                <select
                  boundary="viewport"
                  variant="outline-dark"
                  text="Filter by role"
                  class="form-control-sm"
                  v-model="discover.filterByAccountType"
                  :options="options"
                >
                  <option v-for="(c, index) in options" :key="index" :value="c.value">
                    {{ c.text }}
                  </option>
                </select>
              </div>

              <div class="anfilter">
                <select
                  boundary="viewport"
                  variant="outline-dark"
                  text="Filter by role"
                  class="form-control-sm"
                  v-model="discover.filterByCompanyStatus"
                >
                  <option value="">All Status</option>
                  <option v-for="(c, index) in contractStatus" :key="index" :value="c.value">
                    {{ c.text }}
                  </option>
                </select>
              </div>
              <button @click="getPartners">Search</button>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div id="imagegallery" class="ananasImageGallery">
              <transition-group name="thumbnailfade">
                <div
                  v-for="partner in partners.results"
                  :key="partner.id"
                  style="width: fit-content; float: left; margin: 5px"
                >
                  <b-card @click="makeContract(partner)" style="cursor: pointer">
                    <h5 style="color: #000">
                      {{ partner.company || partner.email }}
                    </h5>
                    <img
                      :src="thumbnailDir + partner.logo"
                      :alt="partner.company"
                      :title="partner.company"
                    />
                    <br />
                    <div class="row">
                      <p><b>Location:</b> {{ partner.address }}</p>
                    </div>
                    <div class="row">
                      <p><b>Country:</b> {{ partner.country }}</p>
                    </div>
                    <div class="row">
                      <p><b>Account Type:</b> {{ partner.accountType }}</p>
                    </div>
                    <div class="row" v-if="partner.accountType === 'to'">
                    <!-- <div class="row" v-if="partner.accountType === 'Tour operator'"> -->
                      <b>Sells in:</b>
                      <p>Places where Operator is focusing sale</p>
                    </div>
                    <hr />
                    Contract Status
                    <b-row>
                      <b-col>
                        <b-badge v-if="partner.contractStatus === 'A'" pill variant="success"
                          >Partner</b-badge
                        >
                        <b-badge v-if="partner.contractStatus === 'P'" pill variant="warning"
                          >Pending</b-badge
                        >
                        <b-badge v-else pill variant="info">{{
                          getContractStatus(partner.contractStatus)
                        }}</b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </div>
              </transition-group>
              <!-- enter modal -->

              <lightbox
                id="mylightbox"
                ref="lightbox"
                :images="images"
                :directory="thumbnailDir"
                :filter="galleryFilter"
                :timeout-duration="5000"
                :close-on-backdrop-click="true"
              />
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Contracts">
        <b-row>
          <b-col>
            <b-button
              class="anfilter"
              @click="filterContracts('incoming')"
              value="Incoming"
              href="#"
              size="sm"
              variant="primary"
              >Incoming proposals</b-button
            >
            <b-button
              class="anfilter"
              @click="filterContracts('current')"
              value="Current"
              size="sm"
              variant="primary"
              >Current contracts</b-button
            >
            <b-button
              class="anfilter"
              @click="filterContracts('outgoing')"
              value="Outgoing"
              size="sm"
              variant="primary"
              >outgoing proposals</b-button
            >
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col cols="12">
            <div class="form-group row">
              <div class="anfilter">
                <select
                  boundary="viewport"
                  variant="outline-dark"
                  text="Filter by role"
                  class="form-control-sm"
                  v-model="myContracts.filterByCountry"
                >
                  <option value="">All Countries</option>
                  <option v-for="(c, index) in countries" :key="index" :value="c.iso2">
                    {{ c.name }}
                  </option>
                </select>
              </div>
              <div class="anfilter">
                <select
                  boundary="viewport"
                  variant="outline-dark"
                  text="Filter by role"
                  class="form-control-sm"
                  v-model="myContracts.filterByCompanyStatus"
                >
                  <option value="">All Status</option>
                  <option v-for="(c, index) in contractStatus" :key="index" :value="c.value">
                    {{ c.text }}
                  </option>
                </select>
              </div>
            </div>
          </b-col>
        </b-row>
        <div class="GFS-Center-Table">
          <table class="table table-hover">
            <thead class="GFS-TNave">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">creation date</th>
                <th scope="col">last modification</th>
                <th scope="col">country</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Comments</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <div>
                {{ filteredContracts.results }}
              </div>
              <tr v-for="(c, index) in filteredContracts.results" :key="index">
                <th scope="row">{{ c.partner_info.email }}</th>
                <td>{{ parseDate(c.date_created) }}</td>
                <td>{{ parseDate(c.date_update) }}</td>
                <td>{{ c.partner_info.country }}</td>
                <td style="text-transform: capitalize">{{ c.partner_info.account_type }}</td>
                <td>{{ getContractStatus(c.status) }}</td>
                <b-button
                  v-if="incomingContract"
                  variant="success"
                  @click="viewIncomingContract(c)"
                >
                  <b-icon icon="trash"></b-icon>View</b-button
                >
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>
      <b-tab title="My Partners">
        <b-row>
          <b-col cols="12">
            <span
              ><p>
                Create and manage the terms for your contracts with companies in the Bókun
                Marketplace. Contract terms define partnership details including commission rates
                and the products being sold. You can either create custom contract terms for each
                partnership or create standard terms that can be applied to multiple contracts.
                <b-icon
                  icon="question-circle-fill"
                  scale="1.2"
                  variant="primary"
                  aria-label="Help"
                ></b-icon></p
            ></span>
          </b-col>
        </b-row>
        <div class="GFS-Center-Table">
          <!--             <input
              type="text"
              class="form-control"
              placeholder="search contracts.."
              style="width: 100%"
            /> -->
          <br />
          <table class="table table-hover">
            <thead class="GFS-TNave">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">license</th>
                <th scope="col">price catalog</th>
                <th scope="col">used in contracts</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <!--             <tr v-for="(property, index) in properties" :key="index">
 -->
              <tr>
                <th scope="row">Partner name</th>
                <td>license registered</td>
                <td>category of partnership (default=default)</td>
                <td>number of property</td>
                <b-button variant="danger" @click="removeContract()">
                  <b-icon icon="trash"></b-icon> Remove</b-button
                >
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>
    </b-tabs>
    <!-- mini profile modal -->
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="miniProfileModal">
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
                  <h4 size="24" color="#34404E" class="">
                    {{ partnerToContract.company || "No Name" }}
                  </h4>
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
                  <!-- <b-row color="#1D57C7">
                      <b-col>
                        <p size="14" color="#34404E">
                          If you like what you see, offer the company a contract of partnership.
                        </p>
                      </b-col>
                    </b-row> -->
                  <!-- <b-row>
                      <b-col>
                        <b-button
                          loading="0"
                          @click="MessageCompany(company.user)"
                          class="sc-furwcr eHeAju sc-bvFjSx eFqhOZ"
                        >
                          Send a message
                        </b-button>
                      </b-col>
                    </b-row>
                    <hr /> -->
                  <b-row>
                    <b-col>
                      <h4
                        size="16"
                        data-testid="description-header"
                        class="sc-efQSVx bHeqvr"
                        style="
                          color: rgb(52, 64, 78);
                          margin: 0px 0px 12px;
                          font-size: 1rem;
                          font-weight: 600;
                        "
                      >
                        About us
                      </h4>
                      <div data-testid="description-text" class="sc-iXEfxz qHrIh">
                        {{ partnerToContract.description }}
                      </div>
                    </b-col>
                  </b-row>
                  <hr />
                  <b-row>
                    <b-col>
                      <h4
                        size="16"
                        data-testid="description-header"
                        class="sc-efQSVx bHeqvr"
                        style="
                          color: rgb(52, 64, 78);
                          margin: 0px 0px 12px;
                          font-size: 1rem;
                          font-weight: 300;
                        "
                      >
                        Selling / distributing in :
                      </h4>
                      <b-card class="bcardmultidrop" v-if="partnerToContract.workInCountries">
                        <div>
                          <b-badge
                            class="multidropbadge"
                            v-for="(k, index) in partnerToContract.workInCountries"
                            :key="index"
                            pill
                            variant="success"
                          >
                            {{ k }}
                          </b-badge>
                        </div>
                      </b-card>
                    </b-col>
                  </b-row>
                  <hr />
                  <b-row>
                    <b-col>
                      <h4
                        size="16"
                        data-testid="description-header"
                        class="sc-efQSVx bHeqvr"
                        style="
                          color: rgb(52, 64, 78);
                          margin: 0px 0px 12px;
                          font-size: 1rem;
                          font-weight: 600;
                        "
                      >
                        Location
                      </h4>
                      <p>{{ partnerToContract.country }}</p>
                      <p>{{ partnerToContract.city }}</p>
                    </b-col>
                    <b-col>
                      <h4
                        size="16"
                        data-testid="description-header"
                        class="sc-efQSVx bHeqvr"
                        style="
                          color: rgb(52, 64, 78);
                          margin: 0px 0px 12px;
                          font-size: 1rem;
                          font-weight: 300;
                        "
                      >
                        Rating
                      </h4>
                      <p>**** stars of property ??</p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col style="border-right: 1px solid rgb(221, 221, 221)">
                      <p>
                        Website:
                        <a :href="partnerToContract.website"> {{ partnerToContract.website }}</a>
                      </p>
                    </b-col>
                    <b-col>
                      <b-row>
                        <b-col v-if="partnerToContract.tripAdvisor">
                          <b>Tripadvisor</b>
                          <div title="Company title and hint">
                            <!-- tripadvisor icon -->
                            <div>
                              <svg
                                width="23.333333333333336"
                                height="14.000000000000002"
                                viewBox="0 0 25 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style="margin-right: 4px"
                              >
                                <path
                                  d="M8.46831 8.68321C8.46831 9.8269 7.47627 10.7539 6.2523 10.7539C5.02833 10.7539 4.03628 9.8269 4.03628 8.68321C4.03628 7.53952 5.02833 6.61255 6.2523 6.61255C7.47627 6.61255 8.46831 7.53952 8.46831 8.68321ZM18.7449 6.61255C17.5209 6.61196 16.5282 7.53834 16.5276 8.68203C16.5269 9.82572 17.5183 10.7533 18.7423 10.7539C19.9663 10.7545 20.959 9.82809 20.9596 8.6844C20.9596 8.6841 20.9596 8.68351 20.9596 8.68321C20.9596 7.54012 19.9682 6.61315 18.7449 6.61255ZM24.9937 8.68321C24.9937 11.9067 22.1947 14.5198 18.7449 14.5198C17.1708 14.5219 15.6547 13.9667 14.501 12.9661L12.4998 15L10.4974 12.964C9.34375 13.9659 7.8267 14.5219 6.25166 14.5198C2.80186 14.5198 0.00538636 11.9067 0.00538636 8.68321C0.00348529 7.04096 0.743952 5.47449 2.04397 4.36958L0 2.29152H4.54229C9.34787 -0.763841 15.6635 -0.763841 20.4691 2.29152H25L22.9557 4.36958C24.2554 5.47479 24.9956 7.04125 24.9937 8.68321ZM10.4796 8.68321C10.48 6.50153 8.58744 4.73315 6.25261 4.73285C3.91778 4.73256 2.02527 6.50094 2.02495 8.68262C2.02464 10.8643 3.91715 12.6327 6.25198 12.633H6.2523C8.58681 12.6327 10.4793 10.8646 10.4796 8.68321ZM17.1907 2.78654C14.1883 1.61739 10.8107 1.61739 7.80832 2.78654C10.4765 3.73986 12.4998 5.9701 12.4998 8.56953C12.4998 5.97039 14.5229 3.74016 17.1907 2.78654ZM22.9719 8.68321C22.9719 6.50183 21.0794 4.73345 18.7449 4.73345C16.4103 4.73345 14.5178 6.50183 14.5178 8.68321C14.5178 10.8646 16.4103 12.633 18.7449 12.633C21.0794 12.6327 22.9716 10.8646 22.9719 8.68321Z"
                                  fill="#34404E"
                                ></path>
                              </svg>
                              <small>{{ company.rating }} reviews</small>
                            </div>
                          </div>
                        </b-col>
                        <b-col
                          v-if="
                            partnerToContract.facebook ||
                            partnerToContract.instagram ||
                            partnerToContract.trustpilot ||
                            partnerToContract.linkedIn
                          "
                        >
                          <div>
                            <b>Social media</b>
                            <div>
                              <a
                                v-if="partnerToContract.trustpilot"
                                href="https://www.trustpilot.com/review/pyramidsland.com"
                                target="_blank"
                                class="sc-dhCHPp jHWIGv"
                                ><svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M25.2474 9.17131L15.6018 9.17131L12.6325 1.10437e-06L9.64568 9.1713L-8.00245e-07 9.15373L7.80088 14.8287L4.81405 24L12.6149 18.325L20.4158 24L17.4466 14.8287L25.2474 9.17131Z"
                                    fill="#00B67A"
                                  ></path>
                                  <path
                                    d="M18.1145 16.9012L17.4469 14.8279L12.6328 18.3243L18.1145 16.9012Z"
                                    fill="#005128"
                                  ></path></svg></a
                              ><a
                                v-if="partnerToContract.facebook"
                                href="https://www.facebook.com/pyramidslandtours"
                                target="_blank"
                                class="sc-dhCHPp jHWIGv"
                                ><svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                                    fill="#1877F2"
                                  ></path>
                                  <path
                                    d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z"
                                    fill="white"
                                  ></path></svg></a
                              ><a
                                v-if="partnerToContract.instagram"
                                href="https://www.instagram.com/pyramidslandtours"
                                target="_blank"
                                class="sc-dhCHPp jHWIGv"
                                ><svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M40 30.8672C40 35.9141 35.9141 40 30.8672 40H9.13281C4.08594 40 0 35.9141 0 30.8672V9.14062C0 4.09375 4.09375 0 9.14062 0H30.7266C35.8516 0 40 4.14844 40 9.27344V30.8672Z"
                                    fill="url(#paint0_radial)"
                                  ></path>
                                  <path
                                    d="M25.5625 5.51556H14.4375C9.50781 5.51556 5.50781 9.51556 5.50781 14.4453V25.5624C5.50781 30.4921 9.5 34.4843 14.4375 34.4843H25.5547C30.4844 34.4843 34.4766 30.4921 34.4766 25.5624V14.4453C34.4844 9.50775 30.4922 5.51556 25.5625 5.51556ZM31.7031 24.4921C31.7031 28.4765 28.4766 31.7031 24.4922 31.7031H15.5078C11.5234 31.7031 8.29688 28.4765 8.29688 24.4921V15.5078C8.29688 11.5234 11.5234 8.29681 15.5078 8.29681H24.4922C28.4766 8.29681 31.7031 11.5312 31.7031 15.5078V24.4921Z"
                                    fill="white"
                                  ></path>
                                  <path
                                    d="M20.3901 12.4219C16.1714 12.4219 12.7573 15.8359 12.7573 20.0547C12.7573 24.2656 16.1714 27.6875 20.3901 27.6875C24.6011 27.6875 28.0229 24.2734 28.0229 20.0547C28.0151 15.8359 24.6011 12.4219 20.3901 12.4219ZM20.3901 24.6406C17.8511 24.6406 15.7964 22.5859 15.7964 20.0469C15.7964 17.5078 17.8511 15.4531 20.3901 15.4531C22.9214 15.4531 24.9839 17.5078 24.9839 20.0469C24.9761 22.5859 22.9214 24.6406 20.3901 24.6406Z"
                                    fill="white"
                                  ></path>
                                  <path
                                    d="M29.4297 12.3046C29.4297 13.3749 28.5625 14.2421 27.4922 14.2421C26.4219 14.2421 25.5547 13.3749 25.5547 12.3046C25.5547 11.2343 26.4219 10.3593 27.4922 10.3593C28.5625 10.3593 29.4297 11.2265 29.4297 12.3046Z"
                                    fill="white"
                                  ></path>
                                  <defs>
                                    <radialGradient
                                      id="paint0_radial"
                                      cx="0"
                                      cy="0"
                                      r="1"
                                      gradientUnits="userSpaceOnUse"
                                      gradientTransform="translate(11.7163 43.0968) scale(53.006 53.0045)"
                                    >
                                      <stop offset="0.0969388" stop-color="#FFD87A"></stop>
                                      <stop offset="0.1426" stop-color="#FCCE78"></stop>
                                      <stop offset="0.2263" stop-color="#F5B471"></stop>
                                      <stop offset="0.3378" stop-color="#EB8D65"></stop>
                                      <stop offset="0.449" stop-color="#E36058"></stop>
                                      <stop offset="0.6786" stop-color="#CD3694"></stop>
                                      <stop offset="1" stop-color="#6668B0"></stop>
                                    </radialGradient>
                                  </defs></svg></a
                              ><a
                                v-if="partnerToContract.linkedIn"
                                href="https://eg.linkedin.com/in/pyramids-land-016279193"
                                target="_blank"
                                class="sc-dhCHPp jHWIGv"
                                ><svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M22.2232 0.00014795H1.77086C1.30682 -0.00487478 0.859752 0.174403 0.527754 0.498639C0.195757 0.822875 0.00595425 1.26558 0 1.7296L0 22.2685C0.00545965 22.7329 0.195045 23.1761 0.527096 23.5007C0.859148 23.8253 1.3065 24.0049 1.77086 23.9999H22.2232C22.6886 24.0059 23.1373 23.8269 23.4707 23.5023C23.8042 23.1776 23.9951 22.7339 24.0016 22.2685V1.7296C23.9946 1.26458 23.8035 0.821306 23.4701 0.497067C23.1367 0.172828 22.6882 -0.00588549 22.2232 0.00014795Z"
                                    fill="#0072b1"
                                  ></path>
                                  <path
                                    d="M7.11912 8.99744H3.55859V20.4506H7.11912V8.99744Z"
                                    fill="white"
                                  ></path>
                                  <path
                                    d="M5.33912 3.30475C5.74854 3.30475 6.14877 3.42616 6.48919 3.65362C6.82961 3.88108 7.09494 4.20438 7.25162 4.58264C7.4083 4.9609 7.44929 5.37712 7.36942 5.77868C7.28954 6.18023 7.09239 6.54908 6.80288 6.83859C6.51338 7.12809 6.14453 7.32525 5.74297 7.40512C5.34141 7.485 4.92519 7.444 4.54693 7.28732C4.16868 7.13065 3.84538 6.86532 3.61791 6.5249C3.39045 6.18447 3.26904 5.78425 3.26904 5.37482C3.26904 4.82581 3.48714 4.29927 3.87535 3.91106C4.26357 3.52285 4.7901 3.30475 5.33912 3.30475Z"
                                    fill="white"
                                  ></path>
                                  <path
                                    d="M9.35107 8.99742H12.7648V10.5632H12.8137C13.288 9.66173 14.4491 8.71326 16.1842 8.71326C19.7899 8.71326 20.4542 11.0844 20.4542 14.1707V20.4525H16.8937V14.8821C16.8937 13.5535 16.8692 11.8447 15.0438 11.8447C13.2184 11.8447 12.9078 13.2919 12.9078 14.7861V20.4506H9.35107V8.99742Z"
                                    fill="white"
                                  ></path></svg></a>
                            </div></div
                        ></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="4">
                  <div style="text-align: center">
                    <div style="margin-bottom: 15px">
                      <img
                        :src="partnerToContract.logo"
                        style="max-width: -webkit-fill-available"
                      />
                    </div>
                    <p color="#34404E">
                      Satisfied with information provided, create a contract with this company, or
                      view profile
                    </p>
                    <br />
                    <b-button
                      variant="info"
                      loading="0"
                      style="text-align: center"
                      data-testid="view-product-list"
                      to="/portfolio"
                    >
                      View full profile
                    </b-button>
                  </div>
                </b-col>
              </b-row>
              <b-badge v-if="partnerToContract.contractStatus !== 'None'" pill variant="info">{{
                getContractStatus(partnerToContract.contractStatus)
              }}</b-badge>
              <b-button v-else variant="info" to="contract-details/">make a contract</b-button>
              <b-button variant="danger" type="button" class="modalbutton" @click="cancelDeal()">
                Close
              </b-button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
// import axios from 'axios';
// @TODO: change dir to dcn
const photoDir = "http://127.0.0.1:8000";

export default {
  data() {
    return {
      miniProfileModal: false,
      thumbnailDir: photoDir,
      companyIsPartner: true,
      companyIsPending: true,
      incomingContract: true,
      galleryFilter: "all",
      discover: {
        filterByCountry: [],
        filterByAccountType: "",
        filterByCompanyStatus: "",
      },
      myContracts: {
        filterByCountry: "",
        filterByCompanyStatus: "",
      },
      company: {
        company: "",
        address: "",
        contactNumber: "",
        logo: "",
        stars: 4,
        rating: "456",
        aboutcompany:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      },
      contractStatus: [
        { value: "P", text: "Pending" },
        { value: "C", text: "Changed" },
        { value: "R", text: "Rejected" },
        { value: "X", text: "Cancelled" },
        { value: "A", text: "Active" },
        { value: "Incoming proposal", text: "Incoming proposal" },
        { value: "Outgoing Proposal", text: "Outgoing Proposal" },
      ],
      selected: null,
      options: [
        { value: "", text: "Filter by role" },
        { value: "accommodation", text: "Accommodation" },
        { value: "to", text: "Tour Operator" },
        { value: "3rd party", text: "3rd party" },
      ],
    };
  },
  computed: {
    countries() {
      return this.$store.getters["countries/getCountries"];
    },
    partnerToContract() {
      return this.$store.getters["partners/getPartnerToContract"];
    },
    companyLogos() {
      if (this.galleryFilter === "all") {
        return this.images;
      }
      return this.images.filter((image) => image.filter === this.galleryFilter);
    },
    partners() {
      return this.$store.getters["partners/getPartners"];
    },
    filteredContracts() {
      return this.$store.getters["partners/getContracts"];
    },
  },
  async created() {
    await this.getCountries();
    this.getCompany();
    this.getPartners();
  },
  methods: {
    ...mapActions({
      retrievePartners:'partners/retrievePartners',
    }),
    parseDate(inputDate) {
      const d = new Date(inputDate);
      const resultDate = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
      return resultDate;
    },
    getPartners() {
      const filtration = {
        page: 1,
        data: {
          countries: this.discover.filterByCountry,
          role: this.discover.filterByAccountType,
          status: this.discover.filterByCompanyStatus,
        },
      };
      this.retrievePartners(filtration)
      // this.$store.dispatch("partners/retrievePartners", filtration);
    },
    filterContracts(contractType) {
      const filtration = {
        page: 1,
        data: {
          type: contractType,
          countries: this.myContracts.filterByCountry,
          status: this.myContracts.filterByCompanyStatus,
        },
      };
      this.$store.dispatch("partners/retrieveContracts", filtration);
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
    showLightbox(imageName) {
      this.$refs.lightbox.show(imageName);
    },
    filterContract(type) {
      const filterType = type;
      return filterType;
    },
    MessageCompany(companyID) {
      return companyID;
    },
    viewIncomingContract(contractToView) {
      console.log(contractToView);
    },
    removeContract() {},
    makeContract(partnerToContract) {
      this.$store.dispatch("partners/updatePartnerToContract", partnerToContract);
      this.miniProfileModal = true;
      console.log("this");
    },
    cancelDeal() {
      this.miniProfileModal = false;
    },
    getContractStatus(inputStatus) {
      console.log(inputStatus);
      const statusOptions = {
        P: "Pending",
        C: "Changed",
        R: "Rejected",
        X: "Canceled",
        A: "Accepted",
      };
      return statusOptions[inputStatus] || "Not connected";
    },
  },
};
</script>
