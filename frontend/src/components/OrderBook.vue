<template>
  <div class="order-book">
    <div class="title">
      <span>OrderBook</span>
      <el-select v-model="level" class="m-2" size="small">
        <el-option
          v-for="item in levelOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="infos">
      <span>Long</span>
      <span>Short</span>
    </div>
    <div class="content">
      <el-table :data="asks" class="asks">
        <el-table-column prop="0" label="Price" />
        <el-table-column prop="1" label="Size" />
        <el-table-column prop="2" label="Count" />
      </el-table>
      <el-table :data="bids" class="bids">
        <el-table-column prop="0" label="Price" />
        <el-table-column prop="1" label="Size" />
        <el-table-column prop="2" label="Count" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
const levelOptions = [0.1, 1, 10];

export default {
  data: () => {
    return {
      level: 1,
      levelOptions,
      asks: [
        ["1258.29", "15", "0", "2"],
        ["1258.3", "7", "0", "2"],
      ],
      bids: [
        ["1258.29", "15", "0", "2"],
        ["1258.3", "7", "0", "2"],
      ],
    };
  },
};
</script>

<style lang="less">
.order-book {
  display: flex;
  flex-direction: column;

  .title {
    flex: 0 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .infos {
    flex: 0 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    flex: 1;
    display: flex;
    align-items: stretch;

    .asks,
    .bids {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
