import React from 'react';
import {
    setStyle,
    setWhpm,
    setFclt,
    setBdbg,
    setDfpz,
    setClass,
    setss,
} from '../../comm-util/jsxTools'
import './Space.scss'

export default class Space extends React.Component {
    constructor(props) {
        super(props);
    }

//定义静态属性
    static defaultProps = {
        style: {}
    };

    render() {
        const {
            style,
            className,
            h,
            bg,
            ss,
            ...others
        } = this.props;


        //第一个参数：this.props.styles，
        let Styles = setStyle(
            style,
            [ss, setss],
        );
        if (parseInt(h) >= 0) {
            Styles.height = h.indexOf('%') < 0 && h.indexOf('rem') < 0 ? h + 'px' : h;
        }
        if (typeof bg === 'string') {
            Styles.backgroundColor = bg;
        }
        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        let Classes = setClass(
            '',
            'short-Space',
            className,
        );
        return (<div
            className={Classes}
            {...others}
            style={Styles}
        >
            {this.props.children}
        </div>);
    }
}
