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
            hideAddFrom
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
                                ss="ml 10"
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
                    ) : null)}
                {this.state.addFrom && (
                    <div>
                        <Space ss="mt15" />
                        <div className="add-banji">
                            <span className="red">*</span>
                            教室名称：
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
                                教室地点：<In
                                    ss="w180"
                                    ref="ma"
                                    onBlur={val => {
                                        this.setState({
                                            address: val
                                        });
                                    }}
                                />
                            </span>
                            <Space ss="mt20" />
                            <span>
                                <span className="red">*</span>
                                {typeText}类型：<Sel
                                    data={[["行政班", 1], ["教学班", 0]]}
                                    ss="w120"
                                    onChange={val =>
                                        this.setState({
                                            type: val
                                        })
                                    }
                                />
                            </span>
                            <span>
                                &nbsp;&nbsp;<span className="red">*</span>座&nbsp;&nbsp;位&nbsp;&nbsp;数：<In
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
                                &nbsp;&nbsp;<span style={{ color: "#999" }}></span>教室守则：<In
                                    ss="w350"
                                    p="填写教室守则"
                                    onBlur={val => {
                                        this.setState({
                                            gz: val
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
                                            layer.msg("请填写教室名称!");
                                        }else if (!this.state.address) {
                                            layer.msg("请填写教室位置!");
                                        }else if (!this.state.zongfen) {
                                            layer.msg("请填写座位数!");
                                        } else if (
                                            !strIsNumber(this.state.zongfen)
                                        ) {
                                            layer.msg(
                                                "座位数填写不正确，应该为数字！"
                                            );
                                        } else {
                                            this.props.addFromUp({
                                                name: this.state.name,
                                                zuowei: this.state.zongfen,
                                                address:this.state.address,
                                                type: this.state.type,
                                                gz: this.state.gz,
                                            });
                                            this.setState({
                                                addFrom: false
                                            });
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
                        科目组合：<Chs
                            data={this.state.myTaoAddList}
                            _cl={(a, b, c, d) => {
                                let arr = _.map(d, dd => dd.id);
                                let hasarr = this.props.hastaoarr;
                                if (arr.length <= 3) {
                                    if (_.indexOf(hasarr, arr.join(",")) > 0) {
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
                                        layer.msg("亲，您所选的组合已存在！");
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
                        <Bn
                            blue
                            ss="ml10"
                            onClick={e => {
                                this.state.newTao.length === 3
                                    ? layer.confirm(
                                          "您确认要提交此组合套餐吗?",
                                          () => {
                                              this.props.handAddGroundUp({
                                                  zu: _.map(
                                                      this.state.newTao,
                                                      a => a.id
                                                  ),
                                                  name: _.map(
                                                      this.state.newTao,
                                                      a => a.name
                                                  ).join('+')
                                              });
                                              //隐藏添加from
                                              this.setState({
                                                  addTaoFrom: false
                                              });
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
