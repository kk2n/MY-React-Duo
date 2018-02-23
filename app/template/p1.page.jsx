import React from 'react';
import {connect} from 'react-redux';
import {createAction} from 'redux-actions'

import Input from '../comm-jsx/Input'
import Button from '../comm-jsx/Button'

//将store数据绑定到props
const data = store => ({
    td: store.myData,
    th: store.thData,
    del: store.action.del,
    add: store.action.add
});

class App extends React.Component {
    constructor(props, context) {
        super(props);
    }

    //异步获取数据
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(createAction('INIT')(
            fetch('http://192.168.1.57:8888/demo')
                .then(res => res.json())
                .catch(function (e) {
                    console.log("Oops, error");
                })
        ));
    }

    //渲染DOM
    render() {
        //数据
        let {
            th,
            td,
            dispatch,
            del,
        } = this.props;
        //添加修改动作
        let myth = [
            ...th,
            ...[{
                title: '操作',
                render: id =>
                    <span>
                        <a href="#" data-id={id} onClick={(e) => dispatch(del(e))}>Delete</a>
                        <span>&nbsp;&nbsp;</span>
                        <a href="#" data-id={id} onClick={dispatch}>edit</a>
                    </span>
            }]
        ];


        const schoolDadata = [
            {
                label: '上海闵行三中',
                value: '1',
                children: [{
                    label: '梅陇分校',
                    value: '1-1',

                },{
                    label: '七宝分校',
                    value: '1-2',

                }],
            }, {
                label: '明强国际高中',
                value: '2',
                children: [{
                    label: '主校区',
                    value: '2-1',
                }],
            }, {
                label: '无锡天一中学',
                value: '3',
                children: [{
                    label: '惠山分校',
                    value: '3-1',
                },{
                    label: '锡山校区',
                    value: '3-2',
                }],
            }
        ];
        //返回代码片段
        return (
            <div style={{padding:'30px'}}>
             <Input placeholder='123123' ss="w300" id="dd" name="kk"/><Button blue/>
            </div>
        )
    }
}
//注入组件
export default connect(data)(App)


//生命周期方法都可以被分割成四个阶段：初始化、挂载阶段（mounting）、更新阶段、卸载阶段（unmounting）
// constructor(){}构造函数，在创建组件的时候调用一次
// componentWillMount(){}挂载之前调用一次。里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次,首次修改状态最后的机会
// componentDidMount(){}挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs
// componentWillReceiveProps(nextProps){}父组件发生render的时候子组件就会调用componentWillReceiveProps
// shouldComponentUpdate(nextProps, nextState){}挂载后，每次调用setState后都会调用它，判断是否重新渲染。默认返回true，判断得当可优化渲染效率，
// componentWillUpdate(nextProps, nextState){}shouldComponentUpdate返回true或者调用forceUpdate之后，componentWillUpdate会被调用
// componentDidUpdate(){}除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate。
// render()所必不可少的核心函数（其它都不是必须的）。不要在render里面修改state
// componentWillUnmount(){}组件被卸载的时候调用。一般在componentDidMount里面注册的事件需要在这里删除