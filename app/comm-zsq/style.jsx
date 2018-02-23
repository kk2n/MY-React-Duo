/* 
调用装饰器 ：@style({com:"w100,mt20"})

调用属性，style={this.props.com}

效果：style={{
    "width":"200px",
    "marginTop":"20px"
}}
*/

import React from "react";
import { setStyle, setss } from "../comm-util/jsxTools";
export default config => WrappedComponent =>
    class extends WrappedComponent {
        render() {
            let myStyle={};
            _.each(_.values(config),(a,aa)=>{
              myStyle[_.keys(config)[aa]]=setStyle(null, [a, setss])
            })
            return <WrappedComponent {...this.props} {...myStyle}/>;
        }
    };
