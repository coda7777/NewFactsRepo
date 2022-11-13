<template>
  <div class="fixed-plugin">
    <ul class="theme-menu" :class="{ show: isOpen }">
      <li class="header-title">Theme Colors</li>
      <li class="adjustments-line text-center">
        <span
          v-for="item in sidebarColors"
          :key="item.color"
          style="display: inline-block"
          class="badge filter"
          :class="[`badge-${item.color}`, { active: item.active }]"
          :data-color="item.color"
          @click="changeSidebarBackground(item)"
        >
        </span>
      </li>
      <li class="header-title">Side bar background</li>
      <li
        v-for="item in sidebarImages"
        :key="item.image"
        text="item"
        :class="{ active: item.active }"
        @click="changeSidebarImage(item)"
      >
        <a class="img-holder switch-trigger">
          <img :src="item.image" alt="" />
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "fixedPlugin",
  data() {
    return {
      documentationLink: "https://hotelfacts.net",
      shareUrl: "https://ananastours.com",
      buyUrl: "",
      freeUrl: "https://royalsafari.net",
      isOpen: true,
      sidebarColors: [
        { color: "purple", active: false },
        { color: "blue", active: false },
        { color: "green", active: false },
        { color: "orange", active: false },
        { color: "red", active: false },
        { color: "ananas", active: true },
      ],
      sidebarImages: [
        { image: require("@/assets/logo.png"), active: true },
        { image: require("@/assets/img/sidebar-1.jpg"), active: false },
        { image: require("@/assets/img/sidebar-2.jpg"), active: false },
        { image: require("@/assets/img/sidebar-3.jpg"), active: false },
        { image: require("@/assets/img/sidebar-4.jpg"), active: false },
      ],
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
    },
    closeDropDown() {
      this.isOpen = false;
    },
    toggleList(list, itemToActivate) {
      list.forEach((listItem) => {
        listItem.active = false;
      });
      itemToActivate.active = true;
    },
    updateValue(name, val) {
      /* console.log(name); */
      this.$emit(`update:${name}`, val);
    },
    changeSidebarBackground(item) {
      this.$emit("update:color", item.color);
      this.toggleList(this.sidebarColors, item);
    },
    changeSidebarImage(item) {
      this.$emit("update:image", item.image);
      this.toggleList(this.sidebarImages, item);
    },
  },
};
</script>
