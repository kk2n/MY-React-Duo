import {
    classNames
} from '../../comm-util/jsxTools'
import PropTypes from "prop-types"

export default class Page extends React.Component {
    static propTypes = {
        pageText: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        pageNumber: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired,
        isDisabled: PropTypes.bool,
        activeClass: PropTypes.string,
        activeLinkClass: PropTypes.string,
        itemClass: PropTypes.string,
        linkClass: PropTypes.string,
        disabledClass: PropTypes.string
    };
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
