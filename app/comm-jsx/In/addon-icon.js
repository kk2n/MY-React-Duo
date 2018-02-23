/**
 * Created by likuan on 10/31 0031.
 */
import {
    classNames
} from '../../comm-util/jsxTools'
//前后图标
export function renderLabeledIcon(children,_t) {
    const {props} = _t;
    if (!('prefix' in props || 'suffix' in props || 'bi' in props || 'ai' in props)) {
        return children;
    }

    const prefix = props.prefix || props.bi ? (
        <span className={`${props.prefixCls}-prefix`}>
                {props.prefix || props.bi}
            </span>
    ) : null;

    const suffix = props.suffix || props.ai ? (
        <span className={`${props.prefixCls}-suffix`}>
                {props.suffix || props.ai}
            </span>
    ) : null;

    return (
        <span
            className={classNames(props.pclassName, `${props.prefixCls}-affix-wrapper short-hasaddon`)}
            style={props.pstyle}
        >
                {prefix}
            {React.cloneElement(children, {style: props.style})}
            {suffix}
            </span>
    );
}