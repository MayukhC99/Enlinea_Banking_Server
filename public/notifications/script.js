$(document).ready(function(){

    let from = [];

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

    $.get('/notification/getall', (data) => {
        let str = '';
        if(data === "No notification"){
            str = str + `<div class="row">No Notification Found</div>`;
            $(".notifications").html(str);
        }
        else{
            let total = data.length;
            for(let i = 0; i < total; i++){
                if(data[i].subject === "Friend Request"){
                    from[i] = data[i].from;
                    let message = data[i].msg.split(" or ");
                    let notification = `<div class="row">
                        <div class="col-12">${data[i].subject}</div>
                        <div class="col-12">
                            <label>From : ${data[i].from} </label>
                            <button class="btn btn-primary accept ${i}">${message[0]}</button>
                            <button class="btn btn-danger reject ${i}">${message[1]}</button>
                        </div>
                    </div>`

                    str = str + notification;
                    $(".notifications").html(str);
                }
            }
        }
    })

    $(document).on('click', 'button', function(){
        var class_name = $(this).attr('class');
        let request = class_name.split(' ')[2];
        let n = class_name.split(' ')[3];
        if(request === 'accept' || request === 'reject'){
            $.ajax({
                url: `/friend_request/${request}/${from[n]}`,
                type: 'GET',
                success: function (data) {
                    setTimeout(location.reload.bind(location), 500);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    })
});