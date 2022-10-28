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
  import { GridComponent } from 'echarts/components'
  import { LineChart } from 'echarts/charts';
  echarts.use([TooltipComponent, LegendComponent, TreeChart, CanvasRenderer]);
  
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
      return {
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
            tooltip: {
              show:true,
              trigger: 'item',
            },
            legend: {
              show:true,
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                // data: [300, 600, 900, 1200, 1500, 1900],
                boundaryGap: [0, '30%']
            },
            series:[
                {
                    name:"折线图",
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                },
                {
                    name:"折线图2",
                    data: [620, 654, 500, 800, 900, 1000, 1100],
                    type: 'line',
                    itemStyle:{//随机颜色
                        color:"rgba("+ Math.floor(Math.random()*256) + ',' +  Math.floor(Math.random()*256) + ',' +Math.floor(Math.random()*256) + ',' +  (Math.random()*10).toFixed(1) +')'
                    }
                }
            ]
        }
        
        myChart.setOption((option))
        myChart.hideLoading();
        // 给整个画布添加点击事件
        myChart.getZr().on('click', function (param) {
        const pointInPixel = [param.offsetX, param.offsetY]
        console.log('pointInPixel', pointInPixel)
        // 使用 convertFromPixel方法 转换像素坐标值到逻辑坐标系上的点。获取点击位置对应的x轴数据的索引         值，借助于索引值的获取到其它的信息
        // 转换X轴坐标
        let pointInGrid = myChart.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
        // 转换Y轴坐标
        let pointInGrid2 = myChart.convertFromPixel({ seriesIndex: 1 }, pointInPixel);
        // x轴数据的索引值
        console.log('pointInGrid', pointInGrid2)
        // 所点击点的X轴坐标点所在X轴data的下标
        let xIndex = pointInGrid[0];
        // 所点击点的Y轴坐标点数值
        let yIndex = pointInGrid2[1];
        // 使用getOption() 获取图表的option
        let op = myChart.getOption();
        //获取到x轴的索引值和option之后，我们就可以获取我们需要的任意数据。
        // 点击点的X轴对应坐标的名称
        var time = op.xAxis[0].data[xIndex];
        // 点击点的series -- data对应的值
        var value = op.series[0].data[xIndex];
        console.log('val', time)
        });
      },
      
    }
  }
        
  
  
  </script>