import { classNames, multClass } from "../../comm-util/classNames";
export default class Bn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const { className, prefix = "alert", ...others } = props;

    //处理classddsr
    const classes = classNames(
      {
        [`${prefix}` + " "]: true,
        [`${prefix}` + "-primary"]: multClass(primary, blue)
      },
      className
    );

    const closeBn = close && (
      <button
        type="button"
        className="close"
        onClick={() => {
          this.refs.alert.remove();
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    );
    return (
      <div className={"short-alert " + classes} {...others} ref="alert">
        {closeBn}
        {this.props.children}
      </div>
    );
  }
}
