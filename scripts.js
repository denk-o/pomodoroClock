var break_count = 5;//Just some arbitrary initial values
var session_count = 25;

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
