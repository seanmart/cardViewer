<template lang="html">
  <div class="card-container" ref="container">
    <div class="card" ref="card">
      <div class="front side" @click="cardActive()">
        <div class="front-content" ref="front">
          <h1>{{ card.story.replace(/(([^\s]+\s\s*){10})(.*)/, "$1…") }}</h1>
        </div>
      </div>
      <div class="back side">
        <div class="back-content" :class="{ show }">
          <p>{{ card.story }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, TweenMax } from "gsap";
import numberToWord from "@/plugins/numberToWord";
export default {
  props: {
    card: Object,
    gutter: Number
  },
  computed: {
    active() {
      return this.$store.state.activeCardId === this.card.id;
    }
  },
  watch: {
    active() {
      this.active ? this.flipOpen() : this.flipClose();
    }
  },
  data() {
    return {
      tl: null,
      show: false,
      beforeStyles: {},
      afterStyles: {
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        padding: this.gutter
      },
      unhideHeader: false,
      flipDuration: 0.75
    };
  },
  methods: {
    cardActive() {
      // set the active card id to store
      this.$store.commit("setActiveCardId", this.card.id);

      // add action for when the close button is clicked
      this.$store.commit("setOnClose", {
        action: "setActiveCardId",
        value: null
      });

      // hide the header if its visible
      if (!this.$store.state.hideHeader) {
        this.$store.commit("setHideHeader", true);
        this.unhideHeader = true;
      }
    },
    flipOpen() {
      this.tl = new TimelineMax();
      let dur = this.flipDuration;
      let container = this.$refs.container;
      let card = this.$refs.card;
      let front = this.$refs.front;

      let rect = container.getBoundingClientRect();

      this.show = true;

      this.beforeStyles = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: "fixed",
        zIndex: 5,
        padding: container.style.padding,
        background: "rgba(255, 255, 255, 0)"
      };

      this.tl.set(front, { width: front.offsetWidth });

      this.tl.set(container, this.beforeStyles);
      this.tl.to(container, dur, this.afterStyles);
      this.tl.to(card, dur, { rotationY: 180, ease: Power1.easeInOut }, 0);
      this.tl.to(container, 0.2, { background: "rgba(255,255,255,1)" });
    },
    flipClose() {
      if (!this.tl) return;

      let container = this.$refs.container;

      this.tl.reverse().eventCallback("onReverseComplete", () => {
        TweenMax.set(container, { clearProps: "all" });
        this.unhideHeader && this.$store.commit("setHideHeader", false);
        this.unhideHeader = false;
        this.show = false;
      });
    }
  }
};
</script>

<style lang="css">

.card-container{
  position: relative;
  padding: 3px;
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: subpixel-antialiased;
  perspective: 1000
}

.card{
  height: 100%;
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  background: rgba(255,255,255,0);
}

.card .side{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  backface-visibility: hidden;
  border-radius: 0px;
  overflow: hidden;
  max-width: 100vw;
  max-height: 100vh;
}

.card .front{
  user-select: none;
  transition: transform .5s;
  padding: 10%;
  border:2px solid #000;
  background: #fff;
  color: #000;
  font-size: 1.2em;
}

.card .back{
  background: #000;
  color: #fff;
  transform: rotateY(180deg);
  overflow: hidden;
  font-size: 3.4vw;
}

.back-content{
  height: 100vh;
  width: 100vw;
  padding:100px 100px 40px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  display: none;
  transition: 0s display;
}

.back-content.show{
  display: block;
}

.card p{
  font-size: inherit;
  font-weight: 400
}

.card h1{
  font-size: inherit;
  font-weight: 400;
}

.card .front:active{
  transform: scale(.8);
}
</style>
