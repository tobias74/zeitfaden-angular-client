(function() {
  var more, some;

  some = function(one, two) {
    return one + two;
  };

  more = function() {
    return alert('ding');
  };

  this.MyController = function(val) {
    return alert('good');
  };

}).call(this);
