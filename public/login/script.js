$(function(){
    
    $("#login_btn").click(function(){
        let user_text= $('#username');
        let user_password= $('#password')

        let username= user_text.val().trim();
        let password= user_password.val();

        if((username !== "") && (password !== "")){
            $.post('/login/getin',{
                username: username,
                password: password
            },function(user){
                if(!user){
                    alert('Invalid Username or Password');
                    window.location.href='/login';
                } else {
                    window.location.href='/';
                }
            })
        }
    })

})