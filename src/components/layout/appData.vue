<template>
  <div>
    <b-row>
      <b-col>
        <b-card-group deck>
          <b-card
            border-variant="dark"
            header="Dark"
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
          >
            <template #header>
              <h4 class="mb-0">UPDATES</h4>
            </template>
            <b-card-title class="h5">Your Facts Platform Updates</b-card-title>
            <h6 style="font-weight: 600">How do I start using Ananas Facts for my hotel</h6>
            <p>
              What better way to win over your customers online than giving them a detailed overview
              of your hotel? Easily choose from various options to form your final sheet.
              <a href="">Read More <b-icon icon="arrow-right-square"></b-icon></a>
            </p>
            <a href="#">Visit our documentation</a>
            <h6 style="font-weight: 600">How do I start using Ananas Facts for my hotel</h6>
            <p>
              What better way to win over your customers online than giving them a detailed overview
              of your hotel? Easily choose from various options to form your final sheet.
              <a href="">Read More <b-icon icon="arrow-right-square"></b-icon></a>
            </p>
            <a href="#">Visit our documentation</a>
            <template #footer>
              <span><b-icon icon="clock" scale="1"></b-icon></span>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <br />
    <br />
    <b-row>
      <b-col>
        <stats-card data-background-color="green">
          <template slot="header">
            <b-icon icon="gear-wide-connected" scale="2.5" style="color: green"></b-icon>
          </template>

          <template slot="content">
            <p class="category">Number of Registered Tour Operators</p>
            <h4 class="title">{{ operatorTotal }} tour operators</h4>
          </template>

          <template slot="footer">
            <span><b-icon icon="plus-circle" variant="dark" scale="1"></b-icon></span>
            <small class="text-muted">
              <router-link to="/partners">Review your contracts</router-link>
            </small>
          </template>
        </stats-card>
      </b-col>
    </b-row>
    <br />
    <br />
    <b-row>
      <b-col>
        <stats-card data-background-color="green">
          <template slot="header">
            <b-icon icon="globe" scale="2.5" style="color: green"></b-icon>
          </template>

          <template slot="content">
            <p class="category">Number of Registered Accommodations</p>
            <h4 class="title">{{ getTotalProperties.total }} Accommodations</h4>
          </template>

          <template slot="footer">
            <span><b-icon icon="plus-circle" variant="dark" scale="1"></b-icon></span>
            <small class="text-muted">
              <router-link to="/partners">Review your contracts</router-link>
            </small>
          </template>
        </stats-card>
      </b-col>
    </b-row>
    <!-- <br />
        <br />
        <b-row>
          <b-col>
            <chart-card data-background-color="ananas" :chart-data="pieChart.data" chart-type="Pie">
              <template slot="header">
                <h4 class="card-title">Email Statistics</h4>
                <p class="card-category">Last Campaign Performance</p>
              </template>
              <template slot="footer">
                <div class="legend">
                  <i class="fa fa-circle text-info"></i> Open
                  <i class="fa fa-circle text-danger"></i> Bounce
                  <i class="fa fa-circle text-warning"></i> Unsubscribe
                </div>
                <hr />
                <div class="stats"><i class="fa fa-clock-o"></i> Campaign sent 2 days ago</div>
              </template>
            </chart-card>
          </b-col>
        </b-row> -->
  </div>
</template>
<script>
import StatsCard from "../cards/StatsCard.vue";

export default {
  components: {
    StatsCard,
  },
  data() {
    return {};
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    operatorTotal() {
      return this.$store.getters["user/getOperatorTotal"];
    },
    getTotalProperties() {
      return this.$store.getters["property/getTotalProperties"];
    },
  },
};
</script>
