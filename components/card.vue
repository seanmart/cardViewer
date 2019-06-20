<template lang="html">
  <div class="card" :style="cardStyles" ref="card">
    <div class="inner-card" ref="innercard">
      <div class="sides" ref="sides">
        <div class="front side" :style="frontStyles" @click="open">
          <div class="content">
            <img v-if="data.front.image" :src="data.front.image" alt="" />
            <h3 v-if="data.front.title" :style="titleStyles">
              {{ data.front.title }}
            </h3>
          </div>
        </div>
        <div class="back side" :style="backStyles" v-if="render">
          <div class="content">
            <h1 v-if="data.back.title" class="row title" :style="titleStyles">
              {{ data.back.title }}
            </h1>

            <div class="row images" v-if="data.back.images">
              <div
                class="image"
                v-for="img in data.back.images"
                :style="{
                  backgroundImage: `url(${img})`,
                  flex: `0 0 ${data.back.images.length > 1 ? '50%' : '100%'}`
                }"
              />
            </div>

            <p v-if="data.back.text" class="row text" :style="textStyles">
              {{ data.back.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flip from "@/plugins/flip";
export default {
  props: {
    data: Object,
    params: Object,
    id: Number
  },
  data() {
    return {
      render: false
    };
  },
  computed: {
    active() {
      return this.$store.state.activeCard === this.id;
    },
    cardStyles() {
      let columns = this.params.columns || 3;
      return {
        width: `${100 / columns}%`
      };
    },
    titleStyles() {
      if (!this.params.styles) return;
      return this.params.styles.title || {};
    },
    textStyles() {
      if (!this.params.styles) return;
      return this.params.styles.text || {};
    },
    frontStyles() {
      if (!this.params.styles || !this.params.styles.front) {
        return {
          border: "1px solid black",
          background: "white",
          color: "black"
        };
      }
      return this.params.styles.front;
    },
    backStyles() {
      if (!this.params.styles || !this.params.styles.back) {
        return {
          background: "black",
          color: "white"
        };
      }
      return this.params.styles.back;
    }
  },
  watch: {
    active() {
      let params = {
        grow: this.$refs.innercard,
        flip: this.$refs.sides,
        container: this.$refs.card,
        padding: 5
      };
      if (this.active) {
        this.render = true;
        flip.open(params);
      } else {
        flip.close(params);
        setTimeout(() => (this.render = false), 1000);
      }
    }
  },
  methods: {
    open() {
      this.$store.commit("setActiveCard", this.id);
    }
  }
};
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap');

.card{
  flex: 0 0 auto;
  font-family: 'Open Sans', sans-serif;
}

.card:before {
    content:'';
    float:left;
    padding-top:100%;
}

.inner-card{
  padding: 5px;
  perspective: 2000px;
}
.inner-card, .sides,.side{
  height: 100%;
  width: 100%;
}

.sides{
  position: relative;
  transform-style: preserve-3d;
}

.side{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  backface-visibility: hidden;
}

.front .content{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.front img{
  width: 80%;
}

.back{
  transform: rotateY(180deg);
  overflow: hidden;
}

.back .content{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 5vw;
}

.back .row{
  flex: 0 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
}

.back .images{
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.back .image{
  height: 40vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.back h1{
  font-size: calc(2em + 1vw);
  padding-right: 100px;
}

.back p{
  font-size: calc(.8em + .5vw);
}



@media screen and (max-width: 900px){
  .card{
    min-width: 33.333%
  }
}

@media screen and (max-width: 600px){
  .card{
    min-width: 50%
  }
}
</style>
