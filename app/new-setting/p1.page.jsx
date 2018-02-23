import React from "react";
import { connect } from "react-redux";
import { createAction } from "redux-actions";

import Tit from "./jsx/Tit.jsx";
import Filter from "./jsx/Filter.jsx";
import Selsg from "./jsx/Selsg.jsx";
import PiDao from "./jsx/PiDao.jsx";
import EditClass from "./jsx/EditClass.jsx";
import { getNowDate } from "../comm-util";
import { Space, Ta, Pgb } from "../comm-jsx";
import { action } from "./store";
import ajax from "../comm-util/axios";

//将store数据绑定到props
const data = store => ({
    td: store.myData,
    th: store.thData,
    //已存在的班级
    hasClass: _.map(store.myData, a => a.name)
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
        pshow: false,
        addFrom: false,

        defschool: [],

        page_count: 10,

        schoolDadata: [],
        gradeData: [],
        teachList: [],
        editName: "",
        editBzr: "",

        //导入
        daoShow: false,
        jingyong: false,
        addIsShow: false,
        editIsShow: false
    };

    componentDidMount() {
        const { dispatch } = this.props;
        //获取表格数据（班级列表）进reduce
        dispatch(
            createAction("INIT")(
                ajax.get("/classList?cp=1").then(res => {
                    this.setState({
                        page_count: res.data.page_count
                    });
                    return res.data;
                })
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
            //daoShow:false
        });
        //更新
        const { dispatch } = this.props;
        let sid = value[0];
        let fid = value[1];
        let gid = this.state.selGradeObj.value;
        //获取表格数据（班级列表）进reduce
        dispatch(
            createAction("INIT")(
                ajax
                    .get(
                        "/classList?school=" +
                            sid +
                            "&fenxiao=" +
                            fid +
                            "&grade=&cp=1"
                    )
                    .then(res => {
                        this.setState({
                            page_count: res.data.page_count
                        });
                        return res.data;
                    })
            )
        );
    };
    //选择班级事件
    gradeSel = (value, selectedOptions) => {
        let schoolArr = _.map(selectedOptions, a => a.label).join(",");
        this.setState({
            selGrade: schoolArr,
            selGradeObj: selectedOptions[0]
            //daoShow:false
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
                        "/classList?school=" +
                            sid +
                            "&fenxiao=" +
                            fid +
                            "&grade=" +
                            gid +
                            "&cp=1"
                    )
                    .then(res => {
                        this.setState({
                            page_count: res.data.page_count
                        });
                        return res.data;
                    })
            )
        );
    };
    //添加班级
    addFromUp = obj => {
        let myObj = {
            id: null,
            name: obj,
            date: getNowDate(),

            schoolObj: this.state.selSchoolObj,
            school: this.state.selSchoolObj.label,
            schoolId: this.state.selSchoolObj.value,

            fenxiaoObj: this.state.selSchoolObj.children.findObj({
                value: parseInt(this.state.selFid)
            }),
            fenxiao: this.state.selSchoolObj.children.findObj({
                value: parseInt(this.state.selFid)
            }).label,
            fenxiaoId: this.state.selFid,

            gradeObj: this.state.selGradeObj,
            grade: this.state.selGradeObj.label,
            gradeId: this.state.selGradeObj.value,

            checked: false
        };
        ajax.post("/addClass", myObj).then(res => {
            if (res.data.status) {
                this.setState({ addIsShow: false, jingyong: false });
                myObj.id = res.data.status;
                this.props.dispatch(action().add(myObj));
            } else {
                layer.msg("操作未成功！可能因为班级名称存在！");
            }
        });
    };
    //编辑班级
    editId = "";
    editGradeId = "";
    editFromUp = obj => {
        obj.id = this.editId;
        (obj.schoolObj = this.state.selSchoolObj),
            (obj.school = this.state.selSchoolObj.label),
            (obj.schoolId = this.state.selSchoolObj.value),
            (obj.fenxiaoObj = this.state.selSchoolObj.children.findObj({
                value: parseInt(this.state.selFid)
            })),
            (obj.fenxiao = this.state.selSchoolObj.children.findObj({
                value: parseInt(this.state.selFid)
            }).label),
            (obj.fenxiaoId = this.state.selFid),
            (obj.gradeObj = this.state.selGradeObj),
            (obj.grade = this.state.selGradeObj.label),
            (obj.gradeId = this.state.selGradeObj.value || this.editGradeId),
            (obj.isEdit = true);
        //名称是否存在
        let hsac = _.map(
            this.props.td.rejectObj({ id: parseInt(obj.id) }),
            a => a.name
        );
        _.some(hsac, a => a === obj.name)
            ? layer.msg("班级名称已存在，请换一个名称")
            : ajax.post("/addClass", obj).then(res => {
                  if (res.data.status) {
                      this.props.dispatch(action().edit(obj));
                      this.setState({
                          editName: "",
                          editIsShow: false,
                          jingyong: false
                      });
                  } else {
                      layer.msg("操作未成功！可能因为班级名称存在！");
                  }
              });
    };

    render() {
        let { th, td, hasClass, dispatch } = this.props;
        let { danxuan, del, pdel, quanxuan } = action();
        let mytd = _.map(td, a => {
            a.bzrObj ? (a.bzr = a.bzrObj.label) : null;
            return a;
        });

        let myth = [
            ...[
                {
                    title: (
                        <input
                            type="checkbox"
                            onClick={e =>
                                !this.setState({ pshow: e.target.checked }) &&
                                dispatch(quanxuan(e.target.checked))
                            }
                        />
                    ),
                    render: data => (
                        <input
                            type="checkbox"
                            checked={data.checked}
                            data-id={data.id}
                            onClick={e => {
                                let [id, ced] = [
                                    e.target.dataset.id,
                                    e.target.checked
                                ];
                                setTimeout(
                                    () =>
                                        td.rejectObj({ checked: 0 }).length > 0
                                            ? this.setState({ pshow: true })
                                            : this.setState({ pshow: false }),
                                    100
                                );
                                dispatch(danxuan({ id, ced }));
                            }}
                        />
                    )
                }
            ],
            ...th,
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
                                                .post("/delClass", { id: [id] })
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
                                data-gid={data.gradeId}
                                onClick={e => {
                                    if (!this.state.addIsShow) {
                                        let {
                                            id,
                                            name,
                                            gid
                                        } = e.target.dataset;
                                        this.setState({ editName: "" }, () =>
                                            this.setState({
                                                editName: name,
                                                editIsShow: true,
                                                jingyong: true
                                            })
                                        );
                                        this.editId = id;
                                        this.editGradeId = gid;
                                    } else {
                                        layer.msg("亲，添加操作没有完成！");
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
                    t1="班级管理"
                    t2="对班级进行增加、修改、删除，批量导入等操作"
                    myclass="xuexiao-tit"
                />
                <div className="con-main">
                    <Filter
                        schoolData={this.state.schoolData}
                        gradeData={this.state.gradeData}
                        schoolSel={this.schoolSel}
                        gradeSel={this.gradeSel}
                        pshow={this.state.pshow}
                        defschool={this.state.defschool}
                        jingyong={this.state.jingyong}
                        _pdel={e =>
                            layer.confirm(
                                "您确认要删除所选吗？",
                                { icon: 3, title: "信息提示" },
                                index => {
                                    layer.close(index);
                                    let idArr = _.map(
                                        td.rejectObj({ checked: 0 }),
                                        a => a.id
                                    );
                                    ajax
                                        .post("/delClass", { id: idArr })
                                        .then(res => dispatch(pdel()));
                                }
                            )
                        }
                    />
                    {!this.state.daoShow ? (
                        <div>
                            {this.state.selSchool || this.state.selGrade ? (
                                <Selsg
                                    selSchool={this.state.selSchool}
                                    selGrade={this.state.selGrade}
                                    addFrom={this.state.addFrom}
                                    bzrList={this.state.teachList}
                                    addFromUp={this.addFromUp}
                                    typeText="班级"
                                    hasClass={hasClass}
                                    dao={() => this.setState({ daoShow: true })}
                                    editName={this.state.editName}
                                    editBzr={this.state.editBzr}
                                    addIsShow={e => {
                                        this.setState({
                                            addIsShow: e,
                                            jingyong: e
                                        });
                                    }}
                                    editIsShow={this.state.editIsShow}
                                />
                            ) : null}
                            {this.state.editName ? (
                                <EditClass
                                    bzrList={this.state.teachList}
                                    editFromUp={this.editFromUp}
                                    editName={this.state.editName}
                                    editBzr={this.state.editBzr}
                                    hideeditFrom={() =>
                                        this.setState({
                                            editName: "",
                                            editIsShow: false,
                                            jingyong: false
                                        })
                                    }
                                />
                            ) : null}
                            <Space ss="mt15" />
                            <Ta thdata={myth} tddata={mytd} />
                            <Pgb
                                zs={this.state.page_count}
                                ps={10}
                                onClick={cp => {
                                    if (typeof cp === "number") {
                                        let sid = this.state.selSid;
                                        let fid = this.state.selFid;
                                        let gid = this.state.selGradeObj.value;
                                        dispatch(
                                            createAction("INIT")(
                                                ajax
                                                    .get(
                                                        "/classList?school=" +
                                                            sid +
                                                            "&fenxiao=" +
                                                            fid +
                                                            "&grade=" +
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
                                }}
                            />
                        </div>
                    ) : (
                        <div>
                            <PiDao
                                jingyong={e => {
                                    this.setState({
                                        jingyong: e
                                    });
                                }}
                                th={th.slice(0, 3)}
                                hasClass={hasClass}
                                selSchcoolObj={this.state.selSchoolObj}
                                selGradeObj={this.state.selGradeObj}
                                selxiaoquObj={this.state.selFid}
                                mobanFlie="\templates\tpl_class.xlsx"
                                bak={() => {
                                    this.setState({ daoShow: false });
                                    let sid = this.state.selSid;
                                    let fid = this.state.selFid;
                                    let gid = this.state.selGradeObj.value;
                                    dispatch(
                                        createAction("INIT")(
                                            ajax
                                                .get(
                                                    "/classList?school=" +
                                                        sid +
                                                        "&fenxiao=" +
                                                        fid +
                                                        "&grade=" +
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
