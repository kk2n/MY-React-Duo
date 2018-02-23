/**
 * Created by likuan on 11/9 0009.
 */
import {findObj} from '../../comm-util/jsxTools'
export default function getSelVal(data) {
    return findObj(data, {selected: 1});
}