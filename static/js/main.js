(function ($) {
    // 图片滑动
    function Slider() {
        this.wrap = document.getElementById('shortcutDiv');
        this.scaleW = window.innerWidth - 40;
        this.idx = 0;
        this.slide();
    }

    Slider.prototype = {
        constructor: Slider,
        slide: function () {
            var self = this,
                scale = self.scaleW,
                wrap = self.wrap,
                item = wrap.querySelectorAll('.page'),
                str,
                i, len, m,
                handlerStart = function (event) {
                    self.startX = event.targetTouches[0].pageX;
                    self.offsetX = 0;
                    self.startTime = new Date();
                },
                handlerMove = function (event) {
                    event.preventDefault();
                    self.moveX = event.targetTouches[0].pageX;
                    self.offsetX = self.moveX - self.startX;

                    for (i = self.idx - 1, m = i + 3; i < m; i++) {
                        (m - 2 == i) ? (str = '') : (str = ' scale(0.92)');
                        item[i] && (item[i].style.transform = 'translate3d(' + (scale * (i - self.idx) + self.offsetX) + 'px, 0, 0)' + str) &&
                        ((item[i].style.webkitTransform = 'translate3d(' + (scale * (i - self.idx) + self.offsetX) + 'px, 0, 0)' + str)) &&
                        (item[i].style.transition = 'none');
                    }
                },
                handlerUp = function () {
                    var boundary = scale / 3,
                        endTime = new Date(),
                        distance = endTime.getTime() - self.startTime.getTime();    //时间间隔

                    if (distance >= 800) {
                        if (self.offsetX > boundary) {
                            self.go(-1);   //退一页
                        } else if (self.offsetX < -boundary) {
                            self.go(1);    //进一页
                        } else {
                            self.go(0);   //停留本页
                        }
                    } else {
                        //优化，
                        //快操作，考虑到用户快速滑动，滑动距离 小于 boundary
                        if (self.offsetX > 50) {
                            self.go(-1);   //退一页
                        } else if (self.offsetX < -50) {
                            self.go(1);    //进一页
                        } else {
                            self.go(0);   //停留本页
                        }
                    }
                };

            for (i = 0, len = item.length; i < len; i++) {
                i && (str = ' scale(0.92)');
                item[i].style.webkitTransform = 'translate3d(' + i * scale + 'px, 0, 0)' + str;
                item[i].style.transform = 'translate3d(' + i * scale + 'px, 0, 0)' + str;
            }
            wrap.addEventListener('touchstart', handlerStart);
            wrap.addEventListener('touchmove', handlerMove);
            wrap.addEventListener('touchend', handlerUp);

            var nav = document.querySelectorAll('.shortcut-nav a');
            for (var i = 0, len = nav.length; i < len; i++) {
                (function (n) {
                    nav[i].addEventListener('touchstart', function (event) {
                        var isActive = event.target.className;

                        if (!isActive.length) {
                            if (n == 0) {
                                self.go(-1);
                            } else if (n == 1) {
                                self.go(1);
                            }
                        }
                    });
                })(i);
            }
        },
        go: function (n) {
            var self = this,
                scale = self.scaleW,
                wrap = self.wrap,
                item = wrap.querySelectorAll('.page'),
                len = item.length,
                nIdx = self.idx + n;

            //判断 nIdx 超出范围
            if (nIdx >= len) {
                nIdx = len - 1;
            } else if (nIdx < 0) {
                nIdx = 0;
            }
            self.idx = nIdx;
            item[self.idx] && (item[self.idx].style.transform = 'translate3d(0, 0, 0)') &&
            (item[self.idx].style.webkitTransform = 'translate3d(0, 0, 0)') &&
            (item[self.idx].style.transition = 'transform .3s linear 0s') &&
            (item[self.idx].style.webkitTransition = '-webkit-transform .3s linear 0s');

            item[self.idx - 1] && (item[self.idx - 1].style.transform = 'translate3d(' + (-scale) + 'px, 0, 0) scale(0.92)') &&
            (item[self.idx - 1].style.webkitTransform = 'translate3d(' + (-scale) + 'px, 0, 0) scale(0.92)') &&
            (item[self.idx - 1].style.transition = 'transform .3s linear 0s') &&
            (item[self.idx - 1].style.webkitTransition = '-webkit-transform .3s linear 0s');

            item[self.idx + 1] && (item[self.idx + 1].style.transform = 'translate3d(' + scale + 'px, 0, 0) scale(0.92)') &&
            (item[self.idx + 1].style.webkitTransform = 'translate3d(' + scale + 'px, 0, 0) scale(0.92)') &&
            (item[self.idx + 1].style.transition = 'transform .3s linear 0s') &&
            (item[self.idx + 1].style.webkitTransition = '-webkit-transform .3s linear 0s');

            var nav = document.querySelectorAll('.shortcut-nav a');
            for (var i = 0, len = nav.length; i < len; i++) {
                nav[i].className = '';
            }
            nav[self.idx].className = 'active';
        }
    };
    if ($('#shortcutDiv').length) {
        new Slider();
    }

    // 文本框自适应高度
    var autoTextarea = function (elem) {
        var minHeight = $(elem).height(),
            change = function () {
                var height,
                    style = elem.style;
                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;

                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                    height = elem.scrollHeight;
                    style.height = height + 'px';
                }
            };
        elem.addEventListener('input', change, false);
        elem.addEventListener('focus', change, false);
        change();
    };
    if($('textarea.text').length){
        autoTextarea(document.querySelector('textarea.text'), 30)
    }
})(Zepto);