import {classNames, multVal} from '../../comm-util/classNames'
export default class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        const {
            className,
            primary, blue,
            success, succ, green,
            danger, red,
            warning, yellow,
            info,
            dark,
            gray,
            close,
            bdrs,
            style,
            prefix = 'alert',
            ...others
        } = props;

        //处理classddsr
        const classes = classNames({
            [`${prefix}` + ' ']: true,
            [`${prefix}` + '-primary']: multVal(primary, blue),
            [`${prefix}` + '-success']: multVal(success, succ, green),
            [`${prefix}` + '-danger']: multVal(danger, red),
            [`${prefix}` + '-warning']: multVal(warning, yellow),
            [`${prefix}` + '-info']: multVal(info),
            [`${prefix}` + '-dark']: multVal(dark),
            [`${prefix}` + '-gray']: multVal(gray),
        }, className);

        const bdrsSet = {};
        typeof bdrs === "boolean" ?
            bdrsSet.borderRadius = "34px" :
            bdrsSet.borderRadius = bdrs
        ;
        //处理内嵌样式
        const Styles = {
            ...bdrsSet,
            ...style,
        };
        const closeBn = close &&
            <button
                type="button"
                className="close"
                onClick={() => {
                    this.refs.alert.remove()
                }}
            >
                <span aria-hidden="true">&times;</span>
            </button>;
        return <div
            className={'short-alert ' + classes}
            {...others}
            style={Styles}
            ref="alert"
        >
            {closeBn}
            {this.props.children}
        </div>;
    }
}
