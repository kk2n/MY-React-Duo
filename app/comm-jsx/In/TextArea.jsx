import React from 'react';
import {
    multVal,
    doit,
    setStyle,
    setClass,
    setss,
} from '../../comm-util/jsxTools'
import calculateNodeHeight from './calculateNodeHeight';

//自动高度，延时变化时重绘窗口
function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
//清除，延时变化时重绘窗口
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaStyles: null,
            val: props.val || props.value || props.initVal || props.initValue
        };
    }

    static defaultProps = {
        style: {}
    };
    //组件渲染完成后，
    componentDidMount() {
        this.resizeTextarea();
    }

    //当组件的属性发生变化时，此次是判单value发生改变时，执行重绘界面的任务。
    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            if (this.nextFrameActionId) {
                clearNextFrameAction(this.nextFrameActionId);
            }
            this.nextFrameActionId = onNextFrame(this.resizeTextarea);
        }
    }

    //高度变化方法
    resizeTextarea = () => {
        const {
            autosize, auto
        } = this.props;
        if (!(autosize || auto) || !this.textAreaRef) {
            return;
        }
        const minRows = (autosize && autosize.minRows) || (auto && auto.split(',').length > 0 && auto.split(',')[0]) || null;
        const maxRows = (autosize && autosize.maxRows) || (auto && auto.split(',').length > 0 && auto.split(',')[1]) || null;
        const textareaStyles = calculateNodeHeight(this.textAreaRef, false, false, minRows, maxRows);
        this.setState({textareaStyles});
    };
    //事件，值改变时
    handleChange = (e) => {
        this.resizeTextarea();
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
        initValue || value && e.target.value ? this.textAreaRef.select() : '';

        //事件处理
        onFocus || _fo ? doit(onFocus || _fo, e.target.value, e) : '';
    };
    //给this，添加一个新的属性textAreaRef，值指向标签，然后再将它赋给标签的ref
    saveTextAreaRef = (textArea) => {
        this.textAreaRef = textArea
    };
    render() {
        const {
            style,
            ss,
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


            value,
            ...others
        } = this.props;


        //第一个参数：this.props.styles，
        //第二个..
        let Styles = setStyle(style, [ss, setss]);
        const comStyle = {
            ...Styles,
            ...this.state.textareaStyles,
        };
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
        return (
            <textarea
                value={ this.state.val }
                placeholder={placeholder || p}
                disabled={disabled || dis}
                {..._.omit(others, ['prefixCls', 'autosize', 'auto'])}
                className={Classes}
                style={comStyle}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={this.saveTextAreaRef}
            />
        );
    }
}
