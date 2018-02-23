import React from "react";
import { Space, Alert, Ta, Bn } from "../../comm-jsx";
import { Input } from "antd";
const { TextArea } = Input;
import ajax from "../../comm-util/axios";
class PiDao extends React.Component {
    state = {
        td: [],
        isnull: false,
        isrep: [],
        isrep2: [],
        ismax: false,
        isUp: false,
        bingArr: [],
        bqshow: false,
        upObj: null,

        ttext: "",

        isname: [],
        isma: [],
        istype: [],
        iskaohe: [],
        iszongfen: [],

        isnamerep: [],
        ismarep: [],
        isnamerephang: [],
        ismarephang: []
    };

    render() {
        let {
            th,
            hasClass,
            bak,
            selSchcoolObj,
            selGradeObj,
            selxiaoquObj,
            piliangUp,
            yanzheng,
            jingyong,
            mobanFlie
        } = this.props;
        th = [
            {
                title: "序号",
                sort: true,
                render: data => {
                    return data.index;
                }
            },
            ...th
        ];
        return (
            <div className="dao-com">
                <Space ss="mt10" />
                <h5 className="tishi">
                    请从Excle里复制、粘贴数据：<span className="moban">
                        <a href={mobanFlie} target="_blank">
                            【模板下载】
                        </a>
                    </span>
                </h5>
                <TextArea
                    placeholder="在Excle复制（Ctrl+c）数据,在此处粘贴（Ctrl+v）数据"
                    autosize={{ minRows: 2, maxRows: 5 }}
                    value={this.state.ttext}
                    onChange={e => {
                        let t = e.target;
                        // setTimeout(()=>{
                        //     t.value=''
                        // })
                        let val = t.value
                            .replace(/\n/g, "~~~")
                            .replace(/\s/g, "---");
                        this.setState({
                            isnull: false,
                            ismax: false,
                            bqshow: false,
                            ttext: t.value,

                            isname: [],
                            isma: [],
                            istype: [],
                            iskaohe: [],
                            iszongfen: [],
                            isrep: [],
                            isrep2: [],
                            isnamerep: [],
                            ismarep: [],
                            isnamerephang: [],
                            ismarephang: []
                        });

                        let json = JSON.stringify(val).replace('"', "");
                        let arr = _.initial(
                            _.map(json.split("~~~"), a => a.split("---"))
                        );
                        arr = _.map(arr, (a, aa) => {
                            a.unshift(aa + 1);
                            return _.object(
                                [
                                    "index",
                                    "ma",
                                    "name",
                                    "type",
                                    "kaohe",
                                    "zongfen",
                                    "xuefen"
                                ],
                                a
                            );
                        });
                        this.setState({ td: arr });

                        //判断是否有空数据;
                        let isname = [],
                            isma = [],
                            istype = [],
                            iskaohe = [],
                            iszongfen = [];
                        _.each(arr, (a, aa) => {
                            a.grade = selGradeObj.label;
                            if (a.name == "") {
                                isname.push(aa + 1);
                            } else if (a.ma == "") {
                                isma.push(aa + 1);
                            } else if (a.type == "") {
                                istype.push(aa + 1);
                            } else if (a.kaohe == "") {
                                iskaohe.push(aa + 1);
                            } else if (a.zongfen == "") {
                                iszongfen.push(aa + 1);
                            }
                        });
                        this.setState({
                            isname: isname,
                            isma: isma,
                            istype: istype,
                            iskaohe: iskaohe,
                            iszongfen: iszongfen
                        });

                        //判断上传的文本中是否有重复
                        let uparr = _.map(arr, a => a.name);
                        let bingArr = [];
                        let bingArrhang = [];
                        let nary = _.clone(uparr).sort();
                        for (let i = 0; i < uparr.length; i++) {
                            if (nary[i] == nary[i + 1]) {
                                bingArr.push(nary[i]);
                            }
                        }
                        _.each(bingArr, a => {
                            _.each(uparr, (b, bb) => {
                                if (a == b) {
                                    bingArrhang.push(bb + 1);
                                }
                            });
                        });
                        if (bingArr.length) {
                            this.setState({
                                isnamerep: bingArr,
                                isnamerephang: _.uniq(bingArrhang.sort())
                            });
                        }
                        //判断码是否重复
                        let uparr2 = _.map(arr, a => a.ma);
                        let bingArr2 = [];
                        let bingArrhang2 = [];
                        let nary2 = _.clone(uparr2).sort();
                        for (let i = 0; i < uparr2.length; i++) {
                            if (nary2[i] == nary2[i + 1]) {
                                bingArr2.push(nary2[i]);
                            }
                        }
                        _.each(bingArr2, a => {
                            _.each(uparr2, (b, bb) => {
                                if (a == b) {
                                    bingArrhang2.push(bb + 1);
                                }
                            });
                        });
                        if (bingArr2.length) {
                            this.setState({
                                ismarep: bingArr2,
                                ismarephang: _.uniq(bingArrhang2.sort())
                            });
                        }

                        //最大条数
                        if (arr.length > 500) {
                            this.setState({
                                ismax: true
                            });
                        }
                    }}
                />
                <Space ss="mt20" />
                {this.state.td.length > 0 && (
                    <div>
                        <Alert gray ss="bgc#f9f9f9,bd #ddd">
                            <span>提示信息：</span>
                            <Space ss="bdt dotted #BCBFBF,m 6 0" />
                            <span>
                                本次批量导入{this.state.td.length}条数据
                                {this.state.bqshow && (
                                    <span style={{ color: "#67A724" }}>
                                        ，验证通过【{this.state.td.length}条】有效数据,请【确认导入】！
                                    </span>
                                )}
                            </span>
                            {this.state.isname.length > 0 && (
                                <span>
                                    <br />您导入的数据中，有<span
                                        style={{ color: "#f00" }}
                                    >
                                        【第{this.state.isname.join("，")}行的课程名称为空】
                                    </span>的数据！
                                </span>
                            )}
                            {this.state.isma.length > 0 && (
                                <span>
                                    <br />您导入的数据中，有<span
                                        style={{ color: "#f00" }}
                                    >
                                        【第{this.state.isma.join("，")}行的课程码为空】
                                    </span>的数据！
                                </span>
                            )}
                            {this.state.istype.length > 0 && (
                                <span>
                                    <br />您导入的数据中，有<span
                                        style={{ color: "#f00" }}
                                    >
                                        【第{this.state.istype.join("，")}行的课程类别为空】
                                    </span>的数据！
                                </span>
                            )}
                            {this.state.iskaohe.length > 0 && (
                                <span>
                                    <br />您导入的数据中，有<span
                                        style={{ color: "#f00" }}
                                    >
                                        【第{this.state.iskaohe.join("，")}行的考核方式为空】
                                    </span>的数据！
                                </span>
                            )}
                            {this.state.iszongfen.length > 0 && (
                                <span>
                                    <br />您导入的数据中，有<span
                                        style={{ color: "#f00" }}
                                    >
                                        【第{this.state.iszongfen.join("，")}行的总分为空】
                                    </span>的数据！
                                </span>
                            )}

                            {/* 重复判单 */}
                            {this.state.isnamerep.length > 0 && (
                                <span>
                                    <br />您导入的数据中，<span
                                        style={{ color: "#f00" }}
                                    >
                                        【第{this.state.isnamerephang.join(
                                            "，"
                                        )}行】，【课程名称为{this.state.isnamerep.join(
                                            "，"
                                        )}】
                                    </span>的数据重复，请检查您的数据！
                                </span>
                            )}
                            {this.state.isrep.length > 0 && (
                                <span>
                                    <br />您导入的数据中，<span
                                        style={{ color: "#f00" }}
                                    >
                                        【课程名称为{this.state.isrep.join(
                                            "，"
                                        )}】
                                    </span>的数据重复，请检查您的数据！
                                </span>
                            )}
                            {this.state.isrep2.length > 0 && (
                                <span>
                                    <br />您导入的数据中，<span
                                        style={{ color: "#f00" }}
                                    >
                                        【课程码为{this.state.isrep2.join("，")}】
                                    </span>的数据重复，请检查您的数据！
                                </span>
                            )}
                            {this.state.ismarep.length > 0 && (
                                <span>
                                    <br />您导入的数据中，<span
                                        style={{ color: "#f00" }}
                                    >
                                        【第{this.state.ismarephang.join("，")}行】，【课程码为{this.state.ismarep.join(
                                            "，"
                                        )}】
                                    </span>的数据重复，请检查您的数据！
                                </span>
                            )}
                            {/* 判断长度 */}

                            {this.state.ismax && (
                                <span>
                                    <br />您导入的数据，已经超过<span
                                        style={{ color: "#f00" }}
                                    >
                                        【500条】
                                    </span>，会造成入库缓慢，建议分次导入！
                                </span>
                            )}
                        </Alert>
                    </div>
                )}
                <div>
                    <Bn
                        blue={!this.state.bqshow}
                        gray={this.state.bqshow}
                        ss="w100"
                        t="数据验证"
                        onClick={() => {
                            if (!this.state.bqshow) {
                                //禁用下来框
                                if (this.state.td.length === 0) {
                                    layer.msg("未找到合理数据！");
                                } else {
                                    if (
                                        this.state.isname.length > 0 ||
                                        this.state.isma.length > 0 ||
                                        this.state.istype.length > 0 ||
                                        this.state.iskaohe.length > 0 ||
                                        this.state.iszongfen.length > 0 ||
                                        this.state.isnamerep.length > 0 ||
                                        this.state.ismarep.length > 0 ||
                                        this.state.ismax
                                    ) {
                                        layer.msg(
                                            "您导入的数据不正确，请修改后重新提交！"
                                        );
                                    } else {
                                        let obj = {
                                            sid: selSchcoolObj.value,
                                            gid: selGradeObj.value,
                                            fid: selxiaoquObj,
                                            isUp: this.state.isUp,
                                            updata: this.state.td
                                        };
                                        ajax
                                            .post("/validate", obj)
                                            .then(res => {
                                                jingyong(true);
                                                if (
                                                    res.data.data.status
                                                        .length == 0 &&
                                                    res.data.data.status_code
                                                        .length == 0
                                                ) {
                                                    this.setState({
                                                        bqshow: true,
                                                        upObj: _.clone(obj)
                                                    });
                                                } else {
                                                    layer.msg(
                                                        "出现错误，数据有重复！"
                                                    );
                                                    this.setState({
                                                        isrep:
                                                            res.data.data
                                                                .status,
                                                        isrep2:
                                                            res.data.data
                                                                .status_code
                                                    });
                                                }
                                            });
                                    }
                                }
                            }
                        }}
                    />
                    <Bn
                        blue={this.state.bqshow}
                        gray={!this.state.bqshow}
                        ss="w100,ml10"
                        t="确认导入"
                        onClick={() => {
                            if (this.state.bqshow && this.state.upObj) {
                                ajax
                                    .post("/batchUp", this.state.upObj)
                                    .then(res => {
                                        if (res.data.status) {
                                            jingyong(false);
                                            layer.msg("数据导入成功！");
                                            this.setState({
                                                td: [],
                                                isnull: false,
                                                ismax: false,
                                                bqshow: false,

                                                isname: [],
                                                isma: [],
                                                istype: [],
                                                iskaohe: [],
                                                iszongfen: [],

                                                isnamerep: [],
                                                ismarep: [],
                                                isrep: [],
                                                isrep2: [],
                                                isnamerephang: [],
                                                ismarephang: [],
                                                ttext: ""
                                            });
                                        } else {
                                            layer.msg(
                                                "出现未知错误！请联系管理员！"
                                            );
                                        }
                                    });
                            } else {
                                layer.msg("请先验证您的数据！");
                            }
                        }}
                    />
                    <Bn
                        gray
                        ss="ml10,w100"
                        t="清除"
                        onClick={() => {
                            jingyong(false);
                            this.setState({
                                td: [],
                                isnull: false,
                                ismax: false,
                                bqshow: false,
                                ttext: "",

                                isname: [],
                                isma: [],
                                istype: [],
                                iskaohe: [],
                                iszongfen: [],

                                isrep: [],
                                isrep2: [],
                                isnamerep: [],
                                ismarep: [],
                                isnamerephang: [],
                                ismarephang: []
                            });
                        }}
                    />
                    <Bn
                        gray
                        ss="ml10,w100"
                        t="返回"
                        onClick={() => {
                            bak();
                            jingyong(false);
                        }}
                    />
                </div>
                <Space ss="mt30" />
                {this.state.td.length > 0 && (
                    <Ta tddata={this.state.td} thdata={th} />
                )}
            </div>
        );
    }
}
export default PiDao;
