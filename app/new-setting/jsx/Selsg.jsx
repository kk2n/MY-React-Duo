import React from "react";
import { Bn, Space, In, Sel } from "../../comm-jsx";
import Cas from "../../comm-jsx/Cas/Cas.jsx";

export default class Selsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFrom: false,
            bzr: [],
            name: ""
        };
    }

    render() {
        let {
            selSchool,
            selGrade,
            editName,
            dao,
            typeText,
            addIsShow,
            editIsShow,
            taocanshow,
        } = this.props;

        return (
            <div className="sel-dd">
                当前选中：学校：{selSchool}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{selGrade && (
                    <span>年级：{selGrade}</span>
                )}
                {selGrade && (
                    <span className="fr">
                        <Bn
                            blue
                            t={"添加" + typeText}
                            ss="ml 10"
                            onClick={() => {
                                if(!editIsShow){
                                    addIsShow(true);
                                    this.setState({ addFrom: true });
                                }else{
                                    layer.msg("亲，编辑操作没有完成！")
                                }
                            }}
                        />
                        <Bn blue t="批量导入" ss="ml 10" onClick={dao} />
                    </span>
                )}
                {this.state.addFrom && (
                    <div>
                        <Space ss="mt15" />
                        <div className="add-banji">
                            <span className="red">*</span>
                            {typeText}名称：
                            <In
                                ss="w120"
                                ref="name"
                                defaultValue={editName}
                                onBlur={val => {
                                    this.setState({
                                        name: val
                                    });
                                }}
                            />
                            {typeText == "班级" && (
                                <span>
                                    &nbsp;&nbsp;<Bn
                                        blue
                                        onClick={() => {
                                            if (!this.state.name) {
                                                layer.msg("请填写班级名称!");
                                            } else {
                                                //名称是否存在
                                                if (
                                                    !_.some(
                                                        this.props.hasClass,
                                                        a =>
                                                            a == this.state.name
                                                    )
                                                ) {
                                                    this.props.addFromUp(
                                                        this.state.name
                                                    );
                                                    this.setState({
                                                        addFrom: false,
                                                        name: ""
                                                    });
                                                    addIsShow(false);
                                                } else {
                                                    layer.msg(
                                                        "班级名称已存在，请换一个名称"
                                                    );
                                                }
                                            }
                                        }}
                                    />
                                    &nbsp;&nbsp;<Bn
                                        gray
                                        t="取消"
                                        onClick={() => {
                                            addIsShow(false);
                                            this.setState({
                                                addFrom: false
                                            });
                                        }}
                                    />
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
