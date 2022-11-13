<template>
  <div class="container" fluid>
    <input type="hidden" name="userRef" value="" />
    <h4 class="">Contact Details</h4>
    <b-row>
      <b-col cols="12">
        <b-form
          class="form-horizontal form-group form-group-sm"
          v-if="!registered"
          v-on:submit.prevent
          @submit="save()"
        >
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="User Name"
                label-size="sm"
                label-cols="12"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="2"
                content-cols="12"
                content-cols-sm="10"
                content-cols-md="10"
                content-cols-lg="5"
                label-align-sm="right"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidFeedback"
                :state="state"
              >
                <b-form-input
                  v-model="newUser.username"
                  type="text"
                  size="sm"
                  placeholder="enter a unique username"
                  :state="state"
                  trim
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="E-mail"
                label-size="sm"
                label-cols="12"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="2"
                content-cols="12"
                content-cols-sm="10"
                content-cols-md="10"
                content-cols-lg="5"
                label-align-sm="right"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidFeedback"
                :state="state"
                v-if="userId === '0'"
              >
                <b-form-input
                  v-model="newUser.email"
                  type="email"
                  size="sm"
                  placeholder="Enter email"
                  :state="state"
                  trim
                  required
                ></b-form-input>
                <ul>
                  <li v-for="(m, index) in invalidEntry.email" :key="index" class="text-danger">
                    {{ m }}
                  </li>
                </ul>
              </b-form-group>
              <b-form-group
                label="Title"
                label-size="sm"
                label-cols="12"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="2"
                content-cols="12"
                content-cols-sm="10"
                content-cols-md="10"
                content-cols-lg="5"
                label-align-sm="right"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidFeedback"
                :state="state"
              >
                <b-form-input
                  v-model="newUser.title"
                  type="text"
                  size="sm"
                  placeholder="enter title (optional)"
                  :state="state"
                  trim
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="First Name"
                label-size="sm"
                label-cols="12"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="2"
                content-cols="12"
                content-cols-sm="10"
                content-cols-md="10"
                content-cols-lg="5"
                label-align-sm="right"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidFeedback"
                :state="state"
              >
                <b-form-input
                  v-model="newUser.firstName"
                  type="text"
                  size="sm"
                  placeholder="enter last name"
                  :state="state"
                  trim
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Last Name"
                label-size="sm"
                label-cols="12"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="2"
                content-cols="12"
                content-cols-sm="10"
                content-cols-md="10"
                content-cols-lg="5"
                label-align-sm="right"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidFeedback"
                :state="state"
              >
                <b-form-input
                  v-model="newUser.lastName"
                  type="text"
                  size="sm"
                  placeholder="enter last name"
                  :state="state"
                  trim
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Phone Number"
                label-size="sm"
                label-cols="12"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="2"
                content-cols="12"
                content-cols-sm="10"
                content-cols-md="10"
                content-cols-lg="5"
                label-align-sm="right"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidFeedback"
                :state="state"
              >
                <b-form-input
                  v-model="newUser.phone"
                  type="text"
                  size="sm"
                  placeholder="+12-345678"
                  :state="state"
                  trim
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Location"
                label-size="sm"
                label-cols="12"
                label-cols-sm="2"
                label-cols-md="2"
                label-cols-lg="2"
                content-cols="12"
                content-cols-sm="10"
                content-cols-md="10"
                content-cols-lg="5"
                label-align-sm="right"
                valid-feedback="Thank you!"
                :invalid-feedback="invalidFeedback"
                :state="state"
              >
                <b-select size="sm" v-model="newUser.country" :options="countries">
                  <b-form-select-option :value="null">Please select an option</b-form-select-option>
                </b-select>
              </b-form-group>
              <div v-if="userId === '0'">
                <b-form-group
                  label="Password"
                  label-size="sm"
                  label-cols="12"
                  label-cols-sm="2"
                  label-cols-md="2"
                  label-cols-lg="2"
                  content-cols="12"
                  content-cols-sm="10"
                  content-cols-md="10"
                  content-cols-lg="5"
                  label-align-sm="right"
                  valid-feedback="Thank you!"
                  :invalid-feedback="invalidFeedback"
                  :state="state"
                >
                  <b-form-input
                    v-model="newUser.password"
                    type="password"
                    size="sm"
                    placeholder="Password min. 8 characters"
                    :state="state"
                    trim
                    required
                  ></b-form-input>
                  <b-form-text id="password-help-block">
                    Your password must be 8-20 characters long, contain letters and numbers, and
                    must not contain spaces, special characters, or emoji.
                  </b-form-text>
                  <ul>
                    <li
                      v-for="(m, index) in invalidEntry.nonFieldErrors"
                      :key="index"
                      class="text-danger"
                    >
                      {{ m }}
                    </li>
                  </ul>
                </b-form-group>
                <b-form-group
                  label="Confirm Password"
                  label-size="sm"
                  label-cols="12"
                  label-cols-sm="2"
                  label-cols-md="2"
                  label-cols-lg="2"
                  content-cols="12"
                  content-cols-sm="10"
                  content-cols-md="10"
                  content-cols-lg="5"
                  label-align-sm="right"
                  valid-feedback="Thank you!"
                  :invalid-feedback="invalidFeedback"
                  :state="state"
                >
                  <b-form-input
                    v-model="newUser.rePassword"
                    type="password"
                    size="sm"
                    placeholder="retype same password"
                    :state="state"
                    trim
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <div>
                <h4 id="manage-users-permissions-heading" class="">Permissions</h4>
                <b-card>
                  <b-form-checkbox v-model="userPermissions.detailsManager" alt="temp">
                    Manage Company Details, contact, logo..etc</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.layoutManager" alt="temp">
                    Manage Export Layout style</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.devToolsManager" alt="temp">
                    Manage Developer Tools, system integrations,
                  </b-form-checkbox>
                  <b-form-checkbox v-model="userPermissions.partnercontractManager" alt="temp">
                    Manage Partner's connections</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.premiumManager" alt="temp">
                    Manage Premium Subscription</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.addFactsManager" alt="temp">
                    Add / Edit Fact details</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.addPropertyManager" alt="temp">
                    Add / Edit Properties</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.addPhotosManager" alt="temp">
                    Add / Edit Property Photos</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.stopSaleManager" alt="temp">
                    Manage Stop Sale / availability charts</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.roomTypeManager" alt="temp">
                    Add / Edit Room Types for Stop sale</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.stopContactsManager" alt="temp">
                    Manage Stop Sale contacts list</b-form-checkbox
                  >
                  <b-form-checkbox v-model="userPermissions.stopsPublishManager" alt="temp">
                    Manage Publishing Stop Sale</b-form-checkbox
                  >
                </b-card>
              </div>
            </b-col>
            <b-col>
              <div>
                <h4 id="manage-users-roles-heading" class="">Roles</h4>
                <div class="">
                  <div>Select the roles that this user will perform.</div>
                  <b-select
                    size="sm"
                    v-model="userPermissions.userRoleInHotel"
                    :options="userRoleOptions"
                  >
                    <b-form-select-option :value="null"
                      >Please select an option</b-form-select-option
                    >
                  </b-select>
                </div>
              </div>
              <hr />
              <div>
                <h4 id="manage-users-roles-heading" class="">Property</h4>
                <div class="">
                  <div style="margin-bottom: 15px">
                    Select which property is the user have the rights to access.
                  </div>
                  <ul class="LegacyEditUsersCommon__checkboxList___1frXr">
                    <li class="LegacyEditUsersCommon__checkboxListItem___-3A0R">
                      <div>
                        <label class="LegacyEditUsersCommon__disabledLabel___2fyPT">
                          <b-form-checkbox
                            v-model="userPermissions.listOfPropertyRights"
                            v-for="(property, index) in properties"
                            :key="index"
                            :value="property.id"
                            name="flavour-3a"
                            stacked
                          >
                            {{ property.hotelName }}
                          </b-form-checkbox>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button type="submit" style="margin-right: 50px" variant="success">
                Save
                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
              </b-button>
              <b-button to="/authorized-users" variant="danger">Cancel</b-button>
            </b-col>
            <b-col> </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      invalidFeedback: "test",
      state: null,
      isLoading: false,
      registered: false,
      newUser: {
        username: "",
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        title: "",
        password: "",
        rePassword: "",
        country: null,
        manager: this.currentUser,
      },
      userPermissions: {
        id: null,
        detailsManager: false,
        layoutManager: false,
        devToolsManager: false,
        partnercontractManager: false,
        premiumManager: false,
        addFactsManager: false,
        addPropertyManager: false,
        addPhotosManager: false,
        stopSaleManager: false,
        roomTypeManager: false,
        stopContactsManager: false,
        stopsPublishManager: false,
        userRoleInHotel: null,
        listOfPropertyRights: [],
      },
      userPermissionsOptions: [
        "Manage Company Details, contact, logo..etc",
        "Manage Export Layout style",
        "Manage Developer Tools, system integrations, ",
        "Manage Partner's connections",
        "Manage Premium Subscription",
        "Add / Edit Fact details",
        "Add / Edit Properties",
        "Add / Edit Property Photos",
        "Manage Stop Sale / availability charts",
        "Add / Edit Room Types for Stop sale",
        "Manage Stop Sale contacts list",
        "Manage Publishing Stop Sale",
      ],
      userRoleOptions: [
        { value: "GM", text: "General Manager" },
        { value: "Res", text: "Reservations" },
        { value: "FO", text: "Front Office" },
        { value: "PR", text: "Public Relations" },
        { value: "IT", text: "IT specialist" },
      ],
      invalidEntry: {
        username: [],
        email: [],
        phone: [],
        firstName: [],
        lastName: [],
        country: [],
        password: [],
        rePassword: [],
        nonFieldErrors: [],
      },
      countries: this.$store.getters["countries/getCountries"],
    };
  },
  computed: {
    properties() {
      return this.$store.getters["property/getProperties"];
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    currentUser() {
      return this.$store.getters["user/userInfo"].id || 0;
    },
    userId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    if (this.userId > 0) {
      await this.$store.dispatch("authorizedUsers/getCurrentAuthorizedUser", this.userId);
      this.newUser = this.$store.getters["authorizedUsers/getCurrentAuthorizedUser"];
      await this.$store.dispatch("authorizedUsers/getPermissions", this.userId);
      this.userPermissions = this.$store.getters["authorizedUsers/getCurrentPermissions"];
    }
  },
  methods: {
    save() {
      if (this.userId > 0) {
        this.update();
      } else {
        this.signup();
      }
    },
    async getProperties() {
      await this.$store
        .dispatch("property/getInfo")
        .then(() => {})
        .catch(() => {});
      /* console.log(this.properties); */
    },
    async update() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const requestBody = {
        username: this.newUser.username,
        phone: this.newUser.phone,
        first_name: this.newUser.firstName,
        last_name: this.newUser.lastName,
        country: this.newUser.country,
        title: this.newUser.title,
        id: this.userId,
      };
      await this.$store
        .dispatch("authorizedUsers/updateAuthorizedUser", requestBody)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.updatePermissions(this.userId);
          this.registered = true;
          this.$router.push("/authorized-users");
        })
        .catch((error) => {
          this.invalidEntry.username = error.username || [];
          this.invalidEntry.phone = error.phone || [];
          this.invalidEntry.firstName = error.firstName || [];
          this.invalidEntry.lastName = error.lastName || [];
          this.invalidEntry.country = error.country || [];
        });
      this.isLoading = false;
    },
    async signup() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const requestBody = {
        username: this.newUser.username,
        phone: this.newUser.phone,
        first_name: this.newUser.firstName,
        last_name: this.newUser.lastName,
        country: this.newUser.country,
        email: this.newUser.email,
        title: this.newUser.title,
        password: this.newUser.password,
        re_password: this.newUser.rePassword,
        manager: this.currentUser,
      };
      await this.$store
        .dispatch("user/register", requestBody)
        .then((response) => {
          /* console.log("reg", response); */
          this.updatePermissions(response.data.id);
          this.registered = true;
          this.$router.push("/authorized-users");
        })
        .catch((error) => {
          this.invalidEntry.username = error.username || [];
          this.invalidEntry.phone = error.phone || [];
          this.invalidEntry.firstName = error.firstName || [];
          this.invalidEntry.lastName = error.lastName || [];
          this.invalidEntry.email = error.email || [];
          this.invalidEntry.password = error.password || [];
          this.invalidEntry.country = error.country || [];
          this.invalidEntry.nonFieldErrors =
            this.newUser.password === this.newUser.rePassword
              ? []
              : ["The two password fields didn't match."];
        });
      this.isLoading = false;
    },
    async updatePermissions(id) {
      const newData = {
        user: id,
        id: this.userPermissions.id,
        company: this.userPermissions.detailsManager,
        export: this.userPermissions.layoutManager,
        developer_tools: this.userPermissions.devToolsManager,
        partner_connections: this.userPermissions.partnercontractManager,
        premium_subscription: this.userPermissions.premiumManager,
        facts: this.userPermissions.addFactsManager,
        properties: this.userPermissions.addPropertyManager,
        photos: this.userPermissions.addPhotosManager,
        stop_sales: this.userPermissions.stopSaleManager,
        stop_sale_room_types: this.userPermissions.roomTypeManager,
        stop_sale_contact_list: this.userPermissions.stopContactsManager,
        stop_sale_publishing: this.userPermissions.stopsPublishManager,
        role: this.userPermissions.userRoleInHotel,
        properties_allowed: this.userPermissions.listOfPropertyRights || [],
      };
      await this.$store.dispatch("authorizedUsers/postPermissions", newData);
    },
  },
};
</script>
