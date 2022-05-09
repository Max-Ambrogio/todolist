"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TodoItem = /*#__PURE__*/function () {
  function TodoItem(text) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TodoItem);

    _defineProperty(this, "toggleComplete", function (evt) {
      _this.completed = _this.checkbox.checked;
      var newEvt = new CustomEvent('item-toggled', {
        detail: {
          element: _this.element
        }
      });
      document.dispatchEvent(newEvt);
    });

    this.text = text;
    this.completed = options.completed || false;
    this.addToDom();
  }

  _createClass(TodoItem, [{
    key: "addToDom",
    value: function addToDom() {
      this.element = document.createElement("div");
      var p = document.createElement("p");
      p.innerHTML = this.text;
      this.checkbox = document.createElement('input');
      this.checkbox.type = "checkbox";
      this.checkbox.addEventListener("change", this.toggleComplete);
      this.checkbox.checked = this.completed;
      this.element.appendChild(this.checkbox);
      this.element.appendChild(p);
    }
  }]);

  return TodoItem;
}();
//# sourceMappingURL=todo-item.js.map
