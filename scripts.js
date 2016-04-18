var break_count = 5;
var session_count = 25;


$(document).ready(function(){
  function updateFields(){
    $("#break_count").html(break_count);
    $("#session_count").html(session_count);
  }

  $(".down").on("click",function(){
    if($(this).parents('.break_time').length){
      if(break_count>1){
        break_count=break_count-1;
      }
    }
    else if($(this).parents('.session_time').length){
      if(session_count>1){
        session_count=session_count-1;
      }
    }

    updateFields();
  });

  $(".up").on("click",function(){
    if($(this).parents('.break_time').length){
      break_count=break_count+1;
    }
    else if($(this).parents('.session_time').length){
      session_count=session_count+1;
    }

    updateFields();
  });

  updateFields();
});
