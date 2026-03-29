
/**
 * @desc fetches the pages and returns the response insert it to dom
 * @param {string} page 
 * @param {string} target 
 */
const page_fetcher = async ({page,target}) => {
    try {
        const simplyfing_data=`${page}/${page}.html`
        const response = await fetch("./pages/"+simplyfing_data);
        const data = await response.text();
        //console.log("jaka ",data)
        document.querySelector(target).innerHTML = data;
    }catch (error) {
        console.error("Error fetching page:", error);
    }

}

/**
 * @desc fetches the components and returns the response insert it to dom
 * @param {string} url 
 * @param {string} target 
 */
const component_fetcher = async ({component,target}) => {
    try {
        const simplyfing_data=`${component}/${component}.html`
        const response = await fetch("./asset/components/"+simplyfing_data);
        const data = await response.text();
        document.querySelector(target).innerHTML = data;
    }catch (error) {
        console.error("Error fetching component:", error);
    }

}

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

/**
 * @desc create route
 * @param {object} t 
 * @param {object} t.routes 
 */
const routes=({routes})=>{
    // Listen for hash changes
    window.addEventListener('hashchange',()=>{
        //cocokan dengan routes jika tidak maka lempar ke page not found
        const url=routes['/'+window.location.hash] ?? routes['/#404']; 
        page_fetcher({page:url, target:".outlet"});
    })
    window.addEventListener('load',()=>{
        // Trigger the initial route based on the current hash
        const initialUrl=routes[Object.entries(routes)[0][0]];
        page_fetcher({page:initialUrl, target:".outlet"});
    })
}

/**
 * @desc handle image atau video element based on attribut
 * type atribute web[pointing ke asset] atau data_klarifikasi[pointing kesana] jika tidak ada maka harus dilakukan manual oleh webdev
 */
const pointings_images_video_elements=()=>{
    const select=document.querySelectorAll('img[type="web"], video[type="web"], img[type="data_klarifikasi"], video[type="data_klarifikasi"]');
    select.forEach((element)=>{
        const type=element.getAttribute('type');
        if(type === "web"){
            element.src=`./asset/${element.getAttribute('src')}`;
        }else if(type === "data_klarifikasi"){
            element.src=`./asset/data_klarifikasi/${element.getAttribute('src')}`;
        }
    })
}

export{
    component_fetcher,
    page_fetcher,
    register_variable_styles,
    routes,
    pointings_images_video_elements
}