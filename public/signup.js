$(document).ready(function (event) {
  $("#signupbtn").click(function (event) {
    let pass = $("#password").val();
    let confirm = $("#co-password").val();
    alert(pass);
    alert(confirm);
    if (pass != confirm) {
      event.preventDefault();
      $("#errmsg").text("Password does not match");
    }
  });
});
