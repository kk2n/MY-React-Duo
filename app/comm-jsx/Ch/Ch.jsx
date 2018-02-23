import React from 'react';
import {
    multVal,
    doit,
    setStyle,
    setClass,
    setss,
    onlyId,
} from '../../comm-util/jsxTools'
import './Ch.scss'

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

export default class Ch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlyId: onlyId('id'),
            check: props.checked
        };
    }

    //定义静态属性
    static defaultProps = {
        style: {}
    };

    //点击事件
    handleClick = (e) => {
        e.stopPropagation();
        const {
            onClick, _cl,
            onChange, _ch,
            t
        } = this.props;
        //输入变化
        if (e.target.checked) {
            this.setState({check: 1})
        } else {
            this.setState({check: 0})
        }

        //事件处理,返回【3个值】
        // 1:【val】点击项的值，
        // 2:【text】点击项的文本，
        // 3:【ref.hide_inp】相当e.target,而不是e;
        onClick || _cl ? doit(onClick || _cl, e.target.value, t, e.target) : '';
        onChange || _ch ? doit(onChange || _ch, e.target.value, t, e.target) : '';

    };

    render() {
        let {
            style, ss,

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

            t,
            disabled,
            dis,
            id,
            checked,

            ...others,
        } = this.props;

        //第一个参数：this.props.styles，
        let Styles = setStyle(style, [ss, setss]);
        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        let Classes = setClass(
            'short-check',
            'check',
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
        return <label className={disabled || dis ? 'short-label disabled' : 'short-label'}>
            <input type="checkbox" id={id || this.state.onlyId}
                   className={Classes}
                   data-t={t ? t : this.props.children }
                   data-val={ this.props.value }
                   data-checked={ this.state.check }
                   disabled={disabled || dis}
                   ref="hide_inp"
                   value={!this.state.check}
                   onClick={this.handleClick}
                   checked={this.state.check}
                   {...others}
            />
            <label
                style={Styles}
                htmlFor={id || this.state.onlyId}
            />
            <span className='check-txt'>
                {t ? t : this.props.children }
            </span>
        </label>
    }
}
