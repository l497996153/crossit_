$(document).ready(function(event) {
    let validate = false;
    $("#error").hide();
    // Submitt button
    $("#subButton").click(function (event) {
        if (validate == false){
                $("#error").show();
                event.preventDefault();
        }
    });
    // Validation for customer name
    $("#username, #password").keyup(function () {
        $("#error").val("Please enter username and password!");
        $("#error").hide();
        validateName();
    });
    function validateName() {
        let user = $("#username").val();
        let pass = $("#password").val();
        if (user.length == 0 || pass.length == 0) {
            validate = false;
        } 
        else {
            validate = true;
        }
    }
});