import React from 'react';
import {
    multVal,
    setStyle,
    setClass,
    setss,
    onlyId,
    doit,
} from '../../comm-util/jsxTools'
import selData from '../Sel/selData'
import ajax from '../../comm-util/ajax';
import getSelVal from '../Sel/getDef'
/*
 按钮组件
 说明
 primary, blue,蓝色
 success, succ, green,绿色
 danger, red,红色
 warning, yellow,黄色
 info,浅蓝
 dark,black,深色
 gray,灰色
 fill，填充


 name,radio组的名字 type:string
 data,radio组数据,数据和sel组件一样
     data:数据，以下格式都支持：
     一元数组
     data={[1,2,3]}
     或对象：selected:1代表已选择的
     data={[{id:1,name:'项目一',selected:1},{id:1,name:'项目一',selected:1}]}

     或，二元数组，arr[n][1],代表已选择的
     data={[[1,0],[2,0],[3,1]}

如果要是某一项disabled,请在数据源里加disabled:1;

 url:直接调取url数据
 parm:请求参数，调用ajax时的请求参数 type:obj类型
 如果只有url,ajax的类型是get,如果有parm,则采用POST方式

 =============================================
 例子：
 <Ras red data={[{id:'1',name:"eee",disabled:1,className:'likuan'},[2,'dsd',1],[3,'dsd',1]]} _ch={(a,b,c,d)=>log(d)}/>
 */


export default class Ras extends React.Component {
    constructor(props) {
        super(props);
        let dData = selData(props.data) || [];
        let dt = getSelVal(dData);
        this.state = {
            data: dData,
            val: dt || {}
        }
    }

    //定义静态属性
    static defaultProps = {
        style: {},
        name: onlyId('radio')
    };
    //点击事件
    handleClick = (e) => {
        if (!e.target.dataset.disabled) {
            const {
                onClick, _cl,
                onChange, _ch,
            } = this.props;
            //更新状态
            let val = e.target.dataset.val;
            let text = e.target.dataset.t;
            let newData = _.map(this.state.data, a => {
                a.selected = a.id.toString() === val && 1 || 0;
                return a
            });
            let newSelData = getSelVal(newData);
            this.setState({
                data: newData,
                val: newSelData
            });
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
                    let dData = selData(data.data) || [];
                    let dt = getSelVal(dData);
                    this.setState({
                        data: dData,
                        val: dt || {}
                    });
                }
            })
        }
    }

    render() {
        let {
            style, ss,
            className,
            primary, blue,
            success, succ, green,
            danger, red,
            warning, yellow,
            info,
            dark, black,
            gray,
            fill,

            name,
            ...others,
        } = this.props;
        //处理多余属性
        _.each(others, (a, aa) => {
            aa === 'onChange' ||
            aa === '_ch' ||
            aa === '_cl' ||
            aa === 'onClick' ||
            aa === 'url' ||
            aa === 'data' ||
            aa === 'parm'
                ? delete others[aa] : ''
        });
        //第一个参数：this.props.styles，
        let Styles = setStyle(style, [ss, setss]);
        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        let Classes = setClass(
            'short-radio',
            'radio',
            className,
            [multVal(primary, blue), 'primary'],
            [multVal(success, succ, green), 'success'],
            [multVal(danger, red), 'danger'],
            [multVal(warning, yellow), 'warning'],
            [multVal(info), 'info'],
            [multVal(dark, black), 'dark'],
            [multVal(gray), 'gray'],
            [multVal(fill), 'fill'],
        );
        //返回代码片段
        return <label
            className={'short-radios'}
            style={Styles}
            {...others}
        >
            {this.state.data.length > 0 && this.state.data.map((obj, index) =>
                <label
                    onClick={e=>e.preventDefault()}
                    className={ obj.disabled || obj.dis ? 'short-label disabled' : 'short-label'}
                >
                    <input type="radio"
                           id={ obj.id && obj.id.toString() ? 'id_' + obj.id : 'id_' + index  }
                           name={ name || onlyId('name')}
                           className={Classes}
                           disabled={ obj.disabled || obj.dis }
                           data-t={ obj.name }
                           data-val={ obj.id }
                           value={ obj.id }
                           checked={ obj.selected }
                           ref="hide_inp"
                    />
                    <label
                        htmlFor={ obj.id && obj.id.toString() ? 'id_' + obj.id : 'id_' + index  }
                        data-name={ name || onlyId('name')}
                        data-id={ obj.id && obj.id.toString() ? 'id_' + obj.id : 'id_' + index  }
                        data-t={ obj.name }
                        data-val={ obj.id }
                        data-disabled={ obj.disabled || obj.dis }
                        onClick={ this.handleClick }
                    />
                    <span className='radio-txt'
                          data-disabled={ obj.disabled || obj.dis }
                          data-t={ obj.name }
                          data-val={ obj.id }
                          data-name={ name || onlyId('name')}
                          data-id={ obj.id && obj.id.toString() ? 'id_' + obj.id : 'id_' + index  }
                          onClick={this.handleClick}
                    >{ obj.name }
                    </span>
                </label>
            ) || '' /*'radio准备中..'*/}
        </label>
    }
}
