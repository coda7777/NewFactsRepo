<template>
  <card class="card-stats">
    <b-row>
      <b-col cols="4" v-if="$slots.header">
        <div class="icon-big text-center" :data-background-color="dataBackgroundColor">
          <slot name="header"></slot>
        </div>
      </b-col>
      <b-col cols="" v-if="$slots.content">
        <div class="numbers">
          <slot name="content"></slot>
        </div>
      </b-col>
    </b-row>
    <div slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </card>
</template>
<script>
import Card from "./Card.vue";

export default {
  name: "stats-card",
  components: {
    Card,
  },
  data() {
    return {
      dataBackgroundColor: "",
    };
  },
};
</script>
<style></style>
