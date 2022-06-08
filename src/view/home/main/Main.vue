<template>
  <div id="main">
    <div id="mainOne"></div>
    <div id="mainTwo"></div>
    <div id="mainThree"></div>
    <div id="Fourth">
      <div id="mainFourth"></div>
      <div class="all">
        <div class="item">应到人数：888</div>
        <div class="item">实到人数：876</div>
        <div class="item">请假人数：6</div>
        <div class="item">迟到人数：32</div>
        <div class="item">早退人数：23</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Main",
  data() {
    return {};
  },
  mounted() {
    this.drawOne();
    this.drawTwo();
    this.drawThree();
    this.drawFourth();
  },
  methods: {
    drawOne() {
      let myChartOne = echarts.init(document.getElementById("mainOne"));

      myChartOne.setOption({
        title: {
          text: "周出勤率",
        },
        tooltip: {},
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: [94, 99, 99, 85, 97, 95, 94],
          },
        ],
      });
    },
    drawTwo() {
      let myChartTwo = echarts.init(document.getElementById("mainTwo"));

      myChartTwo.setOption({
        title: {
          text: "各专业人数",
        },
        tooltip: {},
        xAxis: {
          data: ["研发", "平台", "运维", "UI"],
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: [86, 66, 87, 76],
          },
        ],
      });
    },
    drawThree() {
      let myChartThree = echarts.init(document.getElementById("mainThree"));

      myChartThree.setOption({
        title: {
          text: "出入情况",
        },
        xAxis: {
          data: ["一", "二", "三", "四", "五"],
        },
        yAxis: {},
        series: [
          {
            data: [15, 22, 28, 23, 19],
            type: "line",
            smooth: true,
          },
        ],
      });
    },
    drawFourth() {
      let myChartFourth = echarts.init(document.getElementById("mainFourth"));

      myChartFourth.setOption({
        title: {
          text: "在线率",
          left: "center",
          top: "center",
        },
        series: [
          {
            type: "pie",
            position: "top",
            distance: 30,
            data: [
              {
                value: 335,
                name: "离线",
              },
              {
                value: 1548,
                name: "在线",
              },
            ],
            radius: ["40%", "70%"],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
#main {
  display: flex;
  flex-wrap: wrap;
}
#mainOne {
  width: 500px;
  height: 300px;
  border: 2px solid #eee;
}
#mainTwo {
  width: 300px;
  height: 300px;
  border: 2px solid #eee;
}
#mainThree {
  width: 804px;
  height: 300px;
  border: 2px solid #eee;
}
#Fourth {
  position: absolute;
  top: 88px;
  right: 37px;
  width: 200px;
  height: 550px;
  border: 1px solid #eee;
  border-radius: 5px;
}
#mainFourth {
  position: relative;
  top: 10px;
  right: 5px;
  width: 200px;
  height: 200px;
}
.all {
  position: relative;
  right: -50px;
  top: 20px;
}
.item {
  padding: 10px;
}
</style>
