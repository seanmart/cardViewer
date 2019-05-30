<template lang="html">
  <header :class="{ hide }">
    <img src="/logo.png" class="logo" alt="logo" />
  </header>
</template>

<script>
export default {
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
}

header.hide {
  top: -100px;
}

.logo{
  height: 50px;
}
</style>
