$(document).ready(function() {

    // var device, mouseDetected = false;
    // function checkMouse() {
    //     function onMouseMove(e) {
    //       unlisten('mousemove', onMouseMove, false);
    //       mouseDetected = true;
    //       // initializeMouseBehavior();
    //     }
    //     listen('mousemove', onMouseMove, false);
    // };


    var currentChannel = 1;
    var handheld = false;

    if (Modernizr.touchevents && $(window).width() < 770)  {
        handheld = true;
    }


    var antarcticHomepage = {
        channel: 1,
        video: "antarcticsite.mp4",
        caption: '<span>Antarctic</span> <br/>  <a href="#" class="info-icon">info</a>',
        info: "<p><a href='http://antarcti.cc' target='_blank'>Antarctic</a> is the humanity-focused digital agency where I’ve served as Technology Director <br> since 2015.</p> <p>I developed it’s new temporary landing page <span class='hidmob'>(check it out on <a href='http://quirktools.com/screenfly/#u=http%3A//antarcti.cc&w=375&h=667&a=37' target='_blank'>mobile</a>, too!)</span> and am currently directing the build of the new site.</p>",
        link: "http://antarcti.cc",
        background: "antarctic.jpg"
    };

    var actForCompassion = {
        channel: 2,
        video: "actforcompassion.mp4",
        caption: '<span>Act for Compassion</span> <br/>  <a href="#" class="info-icon">info</a> ',
        info: "<p><a href='https://www.compassion.com/act/build-your-fundraiser.htm' target='_blank'>Act for Compassion</a> is a custom crowdfunding web app built for <a href='http://compassion.com' target='_blank'>Compassion</a>, an international non profit that releases children from poverty through a sponsorship program.</p> <p>The platform allows advocates to fundraise and connect children with new sponsors.</p>",
        link: "http://www.actforcompassion.com",
        background: "compassion.jpg"
    };

    var davidCasavant = {
        channel: 3,
        video: "davidcasavant.mp4",
        caption: '<span>David Casavant</span> <br/>  <a href="#" class="info-icon">info</a>',
        info: "<p><a href='http://david-casavant.com' target='_blank'>David Casavant</a> is a celebrity stylist and fashion archivist in New York.</p>",
        link: "http://david-casavant.com",
        background:"casavant.jpg"
    };

    var rmhc = {
        channel: 4,
        video: "rmhc.mp4",
        caption: "<span>Ronald McDonald House Charities</span> <br/>  <a href='#' class='info-icon'>info</a>",
        info: "<p><a href='http://rmhc.org' target='_blank'>Ronald McDonald House Charities</a> needed a website that was compliant with web accessibility standards. I directed the project to re-develop it.</p>",
        link: "http://www.rmhc.org",
        background:"rmhc.jpg"
    };

    var channels = [antarcticHomepage, actForCompassion, davidCasavant, rmhc];



    // function to rotate 3d objects following mouse
    $('body').mousemove(function(event) {
        cx = Math.ceil($('body').width() / 2.0);
        cy = Math.ceil($('body').height() / 2.0);
        dx = event.pageX - cx;
        dy = event.pageY - cy;
        tiltx = - (dy / cy);
        tilty =  (dx / cx);
        radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
        degree = (radius * 10);

        $('#cube, #button').css('-webkit-transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
        $('#cube, #button').css('-moz-transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
        $('#cube, #button').css('transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');

    });

    //function to show a channel on the screen 
    function showChannel(number) {
        var channelToShow = channels[number-1];
        //reset animation
        $(".vid.caption").removeClass("animated").delay(200).queue(function(next){
                $(this).addClass("animated");
                next();
        });
        //set content of info screen and caption
        $('.screen video').attr("src",channelToShow.video);
        $('.screen .vid.caption > p').html(channelToShow.caption);
        $('.screen .vid.channel > p').html(channelToShow.channel);
        $('.screen .vid.info .single-info').html(channelToShow.info);
        $('.screen .vid.info .project-link').attr("href", channelToShow.link);
        if (handheld) {
            $('.screen .vid.info').css("background-image","url('backgrounds/"+channelToShow.background+ "')");
        }
    };

    function pressPower(mobile) {
        showChannel(currentChannel);
        if (mobile) {
            $('.vid.info').toggle();
            $('.vid:not(".info")').css('display','none');
        }
        else {
            $('.screen video').toggle().get(0).play();
            if ( $('.vid.info').css('display') === 'none' ){
                $('.vid:not(".info")').toggle();
            } else {
                $('.vid').toggle();
            }
        }
        $('.intro').toggle();

        $('.pow').toggleClass('on');        
    }

    //turn tv on
    $('.js-pow').click(function(event) {
        event.preventDefault;
        pressPower(handheld);
    });


    //functions for click on controller buttons
    function nextChannel(mobile) {
        currentChannel++;
        if (currentChannel>channels.length) { currentChannel=1; }
        showChannel(currentChannel);
        if (!mobile) {$('.screen video').get(0).play();}
    };

    function prevChannel(mobile) {
        currentChannel--;
        if (currentChannel < 1) {currentChannel = channels.length;}
        showChannel(currentChannel);
        if (!mobile) {$('.screen video').get(0).play();}
    };    

    //change channel on mobile tap
    $('.touchevents .mob-tap').on('click', function(event){
        if ($(this).hasClass('tv-off')) { 
            $(this).removeClass('tv-off').addClass('tv-on');
            pressPower(true); 
        } else if ( $(this).hasClass('tv-on') ) {
            if (currentChannel === channels.length) {
                pressPower(true);
                $(this).removeClass('tv-on').addClass('tv-off'); 
                currentChannel = 1;            
            }else {
                nextChannel(true);
            }
        }
    })

    //visual pressed effect and channel change for arrows on the controller
    var clicker = $('#button div.prev, #button div.next');

    clicker.mousedown(function(){
        $(this).addClass('pressed');
        if ($(this).hasClass('next')) {
            nextChannel(handheld);
        } else if ($(this).hasClass('prev')) {
            prevChannel(handheld);
        };
        return false;
    });

    $(document).mouseup(function(){
        clicker.removeClass('pressed');
        return false;
    });

    //click on info link
    $('.screen').on('click', '.info-icon', function(event){
        event.preventDefault;
        // console.log('clicked info');
        $('.vid.info').toggle();
    });

    //click on 'back' button
    $('.screen').on('click', '.vid.info .close', function(event){
        event.preventDefault();
        // console.log('clicked close');
        $('.vid.info').toggle();
    });



    //detect keyboard keypress

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '37') {
           // left arrow
           $('#button div.prev').addClass("pressed").delay(100).queue(function(next){
                $(this).removeClass("pressed");
                prevChannel();
                next();
            });
        }
        else if (e.keyCode == '39') {
           // right arrow
           $('#button div.next').click().addClass("pressed").delay(100).queue(function(next){
                $(this).removeClass("pressed");
                nextChannel();
                next();
            });
        }

    }


});