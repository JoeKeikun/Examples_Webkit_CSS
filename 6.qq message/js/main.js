/*-------- 全局参数 ---------*/
var RADIUS = 15, // 圆形半径
    HALFSIZE = 60, // 操作区间半值
    HALFMAXIMUM = HALFSIZE + 30; // 操作区间极限值

/*-------- 处理代码 ---------*/
var doc = $(document),
    viewport = $('.viewport');

doc.ready(function() {
    var startX = 0,
        startY = 0,
        deltaX = 0,
        deltaY = 0;

    var c = new Circle(),
        t = new Tail();

    t.init();
    t.setSize(HALFSIZE * 2);
    t.refresh();
    t.dom.html('<circle cx="' + HALFSIZE + '" cy="' + HALFSIZE + '" r="' + RADIUS + '" fill="red"/>');

    c.init();
    c.setRadius(RADIUS);
    c.refresh();

    c.dom.mousedown(function(e) {
        c.active = true;
        c.stickFlg = true;
        startX = e.pageX,
        startY = e.pageY;
    });
    doc.mousemove(function(e) {
        var dis, tmpRadius, alpha;
        var deltaGama, deltaTheta;
        var ang1, ang2, ang3, ang4;
        var svgStr;
        var x0, x1, x2, x3, x4, y0, y1, y2, y3, y4;

        deltaX = 0,
        deltaY = 0;

        if (c.active) {
            deltaX = e.pageX - startX;
            deltaY = e.pageY - startY;

            c.setPosition({
                x: deltaX,
                y: deltaY
            });

            dis = distance(0, 0, deltaX, deltaY);

            if (dis < HALFSIZE) {
                tmpRadius = RADIUS * (1 - dis / HALFMAXIMUM);
            } else if (dis === HALFSIZE) {
                tmpRadius = RADIUS * (30 / HALFMAXIMUM);
            } else {
                tmpRadius = 0;
            }

            deltaGama = Math.asin((RADIUS - tmpRadius) / dis);
            deltaTheta = Math.atan(tmpRadius * Math.tan(deltaGama) / (RADIUS - tmpRadius));

            // tan函数的角度取值范围[-π/2, π/2], 故对alpha值做处理
            if (deltaX >= 0) {
                alpha = Math.atan(deltaY / deltaX);
            } else {
                alpha = Math.atan(deltaY / deltaX) - Math.PI;
            }

            // 计算4个点的角度
            ang1 = alpha - deltaGama - Math.PI / 2;
            ang2 = alpha - deltaGama - deltaTheta;
            ang3 = alpha + deltaGama + Math.PI / 2;
            ang4 = alpha + deltaGama + deltaTheta;

            // 描绘
            if (tmpRadius && c.stickFlg) {
                x0 = HALFSIZE + dis * Math.cos(alpha);
                y0 = HALFSIZE + dis * Math.sin(alpha);

                x1 = HALFSIZE + tmpRadius * Math.cos(ang1);
                x2 = HALFSIZE + dis * Math.cos(ang2);
                x3 = HALFSIZE + tmpRadius * Math.cos(ang3);
                x4 = HALFSIZE + dis * Math.cos(ang4);
                y1 = HALFSIZE + tmpRadius * Math.sin(ang1);
                y2 = HALFSIZE + dis * Math.sin(ang2);
                y3 = HALFSIZE + tmpRadius * Math.sin(ang3);
                y4 = HALFSIZE + dis * Math.sin(ang4);

                // 画圆
                svgStr = '<circle cx="' + HALFSIZE + '" cy="' + HALFSIZE + '" r="' + tmpRadius + '" fill="red"/>';
                // 画曲线
                svgStr += '<path d="M' + x1 + ',' + y1;
                svgStr += ' Q' + (x1 + x0) / 2 + ',' + (y1 + y0) / 2 + ' ' + x2 + ',' + y2;
                svgStr += ' L' + x4 + ',' + y4;
                svgStr += ' Q' + (x0 + x3) / 2 + ',' + (y0 + y3) / 2 + ' ' + x3 + ',' + y3 + '" fill="red"/>'
            } else {
                svgStr = '';
                c.stickFlg = false;
            }
            t.dom.html(svgStr);
            c.refresh();
        }
    });
    doc.mouseup(function(e) {
        c.active = false;
        c.stickFlg = false;

        c.setPosition({
            x: 0,
            y: 0
        });
        c.refresh();

        t.dom.html('<circle cx="' + HALFSIZE + '" cy="' + HALFSIZE + '" r="' + RADIUS + '" fill="red"/>');
    });
});