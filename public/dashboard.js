
$(function(){

  let admin_str= `<header>Dashboard</header>
    <ul style="padding-left: 0;">
      <li><a href="./Account/"><i class="fas fa-user-circle"></i>Account</a></li>
      <li><a href="/login/logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-bullhorn"></i>Send Notifications</a></li>
      <li><a href="./users/index.html"><i class="fas fa-users"></i></i>View Users</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-sliders-h"></i>Services</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="far fa-envelope"></i>Contact Us</a></li>
    </ul>`

    let success_str= `<header>Dashboard</header>
    <ul class="side_bar" style="padding-left: 0;">
      <li><a href="./Account/"><i class="fas fa-user-circle"></i>Account</a></li>
      <li><a href="/login/logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-bullhorn"><span class="badge" style="display: inline-block;"></span></i>Notifications</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-university"></i>Banking</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-users"></i>View Users</a></li>
      <li><a href="https://github.com/MayukhC99/En-linea-Banking/"><i class="fab fa-github"></i>Contribute</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-sliders-h"></i>Services</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="far fa-envelope"></i>Contact Us</a></li>
    </ul>`

    let failure_str= `<header>Dashboard</header>
    <ul style="padding-left: 0;">
      <li><a href="./login/login.html"><i class="fas fa-sign-in-alt"></i>Login</a></li>
      <li><a href="./login/signup.html"><i class="fas fa-user-plus"></i>Signup</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-bullhorn"></i>Notifications</a></li>
      <li><a href="https://github.com/MayukhC99/En-linea-Banking/"><i class="fab fa-github"></i>Contribute</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="fas fa-sliders-h"></i>Services</a></li>
      <li><a href="./404_Error_Page/index.html"><i class="far fa-envelope"></i>Contact Us</a></li>
    </ul>`

    $.get('/root/verify_user',function(response){
        if (response=== 'admin')
            $('.sidebar').html(admin_str);
        else if (response=== 'success')
            $('.sidebar').html(success_str);
        else
            $('.sidebar').html(failure_str);
    })

})