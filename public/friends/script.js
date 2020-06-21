$(document).ready(function(){
    let prev_nav_flag = $('.navbar-nav li:first-child');

    $(".navbar-nav li a, .all_friends, .friend_requests, .sent_request").click(function(e){
        let class_name = $(this).attr('class').split(' ');
        let class_link = '';
        if(class_name[3] === "all_friends" || class_name[3] === "friend_requests" || class_name[3] === "sent_request"){
            $(".all_friends, .friend_requests, .sent_request").show();
            $(this).hide();
            class_link = class_name[3];
            $(".heading").text($('.' + class_name[3] + ' .col-8').text());
        }
        else{
            prev_nav_flag.toggleClass('active');
            prev_nav_flag = $(this);
            $(this).toggleClass('active');
            class_link = class_name[1];
        }
        $.ajax(`/friends/${class_link}`, {
            success: (data) =>{
                let size = data.length;
                if(size == 0){
                    $(".no_friends").show();
                    $(".first").html('');
                    $(".second").html('');
                    if(class_link === "all_friends")
                        $(".no_friends").text("You have no friend");
                    else if(class_link === "friend_requests")
                        $(".no_friends").text("You have no friend request");
                    else
                        $(".no_friends").text("You have not send any friend request");
                }
                else{
                    $(".no_friends").hide();
                    $(".first").html('');
                    $(".second").html('');
                    let first = '';
                    let second = '';
                    for(let i = 0; i < size; i++){
                        let str = '';
                        str += `<div class="row add add${(i+1)}" style="height: 120px;padding-top: 10px;">
                            <div class="col-4">
                                <div class="image">
                                    <label id="theImageContainer">
                                        <img id="user" src="../uploads/${data[i].profile_picture}">
                                    </label>
                                </div>
                            </div>
                            <div class="col-4 full_name" style="text-align: center;overflow: hidden;word-break: break-all;">
                                ${data[i].first_name} ${data[i].last_name}<br />
                                <small class="username text-muted">${data[i].username}</small>
                            </div>`;
                        if(class_link === "all_friends"){
                            str += `<div class="col-4 button_container">
                                <button class="btn btn-light friend friend${(i+1)}" data-toggle="tooltip" data-placement="top" title="Friends"><span><i class="fas fa-check"></i></span> Friends</button>
                                <button class="btn btn-light unfriend unfriend${(i+1)}" style="display: none;">Unfriend</button>
                            </div>
                        </div>`;
                        }
                        else if(class_link === "friend_requests"){
                            str += `<div class="col-4 button_container">
                                <button class="btn btn-primary accept accept${(i+1)}">Confirm</button>
                                <button class="btn btn-light reject reject${(i+1)} remove">Remove</button>
                            </div>
                        </div>`;
                        }
                        else{
                            str += `<div class="col-4 button_container">
                                <button class="btn btn-light reject reject${(i+1)}">Cancel</button>
                            </div>
                        </div>`;
                        }
                        if(i % 2 == 0)
                            first += str;
                        else
                            second += str;
                    }
                    $(".first").html(first);
                    $(".second").html(second);
                    $('[data-toggle="tooltip"]').tooltip();
                }
            },
            error: (data) =>{
                alert("An error has occurred");
            }
        })
        return false;
    });

    $.get('/friends/all_friends', (data) =>{
        let size = data.length;
        let first = '';
        let second = '';
        if(size == 0){
            $(".no_friends").show();
            $(".no_friends").text("You have no friend");
        }
        else{
            $(".no_friends").hide();
            for(let i = 0; i < size; i++){
                let str = '';
                str += `<div class="row add add${(i+1)}" style="height: 120px;padding-top: 10px;">
                    <div class="col-4">
                        <div class="image">
                            <label id="theImageContainer">
                                <img id="user" src="../uploads/${data[i].profile_picture}">
                            </label>
                        </div>
                    </div>
                    <div class="col-4 full_name" style="text-align: center;overflow: hidden;word-break: break-all;">
                        ${data[i].first_name} ${data[i].last_name}<br />
                        <small class="username text-muted">${data[i].username}</small>
                    </div>
                    <div class="col-4 button_container">
                        <button class="btn btn-light friend friend${(i+1)}" data-toggle="tooltip" data-placement="top" title="Friends"><span><i class="fas fa-check"></i></span> Friends</button>
                        <button class="btn btn-light unfriend unfriend${(i+1)}" style="display: none;">Unfriend</button>
                    </div>
                </div>`;
                if(i % 2 == 0)
                    first += str;
                else
                    second += str;
            }

            $(".first").html(first);
            $(".second").html(second);
            $('[data-toggle="tooltip"]').tooltip();
        }
    })

    $(document).on('click', '.add', function(){
        var class_name = $(this).attr("class");
        var one = class_name.split(' ')[2];
        var space = $("." + one + " .username").text();
        username = $.trim(space);
        window.location = `/account_user/${username}`;
    });

    $(document).on('click', '.friend, .unfriend', function(e){
        e.preventDefault();
        var class_name = $(this).attr("class");
        var all_class = class_name.split(' ');
        var name = all_class[2];
        var second = all_class[3];
        console.log(all_class);
        if(name === "friend"){
            var str = second.split('friend');
            $(".unfriend" + str[1]).toggle();
        }
        else{
            var parent_name = $("." + second).parent().parent().attr("class");
            var add = parent_name.split(" ")[2];
            var one_name = $("." + add).attr("class");
            var one = one_name.split(' ')[2];
            var space = $("." + one + " .username").text();
            var user_name = $.trim(space);
            $.get(`/friend_request/unfriend/${user_name}`, (data) => {
                if(data === "success"){
                    setTimeout(location.reload.bind(location), 200);
                }
            })
        }
        return false;
    })

    $(document).on('click', '.accept, .reject', function(e){
        e.preventDefault();
        var class_name = $(this).attr("class");
        var name = class_name.split(' ')[2];
        var all_class = class_name.split(' ');
        var name = all_class[2];
        var second = all_class[3];
        var parent_name = $("." + second).parent().parent().attr("class");
        var add = parent_name.split(" ")[2];
        var one_name = $("." + add).attr("class");
        var one = one_name.split(' ')[2];
        var space = $("." + one + " .username").text();
        var user_name = $.trim(space);
        $.get(`/friend_request/${name}/${user_name}`, (data) =>{
            if(data === "success"){
                setTimeout(location.reload.bind(location), 500);
            }
        })
        return false;
    })

    $(document).on('click', '#back', function(){
        window.history.back();
    })
})