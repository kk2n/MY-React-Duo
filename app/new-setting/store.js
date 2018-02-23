/**
 * Created by likuan on 11/17 0017.
 */

import "../comm-util/prototype";

import ajax from "../comm-util/axios";
// ##############
// 页面执行的方法
// ##############
export const action = () => ({
    add: newObj => ({
        type: "ADD",
        payload: newObj
    }),
    edit: newObj => ({
        type: "EDIT",
        payload: newObj
    }),
    del: id => ({
        type: "DEL",
        payload: id
    }),
    pdel: id => {
        return {
            type: "PDEL",
            payload: id
        };
    },
    danxuan: e => ({
        type: "DANXUAN",
        payload: e
    }),
    quanxuan: e => ({
        type: "QUAN",
        payload: e
    }),
    kechengAdd: e => ({
        type: "KCADD",
        payload: e
    }),
    kcEdit: e => ({
        type: "KCEDIT",
        payload: e
    }),
    classroomAdd:e => ({
        type: "CLASSROOMADD",
        payload: e
    }),
    jsEdit: e => ({
        type: "JSEDIT",
        payload: e
    }),
});

// ##############
// 反应：改变数据的方法
// ##############
function myData(state = [], action) {
    let { type, payload } = action;
    switch (type) {
        case "INIT":
            let data = _.map(payload.data, a => {
                a.checked = 0;
                return a;
            });
            return [...data];
        case "ADD":
            return [payload, ..._.initial(state)];
        case "EDIT":
            _.each(
                state,
                a =>
                    parseInt(a.id) === parseInt(payload.id)
                        ? (a.name = payload.name)
                        : null
            );
            return [...state];
        case "DEL":
            return state.rejectObj({ id: parseInt(payload) });
        case "PDEL":
            return state.rejectObj({ checked: 1 });
        case "DANXUAN":
            _.each(state, a => {
                payload.ced
                    ? a.id == payload.id ? (a.checked = 1) : null
                    : a.id == payload.id ? (a.checked = 0) : null;
            });
            return state;
        case "QUAN":
            _.map(state, a => {
                a.checked = payload;
                return a;
            });
            return state;
        //课程添加
        case "KCADD":
            let kcObj = {
                id: payload.id,
                ma: payload.ma,
                name: payload.name,
                grade: payload.grade.label,
                type: payload.type,
                xuefen: payload.xuefen,
                zongfen: payload.zongfen,
                kaohe: payload.kaohe
            };
            return [kcObj, ..._.initial(state)];
        case "KCEDIT":
            _.each(state, a => {
                if(parseInt(a.id) === parseInt(payload.id)){
                    a.name = payload.name;
                    a.ma = payload.ma;
                    a.type = payload.type;
                    a.kaohe = payload.kaohe;
                    a.zongfen = payload.zongfen;
                    a.xuefen = payload.xuefen;
                }
            });
            return [...state];
             //教室添加
        case "CLASSROOMADD":
        return [{
            id: payload.id,
            name: payload.name,
            zuowei: payload.zuowei,
            type: payload.type,
            address: payload.address,
            gz: payload.gz
        }, ..._.initial(state)];
        case "JSEDIT":
            _.each(state, a => {
                if(parseInt(a.id) === parseInt(payload.id)){
                    a.name = payload.name;
                    a.zuowei = payload.zuowei;
                    a.type = payload.type;
                    a.address = payload.address;
                    a.gz = payload.gz;
                }
            });
            return [...state];
        default:
            return state;
    }
}

// ##############
// 数据
// ##############
function thData() {
    return [
        { title: "班级名称", dataIndex: "name", sort: 1 },
        { title: "年级", dataIndex: "grade" },
        { title: "学校", dataIndex: "school" },
        { title: "校区", dataIndex: "fenxiao" },
        { title: "创建时间", dataIndex: "date" }
    ];
}
//课程表格表头
export function kethData() {
    return [
        { title: "课程码", dataIndex: "ma", sort: 1 },
        { title: "课程名称", dataIndex: "name", sort: 1 },
        { title: "年级", dataIndex: "grade", sort: 1 },
        { title: "类别", dataIndex: "type" },
        { title: "考核方式", dataIndex: "kaohe" },
        { title: "总分", dataIndex: "zongfen" },
        { title: "学分", dataIndex: "xuefen" }
    ];
}
//教室表格表头
export function jsthData() {
    return [
        { title: "教室名称", dataIndex: "name", sort: 1 },
        { title: "座位数", dataIndex: "zuowei", sort: 1 },
        { title: "类型", dataIndex: "type" },
        { title: "地点", dataIndex: "address" },
        { title: "规则", dataIndex: "gz" },
    ];
}
export function taoData() {
    return [
        { title: "套餐名称", dataIndex: "name", sort: 1 },
        { title: "年级", dataIndex: "grade", sort: 1 }
    ];
}
export default { myData, thData };
