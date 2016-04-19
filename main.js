$(document).ready(function() {

    // function to rotate 3d objects following mouse
    $('body').mousemove(function(event) {
        cx = Math.ceil($('body').width() / 2.0);
        cy = Math.ceil($('body').height() / 2.0);
        dx = event.pageX - cx;
        dy = event.pageY - cy;
         // console.log('center location'+cx+','+cy);
         // console.log('distances'+dx+','+dy);
        tiltx = - (dy / cy);
        tilty =  (dx / cx);
        radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
        degree = (radius * 20);

        $('#cube, #button').css('-webkit-transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
    });

    $('.pow').click(function(event) {
        $('.screen video').toggle().get(0).play();
        $('.intro').toggle();
        $('.vid:not(".info")').toggle();
        $(this).toggleClass('on');
    });

    $('.vid .info-icon').click(function(event){
        event.preventDefault;
        $('.vid.info').toggle();
    });

    $('.vid.info .close').click(function(event){
        event.preventDefault();
        console.log('clicked close');
        $('.vid.info').toggle();
    });


});