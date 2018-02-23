// import ajax from 'axios';
// ajax.defaults.baseURL = 'http://192.168.1.57:9081';
// // ajax.defaults.baseURL = '';
// export default ajax
function createXMLHttp() {
    var XmlHttp;
    if (window.ActiveXObject) {
        var arr = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
        for (var i = 0; i < arr.length; i++) {
            try {
                XmlHttp = new ActiveXObject(arr[i]);
                return XmlHttp;
            }
            catch (error) {
            }
        }
    }
    else {
        try {
            XmlHttp = new XMLHttpRequest();
            return XmlHttp;
        }
        catch (otherError) {
        }
    }
}

//添加主机
function beseUrl(x) {
    let env_t = document.getElementById('root').getAttribute('data-env');
    env_t = Boolean(env_t) ? env_t : 'http://192.168.1.57:8888';
    return env_t + x
}

export default function (custom) {
    // 初始化
    let type = custom.type; //type参数,可选
    let url = beseUrl(custom.url); //url参数，必填
    let data = custom.data; //data参数可选，只有在post请求时需要
    let dataType = custom.dataType; //datatype参数可选
    let success = custom.success; //回调函数可选
    let beforeSend = custom.beforeSend; //回调函数可选
    let complete = custom.complete; //回调函数可选
    let error = custom.error; //回调函数可选
    if (type == null) {//type参数可选，默认为get
        type = "get";
    }
    if (dataType == null) {//dataType参数可选，默认为text
        dataType = "text";
    }
    let xmlHttp = createXMLHttp(); // 创建ajax引擎对象
    xmlHttp.open(type, url, true); // 打开
    // 发送
    if (type == "GET" || type == "get" || type == "Get") {//大小写
        xmlHttp.send(null);
    }
    else if (type == "POST" || type == "post" || type == "Post") {
        if (typeof data == 'object') {
            let str = '';
            for (let key in data) {
                if (typeof data[key] == "string") {
                    str += key + '="' + data[key] + '"&';
                } else {
                    str += key + '=' + data[key] + '&';
                }
            }
            data = str.replace(/&$/, '');
        }
        xmlHttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(data);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (dataType == "text" || dataType == "TEXT") {
                if (success != null) {
                    //普通文本
                    success(xmlHttp.responseText);
                }
            } else if (dataType == "xml" || dataType == "XML") {
                if (success != null) {
                    //接收xml文档
                    success(xmlHttp.responseXML);
                }
            } else if (dataType == "json" || dataType == "JSON") {
                if (success != null) {
                    //将json字符串转换为js对象
                    success(eval("(" + xmlHttp.responseText + ")"));
                }
            }
        }
    };
};

//例子
/*
 ajax({
     url: url,
     type: 'POST' || 'GET',
     dataType: 'json',
     data: '',
     success: data => {
         this.setState({
         tdData: data.data,
        });
    }
 })
*/