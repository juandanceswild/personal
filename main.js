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
        info: '<p><a href="http://antarcti.cc" target="_blank">Antarctic</a> is the digital agency where I’ve served as Technology Director since 2015.</p><p>I led and project managed digital design, production, maintenance and expansion for integrated crowdfunding platforms, non-profit websites, and e-commerce stores, working extensively with frameworks and platforms like Foundation, MeteorJS, Wordpress, Magento, Shopify, and Salesforce’s site.com. I was product manager and SCRUM master in agile teams, and conducted client meetings, presentations and project deliveries. I also participated in strategy and ideation for venture projects and pitches and collaborated with Montreal-based partner agency <a href="http://naisgood.com" target="_blank">N/A</a>.</p>',
        link: "http://antarcti.cc",
        background: "antarctic.jpg"
    };

    var actForCompassion = {
        channel: 2,
        video: "actforcompassion.mp4",
        caption: '<span>Act for Compassion</span> <br/>  <a href="#" class="info-icon">info</a> ',
        info: "<p><a href='https://www.compassion.com/act/build-your-fundraiser.htm' target='_blank'>Act for Compassion</a> is a custom crowdfunding web app built for <a href='http://compassion.com' target='_blank'>Compassion</a>, an international non profit that releases children from poverty through a sponsorship program.</p> <p>The platform allows advocates to fundraise and connect children with new sponsors.</p><p>I was the product owner and SCRUM master of the agile team responsible for producing and delivering creative content, copywriting and layout front-end files for the platform. I worked on-site in Compassion's HQ integrating the layout files to a backbone.js application on a corporate Tridion CMS system with the in-house IT team, and consulted through the process in UI/UX design and creative leadership for a team of over 15 people.</p>",
        link: "https://www.compassion.com/act/brazil.htm",
        background: "compassion.jpg"
    };

    var davidCasavant = {
        channel: 3,
        video: "davidcasavant.mp4",
        caption: '<span>David Casavant</span> <br/>  <a href="#" class="info-icon">info</a>',
        info: "<p><a href='http://david-casavant.com' target='_blank'>David Casavant</a> is a celebrity stylist and fashion archivist in New York.</p><p>I directed the digital development of a custom Wordpress multisite theme that features a fully responsive horizontal infinite-scroll photographic gallery.</p>",
        link: "http://david-casavant.com",
        background:"casavant.jpg"
    };

    var rmhc = {
        channel: 4,
        video: "rmhc.mp4",
        caption: "<span>Ronald McDonald House Charities</span> <br/>  <a href='#' class='info-icon'>info</a>",
        info: "<p><a href='http://rmhc.org' target='_blank'>Ronald McDonald House Charities</a>  has chapters in more than 65 countries, and is an organization with a complex technology ecosystem. I directed the re-development of their global website (built on Salesforce’s site.com) to comply with ADA accessibility standards, and the upgrading of a custom Wordpress theme for <a href='https://rmhc-ctx.org/' target='_blank'>chapters</a>.</p> <p>I also participated in an exploratory project for the global launch of the <a href='https://www.rmhccanada.ca/' target='_blank'>Make Fun Matter</a> crowdfunding platform, for which I supported creative production.</p>",
        link: "http://www.rmhc.org",
        background:"rmhc.jpg"
    };

    var asquared = {
        channel: 5,
        video: "asquared.mp4",
        caption: "<span>A-squared.cc</span> <br/>  <a href='#' class='info-icon'>info</a>",
        info: "<p><a href='http://a-squared.cc' target='_blank'>A²</a> is a venture project incubated at <a href='http://antarcti.cc' target='_blank'>Antarctic</a> to provide graphic design services on-the-go. I was the project lead on the MeteorJS build of its MVP.</p>",
        link: "http://www.a-squared.cc",
        background:"asquared.jpg"
    };

    var channels = [antarcticHomepage, actForCompassion, davidCasavant, rmhc, asquared];



    // function to rotate 3d objects following mouse
    if (!handheld) {
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
    }


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
        // $('.screen .vid.info').scrollTop(0);
        $('.vid.info').mCustomScrollbar("scrollTo",'top', {scrollInertia:0});
        if (handheld) {
            $('.screen .vid.info').css("background-image","url('backgrounds/"+channelToShow.background+ "')");
        }
    };

    function pressPower(mobile) {
        showChannel(currentChannel);
        if (mobile) {
            $('.vid.js-info').toggle();
            $('.vid:not(".js-info")').css('display','none');
        }
        else {
            $('.screen video').toggle().get(0).play();
            if ( $('.vid.js-info').css('display') === 'none' ){
                $('.vid:not(".js-info")').toggle();
            } else {
                $('.vid:not(".vid.caption, .vid.channel")').toggle();
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
    if (handheld) {
        $('.touchevents .screen').on('click', function(event){
            // console.log('event target is '+ event.target.nodeName);
            if (event.target.nodeName === 'A') {return;}
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
    }


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
        $('.vid.js-info, .vid.channel, .vid.caption').toggle();
    });

    //click on 'info close' button
    $('.screen').on('click', '.vid.close-info', function(event){
        event.preventDefault();
        // console.log('clicked close');
        $('.vid.js-info, .vid.channel, .vid.caption').toggle();
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
        else if (e.keyCode == '27') {
            //escape key
            if ($('.vid.info').is(':visible')) {
                $('.screen .vid.close-info').click();
            }
        }

    }


    // Listen for orientation changes
        window.addEventListener("orientationchange", function() {
            window.location.reload()
        }, false);


});