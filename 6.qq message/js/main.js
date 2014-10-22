var doc = $(document),
    viewport = $('.viewport');

var c = new Circle(),
    t = new Tail();

doc.ready(function() {
    var startX = 0,
        startY = 0,
        deltaX = 0,
        deltaY = 0;

    t.init();
    t.setSize(80);
    t.refresh();
    t.dom.html('<circle cx="40" cy="40" r="15" fill="red"/>');

    c.init();
    c.setRadius(15);
    c.refresh();
    viewport.append(c.dom);

    c.dom.mousedown(function(e) {
        c.active = true;
        startX = e.pageX,
        startY = e.pageY;
    });
    doc.mousemove(function(e) {
        var dis, tmpRadius;

        deltaX = 0,
        deltaY = 0;

        if (c.active) {
            x = e.pageX - startX;
            y = e.pageY - startY;

            c.setPosition({
                x: x,
                y: y
            });

            dis = distance(0, 0, c.position.x, c.position.y);

            if (dis < 40) {
                tmpRadius = 15 * (1 - dis / 70);
            } else {
                tmpRadius = 15 * (30 / 70);
            }
            t.dom.html('<circle cx="40" cy="40" r="' + tmpRadius + '" fill="red"/>');

            c.refresh();
        }
    });
    doc.mouseup(function(e) {
        c.active = false;

        c.setPosition({
            x: 0,
            y: 0
        });
        c.refresh();

        t.dom.html('<circle cx="40" cy="40" r="15" fill="red"/>');
    });
});