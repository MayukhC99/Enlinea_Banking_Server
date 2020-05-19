
$(function(){

    let name = $('#my_name');
    let image = $('#user');
    let url = window.location.href;
    var theOpenButton = document.querySelector('#accountcontainer');

    let username= url.split('/');
    username= username[username.length - 1];

    $.post('/account_user/other_user/get_details',{otheruser: username},(data)=>{
        name.html(`<h1>${data.first_name + ' ' + data.last_name}</h1>`);
        image.attr('src', `../uploads/${data.profile_picture}`);
    })

    $(document).mouseup(function(e){
        var container = $("#accountcontainer");
        if(e.target.id === "tog"){
            if (theOpenButton.style.display === "none") {
                theOpenButton.style.display = "grid";
            } else {
                theOpenButton.style.display = "none";
            }
        }
        else{
            container.hide();
        }
    });
})