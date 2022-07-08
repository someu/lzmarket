<template>
  <div id="app">
    <div class="left">
      <kline-chart class="left-top" :data="kline"></kline-chart>
      <order-book class="left-bottom"></order-book>
    </div>
    <div class="right">
      <controller class="right-top"></controller>
      <trading class="right-bottom"></trading>
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
          timestamp: 1,
          volume: 204,
        },
        {
          close: 4977.33,
          high: 4979.94,
          low: 4971.34,
          open: 4973.2,
          timestamp: 2,
          volume: 194,
        },
        {
          close: 4977.93,
          high: 4977.93,
          low: 4974.2,
          open: 4976.53,
          timestamp: 3,
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
  background-color: #eee;

  .left,
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .left-top,
  .left-bottom,
  .right-top,
  .right-bottom {
    margin: 8px;
    padding: 8px;
    background-color: #fff;
    border-radius: 2px;
    flex: 1;
    overflow: auto;
  }
  .left-top {
    padding: 0 !important;
  }
}
</style>
