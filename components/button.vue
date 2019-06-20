<template lang="html">
  <div class="button" :style="buttonStyles">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <path
        d="M 7.9785156 5.9804688 A 2.0002 2.0002 0 0 0 6.5859375 9.4140625 L 12.171875 15 L 6.5859375 20.585938 A 2.0002 2.0002 0 1 0 9.4140625 23.414062 L 15 17.828125 L 20.585938 23.414062 A 2.0002 2.0002 0 1 0 23.414062 20.585938 L 17.828125 15 L 23.414062 9.4140625 A 2.0002 2.0002 0 0 0 21.960938 5.9804688 A 2.0002 2.0002 0 0 0 20.585938 6.5859375 L 15 12.171875 L 9.4140625 6.5859375 A 2.0002 2.0002 0 0 0 7.9785156 5.9804688 z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    params: Object
  },
  computed: {
    buttonStyles() {
      if (!this.params.styles || !this.params.styles.button) return;
      return this.params.styles.button;
    }
  }
};
</script>

<style lang="css">
.button{
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background: white;
  fill: black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px -5px rgba(0,0,0,.5)
}

.button svg{
  width: 50%;
}
</style>
