
let socket= io();

$(function(){

    let name = $('#my_name');
    let image = $('#user');
    let url = window.location.href;
    var str = '';
    window.res = 0;

    let username= url.split('/');
    username= username[username.length - 1];

    $("html").css({'overflow-x': 'visible'});

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-tooltip="tooltip"]').tooltip();

    $.post('/account_user/other_user/get_details',{otheruser: username},(data)=>{
        $("title").text(data.first_name + ' ' + data.last_name);
        name.html(`<h1>${data.first_name + ' ' + data.last_name}</h1>`);
        image.attr('src', `../uploads/${data.profile_picture}`);
        if(data.profile_picture !== "000.jpg")
            window.res = 1;
        console.log(window.res);
    })

    $.post('/friend_request/status',{username: username},(data) => {
        if(data.status === "pending"){
            if(username === data.requested_user){
                str = `<div class="col-12">
                    <button class="btn btn-light float-right sent_friend_request" id="sent_friend_request" data-toggle="tooltip" data-placement="top" title="Friend Request Sent"><span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Friend Request Sent</button>
                </div>
                <button class="col-12 float-right cancel_friend_request" id="cancel_friend_request" style="display: none;">Cancel Request</button>`;
                $(".status").html(str);
                if($(window).width() < 632){
                    $(".sent_friend_request").removeClass('btn-light');
                    $(".sent_friend_request").addClass('btn-primary');
                    $(".sent_friend_request").html(`<span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Requested`);
                }
            }
            else{
                str = `<div class="col-12">
                    <button class="btn btn-light float-right respond_friend_request" id="respond_friend_request" data-toggle="tooltip" data-placement="top" title="Respond to Friend Request"><span><i class="fas fa-user-plus"></i></span> Respond to Friend Request</button>
                </div>
                <label class="col-12 float-right respond" id="respond" style="display: none;">
                    <button class="btn btn-primary" id="accept">Accept</button>
                    <button class="btn btn-danger" id="reject">Reject</button>
                </label>`;
                $(".status").html(str);
                if($(window).width() < 632){
                    $(".respond_friend_request").removeClass('btn-light');
                    $(".respond_friend_request").addClass('btn-primary');
                    $(".respond_friend_request").html(`<span><i class="fas fa-user-plus"></i></span> Respond`);
                }
            }
        }
        else if(data.status === "accepted"){
            str = `<div class="col-12">
                <button class="btn btn-light float-right friend" id="friend" data-toggle="tooltip" data-placement="top" title="Friends"><span><i class="fas fa-check"></i></span> Friends</button>
            </div>
            <button class="col-12 float-right unfriend" id="unfriend" style="display: none;">Unfriend</button>`;

            $(".status").html(str);

            $.post('/account_user/other_user/get_details',{otheruser: username}, (res) => {
                $("#first_name").val(res.first_name);
                $("#last_name").val(res.last_name);
                $("#email_id").val(res.email_id);
                $("#mobile_number").val(res.mobile_number);
            });
            $("#pi").show();
            $("#personal").show();
            $("input").css({'font-weight': '800'});
        }
        else{
            $(".add_friend").show();
        }
        $(".message").show();
        $('[data-toggle="tooltip"]').tooltip();
    })

    $(".add_friend").on('click', function(){
        $.post('/friend_request/request',{username: username},(data) => {
            if(data.status === "pending"){
                str = `<div class="col-12">
                    <button class="btn btn-light float-right sent_friend_request" id="sent_friend_request" data-toggle="tooltip" data-placement="top" title="Friend Request Sent"><span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Friend Request Sent</button>
                </div>
                <button class="col-12 float-right cancel_friend_request" id="cancel_friend_request" style="display: none;">Cancel Request</button>`;
                $(".status").html(str);

                if($(window).width() < 632){
                    $(".sent_friend_request").removeClass('btn-light');
                    $(".sent_friend_request").addClass('btn-primary');
                    $(".sent_friend_request").html(`<span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Requested`);
                }
            }
            else{
                window.location = '../login/login.html';
            }
            $('[data-toggle="tooltip"]').tooltip();
        })
    })

    $(".ellipsis").hover(function(){
        $(".fa-ellipsis-v").toggleClass("fa-2x");
        $("#accountcontainer").toggle();

    })

    $(document).on('click', ".mess", function(){
        $(".modal-header").show();
        $(".modal-title").html('<h5>Message</h5>');
    })

    $(window).bind('resize', function() {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            $(".modal-header").show();
            $("#close").hide();
            $(".modal").addClass("pad");
            $(".dialog, .con, .bid").css({'width': '100vw', 'margin': '0', 'border': '0'});
        } else {
            $(".modal-header").hide();
            $("#close").show();
            if($(window).width() <= 576){
                $(".dialog, .con, .bid").css({'width': '85vw'});
            }
            else{
                $(".dialog, .con, .bid").css({'width': 'auto'});
                $(".dialog").css({'margin': 'auto'});
            }
        }
        if($(window).width() < 632){
            $(".sent_friend_request").removeClass('btn-light');
            $(".sent_friend_request").addClass('btn-primary');
            $(".sent_friend_request").html(`<span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Requested`);
            $(".respond_friend_request").removeClass('btn-light');
            $(".respond_friend_request").addClass('btn-primary');
            $(".respond_friend_request").html(`<span><i class="fas fa-user-plus"></i></span> Respond`);
        }
        else{
            $(".sent_friend_request").addClass('btn-light');
            $(".sent_friend_request").removeClass('btn-primary');
            $(".sent_friend_request").html(`<span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Friend Request Sent`);
            $(".respond_friend_request").addClass('btn-light');
            $(".respond_friend_request").removeClass('btn-primary');
            $(".respond_friend_request").html(`<span><i class="fas fa-user-plus"></i></span> Respond to Friend Request`);
        }
    })

    $(document).mouseup(function(e){
        console.log(e.target.id);
        if(e.target.id === "user"){
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                $(".modal-header").show();
                $("#close").hide();
                $(".dialog, .con, .bid").css({'width': '100vw', 'margin': '0', 'border': '0'});
            } else {
                $(".modal-header").hide();
                $("#close").show();
            }
            $.post('/account_user/other_user/get_details',{otheruser: username},(data)=>{
                if(data.profile_picture !== "000.jpg"){
                    $(".modal-body #picture").attr('src', `../uploads/${data.profile_picture}`);
                    window.res = 1;
                }
            })
            if(window.res === 1){
                $("#theImageContainer").attr("data-toggle", "modal");
            }
            else{
                $("#theImageContainer").attr("data-toggle", "");
            }
            window.res = 0;
        }
        if(e.target.id === "friend"){
            $(".unfriend").toggle();
        }
        else{
            $(".unfriend").hide();
        }

        if(e.target.id === "sent_friend_request"){
            $(".cancel_friend_request").toggle();
        }
        else{
            $(".cancel_friend_request").hide();
        }

        var respond = document.querySelector("#respond");

        if(e.target.id === "respond_friend_request"){
            if (respond.style.display === "none") {
                respond.style.display = "grid";
            } else {
                respond.style.display = "none";
            }
        }
        else{
            $(".respond").hide();
        }

        if(e.target.id === "accept" || e.target.id === "reject"){
            let response = e.target.id;
            $.get(`/friend_request/${response}/${username}`, (data) => {
                if(data === "success"){
                    setTimeout(location.reload.bind(location), 500);
                }
            })
        }

        if(e.target.id === "unfriend"){
            $.get(`/friend_request/unfriend/${username}`, (data) => {
                if(data === "success"){
                    setTimeout(location.reload.bind(location), 200);
                }
            })
        }

        if(e.target.id === "cancel_friend_request"){
            $.get(`/friend_request/reject/${username}`, (data) => {
                if(data === "success"){
                    setTimeout(location.reload.bind(location), 200);
                }
            })
        }

        if(e.target.id === "line" || e.target.id === "arr"){
            $("#containing").toggle();
        }
        else if(e.target.id === "r-1" || e.target.id === "r-2" || e.target.id === "b-1" || e.target.id === "b-2"){
            $("#containing").show();
        }
        else{
            $("#containing").hide();
        }
    })

    socket.emit("check_isOnline",{username: username});

    socket.on("isOnline",(data)=>{
        //display user status as Online or Offline
        //console.log(data.status);
        if(data.status === "online"){
            $("#online_status").removeClass("hide");
            $("#offline_status").addClass("hide");
        }
        else{
            $("#offline_status").removeClass("hide");
            $("#online_status").addClass("hide");
        }
    })
    setInterval(() => {socket.emit("check_isOnline",{username: username})}, 1000);
})