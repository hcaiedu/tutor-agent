<template>
  <div style="width: 600px; height: 300px; margin: 0 auto;" ref="linechart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "LineChart",
  props: {
    // X 轴数据
    xData: {
      type: Array,
      default: () => [],
    },
    // Y 轴数据
    seriesData: {
      type: Array,
      default: () => [],
    },
    // X 轴名字
    xAxisName: {
      type: String,
      default: "",
    },
    // Y 轴名字
    yAxisName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chartInstance: null, // 保存 ECharts 实例
    };
  },
  watch: {
    // 监听 xData 和 yData 的变化，实时更新图表
    xData: "updateChart",
    yData: "updateChart",
  },
  methods: {
    initChart() {
      // 初始化 ECharts 实例
      this.chartInstance = echarts.init(this.$refs.linechart);
      this.updateChart(); // 设置初始数据
    },
    updateChart() {
      const colors = ["blue", "green", "red", "purple", "orange", "pink", "yellow"];
      const series = this.seriesData.map((line, index) => ({
        name: line.name,
        data: line.data,
        type: "line",
        smooth: true,
        lineStyle: {
          // color: index === 0 ? "blue" : index === 1 ? "green" : "red", 
          color: colors[index % colors.length], // 使用数组循环颜色
        },
      }));
      if (!this.chartInstance) return;
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.seriesData.map((line) => line.name), // 自动生成图例
        },
        xAxis: {
          type: "category",
          data: this.xData,
          name: this.xAxisName,
        },
        yAxis: {
          type: "value",
          name: this.yAxisName,
        },
        series
      };
      this.chartInstance.setOption(option);
    },
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.chartInstance.resize); // 响应式调整
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose(); // 销毁实例
    }
    window.removeEventListener("resize", this.chartInstance.resize);
  },
};
</script>

<style scoped>

</style>