/**
 * Created by likuan on 10/24 0024.
 */
// 返回字符串的实际长度, 一个汉字算2个长度
String.prototype.strLen = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
};
//字符串超出省略
String.prototype.cutStr = function (len) {
    let restr = this;
    let wlength = this.replace(/[^\x00-\xff]/g, "**").length;
    if (wlength > len) {
        for (let k = len / 2; k < this.length; k++) {
            if (this.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) {
                restr = this.substr(0, k) + "..";
                break;
            }
        }
    }
    return restr;
};
//替换全部
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
};
//字符串去空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.trimAll = function () {
    return this.replace(/\s+/g, "");
};
String.prototype.trimLeft = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.trimRight = function () {
    return this.replace(/(\s*$)/g, "");
};
//判断是否以某个字符串开头
String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
};
//判断是否以某个字符串结束
String.prototype.endWith = function (s) {
    let d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
};
//判断是否包含字符串
String.prototype.strWith = function (zi) {
    if (this.indexOf(zi) >= 0) {
        return true;
    } else {
        return false;
    }
};
//ie不支持数组的foreach时，扩展
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        let T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        let O = Object(this);
        let len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            let kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
/*
 ===================================
 判断某个值是否在数组中,返回布尔
 =================================
 例：
 [1,2,3].inArray(2) ==>  true
 */
Array.prototype.inArray = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val)
            return true;
    }
    return false;
};
/*
 ===================================
 判断某个值在数组中的位置,返回序列，数字型
 =================================
 例：
 [1,2,3].indexOf(2) ==>  1
 */
Array.prototype.indexOf = function (e) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == e)
            return i;
    }
    return -1;
};
/*
 ===================================
 将数组转成对象
 =================================
 例：
 [1,2,3].toObj('name') ==>  [{name:1},{name:2},{name:3}]
 */
Array.prototype.toObj = function (name) {
    let str = [];
    this.forEach((c) => {
        str.push({[name]: c});
    });
    return str
};
//数组中是否有某个对象（只要一个kek相同,就返回真）
Array.prototype.hasObj = function (obj) {
    let arr = _.find(this, (x) => x[_.keys(obj)] == _.values(obj));
    if (arr) {
        return true
    }
    return false
};
//数组中是否有某个对象的位置（只要一个kek相同,就返回index）
Array.prototype.objIndex = function (obj) {
    let index = this.indexOf(this.findObj(obj));
    if (index >= 0) {
        return index
    } else {
        return -1;
    }
};
/*
 ===================================
 数组中找到某一个对象，返回一个对象
 =================================
 例：
 let arr=[{id:1,a:'1'},{id:2,a:'2'},{id:3,a:'3'}]
 arr=arr.findObj({id:1});
 =>{id:1,a:'1'}
 */
Array.prototype.findObj = function (obj) {
    return _.find(this, (x) => x[_.keys(obj)] == _.values(obj));
};
/*
 ===================================
 排除数组中的对象Obj，返回一个数组
 =================================
 例：
 let arr=[{id:1,a:'1'},{id:2,a:'2'},{id:3,a:'3'}]
 arr=arr.rejectObj({id:1});
 =>[{id:2,a:'3'},{id:3,a:'3'}]
 */
Array.prototype.rejectObj = function (obj) {
    return _.reject(this, (x) => x[_.keys(obj)] == _.values(obj));
};
/*
 ===================================
 过滤数组中的对象Obj，返回一个数组
 =================================
 例：
 let arr=[{id:1,a:'1'},{id:2,a:'2'},{id:3,a:'3'}]
 arr=arr.filterObj({id:1});
 =>[{id:1,a:'1'}]
 */
Array.prototype.filterObj = function (obj) {
    return _.filter(this, (x) => x[_.keys(obj)] == _.values(obj));
};
/*
 ===================================
 数组中替换某个Obj，返回一个数组
 =================================
 例：
 let arr=[{id:1,a:'1'},{id:2,a:'2'},{id:3,a:'3'}]
 arr=arr.replaceObj({id:1});
 =>[{id:1,a:'1'}]
 */
Array.prototype.replaceObj = function (obj, obj2) {
    let index = this.indexOf(this.findObj(obj));
    if (index >= 0) {
        this.splice(index, 1);
        return [...this, obj2]
    } else {
        return -1;
    }
};
//随机从数组中取一个值
Array.prototype.getRandomObj = function () {
    return this[Math.floor((Math.random() * this.length))];
};
//数组去重
Array.prototype.arrOnly = function () {
    return _.uniq(this);
};
//从json数组中找到每一项的key对应的值，返回一个数组
Array.prototype.keyToArr = function (key) {
    return _.pluck(this, key);
};



Array.prototype.eq = function (array) {
    if (!array)
        return false;
    if (this.length !== array.length)
        return false;
    for (let i = 0, l = this.length; i < l; i++) {
        if (typeof this[i]==='array'  && typeof array[i]==='array' ) {
            if (!this[i].eq(array[i]))
                return false;
        } else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
};
