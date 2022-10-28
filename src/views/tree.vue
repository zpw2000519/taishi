<template>
  <div>
    <div id="container" :style="{ height: '800px', width: '100%' }" />
  </div>
</template>

<script>
import * as echarts from 'echarts/core';

import { TooltipComponent, LegendComponent } from 'echarts/components';
import { TreeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, LegendComponent, TreeChart, CanvasRenderer]);

const data = {
  name: '',
  children: [
    {
      name: '',
      children: [
        {
          name: 'converters',
          value: 112,
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
var data2 = {
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

export default {
  data() {
    return {data,
            data2,
          }
  },
  mounted() {
    this.myEcharts();
  },
  methods: {
    myEcharts() {
      let myChart = echarts.init(document.getElementById('container'));
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
            borderColor: '#c23531',
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
              symbol: "src\views\test.png", 
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
      var model  = myChart.getModel().getSeriesByIndex(0);
      var info  = model.getData();
      var model2  = myChart.getModel().getSeriesByIndex(1);
      var info2  = model2.getData();
      console.log("info1",info)
      console.log("info2",info2)
      myChart.hideLoading();
    },
  }
}
      


</script>