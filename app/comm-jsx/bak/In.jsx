import {
    classNames,
    multVal,
    doit,
    setWh,
    setBorder,
    setFf,
    setBg,
    setPzm,
    setPz,
    setDf,
} from '../comm-util/jsxTools'
import './In.scss'
/*
属性说明E
small,sm,小的，height=24
large,lg,大的，height=42
size='small'或size='sm'
size='large'或size='lg'

disabled,dis，禁用输入框

onPressEnter, _en,输入后，点击enter事件
onKeyDown, _kd,按下,写之前，键盘事件
onChange,_ch，值改变时，执行事件
onBlur,_bl, 失去焦点时，执行事件
onFocus,_fo, 获得焦点时，执行事件

val,value，初始文字s
initVal,默认值，initVal改变时会清空
initValue,默认值，initValue改变时会全选

wh,宽度和高,内间距，外间距 例如:wh={'120,,,12 0'}
bd，边和圆角,例子：bd={'#ddd 1 s,50%'}
bg 背景和背景尺寸，{背景，背景尺寸}，bg={'#fff icon.png x x,50% 50%}
ff，字体组 {字体，颜色，行高，字体居位,粗细} ff={'14,#ccc,34px,t,700'}
pzm,定位组 {定位，z-index，main间距}
pz,定位组 {定位，z-index，top right bottom left}
df,浮动和显示 {display,float} 例子：fd={d,l}

bt,前面文字
at,后面文字
bi,输入框里，前面图标
ai,输入框里，后面图标

例子：
<In bi={<Icon type="user" />} bt="ddd:" w="300" val="mysite" className="lk"/>
*/

export default class In extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: props.val || props.value || props.initVal || props.initValue
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

    //处理样式fdddssdf
    setStyle() {
        const {
            style,
            wh,
            bd,
            ff,
            bg,
            pzm,
            pz,
            df,
        } = this.props;
        wh ? setWh(wh, style) : '';
        bd ? setBorder(bd, style) : '';
        ff ? setFf(ff, style) : '';
        bg ? setBg(bg, style) : '';
        pzm ? setPzm(pzm, style) : '';
        pz ? setPz(pz, style) : '';
        df ? setDf(df, style) : '';

        return style
    };

    //处理class
    getInputClassName() {
        const {
            prefixCls,
            size,
            disabled, dis,
            small, sm,
            large, lg,
        } = this.props;

        return classNames(prefixCls, {
            [`${prefixCls}-sm`]: size === 'small' || size === 'sm' || multVal(small, sm),
            [`${prefixCls}-lg`]: size === 'large' || size === 'lg' || multVal(large, lg),
            [`${prefixCls}-dis`]: multVal(disabled, dis),
        });
    }
    //前后文本ss
    renderLabeledInput(children) {
        const props = this.props;
        if ((!props.addonBefore && !props.addonAfter && !props.bt && !props.at)) {
            return children;
        }

        const wrapperClassName = `${props.prefixCls}-group`;
        const addonClassName = `${wrapperClassName}-addon`;
        const addonBefore = props.addonBefore || props.bt ? (
            <span className={addonClassName}>
                {props.addonBefore || props.bt}
            </span>
        ) : null;

        const addonAfter = props.addonAfter || props.at ? (
            <span className={addonClassName}>
                {props.addonAfter || props.at}
            </span>
        ) : null;

        const className = classNames(`${props.prefixCls}-wrapper`, {
            [wrapperClassName]: (addonBefore || addonAfter),
        });

        // Need another wrapper for changing display:table to display:inline-block
        // and put style prop in wrapper
        if (addonBefore || addonAfter) {
            return (
                <span
                    className={`${props.prefixCls}-group-wrapper`}
                    style={props.style}
                >
                    <span className={className+' short-hasaddon'}>
                        {addonBefore}
                        {React.cloneElement(children, {style: null})}
                        {addonAfter}
                    </span>
                </span>
            );
        }
        return (
            <span className={className}>
                {addonBefore}
                {children}
                {addonAfter}
            </span>
        );
    }
    //前后图标
    renderLabeledIcon(children) {
        const {props} = this;
        if (!('prefix' in props || 'suffix' in props|| 'bi' in props|| 'ai' in props)) {
            return children;
        }

        const prefix = props.prefix||props.bi ? (
            <span className={`${props.prefixCls}-prefix`}>
                {props.prefix||props.bi}
            </span>
        ) : null;

        const suffix = props.suffix || props.ai? (
            <span className={`${props.prefixCls}-suffix`}>
                {props.suffix||props.ai}
            </span>
        ) : null;

        return (
            <span
                className={classNames(props.className, `${props.prefixCls}-affix-wrapper short-hasaddon`)}
                style={props.style}
            >
                {prefix}
                {React.cloneElement(children, {style: null, className: this.getInputClassName()})}
                {suffix}
            </span>
        );
    }

    renderInput() {
        const {
            value,
            className
        } = this.props;

        const otherProps = [
            'prefixCls',
            'onPressEnter',
            'addonBefore',
            'addonAfter',
            'prefix',
            'suffix',
        ];

        //固定值
        if ('value' in this.props) {

            //otherProps.value = fixControlledValue(value);
            // Input elements must be either controlled or uncontrolled,
            // specify either the value prop, or the defaultValue prop, but not both.
            //删除默认属性中的值
            //delete otherProps.defaultValue;
        }

        let myStyle = this.setStyle();
        let Styles = {
            ...this.props.style,
            ...myStyle,
        };
        return this.renderLabeledIcon(
            <input
                {...otherProps}
                className={classNames(this.getInputClassName(), className)}
                style={Styles}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                disabled={this.props.disabled || this.props.dis}
                value={this.state.val}
                ref="input"
            />,
        );
    }

    render() {
        if (this.props.type === 'textarea') {
            //return <TextArea {...this.props as any} ref="input" />;
        }
        return this.renderLabeledInput(this.renderInput());

    }
}
