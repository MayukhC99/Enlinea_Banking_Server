$(document).ready(function(){

    var active_check = $("#check1");
    var deactivated_check = $("#check2");
    let button = 'button';
    let username = '';

    $(".active_users").click(function(){
        active_check.prop('checked', true);
        if(active_check.is(":checked")){
            deactivated_check.prop('checked', false);
            $(".add_user").html('');
            $.get('/admin/activate/display_users', (data) => {
                let total = data.length;
                let str = '';
                for(let i = 0; i < total; i++){
                    let add_user = `<div class="row add add${(i+1)}" style="height: 120px;padding-top: 10px;">
                        <div class="col-3">
                            <div style="width: 100px;height: 100px;border-radius: 50px;margin-left: 30%;overflow: hidden;">
                                <label id="theImageContainer">
                                    <img src="../uploads/${data[i].profile_picture}" width="100px", height="100px">
                                </label>
                            </div>
                        </div>
                        <div class="col-3 username" style="text-align: center;overflow: hidden;word-break: break-all;">
                            <h3>${data[i].username}</h3>
                        </div>
                        <div class="col-3" style="text-align: center;overflow: hidden;word-break: break-all;">
                            <h3>${data[i].first_name} ${data[i].last_name}</h3>
                        </div>
                        <div class="col-3" style="text-align: center;vertical-align: middle;">
                        <button class="btn btn-primary deactivate deactivate${(i+1)}" type="submit">Deactivate</button>
                        <button class="btn btn-danger delete_user delete${(i+1)}">Delete</button>
                        </div>
                    </div>`;
    
                    str = str + add_user;
                }
    
                $(".add_user").html(str);
            })
        }
    })

    $(".active_users").trigger("click");

    $(".deactivated_users").click(function(){
        deactivated_check.prop('checked', true);
        if(deactivated_check.is(":checked")){
            active_check.prop('checked', false);
            $(".add_user").html('');
            $.get('/admin/deactivate/display_users', (data) => {
                let total = data.length;
                let str = '';
                for(let i = 0; i < total; i++){
                    let add_user = `<div class="row add add${(i+1)}" style="height: 120px;padding-top: 10px;">
                        <div class="col-3">
                            <div style="width: 100px;height: 100px;border-radius: 50px;margin-left: 30%;overflow: hidden;">
                                <label id="theImageContainer">
                                    <img src="../uploads/${data[i].profile_picture}" width="100px", height="100px">
                                </label>
                            </div>
                        </div>
                        <div class="col-3 username" style="text-align: center;overflow: hidden;word-break: break-all;">
                            <h3>${data[i].username}</h3>
                        </div>
                        <div class="col-3" style="text-align: center;overflow: hidden;word-break: break-all;">
                            <h3>${data[i].first_name} ${data[i].last_name}</h3>
                        </div>
                        <div class="col-3" style="text-align: center;vertical-align: middle;">
                            <button class="btn btn-success activate activate${(i+1)}" type="submit">Activate</button>
                        </div>
                    </div>`;
    
                    str = str + add_user;
                }
    
                $(".add_user").html(str);
            })
        }
    })

    $(document).on('click', '.add', function(){
        var class_name = $(this).attr("class");
        var one = class_name.split(' ')[2];
        var space = $("." + one + " .username").text();
        username = $.trim(space);
        console.log(username);
        window.location = `/account_user/${username}`;
    });

    $(document).on('click', '.btn', function(){
        var class_name = $(this).attr('class');
        button = class_name.split(' ')[3];
        var type = class_name.split(' ')[2];
        var name = $("." + button).parent().parent().attr("class");
        var one = name.split(' ')[2];
        var space = $("." + one + " .username").text();
        username = $.trim(space);
        var message = confirm(`Are you sure you want to ${type} the user?`);
        if(message == true){
            $.ajax({
                url: `/admin/${type}`,
                type: 'POST',
                data: {
                    username: username
                },
                success: function (data) {
                    //wacky nested anonymous callbacks go here
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Empty most of the time...
                }
            });

            return false;
        }
        else
            return false;
    });

});