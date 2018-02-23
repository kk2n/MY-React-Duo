import {
    classNames,
    multVal,
    setWh,
    setBorder,
    setFf,
    setBg,
    setPzm,
    setPz,
    setDf,
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

    render() {
        const props = this.props;
        const {
            className,
            prefix = 'btn',
            primary, blue,
            success, succ, green,
            danger, red,
            warning, yellow,
            info,
            dark, black,
            gray,
            fill,
            t,//文本
            bdrs,
            height, h,
            width, w,
            fz,
            style,
            ...others
        } = props;
        //处理classddsrss
        const classes = classNames({
            [`${prefix}` + '']: true,
            [`${prefix}` + '-primary']: multVal(primary, blue),
            [`${prefix}` + '-fill']: multVal(fill),
            [`${prefix}` + '-success']: multVal(success, succ, green),
            [`${prefix}` + '-danger']: multVal(danger, red),
            [`${prefix}` + '-warning']: multVal(warning, yellow),
            [`${prefix}` + '-info']: multVal(info),
            [`${prefix}` + '-dark']: multVal(dark, black),
            [`${prefix}` + '-gray']: multVal(gray),
        }, className);


        const setStyle = {};
        //自定义字体大小
        if (fz) {
            typeof fz === "string" ? setStyle.fontSize = fz : '';
        }
        //自定义高度处理
        if (width || w) {
            typeof width === "string" ? setStyle.width = width : '';
            typeof w === "string" ? setStyle.width = w : '';
        }

        //高度处理
        if (height || h) {
            if (typeof height === "string" || typeof h === "string") {
                setStyle.height = height || h;
            }
        }
        //圆角处理
        if (bdrs) {
            typeof bdrs === "boolean" ?
                setStyle.borderRadius = "34px" :
                setStyle.borderRadius = bdrs
            ;
        }
        //处理内嵌样式
        const Styles = {
            ...setStyle,
            ...style,
        };
        return <button
            style={Styles}
            className={'short-btn ' + classes}
            {...others}
            ref="button"
        >
            {t}{this.props.children}
        </button>;
    }
}
