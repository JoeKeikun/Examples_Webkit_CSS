var fcDom = $('#focusbox');

document.onmousemove = function(e) {
    var dataS = e.target.dataset,
        ptType = dataS.pointertype,
        ptExpand = dataS.pointerexpand,
        ptGroup = dataS.pointergroup;

    // if (ptGroup) {
    //     console.log(ptGroup);
    // } 

    // 改变pointer的样式
    fcDom.removeClass('type1');
    fcDom.removeClass('type2');

    if (ptType) {
        fcDom.addClass(ptType);
    }

    // 调整位置
    if (ptExpand) {
        var clientRect = e.target.getClientRects();

        if (clientRect.length > 0) {
            var newW = clientRect[0].width / 2,
                newH = clientRect[0].height / 2;

            fcDom.css({
                opacity: '0',
                top: (clientRect[0].top + newH) + 'px',
                left: (clientRect[0].left + newW) + 'px',
                width: clientRect[0].width + 'px',
                height: clientRect[0].height + 'px',

                marginLeft: '-' + newW + 'px',
                marginTop: '-' + newH + 'px'
            });
        }
    } else {
        fcDom.css({
            opacity: '1',
            top: e.pageY + 'px',
            left: e.pageX + 'px',
            width: '38px',
            height: '38px',

            marginLeft: '-19px',
            marginTop: '-19px'
        });
    }
}

// 绑定button的事件
var btns = $('[data-pointerexpand="true"]');
var preBtn = null;
var btnTimeout = null;
btns.on('mouseenter', function(e) {
    var dom = $(e.target);

    if (btnTimeout) {
        clearTimeout(btnTimeout);
    }

    if (!preBtn || (preBtn && preBtn.data('pointergroup') !== dom.data('pointergroup'))) {
        dom.addClass('hover');
    } else {
        preBtn.removeClass('hover');
        preBtn.removeClass('on');
    }

    dom.addClass('on');

    preBtn = dom;
});
btns.on('mouseleave', function(e) {
    var dom = $(e.target);

    dom.removeClass('hover');
    dom.removeClass('on');

    btnTimeout = setTimeout(function() {
        preBtn = null;
        btnTimeout = null;
    }, 200);

});