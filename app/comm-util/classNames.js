let hasOwn = {}.hasOwnProperty;
export function classNames() {
    let classes = [];

    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        if (!arg) continue;

        let argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(this && this[arg] || arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(this, arg));
        } else if (argType === 'object') {
            for (let key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(this && this[key] || key);
                }
            }
        }
    }
    return classes.join(' ');
}
//class等于多个值
export function multVal(x, y = undefined, z = undefined) {
    return x !== undefined && Number(x) !== 0 || y !== undefined && Number(y) !== 0 || z !== undefined && Number(z) !== 0
}

//找出匹配的元素
export function findObj(o,obj) {
    return _.find(o, x => x[_.keys(obj)] == _.values(obj));
}