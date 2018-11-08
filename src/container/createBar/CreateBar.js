import React, { Component } from 'react';
import BarChart from '../../component/timeLimit/TimeLimit';
import Bar from '../../component/3dBar/3dbar';
import PieChart from '../../component/pieChart/PieChart';
import Box from '../../component/box/Box';
import Map from '../../component/map/Map';

/**
 * 绘制BARCHART图形
 * */
class CreateBar extends Component {
  constructor () {
    super();
    this.state = {
      map3dData: {
        'code': 1,
        'status': 200,
        'data': [
          {
            'id': '350102',
            'name': '鼓楼区',
            'creditIndex': 77.64,
            'dataAmount': 424803,
            'color': '#c182ff'
          },
          {
            'id': '350103',
            'name': '台江区',
            'creditIndex': 77.77,
            'dataAmount': 262100,
            'color': '#00b000'
          },
          {
            'id': '350104',
            'name': '仓山区',
            'creditIndex': 76.48,
            'dataAmount': 418088,
            'color': '#b5e1ef'
          },
          {
            'id': '350105',
            'name': '马尾区',
            'creditIndex': 74.08,
            'dataAmount': 122296,
            'color': '#fefb00'
          },
          {
            'id': '350111',
            'name': '晋安区',
            'creditIndex': 74.82,
            'dataAmount': 284846,
            'color': '#0f3afb'
          },
          {
            'id': '350112',
            'name': '长乐区',
            'creditIndex': 78.25,
            'dataAmount': 157299,
            'color': '#7c7fff'
          },
          {
            'id': '350121',
            'name': '闽侯县',
            'creditIndex': 76.55,
            'dataAmount': 145304,
            'color': '#7bdd00'
          },
          {
            'id': '350122',
            'name': '连江县',
            'creditIndex': 81.80,
            'dataAmount': 124901,
            'color': '#c5fe00'
          },
          {
            'id': '350123',
            'name': '罗源县',
            'creditIndex': 70.21,
            'dataAmount': 87408,
            'color': '#3f53fd'
          },
          {
            'id': '350124',
            'name': '闽清县',
            'creditIndex': 78.49,
            'dataAmount': 122509,
            'color': '#32feff'
          },
          {
            'id': '350125',
            'name': '永泰县',
            'creditIndex': 77.27,
            'dataAmount': 95792,
            'color': '#72feff'
          },
          {
            'id': '350181',
            'name': '福清市',
            'creditIndex': 75.75,
            'dataAmount': 292294,
            'color': '#a6feff'
          }
        ]
      }
    };
  };

  render () {
    const me = this;
    const state = me.state;
    return (
      <div style={{
        background: '#333',
        position: 'relative',
        width: 1920,
        height: 1080,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <BarChart/>
        <Bar/>
        <PieChart/>
        <Box width={400} height={400}/>
        <Map mapItems={state.map3dData.data}/>
      </div>

    );
  }
}

export default CreateBar;
