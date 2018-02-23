import React from 'react';
function Tit(props) {
    let {
        t1, t2, myclass
    } = props;
    return <div className="sys-page-tit1">
        <div className={myclass ? myclass + ' sys-main-top' : 'sys-main-top' }>
            <h1><span>{t1}</span></h1>
            <div className="sys-main-com">
                {t2}
            </div>
        </div>
    </div>
}
export default Tit;