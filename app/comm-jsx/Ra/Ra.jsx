import React from 'react';
import {
    multVal,
    doit,
    setStyle,
    setClass,
    setss,
    onlyId,
} from '../../comm-util/jsxTools'
import './Ra.scss'

/*
 radio组件
 说明==========================
 primary, blue,蓝色
 success, succ, green,绿色
 danger, red,红色
 warning, yellow,黄色
 info,浅蓝
 dark,black,深色
 gray,灰色
 fill，填充

 ======================
 t，文本
 name,名称
 value 默认值
 dis,disabled

 _cl,onClick,点击事件
 * */
export default class Ra extends React.Component {
    constructor(props) {
        super(props);
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
        } = this.props;
        //输入变化
        this.refs.hide_inp.checked = true;
        //事件处理,返回【3个值】
        // 1:【val】点击项的值，
        // 2:【text】点击项的文本，
        // 3:【ref.hide_inp】相当e.target,而不是e;
        let val = this.refs.hide_inp.value;
        let text = this.refs.hide_inp.dataset.t;
        let tar=this.refs.hide_inp;

        onClick || _cl ? doit(
            onClick || _cl,
            val,
            text,
            tar
        ) : '';
        onChange || _ch ? doit(
            onChange || _ch,
            val,
            text,
            tar
        ) : '';
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

            id, name, value, val,
            children,
            t,
            disabled, dis,
            ...others,
        } = this.props;

        //第一个参数：this.props.styles，
        let Styles = setStyle(style, [ss, setss]);
        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        let Classes = setClass(
            'short-radio',
            'radio',
            className,
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
        //返回代码片段
        return <label className={disabled || dis ? 'short-label disabled' : 'short-label'}>
            <input type="radio"
                   id={ id || onlyId('id') }
                   name={ name || onlyId('name')}
                   className={ Classes }
                   disabled={ disabled || dis }
                   data-t={ t ? t : children }
                   data-val={ value || val }
                   value={ value || val }
                   ref="hide_inp"
                   {...others}
            />
            <label
                style={ Styles }
                htmlFor={ id }
                data-t={ t ? t : children }
                data-val={ value || val }
                onClick={ this.handleClick }
            />
            <span className='radio-txt'
                  data-t={ t ? t : children }
                  data-val={ value || val }
                  onClick={this.handleClick}>
                { t ? t : children }
            </span>
        </label>
    }
}
