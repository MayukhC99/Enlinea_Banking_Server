$(function(){
    // let typed_name= $('#name');
    let typed_first_name= $('#first_name');
    let typed_last_name= $('#last_name');
    let typed_username= $('#username');
    let typed_password= $('#password');
    let signup_btn= $('#signup_btn');

    signup_btn.click(function(){
        let first_name = typed_first_name.val().trim();
        let last_name = typed_last_name.val().trim();
        let username= typed_username.val().trim();
        let password= typed_password.val();

        if((first_name!=='') && (last_name!=='') && (username!=='') && (password!=='')){
            //alert('post request is being made');
            $.post('/signup/getin',{
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name
            },function(user){
                if(user){
                    alert(`Welcome ${user.first_name} ${user.last_name}, Please Login to continue`);
                    window.location.href='/';
                } else {
                    alert('User already exists. Please Signup with a different username');
                    window.location.href= './signup.html';
                }
            })
        }
    })
})