<template lang="html">
  <div class="site-container">
    <navHeader />
    <navButton />
    <div class="content-container">
      <wordCloud v-if="wordCloudActive" />
      <virtualList
        id="list"
        :size="size"
        :remain="remain"
        :bench="8"
        :itemcount="stories.length"
        :item="row"
        :itemprops="rowProps"
        :onscroll="handleScroll"
      />
    </div>
  </div>
</template>

<script>
import { chunk } from "lodash";
import stories from "@/content/stories.json";
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
      remain: 0,
      gutter: 0
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
    stories() {
      let id = 0;
      return chunk(stories, this.columns).map(r => {
        return r.map(c => {
          id = id + 1;
          return { story: c, id };
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
      this.size = Math.ceil(
        (window.innerWidth - this.gutter * 2) / this.columns
      );
      this.remain = window.innerHeight / this.size;
    },
    rowProps(i) {
      return {
        props: {
          columns: this.columns,
          gutter: this.gutter,
          size: this.size,
          stories: this.stories[i],
          row: i
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
