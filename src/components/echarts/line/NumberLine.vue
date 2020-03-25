<template>
  <div class="number-line-chart" :style="{ height: clientHeight }">
    <span>
      <i class="el-icon-arrow-right"></i
      ><span class="chart-title">我校各地区每天人数变化：</span>
    </span>
    <div id="number-line-container"></div>
  </div>
</template>

<script>
require("echarts/lib/chart/line");
require("echarts/lib/component/grid");
require("echarts/lib/component/legend");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/dataZoom");
require("echarts/lib/component/legendScroll");
import optionLineFun from "./optionLine.js";
import bus from "../../../bus/eventBus.js"
import optionPublicFun from "../../../utils/optionPublic.js";
import dataChina from "../../../json/outsideLine/dataChina";
import dataHeNan from "../../../json/outsideLine/dataHeNan";
import dataPingDingShan from "../../../json/outsideLine/dataPingdingshan";
const colors = [
  "#0000C6",
  "#009393",
  "#FF0000",
  "#01B468",
  "#2894FF",
  "#00FFFF",
  "#F0FFF0",
  "#79FF79",
  "#424200",
  "#844200",
  "#FFFF37",
  "#FF8F59"
];
export default {
  name: "number-line-chart",
  data() {
    return {
      data: null,
      title: null,
      myChart: {},
      clientHeight: "100%",
      defaultOption:{
        "河南":true,
        "平顶山市":true,
        "新华区":true
      },
      dates: ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7"],
      dataLine:{},
    };
  },
  mounted() {
    bus.$on("cityName", (cityName) => {
      //获取初始化数据
      let {data,sl} = this.initLineData({
        areaName:cityName,
        defaultOption:this.defaultOption
      });
      console.log(data,sl)
      //渲染数据
      this.lineCharts(data,sl);
      // legend发生变化事件
      this.myChart.on("legendselectchanged", (params)=>{
        this.limitChange(params,()=>{
           //如果参数过多，重新绚烂
          this.lineCharts(data,sl);
        })
      });

    });

  },
  methods: {
    lineCharts(data,sl) {//折线初始化
      let that = this;
      let opLineFnc = new optionLineFun();
      this.myChart = new optionPublicFun().init("number-line-container");
      let option = {
        tooltip: opLineFnc.lineTooltip("normal", 14, "人"),
        legend: opLineFnc.lineLegend(
          "normal",
          12,
          "horizontal",
          sl
        ),
        color: colors,
        grid: {
          bottom: "17%"
        },
        dataZoom: opLineFnc.lineDataZoom(20, 10),
        xAxis: opLineFnc.lineXaxis("normal", 12, that.dates, "日期"),
        yAxis: opLineFnc.lineYaxis("normal", 12, "人数"),
        series: data
      };
      console.log(sl)
      this.myChart.setOption(option,true);
    },
    initLineData({areaName,defaultOption}){//初始化折线图数据,向后台请求
       let data = {
         "china" : this.initData({
           data:dataChina,
           defaultOption:defaultOption
         }),
         "河南" : this.initData({
           data:dataHeNan,
           defaultOption:defaultOption
         }),
         "平顶山市": this.initData({
           data: dataPingDingShan,
           defaultOption: defaultOption
         })
       };
         return data[areaName];
    },
    initData({data,defaultOption}){
      let sl ={};
      data.map((value)=>{
        value.type = "line";
        value.stack = "总量";
        let {name} =value;
        sl[name] = !!defaultOption[name];
      });
      return {data,sl};
    },
    limitChange(params,callback){
      let stack = new optionPublicFun().getStack(params);
      if (stack === 4) {
        this.$message.warning({
          showClose: true,
          message: "糟糕，数据太多了，眼花缭乱的。请至多对三个地市进行比较"
        });
        callback();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.number-line-chart {
  width: 100%;
  height: 100%;
  #number-line-container {
    width: 100%;
    height: 90%;
  }
}
</style>
