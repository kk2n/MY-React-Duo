import React, { Component } from "react";
import { Bn, Space, In, Sel } from "../../comm-jsx";
import Cas from "../../comm-jsx/Cas/Cas.jsx";
import { strIsNumber } from "../../comm-util";
import handChange from "../../comm-zsq/handChange.jsx";
import style from "../../comm-zsq/style.jsx";

@handChange
export default class Edit extends Component {
    render() {
        return (
            <div className="sel-dd">
                <div>
                    <div className="add-banji">
                        <span className="red">*</span>
                        课程名称：
                        <In
                            ss="w140"
                            val={this.props.fromObj.name}
                            {...this.props.handChange("name")}
                        />
                        <span>
                            &nbsp;&nbsp;<span className="red">*</span>
                            课&nbsp;&nbsp;程&nbsp;&nbsp;码：<In
                                ss="w140"
                                val={this.props.fromObj.ma}
                                {...this.props.handChange("ma")}
                            />
                        </span>
                        <span>
                            &nbsp;&nbsp;<span className="red">*</span>总分：<In
                                ss="w80"
                                p="数字"
                                defaultValue={this.props.fromObj.zongfen}
                                {...this.props.handChange("zongfen")}
                            />
                        </span>
                        <Space ss="mt20" />
                        <span>
                            <span className="red">*</span>
                            课程类型：<Sel
                                data={[
                                    [
                                        "必修",
                                        this.props.fromObj.type == "必修"
                                            ? 1
                                            : 0
                                    ],
                                    [
                                        "选修",
                                        this.props.fromObj.type == "选修"
                                            ? 1
                                            : 0
                                    ]
                                ]}
                                ss="w120"
                                {...this.props.handChange("type")}
                            />
                        </span>
                        <span>
                            &nbsp;&nbsp;<span className="red">*</span>考核方式：<Sel
                                data={[
                                    [
                                        "考试",
                                        this.props.fromObj.kaohe == "考试"
                                            ? 1
                                            : 0
                                    ],
                                    [
                                        "其他",
                                        this.props.fromObj.kaohe == "其他"
                                            ? 1
                                            : 0
                                    ]
                                ]}
                                ss="w120"
                                {...this.props.handChange("kaohe")}
                            />
                        </span>
                        <span>
                            &nbsp;&nbsp;<span style={{ color: "#999" }}>
                                (非必填)
                            </span>学分：<In
                                ss="w80"
                                p="数字"
                                val={this.props.fromObj.xuefen}
                                {...this.props.handChange("xuefen")}
                            />
                        </span>
                        <Space ss="mt20" />
                        <div style={{ textAlign: "center" }}>
                            <Bn
                                blue
                                onClick={() => {
                                    if (!this.props.fromObj.name) {
                                        layer.msg("请填写课程名称!");
                                    } else if (!this.props.fromObj.ma) {
                                        layer.msg("请填写课程码!");
                                    } else if (!this.props.fromObj.zongfen) {
                                        layer.msg("请填写总分!");
                                    } else if (
                                        !strIsNumber(this.props.fromObj.zongfen)
                                    ) {
                                        layer.msg(
                                            "总分填写不正确，应该为数字！"
                                        );
                                    } else {
                                        this.props.fromObj.xuefen ==
                                            undefined ||
                                        this.props.fromObj.xuefen == "" ||
                                        strIsNumber(this.props.fromObj.xuefen)
                                            ? !+this.props.handEditFromUp({
                                                  ...this.props.fromObj
                                              }) && +this.props.editFromShow()
                                            : layer.msg(
                                                  "学分填写不正确，应该为数字！"
                                              );
                                    }
                                }}
                            />
                            <Bn
                                gray
                                t="取消"
                                ss="ml10"
                                onClick={() => {
                                    this.props.editFromShow();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
