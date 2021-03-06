//JS日期时间选择控件
var cal;
var isFocus=false; //是否为焦点
var pickMode ={
"second":1,
"minute":2,
"hour":3,
"day":4,
"month":5,
"year":6 };
var topY=0,leftX=0; //自定义定位偏移量 2007-02-11 由 ouwt添加
//选择日期 → 由 ouwt 2007-06-10 添加，通过 ID 来选日期
function SelectDateById(id,strFormat,x,y)
{
var obj = document.getElementById(id);
if(obj == null){return false;}
obj.focus();
if(obj.onclick != null){obj.onclick();}
else if(obj.click != null){obj.click();}
else{SelectDate(obj,strFormat,x,y)}
}
//选择日期 → 由 ouwt 2006-06-25 添加
function SelectDate(obj,strFormat,mode,x,y)
{

leftX =(x == null) ? leftX : x;
topY =(y == null) ? topY : y;//自定义定位偏移量 2007-02-11 由 ouwt添加
if(document.getElementById("ContainerPanel")==null){InitContainerPanel();}
var date = new Date();
var by = date.getFullYear()-50; //最小值 → 50 年前
var ey = date.getFullYear()+50; //最大值 → 50 年后
//cal = new Calendar(by, ey,1,strFormat); //初始化英文版，0 为中文版
cal = (cal==null) ? new Calendar(by, ey, 0) : cal; //不用每次都初始化 2006-12-03 修正
cal.DateMode =pickMode["second"]; //复位
if(strFormat.indexOf('s')< 0) {cal.DateMode =pickMode["minute"];}//精度为分
if(strFormat.indexOf('m')< 0) {cal.DateMode =pickMode["hour"];}//精度为时
if(strFormat.indexOf('h')< 0) {cal.DateMode =pickMode["day"];}//精度为日
if(strFormat.indexOf('d')< 0) {cal.DateMode =pickMode["month"];}//精度为月
if(strFormat.indexOf('M')< 0) {cal.DateMode =pickMode["year"];}//精度为年
if(strFormat.indexOf('y')< 0) {cal.DateMode =pickMode["second"];}//默认精度为秒
cal.dateFormatStyleOld = cal.dateFormatStyle;
cal.dateFormatStyle = strFormat;
if(mode!=null && mode!="")
{
	cal.type=mode;
	}

cal.show(obj);
}
/**//**//**//**//**//**//**//**
* 返回日期
* @param d the delimiter
* @param p the pattern of your date
2006-06-25 由 ouwt 修改为根据用户指定的 style 来确定；
*/

String.prototype.toDate = function(style) {
var y = this.substring(style.indexOf('y'),style.lastIndexOf('y')+1);//年
var M = this.substring(style.indexOf('M'),style.lastIndexOf('M')+1);//月
var d = this.substring(style.indexOf('d'),style.lastIndexOf('d')+1);//日
var h = this.substring(style.indexOf('h'),style.lastIndexOf('h')+1);//时
var m = this.substring(style.indexOf('m'),style.lastIndexOf('m')+1);//分
var s = this.substring(style.indexOf('s'),style.lastIndexOf('s')+1);//秒
if(s == null ||s == "" || isNaN(s)) {s = new Date().getSeconds();}
if(m == null ||m == "" || isNaN(m)) {m = new Date().getMinutes();}
if(h == null ||h == "" || isNaN(h)) {h = new Date().getHours();}
if(d == null ||d == "" || isNaN(d)) {d = new Date().getDate();}
if(M == null ||M == "" || isNaN(M)) {M = new Date().getMonth()+1;}
if(y == null ||y == "" || isNaN(y)) {y = new Date().getFullYear();}
var dt ;
eval ("dt = new Date('"+ y+"', '"+(M-1)+"','"+ d+"','"+ h+"','"+ m+"','"+ s +"')");
return dt;
}
/**//**//**//**//**//**//**//**
* 格式化日期
* @param d the delimiter
* @param p the pattern of your date
* @author meizz
*/
Date.prototype.format = function(style) {
var o = {
"M+" : this.getMonth() + 1, //month
"d+" : this.getDate(), //day
"h+" : this.getHours(), //hour
"m+" : this.getMinutes(), //minute
"s+" : this.getSeconds(), //second
"w+" : "天一二三四五六".charAt(this.getDay()), //week
"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
"S" : this.getMilliseconds() //millisecond
}
if(/(y+)/.test(style)) {
style = style.replace(RegExp.$1,
(this.getFullYear() + "").substr(4 - RegExp.$1.length));
}
for(var k in o){
if(new RegExp("("+ k +")").test(style)){
style = style.replace(RegExp.$1,
RegExp.$1.length == 1 ? o[k] :
("00" + o[k]).substr(("" + o[k]).length));
}
}
return style;
}
//2007-09-14 由ouwt添加返回所选日期
Calendar.prototype.ReturnDate = function(dt) {
	
if (this.dateControl != null){
	if(this.type=='1')
	{
		$(this.dateControl).text(dt);
	}
	else
	{
		this.dateControl.value = dt;
	}
	
	
}

if(dt==""){return;}


calendar.hide();

}

Calendar.prototype.Return= function() {
	
	calendar.dateControl.value=calendar.dateControl.value;
	}

/**//**//**//**//**//**//**//**
* 日历类
* @param beginYear 1990
* @param endYear 2010
* @param lang 0(中文)|1(英语) 可自由扩充
* @param dateFormatStyle "yyyy-MM-dd";
* @version 2006-04-01
* @author KimSoft (jinqinghua [at] gmail.com)
* @update
*/
function Calendar(beginYear, endYear, lang, dateFormatStyle) {
this.beginYear = 1950;
this.endYear = 2050;
this.lang = 0; //0(中文) | 1(英文)
this.dateFormatStyle = "yyyy-MM-dd hh:mm:ss";
if (beginYear != null && endYear != null){
this.beginYear = beginYear;
this.endYear = endYear;
}
if (lang != null){
this.lang = lang
}
if (dateFormatStyle != null){
this.dateFormatStyle = dateFormatStyle
}
this.dateControl = null;
this.type='0';
this.panel = this.getElementById("calendarPanel");
this.container = this.getElementById("ContainerPanel");
this.form = null;
this.date = new Date();
this.year = this.date.getFullYear();
this.month = this.date.getMonth();
this.day = this.date.getDate();
this.hour = this.date.getHours();
this.minute = this.date.getMinutes();
this.second = this.date.getSeconds();
this.colors = {
"cur_word" : "#999999", //当日日期文字颜色
"cur_bg" : "#eeeeee", //当日日期单元格背影色
"sel_bg" : "#ccf1ff", //已被选择的日期单元格背影色 2006-12-03 ouwt添加
"sun_word" : "#999999", //星期天文字颜色
"sat_word" : "#999999", //星期六文字颜色
"td_word_light" : "#333333", //单元格文字颜色
"td_word_dark" : "#CCCCCC", //单元格文字暗色
"td_bg_out" : "#fff", //单元格背影色
"td_bg_over" : "#ccf1ff", //选择单元格背影色
"tr_word" : "#999999", //日历头文字颜色
"tr_bg" : "#fff", //日历头背影色
"input_border" : "#CCCCCC", //input控件的边框颜色
"input_bg" : "#fff" //input控件的背影色
}
/* //2008-01-29 放到了 show ，因为要做 pickMode 判断
this.draw();
this.bindYear();
this.bindMonth();
*/
//this.changeSelect();
//this.bindData(); //2006-12-30 由民工.砖家注释
}
/**//**//**//**//**//**//**//**
* 日历类属性（语言包，可自由扩展）
*/
Calendar.language = {
"year" : [[""], [""]],
"months" : [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
],
"weeks" : [["SUN","MON","TUR","WED","THU","FRI","SAT"],
["SUN","MON","TUR","WED","THU","FRI","SAT"]
],
"hour" : [["时"], ["H"]],
"minute" : [["分"], ["M"]],
"second" : [["秒"], ["S"]],
"clear" : [["清空"], ["CLS"]],
"today" : [["今天"], ["TODAY"]],
"pickTxt" : [["确定"], ["OK"]],//pickMode 精确到年、月时把今天变成“确定”
"close" : [["关闭"], ["CLOSE"]]
}

Calendar.prototype.draw = function() {
		
calendar = this;

var mvAry = [];
//mvAry[mvAry.length] = ' <form name="calendarForm" style="margin: 0px;">'; //因 <form> 不能嵌套， 2006-12-01 由ouwt改用 Div
mvAry[mvAry.length] = ' <div name="calendarForm" style="margin-top: 10px;margin-bottom:10px;border-style:outset;border-width:0pt;  background-color:#fff">';

mvAry[mvAry.length] = ' <table width="100%" border="0" cellpadding="0"  cellspacing="0" style="font-size:20px;">';
mvAry[mvAry.length] = ' <tr >';
mvAry[mvAry.length] = ' <td align="right" width="1%"><input style="border: 0px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + ';font-size:24px;margin-top:-7px;color:#999999;width:50px;height:26px;';
if(calendar.DateMode > pickMode["month"]){mvAry[mvAry.length] = 'display:none;';}//pickMode 精确到年时隐藏“月”
mvAry[mvAry.length] ='" name="prevMonth" type="button" id="prevMonth" value="&lt;" /></td>';
mvAry[mvAry.length] = ' <td align="center" width="98%" nowrap="nowrap"><select name="calendarYear" id="calendarYear" style="font-size:20px;"></select><select name="calendarMonth" id="calendarMonth" style="font-size:20px;';
if(calendar.DateMode > pickMode["month"]){mvAry[mvAry.length] = 'display:none;';}//pickMode 精确到年时隐藏“月”
mvAry[mvAry.length] = '"></select></td>';
mvAry[mvAry.length] = ' <td align="left"  width="1%"><input size="20" style="border: 0px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + '; font-size:24px;margin-top:-7px;color:#999999;width:50px;height:26px;';
if(calendar.DateMode > pickMode["month"]){mvAry[mvAry.length] = 'display:none;';}//pickMode 精确到年时隐藏“月”
mvAry[mvAry.length] ='" name="nextMonth" type="button" id="nextMonth" value="&gt;" /></td>';
mvAry[mvAry.length] = ' </tr>';
mvAry[mvAry.length] = ' </table>';
mvAry[mvAry.length] = ' <table id="calendarTable" width="100%" height="250px" style="margin-top:10px;background-color:#FFFFFF;';
if(calendar.DateMode >= pickMode["month"]){mvAry[mvAry.length] = 'display:none;';}//pickMode 精确到年、月时隐藏“天”
mvAry[mvAry.length] = '" border="0" cellpadding="3" cellspacing="1">';
mvAry[mvAry.length] = ' <tr >';
for(var i = 0; i < 7; i++) {
mvAry[mvAry.length] = ' <th style="font-weight:normal;background-color:' + calendar.colors["tr_bg"] + ';color:' + calendar.colors["tr_word"] + ';">' + Calendar.language["weeks"][this.lang][i] + '</th>';
}
mvAry[mvAry.length] = ' </tr>';
for(var i = 0; i < 6;i++){
mvAry[mvAry.length] = ' <tr align="center">';
for(var j = 0; j < 7; j++) {
if (j == 0){
mvAry[mvAry.length] = ' <td style="font-size:16px;cursor:default;color:' + calendar.colors["sun_word"] + ';"></td>';
} else if(j == 6) {
mvAry[mvAry.length] = ' <td style="font-size:16px;cursor:default;color:' + calendar.colors["sat_word"] + ';"></td>';
} else {
mvAry[mvAry.length] = ' <td style="font-size:16px;cursor:default;"></td>';
}
}
mvAry[mvAry.length] = ' </tr>';
}
//2009-03-03 添加的代码，放置时间的行
mvAry[mvAry.length] = ' <tr style="';
if(calendar.DateMode >= pickMode["day"]){mvAry[mvAry.length] = 'display:none;';}//pickMode 精确到时日隐藏“时间”
mvAry[mvAry.length] = '"><td align="center" style="font-size:16px;" colspan="7">';
mvAry[mvAry.length] = ' <select name="calendarHour" id="calendarHour" style="width:60px;margin:0px 5px 0px 10px;text-indent:10px;font-size:16px;"></select>' + Calendar.language["hour"][this.lang];
mvAry[mvAry.length] = '<span style="'
if(calendar.DateMode >= pickMode["hour"]){mvAry[mvAry.length] = 'display:none;';}//pickMode 精确到小时时隐藏“分”
mvAry[mvAry.length] = '"><select name="calendarMinute" id="calendarMinute" style="width:60px;margin:0px 5px 0px 10px;text-indent:10px;font-size:16px;"></select>' + Calendar.language["minute"][this.lang]+'</span>';
mvAry[mvAry.length] = '<span style="'
if(calendar.DateMode >= pickMode["minute"]){mvAry[mvAry.length] = 'display:none;';}//pickMode 精确到小时、分时隐藏“秒”
mvAry[mvAry.length] = '"><select name="calendarSecond" id="calendarSecond" style="width:60px;margin:0px 5px 0px 10px;text-indent:10px;font-size:16px;"></select>'+ Calendar.language["second"][this.lang]+'</span>';
mvAry[mvAry.length] = ' </td></tr>';
mvAry[mvAry.length] = ' </table>';
//mvAry[mvAry.length] = ' </from>';
mvAry[mvAry.length] = ' <div align="center" style="padding:10px 4px 10px 4px;border-top:1px solid#eeeeee;background-color:' + calendar.colors["input_bg"] + ';">';
mvAry[mvAry.length] = ' <input name="calendarClear" type="button" ontouchstart=this.style.background="#eeeeee"  id="calendarClear" value="' + Calendar.language["clear"][this.lang] + '" style="border: 1px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + ';width:23%;height:40px;margin:0px 2px;border-radius:4px;background:#fff;border:1px solid#c5c5c5;box-shadow:1px 1px 1px #999;font-weight:400;font-size:16px;color:#818181;background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#ebebeb));cursor:pointer;"/>';

mvAry[mvAry.length] = ' <input name="calendarToday"  type="button" ontouchstart=this.style.background="#eeeeee"    id="calendarToday" value="'+ Calendar.language["today"][this.lang]+'" style="border: 1px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + ';width:23%;height:40px;margin:0px 2px;border-radius:4px;background:#fff;border:1px solid#c5c5c5;box-shadow:1px 1px 1px #999;font-weight:400;font-size:16px;color:#818181;background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#ebebeb));cursor:pointer"/>';

if(calendar.DateMode!=4)
	{
mvAry[mvAry.length] = ' <input name="calendarOk"  type="button" ontouchstart=this.style.background="#eeeeee"   id="calendarOk" value="'+ Calendar.language["pickTxt"][this.lang]+'" style="border: 1px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + ';width:23%;height:40px;margin:0px 2px;border-radius:4px;background:#fff;border:1px solid#c5c5c5;box-shadow:1px 1px 1px #999;font-weight:400;font-size:16px;color:#818181;background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#ebebeb));cursor:pointer"/>';

}

mvAry[mvAry.length] = ' <input name="calendarClose"  type="button" ontouchstart=this.style.background="#eeeeee"   id="calendarClose" value="' + Calendar.language["close"][this.lang] + '" style="border: 1px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + ';width:23%;height:40px;margin:0px 2px;border-radius:4px;background:#fff;border:1px solid#c5c5c5;box-shadow:1px 1px 1px #999;font-weight:400;font-size:16px;color:#818181;background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#ebebeb));cursor:pointer"/>';
mvAry[mvAry.length] = ' </div>';
mvAry[mvAry.length] = ' </div>';
this.panel.innerHTML = mvAry.join("");
/**//**//**//******** 以下代码由ouwt 2006-12-01 添加 **********/
var obj = this.getElementById("prevMonth");
obj.onclick = function () {calendar.goPrevMonth(calendar);}
obj.onblur = function () {calendar.onblur();}
this.prevMonth= obj;
obj = this.getElementById("nextMonth");
obj.onclick = function () {calendar.goNextMonth(calendar);}
obj.onblur = function () {calendar.onblur();}
this.nextMonth= obj;
obj = this.getElementById("calendarClear");
obj.onclick = function ()
{ calendar.ReturnDate(""); /*calendar.dateControl.value = "";calendar.hide();*///2007-09-14 由ouwt注释
}
this.calendarClear = obj;
obj = this.getElementById("calendarClose");
obj.onclick = function () {calendar.hide();}
this.calendarClose = obj;
obj = this.getElementById("calendarYear");
obj.onchange = function () {calendar.update(calendar);}
obj.onblur = function () {calendar.onblur();}
this.calendarYear = obj;
obj = this.getElementById("calendarMonth");
with(obj)
{
onchange = function () {calendar.update(calendar);}
onblur = function () {calendar.onblur();}
}this.calendarMonth = obj;
obj = this.getElementById("calendarHour");
obj.onchange = function () {calendar.hour = this.options[this.selectedIndex].value;}
obj.onblur = function () {calendar.onblur();}
this.calendarHour = obj;
obj = this.getElementById("calendarMinute");
obj.onchange = function () {calendar.minute = this.options[this.selectedIndex].value;}
obj.onblur = function () {calendar.onblur();}
this.calendarMinute = obj;
obj = this.getElementById("calendarSecond");
obj.onchange = function () {calendar.second = this.options[this.selectedIndex].value;}
obj.onblur = function () {calendar.onblur();}
this.calendarSecond = obj;
obj = this.getElementById("calendarToday");
obj.onclick = function () {
var today =new Date(); 

calendar.ReturnDate(today.format(calendar.dateFormatStyle));
}

if(calendar.DateMode!=4)
	{
obj = this.getElementById("calendarOk");
obj.onclick = function () {
var today = new Date(calendar.year,calendar.month,calendar.day,calendar.hour,calendar.minute,calendar.second);
calendar.ReturnDate(today.format(calendar.dateFormatStyle));
}
}


this.calendarToday = obj;
}
//年份下拉框绑定数据
Calendar.prototype.bindYear = function() {
var cy = this.calendarYear;//2006-12-01 由ouwt修改
cy.length = 0;
for (var i = this.beginYear; i <= this.endYear; i++){
cy.options[cy.length] = new Option(i + Calendar.language["year"][this.lang], i);
}
}
//月份下拉框绑定数据
Calendar.prototype.bindMonth = function() {
var cm = this.calendarMonth;//2006-12-01 由ouwt修改
cm.length = 0;
for (var i = 0; i < 12; i++){
cm.options[cm.length] = new Option(Calendar.language["months"][this.lang][i], i);
}
}
//小时下拉框绑定数据
Calendar.prototype.bindHour = function() {
var ch = this.calendarHour;
if(ch.length > 0){return;}//2009-03-03 不需要重新绑定，提高性能
//ch.length = 0;
var h;
for (var i = 0; i < 24; i++){
h = ("00" + i +"").substr(("" + i).length);
ch.options[ch.length] = new Option(h, h);
}
}
//分钟下拉框绑定数据
Calendar.prototype.bindMinute = function() {
var cM = this.calendarMinute;
if(cM.length > 0){return;}//2009-03-03 不需要重新绑定，提高性能
//cM.length = 0;
var M;
for (var i = 0; i < 60; i++){
M = ("00" + i +"").substr(("" + i).length);
cM.options[cM.length] = new Option(M, M);
}
}
//秒钟下拉框绑定数据
Calendar.prototype.bindSecond = function() {
var cs = this.calendarSecond;
if(cs.length > 0){return;}//2009-03-03 不需要重新绑定，提高性能
//cs.length = 0;
var s;
for (var i = 0; i < 60; i++){
s = ("00" + i +"").substr(("" + i).length);
cs.options[cs.length] = new Option(s, s);
}
}
//向前一月
Calendar.prototype.goPrevMonth = function(e){
if (this.year == this.beginYear && this.month == 0){return;}
this.month--;
if (this.month == -1) {
this.year--;
this.month = 11;
}
this.date = new Date(this.year, this.month, 1);
this.changeSelect();
this.bindData();
}
//向后一月
Calendar.prototype.goNextMonth = function(e){
if (this.year == this.endYear && this.month == 11){return;}
this.month++;
if (this.month == 12) {
this.year++;
this.month = 0;
}
this.date = new Date(this.year, this.month, 1);
this.changeSelect();
this.bindData();
}
//改变SELECT选中状态
Calendar.prototype.changeSelect = function() {
var cy = this.calendarYear;//2006-12-01 由ouwt修改
var cm = this.calendarMonth;
var ch = this.calendarHour;
var cM = this.calendarMinute;
var cs = this.calendarSecond;
//2006-12-30 由民工.砖家修改，减少运算次数
cy[this.date.getFullYear()-this.beginYear].selected = true;
cm[this.date.getMonth()].selected =true;
//2009-03-03 添加，初始化时间的值
ch[this.hour].selected =true;
cM[this.minute].selected =true;
cs[this.second].selected =true;
}
//更新年、月
Calendar.prototype.update = function (e){
this.year = e.calendarYear.options[e.calendarYear.selectedIndex].value;//2006-12-01 由ouwt修改
this.month = e.calendarMonth.options[e.calendarMonth.selectedIndex].value;
this.date = new Date(this.year, this.month, 1);
//this.changeSelect();
this.bindData();
}
//绑定数据到月视图
Calendar.prototype.bindData = function () {
var calendar = this;
if(calendar.DateMode >= pickMode["month"]){return;}//2008-01-29
// var dateArray = this.getMonthViewArray(this.date.getYear(), this.date.getMonth());
//2006-12-30 由民工.砖家修改 在Firefox 下年份错误
var dateArray = this.getMonthViewArray(this.date.getFullYear(), this.date.getMonth());
var tds = this.getElementById("calendarTable").getElementsByTagName("td");
for(var i = 0; i < tds.length; i++) {
tds[i].style.backgroundColor = calendar.colors["td_bg_out"];
tds[i].onclick = function () {return;}
tds[i].onmouseover = function () {return;}
tds[i].onmouseout = function () {return;}
if (i > dateArray.length - 1) break;
tds[i].innerHTML = dateArray[i];

if (dateArray[i] != "&nbsp;"){
tds[i].bgColorTxt = "td_bg_out"; //2009-03-03 保存背景色的class
var cur = new Date();
tds[i].isToday = false;
if (cur.getFullYear() == calendar.date.getFullYear() && cur.getMonth() == calendar.date.getMonth() && cur.getDate() == dateArray[i]) {
//是今天的单元格
tds[i].style.backgroundColor = calendar.colors["cur_bg"];
tds[i].bgColorTxt = "cur_bg";
tds[i].isToday = true;
}
if(calendar.dateControl != null )
{
cur = calendar.dateControl.value.toDate(calendar.dateFormatStyle);
if (cur.getFullYear() == calendar.date.getFullYear() && cur.getMonth() == calendar.date.getMonth()&& cur.getDate() == dateArray[i]) {
//是已被选中的单元格
calendar.selectedDayTD = tds[i];
tds[i].style.backgroundColor = calendar.colors["sel_bg"];
tds[i].bgColorTxt = "sel_bg";
}
}
tds[i].onclick = function () {

//if(calendar.DateMode == pickMode["day"]) //2009-03-03 当选择日期时，点击格子即返回值
//{
//calendar.ReturnDate(new Date(calendar.date.getFullYear(),calendar.date.getMonth(),this.innerHTML).format(calendar.dateFormatStyle));

var today = new Date(calendar.date.getFullYear(),calendar.date.getMonth(),this.innerHTML,calendar.hour,calendar.minute,calendar.second);

//}
//else
//{
if(calendar.selectedDayTD != null) //2009-03-03 清除已选中的背景色
{
	var color=calendar.selectedDayTD.isToday? calendar.colors["cur_bg"] : calendar.colors["td_bg_out"];
//calendar.selectedDayTD.style.backgroundColor =(calendar.selectedDayTD.isToday)? calendar.colors["cur_bg"] : calendar.colors["td_bg_out"];
	//calendar.selectedDayTD.style.backgroundColor = calendar.colors["cur_bg"];
	$(calendar.selectedDayTD).css("backgroundColor",color);
}
this.style.backgroundColor = calendar.colors["sel_bg"];
calendar.day = this.innerHTML;
calendar.selectedDayTD = this; //2009-03-03 记录已选中的日子

calendar.ReturnDate(today.format(calendar.dateFormatStyle));
}




}
tds[i].style.cursor ="pointer"; //2007-08-06 由ouwt添加，鼠标变成手指状
tds[i].onmouseover = function () {
	if(this.innerHTML!= "&nbsp;")
	{
	this.style.backgroundColor = calendar.colors["td_bg_over"];
	}

}
tds[i].onmouseout = function () {
if(calendar.selectedDayTD != this) {
this.style.backgroundColor = calendar.colors[this.bgColorTxt];}
}
tds[i].onblur = function () {calendar.onblur();}
}
//}
}
//根据年、月得到月视图数据(数组形式)
Calendar.prototype.getMonthViewArray = function (y, m) {
var mvArray = [];
var dayOfFirstDay = new Date(y, m, 1).getDay();
var daysOfMonth = new Date(y, m + 1, 0).getDate();
for (var i = 0; i < 42; i++) {
mvArray[i] = "&nbsp;";
}
for (var i = 0; i < daysOfMonth; i++){
mvArray[i + dayOfFirstDay] = i + 1;
}
return mvArray;
}
//扩展 document.getElementById(id) 多浏览器兼容性 from meizz tree source
Calendar.prototype.getElementById = function(id){
if (typeof(id) != "string" || id == "") return null;
if (document.getElementById) return document.getElementById(id);
if (document.all) return document.all(id);
try {return eval(id);} catch(e){ return null;}
}
//扩展 object.getElementsByTagName(tagName)
Calendar.prototype.getElementsByTagName = function(object, tagName){
if (document.getElementsByTagName) return document.getElementsByTagName(tagName);
if (document.all) return document.all.tags(tagName);
}
//取得HTML控件绝对位置
Calendar.prototype.getAbsPoint = function (e){
var x = e.offsetLeft;
var y = e.offsetTop;
while(e = e.offsetParent){
x += e.offsetLeft;
y += e.offsetTop;
}
return {"x": x, "y": y};
}
//显示日历
Calendar.prototype.show = function (dateObj, popControl) {
if (dateObj == null){
throw new Error("arguments[0] is necessary")
}
this.dateControl = dateObj;
var now = new Date();
if(this.type=='1')
{
	this.date = ($(dateObj).text().length > 0) ? new Date($(dateObj).text().toDate(this.dateFormatStyle)) : now.format(this.dateFormatStyle).toDate(this.dateFormatStyle) ;//2008-01-29 ouwt添加 → 若为空则根据dateFormatStyle初始化日期

	}
else
{
	this.date = (dateObj.value.length > 0) ? new Date(dateObj.value.toDate(this.dateFormatStyle)) : now.format(this.dateFormatStyle).toDate(this.dateFormatStyle) ;//2008-01-29 ouwt添加 → 若为空则根据dateFormatStyle初始化日期

}


if(this.panel.innerHTML==""||cal.dateFormatStyleOld != cal.dateFormatStyle)//2008-01-29 把构造表格放在此处，2009-03-03 若请示的样式改变，则重新初始化
{
this.draw();
this.bindYear();
this.bindMonth();
this.bindHour();
this.bindMinute();
this.bindSecond();
}
this.year = this.date.getFullYear();
this.month = this.date.getMonth();
this.day = this.date.getDate();
this.hour = this.date.getHours();
this.minute = this.date.getMinutes();
this.second = this.date.getSeconds();
this.changeSelect();
this.bindData();
if (popControl == null){
popControl = dateObj;
}
var xy = this.getAbsPoint(popControl);
//this.panel.style.left = xy.x + "px";
//this.panel.style.top = (xy.y + dateObj.offsetHeight) + "px";
this.panel.style.left = (xy.x + leftX)+ "px"; //由ouwt 2007-02-11 修改 → 加入自定义偏移量
this.panel.style.top = (xy.y + topY + dateObj.offsetHeight) + "px";
//由ouwt 2006-06-25 修改 → 把 visibility 变为 display，并添加失去焦点的事件 //this.setDisplayStyle("select", "hidden");
//this.panel.style.visibility = "visible";
//this.container.style.visibility = "visible";
this.panel.style.display = "";
this.container.style.display = "";
if( !this.dateControl.isTransEvent)
{
this.dateControl.isTransEvent = true;
/* 已写在返回值的时候 ReturnDate 函数中，去除验证事件的函数
this.dateControl.changeEvent = this.dateControl.onchange;//将 onchange 转成其它函数，以免触发验证事件
this.dateControl.onchange = function()
{if(typeof(this.changeEvent) =='function'){this.changeEvent();}}*/
if(this.dateControl.onblur != null){
this.dateControl.blurEvent = this.dateControl.onblur;}//2007-09-14 保存主文本框的 onblur ，使其原本的事件不被覆盖
this.dateControl.onblur = function()
{calendar.onblur();if(typeof(this.blurEvent) =='function'){this.blurEvent();}
}
}
this.container.onmouseover = function(){isFocus=true;}
this.container.onmouseout = function(){isFocus=false;}
}
//隐藏日历
Calendar.prototype.hide = function() {
//this.setDisplayStyle("select", "visible");
//this.panel.style.visibility = "hidden";
//this.container.style.visibility = "hidden";
//this.panel.style.display = "none";
//this.container.style.display = "none";
//isFocus=false;
	
	api.close();
}
//焦点转移时隐藏日历 → 由ouwt 2006-06-25 添加
Calendar.prototype.onblur = function() {
if(!isFocus){this.hide();}
}
//以下由ouwt 2007-07-26 修改 → 确保日历容器节点在 body 最后，否则 FireFox 中不能出现在最上方
function InitContainerPanel() //初始化容器
{
var str = '<div id="calendarPanel" style="background-color: #FFFFFF;border: 1px solid #CCCCCC;width:100%;font-size:12px;"></div>';
if(document.all)
{
str += '<iframe style="width:expression(this.previousSibling.offsetWidth);';
str += 'height:expression(this.previousSibling.offsetHeight);';
str += 'left:expression(this.previousSibling.offsetLeft);top:expression(this.previousSibling.offsetTop);';
str += 'display:expression(this.previousSibling.style.display);" scrolling="no" frameborder="no"></iframe>';
}
//var div=document.getElementById("ContainerPanel");
var div = document.createElement("div");
div.innerHTML = str;
div.id = "ContainerPanel";
div.style.display ="none";

document.body.appendChild(div);

}




//调用calendar.show(dateControl, popControl);
//-->
