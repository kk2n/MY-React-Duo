import React from "react";
import { connect } from "react-redux";
import { createAction } from "redux-actions";

import Tit from "./jsx/Tit.jsx";
import KcFilter from "./jsx/KcFilter.jsx";
import KcSelsg from "./jsx/KcSelsg.jsx";
import KcPiDao from "./jsx/KcPiDao.jsx";
import KcEdit from "./jsx/KcEdit.jsx";
import { getNowDate } from "../comm-util";
import { Space, Ta, Pgb } from "../comm-jsx";
import { action, kethData, taoData } from "./store";
import ajax from "../comm-util/axios";

import Edit from "./jsx/HKcEdit.jsx";
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
        selGradeObj: {value:''},
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
        jingyong:false,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        //获取表格数据（课程列表）进reduce
        dispatch(
            createAction("INIT")(
                ajax.get("/courseList?cp=1").then(
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
        if (!this.state.tao) {
            dispatch(
                createAction("INIT")(
                    ajax
                        .get(
                            "/courseList?sid=" +
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
        } else {
            //获取套餐列表
            ajax
                .get(
                    "/courseGroupData?sid=" +
                        sid +
                        "&fis=" +
                        fid +
                        "&gid=" +
                        gid +
                        "&cp=1"
                )
                .then(res => {
                    let arr = _.map(res.data.data, a => a.gid);
                    this.setState({
                        page_count: res.data.page_count,
                        taopage_count: res.data.page_count,
                        taocanList: res.data.data,
                        hastaoarr: arr
                    });
                });
        }
    };
    //选择班级事件
    gradeSel = (value, selectedOptions) => {
        let schoolArr = _.map(selectedOptions, a => a.label).join(",");
        this.setState({
            selGrade: schoolArr,
            selGradeObj: selectedOptions[0]||"",
            taocanshow: this.state.daoShow?false:true
        });
        //更新
        const { dispatch } = this.props;
        let sid = this.state.selSid;
        let fid = this.state.selFid;
        let gid = value[0];
        //获取表格数据（班级列表）进reduce
        if (!this.state.tao) {
            dispatch(
                createAction("INIT")(
                    ajax
                        .get(
                            "/courseList?sid=" +
                                sid +
                                "&fis=" +
                                fid +
                                "&gid=" +
                                gid +
                                "&cp=1"
                        )
                        .then(res => {
                            this.setState({
                                page_count: res.data.page_count,
                            });
                            return res.data;
                        })
                )
            );
        } else {
            //获取套餐列表
            ajax
                .get(
                    "/courseGroupData?sid=" +
                        sid +
                        "&fis=" +
                        fid +
                        "&gid=" +
                        gid +
                        "&cp=1"
                )
                .then(res => {
                    let arr = _.map(res.data.data, a => a.gid);
                    this.setState({
                        taopage_count: res.data.page_count,
                        taocanList: res.data.data,
                        hastaoarr: arr
                    });
                });
        }
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
                            "/courseList?sid=" +
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
    //tao分页事件
    taofenye = cp => {
        if (typeof cp === "number") {
            const { dispatch } = this.props;
            let sid = this.state.selSid;
            let fid = this.state.selFid;
            let gid = this.state.selGradeObj.value;
            //获取表格数据（班级列表）进reduce
            ajax
                .get(
                    "/courseGroupData?&sid=" +
                        sid +
                        "&fid=" +
                        fid +
                        "&gid=" +
                        gid +
                        "&cp=" +
                        cp
                )
                .then(res => {
                    let arr = _.map(res.data.data, a => a.gid);
                    this.setState({
                        taopage_count: res.data.page_count,
                        taocanList: res.data.data,
                        hastaoarr: arr
                    });
                });
        }
    };

    render() {
        let { th, td, hasClass, dispatch } = this.props;
        let { danxuan, del, pdel, quanxuan } = action();
        let mytd = _.map(td, a => {
            a.bzrObj ? (a.bzr = a.bzrObj.label) : null;
            return a;
        });
        let myth = [
            ...kethData(),
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
                                                .post("/DelCourse", { id: [id] })
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
                                data-ma={data.ma}
                                data-zongfen={data.zongfen}
                                data-xuefen={data.xuefen}
                                data-type={data.type}
                                data-kaohe={data.kaohe}
                                data-gid={data.gradeId}
                                data-sid={data.schoolId}
                                data-fid={data.fenxiaoId}
                                onClick={e => {
                                    if (!this.state.hideAddFrom) {
                                        let {
                                            id,
                                            name,
                                            ma,
                                            type,
                                            kaohe,
                                            zongfen,
                                            xuefen,
                                            gid,
                                            sid,
                                            fid
                                        } = e.target.dataset;
                                        this.editId = id;
                                        let oobj = {
                                            id,
                                            name,
                                            ma,
                                            type,
                                            kaohe,
                                            zongfen,
                                            xuefen,
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
        let taoth = [
            ...taoData(),
            ...[
                {
                    title: "操作",
                    render: data => (
                        <span>
                            <a
                                href="#"
                                data-id={data.id}
                                onClick={e => {
                                    let id = e.target.dataset.id,
                                        school = this.state.selSchoolObj,
                                        grade = this.state.selGradeObj;
                                    layer.confirm(
                                        "您确认要删除所选吗？",
                                        { icon: 3, title: "信息提示" },
                                        index => {
                                            layer.close(index);
                                            //删除套餐列表的中的一条记录
                                            ajax
                                                .post("/DelCourseGroup", {
                                                    id: id,
                                                    school: school,
                                                    grade: grade
                                                })
                                                .then(res => {
                                                    layer.msg("删除成功！");
                                                    this.setState({
                                                        taocanList: this.state.taocanList.rejectObj(
                                                            { id: parseInt(id) }
                                                        )
                                                    });
                                                });
                                        }
                                    );
                                }}
                            >
                                删除
                            </a>
                        </span>
                    )
                }
            ]
        ];
        return (
            <div>
                <Tit
                    t1="课程管理"
                    t2="对所有课程增加、修改、删除，批量导入等操作"
                    myclass="xuexiao-tit"
                />
                <div className="con-main">
                    <KcFilter
                        schoolData={this.state.schoolData}
                        gradeData={this.state.gradeData}
                        schoolSel={this.schoolSel}
                        gradeSel={this.gradeSel}
                        defschool={this.state.defschool}
                        taocanshow={this.state.taocanshow}
                        hideAddFrom={this.state.hideAddFrom}
                        editFromShow={this.state.editFromShow}
                        jingyong={this.state.jingyong}
                        taoadd={this.state.taoadd}
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
                                <KcSelsg
                                    selSchool={this.state.selSchool}
                                    selGrade={this.state.selGrade}
                                    sid={this.state.selSchoolObj.value}
                                    gid={this.state.selGradeObj.value?this.state.selGradeObj.value:""}
                                    fid={this.state.selFid}
                                    //添加课程
                                    addFromUp={obj => {
                                        obj.date = getNowDate();
                                        obj.school = this.state.selSchoolObj;
                                        obj.grade = this.state.selGradeObj;
                                        obj.sid = this.state.selSchoolObj.value;
                                        obj.gid = this.state.selGradeObj.value;
                                        obj.fid = this.state.selFid;
                                        ajax
                                            .post("/addCourse", obj)
                                            .then(res => {
                                                if (res.data.status) {
                                                    //添加的表单隐藏
                                                    this.setState({
                                                        hideAddFrom: false
                                                    });
                                                    obj.id = res.data.status;
                                                    dispatch(
                                                        action().kechengAdd(obj)
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
                                    typeText="课程"
                                    hasClass={hasClass}
                                    editName={this.state.editName}
                                    taoaddshow={
                                        e =>
                                        this.setState({
                                            taoadd: e
                                        })
                                    }
                                    //套餐操作
                                    dao={() => {
                                        this.setState({
                                            daoShow: true,
                                            taocanshow: false
                                        });
                                    }}
                                    editFromShow={this.state.editFromShow}
                                    taocanshow={this.state.tao}
                                    //套餐添加得到选取的数据
                                    hastaoarr={this.state.hastaoarr}
                                    handAddGroundUp={obj => {
                                        let x = {
                                            zu: obj.zu,
                                            sid: this.state.selSchoolObj.value,
                                            fid: this.state.selFid,
                                            gid: this.state.selGradeObj.value,
                                            name:obj.name,
                                            other:obj.other,
                                        };
                                        ajax
                                            .post("/addCourseGroup", x)
                                            .then(res => {
                                                if (res.data.status) {
                                                    layer.msg("添加成功！");
                                                    let obj={
                                                        id:res.data.status,
                                                        gid:x.zu,
                                                        name:x.name,
                                                        grade:this.state.selGradeObj.label
                                                    }
                                                    let yy=[obj,...this.state.taocanList];
                                                    this.setState({
                                                        taocanList:yy
                                                    });
                                                }else{
                                                    layer.closeAll();
                                                    layer.msg("出现错误，可能套餐存在！");
                                                }
                                            });
                                    }}
                                />
                            ) : null}
                            {this.state.editFromShow ? (
                                <Edit
                                    fromObj={this.state.editObj}
                                    handEditFromUp={obj => {
                                        obj.isEdit = true;
                                        ajax
                                            .post("/addCourse", obj)
                                            .then(res => {
                                                //返回正确时
                                                if (res.data.status) {
                                                    dispatch(
                                                        action().kcEdit(obj)
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
                            <KcPiDao
                                jingyong={e => {
                                    this.setState({
                                        jingyong: e
                                    });
                                }}
                                th={myth.slice(0, 7)}
                                hasClass={hasClass}
                                selSchcoolObj={this.state.selSchoolObj}
                                selGradeObj={this.state.selGradeObj}
                                selxiaoquObj={this.state.selFid}
                                mobanFlie="\templates\tpl_course.xlsx"
                                bak={() => {
                                    this.setState({ daoShow: false,taocanshow:true });
                                    let sid = this.state.selSid;
                                    let fid = this.state.selFid;
                                    let gid = this.state.selGradeObj.value;
                                    dispatch(
                                        createAction("INIT")(
                                            ajax
                                                .get(
                                                    "/courseList?sid=" +
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
