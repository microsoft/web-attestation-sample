// Copyright (c) Microsoft Corporation. 
// Licensed under the MIT license.


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uwaQrEncoder = {}));
})(this, (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs(x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var check = function (it) {
		return it && it.Math == Math && it;
	};
	var global$y =
		check(typeof globalThis == 'object' && globalThis) ||
		check(typeof window == 'object' && window) ||
		check(typeof self == 'object' && self) ||
		check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
		(function () { return this; })() || Function('return this')();
	getDefaultExportFromCjs(global$y);

	var objectGetOwnPropertyDescriptor = {};

	var fails$B = function (exec) {
		try {
			return !!exec();
		} catch (error) {
			return true;
		}
	};
	getDefaultExportFromCjs(fails$B);

	var fails$A = fails$B;
	var descriptors = !fails$A(function () {
		return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});
	getDefaultExportFromCjs(descriptors);

	var fails$z = fails$B;
	var functionBindNative = !fails$z(function () {
		var test = (function () { }).bind();
		return typeof test != 'function' || test.hasOwnProperty('prototype');
	});
	getDefaultExportFromCjs(functionBindNative);

	var NATIVE_BIND$3 = functionBindNative;
	var call$p = Function.prototype.call;
	var functionCall = NATIVE_BIND$3 ? call$p.bind(call$p) : function () {
		return call$p.apply(call$p, arguments);
	};
	getDefaultExportFromCjs(functionCall);

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;
	var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
		var descriptor = getOwnPropertyDescriptor$3(this, V);
		return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$6 = function (bitmap, value) {
		return {
			enumerable: !(bitmap & 1),
			configurable: !(bitmap & 2),
			writable: !(bitmap & 4),
			value: value
		};
	};
	getDefaultExportFromCjs(createPropertyDescriptor$6);

	var NATIVE_BIND$2 = functionBindNative;
	var FunctionPrototype$3 = Function.prototype;
	var call$o = FunctionPrototype$3.call;
	var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$3.bind.bind(call$o, call$o);
	var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
		return function () {
			return call$o.apply(fn, arguments);
		};
	};
	getDefaultExportFromCjs(functionUncurryThis);

	var uncurryThis$A = functionUncurryThis;
	var toString$d = uncurryThis$A({}.toString);
	var stringSlice$7 = uncurryThis$A(''.slice);
	var classofRaw$2 = function (it) {
		return stringSlice$7(toString$d(it), 8, -1);
	};
	getDefaultExportFromCjs(classofRaw$2);

	var uncurryThis$z = functionUncurryThis;
	var fails$y = fails$B;
	var classof$e = classofRaw$2;
	var $Object$4 = Object;
	var split = uncurryThis$z(''.split);
	var indexedObject = fails$y(function () {
		return !$Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
		return classof$e(it) == 'String' ? split(it, '') : $Object$4(it);
	} : $Object$4;
	getDefaultExportFromCjs(indexedObject);

	var isNullOrUndefined$5 = function (it) {
		return it === null || it === undefined;
	};
	getDefaultExportFromCjs(isNullOrUndefined$5);

	var isNullOrUndefined$4 = isNullOrUndefined$5;
	var $TypeError$h = TypeError;
	var requireObjectCoercible$5 = function (it) {
		if (isNullOrUndefined$4(it)) throw $TypeError$h("Can't call method on " + it);
		return it;
	};
	getDefaultExportFromCjs(requireObjectCoercible$5);

	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$4 = requireObjectCoercible$5;
	var toIndexedObject$b = function (it) {
		return IndexedObject$3(requireObjectCoercible$4(it));
	};
	getDefaultExportFromCjs(toIndexedObject$b);

	var documentAll$2 = typeof document == 'object' && document.all;
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;
	var documentAll_1 = {
		all: documentAll$2,
		IS_HTMLDDA: IS_HTMLDDA
	};
	getDefaultExportFromCjs(documentAll_1);

	var $documentAll$1 = documentAll_1;
	var documentAll$1 = $documentAll$1.all;
	var isCallable$r = $documentAll$1.IS_HTMLDDA ? function (argument) {
		return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
		return typeof argument == 'function';
	};
	getDefaultExportFromCjs(isCallable$r);

	var isCallable$q = isCallable$r;
	var $documentAll = documentAll_1;
	var documentAll = $documentAll.all;
	var isObject$f = $documentAll.IS_HTMLDDA ? function (it) {
		return typeof it == 'object' ? it !== null : isCallable$q(it) || it === documentAll;
	} : function (it) {
		return typeof it == 'object' ? it !== null : isCallable$q(it);
	};
	getDefaultExportFromCjs(isObject$f);

	var global$x = global$y;
	var isCallable$p = isCallable$r;
	var aFunction = function (argument) {
		return isCallable$p(argument) ? argument : undefined;
	};
	var getBuiltIn$a = function (namespace, method) {
		return arguments.length < 2 ? aFunction(global$x[namespace]) : global$x[namespace] && global$x[namespace][method];
	};
	getDefaultExportFromCjs(getBuiltIn$a);

	var uncurryThis$y = functionUncurryThis;
	var objectIsPrototypeOf = uncurryThis$y({}.isPrototypeOf);
	getDefaultExportFromCjs(objectIsPrototypeOf);

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';
	getDefaultExportFromCjs(engineUserAgent);

	var global$w = global$y;
	var userAgent$5 = engineUserAgent;
	var process$4 = global$w.process;
	var Deno$1 = global$w.Deno;
	var versions = process$4 && process$4.versions || Deno$1 && Deno$1.version;
	var v8 = versions && versions.v8;
	var match, version;
	if (v8) {
		match = v8.split('.');
		version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}
	if (!version && userAgent$5) {
		match = userAgent$5.match(/Edge\/(\d+)/);
		if (!match || match[1] >= 74) {
			match = userAgent$5.match(/Chrome\/(\d+)/);
			if (match) version = +match[1];
		}
	}
	var engineV8Version = version;
	getDefaultExportFromCjs(engineV8Version);

	var V8_VERSION$3 = engineV8Version;
	var fails$x = fails$B;
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$x(function () {
		var symbol = Symbol();
		return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
			!Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
	});
	getDefaultExportFromCjs(symbolConstructorDetection);

	var NATIVE_SYMBOL$6 = symbolConstructorDetection;
	var useSymbolAsUid = NATIVE_SYMBOL$6
		&& !Symbol.sham
		&& typeof Symbol.iterator == 'symbol';
	getDefaultExportFromCjs(useSymbolAsUid);

	var getBuiltIn$9 = getBuiltIn$a;
	var isCallable$o = isCallable$r;
	var isPrototypeOf$8 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
	var $Object$3 = Object;
	var isSymbol$6 = USE_SYMBOL_AS_UID$1 ? function (it) {
		return typeof it == 'symbol';
	} : function (it) {
		var $Symbol = getBuiltIn$9('Symbol');
		return isCallable$o($Symbol) && isPrototypeOf$8($Symbol.prototype, $Object$3(it));
	};
	getDefaultExportFromCjs(isSymbol$6);

	var $String$5 = String;
	var tryToString$7 = function (argument) {
		try {
			return $String$5(argument);
		} catch (error) {
			return 'Object';
		}
	};
	getDefaultExportFromCjs(tryToString$7);

	var isCallable$n = isCallable$r;
	var tryToString$6 = tryToString$7;
	var $TypeError$g = TypeError;
	var aCallable$b = function (argument) {
		if (isCallable$n(argument)) return argument;
		throw $TypeError$g(tryToString$6(argument) + ' is not a function');
	};
	getDefaultExportFromCjs(aCallable$b);

	var aCallable$a = aCallable$b;
	var isNullOrUndefined$3 = isNullOrUndefined$5;
	var getMethod$4 = function (V, P) {
		var func = V[P];
		return isNullOrUndefined$3(func) ? undefined : aCallable$a(func);
	};
	getDefaultExportFromCjs(getMethod$4);

	var call$n = functionCall;
	var isCallable$m = isCallable$r;
	var isObject$e = isObject$f;
	var $TypeError$f = TypeError;
	var ordinaryToPrimitive$1 = function (input, pref) {
		var fn, val;
		if (pref === 'string' && isCallable$m(fn = input.toString) && !isObject$e(val = call$n(fn, input))) return val;
		if (isCallable$m(fn = input.valueOf) && !isObject$e(val = call$n(fn, input))) return val;
		if (pref !== 'string' && isCallable$m(fn = input.toString) && !isObject$e(val = call$n(fn, input))) return val;
		throw $TypeError$f("Can't convert object to primitive value");
	};
	getDefaultExportFromCjs(ordinaryToPrimitive$1);

	var shared$7 = { exports: {} };

	var isPure = false;
	getDefaultExportFromCjs(isPure);

	var global$v = global$y;
	var defineProperty$8 = Object.defineProperty;
	var defineGlobalProperty$3 = function (key, value) {
		try {
			defineProperty$8(global$v, key, { value: value, configurable: true, writable: true });
		} catch (error) {
			global$v[key] = value;
		} return value;
	};
	getDefaultExportFromCjs(defineGlobalProperty$3);

	var global$u = global$y;
	var defineGlobalProperty$2 = defineGlobalProperty$3;
	var SHARED = '__core-js_shared__';
	var store$3 = global$u[SHARED] || defineGlobalProperty$2(SHARED, {});
	var sharedStore = store$3;
	getDefaultExportFromCjs(sharedStore);

	var store$2 = sharedStore;
	(shared$7.exports = function (key, value) {
		return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
		version: '3.30.1',
		mode: 'global',
		copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
		license: 'https://github.com/zloirock/core-js/blob/v3.30.1/LICENSE',
		source: 'https://github.com/zloirock/core-js'
	});
	var sharedExports = shared$7.exports;
	getDefaultExportFromCjs(sharedExports);

	var requireObjectCoercible$3 = requireObjectCoercible$5;
	var $Object$2 = Object;
	var toObject$c = function (argument) {
		return $Object$2(requireObjectCoercible$3(argument));
	};
	getDefaultExportFromCjs(toObject$c);

	var uncurryThis$x = functionUncurryThis;
	var toObject$b = toObject$c;
	var hasOwnProperty = uncurryThis$x({}.hasOwnProperty);
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
		return hasOwnProperty(toObject$b(it), key);
	};
	getDefaultExportFromCjs(hasOwnProperty_1);

	var uncurryThis$w = functionUncurryThis;
	var id = 0;
	var postfix = Math.random();
	var toString$c = uncurryThis$w(1.0.toString);
	var uid$4 = function (key) {
		return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$c(++id + postfix, 36);
	};
	getDefaultExportFromCjs(uid$4);

	var global$t = global$y;
	var shared$6 = sharedExports;
	var hasOwn$i = hasOwnProperty_1;
	var uid$3 = uid$4;
	var NATIVE_SYMBOL$5 = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var Symbol$1 = global$t.Symbol;
	var WellKnownSymbolsStore$1 = shared$6('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;
	var wellKnownSymbol$p = function (name) {
		if (!hasOwn$i(WellKnownSymbolsStore$1, name)) {
			WellKnownSymbolsStore$1[name] = NATIVE_SYMBOL$5 && hasOwn$i(Symbol$1, name)
				? Symbol$1[name]
				: createWellKnownSymbol('Symbol.' + name);
		} return WellKnownSymbolsStore$1[name];
	};
	getDefaultExportFromCjs(wellKnownSymbol$p);

	var call$m = functionCall;
	var isObject$d = isObject$f;
	var isSymbol$5 = isSymbol$6;
	var getMethod$3 = getMethod$4;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$o = wellKnownSymbol$p;
	var $TypeError$e = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$o('toPrimitive');
	var toPrimitive$3 = function (input, pref) {
		if (!isObject$d(input) || isSymbol$5(input)) return input;
		var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
		var result;
		if (exoticToPrim) {
			if (pref === undefined) pref = 'default';
			result = call$m(exoticToPrim, input, pref);
			if (!isObject$d(result) || isSymbol$5(result)) return result;
			throw $TypeError$e("Can't convert object to primitive value");
		}
		if (pref === undefined) pref = 'number';
		return ordinaryToPrimitive(input, pref);
	};
	getDefaultExportFromCjs(toPrimitive$3);

	var toPrimitive$2 = toPrimitive$3;
	var isSymbol$4 = isSymbol$6;
	var toPropertyKey$5 = function (argument) {
		var key = toPrimitive$2(argument, 'string');
		return isSymbol$4(key) ? key : key + '';
	};
	getDefaultExportFromCjs(toPropertyKey$5);

	var global$s = global$y;
	var isObject$c = isObject$f;
	var document$3 = global$s.document;
	var EXISTS$1 = isObject$c(document$3) && isObject$c(document$3.createElement);
	var documentCreateElement$2 = function (it) {
		return EXISTS$1 ? document$3.createElement(it) : {};
	};
	getDefaultExportFromCjs(documentCreateElement$2);

	var DESCRIPTORS$i = descriptors;
	var fails$w = fails$B;
	var createElement$1 = documentCreateElement$2;
	var ie8DomDefine = !DESCRIPTORS$i && !fails$w(function () {
		return Object.defineProperty(createElement$1('div'), 'a', {
			get: function () { return 7; }
		}).a != 7;
	});
	getDefaultExportFromCjs(ie8DomDefine);

	var DESCRIPTORS$h = descriptors;
	var call$l = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$5 = createPropertyDescriptor$6;
	var toIndexedObject$a = toIndexedObject$b;
	var toPropertyKey$4 = toPropertyKey$5;
	var hasOwn$h = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$h ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
		O = toIndexedObject$a(O);
		P = toPropertyKey$4(P);
		if (IE8_DOM_DEFINE$1) try {
			return $getOwnPropertyDescriptor$2(O, P);
		} catch (error) { }
		if (hasOwn$h(O, P)) return createPropertyDescriptor$5(!call$l(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$g = descriptors;
	var fails$v = fails$B;
	var v8PrototypeDefineBug = DESCRIPTORS$g && fails$v(function () {
		return Object.defineProperty(function () { }, 'prototype', {
			value: 42,
			writable: false
		}).prototype != 42;
	});
	getDefaultExportFromCjs(v8PrototypeDefineBug);

	var isObject$b = isObject$f;
	var $String$4 = String;
	var $TypeError$d = TypeError;
	var anObject$f = function (argument) {
		if (isObject$b(argument)) return argument;
		throw $TypeError$d($String$4(argument) + ' is not an object');
	};
	getDefaultExportFromCjs(anObject$f);

	var DESCRIPTORS$f = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$e = anObject$f;
	var toPropertyKey$3 = toPropertyKey$5;
	var $TypeError$c = TypeError;
	var $defineProperty$1 = Object.defineProperty;
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';
	objectDefineProperty.f = DESCRIPTORS$f ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
		anObject$e(O);
		P = toPropertyKey$3(P);
		anObject$e(Attributes);
		if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
			var current = $getOwnPropertyDescriptor$1(O, P);
			if (current && current[WRITABLE]) {
				O[P] = Attributes.value;
				Attributes = {
					configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
					enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
					writable: false
				};
			}
		} return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
		anObject$e(O);
		P = toPropertyKey$3(P);
		anObject$e(Attributes);
		if (IE8_DOM_DEFINE) try {
			return $defineProperty$1(O, P, Attributes);
		} catch (error) { }
		if ('get' in Attributes || 'set' in Attributes) throw $TypeError$c('Accessors not supported');
		if ('value' in Attributes) O[P] = Attributes.value;
		return O;
	};

	var DESCRIPTORS$e = descriptors;
	var definePropertyModule$6 = objectDefineProperty;
	var createPropertyDescriptor$4 = createPropertyDescriptor$6;
	var createNonEnumerableProperty$9 = DESCRIPTORS$e ? function (object, key, value) {
		return definePropertyModule$6.f(object, key, createPropertyDescriptor$4(1, value));
	} : function (object, key, value) {
		object[key] = value;
		return object;
	};
	getDefaultExportFromCjs(createNonEnumerableProperty$9);

	var makeBuiltIn$3 = { exports: {} };

	var DESCRIPTORS$d = descriptors;
	var hasOwn$g = hasOwnProperty_1;
	var FunctionPrototype$2 = Function.prototype;
	var getDescriptor = DESCRIPTORS$d && Object.getOwnPropertyDescriptor;
	var EXISTS = hasOwn$g(FunctionPrototype$2, 'name');
	var PROPER = EXISTS && (function something() { }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$d || (DESCRIPTORS$d && getDescriptor(FunctionPrototype$2, 'name').configurable));
	var functionName = {
		EXISTS: EXISTS,
		PROPER: PROPER,
		CONFIGURABLE: CONFIGURABLE
	};
	getDefaultExportFromCjs(functionName);

	var uncurryThis$v = functionUncurryThis;
	var isCallable$l = isCallable$r;
	var store$1 = sharedStore;
	var functionToString$1 = uncurryThis$v(Function.toString);
	if (!isCallable$l(store$1.inspectSource)) {
		store$1.inspectSource = function (it) {
			return functionToString$1(it);
		};
	}
	var inspectSource$3 = store$1.inspectSource;
	getDefaultExportFromCjs(inspectSource$3);

	var global$r = global$y;
	var isCallable$k = isCallable$r;
	var WeakMap$1 = global$r.WeakMap;
	var weakMapBasicDetection = isCallable$k(WeakMap$1) && /native code/.test(String(WeakMap$1));
	getDefaultExportFromCjs(weakMapBasicDetection);

	var shared$5 = sharedExports;
	var uid$2 = uid$4;
	var keys$1 = shared$5('keys');
	var sharedKey$4 = function (key) {
		return keys$1[key] || (keys$1[key] = uid$2(key));
	};
	getDefaultExportFromCjs(sharedKey$4);

	var hiddenKeys$5 = {};
	getDefaultExportFromCjs(hiddenKeys$5);

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$q = global$y;
	var isObject$a = isObject$f;
	var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;
	var hasOwn$f = hasOwnProperty_1;
	var shared$4 = sharedStore;
	var sharedKey$3 = sharedKey$4;
	var hiddenKeys$4 = hiddenKeys$5;
	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$5 = global$q.TypeError;
	var WeakMap = global$q.WeakMap;
	var set$2, get$1, has;
	var enforce = function (it) {
		return has(it) ? get$1(it) : set$2(it, {});
	};
	var getterFor = function (TYPE) {
		return function (it) {
			var state;
			if (!isObject$a(it) || (state = get$1(it)).type !== TYPE) {
				throw TypeError$5('Incompatible receiver, ' + TYPE + ' required');
			} return state;
		};
	};
	if (NATIVE_WEAK_MAP || shared$4.state) {
		var store = shared$4.state || (shared$4.state = new WeakMap());
		store.get = store.get;
		store.has = store.has;
		store.set = store.set;
		set$2 = function (it, metadata) {
			if (store.has(it)) throw TypeError$5(OBJECT_ALREADY_INITIALIZED);
			metadata.facade = it;
			store.set(it, metadata);
			return metadata;
		};
		get$1 = function (it) {
			return store.get(it) || {};
		};
		has = function (it) {
			return store.has(it);
		};
	} else {
		var STATE = sharedKey$3('state');
		hiddenKeys$4[STATE] = true;
		set$2 = function (it, metadata) {
			if (hasOwn$f(it, STATE)) throw TypeError$5(OBJECT_ALREADY_INITIALIZED);
			metadata.facade = it;
			createNonEnumerableProperty$8(it, STATE, metadata);
			return metadata;
		};
		get$1 = function (it) {
			return hasOwn$f(it, STATE) ? it[STATE] : {};
		};
		has = function (it) {
			return hasOwn$f(it, STATE);
		};
	}
	var internalState = {
		set: set$2,
		get: get$1,
		has: has,
		enforce: enforce,
		getterFor: getterFor
	};
	getDefaultExportFromCjs(internalState);

	var uncurryThis$u = functionUncurryThis;
	var fails$u = fails$B;
	var isCallable$j = isCallable$r;
	var hasOwn$e = hasOwnProperty_1;
	var DESCRIPTORS$c = descriptors;
	var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
	var inspectSource$2 = inspectSource$3;
	var InternalStateModule$7 = internalState;
	var enforceInternalState$2 = InternalStateModule$7.enforce;
	var getInternalState$6 = InternalStateModule$7.get;
	var $String$3 = String;
	var defineProperty$7 = Object.defineProperty;
	var stringSlice$6 = uncurryThis$u(''.slice);
	var replace$5 = uncurryThis$u(''.replace);
	var join$1 = uncurryThis$u([].join);
	var CONFIGURABLE_LENGTH = DESCRIPTORS$c && !fails$u(function () {
		return defineProperty$7(function () { }, 'length', { value: 8 }).length !== 8;
	});
	var TEMPLATE = String(String).split('String');
	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
		if (stringSlice$6($String$3(name), 0, 7) === 'Symbol(') {
			name = '[' + replace$5($String$3(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
		}
		if (options && options.getter) name = 'get ' + name;
		if (options && options.setter) name = 'set ' + name;
		if (!hasOwn$e(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
			if (DESCRIPTORS$c) defineProperty$7(value, 'name', { value: name, configurable: true });
			else value.name = name;
		}
		if (CONFIGURABLE_LENGTH && options && hasOwn$e(options, 'arity') && value.length !== options.arity) {
			defineProperty$7(value, 'length', { value: options.arity });
		}
		try {
			if (options && hasOwn$e(options, 'constructor') && options.constructor) {
				if (DESCRIPTORS$c) defineProperty$7(value, 'prototype', { writable: false });
			} else if (value.prototype) value.prototype = undefined;
		} catch (error) { }
		var state = enforceInternalState$2(value);
		if (!hasOwn$e(state, 'source')) {
			state.source = join$1(TEMPLATE, typeof name == 'string' ? name : '');
		} return value;
	};
	Function.prototype.toString = makeBuiltIn$2(function toString() {
		return isCallable$j(this) && getInternalState$6(this).source || inspectSource$2(this);
	}, 'toString');
	var makeBuiltInExports = makeBuiltIn$3.exports;
	getDefaultExportFromCjs(makeBuiltInExports);

	var isCallable$i = isCallable$r;
	var definePropertyModule$5 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltInExports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;
	var defineBuiltIn$c = function (O, key, value, options) {
		if (!options) options = {};
		var simple = options.enumerable;
		var name = options.name !== undefined ? options.name : key;
		if (isCallable$i(value)) makeBuiltIn$1(value, name, options);
		if (options.global) {
			if (simple) O[key] = value;
			else defineGlobalProperty$1(key, value);
		} else {
			try {
				if (!options.unsafe) delete O[key];
				else if (O[key]) simple = true;
			} catch (error) { }
			if (simple) O[key] = value;
			else definePropertyModule$5.f(O, key, {
				value: value,
				enumerable: false,
				configurable: !options.nonConfigurable,
				writable: !options.nonWritable
			});
		} return O;
	};
	getDefaultExportFromCjs(defineBuiltIn$c);

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$5 = Math.floor;
	var mathTrunc = Math.trunc || function trunc(x) {
		var n = +x;
		return (n > 0 ? floor$5 : ceil)(n);
	};
	getDefaultExportFromCjs(mathTrunc);

	var trunc = mathTrunc;
	var toIntegerOrInfinity$9 = function (argument) {
		var number = +argument;
		return number !== number || number === 0 ? 0 : trunc(number);
	};
	getDefaultExportFromCjs(toIntegerOrInfinity$9);

	var toIntegerOrInfinity$8 = toIntegerOrInfinity$9;
	var max$3 = Math.max;
	var min$4 = Math.min;
	var toAbsoluteIndex$6 = function (index, length) {
		var integer = toIntegerOrInfinity$8(index);
		return integer < 0 ? max$3(integer + length, 0) : min$4(integer, length);
	};
	getDefaultExportFromCjs(toAbsoluteIndex$6);

	var toIntegerOrInfinity$7 = toIntegerOrInfinity$9;
	var min$3 = Math.min;
	var toLength$6 = function (argument) {
		return argument > 0 ? min$3(toIntegerOrInfinity$7(argument), 0x1FFFFFFFFFFFFF) : 0;
	};
	getDefaultExportFromCjs(toLength$6);

	var toLength$5 = toLength$6;
	var lengthOfArrayLike$f = function (obj) {
		return toLength$5(obj.length);
	};
	getDefaultExportFromCjs(lengthOfArrayLike$f);

	var toIndexedObject$9 = toIndexedObject$b;
	var toAbsoluteIndex$5 = toAbsoluteIndex$6;
	var lengthOfArrayLike$e = lengthOfArrayLike$f;
	var createMethod$4 = function (IS_INCLUDES) {
		return function ($this, el, fromIndex) {
			var O = toIndexedObject$9($this);
			var length = lengthOfArrayLike$e(O);
			var index = toAbsoluteIndex$5(fromIndex, length);
			var value;
			if (IS_INCLUDES && el != el) while (length > index) {
				value = O[index++];
				if (value != value) return true;
			} else for (; length > index; index++) {
				if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
			} return !IS_INCLUDES && -1;
		};
	};
	var arrayIncludes = {
		includes: createMethod$4(true),
		indexOf: createMethod$4(false)
	};
	getDefaultExportFromCjs(arrayIncludes);

	var uncurryThis$t = functionUncurryThis;
	var hasOwn$d = hasOwnProperty_1;
	var toIndexedObject$8 = toIndexedObject$b;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$5;
	var push$5 = uncurryThis$t([].push);
	var objectKeysInternal = function (object, names) {
		var O = toIndexedObject$8(object);
		var i = 0;
		var result = [];
		var key;
		for (key in O) !hasOwn$d(hiddenKeys$3, key) && hasOwn$d(O, key) && push$5(result, key);
		while (names.length > i) if (hasOwn$d(O, key = names[i++])) {
			~indexOf$1(result, key) || push$5(result, key);
		}
		return result;
	};
	getDefaultExportFromCjs(objectKeysInternal);

	var enumBugKeys$3 = [
		'constructor',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'toLocaleString',
		'toString',
		'valueOf'
	];
	getDefaultExportFromCjs(enumBugKeys$3);

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;
	var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
		return internalObjectKeys$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertySymbols = {};

	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$8 = getBuiltIn$a;
	var uncurryThis$s = functionUncurryThis;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols;
	var anObject$d = anObject$f;
	var concat$2 = uncurryThis$s([].concat);
	var ownKeys$1 = getBuiltIn$8('Reflect', 'ownKeys') || function ownKeys(it) {
		var keys = getOwnPropertyNamesModule$1.f(anObject$d(it));
		var getOwnPropertySymbols = getOwnPropertySymbolsModule$3.f;
		return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};
	getDefaultExportFromCjs(ownKeys$1);

	var hasOwn$c = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$4 = objectDefineProperty;
	var copyConstructorProperties$3 = function (target, source, exceptions) {
		var keys = ownKeys(source);
		var defineProperty = definePropertyModule$4.f;
		var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (!hasOwn$c(target, key) && !(exceptions && hasOwn$c(exceptions, key))) {
				defineProperty(target, key, getOwnPropertyDescriptor(source, key));
			}
		}
	};
	getDefaultExportFromCjs(copyConstructorProperties$3);

	var fails$t = fails$B;
	var isCallable$h = isCallable$r;
	var replacement = /#|\.prototype\./;
	var isForced$3 = function (feature, detection) {
		var value = data[normalize(feature)];
		return value == POLYFILL ? true
			: value == NATIVE ? false
				: isCallable$h(detection) ? fails$t(detection)
					: !!detection;
	};
	var normalize = isForced$3.normalize = function (string) {
		return String(string).replace(replacement, '.').toLowerCase();
	};
	var data = isForced$3.data = {};
	var NATIVE = isForced$3.NATIVE = 'N';
	var POLYFILL = isForced$3.POLYFILL = 'P';
	var isForced_1 = isForced$3;
	getDefaultExportFromCjs(isForced_1);

	var global$p = global$y;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
	var defineBuiltIn$b = defineBuiltIn$c;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties$2 = copyConstructorProperties$3;
	var isForced$2 = isForced_1;
	var _export = function (options, source) {
		var TARGET = options.target;
		var GLOBAL = options.global;
		var STATIC = options.stat;
		var FORCED, target, key, targetProperty, sourceProperty, descriptor;
		if (GLOBAL) {
			target = global$p;
		} else if (STATIC) {
			target = global$p[TARGET] || defineGlobalProperty(TARGET, {});
		} else {
			target = (global$p[TARGET] || {}).prototype;
		}
		if (target) for (key in source) {
			sourceProperty = source[key];
			if (options.dontCallGetSet) {
				descriptor = getOwnPropertyDescriptor$2(target, key);
				targetProperty = descriptor && descriptor.value;
			} else targetProperty = target[key];
			FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
			if (!FORCED && targetProperty !== undefined) {
				if (typeof sourceProperty == typeof targetProperty) continue;
				copyConstructorProperties$2(sourceProperty, targetProperty);
			}
			if (options.sham || (targetProperty && targetProperty.sham)) {
				createNonEnumerableProperty$7(sourceProperty, 'sham', true);
			}
			defineBuiltIn$b(target, key, sourceProperty, options);
		}
	};
	getDefaultExportFromCjs(_export);

	var wellKnownSymbol$n = wellKnownSymbol$p;
	var TO_STRING_TAG$4 = wellKnownSymbol$n('toStringTag');
	var test$1 = {};
	test$1[TO_STRING_TAG$4] = 'z';
	var toStringTagSupport = String(test$1) === '[object z]';
	getDefaultExportFromCjs(toStringTagSupport);

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$g = isCallable$r;
	var classofRaw$1 = classofRaw$2;
	var wellKnownSymbol$m = wellKnownSymbol$p;
	var TO_STRING_TAG$3 = wellKnownSymbol$m('toStringTag');
	var $Object$1 = Object;
	var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';
	var tryGet = function (it, key) {
		try {
			return it[key];
		} catch (error) { }
	};
	var classof$d = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
		var O, tag, result;
		return it === undefined ? 'Undefined' : it === null ? 'Null'
			: typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$3)) == 'string' ? tag
				: CORRECT_ARGUMENTS ? classofRaw$1(O)
					: (result = classofRaw$1(O)) == 'Object' && isCallable$g(O.callee) ? 'Arguments' : result;
	};
	getDefaultExportFromCjs(classof$d);

	var classof$c = classof$d;
	var $String$2 = String;
	var toString$b = function (argument) {
		if (classof$c(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
		return $String$2(argument);
	};
	getDefaultExportFromCjs(toString$b);

	var anObject$c = anObject$f;
	var regexpFlags$1 = function () {
		var that = anObject$c(this);
		var result = '';
		if (that.hasIndices) result += 'd';
		if (that.global) result += 'g';
		if (that.ignoreCase) result += 'i';
		if (that.multiline) result += 'm';
		if (that.dotAll) result += 's';
		if (that.unicode) result += 'u';
		if (that.unicodeSets) result += 'v';
		if (that.sticky) result += 'y';
		return result;
	};
	getDefaultExportFromCjs(regexpFlags$1);

	var fails$s = fails$B;
	var global$o = global$y;
	var $RegExp$2 = global$o.RegExp;
	var UNSUPPORTED_Y$1 = fails$s(function () {
		var re = $RegExp$2('a', 'y');
		re.lastIndex = 2;
		return re.exec('abcd') != null;
	});
	var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$s(function () {
		return !$RegExp$2('a', 'y').sticky;
	});
	var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$s(function () {
		var re = $RegExp$2('^r', 'gy');
		re.lastIndex = 2;
		return re.exec('str') != null;
	});
	var regexpStickyHelpers = {
		BROKEN_CARET: BROKEN_CARET,
		MISSED_STICKY: MISSED_STICKY,
		UNSUPPORTED_Y: UNSUPPORTED_Y$1
	};
	getDefaultExportFromCjs(regexpStickyHelpers);

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;
	var objectKeys$3 = Object.keys || function keys(O) {
		return internalObjectKeys(O, enumBugKeys$1);
	};
	getDefaultExportFromCjs(objectKeys$3);

	var DESCRIPTORS$b = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$b = anObject$f;
	var toIndexedObject$7 = toIndexedObject$b;
	var objectKeys$2 = objectKeys$3;
	objectDefineProperties.f = DESCRIPTORS$b && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
		anObject$b(O);
		var props = toIndexedObject$7(Properties);
		var keys = objectKeys$2(Properties);
		var length = keys.length;
		var index = 0;
		var key;
		while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
		return O;
	};

	var getBuiltIn$7 = getBuiltIn$a;
	var html$2 = getBuiltIn$7('document', 'documentElement');
	getDefaultExportFromCjs(html$2);

	var anObject$a = anObject$f;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$1 = hiddenKeys$5;
	var html$1 = html$2;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$2 = sharedKey$4;
	var GT = '>';
	var LT = '<';
	var PROTOTYPE$2 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$2('IE_PROTO');
	var EmptyConstructor = function () { };
	var scriptTag = function (content) {
		return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};
	var NullProtoObjectViaActiveX = function (activeXDocument) {
		activeXDocument.write(scriptTag(''));
		activeXDocument.close();
		var temp = activeXDocument.parentWindow.Object;
		activeXDocument = null;
		return temp;
	};
	var NullProtoObjectViaIFrame = function () {
		var iframe = documentCreateElement$1('iframe');
		var JS = 'java' + SCRIPT + ':';
		var iframeDocument;
		iframe.style.display = 'none';
		html$1.appendChild(iframe);
		iframe.src = String(JS);
		iframeDocument = iframe.contentWindow.document;
		iframeDocument.open();
		iframeDocument.write(scriptTag('document.F=Object'));
		iframeDocument.close();
		return iframeDocument.F;
	};
	var activeXDocument;
	var NullProtoObject = function () {
		try {
			activeXDocument = new ActiveXObject('htmlfile');
		} catch (error) { }
		NullProtoObject = typeof document != 'undefined'
			? document.domain && activeXDocument
				? NullProtoObjectViaActiveX(activeXDocument)
				: NullProtoObjectViaIFrame()
			: NullProtoObjectViaActiveX(activeXDocument);
		var length = enumBugKeys.length;
		while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
		return NullProtoObject();
	};
	hiddenKeys$1[IE_PROTO$1] = true;
	var objectCreate = Object.create || function create(O, Properties) {
		var result;
		if (O !== null) {
			EmptyConstructor[PROTOTYPE$2] = anObject$a(O);
			result = new EmptyConstructor();
			EmptyConstructor[PROTOTYPE$2] = null;
			result[IE_PROTO$1] = O;
		} else result = NullProtoObject();
		return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};
	getDefaultExportFromCjs(objectCreate);

	var fails$r = fails$B;
	var global$n = global$y;
	var $RegExp$1 = global$n.RegExp;
	var regexpUnsupportedDotAll = fails$r(function () {
		var re = $RegExp$1('.', 's');
		return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});
	getDefaultExportFromCjs(regexpUnsupportedDotAll);

	var fails$q = fails$B;
	var global$m = global$y;
	var $RegExp = global$m.RegExp;
	var regexpUnsupportedNcg = fails$q(function () {
		var re = $RegExp('(?<a>b)', 'g');
		return re.exec('b').groups.a !== 'b' ||
			'b'.replace(re, '$<a>c') !== 'bc';
	});
	getDefaultExportFromCjs(regexpUnsupportedNcg);

	var call$k = functionCall;
	var uncurryThis$r = functionUncurryThis;
	var toString$a = toString$b;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared$3 = sharedExports;
	var create$3 = objectCreate;
	var getInternalState$5 = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;
	var nativeReplace = shared$3('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$5 = uncurryThis$r(''.charAt);
	var indexOf = uncurryThis$r(''.indexOf);
	var replace$4 = uncurryThis$r(''.replace);
	var stringSlice$5 = uncurryThis$r(''.slice);
	var UPDATES_LAST_INDEX_WRONG = (function () {
		var re1 = /a/;
		var re2 = /b*/g;
		call$k(nativeExec, re1, 'a');
		call$k(nativeExec, re2, 'a');
		return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();
	var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
	if (PATCH) {
		patchedExec = function exec(string) {
			var re = this;
			var state = getInternalState$5(re);
			var str = toString$a(string);
			var raw = state.raw;
			var result, reCopy, lastIndex, match, i, object, group;
			if (raw) {
				raw.lastIndex = re.lastIndex;
				result = call$k(patchedExec, raw, str);
				re.lastIndex = raw.lastIndex;
				return result;
			}
			var groups = state.groups;
			var sticky = UNSUPPORTED_Y && re.sticky;
			var flags = call$k(regexpFlags, re);
			var source = re.source;
			var charsAdded = 0;
			var strCopy = str;
			if (sticky) {
				flags = replace$4(flags, 'y', '');
				if (indexOf(flags, 'g') === -1) {
					flags += 'g';
				}
				strCopy = stringSlice$5(str, re.lastIndex);
				if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$5(str, re.lastIndex - 1) !== '\n')) {
					source = '(?: ' + source + ')';
					strCopy = ' ' + strCopy;
					charsAdded++;
				}
				reCopy = new RegExp('^(?:' + source + ')', flags);
			}
			if (NPCG_INCLUDED) {
				reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
			}
			if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
			match = call$k(nativeExec, sticky ? reCopy : re, strCopy);
			if (sticky) {
				if (match) {
					match.input = stringSlice$5(match.input, charsAdded);
					match[0] = stringSlice$5(match[0], charsAdded);
					match.index = re.lastIndex;
					re.lastIndex += match[0].length;
				} else re.lastIndex = 0;
			} else if (UPDATES_LAST_INDEX_WRONG && match) {
				re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
			}
			if (NPCG_INCLUDED && match && match.length > 1) {
				call$k(nativeReplace, match[0], reCopy, function () {
					for (i = 1; i < arguments.length - 2; i++) {
						if (arguments[i] === undefined) match[i] = undefined;
					}
				});
			}
			if (match && groups) {
				match.groups = object = create$3(null);
				for (i = 0; i < groups.length; i++) {
					group = groups[i];
					object[group[0]] = match[group[1]];
				}
			}
			return match;
		};
	}
	var regexpExec$2 = patchedExec;
	getDefaultExportFromCjs(regexpExec$2);

	var $$n = _export;
	var exec$2 = regexpExec$2;
	$$n({ target: 'RegExp', proto: true, forced: /./.exec !== exec$2 }, {
		exec: exec$2
	});

	var NATIVE_BIND$1 = functionBindNative;
	var FunctionPrototype$1 = Function.prototype;
	var apply$6 = FunctionPrototype$1.apply;
	var call$j = FunctionPrototype$1.call;
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$j.bind(apply$6) : function () {
		return call$j.apply(apply$6, arguments);
	});
	getDefaultExportFromCjs(functionApply);

	var classofRaw = classofRaw$2;
	var uncurryThis$q = functionUncurryThis;
	var functionUncurryThisClause = function (fn) {
		if (classofRaw(fn) === 'Function') return uncurryThis$q(fn);
	};
	getDefaultExportFromCjs(functionUncurryThisClause);

	var uncurryThis$p = functionUncurryThisClause;
	var defineBuiltIn$a = defineBuiltIn$c;
	var regexpExec$1 = regexpExec$2;
	var fails$p = fails$B;
	var wellKnownSymbol$l = wellKnownSymbol$p;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
	var SPECIES$6 = wellKnownSymbol$l('species');
	var RegExpPrototype$2 = RegExp.prototype;
	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
		var SYMBOL = wellKnownSymbol$l(KEY);
		var DELEGATES_TO_SYMBOL = !fails$p(function () {
			var O = {};
			O[SYMBOL] = function () { return 7; };
			return ''[KEY](O) != 7;
		});
		var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$p(function () {
			var execCalled = false;
			var re = /a/;
			if (KEY === 'split') {
				re = {};
				re.constructor = {};
				re.constructor[SPECIES$6] = function () { return re; };
				re.flags = '';
				re[SYMBOL] = /./[SYMBOL];
			}
			re.exec = function () { execCalled = true; return null; };
			re[SYMBOL]('');
			return !execCalled;
		});
		if (
			!DELEGATES_TO_SYMBOL ||
			!DELEGATES_TO_EXEC ||
			FORCED
		) {
			var uncurriedNativeRegExpMethod = uncurryThis$p(/./[SYMBOL]);
			var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
				var uncurriedNativeMethod = uncurryThis$p(nativeMethod);
				var $exec = regexp.exec;
				if ($exec === regexpExec$1 || $exec === RegExpPrototype$2.exec) {
					if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
						return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
					}
					return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
				}
				return { done: false };
			});
			defineBuiltIn$a(String.prototype, KEY, methods[0]);
			defineBuiltIn$a(RegExpPrototype$2, SYMBOL, methods[1]);
		}
		if (SHAM) createNonEnumerableProperty$6(RegExpPrototype$2[SYMBOL], 'sham', true);
	};
	getDefaultExportFromCjs(fixRegexpWellKnownSymbolLogic);

	var uncurryThis$o = functionUncurryThis;
	var toIntegerOrInfinity$6 = toIntegerOrInfinity$9;
	var toString$9 = toString$b;
	var requireObjectCoercible$2 = requireObjectCoercible$5;
	var charAt$4 = uncurryThis$o(''.charAt);
	var charCodeAt$2 = uncurryThis$o(''.charCodeAt);
	var stringSlice$4 = uncurryThis$o(''.slice);
	var createMethod$3 = function (CONVERT_TO_STRING) {
		return function ($this, pos) {
			var S = toString$9(requireObjectCoercible$2($this));
			var position = toIntegerOrInfinity$6(pos);
			var size = S.length;
			var first, second;
			if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
			first = charCodeAt$2(S, position);
			return first < 0xD800 || first > 0xDBFF || position + 1 === size
				|| (second = charCodeAt$2(S, position + 1)) < 0xDC00 || second > 0xDFFF
				? CONVERT_TO_STRING
					? charAt$4(S, position)
					: first
				: CONVERT_TO_STRING
					? stringSlice$4(S, position, position + 2)
					: (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
		};
	};
	var stringMultibyte = {
		codeAt: createMethod$3(false),
		charAt: createMethod$3(true)
	};
	getDefaultExportFromCjs(stringMultibyte);

	var charAt$3 = stringMultibyte.charAt;
	var advanceStringIndex$1 = function (S, index, unicode) {
		return index + (unicode ? charAt$3(S, index).length : 1);
	};
	getDefaultExportFromCjs(advanceStringIndex$1);

	var uncurryThis$n = functionUncurryThis;
	var toObject$a = toObject$c;
	var floor$4 = Math.floor;
	var charAt$2 = uncurryThis$n(''.charAt);
	var replace$3 = uncurryThis$n(''.replace);
	var stringSlice$3 = uncurryThis$n(''.slice);
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
		var tailPos = position + matched.length;
		var m = captures.length;
		var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
		if (namedCaptures !== undefined) {
			namedCaptures = toObject$a(namedCaptures);
			symbols = SUBSTITUTION_SYMBOLS;
		}
		return replace$3(replacement, symbols, function (match, ch) {
			var capture;
			switch (charAt$2(ch, 0)) {
				case '$': return '$';
				case '&': return matched;
				case '`': return stringSlice$3(str, 0, position);
				case "'": return stringSlice$3(str, tailPos);
				case '<':
					capture = namedCaptures[stringSlice$3(ch, 1, -1)];
					break;
				default:
					var n = +ch;
					if (n === 0) return match;
					if (n > m) {
						var f = floor$4(n / 10);
						if (f === 0) return match;
						if (f <= m) return captures[f - 1] === undefined ? charAt$2(ch, 1) : captures[f - 1] + charAt$2(ch, 1);
						return match;
					}
					capture = captures[n - 1];
			}
			return capture === undefined ? '' : capture;
		});
	};
	getDefaultExportFromCjs(getSubstitution$1);

	var call$i = functionCall;
	var anObject$9 = anObject$f;
	var isCallable$f = isCallable$r;
	var classof$b = classofRaw$2;
	var regexpExec = regexpExec$2;
	var $TypeError$b = TypeError;
	var regexpExecAbstract = function (R, S) {
		var exec = R.exec;
		if (isCallable$f(exec)) {
			var result = call$i(exec, R, S);
			if (result !== null) anObject$9(result);
			return result;
		}
		if (classof$b(R) === 'RegExp') return call$i(regexpExec, R, S);
		throw $TypeError$b('RegExp#exec called on incompatible receiver');
	};
	getDefaultExportFromCjs(regexpExecAbstract);

	var apply$5 = functionApply;
	var call$h = functionCall;
	var uncurryThis$m = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var fails$o = fails$B;
	var anObject$8 = anObject$f;
	var isCallable$e = isCallable$r;
	var isNullOrUndefined$2 = isNullOrUndefined$5;
	var toIntegerOrInfinity$5 = toIntegerOrInfinity$9;
	var toLength$4 = toLength$6;
	var toString$8 = toString$b;
	var requireObjectCoercible$1 = requireObjectCoercible$5;
	var advanceStringIndex = advanceStringIndex$1;
	var getMethod$2 = getMethod$4;
	var getSubstitution = getSubstitution$1;
	var regExpExec$1 = regexpExecAbstract;
	var wellKnownSymbol$k = wellKnownSymbol$p;
	var REPLACE = wellKnownSymbol$k('replace');
	var max$2 = Math.max;
	var min$2 = Math.min;
	var concat$1 = uncurryThis$m([].concat);
	var push$4 = uncurryThis$m([].push);
	var stringIndexOf = uncurryThis$m(''.indexOf);
	var stringSlice$2 = uncurryThis$m(''.slice);
	var maybeToString = function (it) {
		return it === undefined ? it : String(it);
	};
	var REPLACE_KEEPS_$0 = (function () {
		return 'a'.replace(/./, '$0') === '$0';
	})();
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
		if (/./[REPLACE]) {
			return /./[REPLACE]('a', '$0') === '';
		}
		return false;
	})();
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$o(function () {
		var re = /./;
		re.exec = function () {
			var result = [];
			result.groups = { a: '7' };
			return result;
		};
		return ''.replace(re, '$<a>') !== '7';
	});
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
		var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
		return [
			function replace(searchValue, replaceValue) {
				var O = requireObjectCoercible$1(this);
				var replacer = isNullOrUndefined$2(searchValue) ? undefined : getMethod$2(searchValue, REPLACE);
				return replacer
					? call$h(replacer, searchValue, O, replaceValue)
					: call$h(nativeReplace, toString$8(O), searchValue, replaceValue);
			},
			function (string, replaceValue) {
				var rx = anObject$8(this);
				var S = toString$8(string);
				if (
					typeof replaceValue == 'string' &&
					stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
					stringIndexOf(replaceValue, '$<') === -1
				) {
					var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
					if (res.done) return res.value;
				}
				var functionalReplace = isCallable$e(replaceValue);
				if (!functionalReplace) replaceValue = toString$8(replaceValue);
				var global = rx.global;
				if (global) {
					var fullUnicode = rx.unicode;
					rx.lastIndex = 0;
				}
				var results = [];
				while (true) {
					var result = regExpExec$1(rx, S);
					if (result === null) break;
					push$4(results, result);
					if (!global) break;
					var matchStr = toString$8(result[0]);
					if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$4(rx.lastIndex), fullUnicode);
				}
				var accumulatedResult = '';
				var nextSourcePosition = 0;
				for (var i = 0; i < results.length; i++) {
					result = results[i];
					var matched = toString$8(result[0]);
					var position = max$2(min$2(toIntegerOrInfinity$5(result.index), S.length), 0);
					var captures = [];
					for (var j = 1; j < result.length; j++) push$4(captures, maybeToString(result[j]));
					var namedCaptures = result.groups;
					if (functionalReplace) {
						var replacerArgs = concat$1([matched], captures, position, S);
						if (namedCaptures !== undefined) push$4(replacerArgs, namedCaptures);
						var replacement = toString$8(apply$5(replaceValue, undefined, replacerArgs));
					} else {
						replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
					}
					if (position >= nextSourcePosition) {
						accumulatedResult += stringSlice$2(S, nextSourcePosition, position) + replacement;
						nextSourcePosition = position + matched.length;
					}
				}
				return accumulatedResult + stringSlice$2(S, nextSourcePosition);
			}
		];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$a = classof$d;
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
		return '[object ' + classof$a(this) + ']';
	};
	getDefaultExportFromCjs(objectToString);

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$9 = defineBuiltIn$c;
	var toString$7 = objectToString;
	if (!TO_STRING_TAG_SUPPORT) {
		defineBuiltIn$9(Object.prototype, 'toString', toString$7, { unsafe: true });
	}

	var domIterables = {
		CSSRuleList: 0,
		CSSStyleDeclaration: 0,
		CSSValueList: 0,
		ClientRectList: 0,
		DOMRectList: 0,
		DOMStringList: 0,
		DOMTokenList: 1,
		DataTransferItemList: 0,
		FileList: 0,
		HTMLAllCollection: 0,
		HTMLCollection: 0,
		HTMLFormElement: 0,
		HTMLSelectElement: 0,
		MediaList: 0,
		MimeTypeArray: 0,
		NamedNodeMap: 0,
		NodeList: 1,
		PaintRequestList: 0,
		Plugin: 0,
		PluginArray: 0,
		SVGLengthList: 0,
		SVGNumberList: 0,
		SVGPathSegList: 0,
		SVGPointList: 0,
		SVGStringList: 0,
		SVGTransformList: 0,
		SourceBufferList: 0,
		StyleSheetList: 0,
		TextTrackCueList: 0,
		TextTrackList: 0,
		TouchList: 0
	};
	getDefaultExportFromCjs(domIterables);

	var documentCreateElement = documentCreateElement$2;
	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;
	var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;
	getDefaultExportFromCjs(domTokenListPrototype);

	var uncurryThis$l = functionUncurryThisClause;
	var aCallable$9 = aCallable$b;
	var NATIVE_BIND = functionBindNative;
	var bind$6 = uncurryThis$l(uncurryThis$l.bind);
	var functionBindContext = function (fn, that) {
		aCallable$9(fn);
		return that === undefined ? fn : NATIVE_BIND ? bind$6(fn, that) : function () {
			return fn.apply(that, arguments);
		};
	};
	getDefaultExportFromCjs(functionBindContext);

	var classof$9 = classofRaw$2;
	var isArray$4 = Array.isArray || function isArray(argument) {
		return classof$9(argument) == 'Array';
	};
	getDefaultExportFromCjs(isArray$4);

	var uncurryThis$k = functionUncurryThis;
	var fails$n = fails$B;
	var isCallable$d = isCallable$r;
	var classof$8 = classof$d;
	var getBuiltIn$6 = getBuiltIn$a;
	var inspectSource$1 = inspectSource$3;
	var noop = function () { };
	var empty = [];
	var construct = getBuiltIn$6('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$1 = uncurryThis$k(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
	var isConstructorModern = function isConstructor(argument) {
		if (!isCallable$d(argument)) return false;
		try {
			construct(noop, empty, argument);
			return true;
		} catch (error) {
			return false;
		}
	};
	var isConstructorLegacy = function isConstructor(argument) {
		if (!isCallable$d(argument)) return false;
		switch (classof$8(argument)) {
			case 'AsyncFunction':
			case 'GeneratorFunction':
			case 'AsyncGeneratorFunction': return false;
		}
		try {
			return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
		} catch (error) {
			return true;
		}
	};
	isConstructorLegacy.sham = true;
	var isConstructor$3 = !construct || fails$n(function () {
		var called;
		return isConstructorModern(isConstructorModern.call)
			|| !isConstructorModern(Object)
			|| !isConstructorModern(function () { called = true; })
			|| called;
	}) ? isConstructorLegacy : isConstructorModern;
	getDefaultExportFromCjs(isConstructor$3);

	var isArray$3 = isArray$4;
	var isConstructor$2 = isConstructor$3;
	var isObject$9 = isObject$f;
	var wellKnownSymbol$j = wellKnownSymbol$p;
	var SPECIES$5 = wellKnownSymbol$j('species');
	var $Array$3 = Array;
	var arraySpeciesConstructor$1 = function (originalArray) {
		var C;
		if (isArray$3(originalArray)) {
			C = originalArray.constructor;
			if (isConstructor$2(C) && (C === $Array$3 || isArray$3(C.prototype))) C = undefined;
			else if (isObject$9(C)) {
				C = C[SPECIES$5];
				if (C === null) C = undefined;
			}
		} return C === undefined ? $Array$3 : C;
	};
	getDefaultExportFromCjs(arraySpeciesConstructor$1);

	var arraySpeciesConstructor = arraySpeciesConstructor$1;
	var arraySpeciesCreate$2 = function (originalArray, length) {
		return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};
	getDefaultExportFromCjs(arraySpeciesCreate$2);

	var bind$5 = functionBindContext;
	var uncurryThis$j = functionUncurryThis;
	var IndexedObject$2 = indexedObject;
	var toObject$9 = toObject$c;
	var lengthOfArrayLike$d = lengthOfArrayLike$f;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var push$3 = uncurryThis$j([].push);
	var createMethod$2 = function (TYPE) {
		var IS_MAP = TYPE == 1;
		var IS_FILTER = TYPE == 2;
		var IS_SOME = TYPE == 3;
		var IS_EVERY = TYPE == 4;
		var IS_FIND_INDEX = TYPE == 6;
		var IS_FILTER_REJECT = TYPE == 7;
		var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
		return function ($this, callbackfn, that, specificCreate) {
			var O = toObject$9($this);
			var self = IndexedObject$2(O);
			var boundFunction = bind$5(callbackfn, that);
			var length = lengthOfArrayLike$d(self);
			var index = 0;
			var create = specificCreate || arraySpeciesCreate$1;
			var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
			var value, result;
			for (; length > index; index++) if (NO_HOLES || index in self) {
				value = self[index];
				result = boundFunction(value, index, O);
				if (TYPE) {
					if (IS_MAP) target[index] = result;
					else if (result) switch (TYPE) {
						case 3: return true;
						case 5: return value;
						case 6: return index;
						case 2: push$3(target, value);
					} else switch (TYPE) {
						case 4: return false;
						case 7: push$3(target, value);
					}
				}
			}
			return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
		};
	};
	var arrayIteration = {
		forEach: createMethod$2(0),
		map: createMethod$2(1),
		filter: createMethod$2(2),
		some: createMethod$2(3),
		every: createMethod$2(4),
		find: createMethod$2(5),
		findIndex: createMethod$2(6),
		filterReject: createMethod$2(7)
	};
	getDefaultExportFromCjs(arrayIteration);

	var fails$m = fails$B;
	var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
		var method = [][METHOD_NAME];
		return !!method && fails$m(function () {
			method.call(null, argument || function () { return 1; }, 1);
		});
	};
	getDefaultExportFromCjs(arrayMethodIsStrict$3);

	var $forEach$2 = arrayIteration.forEach;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;
	var STRICT_METHOD$2 = arrayMethodIsStrict$2('forEach');
	var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn) {
		return $forEach$2(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;
	getDefaultExportFromCjs(arrayForEach);

	var global$l = global$y;
	var DOMIterables$1 = domIterables;
	var DOMTokenListPrototype$1 = domTokenListPrototype;
	var forEach$1 = arrayForEach;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
	var handlePrototype$1 = function (CollectionPrototype) {
		if (CollectionPrototype && CollectionPrototype.forEach !== forEach$1) try {
			createNonEnumerableProperty$5(CollectionPrototype, 'forEach', forEach$1);
		} catch (error) {
			CollectionPrototype.forEach = forEach$1;
		}
	};
	for (var COLLECTION_NAME$1 in DOMIterables$1) {
		if (DOMIterables$1[COLLECTION_NAME$1]) {
			handlePrototype$1(global$l[COLLECTION_NAME$1] && global$l[COLLECTION_NAME$1].prototype);
		}
	}
	handlePrototype$1(DOMTokenListPrototype$1);

	var toPropertyKey$2 = toPropertyKey$5;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$6;
	var createProperty$3 = function (object, key, value) {
		var propertyKey = toPropertyKey$2(key);
		if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$3(0, value));
		else object[propertyKey] = value;
	};
	getDefaultExportFromCjs(createProperty$3);

	var fails$l = fails$B;
	var wellKnownSymbol$i = wellKnownSymbol$p;
	var V8_VERSION$2 = engineV8Version;
	var SPECIES$4 = wellKnownSymbol$i('species');
	var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
		return V8_VERSION$2 >= 51 || !fails$l(function () {
			var array = [];
			var constructor = array.constructor = {};
			constructor[SPECIES$4] = function () {
				return { foo: 1 };
			};
			return array[METHOD_NAME](Boolean).foo !== 1;
		});
	};
	getDefaultExportFromCjs(arrayMethodHasSpeciesSupport$4);

	var uncurryThis$i = functionUncurryThis;
	var arraySlice$7 = uncurryThis$i([].slice);
	getDefaultExportFromCjs(arraySlice$7);

	var $$m = _export;
	var isArray$2 = isArray$4;
	var isConstructor$1 = isConstructor$3;
	var isObject$8 = isObject$f;
	var toAbsoluteIndex$4 = toAbsoluteIndex$6;
	var lengthOfArrayLike$c = lengthOfArrayLike$f;
	var toIndexedObject$6 = toIndexedObject$b;
	var createProperty$2 = createProperty$3;
	var wellKnownSymbol$h = wellKnownSymbol$p;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
	var nativeSlice = arraySlice$7;
	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('slice');
	var SPECIES$3 = wellKnownSymbol$h('species');
	var $Array$2 = Array;
	var max$1 = Math.max;
	$$m({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
		slice: function slice(start, end) {
			var O = toIndexedObject$6(this);
			var length = lengthOfArrayLike$c(O);
			var k = toAbsoluteIndex$4(start, length);
			var fin = toAbsoluteIndex$4(end === undefined ? length : end, length);
			var Constructor, result, n;
			if (isArray$2(O)) {
				Constructor = O.constructor;
				if (isConstructor$1(Constructor) && (Constructor === $Array$2 || isArray$2(Constructor.prototype))) {
					Constructor = undefined;
				} else if (isObject$8(Constructor)) {
					Constructor = Constructor[SPECIES$3];
					if (Constructor === null) Constructor = undefined;
				}
				if (Constructor === $Array$2 || Constructor === undefined) {
					return nativeSlice(O, k, fin);
				}
			}
			result = new (Constructor === undefined ? $Array$2 : Constructor)(max$1(fin - k, 0));
			for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
			result.length = n;
			return result;
		}
	});

	var $$l = _export;
	var $map$1 = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('map');
	$$l({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
		map: function map(callbackfn) {
			return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
		}
	});

	var Mode;
	(function (Mode) {
		Mode[Mode['Terminator'] = 0] = 'Terminator';
		Mode[Mode['Numeric'] = 1] = 'Numeric';
		Mode[Mode['Alphanumeric'] = 2] = 'Alphanumeric';
		Mode[Mode['StructuredAppend'] = 3] = 'StructuredAppend';
		Mode[Mode['Byte'] = 4] = 'Byte';
		Mode[Mode['Kanji'] = 8] = 'Kanji';
		Mode[Mode['ECI'] = 7] = 'ECI';
	})(Mode || (Mode = {}));

	var DESCRIPTORS$a = descriptors;
	var uncurryThis$h = functionUncurryThis;
	var call$g = functionCall;
	var fails$k = fails$B;
	var objectKeys$1 = objectKeys$3;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var toObject$8 = toObject$c;
	var IndexedObject$1 = indexedObject;
	var $assign = Object.assign;
	var defineProperty$6 = Object.defineProperty;
	var concat = uncurryThis$h([].concat);
	var objectAssign = !$assign || fails$k(function () {
		if (DESCRIPTORS$a && $assign({ b: 1 }, $assign(defineProperty$6({}, 'a', {
			enumerable: true,
			get: function () {
				defineProperty$6(this, 'b', {
					value: 3,
					enumerable: false
				});
			}
		}), { b: 2 })).b !== 1) return true;
		var A = {};
		var B = {};
		var symbol = Symbol();
		var alphabet = 'abcdefghijklmnopqrst';
		A[symbol] = 7;
		alphabet.split('').forEach(function (chr) { B[chr] = chr; });
		return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
		var T = toObject$8(target);
		var argumentsLength = arguments.length;
		var index = 1;
		var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
		var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
		while (argumentsLength > index) {
			var S = IndexedObject$1(arguments[index++]);
			var keys = getOwnPropertySymbols ? concat(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
			var length = keys.length;
			var j = 0;
			var key;
			while (length > j) {
				key = keys[j++];
				if (!DESCRIPTORS$a || call$g(propertyIsEnumerable, S, key)) T[key] = S[key];
			}
		} return T;
	} : $assign;
	getDefaultExportFromCjs(objectAssign);

	var $$k = _export;
	var assign = objectAssign;
	$$k({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
		assign: assign
	});

	var objectGetOwnPropertyNamesExternal = {};

	var toAbsoluteIndex$3 = toAbsoluteIndex$6;
	var lengthOfArrayLike$b = lengthOfArrayLike$f;
	var createProperty$1 = createProperty$3;
	var $Array$1 = Array;
	var max = Math.max;
	var arraySliceSimple = function (O, start, end) {
		var length = lengthOfArrayLike$b(O);
		var k = toAbsoluteIndex$3(start, length);
		var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
		var result = $Array$1(max(fin - k, 0));
		for (var n = 0; k < fin; k++, n++) createProperty$1(result, n, O[k]);
		result.length = n;
		return result;
	};
	getDefaultExportFromCjs(arraySliceSimple);

	var classof$7 = classofRaw$2;
	var toIndexedObject$5 = toIndexedObject$b;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$6 = arraySliceSimple;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
		? Object.getOwnPropertyNames(window) : [];
	var getWindowNames = function (it) {
		try {
			return $getOwnPropertyNames$1(it);
		} catch (error) {
			return arraySlice$6(windowNames);
		}
	};
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
		return windowNames && classof$7(it) == 'Window'
			? getWindowNames(it)
			: $getOwnPropertyNames$1(toIndexedObject$5(it));
	};

	var makeBuiltIn = makeBuiltInExports;
	var defineProperty$5 = objectDefineProperty;
	var defineBuiltInAccessor$7 = function (target, name, descriptor) {
		if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
		if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
		return defineProperty$5.f(target, name, descriptor);
	};
	getDefaultExportFromCjs(defineBuiltInAccessor$7);

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$g = wellKnownSymbol$p;
	wellKnownSymbolWrapped.f = wellKnownSymbol$g;

	var global$k = global$y;
	var path$2 = global$k;
	getDefaultExportFromCjs(path$2);

	var path$1 = path$2;
	var hasOwn$b = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$4 = objectDefineProperty.f;
	var wellKnownSymbolDefine = function (NAME) {
		var Symbol = path$1.Symbol || (path$1.Symbol = {});
		if (!hasOwn$b(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
			value: wrappedWellKnownSymbolModule$1.f(NAME)
		});
	};
	getDefaultExportFromCjs(wellKnownSymbolDefine);

	var call$f = functionCall;
	var getBuiltIn$5 = getBuiltIn$a;
	var wellKnownSymbol$f = wellKnownSymbol$p;
	var defineBuiltIn$8 = defineBuiltIn$c;
	var symbolDefineToPrimitive = function () {
		var Symbol = getBuiltIn$5('Symbol');
		var SymbolPrototype = Symbol && Symbol.prototype;
		var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
		var TO_PRIMITIVE = wellKnownSymbol$f('toPrimitive');
		if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
			defineBuiltIn$8(SymbolPrototype, TO_PRIMITIVE, function (hint) {
				return call$f(valueOf, this);
			}, { arity: 1 });
		}
	};
	getDefaultExportFromCjs(symbolDefineToPrimitive);

	var defineProperty$3 = objectDefineProperty.f;
	var hasOwn$a = hasOwnProperty_1;
	var wellKnownSymbol$e = wellKnownSymbol$p;
	var TO_STRING_TAG$2 = wellKnownSymbol$e('toStringTag');
	var setToStringTag$6 = function (target, TAG, STATIC) {
		if (target && !STATIC) target = target.prototype;
		if (target && !hasOwn$a(target, TO_STRING_TAG$2)) {
			defineProperty$3(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
		}
	};
	getDefaultExportFromCjs(setToStringTag$6);

	var $$j = _export;
	var global$j = global$y;
	var call$e = functionCall;
	var uncurryThis$g = functionUncurryThis;
	var DESCRIPTORS$9 = descriptors;
	var NATIVE_SYMBOL$4 = symbolConstructorDetection;
	var fails$j = fails$B;
	var hasOwn$9 = hasOwnProperty_1;
	var isPrototypeOf$7 = objectIsPrototypeOf;
	var anObject$7 = anObject$f;
	var toIndexedObject$4 = toIndexedObject$b;
	var toPropertyKey$1 = toPropertyKey$5;
	var $toString$1 = toString$b;
	var createPropertyDescriptor$2 = createPropertyDescriptor$6;
	var nativeObjectCreate = objectCreate;
	var objectKeys = objectKeys$3;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$1 = objectDefineProperty;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var defineBuiltIn$7 = defineBuiltIn$c;
	var defineBuiltInAccessor$6 = defineBuiltInAccessor$7;
	var shared$2 = sharedExports;
	var sharedKey$1 = sharedKey$4;
	var hiddenKeys = hiddenKeys$5;
	var uid$1 = uid$4;
	var wellKnownSymbol$d = wellKnownSymbol$p;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$2 = wellKnownSymbolDefine;
	var defineSymbolToPrimitive = symbolDefineToPrimitive;
	var setToStringTag$5 = setToStringTag$6;
	var InternalStateModule$6 = internalState;
	var $forEach$1 = arrayIteration.forEach;
	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var setInternalState$5 = InternalStateModule$6.set;
	var getInternalState$4 = InternalStateModule$6.getterFor(SYMBOL);
	var ObjectPrototype$3 = Object[PROTOTYPE$1];
	var $Symbol = global$j.Symbol;
	var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE$1];
	var TypeError$4 = global$j.TypeError;
	var QObject = global$j.QObject;
	var nativeGetOwnPropertyDescriptor$2 = getOwnPropertyDescriptorModule$1.f;
	var nativeDefineProperty$1 = definePropertyModule$1.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var push$2 = uncurryThis$g([].push);
	var AllSymbols = shared$2('symbols');
	var ObjectPrototypeSymbols = shared$2('op-symbols');
	var WellKnownSymbolsStore = shared$2('wks');
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;
	var setSymbolDescriptor = DESCRIPTORS$9 && fails$j(function () {
		return nativeObjectCreate(nativeDefineProperty$1({}, 'a', {
			get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
		})).a != 7;
	}) ? function (O, P, Attributes) {
		var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$3, P);
		if (ObjectPrototypeDescriptor) delete ObjectPrototype$3[P];
		nativeDefineProperty$1(O, P, Attributes);
		if (ObjectPrototypeDescriptor && O !== ObjectPrototype$3) {
			nativeDefineProperty$1(ObjectPrototype$3, P, ObjectPrototypeDescriptor);
		}
	} : nativeDefineProperty$1;
	var wrap = function (tag, description) {
		var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
		setInternalState$5(symbol, {
			type: SYMBOL,
			tag: tag,
			description: description
		});
		if (!DESCRIPTORS$9) symbol.description = description;
		return symbol;
	};
	var $defineProperty = function defineProperty(O, P, Attributes) {
		if (O === ObjectPrototype$3) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
		anObject$7(O);
		var key = toPropertyKey$1(P);
		anObject$7(Attributes);
		if (hasOwn$9(AllSymbols, key)) {
			if (!Attributes.enumerable) {
				if (!hasOwn$9(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$2(1, {}));
				O[HIDDEN][key] = true;
			} else {
				if (hasOwn$9(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
				Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$2(0, false) });
			} return setSymbolDescriptor(O, key, Attributes);
		} return nativeDefineProperty$1(O, key, Attributes);
	};
	var $defineProperties = function defineProperties(O, Properties) {
		anObject$7(O);
		var properties = toIndexedObject$4(Properties);
		var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
		$forEach$1(keys, function (key) {
			if (!DESCRIPTORS$9 || call$e($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
		});
		return O;
	};
	var $create = function create(O, Properties) {
		return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
		var P = toPropertyKey$1(V);
		var enumerable = call$e(nativePropertyIsEnumerable, this, P);
		if (this === ObjectPrototype$3 && hasOwn$9(AllSymbols, P) && !hasOwn$9(ObjectPrototypeSymbols, P)) return false;
		return enumerable || !hasOwn$9(this, P) || !hasOwn$9(AllSymbols, P) || hasOwn$9(this, HIDDEN) && this[HIDDEN][P]
			? enumerable : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
		var it = toIndexedObject$4(O);
		var key = toPropertyKey$1(P);
		if (it === ObjectPrototype$3 && hasOwn$9(AllSymbols, key) && !hasOwn$9(ObjectPrototypeSymbols, key)) return;
		var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
		if (descriptor && hasOwn$9(AllSymbols, key) && !(hasOwn$9(it, HIDDEN) && it[HIDDEN][key])) {
			descriptor.enumerable = true;
		}
		return descriptor;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
		var names = nativeGetOwnPropertyNames(toIndexedObject$4(O));
		var result = [];
		$forEach$1(names, function (key) {
			if (!hasOwn$9(AllSymbols, key) && !hasOwn$9(hiddenKeys, key)) push$2(result, key);
		});
		return result;
	};
	var $getOwnPropertySymbols = function (O) {
		var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$3;
		var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$4(O));
		var result = [];
		$forEach$1(names, function (key) {
			if (hasOwn$9(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$9(ObjectPrototype$3, key))) {
				push$2(result, AllSymbols[key]);
			}
		});
		return result;
	};
	if (!NATIVE_SYMBOL$4) {
		$Symbol = function Symbol() {
			if (isPrototypeOf$7(SymbolPrototype$1, this)) throw TypeError$4('Symbol is not a constructor');
			var description = !arguments.length || arguments[0] === undefined ? undefined : $toString$1(arguments[0]);
			var tag = uid$1(description);
			var setter = function (value) {
				if (this === ObjectPrototype$3) call$e(setter, ObjectPrototypeSymbols, value);
				if (hasOwn$9(this, HIDDEN) && hasOwn$9(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
				setSymbolDescriptor(this, tag, createPropertyDescriptor$2(1, value));
			};
			if (DESCRIPTORS$9 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$3, tag, { configurable: true, set: setter });
			return wrap(tag, description);
		};
		SymbolPrototype$1 = $Symbol[PROTOTYPE$1];
		defineBuiltIn$7(SymbolPrototype$1, 'toString', function toString() {
			return getInternalState$4(this).tag;
		});
		defineBuiltIn$7($Symbol, 'withoutSetter', function (description) {
			return wrap(uid$1(description), description);
		});
		propertyIsEnumerableModule.f = $propertyIsEnumerable;
		definePropertyModule$1.f = $defineProperty;
		definePropertiesModule.f = $defineProperties;
		getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
		getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
		getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;
		wrappedWellKnownSymbolModule.f = function (name) {
			return wrap(wellKnownSymbol$d(name), name);
		};
		if (DESCRIPTORS$9) {
			defineBuiltInAccessor$6(SymbolPrototype$1, 'description', {
				configurable: true,
				get: function description() {
					return getInternalState$4(this).description;
				}
			});
			{
				defineBuiltIn$7(ObjectPrototype$3, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
			}
		}
	}
	$$j({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$4, sham: !NATIVE_SYMBOL$4 }, {
		Symbol: $Symbol
	});
	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
		defineWellKnownSymbol$2(name);
	});
	$$j({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$4 }, {
		useSetter: function () { USE_SETTER = true; },
		useSimple: function () { USE_SETTER = false; }
	});
	$$j({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4, sham: !DESCRIPTORS$9 }, {
		create: $create,
		defineProperty: $defineProperty,
		defineProperties: $defineProperties,
		getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	$$j({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$4 }, {
		getOwnPropertyNames: $getOwnPropertyNames
	});
	defineSymbolToPrimitive();
	setToStringTag$5($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	var NATIVE_SYMBOL$3 = symbolConstructorDetection;
	var symbolRegistryDetection = NATIVE_SYMBOL$3 && !!Symbol['for'] && !!Symbol.keyFor;
	getDefaultExportFromCjs(symbolRegistryDetection);

	var $$i = _export;
	var getBuiltIn$4 = getBuiltIn$a;
	var hasOwn$8 = hasOwnProperty_1;
	var toString$6 = toString$b;
	var shared$1 = sharedExports;
	var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;
	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');
	$$i({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
		'for': function (key) {
			var string = toString$6(key);
			if (hasOwn$8(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
			var symbol = getBuiltIn$4('Symbol')(string);
			StringToSymbolRegistry[string] = symbol;
			SymbolToStringRegistry$1[symbol] = string;
			return symbol;
		}
	});

	var $$h = _export;
	var hasOwn$7 = hasOwnProperty_1;
	var isSymbol$3 = isSymbol$6;
	var tryToString$5 = tryToString$7;
	var shared = sharedExports;
	var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	$$h({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
		keyFor: function keyFor(sym) {
			if (!isSymbol$3(sym)) throw TypeError(tryToString$5(sym) + ' is not a symbol');
			if (hasOwn$7(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
		}
	});

	var uncurryThis$f = functionUncurryThis;
	var isArray$1 = isArray$4;
	var isCallable$c = isCallable$r;
	var classof$6 = classofRaw$2;
	var toString$5 = toString$b;
	var push$1 = uncurryThis$f([].push);
	var getJsonReplacerFunction = function (replacer) {
		if (isCallable$c(replacer)) return replacer;
		if (!isArray$1(replacer)) return;
		var rawLength = replacer.length;
		var keys = [];
		for (var i = 0; i < rawLength; i++) {
			var element = replacer[i];
			if (typeof element == 'string') push$1(keys, element);
			else if (typeof element == 'number' || classof$6(element) == 'Number' || classof$6(element) == 'String') push$1(keys, toString$5(element));
		}
		var keysLength = keys.length;
		var root = true;
		return function (key, value) {
			if (root) {
				root = false;
				return value;
			}
			if (isArray$1(this)) return value;
			for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
		};
	};
	getDefaultExportFromCjs(getJsonReplacerFunction);

	var $$g = _export;
	var getBuiltIn$3 = getBuiltIn$a;
	var apply$4 = functionApply;
	var call$d = functionCall;
	var uncurryThis$e = functionUncurryThis;
	var fails$i = fails$B;
	var isCallable$b = isCallable$r;
	var isSymbol$2 = isSymbol$6;
	var arraySlice$5 = arraySlice$7;
	var getReplacerFunction = getJsonReplacerFunction;
	var NATIVE_SYMBOL$2 = symbolConstructorDetection;
	var $String$1 = String;
	var $stringify = getBuiltIn$3('JSON', 'stringify');
	var exec = uncurryThis$e(/./.exec);
	var charAt$1 = uncurryThis$e(''.charAt);
	var charCodeAt$1 = uncurryThis$e(''.charCodeAt);
	var replace$2 = uncurryThis$e(''.replace);
	var numberToString = uncurryThis$e(1.0.toString);
	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;
	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$2 || fails$i(function () {
		var symbol = getBuiltIn$3('Symbol')();
		return $stringify([symbol]) != '[null]'
			|| $stringify({ a: symbol }) != '{}'
			|| $stringify(Object(symbol)) != '{}';
	});
	var ILL_FORMED_UNICODE = fails$i(function () {
		return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
			|| $stringify('\uDEAD') !== '"\\udead"';
	});
	var stringifyWithSymbolsFix = function (it, replacer) {
		var args = arraySlice$5(arguments);
		var $replacer = getReplacerFunction(replacer);
		if (!isCallable$b($replacer) && (it === undefined || isSymbol$2(it))) return;
		args[1] = function (key, value) {
			if (isCallable$b($replacer)) value = call$d($replacer, this, $String$1(key), value);
			if (!isSymbol$2(value)) return value;
		};
		return apply$4($stringify, null, args);
	};
	var fixIllFormed = function (match, offset, string) {
		var prev = charAt$1(string, offset - 1);
		var next = charAt$1(string, offset + 1);
		if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
			return '\\u' + numberToString(charCodeAt$1(match, 0), 16);
		} return match;
	};
	if ($stringify) {
		$$g({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
			stringify: function stringify(it, replacer, space) {
				var args = arraySlice$5(arguments);
				var result = apply$4(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
				return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$2(result, tester, fixIllFormed) : result;
			}
		});
	}

	var $$f = _export;
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;
	var fails$h = fails$B;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var toObject$7 = toObject$c;
	var FORCED$7 = !NATIVE_SYMBOL$1 || fails$h(function () { getOwnPropertySymbolsModule.f(1); });
	$$f({ target: 'Object', stat: true, forced: FORCED$7 }, {
		getOwnPropertySymbols: function getOwnPropertySymbols(it) {
			var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
			return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$7(it)) : [];
		}
	});

	var $$e = _export;
	var fails$g = fails$B;
	var toIndexedObject$3 = toIndexedObject$b;
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var DESCRIPTORS$8 = descriptors;
	var FORCED$6 = !DESCRIPTORS$8 || fails$g(function () { nativeGetOwnPropertyDescriptor$1(1); });
	$$e({ target: 'Object', stat: true, forced: FORCED$6, sham: !DESCRIPTORS$8 }, {
		getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
			return nativeGetOwnPropertyDescriptor$1(toIndexedObject$3(it), key);
		}
	});

	var $$d = _export;
	var global$i = global$y;
	var setToStringTag$4 = setToStringTag$6;
	$$d({ global: true }, { Reflect: {} });
	setToStringTag$4(global$i.Reflect, 'Reflect', true);

	var DESCRIPTORS$7 = descriptors;
	var FUNCTION_NAME_EXISTS = functionName.EXISTS;
	var uncurryThis$d = functionUncurryThis;
	var defineBuiltInAccessor$5 = defineBuiltInAccessor$7;
	var FunctionPrototype = Function.prototype;
	var functionToString = uncurryThis$d(FunctionPrototype.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec = uncurryThis$d(nameRE.exec);
	var NAME$1 = 'name';
	if (DESCRIPTORS$7 && !FUNCTION_NAME_EXISTS) {
		defineBuiltInAccessor$5(FunctionPrototype, NAME$1, {
			configurable: true,
			get: function () {
				try {
					return regExpExec(nameRE, functionToString(this))[1];
				} catch (error) {
					return '';
				}
			}
		});
	}

	var $$c = _export;
	var DESCRIPTORS$6 = descriptors;
	var global$h = global$y;
	var uncurryThis$c = functionUncurryThis;
	var hasOwn$6 = hasOwnProperty_1;
	var isCallable$a = isCallable$r;
	var isPrototypeOf$6 = objectIsPrototypeOf;
	var toString$4 = toString$b;
	var defineBuiltInAccessor$4 = defineBuiltInAccessor$7;
	var copyConstructorProperties$1 = copyConstructorProperties$3;
	var NativeSymbol = global$h.Symbol;
	var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;
	if (DESCRIPTORS$6 && isCallable$a(NativeSymbol) && (!('description' in SymbolPrototype) ||
		NativeSymbol().description !== undefined
	)) {
		var EmptyStringDescriptionStore = {};
		var SymbolWrapper = function Symbol() {
			var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$4(arguments[0]);
			var result = isPrototypeOf$6(SymbolPrototype, this)
				? new NativeSymbol(description)
				: description === undefined ? NativeSymbol() : NativeSymbol(description);
			if (description === '') EmptyStringDescriptionStore[result] = true;
			return result;
		};
		copyConstructorProperties$1(SymbolWrapper, NativeSymbol);
		SymbolWrapper.prototype = SymbolPrototype;
		SymbolPrototype.constructor = SymbolWrapper;
		var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
		var thisSymbolValue = uncurryThis$c(SymbolPrototype.valueOf);
		var symbolDescriptiveString = uncurryThis$c(SymbolPrototype.toString);
		var regexp = /^Symbol\((.*)\)[^)]+$/;
		var replace$1 = uncurryThis$c(''.replace);
		var stringSlice$1 = uncurryThis$c(''.slice);
		defineBuiltInAccessor$4(SymbolPrototype, 'description', {
			configurable: true,
			get: function description() {
				var symbol = thisSymbolValue(this);
				if (hasOwn$6(EmptyStringDescriptionStore, symbol)) return '';
				var string = symbolDescriptiveString(symbol);
				var desc = NATIVE_SYMBOL ? stringSlice$1(string, 7, -1) : replace$1(string, regexp, '$1');
				return desc === '' ? undefined : desc;
			}
		});
		$$c({ global: true, constructor: true, forced: true }, {
			Symbol: SymbolWrapper
		});
	}

	var classof$5 = classofRaw$2;
	var engineIsNode = typeof process != 'undefined' && classof$5(process) == 'process';
	getDefaultExportFromCjs(engineIsNode);

	var uncurryThis$b = functionUncurryThis;
	var aCallable$8 = aCallable$b;
	var functionUncurryThisAccessor = function (object, key, method) {
		try {
			return uncurryThis$b(aCallable$8(Object.getOwnPropertyDescriptor(object, key)[method]));
		} catch (error) { }
	};
	getDefaultExportFromCjs(functionUncurryThisAccessor);

	var isCallable$9 = isCallable$r;
	var $String = String;
	var $TypeError$a = TypeError;
	var aPossiblePrototype$1 = function (argument) {
		if (typeof argument == 'object' || isCallable$9(argument)) return argument;
		throw $TypeError$a("Can't set " + $String(argument) + ' as a prototype');
	};
	getDefaultExportFromCjs(aPossiblePrototype$1);

	var uncurryThisAccessor = functionUncurryThisAccessor;
	var anObject$6 = anObject$f;
	var aPossiblePrototype = aPossiblePrototype$1;
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
		var CORRECT_SETTER = false;
		var test = {};
		var setter;
		try {
			setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
			setter(test, []);
			CORRECT_SETTER = test instanceof Array;
		} catch (error) { }
		return function setPrototypeOf(O, proto) {
			anObject$6(O);
			aPossiblePrototype(proto);
			if (CORRECT_SETTER) setter(O, proto);
			else O.__proto__ = proto;
			return O;
		};
	}() : undefined);
	getDefaultExportFromCjs(objectSetPrototypeOf);

	var getBuiltIn$2 = getBuiltIn$a;
	var defineBuiltInAccessor$3 = defineBuiltInAccessor$7;
	var wellKnownSymbol$c = wellKnownSymbol$p;
	var DESCRIPTORS$5 = descriptors;
	var SPECIES$2 = wellKnownSymbol$c('species');
	var setSpecies$2 = function (CONSTRUCTOR_NAME) {
		var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
		if (DESCRIPTORS$5 && Constructor && !Constructor[SPECIES$2]) {
			defineBuiltInAccessor$3(Constructor, SPECIES$2, {
				configurable: true,
				get: function () { return this; }
			});
		}
	};
	getDefaultExportFromCjs(setSpecies$2);

	var isPrototypeOf$5 = objectIsPrototypeOf;
	var $TypeError$9 = TypeError;
	var anInstance$3 = function (it, Prototype) {
		if (isPrototypeOf$5(Prototype, it)) return it;
		throw $TypeError$9('Incorrect invocation');
	};
	getDefaultExportFromCjs(anInstance$3);

	var isConstructor = isConstructor$3;
	var tryToString$4 = tryToString$7;
	var $TypeError$8 = TypeError;
	var aConstructor$2 = function (argument) {
		if (isConstructor(argument)) return argument;
		throw $TypeError$8(tryToString$4(argument) + ' is not a constructor');
	};
	getDefaultExportFromCjs(aConstructor$2);

	var anObject$5 = anObject$f;
	var aConstructor$1 = aConstructor$2;
	var isNullOrUndefined$1 = isNullOrUndefined$5;
	var wellKnownSymbol$b = wellKnownSymbol$p;
	var SPECIES$1 = wellKnownSymbol$b('species');
	var speciesConstructor$2 = function (O, defaultConstructor) {
		var C = anObject$5(O).constructor;
		var S;
		return C === undefined || isNullOrUndefined$1(S = anObject$5(C)[SPECIES$1]) ? defaultConstructor : aConstructor$1(S);
	};
	getDefaultExportFromCjs(speciesConstructor$2);

	var $TypeError$7 = TypeError;
	var validateArgumentsLength$1 = function (passed, required) {
		if (passed < required) throw $TypeError$7('Not enough arguments');
		return passed;
	};
	getDefaultExportFromCjs(validateArgumentsLength$1);

	var userAgent$4 = engineUserAgent;
	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);
	getDefaultExportFromCjs(engineIsIos);

	var global$g = global$y;
	var apply$3 = functionApply;
	var bind$4 = functionBindContext;
	var isCallable$8 = isCallable$r;
	var hasOwn$5 = hasOwnProperty_1;
	var fails$f = fails$B;
	var html = html$2;
	var arraySlice$4 = arraySlice$7;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength = validateArgumentsLength$1;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$3 = engineIsNode;
	var set$1 = global$g.setImmediate;
	var clear = global$g.clearImmediate;
	var process$3 = global$g.process;
	var Dispatch = global$g.Dispatch;
	var Function$1 = global$g.Function;
	var MessageChannel = global$g.MessageChannel;
	var String$1 = global$g.String;
	var counter = 0;
	var queue$2 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var $location, defer, channel, port;
	fails$f(function () {
		$location = global$g.location;
	});
	var run = function (id) {
		if (hasOwn$5(queue$2, id)) {
			var fn = queue$2[id];
			delete queue$2[id];
			fn();
		}
	};
	var runner = function (id) {
		return function () {
			run(id);
		};
	};
	var eventListener = function (event) {
		run(event.data);
	};
	var globalPostMessageDefer = function (id) {
		global$g.postMessage(String$1(id), $location.protocol + '//' + $location.host);
	};
	if (!set$1 || !clear) {
		set$1 = function setImmediate(handler) {
			validateArgumentsLength(arguments.length, 1);
			var fn = isCallable$8(handler) ? handler : Function$1(handler);
			var args = arraySlice$4(arguments, 1);
			queue$2[++counter] = function () {
				apply$3(fn, undefined, args);
			};
			defer(counter);
			return counter;
		};
		clear = function clearImmediate(id) {
			delete queue$2[id];
		};
		if (IS_NODE$3) {
			defer = function (id) {
				process$3.nextTick(runner(id));
			};
		} else if (Dispatch && Dispatch.now) {
			defer = function (id) {
				Dispatch.now(runner(id));
			};
		} else if (MessageChannel && !IS_IOS$1) {
			channel = new MessageChannel();
			port = channel.port2;
			channel.port1.onmessage = eventListener;
			defer = bind$4(port.postMessage, port);
		} else if (
			global$g.addEventListener &&
			isCallable$8(global$g.postMessage) &&
			!global$g.importScripts &&
			$location && $location.protocol !== 'file:' &&
			!fails$f(globalPostMessageDefer)
		) {
			defer = globalPostMessageDefer;
			global$g.addEventListener('message', eventListener, false);
		} else if (ONREADYSTATECHANGE in createElement('script')) {
			defer = function (id) {
				html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
					html.removeChild(this);
					run(id);
				};
			};
		} else {
			defer = function (id) {
				setTimeout(runner(id), 0);
			};
		}
	}
	var task$1 = {
		set: set$1,
		clear: clear
	};
	getDefaultExportFromCjs(task$1);

	var Queue$2 = function () {
		this.head = null;
		this.tail = null;
	};
	Queue$2.prototype = {
		add: function (item) {
			var entry = { item: item, next: null };
			var tail = this.tail;
			if (tail) tail.next = entry;
			else this.head = entry;
			this.tail = entry;
		},
		get: function () {
			var entry = this.head;
			if (entry) {
				var next = this.head = entry.next;
				if (next === null) this.tail = null;
				return entry.item;
			}
		}
	};
	var queue$1 = Queue$2;
	getDefaultExportFromCjs(queue$1);

	var userAgent$3 = engineUserAgent;
	var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && typeof Pebble != 'undefined';
	getDefaultExportFromCjs(engineIsIosPebble);

	var userAgent$2 = engineUserAgent;
	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);
	getDefaultExportFromCjs(engineIsWebosWebkit);

	var global$f = global$y;
	var bind$3 = functionBindContext;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var Queue$1 = queue$1;
	var IS_IOS = engineIsIos;
	var IS_IOS_PEBBLE = engineIsIosPebble;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$2 = engineIsNode;
	var MutationObserver = global$f.MutationObserver || global$f.WebKitMutationObserver;
	var document$2 = global$f.document;
	var process$2 = global$f.process;
	var Promise$1 = global$f.Promise;
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$1(global$f, 'queueMicrotask');
	var microtask$1 = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
	var notify$1, toggle, node, promise, then;
	if (!microtask$1) {
		var queue = new Queue$1();
		var flush = function () {
			var parent, fn;
			if (IS_NODE$2 && (parent = process$2.domain)) parent.exit();
			while (fn = queue.get()) try {
				fn();
			} catch (error) {
				if (queue.head) notify$1();
				throw error;
			}
			if (parent) parent.enter();
		};
		if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
			toggle = true;
			node = document$2.createTextNode('');
			new MutationObserver(flush).observe(node, { characterData: true });
			notify$1 = function () {
				node.data = toggle = !toggle;
			};
		} else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
			promise = Promise$1.resolve(undefined);
			promise.constructor = Promise$1;
			then = bind$3(promise.then, promise);
			notify$1 = function () {
				then(flush);
			};
		} else if (IS_NODE$2) {
			notify$1 = function () {
				process$2.nextTick(flush);
			};
		} else {
			macrotask = bind$3(macrotask, global$f);
			notify$1 = function () {
				macrotask(flush);
			};
		}
		microtask$1 = function (fn) {
			if (!queue.head) notify$1();
			queue.add(fn);
		};
	}
	var microtask_1 = microtask$1;
	getDefaultExportFromCjs(microtask_1);

	var hostReportErrors$1 = function (a, b) {
		try {
			arguments.length == 1 ? console.error(a) : console.error(a, b);
		} catch (error) { }
	};
	getDefaultExportFromCjs(hostReportErrors$1);

	var perform$3 = function (exec) {
		try {
			return { error: false, value: exec() };
		} catch (error) {
			return { error: true, value: error };
		}
	};
	getDefaultExportFromCjs(perform$3);

	var global$e = global$y;
	var promiseNativeConstructor = global$e.Promise;
	getDefaultExportFromCjs(promiseNativeConstructor);

	var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';
	getDefaultExportFromCjs(engineIsDeno);

	var IS_DENO$1 = engineIsDeno;
	var IS_NODE$1 = engineIsNode;
	var engineIsBrowser = !IS_DENO$1 && !IS_NODE$1
		&& typeof window == 'object'
		&& typeof document == 'object';
	getDefaultExportFromCjs(engineIsBrowser);

	var global$d = global$y;
	var NativePromiseConstructor$3 = promiseNativeConstructor;
	var isCallable$7 = isCallable$r;
	var isForced$1 = isForced_1;
	var inspectSource = inspectSource$3;
	var wellKnownSymbol$a = wellKnownSymbol$p;
	var IS_BROWSER = engineIsBrowser;
	var IS_DENO = engineIsDeno;
	var V8_VERSION$1 = engineV8Version;
	NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
	var SPECIES = wellKnownSymbol$a('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$7(global$d.PromiseRejectionEvent);
	var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1('Promise', function () {
		var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
		var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
		if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$1 === 66) return true;
		if (!V8_VERSION$1 || V8_VERSION$1 < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
			var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
			var FakePromise = function (exec) {
				exec(function () { }, function () { });
			};
			var constructor = promise.constructor = {};
			constructor[SPECIES] = FakePromise;
			SUBCLASSING = promise.then(function () { }) instanceof FakePromise;
			if (!SUBCLASSING) return true;
		} return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
	});
	var promiseConstructorDetection = {
		CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
		REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
		SUBCLASSING: SUBCLASSING
	};
	getDefaultExportFromCjs(promiseConstructorDetection);

	var newPromiseCapability$2 = {};

	var aCallable$7 = aCallable$b;
	var $TypeError$6 = TypeError;
	var PromiseCapability = function (C) {
		var resolve, reject;
		this.promise = new C(function ($$resolve, $$reject) {
			if (resolve !== undefined || reject !== undefined) throw $TypeError$6('Bad Promise constructor');
			resolve = $$resolve;
			reject = $$reject;
		});
		this.resolve = aCallable$7(resolve);
		this.reject = aCallable$7(reject);
	};
	newPromiseCapability$2.f = function (C) {
		return new PromiseCapability(C);
	};

	var $$b = _export;
	var IS_NODE = engineIsNode;
	var global$c = global$y;
	var call$c = functionCall;
	var defineBuiltIn$6 = defineBuiltIn$c;
	var setPrototypeOf$5 = objectSetPrototypeOf;
	var setToStringTag$3 = setToStringTag$6;
	var setSpecies$1 = setSpecies$2;
	var aCallable$6 = aCallable$b;
	var isCallable$6 = isCallable$r;
	var isObject$7 = isObject$f;
	var anInstance$2 = anInstance$3;
	var speciesConstructor$1 = speciesConstructor$2;
	var task = task$1.set;
	var microtask = microtask_1;
	var hostReportErrors = hostReportErrors$1;
	var perform$2 = perform$3;
	var Queue = queue$1;
	var InternalStateModule$5 = internalState;
	var NativePromiseConstructor$2 = promiseNativeConstructor;
	var PromiseConstructorDetection = promiseConstructorDetection;
	var newPromiseCapabilityModule$3 = newPromiseCapability$2;
	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = InternalStateModule$5.getterFor(PROMISE);
	var setInternalState$4 = InternalStateModule$5.set;
	var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
	var PromiseConstructor = NativePromiseConstructor$2;
	var PromisePrototype = NativePromisePrototype$1;
	var TypeError$3 = global$c.TypeError;
	var document$1 = global$c.document;
	var process$1 = global$c.process;
	var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$c.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
	var isThenable = function (it) {
		var then;
		return isObject$7(it) && isCallable$6(then = it.then) ? then : false;
	};
	var callReaction = function (reaction, state) {
		var value = state.value;
		var ok = state.state == FULFILLED;
		var handler = ok ? reaction.ok : reaction.fail;
		var resolve = reaction.resolve;
		var reject = reaction.reject;
		var domain = reaction.domain;
		var result, then, exited;
		try {
			if (handler) {
				if (!ok) {
					if (state.rejection === UNHANDLED) onHandleUnhandled(state);
					state.rejection = HANDLED;
				}
				if (handler === true) result = value;
				else {
					if (domain) domain.enter();
					result = handler(value);
					if (domain) {
						domain.exit();
						exited = true;
					}
				}
				if (result === reaction.promise) {
					reject(TypeError$3('Promise-chain cycle'));
				} else if (then = isThenable(result)) {
					call$c(then, result, resolve, reject);
				} else resolve(result);
			} else reject(value);
		} catch (error) {
			if (domain && !exited) domain.exit();
			reject(error);
		}
	};
	var notify = function (state, isReject) {
		if (state.notified) return;
		state.notified = true;
		microtask(function () {
			var reactions = state.reactions;
			var reaction;
			while (reaction = reactions.get()) {
				callReaction(reaction, state);
			}
			state.notified = false;
			if (isReject && !state.rejection) onUnhandled(state);
		});
	};
	var dispatchEvent = function (name, promise, reason) {
		var event, handler;
		if (DISPATCH_EVENT) {
			event = document$1.createEvent('Event');
			event.promise = promise;
			event.reason = reason;
			event.initEvent(name, false, true);
			global$c.dispatchEvent(event);
		} else event = { promise: promise, reason: reason };
		if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$c['on' + name])) handler(event);
		else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};
	var onUnhandled = function (state) {
		call$c(task, global$c, function () {
			var promise = state.facade;
			var value = state.value;
			var IS_UNHANDLED = isUnhandled(state);
			var result;
			if (IS_UNHANDLED) {
				result = perform$2(function () {
					if (IS_NODE) {
						process$1.emit('unhandledRejection', value, promise);
					} else dispatchEvent(UNHANDLED_REJECTION, promise, value);
				});
				state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
				if (result.error) throw result.value;
			}
		});
	};
	var isUnhandled = function (state) {
		return state.rejection !== HANDLED && !state.parent;
	};
	var onHandleUnhandled = function (state) {
		call$c(task, global$c, function () {
			var promise = state.facade;
			if (IS_NODE) {
				process$1.emit('rejectionHandled', promise);
			} else dispatchEvent(REJECTION_HANDLED, promise, state.value);
		});
	};
	var bind$2 = function (fn, state, unwrap) {
		return function (value) {
			fn(state, value, unwrap);
		};
	};
	var internalReject = function (state, value, unwrap) {
		if (state.done) return;
		state.done = true;
		if (unwrap) state = unwrap;
		state.value = value;
		state.state = REJECTED;
		notify(state, true);
	};
	var internalResolve = function (state, value, unwrap) {
		if (state.done) return;
		state.done = true;
		if (unwrap) state = unwrap;
		try {
			if (state.facade === value) throw TypeError$3("Promise can't be resolved itself");
			var then = isThenable(value);
			if (then) {
				microtask(function () {
					var wrapper = { done: false };
					try {
						call$c(then, value,
							bind$2(internalResolve, wrapper, state),
							bind$2(internalReject, wrapper, state)
						);
					} catch (error) {
						internalReject(wrapper, error, state);
					}
				});
			} else {
				state.value = value;
				state.state = FULFILLED;
				notify(state, false);
			}
		} catch (error) {
			internalReject({ done: false }, error, state);
		}
	};
	if (FORCED_PROMISE_CONSTRUCTOR$4) {
		PromiseConstructor = function Promise(executor) {
			anInstance$2(this, PromisePrototype);
			aCallable$6(executor);
			call$c(Internal, this);
			var state = getInternalPromiseState(this);
			try {
				executor(bind$2(internalResolve, state), bind$2(internalReject, state));
			} catch (error) {
				internalReject(state, error);
			}
		};
		PromisePrototype = PromiseConstructor.prototype;
		Internal = function Promise(executor) {
			setInternalState$4(this, {
				type: PROMISE,
				done: false,
				notified: false,
				parent: false,
				reactions: new Queue(),
				rejection: false,
				state: PENDING,
				value: undefined
			});
		};
		Internal.prototype = defineBuiltIn$6(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
			var state = getInternalPromiseState(this);
			var reaction = newPromiseCapability$1(speciesConstructor$1(this, PromiseConstructor));
			state.parent = true;
			reaction.ok = isCallable$6(onFulfilled) ? onFulfilled : true;
			reaction.fail = isCallable$6(onRejected) && onRejected;
			reaction.domain = IS_NODE ? process$1.domain : undefined;
			if (state.state == PENDING) state.reactions.add(reaction);
			else microtask(function () {
				callReaction(reaction, state);
			});
			return reaction.promise;
		});
		OwnPromiseCapability = function () {
			var promise = new Internal();
			var state = getInternalPromiseState(promise);
			this.promise = promise;
			this.resolve = bind$2(internalResolve, state);
			this.reject = bind$2(internalReject, state);
		};
		newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
			return C === PromiseConstructor || C === PromiseWrapper
				? new OwnPromiseCapability(C)
				: newGenericPromiseCapability(C);
		};
		if (isCallable$6(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
			nativeThen = NativePromisePrototype$1.then;
			if (!NATIVE_PROMISE_SUBCLASSING) {
				defineBuiltIn$6(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
					var that = this;
					return new PromiseConstructor(function (resolve, reject) {
						call$c(nativeThen, that, resolve, reject);
					}).then(onFulfilled, onRejected);
				}, { unsafe: true });
			}
			try {
				delete NativePromisePrototype$1.constructor;
			} catch (error) { }
			if (setPrototypeOf$5) {
				setPrototypeOf$5(NativePromisePrototype$1, PromisePrototype);
			}
		}
	}
	$$b({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
		Promise: PromiseConstructor
	});
	setToStringTag$3(PromiseConstructor, PROMISE, false);
	setSpecies$1(PROMISE);

	var iterators = {};
	getDefaultExportFromCjs(iterators);

	var wellKnownSymbol$9 = wellKnownSymbol$p;
	var Iterators$4 = iterators;
	var ITERATOR$6 = wellKnownSymbol$9('iterator');
	var ArrayPrototype$1 = Array.prototype;
	var isArrayIteratorMethod$2 = function (it) {
		return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$6] === it);
	};
	getDefaultExportFromCjs(isArrayIteratorMethod$2);

	var classof$4 = classof$d;
	var getMethod$1 = getMethod$4;
	var isNullOrUndefined = isNullOrUndefined$5;
	var Iterators$3 = iterators;
	var wellKnownSymbol$8 = wellKnownSymbol$p;
	var ITERATOR$5 = wellKnownSymbol$8('iterator');
	var getIteratorMethod$3 = function (it) {
		if (!isNullOrUndefined(it)) return getMethod$1(it, ITERATOR$5)
			|| getMethod$1(it, '@@iterator')
			|| Iterators$3[classof$4(it)];
	};
	getDefaultExportFromCjs(getIteratorMethod$3);

	var call$b = functionCall;
	var aCallable$5 = aCallable$b;
	var anObject$4 = anObject$f;
	var tryToString$3 = tryToString$7;
	var getIteratorMethod$2 = getIteratorMethod$3;
	var $TypeError$5 = TypeError;
	var getIterator$2 = function (argument, usingIterator) {
		var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
		if (aCallable$5(iteratorMethod)) return anObject$4(call$b(iteratorMethod, argument));
		throw $TypeError$5(tryToString$3(argument) + ' is not iterable');
	};
	getDefaultExportFromCjs(getIterator$2);

	var call$a = functionCall;
	var anObject$3 = anObject$f;
	var getMethod = getMethod$4;
	var iteratorClose$1 = function (iterator, kind, value) {
		var innerResult, innerError;
		anObject$3(iterator);
		try {
			innerResult = getMethod(iterator, 'return');
			if (!innerResult) {
				if (kind === 'throw') throw value;
				return value;
			}
			innerResult = call$a(innerResult, iterator);
		} catch (error) {
			innerError = true;
			innerResult = error;
		}
		if (kind === 'throw') throw value;
		if (innerError) throw innerResult;
		anObject$3(innerResult);
		return value;
	};
	getDefaultExportFromCjs(iteratorClose$1);

	var bind$1 = functionBindContext;
	var call$9 = functionCall;
	var anObject$2 = anObject$f;
	var tryToString$2 = tryToString$7;
	var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
	var lengthOfArrayLike$a = lengthOfArrayLike$f;
	var isPrototypeOf$4 = objectIsPrototypeOf;
	var getIterator$1 = getIterator$2;
	var getIteratorMethod$1 = getIteratorMethod$3;
	var iteratorClose = iteratorClose$1;
	var $TypeError$4 = TypeError;
	var Result = function (stopped, result) {
		this.stopped = stopped;
		this.result = result;
	};
	var ResultPrototype = Result.prototype;
	var iterate$2 = function (iterable, unboundFunction, options) {
		var that = options && options.that;
		var AS_ENTRIES = !!(options && options.AS_ENTRIES);
		var IS_RECORD = !!(options && options.IS_RECORD);
		var IS_ITERATOR = !!(options && options.IS_ITERATOR);
		var INTERRUPTED = !!(options && options.INTERRUPTED);
		var fn = bind$1(unboundFunction, that);
		var iterator, iterFn, index, length, result, next, step;
		var stop = function (condition) {
			if (iterator) iteratorClose(iterator, 'normal', condition);
			return new Result(true, condition);
		};
		var callFn = function (value) {
			if (AS_ENTRIES) {
				anObject$2(value);
				return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
			} return INTERRUPTED ? fn(value, stop) : fn(value);
		};
		if (IS_RECORD) {
			iterator = iterable.iterator;
		} else if (IS_ITERATOR) {
			iterator = iterable;
		} else {
			iterFn = getIteratorMethod$1(iterable);
			if (!iterFn) throw $TypeError$4(tryToString$2(iterable) + ' is not iterable');
			if (isArrayIteratorMethod$1(iterFn)) {
				for (index = 0, length = lengthOfArrayLike$a(iterable); length > index; index++) {
					result = callFn(iterable[index]);
					if (result && isPrototypeOf$4(ResultPrototype, result)) return result;
				} return new Result(false);
			}
			iterator = getIterator$1(iterable, iterFn);
		}
		next = IS_RECORD ? iterable.next : iterator.next;
		while (!(step = call$9(next, iterator)).done) {
			try {
				result = callFn(step.value);
			} catch (error) {
				iteratorClose(iterator, 'throw', error);
			}
			if (typeof result == 'object' && result && isPrototypeOf$4(ResultPrototype, result)) return result;
		} return new Result(false);
	};
	getDefaultExportFromCjs(iterate$2);

	var wellKnownSymbol$7 = wellKnownSymbol$p;
	var ITERATOR$4 = wellKnownSymbol$7('iterator');
	var SAFE_CLOSING = false;
	try {
		var called = 0;
		var iteratorWithReturn = {
			next: function () {
				return { done: !!called++ };
			},
			'return': function () {
				SAFE_CLOSING = true;
			}
		};
		iteratorWithReturn[ITERATOR$4] = function () {
			return this;
		};
		Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { }
	var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
		if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
		var ITERATION_SUPPORT = false;
		try {
			var object = {};
			object[ITERATOR$4] = function () {
				return {
					next: function () {
						return { done: ITERATION_SUPPORT = true };
					}
				};
			};
			exec(object);
		} catch (error) { }
		return ITERATION_SUPPORT;
	};
	getDefaultExportFromCjs(checkCorrectnessOfIteration$2);

	var NativePromiseConstructor$1 = promiseNativeConstructor;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
	var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;
	var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function (iterable) {
		NativePromiseConstructor$1.all(iterable).then(undefined, function () { });
	});
	getDefaultExportFromCjs(promiseStaticsIncorrectIteration);

	var $$a = _export;
	var call$8 = functionCall;
	var aCallable$4 = aCallable$b;
	var newPromiseCapabilityModule$2 = newPromiseCapability$2;
	var perform$1 = perform$3;
	var iterate$1 = iterate$2;
	var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;
	$$a({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
		all: function all(iterable) {
			var C = this;
			var capability = newPromiseCapabilityModule$2.f(C);
			var resolve = capability.resolve;
			var reject = capability.reject;
			var result = perform$1(function () {
				var $promiseResolve = aCallable$4(C.resolve);
				var values = [];
				var counter = 0;
				var remaining = 1;
				iterate$1(iterable, function (promise) {
					var index = counter++;
					var alreadyCalled = false;
					remaining++;
					call$8($promiseResolve, C, promise).then(function (value) {
						if (alreadyCalled) return;
						alreadyCalled = true;
						values[index] = value;
						--remaining || resolve(values);
					}, reject);
				});
				--remaining || resolve(values);
			});
			if (result.error) reject(result.value);
			return capability.promise;
		}
	});

	var $$9 = _export;
	var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
	var NativePromiseConstructor = promiseNativeConstructor;
	var getBuiltIn$1 = getBuiltIn$a;
	var isCallable$5 = isCallable$r;
	var defineBuiltIn$5 = defineBuiltIn$c;
	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
	$$9({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
		'catch': function (onRejected) {
			return this.then(undefined, onRejected);
		}
	});
	if (isCallable$5(NativePromiseConstructor)) {
		var method = getBuiltIn$1('Promise').prototype['catch'];
		if (NativePromisePrototype['catch'] !== method) {
			defineBuiltIn$5(NativePromisePrototype, 'catch', method, { unsafe: true });
		}
	}

	var $$8 = _export;
	var call$7 = functionCall;
	var aCallable$3 = aCallable$b;
	var newPromiseCapabilityModule$1 = newPromiseCapability$2;
	var perform = perform$3;
	var iterate = iterate$2;
	var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;
	$$8({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
		race: function race(iterable) {
			var C = this;
			var capability = newPromiseCapabilityModule$1.f(C);
			var reject = capability.reject;
			var result = perform(function () {
				var $promiseResolve = aCallable$3(C.resolve);
				iterate(iterable, function (promise) {
					call$7($promiseResolve, C, promise).then(capability.resolve, reject);
				});
			});
			if (result.error) reject(result.value);
			return capability.promise;
		}
	});

	var $$7 = _export;
	var call$6 = functionCall;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;
	$$7({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
		reject: function reject(r) {
			var capability = newPromiseCapabilityModule.f(this);
			call$6(capability.reject, undefined, r);
			return capability.promise;
		}
	});

	var anObject$1 = anObject$f;
	var isObject$6 = isObject$f;
	var newPromiseCapability = newPromiseCapability$2;
	var promiseResolve$1 = function (C, x) {
		anObject$1(C);
		if (isObject$6(x) && x.constructor === C) return x;
		var promiseCapability = newPromiseCapability.f(C);
		var resolve = promiseCapability.resolve;
		resolve(x);
		return promiseCapability.promise;
	};
	getDefaultExportFromCjs(promiseResolve$1);

	var $$6 = _export;
	var getBuiltIn = getBuiltIn$a;
	var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
	var promiseResolve = promiseResolve$1;
	getBuiltIn('Promise');
	$$6({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
		resolve: function resolve(x) {
			return promiseResolve(this, x);
		}
	});

	var defineWellKnownSymbol$1 = wellKnownSymbolDefine;
	defineWellKnownSymbol$1('iterator');

	var wellKnownSymbol$6 = wellKnownSymbol$p;
	var create$2 = objectCreate;
	var defineProperty$2 = objectDefineProperty.f;
	var UNSCOPABLES = wellKnownSymbol$6('unscopables');
	var ArrayPrototype = Array.prototype;
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
		defineProperty$2(ArrayPrototype, UNSCOPABLES, {
			configurable: true,
			value: create$2(null)
		});
	}
	var addToUnscopables$1 = function (key) {
		ArrayPrototype[UNSCOPABLES][key] = true;
	};
	getDefaultExportFromCjs(addToUnscopables$1);

	var fails$e = fails$B;
	var correctPrototypeGetter = !fails$e(function () {
		function F() { }
		F.prototype.constructor = null;
		return Object.getPrototypeOf(new F()) !== F.prototype;
	});
	getDefaultExportFromCjs(correctPrototypeGetter);

	var hasOwn$4 = hasOwnProperty_1;
	var isCallable$4 = isCallable$r;
	var toObject$6 = toObject$c;
	var sharedKey = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype$2 = $Object.prototype;
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
		var object = toObject$6(O);
		if (hasOwn$4(object, IE_PROTO)) return object[IE_PROTO];
		var constructor = object.constructor;
		if (isCallable$4(constructor) && object instanceof constructor) {
			return constructor.prototype;
		} return object instanceof $Object ? ObjectPrototype$2 : null;
	};
	getDefaultExportFromCjs(objectGetPrototypeOf);

	var fails$d = fails$B;
	var isCallable$3 = isCallable$r;
	var isObject$5 = isObject$f;
	var getPrototypeOf$3 = objectGetPrototypeOf;
	var defineBuiltIn$4 = defineBuiltIn$c;
	var wellKnownSymbol$5 = wellKnownSymbol$p;
	var ITERATOR$3 = wellKnownSymbol$5('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
	if ([].keys) {
		arrayIterator = [].keys();
		if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
		else {
			PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
			if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
		}
	}
	var NEW_ITERATOR_PROTOTYPE = !isObject$5(IteratorPrototype$2) || fails$d(function () {
		var test = {};
		return IteratorPrototype$2[ITERATOR$3].call(test) !== test;
	});
	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};
	if (!isCallable$3(IteratorPrototype$2[ITERATOR$3])) {
		defineBuiltIn$4(IteratorPrototype$2, ITERATOR$3, function () {
			return this;
		});
	}
	var iteratorsCore = {
		IteratorPrototype: IteratorPrototype$2,
		BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};
	getDefaultExportFromCjs(iteratorsCore);

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$1 = objectCreate;
	var createPropertyDescriptor$1 = createPropertyDescriptor$6;
	var setToStringTag$2 = setToStringTag$6;
	var Iterators$2 = iterators;
	var returnThis$1 = function () { return this; };
	var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
		var TO_STRING_TAG = NAME + ' Iterator';
		IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
		setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
		Iterators$2[TO_STRING_TAG] = returnThis$1;
		return IteratorConstructor;
	};
	getDefaultExportFromCjs(iteratorCreateConstructor);

	var $$5 = _export;
	var call$5 = functionCall;
	var FunctionName$1 = functionName;
	var isCallable$2 = isCallable$r;
	var createIteratorConstructor = iteratorCreateConstructor;
	var getPrototypeOf$2 = objectGetPrototypeOf;
	var setPrototypeOf$4 = objectSetPrototypeOf;
	var setToStringTag$1 = setToStringTag$6;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;
	var defineBuiltIn$3 = defineBuiltIn$c;
	var wellKnownSymbol$4 = wellKnownSymbol$p;
	var Iterators$1 = iterators;
	var IteratorsCore = iteratorsCore;
	var PROPER_FUNCTION_NAME$2 = FunctionName$1.PROPER;
	var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$2 = wellKnownSymbol$4('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';
	var returnThis = function () { return this; };
	var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
		createIteratorConstructor(IteratorConstructor, NAME, next);
		var getIterationMethod = function (KIND) {
			if (KIND === DEFAULT && defaultIterator) return defaultIterator;
			if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
			switch (KIND) {
				case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
				case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
				case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
			} return function () { return new IteratorConstructor(this); };
		};
		var TO_STRING_TAG = NAME + ' Iterator';
		var INCORRECT_VALUES_NAME = false;
		var IterablePrototype = Iterable.prototype;
		var nativeIterator = IterablePrototype[ITERATOR$2]
			|| IterablePrototype['@@iterator']
			|| DEFAULT && IterablePrototype[DEFAULT];
		var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
		var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
		var CurrentIteratorPrototype, methods, KEY;
		if (anyNativeIterator) {
			CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
			if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
				if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
					if (setPrototypeOf$4) {
						setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype);
					} else if (!isCallable$2(CurrentIteratorPrototype[ITERATOR$2])) {
						defineBuiltIn$3(CurrentIteratorPrototype, ITERATOR$2, returnThis);
					}
				}
				setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
			}
		}
		if (PROPER_FUNCTION_NAME$2 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
			if (CONFIGURABLE_FUNCTION_NAME$1) {
				createNonEnumerableProperty$4(IterablePrototype, 'name', VALUES);
			} else {
				INCORRECT_VALUES_NAME = true;
				defaultIterator = function values() { return call$5(nativeIterator, this); };
			}
		}
		if (DEFAULT) {
			methods = {
				values: getIterationMethod(VALUES),
				keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
				entries: getIterationMethod(ENTRIES)
			};
			if (FORCED) for (KEY in methods) {
				if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
					defineBuiltIn$3(IterablePrototype, KEY, methods[KEY]);
				}
			} else $$5({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
		}
		if (IterablePrototype[ITERATOR$2] !== defaultIterator) {
			defineBuiltIn$3(IterablePrototype, ITERATOR$2, defaultIterator, { name: DEFAULT });
		}
		Iterators$1[NAME] = defaultIterator;
		return methods;
	};
	getDefaultExportFromCjs(iteratorDefine);

	var createIterResultObject$2 = function (value, done) {
		return { value: value, done: done };
	};
	getDefaultExportFromCjs(createIterResultObject$2);

	var toIndexedObject$2 = toIndexedObject$b;
	var addToUnscopables = addToUnscopables$1;
	var Iterators = iterators;
	var InternalStateModule$4 = internalState;
	var defineProperty$1 = objectDefineProperty.f;
	var defineIterator$1 = iteratorDefine;
	var createIterResultObject$1 = createIterResultObject$2;
	var DESCRIPTORS$4 = descriptors;
	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$3 = InternalStateModule$4.set;
	var getInternalState$3 = InternalStateModule$4.getterFor(ARRAY_ITERATOR);
	var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
		setInternalState$3(this, {
			type: ARRAY_ITERATOR,
			target: toIndexedObject$2(iterated),
			index: 0,
			kind: kind
		});
	}, function () {
		var state = getInternalState$3(this);
		var target = state.target;
		var kind = state.kind;
		var index = state.index++;
		if (!target || index >= target.length) {
			state.target = undefined;
			return createIterResultObject$1(undefined, true);
		}
		if (kind == 'keys') return createIterResultObject$1(index, false);
		if (kind == 'values') return createIterResultObject$1(target[index], false);
		return createIterResultObject$1([index, target[index]], false);
	}, 'values');
	var values = Iterators.Arguments = Iterators.Array;
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');
	if (DESCRIPTORS$4 && values.name !== 'values') try {
		defineProperty$1(values, 'name', { value: 'values' });
	} catch (error) { }
	getDefaultExportFromCjs(es_array_iterator);

	var charAt = stringMultibyte.charAt;
	var toString$3 = toString$b;
	var InternalStateModule$3 = internalState;
	var defineIterator = iteratorDefine;
	var createIterResultObject = createIterResultObject$2;
	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = InternalStateModule$3.set;
	var getInternalState$2 = InternalStateModule$3.getterFor(STRING_ITERATOR);
	defineIterator(String, 'String', function (iterated) {
		setInternalState$2(this, {
			type: STRING_ITERATOR,
			string: toString$3(iterated),
			index: 0
		});
	}, function next() {
		var state = getInternalState$2(this);
		var string = state.string;
		var index = state.index;
		var point;
		if (index >= string.length) return createIterResultObject(undefined, true);
		point = charAt(string, index);
		state.index += point.length;
		return createIterResultObject(point, false);
	});

	var global$b = global$y;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
	var wellKnownSymbol$3 = wellKnownSymbol$p;
	var ITERATOR$1 = wellKnownSymbol$3('iterator');
	var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;
	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
		if (CollectionPrototype) {
			if (CollectionPrototype[ITERATOR$1] !== ArrayValues) try {
				createNonEnumerableProperty$3(CollectionPrototype, ITERATOR$1, ArrayValues);
			} catch (error) {
				CollectionPrototype[ITERATOR$1] = ArrayValues;
			}
			if (!CollectionPrototype[TO_STRING_TAG$1]) {
				createNonEnumerableProperty$3(CollectionPrototype, TO_STRING_TAG$1, COLLECTION_NAME);
			}
			if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
				if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
					createNonEnumerableProperty$3(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
				} catch (error) {
					CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
				}
			}
		}
	};
	for (var COLLECTION_NAME in DOMIterables) {
		handlePrototype(global$b[COLLECTION_NAME] && global$b[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}
	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	var $TypeError$3 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var doesNotExceedSafeInteger$1 = function (it) {
		if (it > MAX_SAFE_INTEGER) throw $TypeError$3('Maximum allowed index exceeded');
		return it;
	};
	getDefaultExportFromCjs(doesNotExceedSafeInteger$1);

	var $$4 = _export;
	var fails$c = fails$B;
	var isArray = isArray$4;
	var isObject$4 = isObject$f;
	var toObject$5 = toObject$c;
	var lengthOfArrayLike$9 = lengthOfArrayLike$f;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var createProperty = createProperty$3;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
	var wellKnownSymbol$2 = wellKnownSymbol$p;
	var V8_VERSION = engineV8Version;
	var IS_CONCAT_SPREADABLE = wellKnownSymbol$2('isConcatSpreadable');
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$c(function () {
		var array = [];
		array[IS_CONCAT_SPREADABLE] = false;
		return array.concat()[0] !== array;
	});
	var isConcatSpreadable = function (O) {
		if (!isObject$4(O)) return false;
		var spreadable = O[IS_CONCAT_SPREADABLE];
		return spreadable !== undefined ? !!spreadable : isArray(O);
	};
	var FORCED$5 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$1('concat');
	$$4({ target: 'Array', proto: true, arity: 1, forced: FORCED$5 }, {
		concat: function concat(arg) {
			var O = toObject$5(this);
			var A = arraySpeciesCreate(O, 0);
			var n = 0;
			var i, k, length, len, E;
			for (i = -1, length = arguments.length; i < length; i++) {
				E = i === -1 ? O : arguments[i];
				if (isConcatSpreadable(E)) {
					len = lengthOfArrayLike$9(E);
					doesNotExceedSafeInteger(n + len);
					for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
				} else {
					doesNotExceedSafeInteger(n + 1);
					createProperty(A, n++, E);
				}
			}
			A.length = n;
			return A;
		}
	});

	var defineWellKnownSymbol = wellKnownSymbolDefine;
	defineWellKnownSymbol('asyncIterator');

	var _extendStatics = function extendStatics(d, b) {
		_extendStatics = Object.setPrototypeOf || {
			__proto__: []
		} instanceof Array && function (d, b) {
			d.__proto__ = b;
		} || function (d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return _extendStatics(d, b);
	};
	function __extends(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		_extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	var _assign = function __assign() {
		_assign = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return _assign.apply(this, arguments);
	};

	var QRData = function () {
		function QRData(mode, data) {
			this.bytes = [];
			this.mode = mode;
			this.data = data;
		}
		QRData.prototype.getLength = function () {
			return this.bytes.length;
		};
		QRData.prototype.getLengthInBits = function (version) {
			var mode = this.mode;
			var error = new Error('illegal mode: '.concat(mode));
			if (1 <= version && version < 10) {
				switch (mode) {
					case Mode.Numeric:
						return 10;
					case Mode.Alphanumeric:
						return 9;
					case Mode.Byte:
						return 8;
					case Mode.Kanji:
						return 8;
					default:
						throw error;
				}
			} else if (version < 27) {
				switch (mode) {
					case Mode.Numeric:
						return 12;
					case Mode.Alphanumeric:
						return 11;
					case Mode.Byte:
						return 16;
					case Mode.Kanji:
						return 10;
					default:
						throw error;
				}
			} else if (version < 41) {
				switch (mode) {
					case Mode.Numeric:
						return 14;
					case Mode.Alphanumeric:
						return 13;
					case Mode.Byte:
						return 16;
					case Mode.Kanji:
						return 12;
					default:
						throw error;
				}
			} else {
				throw new Error('illegal version: '.concat(version));
			}
		};
		return QRData;
	}();

	function encode$2(text) {
		var pos = 0;
		var length = text.length;
		var bytes = [];
		for (var i = 0; i < length; i++) {
			var code = text.charCodeAt(i);
			if (code < 128) {
				bytes[pos++] = code;
			} else if (code < 2048) {
				bytes[pos++] = code >> 6 | 192;
				bytes[pos++] = code & 63 | 128;
			} else if ((code & 0xfc00) === 0xd800 && i + 1 < length && (text.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
				code = 0x10000 + ((code & 0x03ff) << 10) + (text.charCodeAt(++i) & 0x03ff);
				bytes[pos++] = code >> 18 | 240;
				bytes[pos++] = code >> 12 & 63 | 128;
				bytes[pos++] = code >> 6 & 63 | 128;
				bytes[pos++] = code & 63 | 128;
			} else {
				bytes[pos++] = code >> 12 | 224;
				bytes[pos++] = code >> 6 & 63 | 128;
				bytes[pos++] = code & 63 | 128;
			}
		}
		return bytes;
	}
	function decode$3(bytes) {
		var pos = 0;
		var output = '';
		var length = bytes.length;
		var fromCharCode = String.fromCharCode;
		while (pos < length) {
			var c1 = bytes[pos++];
			if (c1 < 128) {
				output += fromCharCode(c1);
			} else if (c1 > 191 && c1 < 224) {
				var c2 = bytes[pos++];
				output += fromCharCode((c1 & 31) << 6 | c2 & 63);
			} else if (c1 > 239 && c1 < 365) {
				var c2 = bytes[pos++];
				var c3 = bytes[pos++];
				var c4 = bytes[pos++];
				var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
				output += fromCharCode(0xd800 + (u >> 10));
				output += fromCharCode(0xdc00 + (u & 1023));
			} else {
				var c2 = bytes[pos++];
				var c3 = bytes[pos++];
				output += fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
			}
		}
		return output;
	}

	var QRByte = function (_super) {
		__extends(QRByte, _super);
		function QRByte(data, encode$1) {
			var _this = _super.call(this, Mode.Byte, data) || this;
			_this.encoding = -1;
			if (typeof encode$1 === 'function') {
				var _a = encode$1(data),
					encoding = _a.encoding,
					bytes = _a.bytes;
				_this.bytes = bytes;
				_this.encoding = encoding;
			} else {
				_this.bytes = encode$2(data);
				_this.encoding = 26;
			}
			return _this;
		}
		QRByte.prototype.writeTo = function (buffer) {
			var bytes = this.bytes;
			for (var _i = 0, bytes_1 = bytes; _i < bytes_1.length; _i++) {
				var byte = bytes_1[_i];
				buffer.put(byte, 8);
			}
		};
		return QRByte;
	}(QRData);

	var isCallable$1 = isCallable$r;
	var isObject$3 = isObject$f;
	var setPrototypeOf$3 = objectSetPrototypeOf;
	var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
		var NewTarget, NewTargetPrototype;
		if (
			setPrototypeOf$3 &&
			isCallable$1(NewTarget = dummy.constructor) &&
			NewTarget !== Wrapper &&
			isObject$3(NewTargetPrototype = NewTarget.prototype) &&
			NewTargetPrototype !== Wrapper.prototype
		) setPrototypeOf$3($this, NewTargetPrototype);
		return $this;
	};
	getDefaultExportFromCjs(inheritIfRequired$2);

	var uncurryThis$a = functionUncurryThis;
	var thisNumberValue$1 = uncurryThis$a(1.0.valueOf);
	getDefaultExportFromCjs(thisNumberValue$1);

	var whitespaces$1 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
		'\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	getDefaultExportFromCjs(whitespaces$1);

	var uncurryThis$9 = functionUncurryThis;
	var requireObjectCoercible = requireObjectCoercible$5;
	var toString$2 = toString$b;
	var whitespaces = whitespaces$1;
	var replace = uncurryThis$9(''.replace);
	var ltrim = RegExp('^[' + whitespaces + ']+');
	var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');
	var createMethod$1 = function (TYPE) {
		return function ($this) {
			var string = toString$2(requireObjectCoercible($this));
			if (TYPE & 1) string = replace(string, ltrim, '');
			if (TYPE & 2) string = replace(string, rtrim, '$1');
			return string;
		};
	};
	var stringTrim = {
		start: createMethod$1(1),
		end: createMethod$1(2),
		trim: createMethod$1(3)
	};
	getDefaultExportFromCjs(stringTrim);

	var $$3 = _export;
	var IS_PURE = isPure;
	var DESCRIPTORS$3 = descriptors;
	var global$a = global$y;
	var path = path$2;
	var uncurryThis$8 = functionUncurryThis;
	var isForced = isForced_1;
	var hasOwn$3 = hasOwnProperty_1;
	var inheritIfRequired$1 = inheritIfRequired$2;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var isSymbol$1 = isSymbol$6;
	var toPrimitive$1 = toPrimitive$3;
	var fails$b = fails$B;
	var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var defineProperty = objectDefineProperty.f;
	var thisNumberValue = thisNumberValue$1;
	var trim = stringTrim.trim;
	var NUMBER = 'Number';
	var NativeNumber = global$a[NUMBER];
	path[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$2 = global$a.TypeError;
	var stringSlice = uncurryThis$8(''.slice);
	var charCodeAt = uncurryThis$8(''.charCodeAt);
	var toNumeric = function (value) {
		var primValue = toPrimitive$1(value, 'number');
		return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};
	var toNumber = function (argument) {
		var it = toPrimitive$1(argument, 'number');
		var first, third, radix, maxCode, digits, length, index, code;
		if (isSymbol$1(it)) throw TypeError$2('Cannot convert a Symbol value to a number');
		if (typeof it == 'string' && it.length > 2) {
			it = trim(it);
			first = charCodeAt(it, 0);
			if (first === 43 || first === 45) {
				third = charCodeAt(it, 2);
				if (third === 88 || third === 120) return NaN;
			} else if (first === 48) {
				switch (charCodeAt(it, 1)) {
					case 66: case 98: radix = 2; maxCode = 49; break;
					case 79: case 111: radix = 8; maxCode = 55; break;
					default: return +it;
				}
				digits = stringSlice(it, 2);
				length = digits.length;
				for (index = 0; index < length; index++) {
					code = charCodeAt(digits, index);
					if (code < 48 || code > maxCode) return NaN;
				} return parseInt(digits, radix);
			}
		} return +it;
	};
	var FORCED$4 = isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));
	var calledWithNew = function (dummy) {
		return isPrototypeOf$3(NumberPrototype, dummy) && fails$b(function () { thisNumberValue(dummy); });
	};
	var NumberWrapper = function Number(value) {
		var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
		return calledWithNew(this) ? inheritIfRequired$1(Object(n), this, NumberWrapper) : n;
	};
	NumberWrapper.prototype = NumberPrototype;
	if (FORCED$4 && !IS_PURE) NumberPrototype.constructor = NumberWrapper;
	$$3({ global: true, constructor: true, wrap: true, forced: FORCED$4 }, {
		Number: NumberWrapper
	});
	var copyConstructorProperties = function (target, source) {
		for (var keys = DESCRIPTORS$3 ? getOwnPropertyNames$2(source) : (
			'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
			'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
			'fromString,range'
		).split(','), j = 0, key; keys.length > j; j++) {
			if (hasOwn$3(source, key = keys[j]) && !hasOwn$3(target, key)) {
				defineProperty(target, key, getOwnPropertyDescriptor(source, key));
			}
		}
	};
	if (FORCED$4 || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);

	var EXP_TABLE = [];
	var LOG_TABLE = [];
	for (var i = 0; i < 256; i++) {
		LOG_TABLE[i] = 0;
		EXP_TABLE[i] = i < 8 ? 1 << i : EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
	}
	for (var i = 0; i < 255; i++) {
		LOG_TABLE[EXP_TABLE[i]] = i;
	}
	function glog(n) {
		if (n < 1) {
			throw new Error('illegal log: '.concat(n));
		}
		return LOG_TABLE[n];
	}
	function gexp(n) {
		while (n < 0) {
			n += 255;
		}
		while (n >= 256) {
			n -= 255;
		}
		return EXP_TABLE[n];
	}

	var Polynomial = function () {
		function Polynomial(num, shift) {
			if (shift === void 0) {
				shift = 0;
			}
			var offset = 0;
			var length = num.length;
			while (offset < length && num[offset] === 0) {
				offset++;
			}
			length -= offset;
			var numbers = [];
			for (var i = 0; i < length; i++) {
				numbers.push(num[offset + i]);
			}
			for (var i = 0; i < shift; i++) {
				numbers.push(0);
			}
			this.num = numbers;
		}
		Polynomial.prototype.getAt = function (index) {
			return this.num[index];
		};
		Polynomial.prototype.getLength = function () {
			return this.num.length;
		};
		Polynomial.prototype.multiply = function (e) {
			var num = [];
			var eLength = e.getLength();
			var tLength = this.getLength();
			var dLength = tLength + eLength - 1;
			for (var i = 0; i < dLength; i++) {
				num.push(0);
			}
			for (var i = 0; i < tLength; i++) {
				for (var j = 0; j < eLength; j++) {
					num[i + j] ^= gexp(glog(this.getAt(i)) + glog(e.getAt(j)));
				}
			}
			return new Polynomial(num);
		};
		Polynomial.prototype.mod = function (e) {
			var eLength = e.getLength();
			var tLength = this.getLength();
			if (tLength - eLength < 0) {
				return this;
			}
			var ratio = glog(this.getAt(0)) - glog(e.getAt(0));
			var num = [];
			for (var i = 0; i < tLength; i++) {
				num.push(this.getAt(i));
			}
			for (var i = 0; i < eLength; i++) {
				num[i] ^= gexp(glog(e.getAt(i)) + ratio);
			}
			return new Polynomial(num).mod(e);
		};
		return Polynomial;
	}();

	var N1 = 3;
	var N2 = 3;
	var N3 = 40;
	var N4 = 10;
	var ALIGNMENT_PATTERN_TABLE = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]];
	var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
	var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
	var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
	function getAlignmentPattern(version) {
		return ALIGNMENT_PATTERN_TABLE[version - 1];
	}
	function getErrorCorrectionPolynomial(errorCorrectionLength) {
		var e = new Polynomial([1]);
		for (var i = 0; i < errorCorrectionLength; i++) {
			e = e.multiply(new Polynomial([1, gexp(i)]));
		}
		return e;
	}
	function getBCHDigit(data) {
		var digit = 0;
		while (data !== 0) {
			digit++;
			data >>>= 1;
		}
		return digit;
	}
	var G18_BCH = getBCHDigit(G18);
	function getBCHVersion(data) {
		var offset = data << 12;
		while (getBCHDigit(offset) - G18_BCH >= 0) {
			offset ^= G18 << getBCHDigit(offset) - G18_BCH;
		}
		return data << 12 | offset;
	}
	var G15_BCH = getBCHDigit(G15);
	function getBCHVersionInfo(data) {
		var offset = data << 10;
		while (getBCHDigit(offset) - G15_BCH >= 0) {
			offset ^= G15 << getBCHDigit(offset) - G15_BCH;
		}
		return (data << 10 | offset) ^ G15_MASK;
	}
	function applyMaskPenaltyRule1Internal(qrcode, isHorizontal) {
		var matrixSize = qrcode.getMatrixSize();
		var penalty = 0;
		for (var i = 0; i < matrixSize; i++) {
			var prevBit = false;
			var numSameBitCells = 0;
			for (var j = 0; j < matrixSize; j++) {
				var bit = isHorizontal ? qrcode.isDark(i, j) : qrcode.isDark(j, i);
				if (bit === prevBit) {
					numSameBitCells++;
					if (numSameBitCells === 5) {
						penalty += N1;
					} else if (numSameBitCells > 5) {
						penalty++;
					}
				} else {
					prevBit = bit;
					numSameBitCells = 1;
				}
			}
		}
		return penalty;
	}
	function applyMaskPenaltyRule1(qrcode) {
		return applyMaskPenaltyRule1Internal(qrcode, true) + applyMaskPenaltyRule1Internal(qrcode, false);
	}
	function applyMaskPenaltyRule2(qrcode) {
		var matrixSize = qrcode.getMatrixSize();
		var penalty = 0;
		for (var y = 0; y < matrixSize - 1; y++) {
			for (var x = 0; x < matrixSize - 1; x++) {
				var value = qrcode.isDark(y, x);
				if (value === qrcode.isDark(y, x + 1) && value === qrcode.isDark(y + 1, x) && value === qrcode.isDark(y + 1, x + 1)) {
					penalty += N2;
				}
			}
		}
		return penalty;
	}
	function isFourWhite(qrcode, rangeIndex, from, to, isHorizontal) {
		from = Math.max(from, 0);
		to = Math.min(to, qrcode.getMatrixSize());
		for (var i = from; i < to; i++) {
			var value = isHorizontal ? qrcode.isDark(rangeIndex, i) : qrcode.isDark(i, rangeIndex);
			if (value) {
				return false;
			}
		}
		return true;
	}
	function applyMaskPenaltyRule3(qrcode) {
		var matrixSize = qrcode.getMatrixSize();
		var penalty = 0;
		for (var y = 0; y < matrixSize; y++) {
			for (var x = 0; x < matrixSize; x++) {
				if (x + 6 < matrixSize && qrcode.isDark(y, x) && !qrcode.isDark(y, x + 1) && qrcode.isDark(y, x + 2) && qrcode.isDark(y, x + 3) && qrcode.isDark(y, x + 4) && !qrcode.isDark(y, x + 5) && qrcode.isDark(y, x + 6) && (isFourWhite(qrcode, y, x - 4, x, true) || isFourWhite(qrcode, y, x + 7, x + 11, true))) {
					penalty += N3;
				}
				if (y + 6 < matrixSize && qrcode.isDark(y, x) && !qrcode.isDark(y + 1, x) && qrcode.isDark(y + 2, x) && qrcode.isDark(y + 3, x) && qrcode.isDark(y + 4, x) && !qrcode.isDark(y + 5, x) && qrcode.isDark(y + 6, x) && (isFourWhite(qrcode, x, y - 4, y, false) || isFourWhite(qrcode, x, y + 7, y + 11, false))) {
					penalty += N3;
				}
			}
		}
		return penalty;
	}
	function applyMaskPenaltyRule4(qrcode) {
		var matrixSize = qrcode.getMatrixSize();
		var numDarkCells = 0;
		for (var y = 0; y < matrixSize; y++) {
			for (var x = 0; x < matrixSize; x++) {
				if (qrcode.isDark(y, x)) {
					numDarkCells++;
				}
			}
		}
		var numTotalCells = matrixSize * matrixSize;
		var fivePercentVariances = Math.floor(Math.abs(numDarkCells * 20 - numTotalCells * 10) / numTotalCells);
		return fivePercentVariances * N4;
	}
	function calculateMaskPenalty(qrcode) {
		return applyMaskPenaltyRule1(qrcode) + applyMaskPenaltyRule2(qrcode) + applyMaskPenaltyRule3(qrcode) + applyMaskPenaltyRule4(qrcode);
	}

	var ErrorCorrectionLevel;
	(function (ErrorCorrectionLevel) {
		ErrorCorrectionLevel[ErrorCorrectionLevel['L'] = 1] = 'L';
		ErrorCorrectionLevel[ErrorCorrectionLevel['M'] = 0] = 'M';
		ErrorCorrectionLevel[ErrorCorrectionLevel['Q'] = 3] = 'Q';
		ErrorCorrectionLevel[ErrorCorrectionLevel['H'] = 2] = 'H';
	})(ErrorCorrectionLevel || (ErrorCorrectionLevel = {}));

	var RSBlock = function () {
		function RSBlock(totalCount, dataCount) {
			this.dataCount = dataCount;
			this.totalCount = totalCount;
		}
		RSBlock.prototype.getDataCount = function () {
			return this.dataCount;
		};
		RSBlock.prototype.getTotalCount = function () {
			return this.totalCount;
		};
		RSBlock.getRSBlocks = function (version, errorCorrectionLevel) {
			var rsBlocks = [];
			var rsBlock = RSBlock.getRSBlockTable(version, errorCorrectionLevel);
			var length = rsBlock.length / 3;
			for (var i = 0; i < length; i++) {
				var count = rsBlock[i * 3 + 0];
				var totalCount = rsBlock[i * 3 + 1];
				var dataCount = rsBlock[i * 3 + 2];
				for (var j = 0; j < count; j++) {
					rsBlocks.push(new RSBlock(totalCount, dataCount));
				}
			}
			return rsBlocks;
		};
		RSBlock.getRSBlockTable = function (version, errorCorrectionLevel) {
			switch (errorCorrectionLevel) {
				case ErrorCorrectionLevel.L:
					return RSBlock.RS_BLOCK_TABLE[(version - 1) * 4 + 0];
				case ErrorCorrectionLevel.M:
					return RSBlock.RS_BLOCK_TABLE[(version - 1) * 4 + 1];
				case ErrorCorrectionLevel.Q:
					return RSBlock.RS_BLOCK_TABLE[(version - 1) * 4 + 2];
				case ErrorCorrectionLevel.H:
					return RSBlock.RS_BLOCK_TABLE[(version - 1) * 4 + 3];
				default:
					throw new Error('illegal error correction level: '.concat(errorCorrectionLevel));
			}
		};
		RSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
		return RSBlock;
	}();

	var BitBuffer = function () {
		function BitBuffer() {
			this.length = 0;
			this.buffer = [];
		}
		BitBuffer.prototype.getBuffer = function () {
			return this.buffer;
		};
		BitBuffer.prototype.getLengthInBits = function () {
			return this.length;
		};
		BitBuffer.prototype.getBit = function (index) {
			return (this.buffer[index / 8 >> 0] >>> 7 - index % 8 & 1) === 1;
		};
		BitBuffer.prototype.put = function (num, length) {
			for (var i = 0; i < length; i++) {
				this.putBit((num >>> length - i - 1 & 1) === 1);
			}
		};
		BitBuffer.prototype.putBit = function (bit) {
			var buffer = this.buffer;
			if (this.length === buffer.length * 8) {
				buffer.push(0);
			}
			if (bit) {
				buffer[this.length / 8 >> 0] |= 0x80 >>> this.length % 8;
			}
			this.length++;
		};
		return BitBuffer;
	}();

	var OutputStream = function () {
		function OutputStream() { }
		OutputStream.prototype.writeBytes = function (bytes, offset, length) {
			if (offset === void 0) {
				offset = 0;
			}
			if (length === void 0) {
				length = bytes.length;
			}
			for (var i = 0; i < length; i++) {
				this.writeByte(bytes[i + offset]);
			}
		};
		OutputStream.prototype.flush = function () { };
		OutputStream.prototype.close = function () {
			this.flush();
		};
		return OutputStream;
	}();

	var ByteArrayOutputStream = function (_super) {
		__extends(ByteArrayOutputStream, _super);
		function ByteArrayOutputStream() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.bytes = [];
			return _this;
		}
		ByteArrayOutputStream.prototype.writeByte = function (byte) {
			this.bytes.push(byte);
		};
		ByteArrayOutputStream.prototype.writeInt16 = function (byte) {
			this.bytes.push(byte, byte >>> 8);
		};
		ByteArrayOutputStream.prototype.toByteArray = function () {
			return this.bytes;
		};
		return ByteArrayOutputStream;
	}(OutputStream);

	function encode$1(ch) {
		if (ch >= 0) {
			if (ch < 26) {
				return 0x41 + ch;
			} else if (ch < 52) {
				return 0x61 + (ch - 26);
			} else if (ch < 62) {
				return 0x30 + (ch - 52);
			} else if (ch === 62) {
				return 0x2b;
			} else if (ch === 63) {
				return 0x2f;
			}
		}
		throw new Error('illegal char: '.concat(String.fromCharCode(ch)));
	}
	var Base64EncodeOutputStream = function (_super) {
		__extends(Base64EncodeOutputStream, _super);
		function Base64EncodeOutputStream(stream) {
			var _this = _super.call(this) || this;
			_this.buffer = 0;
			_this.length = 0;
			_this.bufLength = 0;
			_this.stream = stream;
			return _this;
		}
		Base64EncodeOutputStream.prototype.writeByte = function (byte) {
			this.buffer = this.buffer << 8 | byte & 0xff;
			this.bufLength += 8;
			this.length++;
			while (this.bufLength >= 6) {
				this.writeEncoded(this.buffer >>> this.bufLength - 6);
				this.bufLength -= 6;
			}
		};
		Base64EncodeOutputStream.prototype.flush = function () {
			if (this.bufLength > 0) {
				this.writeEncoded(this.buffer << 6 - this.bufLength);
				this.buffer = 0;
				this.bufLength = 0;
			}
			var stream = this.stream;
			if (this.length % 3 != 0) {
				var pad = 3 - this.length % 3;
				for (var i = 0; i < pad; i++) {
					stream.writeByte(0x3d);
				}
			}
		};
		Base64EncodeOutputStream.prototype.writeEncoded = function (byte) {
			this.stream.writeByte(encode$1(byte & 0x3f));
		};
		return Base64EncodeOutputStream;
	}(OutputStream);

	function encodeToBase64(data) {
		var output = new ByteArrayOutputStream();
		var stream = new Base64EncodeOutputStream(output);
		stream.writeBytes(data);
		stream.close();
		output.close();
		return output.toByteArray();
	}
	var LZWTable = function () {
		function LZWTable() {
			this.size = 0;
			this.map = {};
		}
		LZWTable.prototype.add = function (key) {
			if (!this.contains(key)) {
				this.map[key] = this.size++;
			}
		};
		LZWTable.prototype.getSize = function () {
			return this.size;
		};
		LZWTable.prototype.indexOf = function (key) {
			return this.map[key];
		};
		LZWTable.prototype.contains = function (key) {
			return this.map[key] >= 0;
		};
		return LZWTable;
	}();
	var BitOutputStream = function () {
		function BitOutputStream(output) {
			this.output = output;
			this.bitLength = 0;
			this.bitBuffer = 0;
		}
		BitOutputStream.prototype.write = function (data, length) {
			if (data >>> length !== 0) {
				throw new Error('length overflow');
			}
			var output = this.output;
			while (this.bitLength + length >= 8) {
				output.writeByte(0xff & (data << this.bitLength | this.bitBuffer));
				length -= 8 - this.bitLength;
				data >>>= 8 - this.bitLength;
				this.bitBuffer = 0;
				this.bitLength = 0;
			}
			this.bitBuffer = data << this.bitLength | this.bitBuffer;
			this.bitLength = this.bitLength + length;
		};
		BitOutputStream.prototype.flush = function () {
			var output = this.output;
			if (this.bitLength > 0) {
				output.writeByte(this.bitBuffer);
			}
			output.flush();
		};
		BitOutputStream.prototype.close = function () {
			this.flush();
			this.output.close();
		};
		return BitOutputStream;
	}();
	var GIFImage = function () {
		function GIFImage(width, height) {
			this.data = [];
			this.width = width;
			this.height = height;
			var size = width * height;
			for (var i = 0; i < size; i++) {
				this.data[i] = 0;
			}
		}
		GIFImage.prototype.getLZWRaster = function (lzwMinCodeSize) {
			var table = new LZWTable();
			var fromCharCode = String.fromCharCode;
			var clearCode = 1 << lzwMinCodeSize;
			var endCode = (1 << lzwMinCodeSize) + 1;
			for (var i = 0; i < clearCode; i++) {
				table.add(fromCharCode(i));
			}
			table.add(fromCharCode(clearCode));
			table.add(fromCharCode(endCode));
			var bitLength = lzwMinCodeSize + 1;
			var byteOutput = new ByteArrayOutputStream();
			var bitOutput = new BitOutputStream(byteOutput);
			try {
				var data = this.data;
				var length_1 = data.length;
				var fromCharCode_1 = String.fromCharCode;
				bitOutput.write(clearCode, bitLength);
				var dataIndex = 0;
				var words = fromCharCode_1(data[dataIndex++]);
				while (dataIndex < length_1) {
					var char = fromCharCode_1(data[dataIndex++]);
					if (table.contains(words + char)) {
						words += char;
					} else {
						bitOutput.write(table.indexOf(words), bitLength);
						if (table.getSize() < 0xfff) {
							if (table.getSize() === 1 << bitLength) {
								bitLength++;
							}
							table.add(words + char);
						}
						words = char;
					}
				}
				bitOutput.write(table.indexOf(words), bitLength);
				bitOutput.write(endCode, bitLength);
			} finally {
				bitOutput.close();
			}
			return byteOutput.toByteArray();
		};
		GIFImage.prototype.setPixel = function (x, y, pixel) {
			var _a = this,
				width = _a.width,
				height = _a.height;
			if (x < 0 || width <= x) throw new Error('illegal x axis: '.concat(x));
			if (y < 0 || height <= y) throw new Error('illegal y axis: '.concat(y));
			this.data[y * width + x] = pixel;
		};
		GIFImage.prototype.getPixel = function (x, y) {
			var _a = this,
				width = _a.width,
				height = _a.height;
			if (x < 0 || width <= x) throw new Error('illegal x axis: '.concat(x));
			if (y < 0 || height <= y) throw new Error('illegal y axis: '.concat(y));
			return this.data[y * width + x];
		};
		GIFImage.prototype.write = function (output) {
			var _a = this,
				width = _a.width,
				height = _a.height;
			output.writeByte(0x47);
			output.writeByte(0x49);
			output.writeByte(0x46);
			output.writeByte(0x38);
			output.writeByte(0x37);
			output.writeByte(0x61);
			output.writeInt16(width);
			output.writeInt16(height);
			output.writeByte(0x80);
			output.writeByte(0);
			output.writeByte(0);
			output.writeByte(0x00);
			output.writeByte(0x00);
			output.writeByte(0x00);
			output.writeByte(0xff);
			output.writeByte(0xff);
			output.writeByte(0xff);
			output.writeByte(0x2c);
			output.writeInt16(0);
			output.writeInt16(0);
			output.writeInt16(width);
			output.writeInt16(height);
			output.writeByte(0);
			var lzwMinCodeSize = 2;
			var raster = this.getLZWRaster(lzwMinCodeSize);
			var raLength = raster.length;
			output.writeByte(lzwMinCodeSize);
			var offset = 0;
			while (raLength - offset > 255) {
				output.writeByte(255);
				output.writeBytes(raster, offset, 255);
				offset += 255;
			}
			var length = raLength - offset;
			output.writeByte(length);
			output.writeBytes(raster, offset, length);
			output.writeByte(0x00);
			output.writeByte(0x3b);
		};
		GIFImage.prototype.toDataURL = function () {
			var output = new ByteArrayOutputStream();
			this.write(output);
			var bytes = encodeToBase64(output.toByteArray());
			output.close();
			var length = bytes.length;
			var fromCharCode = String.fromCharCode;
			var url = 'data:image/gif;base64,';
			for (var i = 0; i < length; i++) {
				url += fromCharCode(bytes[i]);
			}
			return url;
		};
		return GIFImage;
	}();

	function getMaskFunc(maskPattern) {
		switch (maskPattern) {
			case 0:
				return function (x, y) {
					return (x + y & 0x1) === 0;
				};
			case 1:
				return function (_x, y) {
					return (y & 0x1) === 0;
				};
			case 2:
				return function (x, _y) {
					return x % 3 === 0;
				};
			case 3:
				return function (x, y) {
					return (x + y) % 3 === 0;
				};
			case 4:
				return function (x, y) {
					return ((x / 3 >> 0) + (y / 2 >> 0) & 0x1) === 0;
				};
			case 5:
				return function (x, y) {
					return (x * y & 0x1) + x * y % 3 === 0;
				};
			case 6:
				return function (x, y) {
					return ((x * y & 0x1) + x * y % 3 & 0x1) === 0;
				};
			case 7:
				return function (x, y) {
					return (x * y % 3 + (x + y & 0x1) & 0x1) === 0;
				};
			default:
				throw new Error('illegal mask: '.concat(maskPattern));
		}
	}

	var PAD0 = 0xec;
	var PAD1 = 0x11;
	var toString$1 = Object.prototype.toString;
	function appendECI(encoding, buffer) {
		if (encoding < 0 || encoding >= 1000000) {
			throw new Error('byte mode encoding hint out of range');
		}
		buffer.put(Mode.ECI, 4);
		if (encoding < 1 << 7) {
			buffer.put(encoding, 8);
		} else if (encoding < 1 << 14) {
			buffer.put(2, 2);
			buffer.put(encoding, 14);
		} else {
			buffer.put(6, 3);
			buffer.put(encoding, 21);
		}
	}
	function prepareData(version, errorCorrectionLevel, encodingHint, chunks) {
		var buffer = new BitBuffer();
		var rsBlocks = RSBlock.getRSBlocks(version, errorCorrectionLevel);
		for (var _i = 0, chunks_1 = chunks; _i < chunks_1.length; _i++) {
			var data = chunks_1[_i];
			var mode = data.mode;
			if (encodingHint && mode === Mode.Byte) {
				appendECI(data.encoding, buffer);
			}
			buffer.put(mode, 4);
			buffer.put(data.getLength(), data.getLengthInBits(version));
			data.writeTo(buffer);
		}
		var maxDataCount = 0;
		for (var _a = 0, rsBlocks_1 = rsBlocks; _a < rsBlocks_1.length; _a++) {
			var rsBlock = rsBlocks_1[_a];
			maxDataCount += rsBlock.getDataCount();
		}
		maxDataCount *= 8;
		return [buffer, rsBlocks, maxDataCount];
	}
	function createBytes(buffer, rsBlocks) {
		var offset = 0;
		var maxDcCount = 0;
		var maxEcCount = 0;
		var dcData = [];
		var ecData = [];
		var rsLength = rsBlocks.length;
		var bufferData = buffer.getBuffer();
		for (var r = 0; r < rsLength; r++) {
			var rsBlock = rsBlocks[r];
			var dcCount = rsBlock.getDataCount();
			var ecCount = rsBlock.getTotalCount() - dcCount;
			maxDcCount = Math.max(maxDcCount, dcCount);
			maxEcCount = Math.max(maxEcCount, ecCount);
			dcData[r] = [];
			for (var i = 0; i < dcCount; i++) {
				dcData[r][i] = 0xff & bufferData[i + offset];
			}
			offset += dcCount;
			var rsPoly = getErrorCorrectionPolynomial(ecCount);
			var ecLength = rsPoly.getLength() - 1;
			var rawPoly = new Polynomial(dcData[r], ecLength);
			var modPoly = rawPoly.mod(rsPoly);
			var mpLength = modPoly.getLength();
			ecData[r] = [];
			for (var i = 0; i < ecLength; i++) {
				var modIndex = i + mpLength - ecLength;
				ecData[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
			}
		}
		buffer = new BitBuffer();
		for (var i = 0; i < maxDcCount; i++) {
			for (var r = 0; r < rsLength; r++) {
				if (i < dcData[r].length) {
					buffer.put(dcData[r][i], 8);
				}
			}
		}
		for (var i = 0; i < maxEcCount; i++) {
			for (var r = 0; r < rsLength; r++) {
				if (i < ecData[r].length) {
					buffer.put(ecData[r][i], 8);
				}
			}
		}
		return buffer;
	}
	function createData(buffer, rsBlocks, maxDataCount) {
		if (buffer.getLengthInBits() + 4 <= maxDataCount) {
			buffer.put(0, 4);
		}
		while (buffer.getLengthInBits() % 8 !== 0) {
			buffer.putBit(false);
		}
		while (true) {
			if (buffer.getLengthInBits() >= maxDataCount) {
				break;
			}
			buffer.put(PAD0, 8);
			if (buffer.getLengthInBits() >= maxDataCount) {
				break;
			}
			buffer.put(PAD1, 8);
		}
		return createBytes(buffer, rsBlocks);
	}
	var Encoder = function () {
		function Encoder(options) {
			if (options === void 0) {
				options = {};
			}
			this.matrixSize = 0;
			this.chunks = [];
			this.matrix = [];
			var _a = options.version,
				version = _a === void 0 ? 0 : _a,
				_b = options.encodingHint,
				encodingHint = _b === void 0 ? false : _b,
				_c = options.errorCorrectionLevel,
				errorCorrectionLevel = _c === void 0 ? ErrorCorrectionLevel.L : _c;
			this.setVersion(version);
			this.setEncodingHint(encodingHint);
			this.setErrorCorrectionLevel(errorCorrectionLevel);
		}
		Encoder.prototype.getMatrix = function () {
			return this.matrix;
		};
		Encoder.prototype.getMatrixSize = function () {
			return this.matrixSize;
		};
		Encoder.prototype.getVersion = function () {
			return this.version;
		};
		Encoder.prototype.setVersion = function (version) {
			this.version = Math.min(40, Math.max(0, version >> 0));
			this.auto = this.version === 0;
			return this;
		};
		Encoder.prototype.getErrorCorrectionLevel = function () {
			return this.errorCorrectionLevel;
		};
		Encoder.prototype.setErrorCorrectionLevel = function (errorCorrectionLevel) {
			switch (errorCorrectionLevel) {
				case ErrorCorrectionLevel.L:
				case ErrorCorrectionLevel.M:
				case ErrorCorrectionLevel.Q:
				case ErrorCorrectionLevel.H:
					this.errorCorrectionLevel = errorCorrectionLevel;
			}
			return this;
		};
		Encoder.prototype.getEncodingHint = function () {
			return this.encodingHint;
		};
		Encoder.prototype.setEncodingHint = function (encodingHint) {
			this.encodingHint = encodingHint;
			return this;
		};
		Encoder.prototype.write = function (data) {
			var chunks = this.chunks;
			if (data instanceof QRData) {
				chunks.push(data);
			} else {
				var type = toString$1.call(data);
				if (type === '[object String]') {
					chunks.push(new QRByte(data));
				} else {
					throw new Error('illegal data: '.concat(data));
				}
			}
			return this;
		};
		Encoder.prototype.isDark = function (row, col) {
			return this.matrix[row][col] === true;
		};
		Encoder.prototype.setupFinderPattern = function (row, col) {
			var matrix = this.matrix;
			var matrixSize = this.matrixSize;
			for (var r = -1; r <= 7; r++) {
				for (var c = -1; c <= 7; c++) {
					if (row + r <= -1 || matrixSize <= row + r || col + c <= -1 || matrixSize <= col + c) {
						continue;
					}
					if (0 <= r && r <= 6 && (c === 0 || c === 6) || 0 <= c && c <= 6 && (r === 0 || r === 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
						matrix[row + r][col + c] = true;
					} else {
						matrix[row + r][col + c] = false;
					}
				}
			}
		};
		Encoder.prototype.setupAlignmentPattern = function () {
			var matrix = this.matrix;
			var pos = getAlignmentPattern(this.version);
			var length = pos.length;
			for (var i = 0; i < length; i++) {
				for (var j = 0; j < length; j++) {
					var row = pos[i];
					var col = pos[j];
					if (matrix[row][col] !== null) {
						continue;
					}
					for (var r = -2; r <= 2; r++) {
						for (var c = -2; c <= 2; c++) {
							if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
								matrix[row + r][col + c] = true;
							} else {
								matrix[row + r][col + c] = false;
							}
						}
					}
				}
			}
		};
		Encoder.prototype.setupTimingPattern = function () {
			var matrix = this.matrix;
			var count = this.matrixSize - 8;
			for (var i = 8; i < count; i++) {
				var bit = i % 2 === 0;
				if (matrix[i][6] === null) {
					matrix[i][6] = bit;
				}
				if (matrix[6][i] === null) {
					matrix[6][i] = bit;
				}
			}
		};
		Encoder.prototype.setupFormatInfo = function (maskPattern) {
			var matrix = this.matrix;
			var data = this.errorCorrectionLevel << 3 | maskPattern;
			var bits = getBCHVersionInfo(data);
			var matrixSize = this.matrixSize;
			for (var i = 0; i < 15; i++) {
				var bit = (bits >> i & 1) === 1;
				if (i < 6) {
					matrix[i][8] = bit;
				} else if (i < 8) {
					matrix[i + 1][8] = bit;
				} else {
					matrix[matrixSize - 15 + i][8] = bit;
				}
				if (i < 8) {
					matrix[8][matrixSize - i - 1] = bit;
				} else if (i < 9) {
					matrix[8][15 - i - 1 + 1] = bit;
				} else {
					matrix[8][15 - i - 1] = bit;
				}
			}
			matrix[matrixSize - 8][8] = true;
		};
		Encoder.prototype.setupVersionInfo = function () {
			if (this.version >= 7) {
				var matrix = this.matrix;
				var matrixSize = this.matrixSize;
				var bits = getBCHVersion(this.version);
				for (var i = 0; i < 18; i++) {
					var bit = (bits >> i & 1) === 1;
					matrix[i / 3 >> 0][i % 3 + matrixSize - 8 - 3] = bit;
					matrix[i % 3 + matrixSize - 8 - 3][i / 3 >> 0] = bit;
				}
			}
		};
		Encoder.prototype.setupCodewords = function (data, maskPattern) {
			var matrix = this.matrix;
			var matrixSize = this.matrixSize;
			var bitLength = data.getLengthInBits();
			var maskFunc = getMaskFunc(maskPattern);
			var bitIndex = 0;
			for (var right = matrixSize - 1; right >= 1; right -= 2) {
				if (right === 6) {
					right = 5;
				}
				for (var vert = 0; vert < matrixSize; vert++) {
					for (var j = 0; j < 2; j++) {
						var x = right - j;
						var upward = (right + 1 & 2) === 0;
						var y = upward ? matrixSize - 1 - vert : vert;
						if (matrix[y][x] !== null) {
							continue;
						}
						var bit = false;
						if (bitIndex < bitLength) {
							bit = data.getBit(bitIndex++);
						}
						var invert = maskFunc(x, y);
						if (invert) {
							bit = !bit;
						}
						matrix[y][x] = bit;
					}
				}
			}
		};
		Encoder.prototype.buildMatrix = function (data, maskPattern) {
			var matrix = [];
			var matrixSize = this.matrixSize;
			for (var row = 0; row < matrixSize; row++) {
				matrix[row] = [];
				for (var col = 0; col < matrixSize; col++) {
					matrix[row][col] = null;
				}
			}
			this.matrix = matrix;
			this.setupFinderPattern(0, 0);
			this.setupFinderPattern(matrixSize - 7, 0);
			this.setupFinderPattern(0, matrixSize - 7);
			this.setupAlignmentPattern();
			this.setupTimingPattern();
			this.setupFormatInfo(maskPattern);
			this.setupVersionInfo();
			this.setupCodewords(data, maskPattern);
		};
		Encoder.prototype.make = function () {
			var _a, _b;
			var buffer;
			var rsBlocks;
			var maxDataCount;
			var _c = this,
				chunks = _c.chunks,
				errorCorrectionLevel = _c.errorCorrectionLevel;
			if (this.auto) {
				var version = 1;
				for (; version <= 40; version++) {
					_a = prepareData(version, errorCorrectionLevel, this.encodingHint, chunks), buffer = _a[0], rsBlocks = _a[1], maxDataCount = _a[2];
					if (buffer.getLengthInBits() <= maxDataCount) break;
				}
				var dataLengthInBits = buffer.getLengthInBits();
				if (dataLengthInBits > maxDataCount) {
					throw new Error('data overflow: '.concat(dataLengthInBits, ' > ').concat(maxDataCount));
				}
				this.version = version;
			} else {
				_b = prepareData(this.version, errorCorrectionLevel, this.encodingHint, chunks), buffer = _b[0], rsBlocks = _b[1], maxDataCount = _b[2];
			}
			this.matrixSize = this.version * 4 + 17;
			var matrices = [];
			var data = createData(buffer, rsBlocks, maxDataCount);
			var bestMaskPattern = -1;
			var minPenalty = Number.MAX_VALUE;
			for (var maskPattern = 0; maskPattern < 8; maskPattern++) {
				this.buildMatrix(data, maskPattern);
				matrices.push(this.matrix);
				var penalty = calculateMaskPenalty(this);
				if (penalty < minPenalty) {
					minPenalty = penalty;
					bestMaskPattern = maskPattern;
				}
			}
			this.matrix = matrices[bestMaskPattern];
			return this;
		};
		Encoder.prototype.toDataURL = function (moduleSize, margin) {
			if (moduleSize === void 0) {
				moduleSize = 2;
			}
			if (margin === void 0) {
				margin = moduleSize * 4;
			}
			moduleSize = Math.max(1, moduleSize >> 0);
			margin = Math.max(0, margin >> 0);
			var matrixSize = this.matrixSize;
			var size = moduleSize * matrixSize + margin * 2;
			var min = margin;
			var max = size - margin;
			var gif = new GIFImage(size, size);
			for (var y = 0; y < size; y++) {
				for (var x = 0; x < size; x++) {
					if (min <= x && x < max && min <= y && y < max) {
						var row = (y - min) / moduleSize >> 0;
						var col = (x - min) / moduleSize >> 0;
						gif.setPixel(x, y, this.isDark(row, col) ? 0 : 1);
					} else {
						gif.setPixel(x, y, 1);
					}
				}
			}
			return gif.toDataURL();
		};
		Encoder.prototype.clear = function () {
			this.chunks = [];
		};
		return Encoder;
	}();

	var tryToString$1 = tryToString$7;
	var $TypeError$2 = TypeError;
	var deletePropertyOrThrow$2 = function (O, P) {
		if (!delete O[P]) throw $TypeError$2('Cannot delete property ' + tryToString$1(P) + ' of ' + tryToString$1(O));
	};
	getDefaultExportFromCjs(deletePropertyOrThrow$2);

	var arraySlice$3 = arraySliceSimple;
	var floor$3 = Math.floor;
	var mergeSort = function (array, comparefn) {
		var length = array.length;
		var middle = floor$3(length / 2);
		return length < 8 ? insertionSort(array, comparefn) : merge(
			array,
			mergeSort(arraySlice$3(array, 0, middle), comparefn),
			mergeSort(arraySlice$3(array, middle), comparefn),
			comparefn
		);
	};
	var insertionSort = function (array, comparefn) {
		var length = array.length;
		var i = 1;
		var element, j;
		while (i < length) {
			j = i;
			element = array[i];
			while (j && comparefn(array[j - 1], element) > 0) {
				array[j] = array[--j];
			}
			if (j !== i++) array[j] = element;
		} return array;
	};
	var merge = function (array, left, right, comparefn) {
		var llength = left.length;
		var rlength = right.length;
		var lindex = 0;
		var rindex = 0;
		while (lindex < llength || rindex < rlength) {
			array[lindex + rindex] = (lindex < llength && rindex < rlength)
				? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
				: lindex < llength ? left[lindex++] : right[rindex++];
		} return array;
	};
	var arraySort = mergeSort;
	getDefaultExportFromCjs(arraySort);

	var userAgent$1 = engineUserAgent;
	var firefox = userAgent$1.match(/firefox\/(\d+)/i);
	var engineFfVersion = !!firefox && +firefox[1];
	getDefaultExportFromCjs(engineFfVersion);

	var UA = engineUserAgent;
	var engineIsIeOrEdge = /MSIE|Trident/.test(UA);
	getDefaultExportFromCjs(engineIsIeOrEdge);

	var userAgent = engineUserAgent;
	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
	var engineWebkitVersion = !!webkit && +webkit[1];
	getDefaultExportFromCjs(engineWebkitVersion);

	var $$2 = _export;
	var uncurryThis$7 = functionUncurryThis;
	var aCallable$2 = aCallable$b;
	var toObject$4 = toObject$c;
	var lengthOfArrayLike$8 = lengthOfArrayLike$f;
	var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;
	var toString = toString$b;
	var fails$a = fails$B;
	var internalSort$1 = arraySort;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
	var FF$1 = engineFfVersion;
	var IE_OR_EDGE$1 = engineIsIeOrEdge;
	var V8$1 = engineV8Version;
	var WEBKIT$1 = engineWebkitVersion;
	var test = [];
	var nativeSort$1 = uncurryThis$7(test.sort);
	var push = uncurryThis$7(test.push);
	var FAILS_ON_UNDEFINED = fails$a(function () {
		test.sort(undefined);
	});
	var FAILS_ON_NULL = fails$a(function () {
		test.sort(null);
	});
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('sort');
	var STABLE_SORT$1 = !fails$a(function () {
		if (V8$1) return V8$1 < 70;
		if (FF$1 && FF$1 > 3) return;
		if (IE_OR_EDGE$1) return true;
		if (WEBKIT$1) return WEBKIT$1 < 603;
		var result = '';
		var code, chr, value, index;
		for (code = 65; code < 76; code++) {
			chr = String.fromCharCode(code);
			switch (code) {
				case 66: case 69: case 70: case 72: value = 3; break;
				case 68: case 71: value = 4; break;
				default: value = 2;
			}
			for (index = 0; index < 47; index++) {
				test.push({ k: chr + index, v: value });
			}
		}
		test.sort(function (a, b) { return b.v - a.v; });
		for (index = 0; index < test.length; index++) {
			chr = test[index].k.charAt(0);
			if (result.charAt(result.length - 1) !== chr) result += chr;
		}
		return result !== 'DGBEFHACIJK';
	});
	var FORCED$3 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT$1;
	var getSortCompare$1 = function (comparefn) {
		return function (x, y) {
			if (y === undefined) return -1;
			if (x === undefined) return 1;
			if (comparefn !== undefined) return +comparefn(x, y) || 0;
			return toString(x) > toString(y) ? 1 : -1;
		};
	};
	$$2({ target: 'Array', proto: true, forced: FORCED$3 }, {
		sort: function sort(comparefn) {
			if (comparefn !== undefined) aCallable$2(comparefn);
			var array = toObject$4(this);
			if (STABLE_SORT$1) return comparefn === undefined ? nativeSort$1(array) : nativeSort$1(array, comparefn);
			var items = [];
			var arrayLength = lengthOfArrayLike$8(array);
			var itemsLength, index;
			for (index = 0; index < arrayLength; index++) {
				if (index in array) push(items, array[index]);
			}
			internalSort$1(items, getSortCompare$1(comparefn));
			itemsLength = lengthOfArrayLike$8(items);
			index = 0;
			while (index < itemsLength) array[index] = items[index++];
			while (index < arrayLength) deletePropertyOrThrow$1(array, index++);
			return array;
		}
	});

	var $$1 = _export;
	var $filter$1 = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	$$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
		filter: function filter(callbackfn) {
			return $filter$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
		}
	});

	var MIN_QUAD_RATIO = 0.5;
	var MAX_QUAD_RATIO = 1.5;
	var MAX_FINDERPATTERNS_TO_SEARCH = 4;
	function distance(a, b) {
		return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
	}
	function sum(values) {
		return values.reduce(function (a, b) {
			return a + b;
		});
	}
	function reorderFinderPatterns(pattern1, pattern2, pattern3) {
		var _a, _b, _c, _d;
		var oneTwoDistance = distance(pattern1, pattern2);
		var twoThreeDistance = distance(pattern2, pattern3);
		var oneThreeDistance = distance(pattern1, pattern3);
		var topLeft;
		var topRight;
		var bottomLeft;
		if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) {
			_a = [pattern2, pattern1, pattern3], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
		} else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) {
			_b = [pattern1, pattern2, pattern3], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
		} else {
			_c = [pattern1, pattern3, pattern2], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
		}
		if ((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y) - (topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x) < 0) {
			_d = [topRight, bottomLeft], bottomLeft = _d[0], topRight = _d[1];
		}
		return {
			bottomLeft: bottomLeft,
			topLeft: topLeft,
			topRight: topRight
		};
	}
	function computeDimension(topLeft, topRight, bottomLeft, matrix) {
		var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 + sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 + sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
		if (moduleSize < 1) {
			throw new Error('invalid module size');
		}
		var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
		var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
		var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
		switch (dimension % 4) {
			case 0:
				dimension++;
				break;
			case 2:
				dimension--;
				break;
		}
		return {
			dimension: dimension,
			moduleSize: moduleSize
		};
	}
	function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
		var switchPoints = [{
			x: Math.floor(origin.x),
			y: Math.floor(origin.y)
		}];
		var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
		var fromX;
		var fromY;
		var toX;
		var toY;
		if (steep) {
			fromX = Math.floor(origin.y);
			fromY = Math.floor(origin.x);
			toX = Math.floor(end.y);
			toY = Math.floor(end.x);
		} else {
			fromX = Math.floor(origin.x);
			fromY = Math.floor(origin.y);
			toX = Math.floor(end.x);
			toY = Math.floor(end.y);
		}
		var dx = Math.abs(toX - fromX);
		var dy = Math.abs(toY - fromY);
		var xStep = fromX < toX ? 1 : -1;
		var yStep = fromY < toY ? 1 : -1;
		var currentPixel = true;
		var error = Math.floor(-dx / 2);
		for (var x = fromX, y = fromY; x !== toX + xStep; x += xStep) {
			var realX = steep ? y : x;
			var realY = steep ? x : y;
			if (matrix.get(realX, realY) !== currentPixel) {
				currentPixel = !currentPixel;
				switchPoints.push({
					x: realX,
					y: realY
				});
				if (switchPoints.length === length + 1) {
					break;
				}
			}
			error += dy;
			if (error > 0) {
				if (y === toY) {
					break;
				}
				y += yStep;
				error -= dx;
			}
		}
		var distances = [];
		for (var i = 0; i < length; i++) {
			if (switchPoints[i] && switchPoints[i + 1]) {
				distances.push(distance(switchPoints[i], switchPoints[i + 1]));
			} else {
				distances.push(0);
			}
		}
		return distances;
	}
	function countBlackWhiteRun(origin, end, matrix, length) {
		var _a;
		var rise = end.y - origin.y;
		var run = end.x - origin.x;
		var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
		var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, {
			x: origin.x - run,
			y: origin.y - rise
		}, matrix, Math.ceil(length / 2));
		var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1;
		return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
	}
	function scoreBlackWhiteRun(sequence, ratios) {
		var averageSize = sum(sequence) / sum(ratios);
		var error = 0;
		ratios.forEach(function (ratio, i) {
			error += Math.pow(sequence[i] - ratio * averageSize, 2);
		});
		return {
			averageSize: averageSize,
			error: error
		};
	}
	function scorePattern(point, ratios, matrix) {
		try {
			var horizontalRun = countBlackWhiteRun(point, {
				x: -1,
				y: point.y
			}, matrix, ratios.length);
			var verticalRun = countBlackWhiteRun(point, {
				x: point.x,
				y: -1
			}, matrix, ratios.length);
			var topLeftPoint = {
				x: Math.max(0, point.x - point.y) - 1,
				y: Math.max(0, point.y - point.x) - 1
			};
			var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
			var bottomLeftPoint = {
				x: Math.min(matrix.width, point.x + point.y) + 1,
				y: Math.min(matrix.height, point.y + point.x) + 1
			};
			var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
			var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
			var vertError = scoreBlackWhiteRun(verticalRun, ratios);
			var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
			var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
			var ratioError = Math.sqrt(horzError.error * horzError.error + vertError.error * vertError.error + diagDownError.error * diagDownError.error + diagUpError.error * diagUpError.error);
			var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
			var sizeError = (Math.pow(horzError.averageSize - avgSize, 2) + Math.pow(vertError.averageSize - avgSize, 2) + Math.pow(diagDownError.averageSize - avgSize, 2) + Math.pow(diagUpError.averageSize - avgSize, 2)) / avgSize;
			return ratioError + sizeError;
		} catch (_a) {
			return Infinity;
		}
	}
	function recenterLocation(matrix, point) {
		var leftX = Math.round(point.x);
		while (matrix.get(leftX, Math.round(point.y))) {
			leftX--;
		}
		var rightX = Math.round(point.x);
		while (matrix.get(rightX, Math.round(point.y))) {
			rightX++;
		}
		var x = (leftX + rightX) / 2;
		var topY = Math.round(point.y);
		while (matrix.get(Math.round(x), topY)) {
			topY--;
		}
		var bottomY = Math.round(point.y);
		while (matrix.get(Math.round(x), bottomY)) {
			bottomY++;
		}
		var y = (topY + bottomY) / 2;
		return {
			x: x,
			y: y
		};
	}
	function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
		var _a;
		var dimension;
		var moduleSize;
		try {
			_a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize;
		} catch (_b) {
			return null;
		}
		var bottomRightFinderPattern = {
			x: topRight.x - topLeft.x + bottomLeft.x,
			y: topRight.y - topLeft.y + bottomLeft.y
		};
		var modulesBetweenFinderPatterns = (distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize;
		var correctionToTopLeft = 1 - 3 / modulesBetweenFinderPatterns;
		var expectedAlignmentPattern = {
			x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
			y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y)
		};
		var alignmentPatterns = alignmentPatternQuads.reduce(function (quads, _a) {
			var top = _a.top,
				bottom = _a.bottom;
			var x = (top.startX + top.endX + bottom.startX + bottom.endX) / 4;
			var y = (top.y + bottom.y + 1) / 2;
			var intX = Math.floor(x);
			var intY = Math.floor(y);
			if (matrix.get(intX, intY)) {
				var sizeScore = scorePattern({
					x: intX,
					y: intY
				}, [1, 1, 1], matrix);
				var score = sizeScore + distance({
					x: x,
					y: y
				}, expectedAlignmentPattern);
				quads.push({
					x: x,
					y: y,
					score: score
				});
			}
			return quads;
		}, []).sort(function (a, b) {
			return a.score - b.score;
		});
		var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
		return {
			alignmentPattern: alignmentPattern,
			dimension: dimension
		};
	}
	function locate(matrix) {
		var finderPatternQuads = [];
		var alignmentPatternQuads = [];
		var activeFinderPatternQuads = [];
		var activeAlignmentPatternQuads = [];
		var _loop_1 = function _loop_1(y) {
			var length_1 = 0;
			var lastBit = false;
			var scans = [0, 0, 0, 0, 0];
			var _loop_2 = function _loop_2(x) {
				var v = matrix.get(x, y);
				if (v === lastBit) {
					length_1++;
				} else {
					scans = [scans[1], scans[2], scans[3], scans[4], length_1];
					length_1 = 1;
					lastBit = v;
					var averageFinderPatternBlocksize = sum(scans) / 7;
					var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize && Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize && !v;
					var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
					var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize && v;
					if (validFinderPattern) {
						var endX_1 = x - scans[3] - scans[4];
						var startX_1 = endX_1 - scans[2];
						var line = {
							startX: startX_1,
							endX: endX_1,
							y: y
						};
						var matchingQuads = activeFinderPatternQuads.filter(function (q) {
							return startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX || startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
						});
						if (matchingQuads.length > 0) {
							matchingQuads[0].bottom = line;
						} else {
							activeFinderPatternQuads.push({
								top: line,
								bottom: line
							});
						}
					}
					if (validAlignmentPattern) {
						var endX_2 = x - scans[4];
						var startX_2 = endX_2 - scans[3];
						var line = {
							startX: startX_2,
							y: y,
							endX: endX_2
						};
						var matchingQuads = activeAlignmentPatternQuads.filter(function (q) {
							return startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX || startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && scans[2] / (q.bottom.endX - q.bottom.startX) < MAX_QUAD_RATIO && scans[2] / (q.bottom.endX - q.bottom.startX) > MIN_QUAD_RATIO;
						});
						if (matchingQuads.length > 0) {
							matchingQuads[0].bottom = line;
						} else {
							activeAlignmentPatternQuads.push({
								top: line,
								bottom: line
							});
						}
					}
				}
			};
			for (var x = -1; x <= matrix.width; x++) {
				_loop_2(x);
			}
			finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) {
				return q.bottom.y !== y && q.bottom.y - q.top.y >= 2;
			}));
			activeFinderPatternQuads = activeFinderPatternQuads.filter(function (q) {
				return q.bottom.y === y;
			});
			alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function (q) {
				return q.bottom.y !== y;
			}));
			activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function (q) {
				return q.bottom.y === y;
			});
		};
		for (var y = 0; y <= matrix.height; y++) {
			_loop_1(y);
		}
		finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) {
			return q.bottom.y - q.top.y >= 2;
		}));
		alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
		var finderPatterns = finderPatternQuads.reduce(function (quads, _a) {
			var top = _a.top,
				bottom = _a.bottom;
			if (bottom.y - top.y >= 2) {
				var x = (top.startX + top.endX + bottom.startX + bottom.endX) / 4;
				var y = (top.y + bottom.y + 1) / 2;
				var intX = Math.round(x);
				var intY = Math.round(y);
				if (matrix.get(intX, intY)) {
					var lengths = [top.endX - top.startX, bottom.endX - bottom.startX, bottom.y - top.y + 1];
					var size = sum(lengths) / lengths.length;
					var score = scorePattern({
						x: intX,
						y: intY
					}, [1, 1, 3, 1, 1], matrix);
					quads.push({
						x: x,
						y: y,
						size: size,
						score: score
					});
				}
			}
			return quads;
		}, []).sort(function (a, b) {
			return a.score - b.score;
		});
		var finderPatternGroups = finderPatterns.reduce(function (points, point, index, finderPatterns) {
			if (index <= MAX_FINDERPATTERNS_TO_SEARCH) {
				var otherPoints = finderPatterns.reduce(function (points, _a, oIndex) {
					var x = _a.x,
						y = _a.y,
						size = _a.size,
						score = _a.score;
					if (index !== oIndex) {
						points.push({
							x: x,
							y: y,
							size: size,
							score: score + Math.pow(size - point.size, 2) / point.size
						});
					}
					return points;
				}, []);
				if (otherPoints.length >= 2) {
					var score = point.score + otherPoints[0].score + otherPoints[1].score;
					points.push({
						points: [point].concat(otherPoints.sort(function (a, b) {
							return a.score - b.score;
						}).slice(0, 2)),
						score: score
					});
				}
			}
			return points;
		}, []).sort(function (a, b) {
			return a.score - b.score;
		});
		if (finderPatternGroups.length === 0) {
			return null;
		}
		var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]),
			topRight = _a.topRight,
			topLeft = _a.topLeft,
			bottomLeft = _a.bottomLeft;
		var result = [];
		var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
		if (alignment !== null) {
			result.push({
				alignmentPattern: {
					x: alignment.alignmentPattern.x,
					y: alignment.alignmentPattern.y
				},
				bottomLeft: {
					x: bottomLeft.x,
					y: bottomLeft.y
				},
				dimension: alignment.dimension,
				topLeft: {
					x: topLeft.x,
					y: topLeft.y
				},
				topRight: {
					x: topRight.x,
					y: topRight.y
				}
			});
		}
		var midTopRight = recenterLocation(matrix, topRight);
		var midTopLeft = recenterLocation(matrix, topLeft);
		var midBottomLeft = recenterLocation(matrix, bottomLeft);
		var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
		if (centeredAlignment !== null) {
			result.push({
				alignmentPattern: {
					x: centeredAlignment.alignmentPattern.x,
					y: centeredAlignment.alignmentPattern.y
				},
				bottomLeft: {
					x: midBottomLeft.x,
					y: midBottomLeft.y
				},
				topLeft: {
					x: midTopLeft.x,
					y: midTopLeft.y
				},
				topRight: {
					x: midTopRight.x,
					y: midTopRight.y
				},
				dimension: centeredAlignment.dimension
			});
		}
		if (result.length === 0) {
			return null;
		}
		return result;
	}

	var typedArrayConstructor = { exports: {} };

	var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';
	getDefaultExportFromCjs(arrayBufferBasicDetection);

	var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
	var DESCRIPTORS$2 = descriptors;
	var global$9 = global$y;
	var isCallable = isCallable$r;
	var isObject$2 = isObject$f;
	var hasOwn$2 = hasOwnProperty_1;
	var classof$3 = classof$d;
	var tryToString = tryToString$7;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
	var defineBuiltIn$2 = defineBuiltIn$c;
	var defineBuiltInAccessor$2 = defineBuiltInAccessor$7;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var setPrototypeOf$2 = objectSetPrototypeOf;
	var wellKnownSymbol$1 = wellKnownSymbol$p;
	var uid = uid$4;
	var InternalStateModule$2 = internalState;
	var enforceInternalState$1 = InternalStateModule$2.enforce;
	var getInternalState$1 = InternalStateModule$2.get;
	var Int8Array$4 = global$9.Int8Array;
	var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
	var Uint8ClampedArray$1 = global$9.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
	var TypedArray$1 = Int8Array$4 && getPrototypeOf$1(Int8Array$4);
	var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf$1(Int8ArrayPrototype$1);
	var ObjectPrototype$1 = Object.prototype;
	var TypeError$1 = global$9.TypeError;
	var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
	var TYPED_ARRAY_TAG$1 = uid('TYPED_ARRAY_TAG');
	var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
	var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$2 && classof$3(global$9.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQUIRED = false;
	var NAME, Constructor, Prototype;
	var TypedArrayConstructorsList = {
		Int8Array: 1,
		Uint8Array: 1,
		Uint8ClampedArray: 1,
		Int16Array: 2,
		Uint16Array: 2,
		Int32Array: 4,
		Uint32Array: 4,
		Float32Array: 4,
		Float64Array: 8
	};
	var BigIntArrayConstructorsList = {
		BigInt64Array: 8,
		BigUint64Array: 8
	};
	var isView = function isView(it) {
		if (!isObject$2(it)) return false;
		var klass = classof$3(it);
		return klass === 'DataView'
			|| hasOwn$2(TypedArrayConstructorsList, klass)
			|| hasOwn$2(BigIntArrayConstructorsList, klass);
	};
	var getTypedArrayConstructor$1 = function (it) {
		var proto = getPrototypeOf$1(it);
		if (!isObject$2(proto)) return;
		var state = getInternalState$1(proto);
		return (state && hasOwn$2(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$1(proto);
	};
	var isTypedArray$1 = function (it) {
		if (!isObject$2(it)) return false;
		var klass = classof$3(it);
		return hasOwn$2(TypedArrayConstructorsList, klass)
			|| hasOwn$2(BigIntArrayConstructorsList, klass);
	};
	var aTypedArray$n = function (it) {
		if (isTypedArray$1(it)) return it;
		throw TypeError$1('Target is not a typed array');
	};
	var aTypedArrayConstructor$3 = function (C) {
		if (isCallable(C) && (!setPrototypeOf$2 || isPrototypeOf$2(TypedArray$1, C))) return C;
		throw TypeError$1(tryToString(C) + ' is not a typed array constructor');
	};
	var exportTypedArrayMethod$o = function (KEY, property, forced, options) {
		if (!DESCRIPTORS$2) return;
		if (forced) for (var ARRAY in TypedArrayConstructorsList) {
			var TypedArrayConstructor = global$9[ARRAY];
			if (TypedArrayConstructor && hasOwn$2(TypedArrayConstructor.prototype, KEY)) try {
				delete TypedArrayConstructor.prototype[KEY];
			} catch (error) {
				try {
					TypedArrayConstructor.prototype[KEY] = property;
				} catch (error2) { }
			}
		}
		if (!TypedArrayPrototype$2[KEY] || forced) {
			defineBuiltIn$2(TypedArrayPrototype$2, KEY, forced ? property
				: NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
		}
	};
	var exportTypedArrayStaticMethod$1 = function (KEY, property, forced) {
		var ARRAY, TypedArrayConstructor;
		if (!DESCRIPTORS$2) return;
		if (setPrototypeOf$2) {
			if (forced) for (ARRAY in TypedArrayConstructorsList) {
				TypedArrayConstructor = global$9[ARRAY];
				if (TypedArrayConstructor && hasOwn$2(TypedArrayConstructor, KEY)) try {
					delete TypedArrayConstructor[KEY];
				} catch (error) { }
			}
			if (!TypedArray$1[KEY] || forced) {
				try {
					return defineBuiltIn$2(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
				} catch (error) { }
			} else return;
		}
		for (ARRAY in TypedArrayConstructorsList) {
			TypedArrayConstructor = global$9[ARRAY];
			if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
				defineBuiltIn$2(TypedArrayConstructor, KEY, property);
			}
		}
	};
	for (NAME in TypedArrayConstructorsList) {
		Constructor = global$9[NAME];
		Prototype = Constructor && Constructor.prototype;
		if (Prototype) enforceInternalState$1(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
		else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
	}
	for (NAME in BigIntArrayConstructorsList) {
		Constructor = global$9[NAME];
		Prototype = Constructor && Constructor.prototype;
		if (Prototype) enforceInternalState$1(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	}
	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable(TypedArray$1) || TypedArray$1 === Function.prototype) {
		TypedArray$1 = function TypedArray() {
			throw TypeError$1('Incorrect invocation');
		};
		if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
			if (global$9[NAME]) setPrototypeOf$2(global$9[NAME], TypedArray$1);
		}
	}
	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$1) {
		TypedArrayPrototype$2 = TypedArray$1.prototype;
		if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
			if (global$9[NAME]) setPrototypeOf$2(global$9[NAME].prototype, TypedArrayPrototype$2);
		}
	}
	if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf$1(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
		setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
	}
	if (DESCRIPTORS$2 && !hasOwn$2(TypedArrayPrototype$2, TO_STRING_TAG)) {
		TYPED_ARRAY_TAG_REQUIRED = true;
		defineBuiltInAccessor$2(TypedArrayPrototype$2, TO_STRING_TAG, {
			configurable: true,
			get: function () {
				return isObject$2(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
			}
		});
		for (NAME in TypedArrayConstructorsList) if (global$9[NAME]) {
			createNonEnumerableProperty$2(global$9[NAME], TYPED_ARRAY_TAG$1, NAME);
		}
	}
	var arrayBufferViewCore = {
		NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
		TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
		aTypedArray: aTypedArray$n,
		aTypedArrayConstructor: aTypedArrayConstructor$3,
		exportTypedArrayMethod: exportTypedArrayMethod$o,
		exportTypedArrayStaticMethod: exportTypedArrayStaticMethod$1,
		getTypedArrayConstructor: getTypedArrayConstructor$1,
		isView: isView,
		isTypedArray: isTypedArray$1,
		TypedArray: TypedArray$1,
		TypedArrayPrototype: TypedArrayPrototype$2
	};
	getDefaultExportFromCjs(arrayBufferViewCore);

	var global$8 = global$y;
	var fails$9 = fails$B;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var ArrayBuffer$2 = global$8.ArrayBuffer;
	var Int8Array$3 = global$8.Int8Array;
	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$9(function () {
		Int8Array$3(1);
	}) || !fails$9(function () {
		new Int8Array$3(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
		new Int8Array$3();
		new Int8Array$3(null);
		new Int8Array$3(1.5);
		new Int8Array$3(iterable);
	}, true) || fails$9(function () {
		return new Int8Array$3(new ArrayBuffer$2(2), 1, undefined).length !== 1;
	});
	getDefaultExportFromCjs(typedArrayConstructorsRequireWrappers);

	var defineBuiltIn$1 = defineBuiltIn$c;
	var defineBuiltIns$1 = function (target, src, options) {
		for (var key in src) defineBuiltIn$1(target, key, src[key], options);
		return target;
	};
	getDefaultExportFromCjs(defineBuiltIns$1);

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$9;
	var toLength$3 = toLength$6;
	var $RangeError$2 = RangeError;
	var toIndex$2 = function (it) {
		if (it === undefined) return 0;
		var number = toIntegerOrInfinity$4(it);
		var length = toLength$3(number);
		if (number !== length) throw $RangeError$2('Wrong length or index');
		return length;
	};
	getDefaultExportFromCjs(toIndex$2);

	var $Array = Array;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor$2 = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var pack = function (number, mantissaLength, bytes) {
		var buffer = $Array(bytes);
		var exponentLength = bytes * 8 - mantissaLength - 1;
		var eMax = (1 << exponentLength) - 1;
		var eBias = eMax >> 1;
		var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
		var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
		var index = 0;
		var exponent, mantissa, c;
		number = abs(number);
		if (number != number || number === Infinity) {
			mantissa = number != number ? 1 : 0;
			exponent = eMax;
		} else {
			exponent = floor$2(log(number) / LN2);
			c = pow(2, -exponent);
			if (number * c < 1) {
				exponent--;
				c *= 2;
			}
			if (exponent + eBias >= 1) {
				number += rt / c;
			} else {
				number += rt * pow(2, 1 - eBias);
			}
			if (number * c >= 2) {
				exponent++;
				c /= 2;
			}
			if (exponent + eBias >= eMax) {
				mantissa = 0;
				exponent = eMax;
			} else if (exponent + eBias >= 1) {
				mantissa = (number * c - 1) * pow(2, mantissaLength);
				exponent = exponent + eBias;
			} else {
				mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
				exponent = 0;
			}
		}
		while (mantissaLength >= 8) {
			buffer[index++] = mantissa & 255;
			mantissa /= 256;
			mantissaLength -= 8;
		}
		exponent = exponent << mantissaLength | mantissa;
		exponentLength += mantissaLength;
		while (exponentLength > 0) {
			buffer[index++] = exponent & 255;
			exponent /= 256;
			exponentLength -= 8;
		}
		buffer[--index] |= sign * 128;
		return buffer;
	};
	var unpack = function (buffer, mantissaLength) {
		var bytes = buffer.length;
		var exponentLength = bytes * 8 - mantissaLength - 1;
		var eMax = (1 << exponentLength) - 1;
		var eBias = eMax >> 1;
		var nBits = exponentLength - 7;
		var index = bytes - 1;
		var sign = buffer[index--];
		var exponent = sign & 127;
		var mantissa;
		sign >>= 7;
		while (nBits > 0) {
			exponent = exponent * 256 + buffer[index--];
			nBits -= 8;
		}
		mantissa = exponent & (1 << -nBits) - 1;
		exponent >>= -nBits;
		nBits += mantissaLength;
		while (nBits > 0) {
			mantissa = mantissa * 256 + buffer[index--];
			nBits -= 8;
		}
		if (exponent === 0) {
			exponent = 1 - eBias;
		} else if (exponent === eMax) {
			return mantissa ? NaN : sign ? -Infinity : Infinity;
		} else {
			mantissa = mantissa + pow(2, mantissaLength);
			exponent = exponent - eBias;
		} return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	};
	var ieee754 = {
		pack: pack,
		unpack: unpack
	};
	getDefaultExportFromCjs(ieee754);

	var toObject$3 = toObject$c;
	var toAbsoluteIndex$2 = toAbsoluteIndex$6;
	var lengthOfArrayLike$7 = lengthOfArrayLike$f;
	var arrayFill$1 = function fill(value) {
		var O = toObject$3(this);
		var length = lengthOfArrayLike$7(O);
		var argumentsLength = arguments.length;
		var index = toAbsoluteIndex$2(argumentsLength > 1 ? arguments[1] : undefined, length);
		var end = argumentsLength > 2 ? arguments[2] : undefined;
		var endPos = end === undefined ? length : toAbsoluteIndex$2(end, length);
		while (endPos > index) O[index++] = value;
		return O;
	};
	getDefaultExportFromCjs(arrayFill$1);

	var global$7 = global$y;
	var uncurryThis$6 = functionUncurryThis;
	var DESCRIPTORS$1 = descriptors;
	var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
	var FunctionName = functionName;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
	var defineBuiltInAccessor$1 = defineBuiltInAccessor$7;
	var defineBuiltIns = defineBuiltIns$1;
	var fails$8 = fails$B;
	var anInstance$1 = anInstance$3;
	var toIntegerOrInfinity$3 = toIntegerOrInfinity$9;
	var toLength$2 = toLength$6;
	var toIndex$1 = toIndex$2;
	var IEEE754 = ieee754;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf$1 = objectSetPrototypeOf;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arrayFill = arrayFill$1;
	var arraySlice$2 = arraySliceSimple;
	var setToStringTag = setToStringTag$6;
	var InternalStateModule$1 = internalState;
	var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH$1 = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var getInternalArrayBufferState = InternalStateModule$1.getterFor(ARRAY_BUFFER);
	var getInternalDataViewState = InternalStateModule$1.getterFor(DATA_VIEW);
	var setInternalState$1 = InternalStateModule$1.set;
	var NativeArrayBuffer = global$7[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
	var $DataView = global$7[DATA_VIEW];
	var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
	var ObjectPrototype = Object.prototype;
	var Array$1 = global$7.Array;
	var RangeError$3 = global$7.RangeError;
	var fill = uncurryThis$6(arrayFill);
	var reverse = uncurryThis$6([].reverse);
	var packIEEE754 = IEEE754.pack;
	var unpackIEEE754 = IEEE754.unpack;
	var packInt8 = function (number) {
		return [number & 0xFF];
	};
	var packInt16 = function (number) {
		return [number & 0xFF, number >> 8 & 0xFF];
	};
	var packInt32 = function (number) {
		return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};
	var unpackInt32 = function (buffer) {
		return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};
	var packFloat32 = function (number) {
		return packIEEE754(number, 23, 4);
	};
	var packFloat64 = function (number) {
		return packIEEE754(number, 52, 8);
	};
	var addGetter$1 = function (Constructor, key, getInternalState) {
		defineBuiltInAccessor$1(Constructor[PROTOTYPE], key, {
			configurable: true,
			get: function () {
				return getInternalState(this)[key];
			}
		});
	};
	var get = function (view, count, index, isLittleEndian) {
		var intIndex = toIndex$1(index);
		var store = getInternalDataViewState(view);
		if (intIndex + count > store.byteLength) throw RangeError$3(WRONG_INDEX);
		var bytes = store.bytes;
		var start = intIndex + store.byteOffset;
		var pack = arraySlice$2(bytes, start, start + count);
		return isLittleEndian ? pack : reverse(pack);
	};
	var set = function (view, count, index, conversion, value, isLittleEndian) {
		var intIndex = toIndex$1(index);
		var store = getInternalDataViewState(view);
		if (intIndex + count > store.byteLength) throw RangeError$3(WRONG_INDEX);
		var bytes = store.bytes;
		var start = intIndex + store.byteOffset;
		var pack = conversion(+value);
		for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};
	if (!NATIVE_ARRAY_BUFFER) {
		$ArrayBuffer = function ArrayBuffer(length) {
			anInstance$1(this, ArrayBufferPrototype$1);
			var byteLength = toIndex$1(length);
			setInternalState$1(this, {
				type: ARRAY_BUFFER,
				bytes: fill(Array$1(byteLength), 0),
				byteLength: byteLength
			});
			if (!DESCRIPTORS$1) {
				this.byteLength = byteLength;
				this.detached = false;
			}
		};
		ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE];
		$DataView = function DataView(buffer, byteOffset, byteLength) {
			anInstance$1(this, DataViewPrototype);
			anInstance$1(buffer, ArrayBufferPrototype$1);
			var bufferState = getInternalArrayBufferState(buffer);
			var bufferLength = bufferState.byteLength;
			var offset = toIntegerOrInfinity$3(byteOffset);
			if (offset < 0 || offset > bufferLength) throw RangeError$3('Wrong offset');
			byteLength = byteLength === undefined ? bufferLength - offset : toLength$2(byteLength);
			if (offset + byteLength > bufferLength) throw RangeError$3(WRONG_LENGTH$1);
			setInternalState$1(this, {
				type: DATA_VIEW,
				buffer: buffer,
				byteLength: byteLength,
				byteOffset: offset,
				bytes: bufferState.bytes
			});
			if (!DESCRIPTORS$1) {
				this.buffer = buffer;
				this.byteLength = byteLength;
				this.byteOffset = offset;
			}
		};
		DataViewPrototype = $DataView[PROTOTYPE];
		if (DESCRIPTORS$1) {
			addGetter$1($ArrayBuffer, 'byteLength', getInternalArrayBufferState);
			addGetter$1($DataView, 'buffer', getInternalDataViewState);
			addGetter$1($DataView, 'byteLength', getInternalDataViewState);
			addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
		}
		defineBuiltIns(DataViewPrototype, {
			getInt8: function getInt8(byteOffset) {
				return get(this, 1, byteOffset)[0] << 24 >> 24;
			},
			getUint8: function getUint8(byteOffset) {
				return get(this, 1, byteOffset)[0];
			},
			getInt16: function getInt16(byteOffset) {
				var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
				return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
			},
			getUint16: function getUint16(byteOffset) {
				var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
				return bytes[1] << 8 | bytes[0];
			},
			getInt32: function getInt32(byteOffset) {
				return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
			},
			getUint32: function getUint32(byteOffset) {
				return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
			},
			getFloat32: function getFloat32(byteOffset) {
				return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
			},
			getFloat64: function getFloat64(byteOffset) {
				return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
			},
			setInt8: function setInt8(byteOffset, value) {
				set(this, 1, byteOffset, packInt8, value);
			},
			setUint8: function setUint8(byteOffset, value) {
				set(this, 1, byteOffset, packInt8, value);
			},
			setInt16: function setInt16(byteOffset, value) {
				set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
			},
			setUint16: function setUint16(byteOffset, value) {
				set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
			},
			setInt32: function setInt32(byteOffset, value) {
				set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
			},
			setUint32: function setUint32(byteOffset, value) {
				set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
			},
			setFloat32: function setFloat32(byteOffset, value) {
				set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
			},
			setFloat64: function setFloat64(byteOffset, value) {
				set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
			}
		});
	} else {
		var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer.name !== ARRAY_BUFFER;
		if (!fails$8(function () {
			NativeArrayBuffer(1);
		}) || !fails$8(function () {
			new NativeArrayBuffer(-1);
		}) || fails$8(function () {
			new NativeArrayBuffer();
			new NativeArrayBuffer(1.5);
			new NativeArrayBuffer(NaN);
			return NativeArrayBuffer.length != 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
		})) {
			$ArrayBuffer = function ArrayBuffer(length) {
				anInstance$1(this, ArrayBufferPrototype$1);
				return new NativeArrayBuffer(toIndex$1(length));
			};
			$ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype$1;
			for (var keys = getOwnPropertyNames$1(NativeArrayBuffer), j = 0, key; keys.length > j;) {
				if (!((key = keys[j++]) in $ArrayBuffer)) {
					createNonEnumerableProperty$1($ArrayBuffer, key, NativeArrayBuffer[key]);
				}
			}
			ArrayBufferPrototype$1.constructor = $ArrayBuffer;
		} else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
			createNonEnumerableProperty$1(NativeArrayBuffer, 'name', ARRAY_BUFFER);
		}
		if (setPrototypeOf$1 && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
			setPrototypeOf$1(DataViewPrototype, ObjectPrototype);
		}
		var testView = new $DataView(new $ArrayBuffer(2));
		var $setInt8 = uncurryThis$6(DataViewPrototype.setInt8);
		testView.setInt8(0, 2147483648);
		testView.setInt8(1, 2147483649);
		if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype, {
			setInt8: function setInt8(byteOffset, value) {
				$setInt8(this, byteOffset, value << 24 >> 24);
			},
			setUint8: function setUint8(byteOffset, value) {
				$setInt8(this, byteOffset, value << 24 >> 24);
			}
		}, { unsafe: true });
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	var arrayBuffer = {
		ArrayBuffer: $ArrayBuffer,
		DataView: $DataView
	};
	getDefaultExportFromCjs(arrayBuffer);

	var isObject$1 = isObject$f;
	var floor$1 = Math.floor;
	var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
		return !isObject$1(it) && isFinite(it) && floor$1(it) === it;
	};
	getDefaultExportFromCjs(isIntegralNumber$1);

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$9;
	var $RangeError$1 = RangeError;
	var toPositiveInteger$1 = function (it) {
		var result = toIntegerOrInfinity$2(it);
		if (result < 0) throw $RangeError$1("The argument can't be less than 0");
		return result;
	};
	getDefaultExportFromCjs(toPositiveInteger$1);

	var toPositiveInteger = toPositiveInteger$1;
	var $RangeError = RangeError;
	var toOffset$2 = function (it, BYTES) {
		var offset = toPositiveInteger(it);
		if (offset % BYTES) throw $RangeError('Wrong offset');
		return offset;
	};
	getDefaultExportFromCjs(toOffset$2);

	var classof$2 = classof$d;
	var isBigIntArray$1 = function (it) {
		var klass = classof$2(it);
		return klass == 'BigInt64Array' || klass == 'BigUint64Array';
	};
	getDefaultExportFromCjs(isBigIntArray$1);

	var toPrimitive = toPrimitive$3;
	var $TypeError$1 = TypeError;
	var toBigInt$2 = function (argument) {
		var prim = toPrimitive(argument, 'number');
		if (typeof prim == 'number') throw $TypeError$1("Can't convert number to bigint");
		return BigInt(prim);
	};
	getDefaultExportFromCjs(toBigInt$2);

	var bind = functionBindContext;
	var call$4 = functionCall;
	var aConstructor = aConstructor$2;
	var toObject$2 = toObject$c;
	var lengthOfArrayLike$6 = lengthOfArrayLike$f;
	var getIterator = getIterator$2;
	var getIteratorMethod = getIteratorMethod$3;
	var isArrayIteratorMethod = isArrayIteratorMethod$2;
	var isBigIntArray = isBigIntArray$1;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var toBigInt$1 = toBigInt$2;
	var typedArrayFrom$2 = function from(source) {
		var C = aConstructor(this);
		var O = toObject$2(source);
		var argumentsLength = arguments.length;
		var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
		var mapping = mapfn !== undefined;
		var iteratorMethod = getIteratorMethod(O);
		var i, length, result, thisIsBigIntArray, value, step, iterator, next;
		if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
			iterator = getIterator(O, iteratorMethod);
			next = iterator.next;
			O = [];
			while (!(step = call$4(next, iterator)).done) {
				O.push(step.value);
			}
		}
		if (mapping && argumentsLength > 2) {
			mapfn = bind(mapfn, arguments[2]);
		}
		length = lengthOfArrayLike$6(O);
		result = new (aTypedArrayConstructor$2(C))(length);
		thisIsBigIntArray = isBigIntArray(result);
		for (i = 0; length > i; i++) {
			value = mapping ? mapfn(O[i], i) : O[i];
			result[i] = thisIsBigIntArray ? toBigInt$1(value) : +value;
		}
		return result;
	};
	getDefaultExportFromCjs(typedArrayFrom$2);

	var $ = _export;
	var global$6 = global$y;
	var call$3 = functionCall;
	var DESCRIPTORS = descriptors;
	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1 = typedArrayConstructorsRequireWrappers;
	var ArrayBufferViewCore$o = arrayBufferViewCore;
	var ArrayBufferModule = arrayBuffer;
	var anInstance = anInstance$3;
	var createPropertyDescriptor = createPropertyDescriptor$6;
	var createNonEnumerableProperty = createNonEnumerableProperty$9;
	var isIntegralNumber = isIntegralNumber$1;
	var toLength$1 = toLength$6;
	var toIndex = toIndex$2;
	var toOffset$1 = toOffset$2;
	var toPropertyKey = toPropertyKey$5;
	var hasOwn$1 = hasOwnProperty_1;
	var classof$1 = classof$d;
	var isObject = isObject$f;
	var isSymbol = isSymbol$6;
	var create = objectCreate;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var setPrototypeOf = objectSetPrototypeOf;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var typedArrayFrom$1 = typedArrayFrom$2;
	var forEach = arrayIteration.forEach;
	var setSpecies = setSpecies$2;
	var defineBuiltInAccessor = defineBuiltInAccessor$7;
	var definePropertyModule = objectDefineProperty;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var InternalStateModule = internalState;
	var inheritIfRequired = inheritIfRequired$2;
	var getInternalState = InternalStateModule.get;
	var setInternalState = InternalStateModule.set;
	var enforceInternalState = InternalStateModule.enforce;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var round = Math.round;
	var RangeError$2 = global$6.RangeError;
	var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
	var ArrayBufferPrototype = ArrayBuffer$1.prototype;
	var DataView$1 = ArrayBufferModule.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$o.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = ArrayBufferViewCore$o.TYPED_ARRAY_TAG;
	var TypedArray = ArrayBufferViewCore$o.TypedArray;
	var TypedArrayPrototype$1 = ArrayBufferViewCore$o.TypedArrayPrototype;
	var aTypedArrayConstructor$1 = ArrayBufferViewCore$o.aTypedArrayConstructor;
	var isTypedArray = ArrayBufferViewCore$o.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';
	var fromList = function (C, list) {
		aTypedArrayConstructor$1(C);
		var index = 0;
		var length = list.length;
		var result = new C(length);
		while (length > index) result[index] = list[index++];
		return result;
	};
	var addGetter = function (it, key) {
		defineBuiltInAccessor(it, key, {
			configurable: true,
			get: function () {
				return getInternalState(this)[key];
			}
		});
	};
	var isArrayBuffer = function (it) {
		var klass;
		return isPrototypeOf$1(ArrayBufferPrototype, it) || (klass = classof$1(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	};
	var isTypedArrayIndex = function (target, key) {
		return isTypedArray(target)
			&& !isSymbol(key)
			&& key in target
			&& isIntegralNumber(+key)
			&& key >= 0;
	};
	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
		key = toPropertyKey(key);
		return isTypedArrayIndex(target, key)
			? createPropertyDescriptor(2, target[key])
			: nativeGetOwnPropertyDescriptor(target, key);
	};
	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
		key = toPropertyKey(key);
		if (isTypedArrayIndex(target, key)
			&& isObject(descriptor)
			&& hasOwn$1(descriptor, 'value')
			&& !hasOwn$1(descriptor, 'get')
			&& !hasOwn$1(descriptor, 'set')
			&& !descriptor.configurable
			&& (!hasOwn$1(descriptor, 'writable') || descriptor.writable)
			&& (!hasOwn$1(descriptor, 'enumerable') || descriptor.enumerable)
		) {
			target[key] = descriptor.value;
			return target;
		} return nativeDefineProperty(target, key, descriptor);
	};
	if (DESCRIPTORS) {
		if (!NATIVE_ARRAY_BUFFER_VIEWS) {
			getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
			definePropertyModule.f = wrappedDefineProperty;
			addGetter(TypedArrayPrototype$1, 'buffer');
			addGetter(TypedArrayPrototype$1, 'byteOffset');
			addGetter(TypedArrayPrototype$1, 'byteLength');
			addGetter(TypedArrayPrototype$1, 'length');
		}
		$({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
			getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
			defineProperty: wrappedDefineProperty
		});
		typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
			var BYTES = TYPE.match(/\d+/)[0] / 8;
			var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
			var GETTER = 'get' + TYPE;
			var SETTER = 'set' + TYPE;
			var NativeTypedArrayConstructor = global$6[CONSTRUCTOR_NAME];
			var TypedArrayConstructor = NativeTypedArrayConstructor;
			var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
			var exported = {};
			var getter = function (that, index) {
				var data = getInternalState(that);
				return data.view[GETTER](index * BYTES + data.byteOffset, true);
			};
			var setter = function (that, index, value) {
				var data = getInternalState(that);
				if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
				data.view[SETTER](index * BYTES + data.byteOffset, value, true);
			};
			var addElement = function (that, index) {
				nativeDefineProperty(that, index, {
					get: function () {
						return getter(this, index);
					},
					set: function (value) {
						return setter(this, index, value);
					},
					enumerable: true
				});
			};
			if (!NATIVE_ARRAY_BUFFER_VIEWS) {
				TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
					anInstance(that, TypedArrayConstructorPrototype);
					var index = 0;
					var byteOffset = 0;
					var buffer, byteLength, length;
					if (!isObject(data)) {
						length = toIndex(data);
						byteLength = length * BYTES;
						buffer = new ArrayBuffer$1(byteLength);
					} else if (isArrayBuffer(data)) {
						buffer = data;
						byteOffset = toOffset$1(offset, BYTES);
						var $len = data.byteLength;
						if ($length === undefined) {
							if ($len % BYTES) throw RangeError$2(WRONG_LENGTH);
							byteLength = $len - byteOffset;
							if (byteLength < 0) throw RangeError$2(WRONG_LENGTH);
						} else {
							byteLength = toLength$1($length) * BYTES;
							if (byteLength + byteOffset > $len) throw RangeError$2(WRONG_LENGTH);
						}
						length = byteLength / BYTES;
					} else if (isTypedArray(data)) {
						return fromList(TypedArrayConstructor, data);
					} else {
						return call$3(typedArrayFrom$1, TypedArrayConstructor, data);
					}
					setInternalState(that, {
						buffer: buffer,
						byteOffset: byteOffset,
						byteLength: byteLength,
						length: length,
						view: new DataView$1(buffer)
					});
					while (index < length) addElement(that, index++);
				});
				if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
				TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype$1);
			} else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1) {
				TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
					anInstance(dummy, TypedArrayConstructorPrototype);
					return inheritIfRequired(function () {
						if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
						if (isArrayBuffer(data)) return $length !== undefined
							? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
							: typedArrayOffset !== undefined
								? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
								: new NativeTypedArrayConstructor(data);
						if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
						return call$3(typedArrayFrom$1, TypedArrayConstructor, data);
					}(), dummy, TypedArrayConstructor);
				});
				if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
				forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
					if (!(key in TypedArrayConstructor)) {
						createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
					}
				});
				TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
			}
			if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
				createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
			}
			enforceInternalState(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;
			if (TYPED_ARRAY_TAG) {
				createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
			}
			var FORCED = TypedArrayConstructor != NativeTypedArrayConstructor;
			exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
			$({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);
			if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
				createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
			}
			if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
				createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
			}
			setSpecies(CONSTRUCTOR_NAME);
		};
	} else typedArrayConstructor.exports = function () { };
	var typedArrayConstructorExports = typedArrayConstructor.exports;
	getDefaultExportFromCjs(typedArrayConstructorExports);

	var createTypedArrayConstructor = typedArrayConstructorExports;
	createTypedArrayConstructor('Uint8', function (init) {
		return function Uint8ClampedArray(data, byteOffset, length) {
			return init(this, data, byteOffset, length);
		};
	}, true);

	var ArrayBufferViewCore$n = arrayBufferViewCore;
	var lengthOfArrayLike$5 = lengthOfArrayLike$f;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$9;
	var aTypedArray$m = ArrayBufferViewCore$n.aTypedArray;
	var exportTypedArrayMethod$n = ArrayBufferViewCore$n.exportTypedArrayMethod;
	exportTypedArrayMethod$n('at', function at(index) {
		var O = aTypedArray$m(this);
		var len = lengthOfArrayLike$5(O);
		var relativeIndex = toIntegerOrInfinity$1(index);
		var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
		return (k < 0 || k >= len) ? undefined : O[k];
	});

	var toObject$1 = toObject$c;
	var toAbsoluteIndex$1 = toAbsoluteIndex$6;
	var lengthOfArrayLike$4 = lengthOfArrayLike$f;
	var deletePropertyOrThrow = deletePropertyOrThrow$2;
	var min$1 = Math.min;
	var arrayCopyWithin = [].copyWithin || function copyWithin(target, start) {
		var O = toObject$1(this);
		var len = lengthOfArrayLike$4(O);
		var to = toAbsoluteIndex$1(target, len);
		var from = toAbsoluteIndex$1(start, len);
		var end = arguments.length > 2 ? arguments[2] : undefined;
		var count = min$1((end === undefined ? len : toAbsoluteIndex$1(end, len)) - from, len - to);
		var inc = 1;
		if (from < to && to < from + count) {
			inc = -1;
			from += count - 1;
			to += count - 1;
		}
		while (count-- > 0) {
			if (from in O) O[to] = O[from];
			else deletePropertyOrThrow(O, to);
			to += inc;
			from += inc;
		} return O;
	};
	getDefaultExportFromCjs(arrayCopyWithin);

	var uncurryThis$5 = functionUncurryThis;
	var ArrayBufferViewCore$m = arrayBufferViewCore;
	var $ArrayCopyWithin = arrayCopyWithin;
	var u$ArrayCopyWithin = uncurryThis$5($ArrayCopyWithin);
	var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
	var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod;
	exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start) {
		return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var ArrayBufferViewCore$l = arrayBufferViewCore;
	var $every = arrayIteration.every;
	var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
	var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod;
	exportTypedArrayMethod$l('every', function every(callbackfn) {
		return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$k = arrayBufferViewCore;
	var $fill = arrayFill$1;
	var toBigInt = toBigInt$2;
	var classof = classof$d;
	var call$2 = functionCall;
	var uncurryThis$4 = functionUncurryThis;
	var fails$7 = fails$B;
	var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
	var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod;
	var slice = uncurryThis$4(''.slice);
	var CONVERSION_BUG = fails$7(function () {
		var count = 0;
		new Int8Array(2).fill({ valueOf: function () { return count++; } });
		return count !== 1;
	});
	exportTypedArrayMethod$k('fill', function fill(value) {
		var length = arguments.length;
		aTypedArray$j(this);
		var actualValue = slice(classof(this), 0, 3) === 'Big' ? toBigInt(value) : +value;
		return call$2($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
	}, CONVERSION_BUG);

	var lengthOfArrayLike$3 = lengthOfArrayLike$f;
	var arrayFromConstructorAndList$1 = function (Constructor, list) {
		var index = 0;
		var length = lengthOfArrayLike$3(list);
		var result = new Constructor(length);
		while (length > index) result[index] = list[index++];
		return result;
	};
	getDefaultExportFromCjs(arrayFromConstructorAndList$1);

	var ArrayBufferViewCore$j = arrayBufferViewCore;
	var speciesConstructor = speciesConstructor$2;
	var aTypedArrayConstructor = ArrayBufferViewCore$j.aTypedArrayConstructor;
	var getTypedArrayConstructor = ArrayBufferViewCore$j.getTypedArrayConstructor;
	var typedArraySpeciesConstructor$4 = function (originalArray) {
		return aTypedArrayConstructor(speciesConstructor(originalArray, getTypedArrayConstructor(originalArray)));
	};
	getDefaultExportFromCjs(typedArraySpeciesConstructor$4);

	var arrayFromConstructorAndList = arrayFromConstructorAndList$1;
	var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;
	var typedArrayFromSpeciesAndList = function (instance, list) {
		return arrayFromConstructorAndList(typedArraySpeciesConstructor$3(instance), list);
	};
	getDefaultExportFromCjs(typedArrayFromSpeciesAndList);

	var ArrayBufferViewCore$i = arrayBufferViewCore;
	var $filter = arrayIteration.filter;
	var fromSpeciesAndList = typedArrayFromSpeciesAndList;
	var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
	var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;
	exportTypedArrayMethod$j('filter', function filter(callbackfn) {
		var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
		return fromSpeciesAndList(this, list);
	});

	var ArrayBufferViewCore$h = arrayBufferViewCore;
	var $find = arrayIteration.find;
	var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
	var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;
	exportTypedArrayMethod$i('find', function find(predicate) {
		return $find(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$g = arrayBufferViewCore;
	var $findIndex = arrayIteration.findIndex;
	var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
	var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;
	exportTypedArrayMethod$h('findIndex', function findIndex(predicate) {
		return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$f = arrayBufferViewCore;
	var $forEach = arrayIteration.forEach;
	var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
	var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;
	exportTypedArrayMethod$g('forEach', function forEach(callbackfn) {
		$forEach(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$e = arrayBufferViewCore;
	var $includes = arrayIncludes.includes;
	var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
	var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;
	exportTypedArrayMethod$f('includes', function includes(searchElement) {
		return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$d = arrayBufferViewCore;
	var $indexOf = arrayIncludes.indexOf;
	var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
	var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;
	exportTypedArrayMethod$e('indexOf', function indexOf(searchElement) {
		return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var global$5 = global$y;
	var fails$6 = fails$B;
	var uncurryThis$3 = functionUncurryThis;
	var ArrayBufferViewCore$c = arrayBufferViewCore;
	var ArrayIterators = es_array_iterator;
	var wellKnownSymbol = wellKnownSymbol$p;
	var ITERATOR = wellKnownSymbol('iterator');
	var Uint8Array$1 = global$5.Uint8Array;
	var arrayValues = uncurryThis$3(ArrayIterators.values);
	var arrayKeys = uncurryThis$3(ArrayIterators.keys);
	var arrayEntries = uncurryThis$3(ArrayIterators.entries);
	var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
	var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;
	var TypedArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype;
	var GENERIC = !fails$6(function () {
		TypedArrayPrototype[ITERATOR].call([1]);
	});
	var ITERATOR_IS_VALUES = !!TypedArrayPrototype
		&& TypedArrayPrototype.values
		&& TypedArrayPrototype[ITERATOR] === TypedArrayPrototype.values
		&& TypedArrayPrototype.values.name === 'values';
	var typedArrayValues = function values() {
		return arrayValues(aTypedArray$c(this));
	};
	exportTypedArrayMethod$d('entries', function entries() {
		return arrayEntries(aTypedArray$c(this));
	}, GENERIC);
	exportTypedArrayMethod$d('keys', function keys() {
		return arrayKeys(aTypedArray$c(this));
	}, GENERIC);
	exportTypedArrayMethod$d('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
	exportTypedArrayMethod$d(ITERATOR, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

	var ArrayBufferViewCore$b = arrayBufferViewCore;
	var uncurryThis$2 = functionUncurryThis;
	var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
	var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;
	var $join = uncurryThis$2([].join);
	exportTypedArrayMethod$c('join', function join(separator) {
		return $join(aTypedArray$b(this), separator);
	});

	var apply$2 = functionApply;
	var toIndexedObject$1 = toIndexedObject$b;
	var toIntegerOrInfinity = toIntegerOrInfinity$9;
	var lengthOfArrayLike$2 = lengthOfArrayLike$f;
	var arrayMethodIsStrict = arrayMethodIsStrict$3;
	var min = Math.min;
	var $lastIndexOf$1 = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
	var FORCED$2 = NEGATIVE_ZERO || !STRICT_METHOD;
	var arrayLastIndexOf = FORCED$2 ? function lastIndexOf(searchElement) {
		if (NEGATIVE_ZERO) return apply$2($lastIndexOf$1, this, arguments) || 0;
		var O = toIndexedObject$1(this);
		var length = lengthOfArrayLike$2(O);
		var index = length - 1;
		if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
		if (index < 0) index = length + index;
		for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
		return -1;
	} : $lastIndexOf$1;
	getDefaultExportFromCjs(arrayLastIndexOf);

	var ArrayBufferViewCore$a = arrayBufferViewCore;
	var apply$1 = functionApply;
	var $lastIndexOf = arrayLastIndexOf;
	var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
	var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;
	exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement) {
		var length = arguments.length;
		return apply$1($lastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
	});

	var ArrayBufferViewCore$9 = arrayBufferViewCore;
	var $map = arrayIteration.map;
	var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;
	var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
	var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;
	exportTypedArrayMethod$a('map', function map(mapfn) {
		return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
			return new (typedArraySpeciesConstructor$2(O))(length);
		});
	});

	var aCallable$1 = aCallable$b;
	var toObject = toObject$c;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike$1 = lengthOfArrayLike$f;
	var $TypeError = TypeError;
	var createMethod = function (IS_RIGHT) {
		return function (that, callbackfn, argumentsLength, memo) {
			aCallable$1(callbackfn);
			var O = toObject(that);
			var self = IndexedObject(O);
			var length = lengthOfArrayLike$1(O);
			var index = IS_RIGHT ? length - 1 : 0;
			var i = IS_RIGHT ? -1 : 1;
			if (argumentsLength < 2) while (true) {
				if (index in self) {
					memo = self[index];
					index += i;
					break;
				}
				index += i;
				if (IS_RIGHT ? index < 0 : length <= index) {
					throw $TypeError('Reduce of empty array with no initial value');
				}
			}
			for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
				memo = callbackfn(memo, self[index], index, O);
			}
			return memo;
		};
	};
	var arrayReduce = {
		left: createMethod(false),
		right: createMethod(true)
	};
	getDefaultExportFromCjs(arrayReduce);

	var ArrayBufferViewCore$8 = arrayBufferViewCore;
	var $reduce = arrayReduce.left;
	var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
	var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;
	exportTypedArrayMethod$9('reduce', function reduce(callbackfn) {
		var length = arguments.length;
		return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$7 = arrayBufferViewCore;
	var $reduceRight = arrayReduce.right;
	var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
	var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;
	exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn) {
		var length = arguments.length;
		return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$6 = arrayBufferViewCore;
	var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
	var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
	var floor = Math.floor;
	exportTypedArrayMethod$7('reverse', function reverse() {
		var that = this;
		var length = aTypedArray$6(that).length;
		var middle = floor(length / 2);
		var index = 0;
		var value;
		while (index < middle) {
			value = that[index];
			that[index++] = that[--length];
			that[length] = value;
		} return that;
	});

	var global$4 = global$y;
	var call$1 = functionCall;
	var ArrayBufferViewCore$5 = arrayBufferViewCore;
	var lengthOfArrayLike = lengthOfArrayLike$f;
	var toOffset = toOffset$2;
	var toIndexedObject = toObject$c;
	var fails$5 = fails$B;
	var RangeError$1 = global$4.RangeError;
	var Int8Array$2 = global$4.Int8Array;
	var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
	var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
	var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
	var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;
	var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$5(function () {
		var array = new Uint8ClampedArray(2);
		call$1($set, array, { length: 1, 0: 3 }, 1);
		return array[1] !== 3;
	});
	var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$5.NATIVE_ARRAY_BUFFER_VIEWS && fails$5(function () {
		var array = new Int8Array$2(2);
		array.set(1);
		array.set('2', 1);
		return array[0] !== 0 || array[1] !== 2;
	});
	exportTypedArrayMethod$6('set', function set(arrayLike) {
		aTypedArray$5(this);
		var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
		var src = toIndexedObject(arrayLike);
		if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call$1($set, this, src, offset);
		var length = this.length;
		var len = lengthOfArrayLike(src);
		var index = 0;
		if (len + offset > length) throw RangeError$1('Wrong length');
		while (index < len) this[offset + index] = src[index++];
	}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

	var ArrayBufferViewCore$4 = arrayBufferViewCore;
	var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
	var fails$4 = fails$B;
	var arraySlice$1 = arraySlice$7;
	var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
	var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;
	var FORCED$1 = fails$4(function () {
		new Int8Array(1).slice();
	});
	exportTypedArrayMethod$5('slice', function slice(start, end) {
		var list = arraySlice$1(aTypedArray$4(this), start, end);
		var C = typedArraySpeciesConstructor$1(this);
		var index = 0;
		var length = list.length;
		var result = new C(length);
		while (length > index) result[index] = list[index++];
		return result;
	}, FORCED$1);

	var ArrayBufferViewCore$3 = arrayBufferViewCore;
	var $some = arrayIteration.some;
	var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
	var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;
	exportTypedArrayMethod$4('some', function some(callbackfn) {
		return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var global$3 = global$y;
	var uncurryThis$1 = functionUncurryThisClause;
	var fails$3 = fails$B;
	var aCallable = aCallable$b;
	var internalSort = arraySort;
	var ArrayBufferViewCore$2 = arrayBufferViewCore;
	var FF = engineFfVersion;
	var IE_OR_EDGE = engineIsIeOrEdge;
	var V8 = engineV8Version;
	var WEBKIT = engineWebkitVersion;
	var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
	var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
	var Uint16Array = global$3.Uint16Array;
	var nativeSort = Uint16Array && uncurryThis$1(Uint16Array.prototype.sort);
	var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails$3(function () {
		nativeSort(new Uint16Array(2), null);
	}) && fails$3(function () {
		nativeSort(new Uint16Array(2), {});
	}));
	var STABLE_SORT = !!nativeSort && !fails$3(function () {
		if (V8) return V8 < 74;
		if (FF) return FF < 67;
		if (IE_OR_EDGE) return true;
		if (WEBKIT) return WEBKIT < 602;
		var array = new Uint16Array(516);
		var expected = Array(516);
		var index, mod;
		for (index = 0; index < 516; index++) {
			mod = index % 4;
			array[index] = 515 - index;
			expected[index] = index - 2 * mod + 3;
		}
		nativeSort(array, function (a, b) {
			return (a / 4 | 0) - (b / 4 | 0);
		});
		for (index = 0; index < 516; index++) {
			if (array[index] !== expected[index]) return true;
		}
	});
	var getSortCompare = function (comparefn) {
		return function (x, y) {
			if (comparefn !== undefined) return +comparefn(x, y) || 0;
			if (y !== y) return -1;
			if (x !== x) return 1;
			if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
			return x > y;
		};
	};
	exportTypedArrayMethod$3('sort', function sort(comparefn) {
		if (comparefn !== undefined) aCallable(comparefn);
		if (STABLE_SORT) return nativeSort(this, comparefn);
		return internalSort(aTypedArray$2(this), getSortCompare(comparefn));
	}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

	var ArrayBufferViewCore$1 = arrayBufferViewCore;
	var toLength = toLength$6;
	var toAbsoluteIndex = toAbsoluteIndex$6;
	var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;
	var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
	var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;
	exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
		var O = aTypedArray$1(this);
		var length = O.length;
		var beginIndex = toAbsoluteIndex(begin, length);
		var C = typedArraySpeciesConstructor(O);
		return new C(
			O.buffer,
			O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
			toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
		);
	});

	var global$2 = global$y;
	var apply = functionApply;
	var ArrayBufferViewCore = arrayBufferViewCore;
	var fails$2 = fails$B;
	var arraySlice = arraySlice$7;
	var Int8Array$1 = global$2.Int8Array;
	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = ArrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;
	var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$2(function () {
		$toLocaleString.call(new Int8Array$1(1));
	});
	var FORCED = fails$2(function () {
		return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
	}) || !fails$2(function () {
		Int8Array$1.prototype.toLocaleString.call([1, 2]);
	});
	exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
		return apply(
			$toLocaleString,
			TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
			arraySlice(arguments)
		);
	}, FORCED);

	var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
	var fails$1 = fails$B;
	var global$1 = global$y;
	var uncurryThis = functionUncurryThis;
	var Uint8Array = global$1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
	var arrayToString = [].toString;
	var join = uncurryThis([].join);
	if (fails$1(function () { arrayToString.call({}); })) {
		arrayToString = function toString() {
			return join(this);
		};
	}
	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;
	exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var BitMatrix = function () {
		function BitMatrix(data, width) {
			this.data = data;
			this.width = width;
			this.height = data.length / width;
		}
		BitMatrix.createEmpty = function (width, height) {
			return new BitMatrix(new Uint8ClampedArray(width * height), width);
		};
		BitMatrix.prototype.get = function (x, y) {
			if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
				return false;
			}
			return !!this.data[y * this.width + x];
		};
		BitMatrix.prototype.set = function (x, y, v) {
			this.data[y * this.width + x] = v ? 1 : 0;
		};
		BitMatrix.prototype.setRegion = function (left, top, width, height, v) {
			for (var y = top; y < top + height; y++) {
				for (var x = left; x < left + width; x++) {
					this.set(x, y, !!v);
				}
			}
		};
		return BitMatrix;
	}();

	function squareToQuadrilateral(p1, p2, p3, p4) {
		var dx3 = p1.x - p2.x + p3.x - p4.x;
		var dy3 = p1.y - p2.y + p3.y - p4.y;
		if (dx3 === 0 && dy3 === 0) {
			return {
				a11: p2.x - p1.x,
				a12: p2.y - p1.y,
				a13: 0,
				a21: p3.x - p2.x,
				a22: p3.y - p2.y,
				a23: 0,
				a31: p1.x,
				a32: p1.y,
				a33: 1
			};
		} else {
			var dx1 = p2.x - p3.x;
			var dx2 = p4.x - p3.x;
			var dy1 = p2.y - p3.y;
			var dy2 = p4.y - p3.y;
			var denominator = dx1 * dy2 - dx2 * dy1;
			var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
			var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
			return {
				a11: p2.x - p1.x + a13 * p2.x,
				a12: p2.y - p1.y + a13 * p2.y,
				a13: a13,
				a21: p4.x - p1.x + a23 * p4.x,
				a22: p4.y - p1.y + a23 * p4.y,
				a23: a23,
				a31: p1.x,
				a32: p1.y,
				a33: 1
			};
		}
	}
	function quadrilateralToSquare(p1, p2, p3, p4) {
		var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
		return {
			a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
			a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
			a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
			a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
			a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
			a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
			a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
			a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
			a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21
		};
	}
	function times(a, b) {
		return {
			a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
			a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
			a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
			a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
			a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
			a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
			a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
			a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
			a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33
		};
	}
	function extract(image, location) {
		var qToS = quadrilateralToSquare({
			x: 3.5,
			y: 3.5
		}, {
			x: location.dimension - 3.5,
			y: 3.5
		}, {
			x: location.dimension - 6.5,
			y: location.dimension - 6.5
		}, {
			x: 3.5,
			y: location.dimension - 3.5
		});
		var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
		var transform = times(sToQ, qToS);
		var matrix = BitMatrix.createEmpty(location.dimension, location.dimension);
		var mappingFunction = function mappingFunction(x, y) {
			var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
			return {
				x: Math.max(0, (transform.a11 * x + transform.a21 * y + transform.a31) / denominator),
				y: Math.max(0, (transform.a12 * x + transform.a22 * y + transform.a32) / denominator)
			};
		};
		for (var y = 0; y < location.dimension; y++) {
			for (var x = 0; x < location.dimension; x++) {
				var xValue = x + 0.5;
				var yValue = y + 0.5;
				var sourcePixel = mappingFunction(xValue, yValue);
				matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
			}
		}
		return {
			matrix: matrix,
			mappingFunction: mappingFunction
		};
	}

	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
	var exportTypedArrayStaticMethod = arrayBufferViewCore.exportTypedArrayStaticMethod;
	var typedArrayFrom = typedArrayFrom$2;
	exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

	function addOrSubtractGF(a, b) {
		return a ^ b;
	}
	var GenericGF = function () {
		function GenericGF(primitive, size, generatorBase) {
			this.primitive = primitive;
			this.size = size;
			this.generatorBase = generatorBase;
			this.expTable = [];
			this.logTable = [];
			var x = 1;
			for (var i = 0; i < this.size; i++) {
				this.logTable[i] = 0;
				this.expTable[i] = x;
				x = x * 2;
				if (x >= this.size) {
					x = (x ^ this.primitive) & this.size - 1;
				}
			}
			for (var i = 0; i < this.size - 1; i++) {
				this.logTable[this.expTable[i]] = i;
			}
			this.zero = new GenericGFPoly(this, Uint8ClampedArray.from([0]));
			this.one = new GenericGFPoly(this, Uint8ClampedArray.from([1]));
		}
		GenericGF.prototype.multiply = function (a, b) {
			if (a === 0 || b === 0) {
				return 0;
			}
			return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
		};
		GenericGF.prototype.inverse = function (a) {
			if (a === 0) {
				throw new Error("can't invert 0");
			}
			return this.expTable[this.size - this.logTable[a] - 1];
		};
		GenericGF.prototype.buildMonomial = function (degree, coefficient) {
			if (degree < 0) {
				throw new Error('invalid monomial degree less than 0');
			}
			if (coefficient === 0) {
				return this.zero;
			}
			var coefficients = new Uint8ClampedArray(degree + 1);
			coefficients[0] = coefficient;
			return new GenericGFPoly(this, coefficients);
		};
		GenericGF.prototype.log = function (a) {
			if (a === 0) {
				throw new Error("can't take log(0)");
			}
			return this.logTable[a];
		};
		GenericGF.prototype.exp = function (a) {
			return this.expTable[a];
		};
		return GenericGF;
	}();

	var GenericGFPoly = function () {
		function GenericGFPoly(field, coefficients) {
			if (coefficients.length === 0) {
				throw new Error('no coefficients');
			}
			this.field = field;
			var coefficientsLength = coefficients.length;
			if (coefficientsLength > 1 && coefficients[0] === 0) {
				var firstNonZero = 1;
				while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
					firstNonZero++;
				}
				if (firstNonZero === coefficientsLength) {
					this.coefficients = field.zero.coefficients;
				} else {
					this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
					for (var i = 0; i < this.coefficients.length; i++) {
						this.coefficients[i] = coefficients[firstNonZero + i];
					}
				}
			} else {
				this.coefficients = coefficients;
			}
		}
		GenericGFPoly.prototype.degree = function () {
			return this.coefficients.length - 1;
		};
		GenericGFPoly.prototype.isZero = function () {
			return this.coefficients[0] === 0;
		};
		GenericGFPoly.prototype.getCoefficient = function (degree) {
			return this.coefficients[this.coefficients.length - 1 - degree];
		};
		GenericGFPoly.prototype.addOrSubtract = function (other) {
			var _a;
			if (this.isZero()) {
				return other;
			}
			if (other.isZero()) {
				return this;
			}
			var smallerCoefficients = this.coefficients;
			var largerCoefficients = other.coefficients;
			if (smallerCoefficients.length > largerCoefficients.length) {
				_a = [largerCoefficients, smallerCoefficients], smallerCoefficients = _a[0], largerCoefficients = _a[1];
			}
			var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
			var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
			for (var i = 0; i < lengthDiff; i++) {
				sumDiff[i] = largerCoefficients[i];
			}
			for (var i = lengthDiff; i < largerCoefficients.length; i++) {
				sumDiff[i] = addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
			}
			return new GenericGFPoly(this.field, sumDiff);
		};
		GenericGFPoly.prototype.multiply = function (scalar) {
			if (scalar === 0) {
				return this.field.zero;
			}
			if (scalar === 1) {
				return this;
			}
			var size = this.coefficients.length;
			var product = new Uint8ClampedArray(size);
			for (var i = 0; i < size; i++) {
				product[i] = this.field.multiply(this.coefficients[i], scalar);
			}
			return new GenericGFPoly(this.field, product);
		};
		GenericGFPoly.prototype.multiplyPoly = function (other) {
			if (this.isZero() || other.isZero()) {
				return this.field.zero;
			}
			var aCoefficients = this.coefficients;
			var aLength = aCoefficients.length;
			var bCoefficients = other.coefficients;
			var bLength = bCoefficients.length;
			var product = new Uint8ClampedArray(aLength + bLength - 1);
			for (var i = 0; i < aLength; i++) {
				var aCoeff = aCoefficients[i];
				for (var j = 0; j < bLength; j++) {
					product[i + j] = addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
				}
			}
			return new GenericGFPoly(this.field, product);
		};
		GenericGFPoly.prototype.multiplyByMonomial = function (degree, coefficient) {
			if (degree < 0) {
				throw new Error('invalid degree less than 0');
			}
			if (coefficient === 0) {
				return this.field.zero;
			}
			var size = this.coefficients.length;
			var product = new Uint8ClampedArray(size + degree);
			for (var i = 0; i < size; i++) {
				product[i] = this.field.multiply(this.coefficients[i], coefficient);
			}
			return new GenericGFPoly(this.field, product);
		};
		GenericGFPoly.prototype.evaluateAt = function (a) {
			var result = 0;
			if (a === 0) {
				return this.getCoefficient(0);
			}
			var size = this.coefficients.length;
			if (a === 1) {
				this.coefficients.forEach(function (coefficient) {
					result = addOrSubtractGF(result, coefficient);
				});
				return result;
			}
			result = this.coefficients[0];
			for (var i = 1; i < size; i++) {
				result = addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
			}
			return result;
		};
		return GenericGFPoly;
	}();

	function runEuclideanAlgorithm(field, a, b, R) {
		var _a;
		if (a.degree() < b.degree()) {
			_a = [b, a], a = _a[0], b = _a[1];
		}
		var rLast = a;
		var r = b;
		var tLast = field.zero;
		var t = field.one;
		while (r.degree() >= R / 2) {
			var rLastLast = rLast;
			var tLastLast = tLast;
			rLast = r;
			tLast = t;
			if (rLast.isZero()) {
				return null;
			}
			r = rLastLast;
			var q = field.zero;
			var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
			var dltInverse = field.inverse(denominatorLeadingTerm);
			while (r.degree() >= rLast.degree() && !r.isZero()) {
				var degreeDiff = r.degree() - rLast.degree();
				var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
				q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
				r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
			}
			t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
			if (r.degree() >= rLast.degree()) {
				return null;
			}
		}
		var sigmaTildeAtZero = t.getCoefficient(0);
		if (sigmaTildeAtZero === 0) {
			return null;
		}
		var inverse = field.inverse(sigmaTildeAtZero);
		return [t.multiply(inverse), r.multiply(inverse)];
	}
	function findErrorLocations(field, errorLocator) {
		var numErrors = errorLocator.degree();
		if (numErrors === 1) {
			return [errorLocator.getCoefficient(1)];
		}
		var errorCount = 0;
		var result = new Array(numErrors);
		for (var i = 1; i < field.size && errorCount < numErrors; i++) {
			if (errorLocator.evaluateAt(i) === 0) {
				result[errorCount] = field.inverse(i);
				errorCount++;
			}
		}
		if (errorCount !== numErrors) {
			return null;
		}
		return result;
	}
	function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
		var s = errorLocations.length;
		var result = new Array(s);
		for (var i = 0; i < s; i++) {
			var denominator = 1;
			var xiInverse = field.inverse(errorLocations[i]);
			for (var j = 0; j < s; j++) {
				if (i !== j) {
					denominator = field.multiply(denominator, addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
				}
			}
			result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
			if (field.generatorBase !== 0) {
				result[i] = field.multiply(result[i], xiInverse);
			}
		}
		return result;
	}
	function rsDecode(bytes, twoS) {
		var outputBytes = new Uint8ClampedArray(bytes.length);
		outputBytes.set(bytes);
		var field = new GenericGF(0x011d, 256, 0);
		var poly = new GenericGFPoly(field, outputBytes);
		var syndromeCoefficients = new Uint8ClampedArray(twoS);
		var error = false;
		for (var s = 0; s < twoS; s++) {
			var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
			syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
			if (evaluation !== 0) {
				error = true;
			}
		}
		if (!error) {
			return outputBytes;
		}
		var syndrome = new GenericGFPoly(field, syndromeCoefficients);
		var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
		if (sigmaOmega === null) {
			return null;
		}
		var errorLocations = findErrorLocations(field, sigmaOmega[0]);
		if (errorLocations == null) {
			return null;
		}
		var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
		for (var i = 0; i < errorLocations.length; i++) {
			var position = outputBytes.length - 1 - field.log(errorLocations[i]);
			if (position < 0) {
				return null;
			}
			outputBytes[position] = addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
		}
		return outputBytes;
	}

	var VERSIONS = [{
		infoBits: 0x00000,
		versionNumber: 1,
		alignmentPatternCenters: [],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 10,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 7,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 19
			}]
		}, {
			ecCodewordsPerBlock: 17,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 9
			}]
		}, {
			ecCodewordsPerBlock: 13,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 13
			}]
		}]
	}, {
		infoBits: 0x00000,
		versionNumber: 2,
		alignmentPatternCenters: [6, 18],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 16,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 28
			}]
		}, {
			ecCodewordsPerBlock: 10,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 34
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 22
			}]
		}]
	}, {
		infoBits: 0x00000,
		versionNumber: 3,
		alignmentPatternCenters: [6, 22],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 44
			}]
		}, {
			ecCodewordsPerBlock: 15,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 55
			}]
		}, {
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 13
			}]
		}, {
			ecCodewordsPerBlock: 18,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 17
			}]
		}]
	}, {
		infoBits: 0x00000,
		versionNumber: 4,
		alignmentPatternCenters: [6, 26],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 18,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 32
			}]
		}, {
			ecCodewordsPerBlock: 20,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 80
			}]
		}, {
			ecCodewordsPerBlock: 16,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 9
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 24
			}]
		}]
	}, {
		infoBits: 0x00000,
		versionNumber: 5,
		alignmentPatternCenters: [6, 30],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 43
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 108
			}]
		}, {
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 11
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 12
			}]
		}, {
			ecCodewordsPerBlock: 18,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 16
			}]
		}]
	}, {
		infoBits: 0x00000,
		versionNumber: 6,
		alignmentPatternCenters: [6, 34],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 16,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 27
			}]
		}, {
			ecCodewordsPerBlock: 18,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 68
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 15
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 19
			}]
		}]
	}, {
		infoBits: 0x07c94,
		versionNumber: 7,
		alignmentPatternCenters: [6, 22, 38],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 18,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 31
			}]
		}, {
			ecCodewordsPerBlock: 20,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 78
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 13
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 14
			}]
		}, {
			ecCodewordsPerBlock: 18,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 14
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 15
			}]
		}]
	}, {
		infoBits: 0x085bc,
		versionNumber: 8,
		alignmentPatternCenters: [6, 24, 42],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 38
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 39
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 97
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 14
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 15
			}]
		}, {
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 18
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 19
			}]
		}]
	}, {
		infoBits: 0x09a99,
		versionNumber: 9,
		alignmentPatternCenters: [6, 26, 46],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 36
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 37
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 116
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 12
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 13
			}]
		}, {
			ecCodewordsPerBlock: 20,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 16
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 17
			}]
		}]
	}, {
		infoBits: 0x0a4d3,
		versionNumber: 10,
		alignmentPatternCenters: [6, 28, 50],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 43
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 44
			}]
		}, {
			ecCodewordsPerBlock: 18,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 68
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 69
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 6,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 6,
				dataCodewordsPerBlock: 19
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 20
			}]
		}]
	}, {
		infoBits: 0x0bbf6,
		versionNumber: 11,
		alignmentPatternCenters: [6, 30, 54],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 50
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 51
			}]
		}, {
			ecCodewordsPerBlock: 20,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 81
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 12
			}, {
				numBlocks: 8,
				dataCodewordsPerBlock: 13
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 22
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 23
			}]
		}]
	}, {
		infoBits: 0x0c762,
		versionNumber: 12,
		alignmentPatternCenters: [6, 32, 58],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 6,
				dataCodewordsPerBlock: 36
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 37
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 92
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 93
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 7,
				dataCodewordsPerBlock: 14
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 15
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 20
			}, {
				numBlocks: 6,
				dataCodewordsPerBlock: 21
			}]
		}]
	}, {
		infoBits: 0x0d847,
		versionNumber: 13,
		alignmentPatternCenters: [6, 34, 62],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 8,
				dataCodewordsPerBlock: 37
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 38
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 107
			}]
		}, {
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 12,
				dataCodewordsPerBlock: 11
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 12
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 8,
				dataCodewordsPerBlock: 20
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 21
			}]
		}]
	}, {
		infoBits: 0x0e60d,
		versionNumber: 14,
		alignmentPatternCenters: [6, 26, 46, 66],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 40
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 41
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 115
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 116
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 11,
				dataCodewordsPerBlock: 12
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 13
			}]
		}, {
			ecCodewordsPerBlock: 20,
			ecBlocks: [{
				numBlocks: 11,
				dataCodewordsPerBlock: 16
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 17
			}]
		}]
	}, {
		infoBits: 0x0f928,
		versionNumber: 15,
		alignmentPatternCenters: [6, 26, 48, 70],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 5,
				dataCodewordsPerBlock: 41
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 42
			}]
		}, {
			ecCodewordsPerBlock: 22,
			ecBlocks: [{
				numBlocks: 5,
				dataCodewordsPerBlock: 87
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 88
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 11,
				dataCodewordsPerBlock: 12
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 13
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 5,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x10b78,
		versionNumber: 16,
		alignmentPatternCenters: [6, 26, 50, 74],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 7,
				dataCodewordsPerBlock: 45
			}, {
				numBlocks: 3,
				dataCodewordsPerBlock: 46
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 5,
				dataCodewordsPerBlock: 98
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 99
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 13,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 15,
				dataCodewordsPerBlock: 19
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 20
			}]
		}]
	}, {
		infoBits: 0x1145d,
		versionNumber: 17,
		alignmentPatternCenters: [6, 30, 54, 78],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 10,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 107
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 108
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 14
			}, {
				numBlocks: 17,
				dataCodewordsPerBlock: 15
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 22
			}, {
				numBlocks: 15,
				dataCodewordsPerBlock: 23
			}]
		}]
	}, {
		infoBits: 0x12a17,
		versionNumber: 18,
		alignmentPatternCenters: [6, 30, 56, 82],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 9,
				dataCodewordsPerBlock: 43
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 44
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 5,
				dataCodewordsPerBlock: 120
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 121
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 14
			}, {
				numBlocks: 19,
				dataCodewordsPerBlock: 15
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 22
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 23
			}]
		}]
	}, {
		infoBits: 0x13532,
		versionNumber: 19,
		alignmentPatternCenters: [6, 30, 58, 86],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 44
			}, {
				numBlocks: 11,
				dataCodewordsPerBlock: 45
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 113
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 114
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 9,
				dataCodewordsPerBlock: 13
			}, {
				numBlocks: 16,
				dataCodewordsPerBlock: 14
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 21
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 22
			}]
		}]
	}, {
		infoBits: 0x149a6,
		versionNumber: 20,
		alignmentPatternCenters: [6, 34, 62, 90],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 41
			}, {
				numBlocks: 13,
				dataCodewordsPerBlock: 42
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 107
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 108
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 15,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 10,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 15,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x15683,
		versionNumber: 21,
		alignmentPatternCenters: [6, 28, 50, 72, 94],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 42
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 116
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 117
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 19,
				dataCodewordsPerBlock: 16
			}, {
				numBlocks: 6,
				dataCodewordsPerBlock: 17
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 22
			}, {
				numBlocks: 6,
				dataCodewordsPerBlock: 23
			}]
		}]
	}, {
		infoBits: 0x168c9,
		versionNumber: 22,
		alignmentPatternCenters: [6, 26, 50, 74, 98],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 46
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 111
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 112
			}]
		}, {
			ecCodewordsPerBlock: 24,
			ecBlocks: [{
				numBlocks: 34,
				dataCodewordsPerBlock: 13
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 7,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 16,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x177ec,
		versionNumber: 23,
		alignmentPatternCenters: [6, 30, 54, 74, 102],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 47
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 48
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 121
			}, {
				numBlocks: 5,
				dataCodewordsPerBlock: 122
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 16,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 11,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x18ec4,
		versionNumber: 24,
		alignmentPatternCenters: [6, 28, 54, 80, 106],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 6,
				dataCodewordsPerBlock: 45
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 46
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 6,
				dataCodewordsPerBlock: 117
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 118
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 30,
				dataCodewordsPerBlock: 16
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 17
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 11,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 16,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x191e1,
		versionNumber: 25,
		alignmentPatternCenters: [6, 32, 58, 84, 110],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 8,
				dataCodewordsPerBlock: 47
			}, {
				numBlocks: 13,
				dataCodewordsPerBlock: 48
			}]
		}, {
			ecCodewordsPerBlock: 26,
			ecBlocks: [{
				numBlocks: 8,
				dataCodewordsPerBlock: 106
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 107
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 22,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 13,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 7,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 22,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x1afab,
		versionNumber: 26,
		alignmentPatternCenters: [6, 30, 58, 86, 114],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 19,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 10,
				dataCodewordsPerBlock: 114
			}, {
				numBlocks: 2,
				dataCodewordsPerBlock: 115
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 33,
				dataCodewordsPerBlock: 16
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 17
			}]
		}, {
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 28,
				dataCodewordsPerBlock: 22
			}, {
				numBlocks: 6,
				dataCodewordsPerBlock: 23
			}]
		}]
	}, {
		infoBits: 0x1b08e,
		versionNumber: 27,
		alignmentPatternCenters: [6, 34, 62, 90, 118],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 22,
				dataCodewordsPerBlock: 45
			}, {
				numBlocks: 3,
				dataCodewordsPerBlock: 46
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 8,
				dataCodewordsPerBlock: 122
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 123
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 12,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 28,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 8,
				dataCodewordsPerBlock: 23
			}, {
				numBlocks: 26,
				dataCodewordsPerBlock: 24
			}]
		}]
	}, {
		infoBits: 0x1cc1a,
		versionNumber: 28,
		alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 45
			}, {
				numBlocks: 23,
				dataCodewordsPerBlock: 46
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 3,
				dataCodewordsPerBlock: 117
			}, {
				numBlocks: 10,
				dataCodewordsPerBlock: 118
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 11,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 31,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 31,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x1d33f,
		versionNumber: 29,
		alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 21,
				dataCodewordsPerBlock: 45
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 46
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 7,
				dataCodewordsPerBlock: 116
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 117
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 19,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 26,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 1,
				dataCodewordsPerBlock: 23
			}, {
				numBlocks: 37,
				dataCodewordsPerBlock: 24
			}]
		}]
	}, {
		infoBits: 0x1ed75,
		versionNumber: 30,
		alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 19,
				dataCodewordsPerBlock: 47
			}, {
				numBlocks: 10,
				dataCodewordsPerBlock: 48
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 5,
				dataCodewordsPerBlock: 115
			}, {
				numBlocks: 10,
				dataCodewordsPerBlock: 116
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 23,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 25,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 15,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 25,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x1f250,
		versionNumber: 31,
		alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 29,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 13,
				dataCodewordsPerBlock: 115
			}, {
				numBlocks: 3,
				dataCodewordsPerBlock: 116
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 23,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 28,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 42,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x209d5,
		versionNumber: 32,
		alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 10,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 23,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 115
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 19,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 35,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 10,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 35,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x216f0,
		versionNumber: 33,
		alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 14,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 21,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 115
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 116
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 11,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 46,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 29,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 19,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x228ba,
		versionNumber: 34,
		alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 14,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 23,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 13,
				dataCodewordsPerBlock: 115
			}, {
				numBlocks: 6,
				dataCodewordsPerBlock: 116
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 59,
				dataCodewordsPerBlock: 16
			}, {
				numBlocks: 1,
				dataCodewordsPerBlock: 17
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 44,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x2379f,
		versionNumber: 35,
		alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 12,
				dataCodewordsPerBlock: 47
			}, {
				numBlocks: 26,
				dataCodewordsPerBlock: 48
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 12,
				dataCodewordsPerBlock: 121
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 122
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 22,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 41,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 39,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x24b0b,
		versionNumber: 36,
		alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 6,
				dataCodewordsPerBlock: 47
			}, {
				numBlocks: 34,
				dataCodewordsPerBlock: 48
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 6,
				dataCodewordsPerBlock: 121
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 122
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 2,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 64,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 46,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 10,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x2542e,
		versionNumber: 37,
		alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 29,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 17,
				dataCodewordsPerBlock: 122
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 123
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 24,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 46,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 49,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 10,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x26a64,
		versionNumber: 38,
		alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 13,
				dataCodewordsPerBlock: 46
			}, {
				numBlocks: 32,
				dataCodewordsPerBlock: 47
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 4,
				dataCodewordsPerBlock: 122
			}, {
				numBlocks: 18,
				dataCodewordsPerBlock: 123
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 42,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 32,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 48,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 14,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x27541,
		versionNumber: 39,
		alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 40,
				dataCodewordsPerBlock: 47
			}, {
				numBlocks: 7,
				dataCodewordsPerBlock: 48
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 20,
				dataCodewordsPerBlock: 117
			}, {
				numBlocks: 4,
				dataCodewordsPerBlock: 118
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 10,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 67,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 43,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 22,
				dataCodewordsPerBlock: 25
			}]
		}]
	}, {
		infoBits: 0x28c69,
		versionNumber: 40,
		alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
		errorCorrectionLevels: [{
			ecCodewordsPerBlock: 28,
			ecBlocks: [{
				numBlocks: 18,
				dataCodewordsPerBlock: 47
			}, {
				numBlocks: 31,
				dataCodewordsPerBlock: 48
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 19,
				dataCodewordsPerBlock: 118
			}, {
				numBlocks: 6,
				dataCodewordsPerBlock: 119
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 20,
				dataCodewordsPerBlock: 15
			}, {
				numBlocks: 61,
				dataCodewordsPerBlock: 16
			}]
		}, {
			ecCodewordsPerBlock: 30,
			ecBlocks: [{
				numBlocks: 34,
				dataCodewordsPerBlock: 24
			}, {
				numBlocks: 34,
				dataCodewordsPerBlock: 25
			}]
		}]
	}];

	var call = functionCall;
	var hasOwn = hasOwnProperty_1;
	var isPrototypeOf = objectIsPrototypeOf;
	var regExpFlags = regexpFlags$1;
	var RegExpPrototype$1 = RegExp.prototype;
	var regexpGetFlags = function (R) {
		var flags = R.flags;
		return flags === undefined && !('flags' in RegExpPrototype$1) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype$1, R)
			? call(regExpFlags, R) : flags;
	};
	getDefaultExportFromCjs(regexpGetFlags);

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var defineBuiltIn = defineBuiltIn$c;
	var anObject = anObject$f;
	var $toString = toString$b;
	var fails = fails$B;
	var getRegExpFlags = regexpGetFlags;
	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];
	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;
	if (NOT_GENERIC || INCORRECT_NAME) {
		defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
			var R = anObject(this);
			var pattern = $toString(R.source);
			var flags = $toString(getRegExpFlags(R));
			return '/' + pattern + '/' + flags;
		}, { unsafe: true });
	}

	var BitStream = function () {
		function BitStream(bytes) {
			this.byteOffset = 0;
			this.bitOffset = 0;
			this.bytes = bytes;
		}
		BitStream.prototype.readBits = function (numBits) {
			if (numBits < 1 || numBits > 32 || numBits > this.available()) {
				throw new Error("can't read ".concat(numBits, ' bits'));
			}
			var result = 0;
			if (this.bitOffset > 0) {
				var bitsLeft = 8 - this.bitOffset;
				var toRead = numBits < bitsLeft ? numBits : bitsLeft;
				var bitsToNotRead = bitsLeft - toRead;
				var mask = 0xff >> 8 - toRead << bitsToNotRead;
				result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
				numBits -= toRead;
				this.bitOffset += toRead;
				if (this.bitOffset === 8) {
					this.bitOffset = 0;
					this.byteOffset++;
				}
			}
			if (numBits > 0) {
				while (numBits >= 8) {
					result = result << 8 | this.bytes[this.byteOffset] & 0xff;
					this.byteOffset++;
					numBits -= 8;
				}
				if (numBits > 0) {
					var bitsToNotRead = 8 - numBits;
					var mask = 0xff >> bitsToNotRead << bitsToNotRead;
					result = result << numBits | (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
					this.bitOffset += numBits;
				}
			}
			return result;
		};
		BitStream.prototype.available = function () {
			return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
		};
		return BitStream;
	}();

	var SJIS_UTF8_TABLE = [[0x8140, '　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×'], [0x8180, '÷＝≠＜＞'], [0x818f, '￥＄￠￡％＃＆＊＠§☆★'], [0x81a6, '※〒→←↑↓〓'], [0x81ca, '￢'], [0x824f, '０１２３４５６７８９'], [0x8260, 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'], [0x8281, 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'], [0x829f, 'ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん'], [0x8340, 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミ'], [0x8380, 'ムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ'], [0x839f, 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'], [0x83bf, 'αβγδεζηθικλμνξοπρστυφχψω'], [0x8440, 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'], [0x8470, 'абвгдеёжзийклмн'], [0x8480, 'опрстуфхцчшщъыьэюя'], [0x8780, '〝〟'], [0x8940, '院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円'], [0x8980, '園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改'], [0x8a40, '魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫'], [0x8a80, '橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄'], [0x8b40, '機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救'], [0x8b80, '朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈'], [0x8c40, '掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨'], [0x8c80, '劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向'], [0x8d40, '后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降'], [0x8d80, '項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷'], [0x8e40, '察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止'], [0x8e80, '死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周'], [0x8f40, '宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳'], [0x8f80, '準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾'], [0x9040, '拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨'], [0x9080, '逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線'], [0x9140, '繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻'], [0x9180, '操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只'], [0x9240, '叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄'], [0x9280, '逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓'], [0x9340, '邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬'], [0x9380, '凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入'], [0x9440, '如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅'], [0x9480, '楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美'], [0x9540, '鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷'], [0x9580, '斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋'], [0x9640, '法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆'], [0x9680, '摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒'], [0x9740, '諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲'], [0x9780, '沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯'], [0x9840, '蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕'], [0x989f, '弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲'], [0x9940, '僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭'], [0x9980, '凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨'], [0x9a40, '咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸'], [0x9a80, '噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩'], [0x9b40, '奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀'], [0x9b80, '它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏'], [0x9c40, '廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠'], [0x9c80, '怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛'], [0x9d40, '戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫'], [0x9d80, '捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼'], [0x9e40, '曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎'], [0x9e80, '梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣'], [0x9f40, '檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯'], [0x9f80, '麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌'], [0xe040, '漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝'], [0xe080, '烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱'], [0xe140, '瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿'], [0xe180, '痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬'], [0xe240, '磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰'], [0xe280, '窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆'], [0xe340, '紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷'], [0xe380, '縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋'], [0xe440, '隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤'], [0xe480, '艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈'], [0xe540, '蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬'], [0xe580, '蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞'], [0xe640, '襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧'], [0xe680, '諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊'], [0xe740, '蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜'], [0xe780, '轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮'], [0xe840, '錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙'], [0xe880, '閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰'], [0xe940, '顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃'], [0xe980, '騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈'], [0xea40, '鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯'], [0xea80, '黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙']];
	var tables;
	function getTables() {
		if (!tables) {
			var UTF8_TO_SJIS = {};
			var SJIS_TO_UTF8 = {};
			var tLength = SJIS_UTF8_TABLE.length;
			for (var i = 0; i < tLength; i++) {
				var mapItem = SJIS_UTF8_TABLE[i];
				var kanji = mapItem[1];
				var kLength = kanji.length;
				for (var j = 0; j < kLength; j++) {
					var kCode = mapItem[0] + j;
					var uCode = kanji.charAt(j).charCodeAt(0);
					UTF8_TO_SJIS[uCode] = kCode;
					SJIS_TO_UTF8[kCode] = uCode;
				}
			}
			tables = {
				UTF8_TO_SJIS: UTF8_TO_SJIS,
				SJIS_TO_UTF8: SJIS_TO_UTF8
			};
		}
		return tables;
	}
	function decode$2(bytes) {
		var pos = 0;
		var output = '';
		var length = bytes.length;
		var fromCharCode = String.fromCharCode;
		var SJIS_TO_UTF8 = getTables().SJIS_TO_UTF8;
		while (pos < length) {
			var byte = bytes[pos++];
			if (byte < 0x80) {
				output += fromCharCode(byte);
			} else if (0xa0 <= byte && byte <= 0xdf) {
				output += fromCharCode(byte + 0xfec0);
			} else {
				var code = SJIS_TO_UTF8[(byte << 8) + bytes[pos++]];
				output += code != null ? fromCharCode(code) : '?';
			}
		}
		return output;
	}

	function decodeNumeric(stream, size) {
		var data = '';
		var bytes = [];
		var characterCountSize = [10, 12, 14][size];
		var length = stream.readBits(characterCountSize);
		while (length >= 3) {
			var num = stream.readBits(10);
			if (num >= 1000) {
				throw new Error('invalid numeric value above 999');
			}
			var a = Math.floor(num / 100);
			var b = Math.floor(num / 10) % 10;
			var c = num % 10;
			bytes.push(48 + a, 48 + b, 48 + c);
			data += a.toString() + b.toString() + c.toString();
			length -= 3;
		}
		if (length === 2) {
			var num = stream.readBits(7);
			if (num >= 100) {
				throw new Error('invalid numeric value above 99');
			}
			var a = Math.floor(num / 10);
			var b = num % 10;
			bytes.push(48 + a, 48 + b);
			data += a.toString() + b.toString();
		} else if (length === 1) {
			var num = stream.readBits(4);
			if (num >= 10) {
				throw new Error('invalid numeric value above 9');
			}
			bytes.push(48 + num);
			data += num.toString();
		}
		return {
			bytes: bytes,
			data: data
		};
	}
	var AlphanumericCharacterCodes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];
	function decodeAlphanumeric(stream, size) {
		var bytes = [];
		var characterCountSize = [9, 11, 13][size];
		var data = '';
		var length = stream.readBits(characterCountSize);
		while (length >= 2) {
			var v = stream.readBits(11);
			var a = Math.floor(v / 45);
			var b = v % 45;
			bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
			data += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
			length -= 2;
		}
		if (length === 1) {
			var a = stream.readBits(6);
			bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
			data += AlphanumericCharacterCodes[a];
		}
		return {
			bytes: bytes,
			data: data
		};
	}
	function decodeByte(stream, size, encoding) {
		var bytes = [];
		var characterCountSize = [8, 16, 16][size];
		var length = stream.readBits(characterCountSize);
		for (var i = 0; i < length; i++) {
			bytes.push(stream.readBits(8));
		}
		return {
			bytes: bytes,
			data: encoding === 20 ? decode$2(bytes) : decode$3(bytes)
		};
	}
	function decodeKanji(stream, size) {
		var data = '';
		var bytes = [];
		var fromCharCode = String.fromCharCode;
		var SJIS_TO_UTF8 = getTables().SJIS_TO_UTF8;
		var characterCountSize = [8, 10, 12][size];
		var length = stream.readBits(characterCountSize);
		for (var i = 0; i < length; i++) {
			var k = stream.readBits(13);
			var c = Math.floor(k / 0xc0) << 8 | k % 0xc0;
			if (c < 0x1f00) {
				c += 0x8140;
			} else {
				c += 0xc140;
			}
			bytes.push(c >> 8, c & 0xff);
			var b = SJIS_TO_UTF8[c];
			data += fromCharCode(b != null ? b : c);
		}
		return {
			bytes: bytes,
			data: data
		};
	}
	function bytesDecode(data, version, errorCorrectionLevel) {
		var _a, _b, _c, _d;
		var encoding = -1;
		var stream = new BitStream(data);
		var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
		var result = {
			data: '',
			bytes: [],
			chunks: [],
			version: version,
			errorCorrectionLevel: errorCorrectionLevel
		};
		while (stream.available() >= 4) {
			var mode = stream.readBits(4);
			if (mode === Mode.Terminator) {
				return result;
			} else if (mode === Mode.ECI) {
				if (stream.readBits(1) === 0) {
					encoding = stream.readBits(7);
				} else if (stream.readBits(1) === 0) {
					encoding = stream.readBits(14);
				} else if (stream.readBits(1) === 0) {
					encoding = stream.readBits(21);
				} else {
					encoding = -1;
				}
			} else if (mode === Mode.Numeric) {
				var numericResult = decodeNumeric(stream, size);
				result.data += numericResult.data;
				result.chunks.push({
					mode: Mode.Numeric,
					data: numericResult.data,
					bytes: numericResult.bytes
				});
				(_a = result.bytes).push.apply(_a, numericResult.bytes);
			} else if (mode === Mode.Alphanumeric) {
				var alphanumericResult = decodeAlphanumeric(stream, size);
				result.data += alphanumericResult.data;
				result.chunks.push({
					mode: Mode.Alphanumeric,
					data: alphanumericResult.data,
					bytes: alphanumericResult.bytes
				});
				(_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
			} else if (mode === Mode.StructuredAppend) {
				var structuredAppend = {
					symbols: [stream.readBits(4), stream.readBits(4)],
					parity: stream.readBits(8)
				};
				result.chunks.push(_assign({
					mode: Mode.StructuredAppend
				}, structuredAppend));
			} else if (mode === Mode.Byte) {
				var byteResult = decodeByte(stream, size, encoding);
				result.data += byteResult.data;
				result.chunks.push({
					encoding: encoding,
					mode: Mode.Byte,
					data: byteResult.data,
					bytes: byteResult.bytes
				});
				(_c = result.bytes).push.apply(_c, byteResult.bytes);
			} else if (mode === Mode.Kanji) {
				var kanjiResult = decodeKanji(stream, size);
				result.data += kanjiResult.data;
				result.chunks.push({
					mode: Mode.Kanji,
					data: kanjiResult.data,
					bytes: kanjiResult.bytes
				});
				(_d = result.bytes).push.apply(_d, kanjiResult.bytes);
			}
		}
		if (stream.available() === 0 || stream.readBits(stream.available()) === 0) {
			return result;
		}
		return null;
	}

	function numBitsDiffering(x, y) {
		var z = x ^ y;
		var bitCount = 0;
		while (z) {
			bitCount++;
			z &= z - 1;
		}
		return bitCount;
	}
	function pushBit(bit, byte) {
		return byte << 1 | +bit;
	}
	var FORMAT_INFO_TABLE = [{
		bits: 0x5412,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 0
		}
	}, {
		bits: 0x5125,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 1
		}
	}, {
		bits: 0x5e7c,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 2
		}
	}, {
		bits: 0x5b4b,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 3
		}
	}, {
		bits: 0x45f9,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 4
		}
	}, {
		bits: 0x40ce,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 5
		}
	}, {
		bits: 0x4f97,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 6
		}
	}, {
		bits: 0x4aa0,
		formatInfo: {
			errorCorrectionLevel: 0,
			dataMask: 7
		}
	}, {
		bits: 0x77c4,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 0
		}
	}, {
		bits: 0x72f3,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 1
		}
	}, {
		bits: 0x7daa,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 2
		}
	}, {
		bits: 0x789d,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 3
		}
	}, {
		bits: 0x662f,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 4
		}
	}, {
		bits: 0x6318,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 5
		}
	}, {
		bits: 0x6c41,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 6
		}
	}, {
		bits: 0x6976,
		formatInfo: {
			errorCorrectionLevel: 1,
			dataMask: 7
		}
	}, {
		bits: 0x1689,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 0
		}
	}, {
		bits: 0x13be,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 1
		}
	}, {
		bits: 0x1ce7,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 2
		}
	}, {
		bits: 0x19d0,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 3
		}
	}, {
		bits: 0x0762,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 4
		}
	}, {
		bits: 0x0255,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 5
		}
	}, {
		bits: 0x0d0c,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 6
		}
	}, {
		bits: 0x083b,
		formatInfo: {
			errorCorrectionLevel: 2,
			dataMask: 7
		}
	}, {
		bits: 0x355f,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 0
		}
	}, {
		bits: 0x3068,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 1
		}
	}, {
		bits: 0x3f31,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 2
		}
	}, {
		bits: 0x3a06,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 3
		}
	}, {
		bits: 0x24b4,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 4
		}
	}, {
		bits: 0x2183,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 5
		}
	}, {
		bits: 0x2eda,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 6
		}
	}, {
		bits: 0x2bed,
		formatInfo: {
			errorCorrectionLevel: 3,
			dataMask: 7
		}
	}];
	function buildFunctionPatternMask(version) {
		var dimension = 17 + 4 * version.versionNumber;
		var matrix = BitMatrix.createEmpty(dimension, dimension);
		matrix.setRegion(0, 0, 9, 9, true);
		matrix.setRegion(dimension - 8, 0, 8, 9, true);
		matrix.setRegion(0, dimension - 8, 9, 8, true);
		for (var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++) {
			var x = _a[_i];
			for (var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++) {
				var y = _c[_b];
				if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) {
					matrix.setRegion(x - 2, y - 2, 5, 5, true);
				}
			}
		}
		matrix.setRegion(6, 9, 1, dimension - 17, true);
		matrix.setRegion(9, 6, dimension - 17, 1, true);
		if (version.versionNumber > 6) {
			matrix.setRegion(dimension - 11, 0, 3, 6, true);
			matrix.setRegion(0, dimension - 11, 6, 3, true);
		}
		return matrix;
	}
	function readCodewords(matrix, version, formatInfo) {
		var dimension = matrix.height;
		var maskFunc = getMaskFunc(formatInfo.dataMask);
		var functionPatternMask = buildFunctionPatternMask(version);
		var bitsRead = 0;
		var currentByte = 0;
		var codewords = [];
		var readingUp = true;
		for (var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2) {
			if (columnIndex === 6) {
				columnIndex--;
			}
			for (var i = 0; i < dimension; i++) {
				var y = readingUp ? dimension - 1 - i : i;
				for (var columnOffset = 0; columnOffset < 2; columnOffset++) {
					var x = columnIndex - columnOffset;
					if (!functionPatternMask.get(x, y)) {
						bitsRead++;
						var bit = matrix.get(x, y);
						if (maskFunc(x, y)) {
							bit = !bit;
						}
						currentByte = pushBit(bit, currentByte);
						if (bitsRead === 8) {
							codewords.push(currentByte);
							bitsRead = 0;
							currentByte = 0;
						}
					}
				}
			}
			readingUp = !readingUp;
		}
		return codewords;
	}
	function readVersion(matrix) {
		var dimension = matrix.height;
		var provisionalVersion = Math.floor((dimension - 17) / 4);
		if (provisionalVersion <= 6) {
			return VERSIONS[provisionalVersion - 1];
		}
		var topRightVersionBits = 0;
		for (var y = 5; y >= 0; y--) {
			for (var x = dimension - 9; x >= dimension - 11; x--) {
				topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
			}
		}
		var bottomLeftVersionBits = 0;
		for (var x = 5; x >= 0; x--) {
			for (var y = dimension - 9; y >= dimension - 11; y--) {
				bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
			}
		}
		var bestDifference = Infinity;
		var bestVersion = null;
		for (var _i = 0, VERSIONS_1 = VERSIONS; _i < VERSIONS_1.length; _i++) {
			var version = VERSIONS_1[_i];
			if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) {
				return version;
			}
			var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
			if (difference < bestDifference) {
				bestVersion = version;
				bestDifference = difference;
			}
			difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
			if (difference < bestDifference) {
				bestVersion = version;
				bestDifference = difference;
			}
		}
		if (bestDifference <= 3) {
			return bestVersion;
		}
		return null;
	}
	function readFormatInformation(matrix) {
		var topLeftFormatInfoBits = 0;
		for (var x = 0; x <= 8; x++) {
			if (x !== 6) {
				topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
			}
		}
		for (var y = 7; y >= 0; y--) {
			if (y !== 6) {
				topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
			}
		}
		var dimension = matrix.height;
		var topRightBottomRightFormatInfoBits = 0;
		for (var y = dimension - 1; y >= dimension - 7; y--) {
			topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
		}
		for (var x = dimension - 8; x < dimension; x++) {
			topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
		}
		var bestDifference = Infinity;
		var bestFormatInfo = null;
		for (var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++) {
			var _a = FORMAT_INFO_TABLE_1[_i],
				bits = _a.bits,
				formatInfo = _a.formatInfo;
			if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) {
				return formatInfo;
			}
			var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
			if (difference < bestDifference) {
				bestFormatInfo = formatInfo;
				bestDifference = difference;
			}
			if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) {
				difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
				if (difference < bestDifference) {
					bestFormatInfo = formatInfo;
					bestDifference = difference;
				}
			}
		}
		if (bestDifference <= 3) {
			return bestFormatInfo;
		}
		return null;
	}
	function getDataBlocks(codewords, version, errorCorrectionLevel) {
		var dataBlocks = [];
		var ecInfo = version.errorCorrectionLevels[errorCorrectionLevel];
		var totalCodewords = 0;
		ecInfo.ecBlocks.forEach(function (block) {
			for (var i = 0; i < block.numBlocks; i++) {
				dataBlocks.push({
					numDataCodewords: block.dataCodewordsPerBlock,
					codewords: []
				});
				totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
			}
		});
		if (codewords.length < totalCodewords) {
			return null;
		}
		codewords = codewords.slice(0, totalCodewords);
		var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
		for (var i = 0; i < shortBlockSize; i++) {
			for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
				var dataBlock = dataBlocks_1[_i];
				dataBlock.codewords.push(codewords.shift());
			}
		}
		if (ecInfo.ecBlocks.length > 1) {
			var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
			var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
			for (var i = 0; i < largeBlockCount; i++) {
				dataBlocks[smallBlockCount + i].codewords.push(codewords.shift());
			}
		}
		while (codewords.length > 0) {
			for (var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++) {
				var dataBlock = dataBlocks_2[_a];
				dataBlock.codewords.push(codewords.shift());
			}
		}
		return dataBlocks;
	}
	function decodeMatrix(matrix) {
		var version = readVersion(matrix);
		if (version === null) {
			return null;
		}
		var formatInfo = readFormatInformation(matrix);
		if (formatInfo === null) {
			return null;
		}
		var codewords = readCodewords(matrix, version, formatInfo);
		var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
		if (dataBlocks === null) {
			return null;
		}
		var totalBytes = dataBlocks.reduce(function (a, b) {
			return a + b.numDataCodewords;
		}, 0);
		var resultBytes = new Uint8ClampedArray(totalBytes);
		var resultIndex = 0;
		for (var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++) {
			var dataBlock = dataBlocks_3[_i];
			var correctedBytes = rsDecode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
			if (correctedBytes === null) {
				return null;
			}
			for (var i = 0; i < dataBlock.numDataCodewords; i++) {
				resultBytes[resultIndex++] = correctedBytes[i];
			}
		}
		try {
			return bytesDecode(resultBytes, version.versionNumber, formatInfo.errorCorrectionLevel);
		} catch (_a) {
			return null;
		}
	}
	function decode$1(matrix) {
		var result = decodeMatrix(matrix);
		if (result !== null) {
			return result;
		}
		for (var x = 0; x < matrix.width; x++) {
			for (var y = x + 1; y < matrix.height; y++) {
				if (matrix.get(x, y) !== matrix.get(y, x)) {
					matrix.set(x, y, !matrix.get(x, y));
					matrix.set(y, x, !matrix.get(y, x));
				}
			}
		}
		return decodeMatrix(matrix);
	}

	var REGION_SIZE = 8;
	var MIN_DYNAMIC_RANGE = 24;
	function numBetween(value, min, max) {
		return value < min ? min : value > max ? max : value;
	}
	var Matrix = function () {
		function Matrix(width, height, buffer) {
			this.width = width;
			var bufferSize = width * height;
			if (buffer && buffer.length !== bufferSize) {
				throw new Error('wrong buffer size');
			}
			this.data = buffer || new Uint8ClampedArray(bufferSize);
		}
		Matrix.prototype.get = function (x, y) {
			return this.data[y * this.width + x];
		};
		Matrix.prototype.set = function (x, y, value) {
			this.data[y * this.width + x] = value;
		};
		return Matrix;
	}();
	function binarize(data, width, height, returnInverted, greyscaleWeights, canOverwriteImage) {
		if (greyscaleWeights === void 0) {
			greyscaleWeights = {
				red: 0.2126,
				green: 0.7152,
				blue: 0.0722,
				useIntegerApproximation: false
			};
		}
		if (canOverwriteImage === void 0) {
			canOverwriteImage = true;
		}
		var pixelCount = width * height;
		if (data.length !== pixelCount * 4) {
			throw new Error('malformed data passed to binarizer');
		}
		var bufferOffset = 0;
		var greyscaleBuffer;
		if (canOverwriteImage) {
			greyscaleBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, pixelCount);
			bufferOffset += pixelCount;
		}
		var greyscalePixels = new Matrix(width, height, greyscaleBuffer);
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				var position = (y * width + x) * 4;
				var r = data[position];
				var g = data[position + 1];
				var b = data[position + 2];
				var value = greyscaleWeights.red * r + greyscaleWeights.green * g + greyscaleWeights.blue * b;
				greyscalePixels.set(x, y, greyscaleWeights.useIntegerApproximation ? value + 128 >> 8 : value);
			}
		}
		var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
		var verticalRegionCount = Math.ceil(height / REGION_SIZE);
		var blackPointsCount = horizontalRegionCount * verticalRegionCount;
		var blackPointsBuffer;
		if (canOverwriteImage) {
			blackPointsBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, blackPointsCount);
			bufferOffset += blackPointsCount;
		}
		var blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount, blackPointsBuffer);
		for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
			for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
				var sum = 0;
				var min = Infinity;
				var max = 0;
				for (var y = 0; y < REGION_SIZE; y++) {
					for (var x = 0; x < REGION_SIZE; x++) {
						var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
						sum += pixelLumosity;
						min = Math.min(min, pixelLumosity);
						max = Math.max(max, pixelLumosity);
					}
				}
				var average = sum / Math.pow(REGION_SIZE, 2);
				if (max - min <= MIN_DYNAMIC_RANGE) {
					average = min / 2;
					if (verticalRegion > 0 && hortizontalRegion > 0) {
						var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) + 2 * blackPoints.get(hortizontalRegion - 1, verticalRegion) + blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
						if (min < averageNeighborBlackPoint) {
							average = averageNeighborBlackPoint;
						}
					}
				}
				blackPoints.set(hortizontalRegion, verticalRegion, average);
			}
		}
		var binarized;
		if (canOverwriteImage) {
			var binarizedBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, pixelCount);
			bufferOffset += pixelCount;
			binarized = new BitMatrix(binarizedBuffer, width);
		} else {
			binarized = BitMatrix.createEmpty(width, height);
		}
		var inverted;
		if (returnInverted) {
			if (canOverwriteImage) {
				var invertedBuffer = new Uint8ClampedArray(data.buffer, bufferOffset, pixelCount);
				inverted = new BitMatrix(invertedBuffer, width);
			} else {
				inverted = BitMatrix.createEmpty(width, height);
			}
		}
		for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
			for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
				var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
				var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
				var sum = 0;
				for (var xRegion = -2; xRegion <= 2; xRegion++) {
					for (var yRegion = -2; yRegion <= 2; yRegion++) {
						sum += blackPoints.get(left + xRegion, top_1 + yRegion);
					}
				}
				var threshold = sum / 25;
				for (var xRegion = 0; xRegion < REGION_SIZE; xRegion++) {
					for (var yRegion = 0; yRegion < REGION_SIZE; yRegion++) {
						var x = hortizontalRegion * REGION_SIZE + xRegion;
						var y = verticalRegion * REGION_SIZE + yRegion;
						var lum = greyscalePixels.get(x, y);
						binarized.set(x, y, lum <= threshold);
						if (returnInverted) {
							inverted.set(x, y, !(lum <= threshold));
						}
					}
				}
			}
		}
		if (returnInverted) {
			return {
				binarized: binarized,
				inverted: inverted
			};
		}
		return {
			binarized: binarized
		};
	}

	function scan(matrix) {
		var locations = locate(matrix);
		if (locations === null) {
			return null;
		}
		for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
			var location_1 = locations_1[_i];
			var extracted = extract(matrix, location_1);
			var decoded = decode$1(extracted.matrix);
			if (decoded !== null) {
				var dimension = location_1.dimension;
				return _assign(_assign({}, decoded), {
					location: {
						topLeft: extracted.mappingFunction(0, 0),
						topRight: extracted.mappingFunction(dimension, 0),
						bottomLeft: extracted.mappingFunction(0, dimension),
						bottomRight: extracted.mappingFunction(dimension, dimension),
						topLeftFinder: location_1.topLeft,
						topRightFinder: location_1.topRight,
						bottomLeftFinder: location_1.bottomLeft,
						bottomRightAlignment: decoded.version > 1 ? location_1.alignmentPattern : null
					}
				});
			}
		}
		return null;
	}
	function disposeImageEvents(image) {
		image.onload = null;
		image.onerror = null;
	}
	var Decoder = function () {
		function Decoder(options) {
			if (options === void 0) {
				options = {};
			}
			this.options = options;
		}
		Decoder.prototype.setOptions = function (options) {
			this.options = _assign(_assign({}, this.options), options);
			return this;
		};
		Decoder.prototype.decode = function (data, width, height) {
			var options = this.options;
			var canOverwriteImage = options.canOverwriteImage,
				greyScaleWeights = options.greyScaleWeights,
				_a = options.inversionAttempts,
				inversionAttempts = _a === void 0 ? 'attemptBoth' : _a;
			var tryInvertedFirst = inversionAttempts === 'onlyInvert' || inversionAttempts === 'invertFirst';
			var invert = tryInvertedFirst || inversionAttempts === 'attemptBoth';
			var _b = binarize(data, width, height, invert, greyScaleWeights, canOverwriteImage),
				binarized = _b.binarized,
				inverted = _b.inverted;
			var result = scan(tryInvertedFirst ? inverted : binarized);
			if (result !== null && (options.inversionAttempts === 'attemptBoth' || options.inversionAttempts === 'invertFirst')) {
				result = scan(tryInvertedFirst ? binarized : inverted);
			}
			return result;
		};
		Decoder.prototype.scan = function (src) {
			var _this = this;
			return new Promise(function (resolve, reject) {
				var image = new Image();
				image.crossOrigin = 'anonymous';
				image.onload = function () {
					disposeImageEvents(image);
					var width = image.width;
					var height = image.height;
					var canvas = document.createElement('canvas');
					var context = canvas.getContext('2d');
					if (context === null) {
						return reject(new Error("browser does not support canvas.getContext('2d')"));
					}
					canvas.width = width;
					canvas.height = height;
					context.drawImage(image, 0, 0);
					var data = context.getImageData(0, 0, width, height).data;
					var result = _this.decode(data, width, height);
					if (result !== null) {
						return resolve(result);
					}
					return reject(new Error('failed to decode image'));
				};
				image.onerror = function () {
					disposeImageEvents(image);
					reject(new Error('failed to load image: '.concat(src)));
				};
				image.src = src;
			});
		};
		return Decoder;
	}();

	/*
	export async function encode(uwa: string): Promise<string> {
		//const segs: QRCodeSegment[] = [{ data: uwa, mode: "byte" }];
		return QRCode.toDataURL(uwa, { errorCorrectionLevel: "L" });
	}

	export async function decode(uwa: string): Promise<string> {
		//const segs: QRCodeSegment[] = [{ data: uwa, mode: "byte" }];
		return QRCode.decode(uwa, { errorCorrectionLevel: "L" });
	}
	*/

	function decode(data, width, height) {
		var decoder = new Decoder();
		return decoder.decode(data, width, height);
	}
	function encode(uwa) {
		var qrcode = new Encoder();

		//qrcode.setEncodingHint(true);
		qrcode.setErrorCorrectionLevel(ErrorCorrectionLevel.M);
		var parts = uwa.replace("uwa://", "").split(".");
		qrcode.write("uwa://");
		parts.forEach(function (part) {
			qrcode.write(new QRByte(part, function (p) {
				return {
					bytes: base64UrlToByteArray(p),
					encoding: 1
				};
			}));
		});
		qrcode.make();
		return qrcode.toDataURL();
	}

	// export function decode(dataUrl: string): string {
	//     const decoder = new Decoder();

	//     decoder.decode();
	// }

	function base64UrlToByteArray(base64Url) {
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/") + "==";
		base64 = base64.slice(0, Math.floor(base64.length / 4) * 4);
		var bytes = atob(base64).split("").map(function (c) {
			return c.charCodeAt(0);
		});
		return bytes;
	}

	exports.decode = decode;
	exports.encode = encode;

}));
