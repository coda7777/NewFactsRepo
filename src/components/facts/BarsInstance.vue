<template>
  <div>
    <b-tab :title="tabName" :title-link-class="linkClass()" @click="activate()">
      <span
        class="text-right"
        style="float: right"
        type="button"
        title="delete this bar"
        @click="deleteBar()"
      >
        <b-icon icon="trash" variant="danger" scale="1.5"></b-icon>
      </span>
      <div>
        <span>
          <a
            class="glyphicon glyphicon-trash"
            style="float: right"
            href="#"
            id="jsButtonCloseBarsParent"
            data-toggle="tooltip"
            title="Delete row"
            @click="deleteBar()"
          >
          </a>
        </span>
        <br />
        <b-row>
          <b-col cols="">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">Bar name</label>
              <div class="col">
                <input
                  class="form-control form-control-sm"
                  type="text"
                  v-model="property.barName"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">Bar type</label>
              <div class="col">
                <b-select
                  size="sm"
                  class="form-control form-control-sm"
                  :options="barTypeOptions"
                  v-model="property.barType"
                >
                </b-select>
              </div>
            </div>
          </b-col>
          <b-col cols="4">
            <div class="form-group row">
              <label class="col-form-label col-form-label-sm">Charges</label>
              <div class="col">
                <b-select
                  :options="barChargesOptions"
                  size="sm"
                  class="form-control form-control-sm"
                  v-model="property.barCharges"
                >
                </b-select>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-tab>
  </div>
</template>
<script>
export default {
  name: "BarsInstance",
  props: {
    barIndex: { type: Number },
    isSelected: { type: Boolean, default: false },
  },
  data() {
    return {
      onGroundFloor: false,
      barTypeOptions: [
        { value: null, text: "SelectOption" },
        { value: "BeachBar", text: "BeachBar" },
        { value: "BeerGarden", text: "BeerGarden" },
        { value: "CocktailBar", text: "CocktailBar" },
        { value: "FireplaceBar", text: "FireplaceBar" },
        { value: "HotelBar", text: "HotelBar" },
        { value: "LobbyBar", text: "LobbyBar" },
        { value: "LoungeBar", text: "LoungeBar" },
        { value: "PianoBar", text: "PianoBar" },
        { value: "PoolBar", text: "PoolBar" },
        { value: "Pub", text: "Pub" },
        { value: "RooftopBar", text: "RooftopBar" },
        { value: "SnackBar", text: "SnackBar" },
        { value: "SportsBar", text: "SportsBar" },
        { value: "Swim-upBar", text: "Swim-upBar" },
        { value: "WineCellar", text: "WineCellar" },
      ],
      barChargesOptions: [
        { value: null, text: "Select Option" },
        { value: "Inclusive", text: "Inclusive" },
        { value: "Additional Charge", text: "Additional Charge" },
      ],
    };
  },
  computed: {
    tabName() {
      return this.property.barName === "" || this.property.barName === null
        ? "New Bar"
        : this.property.barName;
    },
    property() {
      return this.$store.getters["barsFactsComp/getProperties"][this.barIndex];
    },
  },
  methods: {
    activate() {
      this.$emit("activated", {
        barId: this.barId,
      });
    },
    deleteBar() {
      this.$emit("deleted", {
        barId: this.property,
      });
    },
    linkClass() {
      return this.isSelected ? ["bg-primary", "text-light"] : ["bg-light", "text-info"];
    },
  },
};
</script>
