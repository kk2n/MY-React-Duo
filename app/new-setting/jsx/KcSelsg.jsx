import React from "react";
import { Bn, Space, In, Sel, Chs } from "../../comm-jsx";
import Cas from "../../comm-jsx/Cas/Cas.jsx";
import { strIsNumber } from "../../comm-util";
import ajax from "../../comm-util/axios";
export default class Selsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFrom: false,
            name: "",
            kaohe: "考试",
            type: "必修",
            xuefen: "",
            zongfen: "",
            addTaoFrom: false,
            newTao: []
        };
    }
    render() {
        let {
            selSchool,
            selGrade,
            editName,
            dao,
            typeText,
            taocanshow,
            hideAddFrom,
            taoaddshow
        } = this.props;
        return (
            <div className="sel-dd">
                当前选中：学校：{selSchool}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{selGrade && (
                    <span>年级：{selGrade}</span>
                )}
                {selGrade &&
                    (!taocanshow ? (
                        <span className="fr">
                            <Bn
                                blue
                                t={"添加" + typeText}
                                ss="ml10"
                                onClick={() => {
                                    if (!this.props.editFromShow) {
                                        hideAddFrom(true);
                                        this.setState({
                                            addFrom: true,
                                            addTaoFrom: false
                                        });
                                    } else {
                                        layer.msg("编辑未完成！");
                                    }
                                }}
                            />
                            <Bn blue t="批量导入" ss="ml 10" onClick={dao} />
                        </span>
                    ) : (
                        <span className="fr">
                            <Bn
                                blue
                                t={"添加套餐"}
                                ss="ml10"
                                onClick={() => {
                                    taoaddshow(true);
                                    ajax
                                        .get(
                                            "/courseList?all=true&sid=" +
                                                this.props.sid +
                                                "&fid=" +
                                                this.props.fid +
                                                "&gid=" +
                                                this.props.gid +
                                                "&cp=" +
                                                1
                                        )
                                        .then(res => {
                                            this.setState({
                                                addFrom: false,
                                                addTaoFrom: true,
                                                myTaoAddList: res.data.data
                                            });
                                        });
                                }}
                            />
                        </span>
                    ))}
                {this.state.addFrom && (
                    <div>
                        <Space ss="mt15" />
                        <div className="add-banji">
                            <span className="red">*</span>
                            课程名称：
                            <In
                                ss="w140"
                                onBlur={val => {
                                    this.setState({
                                        name: val
                                    });
                                }}
                            />
                            <span>
                                &nbsp;&nbsp;<span className="red">*</span>
                                课&nbsp;&nbsp;程&nbsp;&nbsp;码：<In
                                    ss="w140"
                                    ref="ma"
                                    onBlur={val => {
                                        this.setState({
                                            ma: val
                                        });
                                    }}
                                />
                            </span>
                            <span>
                                &nbsp;&nbsp;<span className="red">*</span>总分：<In
                                    ss="w80"
                                    p="数字"
                                    onBlur={val => {
                                        this.setState({
                                            zongfen: val
                                        });
                                    }}
                                />
                            </span>
                            <Space ss="mt20" />
                            <span>
                                <span className="red">*</span>
                                {typeText}类型：<Sel
                                    data={[["必修", 1], ["选修", 0]]}
                                    ss="w120"
                                    onChange={val =>
                                        this.setState({
                                            type: val
                                        })
                                    }
                                />
                            </span>
                            <span>
                                &nbsp;&nbsp;<span className="red">*</span>考核方式：<Sel
                                    data={[["考试", 1], ["其他", 0]]}
                                    ss="w120"
                                    onChange={val =>
                                        this.setState({
                                            kaohe: val
                                        })
                                    }
                                />
                            </span>
                            <span>
                                &nbsp;&nbsp;<span style={{ color: "#999" }}>
                                    (非必填)
                                </span>学分：<In
                                    ss="w80"
                                    p="数字"
                                    onBlur={val => {
                                        this.setState({
                                            xuefen: val
                                        });
                                    }}
                                />
                            </span>
                            <Space ss="mt20" />
                            <div style={{ textAlign: "center" }}>
                                {/* 提交课程添加按钮 */}
                                <Bn
                                    blue
                                    onClick={() => {
                                        if (!this.state.name) {
                                            layer.msg("请填写课程名称!");
                                        } else if (!this.state.ma) {
                                            layer.msg("请填写课程码!");
                                        } else if (!this.state.zongfen) {
                                            layer.msg("请填写总分!");
                                        } else if (
                                            !strIsNumber(this.state.zongfen)
                                        ) {
                                            layer.msg(
                                                "总分填写不正确，应该为数字！"
                                            );
                                        } else {
                                            if (
                                                this.state.xuefen ==
                                                    undefined ||
                                                this.state.xuefen == "" ||
                                                strIsNumber(this.state.xuefen)
                                            ) {
                                                this.props.addFromUp({
                                                    name: this.state.name,
                                                    ma: this.state.ma,
                                                    xuefen: this.state.xuefen,
                                                    zongfen: this.state.zongfen,
                                                    type: this.state.type,
                                                    kaohe: this.state.kaohe
                                                });
                                                this.setState({
                                                    addFrom: false
                                                });
                                            } else {
                                                layer.msg(
                                                    "学分填写不正确，应该为数字！"
                                                );
                                            }
                                        }
                                    }}
                                />
                                &nbsp;&nbsp;
                                <Bn
                                    gray
                                    t="取消"
                                    onClick={e => {
                                        this.props.hideAddFrom(false);
                                        this.setState({
                                            addFrom: false
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {this.state.addTaoFrom && (
                    <div>
                        <Space ss="mt20" />
                        科目组合：{this.state.myTaoAddList? (
                            <Chs
                                data={this.state.myTaoAddList}
                                _cl={(a, b, c, d) => {
                                    let arr = _.map(d, dd => dd.id);
                                    let hasarr = this.props.hastaoarr;
                                    if (arr.length <= 3) {
                                        if (
                                            _.indexOf(hasarr, arr.join(",")) > 0
                                        ) {
                                            let x = _.map(
                                                this.state.myTaoAddList,
                                                x => {
                                                    if (x.id == a) {
                                                        x.selected = 0;
                                                    }
                                                    return x;
                                                }
                                            );
                                            this.setState({
                                                myTaoAddList: x
                                            });
                                            layer.msg(
                                                "亲，您所选的组合已存在！"
                                            );
                                        } else {
                                            this.setState({
                                                newTao: d
                                            });
                                        }
                                    } else {
                                        let x = _.map(
                                            this.state.myTaoAddList,
                                            x => {
                                                if (x.id == a) {
                                                    x.selected = 0;
                                                }
                                                return x;
                                            }
                                        );
                                        this.setState({
                                            myTaoAddList: x
                                        });
                                        layer.msg("不能大于三个！");
                                    }
                                }}
                            />
                        ) : (
                            "暂无科目"
                        )}
                        <Bn
                            blue
                            ss="ml10"
                            onClick={e => {
                                this.state.newTao.length === 3
                                    ? layer.confirm(
                                          "您确认要提交此组合套餐吗?",
                                          () => {
                                              //找到其他
                                              let other = _.difference(
                                                  _.map(
                                                      this.state.myTaoAddList,
                                                      a => a.id
                                                  ),
                                                  _.map(
                                                      this.state.newTao,
                                                      a => a.id
                                                  )
                                              );
                                              this.props.handAddGroundUp({
                                                  zu: _.map(
                                                      this.state.newTao,
                                                      a => a.id
                                                  ),
                                                  name: _.map(
                                                      this.state.newTao,
                                                      a => a.name
                                                  ).join("+"),
                                                  other
                                              });
                                              //隐藏添加from
                                              this.setState({
                                                  addTaoFrom: false
                                              });
                                              this.props.taoaddshow(false);
                                          }
                                      )
                                    : layer.msg("您应该选择3个科目！");
                            }}
                        />
                        <Bn
                            gray
                            ss="ml10"
                            t="取消"
                            onClick={e =>
                                !+this.props.taoaddshow(false) &&
                                this.setState({
                                    addTaoFrom: false
                                })
                            }
                        />
                    </div>
                )}
            </div>
        );
    }
}
