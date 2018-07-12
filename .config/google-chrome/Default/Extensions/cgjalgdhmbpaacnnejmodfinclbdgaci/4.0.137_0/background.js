// Generated by CoffeeScript 1.10.0
(function() {
  var SyntaxticSettings;

  SyntaxticSettings = function() {
    var _defaultFontFamily, _defaultFontSize, _defaultGutterBlacklist, _defaultHighlightBlacklist, _defaultTheme, _disableQuickCode, _fontFamily, _fontSize, _gutterBlacklist, _highlightBlacklist, _theme;
    if (localStorage["syntaxtic.settings.gutterBlacklist"] == null) {
      localStorage["syntaxtic.settings.gutterBlacklist"] = "[]";
    }
    if (localStorage["syntaxtic.settings.highlightBlacklist"] == null) {
      localStorage["syntaxtic.settings.highlightBlacklist"] = "[]";
    }
    _theme = localStorage["syntaxtic.settings.theme"];
    _fontSize = localStorage["syntaxtic.settings.fontSize"];
    _fontFamily = localStorage["syntaxtic.settings.fontFamily"];
    _gutterBlacklist = JSON.parse(localStorage["syntaxtic.settings.gutterBlacklist"]);
    _highlightBlacklist = JSON.parse(localStorage["syntaxtic.settings.highlightBlacklist"]);
    _disableQuickCode = localStorage["syntaxtic.settings.disableQuickCode"];
    _defaultTheme = "shThemeMidnight.css";
    _defaultFontSize = "normal";
    _defaultFontFamily = "Consolas, monospace";
    _defaultGutterBlacklist = [];
    _defaultHighlightBlacklist = [];
    this.__defineGetter__("theme", function() {
      return localStorage["syntaxtic.settings.theme"] || (_theme || _defaultTheme);
    });
    this.__defineSetter__("theme", function(val) {
      _theme = val;
      return localStorage["syntaxtic.settings.theme"] = val;
    });
    this.__defineGetter__("fontSize", function() {
      return localStorage["syntaxtic.settings.fontSize"] || (_fontSize || _defaultFontSize);
    });
    this.__defineSetter__("fontSize", function(val) {
      _fontSize = val;
      return localStorage["syntaxtic.settings.fontSize"] = val;
    });
    this.__defineGetter__("fontFamily", function() {
      return localStorage["syntaxtic.settings.fontFamily"] || (_fontFamily || _defaultFontFamily);
    });
    this.__defineSetter__("fontFamily", function(val) {
      _fontFamily = val;
      return localStorage["syntaxtic.settings.fontFamily"] = val;
    });
    this.__defineGetter__("gutterBlacklist", function() {
      return JSON.parse(localStorage["syntaxtic.settings.gutterBlacklist"]) || (_gutterBlacklist || _defaultGutterBlacklist);
    });
    this.__defineSetter__("gutterBlacklist", function(val) {
      _gutterBlacklist = val;
      return localStorage["syntaxtic.settings.gutterBlacklist"] = JSON.stringify(val);
    });
    this.__defineGetter__("highlightBlacklist", function() {
      return JSON.parse(localStorage["syntaxtic.settings.highlightBlacklist"]) || (_highlightBlacklist || _defaultHighlightBlacklist);
    });
    this.__defineSetter__("highlightBlacklist", function(val) {
      _highlightBlacklist = val;
      return localStorage["syntaxtic.settings.highlightBlacklist"] = JSON.stringify(val);
    });
    this.__defineGetter__("disableQuickCode", function() {
      var val;
      val = localStorage["syntaxtic.settings.disableQuickCode"] || (_disableQuickCode || false);
      return val === "true";
    });
    return this.__defineSetter__("disableQuickCode", function(val) {
      _disableQuickCode = val;
      return localStorage["syntaxtic.settings.disableQuickCode"] = val;
    });
  };

  chrome.extension.getBackgroundPage().syntaxtic = {
    settings: new SyntaxticSettings()
  };

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method === "getSettingsWithAction") {
      chrome.pageAction.show(sender.tab.id);
      return sendResponse({
        settings: syntaxtic.settings
      });
    } else if (request.method === "getSettings") {
      return sendResponse({
        settings: syntaxtic.settings
      });
    } else {
      return sendResponse({});
    }
  });

}).call(this);