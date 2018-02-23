import React from 'react';
import {
    multVal,
    setStyle,
    setClass,
    setss,
    doit,
} from '../../comm-util/jsxTools'
import {Button} from 'antd'
import './Button.scss'

/*
 按钮组件
 说明
 primary, blue,蓝色
 success, succ, green,绿色
 danger, red,红色
 warning, yellow,黄色
 info,浅蓝
 dark,black,深色
 gray,灰色
 fill，填充
 t，文本
 * */

export default class myButton extends React.Component {
    constructor(props) {
        super(props);
    }

    //定义静态属性
    static defaultProps = {
        style: {}
    };
    handleClick = (e) => {
        const {
            onClick, _cl,
        } = this.props;
        onClick || _cl ? doit(onClick || _cl, e) : '';
    };

    render() {
        let {
            style, ss,
            className, blue, green, red, yellow, info, black, gray, fill, small, sm, lg, big,
            t,
            disabled, dis,
            ...others,
        } = this.props;

        let Styles = setStyle(style, [ss, setss]);

        let Classes = setClass(
            'short-btn',
            'btn',
            className,
            [multVal(small, sm), 'sm'],
            [multVal(lg, big), 'lg'],
            [multVal(blue), 'primary'],
            [multVal(green), 'success'],
            [multVal(red), 'danger'],
            [multVal(yellow), 'warning'],
            [multVal(info), 'info'],
            [multVal(black), 'dark'],
            [multVal(gray), 'gray'],
            [multVal(fill), 'fill'],
            [multVal(dis), 'disabled'],
        );
        return <Button
            style={Styles}
            className={Classes}
            disabled={disabled || dis}
            onClick={this.handleClick}
            {...others}
            ref="button"
        >
            {t ? t : this.props.children || '确定'}
        </Button>;
    }
}
