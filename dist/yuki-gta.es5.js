var Common = {
  removeElement: function removeElement (el) {
    el.parentNode.removeChild(el);
  }
};

var Base = function Base () {
  this.name = 'base';
};

Base.prototype.createScript = function createScript (src) {
  var script = document.createElement('script');
  script.async = 1;
  script.src = src;
  return script
};

Base.prototype.loadScript = function loadScript (script, key, removeAfterLoad) {
    if ( removeAfterLoad === void 0 ) removeAfterLoad = false;

  script.onerror = function () {
    window[key] = null;
    Common.removeElement(script);
  };

  script.onload = function () {
    removeAfterLoad && Common.removeElement(script);
  };

  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
};

var Baidu = (function (Base$$1) {
  function Baidu (account) {
    Base$$1.call(this);
    window._hmt = window._hmt || [];
    var script = this.createScript(("//hm.baidu.com/hm.js?" + account));
    this.loadScript(script, '_hmt');
  }

  if ( Base$$1 ) Baidu.__proto__ = Base$$1;
  Baidu.prototype = Object.create( Base$$1 && Base$$1.prototype );
  Baidu.prototype.constructor = Baidu;

  Baidu.prototype.pageview = function pageview (page) {
    console.log(page);
    window._hmt && window._hmt.push(['_trackPageview', page]);
  };

  Baidu.prototype.event = function event (options) {
    console.log(options);
    window._hmt && window._hmt.push([
      '_trackEvent',
      options.page,
      options.action,
      options.label,
      options.value
    ]);
  };

  return Baidu;
}(Base));

var Google = (function (Base$$1) {
  function Google (account) {
    Base$$1.call(this);
    window.GoogleAnalyticsObject = 'ga';

    var ga = window.ga || function () {
      ga.q.push(arguments);
    };

    ga.q = [];
    ga.l = 1 * new Date();

    var script = this.createScript('//www.google-analytics.com/analytics.js');
    this.loadScript(script, 'ga');

    ga('create', account, 'auto', 'moment');
    ga('send', 'pageview');

    window.ga = ga;
  }

  if ( Base$$1 ) Google.__proto__ = Base$$1;
  Google.prototype = Object.create( Base$$1 && Base$$1.prototype );
  Google.prototype.constructor = Google;

  Google.prototype.pageview = function pageview (page) {
    console.log(page);
    window.ga('send', 'pageview', page);
  };

  Google.prototype.event = function event (options) {
    console.log(options);
    window.ga(
      'send',
      'event',
      options.page,
      options.action,
      options.label,
      options.value
    );
  };

  return Google;
}(Base));

var Providers = {
  baidu: Baidu,
  google: Google
};

var yukiGta = function yukiGta (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  this.version = '0.0.1';

  this.providers = Object.keys(options).map(function (key) {
    return this$1.registerProvider(options[key], Providers[key])
  });
};

yukiGta.prototype.registerProvider = function registerProvider (option, Provider) {
  return new Provider(option)
};

yukiGta.prototype.pageview = function pageview (page) {
  this.providers.forEach(function (p) {
    p.pageview(page);
  });
};

yukiGta.prototype.event = function event (options) {
  this.providers.forEach(function (p) {
    p.event(options);
  });
};

export default yukiGta;
