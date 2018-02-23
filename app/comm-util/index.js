/*=========================
 Arr数组和Str字符串的原型扩展
=========================*/
import './prototype'

/*=========================
 session和LocalStrong数据存储
=========================*/
export {
    lsSet, lsGet, lsDel, ssSet, ssGet, ssDel, ssDelAll, ssGetObj
}
    from './sessionAndLocalStrong'

/*=========================
 DOM相关
=========================*/
export {
    htmlDecode, htmlEncode, getClass, getDocHei, getDocWid, getWinWid, getWinHei,
    browserVer, getId, addClass, getUrl, goUrl, appendscript, downOpen, formSubmit
} from './DOM'

/*=========================
 数据和字符串转化
=========================*/
export {
    arrHasObj,arrSort,jsonToStr,strToJson,swapIndex,delRepeat,_delRepeat
} from './Data'

//是否
export function isTrue(or,yes,no){
    if(or){
        yes()
    }else{
        no()
    }
}

//获取当前日期
export function getNowDate(x) {
    let lianjie = x || '-';//连接符
    let now = new Date();
    let month = now.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let day = now.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return now.getFullYear() + lianjie + month + lianjie + day;
}

//判断字符是否为数字，两个参数（1:字符，2:强制模式[012]不能算数字，默认为true）
//例子：
// strIsNumber('0123',true)//返回false
// strIsNumber('0123',false)//返回true
export function strIsNumber(x,y=true){
    let reg=y?/^[1-9]\d*$|^0$/:/^\d+$/;    
    return reg.test(x);
}
export function strIsFloat(x){
    let reg=/^\d+(\.\d+)?$/;
    return reg.test(x);
}
export default {}