import React from 'react';
import 'rc-pagination/assets/index.css';
import './Pg.scss';
import Pagination from 'rc-pagination';
import {
    setStyle,
    setClass,
    setss,
} from '../../comm-util/jsxTools'

/*
分页组件说明
defaultCurrent，默认当前页
current，当前页
itemRender，上一页和下一页，的文字
onChange，分页改变时，回调事件
showLessItems，页面显示多或少，默认，多个
showTotal，显示总数条
pageSize，每页显示个数
total，总数

parameter               description	type	default
--------------------------------------------------------==
defaultCurrent          不受控制的当前页面   	Number	1
current	                当前页面             Number	undefined
total	                总数              	Number	0
defaultPageSize	        默认每页数量	        Number	10
pageSize	            每页数	            Number	10
onChange	            页面改变回调          	Function(current, pageSize)	-
showSizeChanger	        显示每页显示条数的下拉框 show pageSize changer	Bool	false
pageSizeOptions	        条数控制下拉框的值   	Array	['10', '20', '30', '40']
onShowSizeChange	    改变条数控制下拉框后的回调   pageSize change callback	Function(current, size)	-
showQuickJumper	        显示快速跳转到         show quick goto jumper	Bool / Object	false / {goButton: true}
showTotal	            显示总条数的个数        show total records and range	Function(total, [from, to])	-
className	            clas名称              className of pagination	String	-
simple	                简单的     when set, show simple pager	Object	null
locale	                语言       to set l10n config	Object	zh_CN
style	                样式          the style of pagination	Object	{}
showLessItems	        显示更小更少的     show less page items	Bool	false
showTitle	            显示标题提示       show page items title	Bool	true
itemRender	            当前页或上页下页的显示样子   custom page item renderer	Function(current, type: 'page'	'prev'
* */
export default class Pg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || props.cp || 1
        }
    }

    //定义静态属性
    static defaultProps = {
        style: {},
        showTotal: true,
        showLessItems: true,
        onChange: function () {
        },
        //初始化执行函数
        initFn: function (x) {}
    };

    //初始加载执行的事件
    componentDidMount() {
        this.props.initFn(this.state.current)
    }

    onChange = (page) => {
        //console.log(page);
        this.setState({
            current: page,
        });
    };

    render() {
        const {
            style,
            className,
            total, zs,
            pageSize, ps,
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
        );


        //上一页和下一页
        const textItemRender = (current, type, element) => {
            if (type === 'prev') {
                return '上一页';
            }
            if (type === 'next') {
                return '下一页';
            }
            return element;
        };
        return <Pagination
            {...others}
            className={Classes}
            style={Styles}
            total={total || zs}
            defaultCurrent={1}
            current={this.state.current}
            itemRender={textItemRender}
            onChange={this.onChange}
            //showLessItems={0}
            showTitle={false}
            showTotal={(total, range) => `当前显示${range[0]}-${range[1]}数据，共${total}数据`}
            pageSize={pageSize || ps || 10}
        />;
    }
}
