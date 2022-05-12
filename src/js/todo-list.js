class Todolist {
    constructor(selector){
        this.items = []
        this.load()

        this.todolistWrapper = document.querySelector(selector)
        this.todoForm = this.todolistWrapper.querySelector("form")
        this.todolist = this.todolistWrapper.querySelector("#list")
        this.newItemInput = this.todolistWrapper.querySelector("[name='new-item']")

        this.totalCountEl = this.todolistWrapper.querySelector(".total")
        this.completedCountEl = this.todolistWrapper.querySelector(".done")

        this.hideButton = this.todolistWrapper.querySelector("[name='hide-button']")

        this.setup()
        this.updateList()
    }

    setup(){
        this.todoForm.addEventListener("submit" , this.handleNewItem)
        document.addEventListener("item-toggled" , this.handleItemToggled)
        this.hideButton.addEventListener('click' , this.toggleCompletedItem)
        document.addEventListener('item-deleted' , this.handleItemDeleted)
    }

    handleNewItem = (evt) => {
        evt.preventDefault()
        console.log('hello')
        const text = this.newItemInput.value
        const item = new TodoItem(text)
        this.items.push(item)
        this.newItemInput.value = ""

        console.log('items' , this.items)
        this.updateList()
    }

    handleItemToggled = (evt) => {
        console.log("an item was toggled" , evt)
        this.updateCompletedCount()
        this.save()
    }

    updateCompletedCount = () => {
        const count = this.items.filter((item) => item.completed === true).length 
        this.completedCountEl.innerText = count
    }

    updateList = () => {
        this.totalCountEl.innerText = this.items.length
        this.items.forEach((item) => {
            const li = document.createElement('li')
            li.appendChild(item.element)
            this.todolist.appendChild(li)
            console.log(item.element)
        })
    }

   toggleCompletedItem = () => {
        //option1
        this.todolist.classList.toggle('hide-completed')
        
        // this.checkbox.parentNode.classList.add()
        // this.items.forEach((item) => {
        //     if(item.completed === true){
        //         item.element.classList.add("hide")
        //     }  else if (item.completed === false){
        //         item.element.classList.remove("hide")
        //     }
        // }) 
    }

    // decide wether the hidden items should be hidden or not
    // hide completed tasksk show non completed

    handleItemDeleted = (evt) => {
        const delItem = evt.detail.element
        this.items = this.items.filter((item) => item.element !== delItem)
        this.updateList()
        this.save()
    }

    save() {
        localStorage.setItem('todos' , JSON.stringify(this.items))
    }

    load() {
        const someTodos = localStorage.getItem("todos")
        if(someTodos) {
            const existingItems = JSON.parse(someTodos)
            this.items = existingItems.map((item) => {
                const todoItem = new TodoItem(item.text, { completed: item.completed})
                return todoItem
            })
        }
    }

}

// full list 
// another checkbox to hiude comppleted 
// when it goes to update the list wether or not to show an item
// inside of update list "hide items" do in css or whatever 
// remove items with either a button or seperate actions

// update list via css or update list viadom functions 
// custom events 

// create a button for removeing completed items from the list
// button for removing individual items 
//