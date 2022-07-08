<template>
  <div id="app">
    <div class="left">
      <kline-chart :data="kline"></kline-chart>
      <order-book></order-book>
    </div>
    <div class="right">
      <controller></controller>
      <trading></trading>
    </div>
  </div>
</template>

<script lang="ts">
import Controller from "./components/Controller.vue";
import KlineChart from "./components/KlineChart.vue";
import OrderBook from "./components/OrderBook.vue";
import Trading from "./components/Trading.vue";

export default {
  components: {
    Controller,
    KlineChart,
    OrderBook,
    Trading,
  },
  data() {
    return {
      kline: [
        {
          close: 4976.16,
          high: 4977.99,
          low: 4970.12,
          open: 4972.89,
          timestamp: 1587660000000,
          volume: 204,
        },
        {
          close: 4977.33,
          high: 4979.94,
          low: 4971.34,
          open: 4973.2,
          timestamp: 1587660060000,
          volume: 194,
        },
        {
          close: 4977.93,
          high: 4977.93,
          low: 4974.2,
          open: 4976.53,
          timestamp: 1587660120000,
          volume: 197,
        },
      ],
    };
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
  color: #2c3e50;

  .left,
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & > div {
      flex: 1;
    }
  }
}
</style>
