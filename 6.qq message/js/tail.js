var Tail = function() {};

Tail.prototype.dom = null;
Tail.prototype.position = null;
Tail.prototype.size = null;
Tail.prototype.color = 'red';
Tail.prototype.active = false;

Tail.prototype.init = function() {
    var me = this;
    me.dom = $('.tail');
    me.position = {
        x: 0,
        y: 0
    };
    me.size = 0;
};
Tail.prototype.setPosition = function(position) {
    if (position) {
        this.position = {
            x: position.x,
            y: position.y
        };
    }
};
Tail.prototype.setSize = function(size) {
    this.size = size;
};
Tail.prototype.refresh = function() {
    this.dom.attr({
        width: this.size,
        height: this.size
    });

    this.dom.css({
        position: 'absolute',
        left: this.position.x,
        top: this.position.y
    });
};