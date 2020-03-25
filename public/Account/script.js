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

$(function(){
    //to get full name of user
    $.get('/root/get/name',(data)=>{
        name.html(`<h1>${data}</h1>`);
    })

    //to get profile_picture of user
    $.get('/root/get/profile_picture', (data)=>{
        image.attr('src', `../uploads/${data}`);
    })

    //to clear current profile_picture of user
    theClearImageLink.click(function(){
        var message = confirm("Are you sure you want to reset your current photo?");
        if(message == true){
            $.get('/root/delete/profile_image',(data)=>{
                window.location.href= "./";
            })
        }
    })
})

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

var i = 0;

function myFunction(){
	if (i > 2){
		i = 1;
	}
	if (theOpenButton.style.display === "none" && i == 1) {
		theOpenButton.style.display = "grid";
	} else {
		i = 0;
		theOpenButton.style.display = "none";
	}
}

$(document).mouseup(function(e){
	var container = $("#buttonContainer");
    if(!container.is(e.target)){
		i++;
        container.hide();
	}
});

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

    if (file.size > 1000000) {
        theErrorMessage.classList.add('hide');
        theErrorMessage.innerHTML = "File too large, cannot be more than 500KB...";
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
    clearImage();
    var img = document.createElement("img");
    img.setAttribute('id', 'theImageTag');
    img.file = file;
    theImageContainer.appendChild(img);
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
        theImageField.value = null;
    }

    theErrorMessage.classList.add('hide');
    theSuccessMessage.classList.add('hide');
}

$(document).ready(function(){
    let prev_flag = $('#pi');

    $('#theImageForm').submit(function(e) {
        $(this).ajaxSubmit({

            error: function(xhr) {
            status('Error: ' + xhr.status);
            },

            success: function(res) {
                if(res !== "undefined"){
                    theSuccessMessage.classList.add('hide');
                    theSuccessMessage.innerHTML = "Image uploaded successfully";
                    theSuccessMessage.classList.remove('hide');
                }
                else{
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

    $(".head").click(function(){
        prev_flag.toggleClass('active');
        prev_flag = $(this);
        prev_flag.toggleClass('active');
        if($('#pi').hasClass('active')){
            $("#personal").css({'margin-left': '0'});
            $("#change").css({'margin-left': '120%'});
        }
        else{
            $("#personal").css({'margin-left': '-100%'});
            $("#change").css({'margin-left': '0%'});
        }
    });
});