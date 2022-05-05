"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * CharLimiter will be given a single DOM element to do it's thing. 
 * 
 * @constructor Takes a single DOM element 
 * @var element element
 * @var options
 */
var CharLimiter = /*#__PURE__*/function () {
  /**
   * takes two arg and returns a string 
   * @param {string} param1 
   * @param {int} param2 
   */
  function CharLimiter(elementFromOutside) {
    var _this = this;

    _classCallCheck(this, CharLimiter);

    _defineProperty(this, "DEFAULT_OPTIONS", {
      max: 10
    });

    _defineProperty(this, "handleKeyDown", function (evt) {
      var curLen = evt.target.value.length;
      var remaining = _this.options.max - curLen; // evt.target.querySelector... for individual fields. 
      // this.feedback.innerText = remaining + " characters left"

      var span = _this.feedback;
      span.innerText = remaining + " characters left";

      if (curLen > 5) {
        span.style.color = "red";

        if (curLen <= 6) {
          span.style.color = "black";
        }
      }

      if (curLen == 0) {
        span.innerText = "";
      } // console.log('keydown' , curLen, remaining)


      var inputbox = document.querySelector('input');

      if (remaining <= 0) {
        if ([8, 46, 37, 39].includes(evt.keyCode)) {
          return;
        }

        evt.preventDefault();
        span.innerText = "Error. limit reached";
        inputbox.style.backgroundColor = "red";
      }

      if (remaining > 0) {
        inputbox.style.backgroundColor = "white";
      }
    });

    _defineProperty(this, "handleKeyUp", function (evt) {
      var curLen = evt.target.value.length;
      var remaining = _this.options.max - curLen;
    });

    console.log(elementFromOutside);
    this.element = elementFromOutside;
    this.options = _objectSpread(_objectSpread({}, this.DEFAULT_OPTIONS), this.trimEmpty(elementFromOutside.dataset));
    this.cleanOptions();
    console.log("setting up new char limit for ", this.element, this.options);
    this.setUp();
  }
  /**
   * remove any keys with empty null bodies
   * @param {Object} object 
   * @returns object
   */


  _createClass(CharLimiter, [{
    key: "trimEmpty",
    value: function trimEmpty(object) {
      Object.keys(object).forEach(function (key) {
        if (!object[key]) {
          delete object[key];
        }
      });
      return object;
    }
  }, {
    key: "cleanOptions",
    value: function cleanOptions() {
      var _this2 = this;

      ['max', 'min'].forEach(function (key) {
        if (_this2.options[key]) {
          _this2.options[key] = parseInt(_this2.options[key]);
        }
      }); // this.options.max = parseInt(this.options.max)
      // this.options.min = parseInt(this.options.min)
    }
  }, {
    key: "setUp",
    value: function setUp() {
      console.log("adding listener for ", this.element);
      this.feedback = document.createElement('span');
      this.feedback.classList.add("feedback");
      this.element.parentNode.appendChild(this.feedback);
      this.element.addEventListener('keydown', this.handleKeyDown);
      this.element.addEventListener('keyup', this.handleKeyUp);
    }
  }]);

  return CharLimiter;
}();
//# sourceMappingURL=char-limiter.js.map
