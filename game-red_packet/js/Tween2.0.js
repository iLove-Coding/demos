function MTween(obj, attr, begin, end, duration, unit, way, callBack) {
    if (obj.isAnim) return;
    obj.isAnim = true;

    if (!way) {
        way = 'linear';
    }

    if (!unit) {
        unit = '';
    }

    var start = parseFloat(begin) || parseFloat(getStyle(obj, attr)) || 0;
    var s = end - start;

    var startTime = Date.now();

    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function () {
        var endTime = Date.now();
        var t = endTime - startTime;

        if (t >= duration) {
            t = duration;
            clearInterval(obj.timer);
        }
        obj.style[attr] = Tween[way](t, start, s, duration) + unit;

        //透明度的兼容处理
        if (attr == 'opacity') {
//       obj.style[attr] = Tween[way](t, start, s, duration);
            obj.style.filter = 'alpha(opacity=' + Tween[way](t, start, s, duration) * 100 + ')';
        }

        //如果属性为transform，处理如下,考虑transform有很多其它情况
        // attr-->transform.scale
        var attrSplit = attr.split('.');

        if (attrSplit.length > 1 && attrSplit[0] == 'transform') {
            //js设置transform的方式：
            //obj.style.transform = 'scale(n)';
            switch (attrSplit[1]) {
                case 'scale':
                    obj.style[attrSplit[0]] = attrSplit[1] + '(' + Tween[way](t, start, s, duration) + ')';
                case 'rotateZ':
                    obj.style[attrSplit[0]] = attrSplit[1] + '(' + Tween[way](t, start, s, duration) + 'deg)';
            }
        }

        if (t == duration) {
            clearInterval(timer);
            obj.isAnim = false;
            //等到上一个动画执行完成，调用回调函数
            if (callBack) {
                callBack();
            }
        }
    }, 20)
}

function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];//无法直接得到css3的样式值
}