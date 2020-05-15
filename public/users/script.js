$(document).ready(function(){
    let add_user = `<div class="row" style="height: 120px;">
        <div class="col-4" style="text-align: end;">
            <div style="width: 50px;height: 50px;">
                <label id="theImageContainer">
                    <img id="user" src="" width="100px", height="100px">
                </label>
            </div>
        </div>
        <div class="col-4" style="text-align: center; vertical-align: middle;">
            <span id="username"></span>
        </div>
        <div class="col-4" style="text-align: center; vertical-align: middle;">
            <span id="name"></span>
        </div>
    </div>`

    $.get('/root/all_user_details', (data) => {
        let total = data.length;
        console.log("1");
        for(let i = 0; i < total; i++){
            $(".add_user").html(add_user);
            $("#user").attr('src', `../uploads/${data[i].profile_picture}`);
            $("#username").html(`<h3>${data[i].username}</h3>`);
            $("#name").html(`<h3>${data[i].first_name}` + ` ${data[i].last_name}</h3>`);
        }
    })
});