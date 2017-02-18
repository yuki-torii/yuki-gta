'use strict';

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
    options.page,
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
  window.ga('send', 'pageview', page);
};

Google.prototype.event = function event (options) {
  window.ga(
    'send',
    'event',
    options.page,
    options.action,
    options.label,
    options.value
  );
};

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

module.exports = yukiGta;
