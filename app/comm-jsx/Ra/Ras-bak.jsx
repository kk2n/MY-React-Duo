import {
    multVal,
    setStyle,
    setClass,
    setss,
    onlyId,
    doit,
} from '../../comm-util/jsxTools'
import Ra from './Ra.jsx'
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


 t，文本
 name,按钮组的名字
 */

export default class Ras extends React.Component {
    constructor(props) {
        super(props);
        let dData = selData(props.data) || [{name: ''}];
        let dt = getSelVal(dData);
        this.state = {
            data: dData,
            selData: dt || {
                id: props.val || props.value,
                name: props.t || props.children || '请选择..',
                key: props.key
            }
        }
    }

    //定义静态属性
    static defaultProps = {
        style: {},
        name: onlyId('radio')
    };
    //点击事件
    handleClick = (val, text, tar) => {
        const {
            onClick, _cl,
            onChange, _ch,
        } = this.props;
        //事件处理,返回【4个值】
        // 1:【val】点击项的值，
        // 2:【text】点击项的文本，
        // 3:【ref.hide_inp】相当e.target,而不是e;
        //更新状态

        let newData = _.map(this.state.data, a => {
            return {
                id: a.id,
                name: a.name,
                key: a.key,
                selected: a.id.toString() === val && 1 || 0
            }
        });
        this.setState({
            data: newData,
        });
        onChange || _ch ? doit(onChange || _ch, val, text, tar) : '';
        onClick || _cl ? doit(onClick || _cl, val, text, tar) : '';
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
                    let dData = selData(data.data) || [{name: ''}];
                    let dt = getSelVal(dData);
                    this.setState({
                        data: dData,
                        selData: dt || {
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
        let {
            style, ss,
            dis, disabled,
            className,
            id, name,
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
        //
        let Classes = setClass(
            'short-radios',
            'radios',
            className,
            [multVal(dis, disabled), 'disabled'],
        );

        //数据整理
        return <label
            className={Classes}
            style={Styles} id={id}
        >
            {this.state.data.map((obj, index) =>
                <Ra
                    name={name}
                    key={index}
                    t={obj.name}
                    checked={obj.selected}
                    dis={obj.dis}
                    value={obj.id}
                    {...others}
                    {...obj.className}
                    _cl={this.handleClick}
                />
            )}

        </label>
    }
}
