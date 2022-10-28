module.exports = {
  root          : true,
  parserOptions : {
    parser : '@babel/eslint-parser',
  },
  env : {
    node    : true,
    browser : true,
  },
  rules : {
    "key-spacing" : ["error", {
      "beforeColon" : true,
      "afterColon"  : true,
      "align"       : "colon",
      "mode"        : "minimum"
    }]
  },
  extends : ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
};
