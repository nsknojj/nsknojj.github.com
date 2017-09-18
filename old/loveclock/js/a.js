$(function () {
    // var time=document.getElementsByClassName('')
    var date = new Date();
    var love_date = new Date(2013, 7, 20);
    var days = Math.floor((date - love_date) / 1000 / 60 / 60 / 24);
    // alert(days);
    var text = document.getElementById('love');
    text.innerHTML = days;
    var canvas = document.getElementById('canvas');
    var obj = canvas.getContext("2d");
    var num=0;
    setInterval(function (){
        obj.save();
        num++;
        obj.clearRect(0,0,400,400);
        obj.translate(200,200);
        obj.rotate(num*Math.PI/180);
        obj.beginPath();
        obj.rect(-200,-200,400,400);
        obj.fill();
        obj.restore();
    },100);
});
