<template>
    <div class="Ec-Line" :style="{ height: clientHeight }">
        <div class="index-menu">
            <i class="el-icon-arrow-right"></i>
            <span class="chart-title">{{renderData.title}}</span>
            <el-cascader
                    v-model="renderData.defaultSelected"
                    :options="renderData.selectedOption"
                    size="small"
                    class="cascader-style"
            >
            </el-cascader>
        </div>
        <div id="myLine" ref="myLine"></div>
    </div>
</template>

<script>
    import "./_EcLine.scss";
    import "../../../../public/static/css/gol.scss"
    import echarts from "../../../lib/InitEcharts";
    import optionLine from "./option";
    import core from "../../../utils/core";

    export default {
        name: "EcLine",
        data() {
            return {
                clientHeight: "100%",
            }
        },
        props: {
            renderData: Object
        },
        mounted() {
            if (this.renderData) {
                this.draw(this.renderData);
            }

        },
        methods: {
            draw(renderData) {
                //初始化图例
                const myChart = echarts.init(this.$refs.myLine);
                let newRenderDate = core.synthetic(renderData, optionLine);
                // console.log(newRenderDate)
                myChart.setOption(newRenderDate, true);

                //监听可以选择项
                this.limitChange(myChart);


            },
            limitChange(myChart) {
                myChart.on("legendselectchanged", (params) => {
                    let count = 0;
                    for (let key in params.selected) {
                        if (params.selected[key]) {
                           count++;
                        }
                    }

                    if(count>3){
                        //如果待选项超过3个,重新渲染
                        count = 0;
                        this.$message.warning({
                            showClose: true,
                            message: "糟糕，数据太多了，眼花缭乱的。请至多对三个地市进行比较"
                        });
                        this.draw(this.renderData)
                    }
                });
            }

        },
        watch: {
            renderData(params) {
                console.log(params)
                this.draw(params)
            }
        }
    };
</script>
