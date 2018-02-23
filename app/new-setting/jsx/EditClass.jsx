import React from "react";
import { Bn, Space, In, Sel } from "../../comm-jsx";
import Cas from "../../comm-jsx/Cas/Cas.jsx";

export default class editClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.editName,
            bzr: props.bzrList.filterObj({ value: parseInt(props.editBzr) })
        };
    }
    hideAddFrom = () => {
        this.props.hideeditFrom();
    };
    render() {
        return (
            <div className="sel-dd">
                {
                    <div>
                        <div className="add-banji">
                            <span className="red">*</span>
                            名称：
                            <In
                                ss="w120"
                                ref="name"
                                defaultValue={this.props.editName}
                                onBlur={val => {
                                    this.setState({
                                        name: val
                                    });
                                }}
                            />
                            &nbsp;&nbsp;<Bn
                                blue
                                onClick={() => {
                                    if (!this.state.name) {
                                        layer.msg("请填写班级名称!");
                                    } else {
                                        this.props.editFromUp({
                                            name: this.state.name,
                                            bzr: this.state.bzr[0]
                                        });
                                    }
                                }}
                            />
                            &nbsp;&nbsp;<Bn
                                gray
                                t="取消"
                                onClick={this.hideAddFrom}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}
