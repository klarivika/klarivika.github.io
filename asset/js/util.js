/**
 * @desc manipulate the dom 
 * @param {string} selector 
 * @param {function} cb 
 */
const $= (selector,cb) =>typeof cb === 'function' ? cb(selector) : document.querySelector(selector);
/**
 * @desc manipulate the dom 
 * @param {string} selector 
 */
const All= (selector) =>document.querySelectorAll(selector);




/**
 * @desc register themes colors and insert it to element root
 * @param {object} themes 
 */
const register_variable_styles=({themes})=>{
            const themes2=Object.entries(themes)
        //console.log(themes2);
            themes2.forEach(([key,value])=>{
                document.documentElement.style.setProperty(`--${key}`, value);
            })
}

/**
 * @desc create custom elements
 * @param {object} t 
 * @param {string} t.name 
 * @param {string} t.html 
 */
const custom_element_creator=({name,html})=>{
    class CustomElement extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            this.innerHTML = html;
        }
        static get observedAttributes() {
            return ['',''];
        }
    }
    customElements.define(name, CustomElement);
}








export{
    $,
    All,
    register_variable_styles
}