$(function(){
    let typed_name= $('#name');
    let typed_username= $('#username');
    let typed_password= $('#password');
    let signup_btn= $('#signup_btn');

    signup_btn.click(function(){
        let name= typed_name.val().trim();
        let username= typed_username.val().trim();
        let password= typed_password.val();

        if((name!=='') && (username!=='') && (password!=='')){
            $.post('/signup/getin',{
                username: username,
                password: password,
                name: name
            },function(user){
                if(user){
                    alert(`Welcome ${user.name}, Please Login to continue`);
                    window.location.href='/';
                }
            })
        }
    })
})