$(document).ready(function(){
    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find("textarea").val('').end();
        $(".close1").show();
        $(".modal-body").hide();
    })

    $(".close1").on('click', function(){
        $(".close1").hide();
        $(".modal-body").show();
    })
});