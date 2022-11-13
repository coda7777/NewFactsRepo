<template>
  <div style="padding: 30px 100px">
    <div class="page-header">
      <h2>{{ company.company }}</h2>
    </div>
    <b-row>
      <b-col cols="3" style="border-right: 1px solid rgb(221, 221, 221)">
        <b-row
          ><b-col cols="6" style="margin: auto">
            <div style="text-align: center">
              <div>
                <h2>{{ company.company }}</h2>
              </div>
              <div style="margin-bottom: 15px">
                <img :src="company.logo" style="max-width: -webkit-fill-available" />
              </div></div></b-col
        ></b-row>
        <hr />
        <b-row
          ><b-col>country</b-col><b-col>{{ company.country }}</b-col></b-row
        >
        <b-row
          ><b-col>State</b-col><b-col>{{ company.state }}</b-col></b-row
        >
        <b-row
          ><b-col>City</b-col><b-col>{{ company.city }}</b-col></b-row
        >
        <b-row
          ><b-col>Address</b-col><b-col>{{ company.address }}</b-col></b-row
        >
        <b-row
          ><b-col>Phone Number</b-col><b-col>{{ company.contactNumber }}</b-col></b-row
        >
        <br />
        <div>
          <p>
            Website:
            <a :href="company.website"> {{ company.website }}</a>
          </p>
        </div>
        <br />
        <hr />
        <div id="Tripadvisor_and_Social">
          <div>
            <b>Tripadvisor</b>
            <div title="Company title and hint">
              <!-- tripadvisor icon -->
              <div>
                <a :href="company.tripAdvisor" target="_blank" class="sc-dhCHPp jHWIGv">
                  <svg
                    width="23.333333333333336"
                    height="14.000000000000002"
                    viewBox="0 0 25 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="margin-right: 4px"
                  >
                    <path
                      d="M8.46831 8.68321C8.46831 9.8269 7.47627 10.7539 6.2523 10.7539C5.02833 10.7539 4.03628 9.8269 4.03628 8.68321C4.03628 7.53952 5.02833 6.61255 6.2523 6.61255C7.47627 6.61255 8.46831 7.53952 8.46831 8.68321ZM18.7449 6.61255C17.5209 6.61196 16.5282 7.53834 16.5276 8.68203C16.5269 9.82572 17.5183 10.7533 18.7423 10.7539C19.9663 10.7545 20.959 9.82809 20.9596 8.6844C20.9596 8.6841 20.9596 8.68351 20.9596 8.68321C20.9596 7.54012 19.9682 6.61315 18.7449 6.61255ZM24.9937 8.68321C24.9937 11.9067 22.1947 14.5198 18.7449 14.5198C17.1708 14.5219 15.6547 13.9667 14.501 12.9661L12.4998 15L10.4974 12.964C9.34375 13.9659 7.8267 14.5219 6.25166 14.5198C2.80186 14.5198 0.00538636 11.9067 0.00538636 8.68321C0.00348529 7.04096 0.743952 5.47449 2.04397 4.36958L0 2.29152H4.54229C9.34787 -0.763841 15.6635 -0.763841 20.4691 2.29152H25L22.9557 4.36958C24.2554 5.47479 24.9956 7.04125 24.9937 8.68321ZM10.4796 8.68321C10.48 6.50153 8.58744 4.73315 6.25261 4.73285C3.91778 4.73256 2.02527 6.50094 2.02495 8.68262C2.02464 10.8643 3.91715 12.6327 6.25198 12.633H6.2523C8.58681 12.6327 10.4793 10.8646 10.4796 8.68321ZM17.1907 2.78654C14.1883 1.61739 10.8107 1.61739 7.80832 2.78654C10.4765 3.73986 12.4998 5.9701 12.4998 8.56953C12.4998 5.97039 14.5229 3.74016 17.1907 2.78654ZM22.9719 8.68321C22.9719 6.50183 21.0794 4.73345 18.7449 4.73345C16.4103 4.73345 14.5178 6.50183 14.5178 8.68321C14.5178 10.8646 16.4103 12.633 18.7449 12.633C21.0794 12.6327 22.9716 10.8646 22.9719 8.68321Z"
                      fill="#34404E"
                    ></path>
                  </svg>
                </a>
                <small>company.rating reviews</small>
              </div>
            </div>
          </div>
          <br />
          <div>
            <b>Social media</b>
            <div>
              <a :href="company.trustpilot" target="_blank" class="sc-dhCHPp jHWIGv"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.2474 9.17131L15.6018 9.17131L12.6325 1.10437e-06L9.64568 9.1713L-8.00245e-07 9.15373L7.80088 14.8287L4.81405 24L12.6149 18.325L20.4158 24L17.4466 14.8287L25.2474 9.17131Z"
                    fill="#00B67A"
                  ></path>
                  <path
                    d="M18.1145 16.9012L17.4469 14.8279L12.6328 18.3243L18.1145 16.9012Z"
                    fill="#005128"
                  ></path></svg></a
              ><a :href="company.facebook" target="_blank" class="sc-dhCHPp jHWIGv"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                    fill="#1877F2"
                  ></path>
                  <path
                    d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z"
                    fill="white"
                  ></path></svg></a
              ><a :href="company.instagram" target="_blank" class="sc-dhCHPp jHWIGv"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 30.8672C40 35.9141 35.9141 40 30.8672 40H9.13281C4.08594 40 0 35.9141 0 30.8672V9.14062C0 4.09375 4.09375 0 9.14062 0H30.7266C35.8516 0 40 4.14844 40 9.27344V30.8672Z"
                    fill="url(#paint0_radial)"
                  ></path>
                  <path
                    d="M25.5625 5.51556H14.4375C9.50781 5.51556 5.50781 9.51556 5.50781 14.4453V25.5624C5.50781 30.4921 9.5 34.4843 14.4375 34.4843H25.5547C30.4844 34.4843 34.4766 30.4921 34.4766 25.5624V14.4453C34.4844 9.50775 30.4922 5.51556 25.5625 5.51556ZM31.7031 24.4921C31.7031 28.4765 28.4766 31.7031 24.4922 31.7031H15.5078C11.5234 31.7031 8.29688 28.4765 8.29688 24.4921V15.5078C8.29688 11.5234 11.5234 8.29681 15.5078 8.29681H24.4922C28.4766 8.29681 31.7031 11.5312 31.7031 15.5078V24.4921Z"
                    fill="white"
                  ></path>
                  <path
                    d="M20.3901 12.4219C16.1714 12.4219 12.7573 15.8359 12.7573 20.0547C12.7573 24.2656 16.1714 27.6875 20.3901 27.6875C24.6011 27.6875 28.0229 24.2734 28.0229 20.0547C28.0151 15.8359 24.6011 12.4219 20.3901 12.4219ZM20.3901 24.6406C17.8511 24.6406 15.7964 22.5859 15.7964 20.0469C15.7964 17.5078 17.8511 15.4531 20.3901 15.4531C22.9214 15.4531 24.9839 17.5078 24.9839 20.0469C24.9761 22.5859 22.9214 24.6406 20.3901 24.6406Z"
                    fill="white"
                  ></path>
                  <path
                    d="M29.4297 12.3046C29.4297 13.3749 28.5625 14.2421 27.4922 14.2421C26.4219 14.2421 25.5547 13.3749 25.5547 12.3046C25.5547 11.2343 26.4219 10.3593 27.4922 10.3593C28.5625 10.3593 29.4297 11.2265 29.4297 12.3046Z"
                    fill="white"
                  ></path>
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(11.7163 43.0968) scale(53.006 53.0045)"
                    >
                      <stop offset="0.0969388" stop-color="#FFD87A"></stop>
                      <stop offset="0.1426" stop-color="#FCCE78"></stop>
                      <stop offset="0.2263" stop-color="#F5B471"></stop>
                      <stop offset="0.3378" stop-color="#EB8D65"></stop>
                      <stop offset="0.449" stop-color="#E36058"></stop>
                      <stop offset="0.6786" stop-color="#CD3694"></stop>
                      <stop offset="1" stop-color="#6668B0"></stop>
                    </radialGradient>
                  </defs></svg></a
              ><a :href="company.linkedIn" target="_blank" class="sc-dhCHPp jHWIGv"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.2232 0.00014795H1.77086C1.30682 -0.00487478 0.859752 0.174403 0.527754 0.498639C0.195757 0.822875 0.00595425 1.26558 0 1.7296L0 22.2685C0.00545965 22.7329 0.195045 23.1761 0.527096 23.5007C0.859148 23.8253 1.3065 24.0049 1.77086 23.9999H22.2232C22.6886 24.0059 23.1373 23.8269 23.4707 23.5023C23.8042 23.1776 23.9951 22.7339 24.0016 22.2685V1.7296C23.9946 1.26458 23.8035 0.821306 23.4701 0.497067C23.1367 0.172828 22.6882 -0.00588549 22.2232 0.00014795Z"
                    fill="#0072b1"
                  ></path>
                  <path d="M7.11912 8.99744H3.55859V20.4506H7.11912V8.99744Z" fill="white"></path>
                  <path
                    d="M5.33912 3.30475C5.74854 3.30475 6.14877 3.42616 6.48919 3.65362C6.82961 3.88108 7.09494 4.20438 7.25162 4.58264C7.4083 4.9609 7.44929 5.37712 7.36942 5.77868C7.28954 6.18023 7.09239 6.54908 6.80288 6.83859C6.51338 7.12809 6.14453 7.32525 5.74297 7.40512C5.34141 7.485 4.92519 7.444 4.54693 7.28732C4.16868 7.13065 3.84538 6.86532 3.61791 6.5249C3.39045 6.18447 3.26904 5.78425 3.26904 5.37482C3.26904 4.82581 3.48714 4.29927 3.87535 3.91106C4.26357 3.52285 4.7901 3.30475 5.33912 3.30475Z"
                    fill="white"
                  ></path>
                  <path
                    d="M9.35107 8.99742H12.7648V10.5632H12.8137C13.288 9.66173 14.4491 8.71326 16.1842 8.71326C19.7899 8.71326 20.4542 11.0844 20.4542 14.1707V20.4525H16.8937V14.8821C16.8937 13.5535 16.8692 11.8447 15.0438 11.8447C13.2184 11.8447 12.9078 13.2919 12.9078 14.7861V20.4506H9.35107V8.99742Z"
                    fill="white"
                  ></path></svg
              ></a>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="8">
        <b-row
          ><b-col>{{ company.company }}</b-col></b-row
        >
        <b-row
          ><b-col>{{ company.description }}</b-col></b-row
        >
        <hr />
        <b-row
          ><b-col>{{ company.aboutUs }}</b-col></b-row
        >
        <b-row>
          <b-col
            >If Accommodation Show card with Properties and 1 photo of the property rating of
            property</b-col
          >
        </b-row>
        <b-row>
          <b-col
            >If Tour Operator Show list of countries the Tour operator selling in (i.e Tui sells in
            Germany, Switzerland, Austria... etc) (Pegast sells in Russia, Belarus, Ukraine)</b-col
          >
        </b-row>
        <hr />
        <b-row>
          <b-col>Account organizational ( accounts manager / sub user)</b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      company: {},
      id: 1,
    };
  },
  async created() {
    await this.getCompany();
  },
  methods: {
    async getCompany() {
      await this.$store
        .dispatch("portfolio/getInfo", this.id)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          console.log("this response", response);
          this.company = this.$store.getters["portfolio/getPortfolio"];
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
        });
    },
  },
};
</script>
