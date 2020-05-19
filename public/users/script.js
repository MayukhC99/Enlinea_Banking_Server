$(document).ready(function(){

    var active_check = $("#check1");
    var deactivated_check = $("#check2");

    $(".active_users").click(function(){
        active_check.prop('checked', true);
        if(active_check.is(":checked")){
            deactivated_check.prop('checked', false);
        }
    })

    $(".deactivated_users").click(function(){
        deactivated_check.prop('checked', true);
        if(deactivated_check.is(":checked")){
            active_check.prop('checked', false);
        }
    })

    $.get('/root/all_user_details', (data) => {
        let total = data.length;
        let str = '';
        for(let i = 0; i < total; i++){
            let add_user = `<div class="row" style="height: 120px;padding-top: 10px;">
                <div class="col-3">
                    <div style="width: 100px;height: 100px;border-radius: 50px;margin-left: 30%;overflow: hidden;">
                        <label id="theImageContainer">
                            <img id="user" src="../uploads/${data[i].profile_picture}" width="100px", height="100px">
                        </label>
                    </div>
                </div>
                <div class="col-3" style="text-align: center;overflow: hidden;word-break: break-all;">
                    <h3>${data[i].username}</h3>
                </div>
                <div class="col-3" style="text-align: center;overflow: hidden;word-break: break-all;">
                    <h3>${data[i].first_name} ${data[i].last_name}</h3>
                </div>
                <div class="col-3" style="text-align: center;vertical-align: middle;">
                    <button class="btn btn-primary">Deactivate</button>
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>`;

            str = str + add_user;
        }

        $(".add_user").html(str);
    })
});