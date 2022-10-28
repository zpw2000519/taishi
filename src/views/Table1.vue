<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 数据源管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <p class="search-text">数据源名:</p>
                <el-input v-model="query.datasource" placeholder="数据源名" class="handle-input mr20"></el-input>
                <p class="search-text">创建人:</p>
                <el-input v-model="query.personofopen" placeholder="创建人" class="handle-input mr20"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>
                <el-button type="primary" icon="el-icon-add" @click="handleAdd">新建</el-button>
                <el-button type="primary" icon="" @click="handleUpload">导入</el-button>
                <el-button type="primary" icon="" @click="handleDownload">导出</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="datasource" label="数据源名" align="center"></el-table-column>
                <el-table-column prop="personofopen" label="创建人" align="center"></el-table-column>
                <el-table-column prop="dateofopen" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="detials" label="描述" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <!-- <router-link to="/tree add">
                            <el-button type="text" icon="el-icon-search">查看</el-button>
                        </router-link> -->
                        <router-view>
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                            <el-button type="text" icon="el-icon-search" >查看</el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item  command="tree add">确定跳转</el-dropdown-item>
                                    <el-dropdown-item  command="table1">取消</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        </router-view>
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
        <el-dialog :title="add.title" v-model="add.visible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="数据源名">
                    <el-input v-model="form.datasource"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="form.personofopen"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input v-model="form.dateofopen"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.detials"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="add.visible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 用户导入对话框 -->
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
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Table1Data } from "../api/index";
import { useRouter } from "vue-router";
export default {
    name: "table1",
    setup() {
        const query = reactive({
            datasource: "",
            personofopen: "",
            pageIndex: 1, //当前页数
            pageSize: 2  //每页几条
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            Table1Data(query).then((res) => {
                tableData.value = res.list;
                console.log(res)
                pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();


        // 检索
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
                .catch(() => { });
        };


        const add = reactive({
            title: false,
            visible: false,
            isNew: true
        });

        // 表格编辑/新增时弹窗和保存
        let form = reactive({
            datasource: "",
            personofopen: "",
            dateofopen: "",
            detials: "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            add.isNew = false;
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            add.visible = true;
            add.title = "编辑";
        };
        const saveEdit = () => {
            if (add.isNew) {
                // console.log(tableData.value)
                tableData.value.push(form);
                ElMessage.success(`新建成功`);
            } else {
                add.visible = false;
                ElMessage.success(`修改第 ${idx + 1} 行成功`);
                Object.keys(form).forEach((item) => {
                    tableData.value[idx][item] = form[item];
                });
            }
            add.visible = false;

        };
        // 新建
        const handleAdd = () => {
            add.visible = true;
            add.isNew = true;
            Object.keys(form).forEach((item) => {
                form[item] = "";
            });
            add.title = "新建";
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
        const router = useRouter();
        const handleCommand = (command) => {
            if (command == "tree add") {
                
                // router.push("/tree add");
                router.push("/tree")
            } else if (command == "table1") {
                router.push("/table1");
            }
        };
        return {
            query,
            tableData,
            pageTotal,
            form,
            add,
            upload,
            handleSearch,
            handleAdd,
            handleUpload,
            // handleDownload,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            handleCommand,
            // importTemplate,
            // handleFileUploadProgress,
            // handleFileSuccess,
            // submitFileForm
        };
    },
};
</script>

<style scoped>
.search-text {
    display: inline-block;
    margin-right: 10px;
}

.handle-box {
    margin-bottom: 20px;
}


.handle-input {
    width: 200px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr20 {
    margin-right: 20px;
}
</style>
