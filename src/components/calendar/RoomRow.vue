<template>
  <div class="d-flex flex-column source">
    <div class="d-flex flex-row">
      <div class="col-employee px-2 border-bottom border-end">
        <div class="d-flex flex-row ps-1">
          <h6 class="p-1 w-100">
            {{ room.room_name }}
          </h6>
          <!-- <span class="del-source">
              <EditSource :source="source" />
            </span> -->
        </div>
      </div>
      <div class="d-flex flex-row bd-highlight border-bottom border-right flex-grow-1">
        <RoomCell
          v-for="(day, index) in daysCount"
          :key="index"
          :day="day"
          :event="isExistDay(day)"
          :room_id="room.id"
          :fullDate="fullDate(day)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RoomCell from "./RoomCell.vue";
import EditSource from "./EditSource.vue";

export default {
  name: "SourceRow",
  components: { RoomCell, EditSource },
  props: {
    room: Object,
    daysCount: Number,
    month: Number,
    year: Number,
  },
  data() {
    return {};
  },

  methods: {
    fullDate(day) {
      let jour = day < 10 ? "0" + day : "" + day;
      let month = this.month + 1 < 10 ? "0" + (this.month + 1) : "" + (this.month + 1);
      let date = "" + this.year + "-" + month + "-" + jour;
      return date;
    },
    isExistDay(day) {
      let item = null;
      let jour = day < 10 ? "0" + day : "" + day;
      let month = this.month + 1 < 10 ? "0" + (this.month + 1) : "" + (this.month + 1);

      let date = "" + this.year + "-" + month + "-" + jour;
      item = this.room.events.find((item) => item.date === date);
      if (item) {
        return item;
      }
      return null;
    },
  },
};
</script>

<style scoped>
.del-source {
  display: none;
}
.col-employee:hover .del-source {
  display: block;
}
</style>
