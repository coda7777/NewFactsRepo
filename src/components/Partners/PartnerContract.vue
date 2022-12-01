/* eslint-disable max-len */
<template>
  <div class="container">
    <div id="PageHeaderWarnings">
      <div id="PORTAL_ROOT" style=""></div>
    </div>
    <div class="page-header">
      <h1>Marketplace contract</h1>
      <p class="page-description">Negotiate a contract to sell or supply products.</p>
    </div>
    <div id="contract">
      <div class="row">
        <div class="col-md-7">
          <table class="table">
            <thead>
              <tr>
                <th>Account Type</th>
                <th>Company Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-transform: uppercase">
                  {{ partner.accountType }}
                </td>
                <td>{{ partner.company }}</td>
                <td><b-badge pill variant="info">New</b-badge></td>
              </tr>
            </tbody>
          </table>
          <hr />
          <br />
          <div class="form-group row">
            <label class="col-sm-3 col-form-label col-form-label-sm">Contract terms</label>
            <div class="col-sm-6">
              <select class="form-control" v-model="contract.contract_terms">
                <option v-for="(o, index) in contractTerms" :key="index" :value="o.value">
                  {{ o.text }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <legend>Contract details</legend>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Tour Operator may edit facts documents according to moderation level set.</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.to_edit_facts">
                  <option v-for="(o, index) in contractBoolean" :key="index" :value="o.value">
                    {{ o.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Tour Operator may add its logo on header of facts documents.</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.to_add_its_logo">
                  <option v-for="(o, index) in contractBoolean" :key="index" :value="o.value">
                    {{ o.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Tour Operator may select photos to view from Accommodation's gallery.</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.to_select_photos">
                  <option v-for="(o, index) in contractBoolean" :key="index" :value="o.value">
                    {{ o.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Tour Operator may add own photos of the property.</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.to_add_own_photos">
                  <option v-for="(o, index) in contractBoolean" :key="index" :value="o.value">
                    {{ o.text }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Tour Operator special allotment stop-sale.</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.to_special_allotment">
                  <option value="S">Special stop-sale allotment</option>
                  <option value="G">General accommodation's stop-sale</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Tour Operator May sync stop-sale feed</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.to_sync_ss">
                  <option :value="true">Sync via Ananas API</option>
                  <option :value="false">Not Allowed</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-12 help-block">
                In case Tour Operator, Agent, 3rd Party is not managing the stop sale via API
                connection. Determine the deadline in which first party have to apply the stop-sale
                within, otherwise legal contract permit the accommodation to apply their own
                penalty.
              </div>
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Deadline to apply Stop-sale Manually</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.ss_deadline">
                  <option value="8">8 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold cntdet"
                >Tour Operator may allow status "On Request" on stopped days.</label
              >
              <div class="col-sm-6">
                <select class="form-control" v-model="contract.to_allow_on_request">
                  <option :value="true">Allowed</option>
                  <option :value="false">Not allowed</option>
                </select>
              </div>
            </div>
            <legend></legend>
            <div class="form-group row">
              <label class="col-sm-6 col-form-label col-form-label-sm ananas-bold"
                >The notice period that the Accommodation must give before terminating the
                contract.</label
              >
              <div class="col" style="display: flex; align-items: center">
                <input
                  type="number"
                  min="0"
                  step="1"
                  class="form-control"
                  v-model="contract.notice_period"
                />
                <span> DAYS </span>
              </div>
            </div>
          </div>
          <!-- commented out on purpose, please ignore  -->
          <!-- <div class="Signatures">
            <legend>Tour Operator signature</legend>
              <div class="row">
                <div class="col-sm-5">
                  <div class="BokunTextInput form-group firstName">
                    <label class="control-label">Name</label>
                    <div class="">
                      <input type="text" class="form-control" placeholder="" value="Mohammad" />
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="BokunTextInput form-group title">
                    <label class="control-label">Job title</label>
                    <div class="">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Job title of the person"
                        value=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-5">
                  <div class="BokunTextInput form-group emailAddress">
                    <label class="control-label">Email address <span> *</span> </label>
                    <div class="">
                      <input
                        type="email"
                        class="form-control"
                        placeholder=""
                        value="hamada_7777@hotmail.com"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="BokunTextInput form-group phoneNumber">
                    <label class="control-label">Phone number</label>
                    <div class="">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="With international dialling code (e.g. +1, +44 etc.)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
        </div>
        <div class="col-md-5">
          <div class="ContractActions">
            <div class="form-group">
              <label class="col-sm-3 col-form-label col-form-label-sm">Enter a comment</label>
              <textarea class="form-control" rows="3" v-model="contract.comment"></textarea>
              <p class="help-block">You must enter a comment before taking an action.</p>
            </div>
            <div style="margin-bottom: 30px">
              <b-checkbox v-model="isConfirmed"
                >I Confirm checking and validating the data of the contract before
                submitting.</b-checkbox
              >
            </div>

            <span>
              <b-button
                type="button"
                @click="postContract"
                variant="success"
                size="ms"
                style="margin-bottom: 10px"
              >
                Send proposal
              </b-button>
              &nbsp;
              <b-button
                @click="cancel"
                type="button"
                variant="danger"
                size="ms"
                style="margin-bottom: 10px"
              >
                Cancel
              </b-button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden-print">
      <footer>
        <hr />
        <p class="poweredBy" style="text-align: center">
          Powered by
          <a class="not-searchable" href="https://app.hotelfacts.net">
            <img
              src="http://app.hotelfacts.net/static/img/logo.401fc71b.png"
              style="vertical-align: bottom; height: 35px"
            />
          </a>
        </p>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: "",
      isConfirmed: false,
      contract: {
        partner: 0,
        contract_terms: "F",
        to_edit_facts: "Y",
        to_add_its_logo: "Y",
        to_select_photos: "Y",
        to_add_own_photos: "Y",
        to_special_allotment: "S",
        to_sync_ss: true,
        ss_deadline: 8,
        to_allow_on_request: true,
        notice_period: 0,
        comment: "",
      },
    };
  },
  computed: {
    contractTerms() {
      return this.$store.getters["options/getContractTerms"];
    },
    contractPhotoOptions() {
      return this.$store.getters["options/getContractPhotoOptions"];
    },
    contractSpecialAllotment() {
      return this.$store.getters["options/getContractSpecialAllotment"];
    },
    contractStatus() {
      return this.$store.getters["options/getContractStatus"];
    },
    contractBoolean() {
      return this.$store.getters["options/getContractBoolean"];
    },
    partner() {
      return this.$store.getters["partners/getPartnerToContract"];
    },
  },
  methods: {
    cancel() {
      this.$router.push("/partners");
    },
    async postContract() {
      this.contract.partner = this.partner.id;
      console.log("contract info", this.contract);
      if (!this.isConfirmed) {
        this.$toast.error(
          "You must confirm checking and validating the data of the contract before submitting."
        );
        return;
      }
      await this.$store
        .dispatch("partners/postContract", this.contract)
        .then(() => {
          this.$toast.success("Your proposal has been sent successfully.");
          this.$router.push("/partners");
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
  },
};
</script>
