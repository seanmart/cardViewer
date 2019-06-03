<template lang="html">
  <div class="container">
    <navHeader />
    <navButton />
    <div class="list-container">
      <virtualList
        id="list"
        :class="{ freeze }"
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
export default {
  components: {
    virtualList,
    navButton,
    navHeader
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
    stories() {
      let id = 0;
      return chunk(stories, this.columns).map(r => {
        return r.map(c => {
          id = id + 1;
          return { story: c, id };
        });
      });
    },
    freeze() {
      return this.$store.state.activeCardId;
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
          stories: this.stories[i]
        }
      };
    }
  }
};
</script>

<style lang="css">

.list-container{
  perspective: 1000px;
}

.container{
  animation: fade-in 2s
}
#list{
  -webkit-overflow-scrolling: touch;
  padding: 95px 0px 5px;
}

#list.freeze{
  overflow-y: hidden !important;
}

@keyframes fade-in{
  from{opacity: 0}
  to{opacity: 1}
}
</style>
