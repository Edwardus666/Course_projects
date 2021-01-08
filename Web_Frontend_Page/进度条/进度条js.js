// JavaScript Docum window.onload = function(){

        var circleBar    = document.getElementsByClassName('circle-bar')[0];
        var percent      = parseInt(circleBar.getElementsByClassName('percent')[0].firstChild.nodeValue);
        var color        = circleBar.css('background-color');
        var left_circle  = circleBar.getElementsByClassName('circle-bar-left')[0];
        var right_circle = circleBar.getElementsByClassName('circle-bar-right')[0];

        if( percent <= 50 ) {
            var rotate = 'rotate('+(percent*3.6)+'deg)';
            right_circle.css3('transform',rotate);
        }else {
            var rotate = 'rotate('+((percent-50)*3.6)+'deg)';
            right_circle.css ('background-color',color);//背景色设置为进度条的颜色
            right_circle.css3('transform','rotate(0deg)');//右侧不旋转
            left_circle.css3 ('transform',rotate);//左侧旋转
        }
    

    //封装了css3函数，主要是懒得重复书写代码，既然写了css3函数，顺便写个css吧，统一样式，好看一些
    Element.prototype.css = function(property,value){
        
        if ( value ) {
            //CSS中像background-color这样的属性，‘-’在JavaScript中不兼容，需要设置成驼峰格式
            var index = property.indexOf('-');
            if( index != -1 ) {
                var char = property.charAt(index+1).toUpperCase();
                property.replace(/(-*){1}/,char);
            }
            this.style[property] = value;
        }else{
            //getPropertyValue()方法参数类似background-color写法，所以不要转驼峰格式
            return window.getComputedStyle(this).getPropertyValue(property);
        }
    }

    //封装一个css3函数，用来快速设置css3属性
    Element.prototype.css3 = function(property,value){
        if( value ){
            property = capitalize(property.toLowerCase());
            this.style['webkit'+property] = value;
            this.style['Moz'+property] = value;
            this.style['ms'+property] = value;
            this.style['O'+property] = value;
            this.style[property.toLowerCase()] = value;
        }else{
            return window.getComputedStyle(this).getPropertyValue(
                    ('webkit'+property)||('Moz'+property)||('ms'+property)||('O'+property)||property);
                    //老实说，我不知道为什么要把不带浏览器标记的放在最后，既然都这么用，我也这么做吧。不过这样对现代浏览器来说可能并不好，判断次数变多了
        }
        
        //首字母大写
        function capitalize(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }