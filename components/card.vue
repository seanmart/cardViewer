<template lang="html">
  <div :class="['card', cardStyle, { seen }]" ref="card">
    <div class="inner-card" ref="container">
      <div class="card-sides" ref="sides">
        <div class="front" @click="cardActive()">
          <div class="content" ref="front">
            <img v-if="card.image" :src="card.image" alt="" />
            <p v-else>
              {{
                card.text
                  .split(" ")
                  .slice(0, 3)
                  .join(" ")
              }}...
            </p>
          </div>
        </div>
        <div class="back">
          <div class="content">
            <p>{{ card.text }}</p>
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
    row: Number,
    cardStyle: String
  },
  data() {
    return {
      spacing: 10,
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

      let rect = this.getRect(refs.card);

      tl.set(refs.container, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        position: "fixed",
        zIndex: 5
      });

      rect = this.getRect(refs.front);

      tl.set(refs.front, {
        height: rect.height,
        width: rect.width
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
      let rect = this.getRect(refs.card);

      tl.to(refs.container, this.animationDuration, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        padding: 10
      });

      tl.to(refs.sides, this.animationDuration, { rotationY: 0 }, 0);

      let callback = () => {
        this.$store.commit("setCardhasBeenFlipped", this.card.id);
        tl.set(refs.container, { clearProps: "all" });
        tl.set(refs.front, { clearProps: "all" });
        this.unhideHeader && this.$store.commit("setHideHeader", false);
        this.unhideHeader = false;
      };

      tl.eventCallback("onComplete", callback());
    },
    getRect(x) {
      return x.getBoundingClientRect();
    },
    refs() {
      return {
        card: this.$refs.card,
        sides: this.$refs.sides,
        container: this.$refs.container,
        front: this.$refs.front
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

.card.seen .front p{
  opacity: .5
}

.inner-card{
  padding: 10px;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.front img{
  max-width: 80%;
}

.cdr .front{
  color: #4972aa;
  border: 1px solid #CDDCEB;
  background: white;
  box-shadow: 0px 10px 20px -12px #2b5083
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

.cdr .back{
  background: #4972aa
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
