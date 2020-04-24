<template>
    <div class="report"
         :style="{
       width:clientView.clientWidth,
       height:clientView.clientHeight,
    }"
    >
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name:"report",
        data() {
            return {
                count: 0,
                isLoading: false,
                clientView:{
                    clientWidth: "100%",
                    clientHeight: ""
                }
            };
        },
        mounted(){
            this.initClientView();
            this.autoClientView();
        },
        methods:{
            initClientView() {
                //初始化客户端高度
                this.clientView.clientHeight = document.documentElement.clientHeight + "px";
            },
            autoClientView() {
                //监听客户端视图变化
                window.onresize = () => {
                    this.initClientView();
                }
            },

        }
    };
</script>
