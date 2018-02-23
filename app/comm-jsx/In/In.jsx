/*
 属性说明
 【small,sm】type:bool
 小的，height=24

 【long,lg,big】type:bool
 大的，height=42

 【disabled,dis】type:bool
 禁用输入框

 【onPressEnter, _en】type:fn
 输入后，点击enter事件，
 返回【2个参数】 返回【2个参数】1：【value】,输入后的值，2：【e】,e

 【onKeyDown, _kd】
 按下,写之前，键盘事件
 返回【2个参数】 返回【2个参数】1：【value】,输入后的值，2：【e】,e

 【onChange,_ch】
 值改变时，执行事件
 返回【2个参数】 返回【2个参数】1：【value】,输入后的值，2：【e】,e

 【onBlur,_bl】
 失去焦点时，执行事件
 返回【2个参数】1：【value】,输入后的值，2：【e】,e

 【onFocus,_fo】
 获得焦点时，执行事件

 【val,value】type:string   初始文字
 【initVal】type:string   默认值，initVal改变时会清空
 【initValue】type:string   默认值，initValue改变时会全选


 【bt】type:string   前面文字或图标
 【at】type:string   后面文字或图标
 【bi】type:string   输入框里，前面文字或图标
 【ai】type:string   输入框里，后面文字或图标

 【pclassName】 type:string   最外面的父亲，样式
 【pstyle】type:style[obj]    最外面父亲的内嵌样式



 【text】type:bool,多行文本输入框
 【autosize】type:obj,{ minRows: 2, maxRows: 6 }
 【auto】type:string,例如：auto="2,6" 结果和上面一样


 例子：
 <In bi={<Icon type="user" />} bt="ddd:" val="mysite" className="lk"/>
 */
import React from 'react';
import {
    multVal,
    doit,
    setStyle,
    setClass,
    setss,
} from '../../comm-util/jsxTools'
import {renderLabeledInput} from './addon'
import {renderLabeledIcon} from './addon-icon'
import TextArea from './TextArea.jsx'
import './In.scss'
export default class In extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: props.val  || props.initVal || props.initValue|| props.defaultValue
        };
    }

    //定义静态属性
    static defaultProps = {
        prefixCls: 'short-input',
        type: 'text',
        disabled: false,
        dis: false,
        style: {}
    };
    //输入完成时事件,
    handleKeyDown = (e) => {

        //事件处理,键盘enter和keyDown
        const {
            onPressEnter, _en,
            onKeyDown, _kd,
        } = this.props;
        //按下enter键
        e.keyCode === 13 && onPressEnter || _en ? doit(onPressEnter || _en, e.target.value, e) : '';
        //按下键,写入前
        onKeyDown || _kd ? doit(onKeyDown || _kd, e.target.value, e) : '';
    };
    //按下键,写入后
    handleKeyUp = (e) => {
        //事件处理
        const {
            onKeyUp, _ku,
        } = this.props;
        //按下enter键
        onKeyUp || _ku ? doit(onKeyUp || _ku, e.target.value, e) : '';
    };
    //输入框变化时
    handleChange = (e) => {
        const {
            onChange, _ch,
        } = this.props;
        //输入变化
        this.setState({val: this.refs.input.value});
        //事件处理
        onChange || _ch ? doit(onChange || _ch, e.target.value, e) : '';

    };
    //输入框变化时
    handleBlur = (e) => {
        //事件处理
        const {
            onBlur, _bl,
        } = this.props;
        //事件处理
        onBlur || _bl ? doit(onBlur || _bl, e.target.value, e) : '';
    };
    handleFocus = (e) => {
        //事件处理
        const {
            onFocus, _fo,
            initValue, initVal, value
        } = this.props;
        initVal && e.target.value ? this.setState({val: ''}) : '';
        initValue || value && e.target.value ? this.refs.input.select() : '';

        //事件处理
        onFocus || _fo ? doit(onFocus || _fo, e.target.value, e) : '';
    };

    renderInput() {
        const {
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
            dis, disabled,
            small, sm,
            long, lg, big,
            placeholder, p,

            //事件
            ...others
        } = this.props;

        //第一个参数：this.props.styles，
        //第二个..
        let Styles = setStyle(style, [ss, setss]);
        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        let Classes = setClass(
            '',
            'short-input',
            className,
            [multVal(primary, blue), 'primary'],
            [multVal(small, sm), 'sm'],
            [multVal(lg, big, long), 'lg'],
            [multVal(success, succ, green), 'success'],
            [multVal(danger, red), 'danger'],
            [multVal(warning, yellow), 'warning'],
            [multVal(info), 'info'],
            [multVal(dark, black), 'dark'],
            [multVal(gray), 'gray'],
            [multVal(fill), 'fill'],
            [multVal(dis, disabled), 'disabled'],
        );
        //处理多余属性
        let surplus=['val','initVal','initValue','prefixCls','addonBefore','bt','addonAfter','at','suffix','ai','pclassName','pstyle','bi','prefix'];

        return renderLabeledIcon(
            <input
                {..._.omit(others,surplus)}
                placeholder={placeholder || p}
                className={Classes}
                style={Styles}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                disabled={disabled || dis}
                ref="input"
                defaultValue={this.state.val}
            />, this
        );
    }

    render() {
        if (this.props.type === 'textarea'||this.props.text) {
            return <TextArea {...this.props} ref="input" />;
        }
        return renderLabeledInput(this.renderInput(), this.props);

    }
}
