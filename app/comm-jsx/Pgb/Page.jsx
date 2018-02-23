import React from 'react';
import {
    classNames
} from '../../comm-util/jsxTools'

export default class Page extends React.Component {
    static defaultProps = {
        activeClass: "active",
        disabledClass: "disabled",
        itemClass: undefined,
        linkClass: undefined,
        activeLinkCLass: undefined,
        isActive: false,
        isDisabled: false
    };

    handleClick(e) {
        const { isDisabled, pageNumber } = this.props;
        e.preventDefault();
        if (isDisabled) {
            return;
        }
        this.props.onClick(pageNumber);
    }

    render() {
        let {
          pageText,
          pageNumber,
          activeClass,
          itemClass,
          linkClass,
          activeLinkClass,
          disabledClass,
          isActive,
          isDisabled,
        } = this.props;

        const cssName = classNames(itemClass, {
          [activeClass]: isActive,
          [disabledClass]: isDisabled,
        });
				
        const linkCss = classNames(linkClass, {
            [activeLinkClass]: isActive
        });

        return (
            <li
                className={cssName}
                onClick={::this.handleClick}>
                <a className={linkCss} href="#">
                    { pageText }
                </a>
            </li>
        );
    }
}
// Page.propTypes = {
//     // You can declare that a prop is a specific JS primitive. By default, these
//     // are all optional.
//     activeClass: PropTypes.array,
// }