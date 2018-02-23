import React from 'react';
import {
    multVal,
    doit,
    setStyle,
    setClass,
    setss,
    onlyId,
} from '../../comm-util/jsxTools'
//处理前后缀文本
import {renderLabeledInput} from '../In/addon'
//处理前后后缀，输入框内部，例如：图标
import {renderLabeledIcon} from '../In/addon-icon'

import '../In/In.scss'
import './theme/default/laydate.css'
import './Di.scss'
import laydate from './laydate'
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

 =============================================

 【year】type:bool,时间选择，只选择年份
 【month】,type:bool,时间选择，只选择月份
 【time】,type:bool,时间选择，只选择时间
 【datetime】,type:bool  日期时间选择器,可选择：年、月、日、时、分、秒
 【range】,type:bool,   范围选择，<Di range/>或 <Di range="~" />'~' 来自定义分割字符
 【value】,type:string  值如果是范围的话，请注意格式
 【theme】,theme的可选值有：default（默认简约）、molv（墨绿背景）、#颜色值（自定义颜色背景）、grid（格子主题）
 【calendar】,是否显示公历节日

 【min和max】
 1. 如果值为字符类型，则：年月日必须用 -（中划线）分割、时分秒必须用 :（半角冒号）号分割。这里并非遵循 format 设定的格式
 2.	如果值为整数类型，且数字＜86400000，则数字代表天数，如：min: -7，即代表最小日期在7天前，正数代表若干天后
 3.	如果值为整数类型，且数字 ≥ 86400000

 min: '2017-1-1',
 max: '2017-12-31'

 min: -7, //7天前
 max: 7 //7天后




 例子：
 <In bi={<Icon type="user" />} bt="ddd:" w="300" val="mysite" className="lk"/>
 */

export default class Di extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: props.val || props.value || props.initVal || props.initValue,
        };
    }

    //定义静态属性
    static defaultProps = {
        prefixCls: 'short-input',
        type: 'text',
        dis: false,
        disabled: false,
        style: {}
    };

    //组件已经插入到真实的dom节点中
    componentDidMount() {
        let {
            year,
            month,
            time,
            datetime,
            range,
            value,
            theme,
            calendar,
            min,
            max,
            onChange,
            _ch
        } = this.props;

        if (min && max) {
            obj.min = min;
            obj.max = max;
        }
        laydate.render({
            elem: this.refs.input,
            type: year ? 'year' :
                month ? 'month' :
                    time ? 'time' :
                        datetime ? 'datetime' :
                            'date',
            range: range,
            value: value,
            theme: theme,
            calendar: calendar,
            done:(value, date, endDate)=>{
                //事件处理
                this.setState({val: value});
                onChange || _ch ? doit(onChange || _ch, value, date,endDate) : '';
            }
        });
    }

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
            value, val,
            initVal, initValue
        } = this.props;
        //输入变化
        val || value || initVal || initValue ? this.setState({val: e.target.value}) : '';
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
            //样式
            style, ss,
            //classes
            className,
            primary, blue,
            success, succ, green,
            danger, red,
            warning, yellow,
            info,
            dark, black,
            gray,
            fill,
            dis,
            disabled,
            small, sm,
            long, lg, big,
            id,

            p, placeholder,
            //事件
            ...others
        } = this.props;

        //处理多余属性
        let surplus = ['val', 'initVal', 'initValue', 'prefixCls', 'addonBefore', 'bt', 'addonAfter', 'at', 'suffix', 'ai', 'pclassName', 'pstyle', 'bi', 'prefix'];
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

        return renderLabeledIcon(
            <input
                {..._.omit(others, surplus)}
                placeholder={placeholder || p}
                type='text'
                className={Classes}
                style={Styles}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                disabled={disabled || dis}
                value={this.state.val}
                ref="input"
            />, this
        );
    }

    render() {
        return renderLabeledInput(this.renderInput(), this.props);

    }
}
