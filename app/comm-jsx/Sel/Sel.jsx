/*
 ====================================
 下拉框，组件说明：
 ------------------
 t:是默认文本，一般是："请选择.."
 maxHeight,mah,zdh  ,下拉框的最大高


 data:数据，以下格式都支持：
 一元数组
 data={[1,2,3]}
 或对象：selected:1代表已选择的
 data={[{id:1,name:'项目一',selected:1},{id:1,name:'项目一',selected:1}]}

 或，二元数组，arr[n][1],代表已选择的
 data={[[1,0],[2,0],[3,1]}


 url:直接调取url数据
 parm:请求参数，调用ajax时的请求参数 type:obj类型
 如果只有url,ajax的类型是get,如果有parm,则采用POST方式
 ====================================
例子：
 <Sel data={[1,2,3,4]} _ch={(val,name,e,selData)=>{
    log(name)
 }} />

 <Sel url="/seltest" parm={{id:1}} />
 */
import React from 'react';
import {
    multVal,
    setStyle,
    setClass,
    doit,
    setss,
} from '../../comm-util/jsxTools'
import ajax from '../../comm-util/ajax';
import selData from './selData'
import getSelVal from './getDef'
import './Sel.scss'

export default class Sel extends React.Component {
    constructor(props) {
        super(props);
        let dData = selData(props.data) || [{name: '暂无'}];
        let dt = getSelVal(dData);
        this.state = {
            data: dData,
            val: dt || {
                id: props.val,
                name: props.t || props.children || '请选择..',
                key: props.key
            }
        }
    }

    static defaultProps = {
        style: {}
    };

    //下拉框里的li点击事件
    handClick = (e) => {
        e.preventDefault();
        const {
            onChange, _ch,
            onClick,_cl
        } = this.props;
        let val = e.target.dataset.val;
        let text = e.target.dataset.name;
        if (val !== undefined) {
            // _.each(e.target.parentNode.childNodes, e => e.className = e.className.replace(' selected', ''));
            // e.target.className += " selected";
            // this.refs.dropTag.innerText = e.target.innerText;
            this.refs.dropItem.style.display = 'none';
            //更新状态
            let newData = _.map(this.state.data, a => {
                a.selected=a.id.toString() === val && 1 || 0;
                return a
            });
            this.setState({
                data: newData,
            });

            let newSelData = getSelVal(newData);
            this.setState({
                val: newSelData
            });
            this.refs.hiddenInput.value=newSelData.id;
            //回调父级事件,返回【4个】参数
            // 1:【val】值,
            // 2:【text】文本,
            // 3:【e】点击对象,
            // 4:【selData】新的选择后的对象
            onChange || _ch ? doit(onChange || _ch, val, text, e, newSelData) : '';
            onClick || _cl ? doit(onClick || _cl, val, text, e, newSelData) : '';
        }
    };
    //直接读取json数据
    componentDidMount() {
        //处理url
        const {
            val, t, key, children,
            url, parm,
        } = this.props;
        if (_.isString(url)) {
            ajax({
                url: url,
                type: parm && 'POST' || 'GET',
                dataType: 'json',
                data: parm || '',
                success: data => {
                    let dData = selData(data.data) || [{name: '暂无'}];
                    let dt = getSelVal(dData);
                    this.setState({
                        data: dData,
                        val: dt || {
                            id: val,
                            name: t || children || '请选择..',
                            key: key
                        }
                    });
                }
            })
        }
    }

    render() {
        const {
            style, ss,
            className,
            primary, blue,
            succ, success, green,
            danger, red,
            gray,
            dark, black,
            disabled, dis,
            maxHeight, mah, zdh,
            dStyle,
            dClassName,
            ...others
        } = this.props;
        //第一个参数：this.props.styles，
        let Styles = setStyle(style, [ss, setss]);

        //下拉框选项的样式
        let _zdh = zdh || maxHeight || mah;
        let dropStyle = dStyle || {};
        dropStyle.maxHeight = (parseInt(_zdh) >= 0) && _zdh.indexOf('%') < 0 && _zdh.indexOf('rem') < 0 ? _zdh + 'px' : _zdh;
        //下拉框选项class
        let dropclasses = setClass('short-sel-menu dropdown-menu', '', dClassName);

        //第一个参数：默认样式，
        //第二个参数前缀
        let Classes = setClass(
            'short-dropdown dropdown',
            'sel',
            className,
            [multVal(primary, blue), 'primary'],
            [multVal(success, succ, green), 'success'],
            [multVal(danger, red), 'danger'],
            [multVal(dark, black), 'dark'],
            [multVal(gray), 'gray'],
            [multVal(dis, disabled), 'disabled'],
        );
        //处理多余属性
        _.each(others, (a, aa) => {
            aa === 'url' ||
            aa === 't' ||
            aa === 'data' ||
            aa === 'parm'
                ? delete others[aa] : ''
        });
        //返回片段
        return <div className={Classes}>
            <input type="hidden" data-value={this.state.val.id} data-t={this.state.val.name}
                   data-k={this.state.val.key} ref="hiddenInput"/>
            <a
                className="short-sel btn dropdown-toggle"
                href="javascript:void 0"
                role="button"
                onClick={() => {
                    if (!dis) {
                        this.refs.dropItem.style.display = 'block';
                    }
                }}
                onBlur={() => {
                    _.delay(() => {
                        this.refs.dropItem.style.display = 'none';
                    }, 150)
                }}
                style={Styles}
                {...others}
            >
                {this.state.val.name}
            </a>
            <div className={dropclasses} ref="dropItem" style={dropStyle}>
                {this.state.data.map((obj, index) =>
                    <a className={obj.selected ? 'dropdown-item anim1 selected' : 'dropdown-item anim1'}
                       href="javascript:void 0"
                       data-val={obj.id}
                       data-name={obj.name}
                       data-key={obj.key}
                       onClick={this.handClick}
                       key={index}
                    >{obj.name}</a>
                )}
            </div>
        </div>
    }
}