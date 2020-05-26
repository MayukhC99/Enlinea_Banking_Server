
let socket= io();

$(function(){
    
    $("#login_btn").click(function(){
        let user_text= $('#username');
        let user_password= $('#password')

        let username= user_text.val().trim();
        let password= user_password.val();

        if((username !== "") && (password !== "")){
            //alert('post request is being made');
            $.post('/login/getin',{
                username: username,
                password: password
            },function(user){
                if(!user){
                    alert('Invalid Username or Password');
                    window.location.reload(true);
                } else {

                    console.log("Details about account "+user.message);
                    if(user.message==="deactive"){
                        alert('Your account has been deactivated by the Admin. Please write to our team');
                    } else {
                        alert('You have successfully logged in.Redirecting you to Home page');
                    }
                    window.location.assign('/');
                }
            })
        }
    })

})