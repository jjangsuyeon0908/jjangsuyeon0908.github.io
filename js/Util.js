// *************************************************************
// �ֹε�Ϲ�ȣ ��Ģ�˻�
// *************************************************************
function idcheck(obj){
	str = obj.value;
	for(i = 0 ; i < str.length ; i++) {
		chk = str.charAt(i);
		if ((chk < '0' || chk > '9')&&(chk < 'a' || chk > 'z')) {
			return false;
		}
	}
}

// *************************************************************
// ���ĺ� & ���ڰ� üũ
// *************************************************************
function isAlphaNum(str){
	var filter = str.search(/[^0-9a-zA-Z]/g);
	if(filter > -1){
		return "1"
	}else{
		var chk_num = str.search(/[0-9]/g);
		var chk_eng = str.search(/[a-z]/ig);
		if(chk_num < 0 || chk_eng < 0){
			return "2"
		}
	}
}


// *************************************************************
// �ֹε�Ϲ�ȣ ��Ģ�˻�
// *************************************************************
function isJumin(num1,num2) {
	var num = num1 + "-" + num2;
    var pattern = /^([0-9]{6})-?([0-9]{7})$/;
    if (!pattern.test(num)){
	//return raiseError(field1,"�ùٸ� ������ �ƴմϴ�.");
		//alert("�ùٸ� �ֹε�Ϲ�ȣ ������ �ƴմϴ�.");
		//field1.focus();
		return true;
	}
    num = RegExp.$1 + RegExp.$2;
	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";
	for (var i=0; i<12; i++) {
		if (isNaN(num.substring(i,i+1))){
			//return raiseError(field1,"�ùٸ� ������ �ƴմϴ�.");
			//alert("�ùٸ� �ֹε�Ϲ�ȣ ������ �ƴմϴ�.");
			//field1.focus();
			return true;
		}
		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;
	//return ((11 - mod) % 10 == last) ? true : raiseError(field1,"�ùٸ� ������ �ƴմϴ�.");
	if(((11 - mod) % 10 == last) != true){
		//alert("�ùٸ� �ֹε�Ϲ�ȣ ������ �ƴմϴ�.");
		//field1.focus();
		return true;
	}
}
// *************************************************************
// param �� ������ ������ �� ��� true �� ��ȯ�Ѵ�.
// *************************************************************
function is_int(param){
	param=parseFloat(param);
	if (isNaN(param)) return false;
	if (param.toString().indexOf(".")>=0) return false;
	return true;
}

// *************************************************************
// �ؽ�Ʈ�ڽ� �Է����� ���ڸ� �Է��� ����Ѵ�.
// *************************************************************
function is_int_press(){
	var key = event.keyCode;
	var messageArea = document.getElementById("ssnMessage");
	if(!(key==8||key==9||key==13||key==46||key==144||(key>=48&&key<=57)||key==110||key==190)){
		if(event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
}
// *************************************************************
// �ؽ�Ʈ�ڽ� �Է����� ���ڸ� �Է��� ���, �˸�â ����.
// *************************************************************
function is_int_press2(){
	var key = event.keyCode;
	var messageArea = document.getElementById("ssnMessage");
	if(!(key==8||key==9||key==13||key==46||key==144||(key>=48&&key<=57)||key==110||key==190)){
		alert('���ڷθ� �Է��ϼ���.');
		event.returnValue = false;
		return false;
	}
}

// *************************************************************
// �ؽ�Ʈ�ڽ� �Է����� ���ڸ� �Է��� ����Ѵ�.
// *************************************************************
function is_int_press3(){
	var key = event.keyCode;
	var messageArea = document.getElementById("ssnMessage");
	if(!((key>=48&&key<=57))){	//���ڸ� ���
		event.returnValue = false;
	}
}


function is_int_press4(digitChar) {
    if ( digitChar == null ) return false ;
    for(var i=0;i<digitChar.length;i++){
       var c=digitChar.charCodeAt(i);
       if( !(  0x30 <= c && c <= 0x39 ) ) {
        return false ;
       }
     }
    return true ;
}


// *************************************************************
// �ؽ�Ʈ�ڽ� �Է����� �ѱ۸� �Է��� ����Ѵ�.
// *************************************************************
function is_kor_press(){
	var key = event.keyCode;
    var pattern = new RegExp('[^��-�R\x20]', 'i');
    if (pattern.exec(key) != null) {
		alert('�ѱ۷� �Է��ϼ���.');
		event.returnValue = false;
    }
}


function is_kor_press2( koreanChar ) {

   if ( koreanChar == null ) return false ;

   for(var i=0; i < koreanChar.length; i++){
     var c=koreanChar.charCodeAt(i);
     if( !( ( 0xAC00 <= c && c <= 0xD7A3 ) || ( 0x3131 <= c && c <= 0x318E ) ) ) {
		 alert('�ѱ۷� �Է��ϼ���.');
		 return false ;
     }
   }
   return true ;
}

// *************************************************************
// Ư�������� ���翩�θ� �����Ѵ�.
// *************************************************************
function CheckSpecial(str){
	var pattern = /[~!@\#$%^&*\()\-=+_']/gi;
	return (pattern.test(str)) ? true : false;
}

// *************************************************************
// �������忡 ����� �� ���� Ư�������� ���翩�θ� �����Ѵ�.
// *************************************************************
//function CheckSpecial(str){
//	var pattern = /[\/:*?"<>|]/g;
//	return (pattern.test(str)) ? true : false;
//}


// *************************************************************
// �ؽ�Ʈ�ڽ��� �Էµ� ������ Byte ���� �����Ѵ�.
// *************************************************************
function getByteLength(input) {
    var byteLength = 0;
    for (var inx = 0; inx < input.value.length; inx++) {
        var oneChar = escape(input.value.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }
    return byteLength;
}

// *************************************************************
// �ؽ�Ʈ�ڽ� �ڵ���Ŀ��
// *************************************************************
function nextFocus(len,curr,next){
	var obj_curr = document.getElementById(curr);
	var obj_next = document.getElementById(next);
	if(obj_curr.value.length == len){
		obj_next.focus();
	}
}
// *************************************************************
// ���� ȭ���μ�
// *************************************************************
function to_print(title){
	var f = document.toprint;
	f.title.value = title;
	f.contents.value = id_print.innerHTML;
	f.action = "?fd=common&pg=common&md=print";
	f.submit();
}

// *************************************************************
// ���� ������ȯ
// *************************************************************
function to_excel(title,url){
	var f = document.toexcel,pr,sp;
	pr = prompt("������ �Է��� �ּ���!",title);
	/*
	if(!pr){
		alert("���� �̸��� �Է��ϼ���!");
		to_excel(title);
		return;
	}
	*/
	if(pr){
		if(CheckSpecial(pr) == true){
			alert("���� �̸��� ���� ���ڰ� �� �� �����ϴ�. \ / : * ? \" < > |");
			to_excel(title);
			return;
		}
		if(url){
			location.href = url;
		}else{
			f.title.value = pr;
			f.contents.value = id_excel.innerHTML;
			f.colspan.value = id_excel.colspan;
			f.submit();
		}
	}else{
		return;
	}
}

// *************************************************************
//
// intOLEcmd = 7 , intOLEparam = '' : �̸�����
// intOLEcmd = 8 , intOLEparam = '' : ������ ����
// intOLEcmd = 6 , intOLEparam = 1  : �μ��ϱ� (window.print())
// intOLEcmd = 6 , intOLEparam = -1 : �ٷ��μ�
//
// *************************************************************
function ieExecWB(intOLEcmd,intOLEparam){
	var obj = "<object id='WebBrowser' classid='CLSID:8856F961-340A-11D0-A96B-00C04FD705A2'></object>";
	document.body.insertAdjacentHTML('beforeEnd',obj);
	if((!intOLEparam) || (intOLEparam < -1) || (intOLEparam > 1)){
		intOLEparam = 1;
	}
	//alert(typeof(document.all['btn']));
	//if(document.all['btn'] != undefiend){
		document.all['btn'].style.display = "none";
	//}
	WebBrowser.ExecWB(intOLEcmd,intOLEparam);
	WebBrowser.outerHTML = "";
	//if(document.all['btn'] != undefiend){
		document.all['btn'].style.display = "";
	//}
}

function printSpanHide(name){
	var obj = eval("document.all['"+name+"']");
	obj.style.display = "none";
	ieExecWB(7);
	obj.style.display = "";
}

// *************************************************************
// url�� ���α׷� �������� �񵿱������ �����Ѵ�.
// *************************************************************
function getAjax(url){
	var xmlhttp;
	if(xmlhttp && xmlhttp.readyState!=0){
		xmlhttp.abort();
	}try{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}catch(e){
		try{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			xmlhttp = false;
		}
	}
	if(!xmlhttp && typeof XMLHttpRequest!=UD) _req = new XMLHttpRequest();
	if(xmlhttp){
		xmlhttp.open("GET", url, false);
		xmlhttp.send(null);
	}
	return result = xmlhttp.readyState == 4 ? xmlhttp.responseText : "";
}

// *************************************************************
// �񵿱�� ó������ xmlhttp ��ü �����Լ� by Hwang (20110331)
// *************************************************************
function getXMLHttpRequest() {
	var request = false;
	try {
		request = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				request = false;
			}
		}
	}

	if (!request) {
		return false;
	}

	return request;
}

// *************************************************************
// �����ȣã�� ���α׷� ��â���� ����ش�.
// *************************************************************
function ZipWindow(ref,what){
	var window_left = (screen.width-640)/2;
	var window_top = (screen.height-480)/2;
	ref = ref + "?what=" + what;
	aa = window.open(ref,"zipWin",'width=500,height=300,status=no,top=' + window_top + ',left=' + window_left + '');
	if(aa) aa.focus();
}

// *************************************************************
// ���� üũ�ڽ��� ��� ���� �� ������ �����Ѵ�.
// *************************************************************
function checkbox_selectAll(f,cbname,bool){
	if(!f.elements[cbname]) return;
	if(f.elements[cbname].length == undefined){
		if(bool)f.elements[cbname].checked = true;
		else f.elements[cbname].checked = false;
	}else{
		for(i=0;i<f.elements[cbname].length;i++){
			if(bool)f.elements[cbname][i].checked = true;
			else f.elements[cbname][i].checked = false;
		}
	}
}

// *************************************************************
// ���� üũ�ڽ��� ���õ� ī���͸� �����ִ� �Լ�
// *************************************************************
function checkbox_selectedCount(f,cbname){
	if(!f.elements[cbname]) return 0;
	if(f.elements[cbname].length == undefined) {
		if(f.elements[cbname].checked) return 1;
		else return 0;
	}else{
		var cnt = 0;
		for(i=0;i<f.elements[cbname].length;i++) {
			if(f.elements[cbname][i].checked)
				cnt++;
		}
		return cnt;
	}
}

// *************************************************************
// ���� üũ�ڽ��� ���õ� ���� �����ִ� �Լ�
// *************************************************************
function checkbox_selectedValue(f,cbname){
	if(!f.elements[cbname]) return;
	if(f.elements[cbname].length == undefined) {
		if(f.elements[cbname].checked) return f.elements[cbname].value;
		else return;
	}else{
		var checkedCount = 0;
		var tmp = "";
		for(i=0;i<f.elements[cbname].length;i++) {
			if(f.elements[cbname][i].checked) {
				if (checkedCount != 0) tmp += ",";
				tmp += f.elements[cbname][i].value;
				checkedCount ++;
			}
		}
		return tmp;
	}
}
function checkMoneyUpdate(el){
	key = event.keyCode;
	if(event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 109 || event.keyCode == 110 || event.keyCode == 189 || event.keyCode == 190 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))
		return el.value = addComma_new(el.value);
	else
		//alert("���� ���·� �Է��ϼ���!");
		//el.value = el.value;
		return;
}

function rounddown(val,num) {
	var retval;
	var dm = 1;
	for (i=0;i < num ;i++ ) dm *= 10;
	retval = (parseInt(parseFloat(val) * dm) / dm);
	return retval;
}

function roundup(val,num){
	var retval;
	var dm = 1;
	for (i=0;i < num ;i++ ) dm *= 10;
	retval = Math.floor(parseInt(parseFloat(val) * dm)) / dm;
	return retval;
}

function checkMoney(field) {
	var pattern = /^[0-9.,]+$/;
	return (pattern.test(field.value)) ? true : false;
}

function addComma(str) {
	str = str + "";
	str = str.trim();
	str = removeComma(str);
	var jum = parseFloat(str) - parseInt(str);
	var buho = "";
	if (parseInt(str) < 0) {
		buho = "-";
		str = (parseInt(str) - parseInt(str)*2) + "";
	}else{
		str = parseInt(str) + "";
	}
	var len = str.length;
	var s1 = "",s2 = "";
	if(len <= 3) {
		if (jum == 0)	{
			return buho + str;
		}else{
			jum = round3(jum,2) + "";
			return buho + str + jum.substr(1,jum.length-1);
		}
	}else {
		for(i = len-1 ; i >= 0; i--) s1 += str.charAt(i);
		for(i = len-1 ; i >= 0; i--){
			s2 += s1.charAt(i);
			if(i % 3 == 0 && i != 0) s2 += ",";
		}
		if (jum == 0)	{
			return buho + s2;
		}else{
			jum = round3(jum,2) + "";
			return buho + s2 + jum.substr(1,jum.length-1);
		}
	}
}

// ---------------------------------------------------------
// �޸� ó���� ������ �ݾ����� ��ũ��Ʈ (���ڿ��� ���͸� ���� ����)
// ---------------------------------------------------------
function addComma_new(txt){
	var min,tmp,str,v;
	txt = removeComma(txt);
	min = txt.substring(0,1) == "-" ? txt.substring(0,1) : "";
	txt = txt.replace(min,'');
	tmp = txt.split('.');
	str = new Array();
	v = tmp[0].replace(/,/gi,'');
	for(var i=0;i<=v.length;i++){
		str[str.length] = v.charAt(v.length-i);
		if(i%3==0 && i!=0 && i!=v.length){
			str[str.length]='.';
		}
	}
	str = min+str.reverse().join('').replace(/\./gi,',');
	return(tmp.length == 2) ? str+'.'+tmp[1] : str;
}

function removeComma(str) {
	str = str + "";
	str = str.trim();
	var len = str.length;
	var retval = "";
	for(var i = 0; i < len ; i++) {
		if (str.charAt(i) != ",") {
			retval += str.charAt(i);
		}
	}
	return retval;
}

function openPopup(url,target,width,height,scroll){
	if(!target) target = "window";
	if(!width) width = 100;
	if(!height) height = 100;
	if(!scroll) scroll = "yes";
	var aa = window.open(url,target,"width="+width+",height="+height+",scrollbars="+scroll+",top=0,left=0,resizable=yes");
	if(aa) aa.focus();
}

function round3(val,num) {
	var retval;
	var dm = 1;
	for (i=0;i < num ;i++ ) dm *= 10;
	retval = (parseInt(parseFloat(val) * dm + 0.5) / dm);
	return retval;
}

function iframe_resize(iframe,flag) {
	iframe = typeof iframe == 'string' ? document.getElementById(iframe) : iframe;
	if (flag == 1) {
		iframe.setExpression('height',iframe.contentWindow.document.body.scrollHeight);
	}else if (flag == 2) {
		iframe.setExpression('height',iframe.contentWindow.document.body.scrollHeight);
	}else{
		iframe.setExpression('height',iframe.contentWindow.document.body.scrollHeight);
		iframe.setExpression('width',iframe.contentWindow.document.body.scrollWidth);
	}
}

function clearoption(el){
	for(i = el.length ; i >= 0; i--) el.options.remove(i);
}

function setCookie(name, value, expiredays){
	var cookie = name + "=" + escape(value) + "; domain=.megastudy.net; path=/;"
    if (typeof expiredays != 'undefined') {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        cookie += "expires=" + todayDate.toGMTString() + ";"
    }
    document.cookie = cookie;

}

function getCookie(name){
	var Found = false
	var start, end
	var i = 0
	while(i <= document.cookie.length){
		start = i
		end = start + name.length
		if(document.cookie.substring(start, end) == name){
		Found = true
		break
		}
		i++
	}
	if(Found == true){
		start = end + 1
		end = document.cookie.indexOf(";", start)
		if(end < start) end = document.cookie.length
			return document.cookie.substring(start, end)
	}
	return ""
}

function getCookie_unescape(name) {
	var Found = false
	var start, end
	var i = 0
	var cookie_str = unescape(document.cookie);
	while(i <= cookie_str.length){
		start = i
		end = start + name.length
		if(cookie_str.substring(start, end) == name){
		Found = true
		break
		}
		i++
	}
	if(Found == true){
		start = end + 1
		end = cookie_str.indexOf(";", start)
		if(end < start) end = cookie_str.length
			return cookie_str.substring(start, end)
	}
	return ""
}

function layerCenter(oDiv){
	oDiv.style.display = "";
	oDiv.style.setExpression("left", "document.body.clientWidth/2 - "+eval(oDiv.offsetWidth)+"/2");
	oDiv.style.setExpression("top", "document.body.scrollTop+((document.body.clientHeight/2)-"+eval(oDiv.offsetHeight)+")");
}

// ��Ʈ�� ��ü�� �޼ҵ� �߰�
String.prototype.trim = function() {
	var str = this;
	return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

String.prototype.bytes = function() {
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
	return l;
}

String.prototype.cut = function(len) {
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) {
			l += (str.charCodeAt(i) > 128) ? 2 : 1;
			if (l > len) return str.substring(0,i);
	}
	return str;
}


// ���� ����ǥ ����
function chkSquater(){
	if(event.keyCode == 39){
		event.returnValue = false;
	}
}

// *************************************************************
// �̸��� ���̵� üũ : YSM
// *************************************************************
function checkemailid(){
	var key = event.keyCode;
	if(key==64){
		event.returnValue = false;
	}
}

// *************************************************************
// �̸����ּ� üũ : YSM
// *************************************************************
function checkemailaddress(){
	if ((event.keyCode > 32 && event.keyCode < 46) || (event.keyCode > 57 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97))
	{
		event.returnValue = false;
	}
}

// *************************************************************
// select form element ���� �־��� ���� �ش��ϴ� option�� selected ó�� : Ȳ����
// *************************************************************
function chgSelectBox(oSel, sVal) {
	for(var i=0; i<oSel.length; i++) {
		if(oSel[i].value == sVal) {
			oSel[i].selected = true;
		}
	}
}

/** ��¥ ��ȿ�� �˻� ���� �Լ�**/
/*
* ��¥���˿� �´��� �˻�
*/
function isDateFormat(d) {
	var df = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
	return d.match(df);
}
/*
* ���⿩�� �˻�
*/
function isLeaf(year) {
	var leaf = false;

	if(year % 4 == 0) {
		leaf = true;

		if(year % 100 == 0) {
			leaf = false;
		}

		if(year % 400 == 0) {
			leaf = true;
		}
	}

	return leaf;
}

/*
* ��¥�� ��ȿ���� �˻�
*/
function isValidDate(d) {
	// ���˿� �ȸ����� false����
	if(!isDateFormat(d)) {
		return false;
	}

	var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	var dateToken = d.split('-');
	var year = Number(dateToken[0]);
	var month = Number(dateToken[1]);
	var day = Number(dateToken[2]);

	// ��¥�� 0�̸� false
	if(day == 0) {
		return false;
	}

	var isValid = false;

	// �����϶�
	if(isLeaf(year)) {
		if(month == 2) {
			if(day <= month_day[month-1] + 1) {
				isValid = true;
			}
		} else {
			if(day <= month_day[month-1]) {
				isValid = true;
			}
		}
	} else {
		if(day <= month_day[month-1]) {
			isValid = true;
		}
	}

	return isValid;
}
/** ��¥ ��ȿ�� �˻� ���� �Լ�**/

function keyEnterToFunc(strObj) {
	if (event.keyCode == 13) {
		event.keyCode = 9;
		eval(strObj);
	}
}

function keyEnterTab(strObj) {
	if (event.keyCode == 13) {
		event.keyCode = 9;
	}
}


//---------------- �̹��� ���� ; ��ΊE 2006-10-20
//		width�� imgWidth���� Ŭ ��� ������¡
//		onLoad=imgResize('�̹��� ���', '�̹��� ���̵�', '���ϴ� ���λ�����')
function imgResize(imgUrl, imgId, imgWidth){
	var obj = new Image();
	obj.src = imgUrl;
	if (obj.width > imgWidth) {
		imgId.width = imgWidth;
	}
}
//		�ǻ����� �̹��� ���� �˾�
//		onClick=imgOpen('�̹��� ���', '�̹��� Ÿ��Ʋ')
function imgOpen(img, title){
	var extension = img.split(".")[img.split(".").length - 1].toLowerCase();

	if (extension == "pdf"){ 
		O = 'width=1000, height=1000, scrollbars=yes';
		imgWin = window.open('','', O);
		imgWin.document.write('<html><head></head>');
		imgWin.document.write('<body>');
		imgWin.document.write('<iframe src="' + (img) + '" width="1000" height="1000"></iframe>');
		imgWin.document.write('</body></html>');
		imgWin.document.close();
	} else if (extension == "zip") {
		imgWin = window.open(img,'');
	} else {
		var obj = new Image();
		obj.src = (img);
		imgCont(img, title);
	}
}
function imgCont(img, title){
	var obj = new Image();
	obj.src = (img);
	setTimeout(function() {
		if ((obj.width != 0) && (obj.height != 0)) {
			imgView(img, title);
		}
	}, 20);
}
function imgView(img, title) {
	var obj = new Image();
	obj.src = (img);

	var W = obj.width;
	var H = obj.height;
	var O = 'width=' + (parseInt(W, 10) + 17) + ', height=' + H + ', scrollbars=yes';
	var imgWin = window.open('', '', O);
	imgWin.document.write('<html><head><title>' + title + '</title></head>');
	imgWin.document.write('<body style="margin:0;padding:0">');
	imgWin.document.write('<img src="' + img + '" onClick="self.close()" style="cursor:hand" title="�ݱ�">');
	imgWin.document.write('</body></html>');
	imgWin.document.close();
}

function popcalendar(kbn,flg){
	x = event.screenX;
	y = event.screenY;
	window.open("/campus_common/lib/calendar.asp?kbn="+kbn+"&flg="+flg, "win", "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no,width=160,height=200,top="+y+",left="+x);
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}


function chr_byte(chr) {
	if(escape(chr).length > 4)
		return 2;
	else
		return 1;
}

/*********************************************
   ���� ���̸�ŭ �߶󳻱�(�ѱ�����)
**********************************************/
function cutString(str, limit, sTale) {
	var tmpStr = str;
	var byte_count = 0;
	var len = str.length;
	var bTale = false;
	var i;
	
	sTale = (sTale != undefined ? sTale : "");//�⺻������
	
	for(i=0; i<len; i++) {
		byte_count += chr_byte(str.charAt(i));
		if(byte_count == limit-1) {
			if(chr_byte(str.charAt(i+1)) == 2) {
				tmpStr = str.substring(0, i+1);
				bTale = true;
			}
			else {
				if(i+2 != len)
					bTale = true;
				tmpStr = str.substring(0, i+2);
			}
			break;
		}
		else if(byte_count == limit) {
			if(i+1 != len)
				bTale = true;
			tmpStr = str.substring(0, i+1);
			break;
		}
	}
	return tmpStr + (bTale == true ? sTale : "");
}

/*********************************************
   ���ڱ���ī��Ʈ(�ѱ�2���ڷ� üũ)
**********************************************/
function countByte(sStr) {
	var nLen = sStr.length;
	var nByteLen = 0;
	var nChrSize;
	for(var i=0; i<nLen; i++) {	
		nChrSize = chr_byte(sStr.charAt(i));
		nByteLen += nChrSize;
	}
	return nByteLen;
}


/*********************************************
   �Էµ�URL(������ �����ּ�) ����,
   ���ϸ� ����
**********************************************/
function getFilenameFromUrl(sUrl) {
	sUrl = sUrl || window.location.pathname;
	if(sUrl) {
		//������Ʈ���� ����������
		if(sUrl.indexOf("?") >= 0) {
			sUrl = sUrl.split("?")[0];
		}
		
		// `/`�� �����Ѵٸ� split�� ���� �������༮�� ����
		if(sUrl.indexOf("/") >= 0) {
			sUrl = sUrl.split("/");
			sUrl = sUrl[sUrl.length - 1];
		}
	}
	return sUrl;
}

/**********************************
	URL ������Ʈ�� �� ��������
-----------------------------------
 sItem : Ű
 sUrl  : �ּ�[������ �����ּ�]
**********************************/
function getQueryString(sItem, sUrl) {
	sUrl = sUrl || window.location.href;
	var sReturn = "";
	
	if(sUrl.indexOf("?") >= 0)
	{
		var sSearch = sUrl.substr(sUrl.indexOf("?") + 1, sUrl.length);
		var aItems = sSearch.split("&");
		for(var i=0; i<aItems.length; i++)
		{
			var aTmp = aItems[i].split("=");
			if(aTmp[0] == sItem)
			{
				sReturn = aTmp[1];
				break;
			}
		}
	}
	return sReturn;
}

/*****************************************
 ��ü�� �����͸� serialize��(url Ű=�� ��)
*****************************************/
function serializeParam(oParam, sEncodeType) {
	var sStr = "";
	for(var v in oParam) {
		var sValue = oParam[v];
		if(sStr != "")
			sStr += "&";
		sStr = sStr + v + "=";
		switch(sEncodeType)
		{
			case "escape":
				sStr += escape(oParam[v]);
				break;
			case "utf-8":
				sStr += encodeURIComponent(oParam[v]);
				break;
			default: //���ڵ�����
				sStr += oParam[v];
				break;
		}
	}
	return sStr;
}

/*****************************************
 serialized�� URL�Ķ���͸� ��ü�� �����Ͽ� ����
 (url Ű=�� ��)
*****************************************/
function parallelizeParam(sString, sEncodeType) {
	var oReturn = {};
	var aParams = sString.split("&");//&���ڿ��� �ɰ�
	for(var i=0; i<aParams.length; i++) {
		var aTmp = aParams[i].split("=");
		switch(sEncodeType) {
			case "escape":
				aTmp[1] = unescape(aTmp[1]);
				break;
			case "utf-8":
				aTmp[1] = decodeURIComponent(aTmp[1]);
				break;
			default: //���ڵ�����
				aTmp[1] = aTmp[1];
				break;
		}
		oReturn[aTmp[0]] = aTmp[1];
	}
	return oReturn;
}