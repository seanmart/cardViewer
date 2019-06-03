<template lang="html">
  <div class="word-cloud" :class="{ on }">
    this is a word cloud
  </div>
</template>

<script>
export default {
  transition: "cloud",
  data() {
    return {
      hideHeader: false,
      on: false
    };
  },
  mounted() {
    this.$store.commit("setOnClose", {
      action: "setWordCloudIsActive",
      value: false
    });
    this.hideHeader = this.$store.state.hideHeader;
    this.$store.commit("setHideHeader", false);
    setTimeout(() => (this.on = true), 100);
  },
  beforeDestroy() {
    this.on = false;
    if (this.hideHeader) {
      this.$store.commit("setHideHeader", true);
    }
  }
};
</script>

<style lang="css" scoped>
.word-cloud{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(255,255,255,.9);
  z-index: 1;
  transition: .5s;
  padding: 95px 25px 25px;
  opacity: 0
}

.word-cloud.on{
  opacity: 1
}
</style>
