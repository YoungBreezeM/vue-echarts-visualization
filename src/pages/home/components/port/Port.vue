<template>
    <div class="port">
        <el-row>
            <el-col :span="5">
                <el-select v-model="defaultSelected" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.role"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="24">
                <el-upload class="uploadfile" action="" :http-request='uploadFileMethod' :show-file-list="true" multiple>
                    <el-button class="custom-btn" type="success">上传</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="files" style="width: 100%;" border>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="ID" width="120">
                    <template slot-scope="scope">{{ scope.$index+1 }}</template>
                </el-table-column>
                <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="number" label="文件名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="logTime" label="日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <i
                            class="el-icon-download down"
                            style="cursor: pointer;"
                    ></i>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="margin: 40px 0">
            <el-col :offset="8">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[10]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="10">
                </el-pagination>
            </el-col>
        </el-row>
        <footer style="text-align: center;font-size: 14px;">
            <div>
                <p class="thanks-info">
                    感谢Vue、Echarts、Element-ui、Vue-Route等技术支持
                </p>
                <p class="thanks-info">Copyright &copy;2015-2017 H-ui.admin v3.1 All Rights Reserved.</p>
            </div>
        </footer>
    </div>
</template>
<script>
    import "./port.scss";
    import {getAllRecordFile} from "../../../../api/port";
    import {fileUpload} from "../../../../api/uploadFile";

    export default {
        name: "port",
        data() {
            return {
                defaultSelected:1,
                options:[
                    {
                        value:0,
                        role:"老师信息"
                    },
                    {
                        value: 1,
                        role:"学生信息"
                    }
                ],
                files: [
                    // {
                    //     name: "17年3月份河南省电网数据",
                    //     time: new Date(),
                    //
                    // },
                    // {
                    //     name: "18年3月份河南省电网数据",
                    //     time: new Date(),
                    //
                    // }
                ],

                delDialog: false,
                operationIndex: 0,
                operationName: ""
            };
        },
        mounted(){
            this.loadingFiles();
        },
        methods: {
            uploadFileMethod(param) {
                let fileObject = param.file;

                fileUpload(fileObject,this.defaultSelected)
                    .then(data=>{
                        if(data){
                            this.loadingFiles();
                            alert("上传成功");
                        }
                    }).catch(err=>{
                        console.log(err)
                })

            },
            loadingFiles(){
              getAllRecordFile()
                  .then(data=>{
                      this.files = data.object
                  })
            },
            delOperation(index, name) {
                this.operationIndex = index;
                this.operationName = name;
                this.delDialog = true;
            },
            delTable() {


            },
            handleSizeChange(val) {

            },
            handleCurrentChange(val) {

            },
        }
    };
</script>
