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

$(function(){

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {
        $(".update").hide();
        $(".mobile_pic_update").show();
	} else {
        $(".update").show();
        $(".mobile_pic_update").hide();
        $(".slider").hide();
        $(document.body).removeClass("pad");
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
    $('#clearImage, #theclearImage').click(function(){
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
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            $(".modal-header").show();
            $("#close").hide();
            $(".dialog, .con, .bid").css({'width': '100vw', 'margin': '0', 'border': '0'});
        } else {
            $(".modal-header").hide();
            $("#close").show();
        }
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
                $("#theImageContainer").attr("data-toggle", "");
            }
        }

        window.res = 0;
    }
    else{
        if(e.target.id !== "picture")
            $("html").css({'overflow-x': 'hidden'});
    }
    if(e.target.id === "exampleModal" || e.target.id === "close_button"){
        $("html").css({'overflow-x': 'visible'});
    }
    if(e.target.id === "update" || e.target.id === "pic_update" || e.target.id === "cam"){
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
    if(e.target.id === "mobile_cam" || e.target.id === "slider" || e.target.id === "clear" || e.target.id === "save" || e.target.id === "choose_photo" || e.target.id === "theclearImage" || e.target.id === "saveImage" || e.target.id === "chooseImage"){
        $(document.body).addClass("pad");
        $(".slider").show();
    }
    else{
        $(document.body).removeClass("pad");
        $(".slider").hide();
    }
});

$('.modal').on('hidden.bs.modal', function (e) {
    $("html").css({'overflow-x': 'hidden'});
})

$(window).bind('resize', function() {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        $(".update").hide();
        $(".mobile_pic_update").show();
        $(".modal-header").show();
        $("#close").hide();
        $(".dialog, .con, .bid").css({'width': '100vw', 'margin': '0', 'border': '0'});
	} else {
        $(".update").show();
        $(".mobile_pic_update").hide();
        $(".slider").hide();
        $(document.body).removeClass("pad");
        $(".modal-header").hide();
        $("#close").show();
        if($(window).width() <= 576){
            $(".dialog, .con, .bid").css({'width': '85vw', 'margin': 'auto'});
        }
        else{
            $(".dialog, .con, .bid").css({'width': 'auto'});
            $(".dialog").css({'margin': 'auto'});
        }
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
    $('#errorMessage').hide();
    $('#successMessage').hide();

    if (file.size > 1000000) {
        $('#errorMessage').show();
        $('#errorMessage').html('File too large, cannot be more than 1MB...<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        return false;
    }

    if(check_filename && check_mimetype){
        return true;
    } else {
        $('#errorMessage').show();
        $('#errorMessage').html('File type should be png or jpg/jpeg...<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
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

$(document).on('click', '.alert .close', function(){
    $(".alert").hide();
})

$(document).ready(function(){
    let prev_flag = $('#pi');

    $('#theImageForm').submit(function(e) {
        $(this).ajaxSubmit({

            error: function(xhr) {
                alert("Error : " + xhr.message);
            },

            success: function(res) {
                console.log(res);
                if(res !== "undefined" && res !== ""){
                    $('#errorMessage').hide();
                    $('#successMessage').hide();
                    $('#successMessage').html('Image uploaded successfully<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                    $('#successMessage').show();
                    window.res = 1;
                }
                else{
                    $('#successMessage').hide();
                    $('#errorMessage').hide();
                    $('#errorMessage').html('Select a image file within 1MB size<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                    $('#errorMessage').show();
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

    $("#saveImage").click(function(){
        $('#theImageForm').submit();
    })

    $(".head").click(function(){
        prev_flag.toggleClass('active');
        prev_flag = $(this);
        prev_flag.toggleClass('active');
        if($('#pi').hasClass('active')){
            $("#personal").css({'margin-left': '0'});
            $("#change").css({'margin-left': '100%'});
            $("#personal").show();
            $("#change").hide();
        }
        else{
            $("#personal").css({'margin-left': '-100%'});
            $("#change").css({'margin-left': '0%'});
            $("#change").show();
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