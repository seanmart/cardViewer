<template lang="html">
  <header :class="{ hide }">
    <Logo class="logo" />
  </header>
</template>

<script>
import Logo from "./Logo";
export default {
  components: { Logo },
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
  z-index: -1;
  background: #fff;
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
  height: 30px;
}
</style>
