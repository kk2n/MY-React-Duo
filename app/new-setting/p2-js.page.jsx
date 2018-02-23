import React from "react";
import { connect } from "react-redux";
import { createAction } from "redux-actions";

import Tit from "./jsx/Tit.jsx";
import JsFilter from "./jsx/JsFilter.jsx";
import JsSelsg from "./jsx/JsSelsg.jsx";
import JsPiDao from "./jsx/JsPiDao.jsx";
import { getNowDate } from "../comm-util";
import { Space, Ta, Pgb } from "../comm-jsx";
import { action, jsthData } from "./store";
import ajax from "../comm-util/axios";

import JsEdit from "./jsx/JsHKcEdit.jsx";
//将store数据绑定到props
const data = store => ({
    td: store.myData,
    th: store.thData,
    //已存在的班级
    hasClass: []
});
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        selSchool: "",
        selGrade: "",
        selSchoolObj: {},
        selGradeObj: {},
        selSid: "",
        selFid: "",
        cbox: 0,
        taocanshow: true,
        addFrom: false,
        schoolDadata: [],
        gradeData: [],
        teachList: [],
        editName: "",
        editBzr: "",
        tao: false,
        daoShow: false,
        defschool: [],
        taocanList: [],
        hideAddFrom: false,
        editObj: {},

        page_count: 100,
        taopage_count: 100,
        hastaoarr: [],
        jingyong: false
    };

    componentDidMount() {
        const { dispatch } = this.props;
        //获取表格数据（课程列表）进reduce
        dispatch(
            createAction("INIT")(
                ajax.get("/classroomList?cp=1").then(
                    res =>
                        !+this.setState({
                            page_count: res.data.page_count
                        }) && res.data
                )
            )
        );
        //获取学校列表
        ajax.get("/schoolData").then(res => {
            let arr = _.map(res.data.data, a => ({
                label: a.label,
                value: a.value,
                children: _.map(a.children, b => ({
                    label: b.label,
                    value: b.value,
                    child: b.children
                }))
            }));
            this.setState({
                schoolData: arr,
                selSchool:
                    arr.length === 1
                        ? arr[0].label + "，" + arr[0].children[0].label
                        : "",
                gradeData:
                    arr.length === 1 && arr[0].children[0]
                        ? arr[0].children[0].child
                        : [],
                defschool:
                    arr.length === 1
                        ? [arr[0].value, arr[0].children[0].value]
                        : [],

                //已选对象
                selSchoolObj: arr.length === 1 ? arr[0] : {},
                //默认的学校和分校
                selSid: arr.length === 1 ? arr[0].value : "",
                selFid: arr.length === 1 ? arr[0].children[0].value : ""
            });
        });
    }

    //选择学校事件
    schoolSel = (value, selectedOptions) => {
        let schoolArr = _.map(selectedOptions, a => a.label).join(",");
        this.setState({
            selSchool: schoolArr,
            selSid: value[0],
            selFid: value[1],
            gradeData: selectedOptions[1] ? selectedOptions[1].child : []
        });
        //更新
        const { dispatch } = this.props;
        let sid = value[0];
        let fid = value[1];
        let gid = this.state.selGradeObj.value;
        //获取表格数据（课程列表）进reduce
        dispatch(
            createAction("INIT")(
                ajax
                    .get(
                        "/classroomList?sid=" +
                            sid +
                            "&fid=" +
                            fid +
                            "&gid=" +
                            gid +
                            "&cp=1"
                    )
                    .then(res => res.data)
            )
        );
    };
    //选择班级事件
    gradeSel = (value, selectedOptions) => {
        let schoolArr = _.map(selectedOptions, a => a.label).join(",");
        this.setState({
            selGrade: schoolArr,
            selGradeObj: selectedOptions[0]
        });
        //更新
        const { dispatch } = this.props;
        let sid = this.state.selSid;
        let fid = this.state.selFid;
        let gid = value[0];
        //获取表格数据（班级列表）进reduce
        dispatch(
            createAction("INIT")(
                ajax
                    .get(
                        "/classroomList?sid=" +
                            sid +
                            "&fis=" +
                            fid +
                            "&gid=" +
                            gid +
                            "&cp=1"
                    )
                    .then(res => {
                        this.setState({
                            page_count:res.data.page_count
                        })
                        return res.data;
                    })
            )
        );
    };

    //分页事件
    fenye = cp => {
        if (typeof cp === "number") {
            const { dispatch } = this.props;
            let sid = this.state.selSid;
            let fid = this.state.selFid;
            let gid = this.state.selGradeObj.value;
            //获取表格数据（班级列表）进reduce
            dispatch(
                createAction("INIT")(
                    ajax
                        .get(
                            "/classroomList?sid=" +
                                sid +
                                "&fid=" +
                                fid +
                                "&gid=" +
                                gid +
                                "&cp=" +
                                cp
                        )
                        .then(res => {
                            return res.data;
                        })
                )
            );
        }
    };

    render() {
        let { th, td, hasClass, dispatch } = this.props;
        let { danxuan, del, pdel, quanxuan } = action();
        let mytd = td;
        let myth = [
            ...jsthData(),
            ...[
                {
                    title: "操作",
                    render: data => (
                        <span>
                            <a
                                href="#"
                                data-id={data.id}
                                onClick={e => {
                                    let id = e.target.dataset.id;
                                    layer.confirm(
                                        "您确认要删除所选吗？",
                                        { icon: 3, title: "信息提示" },
                                        index =>
                                            ajax
                                                .post("/DelCourse", {
                                                    id: [id]
                                                })
                                                .then(res => {
                                                    dispatch(del(id));
                                                    layer.close(index);
                                                })
                                    );
                                }}
                            >
                                删除
                            </a>
                            <span>&nbsp;&nbsp;</span>
                            <a
                                href="#"
                                data-id={data.id}
                                data-name={data.name}
                                data-address={data.address}
                                data-zuowei={data.zuowei}
                                data-type={data.type}
                                data-gz={data.gz}
                                data-gid={data.gradeId}
                                data-sid={data.schoolId}
                                data-fid={data.fenxiaoId}
                                onClick={e => {
                                    if (!this.state.hideAddFrom) {
                                        let {
                                            id,
                                            name,
                                            address,
                                            type,
                                            zuowei,
                                            gz,
                                            gid,
                                            sid,
                                            fid
                                        } = e.target.dataset;
                                        this.editId = id;
                                        let oobj = {
                                            id,
                                            name,
                                            address,
                                            type,
                                            zuowei,
                                            gz,
                                            gid,
                                            sid,
                                            fid
                                        };
                                        this.setState(
                                            {
                                                editFromShow: false
                                            },
                                            () => {
                                                this.setState({
                                                    editFromShow: true,
                                                    editObj: oobj
                                                });
                                            }
                                        );
                                    } else {
                                        layer.msg("添加操作没有完成！");
                                    }
                                }}
                            >
                                编辑
                            </a>
                        </span>
                    )
                }
            ]
        ];

        return (
            <div>
                <Tit
                    t1="教室管理"
                    t2="对所有教室的管理，你可以进行增加、修改、删除，批量导入等操作"
                    myclass="xuexiao-tit"
                />
                <div className="con-main">
                    <JsFilter
                        schoolData={this.state.schoolData}
                        gradeData={this.state.gradeData}
                        schoolSel={this.schoolSel}
                        gradeSel={this.gradeSel}
                        defschool={this.state.defschool}
                        hideAddFrom={this.state.hideAddFrom}
                        editFromShow={this.state.editFromShow}
                        jingyong={this.state.jingyong}
                        showPageKecheng={e => {
                            this.setState({ tao: e });
                            if (e) {
                                //获取套餐列表
                                let sid = this.state.selSid;
                                let fid = this.state.selFid;
                                let gid = this.state.selGradeObj.value;
                                ajax
                                    .get(
                                        "/courseGroupData?&sid=" +
                                            sid +
                                            "&fid=" +
                                            fid +
                                            "&gid=" +
                                            gid +
                                            "&cp=" +
                                            1
                                    )
                                    .then(res => {
                                        let arr = _.map(
                                            res.data.data,
                                            a => a.gid
                                        );
                                        this.setState({
                                            taopage_count: res.data.page_count,
                                            taocanList: res.data.data,
                                            hastaoarr: arr
                                        });
                                    });
                            }
                        }}
                    />
                    {!this.state.daoShow ? (
                        <div>
                            {this.state.selSchool || this.state.selGrade ? (
                                <JsSelsg
                                    selSchool={this.state.selSchool}
                                    selGrade={this.state.selGrade}
                                    sid={this.state.selSchoolObj.value}
                                    gid={this.state.selGradeObj.value}
                                    fid={this.state.selFid}
                                    //添加教室
                                    addFromUp={obj => {
                                        obj.date = getNowDate();
                                        obj.school = this.state.selSchoolObj;
                                        obj.grade = this.state.selGradeObj;
                                        obj.sid = this.state.selSchoolObj.value;
                                        obj.gid = this.state.selGradeObj.value;
                                        obj.fid = this.state.selFid;
                                        ajax
                                            .post("/addClassroom", obj)
                                            .then(res => {
                                                if (res.data.status) {
                                                    //添加的表单隐藏
                                                    this.setState({
                                                        hideAddFrom: false
                                                    });
                                                    obj.id = res.data.status;
                                                    dispatch(
                                                        action().classroomAdd(
                                                            obj
                                                        )
                                                    );
                                                }
                                            });
                                    }}
                                    //添加的表单隐藏
                                    hideAddFrom={e =>
                                        this.setState({
                                            hideAddFrom: e
                                        })
                                    }
                                    typeText="教室"
                                    hasClass={hasClass}
                                    editName={this.state.editName}
                                    editFromShow={this.state.editFromShow}
                                    //套餐操作
                                    dao={() => {
                                        this.setState({
                                            daoShow: true
                                        });
                                    }}
                                />
                            ) : null}
                            {this.state.editFromShow ? (
                                <JsEdit
                                    fromObj={this.state.editObj}
                                    handEditFromUp={obj => {
                                        obj.isEdit = true;
                                        ajax
                                            .post("/addClassroom", obj)
                                            .then(res => {
                                                //返回正确时
                                                if (res.data.status) {
                                                    dispatch(
                                                        action().jsEdit(obj)
                                                    );
                                                } else {
                                                    layer.msg(
                                                        "亲，操作失败，可能名称已存在！"
                                                    );
                                                }
                                            });
                                    }}
                                    editFromShow={() => {
                                        this.setState({
                                            editFromShow: false
                                        });
                                    }}
                                />
                            ) : null}
                            <Space ss="mt15" />
                            {!this.state.tao ? (
                                <div>
                                    <Ta thdata={myth} tddata={mytd} />
                                    <Pgb
                                        zs={this.state.page_count}
                                        ps={10}
                                        onClick={cp => {
                                            this.fenye(cp);
                                        }}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Ta
                                        thdata={taoth}
                                        tddata={this.state.taocanList}
                                    />
                                    <Pgb
                                        zs={this.state.taopage_count}
                                        ps={this.state.taopage_count}
                                        onClick={cp => {
                                            this.taofenye(cp);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <JsPiDao
                                jingyong={e => {
                                    this.setState({
                                        jingyong: e
                                    });
                                }}
                                th={myth.slice(0, 5)}
                                hasClass={hasClass}
                                selSchcoolObj={this.state.selSchoolObj}
                                selGradeObj={this.state.selGradeObj}
                                selxiaoquObj={this.state.selFid}
                                mobanFlie="\templates\tpl_class.xlsx"
                                bak={() => {
                                    this.setState({
                                        daoShow: false,
                                        taocanshow: true
                                    });
                                    let sid = this.state.selSid;
                                    let fid = this.state.selFid;
                                    let gid = this.state.selGradeObj.value;
                                    dispatch(
                                        createAction("INIT")(
                                            ajax
                                                .get(
                                                    "/classroomList?sid=" +
                                                        sid +
                                                        "&fid=" +
                                                        fid +
                                                        "&gid=" +
                                                        gid +
                                                        "&cp=1"
                                                )
                                                .then(res => {
                                                    this.setState({
                                                        page_count:
                                                            res.data.page_count
                                                    });
                                                    return res.data;
                                                })
                                        )
                                    );
                                }}
                            />
                        </div>
                    )}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        );
    }
}

//高阶

//注入组件
export default connect(data)(App);

//生命周期方法都可以被分割成四个阶段：初始化、挂载阶段（mounting）、更新阶段、卸载阶段（unmounting）
// constructor(){}构造函数，在创建组件的时候调用一次
// componentWillMount(){}挂载之前调用一次。里面调用setState，本次的render函数可以看到更新后的state，只渲染一次,首次修改状态最后机会
// componentDidMount(){}挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs
// componentWillReceiveProps(nextProps){}父组件发生render的时候子组件就会调用componentWillReceiveProps
// shouldComponentUpdate(nextProps, nextState){}挂载后，每次调用setState后都调用它，判断是否重新渲染。默认返回true，可优化渲染效率，
// componentWillUpdate(nextProps, nextState){}如果返回true或者调用forceUpdate之后，componentWillUpdate会被调用
// componentDidUpdate(){}除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate。
// render()所必不可少的核心函数（其它都不是必须的）。不要在render里面修改state
// componentWillUnmount(){}组件被卸载的时候调用。一般在componentDidMount里面注册的事件需要在这里删除
