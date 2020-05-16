$(document).ready(function(){

    $.get('/root/all_user_details', (data) => {
        let total = data.length;
        let str = '';
        for(let i = 0; i < total; i++){
            let add_user = `<div class="row" style="height: 120px;padding-top: 10px;">
                <div class="col-4" style="text-align: end;">
                    <div style="width: 100px;height: 100px;">
                        <label id="theImageContainer">
                            <img id="user" src="../uploads/${data[i].profile_picture}" width="100px", height="100px">
                        </label>
                    </div>
                </div>
                <div class="col-4" style="text-align: center;">
                    <span id="username""><h3>${data[i].username}</h3></span>
                </div>
                <div class="col-4" style="text-align: center;">
                    <span id="name""><h3>${data[i].first_name} ${data[i].last_name}</h3></span>
                </div>
            </div>`;

            str = str + add_user;
        }

        $(".add_user").html(str);
    })
});