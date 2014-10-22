var Circle = function() {};

Circle.prototype.dom = null;
Circle.prototype.position = null;
Circle.prototype.radius = null;
Circle.prototype.color = 'red';
Circle.prototype.active = false;

Circle.prototype.init = function() {
    var me = this;
    me.dom = $('.circle');
    me.position = {
        x: 0,
        y: 0
    };
    me.radius = 0;
};
Circle.prototype.setPosition = function(position) {
    if (position) {
        this.position = {
            x: position.x,
            y: position.y
        };
    }
};
Circle.prototype.setRadius = function(r) {
    this.radius = r;
};
Circle.prototype.refresh = function() {
    this.dom.css({
        'background-color': this.color,
        width: this.radius * 2,
        height: this.radius * 2,
        left: this.position.x,
        top: this.position.y
    });
};