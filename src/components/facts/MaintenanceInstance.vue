<template>
  <b-row style="padding: 12px; border: 1px solid orange; margin-bottom: 5px">
    <b-col>
      <span
        class="text-left"
        style="float: right"
        type="button"
        title="delete this entry"
        @click="deleteMaintEntry()"
      >
        <b-icon icon="trash" variant="danger" scale="1.5"></b-icon>
      </span>
      <b-row>
        <span style="float: left; margin-right: 20px">
          <label class="col-sm-2 col-form-label col-form-label-sm">Type</label>
          <select class="form-control form-control-sm" v-model="property.maintenanceTypeApply">
            <option :value="null" selected>Select Type</option>
            <option v-for="(a, index) in maintenanceTypes" :key="index" :value="a">
              {{ a }}
            </option>
          </select>
        </span>
        <span style="float: left; margin-right: 20px">
          <label class="col-sm-2 col-form-label col-form-label-sm">Zone</label>
          <select class="form-control form-control-sm" v-model="property.maintenanceZone">
            <option :value="null" selected>Select.....</option>
            <option value="Partially">Partially</option>
            <option value="Complete">Complete</option>
          </select>
        </span>
        <span style="float: left; margin-right: 20px">
          <label class="col-sm-2 col-form-label col-form-label-sm">Disturbance</label>
          <select class="form-control form-control-sm" v-model="property.maintenanceDisturbance">
            <option :value="null" selected>Select.....</option>
            <option value="not disturbing">not disturbing</option>
            <option value="little disturbing">little disturbing</option>
            <option value="disturbing">disturbing</option>
            <option value="strongly disturbing">strongly disturbing</option>
          </select>
        </span>
        <span style="float: left; margin-right: 20px">
          <label class="col-sm-2 col-form-label col-form-label-sm">From</label>
          <input
            class="form-control form-control-sm"
            type="date"
            placeholder="01jan1900"
            v-model="property.maintenanceFrom"
          />
        </span>
        <span style="float: left; margin-right: 20px">
          <label class="col-sm-2 col-form-label col-form-label-sm">To</label>
          <input
            class="col-sm-12 form-control form-control-sm"
            type="date"
            placeholder="01jan1900"
            v-model="property.maintenanceTo"
          />
        </span>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "MaintenanceInstance",
  props: {
    maintenanceIndex: { type: Number },
    isSelected: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  computed: {
    property() {
      return this.$store.getters["maintenanceFactsComp/getProperties"][this.maintenanceIndex];
    },
    maintenanceTypes() {
      return this.$store.getters["options/getMaintenanceTypes"];
    },
  },
  methods: {
    activate() {
      this.$emit("activated", {
        maintenanceId: this.maintenanceId,
      });
    },
    deleteMaintEntry() {
      this.$emit("deleted", {
        maintenanceId: this.property,
      });
    },
    linkClass() {
      return this.isSelected ? ["bg-primary", "text-light"] : ["bg-light", "text-info"];
    },
  },
};
</script>
