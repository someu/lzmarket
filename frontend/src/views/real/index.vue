<template>
  <div class="real-wrapper">
    <div class="real">
      <div class="title">订单表</div>
      <div class="top">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="daterange"
            type="datetimerange"
            size="small"
          />
        </el-form-item>
        <el-form-item label="周期间隔">
          <el-input
            type="number"
            min="0"
            v-model="interval"
            size="small"
            placeholder="周期间隔(ms)"
          />
        </el-form-item>
        <el-button
          size="small"
          type="primary"
          @click="fetchData"
          :loading="loading"
          >{{ loading ? "加载中" : "刷新" }}</el-button
        >
        <br />
        <el-form-item label="播放间隔">
          <el-input
            type="number"
            min="0"
            v-model="playInterval"
            size="small"
            placeholder="播放间隔(ms)"
          /> </el-form-item
        ><br />
      </div>
      <div class="content">
        <div class="chart" ref="chartRef"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TimelineComponent,
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { getOrderBooks } from "../../api/orderBook";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import _ from "lodash";

echarts.use([
  TimelineComponent,
  TitleComponent,
  GraphicComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

export default {
  data() {
    return {
      interval: 5000,
      playInterval: 1000,
      loading: false,
      daterange: [dayjs().subtract(5, "minute"), dayjs()],
      orderBooks: [],
      asks: [
        {
          name: 12201,
          value: 744,
          count: 12,
        },
        {
          name: 12202,
          value: 123,
          count: 12,
        },
        {
          name: 12203,
          value: 444,
          count: 12,
        },
        {
          name: 12204,
          value: 12,
          count: 12,
        },
        {
          name: 12205,
          value: 1235,
          count: 12,
        },
      ],
      bids: [
        {
          name: 12201,
          value: 744,
          count: 12,
        },
        {
          name: 12202,
          value: 123,
          count: 12,
        },
        {
          name: 12203,
          value: 444,
          count: 12,
        },
        {
          name: 12204,
          value: 12,
          count: 12,
        },
        {
          name: 12205,
          value: 1235,
          count: 12,
        },
      ],
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", () => {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    });
    this.fetchData();
  },
  computed: {
    chartOption() {
      const green = "#3bab87";
      const red = "#a65c59";
      const greenBg = "#0f352a";
      const redBg = "#3b1c1a";

      const optionsData = [];
      let i = 1;
      const count = this.orderBooks.length;
      for (const ob of this.orderBooks) {
        const maxSizeData = Math.max(
          ...ob.asks.map((i) => i.value).filter(Boolean),
          ...ob.bids.map((i) => i.value).filter(Boolean)
        );
        const asks = ob.asks;
        const bids = ob.bids;
        const askMaxs = asks.map((ask) => ({ ...ask, value: maxSizeData }));
        const bidMaxs = bids.map((bid) => ({ ...bid, value: maxSizeData }));

        optionsData.push({
          title: {
            text: `${dayjs(ob.ts).format(
              "YYYY-MM-DD HH:mm:ss:SSS"
            )} (${i++}/${count})`,
          },
          xAxis: [
            {
              max: maxSizeData,
            },
            {
              max: maxSizeData,
            },
          ],
          yAxis: [
            {
              data: bids.map((i) => i.name || ""),
            },
            {
              data: asks.map((i) => i.name || ""),
            },
          ],
          series: [
            {
              data: bids,
            },
            {
              data: bidMaxs,
            },
            {
              data: asks,
            },
            {
              data: askMaxs,
            },
          ],
        });
      }

      const timelineData = this.orderBooks.map((ob) =>
        dayjs(ob.ts).format("MM-DD HH:mm:ss:SSS")
      );
      const gridPaddingPercent = 2;
      const option = {
        backgroundColor: "#111111",
        title: {
          text: "YYYY-MM-DD HH:mm:ss:SSS",
          left: `${gridPaddingPercent}%`,
          top: `${gridPaddingPercent}%`,
          padding: [5, 0],
          textStyle: {
            fontWeight: "bold",
            fontSize: 14,
            color: "#acacac",
          },
        },
        grid: [
          {
            show: true,
            left: `${gridPaddingPercent}%`,
            top: `${gridPaddingPercent + 10.5}%`,
            width: `${50 - gridPaddingPercent}%`,
            height: "77%",
            borderColor: "#1f1f1f",
          },
          {
            show: true,
            right: `${gridPaddingPercent}%`,
            top: `${gridPaddingPercent + 10.5}%`,
            width: `${50 - gridPaddingPercent}%`,
            height: "77%",
            borderColor: "#1f1f1f",
          },
        ],
        tooltip: {
          formatter: (params) => {
            const { componentType, data, componentSubType } = params;
            if (componentType === "timeline" && this.orderBooks[data]) {
              return dayjs(this.orderBooks[data].ts).format(
                "YYYY-MM-DD HH:mm:ss:SSS"
              );
            } else if (componentSubType === "bar") {
              return `价格：${data.name}<br/>合约张数：${data.oValue}<br/>订单数量：${data.count}`;
            } else {
              return "";
            }
          },
        },
        graphic: {
          elements: [
            {
              type: "text",
              top: `${gridPaddingPercent + 4}%`,
              left: `${gridPaddingPercent}%`,
              style: {
                text: "买入",
                fill: "#b0b0b0",
                lineWidth: 1,
              },
              z: 999,
            },
            {
              type: "text",
              top: `${gridPaddingPercent + 4}%`,
              left: `51%`,
              style: {
                text: "卖出",
                fill: "#b0b0b0",
                lineWidth: 1,
              },
              z: 999,
            },
            {
              type: "text",
              top: `${gridPaddingPercent + 8}%`,
              left: `${gridPaddingPercent}%`,
              style: {
                text: "数量(张)",
                fill: "#747474",
                lineWidth: 1,
              },
              z: 999,
            },
            {
              type: "text",
              top: `${gridPaddingPercent + 8}%`,
              left: "center",
              style: {
                text: "价格",
                fill: "#747474",
                lineWidth: 1,
              },
              z: 999,
            },
            {
              type: "text",
              top: `${gridPaddingPercent + 8}%`,
              right: `${gridPaddingPercent}%`,
              style: {
                text: "数量(张)",
                fill: "#747474",
                lineWidth: 1,
              },
              z: 999,
            },
          ],
        },
        xAxis: [
          {
            gridIndex: 0,
            inverse: true,
            show: false,
            type: "value",
          },
          {
            gridIndex: 1,
            show: false,
            type: "value",
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: "category",
            inverse: true,
            position: "right",
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: green,
              margin: -8,
              align: "right",
              formatter: function (value) {
                return value === "undefined" || !value ? "" : value;
              },
            },
            z: 10,
          },
          {
            gridIndex: 1,
            type: "category",
            inverse: true,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: red,
              margin: -5,
              align: "left",
              formatter: function (value) {
                return value === "undefined" || !value ? "" : value;
              },
            },
            z: 10,
          },
        ],
        options: optionsData,
        timeline: {
          playInterval: this.playInterval,
          axisType: "category",
          data: timelineData,
          bottom: `${gridPaddingPercent}%`,
          left: `${gridPaddingPercent * 3}%`,
          right: `${gridPaddingPercent * 3}%`,
        },
        series: [
          {
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            barCategoryGap: "0%",
            color: greenBg,
            barGap: "-100%",
            datasetIndex: 0,
            animation: false,
          },
          {
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            barCategoryGap: "0%",
            color: "transparent",
            barGap: "-100%",
            datasetIndex: 1,
            label: {
              show: true,
              formatter: ({ data: { oValue, count } }) =>
                `${oValue} (${count})(${parseInt(oValue / count)})`,
              // position: ['0%', '50%'],
              // verticalAlign: 'middle',
              position: "insideLeft",
              style: {
                color: "#fff",
              },
            },
            animation: false,
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            datasetIndex: 2,
            barCategoryGap: "0%",
            barGap: "-100%",
            color: redBg,
            animation: false,
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            datasetIndex: 3,
            barCategoryGap: "0%",
            barGap: "-100%",
            color: "transparent",
            label: {
              show: true,
              formatter: ({ data: { oValue, count } }) =>
                `${oValue} (${count})(${parseInt(oValue / count)})`,
              position: "insideRight",
              style: {
                color: "#fff",
              },
            },
            animation: false,
          },
        ],
      };

      return option;
    },
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chartRef);
      this.setChartOption();
    },
    async fetchData() {
      try {
        this.loading = true;
        const daterange = this.daterange;
        if (daterange.length !== 2) {
          throw new Error("请输入时间范围");
        }
        const tsGte = daterange[0].valueOf();
        const tsLte = daterange[1].valueOf();
        if (tsLte > tsGte + 1000 * 60 * 60) {
          throw new Error("查询范围控制在一小时内");
        }

        const res = await getOrderBooks({
          tsGte,
          tsLte,
          interval: parseInt(this.interval),
        });

        res.data.data.forEach((ob) => {
          ob.asks = ob.data.asks.map((i) => {
            return {
              name: i[0],
              value: i[1],
              oValue: i[1],
              count: i[2],
            };
          });
          ob.asks.length = 10;
          ob.bids = ob.data.bids
            .map((i) => {
              return {
                name: i[0],
                value: i[1],
                oValue: i[1],
                count: i[2],
              };
            })
            .reverse();
          ob.bids.length = 10;
          delete ob.data;
        });
        this.orderBooks = res.data.data;
      } catch (err) {
        ElMessage({
          showClose: true,
          type: "error",
          message: `查询出错：${err.toString()}`,
        });
      } finally {
        this.loading = false;
      }
    },
    setChartOption() {
      if (this.chartInstance) {
        this.chartInstance.setOption(this.chartOption);
      }
    },
  },
  watch: {
    chartOption() {
      this.$nextTick(this.setChartOption);
    },
  },
};
</script>

<style lang="less">
.real-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  padding: 24px;
  box-sizing: border-box;
}

.real {
  max-width: 1024px;
  margin: auto;
  height: 100%;
  border-radius: 6px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #111111;

  .title {
    flex: 0;
    font-size: 18px;
    font-weight: bold;
    padding: 12px;
    color: #eeeeee;
  }

  .top {
    flex: 0;
    padding: 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & > * {
      margin-left: 12px;
      margin-bottom: 0;
    }
  }

  .content {
    flex: 1;
    width: 100%;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
