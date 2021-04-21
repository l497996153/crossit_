$(document).ready(function (event) {
  $(".signupbtn").click(function (event) {
    if ($("#password").val() != $("#co-password").val()) {
      event.preventDefault();
      $("#errmsg").text("Password does not match");
    }
  });
});
