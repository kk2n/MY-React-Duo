/*================
 grid组件值Ro
 说明：
 type,
 justify,
 align,
 默认值，基本不用

 flex，将组件设置为flex，
 下面的：
     start,//水平：左
     center,//水平：中
     end,//水平：右
     around,//水平：平均分布
     between,//水平：两端分布
     top,//垂直
     middle,//垂直
     bottom,//垂直
 依耐flex，只有先设置了flex，上面的值才有效

 gutter,g,//网格间隙

 ==================*/
import {classNames,multVal} from '../../comm-util/classNames'
export default class Ro extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            className,
            type,
            justify,
            align,

            flex,f,
            start,s,//水平：左
            center,c,//水平：中
            end,e,//水平：右
            around,aa,//水平：平均分布
            between,bb,//水平：两端分布
            top,t,//垂直
            middle,m,//垂直
            bottom,b,//垂直

            gutter,g,//网格间隙
            style,
            children,
            prefixCls = 'row',
            justifyContent = 'justify-content',
            alignSelf = 'align-items',
            ...other
        } = this.props;

        //处理class
        const classes = classNames('short-row',{
            [`${prefixCls}`]: multVal(flex,f),
            [`${justifyContent}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align,
            //单值，水平
            [`${justifyContent}-start`]: multVal(start,s),
            [`${justifyContent}-center`]: multVal(center,c),
            [`${justifyContent}-end`]: multVal(end,e),
            [`${justifyContent}-around`]: multVal(around,aa),
            [`${justifyContent}-between`]: multVal(between,bb),
            //单值，垂直
            [`${alignSelf}-start`]: multVal(top,t),
            [`${alignSelf}-center`]: multVal(middle,m),
            [`${alignSelf}-end`]: multVal(bottom,b),
        }, className);

        //处理内嵌样式
        let gu=Number(gutter)|| Number(g);
        const rowStyle = gu > 0 ? {
            marginLeft: gu / -2,
            marginRight: gu / -2,
            ...style,
        } : style;

        //处理chirlren
        const cols = React.Children.map(children, (col) => {
            if (!col) {
                return null;
            }
            if (col.props && gu > 0) {
                return React.cloneElement(col, {
                    style: {
                        paddingLeft: gu / 2,
                        paddingRight: gu / 2,
                        ...col.props.style,
                    }
                });
            }
            return col;
        });
        return (<div {...other} className={classes} style={rowStyle}>{cols}</div>);
    }
}
