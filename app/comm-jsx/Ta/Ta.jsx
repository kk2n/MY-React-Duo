import './Ta.scss';
import {
    setStyle,
    setClass,
    multVal,
    setss,
} from '../../comm-util/jsxTools'
import ajax from '../../comm-util/ajax';
/*
 table 组件说明
 ================================
 striped,bm,  表格是否启用斑马网  type：bool
 dark,  黑色表格样式  type：bool
 bd,是否有边框 type：bool
 hover 是否开启，鼠标移入移出效果 type：bool
 sm 小的，表格格子紧凑，type:bool
 thClassName:th的class，type:string,备选值有'thead-light'或'thead-dark',或自定义样式

 //数据
 【tdData】,表格数据，格式：
 const tdData = [
 {id:'7',name: 'Jack', age: 28, address: 'some where'},
 {id:'2',name: 'Rose', age: 36, address: 'some where'},
 {id:'2',name: 'Rose', age: 36, address: 'some where'},
 ]
 说明：id,数据唯一标示，其他<td>里面的文字，key值与title里的dataIndex一一对应

 【thData】，表头数据
 const thData = [
 {title: 'Name', dataIndex: 'name', width: 100,sort:3},
 {title: 'Age', dataIndex: 'age', width: 100},
 {title: 'Address', dataIndex: 'address',width: 200},
 {title: 'Apeartions', dataIndex: 'cao', render: (id,name) => <a href="#" data-id={id} data-name={name}>Delete</a>}
 ];
 说明：title，th里的文本，可以是组件
 dataIndex：与tdData里的数据对应,
 render：如果他存在，则，对应的td里的数据将是他的返回值。
 sort,开启排序,1：正序，2倒序，0和undefined不显示，其他：显示上下箭头,
 初始时不要等于1，或2，可以等于true或3,或其他数字。

 例子：
 <Ta bm hover
 tddata={[
 {age: 28, address: 'asome where'},
 {age: 36, address: 'bsome where'},
 {age: 36, address: 'csome where'},
 {age: 36, address: 'dsome where'},
 {age: 36, address: 'esome where'},
 {age: 36, address: 'fsome where'},
 ]}
 thdata={[
 {title: '年龄', dataIndex: 'age', width: 100},
 {title: '地址', dataIndex: 'address', width: 200, sort: 3},
 {
 title: '操作',
 dataIndex: 'address',
 render: (id, name) => <a href="#" data-id={id} data-name={name}  onClick={this.del}>Delete</a>
 }
 ]}/>


 */
import React from 'react';
export default class Ta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thData: props.thdata,
            tdData: props.tddata
        }
    }
    //直接读取json数据
    componentDidMount() {
        //处理url
        const {
            url, parm,
        } = this.props;
        if (_.isString(url)) {
            ajax({
                url: url,
                type: parm && 'POST' || 'GET',
                dataType: 'json',
                data: parm || '',
                success: data => {
                    this.setState({
                        tdData: data.data,
                    });
                }
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            thData: nextProps.thdata,
            tdData: nextProps.tddata,
        });
    }

    //定义静态属性
    static defaultProps = {
        style: {}
    };
    //排序事件
    pxFn = (e) => {
        let [index, key, sort, new_thdata, new_tddata] = [
            parseInt(e.target.dataset.i),
            e.target.dataset.key,
            parseInt(e.target.dataset.sort),
            this.state.thData,
            this.state.tdData
        ];
        new_thdata = _.map(new_thdata, (a, aa) => {
            return {
                title: a.title,
                dataIndex: a.dataIndex,
                width: a.width,
                sort: aa === index ? sort === 1 ? 2 : 1 : a.sort,
                render: a.render
            }
        });
        new_tddata = (sort === 1 || sort === 2) ? new_tddata.reverse() : _.sortBy(new_tddata, key);
        this.setState({thData: new_thdata});
        this.setState({tdData: new_tddata});
    };



    render() {
        const {
            style, className,
            striped, bm,
            dark,
            bd, border,
            hover,
            sm, small,
            lg, big, long,
            thClassName,
            ss,
            ...others
        } = this.props;
        //第一个参数：this.props.styles，
        let Styles = setStyle(
            style,
            [ss, setss],
        );
        //第一个参数：默认样式，
        //第二个参数前缀d
        //第三个参数：className
        let Classes = setClass(
            'short-table',
            'table',
            className,
            [multVal(striped, bm), 'striped'],
            [multVal(dark), 'dark'],
            [multVal(bd, border), 'bordered'],
            [multVal(hover), 'hover'],
            [multVal(sm, small), 'sm'],
            [multVal(lg, big, long), 'lg'],
        );
        //th数据转化
        // log(this.state.thData);
        // log(this.state.tdData);
        let mythData = this.state.thData;
        //td数据转化
        let mytdData = [];
        _.each(this.state.tdData, (a,aa) => {
            mytdData.push([_.map(mythData, b => {
                //处理默认值
                if (b.render) {
                    return b.render(a)
                }
                return a[b.dataIndex]
            }), a.id])
        });
        //初始状态下的排序

        //返回片段
        return <table
            className={Classes}
            {..._.omit(others,['tddata', 'thdata'])}
            style={Styles}
        >
            <thead className={thClassName}>
            <tr>{
                mythData.map((obj, index) =>
                    <th scope="col" width={obj.width} key={index}>
                        {obj.title}
                        {(obj.sort !== 0 && obj.sort !== undefined) &&
                        <i onClick={this.pxFn}
                           className={obj.sort === 1 ? 'px px-s' : obj.sort === 2 ? 'px px-x' : 'px'}
                           data-i={index} data-key={obj.dataIndex}
                           data-sort={obj.sort}/>}
                    </th>
                )
            }</tr>
            </thead>
            <tbody>{
                mytdData.map((trObj, i) =>
                    <tr key={i} data-key={trObj[1]}>{
                        trObj[0].map((obj, ii) =>
                            <td key={ii}>{obj}</td>
                        )
                    }</tr>
                )
            }
            </tbody>
        </table>;
    }
}