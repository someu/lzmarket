<template>
  <div class="klinechart-wrapper">
    <div class="klinechart" ref="chartDivRef"></div>
  </div>
</template>

<script setup lang="ts">
import { init, Chart, KLineData } from "klinecharts";
import { onMounted, ref, watch, defineProps } from "vue";

const props = defineProps<{
  data: Array<KLineData>;
}>();

const klineChart = ref<Chart | null>(null);
const chartDivRef = ref<HTMLDivElement | null>(null);

const applyData = (data: KLineData[]) => {
  if (klineChart.value) {
    klineChart.value.applyNewData(data);
  }
};

// 初始化图表
onMounted(() => {
  if (chartDivRef.value) {
    klineChart.value = init(chartDivRef.value) as Chart;
    klineChart.value.createTechnicalIndicator("VOL", false);

    applyData(props.data);
  }
});

// 监听数据变化
watch(
  props.data,
  (data) => {
    applyData(data);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="less">
.klinechart {
  width: 100%;
  height: 100%;
}
</style>
