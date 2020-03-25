<template>
    <div class="EcMap" :style="{ height: clientHeight }">
        <i class="el-icon-arrow-right"></i>
        <span class="chart-title">全校师生各地区分布情况</span>
        <span class="el-icon-back toBack" @click="callBack" title="返回上级">
        </span>
        <div id="myMap" ref="myMap"></div>
    </div>
</template>

<script>
    let mapStack =[];
    import "../../../../public/static/css/gol.scss"
    import echarts from "../../../lib/InitEcharts";
    import areaMap from "../../../json/area-map";
    import dataHeNan from "../../../json/map/dataHeNan";
    import dataPDSMap from "../../../json/map/dataPingdingshan";
    import "./_EcMap.scss"
    import optionMap from "./option";
    import MapJson from "../../../api/MapJson";
    export default {
        props: {
            renderData:Array
        },
        data(){
            return{
                clientHeight:"100%",
                defaultMap:100000,
            }
        },
        mounted() {
            this.draw({
                mapId:this.defaultMap,
                mapName:"china",
                renderData:this.renderData
            }).then((myChart)=>{
                myChart.on("click",(params)=>{
                    this.nextClick(params)
                })
            })
        },
        methods:{
           async draw({mapId,mapName,renderData,isState=true}){
               //画出图形
                let Map = await MapJson.getMapJson(mapId);
                if(isState){
                    this.stateBefore({
                        mapId:mapId,
                        mapName:mapName,
                        renderData:renderData
                    })
                }
                return this.initMap({
                    mapName:mapName,
                    Map:Map,
                    renderData:renderData
                })

            },
            async initMap({mapName,Map,renderData}){
               //初始化图形
                echarts.registerMap(mapName, Map);
                let myChart = echarts.init(this.$refs.myMap);
                let newOption = Object.assign(optionMap);
                newOption.series[0].data = renderData;
                newOption.geo.map = mapName;
                //地图范围跟新
                this.$emit("mapSwitch",mapName);
                newOption.tooltip.formatter = function(e){
                    return e.name + "<br />" + "学生总人数：" +
                           e.data.student + "<br/>" + "教师总人数：" +
                           e.data.teacher + "<br/>" + "总人数：" + e.value;
                };
                myChart.setOption(newOption);
                return myChart;
            },
            stateBefore({mapId,mapName,renderData}){
                //往mapStack里添加parentId，parentName,返回上一级使用
                mapStack.push({
                    mapId: mapId,
                    mapName: mapName,
                    renderData: renderData
                });
            },
            nextClick(params) {
                //点击跳转下一个
                let mapId = areaMap[params.name];
                let infoJson = {
                    "河南": dataHeNan,
                    "平顶山市":dataPDSMap
                };
                console.log(mapId);
                if(infoJson[params.name]===undefined){
                    alert("数据尚未录入,请录入数据")
                    return;
                }
                this.draw({
                    mapId:mapId,
                    mapName:params.name,
                    renderData:infoJson[params.name]
                })
            },
            callBack() {
               //返回上一级
                if (mapStack.length > 1) {
                    mapStack.pop();
                    let {mapId, mapName,renderData} = mapStack[mapStack.length - 1];
                    console.log(mapStack)
                    this.draw({
                        mapId:mapId,
                        mapName:mapName,
                        renderData:renderData,
                        isState:false
                    })
                }

            },
        },
        watch:{
            renderData(params){
                this.renderData = params;
            }
        }

    };

</script>
