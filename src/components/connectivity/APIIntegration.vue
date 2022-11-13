<template>
  <div class="container">
    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col cols="12">
            <div class="program-tools-content-wrapper">
              <b-row>
                <b-col cols="10">
                  <span
                    >Create and manage your APIs.
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
                    >Create API key</b-button
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
                      <th scope="col">Description</th>
                      <th scope="col">Token</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(apiKey, index) in apiKeys" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ getDate(apiKey.date_created) }}</td>
                      <td>{{ apiKey.title }}</td>
                      <td>{{ apiKey.description }}</td>
                      <td>{{ apiKey.token }}</td>
                      <b-button size="sm" variant="outline-info" @click="showEdit(apiKey)"
                        >Edit</b-button
                      >
                      <b-button size="sm" variant="outline-danger" @click="showRemove(apiKey)"
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
                      <h5>Create new API key</h5>
                    </header>
                    <div class="modalcontainer">
                      <form
                        v-on:submit.prevent
                        @submit="save()"
                        class="form-horizontal"
                        id="configForm"
                      >
                        <fieldset>
                          <div class="form-group row">
                            <label class="control-label col-sm-3">Type</label>
                            <div class="controls col-sm-9">
                              <input
                                type="text"
                                value="API Facts synchronization"
                                disabled="disabled"
                                class="form-control disabled"
                              />
                            </div>
                          </div>

                          <div class="form-group row">
                            <label class="control-label col-sm-3">Title</label>
                            <div class="controls col-sm-9">
                              <input
                                type="text"
                                name="title"
                                class="form-control"
                                v-model="apiKeyToEdit.title"
                                data-validate="true"
                                data-required="true"
                                data-missing-msg="Required"
                                required
                              />
                            </div>
                          </div>

                          <div class="form-group row">
                            <label class="control-label col-sm-3">Description</label>
                            <div class="controls col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                name="description"
                                v-model="apiKeyToEdit.description"
                              />
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="control-label col-sm-3">URL</label>
                            <div class="controls col-sm-9">
                              <select
                                class="form-control"
                                name="param_url"
                                data-validate="true"
                                data-required="true"
                                data-missing-msg="Required"
                                v-model="apiKeyToEdit.domain"
                                :options="whitelists"
                                required
                              >
                                <option :value="null">Select target URL</option>
                                <option v-for="(w, index) in whitelists" :key="index" :value="w.id">
                                  {{ w.name }}
                                </option>
                              </select>
                            </div>
                          </div>

                          <!-- <div class="form-group row">
                            <label class="control-label col-sm-3">Data format</label>
                            <div class="controls col-sm-9">
                              <select name="param_format" class="form-control">
                                <option value="json" selected="selected">json</option>
                                <option value="xml">xml</option>
                              </select>
                            </div>
                          </div> -->

                          <div class="form-group row">
                            <div class="controls col-sm-6">
                              <div class="checkbox">
                                <label
                                  ><input
                                    type="checkbox"
                                    name="fact-sheet"
                                    v-model="apiKeyToEdit.fact_sheet"
                                  />
                                  Facts Sheet</label
                                >
                              </div>
                            </div>
                          </div>

                          <div class="form-group row">
                            <div class="controls col-sm-6">
                              <div class="checkbox">
                                <label
                                  ><input
                                    type="checkbox"
                                    name="stop-sale"
                                    v-model="apiKeyToEdit.stop_sale"
                                  />
                                  Stop Sale Chart</label
                                >
                              </div>
                            </div>
                          </div>

                          <div class="form-group row">
                            <div class="controls col-sm-6">
                              <div class="checkbox">
                                <label
                                  ><input
                                    type="checkbox"
                                    name="hotel-photos"
                                    v-model="apiKeyToEdit.hotel_photos"
                                  />
                                  Hotel Photos</label
                                >
                              </div>
                            </div>
                          </div>

                          <input type="hidden" name="owner.id" value="30658" />
                          <input type="hidden" name="systemType" value="API_WEBHOOK" />
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
                        </fieldset>
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
                      <p>Are you sure you want to delete this API key?</p>
                      <div class="row">
                        <div class="col-md-12 text-right">
                          <button
                            type="button"
                            class="btn btn-outline-danger"
                            @click="removeApiKey"
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
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <h5>End points for API</h5>
            <ul>
              <li>
                <p>http://127.0.0.1:8000/api/factsinfo</p>
              </li>
              <li>
                <p>http://127.0.0.1:8000/api/photos</p>
              </li>
              <li>
                <p>http://127.0.0.1:8000/api/availabilitychart</p>
              </li>
            </ul>
            <p>
              To acquire the data please use the Endpoint + token created above, keep in mind the
              request will not work except from permitted domain/server
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>
              <b>for additional information refer to the documentation page <a href="#">here</a></b>
            </p>
          </b-col>
        </b-row>
        <footer style="margin-top: 30px">
          <b-row>
            <b-col>
              <p style="font-weight: 400px">Terms and Conditions</p>
              <p>
                By installing the Ananas api, you: (i) acknowledge and accept the Ananas GMBH Terms
                of Use policy (ToU); (ii) promise that your usage of the Ananas API connections will
                not violate these ToU; and(iii) shall maintain and publish a privacy policy on your
                site in accordance with s.9 of the ToU.
              </p>
            </b-col>
          </b-row>
        </footer>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      showDelete: false,
      apiKeyToEdit: {
        id: null,
        title: null,
        description: null,
        token: null,
        domain: null,
        fact_sheet: false,
        stop_sale: false,
        hotel_photos: false,
      },
      apiKeyToDelete: null,
    };
  },
  async created() {
    // await this.getWhitelists();
    await this.getApiKeys();
  },
  computed: {
    whitelists() {
      return this.$store.getters["devTools/getWhitelists"];
    },
    apiKeys() {
      return this.$store.getters["devTools/getApiKeys"];
    },
  },
  methods: {
    getDate(inputDate) {
      return inputDate.split("T")[0];
    },
    // async getWhitelists() {
    //   await this.$store
    //     .dispatch("devTools/getWhitelists")
    //     // eslint-disable-next-line no-unused-vars
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     // eslint-disable-next-line no-unused-vars
    //     .catch((error) => {
    //       /* console.log(error); */
    //     });
    // },
    async getApiKeys() {
      await this.$store
        .dispatch("devTools/getApiKeys")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          console.log(response);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    showEdit(apiKey) {
      this.apiKeyToEdit = {
        id: apiKey.id,
        title: apiKey.title,
        description: apiKey.description,
        token: apiKey.token,
        domain: apiKey.domain,
        fact_sheet: apiKey.fact_sheet,
        stop_sale: apiKey.stop_sale,
        hotel_photos: apiKey.hotel_photos,
      };
      this.showModal = true;
    },
    showAdd() {
      this.apiKeyToEdit = {
        id: null,
        title: null,
        description: null,
        token: null,
        domain: null,
        fact_sheet: false,
        stop_sale: false,
        hotel_photos: false,
      };
      this.showModal = true;
    },
    showRemove(apiKeyToRemove) {
      this.apiKeyToDelete = apiKeyToRemove;
      this.showDelete = true;
    },
    hideRemove() {
      this.showDelete = false;
    },
    async removeApiKey() {
      await this.$store
        .dispatch("devTools/deleteApiKey", this.apiKeyToDelete.id)
        .then(() => {
          this.getApiKeys();
          this.hideRemove();
        })
        .catch(() => {});
    },
    async save() {
      await this.$store
        .dispatch("devTools/saveApiKey", this.apiKeyToEdit)
        .then(() => {
          this.getApiKeys();
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
