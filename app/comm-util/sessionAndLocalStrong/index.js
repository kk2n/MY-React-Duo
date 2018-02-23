/**
 * Created by likuan on 10/24 0024.
 */
// 客户端存储数据,存数据
export function lsSet(key, value) {
    if (typeof (value) == 'string') {
        return localStorage.setItem(key, value);
    } else if (typeof (value) == "undefined") {
        return localStorage.setItem(key, '');
    } else if (typeof(value) == 'number') {
        return localStorage.setItem(key, value.toString());
    } else if (typeof(value) == 'object') {
        return localStorage.setItem(key, JSON.stringify(value));
    }
}
// 客户端存储数据,取数据
export function lsGet(key) {
    return localStorage.getItem(key);
}
// 客户端存储数据,del数据
export function lsDel(val) {
    return localStorage.removeItem(val);
}
export function ssSet(key, value) {
    if (typeof (value) == 'string') {
        return sessionStorage.setItem(key, value);
    } else if (typeof (value) == "undefined") {
        return sessionStorage.setItem(key, '');
    } else if (typeof(value) == 'number') {
        return sessionStorage.setItem(key, value.toString());
    } else if (typeof(value) == 'object') {
        return sessionStorage.setItem(key, JSON.stringify(value));
    }
}
export function ssGet(key) {
    return sessionStorage.getItem(key);
}
export function ssGetObj(key) {
    return JSON.parse(sessionStorage.getItem(key));
}
export function ssDel(val) {
    return sessionStorage.removeItem(val);
}
export function ssDelAll(val) {
    return sessionStorage.clear();
}