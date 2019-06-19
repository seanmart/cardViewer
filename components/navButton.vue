<template lang="html">
  <div class="button-container" :class="{ 'close-button-on': close, wiggle }">
    <div class="menu button" @click="menuClicked" v-if="menu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        class="menu-icon"
      >
        <path
          d="m132.77 118.03l-27.945-27.945c6.735-9.722 10.1-20.559 10.1-32.508 0-7.767-1.508-15.195-4.523-22.283-3.01-7.089-7.088-13.199-12.221-18.332-5.133-5.133-11.242-9.207-18.33-12.221-7.09-3.01-14.518-4.522-22.285-4.522-7.767 0-15.195 1.507-22.283 4.522-7.089 3.01-13.199 7.088-18.332 12.221-5.133 5.133-9.207 11.244-12.221 18.332-3.01 7.089-4.522 14.516-4.522 22.283 0 7.767 1.507 15.193 4.522 22.283 3.01 7.088 7.088 13.197 12.221 18.33 5.133 5.134 11.244 9.207 18.332 12.222 7.089 3.02 14.516 4.522 22.283 4.522 11.951 0 22.787-3.369 32.509-10.1l27.945 27.863c1.955 2.064 4.397 3.096 7.332 3.096 2.824 0 5.27-1.032 7.332-3.096 2.064-2.063 3.096-4.508 3.096-7.332.0001-2.877-1-5.322-3.01-7.331m-49.41-34.668c-7.143 7.143-15.738 10.714-25.787 10.714-10.05 0-18.643-3.572-25.786-10.714-7.143-7.143-10.714-15.737-10.714-25.786 0-10.05 3.572-18.644 10.714-25.786 7.142-7.143 15.738-10.714 25.786-10.714 10.05 0 18.643 3.572 25.787 10.714 7.143 7.142 10.715 15.738 10.715 25.786 0 10.05-3.573 18.643-10.715 25.786"
          transform="matrix(.11417.00745-.00745.11417 3.93 2.548)"
        />
      </svg>
    </div>

    <div class="close button" @click="closeClicked">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        class="close-icon"
      >
        <path
          d="M 7.9785156 5.9804688 A 2.0002 2.0002 0 0 0 6.5859375 9.4140625 L 12.171875 15 L 6.5859375 20.585938 A 2.0002 2.0002 0 1 0 9.4140625 23.414062 L 15 17.828125 L 20.585938 23.414062 A 2.0002 2.0002 0 1 0 23.414062 20.585938 L 17.828125 15 L 23.414062 9.4140625 A 2.0002 2.0002 0 0 0 21.960938 5.9804688 A 2.0002 2.0002 0 0 0 20.585938 6.5859375 L 15 12.171875 L 9.4140625 6.5859375 A 2.0002 2.0002 0 0 0 7.9785156 5.9804688 z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: { type: Boolean, default: true }
  },
  data() {
    return {
      wiggle: false,
      wiggleSetTimeout: null,
      delay: 30
    };
  },
  mounted() {
    this.loopWiggle();
  },
  computed: {
    close() {
      return this.$store.state.onClose.length > 0;
    }
  },
  watch: {
    close() {
      this.close ? this.clearWiggle() : this.loopWiggle();
    }
  },
  methods: {
    clearWiggle() {
      this.wiggle = false;
      this.wiggleSetTimeout && clearInterval(this.wiggleSetTimeout);
    },
    loopWiggle() {
      let self = this;
      this.clearWiggle();
      this.wiggleSetTimeout = setInterval(() => {
        self.wiggle = true;
        setTimeout(() => {
          self.wiggle = false;
          self.loopWiggle();
        }, 2000);
      }, this.delay * 1000);
    },
    closeClicked() {
      this.$store.state.onClose.forEach(a =>
        this.$store.commit(a.action, a.value)
      );
      this.$store.commit("clearOnClose");
    },
    menuClicked() {
      this.loopWiggle();
      this.$store.commit("setWordCloudIsActive", true);
    }
  }
};
</script>

<style lang="css">
.button-container{
  position: fixed;
  top: 0px;
  right: 0px;
  height: 100px;
  width: 100px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 150px;
  transition: transform .75s
}

.button{
  position: absolute;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  top:25px;
  left: 25px;
  bottom: 25px;
  right:25px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .5s;
  overflow: hidden;
  border-radius: 100%;
}

.button.menu{
  background: #000;
  fill: white;
}

.button.close{
  background: #fff;
  transform: rotateY(180deg);
  fill: #000;
}

.close-button-on .menu{
  transform: rotateY(-180deg);
}

.close-button-on .close{
  transform: rotateY(0deg);
}

.close-button-on{
  transform: scale(1.1);
}

.button:active{
  transform: scale(.7);
}

.menu-icon, .close-icon{
  width: 50%;
}

.button-container.wiggle{
  animation: wiggle .5s infinite;
}

@keyframes wiggle{
  0%{
    transform: translateY(0px);
  }
  50%{
    transform: translateY(-5px);
  }
  100%{
    transform: translateY(0px);
  }
}
</style>
