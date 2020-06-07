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
        $(".activate_del").hide();
        $(".deactivate_del").show();
        active(active_page);
    })

    function active(num){
        if(active_check.is(":checked")){
            deactivated_check.prop('checked', false);
            $(".add_user").html('');
            $(".pagination").html('');
            $.get('/admin/activate/display_users', (data) => {
                let total = data.length;
                let page = 0;
                console.log(data);
                if(total > 0){
                    let str = '';
                    if(total % 5 !== 0){
                        page = Math.floor(total / 5);
                        page ++;
                    }
                    else{
                        page = Math.floor(total / 5);
                    }
                    if(num == 1)
                        str = `<li class="activate-previous disabled"><a class="page-link" aria-disabled="true">Previous</a></li>`;
                    else
                        str = `<li class="page-item activate-previous"><a class="page-link">Previous</a></li>`;
                    if(page <= 5){
                        for(let i = 1; i <= page; i++){
                            let page_link = `<li class="page-item activate" id="${i}"><a class="page-link">${i}</a></li>`;
                            str = str + page_link;
                        }
                    }
                    else{
                        let first_range = parseInt(num);
                        let last_range = parseInt(page) - parseInt(num);
                        let note = parseInt(num) + 3;
                        let first_link = '';
                        let last_link = '';
                        if(first_range <= 2){
                            for(let i = 1; i <= 4; i++){
                                let page_link = `<li class="page-item activate" id="${i}"><a class="page-link">${i}</a></li>`;
                                str = str + page_link;
                            }
                            last_link = `<li class="activate-next disabled"><a class="page-link" aria-disabled="true">...</a></li>
                                <li class="page-item activate" id="${page}"><a class="page-link">${page}</a></li>`;
                            str = str + last_link;
                        }
                        else{
                            first_link = `<li class="page-item activate" id="1"><a class="page-link">1</a></li>
                                <li class="activate-next disabled"><a class="page-link" aria-disabled="true">...</a></li>`;
                            str = str + first_link;
                        }
                        if(first_range > 2 && last_range >= 5){
                            for(let i = num; i <= note; i++){
                                let page_link = `<li class="page-item activate" id="${i}"><a class="page-link">${i}</a></li>`;
                                str = str + page_link;
                            }
                            last_link = `<li class="activate-next disabled"><a class="page-link" aria-disabled="true">...</a></li>
                                <li class="page-item activate" id="${page}"><a class="page-link">${page}</a></li>`;
                            str = str + last_link;
                        }
                        else if(first_range > 2 && last_range < 5){
                            let start = parseInt(page) - 4;
                            for(let i = start; i <= (start + 4); i++){
                                let page_link = `<li class="page-item activate" id="${i}"><a class="page-link">${i}</a></li>`;
                                str = str + page_link;
                            }
                        }
                    }
                    if(num == page)
                        str = str + `<li class="activate-next disabled" id="activate-next"><a class="page-link" aria-disabled="true">Next</a></li>`;
                    else
                        str = str + `<li class="page-item activate-next" id="activate-next"><a class="page-link">Next</a></li>`;
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
                                <div class="image">
                                    <label id="theImageContainer">
                                        <img id="user" src="../uploads/${data[i].profile_picture}">
                                    </label>
                                </div>
                            </div>
                            <div class="col-3 username" style="text-align: center;overflow: hidden;word-break: break-all;">
                                ${data[i].username}
                            </div>
                            <div class="col-3 full_name" style="text-align: center;overflow: hidden;word-break: break-all;">
                                ${data[i].first_name} ${data[i].last_name}
                            </div>
                            <div class="col-3 button_container">
                                <button class="btn btn-primary deactivate deactivate${(i+1)} activate_deactivate" type="submit">Deactivate</button>
                                <button class="btn btn-danger delete_user delete${(i+1)}">Delete</button>
                            </div>
                        </div>`;
        
                        str = str + add_user;
                    }
        
                    $(".add_user").html(str);

                    if ($(window).width() < 630) {
                        window.res = $(".button_container").width();
                        $(".activate_deactivate").width($(".button_container").width() - 30);
                        $(".delete_user").width($(".activate_deactivate").width());
                    }
                    if ($(window).width() < 400) {
                        $(".activate-previous").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-left"></i></a>`);
                        $("#activate-next").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-right"></i></a>`);
                    }
                    else{
                        $(".activate-previous").html(`<a class="page-link" aria-disabled="true">Previous</a>`);
                        $("#activate-next").html(`<a class="page-link" aria-disabled="true">Next</a>`);
                    }
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
        active(active_page);
    })

    //$(".active_users").trigger("click");

    $(".deactivated_users").click(function(){
        deactivated_check.prop('checked', true);
        $(".deactivate_del").hide();
        $(".activate_del").show();
        deactivated(deactivated_page);
    })

    function deactivated(num){
        if(deactivated_check.is(":checked")){
            active_check.prop('checked', false);
            $(".add_user").html('');
            $(".pagination").html('');
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
                    if(num == 1)
                        str = `<li class="deactivate-previous disabled"><a class="page-link" aria-disabled="true">Previous</a></li>`;
                    else
                        str = `<li class="page-item deactivate-previous"><a class="page-link">Previous</a></li>`;
                    if(page <= 5){
                        for(let i = 1; i <= page; i++){
                            let page_link = `<li class="page-item deactivate" id="${i}"><a class="page-link">${i}</a></li>`;
                            str = str + page_link;
                        }
                    }
                    else{
                        let first_range = parseInt(num);
                        let last_range = parseInt(page) - parseInt(num);
                        let note = parseInt(num) + 3;
                        let first_link = '';
                        let last_link = '';
                        if(first_range <= 2){
                            for(let i = 1; i <= 4; i++){
                                let page_link = `<li class="page-item deactivate" id="${i}"><a class="page-link">${i}</a></li>`;
                                str = str + page_link;
                            }
                            last_link = `<li class="activate-next disabled"><a class="page-link" aria-disabled="true">...</a></li>
                                <li class="page-item deactivate" id="${page}"><a class="page-link">${page}</a></li>`;
                            str = str + last_link;
                        }
                        else{
                            first_link = `<li class="page-item deactivate" id="1"><a class="page-link">1</a></li>
                                <li class="deactivate-next disabled"><a class="page-link" aria-disabled="true">...</a></li>`;
                            str = str + first_link;
                        }
                        if(first_range > 2 && last_range >= 5){
                            for(let i = num; i <= note; i++){
                                let page_link = `<li class="page-item deactivate" id="${i}"><a class="page-link">${i}</a></li>`;
                                str = str + page_link;
                            }
                            last_link = `<li class="deactivate-next disabled"><a class="page-link" aria-disabled="true">...</a></li>
                                <li class="page-item deactivate" id="${page}"><a class="page-link">${page}</a></li>`;
                            str = str + last_link;
                        }
                        else if(first_range > 2 && last_range < 5){
                            let start = parseInt(page) - 4;
                            for(let i = start; i <= (start + 4); i++){
                                let page_link = `<li class="page-item deactivate" id="${i}"><a class="page-link">${i}</a></li>`;
                                str = str + page_link;
                            }
                        }
                    }
                    if(num == page)
                        str = str + `<li class="deactivate-next disabled" id="deactivate-next"><a class="page-link" aria-disabled="true">Next</a></li>`;
                    else
                        str = str + `<li class="page-item deactivate-next" id="deactivate-next"><a class="page-link">Next</a></li>`;
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
                                <div class="image">
                                    <label id="theImageContainer">
                                        <img id="user" src="../uploads/${data[i].profile_picture}">
                                    </label>
                                </div>
                            </div>
                            <div class="col-3 username" style="text-align: center;overflow: hidden;word-break: break-all;">
                                ${data[i].username}
                            </div>
                            <div class="col-3 full_name" style="text-align: center;overflow: hidden;word-break: break-all;">
                                ${data[i].first_name} ${data[i].last_name}
                            </div>
                            <div class="col-3 button_container">
                                <button class="btn btn-success activate activate${(i+1)} deactivate_active" type="submit">Activate</button>
                                <button class="btn btn-danger delete_user delete${(i+1)}">Delete</button>
                            </div>
                        </div>`;
        
                        str = str + add_user;
                    }
        
                    $(".add_user").html(str);
                    if ($(window).width() < 630) {
                        window.res = $(".button_container").width();
                        $(".deactivate_active").width($(".button_container").width() - 30);
                        $(".delete_user").width($(".deactivate_active").width());
                    }
                    if ($(window).width() < 400) {
                        $(".deactivate-previous").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-left"></i></a>`);
                        $("#deactivate-next").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-right"></i></a>`);
                    }
                    else{
                        $(".deactivate-previous").html(`<a class="page-link" aria-disabled="true">Previous</a>`);
                        $("#deactivate-next").html(`<a class="page-link" aria-disabled="true">Next</a>`);
                    }
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

    $(window).bind('resize', function() {
        $(".active").width();
        if ($(window).width() < 630) {
            console.log($(".deactivate").width());
            $(".activate_deactivate").width($(".button_container").width() - 30);
            $(".deactivate_active").width($(".button_container").width() - 30);
            $(".delete_user").width($(".button_container").width() - 30);
        }
        else if($(window).width() >= 630 && $(window).width() <= 852){
            $(".activate_deactivate").width(100);
            $(".deactivate_active").width(100);
            $(".delete_user").width(100);
        }
        else if($(window).width() > 852){
            $(".activate_deactivate").width(74.016);
            $(".deactivate_active").width(56.609399999999994);
            $(".delete_user").width(45.625);
        }
        if ($(window).width() < 400) {
            $(".activate-previous").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-left"></i></a>`);
            $("#activate-next").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-right"></i></a>`);
        }
        else{
            $(".activate-previous").html(`<a class="page-link" aria-disabled="true">Previous</a>`);
            $("#activate-next").html(`<a class="page-link" aria-disabled="true">Next</a>`);
        }
        if ($(window).width() < 400) {
            $(".deactivate-previous").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-left"></i></a>`);
            $("#deactivate-next").html(`<a class="page-link" aria-disabled="true"><i class="fas fa-angle-right"></i></a>`);
        }
        else{
            $(".deactivate-previous").html(`<a class="page-link" aria-disabled="true">Previous</a>`);
            $("#deactivate-next").html(`<a class="page-link" aria-disabled="true">Next</a>`);
        }
    })

    $(document).on('click', '.add', function(){
        var class_name = $(this).attr("class");
        var one = class_name.split(' ')[2];
        var space = $("." + one + " .username").text();
        username = $.trim(space);
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
                    setTimeout(location.reload.bind(location), 500);
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