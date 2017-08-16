$(".modal-dialog").hide();

$('.open-modal').click(function(event){
    event.preventDefault();
    var href = $(this).attr("href");
    $(href).show();
    
});

$('.close-modal').click(function(event){
    event.preventDefault();
    $('.modal-dialog').hide();
});