function $(id) {
  return document.querySelector(id);
}

function success(text) {
    var textpos = $("#time_left");
    var startPos = text.indexOf("访问外网时间剩余");
    var endPos = text.indexOf("分钟");
    var timeStr = text.substring(startPos + 31, endPos + 2);

    var hourStartPos = timeStr.indexOf("小时");
    var miniteStartPos = timeStr.indexOf("分钟");
    if (hourStartPos == -1 && parseInt(timeStr.substring(miniteStartPos - 2, miniteStartPos)) < 5) {
        //请求下授权
        accessInternet(text);
    }
}



function fail(code) {
    var textpos = $("#time_left");
    textpos.innerHTML = 'Error Code: ' + code;
}

function executeAjax() {
    var request = new XMLHttpRequest();
    request.withCredentials = true; 

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                return success(request.responseText)
            } else {
                return fail(request.status)
            }
        } else {
        }
    }

    request.open('GET', 'http://auth-proxy.oa.com/DevNetTempVisit.aspx');
    request.send();
}

function getLeftTime() {
  //定期获取 OA 网站内容
  executeAjax();
  setInterval(executeAjax, 1000);
}

function accessInternet(text) {
     text.querySelector("#btnDevTempVisit").click();
     var myDate = new Date();
     console.log(myDate.toLocaleString() + ": A click been excuted");
}

function init() {
  getLeftTime();
}

init();
