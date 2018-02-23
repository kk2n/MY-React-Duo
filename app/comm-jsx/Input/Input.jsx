/*
 bt前面的文本
 */
import React from 'react';
import {Input} from 'antd'
import './Input.scss';
import {
    multVal,
    setStyle,
    setClass,
    setss,
} from '../../comm-util/jsxTools'

export default class MyInput extends React.Component {
    constructor(props) {
        super(props);
    }
    //定义静态属性
    static defaultProps = {
        type: 'text',
        disabled: false,
        dis: false,
        style: {}
    };
    render() {
        let {
            className,ss,style,
            bt,
            at,
            bi,
            ai,
            init,t,
            dis,
            id,
            tpye,
            onEnter,
            blue,green,red,yellow,info,black,gray,small,sm,lg,big,fill,
            text,
            auto,
            p,placeholder,
            ...others
        } = this.props;
        let Styles = setStyle(style, [ss, setss]);
        let Classes = setClass(
            '',
            'short-input',
            className,
            [multVal(blue), 'primary'],
            [multVal(green), 'success'],
            [multVal(red), 'danger'],
            [multVal(yellow), 'warning'],
            [multVal(info), 'info'],
            [multVal(black), 'dark'],
            [multVal(gray), 'gray'],
            [multVal(fill), 'fill'],
            [multVal(small, sm), 'sm'],
            [multVal(lg, big), 'lg'],
            [multVal(dis), 'disabled'],
        );
        let [addonBefore,addonAfter]=[text?{}:{addonBefore:bt},text?{}:{addonAfter:at}];

        let autoValue=text?{autosize:auto?(typeof auto==='object'?auto:typeof auto==='string'?{minRows:parseInt(auto.split(',')[0]),maxRows:parseInt(auto.split(',')[1])}:false):false}:{};

        return <Input
            {..._.omit(others)}
            style={Styles}
            className={Classes}
            {...addonBefore}
            {...addonAfter}
            defaultValue={init||t}
            disabled={dis}
            id={id}
            prefix={bi}
            suffix={ai}
            type={text?'textarea':tpye}
            onPressEnter={onEnter}
            placeholder={p||placeholder}
            {...autoValue}
        />
    }
}