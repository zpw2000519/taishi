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
  import { TitleComponent } from 'echarts/components';
  import { GraphChart } from 'echarts/charts'
  import { testData } from '../api/index.js'; //读取json数据需要引入本行和下行
  import { ref,reactive } from "vue"; 
  echarts.use([GraphChart,TitleComponent,TooltipComponent, LegendComponent, TreeChart, CanvasRenderer]);
  
  const data = {
    name: 'root',
    children: [
      {
        name: 'root1',
        children: [
          {
            name: '1',
            value: 112,
          },
        ]
      },
      {
        name: 'root2',
        children: [
          { name: '2', value: 8833 },
        ]
      },
      {
        name: 'root3',
        children: [{ name: '3', value: 4116 }]
      },
      {
        name: 'root4',
        children: [
          { name: '4', value: 1616},
        ]
      },
      {
        name: 'root5',
        children: [
          { name: '5', value: 2105 },
        ]
      }
    ]
  };
  var data2 = {
  name: 'rRoot',
  children: [
    {
      name: 'rRoot1',
      children: [{ name: '6', value: 4116 }]
    },
    {
      name: 'rRoot2',
      children: [
        { name: '7', value: 2105 },
      ]
    },
    {
      name: 'rRoot3',
      children: [{ name: '8', value: 8833 }]
    }
  ]
};
  const edges = [
    {
      target: "root1",
      source: "root"
    },
    {
      target: "root2",
      source: "root"
    },
    {
      target: "root3",
      source: "root"
    },
    {
      target: "root4",
      source: "root"
    },
    {
      target: "root5",
      source: "root"
    },
    {
      target: "1",
      source: "root1"
    },
    {
      target: "2",
      source: "root2"
    },
    {
      target: "3",
      source: "root3"
    },
    {
      target: "4",
      source: "root4"
    },
    {
      target: "5",
      source: "root5"
    },
    {
      target: "rRoot1",
      source: "rRoot"
    },
    {
      target: "rRoot2",
      source: "rRoot"
    },
    {
      target: "rRoot3",
      source: "rRoot"
    },
    {
      target: "6",
      source: "rRoot1"
    },
    {
      target: "7",
      source: "rRoot2"
    },
    {
      target: "8",
      source: "rRoot3"
    },
]

//下部分代码为读取json数据 直到getData
// const query = reactive({
//             Node:"",
//             links:""
//         });
//       //const node = ref([]);
//       const edges = ref([]); // 当ref中的数据发生改变会自动更新视图层
//       // 获取表格数据
//       const getData = () => {
//         testData(query).then((res) =>{
//           // node.value = res.Node;
//           // console.log(node)
//          // console.log(node._rawValue);
//           edges.value = res.links;
//           console.log(edges);
//           // console.log(edges._rawValue)
//         })
//     };
//     getData();
  const node = []
  export default {
    data() {
      return {
            data,
            data2,
            node,
            edges
            }
    },
    mounted() {
      this.myEcharts();
     // this.myEcharts.myChart.clear();
      this.myGraph();
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
              orient: 'horizontal',
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
                //symbol: "src\views\test.png", 
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
                  },
                  
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
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
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
        var model  = myChart.getModel().getSeriesByIndex(1);
        var info1  = model.getData();
        // console.log("test info",i0
        // console.log("cood1",info._itemLayouts);
        // console.log("cood2",info1._itemLayouts);
        for(let i=1;i<info._itemLayouts.length;i++){
            let item = info._itemLayouts[i];
            node.push({id:info._nameList[i],x:item['x'],y:item['y']});
        }
        let delt_y = info._itemLayouts[1]['y']-info1._itemLayouts[1]['y'];
        for(let i=1;i<info1._itemLayouts.length;i++){
            let item = info1._itemLayouts[i];
            let a = 400;
            // let b = 140;
            node.push({id:info1._nameList[i],x:a+item['x'],y:delt_y+item['y']});
        }
        //console.log(node);
        myChart.clear();
        myChart.hideLoading();
      },
      myGraph(){
        let myChart = echarts.init(document.getElementById('container'));
        myChart.showLoading();
        var option = {
        title: {
            text: ''
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
            type: 'graph',
            layout: 'none',
            symbolSize: 20,
            roam: true,
            label: {
                show: true
            },
            data : node,
            links : edges,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            lineStyle: {
                opacity: 0.5,
                width: 2,
                curveness: 0,
            }
            }
        ]
        };
       
        myChart.setOption((option));
        // var model  = myChart.getModel().getSeriesByIndex(0);
        // var info  = model.getData();
        // console.log(info);
        let link = [];
        myChart.on("click", (params) => {
          // The position where the mouse clicks
        const point = { x: params.data.x, y: params.data.y };
        console.log(point.x,point.y);
        // console.log(params)
        // console.log(params.data.id)
        link.push(params.data.id);

        if(link.length == 2){
          console.log("链接两个节点",link);
          //link[0]=source
          //link[1]=target
          //直接传到后台
          edges.push({"target":link[1],"source":link[0]});
          console.log(edges)
          link = []
          myChart.clear()
        }
        
        myChart.setOption((option));
        });
        myChart.hideLoading();
    },
    }
  }
        
  </script>