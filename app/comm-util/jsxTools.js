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

//class等于多个值,返回真假
export function multVal(x, y = undefined, z = undefined) {
    return x !== undefined && Number(x) !== 0 || y !== undefined && Number(y) !== 0 || z !== undefined && Number(z) !== 0
}


//当值为undefined,输出空
export function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}

//如果存在，就执行事件
export function doit(event = undefined, val, e,tar,data) {
    event ? event(val, e,tar,data) : ''
}

//设置style,宽高
export function setWhpm(attr = undefined, style) {
    if (attr && typeof attr === "string") {
        attr = _.map(attr.split(','), b => {
            return _.map(b.split(' '), a => {
                if (a === 'init') {
                    a = "initial"
                } else if (a === 'a') {
                    a = 'auto';
                } else if (a.indexOf('rem') < 0 && a.indexOf('%') < 0 && parseInt(a) >= 0) {
                    a = a + 'px'
                }
                return a
            })
        });
    }
    attr[0] && attr[0].length ? style.width = attr[0].join(' ') : '';
    attr[1] && attr[1].length ? style.height = attr[1].join(' ') : '';
    attr[2] && attr[2].length && attr[2][0] ? style.paddingTop = attr[2][0] : '';
    attr[2] && attr[2].length && attr[2][1] ? style.paddingRight = attr[2][1] : '';
    attr[2] && attr[2].length && attr[2][2] ? style.paddingBottom = attr[2][2] : '';
    attr[2] && attr[2].length && attr[2][3] ? style.paddingLeft = attr[2][3] : '';
    attr[3] && attr[3].length && attr[3][0] ? style.marginTop = attr[3][0] : '';
    attr[3] && attr[3].length && attr[3][1] ? style.marginRight = attr[3][1] : '';
    attr[3] && attr[3].length && attr[3][2] ? style.marginBottom = attr[3][2] : '';
    attr[3] && attr[3].length && attr[3][3] ? style.marginLeft = attr[3][3] : '';
}

//设置style,边和圆角
export function setBdbg(attr = undefined, style) {
    let w = 0, c = 0, s = 0;
    let p = 0, r = 0, u = 0;
    if (attr && typeof attr === "string") {
        attr = _.map(attr.split(','), (b, bb) => {
            return _.map(b.split(' '), a => {
                if (a === 'init') {
                    a = "initial"
                } else if (a === 's') {
                    a = "solid";
                    s = 1;
                } else if (a === 'd') {
                    a = "dotted";
                    s = 1;
                } else if (a.indexOf('#') >= 0) {
                    bb === 0 ? c = 1 : '';
                } else if (a === 'c') {
                    a = "center";
                    p = 1;
                } else if (a === 'l') {
                    a = "left";
                    p = 1;
                } else if (a === 'r') {
                    a = "right";
                    p = 1;
                } else if (a === 't') {
                    a = "top";
                    p = 1;
                } else if (a === 'b') {
                    a = "bottom";
                    p = 1;
                } else if (a === 'y') {
                    a = "repeat-y";
                    r = 1;
                } else if (a === 'x') {
                    a = "repeat-x";
                    r = 1;
                } else if (a === 'a') {
                    a = "auto";
                } else if (a.indexOf('.') >= 0) {
                    a = "url('" + a + "')";
                    u = 1;
                } else if (a.indexOf('rem') < 0 && a.indexOf('%') < 0 && parseInt(a) >= 0) {
                    a = a + 'px';
                    bb === 0 ? w = 1 : '';
                    bb === 2 ? p = 1 : '';
                }
                return a
            })
        });
        if (attr[0].length === 2) {
            w && s ? attr[0].push('#ddd') : '';
            w && c ? attr[0].push('solid') : '';
            s && c ? attr[0].push('1px') : '';
        } else if (attr[0].length === 1) {
            w ? attr[0].push('#ddd', 'solid') : '';
            c ? attr[0].push('1px', 'solid') : '';
            s ? attr[0].push('1px', '#ddd') : '';
        }
        !p && u ? attr[2].push('0', '0') : '';
        !r && u ? attr[2].push('no-repeat') : '';
    }
    attr[0] && attr[0].length ? style.border = attr[0].join(' ') : '';
    attr[1] && attr[1].length ? style.borderRadius = attr[1].join(' ') : '';
    attr[2] && attr[2].length ? style.background = attr[2].join(' ') : '';
    attr[3] && attr[3].length ? style.backgroundSize = attr[3].join(' ') : '';
}


//设置字体
export function setFclt(attr = undefined, style) {
    let s = 0, c = 0, w = 0;
    if (attr && typeof attr === "string") {
        attr = _.map(attr.split(','), (a, aa) => {
            if (a === 'init') {
                a = "initial"
            } else if (a === 'l') {
                a = "left";
            } else if (a === 'c') {
                a = "center";
            } else if (a === 'r') {
                a = "right";
            } else if (a === 'n') {
                a = "normal";
            } else if (a === 'b') {
                a = "bold";
            } else if (a.indexOf('rem') < 0 && a.indexOf('%') < 0 && parseInt(a) >= 0) {
                if (aa === 4) {
                    a = parseInt(a);
                } else if (!aa) {
                    a = a + 'px'
                }
            }
            return a
        });
        attr[0] ? style.fontSize = attr[0] : '';
        attr[1] ? style.color = attr[1] : '';
        attr[2] ? style.lineHeight = attr[2] : '';
        attr[3] ? style.textAlign = attr[3] : '';
        attr[4] ? style.fontWeight = attr[4] : '';
    }
}

//设置pz
export function setDfpz(attr = undefined, style) {
    if (attr && typeof attr === "string") {
        attr = _.map(attr.split(','), (b, bb) => {
            return _.map(b.split(' '), (a) => {
                if (a === 'init') {
                    a = "initial"
                } else if (a === 'l') {
                    a = "left";
                } else if (a === 'n') {
                    a = "none"
                } else if (a === 'b') {
                    a = "block"
                } else if (a === 'i') {
                    a = "inline"
                } else if (a === 'l') {
                    a = "left"
                } else if (a === 'r') {
                    a = bb === 1 ? "right" : 'relative';
                } else if (a === 's') {
                    a = "static"
                } else if (a === 'f') {
                    a = "fixed"
                } else if (a === 'a') {
                    bb === 2 ? a = "absolute" : '';
                    bb === 3 ? a = "auto" : '';
                } else if (a.indexOf('rem') < 0 && a.indexOf('%') < 0 && parseInt(a) >= 0) {
                    a = bb === 4 ? parseInt(a) : a + 'px';
                }
                return a
            })
        });
        attr[0] && attr[0].length ? style.display = attr[0] : '';
        attr[1] && attr[1].length ? style.cssFloat = attr[1] : '';
        attr[2] && attr[2].length ? style.position = attr[2] : '';
        attr[3] && attr[3].length && attr[3][0] ? style.top = attr[3][0] : '';
        attr[3] && attr[3].length && attr[3][1] ? style.right = attr[3][1] : '';
        attr[3] && attr[3].length && attr[3][2] ? style.bottom = attr[3][2] : '';
        attr[3] && attr[3].length && attr[3][3] ? style.left = attr[3][3] : '';
        attr[4] && attr[4].length ? style.zIndex = attr[4] : '';
    }
}
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};
//设置setss方法
export function setss(attr = undefined, style) {
    if (attr.length > 0&&typeof attr==='string') {
        attr=','+attr+',';
        //log(attr)
        attr = attr
            .replaceAll('\\)\\ \\(', ',')
            .replaceAll('\\)\\(', ',')
            .replace('\(', '').replace('\)', '')
            .replace(/(fl),/,'float left,')
            .replace(/(fr),/,'float right,')
            .replace(/(fs),/,'fs normal,')
            .replace(/(td),/,'td n,')
            .replace(/(tar),/,'textAlign right,')
            .replace(/(tal),/,'textAlign left,')
            .replace(/(tac),/,'textAlign center,')
            .replace(/(fw),/,'fw 400,')
            .replace(/(cup),/,'cursor pointer,')
            .replace(/(poa),/,'position absolute,')
            .replace(/(por),/,'position relative,')
            .replace(/(pof),/,'position fixed,')
            .replace(/(dn),/,'display none,')
            .replace(/(db),/,'display block,')
            .replace(/(di),/,'display inline,')
            .replace(/(dib),/,'display inline-block,')
            .replace(/(cb),/,'clear both,')
            .replace(/(jzc),/,'ml a,mr a,ta c,')
            .replace(/(jz),/,'ml a,mr a,')
            .replace(/(czc),/,'display flex,justify-content c,align-items c,')
            .replace(/(wh)\s(\w+)\s(\w+),/, "w $2,h $3,")
            .replace(/(wh)\s(\w+)\s(\w+)%,/, "w $2,h $3%,")
            .replace(/(wh)\s(\w+)%\s(\w+)%,/, "w $2%,h $3%,")
            .replace(/(wh)\s(\w+)%\s(\w+),/, "w $2%,h $3,")
            .replace(/(wh)\s(\w+),/, "w $2,h a,")
            .replace(/(wh)\s(\w+)%,/, "w $2%,h a,")
            .replace(/(wh),/, "w a,h a,")
            .replace(/(who),/, "w a,h a,o,hidden")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(\d\w*),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(#\w+),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(s|solid|d|dotted),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(\d\w*),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(s|solid|d|dotted),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(#\w+),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*),/, "$1 $2 #ddd s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+),/, "$1 $2 1 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted),/, "$1 $2 1 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl),/, "$1 s 1 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(\d\w*),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(#\w+),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(s|solid|d|dotted),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(\d\w*),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(s|solid|d|dotted),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(#\w+),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*),/, "$1 $2 #ddd s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+),/, "$1 $2 1 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted),/, "$1 $2 1 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl),/, "$1 s 1 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(\d\w*),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(#\w+),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(s|solid|d|dotted),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(\d\w*),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(s|solid|d|dotted),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(#\w+),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*),/, "$1 $2 #ddd s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+),/, "$1 $2 1 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted),/, "$1 $2 1 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl),/, "$1 s 1 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(\d\w*),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted)\s(#\w+),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(s|solid|d|dotted),/, "$1 $2 $3 1,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+)\s(\d\w*),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(s|solid|d|dotted),/, "$1 $2 $3 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*)\s(#\w+),/, "$1 $2 $3 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(\d\w*),/, "$1 $2 #ddd s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(#\w+),/, "$1 $2 1 s,")
            .replace(/(bd|bdt|bdr|bdb|bdl)\s(s|solid|d|dotted),/, "$1 $2 1 #ddd,")
            .replace(/(bd|bdt|bdr|bdb|bdl),/, "$1 s 1 #ddd,")
            .replace(/(,c),/, ",$1 #333,")
            .replace(/(,o),/, ",$1 hidden,")
            .replace(/(,op),/, ",$1 0,")
            .replace(/,(w),/, ",$1 a,")
            .replace(/,(h),/, ",$1 a,")
            .replace(/,(m),/, ",$1 a,")
            .replace(/,(ml),/, ",$1 a,")
            .replace(/,(mt),/, ",$1 a,")
            .replace(/,(mr),/, ",$1 a,")
            .replace(/,(mb),/, ",$1 a,")
            .replace(/,(bgs),/, ",$1 a,")
            .replace(/,(bg|bgc),/, ",$1 #fff,")
            .replace(/,(d)(\d),/, ",textOverflow ellipsis,overflow hidden,-webkit-box-orient vertical,-webkit-line-clamp $2,")
            .replace(/,(w)(\d+),/, ",$1 $2,")
            .replace(/,(zxw)(\d+),/, ",$1 $2,")
            .replace(/,(zdw)(\d+),/, ",$1 $2,")
            .replace(/,(zdh)(\d+),/, ",$1 $2,")
            .replace(/,(zxh)(\d+),/, ",$1 $2,")
            .replace(/,(h)(\d+),/, ",$1 $2,")
            .replace(/,(m)(\d+),/, ",$1 $2,")
            .replace(/,(mt)(\d+),/, ",$1 $2,").replace(/,(mr)(\d+),/, ",$1 $2,")
            .replace(/,(mb)(\d+),/, ",$1 $2,").replace(/,(ml)(\d+),/, ",$1 $2,")
            .replace(/,(p)(\d+),/, ",$1 $2,")
            .replace(/,(pt)(\d+),/, ",$1 $2,").replace(/,(pr)(\d+),/, ",$1 $2,")
            .replace(/,(pb)(\d+),/, ",$1 $2,").replace(/,(pl)(\d+),/, ",$1 $2,")
            .replace(/,(t)(\d+),/, ",$1 $2,")
            .replace(/,(r)(\d+),/, ",$1 $2,")
            .replace(/,(b)(\d+),/, ",$1 $2,")
            .replace(/,(l)(\d+),/, ",$1 $2,")
            .replace(/,(fz)(\d+),/, ",$1 $2,")
            .replace(/,(fw)(\d+),/, ",$1 $2,")
            .replace(/,(op)(\d+),/, ",$1 $2,")
            .replace(/,(lh)(\d),/, ",$1 $2,")
            .replace(/,(lh)(\d.\d+),/, ",$1 $2,")
            .replace(/,(lh)(\d*px),/, ",$1 $2,")
            .replace(/,(lh)(\d*rem),/, ",$1 $2,")
            .replace(/,(lh)(\d*),/, ",$1 $2,")
            .replace(/,(lhh)(\d+),/, ",lineHeight $2px,height $2px,")
            .replace(/,(lhh)(\d*px),/, ",lineHeight $2,height $2,")
            .replace(/,(lhh)(\d*rem),/, ",lineHeight $2,height $2,")
            .replace(/,(ti)(\d+),/, ",$1 $2,")
            .replace(/,(bdrs)(\d+),/, ",$1 $2,")
            .replace(/,(bgs)(\d+),/, ",$1 $2,")
            .replace(/,(bd)(\d+),/, ",$1 $2,")
            .replace(/,(bdt)(\d+),/, ",$1 $2,")
            .replace(/,(bdr)(\d+),/, ",$1 $2,")
            .replace(/,(bdb)(\d+),/, ",$1 $2,")
            .replace(/,(bdl)(\d+),/, ",$1 $2,")
            .replace(/,(z)(\d+),/, ",$1 $2,")
            .replace(/,(z)\s(\d+),/, ",zIndex $2,")
            .replace(/,(c)(#\w+),/, ",$1 $2,")
            .replace(/,(bg|bgc)(#\w+),/, ",$1 $2,")
            .split(',');
        return attr
        // log(attr)
    }
}


export function setStyle(...arg) {
    //arg[0]原始style
    //arg[1][ss,setss]
    let yy={};
    if(arg[1][0]){
        let x=_.map(_.compact(setss(arg[1][0])), (b,bb) => {
            let r = b.split(' ');
            //简写替换
            let t = _.map(r, (a, aa) => {
                        a=
                        a==='w'?'width':
                        a==='h'?'height':
                        a==='bd'?'border':
                        a==='bdrs'?'borderRadius':
                        a==='bg'?'background':
                        a==='bgc'?'backgroundColor':
                        a==='bgs'?'backgroundSize':
                        a==='bdt'?'borderTop':
                        a==='bdr'?'borderRight':
                        a==='bdb'?'borderBottom':
                        a==='bdl'?'borderLeft':
                        a==='m'?'margin':
                        a==='mt'?'marginTop':
                        a==='mr'?'marginRight':
                        a==='mb'?'marginBottom':
                        a==='ml'?'marginLeft':
                        a==='p'?'padding':
                        a==='pt'?'paddingTop':
                        a==='pr'?'paddingRight':
                        a==='pb'?'paddingBottom':
                        a==='pl'?'paddingLeft':
                        a==='po'?'position':
                        a==='zdw'?'maxWidth':
                        a==='zdh'?'maxHeight':
                        a==='zxw'?'minWidth':
                        a==='zxh'?'minHeight':
                        a==='x'?'repeat-x':
                        a==='y'?'repeat-y':
                        a==='norepeat'?'no-repeat':
                        a==='nr'?'no-repeat':
                        a==='init'?'initial':
                        a==='inher'?'inherit':
                        a==='n'?'none':
                        a==='o'?'overflow':
                        a==='op'?'opacity':
                        a==='t'?'top':
                        a==='b'?'bottom':
                        a==='r'?'right':
                        a==='l'?'left':
                        a==='z'?'zIndex':
                        a==='c'?aa===0?'color':'center':
                        a==='fz'?'fontSize':
                        a==='fs'?'fontStyle':
                        a==='fw'?'fontWeight':
                        a==='lh'?'lineHeight':
                        a==='ta'?'textAlign':
                        a==='ti'?'textIndent':
                        a==='td'?'textDecoration':
                        a==='a'?'auto':
                        a==='s'?'solid':
                        a==='d'?'dotted':
                        a.indexOf('.jpg') >= 0 || a.indexOf('.png') >= 0 || a.indexOf('.gif') >= 0 ? 'url('+ a + ')':
                        a.indexOf('rem') < 0
                        && a.indexOf('%') < 0
                        && a.indexOf('px') < 0
                        && parseInt(a) > 0
                        && b.indexOf('lh') < 0
                        && b.indexOf('fw') < 0
                        && b.indexOf('op') < 0
                        && b.indexOf('zIndex') < 0
                        && b.indexOf('-webkit-line-clamp') < 0
                        ? a + 'px': a;
                return a
            });
            return t
        });
        _.each(x,(t)=>{
            yy[t[0]] = (t[0]&&t[1]) && _.rest(t).join(' ')
        });
        return {...yy,...arg[0]}
    }
}

export function setClass(...arg) {
    let cl = {};
    _.each(arg, (a, aa) => {
        cl[`${arg[1]}` + ''] = true;
        if (aa !== 0 && aa !== 1 && aa !== 2 && a) {
            cl[`${arg[1]}` + '-' + a[1]] = a[0]
        }
    });
    return classNames(arg[0], cl, arg[2])
}

//找出匹配的元素
export function findObj(o, obj) {
    return _.find(o, x => x[_.keys(obj)] == _.values(obj));
}
//找出匹配的元素
export function filterObj(o, obj) {
    return _.filter(o, x => x[_.keys(obj)] == _.values(obj));
}

//
export function onlyId(x='onlyId',itLength=5) {
    let str=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
    return x+'_'+(str+str+str+str).substr(_.random(0,9), itLength);
}