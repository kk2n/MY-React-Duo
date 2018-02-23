import React from 'react';
import './Pgb.scss';
import paginator from "./paginator";
import Page from "./Page";
import {
    classNames,
    setStyle,
    setClass,
    multVal,
    setss,
    doit,
} from '../../comm-util/jsxTools'

/*
 分页组件说明=
 ================================
 total, zs,//总数 类型：数字
 pageSize, ps,//每页个数，默认每页显示25条   类型：数字
 pageShow, pw,//显示的页数，分页里li的个数//默认10个   类型：数字


 prevPageText: "上页",  类型：string
 firstPageText: "首页",类型：string
 nextPageText: "下页",类型：string
 lastPageText: "尾页",类型：string

 itemClass: 'page-item',//分页组件里li的样式 类型：string
 linkClass: 'page-link',//分页组件里li>a的样式 类型：string
 activeLinkClass: 'active'//分页组件里当前高亮的li>a的样式 类型：string

 sm，small 小的 类型：bool,可以是单值
 lg,big,long 大的 类型：bool,可以是单值

 //事件 类型func，
 initFn，初始化事件，返回参数为当前页码
 onChang,_ch，点击分页后的事件，返回参数为当前页码


 //例子
 <Pgb zs={100} ps={10} pw={5}/>
 <Pgb ss={'pt20'} zs="300" initFn={(x)=>log(x)} />
 * */


export default class Pgb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || props.cp || 1
        };
    }

    //定义静态属性
    static defaultProps = {
        style: {},

        prevPageText: "上页",
        firstPageText: "首页",
        nextPageText: "下页",
        lastPageText: "尾页",
        itemClass: 'page-item',
        linkClass: 'page-link',
        activeLinkClass: 'active'
    };

    //初始加载执行的事件
    componentDidMount() {
        //this.props.initfn(this.state.current)
    }

    onChange = (page) => {
        this.setState({
            current: page,
        });
        const {
            onChange, _ch,
            onClick,_cl
        } = this.props;
        //事件处理
        onChange || _ch ? doit(onChange || _ch, page) : '';
        onClick || _cl ? doit(onClick || _cl, page) : '';
    };

    buildPages() {
        const pages = [];
        const {
            total, zs,//总数
            pageSize, ps,//每页个数，默认每页显示25条
            pageShow, pw,//显示的页数，分页里li的个数//默认10个

            prevPageText,
            nextPageText,
            firstPageText,
            lastPageText,
            activeClass,
            itemClass,
            activeLinkClass,
            disabledClass,
            hideDisabled,
            hideNavigation,
            linkClass,
            linkClassFirst,
            linkClassPrev,
            linkClassNext,
            linkClassLast
        } = this.props;
        let current = this.state.current;
        const paginationInfo = new paginator(pageSize || ps, pageShow || pw).build(total || zs, current);
        for (let i = paginationInfo.first_page; i <= paginationInfo.last_page; i++) {
            pages.push(
                <Page
                    isActive={i === current}
                    key={i}
                    pageNumber={i}
                    pageText={i + ""}
                    onClick={this.onChange}
                    itemClass={itemClass}
                    linkClass={linkClass}
                    activeClass={activeClass}
                    activeLinkClass={activeLinkClass}
                />
            );
        }
        ((hideDisabled && !paginationInfo.has_previous_page) || hideNavigation) || pages.unshift(
            <Page
                key={"prev" + paginationInfo.previous_page}
                pageNumber={paginationInfo.previous_page}
                onClick={this.onChange}
                pageText={prevPageText}
                isDisabled={!paginationInfo.has_previous_page}
                itemClass={itemClass}
                linkClass={classNames(linkClass, linkClassPrev)}
                disabledClass={disabledClass}
            />
        );
        ((hideDisabled && !paginationInfo.has_previous_page) || hideNavigation) || pages.unshift(
            <Page
                key={"first"}
                pageNumber={1}
                onClick={this.onChange}
                pageText={firstPageText}
                isDisabled={!paginationInfo.has_previous_page}
                itemClass={itemClass}
                linkClass={classNames(linkClass, linkClassFirst)}
                disabledClass={disabledClass}
            />
        );
        ((hideDisabled && !paginationInfo.has_next_page) || hideNavigation) || pages.push(
            <Page
                key={"next" + paginationInfo.next_page}
                pageNumber={paginationInfo.next_page}
                onClick={this.onChange}
                pageText={nextPageText}
                isDisabled={!paginationInfo.has_next_page}
                itemClass={itemClass}
                linkClass={classNames(linkClass, linkClassNext)}
                disabledClass={disabledClass}
            />
        );
        ((hideDisabled && !paginationInfo.has_next_page) || hideNavigation) || pages.push(
            <Page
                key={"last"}
                pageNumber={paginationInfo.total_pages}
                onClick={this.onChange}
                pageText={lastPageText}
                isDisabled={paginationInfo.current_page === paginationInfo.total_pages}
                itemClass={itemClass}
                linkClass={classNames(linkClass, linkClassLast)}
                disabledClass={disabledClass}
            />
        );

        return pages;
    }
    render() {
        const {
            style,
            className,
            small, sm,
            long, lg, big,
            ss,
            ...others
        } = this.props;
        //第一个参数：this.props.styles，
        //第二个..
        let Styles = setStyle(
            style,
            [ss, setss],
        );

        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        //
        let Classes = setClass(
            'short-pg',
            'pagination',
            className,
            [multVal(lg, big, long), 'lg'],
            [multVal(small, sm), 'sm'],
        );
        _.each(others, (a, aa) => {
            aa === 'pageSize' ||
            aa === 'ps' ||
            aa === 'pageShow' ||
            aa === 'pw' ||
            aa === 'prevPageText' ||
            aa === 'firstPageText' ||
            aa === 'nextPageText' ||
            aa === 'lastPageText' ||
            aa === 'itemClass' ||
            aa === 'linkClass' ||
            aa === 'activeLinkClass' ||
            aa === 'zs' ||
            aa === 'total'
                ? delete others[aa] : ''
        });

        const pages = this.buildPages();
        return (
            <ul className={Classes} style={Styles} {...others}>{pages}</ul>
        );
    }
}