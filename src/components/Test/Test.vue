<template>
    <div class="Test">
       <button @click="add">点击</button>
        <h1>{{count}}</h1>
        <h2>{{msg}}</h2>
    </div>
</template>

<script>
    import store from "../../store/store";
    import types from "../../store/types";
    export default {
        props: {
            msg:String
        },
        computed:{
            count(){
                console.log("count")
                return store.state.count;
            }
        },
        created(){
          console.log("created")
        },
        mounted(){
          console.log("mound")
        },
        methods:{
            add(){
                console.log("hello")
                store.commit(types.COUNT)
               console.log(store.state.count)
            }
        }
    };
</script>
