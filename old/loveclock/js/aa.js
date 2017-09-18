window.onload = function () {
    // var time=document.getElementsByClassName('')
    var date = new Date();
    var love_date = new Date(2013, 7, 20);
    var days = Math.floor((date - love_date) / 1000 / 60 / 60 / 24);
    // alert(days);
    var text = document.getElementById('love');
    text.innerHTML = days;
    var canvas = document.getElementById('canvas');
    var cobj = canvas.getContext("2d")
    cobj.fillStyle = "rgba(20, 200, 20, 0.5)"
    cobj.fillRect(0, 0, 100, 100);
    cobj.strokeRect(100, 100, 100, 200);
    cobj.lineTo(0, 0);
    cobj.lineTo(100, 100);
    cobj.stroke();
    cobj.moveTo(300, 300);
    cobj.lineTo(200, 200);
    cobj.stroke();
    canvas.onmousedown = function (e) {
        var mx = e.layerX;
        var my = e.layerY;
        cobj.moveTo(mx, my);
        canvas.onmousemove = function (e) {
            var ex = e.layerX;
            var ey = e.layerY;
            cobj.lineTo(ex, ey);
            cobj.stroke();
        }
        canvas.onmouseup = function () {
            canvas.onmousemove = null;
            canvas.onmouseup = null;
        }
    }
    // rgba(20, 200, 20, 0.5)
}
