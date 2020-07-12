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
window.imgLeft = 0;
window.imgCrop = 0;
window.count = 0;
window.third = 0;
window.drag = 0;

let socket = io();
let global_username ;
$.get('/root/get/username',(data)=>{
    if(data){
        global_username = data;
        socket.emit("add_page",{
            username: data,
            page_name: "account"
        });
    }
});

//to get profile_picture of user
$(window).on("load", function(){
    $.get('/root/get/profile_picture', (data)=>{
        image.attr('src', `../uploads/${data}`);
        if(data !== "000.jpg")
            window.res = 1;
    })
})

$(document).ready(function(){

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
    
    function refresh(){
        $(window).trigger("load");
        $("#deleting").hide();
        $('#errorMessage').hide();
        $('#successMessage').hide();
        $('#successMessage').html('Image deleted successfully<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        $('#successMessage').show();
        window.res = 0;
    }

    //to get full name of user
    $.get('/root/get/name',(data)=>{
        name.html(`<h1>${data}</h1>`);
    })

    //to clear current profile_picture of user
    $('#clearImage, #theclearImage').click(function(){
        var message = confirm("Are you sure you want to reset your current photo?");
        if(message == true){
            $('#errorMessage').hide();
            $('#successMessage').hide();
            $("#deleting").show();
            $.get('/root/delete/profile_image',(res)=>{
                if(res !== "undefined"){
                    setTimeout(refresh, 1000);
                }
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

    $( window ).on("beforeunload" , ()=>{
        console.log("unloading account page");
        if(socket && global_username){
            socket.emit("remove_page",{
                username: global_username,
                page_name: "account"
            });
        }
    })
})

$('#img-container').on('update.croppie', function(ev, cropData) {
    var input = $(".cr-slider-wrap .cr-slider").attr('min');
    if((input*1).toFixed(4) !== cropData.zoom.toFixed(4)){
        window.imgCrop = 1;
        if(window.imgLeft == 1){
            if($(window).width() < 350)
                window.count = 3;
            else if($(window).width() >= 350 && $(window).width() < 420)
                window.count = 1;
            else
                window.count = 2;
            if(window.drag == 0)
                $(".croppie-container .cr-image").css({'left': '0px' ,'top': '0'});
            else
                $(".croppie-container .cr-image").css({'top': '0', 'right': '0'});
        }
        else{
            if(window.third == 1){
                if($(window).width() < 350)
                    window.count = 3;
                else if($(window).width() >= 350 && $(window).width() < 420)
                    window.count = 1;
                else
                    window.count = 2;
                $(".croppie-container .cr-image").css({'left': '0px', 'top': '0px'});
            }
            else
                $(".croppie-container .cr-image").css({'left': '0px', 'top': '0'});
        }
    }
    else
        window.drag = 1;
});

$('#modal').on('hidden.bs.modal', function () {
    $("#modal #img-container .cr-boundary img").removeAttr('src');
    window.imgCrop = 0;
    window.count = 0;
    window.third = 0;
    window.drag = 0;
})

$('#modal').on('show.bs.modal', function () {
    $("#modal").css({'overflow-y': 'auto'});
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
    var container = $("#buttonContainer");
    if(e.target.id === "user" || e.target.id === "theImageTag"){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            $("#img-modal-header").show();
            $("#close").hide();
            $(".dialog, .con, .bid").css({'width': '100vw', 'margin': '0', 'border': '0'});
        } else {
            $("#img-modal-header").hide();
            $("#close").show();
        }
        $.get('/root/get/profile_picture', (data)=>{
            if(data !== "000.jpg"){
                $(".bid #picture").attr('src', `../uploads/${data}`);
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
        // if(e.target.id !== "picture")
        //     $("html").css({'overflow-x': 'hidden'});
    }
    if(e.target.id === "exampleModal" || e.target.id === "close_button" || e.target.id === "modal"){
        $("html").css({'overflow-x': 'visible'});
    }
    if(e.target.id === "update" || e.target.id === "pic_update" || e.target.id === "cam"){
        $("#theImageContainer").attr("data-toggle", "");
        $("#theImageField").remove();
        $("#buttonContainer").prepend(`<input type="file" name="profile_image" id="theImageField">`);
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

$('#exampleModal').on('hidden.bs.modal', function (e) {
    $("html").css({'overflow-x': 'hidden'});
})

$(window).bind('resize', function() {
    // $("#image").width($(".bid").width());
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        $(".update").hide();
        $(".mobile_pic_update").show();
        $("#img-modal-header").show();
        $("#close").hide();
        $(".dialog, .con, .bid").css({'width': '100vw', 'margin': '0', 'border': '0'});
	} else {
        $(".update").show();
        $(".mobile_pic_update").hide();
        $(".slider").hide();
        $(document.body).removeClass("pad");
        $("#img-modal-header").hide();
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
    if($(window).width() < 350){
        $(".cr-boundary").css({'width': '275px'});
        if(window.imgLeft == 1){
            if(window.imgCrop == 0)
                $(".croppie-container .cr-image").css({'left': '12.5px'});
            else{
                if(window.count == 1)
                    $(".croppie-container .cr-image").css({'left': '-12.5px'});
                else if(window.count == 2)
                    $(".croppie-container .cr-image").css({'left': '-37.5px'});
                else
                    $(".croppie-container .cr-image").css({'left': '0px'});
            }
        }
        if(window.third == 1){
            if(window.imgCrop == 0)
                $(".croppie-container .cr-image").css({'left': '12.5px'});
            else{
                if(window.count == 1)
                    $(".croppie-container .cr-image").css({'left': '-12.5px'});
                else if(window.count == 2)
                    $(".croppie-container .cr-image").css({'left': '-37.5px'});
            }
        }
    }
    else if($(window).width() >= 350 && $(window).width() < 420){
        $(".cr-boundary").css({'width': '300px'});
        if(window.imgLeft == 1){
            if(window.imgCrop == 0)
                $(".croppie-container .cr-image").css({'left': '25px'});
            else{
                if(window.count == 2)
                    $(".croppie-container .cr-image").css({'left': '-25px'});
                else if(window.count == 3)
                    $(".croppie-container .cr-image").css({'left': '12.5px'});
                else
                    $(".croppie-container .cr-image").css({'left': '0px'});
            }
        }
        else{
            if(window.third != 1){
                if(window.count == 0)
                    window.count = 3;
                if(window.count != 2 && window.count != 3)
                    window.count = 1;
                var left = $(".croppie-container .cr-image").css("left");
                if(window.imgCrop == 0)
                    $(".croppie-container .cr-image").css({'left': '25px'});
                else{
                    if(window.count == 1){
                        window.count = 2;
                        if(left == '0px')
                            $(".croppie-container .cr-image").css({'left': '-25px'});
                        else
                            $(".croppie-container .cr-image").css({'left': '0px'});
                    }
                }
            }
            else{
                if(window.imgCrop == 0)
                    $(".croppie-container .cr-image").css({'left': '25px'});
                else{
                    if(window.count == 2)
                        $(".croppie-container .cr-image").css({'left': '-25px'});
                    else if(window.count == 3)
                        $(".croppie-container .cr-image").css({'left': '12.5px'});
                    else
                        $(".croppie-container .cr-image").css({'left': '0px'});
                }
            }
        }
    }
    else{
        $(".cr-boundary").css({'width': '350px'});
        if(window.imgLeft == 1){
            if(window.imgCrop == 0)
                $(".croppie-container .cr-image").css({'left': '50px'});
            else{
                if(window.count == 1)
                    $(".croppie-container .cr-image").css({'left': '25px'});
                else if(window.count == 3)
                    $(".croppie-container .cr-image").css({'left': '37.5px'});
                else
                    $(".croppie-container .cr-image").css({'left': '0px'});
            }
        }
        else if(window.imgLeft == 2){
            if(window.third != 1){
                if(window.count == 0)
                    window.count = 1;
                if(window.count != 4 && window.count != 1)
                    window.count = 3;
                var left = $(".croppie-container .cr-image").css("left");
                if(window.imgCrop == 0)
                    $(".croppie-container .cr-image").css({'left': '50px'});
                else{
                    if(window.count == 3){
                        window.count = 4;
                        if(left == '0px')
                            $(".croppie-container .cr-image").css({'left': '25px'});
                        else
                            $(".croppie-container .cr-image").css({'left': '0px'});
                    }
                }
            }
            else{
                if(window.imgCrop == 0)
                    $(".croppie-container .cr-image").css({'left': '50px'});
                else{
                    if(window.count == 1)
                        $(".croppie-container .cr-image").css({'left': '25px'});
                    else if(window.count == 3)
                        $(".croppie-container .cr-image").css({'left': '37.5px'});
                }
            }
        }
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

$(document).on("change", "#theImageField", function (e) {
    var theFile = e.target.files[0];
    var imgHeight = 0, imgWidth = 0;

    if(customFileFilter(theFile)) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        //$("#theImageField").replaceWith($("#theImageField").val('').clone(true));
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                imgHeight = this.height;
                imgWidth = this.width;
                handleUploadedFile(theFile, imgHeight, imgWidth);
                return true;
            };
        }
    }

});

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

function handleUploadedFile(file, imgHeight, imgWidth) {
    window.imgName = file.name;
    if($(window).width() < 350){
        $('#img-container').croppie('destroy');
        $image_crop = $('#img-container').croppie({
            viewport: {
                width: 250,
                height: 250,
                type: 'square', //default 'square'
            },
            boundary: {
                width: 275,
                height: 350
            }
        });
    }
    else if($(window).width() >= 350 && $(window).width() < 420){
        $('#img-container').croppie('destroy');
        $image_crop = $('#img-container').croppie({
            viewport: {
                width: 250,
                height: 250,
                type: 'square', //default 'square'
            },
            boundary: {
                width: 300,
                height: 350
            }
        });
    }
    else{
        $('#img-container').croppie('destroy');
        $image_crop = $('#img-container').croppie({
            viewport: {
                width: 250,
                height: 250,
                type: 'square', //default 'square'
            },
            boundary: {
                width: 350,
                height: 350
            }
        });
    }
    var reader = new FileReader();
    reader.onload = function (event) {
      $image_crop.croppie('bind', {
        url: event.target.result,
      }).then(function(){
        var min;
        if((250 / imgHeight) > (250 / imgWidth)){
            min = (250 / imgHeight);
            if(Math.abs(imgHeight - imgWidth) > 25){
                if($(window).width() < 350)
                    $(".croppie-container .cr-image").css({'left': '12.5px','top': '50px'});
                else if($(window).width() >= 350 && $(window).width() < 420)
                    $(".croppie-container .cr-image").css({'left': '25px','top': '50px'});
                else
                    $(".croppie-container .cr-image").css({'left': '50px','top': '50px'});
                window.imgLeft = 1;
            }
            else{
                if($(window).width() < 350)
                    $(".croppie-container .cr-image").css({'left': '12.5px','top': '50px'});
                else if($(window).width() >= 350 && $(window).width() < 420)
                    $(".croppie-container .cr-image").css({'left': '25px','top': '50px'});
                else
                    $(".croppie-container .cr-image").css({'left': '50px','top': '50px'});
                window.third = 1;
                window.imgLeft = 2;
            }
        }
        else{
            min = (250 / imgWidth);
            if(imgHeight == imgWidth){
                $(".croppie-container .cr-image").css({'top': '50px'});
                window.third = 1;
            }
            else
                $(".croppie-container .cr-image").css({'top': '25px'});
            if($(window).width() < 350)
                $(".croppie-container .cr-image").css({'left': '12.5px'});
            else if($(window).width() >= 350 && $(window).width() < 420)
                $(".croppie-container .cr-image").css({'left': '25px'});
            else
                $(".croppie-container .cr-image").css({'left': '50px'});
            window.imgLeft = 2;
        }
        $('.cr-slider').attr({'min':min, 'max':1.5000, 'aria-valuenow': min});
        $image_crop.croppie('setZoom', 0);
      });
    }
    reader.readAsDataURL(file);
    $('#modal').modal('show');
    $(".crop_image").attr('disabled', false);
        $(".crop_image").html('Save');
    $("html").css({'overflow-x': 'visible'});
}

$(document).on('click', '.alert .close', function(){
    $(".alert").hide();
})

function b64toBlob(b64Data, contentType, filename, sliceSize) {
    file = filename;
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var newfile = new File(byteArrays, filename, {type: contentType});
    return newfile;
}

$(document).ready(function(){
    let prev_flag = $('#pi');

    function refresh(){
        $(window).trigger("load");
        $('#modal').modal('hide');
        $('#errorMessage').hide();
        $('#successMessage').hide();
        $('#successMessage').html('Image uploaded successfully<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        $('#successMessage').show();
        window.res = 1;
    }

    $('.crop_image').click(function(event){
        $(".crop_image").attr('disabled', true);
        $(".crop_image").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...');
        $image_crop.croppie('result', {
          type: 'base64',
          size: 'original',
          quality: 1
        }).then(function(response){
            var form = document.getElementById("img-container");
            var block = response.split(";");
            var contentType = block[0].split(":")[1];
            var realData = block[1].split(",")[1];
            var blob = b64toBlob(realData, contentType, window.imgName);
            var formDataToUpload = new FormData(form);
            formDataToUpload.append("profile_image", blob);
            $.ajax({
                url:"/root/upload/profile_image",
                type: "POST",
                data:formDataToUpload,
                contentType:false,
                processData:false,
                cache:false,
                success:function(res)
                {
                    if(res !== "undefined" && res !== ""){
                        setTimeout(refresh, 1000);
                    }
                    else{
                        $('#modal').modal('hide');
                        $('#successMessage').hide();
                        $('#errorMessage').hide();
                        $('#errorMessage').html('Select a image file within 1MB size<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                        $('#errorMessage').show();
                    }
                }
            });
            return false;
        })
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
        var divHeight = el.offsetHeight;
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