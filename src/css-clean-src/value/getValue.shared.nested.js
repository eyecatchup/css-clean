getValue.shared.nested = function (settings, element, parent) {
  var tab = new Array((element.depth * settings.tabSize) + 1).join(settings.tabChar);
  var $tab = new Array(settings.tabSize + 1).join(settings.tabChar);
  var scopeList = element.content.map(function (a) { return a.scope; });
  var newGroupIndex = [];
  var t;
  var i = 0;
  var n = scopeList.length;
  var newLineCases = [
    'selector',
    'sass function',
    'sass mixin',
    'sass include block',
    'sass for'
  ];

  for (; i < n; i++) {
    newGroupIndex[i] = i > 0 && t !== scopeList[i] && newLineCases.indexOf(scopeList[i]) !== -1;
    t = scopeList[i];
  }

  return getValue.map(settings, element.content).map(function (value, i) {

    if (element.content[i].name === '@else if') {
      return ' ' + value;
    }

    if (element.content[i].name === '@else') {
      return ' ' + value;
    }

    if (element.content[i].index > 1 && element.content[i].name === '@if') {
      return tab + $tab + value;
    }

    if (element.content[i].name === '@if') {
      return tab + $tab + value;
    }

    return tab + $tab + value + '\n';

  }).join('');
};
