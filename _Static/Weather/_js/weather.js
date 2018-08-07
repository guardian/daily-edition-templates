window.GuIpad = window.GuIpad || {};
GuIpad.Weather = {

  setActive: function(link) {
    $('.active-panel').removeClass('active-panel');
    $('.CrossRefs ol.story-package li.current').removeClass('current');

    var link = $(link);
    panel = link.attr('data-panel');
    link.parent().addClass('current');
    $('#'+panel).addClass('active-panel');
  },

  init: function() {
    var base = this;
    $('.CrossRefs ol.story-package li:not(.weather-on-web)')
    .bind('tap', function(e) {
      var $e = $(e.target);
      if (!$e.attr('data-panel')) {
        $e = $e.find('a');
      }
      base.setActive($e);
    })
  .find('a').bind('click', function(e) {
    e.preventDefault();
  });
  }

};
