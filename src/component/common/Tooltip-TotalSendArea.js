/**
 * desc：
 * author：
 * date：
 */
import React, {Component}from 'react';


class Tooltip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flag:false
        }
    }

    render() {
        let me=this;
        if(me.state.flag){
            return (
                <div ref="toolTip" style={{width:'323px',height:'170px',position:'absolute',left:`${me.state.left}px`,top:`${me.state.top}px`,zIndex:'2',pointerEvents:'none'}} className="toolTipClass">
                    <div className="toolTip_BottomBorder">
                        <div className="bottomLeft bottomCom" style={{width:'93px'}}></div>
                        <div className="bottomLeft1 bottomCom" style={{width:'93px'}}></div>
                        <div className="bottomRight1 bottomCom" style={{width:'20px',height:'20px'}}></div>
                    </div>
                    <div className="toolTipTopClass">
                        <span>{me.state.name}</span><span>第</span><span>{me.state.rank}</span><span>名</span>
                    </div>
                    <div className="toolTipBottomClass">
                        <div>
                            <p style={{fontSize:'24px',marginLeft:'20px',marginTop:"5px"}}>归集总量</p>
                            <p className="toolTipPClass">{me.state.value}<span style={{fontSize:'18px',color:'#fff'}}>条</span></p>
                        </div>
                        <div>
                            <p style={{fontSize:'24px',marginLeft:'10px',marginTop:"5px"}}>本月数据增量</p>
                            <p className="toolTipPClass">{me.state.add}<span style={{fontSize:'18px',color:'#fff'}}>条</span></p>
                        </div>
                    </div>
                </div>
            );
        }else{
            return null
        }
    }
}

export default Tooltip
