# mobile-carousel
说明：mobile-carousel 是一个轮播图插件,由JavaScript编写,无需其他第三方库(第一次尝试JavaScript原生编写插件，不足之处还望各位大神指教)
# 1 示例
[在线demo](http://htmlpreview.github.io/?https://github.com/ngulee/mobile-carousel/blob/master/src/index.html)
# 2 使用
## 2.1 载入CSS和JS
```html
<head>
  <link rel="stylesheet" type="text/css" href="./css/base.css">
  <link rel="stylesheet" type="text/css" href="./css/carousel.css">
</head>
<body>
  ....
  <script src="./js/mobileCarousel.js"></script>
</body>
```
## 2.2 创建轮播图HTML骨架
```html
<div class="carousel-container">
  <ul class="img-container clearfix">
    <li class="img-item"><a href=""><img src="./images/mobileCarousel05.png" alt=""></a></li>
    <li class="img-item"><a href=""><img src="./images/mobileCarousel01.png" alt=""></a></li>
    <li class="img-item"><a href=""><img src="./images/mobileCarousel02.png" alt=""></a></li>
    <li class="img-item"><a href=""><img src="./images/mobileCarousel03.png" alt=""></a></li>
    <li class="img-item"><a href=""><img src="./images/mobileCarousel04.png" alt=""></a></li>
    <li class="img-item"><a href=""><img src="./images/mobileCarousel05.png" alt=""></a></li>
    <li class="img-item"><a href=""><img src="./images/mobileCarousel01.png" alt=""></a></li>
  </ul>
  <ul class="focus-container">
    <li class="active"></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```
## 2.3 使用
```javascript
//创建轮播实例
var carousel = new Carousel({
  CarouselContainerClassname: 'img-container',
  focusContainerClassname: 'focus-container',
  delayTime: 2000
});
//调用轮播实例方法
carousel.autoPlay();
```

# 3 参数
+ CarouselContainerClassname： 图片列表盒子容器类名；
+ focusContainerClassname：焦点图容器盒子的类名；
+ delayTime: 图片轮播的时间间隔，单位：ms，默认值：2000；
