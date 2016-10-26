function $(id) {
    return document.querySelector(id);
}

function accessInternet() {
    $("#btnDevTempVisit").click();
    var myDate = new Date();
    console.log(myDate.toLocaleString() + ": A click been excuted");
}

function getLeftTime() {
	window.location.reload();
	var text = document.getElementsByClassName("blue_color")[1].innerHTML;
    var hourStartPos = text.indexOf("小时");
    var miniteStartPos = text.indexOf("分钟");
    console.log(parseInt(text.substring(miniteStartPos - 2, miniteStartPos)));
    if (hourStartPos == -1 && parseInt(text.substring(miniteStartPos - 2, miniteStartPos)) < 15) {
        //请求下授权
        accessInternet();
        console.log(parseInt(text.substring(miniteStartPos - 2, miniteStartPos)));
    }
}

function init() {
	setInterval(getLeftTime ,600000);
}

init();