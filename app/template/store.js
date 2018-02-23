/**
 * Created by likuan on 11/17 0017.
 */

import '../comm-util/prototype'
// ##############
// 页面执行的方法
// ##############
const action = () => ({
    add: newObj => ({
        type: 'ADD',
        payload: newObj
    }),
    del: id => ({
        type: 'DEL',
        payload: id
    })
});

// ##############
// 反应：改变数据的方法
// ##############
function myData(state = [], action) {
    let {type, payload} = action;
    switch (type) {
        case 'INIT':
            return [...payload.data];
        case 'ADD':
            let obj = {
                date: payload.date,
                email: "y.wylrqc@lgsti.no",
                grade: payload.grade.name,
                id: 10,
                name: payload.name,
                sex: payload.sex.name,
            };
            return [...state,obj];
        case 'DEL':
            return state.rejectObj({id: payload.target.dataset.id});
        default:
            return state
    }
}

// ##############
// 数据
// ##############
function thData() {
    return [
        {title: '姓名', dataIndex: 'name', sort: 1},
        {title: '出生日期', dataIndex: 'date'},
        {title: '性别', dataIndex: 'sex'},
        {title: 'email', dataIndex: 'email'},
        {title: 'grade', dataIndex: 'grade'},
    ]
}

export default {myData, thData, action}