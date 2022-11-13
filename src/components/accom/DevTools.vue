<template>
  <b-container>
    <b-row>
      <b-col cols="10">
        <h4>Developer Tools</h4>
        <span
          >Create and manage your API keys, integration widgets and script to publish your data
          through Ananas Global App.
          <b-icon
            icon="question-circle-fill"
            scale="1.2"
            variant="primary"
            aria-label="Help"
          ></b-icon>
        </span>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="12">
        <b-tabs pills card small vertical>
          <b-tab title="Target URLs" active>
            <h5 style="margin-bottom: 25px; border-bottom: black 1px solid; padding-bottom: 20px">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.625 16.125C19.2108 16.125 18.875 16.4608 18.875 16.875V18H17.75C17.3358 18 17 18.3358 17 18.75C17 19.1642 17.3358 19.5 17.75 19.5H18.875V20.625C18.875 21.0392 19.2108 21.375 19.625 21.375C20.0392 21.375 20.375 21.0392 20.375 20.625V19.5H21.5C21.9142 19.5 22.25 19.1642 22.25 18.75C22.25 18.3358 21.9142 18 21.5 18H20.375V16.875C20.375 16.4608 20.0392 16.125 19.625 16.125Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.2592 4.74282C17.9351 3.41906 15.7882 3.41906 14.4642 4.74282L11.5364 7.66989C11.2435 7.96275 10.7686 7.96269 10.4757 7.66976C10.1829 7.37683 10.1829 6.90196 10.4759 6.6091L13.4036 3.68204C15.3135 1.77265 18.4099 1.77265 20.3197 3.68204C22.2296 5.59152 22.2296 8.68747 20.3197 10.597L17.3919 13.524C17.099 13.8169 16.6241 13.8168 16.3313 13.5239C16.0384 13.231 16.0385 12.7561 16.3314 12.4632L19.2592 9.53617C20.5831 8.2125 20.5831 6.06649 19.2592 4.74282ZM15.4427 8.56029C15.7356 8.85322 15.7355 9.32809 15.4426 9.62095L9.58707 15.4751C9.29414 15.7679 8.81927 15.7679 8.52641 15.475C8.23355 15.182 8.23361 14.7072 8.52654 14.4143L14.3821 8.56017C14.675 8.26731 15.1499 8.26736 15.4427 8.56029ZM7.6335 10.5141C7.92635 10.8071 7.9263 11.2819 7.63337 11.5748L4.70917 14.4983C3.41732 15.8269 3.43212 17.947 4.74322 19.2575C6.05445 20.5681 8.17538 20.5824 9.50417 19.2903L12.4285 16.368C12.7215 16.0752 13.1964 16.0754 13.4891 16.3684C13.7819 16.6614 13.7818 17.1362 13.4888 17.429L10.5544 20.3614C8.63809 22.2295 5.57563 22.2103 3.6828 20.3184C1.78987 18.4263 1.77004 15.3643 3.6383 13.4479L3.64503 13.441L6.57284 10.514C6.86576 10.2211 7.34064 10.2212 7.6335 10.5141Z"
                ></path>
              </svg>
              Whitelist links generator
            </h5>
            <div class="program-tools-content-wrapper">
              <div class="links_generator-row">
                <div class="links_generator-wrapper">
                  <div class="links_generator-info">
                    Create a landing URL below, every URL will be associated with a project or
                    location to send your requested API information to.
                    <a href="#">Learn More!</a>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <br />
            <div class="program-tools-content-wrapper">
              <b-row>
                <b-col cols="10">
                  <h4>List of your registered whitelists</h4>
                  <span
                    >Create and manage your whitelists.
                    <b-icon
                      icon="question-circle-fill"
                      scale="1.2"
                      variant="primary"
                      aria-label="Help"
                    ></b-icon>
                  </span>
                </b-col>
                <b-col cols="2">
                  <b-button variant="outline-success" class="button" @click="showAdd()"
                    >Add new Whitelist</b-button
                  >
                </b-col>
              </b-row>
              <div class="GFS-Center-Table">
                <table class="table table-hover">
                  <thead class="GFS-TNave">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date Created</th>
                      <th scope="col">Name</th>
                      <th scope="col">Domain</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(whitelist, index) in whitelists" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ getDate(whitelist.date_created) }}</td>
                      <td>{{ whitelist.name }}</td>
                      <td>{{ whitelist.domain }}</td>
                      <b-button size="sm" variant="outline-info" @click="showEdit(whitelist)"
                        >Edit</b-button
                      >
                      <b-button size="sm" variant="outline-danger" @click="showRemove(whitelist)"
                        >Remove</b-button
                      >
                    </tr>
                  </tbody>
                </table>
              </div>
              <transition name="fade" appear>
                <div class="modal-overlay" v-if="showModal">
                  <div class="modal">
                    <header class="modalheader">
                      <h5>Add New Whitelist</h5>
                    </header>
                    <div class="modalcontainer">
                      <form v-on:submit.prevent @submit="save()">
                        <b-form-group
                          label="name"
                          label-for="name"
                          label-cols-sm="3"
                          label-align-sm="right"
                        >
                          <input
                            class="form-control"
                            type="text"
                            id="name"
                            v-model="whitelistToEdit.name"
                            required
                          />
                        </b-form-group>
                        <b-form-group
                          label="Domain"
                          label-for="domain"
                          label-cols-sm="3"
                          label-align-sm="right"
                        >
                          <input
                            class="form-control"
                            type="text"
                            id="domain"
                            v-model="whitelistToEdit.domain"
                            required
                          />
                        </b-form-group>
                        <b-button type="submit" variant="outline-success" class="modalbutton"
                          >Save</b-button
                        >
                        <b-button
                          type="button"
                          variant="outline-danger"
                          class="modalbutton"
                          @click="cancel()"
                          >Cancel</b-button
                        >
                      </form>
                    </div>
                  </div>
                </div>
              </transition>
              <transition name="fade" appear>
                <div class="modal-overlay" v-if="showDelete">
                  <div class="modal">
                    <header class="modalheader">
                      <h5>Confirm Delete</h5>
                    </header>
                    <div class="modalcontainer">
                      <p>Are you sure you want to delete this whitelist?</p>
                      <div class="row">
                        <div class="col-md-12 text-right">
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            @click="removeWhitelist"
                          >
                            Delete
                          </button>
                          <button type="button" class="btn btn-outline-success" @click="hideRemove">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </b-tab>
          <b-tab title="Widgets">
            <h5 style="margin-bottom: 25px; border-bottom: black 1px solid; padding-bottom: 20px">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.1842 4.92678C12.1102 6.00072 12.1102 7.74192 13.1842 8.81586L15.3055 10.9372C16.3794 12.0111 18.1206 12.0111 19.1946 10.9372L21.3159 8.81586C22.3898 7.74192 22.3898 6.00072 21.3159 4.92678L19.1946 2.80546C18.1206 1.73151 16.3794 1.73151 15.3055 2.80546L13.1842 4.92678ZM14.2448 7.7552C13.7567 7.26705 13.7567 6.47559 14.2448 5.98744L16.3661 3.86612C16.8543 3.37796 17.6457 3.37796 18.1339 3.86612L20.2552 5.98744C20.7434 6.47559 20.7434 7.26705 20.2552 7.7552L18.1339 9.87652C17.6457 10.3647 16.8543 10.3647 16.3661 9.87652L14.2448 7.7552ZM4.75 2.62156C3.23122 2.62156 2 3.85278 2 5.37156V8.37156C2 9.89035 3.23122 11.1216 4.75 11.1216H7.75C9.26878 11.1216 10.5 9.89035 10.5 8.37156V5.37156C10.5 3.85278 9.26878 2.62156 7.75 2.62156H4.75ZM3.5 5.37156C3.5 4.68121 4.05964 4.12156 4.75 4.12156H7.75C8.44036 4.12156 9 4.68121 9 5.37156V8.37156C9 9.06192 8.44036 9.62156 7.75 9.62156H4.75C4.05964 9.62156 3.5 9.06192 3.5 8.37156V5.37156ZM4.75 14.1216C3.23122 14.1216 2 15.3528 2 16.8716V19.8716C2 21.3903 3.23122 22.6216 4.75 22.6216H7.75C9.26878 22.6216 10.5 21.3903 10.5 19.8716V16.8716C10.5 15.3528 9.26878 14.1216 7.75 14.1216H4.75ZM3.5 16.8716C3.5 16.1812 4.05964 15.6216 4.75 15.6216H7.75C8.44036 15.6216 9 16.1812 9 16.8716V19.8716C9 20.5619 8.44036 21.1216 7.75 21.1216H4.75C4.05964 21.1216 3.5 20.5619 3.5 19.8716V16.8716ZM13 16.8716C13 15.3528 14.2312 14.1216 15.75 14.1216H18.75C20.2688 14.1216 21.5 15.3528 21.5 16.8716V19.8716C21.5 21.3903 20.2688 22.6216 18.75 22.6216H15.75C14.2312 22.6216 13 21.3903 13 19.8716V16.8716ZM15.75 15.6216C15.0596 15.6216 14.5 16.1812 14.5 16.8716V19.8716C14.5 20.5619 15.0596 21.1216 15.75 21.1216H18.75C19.4404 21.1216 20 20.5619 20 19.8716V16.8716C20 16.1812 19.4404 15.6216 18.75 15.6216H15.75Z"
                ></path>
              </svg>
              Displaying widgets
            </h5>
            <Widgets />
          </b-tab>
          <b-tab title="API">
            <h5 style="margin-bottom: 25px; border-bottom: black 1px solid; padding-bottom: 20px">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.22683 5.45953C6.93394 5.16664 6.93394 4.69176 7.22683 4.39887L9.34816 2.27755C10.8126 0.813083 13.187 0.813083 14.6515 2.27755L16.7728 4.39887C17.0657 4.69176 17.0657 5.16664 16.7728 5.45953C16.4799 5.75242 16.005 5.75242 15.7121 5.45953L13.5908 3.33821C12.7121 2.45953 11.2875 2.45953 10.4088 3.33821L8.28749 5.45953C7.9946 5.75242 7.51973 5.75242 7.22683 5.45953Z"
                ></path>
                <path
                  d="M18.5405 16.7731C18.8334 17.066 19.3083 17.066 19.6012 16.7731L21.7225 14.6518C23.187 13.1873 23.187 10.813 21.7225 9.34851L19.6012 7.22719C19.3083 6.9343 18.8334 6.9343 18.5405 7.22719C18.2476 7.52009 18.2476 7.99496 18.5405 8.28785L20.6619 10.4092C21.5405 11.2879 21.5405 12.7125 20.6619 13.5912L18.5405 15.7125C18.2476 16.0054 18.2476 16.4802 18.5405 16.7731Z"
                ></path>
                <path
                  d="M4.3984 16.7731C4.69129 17.066 5.16616 17.066 5.45906 16.7731C5.75195 16.4802 5.75195 16.0054 5.45906 15.7125L3.33774 13.5912C2.45906 12.7125 2.45906 11.2879 3.33774 10.4092L5.45906 8.28785C5.75195 7.99496 5.75195 7.52009 5.45906 7.22719C5.16616 6.9343 4.69129 6.9343 4.3984 7.22719L2.27708 9.34851C0.81261 10.813 0.81261 13.1873 2.27708 14.6518L4.3984 16.7731Z"
                ></path>
                <path
                  d="M7.22683 18.541C6.93394 18.8339 6.93394 19.3087 7.22683 19.6016L9.34816 21.7229C10.8126 23.1874 13.187 23.1874 14.6515 21.7229L16.7728 19.6016C17.0657 19.3087 17.0657 18.8339 16.7728 18.541C16.4799 18.2481 16.005 18.2481 15.7121 18.541L13.5908 20.6623C12.7121 21.541 11.2875 21.541 10.4088 20.6623L8.28749 18.541C7.9946 18.2481 7.51973 18.2481 7.22683 18.541Z"
                ></path>
                <path
                  d="M10.9391 10.9396C10.3534 11.5254 10.3534 12.4751 10.9391 13.0609C11.5249 13.6467 12.4747 13.6467 13.0605 13.0609C13.6462 12.4751 13.6462 11.5254 13.0605 10.9396C12.4747 10.3538 11.5249 10.3538 10.9391 10.9396Z"
                ></path>
              </svg>
              API Connections
            </h5>
            <APIIntegration />
          </b-tab>
          <b-tab title="Statistics">
            <a href="/#"
              ><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.2592 4.74282C17.9351 3.41906 15.7882 3.41906 14.4642 4.74282L11.5364 7.66989C11.2435 7.96275 10.7686 7.96269 10.4757 7.66976C10.1829 7.37683 10.1829 6.90196 10.4759 6.6091L13.4036 3.68204C15.3135 1.77265 18.4099 1.77265 20.3197 3.68204C22.2296 5.59152 22.2296 8.68747 20.3197 10.597L17.3919 13.524C17.099 13.8169 16.6241 13.8168 16.3313 13.5239C16.0384 13.231 16.0385 12.7561 16.3314 12.4632L19.2592 9.53617C20.5831 8.2125 20.5831 6.06649 19.2592 4.74282ZM15.4427 8.56029C15.7356 8.85322 15.7355 9.32809 15.4426 9.62095L9.58707 15.4751C9.29414 15.7679 8.81927 15.7679 8.52641 15.475C8.23355 15.182 8.23361 14.7072 8.52654 14.4143L14.3821 8.56017C14.675 8.26731 15.1499 8.26736 15.4427 8.56029ZM7.6335 10.5141C7.92635 10.8071 7.9263 11.2819 7.63337 11.5748L4.70917 14.4983C3.41732 15.8269 3.43212 17.947 4.74322 19.2575C6.05445 20.5681 8.17538 20.5824 9.50417 19.2903L12.4285 16.368C12.7215 16.0752 13.1964 16.0754 13.4891 16.3684C13.7819 16.6614 13.7818 17.1362 13.4888 17.429L10.5544 20.3614C8.63809 22.2295 5.57563 22.2103 3.6828 20.3184C1.78987 18.4263 1.77004 15.3643 3.6383 13.4479L3.64503 13.441L6.57284 10.514C6.86576 10.2211 7.34064 10.2212 7.6335 10.5141Z"
                ></path>
              </svg>
              Links</a
            >
            <table class="table">
              <colgroup>
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="80" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
                <col width="1" />
              </colgroup>
              <thead>
                <tr>
                  <th class="table-cell--dates" colspan="1" role="columnheader">Date</th>
                  <th class="table-cell--inits table-cell--right" colspan="1" role="columnheader">
                    Impressions
                  </th>
                  <th
                    class="table-cell--redirects table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Clicks
                  </th>
                  <th
                    class="table-cell--visitors table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Visitors
                  </th>
                  <th
                    class="table-cell--searches table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Searches
                  </th>
                  <th class="table-cell--clicks table-cell--right" colspan="1" role="columnheader">
                    Click-outs
                  </th>
                  <th
                    class="table-cell--mobile_app_installs table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    App installs
                  </th>
                  <th
                    class="table-cell--clicks_paid table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Paid clicks
                  </th>
                  <th
                    class="table-cell--bookings_processing table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Pending
                  </th>
                  <th
                    class="table-cell--bookings_cancelled table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Cancelled
                  </th>
                  <th
                    class="table-cell--bookings_paid table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Paid
                  </th>
                  <th
                    class="table-cell--advertising_profit table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Adv. income
                  </th>
                  <th
                    class="table-cell--total_profit table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Payout
                  </th>
                  <th
                    class="table-cell--bookings_pending_profit table-cell--right"
                    colspan="1"
                    role="columnheader"
                  >
                    Pot. income
                  </th>
                  <th class="table-cell--ctr table-cell--right" colspan="1" role="columnheader">
                    CTR
                  </th>
                  <th class="table-cell--str table-cell--right" colspan="1" role="columnheader">
                    STR
                  </th>
                  <th class="table-cell--ecpc table-cell--right" colspan="1" role="columnheader">
                    eCPC
                  </th>
                  <th class="table-cell--ecps table-cell--right" colspan="1" role="columnheader">
                    eCPS
                  </th>
                  <th class="table-cell--ecpu table-cell--right" colspan="1" role="columnheader">
                    eCPU
                  </th>
                </tr>
              </thead>
              <thead class="table-totals">
                <tr>
                  <td class="table-cell--dates" colspan="1">TOTAL</td>
                  <td class="table-cell--inits table-cell--right table-cell--nowrap" colspan="1">
                    30
                  </td>
                  <td
                    class="table-cell--redirects table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    1
                  </td>
                  <td class="table-cell--visitors table-cell--right table-cell--nowrap" colspan="1">
                    4
                  </td>
                  <td class="table-cell--searches table-cell--right table-cell--nowrap" colspan="1">
                    1
                  </td>
                  <td class="table-cell--clicks table-cell--right table-cell--nowrap" colspan="1">
                    0
                  </td>
                  <td
                    class="table-cell--mobile_app_installs table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td
                    class="table-cell--clicks_paid table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td
                    class="table-cell--bookings_processing table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td
                    class="table-cell--bookings_cancelled table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td
                    class="table-cell--bookings_paid table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td
                    class="table-cell--advertising_profit table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td
                    class="table-cell--total_profit table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td
                    class="table-cell--bookings_pending_profit table-cell--right table-cell--nowrap"
                    colspan="1"
                  >
                    0
                  </td>
                  <td class="table-cell--ctr table-cell--right table-cell--nowrap" colspan="1">
                    0.00%
                  </td>
                  <td class="table-cell--str table-cell--right table-cell--nowrap" colspan="1">
                    0.00%
                  </td>
                  <td class="table-cell--ecpc table-cell--right table-cell--nowrap" colspan="1">
                    0
                  </td>
                  <td class="table-cell--ecps table-cell--right table-cell--nowrap" colspan="1">
                    0
                  </td>
                  <td class="table-cell--ecpu table-cell--right table-cell--nowrap" colspan="1">
                    0
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="table-cell--dates">
                    <div style="width: auto">
                      <span class="cell__dates cell__dates--weekend">09.07.2022 Sat</span>
                    </div>
                  </td>
                  <td class="table-cell--inits table-cell--right table-cell--nowrap">
                    <div style="width: auto">15</div>
                  </td>
                  <td class="table-cell--redirects table-cell--right table-cell--nowrap">
                    <div style="width: auto">1</div>
                  </td>
                  <td class="table-cell--visitors table-cell--right table-cell--nowrap">
                    <div style="width: auto">2</div>
                  </td>
                  <td class="table-cell--searches table-cell--right table-cell--nowrap">
                    <div style="width: auto">1</div>
                  </td>
                  <td
                    class="table-cell--clicks table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: 80px">0</div>
                  </td>
                  <td
                    class="table-cell--mobile_app_installs table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--clicks_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_processing table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_cancelled table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--advertising_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--total_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_pending_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ctr table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--str table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--ecpc table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecps table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecpu table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                </tr>
                <tr>
                  <td class="table-cell--dates">
                    <div style="width: auto">
                      <span class="cell__dates">08.07.2022 Fri</span>
                    </div>
                  </td>
                  <td
                    class="table-cell--inits table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--redirects table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--visitors table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--searches table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--clicks table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: 80px">0</div>
                  </td>
                  <td
                    class="table-cell--mobile_app_installs table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--clicks_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_processing table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_cancelled table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--advertising_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--total_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_pending_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ctr table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--str table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--ecpc table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecps table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecpu table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                </tr>
                <tr>
                  <td class="table-cell--dates">
                    <div style="width: auto">
                      <span class="cell__dates">07.07.2022 Thu</span>
                    </div>
                  </td>
                  <td
                    class="table-cell--inits table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--redirects table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--visitors table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--searches table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--clicks table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: 80px">0</div>
                  </td>
                  <td
                    class="table-cell--mobile_app_installs table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--clicks_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_processing table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_cancelled table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--advertising_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--total_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_pending_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ctr table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--str table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--ecpc table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecps table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecpu table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                </tr>
                <tr>
                  <td class="table-cell--dates">
                    <div style="width: auto">
                      <span class="cell__dates">06.07.2022 Wed</span>
                    </div>
                  </td>
                  <td
                    class="table-cell--inits table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--redirects table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--visitors table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--searches table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--clicks table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: 80px">0</div>
                  </td>
                  <td
                    class="table-cell--mobile_app_installs table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--clicks_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_processing table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_cancelled table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--bookings_paid table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto"><span>0</span></div>
                  </td>
                  <td
                    class="table-cell--advertising_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--total_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--bookings_pending_profit table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ctr table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--str table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0.00%</div>
                  </td>
                  <td
                    class="table-cell--ecpc table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecps table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                  <td
                    class="table-cell--ecpu table-cell--right table-cell--nowrap table-cell--muted"
                  >
                    <div style="width: auto">0</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
    <hr />
  </b-container>
</template>
<script>
import Widgets from "../connectivity/DisplayFacts.vue";
import APIIntegration from "../connectivity/APIIntegration.vue";
export default {
  data() {
    return {
      showModal: false,
      showDelete: false,
      whitelistToEdit: {
        id: null,
        name: null,
        domain: null,
      },
      whitelistToDelete: null,
    };
  },
  async created() {
    await this.getWhitelists();
  },
  computed: {
    whitelists() {
      return this.$store.getters["devTools/getWhitelists"];
    },
  },
  components: { Widgets, APIIntegration },
  methods: {
    getDate(inputDate) {
      return inputDate.split("T")[0];
    },
    async getWhitelists() {
      await this.$store
        .dispatch("devTools/getWhitelists")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          console.log(response);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    showEdit(whitelist) {
      this.whitelistToEdit = {
        id: whitelist.id,
        name: whitelist.name,
        domain: whitelist.domain,
      };
      this.showModal = true;
    },
    showAdd() {
      this.whitelistToEdit = {
        id: null,
        name: null,
        domain: null,
      };
      this.showModal = true;
    },
    showRemove(whitelistToRemove) {
      this.whitelistToDelete = whitelistToRemove;
      this.showDelete = true;
    },
    hideRemove() {
      this.showDelete = false;
    },
    async removeWhitelist() {
      await this.$store
        .dispatch("devTools/deleteWhitelist", this.whitelistToDelete.id)
        .then(() => {
          this.getWhitelists();
          this.hideRemove();
        })
        .catch(() => {});
    },
    async save() {
      this.$store
        .dispatch("devTools/saveWhitelist", this.whitelistToEdit)
        .then(() => {
          this.getWhitelists();
        })
        .catch((error) => {
          console.log(error);
        });
      this.showModal = false;
    },
    cancel() {
      this.showModal = false;
    },
  },
};
</script>
