import $ from 'jquery';

export class KeyboardListener{
    stack = {};
    
    constructor(){
        $(document).keyup(this.keyPress.bind(this))
    }

    keyPress(event){
        let array = this.stack[event.keyCode];
        if(array && array.length) {
            for(let i = array.length - 1; i >= 0; i--) {
                let callback = array[i];
                if(callback !== null) {
                    //execute only last callback
                    callback(event);
                    break;
                }
            }
        }
    }
    
    push(callback, key){
        if(typeof callback !== 'function') {
            throw 'KeyboardListener: callback must be a function.'
        }
        if(typeof key !== 'number') {
            throw 'KeyboardListener: key must be a number, that equal to key code'
        }
        let stack = this.stack;
        if(!stack[key]) {
            stack[key] = [];
        }
        stack[key].push(callback);
        return stack[key].length - 1;
    }
    
    remove(key, index){
        let stack = this.stack;
        if(stack[key] && stack[key][index]) {
            stack[key][index] = null;
        }
    }
}

let applicationListner = new KeyboardListener();
export default applicationListner;