<template>
  <b-container>
    <b-row>
      <b-col cols="8">
        <b-row>
          <!-- <b-col>
            <stats-card data-background-color="green">
              <template slot="header">
                <b-icon icon="bag-check" scale="2.5" style="color: green"></b-icon>
              </template>

              <template slot="content">
                <p class="category">Your Accommodation(s)</p>
                <h4 class="title">{{ properties.length }}</h4>
              </template>

              <template slot="footer">
                <span><b-icon icon="clock" variant="dark" scale="1"></b-icon></span>
                <small class="text-muted"><a href="/add-property">Update now</a></small>
              </template>
            </stats-card>
          </b-col> -->
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
                <small class="text-muted"><a href="/add-property">Review your contracts</a></small>
              </template>
            </stats-card>
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
                  ><small class="text-muted"><a href="/add-property">Edits photos</a></small></span
                >
                <span
                  ><small class="text-muted"
                    ><a
                      style="text-decoration: underline; color: purple; float: right"
                      href="/add-property"
                      >Increase Limit</a
                    ></small
                  ></span
                >
              </template>
            </stats-card>
          </b-col>
          <b-col>
            <div style="margin-bottom: 35px">
              <h4 class="title">Recent connections updates</h4>
            </div>
            <l-table :data="tableData.data" :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{ row }">
                <td>
                  <b-checkbox v-model="row.checked"></b-checkbox>
                </td>
                <td>{{ row.title }}</td>
                <td class="td-actions text-right">
                  <button
                    type="button"
                    class="btn-simple btn btn-xs btn-info"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit Task"
                  >
                    <i class="fa fa-edit">View</i>
                  </button>
                  <button
                    type="button"
                    class="btn-simple btn btn-xs btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete Task"
                  >
                    <i class="fa fa-times">Download</i>
                  </button>
                </td>
              </template>
            </l-table></b-col
          >
        </b-row>
        <b-row>
          <!-- <b-col>
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
                <small class="text-muted"><a href="/add-property">Review facts</a></small>
              </template>
            </stats-card>
          </b-col> -->{}
        </b-row>
        <br />
        <b-row>
          <b-col>
            <div>
              <chart-card
                :chart-data="hotelsRegisteredChart.data"
                :chart-options="hotelsRegisteredChart.options"
                :chart-responsive-options="hotelsRegisteredChart.responsiveOptions"
                :chart-type="'Bar'"
              >
                <template slot="footer">
                  <div class="stats">
                    Total Number Accommodations
                    <b-icon style="margin: 0 5px 0 20px" icon="clock"></b-icon>
                    <small class="text-muted">updated 10 days ago</small>
                  </div>
                </template>
              </chart-card>
            </div>
            <br />
            <div>
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
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4">
        <div>
          <AppData />
        </div>
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
            <stats-card data-background-color="green">
              <template slot="header">
                <b-icon icon="bag-check" scale="2.5" style="color: green"></b-icon>
              </template>

              <template slot="content">
                <p class="category">Revenue</p>
                <h3 class="title">$34,245</h3>
              </template>

              <template slot="footer">
                <span><b-icon icon="clock" scale="1"></b-icon></span>
                <small class="text-muted">Last updated 24 hours ago</small>
              </template>
            </stats-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <br />

    <br />
    <b-row>
      <b-col class="col-md-6">
        <chart-card
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

      <div class="col-md-6">
        <div>
          <template slot="header">
            <h5 class="title">Tasks</h5>
            <p class="category">Backend development</p>
          </template>
          <l-table :data="tableData.data" :columns="tableData.columns">
            <template slot="columns"></template>

            <template slot-scope="{ row }">
              <td>
                <b-checkbox v-model="row.checked"></b-checkbox>
              </td>
              <td>{{ row.title }}</td>
              <td class="td-actions text-right">
                <button
                  type="button"
                  class="btn-simple btn btn-xs btn-info"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit Task"
                >
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  type="button"
                  class="btn-simple btn btn-xs btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete Task"
                >
                  <i class="fa fa-times"></i>
                </button>
              </td>
            </template>
          </l-table>
          <div class="footer">
            <hr />
            <div class="stats"><i class="fa fa-history"></i> Updated 3 minutes ago</div>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import ChartCard from "../cards/ChartCard.vue";
import StatsCard from "../cards/StatsCard.vue";
import LTable from "./Card.vue";
import AppData from "../layout/appData.vue";

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard,
    AppData,
  },
  data() {
    return {
      pieChart: {
        data: {
          labels: ["40%", "20%", "40%"],
          series: [40, 20, 40],
        },
      },
      hotelsRegisteredChart: {
        data: {
          labels: [
            "Jan-22",
            "Feb-22",
            "Mar-22",
            /* "Apr-22",
            "May-22",
            "Jun-22",
            "Jul-22",
            "Aug-22",
            "Sep-22",
            "Oct-22",
            "Nov-22",
            "Dec-22", */
          ],
          series: [[0, 10, 50]],
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
      tableData: {
        data: [
          { title: "display table options 1", checked: false },
          { title: "option 2 ?", checked: false },
          { title: "option 3 ?", checked: true },
          { title: "option 4 ?", checked: false },
          { title: "option 5 ?", checked: false },
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
    imageLimits() {
      const isPremium = this.$store.getters["user/isPremium"];
      return isPremium ? "Unlimited" : "25";
    },
    lastPublishDate() {
      return this.$store.getters["property/getLastPublishDate"];
    },
  },
  created() {
    this.getTotalImages();
    this.getLastPublishDate();
  },
  methods: {
    getLastPublishDate() {
      this.$store.dispatch("property/lastPublishDate");
    },
    getTotalImages() {
      this.$store.dispatch("galleryInfo/totalPhotos");
    },
    async getProperties() {
      await this.$store
        .dispatch("property/getInfo")
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          /* console.log(response); */
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
  },
};
</script>
