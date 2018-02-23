/**
 * Created by likuan on 10/31 0031.
 */
import {
    classNames
} from '../../comm-util/jsxTools'
//前后文本
export  function renderLabeledInput(children,props) {
    if (!props.addonBefore && !props.addonAfter && !props.bt && !props.at) {
        return children;
    }

    const wrapperClassName = `${props.prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBefore = props.addonBefore || props.bt ? (
        <span className={addonClassName}>
                {props.addonBefore || props.bt}
            </span>
    ) : null;

    const addonAfter = props.addonAfter || props.at ? (
        <span className={addonClassName}>
                {props.addonAfter || props.at}
            </span>
    ) : null;

    const className = classNames(`${props.prefixCls}-wrapper`, {
        [wrapperClassName]: (addonBefore || addonAfter),
    });

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    if (addonBefore || addonAfter) {
        return (
            <span
                className={classNames(props.pclassName,`${props.prefixCls}-group-wrapper`)}
                style={props.pstyle}
            >
                    <span className={className + ' short-hasaddon'}>
                        {addonBefore}
                        {React.cloneElement(children, {style: props.style})}
                        {addonAfter}
                    </span>
                </span>
        );
    }
    return (
        <span className={className}>
                {addonBefore}
            {children}
            {addonAfter}
            </span>
    );
}