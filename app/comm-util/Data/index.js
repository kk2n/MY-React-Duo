//数组是否包含
export function arrHasObj(arr, val) {
    let zhi = arr.findIndex(function (value, index, arr) {
        return value[_.keys(val)] == val[_.keys(val)];
    });
    if (zhi == -1) {
        return false
    }
    return true

}

//数组去除重复 delRepeat([1,2,3,4,5,1,1]),返回12345
export function delRepeat(arr){
    let o={};
    let new_arr=[];
    for(let i=0; i<arr.length; i++){
        let k=arr[i];
        if(!o[k]){
            o[k]=true;
            new_arr.push(k);
        }
    }
    return new_arr
}
//数组去重复，
export function _delRepeat(arr,isSort,iterator){
    return _.uniq(arr,isSort, iterator)
}
//数组排序
export function arrSort(arr, zmp = 3) {

    return arr;
}

export function strToJson(str) {
    return JSON.parse(str);
}
//json转字符
export function jsonToStr(json) {
    return JSON.stringify(json);
}


//数组序列互换位置
export function swapIndex(arr,index1,index2){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}

export function arrayEq(arr1,arr2) {

}