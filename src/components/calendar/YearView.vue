<template>
  <div>
    <!-- <div class="p-2">
      <ul class="nav justify-content-end">
        <li @click="defaultMonth()" class="nav-item">
          <a class="nav-link btn btn-outline-info rounded-0">Current month</a>
        </li>
      </ul>
    </div> -->
    <div class="border border-bottom-0 m-2">
      <div class="d-flex flex-column mb-3 bg-light">
        <div class="d-flex flex-row">
          <!-- Create new Source  -->
          <!-- <div class=""><CreateSource /></div> -->

          <div class="d-flex flex-row w-100 justify-content-around align-items-start border-bottom">
            <span @click="prevMonth()" class="btn btn-info rounded-0 px-5">Prev</span>
            <div
              class="border-end flex-grow-1 text-center"
              style="display: flex; justify-content: center; align-items: center; width: 100%"
            >
              <h6
                class="text-center"
                style="margin: 0px 5px !important; padding: 4px 15px; font-weight: 600"
              >
                {{ getCurrentMonth }} {{ currentYear }}
              </h6>
              <a
                @click="defaultMonth()"
                class="nav-link btn btn-outline-primary rounded-0"
                style="margin: 0px 5px !important; padding: 4px 15px; font-size: smaller"
                >To Current Month</a
              >
            </div>
            <span @click="nextMonth()" class="btn btn-info rounded-0 px-5">Next</span>
          </div>
        </div>
      </div>
      <!-- Source Row  -->
      <div class="border-top">
        <RoomRow
          v-for="(room, index) in getRoomsList"
          :key="index"
          :room="room"
          :daysCount="daysCount"
          :month="currentMonth"
          :year="currentYear"
        >

        </RoomRow>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateSource from "./CreateSource.vue";
// import SourceRow from "./SourceRow.vue";
import RoomRow from "./RoomRow.vue";

export default {
  name: "YearView",
  components: { CreateSource, RoomRow },
  data() {
    return {
      currentMonth: null, // number of  current month selected like jun=1
      currentYear: null, // 2022
      currentDate: null, // Date Object
    };
  },

  computed: {
    ...mapGetters({
      getRoomsList: "calendar/getRoomsList",
      getMonthNames: "calendar/getMonthNames", // get Month name
      getterGetDate: "calendar/getDate", // get source list
    }),

    // return current  month selected
    getCurrentMonth() {
      if (this.currentMonth > -1 || this.currentMonth < 12) {
        return this.getMonthNames[this.currentMonth];
      }
      return this.getMonthNames[0];
    },
    // return Number days of month like (March = 31 )
    daysCount() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
  },
  watch: {
    currentMonth() {
      this.changeCurrentDate();
    },
  },
  methods: {
    ...mapActions({
      actionGetHotelRooms: "calendar/getHotelRooms",
      actionsSetCurrentDate: "calendar/setCurrentDate",
      actionSetDate: "calendar/setDate",
    }),
    async changeCurrentDate() {
      let month =
        this.currentMonth + 1 < 10 ? "0" + (this.currentMonth + 1) : "" + (this.currentMonth + 1);
      let date = `${this.currentYear}-${month}-01`;
      console.log("currentDate", date);
      this.actionsSetCurrentDate(date);
      this.actionGetHotelRooms(1);
    },
    defaultMonth() {
      const date = new Date();
      this.currentMonth = date.getMonth();
      this.currentYear = date.getFullYear();
      this.currentDate = date;
      let newDate = {
        month: date.getMonth(),
        year: date.getFullYear(),
        date: date,
      };
      this.actionSetDate(newDate);
      // return date.getMonth()
    },
    nextMonth() {
      if (this.currentMonth == 11) {
        this.currentMonth = 0;
        this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
        // current year is a string like 2022
        this.currentYear = this.currentDate.getFullYear();
      } else {
        this.currentMonth += 1;
      }
    },
    prevMonth() {
      if (this.currentMonth == 0) {
        this.currentMonth = 11;
        this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
        // current year is a string like 2022
        this.currentYear = this.currentDate.getFullYear();
      } else {
        this.currentMonth -= 1;
      }
    },
  },
  created() {
    this.defaultMonth();
    // this.changeCurrentDate()
  },
};
</script>
<style>
.day-cell:hover {
  background-color: rgb(13, 141, 41);
}
.source:hover {
  background-color: rgb(248, 248, 248);
}

.col-employee {
  /* padding: 20px 0px; */
  max-width: 200px;
  min-width: 200px;
  min-height: 35px;
}
</style>
