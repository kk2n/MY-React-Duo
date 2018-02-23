/**
 * Created by likuan on 11/9 0009.
 */
import {filterObj} from '../../comm-util/jsxTools'
export default function filterSelVal(data) {
    return filterObj(data, {selected: 1});
}