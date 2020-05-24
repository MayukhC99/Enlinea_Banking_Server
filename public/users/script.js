$(document).ready(function(){

    var active_check = $("#check1");
    var deactivated_check = $("#check2");
    let button = 'button';
    let username = '';
    let active_page = 1;
    let deactivated_page = 1;

    active(active_page);
    deactivated(deactivated_page);

    $(".active_users").click(function(){
        active_check.prop('checked', true);
        active(active_page);
    })

    function active(num){
        if(active_check.is(":checked")){
            deactivated_check.prop('checked', false);
            $(".add_user").html('');
            $.get('/admin/activate/display_users', (data) => {
                let total = data.length;
                let page = 0;
                if(total > 0){
                    let str = '';
                    if(total % 5 !== 0){
                        page = Math.floor(total / 5);
                        page ++;
                    }
                    else{
                        page = Math.floor(total / 5);
                    }
                    if(num === 1)
                        str = `<li class="activate-previous disabled"><a class="page-link" aria-disabled="true">Previous</a></li>`;
                    else
                        str = `<li class="page-item activate-previous"><a class="page-link">Previous</a></li>`;
                    for(let i = 1; i <= page; i++){
                        let page_link = `<li class="page-item activate" id="${i}"><a class="page-link">${i}</a></li>`;
                        str = str + page_link;
                    }
                    if(num === page)
                        str = str + `<li class="activate-next disabled"><a class="page-link" aria-disabled="true">Next</a></li>`;
                    else
                        str = str + `<li class="page-item activate-next"><a class="page-link">Next</a></li>`;
                    $(".pagination").html(str);
                    $("#" + num).addClass("active");
                    str = '';
                    page = (num - 1)*5;
                    let last = page + 5;
                    if(total >= (page + 5)){}
                    else{
                        last = total;
                    }
                    for(let i = page; i < last; i++){
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
                }
                else
                    $(".pagination").html('');
            })
        }
    }

    $(".pagination").on('click', '.activate', function(){
        let id = $(this).attr('id');
        active_page = id;
        active(id);
    })

    $(".pagination").on('click', '.activate-previous', function(){
        active_page --;
        active(active_page);
    })

    $(".pagination").on('click', '.activate-next', function(){
        active_page ++;
        console.log(active_page);
        active(active_page);
    })

    //$(".active_users").trigger("click");

    $(".deactivated_users").click(function(){
        deactivated_check.prop('checked', true);
        deactivated(deactivated_page);
    })

    function deactivated(num){
        if(deactivated_check.is(":checked")){
            active_check.prop('checked', false);
            $(".add_user").html('');
            $.get('/admin/deactivate/display_users', (data) => {
                let total = data.length;
                let page = 0;
                if(total > 0){
                    let str = '';
                    if(total % 5 !== 0){
                        page = Math.floor(total / 5);
                        page ++;
                    }
                    else{
                        page = Math.floor(total / 5);
                    }
                    if(num === 1)
                        str = `<li class="deactivate-previous disabled"><a class="page-link" aria-disabled="true">Previous</a></li>`;
                    else
                        str = `<li class="page-item deactivate-previous"><a class="page-link">Previous</a></li>`;
                    for(let i = 1; i <= page; i++){
                        let page_link = `<li class="page-item deactivate" id="${i}"><a class="page-link">${i}</a></li>`;
                        str = str + page_link;
                    }
                    if(num === page)
                        str = str + `<li class="deactivate-next disabled"><a class="page-link" aria-disabled="true">Next</a></li>`;
                    else
                        str = str + `<li class="page-item deactivate-next"><a class="page-link">Next</a></li>`;
                    $(".pagination").html(str);
                    $("#" + num).addClass("active");
                    str = '';
                    page = (num - 1)*5;
                    let last = page + 5;
                    if(total >= (page + 5)){}
                    else{
                        last = total;
                    }
                    for(let i = page; i < last; i++){
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
                                <button class="btn btn-danger delete_user delete${(i+1)}">Delete</button>
                            </div>
                        </div>`;
        
                        str = str + add_user;
                    }
        
                    $(".add_user").html(str);
                }
                else
                    $(".pagination").html('');
            })
        }
    }

    $(".pagination").on('click', '.deactivate', function(){
        let id = $(this).attr('id');
        deactivated_page = id;
        deactivated(id);
    })

    $(".pagination").on('click', '.deactivate-previous', function(){
        deactivated_page --;
        deactivated(deactivated_page);
    })

    $(".pagination").on('click', '.deactivate-next', function(){
        deactivated_page ++;
        deactivated(deactivated_page);
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
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });

            return false;
        }
        else
            return false;
    });

});