let socket;

$(function(){

  function login(){
    return new Promise((resolve , reject)=>{
      try{
        //localStorage.setItem('socket' , JSON.stringify( JSON.decycle( io() ) ) );
        socket = io() ;
        resolve();
      } catch(error) {
        reject(error);
      }
    })
  }

  $(document).on('click' , '.logout_request a' , ()=>{
    console.log("logout triggered");
    $.get('/root/get/username',(data)=>{ console.log(data); socket.emit("user_logout",data); })
  })

  let admin_str= `<header>Dashboard</header>
    <ul style="padding-left: 0;">
      <li><a href="./Account/"><i class="fas fa-user-circle"></i>Account</a></li>
      <li class="logout_request"><a href="/login/logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
      <li><a href="./notifications/admin_notification.html"><i class="fas fa-bullhorn"></i>Send Notifications</a></li>
      <li><a href="./notifications/user_notification.html"><i class="fas fa-bullhorn"></i>Received Notifications</a></li>
      <li><a href="./users/index.html"><i class="fas fa-users"></i></i>View Users</a></li>
      <li><a href="#services"><i class="fas fa-sliders-h"></i>Services</a></li>
      <li><a href="#contact"><i class="far fa-envelope"></i>Contact Us</a></li>
    </ul>`;

    let failure_str= `<header>Dashboard</header>
      <ul style="padding-left: 0;">
        <li><a href="./login/login.html"><i class="fas fa-sign-in-alt"></i>Login</a></li>
        <li><a href="./login/signup.html"><i class="fas fa-user-plus"></i>Signup</a></li>
        <li><a href="./login/login.html"><i class="fas fa-bullhorn"></i>Notifications</a></li>
        <li><a href="https://github.com/MayukhC99/En-linea-Banking/"><i class="fab fa-github"></i>Contribute</a></li>
        <li><a href="#services"><i class="fas fa-sliders-h"></i>Services</a></li>
        <li><a href="#contact"><i class="far fa-envelope"></i>Contact Us</a></li>
      </ul>`;

    $.get('/root/verify_user',function(response){
      if (response=== 'admin'){
        $('.sidebar').html(admin_str);

        login()
        .then(()=>{
          //let soc = localStorage.getItem('socket');
          //soc = JSON.retrocycle( JSON.parse(soc) );
          socket.emit("user_login",response);
          console.log(socket);
          socket.emit("add_page",response);
        })
      }
      else if (response=== 'success'){
        $.get('/root/get/username',(data)=>{

        let success_str= `<header>Dashboard</header>
          <ul class="side_bar" style="padding-left: 0;">
            <li><a href="/account_user/${data}"><i class="fas fa-user-circle"></i>Account</a></li>
            <li class="logout_request"><a href="/login/logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
            <li id="success_notification"><a href="./notifications/user_notification.html"><i class="fas fa-bullhorn"><span class="badge" style="display: inline-block;"></span></i>Notifications</a></li>
            <li><a href="./error/"><i class="fas fa-university"></i>Banking</a></li>
            <li><a href="https://github.com/MayukhC99/En-linea-Banking/"><i class="fab fa-github"></i>Contribute</a></li>
            <li><a href="#services"><i class="fas fa-sliders-h"></i>Services</a></li>
            <li><a href="#contact"><i class="far fa-envelope"></i>Contact Us</a></li>
          </ul>`;

          $('.sidebar').html(success_str);
          
          login()
          .then(()=>{
            // let soc = localStorage.getItem('socket');
            // alert(soc);
            // soc = JSON.retrocycle( JSON.parse(soc) );
            socket.emit("user_login",data);
            console.log(socket);
            socket.emit("add_page",data);
          })
        })
      }
      else
        $('.sidebar').html(failure_str);
    })

    $( window ).on("unload" , ()=>{
      console.log("unloading main page");
      if(socket){
        $.get('/root/get/username',(data)=>{
          if(data)
            socket.emit("remove_page",{
              username: data,
              page_name: "Main"
            });
        })
      }
    })
})