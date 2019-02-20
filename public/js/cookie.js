function setCookie(name,value,iDay) {
    if(iDay){
        var oDate = new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+value+';expires='+oDate+';path=/';
    }else {
        document.cookie=name+'='+value+';path=/';//全都存在根目录下
    }
}
function getCookie(name){
    var str = document.cookie;
    var arr = str.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return '';
}
function removeCookie(name) {
    setCookie(name,'',-2)
}