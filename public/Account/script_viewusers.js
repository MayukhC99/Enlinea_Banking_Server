
$(function(){

    let name = $('#my_name');
    let image = $('#user');
    let url = window.location.href;

    let username= url.split('/');
    username= username[username.length - 1];

    $.post('/account_user/other_user/get_details',{otheruser: username},(data)=>{
        name.html(`<h1>${data.first_name + ' ' + data.last_name}</h1>`);
        image.attr('src', `../uploads/${data.profile_picture}`);
    })

    // $("#accountcontainer").hide();

    $(".ellipsis").hover(function(){
        $(".fa-ellipsis-v").toggleClass("fa-2x");
        $("#accountcontainer").toggle();

    })
})