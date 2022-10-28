<template>
    <div id="container" ref="myChart" :style="{ height: '800px', width: '100%' }" />
    <div :style="styleObj" v-if="isShow" class="sel-wrap">
       <p @click="editNode">修改</p>
       <p @click="delNode">删除</p>
       <p @click="closeFn">关闭</p>
    </div>
    
</template>

<script>
import { onMounted,toRefs, ref,reactive,computed} from 'vue';
import { ElMessage,ElMessageBox} from "element-plus";
import * as echarts from 'echarts/core';

import { TooltipComponent, LegendComponent ,GridComponent} from 'echarts/components';
import { TreeChart ,LineChart,GraphChart} from 'echarts/charts';

import { CanvasRenderer } from 'echarts/renderers';

import { useStore } from "vuex";

echarts.use([TooltipComponent, LegendComponent, TreeChart, LineChart,GraphChart,CanvasRenderer,GridComponent]);

export default {
    name: "tree",
    setup() {
        const treeData = {
            name: '',
            children: [
                {
                name: '',
                children: [
                    {
                    name: 'converters',
                    value: 112
                    },
                    {
                    name: 'DataUtil',
                    value: 3322
                    }
                ]
                },
                {
                name: '',
                children: [
                    { name: 'DirtySprite', value: 8833 },
                    { name: 'LineSprite', value: 1732 },
                    { name: 'RectSprite', value: 3623 }
                ]
                },
                {
                name: '',
                children: [{ name: 'FlareVis', value: 4116 }]
                },
                {
                name: '',
                children: [
                    { name: 'AggregateExpression', value: 1616},
                    { name: 'And', value: 1027 },
                    { name: 'Arithmetic', value: 3891 },
                    { name: 'Average', value: 891 },
                    { name: 'BinaryExpression', value: 2893 },
                    { name: 'Comparison', value: 5103 },
                    { name: 'CompositeExpression', value: 3677 },
                ]
                },
                {
                name: '',
                children: [
                    { name: 'IScaleMap', value: 2105 },
                    { name: 'LinearScale', value: 1316 },
                    { name: 'LogScale', value: 3151 },
                    { name: 'OrdinalScale', value: 3770 },
                    { name: 'QuantileScale', value: 2435 },
                    { name: 'QuantitativeScale', value: 4839 },
                    { name: 'RootScale', value: 1756 },
                    { name: 'Scale', value: 4268 },
                    { name: 'ScaleType', value: 1821 },
                    { name: 'TimeScale', value: 5833 }
                ]
                }
            ]
            };
        const data2 = {
            name: '',
            children: [
                {
                name: '',
                children: [{ name: 'FlareVis', value: 4116 }]
                },
                {
                name: '',
                children: [
                    { name: 'IScaleMap', value: 2105 },
                    { name: 'LinearScale', value: 1316 },
                    { name: 'LogScale', value: 3151 },
                    { name: 'OrdinalScale', value: 3770 },
                    { name: 'QuantileScale', value: 2435 },
                    { name: 'QuantitativeScale', value: 4839 },
                    { name: 'RootScale', value: 1756 },
                    { name: 'Scale', value: 4268 },
                    { name: 'ScaleType', value: 1821 },
                    { name: 'TimeScale', value: 5833 }
                ]
                },
                {
                name: '',
                children: [{ name: 'DirtySprite', value: 8833 }]
                }
            ]
            };
        const option = {
                layout: 'orthogonal',
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                legend: {
                    top: '2%',
                    left: '3%',
                    orient: 'vertical',
                    data: [
                    {
                        name: 'tree1',
                        icon: 'rectangle'
                    },
                    {
                        name: 'tree2',
                        icon: 'rectangle'
                    }
                    ],
                    borderColor: '#c23531'
                },
                series: [
                    {
                    type: 'tree',
                    name: 'tree1',
                    data: [treeData],
                    top: '10%',
                    left: '17%',
                    bottom: '0%',
                    right: '65%',
                    // symbol: "C:\Users\zpw\Desktop\vue-manage-system-master1\src\views\test.png", 
                    symbolSize:[20,20],
                    orient: 'LR',
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right'
                    },
                    leaves: {
                        label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'descendant'
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                    roam : false,
                    },
                    {
                    type: 'tree',
                    name: 'tree2',
                    data: [data2],
                    top: '20%',
                    left: '60%',
                    bottom: '22%',
                    right: '18%',
                    symbolSize: 20,
                    orient: 'RL',
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right'
                    },
                    leaves: {
                        label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                        }
                    },
                    expandAndCollapse: true,
                    emphasis: {
                        focus: 'descendant'
                    },
                    animationDuration: 550,
                    animationDurationUpdate: 750,
                    roam : false,
                    expandAndCollapse: true,
                    },
                ]
        }
        const isShow = ref(false);
        const styleObj = reactive({
            left: "0px",
            top: "0px",
        });
        const myEcharts = () => {
            let myChart = echarts.init(document.getElementById('container'));
            changeData(treeData);
            resizeTree(myChart,treeData,treeData.id);
            changeData(data2);
            resizeTree(myChart,data2,data2.id);
            myChart.showLoading();
            
            myChart.setOption((option));
            myChart.hideLoading();
            myChart.on('contextmenu', rightClick);
            window.addEventListener('resize', () =>{
                myChart.resize();
            });
            myChart.on('click', (params)=> {
                isShow.value = false;
                // console.log(params)
                if (params.data.type == "add") {              
                        ElMessageBox.prompt('请输入节点名称', 'Tip', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            // inputValue:editParams.value.name,
                            inputValidator:  (value) =>{
                                if (!value) {
                                return '节点名称不能为空';
                                }
                            }
                        }).then(({ value }) => {
                            let myChart = echarts.init(document.getElementById('container'));
                            if(params.seriesName == 'tree1'){
                                addData(treeData, params.data.parentId, value);   
                                resizeTree(myChart,treeData,params.data.parentId)
                            }else{
                                addData(data2, params.data.parentId, value);   
                                resizeTree(myChart,data2,params.data.parentId)
                            }
                           
                        })
                        .catch(() => {})
                } else {
                    let myChart = echarts.init(document.getElementById('container'));
                    if(params.seriesName == 'tree1'){
                        resizeTree(myChart,treeData,params.data.id)
                    }else{
                        resizeTree(myChart,data2,params.data.id) 
                    }
                }       
            });
        };
        const editParams = reactive({})
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        //右击事件
        const rightClick = (params)=>{ 
            editParams.value = params;
            // console.log(params)
            let sideleft;
            console.log(collapse.value)
            if(collapse.value){
                sideleft = 75;
            }else{
                sideleft = 260;
            }
            if (params.data.type !== "add") {
                let left = sideleft + params.event.offsetX;
                let top = 100 + params.event.offsetY;
                styleObj.left = left + 'px';
                styleObj.top = top + 'px';
                isShow.value = true;
            }
        };
        const closeFn = ()=>{
            isShow.value = false;
        }
        const delNode = ()=>{
            isShow.value = false;
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
            .then(() => {
                let myChart = echarts.init(document.getElementById('container'));
                if(editParams.value.seriesName == 'tree1'){
                    delData(treeData, editParams.value.data.id);
                    resizeTree(myChart,treeData,editParams.value.data.parentId);
                }else{
                    delData(data2, editParams.value.data.id);
                    resizeTree(myChart,data2,editParams.value.data.parentId);
                }
               
            })
            .catch(() => { });
          
        }
        const editNode = ()=>{
            isShow.value = false;
            ElMessageBox.prompt('请输入节点名称', 'Tip', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue:editParams.value.name,
                inputValidator:  (value) =>{
                    if (!value) {
                    return '节点名称不能为空';
                    }
                 }
                 })
                .then(({ value }) => {
                    let myChart = echarts.init(document.getElementById('container'));
                    if(editParams.value.seriesName == 'tree1'){
                        let newTreeData = editData(treeData, editParams.value.data.id, value);
                        resizeTree(myChart,newTreeData,editParams.value.data.parentId);
                    }else{
                        let newTreeData = editData(data2, editParams.value.data.id, value);
                        resizeTree(myChart,newTreeData,editParams.value.data.parentId);
                    }
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Input canceled',
                    })
                })
        }
        const changeData = (data, id) => {    
            data.parentId = id;
            data.collapsed = true;
            var childrenArr = data.children;
            if (!id) {
                data.id = createId();
                data.children.push(addBtnObj(data.id))
            }
            for (var i = 0; i < childrenArr.length; i++) {
                childrenArr[i].id=createId();
                if (childrenArr[i].children) {
                    childrenArr[i].children.push(addBtnObj(childrenArr[i].id))
                    changeData(childrenArr[i], data.id);
                } else {
                    if (!childrenArr[i].type || childrenArr[i].type !== "add") {
                        childrenArr[i].id = createId();
                        childrenArr[i].parentId = data.id;
                        childrenArr[i].collapsed = true;
                        childrenArr[i].children = [];
                        childrenArr[i].children.push(addBtnObj(childrenArr[i].id))
                    }
                }
            }
        }
        const resetCollapsedTree = (data) => {
            data.collapsed = true;
            var childrenArr = data.children;
            for (var i = 0; i < childrenArr.length; i++) {
                if (childrenArr[i].children) {
                    resetCollapsedTree(childrenArr[i]);
                } else {
                    childrenArr[i].collapsed = true;
                }
            }
        }
        const collapsedTree = (data, id, totalData) => {
            var flag = true;
            var childrenArr = data.children;
            if (data.id == id) {
                data.collapsed = false;
            } else {
                for (var i = 0; i < childrenArr.length; i++) {
                    if (childrenArr[i].children) {
                        if (childrenArr[i].id == id) {
                            flag = false;
                            childrenArr[i].collapsed = false;
                            collapsedTree(totalData, childrenArr[i].parentId, totalData)
                        } else {
                            childrenArr[i].collapsed = true;
                        }
                        if (flag) {
                            collapsedTree(childrenArr[i], id, totalData)
                        }
                    } else {
                        if (childrenArr[i].id == id) {
                            childrenArr[i].collapsed = false;

                        } else {
                            childrenArr[i].collapsed = true;
                        }
                    }
                }
            }
        }
        const resizeTree = (myChart,treeData,id) =>{
            // console.log(treeData)
            resetCollapsedTree(treeData);
            collapsedTree(treeData, id, treeData);
            myChart.clear();
            myChart.setOption(option);
        }
        const addData = (data, id, name)=>{
            if (data.id == id) {
                data.children.pop();
                var temId = createId();
                data.children.push(addObj(name, temId, id), addBtnObj(id));
            } else {
                var childrenArr = data['children'];
                var flag = true;
                for (var i = 0; i < childrenArr.length; i++) {
                    if (childrenArr[i]['children']) {
                        if (childrenArr[i].id == id) {
                            console.log(childrenArr[i])
                            flag = false;
                            childrenArr[i].children.pop();
                            var temId = createId();
                            childrenArr[i].children.push(addObj(name, temId, id), addBtnObj(id));
                        }
                        if (flag) {
                            addData(childrenArr[i], id, name)
                        }
                    }
                }
            }
        }
        const editData = (data, id, name)=> {
            console.log(id);
            if (data.id == id) {
                data.name = name;
            } else {
                var childrenArr = data['children'];
                var flag = true;
                for (var i = 0; i < childrenArr.length; i++) {
                    if (childrenArr[i]['children']) {
                        if (childrenArr[i].id == id) {
                            flag = false;
                            childrenArr[i].name = name;
                        }
                        if (flag) {
                            editData(childrenArr[i], id, name)
                        }
                    }
                }
            }
            // console.log(data);
            return data
        }
        const delData = (data, id) =>{
            if (data.id == id) {
                ElMessage.error("最初级不能删除！");
            } else {
                var childrenArr = data['children'];
                var flag = true;
                for (var i = 0; i < childrenArr.length; i++) {
                    if (childrenArr[i].id == id) {
                        flag = false;
                        childrenArr.splice(i, 1);;
                    }
                    if (flag && childrenArr[i]['children']) {
                        delData(childrenArr[i], id)
                    }
                }
            }

        }
        const addBtnObj = (id) => {
            return {
                "name": "add",
                "type": 'add',
                "parentId": id,
                'collapsed': true,
                'itemStyle': {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0, color: '#FFBFA7' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#FF794B' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    borderRadius: 0,
                    borderColor: '#FF794B'
                },
            }
        }
        const addObj = (name, id, pid) => {
            return {
                "name": name,
                'id': id,
                "parentId": pid,
                'collapsed': true,
                'children': [addBtnObj(id)]
            }
        }
        const createId = () => {
            var e = (new Date).getTime()
                , t = (Math.random().toString(16) + "000000000").substr(2, 8)
                , n = e + t;
            return n;
        }
        onMounted(()=>{
            myEcharts();
        })
        return {
            // myChart,
            collapse,
            changeData,
            resetCollapsedTree,
            collapsedTree,
            resizeTree,
            addObj,
            addBtnObj,
            createId,
            editData,
            delData,
            isShow,
            styleObj,
            rightClick,
            myEcharts,
            editNode,
            delNode,
            closeFn
        };
    },
};
</script>
<style scoped>
    .sel-wrap{
      position: fixed;
      z-index: 100;
      border: 1px solid #ccc;
      background: #fff;
      
    }
    .sel-wrap p{
        padding: 5px 20px;
        cursor: pointer;
    }
    .sel-wrap p:hover{
        background: rgb(32, 160, 255);
    }
  </style>