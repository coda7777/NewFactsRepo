<template>
  <div>
    <h6 class="jMlsPi">
      New notifications <span>{{ filteredItems.length }}</span>
    </h6>
    <input type="hidden" name="userRef" value="" />
    <!-- <span> Hello,{{ notice.userId }}&nbsp;{{ notice.message }} {{ notice.isRead }}</span> -->

    <div v-for="(notice, index) in notifications" class="renderedmessdiv" :key="index">
      <div
        :value="notice"
        v-bind:class="
          notice.isRead === false ? 'renderednoticemessunread' : 'renderednoticemessread'
        "
      >
        <span
          v-if="notice.isRead === false"
          class="renderednoticemessbody"
          @mouseover="updateNotification(notice)"
          >{{ notice.message }} {{ notice.extraId }}</span
        >
        <span v-else class="renderednoticemessbody">
          {{ notice.message }} {{ notice.extraId }}</span
        >
        <span class="notdismissnotice"
          ><a @click="dismissNotification(notice)">Dismiss Notification</a></span
        >
      </div>
    </div>
    <div v-if="notifications.length === 0" class="dhiCld">
      You don't have any notifications at the moment. Adjust your settings to turn them on
      <b-button size="sm" to="/user-settings" class="jGMvnk">Adjust Settings</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Anananotice",
  data() {
    return {
      invalidFeedback: "test",
      nonotice: [],
      state: null,
      isLoading: false,
      registered: false,
      /*       notifications: [
        {
          userId: "",
          notificationType: "",
          message: "",
          isRead: "",
          extraId: "",
          createdAt: "",
          createdBy: "",
        },
      ], */
    };
  },
  created() {
    this.getNotifications();
  },
  computed: {
    notifications() {
      return this.$store.getters["notificationsArea/getNotifications"];
    },
    filteredItems: function () {
      return this.notifications.filter(function (n) {
        return n.isRead === false;
      });
    },
  },
  async mounted() {
    if (this.userId > 0) {
      await this.$store.dispatch("notificationsArea/getNotifications", this.userId);
      this.Notifications = this.$store.getters["notificationsArea/getNotifications"];
    }
  },
  methods: {
    save() {
      if (this.currentUser > 0) {
        this.update();
      }
    },
    async getNotifications() {
      await this.$store
        .dispatch("notificationsArea/getNotifications")
        .then(() => {})
        .catch(() => {});
    },
    async updateNotification(notice) {
      const requestBody = {
        id: notice.id,
        userId: notice.userId,
        notificationType: notice.notificationType,
        message: notice.message,
        isRead: true,
        extraId: notice.extraId,
        createdAt: notice.createdAt,
        createdBy: notice.createdBy,
      };
      console.log("user ID", this.userId);
      await this.$store
        .dispatch("notificationsArea/updateNotification", requestBody)
        .then((response) => {
          this.notifications = [];
          console.log("This resposne", response);
        })
        .catch((error) => {
          this.nonotice = error || [];
        });
      this.getNotifications();
      this.isLoading = false;
      console.log("hello notice", requestBody);
    },
    async dismissNotification(notificationToRemove) {
      await this.$store
        .dispatch("notificationsArea/dismissNotification", notificationToRemove)
        .then((response) => {
          console.log(notificationToRemove);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
