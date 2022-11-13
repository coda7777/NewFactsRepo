<template>
  <b-container>
    <b-row style="margin: 20px 0px">
      <b-col cols="10">
        <h4>List of your registered whitelists</h4>
        <span
          >Create and manage your Mailing groups and contacts list.
          <b-icon
            icon="question-circle-fill"
            scale="1.2"
            variant="primary"
            aria-label="Help"
          ></b-icon>
        </span>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col cols="3" class="section-border">
        <div>
          <h4 style="padding: 20px 0px">Mailing Groups</h4>
        </div>
        <b-list-group class="list-group">
          <b-list-group-item
            v-for="list in mailingLists"
            :key="list.id"
            :value="list.name"
            href="#"
            class="list-group-item"
            :class="{ 'bg-warning': list.id === currentGroup }"
            @click="selectGroup(list.id)"
          >
            {{ list.name }}
          </b-list-group-item>
        </b-list-group>
        <div style="margin: 30px 0px">
          <b-button variant="success" class="button" @click="showAddGroup()"
            >Create New Group</b-button
          >
        </div>
      </b-col>
      <b-col cols="9">
        <b-card>
          <b-row>
            <b-col style="margin: 0px 0px 0px 25px; padding: 0px 40px; max-width: fit-content">
              <div class="row" v-if="currentGroup > 0">
                <h4 style="border-bottom: solid black 1px">
                  {{ currentDisplayedList.name }}
                </h4>
                <small
                  style="
                    color: #acacac;
                    margin-left: 20px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                  "
                >
                  {{ currentDisplayedList.description }}
                </small>
              </div>
              <h4 v-else>Select a group</h4>
            </b-col>
          </b-row>

          <b-row style="padding: 0px 20px">
            <b-col cols="8">
              <div class="row">
                <b-button
                  size="sm"
                  variant="outline-warning"
                  style="margin: 10px"
                  @click="editGroup()"
                  >Edit Mailing Group</b-button
                >
                <b-button
                  variant="outline-danger"
                  size="sm"
                  style="margin: 10px"
                  @click="removeGroup()"
                  >Delete Mailing Group</b-button
                >
              </div>
            </b-col>
          </b-row>
        </b-card>
        <hr />
        <b-row>
          <b-col style="display: flex; justify-content: flex-end; margin: 0px 50px">
            <b-button variant="outline-success" @click="showAddContact()">Add New Contact</b-button>
          </b-col>
        </b-row>
        <div class="GFS-Center-Table" style="margin: 20px">
          <table class="table table-hover">
            <thead class="GFS-TNave">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Title</th>
                <th scope="col">E-Mail</th>
                <th scope="col">Location</th>
                <th scope="col">Phone</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(contact, index) in mailingContacts" :key="contact.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ getDate(contact.name) }}</td>
                <td>{{ contact.title }}</td>
                <td>{{ contact.mail }}</td>
                <td>{{ contact.location }}</td>
                <td>{{ contact.phone }}</td>
                <b-button size="sm" variant="outline-info" @click="showEditContact(contact)"
                  >Edit</b-button
                >
                <b-button size="sm" variant="outline-danger" @click="showRemoveContact(contact)"
                  >Delete</b-button
                >
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModalGroup">
        <div class="modal">
          <header class="modalheader">
            <h5 v-if="groupToEdit.id">Edit New Mailing Group</h5>
            <h5 v-else>Add New Mailing Group</h5>
          </header>
          <div class="modalcontainer">
            <form v-on:submit.prevent @submit="saveGroup()">
              <b-form-group label="Name" label-for="Name" label-cols-sm="3" label-align-sm="right">
                <input
                  class="form-control"
                  type="text"
                  id="Name"
                  v-model="groupToEdit.name"
                  required
                />
              </b-form-group>
              <b-form-group
                label="Description"
                label-for="Description"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <input
                  class="form-control"
                  type="text"
                  id="Description"
                  v-model="groupToEdit.description"
                  required
                />
              </b-form-group>
              <b-button type="submit" variant="outline-success" class="modalbutton">Save</b-button>
              <b-button type="button" variant="outline-danger" class="modalbutton" @click="cancel()"
                >Cancel</b-button
              >
            </form>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showDeleteGroup">
        <div class="modal">
          <header class="modalheader">
            <h5>Confirm Delete</h5>
          </header>
          <div class="modalcontainer">
            <p>Are you sure you want to delete this group?</p>
            <div class="row">
              <div class="col-md-12 text-right">
                <button type="button" class="btn btn-outline-danger" @click="deleteGroup">
                  Delete
                </button>
                <button type="button" class="btn btn-outline-success" @click="cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModalContact">
        <div class="modal">
          <header class="modalheader">
            <h5 v-if="contactToEdit.id">Edit Contact</h5>
            <h5 v-else>Add New Contact</h5>
          </header>
          <div class="modalcontainer">
            <form v-on:submit.prevent @submit="saveContact()">
              <b-form-group label="Name" label-for="Name" label-cols-sm="3" label-align-sm="right">
                <input
                  class="form-control"
                  type="text"
                  id="Name"
                  v-model="contactToEdit.name"
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
                  v-model="contactToEdit.name"
                  required
                />
              </b-form-group>
              <b-form-group
                label="Title"
                label-for="mail-title"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <input
                  class="form-control"
                  type="text"
                  id="mail-title"
                  v-model="contactToEdit.title"
                  required
                />
              </b-form-group>
              <b-form-group
                label="Email"
                label-for="mail-email"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <input
                  class="form-control"
                  type="email"
                  id="mail-email"
                  v-model="contactToEdit.email_address"
                  required
                />
              </b-form-group>
              <b-form-group
                label="Location"
                label-for="mail-location"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <input
                  class="form-control"
                  type="text"
                  id="mail-location"
                  v-model="contactToEdit.location"
                  required
                />
              </b-form-group>
              <b-form-group
                label="phone"
                label-for="mail-phone"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <input
                  class="form-control"
                  type="text"
                  id="mail-phone"
                  v-model="contactToEdit.phone"
                  required
                />
              </b-form-group>
              <b-button type="submit" variant="outline-success" class="modalbutton">Save</b-button>
              <b-button
                type="button"
                variant="outline-danger"
                class="modalbutton"
                @click="cancelNewContact()"
                >Cancel</b-button
              >
            </form>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showDeleteContact">
        <div class="modal">
          <header class="modalheader">
            <h5>Confirm Delete</h5>
          </header>
          <div class="modalcontainer">
            <p>Are you sure you want to delete this contact?</p>
            <div class="row">
              <div class="col-md-12 text-right">
                <button type="button" class="btn btn-outline-danger" @click="deleteContact">
                  Delete
                </button>
                <button type="button" class="btn btn-outline-success" @click="cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      showModalGroup: false,
      showModalContact: false,
      groupToEdit: {
        id: null,
        name: null,
        description: null,
      },
      contactToEdit: {
        id: null,
        name: null,
        title: null,
        email_address: null,
        location: null,
        phone: null,
        mailing_list: null,
      },
      showDeleteGroup: false,
      showDeleteContact: false,
      currentGroup: 0,
    };
  },
  async created() {
    await this.getMailingLists();
  },
  computed: {
    mailingLists() {
      return this.$store.getters["settings/getMailingLists"];
    },
    mailingContacts() {
      return this.$store.getters["settings/getMailingContacts"];
    },
    currentDisplayedList() {
      if (!this.currentGroup > 0) {
        return;
      }
      return this.mailingLists.filter((g) => {
        return g.id === this.currentGroup;
      })[0];
    },
  },
  methods: {
    showAddGroup() {
      this.groupToEdit = {
        id: null,
        name: null,
        description: null,
      };
      this.showModalGroup = true;
    },
    showAddContact() {
      if (!this.currentGroup > 0) {
        return;
      }
      this.contactToEdit = {
        id: null,
        name: null,
        title: null,
        email_address: null,
        location: null,
        phone: null,
        mailing_list: this.currentGroup,
      };
      this.showModalContact = true;
    },
    async saveContact() {
      await this.$store
        .dispatch("settings/saveContact", this.contactToEdit)
        .then(() => {
          this.getContacts();
          this.showModalContact = false;
        })
        .catch(() => {});
    },
    async saveGroup() {
      await this.$store
        .dispatch("settings/saveMailList", this.groupToEdit)
        .then(() => {
          this.getMailingLists();
          this.showModalGroup = false;
        })
        .catch(() => {});
    },
    editGroup() {
      if (!this.currentGroup > 0) {
        return;
      }
      this.groupToEdit = this.mailingLists.filter((g) => {
        return g.id === this.currentGroup;
      })[0];
      this.showModalGroup = true;
    },
    showEditContact(contact) {
      this.contactToEdit = contact;
      this.showModalContact = true;
    },
    removeGroup() {
      if (!this.currentGroup > 0) {
        return;
      }
      this.showDeleteGroup = true;
    },
    async deleteGroup() {
      if (!this.currentGroup > 0) {
        return;
      }
      await this.$store
        .dispatch("settings/deleteMailList", this.currentGroup)
        .then(() => {
          this.currentGroup = 0;
          this.getMailingLists();
          this.getContacts();
          this.cancel();
        })
        .catch(() => {});
    },
    showRemoveContact(contact) {
      this.contactToEdit = contact;
      this.showDeleteContact = true;
    },
    async deleteContact() {
      if (!this.currentGroup > 0) {
        return;
      }
      await this.$store
        .dispatch("settings/deleteContact", this.contactToEdit.id)
        .then(() => {
          this.getContacts();
          this.showDeleteContact = false;
          this.contactToEdit = {};
        })
        .catch(() => {});
    },
    cancel() {
      this.showModalGroup = false;
      this.showDeleteGroup = false;
      this.showModalContact = false;
      this.showDeleteContact = false;
      this.groupToEdit = {};
      this.contactToEdit = {};
    },
    getDate(inputDate) {
      return inputDate.split("T")[0];
    },
    getMailingLists() {
      this.$store.dispatch("settings/getMailingLists");
    },
    getContacts() {
      this.$store.dispatch("settings/getMailingContacts", this.currentGroup);
    },
    selectGroup(groupId) {
      this.currentGroup = groupId;
      this.currentDisplayedList();
      this.getContacts();
    },
    createNewContactCard() {
      this.contactDetailsToEdit = {
        id: null,
        name: null,
        title: null,
        email: null,
        location: null,
        phone: null,
      };
      this.addNewContactMod = true;
    },
  },
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>
