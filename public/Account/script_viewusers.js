
let socket= io();

$(function(){

    let name = $('#my_name');
    let image = $('#user');
    let url = window.location.href;
    var str = '';

    let username= url.split('/');
    username= username[username.length - 1];

    $.post('/account_user/other_user/get_details',{otheruser: username},(data)=>{
        name.html(`<h1>${data.first_name + ' ' + data.last_name}</h1>`);
        image.attr('src', `../uploads/${data.profile_picture}`);
    })

    $.post('/friend_request/status',{username: username},(data) => {
        if(data.status === "pending"){
            if(username === data.requested_user){
                str = `<div class="col-12">
                    <button class="btn btn-light sent_friend_request" id="sent_friend_request"><span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Friend Request Sent</button>
                </div>
                <button class="cancel_friend_request" id="cancel_friend_request" style="display: none;">Cancel Request</button>`;
                $(".status").html(str);
            }
            else{
                str = `<button class="btn btn-primary" id="accept">Accept</button>
                    <button class="btn btn-danger offset-1" id="reject">Reject</button>`;
                $(".status").html(str);
            }
        }
        else if(data.status === "accepted"){
            str = `<div class="col-12">
                <button class="btn btn-light friend" id="friend"><span><i class="fas fa-check"></i></span> Friends</button>
            </div>
            <button class="unfriend" id="unfriend" style="display: none;">Unfriend</button>`;

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
    })

    $(".add_friend").on('click', function(){
        $.post('/friend_request/request',{username: username},(data) => {
            if(data.status === "pending"){
                str = `<div class="col-12">
                    <button class="btn btn-light sent_friend_request" id="sent_friend_request"><span><i class="fas fa-user"><i class="fas fa-arrow-right"></i></i></span> Friend Request Sent</button>
                </div>
                <button class="cancel_friend_request" id="cancel_friend_request" style="display: none;">Cancel Request</button>`;
                $(".status").html(str);
            }
            else{
                window.location = '../login/login.html';
            }
        })
    })

    $(".ellipsis").hover(function(){
        $(".fa-ellipsis-v").toggleClass("fa-2x");
        $("#accountcontainer").toggle();

    })

    $(document).on('click', function(e){
        console.log(e.target.id);
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
    })

    socket.emit("check_isOnline",{username: username});

    socket.on("isOnline",(data)=>{
        //display user status as Online or Offline
        //alert(data.status);
        if(data.status === "online"){
            $("#online_status").removeClass("hide");
            $("#offline_status").addClass("hide");
        }
        else{
            $("#offline_status").removeClass("hide");
            $("#online_status").addClass("hide");
        }
    })
})