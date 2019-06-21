<template lang="html">
  <div id="container">
    <header>
      <img v-if="params.logo" :src="params.logo" alt="logo" />
      <h1 v-if="params.title">{{ params.title }}</h1>
    </header>
    <main v-if="items.length > 0">
      <closebutton
        v-if="active"
        class="close-button"
        @click.native="close"
        :params="params"
      />
      <card
        v-for="(item, i) in items"
        :style="{ animationDelay: `${i * 0.15}s` }"
        :key="i"
        :data="item"
        :params="params"
        :id="i + 1"
      />
    </main>
  </div>
</template>

<script>
import closebutton from "@/components/button";
import card from "@/components/card";
export default {
  async asyncData({ params, redirect }) {
    try {
      let data = await import(`~/content/${params.slug}.js`);
      return { items: data.default.items, params: data.default.params };
    } catch (e) {
      redirect("/demo");
    }
  },
  components: { card, closebutton },
  data() {
    return {
      items: [],
      params: {}
    };
  },
  computed: {
    active() {
      return this.$store.state.activeCard;
    }
  },
  methods: {
    close() {
      this.$store.commit("setActiveCard", null);
    }
  }
};
</script>

<style lang="css">
#container{
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0px 5px 5px;
  animation: fade-in 2s backwards
}
header{
  flex: 0 0 auto;
  padding: 20px 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

header img{
  max-height: 70px;
}

header h1{
  margin-left: 20px;
}
main{
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -5px;
}

.close-button{
  position: fixed;
  top: 20px;
  right: 20px;
  opacity: 0;
  animation: fade-in .5s forwards;
  animation-delay: .75s;
  z-index: 10
}
</style>
