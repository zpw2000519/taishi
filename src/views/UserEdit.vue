<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="NumberID" label="编号" align="center"></el-table-column>
                <el-table-column prop="UserName" label="姓名" align="center"></el-table-column>
                <el-table-column prop="DateofOpening" label="开户日期" align="center"></el-table-column>
                <el-table-column prop="UserPermissions" label="权限" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>


        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="add.visible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="姓名">
                    <el-input v-model="form.UserName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="个人信息">
                    <el-input v-model="form.info"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="add.visible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { UserData } from "../api/index";

export default {
    name: "table1",
    setup() {
        const query = reactive({
            NumberID: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            UserData(query).then((res) => {
                tableData.value = res.list;
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
            isNew:true
        });

        // 表格编辑/新增时弹窗和保存
        const editVisible = ref(false);
        const dialogTitle = ref("");
        let form = reactive({
            NumberID: "",
            UserName: "",
            DateofOpening: "",
            UserPermissions: "",
            sex:"",
            info:"",
            password:"",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            add.isNew = false;
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            // editVisible.value = true;
            add.visible=true;
            add.title = true;
        };
        const saveEdit = () => {
            if(add.isNew){
                // console.log(tableData.value)
                tableData.value.push(form);
            }else{
                editVisible.value = false;
                ElMessage.success(`修改第 ${idx + 1} 行成功`);
                Object.keys(form).forEach((item) => {
                    tableData.value[idx][item] = form[item];
                });
            }
            add.visible= false;
        };
        // 新建
        const handleAdd = () => {
            add.visible=true;
            add.isNew = true;
            Object.keys(form).forEach((item) => {
                form[item] = "";
            });
            //editVisible.value = true;
            add.title = "新建";
        };
        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            dialogTitle,
            form,
            add,
            // upload,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            handleAdd,
            // handleImport,
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
