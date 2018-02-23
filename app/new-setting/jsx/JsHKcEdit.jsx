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
                        教室名称：
                        <In
                            ss="w140"
                            val={this.props.fromObj.name}
                            {...this.props.handChange("name")}
                        />
                        <span>
                            &nbsp;&nbsp;<span className="red">*</span>
                            教室地址：<In
                                ss="w140"
                                val={this.props.fromObj.address}
                                {...this.props.handChange("address")}
                            />
                        </span>
                        <Space ss="mt20" />
                        <span>
                            <span className="red">*</span>
                            教室类型：<Sel
                                data={[
                                    [
                                        "行政班",
                                        this.props.fromObj.type == "行政班"
                                            ? 1
                                            : 0
                                    ],
                                    [
                                        "教学班",
                                        this.props.fromObj.type == "教学班"
                                            ? 1
                                            : 0
                                    ]
                                ]}
                                ss="w120"
                                {...this.props.handChange("type")}
                            />
                        </span>
                        <span>
                            &nbsp;&nbsp;<span className="red">*</span>座位数：<In
                                ss="w80"
                                p="数字"
                                defaultValue={this.props.fromObj.zuowei}
                                {...this.props.handChange("zuowei")}
                            />
                        </span>
                        <Space ss="mt20" />
                        <span>
                            &nbsp;&nbsp;<span style={{ color: "#999" }} />教室守则：<In
                                ss="w360"
                                p="填写教室守则"
                                val={this.props.fromObj.gz}
                                {...this.props.handChange("gz")}
                            />
                        </span>
                        <Space ss="mt20" />
                        <div style={{ textAlign: "center" }}>
                            <Bn
                                blue
                                onClick={() => {
                                    if (!this.props.fromObj.name) {
                                        layer.msg("请填写课程名称!");
                                    } else if (!this.props.fromObj.address) {
                                        layer.msg("请填写教室地址!");
                                    } else if (!this.props.fromObj.zuowei) {
                                        layer.msg("请填写座位数!");
                                    } else if (
                                        !strIsNumber(this.props.fromObj.zuowei)
                                    ) {
                                        layer.msg(
                                            "座位数填写不正确，应该为数字！"
                                        );
                                    } else {
                                        !+this.props.handEditFromUp({
                                            ...this.props.fromObj
                                        }) && +this.props.editFromShow();
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
