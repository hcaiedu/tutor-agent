<template>
  <div>
    <div ref="chart" style="width: 500px; height: 500px; margin: 0 auto;"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Radar",
  props: {
    // 传入雷达图配置和数据
    chartData: {
      type: Array,
      required: true,
    },
    indicator: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null, // 存储 ECharts 实例
    };
  },
  watch: {
    // 监听数据变化，动态更新图表
    chartData: {
      deep: true,
      handler() {
        this.updateChart();
      },
    },
    indicator: {
      deep: true,
      handler() {
        this.updateChart();
      },
    },
  },
  mounted() {
    this.initChart(); // 初始化图表
  },
  methods: {
    // 初始化图表
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.updateChart();
      window.addEventListener("resize", this.chart.resize);
    },
    // 更新图表数据
    updateChart() {
      if (!this.chart) return;
      const option = {
        tooltip: {
          show: true,
          trigger: "item",
        },
        radar: {
          indicator: this.indicator,
          radius: "80%", // 控制雷达图大小
          shape: "polygon", // 默认是多边形,
          axisName: {
            // 标签文字样式
            color: '#000', // 文字颜色
            fontSize: 14, // 字体大小
            fontWeight: 'bold', // 字重
            // borderRadius: 3, // 背景圆角
            // padding: [3, 5], // 内边距 [垂直, 水平]
            rich: {
                // 使用富文本
                emphasis: {
                    color: 'red',
                    fontSize: 16,
                    fontWeight: 'bolder'
                }
            }
          }
        },
        series: [
          {
            type: "radar",
            data: this.chartData,
            itemStyle: {
              borderColor: '#1B5E20ba',  // 设置线条颜色
              color: '#1B5E20ba',  // 设置点的颜色
            },
            areaStyle: {
              color: '#1B5E20ba',  // 设置区域填充颜色
            }
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    // 销毁 ECharts 实例
    if (this.chart) {
      window.removeEventListener("resize", this.chart.resize);
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
/* 这里可以根据需要自定义样式 */
</style>