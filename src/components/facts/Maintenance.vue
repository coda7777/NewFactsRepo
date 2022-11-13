<template>
  <div class="container">
    <h4>Maintenances</h4>
    <h5>Information on renovation at hotel</h5>
    <p class="text-danger" v-if="errors.length > 0">
      <b>Please correct the following error(s):</b>
    </p>

    <ul>
      <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
        {{ error }}
      </li>
    </ul>
    <b-row>
      <b-col cols="12">
        <p>
          <b-button size="sm" variant="primary" class="pull-right" @click="addMaintenance()"
            >Add Maintenance</b-button
          >
        </p>
      </b-col>
    </b-row>
    <!-- this is container of all maintenances  -->
    <form v-on:submit.prevent @submit="save()">
      <b-row>
        <b-col cols="12">
          <b-tabs card>
            <!-- End maintenance data -->
            <div v-for="(r, index) of maintenances" :key="index">
              <MaintenanceInstance
                :maintenanceIndex="index"
                :isSelected="r.isSelected"
                @activated="changeTab"
                @deleted="deleteMaintenance(index)"
              />
            </div>
          </b-tabs>
        </b-col>
      </b-row>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="themeChanger">
          <div class="modal">
            <header class="modalheader">
              <h5>Confirm</h5>
            </header>
            <p>Are you sure you want to delete this room?</p>
            <button type="button" @click="confirmDelete()">Yes</button>
            <button type="button" @click="cancelDelete()">No</button>
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>
<script>
import MaintenanceInstance from "./MaintenanceInstance.vue";

export default {
  name: "MaintenanceFactsComp",
  data() {
    return {
      themeChanger: false,
      isLoading: false,
      maintenances: [],
      showDelete: false,
      roomToDelete: null,
      errors: [],
    };
  },
  components: {
    MaintenanceInstance,
  },
  computed: {},
  created() {},
  methods: {
    changeTab(currentMaintenance) {
      this.maintenances.forEach((maintenance) => {
        maintenance.isSelected = this.maintenances.indexOf(maintenance) === currentMaintenance;
        /* console.log(maintenance.id, this.maintenances.indexOf(maintenance) === currentMaintenance); */
      });
    },
    deleteMaintenance(maintenanceId) {
      /* console.log("deleted", maintenanceId); */
      this.maintenanceToDelete = maintenanceId;
      this.showDelete = true;
    },
    confirmDelete() {
      this.$store.dispatch("maintenanceFactsComp/deleteMaintenance", this.maintenanceToDelete);
      this.maintenances = this.$store.getters["maintenanceFactsComp/getProperties"];
      this.showDelete = false;
    },
    cancelDelete() {
      this.showDelete = false;
    },
    addMaintenance() {
      this.$store.dispatch("maintenanceFactsComp/addNewMaintenance");
      this.maintenances = this.$store.getters["maintenanceFactsComp/getProperties"];
    },
    getInfo() {
      const propertyId = this.$route.params.id;
      this.$store
        .dispatch("maintenanceFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("my maintenances", response); */
          this.maintenances = this.$store.getters["maintenanceFactsComp/getProperties"];
          this.errors = this.$store.getters["maintenanceFactsComp/getErrors"];
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
    async save() {
      if (this.isLoading) {
        return;
      }
      this.validate();
      if (this.errors.length > 0) {
        return;
      }
      this.isLoading = true;
      const propertyId = this.$route.params.id;
      await this.$store
        .dispatch("maintenanceFactsComp/postInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.isLoading = false;
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          this.isLoading = false;
        });
    },
    validate() {
      this.$store.dispatch("maintenanceFactsComp/validate");
      this.errors = this.$store.getters["maintenanceFactsComp/getErrors"] || [];
      /* console.log("errors are", this.errors); */
    },
  },
};
</script>
