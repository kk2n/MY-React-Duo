import React from "react";
import { Bn, Space, In, Sel } from "../../comm-jsx";
import Cas from "../../comm-jsx/Cas/Cas.jsx";
import { strIsNumber } from "../../comm-util";

export default class KcEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editObj: props.editObj
        };
    }
    editFromUp = () => {
        if (!this.state.name) {
            layer.msg("请填写班级名称!");
        } else {
            this.props.editFromUp({
                name: this.state.name
            });
        }
    };

    render() {
        return (
            <div className="sel-dd">
                {
                    <div>
                        <div className="add-banji">
                            <span className="red">*</span>
                            课程名称：
                            <In
                                ss="w140"
                                val={this.state.editObj.name}
                                onBlur={val => {
                                    this.setState((state, props) => {
                                        state.editObj.name = val;
                                        return { state };
                                    });
                                }}
                            />
                            <span>
                                &nbsp;&nbsp;<span className="red">*</span>
                                课&nbsp;&nbsp;程&nbsp;&nbsp;码：<In
                                    ss="w140"
                                    val={this.state.editObj.ma}
                                    onBlur={val => {
                                        this.setState((state, props) => {
                                            state.editObj.ma = val;
                                            return { state };
                                        });
                                    }}
                                />
                            </span>
                            <span>
                                &nbsp;&nbsp;<span className="red">*</span>总分：<In
                                    ss="w80"
                                    p="数字"
                                    defaultValue={this.state.editObj.zongfen}
                                    onBlur={val => {
                                        this.setState((state, props) => {
                                            state.editObj.zongfen = val;
                                            return { state };
                                        });
                                    }}
                                />
                            </span>
                            <Space ss="mt20" />
                            <span>
                                <span className="red">*</span>
                                课程类型：<Sel
                                    data={[
                                        [
                                            "必修",
                                            this.state.editObj.type == "必修"
                                                ? 1
                                                : 0
                                        ],
                                        [
                                            "选修",
                                            this.state.editObj.type == "选修"
                                                ? 1
                                                : 0
                                        ]
                                    ]}
                                    ss="w120"
                                    onChange={val =>
                                        this.setState((state, props) => {
                                            state.editObj.type = val;
                                            return { state };
                                        })
                                    }
                                />
                            </span>
                            <span>
                                &nbsp;&nbsp;<span className="red">*</span>考核方式：<Sel
                                    data={[
                                        [
                                            "考试",
                                            this.state.editObj.kaohe == "考试"
                                                ? 1
                                                : 0
                                        ],
                                        [
                                            "其他",
                                            this.state.editObj.kaohe == "其他"
                                                ? 1
                                                : 0
                                        ]
                                    ]}
                                    ss="w120"
                                    onChange={val =>
                                        this.setState((state, props) => {
                                            state.editObj.kaohe = val;
                                            return { state };
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
                                    val={this.state.editObj.xuefen}
                                    onBlur={val => {
                                        this.setState((state, props) => {
                                            state.editObj.xuefen = val;
                                            return { state };
                                        });
                                    }}
                                />
                            </span>
                            <Space ss="mt20" />
                            <div style={{ textAlign: "center" }}>
                                <Bn
                                    blue
                                    onClick={() => {
                                        if (!this.state.editObj.name) {
                                            layer.msg("请填写课程名称!");
                                        } else if (!this.state.editObj.ma) {
                                            layer.msg("请填写课程码!");
                                        } else if (
                                            !this.state.editObj.zongfen
                                        ) {
                                            layer.msg("请填写总分!");
                                        } else if (
                                            !strIsNumber(
                                                this.state.editObj.zongfen
                                            )
                                        ) {
                                            layer.msg(
                                                "总分填写不正确，应该为数字！"
                                            );
                                        } else {
                                            if (
                                                this.state.editObj.xuefen ==
                                                    undefined ||
                                                this.state.editObj.xuefen ==
                                                    "" ||
                                                strIsNumber(
                                                    this.state.editObj.xuefen
                                                )
                                            ) {
                                                this.props.handEditFromUp({
                                                    ...this.state.editObj
                                                });
                                                this.props.editFromShow();
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
                                        this.props.editFromShow();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
