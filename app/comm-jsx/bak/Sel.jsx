import {classNames, multVal, findObj} from '../../comm-util/classNames'
import ajax from '../../comm-util/ajax';

export default class Sel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: null, text: null}
    }

    render() {
        const props = this.props;
        const {
            className,
            prefix = 'sel',
            primary, blue,
            succ, success, green,
            danger, red,
            gray,
            style,
            url,
            dark, black,
            disabled, dis,
            ...others
        } = props;
        //处理内嵌样式dadss7
        const Styles = {
            ...style,
        };
        //class处理
        const classes = classNames({
            [`short-dropdown dropdown` + '']: true,
            [`${prefix}` + '-primary']: multVal(primary, blue),
            // [`${prefix}` + '-fill']: multVal(fill),
            [`${prefix}` + '-success']: multVal(success, succ, green),
            [`${prefix}` + '-danger']: multVal(danger, red),
            // [`${prefix}` + '-warning']: multVal(warning, yellow),
            // [`${prefix}` + '-info']: multVal(info),
            [`${prefix}` + '-dark']: multVal(dark, black),
            [`${prefix}` + '-gray']: multVal(gray),
            [`${prefix}` + '-dis']: multVal(disabled, dis),
        }, className);

        //下拉框下拉项数据
        let dropItems = props.data || [{id: null, name: '暂无'}];
        //数据兼容数组形式asd
        let arr_tmp = [];
        _.each(dropItems, (a, aa) => {
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
        dropItems = arr_tmp;
        // 处理默认值
        //sel里面的文字
        let text = props.children || props.t || '请选择..';
        let def_val = findObj(dropItems, {selected: 1});
        def_val ? text = def_val.name : '';
        //处理urlssdswSRsd
        if (_.isString(url) && !this.state.data && !this.state.text) {
            ajax({
                url: 'http://192.168.1.57:9081' + url,
                type: 'POST',
                dataType: 'json',
                data: props.pram || '',
                success: data => {
                    let temp = data.data || [{id: null, name: '暂无'}];
                    let arr_tmp = [];
                    _.each(temp, (a, aa) => {
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
                    temp = arr_tmp;
                    let def_val = findObj(temp, {selected: 1});
                    def_val?this.setState({text: def_val.name}):'';
                    this.setState({data: temp});
                }
            })
        }
        return <div className={classes}>
            <input type="hidden" value={def_val ? def_val.id : ''} data-t={def_val ? def_val.name : ''}/>
            <a
                className="short-sel btn dropdown-toggle"
                href="javascript:void 0"
                role="button"
                onClick={() => {
                    if (!dis) {
                        this.refs.dropItem.style.display = 'block';
                    }
                }}
                onBlur={(e) => {
                    let t_val = e.target.innerText;
                    _.delay(() => {
                        this.refs.dropItem.style.display = 'none';
                    }, 200)
                }}
                style={Styles}
                ref="dropTag"
                {...others}>
                {this.state.text||text}
            </a>
            <div className="short-sel-menu dropdown-menu" ref="dropItem">
                {(this.state.data || dropItems).map((kay, index) =>
                    <a className={'dropdown-item anim1' + (kay.selected ? ' selected' : '')}
                       href="javascript:void 0"
                       data-val={kay.id}
                       onClick={(e) => {
                           if (e.target.dataset.val !== undefined) {
                               let p = e.target.parentNode.childNodes;
                               _.each(p, e => {
                                   e.className = e.className.replace(' selected', '');
                               });
                               e.target.className += " selected";
                               this.refs.dropTag.innerText = e.target.innerText;
                               this.refs.dropItem.style.display = 'none';
                           }
                       }}
                       key={index}
                    >{kay.name}</a>
                )}
            </div>
        </div>
    }
}