import { page_fetcher } from "./fetcher.js";
import { render_json_data } from "./pages.js";
import { pointings_images_video_elements } from "./pointing.js";    
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
        // console.log("routes get keys ",routes_get_keys)
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
        console.log("data data param "+get_query_param_url_if_exist)
        // console.log("data params ",data_params)
        const url=routes['/'+get_query_param_url_if_exist] ?? routes['/#404']; 
        await page_fetcher({page:url, target:".outlet"});
        //fetcher data di route tertentu saja untuk menghemat resource karena tidak semua page membutuhkan data yang sama
            await render_json_data()
        // make dinamyc pointings
        pointings_images_video_elements()
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
            //initial render data 
            await render_json_data()
        // make dinamyc pointings
        pointings_images_video_elements()
    })
}

export{
    routes
}