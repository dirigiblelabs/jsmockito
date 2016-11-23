# jsmockito
[JsMockito](http://jsmockito.org/) module for mock testing JavaScript services in Dirigible. Includes the [JsHamcrest](http://danielfm.github.com/jshamcrest/) assertions library.

Sample use of jsMockito:
<pre>
var mockito = require('jsmockito/jsmockito').JsMockito;

//mock creation
var mockedArray = mockito.mock(Array);

//using mock object
mockedArray.push("one");
mockedArray.reverse();

//verification
mockito.verify(mockedArray).push("one");
mockito.verify(mockedArray).reverse();
</pre>

Sample use of jsHamcrest (Note, that you need to use some of its supported test framework integrations to enable its seamless use. The example below shows that for QUnit) :
<pre>
var hamcrest = require('jsmockito/jshamcrest').JsHamcrest;
hamcrest.Integration.QUnit({scope: QUnit});
QUnit.assertThat('f', QUnit.equalTo('f'), undefined, assert);
</pre>
Note that the last argument in the assertion is QUnit's assertion because the generic way to fail/pass an assertion in QUnit has been depricated without a replacement so the original seamless integration doesn't not work anymore.

To integrate with Jasmine:
<pre>
var j = require("jasmine/jasmine");
var jasmine = j.core(j);
var env = jasmine.getEnv();
var $$j = j.interface(jasmine, env);
var hamcrest = require("jsmockito/jshamcrest").JsHamcrest;
hamcrest.Integration.jasmine({scope: $$j});
$$j.describe("Test suite ", function() {
		var spec = $$j.it("spec", function() {
			$$j.assertThat(1, $$j.equalTo(1), "yes", spec);
		});
	});
</pre>
Jasmine deprecated the integration used in JsHamcrest to fail/pass an assertion without a replacement. Note that the new integration the current Jasmine spec as last argument in assertThat.

To remove scoping of the test functions and provide them as global in the test script scope, apply the following utility function:
<pre>
var mockito = require('jsmockito/jsmockito').JsMockito;
(function($mockito, _global){
	Object.keys($mockito).map(function(propertyName){
		_global[propertyName] = $mockito[propertyName];
		return propertyName;
	});
})(mockito, this);
</pre>
A reference to a library function then looks like this:
<pre>
var mockedArray = mock(Array);
</pre>
Note the direct reference to function mock without the mockito object scope in front.
