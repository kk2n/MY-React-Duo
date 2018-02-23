import {
    multVal,
    setStyle,
    setClass,
    setWhpm,
    setFclt,
    setBdbg,
    setDfpz,
    setss,
    onlyId,
    doit,
} from '../../comm-util/jsxTools'
import Ch from './Ch.jsx'

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
 * */

export default class Chs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlyname: onlyId('check')
        };
    }

    //定义静态属性
    static defaultProps = {
        style: {}
    };
    //点击事件
    handleClick = (e,tar) => {
        const {
            onClick, _cl,
            value, val,
        } = this.props;
        //输入变化
        //val || value ? this.setState({val: e.target.value}) : '';
        //事件处理
        onClick || _cl ? doit(onClick || _cl, e, tar) : '';

    };
    render() {
        let {
            style,
            whpm,
            bdbg,
            fclt,
            dfpz,
            ss,
            dis, disabled,
            data,

            className,
            name,

            ...others,
        } = this.props;

        //第一个参数：this.props.styles，
        //第二个..
        let Styles = setStyle(
            style,
            [whpm, setWhpm],
            [bdbg, setBdbg],
            [fclt, setFclt],
            [dfpz, setDfpz],
            [ss, setss],
        );
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
        let arr_tmp = [];
        _.each(data, (a, aa) => {
            if (_.isArray(a)) {
                let pa = {};
                if (a.length === 3) {
                    pa = {
                        id: a[0],
                        name: a[1],
                        selected: a[2] === 'selected' ? 1 : a[2] === '1' ? 1 : a[2] === 1 ? 1 : a[2] === true ? 1 : 0,
                    };
                } else if (a.length === 2) {
                    pa = {
                        id: a[0],
                        name: a[0],
                        selected: a[1] === 'selected' ? 1 : a[1] === '1' ? 1 : a[1] === 1 ? 1 : a[1] === true ? 1 : 0,
                    };
                } else if (a.length === 1) {
                    pa = {
                        id: a[0],
                        name: a[0],
                        selected: '',
                    };
                }
                arr_tmp.push(pa)
            } else if (_.isObject(a)) {
                arr_tmp.push(a)
            } else {
                let pa = {
                    id: aa + 1,
                    name: a,
                    selected: '',
                };
                arr_tmp.push(pa)
            }
        });
        return <label className={Classes} style={Styles}>
            {(arr_tmp).map((obj, index) =>
                <Ch name={name||this.state.onlyname}
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
