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

        this.delete = document.createElement('img')
        this.delete.src = "./dist/img/trash_.png"
        this.delete.classList.add('remove')
        this.delete.addEventListener("click" , this.deleteItem)
        // this.deleteItem = this.p.remove();

        this.element.appendChild(this.checkbox)
        this.element.appendChild(this.delete)
        this.element.appendChild(p)     
    }

    toggleComplete = (evt) => {
        this.completed = this.checkbox.checked
        this.element.classList.toggle('completed') 
        const newEvt = new CustomEvent('item-toggled' , {detail:{element: this.element}})
        document.dispatchEvent(newEvt)
    }

    deleteItem = () => {
        // this.element.remove();
        const newEvt = new CustomEvent('item-deleted' , {detail:{element: this.element}})
        document.dispatchEvent(newEvt)
    }

   
}