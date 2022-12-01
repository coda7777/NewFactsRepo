<template>
  <div class="container">
    <b-row>
      <b-col cols="2" class="section-border">
        <b-form
          class="form-horizontal form-group form-group-sm"
          v-on:submit.prevent
          @submit="save()"
        >
          <b-row>
            <b-col cols="12">
              <b-form-group label="Font size" description="Set to 0 to disable Border compltely.">
                <b-form-input
                  type="range"
                  min="0"
                  max="20"
                  v-model="fontSize"
                  placeholder="Enter email"
                  required
                ></b-form-input>
                <p class="mt-2">Front size: {{ fontSize }} px</p>
              </b-form-group>
              <hr />
              <b-form-group label="Background color:" description="Template name.">
                <b-form-input
                  type="color"
                  v-model="backgroundColor"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <hr />
              <b-form-group
                label="Paragraph text color:"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  type="color"
                  v-model="paragraphColor"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <hr />
              <b-form-group
                label="Headers color:"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  type="color"
                  v-model="headerColor"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <hr />
              <b-form-group
                label="Font Family"
                description="We'll never share your email with anyone else."
              >
                <b-select class="form-select" v-model="fontSelect" required>
                  <option :value="null">Select</option>
                  <option disabled style="font-weight: bold; background-color: #eeeeee">
                    Serif Fonts
                  </option>
                  <option value="Georgia,serif" style="font-family: Georgia, serif">Georgia</option>
                  <option
                    value="Palatino Linotype,Book Antiqua,Palatino,serif"
                    style="font-family: Palatino Linotype, Book Antiqua, Palatino, serif"
                  >
                    Palatino Linotype
                  </option>
                  <option
                    value="Times New Roman,Times,serif"
                    style="font-family: Times New Roman, Times, serif"
                  >
                    Times New Roman
                  </option>
                  <option disabled style="font-weight: bold; background-color: #eeeeee">
                    Sans-Serif Fonts
                  </option>
                  <option
                    value="Arial,Helvetica,sans-serif"
                    style="font-family: Arial, Helvetica, sans-serif"
                  >
                    Arial
                  </option>
                  <option
                    value="Arial Black,Gadget,sans-serif"
                    style="font-family: Arial Black, Gadget, sans-serif"
                  >
                    Arial Black
                  </option>
                  <option
                    value="Comic Sans MS,cursive,sans-serif"
                    style="font-family: Comic Sans MS, cursive, sans-serif"
                  >
                    Comic Sans MS
                  </option>
                  <option
                    value="Impact,Charcoal,sans-serif"
                    style="font-family: Impact, Charcoal, sans-serif"
                  >
                    Impact
                  </option>
                  <option
                    value="Lucida Sans Unicode,Lucida Grande,sans-serif"
                    style="font-family: Lucida Sans Unicode, Lucida Grande, sans-serif"
                  >
                    Lucida Sans Unicode
                  </option>
                  <option
                    selected="selected"
                    value="Tahoma,Geneva,sans-serif"
                    style="font-family: Tahoma, Geneva, sans-serif"
                  >
                    Tahoma
                  </option>
                  <option
                    value="Trebuchet MS,Helvetica,sans-serif"
                    style="font-family: Trebuchet MS, Helvetica, sans-serif"
                  >
                    Trebuchet MS
                  </option>
                  <option
                    value="Verdana,Geneva,sans-serif"
                    style="font-family: Verdana, Geneva, sans-serif"
                  >
                    Verdana
                  </option>
                  <option disabled style="font-weight: bold; background-color: #eeeeee">
                    Monospace Fonts
                  </option>
                  <option
                    value="Courier New,Courier,monospace"
                    style="font-family: Courier New, Courier, monospace"
                  >
                    Courier New
                  </option>
                  <option
                    value="Lucida Console,Monaco,monospace"
                    style="font-family: Lucida Console, Monaco, monospace"
                  >
                    Lucida Console
                  </option>
                </b-select>
              </b-form-group>
              <hr />
              <b-form-group
                label="Border width"
                description="Set to 0 to disable Border compltely."
              >
                <b-form-input
                  type="range"
                  min="0"
                  max="15"
                  v-model="borderWidth"
                  placeholder="Enter email"
                  required
                ></b-form-input>
                <p class="mt-2">Size: {{ borderWidth }} px</p>
              </b-form-group>
              <hr />
              <b-form-group
                label="Border color:"
                description="Control border around fact's sheet color."
              >
                <b-form-input
                  type="color"
                  v-model="borderColor"
                  placeholder="Select color"
                  required
                ></b-form-input>
              </b-form-group>
              <hr />
              <b-form-group
                label="Number of photos per row"
                description="Number of thumbnail photos per row"
              >
                <b-form-input
                  type="number"
                  min="3"
                  max="6"
                  v-model="photosPerRow"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <hr />
              <b-form-group
                label="Content Type"
                description="We'll never share your email with anyone else."
              >
                <b-select class="form-select" v-model="contentType">
                  <option value="d">Default</option>
                  <option value="r">Rich</option>
                  <option value="s">Short</option>
                </b-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button type="submit" style="margin-right: 50px" variant="success">
                Save
                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
      <b-col cols="10">
        <b-row>
          <b-col>
            <label for="widget-output">Widget Script:</label>
            <b-col id="widget-output">
              <textarea v-model="generatedScript" rows="8" cols="50" width="100%"></textarea>
            </b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="8" class="section-border" style="margin: 30px">
            What are Ananas widgets? They’re simple web applications that make it easy to bring
            dynamic content from your Ananas page onto your own website. Share your latest reviews
            and awards, encourage customers to leave reviews, and much more! How do I add a widget
            to my website? Choose the widget you want to display, then copy and paste the customized
            code into your website’s HTML. If you don’t personally maintain your website, click
            “Email Code” to send the widget code to your webmaster. Need more help? Check out our
            FAQs for answers to many common questions about widgets!
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col>
        <p style="font-weight: 600">Terms and Conditions</p>
        <p>
          By installing the Ananas widget, you: (i) acknowledge and accept the Ananas Facts Widget
          Terms of Use (ToU); (ii) promise that your usage of the Ananas widget will not violate
          these ToU; and(iii) shall maintain and publish a privacy policy on your site in accordance
          with s.9 of the ToU.
        </p>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      /* state: null, */
      widgetName: "Points",
      fontSize: "10",
      backgroundColor: "#000",
      paragraphColor: "#000",
      headerColor: "#000",
      fontSelect: null,
      borderWidth: "2",
      borderColor: "#000",
      photosPerRow: "4",
      widgetId: 0,
      invalidEntry: {
        backgroundColor: [],
      },
      contentType: "d",
      isLoading: false,
    };
  },
  created() {
    this.getAppearance();
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/isAuthenticated"];
    },
    generatedScript() {
      const result = `<iframe src="http://localhost:8000/api/external/widget/?token={your-token}&font_size=${this.fontSize}&background_color=${this.backgroundColor}&paragraph_color=${this.paragraphColor}&header_color=${this.headerColor}&font_select=${this.fontSelect}&border_width=${this.borderWidth}&border_color=${this.borderColor}&photos_per_row=${this.photosPerRow}" frameborder="0" title="Ananas"></iframe>`;
      return result.replace(/#/g, "");
    },
  },
  methods: {
    getAppearance() {
      this.$store
        .dispatch("widgetAppearance/retrieveAppearance")
        .then((response) => {
          console.log(response);
          const appearance = this.$store.getters["widgetAppearance/getAppearance"];
          this.widgetId = appearance.widgetId;
          this.fontSize = appearance.fontSize;
          this.backgroundColor = appearance.backgroundColor;
          this.fontSelect = appearance.fontSelect || null;
          this.borderWidth = appearance.borderWidth;
          this.borderColor = appearance.borderColor;
          this.photosPerRow = appearance.photosPerRow;
          this.contentType = appearance.contentType;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async save() {
      const appearance = {
        id: this.widgetId,
        font_size: this.fontSize,
        background_color: this.backgroundColor,
        paragraph_color: this.paragraphColor,
        header_color: this.headerColor,
        font_select: this.fontSelect,
        border_width: this.borderWidth,
        border_color: this.borderColor,
        photos_per_row: this.photosPerRow,
        content_type: this.contentType,
      };
      this.$store
        .dispatch("widgetAppearance/saveAppearance", appearance)
        .then(() => {
          this.getAppearance();
        })
        .catch(() => {});
    },
  },
};
</script>
