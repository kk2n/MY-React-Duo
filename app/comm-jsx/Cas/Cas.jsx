/*
 const schoolDadata = [
     {
         label: '浙江',
         value: 'zj',
         children: [{
             label: '杭州',
             value: 'hangzhou',
             children: [{
             label: '余杭',
             value: 'yuhang',
         }],
         }],
         }, {
             label: '北京',
             value: 'bj',
             children: [{
             label: '朝阳区',
             value: 'chaoyang',
         }, {
             label: '海淀区',
             value: 'haidian',
             disabled: true,
         }],
     }
 ];
*/

import React from "react";
import "./cas.scss";
import {
    multVal,
    setStyle,
    setClass,
    setss,
    doit
} from "../../comm-util/jsxTools";
import { Cascader } from "antd";

export default class Cas extends React.Component {
    render() {
        const {
            p,
            className,
            data,
            defaultValue,
            disabled,
            dis,
            _ch
        } = this.props;
        let Classes = setClass("short-cas", "cas", className);
        return (
            <Cascader
                className={Classes}
                defaultValue={defaultValue}
                options={data}
                onChange={_ch}
                placeholder={p || "请选择."}
                disabled={dis || disabled}
                showSearch
            />
        );
    }
}
