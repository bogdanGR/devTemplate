"use strict";

var ge = function (elName) {return document.getElementById(elName)},
	gc = function (className, parent) {parent = parent || document; return parent.getElementsByClassName(className)},
	hardHide = function (elName) {ge(elName).style.display = "none"},
	hardShow = function (elName) {ge(elName).style.display = "block"};