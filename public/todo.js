$(document).ready(function (event) {
  getAllTodos();
  function getAllTodos() {
    let id = $("#user_id").text();
    $.get("/api/todos/"+id, function(todos) {
        let $list = $("#todoList");
        $list.html("");
        console.log(todo);
        if(todos.length > 0){
          todos.forEach(function(todo) {
              $list.append('<li><span class="delete"></span>' + 
              todo.remind + '</li>')
          });
          $("#todoList li span").click(function (event) {
            //$(this).parent().remove();
            const todo = {
              id: $("#user_id").text(),
              remind: $("#myInput").val(),
            };
            $.ajax({
              type: "DELETE",
              url: "/api/todos",
              data: JSON.stringify(todo),
              contentType: "application/json"
            }).done(function(data) {
              // Successfully deleted entree
              getAllTodos();
            }).fail(function(jqXHR) {
              console.log("error")
              //$("#error").html("The entree could not be deleted.");
            });
          });
        }
    });
  }
  
  $("#menuButton").click(function (event) {
    if ($(".dropdown-menu").is(":visible")) {
      $(".dropdown-menu").css("display", "none");
    } else {
      $(".dropdown-menu").css("display", "block");
    }
  });

  $("#todoList li span").click(function (event) {
    $(this).parent().remove();
  });

  $("#addTask").click(function (event) {
    if ($(".todoDiv").is(":visible")) {
      $(".todoDiv").css("display", "none");
    } else {
      $(".todoDiv").css("display", "block");
    }
  });

  $(".addBtn").click(function (event) {
    /*let title = $("#myInput").val();
    $("#todoList").append('<li><span class="delete"></span>' + title + "</li>");
    $("#todoList li span").click(function (event) {
      $(this).parent().remove();
    });*/
    const todo = {
      id: $("#user_id").text(),
      remind: $("#myInput").val(),
    };

    $.ajax({
      type: "POST",
      url: "/api/todos",
      data: JSON.stringify(todo),
      contentType: "application/json"
    }).done(function(data) {
      // Reset the form after saving the entree
      $("#myInput").html("");
      getAllTodos();
    }).fail(function(jqXHR) {
      console.log("error")
      //$("#error").html("The todo could not be added.");
    });
  });

  $(".cancelBtn").click(function (event) {
    $(".todoDiv").css("display", "none");
    $(".todoDiv #myInput").val("");
  });
});
