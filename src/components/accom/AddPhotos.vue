<template>
  <div class="container container-fluid">
    <b-col cols="10">
      <h4>
        Manage
        <a href="javascript:void(0)" style="cursor: auto">{{ selectedHotel.hotelName }}</a> Photos
      </h4>
    </b-col>
    <br />
    <b-row class="justify-content-center">
      <b-col cols="10" v-if="showUpload">
        <UploadImages
          @changed="handleImages"
          fileError="image files only accepted"
          clearAll="remove all images"
        />
      </b-col>
    </b-row>

    <div>
      <b-progress :max="max" v-if="showProgress">
        <b-progress-bar
          :value="value"
          :label="`${((value / max) * 100).toFixed(2)}%`"
        ></b-progress-bar>
      </b-progress>
      <b-button style="margin-top: 5px" variant="outline-success" size="lg" @click="onUpload"
        >Upload</b-button
      >
    </div>

    <b-row class="ananasImageGallery">
      <b-col cols="12" class="filters">
        <form>
          <fieldset>
            <legend>Filter</legend>
            <span v-for="(category, index) in categories" :key="index">
              <label :for="index">
                <input
                  type="radio"
                  :id="index"
                  name="filters"
                  :checked="index === 0"
                  v-on:click="updateFilter(category)"
                />
                {{ category }}
              </label>
            </span>
          </fieldset>
        </form>
        <hr />
      </b-col>

      <transition-group name="thumbnailfade">
        <div
          v-for="thumb in filteredImages"
          :key="thumb.id"
          style="width: fit-content; float: left"
        >
          <img
            :src="thumbnailDir + thumb.name"
            :alt="thumb.alt"
            :title="thumb.alt"
            :sequence="thumb.sequence"
          />
          <div>
            <b-button
              variant="outline-primary"
              size="sm"
              @click="showPhotoDetails(thumb)"
              style="margin-right: 5px"
              >Edit details</b-button
            >
            <b-button
              variant="outline-primary"
              size="sm"
              @click="showLightbox(thumb.name)"
              style="margin-right: 5px"
              >View image</b-button
            >
            <b-button
              size="sm"
              @click="removePhoto(thumb.id)"
              variant="outline-danger"
              style="margin-right: 5px"
              >Delete</b-button
            >
          </div>
        </div>
      </transition-group>
      <!-- enter modal -->
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal">
          <div
            class="modal"
            style="
              align: left;
              display: block;
              width: 100%;
              float: left;
              max-width: fit-content;
              max-height: 90%;
            "
          >
            <header class="modalheader">
              <div class="modalheaderback">
                <svg
                  width="100%"
                  height="100"
                  viewBox="0 0 617 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M404.455 250.978L454.886 250.978L480.102 207.303L454.886 163.628L404.455 163.628L379.239 207.303L404.455 250.978Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M404.455 163.633L454.886 163.633L480.102 119.958L454.886 76.2833L404.455 76.2833L379.239 119.958L404.455 163.633Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M253.15 250.978L303.581 250.978L328.797 207.303L303.581 163.628L253.15 163.628L227.935 207.303L253.15 250.978Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M110.276 236.421L143.897 236.421L160.707 207.304L143.897 178.188L110.276 178.188L93.4656 207.304L110.276 236.421Z"
                    stroke="#8eafef"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M101.857 250.978L152.288 250.978L177.504 207.303L152.288 163.628L101.857 163.628L76.6418 207.303L101.857 250.978Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M26.2167 207.302L76.6477 207.302L101.863 163.631L76.6478 119.956L26.2167 119.956L1.00111 163.631L26.2167 207.302Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M253.15 163.633L303.581 163.633L328.797 119.958L303.581 76.2833L253.15 76.2833L227.935 119.958L253.15 163.633Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M555.732 163.633L606.163 163.633L631.379 119.958L606.163 76.2833L555.732 76.2833L530.517 119.958L555.732 163.633Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M555.732 76.2795L606.163 76.2795L631.379 32.6049L606.163 -11.0698L555.732 -11.0698L530.517 32.6049L555.732 76.2795Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M480.095 207.302L530.523 207.302L555.738 163.631L530.523 119.956L480.095 119.956L454.88 163.631L480.095 207.302Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M631.391 207.302L681.822 207.302L707.037 163.631L681.822 119.956L631.391 119.956L606.175 163.631L631.391 207.302Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M328.803 207.302L379.234 207.302L404.449 163.631L379.234 119.956L328.803 119.956L303.587 163.631L328.803 207.302Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M328.803 32.6077L379.234 32.6077L404.449 -11.067L379.234 -54.7381L328.803 -54.7381L303.587 -11.067L328.803 32.6077Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M328.803 119.956L379.234 119.956L404.449 76.2809L379.234 32.6063L328.803 32.6063L303.587 76.2809L328.803 119.956Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M177.509 119.956L227.937 119.956L253.152 76.2809L227.937 32.6063L177.509 32.6063L152.29 76.2809L177.509 119.956Z"
                    stroke="#8eafef"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M404.449 163.632L454.88 163.629L480.099 207.296L530.523 207.3L555.738 250.974L530.523 294.649L480.092 294.649L454.88 338.324L404.442 338.324L379.233 294.649L404.449 250.974"
                    stroke="#8eafef"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  ></path>
                </svg>
              </div>
              <div class="partnerhead">
                <div class="row">
                  <div class="col">
                    <h4 size="24" color="#34404E" class="">Edit photo details</h4>
                  </div>
                </div>
              </div>
            </header>
            <div class="modalcontainer">
              <form v-on:submit.prevent @submit="savePhotoEdit()">
                <b-row>
                  <b-col>
                    <img
                      :src="thumbnailDir + imageToEdit.name"
                      :alt="imageToEdit.alt"
                      :title="imageToEdit.alt"
                      style="width: auto; height: auto; max-width: 500px"
                    />
                  </b-col>
                  <b-col>
                    <div class="row">
                      <label class="col-form-label col-form-label-sm">file name:</label>
                      <div class="">
                        <p class="form-control-sm">{{ imageToEdit.alt }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-form-label col-form-label-sm">uploaded by:</label>
                      <div class="">
                        <p class="form-control-sm">{{ imageToEdit.uploadedBy }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-form-label col-form-label-sm">file type:</label>
                      <div class="">
                        <p class="form-control-sm">{{ imageToEdit.fileType }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <label class="col-form-label col-form-label-sm">file size:</label>
                      <div class="">
                        <p class="form-control-sm">{{ imageToEdit.fileSize }}</p>
                      </div>
                    </div>
                    <hr />
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-sm">Title</label>
                      <div class="col">
                        <input
                          v-model="imageToEdit.alt"
                          class="form-control form-control-sm"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-sm">Category</label>
                      <div class="col">
                        <select class="form-control form-control-sm" v-model="imageToEdit.filter">
                          <option value="" selected>--None--</option>
                          <option v-for="(ca, index) in dropCategories" :key="index" :value="ca">
                            {{ ca }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-sm">Description</label>
                      <div class="col">
                        <input
                          v-model="imageToEdit.description"
                          class="form-control form-control-sm"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label col-form-label-sm">Sequence</label>
                      <div class="col">
                        <input
                          v-model="imageToEdit.sequence"
                          class="form-control form-control-sm"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <b-row>
                      <b-col>
                        <b-button
                          type="submit"
                          style="margin-right: 30px"
                          class="col-sm-4"
                          size="sm"
                          variant="success"
                          value="Save"
                          >Save</b-button
                        >
                        <b-button
                          type="button"
                          class="col-sm-4"
                          size="sm"
                          variant="dark"
                          @click="cancelPhotoEdit()"
                          >Cancel</b-button
                        >
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </form>
            </div>
          </div>
        </div>
      </transition>

      <lightbox
        id="mylightbox"
        ref="lightbox"
        :images="images"
        :directory="thumbnailDir"
        :filter="galleryFilter"
        :timeout-duration="5000"
        :close-on-backdrop-click="true"
      />
    </b-row>

    <!-- end -->
  </div>
</template>
<script>
import UploadImages from "vue-upload-drop-images";
// import axios from 'axios';
// const photoDir = "https://";
/* const photoDir = "https://app.hotelfacts.net/media/gallery/"; */

export default {
  components: {
    UploadImages,
  },
  data() {
    return {
      showUpload: true,
      showModal: false,
      thumbnailDir: "",
      showProgress: false,
      galleryFilter: "All",
      extensions: ".jpg, .jpeg, .png",
      dragAndDropCapable: false,
      imageToEdit: null,
      files: [],
      max: 100,
      categories: [
        "All",
        "Facilities",
        "Rooms",
        "Food & Beverage",
        "Sports & Wellness",
        "Children",
        "Entertainment",
        "Other",
      ],
      dropCategories: [
        "Facilities",
        "Rooms",
        "Food & Beverage",
        "Sports & Wellness",
        "Children",
        "Entertainment",
        "Other",
      ],
    };
  },
  mounted() {
    this.retrieveGallery();
  },
  computed: {
    images() {
      const result = [];
      this.propertyPhotos.forEach((img) => {
        const imgStream = new Image();
        imgStream.src = img.image;
        const el = {
          name: img.image,
          alt: img.name,
          filter: img.category || "All",
          description: img.description,
          id: img.id,
          sequence: img.sequence,
          uploadedBy: img.uploaded_by,
          fileType: img.image.split(".").pop(),
          fileSize: `${imgStream.height}x${imgStream.width}`,
        };
        result.push(el);
      });
      return result;
    },
    propertyPhotos() {
      return this.$store.getters["galleryInfo/gallery"];
    },
    selectedHotel() {
      const propertyId = this.$route.params.id;
      const properties = this.$store.getters["property/getProperties"];
      const filteredData = properties.filter((item) => item.id === parseInt(propertyId, 10));
      return (
        filteredData[0] || {
          hotelName: "",
        }
      );
    },
    value() {
      return this.$store.getters["galleryInfo/progress"] / this.files.length;
    },
    filteredImages() {
      if (this.galleryFilter === "All") {
        return this.images;
      }
      return this.images.filter((image) => image.filter === this.galleryFilter);
    },
  },
  methods: {
    retrieveGallery() {
      this.$store.dispatch("galleryInfo/retrievePhotos", this.$route.params.id);
    },
    removePhoto(photoId) {
      const photoInfo = {
        propertyId: this.$route.params.id,
        photoId,
      };
      this.$store
        .dispatch("galleryInfo/removePhoto", photoInfo)
        .then(() => {})
        .catch(() => {});
    },
    onUpload() {
      this.showProgress = true;
      const formData = new FormData();
      const propertyId = this.$route.params.id;
      Object.keys(this.files).forEach((img) => {
        formData.append("imagesArray", this.files[img]);
      });
      const newInfo = {
        formData,
        propertyId,
      };
      this.$store
        .dispatch("galleryInfo/uploadBulkPhotos", newInfo)
        .then(() => {
          this.retrieveGallery();
          this.showProgress = false;
          this.showUpload = false;
          this.files = [];
          this.$nextTick(() => {
            this.showUpload = true;
            this.$toast.success("The images are uploaded succeessfully");
          });
        })
        .catch(() => {
          this.showProgress = false;
          this.$toast.error("Something went wrong. Please fix the errors.");
        });
    },
    // eslint-disable-next-line no-unused-vars
    progress(event, progress, stepValue) {
      /* console.log(stepValue, event, progress); */
    },
    // eslint-disable-next-line no-unused-vars
    progressEnd(event) {
      /* console.log("Circle progress end", event); */
    },
    handleImages(files) {
      this.files = [];
      const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      files.forEach((f) => {
        if (fileTypes.includes(f.type)) {
          this.files.push(f);
        }
      });
      /* console.log(this.files); */
    },
    showLightbox(imageName) {
      /* console.log(imageName); */
      this.$refs.lightbox.show(imageName);
    },
    updateFilter(filterName) {
      this.galleryFilter = filterName;
    },
    determineDragAndDropCapable() {
      const div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },
    showPhotoDetails(imageToEdit) {
      this.showModal = true;
      this.imageToEdit = imageToEdit;
    },
    cancelPhotoEdit() {
      this.showModal = false;
      this.imageToEdit = null;
    },
    savePhotoEdit() {
      const newInfo = {
        name: this.imageToEdit.alt,
        category: this.imageToEdit.filter,
        description: this.imageToEdit.description,
        sequence: this.imageToEdit.sequence,
        propertyId: this.$route.params.id,
        photoId: this.imageToEdit.id,
      };
      this.$store
        .dispatch("galleryInfo/patchPhoto", newInfo)
        .then(() => {
          this.cancelPhotoEdit();
        })
        .catch(() => {});
      this.showModal = false;
    },
  },
};
</script>
