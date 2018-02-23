import React from 'react';
import {
    multVal,
    setStyle,
    setClass,
    setss,
    doit,
} from '../../comm-util/jsxTools'
import './Bn.scss'

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

export default class Bn extends React.Component {
    constructor(props) {
        super(props);
    }

    //定义静态属性
    static defaultProps = {
        style: {}
    };
    //输入框变化时
    handleClick = (e) => {
        const {
            onClick, _cl,
        } = this.props;

        //事件处理
        onClick || _cl ? doit(onClick || _cl, e) : '';

    };
    //输入框变化时
    handleBlur = (e) => {
        //事件处理
        const {
            onBlur, _bl,
        } = this.props;
        //事件处理
        onBlur || _bl ? doit(onBlur || _bl, e) : '';
    };
    handleFocus = (e) => {
        //事件处理
        const {
            onFocus, _fo,
        } = this.props;

        //事件处理
        onFocus || _fo ? doit(onFocus || _fo, e) : '';
    };

    render() {
        let {
            style,

            className,
            primary, blue,
            success, succ, green,
            danger, red,
            warning, yellow,
            info,
            dark, black,
            gray,
            fill,
            small, sm,
            lg, long, big,
            ss,
            t,
            disabled,
            dis,
            ...others,
        } = this.props;

        //第一个参数：this.props.styles，
        //第二个..
        let Styles = setStyle(style, [ss, setss]);
        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        //
        let Classes = setClass(
            'short-btn',
            'btn',
            className,
            [multVal(small, sm), 'sm'],
            [multVal(lg, big, long), 'lg'],
            [multVal(primary, blue), 'primary'],
            [multVal(success, succ, green), 'success'],
            [multVal(danger, red), 'danger'],
            [multVal(warning, yellow), 'warning'],
            [multVal(info), 'info'],
            [multVal(dark, black), 'dark'],
            [multVal(gray), 'gray'],
            [multVal(fill), 'fill'],
            [multVal(dis, disabled), 'disabled'],
        );
        return <button
            style={Styles}
            className={Classes}
            disabled={disabled || dis}
            onClick={this.handleClick}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...others}
            ref="button"
        >
            {t ? t : this.props.children || '确定'}
        </button>;
    }
}
