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
        ismax: false,
        isUp: false,
        bingArr: [],
        bqshow: false,
        upObj: null,

        ttext: ""
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
                            isrep: [],
                            bingArr: [],
                            ismax: false,
                            bqshow: false,
                            ttext:t.value
                        });

                        let json = JSON.stringify(val).replace('"', "");
                        let arr = _.initial(
                            _.map(json.split("~~~"), a => a.split("---"))
                        );

                        arr = _.map(arr, a => _.object(["name", "bzr"], a));
                        this.setState({ td: arr });

                        //判断是否有空数据;
                        _.each(arr, a => {
                            a.school = selSchcoolObj.label;
                            a.grade = selGradeObj.label;
                            if (a.name === "") {
                                this.setState({
                                    isnull: true
                                });
                            }
                        });
                        //判断上传的文本中是否有重复
                        let harr = _.clone(hasClass);
                        let uparr = _.map(arr, a => a.name);
                        let bingArr = [];
                        let nary = uparr.sort();
                        for (let i = 0; i < uparr.length; i++) {
                            if (nary[i] == nary[i + 1]) {
                                bingArr.push(nary[i]);
                            }
                        }
                        if (bingArr.length) {
                            this.setState({
                                bingArr: bingArr
                            });
                        }

                        //判断与之前的数据是否重复
                        let jiaoarr = _.intersection(harr, uparr);
                        if (jiaoarr.length) {
                            this.setState({
                                isrep: jiaoarr
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
                            {this.state.isnull && (
                                <span>
                                    <br />您导入的数据中，有<span
                                        style={{ color: "#f00" }}
                                    >
                                        【班级的名称为空】
                                    </span>的数据！
                                </span>
                            )}
                            {this.state.bingArr != 0 && (
                                <span>
                                    <br />您导入的数据中，<span
                                        style={{ color: "#f00" }}
                                    >
                                        【{this.state.bingArr.join("，")}】
                                    </span>已经存在或重复！
                                </span>
                            )}
                            {this.state.isrep.length != 0 && (
                                <span>
                                    <br />您导入的数据中，<span
                                        style={{ color: "#f00" }}
                                    >
                                        【{this.state.isrep.join("，")}】
                                    </span>已经存在或重复！
                                </span>
                            )}
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
                                        this.state.isnull ||
                                        this.state.isrep.length ||
                                        this.state.bingArr.length ||
                                        this.state.ismax
                                    ) {
                                        layer.msg(
                                            "您导入的数据不正确，请修改后重新提交！"
                                        );
                                    } else {
                                        let obj = {
                                            school: selSchcoolObj,
                                            grade: selGradeObj,
                                            fxId: selxiaoquObj,
                                            isUp: this.state.isUp,
                                            updata: this.state.td
                                        };
                                        ajax
                                            .post("/validate", obj)
                                            .then(res => {
                                                jingyong(true);
                                                if (
                                                    res.data.data.status
                                                        .length == 0
                                                ) {
                                                    this.setState({
                                                        bqshow: true,
                                                        upObj: _.clone(obj)
                                                    });
                                                } else {
                                                    this.setState({
                                                        isrep:
                                                            res.data.data.status
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
                                        if(res.data.status){
                                            jingyong(false);
                                            layer.msg("数据导入成功！");
                                            this.setState({
                                                bqshow: false,
                                                td: [],
                                                isnull: false,
                                                isrep: [],
                                                bingArr: [],
                                                ismax: false,
                                                ttext: ""
                                            });
                                        }else{
                                            layer.msg("出现未知错误！请联系管理员！"); 
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
                                isrep: [],
                                bingArr: [],
                                ismax: false,
                                bqshow: false,
                                ttext: ""
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
