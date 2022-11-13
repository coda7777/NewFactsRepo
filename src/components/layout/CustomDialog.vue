<template>
  <transition v-if="value" ref="dialog" name="fade" appear>
    <div class="modal-overlay">
      <div class="modal">
        <header class="modalheader">
          <span class="h2 mb-2" font-scale="5" style="z-index: 99; float: right; position: relative"
            ><b-icon icon="x" @click="$emit('cancel-changes')"></b-icon
          ></span>
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
                <h5 size="24" color="#34404E" class="">Are you sure you want to leave the page?</h5>
              </div>
            </div>
          </div>
        </header>
        <div class="modalcontainer">
          <p>Are you done with changes in current accommodation?</p>
          <p>
            Please note all changed done are saved localy and not visible to customer until you
            click
          </p>
          <p>the <strong>Save & publish</strong> button</p>
          <div class="row">
            <div class="col-md-12 text-right">
              <b-button
                style="margin: 15px"
                size="sm"
                variant="outline-danger"
                @click="$emit('cancel-changes')"
                >Cancel</b-button
              >
              <b-button
                style="margin: 15px"
                size="sm"
                variant="outline-success"
                @click="$emit('save-changes')"
                >Save & Exit</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },

  watch: {
    value(val) {
      if (val) this.$refs.dialog;
      else this.$refs.dialog.close();
    },
  },
};
</script>

<style scoped>
.modal {
  padding-bottom: 0px;
}
.header {
  height: 50px;
  box-shadow: inset 0px 4px 9px 5px #eee;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
}

.header > .close {
  font-weight: bold;
  cursor: pointer;
}

.content {
  padding: 20px;
  display: grid;
  place-items: center;
}

.actions {
  padding: 20px;
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  gap: 10px;
}

.actions button {
  padding: 10px;
}
</style>
