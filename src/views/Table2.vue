<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 数据项管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <span class="search-text" style="padding-right: 1%;">数据源名称:</span>
                <el-input v-model="query.nameofsource" placeholder="数据源名称" class="handle-input mr20"></el-input>
                <span class="search-text" style="padding-left:1%"> 仓库名称:</span>
                <el-input v-model="query.nameofstore" placeholder="仓库名称" class="handle-input mr20"></el-input>
                <span class="search-text" style="padding-left:1%"> 数据项名称:</span>
                <el-input v-model="query.nameofdata" placeholder="数据项名称" class="handle-input mr20"></el-input>
                
                <p align="right" style="padding-top:1%"><el-button type="primary" icon="el-icon-search"   @click="handleSearch" margin="">检索</el-button>
                <el-button type="primary" icon="el-icon-add" @click="handleAdd">新建</el-button>
                <el-button type="primary" icon="" @click="handleUpload">导入</el-button>
                <el-button type="primary" icon="" @click="handleDownload">导出</el-button></p>
                
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="nameofdata" label="数据项名称" align="center"></el-table-column>
                <el-table-column prop="nameofstore" label="仓库名称" align="center"></el-table-column>
                <el-table-column prop="nameofsource" label="数据源"  align="center"></el-table-column>
                <el-table-column prop="detials" label="描述" align="center"></el-table-column>
                <el-table-column prop="yn" label="跟踪监控" align="center"></el-table-column>
                    <!-- <template #default="scope">
                        <el-button type="checkbox">是</el-button>
                        <el-button type="checkbox"  @click="handleEdit(scope.$index, scope.row)">否</el-button>
                    </template> -->
                <!-- </el-table-column> -->
                <el-table-column prop="way" label="监控方式与范围" align="center"></el-table-column>
               
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="选择" v-model="editVisible" width="50%">
            <el-form label-width="120px">
                <el-form-item label="数据源">
                    <el-input v-model="form.nameofsource"></el-input>
                </el-form-item>
                <el-form-item label="数据项名称">
                    <el-input v-model="form.nameofdata"></el-input>
                </el-form-item>
                <el-form-item label="仓库名称">
                    <el-input v-model="form.nameofstore"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.detials"></el-input>
                </el-form-item>
                <el-form-item label="跟踪监控">
                    <el-input v-model="form.yn"></el-input>
                </el-form-item>
                <el-form-item label="监控方式与范围">
                    <el-input v-model="form.way"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 用户导入对话框
        <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body>
            <el-upload ref="uploadRef" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                <el-icon class="el-icon--upload">
                    <upload-filled />
                </el-icon>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <template #tip>
                    <div class="el-upload__tip text-center">
                        <div class="el-upload__tip">
                            <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
                        </div>
                        <span>仅允许导入xls、xlsx格式文件。</span>
                        <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
                            @click="importTemplate">下载模板</el-link>
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitFileForm">确 定</el-button>
                    <el-button @click="upload.open = false">取 消</el-button>
                </div>
            </template>
        </el-dialog> -->
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Table2Data } from "../api/index";

export default {
    name: "table2",
    setup() {
        const query = reactive({
            nameofsource: "",
            nameofstore: "",
            nameofdata:"",
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            Table2Data(query).then((res) => {
                tableData.value = res.list;
                pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    tableData.value.splice(index, 1);
                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            nameofsource: "",
            nameofdata: "",
            nameofstore:"",
            detials:"",
            yn:"",
            way:""
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;
            ElMessage.success(`修改第 ${idx + 1} 行成功`);
            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
            });
        };

         // /*** 用户导入参数 */
         const upload = reactive({
            // 是否显示弹出层（用户导入）
            open: false,
            // 弹出层标题（用户导入）
            title: "",
            // 是否禁用上传
            isUploading: false,
            // 是否更新已经存在的用户数据
            updateSupport: 0,
            // 设置上传的请求头部
            //headers: { Authorization: "Bearer " + getToken() },
            headers: {},
            // 上传的地址
            url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData"
        });

        // /** 导入按钮操作 */
        const handleUpload = () => {
            upload.title = "用户导入";
            upload.open = true;
        };
        
        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            handleUpload,
        };
    },
};

</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
