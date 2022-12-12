<template>
 <b-container>
  <b-row>
   <b-col cols="12" class="row nav justify-content-end">
    <div>
     <a
      @click="sendCalendarPdfToGroupSelected()"
      :class="{
      'btn btn-warning btn-sm d-none d-sm-inline-block': true,
      disabled: getGroupMailToSend==null,
     }"
      role="button"
      style="margin: 4px"
      disable
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="1em"
       height="1em"
       fill="currentColor"
       viewBox="0 0 8 8"
       class="bi bi-list-ul fa-sm text-white-50"
       style="margin: 0px"
      >
       <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z" />
      </svg>
      &nbsp;Send via E-mail
     </a>
     <a
      class="btn btn-success btn-sm d-none d-sm-inline-block"
      role="button"
      @click="calendarPDFDownload()"
      style="margin: 4px"
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="1em"
       height="1em"
       fill="currentColor"
       viewBox="0 0 16 16"
       class="bi bi-list-ul fa-sm text-white-50"
       style="margin: 0px"
      >
       <path
        fill-rule="evenodd"
        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
       ></path>
      </svg>
      &nbsp;Generate Chart
     </a>
    </div>
   </b-col>
  </b-row>
  <div
   class="p-2"
   style="border: 2px black solid; width: fit-content; overflow: hidden"
  >
   <b-row
    style="
     padding: 15px;
     margin-right: 20px;
     width: fit-content;
     overflow-wrap: break-word;
    "
   >
    <b-col class="row" style="justify-content: space-between">
     <div>
      From <input v-model="fromDate" type="date" style="margin-right: 30px" />
     </div>
     <div>
      To
      <input v-model="toDate" type="date" />
     </div>
     <div class="form-group row">
      <label class="col-form-label col-form-label-sm"
       >Action<span class="reqastr">*</span></label
      >
      <div class="col-sm" style="min-width: 150px">
       <select class="form-control form-control-sm" v-model="color">
        <option
         :event="'hover'"
         href="javascript:void(0)"
         v-for="(color, index) in getColorsList"
         :value="index"
         :key="index"
         :class="['btn-' + color.color, 'index-' + index]"
         class="p-1"
        >
         {{ color.color }}
        </option>
       </select>
      </div>
     </div>
     <div>
      <span class="form-group row">
       <!-- <b-form-checkbox type="checkbox" @inpout="selectAllSources" v-model="allSelected"
                >Check All
              </b-form-checkbox> -->
       <label
        ><input
         type="checkbox"
         @click="selectAllSources"
         v-model="allSelected"
         style="margin-left: 20px; margin-right: 4px"
        />

        Check All
       </label>
      </span>
     </div>
     <button
      @click="addSelected()"
      class="nav-link btn btn-outline-danger btn-sm"
      style="max-width: 120px; float: left; margin-left: 100px"
     >
      Add Selected
     </button>
    </b-col>
    <b-col class="nav justify-content col-lg-12">
     <div style="margin-left: 15px" v-for="room in getRoomsList" :key="room.id">
      <input
       type="checkbox"
       v-model="roomsIds"
       @click="selectSource"
       :value="room.id"
       style="margin-right: 4px"
      />
      <label>{{ room.room_name }}</label>
     </div>
    </b-col>
   </b-row>
   <span
    >Rooms selected :<span v-for="room in SelectedBoxes" :key="room.index">
     {{ room }},</span
    ></span
   >
   <!-- <ul class="nav justify-content-end">
           <li class="nav-item">
             <a @click="currentTab = 'YearView'" class="nav-link btn btn-primary rounded-0"
               >Horizontal View</a
             >
           </li>
           <li class="nav-item">
             <a @click="currentTab = 'HorizontView'" class="nav-link btn btn-success rounded-0"
               >Year view
             </a>
           </li>
           </ul> -->
  </div>
  <component v-bind:is="currentTabComponent"></component>
  <div class="p-2">
   <div class="nav justify-content-end">
    <button
     @click="save()"
     :class="{
      'nav-link btn btn-outline-danger rounded-0': true,
      disabled: !getterIsSave,
     }"
     style="
      max-width: fit-content;
      float: left;
      padding: 10px 30px;
      font-weight: 600;
     "
    >
     Save Changes
    </button>
   </div>
  </div>
 </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SportsWellness from "../facts/SportsWellness.vue";
import YearView from "./YearView.vue";
// import HorizontView from './HorizontView.vue'

export default {
 name: "Calendar",
 components: {
  YearView,
  SportsWellness,
  // HorizontView
 },
 data() {
  return {
   fromDate: "",
   toDate: "2022-07-10",
   color: 1,
   currentTab: "YearView",
   allSelected: false,
   roomsIds: [],
   sourcesSelected: [],
  };
 },
 created() {
  this.fromDate = this.$store.state.currentDate;
  // this.toDate = this.getCurrentDate
 },
 watch: {
  getCurrentDate: {
   handler() {
    this.fromDate = this.getCurrentDate;
    this.toDate = this.getCurrentDate;
   },
   deep: true,
  },
 },

 computed: {
  ...mapGetters({
   getGroupMailToSend: "calendar/getGroupMailToSend",
   getCurrentDate: "calendar/getCurrentDate",
   getterIsSave: "calendar/isSave",
   getRoomsList: "calendar/getRoomsList",
   getColorsList: "calendar/getColors",
  }),
  SelectedBoxes() {
   console.log("this.getRoomsLis", this.getRoomsList);
   return this.getRoomsList
    .filter((room) => this.roomsIds.includes(room.id))
    .map((room) => room.room_name);
  },
  currentTabComponent() {
   return this.currentTab;
  },
 },
 methods: {
  ...mapMutations({
   SET_IS_SAVE: "calendar/SET_IS_SAVE",
   SET_RANGE_SELECTED: "calendar/SET_RANGE_SELECTED",
  }),
  ...mapActions({
    sendCalendarPdfToGroupSelected: "calendar/sendCalendarPdfToGroupSelected",
   calendarPDFDownload: "calendar/calendarPDFDownload",
   calendarExcelDownload: "calendar/calendarExcelDownload",
   saveRooms: "calendar/saveRooms",
   actionGetHotelRooms: "calendar/getHotelRooms",
  }),


  selectAllSources: function () {
   console.log("select ALLLL");
   this.roomsIds = [];
   if (!this.allSelected) {
    for (let room in this.getRoomsList) {
     this.roomsIds.push(this.getRoomsList[room].id);
    }
   }
  },
  selectSource: function () {
   this.allSelected = false;
  },
  getDates(startDate, endDate) {
   const dates = [];
   let currentDate = startDate;
   const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
   };
   while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().substr(0, 10));
    currentDate = addDays.call(currentDate, 1);
   }
   console.log("calendar dates", dates);
   return dates;
  },
  addSelected() {
   const dates = this.getDates(new Date(this.fromDate), new Date(this.toDate));
   let events = [];
   for (let i = 0; i < dates.length; i++) {
    const evnt = {
     color: this.color,
     date: dates[i],
    };
    events.push(evnt);
   }

   const data = {
    events: events,
    roomsIds: this.roomsIds,
   };
   console.log("data", data);
   this.SET_RANGE_SELECTED(data);

   // daylist.map((v)=>v.toISOString().slice(0,10)).join("")
  },
  async excelDownload() {
   await this.calendarExcelDownload();
  },
  async save() {
   if (await this.saveRooms()) {
    this.SET_IS_SAVE(false);
    await this.actionGetHotelRooms();
   }
  },
 },
};
</script>
