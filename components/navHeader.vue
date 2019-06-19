<template lang="html">
  <header :class="{ hide }">
    <Component :is="logo" class="logo" />
  </header>
</template>

<script>
import toddstreet from "./toddstreet";
import cdr from "./cdr";
export default {
  components: { toddstreet, cdr },
  props: {
    logo: { type: String, default: "toddstreet" }
  },
  computed: {
    hide() {
      return this.$store.state.hideHeader;
    }
  }
};
</script>

<style lang="css">

header{
  height: 100px;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
  overflow: hidden;
  transition: top .25s;
  padding: 25px;
  display: flex;
  align-items: center;
}

header.hide {
  top: -100px;
}

.logo{
  height: 100%;
  max-width: 140px;
}
</style>
