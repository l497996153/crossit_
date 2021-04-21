$(document).ready(function (event) {
  $(".signupbtn").click(function (event) {
    let pass = $("#password").val();
    let confirm = $("#co-password").val();
    if (pass != confirm) {
      alert(pass);
      alert(confirm);
      event.preventDefault();
      $("#errmsg").text("Password does not match");
    }
  });
});
