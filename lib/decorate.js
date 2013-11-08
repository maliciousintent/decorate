/*jshint node:true, eqnull:true, laxcomma:true, undef:true, indent:2, camelcase:false */
'use strict';


// ### Usage ####
//
// function _1(p, q, next) { console.log('1', p, q); next(); }
// function _2(p, q, next) { console.log('2', p, q); q.x = 'z'; next(); }
// function _3(p, q, next) { console.log('3', p, q); setTimeout(next, 1000); }
// function _4(p, q, next) { console.log('4', p, q); next(); }
// _decorate(_1, _2, _3, _4)('d', { x: 'y' });
//


var sliced = require('sliced');

module.exports = _decorate;

function _decorate() {
  if (typeof arguments[0] !== 'function') {
    return;
  }
  
  var outer_arguments = arguments;
  
  return function () {
    var callargs;
    
    if (arguments[arguments.length - 1].name === '__decorate_callback') {
      callargs = sliced(arguments, 0, -1);
    } else {
      callargs = sliced(arguments);
    }
    
    callargs.push(function __decorate_callback() {
      var next_args = sliced(outer_arguments, 1);
      if (next_args && next_args.length > 0) {
        _decorate.apply(null, next_args).apply(null, callargs);
      }
    });
    
    outer_arguments[0].apply(null, callargs);
  };
}
