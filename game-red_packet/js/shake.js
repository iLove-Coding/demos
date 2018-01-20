function shake(obj, attr, maxS, f,callBack) {
    if (obj.isShake) return;
    obj.isShake = true;

    var arr = [];
    while (maxS > 0) {
        arr.push(maxS);
        arr.push(f);
        maxS -= f;
    }
    arr.push(0);

    var beginSite = parseFloat(getStyle(obj, attr));

    var index = 0;
    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function () {
        if (arr[index] == 0) {
            clearInterval(timer);
            obj.isShake = false;
            if(callBack) {
                callBack();
            }
        }

        obj.style[attr] = beginSite + arr[index] + 'px';
        index++;
    }, 30);
}