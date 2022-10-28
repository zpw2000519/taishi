<template>
    <div>
      <div id="container" :style="{ height: '800px', width: '100%' }" />
    </div>
  </template>
<script>
import G6 from '@antv/g6';
export default{
  name: 'graph',
    data(){
      return{}
    },
    mounted(){
      let addedCount = 0;
      // Register a custom behavior: add a node when user click the blank part of canvas
      G6.registerBehavior('click-add-node', {
        // Set the events and the corresponding responsing function for this behavior
        getEvents() {
          // The event is canvas:click, the responsing function is onClick
          return {
            'canvas:click': 'onClick',
          };
        },
        // Click event
        onClick(ev) {
          const self = this;
          const graph = self.graph;
          // Add a new node
          graph.addItem('node', {
            x: ev.canvasX,
            y: ev.canvasY,
            id: `node-${addedCount}`, // Generate the unique id
          });
          addedCount++;
        },
      });
      // Register a custom behavior: click two end nodes to add an edge
      G6.registerBehavior('click-add-edge', {
        // Set the events and the corresponding responsing function for this behavior
        getEvents() {
          return {
            'node:click': 'onClick', // The event is canvas:click, the responsing function is onClick
            mousemove: 'onMousemove', // The event is mousemove, the responsing function is onMousemove
            'edge:click': 'onEdgeClick', // The event is edge:click, the responsing function is onEdgeClick
          };
        },
      // The responsing function for node:click defined in getEvents
      onClick(ev) {
        const self = this;
        const node = ev.item;
        console.log(node)
        const graph = self.graph;
        const edges = grapghdata.edges;
        // The position where the mouse clicks
        const point = { x: ev.x, y: ev.y };
        console.log(point.x,point.y);
        const model = node.getModel();
        if (self.addingEdge && self.edge) {
          graph.updateItem(self.edge, {
            target: model.id,
          });

          self.edge = null;
          self.addingEdge = false;
        } else {
          // Add anew edge, the end node is the current node user clicks
          self.edge = graph.addItem('edge', {
            source: model.id,
            target: model.id,
          });
          self.addingEdge = true;
          edges.push(self.edge);
          console.log(edges);
        }
      },
      // The responsing function for mousemove defined in getEvents
      onMousemove(ev) {
        const self = this;
        // The current position the mouse clicks
        const point = { x: ev.x, y: ev.y };
        if (self.addingEdge && self.edge) {
          // Update the end node to the current node the mouse clicks
          self.graph.updateItem(self.edge, {
            target: point,
          });
          
        }
      },
      // The responsing function for edge:click defined in getEvents
      onEdgeClick(ev) {
        const self = this;
        const currentEdge = ev.item;
        if (self.addingEdge && self.edge === currentEdge) {
          self.graph.removeItem(self.edge);
          self.edge = null;
          self.addingEdge = false;
        }
      },
    });
    const grapghdata = {
            nodes: [
              {
                id: 'Left1',
                x: 100,
                y: 400,
              },
              {
                id: 'Left2',
                x: 300,
                y: 150,
              },
              {
                id: 'Left3',
                x: 300,
                y: 300,
              },
              {
                id: 'Left4',
                x: 300,
                y: 450,
              },
              {
                id: 'Left5',
                x: 300,
                y: 600,
              },
              {
                id: 'Left6',
                x: 500,
                y: 80,
              },
              {
                id: 'Left7',
                x: 500,
                y: 180,
              },
              {
                id: 'Right1',
                x: 1200,
                y: 400,
              },
              {
                id: 'Right2',
                x: 1000,
                y: 150,
              },
              {
                id: 'Right3',
                x: 1000,
                y: 300,
              },
              {
                id: 'Right4',
                x: 1000,
                y: 450,
              },
              {
                id: 'Right5',
                x: 1000,
                y: 600,
              },
              {
                id: 'Right6',
                x: 800,
                y: 80,
              },
              {
                id: 'Right7',
                x: 800,
                y: 180,
              },
            ],
            edges: [
              {
                id: 'Leftedge1',
                target: 'Left2',
                source: 'Left1',
              },
              {
                id: 'Leftedge2',
                target: 'Left3',
                source: 'Left1',
              },
              {
                id: 'Leftedge3',
                target: 'Left4',
                source: 'Left1',
              },
              {
                id: 'Leftedge4',
                target: 'Left5',
                source: 'Left1',
              },
              {
                id: 'Leftedge5',
                target: 'Left6',
                source: 'Left2',
              },
              {
                id: 'Leftedge6',
                target: 'Left7',
                source: 'Left2',
              },
              {
                id: 'Rightedge1',
                target: 'Right2',
                source: 'Right1',
              },
              {
                id: 'Rightedge2',
                target: 'Right3',
                source: 'Right1',
              },
              {
                id: 'Rightedge3',
                target: 'Right4',
                source: 'Right1',
              },
              {
                id: 'Rightedge4',
                target: 'Right5',
                source: 'Right1',
              },
              {
                id: 'Rightedge5',
                target: 'Right6',
                source: 'Right2',
              },
              {
                id: 'Rightedge6',
                target: 'Right7',
                source: 'Right2',
              },
            ],
      };
    const container = document.getElementById('container');
    // Add a selector to DOM
    const selector = document.createElement('select');
    selector.id = 'selector';
    const selection1 = document.createElement('option');
    selection1.value = 'default';
    selection1.innerHTML = 'Drag Node';
    const selection2 = document.createElement('option');
    selection2.value = 'addNode';
    selection2.innerHTML = 'Add Node (By clicking canvas)';
    const selection3 = document.createElement('option');
    selection3.value = 'addEdge';
    selection3.innerHTML = 'Add Edge (By clicking two end nodes)';
    selector.appendChild(selection1);
    selector.appendChild(selection2);
    selector.appendChild(selection3);
    container.appendChild(selector);

    const width = container.scrollWidth;
    const height = (container.scrollHeight || 500) - 30;
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      // The sets of behavior modes
      modes: {
        // Defualt mode
        default: ['drag-node','click-select'],
        // Adding node mode
        addNode: ['drag-node','click-add-node', 'click-select'],
        // Adding edge mode
        addEdge: ['click-add-edge', 'click-select'],
      },
      // The node styles in different states
      nodeStateStyles: {
        // The node styles in selected state
        selected: {
          stroke: '#666',
          lineWidth: 5,
          fill: 'steelblue',
        },
      },
      edgeStateStyles: {
        // The node styles in selected state
          stroke: '#666',
          lineWidth: 1,
          fill: 'steelblue',
        selected: {
          stroke: '#666',
          lineWidth: 5,
        },
      },
    });
    graph.data(grapghdata);
    graph.render();
    // Listen to the selector, change the mode when the selector is changed
    selector.addEventListener('change', (e) => {
      const value = e.target.value;
      // change the behavior mode
      graph.setMode(value);
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
      };
      
    },
    methods:{
    }
}

</script>