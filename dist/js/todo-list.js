"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Todolist = /*#__PURE__*/function () {
  function Todolist(selector) {
    var _this = this;

    _classCallCheck(this, Todolist);

    _defineProperty(this, "handleNewItem", function (evt) {
      evt.preventDefault();
      console.log('hello');
      var text = _this.newItemInput.value;
      var item = new TodoItem(text);

      _this.items.push(item);

      _this.newItemInput.value = "";
      console.log('items', _this.items);

      _this.updateList();
    });

    _defineProperty(this, "handleItemToggled", function (evt) {
      console.log("an item was toggled", evt);

      _this.updateCompletedCount();

      _this.save();
    });

    _defineProperty(this, "updateCompletedCount", function () {
      var count = _this.items.filter(function (item) {
        return item.completed === true;
      }).length;

      _this.completedCountEl.innerText = count;
    });

    _defineProperty(this, "updateList", function () {
      _this.totalCountEl.innerText = _this.items.length;

      _this.items.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(item.element);

        _this.todolist.appendChild(li);

        console.log(item.element);
      });
    });

    _defineProperty(this, "hideItem", function () {
      _this.items.forEach(function (item) {
        if (item.completed === true) {
          item.element.classList.add("hide");
        } else if (item.completed === false) {
          item.element.classList.remove("hide");
        }
      });
    });

    this.items = [];
    this.load();
    this.todolistWrapper = document.querySelector(selector);
    this.todoForm = this.todolistWrapper.querySelector("form");
    this.todolist = this.todolistWrapper.querySelector("#list");
    this.newItemInput = this.todolistWrapper.querySelector("[name='new-item']");
    this.totalCountEl = this.todolistWrapper.querySelector(".total");
    this.completedCountEl = this.todolistWrapper.querySelector(".done");
    this.hideButton = this.todolistWrapper.querySelector("[name='hide-button']");
    this.setup();
    this.updateList();
  }

  _createClass(Todolist, [{
    key: "setup",
    value: function setup() {
      this.todoForm.addEventListener("submit", this.handleNewItem);
      document.addEventListener("item-toggled", this.handleItemToggled);
      this.hideButton.addEventListener('click', this.hideItem);
    }
  }, {
    key: "save",
    value: function save() {
      localStorage.setItem('todos', JSON.stringify(this.items));
    }
  }, {
    key: "load",
    value: function load() {
      var someTodos = localStorage.getItem("todos");

      if (someTodos) {
        var existingItems = JSON.parse(someTodos);
        this.items = existingItems.map(function (item) {
          var todoItem = new TodoItem(item.text, {
            completed: item.completed
          });
          return todoItem;
        });
      }
    }
  }]);

  return Todolist;
}(); // full list 
// another checkbox to hiude comppleted 
// when it goes to update the list wether or not to show an item
// inside of update list "hide items" do in css or whatever 
// remove items with either a button or seperate actions
// update list via css or update list viadom functions 
// custom events 
// create a button for removeing completed items from the list
// button for removing individual items 
//
//# sourceMappingURL=todo-list.js.map
