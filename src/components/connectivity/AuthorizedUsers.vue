<template>
  <div class="">
    <div class="container">
      <b-row>
        <b-col cols="10">
          <h4>List of your Authorized users</h4>
          <span
            >Invite users and manage them when they accept your invitation in Ananas Global Facts.
            <b-icon
              icon="question-circle-fill"
              scale="1.2"
              variant="primary"
              aria-label="Help"
            ></b-icon>
          </span>
        </b-col>
        <b-col cols="2">
          <b-button variant="outline-success" class="button" to="/addauth-users/0/"
            >Add User</b-button
          >
        </b-col>
      </b-row>
      <div class="GFS-Center-Table">
        <table class="table table-hover">
          <thead class="GFS-TNave">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in authorizedUsers" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <code :class="{ 'text-primary': user.isActive }">{{
                  userStatus(user.isActive)
                }}</code>
              </td>
              <b-button variant="outline-danger" :to="`/addauth-users/${user.id}/`"
                >Persmissions</b-button
              >
              <b-button variant="outline-info" @click="removeAuthorizedUser(user)">Remove</b-button>
            </tr>
          </tbody>
        </table>
      </div>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="themeChanger">
          <div class="modal">
            <header class="modalheader">
              <h5>Confirm</h5>
            </header>
            <form v-on:submit.prevent @submit="AddAuthorizedUser()">
              <div class="form-group">
                <label>Username <span class="text-danger">*</span></label>
                <input
                  v-model.trim="newUser.username"
                  type="text"
                  class="form-control form-control"
                  required
                />
                <ul>
                  <li v-for="(m, index) in invalidEntry.username" :key="index" class="text-danger">
                    {{ m }}
                  </li>
                </ul>
              </div>

              <div class="form-group">
                <label>Email address <span class="text-danger">*</span></label>
                <input v-model.trim="newUser.email" type="email" class="form-control" required />
                <ul>
                  <li v-for="(m, index) in invalidEntry.email" :key="index" class="text-danger">
                    {{ m }}
                  </li>
                </ul>
              </div>
              <div class="form-group">
                <label>Password <span class="text-danger"> *</span></label>
                <input v-model="newUser.password" type="password" class="form-control" required />
                <ul>
                  <li v-for="(m, index) in invalidEntry.password" :key="index" class="text-danger">
                    {{ m }}
                  </li>
                </ul>
              </div>

              <div class="form-group">
                <label>Retype Password <span class="text-danger"> *</span></label>
                <input
                  v-model="newUser.re_password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
              <ul>
                <li
                  v-for="(m, index) in invalidEntry.nonFieldErrors"
                  :key="index"
                  class="text-danger"
                >
                  {{ m }}
                </li>
              </ul>

              <input type="submit" class="modalbutton" value="Save" />
              <button type="button" class="modalbutton" @click="cancel()">Cancel</button>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      themeChanger: false,
      showModal: false,
      authorizedUsers: [],
      newUser: {
        username: "",
        email: "",
        password: "",
        re_password: "",
        manager: this.currentUser,
      },
      invalidEntry: {
        username: [],
        email: [],
        password: [],
        rePassword: [],
        nonFieldErrors: [],
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/userInfo"].id || 0;
    },
  },
  created() {
    this.getAuthorizedUsers();
  },
  methods: {
    getAuthorizedUsers() {
      this.$store.dispatch("view/load", true);
      this.$store
        .dispatch("authorizedUsers/retrieveAuthorizedUsers")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.authorizedUsers = this.$store.getters["authorizedUsers/getAuthorizedUsers"];
          this.$store.dispatch("view/load", false);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.$store.dispatch("view/load", false);
        });
    },
    userStatus(accepted) {
      return accepted ? "Activated" : "No Activated";
    },
    showAdd() {
      this.newUser = {
        username: "",
        email: "",
        password: "",
        re_password: "",
        manager: this.currentUser,
      };
      /* console.log(this.newUser); */
      this.showModal = true;
    },
    async AddAuthorizedUser() {
      /* console.log("invoked"); */
      await this.$store
        .dispatch("user/register", this.newUser)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
          this.getAuthorizedUsers();
          this.showModal = false;
        })
        .catch((error) => {
          this.invalidEntry.username = error.username || [];
          this.invalidEntry.email = error.email || [];
          this.invalidEntry.password = error.password || [];
          this.invalidEntry.nonFieldErrors =
            this.newUser.password === this.newUser.re_password
              ? []
              : ["The two password fields didn't match."];
        });
    },
    async removeAuthorizedUser(userToRemove) {
      await this.$store
        .dispatch("authorizedUsers/deleteAuthorizedUser", userToRemove.id)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.getAuthorizedUsers();
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          this.getAuthorizedUsers();
          /* console.log(error); */
        });
    },
    cancel() {
      this.showModal = false;
    },
  },
};
</script>
