/*================
 grid组件之Co
 -----------------------
 span 网格，1-24的数字,如：{12}，或者{'auto'}
 order 排序,

 等宽多行
 创建跨多个行的等宽列，方法是插入<div class="w-100"></div>要将列分解为新行的位置
 <div class="row">
 <div class="col">col</div>
 <div class="col">col</div>
 <div class="w-100"></div>
 <div class="col">col</div>
 <div class="col">col</div>
 </div>
 ==================*/
import { classNames, multVal } from '../../comm-util/classNames'
export default class Co extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        const {
            order,
            offset,
            push,
            pull,

            col, g, span,//网格数
            //size
            sm, md, lg, xl,
            //远离兄弟标签，在flex下有用
            ml,
            mr,
            mlsm,
            mlmd,
            mllg,
            mlxl,
            mrsm,
            mrmd,
            mrlg,
            mrxl,
            //偏移
            off,
            offsm,
            offmd,
            offlg,
            offxl,

            //配合row组件，单独设置垂直位置
            start, s,
            center, c,
            end, e,

            className,
            children,
            prefixCls = 'col',
            ...others
        } = props;
        //响应式样式
        let sizeClassObj = {
            [`${prefixCls}-sm-${sm}`]: sm !== undefined && sm !== true,
            [`${prefixCls}-sm`]: sm === true,
            [`${prefixCls}-md-${md}`]: md !== undefined && md !== true,
            [`${prefixCls}-md`]: md === true,
            [`${prefixCls}-lg-${lg}`]: lg !== undefined && lg !== true,
            [`${prefixCls}-lg`]: lg === true,
            [`${prefixCls}-xl-${xl}`]: xl !== undefined && xl !== true,
            [`${prefixCls}-xl`]: xl === true,

            //都不存在添加col
            [`${prefixCls}`]: span === undefined
            && col === undefined
            && sm === undefined
            && md === undefined
            && lg === undefined
            && xl === undefined
            && g === undefined,
        };
        //偏移
        let offClassObj = {
            [`offset-${off}`]: off !== undefined && off !== true,
            [`offset-sm-${offsm}`]: offsm !== undefined && offsm !== true,
            [`offset-md-${offmd}`]: offmd !== undefined && offmd !== true,
            [`offset-lg-${offlg}`]: offlg !== undefined && offlg !== true,
            [`offset-xl-${offxl}`]: offxl !== undefined && offxl !== true,
        };
        //自动远离兄弟标签
        let marginAutoClassObj = {
            [`ml-auto`]: ml !== undefined,
            [`mr-auto`]: mr !== undefined,
            [`ml-sm-auto`]: mlsm !== undefined,
            [`ml-md-auto`]: mlmd !== undefined,
            [`ml-lg-auto`]: mllg !== undefined,
            [`ml-xl-auto`]: mlxl !== undefined,
            [`mr-sm-auto`]: mrsm !== undefined,
            [`mr-md-auto`]: mrmd !== undefined,
            [`mr-lg-auto`]: mrlg !== undefined,
            [`mr-xl-auto`]: mrxl !== undefined,
        };
        //处理class
        const classes = classNames({
            //默认
            [`${prefixCls}-${span}`]: span !== undefined && span !== true,
            [`${prefixCls}`]: span === true,
            [`${prefixCls}-${col}`]: col !== undefined && xl !== true,
            [`${prefixCls}`]: col === true,
            [`${prefixCls}-${g}`]: g !== undefined && xl !== true,
            [`${prefixCls}`]: g === true,

            [`${prefixCls}-order-${order}`]: order,
            [`${prefixCls}-push-${push}`]: push,
            [`${prefixCls}-pull-${pull}`]: pull,

            [`align-self-start`]: multVal(start, s),
            [`align-self-center`]: multVal(center, c),
            [`align-self-end`]: multVal(end, e),
        }, className, sizeClassObj, offClassObj, marginAutoClassObj);
        return <div {...others} className={'short-col ' + classes}>{children}</div>;
    }
}
