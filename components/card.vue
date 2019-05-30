<template lang="html">
  <div class="card-container" ref="container">
    <div class="card" ref="card">
      <div class="front side" @click="cardActive()" ref="front">
        <h1>{{ card.title }}</h1>
      </div>
      <div class="back side" ref="back">
        <h1>{{ card.title }}</h1>
        <p>{{ card.content }}</p>
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

      let rect = container.getBoundingClientRect();

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
      });
    }
  }
};
</script>

<style lang="css">

.card-container{
  position: relative;
  padding: 5px;
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
  border:1px solid #ddd;
  background: #f1f1f1;
  color: #1a4369;
  padding: 20px;
}

.card .front{
  user-select: none;
  transition: transform .5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card .back{
  transform: rotateY(180deg);
}

.card .front:active{
  transform: scale(.8);
}
</style>
