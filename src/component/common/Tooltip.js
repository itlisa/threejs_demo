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
                            <p style={{fontSize:'24px',marginLeft:'20px',marginTop:"5px"}}>排名</p>
                            <p className="toolTipPClass">{me.state.rank}<span style={{fontSize:'18px',color:'#fff'}}></span></p>
                        </div>
                        <div>
                            <p style={{fontSize:'24px',marginLeft:'20px',marginTop:"5px"}}>信用指数</p>
                            <p className="toolTipPClass">{me.state.value}<span style={{fontSize:'18px',color:'#fff'}}></span></p>
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
