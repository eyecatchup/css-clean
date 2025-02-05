getValue['comment block'] = function (settings, element, parent) {
  var tab = new Array((element.depth * settings.tabSize) + 1).join(settings.tabChar);
  var initValue = element.value.slice();
  var value;

  function isSpecial() {
    /*
      /*!
        Theme Name: casino
        Version: 1.0
        Author: HannesDev
      *\/
    */
    return element.value[0] === '!';
  }

  function isTitle() {
    /*
      Titling support
      http://cssguidelin.es/#titling
    */
    var start = /^[\-]+(\s+|)\*\\$/.test(initValue[0]);
    var end = /^\\\*(\s+|)[\-]+$/.test(initValue.slice(-1)[0]);
    return start && end;
  }

  function lineBreak() {
    var lines = [[]];
    var $tab = new Array(settings.tabSize + 1).join(settings.tabChar);
    var x = 0;
    var v = element.value.join('\n').split(' ').filter(function (a) { return a.length; });
    var tabLength = tab.length + $tab.length;
    var i;
    var n;

    for (i = v.length - 1; i >= 0; i--) {
      if (v[i].length > 1 && v[i].substr(-1) === '\n') {
        v[i] = lasso.trimEnd(v[i]);
        v.splice(i + 1, 0, '\n');
      }
    }

    for (i = 0, n = v.length; i < n; i++) {
      if (v[i] === '\n') {
        x = 0;
      } else {
        x += v[i].length + 1;
        if (x >= settings.lineBreak) {
          x = 0;
          v.splice(i, 0, '\n');
        }
      }
    }

    if (v.length) {
      element.value = v.reduce(function (a, b) {
        if (b === '\n') {
          return a += '\n';
        } else if (a.substr(-1) === '\n') {
          return a + b;
        }
        return a += ' ' + b;
      }).split('\n');
    }
  }

  if (settings.lineBreak) {
    lineBreak();
  }

  if (element.value.length > 1) {
    if (isTitle()) {
      value = element.value.map(function (line, i) {
        var $tab = '';

        if (i > 0 && i < element.value.length - 1) {
          $tab = new Array(settings.tabSize + 1).join(settings.tabChar);
        }

        return $tab + tab + line;
      }).join('\n');

      return tab + '/*' + value + tab + '*/';
    } else if (isSpecial()) {
      value = element.value.map(function (line, i) {
        var $tab = '';

        if (i > 0) {
          $tab = new Array(settings.tabSize + 1).join(settings.tabChar);
        }

        return $tab + tab + line;
      }).join('\n');

      return tab + '/*' + value + '\n' + tab + '*/';
    }

    value = element.value.map(function (line) {
      var $tab = new Array(settings.tabSize + 1).join(settings.tabChar);
      return $tab + tab + line;
    }).join('\n');

    return tab + '/*\n' + value + '\n' + tab + '*/';
  }

  return tab + '/*' + element.value.join('\n') + '*/';
};
