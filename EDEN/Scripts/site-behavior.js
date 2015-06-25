//index-menu-toggle
$('.show-menu-button#index-sub-menu').click(function (e) {

    if (!$('.slide-navbar').hasClass('showing'))
    {
        var currentWidth = $(document.body).width();
        var navWidth = $('.slide-navbar').css('width').replace('px', '');
        $('.board').animate({ width: currentWidth - parseInt(navWidth) + 'px' }, 1000, function () {
            /*$('.slide-navbar').css({
                'z-index': 0
            });*/
        });

        var basis = 0;
        for (var i = 0; i < $('.slide-navbar>.slide-navbar-content>ul>li').size() ; i++)
        {
            $('.slide-navbar>.slide-navbar-content').fadeIn(100);
            $('.slide-navbar>.slide-navbar-content>ul>li:nth-child(' + (i + 1).toString() + ')').delay(1000+basis*1000).animate({
                'margin-left': '10px',
                opacity:0.8
            }, 200, 'easeOutQuad');
            basis = basis + 0.15;
        }
        $('.slide-navbar').toggleClass('showing');
    }
    else {
       /*$('.slide-navbar').css({
            'z-index': -1
        });*/
        $('.board').animate({ width: '100%' }, 1000, function () {
            $('.slide-navbar>.slide-navbar-content>ul>li').css({
                'margin-left': '50px',
                opacity: 0
            });
        });
        $('.slide-navbar>.slide-navbar-content').fadeOut(500);
        
        $('.slide-navbar').toggleClass('showing');
    }
});
//normal-menu-toggle
$('.show-menu-button#normal-sub-menu').click(function () {
    $('.sub-link').slideToggle();
});

//sion-hover to show the text and glow
$('.hall>.hall-text2,.hall>.hall-sion').hover(function () {
    $('.hall>.hall-text2').addClass('overshow');
    $('.hall>.hall-sion-glow').addClass('overshow');
}, function () {
    $('.hall>.hall-text2').removeClass('overshow');
    $('.hall>.hall-sion-glow').removeClass('overshow');
});

//creation page video info click
$('.video-info-button').click(
    function (e) {
        if(!$('.video-info-button').hasClass('showing'))
        {
            $('.video-info-background>span').animate({
                width: '320px',
                opacity: 1,
                'margin-left': '30px',
                'margin-right': '5px'
            }, 1000, 'easeInOutSine');

            $('.video-info-button').animate({
                'margin-left':0,
            }, 1000, 'easeInOutSine');

            $('.video-info-button .fa-plus').animate({
                opacity: 0,
            }, 500, 'easeInOutSine', function () {
                $('.video-info-button .fa-minus').animate({
                    opacity: 1,
                }, 700, 'easeInOutSine');
            });

            $('.video-info-button').toggleClass('showing');
        }
        else
        {
            $('.video-info-background>span').animate({
                width: '0px',
                opacity: 0,
                'margin-left': '0px',
                'margin-right': '0px'
            }, 1000, 'easeInOutSine');

            $('.video-info-button').animate({
                'margin-left': '50px',
            }, 1000, 'easeInOutSine');

            $('.video-info-button .fa-minus').animate({
                opacity: 0,
            }, 500, 'easeInOutSine', function () {
                $('.video-info-button .fa-plus').animate({
                    opacity: 1,
                }, 700, 'easeInOutSine');
            });

            $('.video-info-button').toggleClass('showing');
        }
    }
    );

$(function () {

    //door open spy
    var gardenRespondPosition = $('.garden').position();
    var doorIsOpen=false;

    $(window).scroll(function () {
        //currentScrollTop is the y position of browser's view area in whole document
        var currentScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (currentScrollTop > gardenRespondPosition.top)
        {       
            if(doorIsOpen==false)
            {
                doorIsOpen = true;

                //door open animation use two queues
                var fadeOutFunctions = [
                    function () { $('.garden-door1').delay(1500).animate({ opacity: 0 }, 800, 'linear', fadeOutStart) },
                    function () { $('.garden-door2').delay(800).animate({ opacity: 0 }, 800, 'linear', fadeOutStart) },
                    function () { $('.garden-door3').delay(800).animate({ opacity: 0 }, 800, 'linear', function () { }) },
                ];
                var fadeInFunctions = [
                    function () { $('.garden-door2').delay(1500).animate({ opacity: 1 }, 800, 'linear', fadeInStart) },
                    function () { $('.garden-door3').delay(800).animate({ opacity: 1 }, 800, 'linear', fadeInStart) },
                    function () { $('.garden-door4').delay(800).animate({ opacity: 1 }, 800, 'linear', function () { }) },
                ];

                $('.garden').queue('fadeOutQueue', fadeOutFunctions);
                $('.garden').queue('fadeInQueue', fadeInFunctions);

                var fadeOutStart = function () {
                    $('.garden').dequeue('fadeOutQueue');
                };
                var fadeInStart = function () {
                    $('.garden').dequeue('fadeInQueue');
                };
                fadeOutStart();
                fadeInStart();
            }
        }
    });

    $(window).bind('resize', function () {
        //slide-navbar resize funciton
        if ($('.slide-navbar').hasClass('showing'))
        {
            var currentWidth = $(document.body).width();
            var navWidth = $('.slide-navbar').css('width').replace('px', '');
            $('.board').css({
                width: currentWidth - parseInt(navWidth) + 'px'
            });
        }
    });
});