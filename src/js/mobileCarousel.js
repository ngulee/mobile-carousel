(function (w) {
  /*
  *                  Carousel：移动端图片轮播对象
  *CarouselContainerClassname：图片列表盒子容器类名
  *   focusContainerClassname：焦点图容器盒子的类名
  *                 delayTime: 图片轮播的时间间隔
  * */
  function Carousel (obj) {
    var doc = w.document;
    // 轮播组件的最外层盒子
    // this.CarouselBox = doc.querySelector('.' + obj.CarouselBoxClassname);
    // 轮播组件的图片大盒子
    this.CarouselContainer = doc.querySelector('.' + obj.CarouselContainerClassname);
    // 轮播焦点图盒子
    this.focusContainer = doc.querySelector('.' + obj.focusContainerClassname);
    // 焦点元素类数组
    this.focusArr = __getChildElement(obj.focusContainerClassname);
    // 焦点的数量
    this.focusCount = this.focusArr.length;
    // 图片的数量
    this.imgCount = this.focusCount + 2;
    // 单张图片的宽度
    this.imgWidth = this.CarouselContainer.offsetWidth / this.imgCount;
    // 当前图片的引索值
    this.index = 1;
    // 延迟时间
    this.delayTime = obj.delayTime;
    this.timerId = null;
    this.duration = '.5s';
  }
  Carousel.prototype = {
    constuctor: Carousel,
    loopPlay: function () {
      this.index++;
      this.transition();
    },
    transform: function () {
      this.CarouselContainer.style.transform = 'translateX(' + this.index * this.imgWidth * (-1) + 'px)';
    },
    transition: function () {
      // 添加过渡
      this.CarouselContainer.style.transition = 'all ' + this.duration;
      // 修改carousel位置
      this.transform();

      this.focusArr.forEach(function (value) {
        value.className = '';
      });
      if (this.index <= (this.imgCount - 2) && this.index > 0) {
        this.focusArr[this.index - 1].className = 'active';
      }
      if (this.index === (this.imgCount - 1)) {
        this.focusArr[0].className = 'active';
      }
      if (this.index === 0) {
        this.focusArr[this.imgCount - 3].className = 'active';
      }
    },
    autoPlay: function () {
      var self = this;
      // 触屏的起始位置
      var startX = 0;
      // 触屏移动的水平位移
      var moveX = 0;
      // 开启定时器
      this.timerId = setInterval(function () {
        // 指定self.loopPlay函数中的this值为Carousel的实例
        self.loopPlay();
      }, self.delayTime);
      // 注册过渡结束事件，当轮播到最后一张时，无缝过渡到第二张(最后一张与第二张是相同的两张图片)
      this.CarouselContainer.addEventListener('webkitTransitionEnd', function () {
        // 判定上边界条件
        self.index = (self.index > (self.imgCount - 2)) ? 1 : self.index;
        // 判定下边界条件
        self.index = (self.index <= 0) ? (self.imgCount - 2) : self.index;

        self.CarouselContainer.style.transition = '';
        self.transform();
      });
      // 监听touchstart事件
      this.CarouselContainer.addEventListener('touchstart', function (e) {
        // 关闭定时器
        clearInterval(self.timerId);
        // 关闭过渡效果
        self.CarouselContainer.style.transition = '';
        // 获取触摸开始时的横坐标
        var startData = e.touches[0];
        startX = startData.clientX;
      });

      this.CarouselContainer.addEventListener('touchmove', function (e) {
        // 获取触摸结束时的横坐标与触摸移动的距离
        var moveData = e.touches[0];
        moveX = moveData.clientX - startX;

        // 触屏拖动时，图片随着手指向左或者向右移动
        self.CarouselContainer.style.transform = 'translateX(' + (moveX + self.index * self.imgWidth * (-1)) + 'px)';
      });
      this.CarouselContainer.addEventListener('touchend', function (e) {
        self.CarouselContainer.style.transition = 'all ' + this.duration;
        // 当手指touchmove的距离大于零，则向右移动一张图片，当手指touchmove的距离小于零，则向左移动一张图片
        if (moveX < 0) {
          self.index = self.index < (self.imgCount - 1) ? ++self.index : 1;
        } else {
          self.index = self.index > 0 ? --self.index : (self.imgCount - 2);
        }
        self.transition();
        self.timerId = setInterval(function () {
          // 指定self.loopPlay函数中的this值为Carousel的实例
          self.loopPlay();
        }, self.delayTime);
      });
    }
  };
  function __getChildElement (parentNodeCls) {
    var parentNodes = document.querySelector('.' + parentNodeCls);
    var childrenNodes = parentNodes.childNodes;
    var result = [];
    childrenNodes.forEach(function (value) {
      if (value.nodeType === 1) {
        result.push(value);
      }
    });
    return result;
  }
  w.Carousel = Carousel;
})(window);

var carousel = new Carousel({
  CarouselContainerClassname: 'img-container',
  focusContainerClassname: 'focus-container',
  delayTime: 2000
});

carousel.autoPlay();
