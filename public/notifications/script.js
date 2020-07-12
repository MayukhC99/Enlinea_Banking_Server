let socket = io();
let global_username;
$.get('/root/get/username',(data)=>{
    if(data){
        global_username = data;
        socket.emit("add_page",{
            username: data,
            page_name: "notification"
        });
    }
})


let from = [];

$(window).on('load', function(){
    console.log("load");
    $.get('/notification/getall', (data) => {
        let str = '';
        if(data === "No notification"){
            str = str + `<div class="row">No Notification Found</div>`;
            $(".notifications").html(str);
        }
        else{
            console.log("notifications found");
            let total = data.length;
            for(let i = total-1; i >= 0; i--){
                if(data[i].subject === "Friend Request"){
                    from[i] = data[i].from;
                    let message = data[i].msg.split(" or ");
                    $.post('/account_user/other_user/get_details',{otheruser: data[i].from},(res)=>{
                        let notification = `<div class="row">
                            <div class="col-12">
                                <div class="col-12"><h4>${data[i].subject}</h4></div>
                                <div class="col-12 no_break">
                                    <label id="theImageContainer">
                                        <img class="${data[i].from}" id="from" src="../uploads/${res.profile_picture}">
                                    </label>
                                    <label class="ml-5" style="overflow: hidden;position: absolute;"><h5>From : ${data[i].from} </h5></label>
                                    <button class="btn btn-primary accept ${i}" style="overflow: hidden;">${message[0]}</button>
                                    <button class="btn btn-danger reject ${i}" style="overflow: hidden;">${message[1]}</button>
                                    <span class="float-right del"><i class="fas fa-trash-alt mt-3 fa-lg"></i></span>
                                </div>
                            </div>
                        </div>`

                        str = str + notification;
                        $(".notifications").html(str);
                    })
                }
            }
        }
    })
})
$(document).ready(function(){

    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find("textarea").val('').end();
        $(".close1").show();
        $(".close2").show();
        $(".modal-body").hide();
        $(".user").hide();
        $("#Message").prop('disabled', false);
    })

    $(".close1").on('click', function(){
        $(".close1").hide();
        $(".close2").hide();
        $(".modal-body").show();
    })

    $(".close2").on('click', function(){
        $(".close1").hide();
        $(".close2").hide();
        $(".modal-body").show();
        $(".user").show();
        $("#Message").prop('disabled', true);
    })

    function refresh(){
        $(window).trigger('load');
    }

    $(document).on('click', 'button', function(){
        var class_name = $(this).attr('class');
        let request = class_name.split(' ')[2];
        let n = class_name.split(' ')[3];
        if(request === 'accept' || request === 'reject'){
            $.ajax({
                url: `/friend_request/${request}/${from[n]}`,
                type: 'GET',
                success: function (data) {
                    setTimeout(refresh, 500);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    })

    $(document).on('click', '#from', function(){
        let from = $(this).attr('class');
        window.location = `/account_user/${from}`;
    })

    $( window ).on("beforeunload" , ()=>{
        console.log("unloading notification page");
        if(socket && global_username){
            socket.emit("remove_page",{
                username: global_username,
                page_name: "notification"
            });
        }
    })

});