<template>
    <div>
      <div id="container" :style="{ height: '800px', width: '100%' }" />
    </div>
</template>
<script>
import * as echarts from 'echarts/core';

import { TooltipComponent, LegendComponent } from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import {GraphData} from '../api/index.js';
import { ref,reactive } from "vue"; 
echarts.use([TooltipComponent, LegendComponent,GraphChart, TitleComponent, CanvasRenderer,GraphData,ref,reactive ]);

// const data= [
//               {
//                 id: 'Left1',
//                 x: 100,
//                 y: 400,
//               },
//               {
//                 id: 'Left2',
//                 x: 300,
//                 y: 150,
//               },
//               {
//                 id: 'Left3',
//                 x: 300,
//                 y: 300,
//               },
//               {
//                 id: 'Left4',
//                 x: 300,
//                 y: 450,
//               },
//               {
//                 id: 'Left5',
//                 x: 300,
//                 y: 600,
//               },
//               {
//                 id: 'Left6',
//                 x: 500,
//                 y: 80,
//               },
//               {
//                 id: 'Left7',
//                 x: 500,
//                 y: 180,
//               },
//               {
//                 id: 'Right1',
//                 x: 1200,
//                 y: 400,
//               },
//               {
//                 id: 'Right2',
//                 x: 1000,
//                 y: 150,
//               },
//               {
//                 id: 'Right3',
//                 x: 1000,
//                 y: 300,
//               },
//               {
//                 id: 'Right4',
//                 x: 1000,
//                 y: 450,
//               },
//               {
//                 id: 'Right5',
//                 x: 1000,
//                 y: 600,
//               },
//               {
//                 id: 'Right6',
//                 x: 800,
//                 y: 80,
//               },
//               {
//                 id: 'Right7',
//                 x: 800,
//                 y: 180,
//               },
//             ];
// const links= [
//               {
//                 id: 'Leftedge1',
//                 target: 'Left2',
//                 source: 'Left1',
//               },
//               {
//                 id: 'Leftedge2',
//                 target: 'Left3',
//                 source: 'Left1',
//               },
//               {
//                 id: 'Leftedge3',
//                 target: 'Left4',
//                 source: 'Left1',
//               },
//               {
//                 id: 'Leftedge4',
//                 target: 'Left5',
//                 source: 'Left1',
//               },
//               {
//                 id: 'Leftedge5',
//                 target: 'Left6',
//                 source: 'Left2',
//               },
//               {
//                 id: 'Leftedge6',
//                 target: 'Left7',
//                 source: 'Left2',
//               },
//               {
//                 id: 'Rightedge1',
//                 target: 'Right2',
//                 source: 'Right1',
//               },
//               {
//                 id: 'Rightedge2',
//                 target: 'Right3',
//                 source: 'Right1',
//               },
//               {
//                 id: 'Rightedge3',
//                 target: 'Right4',
//                 source: 'Right1',
//               },
//               {
//                 id: 'Rightedge4',
//                 target: 'Right5',
//                 source: 'Right1',
//               },
//               {
//                 id: 'Rightedge5',
//                 target: 'Right6',
//                 source: 'Right2',
//               },
//               {
//                 id: 'Rightedge6',
//                 target: 'Right7',
//                 source: 'Right2',
//               },
//       ];
      // console.log(data);
      // console.log(links);
      const query = reactive({
            Node:"",
            links:""
        });
      const node = ref([]);
      const edges = ref([]); // 当ref中的数据发生改变会自动更新视图层
      // 获取表格数据
      const getData = () => {
        GraphData(query).then((res) =>{
          node.value = res.Node;
          console.log(node)
         // console.log(node._rawValue);
          edges.value = res.links;
          console.log(edges);
          //console.log(edges._rawValue)
        })
    };
    getData();
export default {
  name:"图",
  data() {
    return {
        // data,
        // links,
        node,
        edges,
    }
  },
  mounted() {
    this.myGraph();
  },
  methods: {
    myGraph(){
        let myChart = echarts.init(document.getElementById('container'));
        myChart.showLoading();
        var option = {
        title: {
            text: '信息流模型'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                show: true
            },
            data : node._rawValue,
            links : edges._rawValue,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0
            }
            }
        ]
        };
        myChart.setOption((option));
        var model  = myChart.getModel().getSeriesByIndex(0);
        var info  = model.getData();
        console.log(info);
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
          edges._rawValue.push({"target":link[1],"source":link[0]});
          console.log(edges._rawValue)
          link = []
          myChart.clear()
        }
        myChart.setOption((option));
        });
        myChart.hideLoading();
    },
    // //在method里面定义一个向后端传递参数的方法，我这里使用的是async await方法向后端传递参数（注：async await是配套使用的）,'http://localhost:33333/api/'是我后端接收参数的地址
    // async fetch() {
    //   const { link: resp } = await this.$http.get('http://localhost:33333/api/'+this. param1+'/'+this. param2);
    //   if (resp == 400) return this.$message.error(resp.msg);//对于返回值做了一个处理
    // },
  }
}

</script>