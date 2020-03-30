<template>
    <div id="show">
        <!--主体-->
        <div class="main clearfix">
            <div class="show-view left" v-if="!isHidden">
                <!-- 天气模块 -->
                <div class="border-container show-weather">
                    <Weather></Weather>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <div class="border-container show-person-num">
                    <span class="switch-view el-icon-full-screen" @click="switchView('isOutLine')" ></span>
                    <!-- 全校师生分布地图模块 -->
                    <EcLine :render-data="renderCenter.isOutLine"></EcLine>
                    <!--          <OuterPerson></OuterPerson>-->
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <!-- 地区人数折线模块 -->
                <div class="border-container show-line">
                    <span class="switch-view el-icon-full-screen" @click="switchView('populationNum')"></span>
                    <EcLine :render-data="renderCenter.populationNum"></EcLine>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
            <div class="show-view center" v-if="!isHidden">
                <div class="border-container show-map">
                    <EcMap :render-data="renderCenter.mapData"
                           v-on:mapSwitch="mapSwitch"
                    ></EcMap>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
            <div class="show-view right" v-if="!isHidden">
                <!-- 今日体温测量表格 -->
                <div class="border-container show-table">
                    <TodayTempTable></TodayTempTable>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <!-- 体温正/异常人数折线模块 -->
                <div class="border-container show-radio">
                    <EcLine :render-data="renderCenter.isNormalLine"
                            v-on:lineClick = "lineClick"
                    ></EcLine>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
                <!-- 录入情况饼图模块 -->
                <div class="border-container show-input">
                    <span class="switch-view el-icon-full-screen" @click="switchView('isInput')"></span>
                    <EcPie :render-data="renderCenter.isInput" v-on:pieSwitch="pieSwitch"></EcPie>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
            <div class="show-view open-view" v-if="isHidden">
                <!-- 切换视图放大 -->
                <div class="border-container show-table" style="height: 51rem">
                    <span class="switch-view el-icon-full-screen" @click="switchView()"></span>
                    <EcLine :render-data="renderCenter.populationNum"
                            v-if="openView.populationNum"></EcLine>
                    <EcLine :render-data="renderCenter.isOutLine"
                            v-if="openView.isOutLine"></EcLine>
                    <EcPie :render-data="renderCenter.isInput"
                           v-if="openView.isInput"
                           v-on:pieSwitch="pieSwitch"
                    ></EcPie>
                    <span class="top-left border-span"></span>
                    <span class="top-right border-span"></span>
                    <span class="bottom-left border-span"></span>
                    <span class="bottom-right border-span"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "../css/graph-index.scss"
    //数据源
    import isOutLine from "../../../json/LineJson/isOutLine";
    import isNormalLine from "../../../json/LineJson/isNormalLine";
    import dataByChina from "../../../json/map/dataByChina";
    import populationNum_PDS from "../../../json/LineJson/populationNum_PDS";
    import populationNum_China from "../../../json/LineJson/populationNum_China";
    import populationNum_HeNan from "../../../json/LineJson/populationNum_HeNan";
    import grading from "../../../json/PieJson/grading";
    //组件
    let EcMap =()=> import("../../../components/echarts/EcMap/EcMap");
    let EcLine = ()=>import("../../../components/echarts/EcLine/EcLine");
    let TodayTempTable = () => import("../components/todayTempTable/TodayTempTable");
    let Weather = () => import("../../../components/echarts/weather/Weather.vue");
    let EcPie =()=> import("../../../components/echarts/EcPie/EcPie");
    export default {
        name: "show",
        data() {
            return {
                isHidden:false,
                openView:{
                    "populationNum":false,
                    "isOutLine":false,
                    "isInput":false
                },
                renderCenter:{
                    isOutLine,//是否外出
                    isNormalLine,//温度是否正常
                    mapData:dataByChina,//人口分布情况
                    populationNum:populationNum_China,//人口流入流出情况
                    isInput:grading[0]
                }
            }
        },
        components: {
            EcMap,
            TodayTempTable,
            Weather,
            EcLine,
            EcPie
        },
        methods: {
            switchView(view) {//切换图形视图
               this.isHidden = !this.isHidden;
               if(view){
                   this.openView[view] = !this.openView[view];
               }else {
                   for (let i in this.openView){
                       this.openView[i] = false;
                   }
               }

            },
            mapSwitch(msg){//接收地图切换信息
                console.log(msg)
                let pc = {
                    "china":populationNum_China,
                    "河南":populationNum_HeNan,
                    "平顶山市":populationNum_PDS
                };
                this.renderCenter.populationNum = pc[msg];
                console.log(this.populationNum)
            },
            pieSwitch(msg){
                //切换Pie
                if(grading[msg.data.grade+1]){
                    this.renderCenter.isInput = grading[msg.data.grade+1]
                }else {
                    this.$router.push({
                        path:"/graph/unInputTable/"
                    })
                }

            },
            lineClick(parmas){
                console.log(parmas)
                //获取折线图点击参数
                let path = {
                    "正常":"/graph/tempTable/"+parmas.name,
                    "不正常":"/graph/tempTable/"+parmas.name
                };
                if(path[parmas.seriesName]){
                    this.$router.push({path:path[parmas.seriesName]})
                }else {
                    throw new Error("please config in lineClick() in path add Map")
                }
            }

        }
    };
</script>

<style lang="scss">


</style>
