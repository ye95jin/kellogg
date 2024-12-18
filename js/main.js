$(function(){
    $(".nav > ul > li").hover(
        function(){
            $(this).parent().addClass("over");
        },
        function(){
            $(this).parent().removeClass("over");
        }
    );

    $(".nav > ul > li").focusin(function(){
        $(this).addClass("over");
    });

    $(".nav > ul > li").focusout(function(){
        $(this).removeClass("over");
    });

    $(".nav > ul > li:first-child").focusin(function(){
        $(this).parent().addClass("over");
    });

    $(".nav li:last-child li:last-child").focusout(function(){
        $(this).parent().parent().removeClass("over");
        $(this).parent().parent().parent().removeClass("over");
    });

    let slider = $(".slider .slider_area ul");

    let w;
    let total = 4;
    let amount = 0;
    let interval;
    let autoplaySpeed = 2500; 

    $(window).resize(function(){
        w = $(window).width();

        if(w > 1020){
            distance = w;
        }
        else{
            distance = 1020;
        }

        slider.css({ width: distance * total });
    });

    $(window).trigger("resize");

    $(".direction_nav .left").click(function(e){
        e.preventDefault();

        if(slider.is(":animated")){
            return;
        }

        slider.prepend(slider.find("li").last());
        amount -= distance;
        slider.css({ left: amount });

        amount += distance;
        slider.animate({ left: amount }, 500);
    });

    $(".direction_nav .right").click(function(e){ 
        e.preventDefault();

        if(slider.is(":animated")){
            return;
        }

        amount -= distance;

        slider.animate({ left: amount }, 500, function(){
            $(this).append(slider.find("li").first());
            amount += distance;
            $(this).css({ left: amount });
        });
    });

    function startAutoplay() {
        interval = setInterval(function() {
            $(".direction_nav .right").trigger("click");
        }, autoplaySpeed);
    }

    function stopAutoplay() {
        clearInterval(interval);
    }

    startAutoplay();

    $(".slider").hover(stopAutoplay, startAutoplay);
});
