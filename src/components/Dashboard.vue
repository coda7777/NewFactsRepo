<template>
  <div v-if="accountType === 'accommodation'">
    <AccommodationDashboard />
  </div>
  <div v-else>
    <TourOperatorDashboard />
  </div>
</template>

<script>
export default {
  components: {
    AccommodationDashboard: () => import("./accom/DashboardHome.vue"),
    TourOperatorDashboard: () => import("./tour_operator/DashboardHome.vue"),
  },
  computed: {
    accountType() {
      return this.$store.getters["user/getUserType"];
    },
  },
};
</script>
