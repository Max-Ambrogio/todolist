class TodoItem {
    constructor(text, options = {}) {
        this.text = text

        this.completed = options.completed || false
        this.addToDom()
    }

    addToDom(){
        this.element = document.createElement("div")
        const p = document.createElement("p")
        p.innerHTML = this.text

        this.checkbox = document.createElement('input')
        this.checkbox.type = "checkbox"
        this.checkbox.addEventListener("change" , this.toggleComplete)
        this.checkbox.checked = this.completed

        this.element.appendChild(this.checkbox)
        this.element.appendChild(p)
    }

    toggleComplete = (evt) => {
        this.completed = this.checkbox.checked 

        const newEvt = new CustomEvent('item-toggled' , {detail:{element: this.element}})
        document.dispatchEvent(newEvt)
    }
}