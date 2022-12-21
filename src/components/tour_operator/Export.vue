<template>
  <div class="container">
    <h3 class="text-dark mb-4">Export Centre</h3>
    <b-row>
      <b-col cols="10" class="card shadow">
        <div class="card-header py-3">
          <p class="text-primary m-0 font-weight-bold">List of connected properties</p>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 text-nowrap">
              <div class="form-group row">
                <div class="anfilter">
                  <b-dropdown
                    size="sm"
                    boundary="viewport"
                    variant="primary"
                    :text="filterByCountry.length + ' Filter by country'"
                    style="margin-top: -3px; max-width: 350px !important; font-weight: 600"
                  >
                    <b-card class="bcardmultidrop">
                      <div>
                        <b-badge
                          class="multidropbadge"
                          v-for="(item, index) in filterByCountry"
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
                        v-model="filterByCountry"
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
                    v-model="filterByAccountType"
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
                    v-model="filterByCompanyStatus"
                  >
                    <option v-for="(c, index) in contractStatus" :key="index" :value="c.value">
                      {{ c.text }}
                    </option>
                  </select>
                </div>
                <button @click="getPartners">Search</button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="text-md-right dataTables_filter">
                <label
                  ><input
                    type="search"
                    class="form-control form-control-sm"
                    aria-controls="dataTable"
                    placeholder="Search"
                /></label>
              </div>
            </div>
          </div>
          <div
            class="table-responsive table mt-2 GFS-Center-Table"
            role="grid"
            aria-describedby="dataTable_info"
          >
            <table class="table table-hover">
              <thead class="GFS-TNave">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Country</th>
                  <th scope="col">state</th>
                  <th scope="col">City</th>
                  <th scope="col">Hotel</th>
                  <th scope="col">Export</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(property, index) in properties" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ property.country }}</td>
                  <td>{{ property.state }}</td>
                  <td>{{ property.city }}</td>
                  <td>{{ property.hotelName }}</td>
                  <td>
                    <div class="justify-content">
                      <b-dropdown variant="warning" text="Facts Sheet" class="m-md-2">
                        <b-dropdown-item @click="sendFactSheetPDFToGroupSelected(property.id)"
                          >Send Mail</b-dropdown-item
                        >
                        <b-dropdown-item>Contracted</b-dropdown-item>
                        <b-dropdown-item @click="factSheetPDFDownload(property.id)"
                          >Download</b-dropdown-item
                        >
                        <b-dropdown-item></b-dropdown-item>
                      </b-dropdown>

                      <!-- <b-button variant="warning" :to="`/property-photos/${property.id}/`">
                        Facts Sheet
                      </b-button> -->
                      &nbsp;&nbsp;
                      <b-button variant="warning" :to="`/property-photos/${property.id}/`">
                        Photos
                      </b-button>
                      &nbsp;&nbsp;
                      <b-dropdown variant="warning" text="Stop Sale" class="m-md-2">
                        <b-dropdown-item>Default</b-dropdown-item>
                        <b-dropdown-item>Contracted</b-dropdown-item>
                        <b-dropdown-item @click="calendarPDFDownload(property.id)"
                          >Calendar</b-dropdown-item
                        >
                        <b-dropdown-item></b-dropdown-item>
                      </b-dropdown>
                      <!--
                    <a
                      class="btn btn-warning btn-sm d-none d-sm-inline-block"
                      role="button"
                      href="#"
                      style="margin: 4px"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                        class="bi bi-list-ul fa-sm text-white-50"
                        style="margin: 0px"
                      >
                        <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z" /></svg
                      >&nbsp;Send via E-mail</a
                    >
                    <a
                      class="btn btn-success btn-sm d-none d-sm-inline-block"
                      role="button"
                      href="#"
                      style="margin: 4px"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        class="bi bi-list-ul fa-sm text-white-50"
                        style="margin: 0px"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                        /></svg
                      >&nbsp;Generate Chart</a
                    > -->
                    </div>
                  </td>
                </tr>
              </tbody>
              <!--                   <tfoot>
                    <tr>
                      <td><strong>Name</strong></td>
                      <td><strong>Position</strong></td>
                      <td><strong>Office</strong></td>
                      <td><strong>Age</strong></td>
                      <td><strong>Start date</strong></td>
                      <td><strong>Salary</strong></td>
                    </tr>
                  </tfoot> -->
            </table>
          </div>
          <div class="row">
            <div class="col-md-6 align-self-center row">
              <label class="col-sm-1">Show</label
              ><select class="col-sm-1 form-control form-control-sm custom-select custom-select-sm">
                <option value="10" selected="">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span style="margin-left: 20px">
                <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">
                  Showing 1 to 10 of 27
                </p></span
              >
            </div>
            <div class="col-md-6">
              <nav
                class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers"
              >
                <ul class="pagination">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" aria-label="Previous"
                      ><span aria-hidden="true">«</span></a
                    >
                  </li>
                  <li class="page-item active"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next"
                      ><span aria-hidden="true">»</span></a
                    >
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </b-col>
      <b-col
        cols="2"
        style="background-color: #f9f9f9; padding: 50px 15px; border-right: solid black 1px"
      >
        <div>
          <b-list-group>
            <b-list-group-item href="#some-link" active>Default</b-list-group-item>
            <b-list-group-item href="#">Contracted</b-list-group-item>
            <b-list-group-item href="#foobar" disabled>Deleted</b-list-group-item>
          </b-list-group>
        </div>
        <div style="margin-top: 20px">
          <b-button variant="success">Create Another Calendar Group</b-button>
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
        <div style="margin-top: 20px">
          <b-button to="/mailing-lists" variant="success">Manage Mailing Groups</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      miniProfileModal: false,
      companyIsPartner: true,
      companyIsPending: true,
      incomingContract: true,
      GroupMailToSend: null,
      galleryFilter: "all",
      filterByCountry: [],
      filterByAccountType: "",
      filterByCompanyStatus: "",
      company: {
        company: "",
        address: "",
        contactNumber: "",
        logo: "",
      },
      contractStatus: [
        { value: "", text: "Select contract status" },
        { value: "D", text: "Draft" },
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
        { value: "tour operator", text: "Tour Operator" },
        { value: "3rd party", text: "3rd party" },
      ],
    };
  },
  watch: {
    GroupMailToSend() {
      console.log(this.GroupMailToSend);
      this.SET_GROUP_MAIL_TO_SEND(this.GroupMailToSend);
    },
  },
  computed: {
    countries() {
      return this.$store.getters["countries/getCountries"];
    },
    mailingLists() {
      return this.$store.getters["settings/getMailingLists"];
    },
    properties() {
      return this.$store.getters["property/getProperties"];
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
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
  },
  async created() {
    await this.getMailingLists();
    await this.getCountries();
    await this.getProperties();
    this.getCompany();
    this.getPartners();
  },
  methods: {
    ...mapMutations({
      // SET_CURRENT_HOTEL_ID: "exportCenter/SET_CURRENT_HOTEL_ID",
      SET_GROUP_MAIL_TO_SEND: "exportCenter/SET_GROUP_MAIL_TO_SEND",
    }),
    ...mapActions({
      getMailingLists: "settings/getMailingLists",
      calendarPDFDownload: "calendar/calendarPDFDownload",
      factSheetPDFDownload: "exportCenter/factSheetPDFDownload",
      sendFactSheetPDFToGroupSelected: "exportCenter/sendFactSheetPDFToGroupSelected",
    }),

    getPartners() {
      const filtration = {
        page: 1,
        data: {
          countries: this.filterByCountry,
          role: this.filterByAccountType,
          status: this.filterByCompanyStatus,
        },
      };
      this.$store.dispatch("partners/retrievePartners", filtration);
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
    async getProperties() {
      await this.$store
        .dispatch("property/getInfo")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    filterContract(type) {
      const filterType = type;
      return filterType;
    },
    sendContract(companyID) {
      return companyID;
    },
    MessageCompany(companyID) {
      return companyID;
    },
    viewIncomingContract() {
      return this.incomingContract;
    },
  },
};
</script>
