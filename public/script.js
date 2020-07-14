$(document).ready(function(){

    //Object for storing and tracking jquery navbar objects
    navbar_obj={
        trigger_home: $('.navMenu li:first-child a'),
        trigger_about: $('.navMenu li:nth-child(2) a'),
        trigger_services: $('.navMenu li:nth-child(3) a'),
        trigger_team: $('.navMenu li:nth-child(4) a'),
        trigger_contact: $('.navMenu li:nth-child(5) a')
    }

    $(document).on('click', '#success_notification', function(){
        $(".badge").css({'display': 'none'});
    })

    $.ajax({
        url: `/root/search_user`,
        type: 'GET',
        success: function (data) {
            window.data = data
            return false;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    // $.get('/root/notification_details', (data) => {
    //     if(data === false){
    //         $(".badge").css({'display': 'none'});
    //     }
    //     else{
    //         $(".badge").css({'display': 'inline-block'});
    //     }
    // })

    //this flag is stored for tracking navbar active class
    let prev_nav_flag = $('.navMenu li:first-child a');
    let i = 2;
    var tap_slide = 0;
    let blog_left = $(".blog-card").offset().left;
    let hide_left = $(".blog-card").offset().left;

    //for toggling navbar active class when navbar links are clicked
    $(".navMenu li a").click(function(){
        prev_nav_flag.toggleClass('active');
        prev_nav_flag = $(this);
        $(this).toggleClass('active');
    });

    //for toggling navbar active class when triple arrows are clicked
    $("a .container_arrows").click(function(){
        prev_nav_flag.toggleClass('active');
        let key= this.className.split(' ')[0];
        prev_nav_flag= navbar_obj[key];
        prev_nav_flag.toggleClass('active');
    });

    $("#start").click(function(){
        $(window).scrollTop(0)
    });



    $(".p1").css("animation-play-state", "paused");
    $(".slide-up").css("animation-play-state", "paused");

    $("#check").on('click', function() {
        if($("#checkSide").is(":checked")){
            $("#checkSide").prop('checked', false);
        }
        if ($(this).is(":checked")) {
            $('#btnSide').css({ 'margin-left': '100%', 'display': 'inline' });
        } else {
            $('#btnSide').css({ 'display': 'inline', 'margin-left': '0px',  });
        }
    });

    $(window).bind('resize', function() {
        if ($("#check").is(":checked") && $(window).width() <= 1009) {
            $("#checkSide").prop('checked', false);
            $('#btnSide').css({ 'margin-left': '100%', 'display': 'none' });
        }
        if ($("#check").is(":checked") && $(window).width() <= 1009) {
            $('#btnSide').css({ 'display': 'inline' });
        }
        if ($(window).width() > 1009) {
            $('#btnSide').css({ 'margin-left': '0px', 'display': 'inline' });
        }
        $("#our #hide").css({'top': $(".blog-card").offset().top, 'left': $(".blog-card").offset().left, 'width': $(".blog-card").width()});
        // if($(window).width() <=833 && $(window).width() > 684){
        //     if($(window).height() <= 700){
        //         $(".blog-card").css({'margin-top': '30%'});
        //         $("#our #hide").css({'margin-top': '0%'});
        //     }
        //     else if($(window).height() > 700){
        //         $(".blog-card").css({'margin-top': 'calc(40px + 10%)'});
        //         $("#our #hide").css({'margin-top': '0%'});
        //     }
        // }
        // else if($(window).width() > 833){
        //     $(".blog-card").css({'margin-top': '0%'});
        //     $("#our #hide").css({'margin-top': '0%'});
        // }

        // if ($(window).width() >= 834){
        //     $("#our #hide").css({'top': $(".blog-card").offset().top, 'left': $(".blog-card").offset().left});
        // }
    });

    // if($(window).width() <=833 && $(window).width() > 684){
    //     if($(window).height() <= 700){
    //         $(".blog-card").css({'margin-top': '30%'});
    //         $("#our #hide").css({'margin-top': '0%'});
    //     }
    //     else if($(window).height() > 700){
    //         $(".blog-card").css({'margin-top': 'calc(40px + 10%)'});
    //         $("#our #hide").css({'margin-top': '0%'});
    //     }
    // }
    // else if($(window).width() > 833){
    //     $(".blog-card").css({'margin-top': '0%'});
    //     $("#our #hide").css({'margin-top': '0%'});
    // }

    $("#our #hide").css({'top': $(".blog-card").offset().top, 'left': $(".blog-card").offset().left, 'width': $(".blog-card").width()});


    $('.carousel').carousel({
        pause: "false"
    });


    function isScrolledIntoView(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(window).scroll(function(){
        if ($(window).scrollTop() + $(window).height() > $("#us").offset().top + 50) {
            if ($(".image_about_us").offset().left < 0){
                $(".image_about_us").css({'left': '0px', 'transition': 'all 0.9s ease-in-out'});
                $(".p1").css("animation-play-state", "running");
                $(".slide-up").css({'right': '0px', 'transition': 'all 0.9s ease-in-out'});
                $(".slide-up").css("animation-play-state", "running");
            }
        }


        if (isScrolledIntoView($('.image_about_us'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_about'];
            prev_nav_flag.toggleClass('active');
        } else if (isScrolledIntoView($('.home_fake_traversal'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_home'];
            prev_nav_flag.toggleClass('active');
        }else if (isScrolledIntoView($('.services_fake_traversal'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_services'];
            prev_nav_flag.toggleClass('active');
        }else if (isScrolledIntoView($('.team_fake_traversal'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_team'];
            prev_nav_flag.toggleClass('active');
        } else if (isScrolledIntoView($('.contact_fake_traversal'))){
            prev_nav_flag.toggleClass('active');
            prev_nav_flag= navbar_obj['trigger_contact'];
            prev_nav_flag.toggleClass('active');
        }

        if($(window).scrollTop() > 200){
            $("#start").css({'display': 'inline'});
        }
        else{
            $("#start").css({'display': 'none'});
        }
    });
    $(window).trigger( "scroll" );

    $(".input span").on('click', function(){
        if($(".input input").val() == "")
            $(".input input").focus();
        else{
            window.location = `/account_user/${$(".input input").val()}`;
        }
    })

    $(document).on('keypress', ".input input", function(e){
        if(e.which == 13){
            e.preventDefault();
            if($(this).val() !== ""){
                window.location.assign(`/account_user/${$(".input input").val()}`);
            }
        }
        else{
            function autocomplete(inp, arr) {
                var currentFocus;
                inp.addEventListener("input", function(e) {
                    var a, b, i, val = this.value;
                    closeAllLists();
                    if (!val) { return false;}
                    currentFocus = -1;
                    document.getElementById("input").classList.add("remove");
                    /*create a DIV element that will contain the items (values):*/
                    a = document.createElement("DIV");
                    a.setAttribute("id", this.id + "autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");
                    /*append the DIV element as a child of the autocomplete container:*/
                    this.parentNode.appendChild(a);
                    let flag = 0;
                    for (i = 0; i < arr.length; i++) {
                        /*check if the item starts with the same letters as the text field value:*/
                        if (arr[i].username.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                            /*create a DIV element for each matching element:*/
                            b = document.createElement("DIV");
                            /*make the matching letters bold:*/
                            b.innerHTML = "<strong>" + arr[i].username.substr(0, val.length) + "</strong>";
                            b.innerHTML += arr[i].username.substr(val.length);
                            b.innerHTML += "<input type='hidden' value='" + arr[i].username + "'>";
                            b.addEventListener("click", function(e) {
                                inp.value = this.getElementsByTagName("input")[0].value;
                                closeAllLists();
                            });
                            a.appendChild(b);
                            flag++;
                            if(flag == 7)
                                break
                        }
                    }
                    if(flag == 0)
                        document.getElementById("input").classList.remove("remove");
                });
                inp.addEventListener("keydown", function(e) {
                    var x = document.getElementById(this.id + "autocomplete-list");
                    if (x) x = x.getElementsByTagName("div");
                    if (e.keyCode == 40) {
                        currentFocus++;
                        addActive(x);
                    } else if (e.keyCode == 38) {
                        currentFocus--;
                        addActive(x);
                    }
                    // else if (e.keyCode == 13) {
                    // /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    // e.preventDefault();
                    // if (currentFocus > -1) {
                    //     /*and simulate a click on the "active" item:*/
                    //     if (x) x[currentFocus].click();
                    // }
                    // }
                });
                function addActive(x) {
                    if (!x) return false;
                    removeActive(x);
                    if (currentFocus >= x.length) currentFocus = 0;
                    if (currentFocus < 0) currentFocus = (x.length - 1);
                    x[currentFocus].classList.add("autocomplete-active");
                    inp.value = $(".autocomplete-active input").val();
                }
                function removeActive(x) {
                    for (var i = 0; i < x.length; i++) {
                        x[i].classList.remove("autocomplete-active");
                    }
                }
                function closeAllLists(elmnt) {
                    var x = document.getElementsByClassName("autocomplete-items");
                    document.getElementById("input").classList.add("remove");
                    document.getElementById("input").classList.remove("remove");
                    for (var i = 0; i < x.length; i++) {
                        if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                        }
                    }
                }
                document.addEventListener("click", function (e) {
                    if(e.target.id !== "search_user"){
                        closeAllLists(e.target);
                    }
                });
            }

            autocomplete(document.getElementById("search_user"), window.data);
        }
    })

    $("#read1").on('click', function(){
        $("#hide").css({'display': 'inline', 'vertical-align': 'middle'});
        var arr = [$(".t1").text(), $("#date1").text(), $(".text1").text()]
        $("#hide").append(arr[0] + "<br/><br/><br/>");
        $("#hide").append(arr[1] + "<br/><br/>");
        $("#hide").append(arr[2]);
        if (tap_slide != null) {
            clearInterval(tap_slide);
            tap_slide = null;
        } else {
            tap_start();
        }
        //var r= $('<input type="button" value="new button"/>');
        //$("#hide").append(r);
    });

    $("#read2").on('click', function(){
        $("#hide").css({'display': 'inline', 'vertical-align': 'middle'});
        var arr = [$(".t2").text(), $("#date2").text(), $(".text2").text()]
        $("#hide").append(arr[0] + "<br/><br/><br/>");
        $("#hide").append(arr[1] + "<br/><br/>");
        $("#hide").append(arr[2]);
        if (tap_slide != null) {
            clearInterval(tap_slide);
            tap_slide = null;
        } else {
            tap_start();
        }
    });

    $("#read3").on('click', function(){
        $("#hide").css({'display': 'inline', 'vertical-align': 'middle'});
        var arr = [$(".t3").text(), $("#date3").text(), $(".text3").text()]
        $("#hide").append(arr[0] + "<br/><br/><br/>");
        $("#hide").append(arr[1] + "<br/><br/>");
        $("#hide").append(arr[2]);
        if (tap_slide != null) {
            clearInterval(tap_slide);
            tap_slide = null;
        } else {
            tap_start();
        }
    });

    $("#read4").on('click', function(){
        $("#hide").css({'display': 'inline', 'vertical-align': 'middle'});
        var arr = [$(".t4").text(), $("#date4").text(), $(".text4").text()]
        $("#hide").append(arr[0] + "<br/><br/><br/>");
        $("#hide").append(arr[1] + "<br/><br/>");
        $("#hide").append(arr[2]);
        if (tap_slide != null) {
            clearInterval(tap_slide);
            tap_slide = null;
        } else {
            tap_start();
        }
    });

    $("#read5").on('click', function(){
        $("#hide").css({'display': 'inline', 'vertical-align': 'middle'});
        var arr = [$(".t5").text(), $("#date5").text(), $(".text5").text()]
        $("#hide").append(arr[0] + "<br/><br/><br/>");
        $("#hide").append(arr[1] + "<br/><br/>");
        $("#hide").append(arr[2]);
        if (tap_slide != null) {
            clearInterval(tap_slide);
            tap_slide = null;
        } else {
            tap_start();
        }
    });

    $(".i1").on('click', function(){
        var id = $(this).attr('id');
        var m = id.charAt(4);
        var n = parseInt(m);
        i = n+1;
    });

    $("#tapImg").on('click', function(){
        if (tap_slide != null) {
            clearInterval(tap_slide);
            tap_slide = null;
        } else {
            tap_start();
        }
    });

    function tap_start(){
        tap_slide = setInterval(function(){
            if(i <= 5){
                document.getElementById('tap-' + (i-1)).checked = false;
                document.getElementById('tap-' + i).checked = true;
            }
            else{
                document.getElementById('tap-5').checked = false;
                i = 1;
                document.getElementById('tap-' + i).checked = true;
            }
            i++;
        },5000);
    }

    if(tap_slide != null){
        tap_start();
    }
    $("#back").on('click', function(){
        $("#our #hide").css({'display': 'none'});
        $("#our #hide").text("");
        var r=$('<input/>').attr({
            type: "button",
            id: "back",
            value: 'X'
        });
        $("#our #hide").append(r);
        tap_start();
    });

    $(document).on('click', '#back', function(){
        $("#our #hide").css({'display': 'none'});
        $("#our #hide").text("");
        var r=$('<input/>').attr({
            type: "button",
            id: "back",
            value: 'X'
        });
        $("#our #hide").append(r);
        if(tap_slide == null){
            tap_start();
        }
    });
});

//submiting contact us form with alert message
$('.ccform').submit(function(){
    alert('Thank you for contacting us. Our team will be responding soon. Keep an eye on your email account ;)');
})
