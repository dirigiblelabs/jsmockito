/* globals $ */
/* eslint-env node, dirigible */
var mockito = require('jsmockito/jsmockito').JsMockito;

//mock creation
var mockedArray = mockito.mock(Array);

//using mock object
mockedArray.push("one");
mockedArray.reverse();

//verification
mockito.verify(mockedArray).push("one");
mockito.verify(mockedArray).reverse();