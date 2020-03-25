<template>
    <div class="map-chart" :style="{ height: clientHeight }">
        <div class="box">
            <span>
                <i class="el-icon-arrow-right"></i>
                <span class="chart-title">{{ title }}师生人口分布：</span>
            </span>
            <span class="el-icon-back toBack" @click="back()" title="返回上级">
            </span>
            <div id="map-container" class="chart"></div>
        </div>
    </div>
</template>

<script>
    require("echarts/lib/chart/map");
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/visualMap");
    import Http from "../../../Http/http";
    import echarts from "echarts";
    import optionMapFun from "./optionMap.js";
    import eventBus from "../../../bus/eventBus";
    import areaMap from "../../../json/area-map";
    import optionPublicFun from "../../../utils/optionPublic.js";
    import dataByChina from "../../../json/map/dataByChina";
    import dataHeNan from "../../../json/map/dataHeNan";
    import dataPingdingshan from "../../../json/map/dataPingdingshan";
    //记录父级ID、Name
    let mapStack = [];
    export default {
        name: "map-chart",
        data() {
            return {
                clientHeight: "100%",
                myChart: {},
                title: null,
                id: "100000",
                name: "china",
                jsonData: null,
                cityName: "china",
                dataPingDingShan: dataPingdingshan,
                dataHeNan: dataHeNan,
                dataChina: dataByChina,
                data: null
            };
        },
        created() {
            this.$nextTick(() => {
                this.title = "全国各省";
                this.name = this.$route.params.name;
                this.myChart = new optionPublicFun().init("map-container");
                this.myChart.on('click', params => {
                    console.log(params)
                    this.nextClick(params)
                });
                this.initMap({
                    infoJson: this.dataChina,
                    areaId: this.id,
                    areaName: this.cityName
                });
            });
        },
        methods: {
            async getMap(mid) {//获取地图json
                return Http({
                    method: "get",
                    url: "/static/json/" + mid + ".json"
                });
            },
            renderMap({id, name, mapJson, infoJson, flag}) {//渲染地图
                registerAndsetOption(
                    this.myChart,
                    id,
                    name,
                    mapJson,
                    infoJson,
                    flag
                );
            },
            initMap({infoJson, areaId, areaName, flag = true}) {//初始化地图各部分信息
                this.getMap(areaId)
                    .then(mapJson => {
                        console.log(mapJson)
                        this.renderMap({
                            id: areaId,
                            name: areaName,
                            mapJson: mapJson,
                            infoJson: infoJson,
                            flag
                        });
                        ev.$emit("cityName", areaName);
                    })
            },
            back() {//返回上一级
                if (mapStack.length > 1) {
                    mapStack.pop();
                    let {mapId, mapName, infoJson} = mapStack[mapStack.length - 1];
                    this.initMap({
                        infoJson: infoJson,
                        areaId: mapId,
                        areaName: mapName,
                        flag: false
                    })
                }

            },
            nextClick(params) {//点击跳转下一个
                let areaId = areaMap[params.name];
                let infoJson = {
                    "河南": this.dataHeNan,
                    "平顶山市": this.dataPingDingShan
                };
                // console.log(infoJson[params.name])
                if(infoJson[params.name]===undefined){
                    alert("数据尚未录入,请录入数据")
                    return;
                }
                this.initMap({
                    infoJson: infoJson[params.name],
                    areaId: areaId,
                    areaName: params.name
                });
            }
        },
    };

    /**
     *
     * @param {*} myChart
     * @param {*} id        省市县Id
     * @param {*} name      省市县名称
     * @param {*} mapJson   地图Json数据
     * @param {*} infoJson  地图各部分信息
     * @param {*} flag      是否往mapStack里添加parentId，parentName
     */
    function registerAndsetOption(myChart, id, name, mapJson, infoJson, flag) {
        echarts.registerMap(name, mapJson);
        console.log("map-container", name);
        myChart.setOption({
            tooltip: new optionMapFun().mapTooltip(),
            visualMap: new optionMapFun().mapVisualMap(),
            geo: new optionMapFun().mapGeo(name),
            series: new optionMapFun().mapSeries(infoJson)
        });
        if (flag) {
            //往mapStack里添加parentId，parentName,返回上一级使用
            mapStack.push({
                mapId: id,
                mapName: name,
                infoJson: infoJson
            });
        }
    }
</script>

<style scoped lang="scss">
    .map-chart {
        .box {
            width: 100%;
            height: 90%;
        }

        .chart {
            position: relative;
            height: 100%;
            top: 10%;
        }

        .backBtn {

            background-color: #00c298;
            border: 0;
            color: #fff;
            height: 27px;
            font-family: Microsoft Yahei;
            font-size: 1em;
            cursor: pointer;
            border-radius: 5px;

        }
        .toBack{
            position: absolute;
            z-index: 99;
            top: 8%;
            left: 2%;
            color:white;
            background:#00c298;
            padding:5px;
            border-radius: 3px;
            cursor:pointer
        }

        #map-container {
            width: 100%;
            height: 95%;
        }
    }
</style>
