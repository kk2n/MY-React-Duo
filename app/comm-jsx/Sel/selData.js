/**
 * Created by likuan on 11/9 0009.
 */
//处理sel数据，让其支持多种格式

export default function selData(data) {
    if (data && data.length > 0) {
        let arr_tmp = [];
        _.each(data, (a, aa) => {
            if (_.isArray(a)) {
                let pa = {};
                if (a.length === 3) {
                    pa = {
                        id: a[0]||a[0]===0?a[0].toString():'',
                        name: a[1],
                        selected: a[2] === 'selected' ? 1 : a[2] === '1' ? 1 : a[2] === 1 ? 1 : a[2] === true ? 1 : 0,
                    };
                } else if (a.length === 2) {
                    pa = {
                        id: a[0]||a[0]===0?a[0].toString():'',
                        name: a[0],
                        selected: a[1] === 'selected' ? 1 : a[1] === '1' ? 1 : a[1] === 1 ? 1 : a[1] === true ? 1 : 0,
                    };
                } else if (a.length === 1) {
                    pa = {
                        id: a[0]||a[0]===0?a[0].toString():'',
                        name: a[0],
                        selected: 0,
                    };
                }
                arr_tmp.push(pa)
            } else if (_.isObject(a)) {
                arr_tmp.push(a)
            } else {
                let pa = {
                    id: (aa+1).toString(),
                    name: a,
                    selected: 0,
                };
                arr_tmp.push(pa)
            }
        });
        return arr_tmp
    }
    return false

}