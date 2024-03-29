function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import { withDirectives as _withDirectives, vShow as _vShow, Fragment as _Fragment, createTextVNode as _createTextVNode, createVNode as _createVNode } from "vue";
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }
import { defineComponent, ref, reactive, onMounted, onBeforeUnmount, Transition } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { CloseCircleOutlined, ReloadOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { getPrefixCls } from '../utils/props-tools';
import { $tools } from '../utils/tools';
import { $g, MI_POWERED, MI_TARGET, MI_DEFAULT_AVATAT, MI_DEFAULT_BACKGROUND } from '../utils/global';
import { $request } from '../utils/request';
import { captchaModalProps } from './props';
export default defineComponent({
  name: 'MiCaptchaModal',
  inheritAttrs: false,
  props: captchaModalProps(),
  emits: ['modalClose'],
  setup: function setup(props, _ref) {
    var _props$maxTries,
      _this = this;
    var emit = _ref.emit;
    var prefixCls = getPrefixCls('captcha-modal', props.prefixCls);
    var langCls = getPrefixCls("lang-zh-cn", props.prefixCls);
    var animation = getPrefixCls('anim-scale');
    var modalRef = ref(null);
    var maskRef = ref(null);
    var contentRef = ref(null);
    var sliderRef = ref(null);
    var sliderBtnRef = ref(null);
    var imageRef = ref(null);
    var blockRef = ref(null);
    var resultRef = ref(null);
    var show = ref(props.show);
    var classes = {
      modal: prefixCls,
      image: "".concat(prefixCls, "-image"),
      block: "".concat(prefixCls, "-block"),
      slider: "".concat(prefixCls, "-slider"),
      mask: "".concat(prefixCls, "-mask"),
      result: "".concat(prefixCls, "-result"),
      content: "".concat(prefixCls, "-content")
    };
    var params = reactive({
      loading: true,
      background: MI_DEFAULT_BACKGROUND,
      avatar: MI_DEFAULT_AVATAT,
      powered: MI_POWERED,
      target: MI_TARGET,
      ctx: {
        image: null,
        block: null
      },
      elements: {
        slider: null,
        block: null
      },
      coordinate: {
        x: 0,
        y: 0,
        offset: 6
      },
      size: {
        width: 260,
        height: 160
      },
      block: {
        size: 42,
        radius: 8,
        PI: Math.PI,
        real: 0
      },
      drag: {
        moving: false,
        originX: 0,
        originY: 0,
        offset: 0
      },
      time: {
        start: null,
        end: null
      },
      check: {
        tries: (_props$maxTries = props.maxTries) !== null && _props$maxTries !== void 0 ? _props$maxTries : 5,
        num: 0,
        correct: false,
        show: false,
        tip: null,
        being: false,
        value: null
      },
      _background: null
    });
    onMounted(function () {
      _newArrowCheck(this, _this);
      init();
    }.bind(this));
    onBeforeUnmount(function () {
      _newArrowCheck(this, _this);
      $tools.off(params.elements.slider, 'pointerdown', dragStart);
      $tools.off(params.elements.slider, 'touchstart', dragStart);
      $tools.off(params.elements.slider, 'pointermove', dragMoving);
      $tools.off(params.elements.slider, 'touchmove', dragMoving);
      $tools.off(params.elements.slider, 'pointerup', dragEnd);
      $tools.off(params.elements.slider, 'touchend', dragEnd);
    }.bind(this));
    var init = function init() {
      var _props$image;
      _newArrowCheck(this, _this);
      params._background = (_props$image = props.image) !== null && _props$image !== void 0 ? _props$image : params.background;
      initModal();
    }.bind(this);
    var initModal = function initModal() {
      _newArrowCheck(this, _this);
      params.elements = {
        slider: sliderBtnRef.value,
        block: blockRef.value
      };
      params.block.real = params.block.size + params.block.radius * 2 + 2;
      setCheckData();
      initCaptcha();
      $tools.on(params.elements.slider, 'pointerdown', dragStart);
      $tools.on(params.elements.slider, 'touchstart', dragStart);
      $tools.on(params.elements.slider, 'pointermove', dragMoving);
      $tools.on(params.elements.slider, 'touchmove', dragMoving);
      $tools.on(params.elements.slider, 'pointerup', dragEnd);
      $tools.on(params.elements.slider, 'touchend', dragEnd);
    }.bind(this);
    var setCheckData = function setCheckData() {
      var _props$maxTries2;
      _newArrowCheck(this, _this);
      params.check = {
        tries: (_props$maxTries2 = props.maxTries) !== null && _props$maxTries2 !== void 0 ? _props$maxTries2 : 5,
        num: 0,
        being: false,
        value: null,
        correct: false,
        tip: '拖动滑块将悬浮图像正确拼合',
        show: false
      };
    }.bind(this);
    var initCaptcha = function initCaptcha() {
      _newArrowCheck(this, _this);
      var image = imageRef.value;
      var block = blockRef.value;
      var imageCtx = image ? image.getContext('2d') : null;
      var blockCtx = block ? block.getContext('2d') : null;
      params.ctx = {
        image: imageCtx,
        block: blockCtx
      };
      /**
       * 图片统一转为 base64, 避免跨域问题.
       * 也可采用xhr异步请求图片地址.
       * ```
       * if (this.$g.regExp.url.test(this.background)) {
       *     const xhr = new XMLHttpRequest();
       *     xhr.onload = function() {
       *         if (this.status === 200) {
       *             // 注意 this 指向.
       *             const url = URL.createObjectURL(this.response);
       *             vm.background = url;
       *             vm.initImageElem();
       *             // ...
       *             URL.revokeObjectURL(url);
       *         }
       *     }
       *     xhr.open('GET', this.background, true);
       *     xhr.responseType = 'blob';
       *     xhr.send();
       * } else {
       *     this.initImageElem();
       * }
       * ```
       */
      if ($g.regExp.url.test(params._background)) image2Base64(initImageElem);else initImageElem();
    }.bind(this);
    var refreshCaptcha = function refreshCaptcha() {
      _newArrowCheck(this, _this);
      params.loading = true;
      setCheckData();
      var block = blockRef.value;
      block.width = params.size.width;
      params.ctx.image.clearRect(0, 0, params.size.width, params.size.height);
      params.ctx.block.clearRect(0, 0, params.size.width, params.size.height);
      initImageElem();
    }.bind(this);
    var closeModal = function closeModal(status, data) {
      var _this2 = this;
      _newArrowCheck(this, _this);
      params.loading = true;
      if (typeof status !== 'string') status = 'close';
      if (props.maskClosable) {
        show.value = false;
        setTimeout(function () {
          _newArrowCheck(this, _this2);
          emit('modalClose', {
            status: status,
            data: data
          });
        }.bind(this), 400);
      }
    }.bind(this);
    var image2Base64 = function image2Base64(callback) {
      var _this3 = this;
      _newArrowCheck(this, _this);
      var elem = new Image();
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      elem.crossOrigin = '';
      elem.src = params._background;
      elem.onload = function () {
        _newArrowCheck(this, _this3);
        canvas.width = params.size.width;
        canvas.height = params.size.height;
        ctx.drawImage(elem, 0, 0, params.size.width, params.size.height);
        params._background = canvas.toDataURL();
        callback && callback();
      }.bind(this);
    }.bind(this);
    var initImage = function initImage(elem) {
      _newArrowCheck(this, _this);
      if (params.ctx.image && params.ctx.block) {
        /** image */
        params.ctx.image.drawImage(elem, 0, 0, params.size.width, params.size.height);
        /** text */
        params.ctx.image.beginPath();
        params.ctx.image.fillStyle = '#FFF';
        params.ctx.image.shadowColor = 'transparent';
        params.ctx.image.shadowBlur = 0;
        params.ctx.image.font = 'bold 24px MicrosoftYaHei';
        params.ctx.image.fillText('拖动滑块拼合图片', 12, 30);
        params.ctx.image.font = '16px MicrosoftYaHei';
        params.ctx.image.fillText('就能验证成功哦', 12, 55);
        params.ctx.image.closePath();
        /** block */
        params.ctx.block.save();
        params.ctx.block.globalCompositeOperation = 'destination-over';
        drawBlockPosition();
        params.ctx.block.drawImage(elem, 0, 0, params.size.width, params.size.height);
        /** image data */
        var coordinateY = params.coordinate.y - params.block.radius * 2 + 1;
        var imageData = params.ctx.block.getImageData(params.coordinate.x, coordinateY, params.block.real, params.block.real);
        var block = blockRef.value;
        if (block) block.width = params.block.real;
        params.ctx.block.putImageData(imageData, params.coordinate.offset, coordinateY);
        params.ctx.block.restore();
        params.loading = false;
      }
    }.bind(this);
    var initImageElem = function initImageElem() {
      var _this4 = this;
      _newArrowCheck(this, _this);
      var elem = new Image();
      elem.src = params._background;
      elem.onload = function () {
        _newArrowCheck(this, _this4);
        return initImage(elem);
      }.bind(this);
    }.bind(this);
    var drawBlock = function drawBlock(ctx) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var operation = arguments.length > 2 ? arguments[2] : undefined;
      ctx.beginPath();
      ctx.moveTo(params.coordinate.x, params.coordinate.y);
      var direct = direction.direction;
      var type = direction.type;
      /** top */
      if (direct === 'top') {
        ctx.arc(params.coordinate.x + params.block.size / 2, params.coordinate.y, params.block.radius, -params.block.PI, 0, type === 'inner');
      }
      ctx.lineTo(params.coordinate.x + params.block.size, params.coordinate.y);
      /** right */
      if (direct === 'right') {
        ctx.arc(params.coordinate.x + params.block.size, params.coordinate.y + params.block.size / 2, params.block.radius, 1.5 * params.block.PI, 0.5 * params.block.PI, type === 'inner');
      }
      ctx.lineTo(params.coordinate.x + params.block.size, params.coordinate.y + params.block.size);
      /** bottom */
      ctx.arc(params.coordinate.x + params.block.size / 2, params.coordinate.y + params.block.size, params.block.radius, 0, params.block.PI, true);
      ctx.lineTo(params.coordinate.x, params.coordinate.y + params.block.size);
      /** left */
      ctx.arc(params.coordinate.x, params.coordinate.y + params.block.size / 2, params.block.radius, 0.5 * params.block.PI, 1.5 * params.block.PI, true);
      ctx.lineTo(params.coordinate.x, params.coordinate.y);
      ctx.shadowColor = 'rgba(0, 0, 0, .001)';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 1.5;
      ctx.fillStyle = 'rgba(0, 0, 0, .4)';
      ctx.strokeStyle = 'rgba(255, 255, 255, .8)';
      ctx.stroke();
      ctx.closePath();
      ctx[operation]();
    };
    var drawBlockPosition = function drawBlockPosition() {
      _newArrowCheck(this, _this);
      var x = $tools.randomNumberInRange(params.block.real + 20, params.size.width - (params.block.real + 20));
      var y = $tools.randomNumberInRange(55, params.size.height - 55);
      var direction = drawBlockDirection();
      params.coordinate.x = x;
      params.coordinate.y = y;
      drawBlock(params.ctx.image, direction, 'fill');
      drawBlock(params.ctx.block, direction, 'clip');
    }.bind(this);
    var drawBlockDirection = function drawBlockDirection() {
      _newArrowCheck(this, _this);
      var direction = {
        top: 'top',
        right: 'right'
      };
      var from = ['inner', 'outer'];
      var result = {};
      var keys = Object.keys(direction);
      var key = keys[Math.floor(Math.random() * keys.length)];
      result.direction = direction[key];
      result.type = from[Math.floor(Math.random() * from.length)];
      return result;
    }.bind(this);
    var getBoundingClientRect = function getBoundingClientRect(elem) {
      var specific = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var rect = elem.getBoundingClientRect();
      if (specific && rect[specific]) return rect[specific];
      return rect;
    };
    var dragStart = function dragStart(evt) {
      _newArrowCheck(this, _this);
      var x = evt.clientX || evt.touches[0].clientX;
      var sliderRect = getBoundingClientRect(sliderRef.value);
      var sliderBtnRect = getBoundingClientRect(sliderBtnRef.value);
      params.drag.originX = Math.round(sliderRect.left * 10) / 10;
      params.drag.originY = Math.round(sliderRect.top * 10) / 10;
      params.drag.offset = Math.round((x - sliderBtnRect.left) * 10) / 10;
      params.drag.moving = true;
      params.time.start = Date.now();
    }.bind(this);
    var dragMoving = function dragMoving(evt) {
      _newArrowCheck(this, _this);
      if (!params.drag.moving || params.check.being) return;
      var x = evt.clientX || evt.touches[0].clientX;
      var moveX = Math.round((x - params.drag.originX - params.drag.offset) * 10) / 10;
      if (moveX < 0 || moveX + 54 >= params.size.width) {
        checkVerificationCode();
        return false;
      }
      params.elements.slider.style.left = "".concat(moveX, "px");
      params.elements.block.style.left = "".concat(moveX, "px");
      params.check.value = moveX;
    }.bind(this);
    var dragEnd = function dragEnd() {
      _newArrowCheck(this, _this);
      if (!params.drag.moving) return;
      params.time.end = Date.now();
      checkVerificationCode();
    }.bind(this);
    var dragReset = function dragReset() {
      _newArrowCheck(this, _this);
      params.elements.slider.style.left = 0;
      params.elements.block.style.left = 0;
      params.drag.originX = 0;
      params.drag.originY = 0;
    }.bind(this);
    var checkVerificationCode = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this7 = this;
        var coordinateX, error, succcess, take, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              coordinateX = Math.round(params.check.value + params.coordinate.offset);
              if (!params.check.being) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              params.check.being = true;
              error = function error() {
                var _this5 = this;
                var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                setTimeout(function () {
                  _newArrowCheck(this, _this5);
                  dragReset();
                }.bind(this), 1000);
                params.check.num++;
                params.check.correct = false;
                if (msg) params.check.tip = msg;
              };
              if (!(params.coordinate.x - 2 <= coordinateX && params.coordinate.x + 2 >= coordinateX)) {
                _context.next = 18;
                break;
              }
              succcess = function succcess() {
                var _this6 = this;
                var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                setTimeout(function () {
                  _newArrowCheck(this, _this6);
                  closeModal('success', data);
                }.bind(this), 500);
              };
              take = Math.round((params.time.end - params.time.start) / 10) / 100;
              params.check.tip = "".concat(take, "s\u901F\u5EA6\u5B8C\u6210\u56FE\u7247\u62FC\u5408\u9A8C\u8BC1");
              if (!props.verifyAction) {
                _context.next = 14;
                break;
              }
              _context.next = 12;
              return $request[props.verifyMethod.toLowerCase()](props.verifyAction, JSON.parse(JSON.stringify(props.verifyParams)),{headers: {
                'Content-Type':"application/x-www-form-urlencoded"
              }}).then(function (res) {
                _newArrowCheck(this, _this7);
                if (res.ret.code === 200) {
                  params.check.correct = true;
                  succcess(res.data);
                } else error(res.ret.message);
              }.bind(this)).catch(function (err) {
                _newArrowCheck(this, _this7);
                error(err.message);
              }.bind(this));
            case 12:
              _context.next = 16;
              break;
            case 14:
              params.check.correct = true;
              succcess();
            case 16:
              _context.next = 19;
              break;
            case 18:
              error();
            case 19:
              result = resultRef.value;
              if (result) result.style.bottom = '0';
              if (params.check.num <= params.check.tries) params.check.show = true;
              setTimeout(function () {
                _newArrowCheck(this, _this7);
                params.drag.moving = false;
                if (result) result.style.bottom = $tools.convert2Rem(-32);
              }.bind(this), 1000);
              setTimeout(function () {
                _newArrowCheck(this, _this7);
                params.check.show = false;
                params.check.being = false;
                if (params.check.num >= params.check.tries) closeModal('frequently');
              }.bind(this), 1600);
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      return function checkVerificationCode() {
        return _ref2.apply(this, arguments);
      };
    }();
    var renderMask = function renderMask() {
      _newArrowCheck(this, _this);
      return props.mask && props.show ? _createVNode("div", {
        "class": classes.mask,
        "onClick": closeModal,
        "ref": maskRef
      }, null) : null;
    }.bind(this);
    var renderArrow = function renderArrow() {
      _newArrowCheck(this, _this);
      var arrowCls = "".concat(prefixCls, "-arrow");
      var style = {
        borderColor: props.themeColor ? "transparent ".concat(props.themeColor, " transparent transparent") : null
      };
      return _createVNode("div", {
        "class": arrowCls
      }, [_createVNode("div", {
        "class": "".concat(arrowCls, "-out"),
        "style": style
      }, null), _createVNode("div", {
        "class": "".concat(arrowCls, "-in"),
        "style": style
      }, null)]);
    }.bind(this);
    var renderContent = function renderContent() {
      var _props$themeColor, _props$bgColor;
      _newArrowCheck(this, _this);
      var style = {
        borderColor: (_props$themeColor = props.themeColor) !== null && _props$themeColor !== void 0 ? _props$themeColor : null,
        background: (_props$bgColor = props.bgColor) !== null && _props$bgColor !== void 0 ? _props$bgColor : null,
        boxShadow: props.boxShadow && (props.boxShadowColor || props.themeColor) ? "0 0 ".concat($tools.convert2Rem(props.boxShadowBlur), " ").concat(props.boxShadowColor || props.themeColor) : null
      };
      return _createVNode("div", {
        "class": classes.content,
        "style": style,
        "ref": contentRef
      }, [_createVNode("div", {
        "class": "".concat(prefixCls, "-wrap")
      }, [_createVNode("div", {
        "class": "".concat(prefixCls, "-embed")
      }, [renderContentLoading(), renderContentInfo(), renderContentResult()]), _createVNode("div", {
        "ref": sliderRef,
        "class": "".concat(classes.slider).concat(params.drag.moving ? " ".concat(classes.slider, "-moving") : '')
      }, [renderSliderTrack(), renderSliderBtn()])]), _createVNode("div", {
        "class": "".concat(prefixCls, "-panel")
      }, [renderPanelAction(), renderPanelCopyright()])]);
    }.bind(this);
    var renderContentLoading = function renderContentLoading() {
      var _props$themeColor2, _props$themeColor3;
      _newArrowCheck(this, _this);
      var loadingCls = "".concat(prefixCls, "-loading");
      var style1 = {
        borderColor: (_props$themeColor2 = props.themeColor) !== null && _props$themeColor2 !== void 0 ? _props$themeColor2 : null
      };
      var style2 = {
        background: (_props$themeColor3 = props.themeColor) !== null && _props$themeColor3 !== void 0 ? _props$themeColor3 : null
      };
      return params.loading ? _createVNode("div", {
        "class": loadingCls
      }, [_createVNode("div", {
        "class": "".concat(loadingCls, "-spinner")
      }, [_createVNode("div", {
        "class": "load"
      }, [_createVNode("div", null, [_createVNode("div", null, [_createVNode("div", {
        "style": style1
      }, null), _createVNode("div", {
        "style": style2
      }, null)])])])]), _createVNode("div", {
        "class": "".concat(loadingCls, "-tip")
      }, [_createTextVNode("\u6B63\u5728\u52A0\u8F7D\u9A8C\u8BC1\u7801 \xB7\xB7\xB7")])]) : null;
    }.bind(this);
    var renderContentInfo = function renderContentInfo() {
      _newArrowCheck(this, _this);
      return _createVNode("div", {
        "class": "".concat(prefixCls, "-info")
      }, [_createVNode("canvas", {
        "width": params.size.width,
        "height": params.size.height,
        "ref": imageRef
      }, null), _createVNode("canvas", {
        "width": params.size.width,
        "height": params.size.height,
        "ref": blockRef
      }, null)]);
    }.bind(this);
    var renderContentResult = function renderContentResult() {
      _newArrowCheck(this, _this);
      var cls = "".concat(classes.result, " ").concat(params.check.correct ? "".concat(classes.result, "-success") : "".concat(classes.result, "-error"));
      return _createVNode("div", {
        "class": cls,
        "ref": resultRef,
        "innerHTML": params.check.tip
      }, null);
    }.bind(this);
    var renderSliderTrack = function renderSliderTrack() {
      var _props$themeColor4;
      _newArrowCheck(this, _this);
      var sliderTrackCls = "".concat(classes.slider, "-track");
      var style = {
        borderColor: (_props$themeColor4 = props.themeColor) !== null && _props$themeColor4 !== void 0 ? _props$themeColor4 : null
      };
      return _createVNode("div", {
        "class": sliderTrackCls,
        "style": style
      }, [_createVNode("span", {
        "class": "".concat(sliderTrackCls, "-tip").concat(params.drag.moving ? ' hide' : '')
      }, [_createTextVNode("\u62D6\u52A8\u5DE6\u8FB9\u6ED1\u5757\u5B8C\u6210\u4E0A\u65B9\u62FC\u56FE")])]);
    }.bind(this);
    var renderSliderBtn = function renderSliderBtn() {
      var _props$themeColor5, _props$themeColor6;
      _newArrowCheck(this, _this);
      var sliderBtnCls = "".concat(classes.slider, "-btn");
      var style = {
        borderColor: (_props$themeColor5 = props.themeColor) !== null && _props$themeColor5 !== void 0 ? _props$themeColor5 : null
      };
      return _createVNode("div", {
        "class": sliderBtnCls,
        "style": style,
        "ref": sliderBtnRef
      }, [_createVNode("div", {
        "class": "".concat(sliderBtnCls, "-icon"),
        "style": style
      }, [_createVNode("div", {
        "class": "".concat(sliderBtnCls, "-vertical")
      }, null), _createVNode("div", {
        "class": "".concat(sliderBtnCls, "-horizontal"),
        "style": {
          background: (_props$themeColor6 = props.themeColor) !== null && _props$themeColor6 !== void 0 ? _props$themeColor6 : null
        }
      }, null)])]);
    }.bind(this);
    var renderPanelAction = function renderPanelAction() {
      var _this8 = this;
      _newArrowCheck(this, _this);
      var panelActionCls = "".concat(prefixCls, "-panel-action");
      return _createVNode("div", {
        "class": panelActionCls
      }, [_createVNode(Tooltip, {
        "title": "关闭验证",
        "autoAdjustOverflow": false,
        "overlayClassName": "".concat(prefixCls, "-tooltip"),
        "color": props.themeColor
      }, {
        default: function _default() {
          _newArrowCheck(this, _this8);
          return [_createVNode(CloseCircleOutlined, {
            "onClick": closeModal
          }, null)];
        }.bind(this)
      }), _createVNode(Tooltip, {
        "title": "刷新验证",
        "autoAdjustOverflow": false,
        "overlayClassName": "".concat(prefixCls, "-tooltip"),
        "color": props.themeColor
      }, {
        default: function _default() {
          _newArrowCheck(this, _this8);
          return [_createVNode(ReloadOutlined, {
            "onClick": refreshCaptcha
          }, null)];
        }.bind(this)
      }), _createVNode(Tooltip, {
        "title": "帮助反馈",
        "autoAdjustOverflow": false,
        "overlayClassName": "".concat(prefixCls, "-tooltip"),
        "color": props.themeColor
      }, {
        default: function _default() {
          _newArrowCheck(this, _this8);
          return [_createVNode("a", {
            "href": params.target,
            "target": "_blank"
          }, [_createVNode(QuestionCircleOutlined, null, null)])];
        }.bind(this)
      })]);
    }.bind(this);
    var renderPanelCopyright = function renderPanelCopyright() {
      _newArrowCheck(this, _this);
      var copyrightCls = "".concat(prefixCls, "-copyright");
      return _createVNode("div", {
        "class": copyrightCls
      }, [_createVNode("div", {
        "class": "".concat(copyrightCls, "-text")
      }, [_createVNode(_Fragment, null, [_createVNode("a", {
        "href": params.target,
        "target": "_blank"
      }, [_createVNode("img", {
        "src": params.avatar,
        "alt": params.powered
      }, null)]), _createVNode("span", null, [_createTextVNode("\u63D0\u4F9B\u6280\u672F\u652F\u6301")])])])]);
    }.bind(this);
    return function () {
      var _this9 = this;
      _newArrowCheck(this, _this);
      return _createVNode(_Fragment, null, [renderMask(), _createVNode(Transition, {
        "name": animation,
        "appear": true
      }, {
        default: function _default() {
          _newArrowCheck(this, _this9);
          return [_withDirectives(_createVNode("div", {
            "class": "".concat(prefixCls, " ").concat(langCls).concat(!params.check.correct && params.check.show ? " ".concat(prefixCls, "-error") : ''),
            "style": {
              top: "".concat($tools.convert2Rem(props.position.top)),
              left: "".concat($tools.convert2Rem(props.position.left))
            },
            "ref": modalRef
          }, [renderArrow(), renderContent()]), [[_vShow, show.value]])];
        }.bind(this)
      })]);
    }.bind(this);
  }
});