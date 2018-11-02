/**
 *环节时长超时限情况
 * */

import React, {Component} from 'react';
import './TimeLimit.css';
import * as d3 from 'd3';

class TimeLimit extends Component {
  constructor() {
    super();
    this.state = {};

    this.style = {
      width: 1460,
      height: 600,
      position: "absolute",
      left: 0,
      top: 50,
      zIndex: 1
    };
    this.unit = {
      color: "#cee8ff",
      fontSize: 24,
      position: "absolute",
      top: 126,
      left: 700
    }
  }

  render() {
    return (
      <div style={this.style} ref={'barChart'}>
        <span style={this.unit}>单位：条</span>
      </div>
    )
  }

  componentDidMount() {
    let textData = [
      {
        name: '业务受理',
        value: 122
      }, {
        name: '接单派工',
        value: 208
      }, {
        name: '到达现场',
        value: 289
      }, {
        name: '故障处理',
        value: 344
      }];

    //添加svg标签
    let svg = d3.select(this.refs.barChart)
      .append('svg')
      .attr('width', 850)
      .attr('height', 600)
      .attr("transform", 'translate(-200,0)');

    //添加y轴
    let y_g = svg.append('g')
      .attr('transform', 'translate(0,184)');
    let g = svg.append('g')
      .attr("transform", 'translate(0,184)');

    y_g.append('line')
      .attr('x1', 150)
      .attr('y1', 0)
      .attr('x2', 150)
      .attr('y2', 400)
      .style('stroke', '#0afdff')
      .style('stroke-width', 5);

    y_g.append('rect')
      .attr('x', 155)
      .attr('y', 0)
      .attr('width', 15)
      .attr('height', 400)
      .attr('fill', 'rgba(16,65,150,0.7)')
      .attr('transform-origin', 'center')
      .attr('transform', 'skewY(-40) translate(0,-224)');

    //添加group组
    let group_g = g.selectAll('g')
      .data(textData)
      .enter()
      .append('g')
      .attr('class', (t, i) => {
        return 'group_g' + i;
      })
      .attr('transform', (d, i) => {
        return `translate(0,${50 + i * 100})`
      });

    //添加y轴文字
    group_g.append('text')
      .style('font-size', 30)
      .style('fill', '#fff')
      .attr('dy', 10)
      .attr("dominant-baseline", "middle")
      .text((d, i) => {
        return d.name;
      });

    //添加path
    let w = 630;
    let h = 40;
    let diff = 16;
    //默认柱子颜色
    let defaultColor = 'rgba(86,247,229,1)';
    //移入变化的颜色
    let hoverColor = 'rgba(255,241,0,1)';
    //求出一组数据中的最大值
    let max = d3.max(textData, (t) => {
      return t.value;
    });
    // 求柱宽与数据的比例值
    let percent_val = w / max;
    let arr = [];
    textData.map((t) => {
      let bar_w = t.value * percent_val;
      arr.push(bar_w)
    });

    let path_g = group_g.append('g')
      .attr('class', (d, i) => {
        return "path_g" + i
      })
      .attr('transform', 'translate(155,0)')
      .on('mouseenter', (d, i) => {
        this.changeColor(".path_g" + i, hoverColor);
      })
      .on('mouseleave', (d, i) => {
        this.changeColor(".path_g" + i, defaultColor);
      });

    // 创建背景柱 dom,柱宽，柱高，偏差尺寸，填充颜色，描边颜色
    this._createBarChart(path_g, w, h, diff, 'transparent', '#134aa2');
    // 实体填充
    this._createBarChart(d3.select(".path_g0"), arr[0], h, diff, defaultColor, defaultColor, true);
    this._createBarChart(d3.select(".path_g1"), arr[1], h, diff, defaultColor, defaultColor, true);
    this._createBarChart(d3.select(".path_g2"), arr[2], h, diff, defaultColor, defaultColor, true);
    this._createBarChart(d3.select(".path_g3"), arr[3], h, diff, defaultColor, defaultColor, true);
  }

  // 添加数据信息
  // addValMsg(selector, bar_w, val) {
  //   let color = '#0afdff';
  //   if (bar_w === "hide") {
  //     d3.select(".textVal").remove();
  //     return;
  //   }
  //   d3.select(selector)
  //     .append('text')
  //     .attr('class', 'textVal')
  //     .style('font-size', 30)
  //     .style('fill', '#ffed2b')
  //     .attr('dy', 10)
  //     .attr('dx', (d, i) => {
  //       return 170 + bar_w
  //     })
  //     .attr("dominant-baseline", "middle")
  //     .text(Math.ceil(val));
  // }

  changeColor(selector, color, val) {
    d3.select(selector)
      .selectAll('.datapath')
      .attr('fill', color)
      .attr('fill-opacity', 0.4)
      .attr('stroke', color);

    d3.select(selector)
      .select('.textVal')
      .style('fill', color)

  }

  // 柱图创建
  _createBarChart(path_g, w, h, diff, fillColor, strokeColor, isData) {

    if (isData) {
      path_g.append('text')
        .attr('class', 'textVal')
        .style('font-size', 30)
        .style('fill', '#0afdff')
        .attr('dy', 10)
        .attr('dx', (d, i) => {
          return 10 + w
        })
        .attr("dominant-baseline", "middle")
        .text(function (d) {
          return d.value;
        });
    }

    //正面
    path_g.append('path')
      .attr('class', isData ? 'datapath' : 'bgpath')
      .attr('d', `M0,0 H${0},V${h},H0,L0,0 Z`)
      .transition()
      .duration(1000)
      .attr('d', `M0,0 H${w - diff},V${h},H0,L0,0 Z`)
      .attr('fill', fillColor)
      .attr('fill-opacity', 0.4)
      .attr('stroke', strokeColor);

    //背面
    path_g.append('path')
      .attr('class', isData ? 'datapath' : 'bgpath')
      .attr('d', `M${0},${0} H${0},V${h - diff},H${0} Z`)
      .transition()
      .duration(1000)
      .attr('d', `M${diff},${-diff} H${w},V${h - diff},H${diff} Z`)
      .attr('fill-opacity', 0.4)
      .attr('fill', fillColor)
      .attr('stroke', strokeColor);
    //右边
    path_g.append('path')
      .attr('class', isData ? 'datapath' : 'bgpath')
      .attr('d', `M${0},0 L${0},${0} V${h - diff} L${0},${h} Z`)
      .transition()
      .duration(1000)
      .attr('d', `M${w - diff},0 L${w},${-diff} V${h - diff} L${w - diff},${h} Z`)
      .attr('fill-opacity', 0.4)
      .attr('fill', fillColor)
      .attr('stroke', strokeColor);
    //左边
    path_g.append('path')
      .attr('class', isData ? 'datapath' : 'bgpath')
      .attr('d', `M0,0 L${0},${0} V${h - diff} L${0},${h} L0,0 Z`)
      .transition()
      .duration(1000)
      .attr('d', `M0,0 L${diff},${-diff} V${h - diff} L${0},${h} L0,0 Z`)
      .attr('fill-opacity', 0.4)
      .attr('fill', fillColor)
      .attr('stroke', strokeColor);
  }
}

export default TimeLimit;
