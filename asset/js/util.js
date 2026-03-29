/**
 * @desc manipulate the dom 
 * @param {string} selector 
 * @param {function} cb 
 */
const $= (selector,cb) =>typeof cb === 'function' ? cb(document.querySelector(selector)) : document.querySelector(selector);
/**
 * @desc manipulate the dom 
 * @param {string} selector 
 */
const All= (selector) =>document.querySelectorAll(selector);
/**
 * @desc fetches the pages and returns the response insert it to dom
 * @param {string} page 
 * @param {string} target 
 */
const page_cache = {};
const page_fetcher = async ({page,target}) => {
    try {
        if(page_cache[page]){
            document.querySelector(target).innerHTML = page_cache[page];
            return 
        }
        
        const simplyfing_data=`${page}/${page}.html`
        const response = await fetch("./pages/"+simplyfing_data);
        const data = await response.text();
        //console.log("jaka ",data)
        page_cache[page]=data
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
 * @desc store and render databased on url query param
 */
const render_json_data=async()=>{
    //home start
        if(window.location.hash === "#home"){
            const home_data=await fetcher_data()
            console.log("home data ",home_data)
             //tembak ke outlet
            const home_outlet=document.querySelector(".outlet")
            home_data.forEach((item)=>{
                const div=document.createElement("div")
                div.innerHTML=`
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                `
                home_outlet.appendChild(div)
            })
        }
        //home end
}

let curent_hash="";
/**
 * @desc create route
 * @param {object} t 
 * @param {object} t.routes 
 */
const routes=({routes})=>{
    let data_params={}
    // Listen for hash changes
    window.addEventListener('hashchange',async()=>{
        //cegah reload jika pathname sama 
                const new_hash="/"+window.location.hash
            if(curent_hash == window.location.hash)return
            curent_hash=new_hash
        //cocokan dengan routes jika tidak maka lempar ke page not found
        const routes_get_keys=Object.keys(routes)[Object.keys(routes).findIndex(key => key.startsWith("/"+window.location.hash.split("/")[0]))]//route saat ini
        let get_query_param_url_if_exist=window.location.hash
        console.log("routes get keys ",routes_get_keys)
        if(/\:\w+/g.test(routes_get_keys)){
            //routes get keys jadikan objects
            //merubah data params menjadi object dengan key nama param dan value dari url {id:1}
            routes_get_keys.match(/\:\w+/g)?.map(param => {
                const array_routes=routes_get_keys.split("/") //array route saat ini
                const get_index_of_key_params=array_routes[array_routes.findIndex(key => key === param)].substring(1) //:id => id
                    const url="/"+window.location.hash//.split("/")
                    const value_param=url.split("/")[array_routes.indexOf(":"+get_index_of_key_params)]
                        data_params[get_index_of_key_params]=value_param
                // console.log("testing bang ",{value_param,url,data_params})
                // console.log("urlnya ",url.split("/"))
            });
            get_query_param_url_if_exist=routes_get_keys.substring(1)
            // console.log("data query param ",routes_get_keys) 
        }
        // console.log("data data param "+get_query_param_url_if_exist)
        // console.log("data params ",data_params)
        const url=routes['/'+get_query_param_url_if_exist] ?? routes['/#404']; 
        await page_fetcher({page:url, target:".outlet"});
        // make dinamyc pointings
        pointings_images_video_elements()
        //fetcher data di route tertentu saja untuk menghemat resource karena tidak semua page membutuhkan data yang sama
       render_json_data()
    })
    window.addEventListener('load',async()=>{
        // Trigger the initial route based on the current hash
        
        const url=window.location.hash
        
        // console.log("no bug baby ",url)
        //kalau url saat ini kosong berarti render halaman home atau pertama  
        let initialUrl=routes[Object.entries(routes)[0][0]];
        //kalaiu url tidak kosong maka load yang sudah ada di url
        if(url !== "") {
            const dataroute=Object.keys(routes)
            initialUrl=routes[dataroute[dataroute.findIndex(key => key.startsWith("/"+url.split("/")[0]))]]
            // console.log("dataroute ",)
            // console.log("url ",url.split("/")[0])
        }
       await page_fetcher({page:initialUrl, target:".outlet"});
        // make dinamyc pointings
        pointings_images_video_elements()
        //initial render data 
        render_json_data()
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
        const src=element.getAttribute('src');
        if(type === "web"){
            if(src.includes("./asset/"))return
           // console.log("testing ",element.getAttribute('src'))
            element.src=`./asset/${src}`;
        }else if(type === "data_klarifikasi"){
            if(src.includes("./asset/data_klarifikasi"))return
            element.src=`./asset/data_klarifikasi/${src}`;
        }
    })
}

/**
 * @desc fetch data from json and insert it to html
 * @param {object} datas 
 */
const fetcher_data=async(datas={})=>{
    try{
        //{id:1}
       const fetching_data=async (datas={})=>{
        const response=await fetch("./asset/data_json/data.json");
       const data=await response.json();
       data?.map((item)=>{
            //const manipulated_link_resource=
            item["assets"].forEach(item2=>{
                    item2['path']=`./asset/data_klarifikasi/${item2["path"]}`;
            })
            
        })
        
        if(Object.keys(datas).length === 0){
             //tembak ke outlet
            return data
        }
            return data
       }
       if(Object.keys(datas).length === 0){
           return await fetching_data()
           
       }

    }catch(err){

    }

}

export{
    component_fetcher,
    page_fetcher,
    register_variable_styles,
    routes,
    pointings_images_video_elements
}