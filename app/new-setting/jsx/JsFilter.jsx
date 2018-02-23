import React from 'react';
import Cas from '../../comm-jsx/Cas/Cas.jsx'
import {Bn} from '../../comm-jsx'
import {Switch} from 'antd';

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {
            schoolData,
            schoolSel,
            gradeData,
            gradeSel,
            _pdel,
            pshow,
            taocanshow,
            defschool,
            showPageKecheng,
            hideAddFrom,
            editFromShow,
            jingyong,
        } = this.props;
        return <div className="filter-dd">
            <div className="fl">
                学校：
                {schoolData && schoolData.length === 1 ?
                    <Cas key="1" defaultValue={defschool} data={schoolData} _ch={schoolSel} allowClear={false}  disabled={hideAddFrom||editFromShow||jingyong}/> :
                    <Cas key="2" data={schoolData} _ch={schoolSel} disabled={hideAddFrom||editFromShow||jingyong}/>
                }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {gradeData.length > 0 && <span>年级：<Cas className={'gu-width'} data={gradeData} _ch={gradeSel} disabled={hideAddFrom||editFromShow||jingyong}/></span>}
            </div>
            {pshow && <div className="fr">
                <Bn blue t="批量删除" ss="ml10,mr10" onClick={_pdel}/>
            </div>}
            {taocanshow &&
            <div className="fr">
                显示课程套餐：<Switch disabled={hideAddFrom||editFromShow} defaultChecked={false} onChange={(check) => {
                showPageKecheng(check)
            }}/>
            </div>
            }

        </div>
    }
}
export default Filter;