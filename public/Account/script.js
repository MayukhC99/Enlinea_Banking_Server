var theImageForm = document.querySelector('#theImageForm');
var theImageField = document.querySelector('#theImageField');
var theImageContainer = document.querySelector('#theImageContainer');
var theErrorMessage = document.querySelector('#errorMessage');
var theSuccessMessage = document.querySelector('#successMessage');
//var theClearImageLink = document.querySelector('#clearImage');
var theOpenButton = document.querySelector('#buttonContainer');
let name = $('#my_name');
let image = $('#user');
let theClearImageLink = $('#clearImage');
window.res = 0;

let socket = io();
$.get('/root/get/username',(data)=>{
    if(data)
        socket.emit("add_page",{
            username: data,
            page_name: "account"
        });
});

$(function(){

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {
        $(".update").hide();
        $(".mobile_pic_update").show();
	} else {
        $(".update").show();
        $(".mobile_pic_update").hide();
	}

    //to get full name of user
    $.get('/root/get/name',(data)=>{
        name.html(`<h1>${data}</h1>`);
    })

    //to get profile_picture of user
    $.get('/root/get/profile_picture', (data)=>{
        image.attr('src', `../uploads/${data}`);
        if(data !== "000.jpg")
            window.res = 1;
    })

    //to clear current profile_picture of user
    theClearImageLink.click(function(){
        var message = confirm("Are you sure you want to reset your current photo?");
        if(message == true){
            $.get('/root/delete/profile_image',(data)=>{
                location.reload();
            })
        }
    })

    $.get('/root/personal_details', (data) => {
        $("#first_name").val(data.first_name);
        $("#last_name").val(data.last_name);
        $("#email_id").val(data.email_id);
        $("#mobile_number").val(data.mobile_number);
        $("#DOB").val(data.DOB);
        if(data.gender === null){
            $("#gender").val("Choose");
        }
        else{
            $("#gender").val(data.gender);
        }
    });

    $("#theImageContainer").on('click', function(e){
    });

    $( window ).on("unload" , ()=>{
        console.log("unloading account page");
        if(socket){
          $.get('/root/get/username',(data)=>{
            if(data)
                socket.emit("remove_page",{
                    username: data,
                    page_name: "account"
                });
          })
        }
    })
})

$('img').on('dragstart', function(event) { event.preventDefault(); });

const counters = document.querySelectorAll('.counter');
const speed = 2000;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = target / speed;

        if(count < target){
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        }
        else{
            count.innerText = target;
        }
    }

    updateCount();
})

$(document).mouseup(function(e){
    console.log(e.target.id);
    var container = $("#buttonContainer");
    if(e.target.id === "user" || e.target.id === "theImageTag"){
        $(".modal-header").hide();
        $.get('/root/get/profile_picture', (data)=>{
            if(data !== "000.jpg"){
                $(".modal-body #picture").attr('src', `../uploads/${data}`);
                window.res = 1;
            }
        })

        if(e.target.id !== "update" || e.target.id !== "pic_update"){
            if(window.res === 1){
                $("html").css({'overflow-x': 'visible'});
                $("#theImageContainer").attr("data-toggle", "modal");
            }
            else{
                $("html").css({'overflow-x': 'hidden'});
                $("#theImageContainer").attr("data-toggle", "");
            }
        }
        window.res = 0;
    }
    else{
        if(e.target.id !== "picture")
            $("html").css({'overflow-x': 'hidden'});
    }
    if(e.target.id === "update" || e.target.id === "pic_update" || e.target.id === "cam" || e.target.id === "mobile_cam"){
        $("#theImageContainer").attr("data-toggle", "");
        $(".update").addClass("show_div");
        if (theOpenButton.style.display === "none") {
            theOpenButton.style.display = "grid";
        } else {
            theOpenButton.style.display = "none";
        }
    }
    else{
        container.hide();
        $(".update").removeClass("show_div");
    }
});

$(window).bind('resize', function() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        $(".update").hide();
        $(".mobile_pic_update").show();
	} else {
        $(".update").show();
        $(".mobile_pic_update").hide();
    }
    if($(window).width() >= 335 && $(window).width() < 486){
        $("#pi").css({'font-size': '20px'});
        $("#cp").css({'font-size': '20px'});
    }
    else if($(window).width() < 335){
        $("#pi").css({'font-size': '17px'});
        $("#cp").css({'font-size': '17px'});
    }
    else if($(window).width() >= 486){
        $("#pi").css({'font-size': '30px'});
        $("#cp").css({'font-size': '30px'});
    }
})


if($(window).width() < 486){
    $("#pi").css({'font-size': '20px'});
    $("#cp").css({'font-size': '20px'});
}

if($(window).width() < 335){
    $("#pi").css({'font-size': '17px'});
    $("#cp").css({'font-size': '17px'});
}

theImageField.onchange = function (e) {
    var theFile = e.target.files[0];

    if(customFileFilter(theFile)) {
        handleUploadedFile(theFile);
    }

}

function customFileFilter(file){
    const regex= /\jpg$|\jpeg$|\png$|\gif$/

    const check_filename = regex.test(file.name);

    const check_mimetype= regex.test(file.type);
    theErrorMessage.classList.add('hide');

    if (file.size > 1000000) {
        theErrorMessage.classList.add('hide');
        theErrorMessage.innerHTML = "File too large, cannot be more than 1MB...";
        theErrorMessage.classList.remove('hide');
        return false;
    }

    if(check_filename && check_mimetype){
        return true;
    } else {
        theErrorMessage.classList.add('hide');
        theErrorMessage.innerHTML = "File type should be png or jpg/jpeg...";
        theErrorMessage.classList.remove('hide');
        return false;
    }
}

function handleUploadedFile(file) {
    fileName = file.name;
    var prev_imageTag = document.getElementById('theImageTag');
    if(prev_imageTag !== null)
        prev_imageTag.parentNode.removeChild(prev_imageTag);
    var img = document.createElement("img");
    img.setAttribute('id', 'theImageTag');
    img.file = file;
    $(img).insertAfter("#user");
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
}

function clearImage(e) {
    if(e) {
        e.preventDefault();
    }

    var theImageTag = document.querySelector('#theImageTag');

    if(theImageTag) {
        theImageContainer.removeChild(theImageTag);
        //theImageField.value = null;
    }

    theErrorMessage.classList.add('hide');
    theSuccessMessage.classList.add('hide');
}

$(document).ready(function(){
    let prev_flag = $('#pi');

    $('#theImageForm').submit(function(e) {
        $(this).ajaxSubmit({

            error: function(xhr) {
                alert("Error : " + xhr.message);
            },

            success: function(res) {
                console.log(res);
                if(res !== "undefined"){
                    theErrorMessage.style.display = "none";
                    theSuccessMessage.classList.add('hide');
                    theSuccessMessage.innerHTML = "Image uploaded successfully";
                    theSuccessMessage.classList.remove('hide');
                    window.res = 1;
                }
                else{
                    theSuccessMessage.style.display = "none";
                    theErrorMessage.classList.add('hide');
                    theErrorMessage.innerHTML = "Select a image file within 1MB size";
                    theErrorMessage.classList.remove('hide');
                }
            }
        });
        return false;
    });

    $('#change').submit(function(e) {
        $(this).ajaxSubmit({

            error: function(xhr) {
            status('Error: ' + xhr.status);
            },

            success: function(res) {
                alert(res);
            }
        });
        $('#password1').val('');
        $('#password2').val('');
        $('#password3').val('');
        return false;
    });

    $('#personal').submit(function(e) {
        $(this).ajaxSubmit({

            error: function(xhr) {
            status('Error: ' + xhr.status);
            },

            success: function(res) {
                alert(res);
            }
        });
        return false;
    });

    $(".head").click(function(){
        prev_flag.toggleClass('active');
        prev_flag = $(this);
        prev_flag.toggleClass('active');
        if($('#pi').hasClass('active')){
            $("#personal").css({'margin-left': '0'});
            $("#change").css({'margin-left': '100%'});
            $("#personal").css({'visibility': 'visible'});
            $("#change").css({'visibility': 'hidden'});
        }
        else{
            $("#personal").css({'margin-left': '-100%'});
            $("#change").css({'margin-left': '0%'});
            $("#personal").css({'visibility': 'hidden'});
            $("#change").css({'visibility': 'visible'});
        }
    });

    function countLines() {
        var el = document.getElementById('details');
        var divHeight = el.offsetHeight
        var lineHeight = parseInt(el.style.lineHeight);
        var lines = divHeight / lineHeight;
        alert("Lines: " + lineHeight);
     }

     $(".merge").on('mousedown', function(){
        $(this).addClass('focused');
    })

    $(".merge span").on('click', function(){
        $(".merge input").focus();
    })

    $(".merge input").blur(function(){
        $(".merge").removeClass('focused');
    })

    $(".addMoney").on('click', function(){
        $(".addMoney .row").show();
    })
});