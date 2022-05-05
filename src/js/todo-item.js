/**
 * CharLimiter will be given a single DOM element to do it's thing. 
 * 
 * @constructor Takes a single DOM element 
 * @var element element
 * @var options
 */

class CharLimiter {

    /**
     * takes two arg and returns a string 
     * @param {string} param1 
     * @param {int} param2 
     */

     DEFAULT_OPTIONS = {
        max : 10
     }

    constructor(elementFromOutside) {
        console.log(elementFromOutside)
        this.element = elementFromOutside
        this.options = {
            ...this.DEFAULT_OPTIONS,
            ...this.trimEmpty(elementFromOutside.dataset)
        }
        this.cleanOptions()
        console.log("setting up new char limit for ", this.element, this.options)
        this.setUp()
    }

    /**
     * remove any keys with empty null bodies
     * @param {Object} object 
     * @returns object
     */
    trimEmpty(object){
        Object.keys(object).forEach((key) => {
            if (!object[key]) {
                delete object[key]
            }
        })

        return object
    }

    cleanOptions(){
        ['max' , 'min'].forEach((key) => {
            if (this.options[key]){
               this.options[key] = parseInt(this.options[key]) 
            }
        })
        // this.options.max = parseInt(this.options.max)
        // this.options.min = parseInt(this.options.min)
    }

    setUp(){
        console.log("adding listener for ", this.element)

        this.feedback = document.createElement('span')
        this.feedback.classList.add("feedback")
        this.element.parentNode.appendChild(this.feedback)

        this.element.addEventListener('keydown', this.handleKeyDown)
        this.element.addEventListener('keyup', this.handleKeyUp)

    }

    handleKeyDown = (evt) => {
        const curLen = evt.target.value.length
        const remaining = this.options.max - curLen

        // evt.target.querySelector... for individual fields. 
        // this.feedback.innerText = remaining + " characters left"

        const span = this.feedback
        span.innerText = remaining + " characters left"

        if(curLen > 5) {
            span.style.color = "red"  
            if(curLen <= 6) {
                span.style.color = "black"
            }      
        }

        if(curLen == 0) {
            span.innerText = ""
        }

        // console.log('keydown' , curLen, remaining)

        const inputbox = document.querySelector('input')

        if(remaining <= 0) {
            if ([8, 46, 37, 39].includes(evt.keyCode)) {return}
            evt.preventDefault()
            span.innerText = "Error. limit reached"
            inputbox.style.backgroundColor = "red"
        }

        if(remaining > 0){
            inputbox.style.backgroundColor = "white"
        }

    }

    handleKeyUp = (evt) => {
        const curLen = evt.target.value.length
        const remaining = this.options.max - curLen
        
    }



}