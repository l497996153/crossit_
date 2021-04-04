$(document).ready(function(event) {
    $('#todoList li span').click(function(event) {
        $(this).parent().remove();        
    });

    $("#addTask").click(function (event){
        $(".todoDiv").css("display","block");
    });

    $(".addBtn").click(function (event){
        let title = $("#myInput").val();
        $("#todoList").append('<li><span class="delete"></span>'+title+'</li>');
        $('#todoList li span').click(function(event) {
            $(this).parent().remove();        
        });
    });

    $(".cancelBtn").click(function (event){
        $(".todoDiv").css("display","none");
    });
});