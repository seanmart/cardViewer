<template lang="html">
  <div class="row" :style="{ height: `${size}px` }">
    <div
      class="column"
      v-for="card in cards"
      :style="{ width: `${100 / columns}%` }"
    >
      <card :key="card.id" :card="card" :row="row" :cardStyle="cardStyle" />
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
    cards: Array,
    columns: Number,
    row: Number,
    cardStyle: String
  }
};
</script>

<style lang="css">
.row{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 0px 15px;
}

.column{
  flex: 0 0 auto;
}
</style>
