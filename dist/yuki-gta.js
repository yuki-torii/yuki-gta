(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['yuki-gta'] = factory());
}(this, (function () { 'use strict';

var Common = {
  removeElement: function removeElement (el) {
    el.parentNode.removeChild(el);
  },
  createScript: function createScript (src) {
    var script = document.createElement('script');
    script.async = 1;
    script.src = src;
    return script
  },
  loadScript: function loadScript (script, key, removeAfterLoad) {
    var this$1 = this;
    if ( removeAfterLoad === void 0 ) removeAfterLoad = false;

    script.onerror = function () {
      window[key] = null;
      this$1.removeElement(script);
    };

    script.onload = function () {
      removeAfterLoad && this$1.removeElement(script);
    };

    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  }
};

var Baidu = function Baidu (account) {
  window._hmt = window._hmt || [];
  var script = Common.createScript(("//hm.baidu.com/hm.js?" + account));
  Common.loadScript(script, '_hmt');
};

Baidu.prototype.pageview = function pageview (page) {
  window._hmt && window._hmt.push(['_trackPageview', ("/" + page)]);
};

Baidu.prototype.event = function event (options) {
  window._hmt && window._hmt.push([
    '_trackEvent',
    options.category,
    options.action,
    options.label,
    options.value
  ]);
};

var Google = function Google (account) {
  window.GoogleAnalyticsObject = 'ga';

  var ga = window.ga = window.ga || function () {
    (window.ga.q = window.ga.q || []).push(arguments);
  };

  ga.q = [];
  ga.l = 1 * new Date();

  ga('create', account, 'auto');
  ga('send', 'pageview');

  var script = Common.createScript('https://www.google-analytics.com/analytics.js');
  Common.loadScript(script, 'ga');
};

Google.prototype.pageview = function pageview (page) {
  window.ga && window.ga('send', 'pageview', page);
};

Google.prototype.event = function event (options) {
  window.ga && window.ga(
    'send',
    'event',
    options.category,
    options.action,
    options.label,
    options.value
  );
};

Google.prototype.setUser = function setUser (id) {
  window.ga && window.ga('set', 'userId', id);
};

var Providers = {
  baidu: Baidu,
  google: Google
};

var yukiGta = function yukiGta (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  this.providers = Object.keys(options).map(function (key) {
    return this$1.registerProvider(options[key], Providers[key])
  });
};

yukiGta.prototype.registerProvider = function registerProvider (option, Provider) {
  return new Provider(option)
};

yukiGta.prototype.pageview = function pageview (page) {
  this.providers.forEach(function (p) {
    p.pageview && p.pageview(page);
  });
};

yukiGta.prototype.event = function event (options) {
  this.providers.forEach(function (p) {
    p.event && p.event(options);
  });
};

yukiGta.prototype.setUser = function setUser (id) {
  this.providers.forEach(function (p) {
    p.setUser && p.setUser(id);
  });
};

return yukiGta;

})));
