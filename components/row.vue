<template lang="html">
  <div
    class="row"
    :style="{ height: `${size}px`, padding: `0px ${gutter + 5}px` }"
  >
    <div
      class="column"
      v-for="story in stories"
      :style="{ width: `${100 / columns}%` }"
    >
      <card :key="story.id" :card="story" :gutter="gutter" />
    </div>
  </div>
</template>

<script>
import card from "./card";
export default {
  components: {
    card
  },
  props: {
    size: { type: Number, default: 300 },
    gutter: { type: Number, default: 0 },
    stories: Array,
    columns: Number
  }
};
</script>

<style lang="css">
.row{
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.column{
  flex: 0 0 auto;
}
</style>
