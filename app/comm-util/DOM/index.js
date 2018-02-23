/**
 * Created by likuan on 10/24 0024.
 */
//转义html标签
export function htmlEncode(text) {
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>')
}
//反义html标签
export function htmlDecode(text) {
    let temp = document.createElement("div");
    temp.innerHTML = text;
    let output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}
//获取页面高度
export function getDocHei() {
    let g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
//获取页面宽度
export function getDocWid() {
    let g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}
//获取页面可视宽度
export function getWinWid() {
    let d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientWidth;
}
//获取页面可视高度
export function getWinHei() {
    let d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientHeight;
}


//判断所用浏览器，直接返回浏览器名称，IE下返回版本...
//@return {string}
export function browserVer() {
    let explorer = window.navigator.userAgent;
    let browser = "";
    if (explorer.indexOf("MSIE") >= 0) {// ie10及以下
        let b_version = navigator.appVersion;
        let version = b_version.split(";");
        version = version[1].replace(/[ ]/g, "");
        version = version.split('MSIE')[1];
        browser = 'IE:' + version;
    } else if (explorer.indexOf("Firefox") >= 0) {// Firefox
        browser = 'Firefox';
    } else if (explorer.indexOf("Chrome") >= 0) {// Chrome
        browser = 'Chrome';
    } else if (explorer.indexOf("Opera") >= 0) {// Opera
        browser = 'Opera';
    } else if (explorer.indexOf("Safari") >= 0) {// Safari
        browser = 'Safari';
    } else if (explorer.indexOf("Trident/7.0") >= 0) {// IE11
        browser = 'IE:10.0以上';
    }
    return browser;
}
/*=================================
 根据ID获取DOM
 @return {object},但强制转换成数组对象
 =================================
 */
export function getId(id) {
    return [document.getElementById(id.replaceAll('#', ''))]
}
/*=================================
 根据class获取DOM
 @return {array}
 =================================
 */
export function getClass(myclass) {
    return document.getElementsByClassName(myclass.replaceAll('\\.', ''))
}
export function addClass(tag, name) {
    tag.className += " " + name;
}
//获取url参数
export function getUrl(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
export function goUrl(url) {
    window.location.href=url;
}
/**
 * 动态加载脚本文件
 */
export function appendscript(src, text, reload, charset) {
    let id = hash(src + text);
    if (!reload && in_array(id, evalscripts))
        return;
    if (reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }

    evalscripts.push(id);
    let scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset
        : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function () {
                if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete')
                    && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch (e) {
    }
}

//生成下载,以下载文件框的形式弹出
export function downOpen(href, title) {
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('download', title);
    a.click();
}

//动态创建表单
export function formSubmit(data={},url='',_blank=0) {
    let turnForm = document.createElement("form");
    document.body.appendChild(turnForm);
    turnForm.method = 'post';
    turnForm.action = url;
    _blank?turnForm.target = '_blank':'';
    let newElement = document.createElement("input");
    newElement.setAttribute("name","obj");
    newElement.setAttribute("type","hidden");
    newElement.setAttribute("value",jsonToStr(data));
    turnForm.appendChild(newElement);
    turnForm.submit();
}
