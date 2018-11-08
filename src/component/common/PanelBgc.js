/**
 * desc：
 * author：
 * date：
 */
import React, {Component}from 'react';
import './PanelCommen.css'

class PanelBgc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        let me=this;
        let styleProp={w:me.props.width || 500, h:me.props.height || 300, l:me.props.left, t:me.props.top};
        if(me.props.isRect){
            return (
                <div className="panelBgc" style={{position:'absolute',top:`${styleProp.t}px`,left:`${styleProp.l}px`,width:`${styleProp.w}px`,height:`${styleProp.h}px`}}>
                    <div className="rectTopBor" style={{width:me.props.width}}></div>
                    <div className="rectBottomBor" style={{width:me.props.width}}></div>
                    { me.props.children}
                </div>
            );
        }else{
            return (
                <div  style={{position:'absolute',top:`${styleProp.t}px`,left:`${styleProp.l}px`,width:`${styleProp.w}px`,height:`${styleProp.h}px`}}>
                    <div className="PanelBgc_top">
                        <div className="PanelBgc_topBorder" style={{width:`${styleProp.w}px`}}>
                        </div>
                    </div>
                    <div>
                        { me.props.children}
                    </div>
                    <div className="PanelBgc_bottom">
                        <div className="PanelBgc_topBorder" style={{width:`${styleProp.w}px`}}>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default PanelBgc
