import React, { Component } from 'react';
import * as d3 from 'd3';

class PieChart extends Component {
  constructor (props) {
    super();
    this.state = {
      dataSet: [{
        id: 0,
        name: '国土局',
        value: 30
      }, {
        id: 1,
        name: '教育局',
        value: 50
      }, {
        id: 2,
        name: '民宗局',
        value: 39
      }, {
        id: 3,
        name: '文体局',
        value: 70
      }, {
        id: 4,
        name: '编办',
        value: 78
      }, {
        id: 5,
        name: '商务局',
        value: 33
      }, {
        id: 6,
        name: '财政局',
        value: 19
      }, {
        id: 7,
        name: '科技局',
        value: 36
      }, {
        id: 8,
        name: '环保局',
        value: 60
      }, {
        id: 9,
        name: '其他局',
        value: 84
      }]
    };
  }

  render () {
    return <div ref='comBox'></div>;
  }

  componentDidMount () {
    const me = this;
    const dataSet = me.state.dataSet;
    const dom = me.refs.comBox;
    console.log(dom);
    //创建虚拟数组，绘制外部弧线
    const updateData = function (arr) {
      const _updateArr = [];
      const _len = arr.length;
      for (let i = 0; i < _len; i++) {
        if (i === _len - 1) {
          _updateArr.push({
            value: ((arr[i].value) / 2 + (arr[0].value) / 2),
            name: arr[i].name
          });
        } else {
          _updateArr.push({
            value: ((arr[i].value) / 2 + (arr[i + 1].value) / 2),
            name: arr[i].name
          });
        }
      }
      return _updateArr;
    };
    const outerCircleData = updateData(dataSet);
    const colors = ['#21b6fc', '#7cfdfb', '#32fffe', '#59fee8', '#02d38b', '#d9fd8c', '#ffd553', '#ff396a', '#b860ef', '#015fc8'];
    const width = 460;
    const height = 238;
    //求出所有的value总值
    let grossData = 0;
    dataSet.map(function (item) {
      grossData += item.value;
    });
    const svg = d3.select(dom)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(150,120)');
    //创建弧生成器
    const arcInner = d3.arc()
      .innerRadius(56)
      .outerRadius(70)
      .padAngle(0.01);
    //创建饼布局
    const pie = d3.pie()
      .value(function (d) {
        return d.value;
      })
      .sort(null);
    //转换数据格式
    const pieData = pie(dataSet);
    //开始绘制
    const arc_g = svg.selectAll('g')
      .data(pieData)
      .enter()
      .append('g');
    const arcPath = arc_g
      .append('path')
      .attr('d', function (d) {
        return arcInner(d);
      });
    arc_g.append('line')
      .transition()
      .duration(600)
      //				.delay(function(d,i){
      //					console.log(d,i)
      //					return i*10
      //				})
      .attr('stroke', '#3e8eff')
      .attr('stroke-dasharray', '1,1.5')
      .attr('stroke-width', 2)
      .attr('x1', function (d) {
        return arcInner.centroid(d)[0] * 1.1;
      })
      .attr('y1', function (d) {
        return arcInner.centroid(d)[1] * 1.1;
      })
      .attr('x2', function (d) {
        return arcInner.centroid(d)[0] * 1.3;
      })
      .attr('y2', function (d) {
        return arcInner.centroid(d)[1] * 1.3;
      });
    //添加文字
    arc_g.append('text')
      .transition()
      .duration(600)
      //				.delay(function(d,i){
      //					console.log(d,i)
      //					return i*70
      //				})
      .attr('transform', function (d) {
        const x = arcInner.centroid(d)[0] * 1.5;
        const y = arcInner.centroid(d)[1] * 1.48;
        return 'translate(' + (x + 3) + ',' + (y + 5) + ')';
      })
      .attr('font-size', '14px')
      .attr('font-family', '微软雅黑')
      .style('text-anchor', 'middle')
      .attr('fill', '#02f4ff')
      .text(function (d) {
        return Math.ceil(d.value / grossData * 100) + '%';
      });
    //绘制外圆
    const arcOuter = d3.arc()
      .innerRadius(76)
      .outerRadius(77)
      .padAngle(0.08);
    const arcLineData = pie(outerCircleData);
    const arcLine_g = svg.append('g')
      .attr('transform', 'rotate(12)');
    arcLine_g.selectAll('path')
      .data(arcLineData)
      .enter()
      .append('path')
      .attr('d', function (d) {
        return arcOuter(d);
      })
      .attr('fill', '#3e8eff');
    //添加图例
    const rects = svg.append('g')
      .attr('transform', 'translate(170,-80)');
    const rect_g = rects.selectAll('g')
      .data(dataSet)
      .enter()
      .append('g');
    rect_g.append('rect')
      .transition()
      .duration(600)
      .delay(function (d, i) {
        console.log(d, i);
        return i * 50;
      })
      .attr('width', 20)
      .attr('height', 8)
      .attr('y', function (d, i) {
        return 18 * i;
      })
      .attr('fill', function (d, i) {
        return colors[i];
      });
    rect_g.append('text')
      .attr('font-size', '14px')
      .attr('font-family', '微软雅黑')
      .style('text-anchor', 'middle')
      .attr('fill', '#30b4ff')
      .attr('dy', 10)
      .attr('y', function (d, i) {
        return 18 * i;
      })
      .attr('x', 60)
      .text(function (d) {
        return d.name;
      });
    arcPath
      .transition()
      .duration(1500)
      .delay(function (d, i) {
        return i * 50;
      })
      .attr('fill', function (d) {
        return colors[d.data.id];
      });
  }
}

export default PieChart;
