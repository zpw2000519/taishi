<template>
    <div id="container" :style="{ height: '800px', width: '100%' }" />
    <div :style="styleObj" v-if="isShow" class="sel-wrap">
       <p @click="editNode">修改</p>
       <p @click="delNode">删除</p>
       <p @click="isShow = false">关闭</p>
    </div>
    
</template>

<script>
import { onMounted,toRefs, ref,reactive,computed} from 'vue';
import { ElMessage,ElMessageBox} from "element-plus";
import * as echarts from 'echarts/core';

import { TooltipComponent, LegendComponent } from 'echarts/components';
import { TreeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';



echarts.use([TooltipComponent, LegendComponent, TreeChart, CanvasRenderer]);

export default {
    name: "tree",
    setup() {
        const data = {
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

        const isShow = ref(false);
        const styleObj = reactive({
            left: "0px",
            top: "0px",
        });
        const myEcharts = () => {
            let myChart = echarts.init(document.getElementById('container'))
            myChart.showLoading();
            let option = {
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
                    data: [data],
                    top: '10%',
                    left: '17%',
                    bottom: '0%',
                    right: '65%',
                    //symbol: this.img, 
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
                    roam : true,
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
                    roam : true,
                    expandAndCollapse: true,
                    }
                ]
            }
            myChart.setOption((option));
            myChart.hideLoading();
            myChart.on('contextmenu',rightClick)
        };
       
        //右击事件
        const rightClick = (params)=>{ 
            console.log(params);
            let left = 250 + params.event.offsetX;
            let top = 100 + params.event.offsetY;
            styleObj.left = left + 'px';
            styleObj.top = top + 'px';
            isShow.value = true;
        };
        const delNode = ()=>{

        }
        const editNode = ()=>{
            isShow.value = false;
            ElMessageBox.prompt('Please input your e-mail', 'Tip', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator:  (value) =>{
                    if (!value) {
                    return '节点名称不能为空';
                    }
                 }
                 })
                .then(({ value }) => {
                  
                    // ElMessage({
                    //     type: 'success',
                    //     message: `Your email is:${value}`,
                    // })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Input canceled',
                    })
                })
        }
       
        onMounted(()=>{
            myEcharts();
        })
        return {
            isShow,
            styleObj,
            rightClick,
            myEcharts,
            editNode,
            delNode
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