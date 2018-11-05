import React, {Component} from 'react';
import BarChart from '../../component/timeLimit/TimeLimit';
import Bar from '../../component/3dBar/3dbar';

/**
 * 绘制BARCHART图形
 * */
class CreateBar extends Component {
  constructor () {
    super();
  };

  render () {
    return (
      <div style={{
        background: '#333',
        position: 'relative',
        width: 1920,
        height: 1080,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}>
        <BarChart/>
        <Bar/>
      </div>

    );
  }
}

export default CreateBar;
