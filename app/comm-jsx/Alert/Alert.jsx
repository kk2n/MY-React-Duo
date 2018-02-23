import React from 'react';
import {
    multVal,
    setStyle,
    setClass,
    setss,
} from '../../comm-util/jsxTools'
import './Alert.scss'

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
    }
//定义静态属性
    static defaultProps = {
        style: {}
    };
    render() {
        const {
            style,
            ss,

            className,
            primary, blue,
            success, succ, green,
            danger, red,
            warning, yellow,
            info,
            dark, black,
            gray,
            fill,
            small,sm,
            lg,long,big,


            close,
            ...others
        } = this.props;

        //第一个参数：this.props.styles，
        let Styles = setStyle(
            style,
            [ss, setss],
        );
        //第一个参数：默认样式，
        //第二个参数前缀
        //第三个参数：className
        //
        let Classes = setClass(
            'short-alert',
            'alert',
            className,
            [multVal(small,sm ), 'sm'],
            [multVal(lg,big,long ), 'lg'],
            [multVal(primary, blue), 'primary'],
            [multVal(success, succ, green), 'success'],
            [multVal(danger, red), 'danger'],
            [multVal(warning, yellow), 'warning'],
            [multVal(info), 'info'],
            [multVal(dark, black), 'dark'],
            [multVal(gray), 'gray'],
            [multVal(fill), 'fill'],
        );

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
            className={Classes}
            {...others}
            style={Styles}
            ref="alert"
        >
            {closeBn}
            {this.props.children}
        </div>;
    }
}
