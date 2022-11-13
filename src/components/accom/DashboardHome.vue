<template>
  <b-container style="padding: 30px 100px">
    <b-row>
      <b-col cols="8">
        <b-row>
          <b-col>
            <stats-card data-background-color="green">
              <template slot="header">
                <b-icon icon="building" scale="2.5" style="color: green"></b-icon>
              </template>

              <template slot="content">
                <p class="category">Your Accommodation(s)</p>
                <h4 class="title">{{ properties.length }}</h4>
              </template>

              <template slot="footer">
                <span><b-icon icon="clock" variant="dark" scale="1"></b-icon></span>
                <small class="text-muted">
                  <router-link to="/add-property">Update now</router-link>
                </small>
              </template>
            </stats-card>
          </b-col>
          <b-col>
            <stats-card data-background-color="green">
              <template slot="header">
                <b-icon icon="diagram3" scale="2.5" style="color: green"></b-icon>
              </template>

              <template slot="content">
                <p class="category">Partners connected</p>
                <h4 class="title">{{ properties.length }}</h4>
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
        <b-row>
          <b-col>
            <stats-card data-background-color="green">
              <template slot="header">
                <b-icon icon="check2" scale="2.5" style="color: green"></b-icon>
              </template>

              <template slot="content">
                <p class="category">Last published Update</p>
                <h4 class="title">{{ lastPublishDate }}</h4>
              </template>

              <template slot="footer">
                <span><b-icon icon="arrow-clockwise" variant="dark" scale="1"></b-icon></span>
                <small class="text-muted">
                  <router-link to="/property-facts">Review facts</router-link>
                </small>
              </template>
            </stats-card>
          </b-col>
          <b-col>
            <stats-card data-background-color="green">
              <template slot="header">
                <b-icon icon="images" scale="2.5" style="color: green"></b-icon>
              </template>

              <template slot="content">
                <p class="category">Accommodation photos</p>
                <h4 class="title">{{ totalImages }} / {{ imageLimits }}</h4>
              </template>

              <template slot="footer">
                <span><b-icon icon="arrow-up-circle" variant="dark" scale="1"></b-icon></span>
                <span
                  ><small class="text-muted">
                    <router-link to="/property-photos">Edit photos</router-link>
                  </small></span
                >
                <span v-if="!isPremium"
                  ><small class="text-muted"
                    ><router-link
                      style="text-decoration: underline; color: purple; float: right"
                      to="/user-settings"
                      >Increase Limit</router-link
                    ></small
                  ></span
                >
              </template>
            </stats-card>
          </b-col>
        </b-row>
        <br />
        <br />
        <b-row>
          <b-col>
            <chart-card
              :chart-data="lineChart.data"
              :chart-options="lineChart.options"
              :responsive-options="lineChart.responsiveOptions"
              data-background-color="green"
            >
              <template slot="header">
                <h4 class="card-title">Facts displayed</h4>
                <p class="card-category">24 Hours performance</p>
              </template>
              <template slot="footer">
                <div class="legend">
                  <i class="fa fa-circle text-info"></i> Open
                  <i class="fa fa-circle text-danger"></i> Click
                  <i class="fa fa-circle text-warning"></i> Click Second Time
                </div>
                <hr />
                <div class="stats"><i class="fa fa-history"></i> Updated 3 minutes ago</div>
              </template>
            </chart-card>
          </b-col>
          <b-col>
            <chart-card
              data-background-color="ananas"
              :chart-data="barChart.data"
              :chart-options="barChart.options"
              :chart-responsive-options="barChart.responsiveOptions"
              chart-type="Bar"
            >
              <template slot="header">
                <h4 class="card-title">2021 hotels/resorts/properties</h4>
                <p class="card-category">listings managed per year</p>
              </template>
              <template slot="footer">
                <div class="legend">
                  <i class="fa fa-circle text-info"></i> Tesla Model S
                  <i class="fa fa-circle text-danger"></i> BMW 5 Series
                </div>
                <hr />
                <div class="stats"><i class="fa fa-check"></i> Data information certified</div>
              </template>
            </chart-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4">
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
                  What better way to win over your customers online than giving them a detailed
                  overview of your hotel? Easily choose from various options to form your final
                  sheet.
                  <a href="">Read More <b-icon icon="arrow-right-square"></b-icon></a>
                </p>
                <a href="#">Visit our documentation</a>
                <h6 style="font-weight: 600">How do I start using Ananas Facts for my hotel</h6>
                <p>
                  What better way to win over your customers online than giving them a detailed
                  overview of your hotel? Easily choose from various options to form your final
                  sheet.
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
                <h4 class="title">{{ totalProperties }} Accommodations</h4>
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
      </b-col>
    </b-row>
    <br />
    <br />
  </b-container>
</template>
<script>
import ChartCard from "../cards/ChartCard.vue";
import StatsCard from "../cards/StatsCard.vue";

export default {
  components: {
    ChartCard,
    StatsCard,
  },
  data() {
    return {
      totalProperties: 0,
      pieChart: {
        data: {
          labels: ["40%", "20%", "40%"],
          series: [40, 20, 40],
        },
      },
      hotelChartLoaded: true,
      hotelsRegisteredChart: {
        data: {
          labels: [],
          series: [[]],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 200,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      lineChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM",
          ],
          series: [
            [287, 385, 620, 492, 554, 586, 698, 695],
            [67, 152, 143, 240, 287, 335, 435, 437],
            [23, 113, 67, 108, 190, 239, 307, 308],
          ],
        },
        options: {
          low: 0,
          high: 800,
          showArea: false,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: true,
          showLine: true,
          showPoint: true,
          fullWidth: true,
          chartPadding: {
            right: 50,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 600px)",
            {
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      barChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
          ],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
        responsiveOptions: [
          [
            "screen and (max-width: 600px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
  computed: {
    properties() {
      return this.$store.getters["property/getProperties"];
    },
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    totalImages() {
      return this.$store.getters["galleryInfo/getTotalPhotos"];
    },
    isPremium() {
      return this.$store.getters["user/isPremium"];
    },
    imageLimits() {
      return this.isPremium ? "Unlimited" : "25";
    },
    lastPublishDate() {
      return this.$store.getters["property/getLastPublishDate"];
    },
    operatorTotal() {
      return this.$store.getters["user/getOperatorTotal"];
    },
  },
  created() {
    this.getTotalImages();
    this.getLastPublishDate();
    if (this.properties.length === 0) {
      this.getProperties();
    }
    this.updateOperators();
  },
  mounted() {
    this.getTotalProperties();
  },
  methods: {
    updateOperators() {
      this.$store.dispatch("user/retrieveOperatorTotal");
    },
    getLastPublishDate() {
      this.$store.dispatch("property/lastPublishDate");
    },
    getTotalImages() {
      this.$store.dispatch("galleryInfo/totalPhotos");
    },
    getTotalProperties() {
      this.$store.dispatch("property/totalProperties").then(() => {
        const result = this.$store.getters["property/getTotalProperties"];
        this.hotelChartLoaded = false;
        this.hotelsRegisteredChart.data.labels = result.labels;
        this.hotelsRegisteredChart.data.series = result.series;
        this.totalProperties = result.total;
        this.$nextTick(() => {
          this.hotelChartLoaded = true;
        });
      });
    },
    async getProperties() {
      await this.$store
        .dispatch("property/getInfo")
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
