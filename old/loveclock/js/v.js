var total=4;
var date_list=['2013-7-20','2013-6-20','2013-7-30','2016-10-5']

var clientWidth = $(window).width();
var clientHeight = $(window).height();

var offsetX, offsetY, garden, gardenCanvas, gardenCtx, $garden;
function map2Screen(x, y){
    return new Array(offsetX + x, offsetY - y);
}

function addBloom(x, y)
{
    coord = map2Screen(x, y);
    garden.createRandomBloom(coord[0], coord[1]);
}

function setGarden(){
    offsetX = $("#loveHeart").width() / 2;
    offsetY = $("#loveHeart").height() / 2;

    $garden = $("#garden");

    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    // alert($("#loveHeart").width());
    gardenCanvas.height = $("#loveHeart").height();

    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    addBloom(0, 0);
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
}

function setAnimation(){
    var interval = 50;
    var margin = 20;
    var x = -(offsetX - margin);

    var timer = setInterval(function() {
        if(x > offsetX - margin){
            clearInterval(timer);
            setHeartAnimation();
        }else{
            addBloom(x, 0);
            if(Math.abs(x) < offsetY - margin)
                addBloom(0, x);
            x += 20;
        }
    }, interval);
}

function getHeart(angle){
    var sqrt2 = 1.41421356237;
    var sqrt3 = 1.73205080756;
    var K = 45;
    if(true && angle > 56 && angle <= 236){
        coord = getHeart(56*2 - angle);
        coord = new Array(coord[1], coord[0]);
        return coord;
    }else{
        t = angle * Math.PI / 180;
        var x = 2.5*sqrt3*Math.cos(t);
        var y = 2*sqrt2*Math.sin(t);
        return new Array(x * K, y * K);
    }
}

function setHeartAnimation(){
    var interval = 50;
    var angle = 56;
    var rotate = function(arr){
        var x = arr[0], y = arr[1];
        arr[0] = x - y;
        arr[1] = x + y;
    }

    Garden.options.petalCount = { min:8, max:16 }
    Garden.options.petalStretch = { min:0.1, max:3 }

    var timer = setInterval(function() {
        if( angle > 417 ){
            clearInterval(timer);
        }else{
            var bloomCoor = getHeart(angle);
            rotate(bloomCoor);
            addBloom(bloomCoor[0], bloomCoor[1]);
            angle += 6;
        }
    }, interval);
}


function hideWord() {
    for(var i=1;i<=total;i++){
        $("#typewriter"+i).hide();
    }
}

function setWriter(number){
    $("#typewriter"+number).show();
    if(number){
        $("#typewriter"+number).typewriter();
    }
}

function setDay(){
    var date = new Date();
    for(var i=1;i<=total;i++){
        var love_date = new Date(date_list[i-1]);
        var days = Math.floor((date - love_date) / 1000 / 60 / 60 / 24);
        var text = document.getElementById('love'+i);
        text.innerHTML = days;
    }
}

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

$(function (){
    hideWord();
    setGarden();
    setAnimation();
    setDay();
    $("#button1").click(function () {
        hideWord();
        setWriter(1);
    });
    $(".button").hover(function () {
        $(this).css("background-color","#FFDDAA");

    },function () {
        $(this).css("background-color","#FBAE7C");
    });
    $("#button2").click(function () {
        hideWord();
        setWriter(2);
    });
    $("#button3").click(function () {
        hideWord();
        setWriter(3);
    });
    $("#button4").click(function () {
        hideWord();
        setWriter(4);
    });
});

$.fn.typewriter = function() {
    this.each(function() {
        var $ele = $(this), str = $ele.html(), progress = 0;
        $ele.html('');
        var timer = setInterval(function() {
            var current = str.substr(progress, 1);
            if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress++;
            }
            $ele.html(str.substring(0, progress));
            if (progress >= str.length) {
                clearInterval(timer);
            }
        }, 100);
    });
    return this;
};
