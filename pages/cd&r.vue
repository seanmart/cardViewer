<template lang="html">
  <div class="site-container">
    <navHeader logo="cdr" />
    <navButton :menu="false" />
    <div class="content-container">
      <wordCloud v-if="wordCloudActive" />
      <virtualList
        id="list"
        :size="size"
        :remain="remain"
        :bench="8"
        :itemcount="cards.length"
        :item="row"
        :itemprops="props"
        :onscroll="handleScroll"
      />
    </div>
  </div>
</template>

<script>
import { chunk } from "lodash";
import data from "@/content/cd&r.json";
import row from "@/components/row";
import virtualList from "vue-virtual-scroll-list";
import navButton from "@/components/navButton";
import navHeader from "@/components/navHeader";
import wordCloud from "@/components/wordCloud";
export default {
  components: {
    virtualList,
    navButton,
    navHeader,
    wordCloud
  },
  data() {
    return {
      scrolled: false,
      row: row,
      columns: 3,
      size: 0,
      remain: 0
    };
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  computed: {
    wordCloudActive() {
      return this.$store.state.wordCloudIsActive;
    },
    cards() {
      let id = 0;
      return chunk(data, this.columns).map(r => {
        return r.map(c => {
          id = id + 1;
          return { ...c, id };
        });
      });
    }
  },
  watch: {
    scrolled() {
      this.$store.commit("setHideHeader", this.scrolled);
    }
  },
  methods: {
    handleScroll(event, params) {
      this.scrolled = params.offset > 0;
    },
    handleResize() {
      this.columns = window.innerWidth < 800 ? 2 : 3;
      this.size = Math.ceil(window.innerWidth / this.columns);
      this.remain = window.innerHeight / this.size;
    },
    props(i) {
      return {
        props: {
          columns: this.columns,
          size: this.size,
          cards: this.cards[i],
          row: i,
          cardStyle: "cdr"
        }
      };
    }
  }
};
</script>

<style lang="css">

.content-container{
  perspective: 1000px;
  overflow: hidden;
  height: 100vh;
}

.site-container{
  animation: fade-in 2s
}
#list{
  -webkit-overflow-scrolling: touch;
  padding: 95px 0px 5px;
}

@keyframes fade-in{
  from{opacity: 0}
  to{opacity: 1}
}
</style>
