var break_count = 5;//Just some arbitrary initial values in minutes
var session_count = 25;
var is_session=true;//switch to false if not session

function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};

function updateFields(){//restricted only to updating button fields
  $("#break_count").html(break_count);
  $("#session_count").html(session_count);
}

function updateTimerField(){//update the timerfield before starting
  var minutes = session_count;
  var seconds = 0;
  minutes = minutes <10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  $(".time").html(minutes + ':' + seconds);
}

function checkTimer(timer){
  //check if we need to switch from break to session or vice versa
  if(timer.expired()){
    //if the timer is expired we must switch
    is_session= !is_session;//switch to oppoosite
  }
}

function tick(minutes, seconds, timer){
  minutes = minutes <10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  $(".time").html(minutes + ':' + seconds);
  checkTimer(timer);
}
//Document starts here

$(document).ready(function(){

  $(".down").on("click",function(){
    if($(this).parents('.break_time').length){
      if(break_count>1){
        break_count=break_count-1;
      }
    }
    else if($(this).parents('.session_time').length){
      if(session_count>1){
        session_count=session_count-1;
        updateTimerField();
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
      updateTimerField();
    }

    updateFields();
  });



  updateFields();

  var session_timer = new CountDownTimer(session_count*60);
  var session_timerObj = CountDownTimer.parse(session_count*60);


  tick(session_timerObj.minutes, session_timerObj.seconds,session_timer);
  session_timer.onTick(tick);

  $("#controller").on("click", function(){
    session_timer.start();
  });

});
