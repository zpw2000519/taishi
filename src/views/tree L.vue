<template>
  <div>
    <div id="container" :style="{ height: '500px', width: '100%' }" />
  </div>
</template>
<script>

import * as echarts from 'echarts';

const data = {
  name: 'flare',
  children: [
    {
      name: 'data',
      children: [
        {
          name: 'converters',
          children: [
            { name: 'Converters', value: 721 },
            { name: 'DelimitedTextConverter', value: 4294 }
          ]
        },
        {
          name: 'DataUtil',
          value: 3322
        }
      ]
    },
    {
      name: 'display',
      children: [
        { name: 'DirtySprite', value: 8833 },
        { name: 'LineSprite', value: 1732 },
        { name: 'RectSprite', value: 3623 }
      ]
    },
    {
      name: 'flex',
      children: [{ name: 'FlareVis', value: 4116 }]
    },
    {
      name: 'query',
      children: [
        { name: 'AggregateExpression', value: 1616 },
        { name: 'And', value: 1027 },
        { name: 'Arithmetic', value: 3891 },
        { name: 'Average', value: 891 },
        { name: 'BinaryExpression', value: 2893 },
        { name: 'Comparison', value: 5103 },
        { name: 'CompositeExpression', value: 3677 },
        { name: 'Count', value: 781 },
        { name: 'DateUtil', value: 4141 },
        { name: 'Distinct', value: 933 },
        { name: 'Expression', value: 5130 },
        { name: 'ExpressionIterator', value: 3617 },
        { name: 'Fn', value: 3240 },
        { name: 'If', value: 2732 },
        { name: 'IsA', value: 2039 },
        { name: 'Literal', value: 1214 },
        { name: 'Match', value: 3748 },
        { name: 'Maximum', value: 843 },
        { name: 'Minimum', value: 843 },
        { name: 'Not', value: 1554 },
        { name: 'Or', value: 970 },
        { name: 'Query', value: 13896 },
        { name: 'Range', value: 1594 },
        { name: 'StringUtil', value: 4130 },
        { name: 'Sum', value: 791 },
        { name: 'Variable', value: 1124 },
        { name: 'Variance', value: 1876 },
        { name: 'Xor', value: 1101 }
      ]
    },
    {
      name: 'scale',
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
  name: 'flare',
  children: [
    {
      name: 'flex',
      children: [{ name: 'FlareVis', value: 4116 }]
    },
    {
      name: 'scale',
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
      name: 'display',
      children: [{ name: 'DirtySprite', value: 8833 }]
    }
  ]
};

var data5 = [
        {
          name: 'Node 1',
          x: 300,
          y: 300,
          fixed: true
        },
        {
          name: 'Node 2',
          x: 800,
          y: 300,
          fixed: true
        },
        {
          name: 'Node 3',
          x: 550,
          y: 100,
          fixed: true
        }
      ];
var linkdata = [
  {
    source: 0,
    target: 1,
  },
  {
    source: 'Node 2',
    target: 'Node 1',
  }
];

var data6 = [
  [40, -10],
  [-22.1, 50]
];

var isFirst = true;

export default {
  data() {
    return data, data2
  },
  mounted() {
    this.myEcharts();
  },
  methods: {
    myEcharts() {
      let myChart = echarts.init(document.getElementById('container'));
      var option = {
        show: false, // 不显示
        layout: 'orthogonal',
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        legend: {
          show: false, // 不显示
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
        toolbox: {
          padding:30,
          show : true,
          feature : {
            myTool2:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字    
              show:true,//是否显示    
              title:'', //鼠标移动上去显示的文字    
              icon:'path://M525.4 721.2H330.9c-9 0-18.5-7.7-18.5-18.1V311c0-9 9.3-18.1 18.5-18.1h336.6c9.3 0 18.5 9.1 18.5 18.1v232.7c0 6 8.8 12.1 15 12.1 6.2 0 15-6 15-12.1V311c0-25.6-25.3-48.9-50.1-48.9h-335c-26.2 0-50.1 23.3-50.1 48.9v389.1c0 36.3 20 51.5 50.1 51.5h197.6c6.2 0 9.3-7.5 9.3-15.1 0-6-6.2-15.3-12.4-15.3zM378.8 580.6c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h141.4c6.2 0 12.3-5.8 12.3-13.4 0.3-9.5-6.2-15.9-12.3-15.9H378.8z m251.6-91.2c0-6-6.2-14.6-12.3-14.6H375.7c-6.2 0-12.4 8.6-12.4 14.6s6.2 14.6 12.4 14.6h240.8c6.2 0.1 13.9-8.5 13.9-14.6z m-9.2-120.5H378.8c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h240.8c7.7 0 13.9-8.6 13.9-14.6s-6.2-14.6-12.3-14.6z m119.4 376.6L709 714.1c9.2-12 14.6-27 14.6-43.2 0-39.4-32.1-71.4-71.8-71.4-39.7 0-71.8 32-71.8 71.4s32.1 71.4 71.8 71.4c16.3 0 31.3-5.4 43.4-14.5l31.6 31.5c3.8 3.8 10 3.8 13.8 0 3.8-3.8 3.8-10 0-13.8z m-88.8-23.6c-28.3 0-51.3-22.8-51.3-51s23-51 51.3-51c28.3 0 51.3 22.8 51.3 51s-23 51-51.3 51z', //图标    
              onclick:function(params) {//点击事件,这里的option1是chart的option信息    
                console.log("1");
                console.log(params);
                myChart.setOption(option1);
              } 
            }
          }
        },
        xAxis: {
    min: -100,
    max: 70,
    type: 'value',
    axisLine: { onZero: false }
  },
  yAxis: {
    min: -30,
    max: 60,
    type: 'value',
    axisLine: { onZero: false }
  },
        series: [
          {
            show: false, // 不显示
            type: 'tree',
            roam: false,
            name: 'tree1',
            data: [data],
            top: '5%',
            left: '7%',
            bottom: '2%',
            right: '60%',
            symbolSize: 7,
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
            // 设置选中
						selectedMode: 'multiple',
						select: {
							label: {
								borderWidth: 2,
								backgroundColor: '#e6e6e6'
							}
						},
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          },
          {
            type: 'tree',
            roam: false,
            name: 'tree2',
            data: [data2],
            top: '20%',
            left: '60%',
            bottom: '22%',
            right: '18%',
            symbolSize: 7,
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
            animationDurationUpdate: 750
          },
          {
      id: 'a',
      type: 'line',
      smooth: true,
      symbolSize: 20,
      data: data6
    }
      
    //       {
    //   type: 'graph',
    //   layout: 'none',
    //   symbolSize: 7,
    //   roam: false,
    //   // label: {
    //   //   show: true
    //   // },
    //   edgeSymbol: ['circle', 'arrow'],
    //   edgeSymbolSize: [4, 10],
    //   edgeLabel: {
    //     fontSize: 20
    //   },
    //   data: data5,
    //   // links: [],
    //   links: linkdata,
    //   lineStyle: {
    //     opacity: 0.9,
    //     width: 2,
    //     curveness: 0
    //   }
    // }
        ]
      };
      
      myChart.setOption(option);
      // myChart.getMyPosition({finder:{seriesIndex:1}})//实例化后的echarts
      var model  = myChart.getModel().getSeriesByIndex(0);
      var info  = model.getData();
      var model2  = myChart.getModel().getSeriesByIndex(1);
      var info2  = model2.getData();
      console.log("info",info)
      console.log("info2",info2)
      myChart.on("click", function (params) {
        
        console.log(params);
        if(isFirst){
          console.log("11");
          isFirst = false;
        
          var pointInPixel = [params.offsetX, params.offsetY];
          var pointInGrid = myChart.convertFromPixel('grid', pointInPixel);
          if (myChart.containPixel('grid', pointInPixel)) {
            console.log("11111111111111111111111111111111");
            console.log("pointInGrid",pointInGrid);//点在坐标轴系里的x、y坐标值
          }
          data6 = [[pointInGrid.x,pointInGrid.y],[20,24]];
          myChart.setOption(option);
          
        }else if(!isFirst){
          var coordPoint = myChart.getModel().getSeriesByIndex(0).getData().getItemLayout(params.dataIndex);
          var model  = myChart.getModel().getSeriesByIndex(0);
          var info  = model.getData();
          var name = model.getData()._nameList[params.dataIndex];
          console.log("name",name);
          console.log("info",info);
          console.log("coordPoint",coordPoint);
          console.log("12");
          console.log(params);
          isFirst = true;
          // data6 = [coordPoint.x,coordPoint.y];
          data6.push = [[20,55],[23,88]];
          console.log(data6);
          // data5.push({
          //   x: coordPoint.x,
          //   y: coordPoint.y
          // });
          // linkdata.push({
          //   source: coordPoint.x,
          //   target: coordPoint.y,
          // },)
          myChart.setOption(option);

        }
        
        // console.log(params.data);
        
        })


        setTimeout(function () {
  // Add shadow circles (which is not visible) to enable drag.
  myChart.setOption({
    graphic: data6.map(function (item, dataIndex) {
      return {
        type: 'circle',
        position: myChart.convertToPixel('grid', item),
        shape: {
          cx: 0,
          cy: 0,
          r: 20 / 2
        },
        invisible: true,
        draggable: true,
        ondrag: function (dx, dy) {
          onPointDragging(dataIndex, [this.x, this.y]);
        },
        // onmousemove: function () {
        //   showTooltip(dataIndex);
        // },
        // onmouseout: function () {
        //   hideTooltip(dataIndex);
        // },
        z: 100
      };
    })
  });
}, 0);
window.addEventListener('resize', updatePosition);
// myChart.on('dataZoom', updatePosition);
function updatePosition() {
  myChart.setOption({
    graphic: data6.map(function (item, dataIndex) {
      return {
        position: myChart.convertToPixel('grid', item)
      };
    })
  });
}

function onPointDragging(dataIndex, pos) {
  data6[dataIndex] = myChart.convertFromPixel('grid', pos);
  // Update data
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data6
      }
    ]
  });
}

      
    },
    

  }
  
}

</script>




