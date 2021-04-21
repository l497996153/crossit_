$(document).ready(function (event) {
  $("#signupbtn").click(function (event) {
    let pass = $("#password").val();
    let confirm = $("#co-password").val();
    alert(pass);
    alert(confirm);
    if (pass != confirm) {
      alert("here");
      event.preventDefault();
      $("#errmsg").text("Password does not match");
    }
  });
});
