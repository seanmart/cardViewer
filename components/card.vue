<template lang="html">
  <div class="card" ref="card" :class="{ seen }">
    <div class="inner-card" ref="container">
      <div class="card-sides" ref="sides">
        <div class="front" @click="cardActive()">
          <div class="content">
            <p>
              {{
                card.story
                  .split(" ")
                  .slice(0, 3)
                  .join(" ")
              }}...
            </p>
          </div>
        </div>
        <div class="back">
          <div class="content">
            <p>{{ card.story }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, TweenMax } from "gsap";
export default {
  props: {
    card: Object,
    gutter: Number,
    row: Number
  },
  data() {
    return {
      unhideHeader: false,
      animationDuration: 0.75
    };
  },
  computed: {
    active() {
      return this.$store.state.activeCardId === this.card.id;
    },
    seen() {
      return this.$store.state.cardHasBeenFlipped[this.card.id];
    }
  },
  watch: {
    active() {
      this.active ? this.open() : this.close();
    }
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
    open() {
      let tl = new TimelineMax();
      let refs = this.refs();
      let rect = this.getRect();

      tl.set(refs.container, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: "fixed",
        zIndex: 5
      });

      tl.to(refs.container, this.animationDuration, {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 0
      });

      tl.to(refs.sides, this.animationDuration, { rotationY: 180 }, 0);
    },
    close() {
      let tl = new TimelineMax();
      let refs = this.refs();
      let rect = this.getRect();

      tl.to(refs.container, this.animationDuration, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        padding: 5
      });

      tl.to(refs.sides, this.animationDuration, { rotationY: 0 }, 0);

      let callback = () => {
        this.$store.commit("setCardhasBeenFlipped", this.card.id);
        tl.set(refs.container, { clearProps: "all" });
        this.unhideHeader && this.$store.commit("setHideHeader", false);
        this.unhideHeader = false;
      };

      tl.eventCallback("onComplete", callback());
    },
    getRect() {
      return this.$refs.card.getBoundingClientRect();
    },
    refs() {
      return {
        card: this.$refs.card,
        sides: this.$refs.sides,
        container: this.$refs.container
      };
    }
  },
  beforeDestroy() {
    if (this.active) {
      this.unhideHeader && this.$store.commit("setHideHeader", false);
      this.$store.commit("setActiveCardId", null);
      this.$store.commit("clearOnClose");
    }
  }
};
</script>

<style lang="css">

.card, .inner-card,.card-sides{
  height: 100%;
  width: 100%;
}

.card{
  font-size: 3.4vw;
}

.card.seen .front{
  color: #aaa;
  background: #f1f1f1;
}

.inner-card{
  padding: 5px;
  perspective: 1000
}

.card-sides{
  position: relative;
  transform-style: preserve-3d;
}

.front,.back{
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  backface-visibility: hidden;
}

.front{
  background: white;
  border: 2px solid black;
  color: black;
}

.front .content{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.back{
  background: black;
  color: white;
  transform: rotateY(180deg);
  overflow: hidden;
}

.back .content{
  height: 100vh;
  width: 100vw;
  padding: 100px 50px 50px;
  overflow: auto;
  line-height: 1.5em;
}

@media screen and (min-width: 750px){
  .card{
    font-size: 25.5px;
  }

  .back-content{
    line-height: 45px;
  }
}
</style>
