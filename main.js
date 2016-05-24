$(document).ready(function() {

    var currentChannel = 1;

    var antarcticHomepage = {
        channel: 1,
        video: "antarcticsite.mp4",
        caption: '<span>Antarctic</span> <br/>  <a href="#" class="info-icon">info</a>',
        info: "<p><strong>Antarctic:</strong> Humanity Focused Agency <br/>2016</p><p>Web development</p><p><a href='http://antarcti.cc' target='_blank'>Antarctic</a> is the digital agency where I’ve served as Technology Director since 2015.</p> <p>I developed it’s new temporary landing page (check it out on <a href='http://quirktools.com/screenfly/#u=http%3A//antarcti.cc&w=375&h=667&a=37' target='_blank'>mobile</a>, too!) and am currently directing the build of the new site.</p>",
        link: "http://antarcti.cc"
    };

    var actForCompassion = {
        channel: 2,
        video: "actforcompassion.mp4",
        caption: '<span>Act for Compassion</span> <br/>  <a href="#" class="info-icon">info</a> ',
        info: "<p><strong>Compassion International</strong>: Act for Compassion<br>2015</p><p>Crowdfunding Web Application <br>Front End and Digital Strategy Lead</p><p>>_UX and UI consulting <br> >_Digital and communication strategy lead. <br>>_Backbone.js, patternlab and atomic design systems, Tridion.</p>",
        link: "http://www.actforcompassion.com"
    };

    var davidCasavant = {
        channel: 3,
        video: "davidcasavant.mp4",
        caption: '<span>David Casavant</span> <br/>  <a href="#" class="info-icon">info</a>',
        info: "<p><strong>David Casavant:</strong>Stylist and Fashion Archivist <br/>2015</p><p>Development Lead</p><p>>_Wordpress multisite, custom theme, custom post types and taxonomies. <br> >_Responsive web design. AJAX infinite horizontal scroll.</p>",
        link: "http://david-casavant.com"
    };

    var rmhc = {
        channel: 4,
        video: "rmhc.mp4",
        caption: "<span>Ronald McDonald House Charities</span> <br/>  <a href='#' class='info-icon'>info</a>",
        info: "<p><strong>Ronald McDonald House Charities</strong><br>2016</p><p>Development Lead</p><p>>_Re-build of rmhc.org to comply with accessibility ADA standards. Built on Salesforce's site.com. <br>>_Build and support for custom Wordpress theme for RMHC local chapters.",
        link: "http://www.rmhc.org"
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
    };
    //turn tv on
    $('.pow').click(function(event) {
        showChannel(currentChannel);
        $('.screen video').toggle().get(0).play();
        $('.intro').toggle();
        if ( $('.vid.info').css('display') == 'none' ){
            $('.vid:not(".info")').toggle();
        } else {
            $('.vid').toggle();
        }
        $('.pow').toggleClass('on');
    });


    //functions for click on controller buttons
    $('#button div.next').click(function(event) {
        currentChannel++;
        if (currentChannel>channels.length) { currentChannel=1; }
        showChannel(currentChannel);
        $('.screen video').get(0).play();
    });

    $('#button div.prev').click(function(event) {
        currentChannel--;
        if (currentChannel < 1) {currentChannel = channels.length;}
        showChannel(currentChannel);
        $('.screen video').get(0).play();
    });    

    var clicker = $('#button div.prev, #button div.next');

    clicker.mousedown(function(){
        $(this).addClass('pressed');
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
           $('#button div.prev').click().addClass("pressed").delay(100).queue(function(next){
                $(this).removeClass("pressed");
                next();
            });
        }
        else if (e.keyCode == '39') {
           // right arrow
           $('#button div.next').click().addClass("pressed").delay(100).queue(function(next){
                $(this).removeClass("pressed");
                next();
            });
        }

    }

});