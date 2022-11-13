<template>
  <div class="container">
    <h4>Rooms</h4>
    <b-row>
      <b-col cols="12">
        <p>
          <b-button
            id="btn-add-room"
            variant="primary"
            size="sm"
            class="pull-right"
            @click="addRoom()"
            >Add Room</b-button
          >
        </p>
      </b-col>
    </b-row>
    <!-- this is container of all rooms  -->
    <form v-on:submit.prevent @submit="save()">
      <p class="text-danger" v-if="errors.length > 0">
        <b>Please correct the following error(s):</b>
      </p>

      <ul>
        <li class="text-danger" v-for="(error, i) in errors" :key="i" :value="error">
          {{ error }}
        </li>
      </ul>
      <b-row>
        <b-col>
          <b-tabs pills small>
            <div v-for="(r, index) of rooms" :key="index">
              <RoomInstance
                :roomIndex="index"
                :isSelected="r.isSelected"
                @activated="changeTab(index)"
                @deleted="deleteRoom(r)"
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
            <p>Are you sure you want to delete this room ({{ roomToDelete.roomName }})?</p>
            <button type="button" @click="confirmDelete()">Yes</button>
            <button type="button" @click="cancelDelete()">No</button>
          </div>
        </div>
      </transition>
    </form>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showDelete">
        <div class="modal">
          <header class="modalheader">
            <h5>Confirm Delete</h5>
          </header>
          <div class="modalcontainer">
            <p>Are you sure you want to delete this room?</p>
            <div class="row">
              <div class="col-md-12 text-right">
                <button type="button" class="btn btn-outline-danger" @click="confirmDelete">
                  Delete
                </button>
                <button type="button" class="btn btn-outline-success" @click="cancelDelete">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import RoomInstance from "./RoomInstance.vue";

export default {
  name: "RoomsFactsComp",
  data() {
    return {
      themeChanger: false,
      isLoading: false,
      rooms: [],
      showDelete: false,
      roomToDelete: null,
      errors: [],
    };
  },
  components: {
    RoomInstance,
  },
  computed: {},
  created() {},
  methods: {
    changeTab(currentRoom) {
      this.rooms.forEach((room) => {
        room.isSelected = this.rooms.indexOf(room) === currentRoom;
        /* console.log(room.id, this.rooms.indexOf(room) === currentRoom); */
      });
    },
    deleteRoom(room) {
      /* console.log("deleted", roomId); */
      this.roomToDelete = room;
      this.showDelete = true;
    },
    confirmDelete() {
      this.$store.dispatch("roomsFactsComp/deleteRoom", this.roomToDelete);
      this.rooms = this.$store.getters["roomsFactsComp/getProperties"];
      this.showDelete = false;
    },
    cancelDelete() {
      this.showDelete = false;
    },
    addRoom() {
      this.$store.dispatch("roomsFactsComp/addNewRoom");
      this.rooms = this.$store.getters["roomsFactsComp/getProperties"];
    },
    getInfo() {
      const propertyId = this.$route.params.id;
      this.$store
        .dispatch("roomsFactsComp/getInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log("my rooms", response); */
          this.rooms = this.$store.getters["roomsFactsComp/getProperties"];
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
        .dispatch("roomsFactsComp/postInfo", propertyId)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.rooms = this.$store.getters["roomsFactsComp/getProperties"];
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
      this.$store.dispatch("roomsFactsComp/validate");
      this.errors = this.$store.getters["roomsFactsComp/getErrors"] || [];
      /* console.log("errors are", this.errors); */
    },
  },
};
</script>
