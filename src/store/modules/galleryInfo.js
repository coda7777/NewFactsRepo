import axios from "axios";

export default {
  namespaced: true,
  state: {
    progress: 0,
    photos: [],
    totalPhotos: 0,
  },
  mutations: {
    updateProgress(state, newProgress) {
      state.progress = newProgress;
    },
    updatePhotos(state, newPhotos) {
      state.photos = newPhotos;
    },
    updatetotalPhotos(state, newCount) {
      state.totalPhotos = newCount;
    },
    removeFromGallery(state, photoId) {
      let photoIndex = -1;
      state.photos.forEach((photo) => {
        if (photo.id === photoId) {
          photoIndex = state.photos.indexOf(photo);
        }
      });
      if (photoIndex !== -1) {
        state.photos.splice(photoIndex, 1);
      }
    },
    updateInGallery(state, newPhoto) {
      let photoIndex = -1;
      state.photos.forEach((photo) => {
        if (photo.id === newPhoto.id) {
          photoIndex = state.photos.indexOf(photo);
        }
      });
      if (photoIndex !== -1) {
        state.photos[photoIndex].name = newPhoto.name;
        state.photos[photoIndex].alt = newPhoto.alt;
        state.photos[photoIndex].category = newPhoto.category;
        state.photos[photoIndex].description = newPhoto.description;
        state.photos[photoIndex].uploaded_by = newPhoto.uploaded_by;
        state.photos[photoIndex].sequence = newPhoto.sequence;
      }
    },
  },
  actions: {
    totalPhotos(context) {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/facts/count-images/",
      })
        .then((response) => {
          context.commit("updatetotalPhotos", response.data.images);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    retrievePhotos(context, propertyId) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/facts/property/${propertyId}/gallery/`,
      })
        .then((response) => {
          console.log(response.data);
          context.commit("updatePhotos", response.data);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          /* console.log(error); */
          context.commit("updatePhotos", []);
        });
    },
    removePhoto(context, photoInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/facts/property/gallery/${photoInfo.propertyId}/${photoInfo.photoId}/delete/`,
        })
          .then((response) => {
            context.commit("removeFromGallery", photoInfo.photoId);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    uploadBulkPhotos(context, newInfo) {
      context.commit("updateProgress", 0);
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: `http://127.0.0.1:8000/api/facts/property/${newInfo.propertyId}/gallery/create/`,
          data: newInfo.formData,
          onUploadProgress: (uploadEvent) => {
            context.commit("updateProgress", (uploadEvent.loaded / uploadEvent.total) * 100);
          },
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    patchPhoto(context, newInfo) {
      axios.defaults.headers.common.Authorization = `Token ${context.rootState.user.token}`;
      return new Promise((resolve, reject) => {
        axios({
          method: "patch",
          url: `http://127.0.0.1:8000/api/facts/property/gallery/${newInfo.propertyId}/${newInfo.photoId}/update/`,
          data: {
            name: newInfo.name,
            alt: newInfo.name,
            category: newInfo.category,
            description: newInfo.description,
            sequence: newInfo.sequence,
          },
        })
          .then((response) => {
            context.commit("updateInGallery", response.data);
            /* console.log(response); */
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    progress(state) {
      return state.progress;
    },
    gallery(state) {
      return state.photos;
    },
    getProperty(state) {
      return state.property;
    },
    getTotalPhotos(state) {
      return state.totalPhotos;
    },
  },
};
