$(document).ready(function(){
    let prev_active = $('.middle1   ');
    $(".middle1").on('click', function(){
        $("#select1").prop('checked', true);
        prev_active.toggleClass('active');
        prev_active = $(this);
        $(this).toggleClass('active');
        $("#net_details").show();
        $("#debit_details").hide();
        $("#credit_details").hide();
    });
    $(".middle2").on('click', function(){
        $("#select2").prop('checked', true);
        prev_active.toggleClass('active');
        prev_active = $(this);
        $(this).toggleClass('active');
        $("#net_details").hide();
        $("#debit_details").show();
        $("#credit_details").hide();
    });
    $(".middle3").on('click', function(){
        $("#select3").prop('checked', true);
        prev_active.toggleClass('active');
        prev_active = $(this);
        $(this).toggleClass('active');
        $("#net_details").hide();
        $("#debit_details").hide();
        $("#credit_details").show();
    });
    $(".white").on('mousedown', function(){
        $(this).addClass('focused');
    })

    $(".white input").blur(function(){
        $(".white").removeClass('focused');
    })
});