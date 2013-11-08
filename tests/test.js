/*jshint node:true, eqnull:true, laxcomma:true, undef:true, indent:2, camelcase:false */
'use strict';

var decorate = require('../');

function _1(p, q, next) { console.log('1', p, q); next(); }
function _2(p, q, next) { console.log('2', p, q); q.x = 'z'; next(); }
function _3(p, q, next) { console.log('3', p, q); setTimeout(next, 1000); }
function _4(p, q, next) { console.log('4', p, q); next(); }
decorate(_1, _2, _3, _4)('d', { x: 'y' });

